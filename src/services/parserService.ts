import { Transaction } from '../types/transaction';

export const parseSmsToTransaction = (sms: { body: string; date: number }): Omit<Transaction, 'id' | 'createdAt'> | null => {
  const text = sms.body.toLowerCase();

  const amountMatch = text.match(/(?:₹|rs\.?|inr)\s?([0-9,]+(?:\.[0-9]{1,2})?)/i);
  if (!amountMatch) return null;

  const amount = parseFloat(amountMatch[1].replace(/,/g, ''));
  if (!amount || Number.isNaN(amount)) return null;

  let merchant = 'Unknown';
  if (text.includes('swiggy')) merchant = 'Swiggy';
  if (text.includes('amazon')) merchant = 'Amazon';
  if (text.includes('zomato')) merchant = 'Zomato';
  if (text.includes('netflix')) merchant = 'Netflix';

  let category = 'Others';
  if (merchant === 'Swiggy' || merchant === 'Zomato') category = 'Food';
  if (merchant === 'Amazon') category = 'Shopping';
  if (merchant === 'Netflix') category = 'Subscriptions';

  return {
    amount,
    merchant,
    category,
    date: new Date(sms.date).toISOString(),
    source: 'sms',
    rawText: sms.body,
    isRecurring: false,
  };
};
