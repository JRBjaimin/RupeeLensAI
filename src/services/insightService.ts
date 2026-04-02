import { Transaction } from '../types/transaction';
import { Insight } from '../types/insight';

const formatCurrency = (value: number) =>
  `₹${Math.round(value).toLocaleString('en-IN')}`;

const normalizeCategory = (category: string) => {
  const key = category.trim().toLowerCase();
  if (['food', 'dining', 'restaurants', 'delivery'].includes(key)) return 'Food';
  if (['shopping', 'retail', 'ecommerce'].includes(key)) return 'Shopping';
  if (['bills', 'utilities', 'housing'].includes(key)) return 'Bills';
  if (['subscriptions', 'subscription'].includes(key)) return 'Subscriptions';
  if (['transport', 'travel', 'cab', 'uber'].includes(key)) return 'Transport';
  return category || 'Others';
};

const getDate = (txn: Transaction) => {
  const d = new Date(txn.date);
  return Number.isNaN(d.getTime()) ? null : d;
};

const groupSum = (txns: Transaction[], keyFn: (t: Transaction) => string) =>
  txns.reduce<Record<string, number>>((acc, t) => {
    const key = keyFn(t);
    acc[key] = (acc[key] ?? 0) + Math.abs(t.amount);
    return acc;
  }, {});

const inMonth = (txn: Transaction, year: number, month: number) => {
  const d = getDate(txn);
  return d ? d.getFullYear() === year && d.getMonth() === month : false;
};

const buildRecurringInsights = (txns: Transaction[]) => {
  const byKey: Record<string, { merchant: string; amount: number; dates: Date[] }> = {};
  txns.forEach((txn) => {
    const d = getDate(txn);
    if (!d) return;
    const amount = Math.round(Math.abs(txn.amount));
    if (!txn.merchant) return;
    const key = `${txn.merchant}|${amount}`;
    if (!byKey[key]) {
      byKey[key] = { merchant: txn.merchant, amount, dates: [] };
    }
    byKey[key].dates.push(d);
  });

  const insights: Insight[] = [];
  Object.values(byKey).forEach((entry) => {
    if (entry.dates.length < 2) return;
    const dates = entry.dates.sort((a, b) => a.getTime() - b.getTime());
    const intervals = dates.slice(1).map((d, idx) => {
      const prev = dates[idx];
      return Math.round((d.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24));
    });
    const avg = intervals.reduce((sum, v) => sum + v, 0) / intervals.length;
    if (avg >= 25 && avg <= 35) {
      insights.push({
        id: `recurring-${entry.merchant}-${entry.amount}`,
        type: 'fixed_cost',
        tag: 'FIXED COST',
        title: `Recurring payment detected: ${entry.merchant}`,
        body: `${formatCurrency(entry.amount)} charged roughly every month.`,
      });
    }
  });
  return insights;
};

export const generateInsights = (transactions: Transaction[]): Insight[] => {
  const insights: Insight[] = [];
  if (!transactions.length) return insights;

  const now = new Date();
  const currentMonth = transactions.filter((t) =>
    inMonth(t, now.getFullYear(), now.getMonth())
  );
  const lastMonthDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const lastMonth = transactions.filter((t) =>
    inMonth(t, lastMonthDate.getFullYear(), lastMonthDate.getMonth())
  );

  const currentByCat = groupSum(currentMonth, (t) => normalizeCategory(t.category));
  const lastByCat = groupSum(lastMonth, (t) => normalizeCategory(t.category));
  const totalCurrent = Object.values(currentByCat).reduce((sum, v) => sum + v, 0);
  const totalLast = Object.values(lastByCat).reduce((sum, v) => sum + v, 0);

  if (totalLast > 0 && totalCurrent > totalLast * 1.1) {
    const deltaPct = Math.round(((totalCurrent - totalLast) / totalLast) * 100);
    insights.push({
      id: 'monthly-spike',
      type: 'warning',
      tag: 'TREND',
      title: `Spending is up ${deltaPct}% this month`,
      body: `${formatCurrency(totalCurrent)} vs ${formatCurrency(totalLast)} last month.`,
    });
  }

  const foodNow = currentByCat.Food ?? 0;
  const foodLast = lastByCat.Food ?? 0;
  if (foodLast > 0 && foodNow > foodLast * 1.2) {
    const pct = Math.round(((foodNow - foodLast) / foodLast) * 100);
    insights.push({
      id: 'food-spike',
      type: 'warning',
      tag: 'BEHAVIORAL',
      title: `Food spending increased ${pct}% this month`,
      body: `${formatCurrency(foodNow)} spent on Food vs ${formatCurrency(foodLast)} last month.`,
    });
  }

  const subsNow = currentByCat.Subscriptions ?? 0;
  if (subsNow > 0) {
    const subsMerchants = groupSum(
      currentMonth.filter((t) => normalizeCategory(t.category) === 'Subscriptions'),
      (t) => t.merchant || 'Subscriptions'
    );
    const topMerchants = Object.entries(subsMerchants)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 2)
      .map(([name]) => name);
    insights.push({
      id: 'subs-total',
      type: 'fixed_cost',
      tag: 'FIXED COST',
      title: `Subscriptions total ${formatCurrency(subsNow)}/mo`,
      body: topMerchants.length
        ? `Top services: ${topMerchants.join(', ')}.`
        : 'Recurring digital services detected.',
    });
  }

  const lateNight = currentMonth.filter((t) => {
    const d = getDate(t);
    if (!d) return false;
    const hour = d.getHours();
    return hour >= 23 || hour <= 5;
  });
  if (lateNight.length >= 3) {
    const totalLate = lateNight.reduce((sum, t) => sum + Math.abs(t.amount), 0);
    insights.push({
      id: 'late-night',
      type: 'behavioral',
      tag: 'BEHAVIORAL',
      title: 'Late-night spending detected',
      body: `${formatCurrency(totalLate)} across ${lateNight.length} transactions after 11 PM.`,
    });
  }

  const topEntry = Object.entries(currentByCat).sort((a, b) => b[1] - a[1])[0];
  if (topEntry && totalCurrent > 0) {
    const pct = Math.round((topEntry[1] / totalCurrent) * 100);
    insights.push({
      id: 'top-category',
      type: 'opportunity',
      tag: 'OPPORTUNITY',
      title: `${topEntry[0]} is ${pct}% of your spending`,
      body: 'Consider setting a cap or tracking a weekly budget.',
    });
  }

  const recurring = buildRecurringInsights(transactions);
  insights.push(...recurring.slice(0, 2));

  return insights.slice(0, 6);
};
