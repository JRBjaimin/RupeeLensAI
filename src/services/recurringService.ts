import uuid from 'react-native-uuid';
import { db } from '../db/database';
import { Transaction } from '../types/transaction';

export type RecurringPattern = {
  id: string;
  merchant: string;
  amount: number;
  frequency: 'monthly';
  lastDetected: string;
};

const getDate = (txn: Transaction) => {
  const d = new Date(txn.date);
  return Number.isNaN(d.getTime()) ? null : d;
};

export const detectRecurringPatterns = (txns: Transaction[]): RecurringPattern[] => {
  const byKey: Record<string, { merchant: string; amount: number; dates: Date[] }> = {};
  txns.forEach((txn) => {
    const d = getDate(txn);
    if (!d || !txn.merchant) return;
    const amount = Math.round(Math.abs(txn.amount));
    const key = `${txn.merchant}|${amount}`;
    if (!byKey[key]) {
      byKey[key] = { merchant: txn.merchant, amount, dates: [] };
    }
    byKey[key].dates.push(d);
  });

  const patterns: RecurringPattern[] = [];
  Object.values(byKey).forEach((entry) => {
    if (entry.dates.length < 2) return;
    const dates = entry.dates.sort((a, b) => a.getTime() - b.getTime());
    const intervals = dates.slice(1).map((d, idx) => {
      const prev = dates[idx];
      return Math.round((d.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24));
    });
    const avg = intervals.reduce((sum, v) => sum + v, 0) / intervals.length;
    if (avg >= 25 && avg <= 35) {
      patterns.push({
        id: uuid.v4().toString(),
        merchant: entry.merchant,
        amount: entry.amount,
        frequency: 'monthly',
        lastDetected: dates[dates.length - 1].toISOString(),
      });
    }
  });

  return patterns;
};

export const saveRecurringPatterns = async (patterns: RecurringPattern[]) => {
  await db.executeAsync(`DELETE FROM recurring_patterns`);
  for (const pattern of patterns) {
    await db.executeAsync(
      `INSERT INTO recurring_patterns (id, merchant, amount, frequency, last_detected)
       VALUES (?, ?, ?, ?, ?)`,
      [
        pattern.id,
        pattern.merchant,
        pattern.amount,
        pattern.frequency,
        pattern.lastDetected,
      ]
    );
  }
};
