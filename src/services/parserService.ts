import { Transaction } from '../types/transaction';

const AMOUNT_REGEX = /(?:₹|rs\.?|inr)\s?([0-9,]+(?:\.[0-9]{1,2})?)/i;
const SKIP_KEYWORDS = ['otp', 'one time password', 'verification code', 'balance', 'avail bal'];
const CREDIT_KEYWORDS = ['credited', 'credit', 'refund', 'reversed', 'received', 'deposited', 'added', 'salary', 'cashback'];
const DEBIT_KEYWORDS = ['debited', 'spent', 'paid', 'purchase', 'withdrawn', 'sent', 'dr', 'transfer'];

const MERCHANT_MAP: Array<{ key: string; merchant: string; category: string }> = [
  { key: 'swiggy', merchant: 'Swiggy', category: 'Food' },
  { key: 'zomato', merchant: 'Zomato', category: 'Food' },
  { key: 'amazon', merchant: 'Amazon', category: 'Shopping' },
  { key: 'flipkart', merchant: 'Flipkart', category: 'Shopping' },
  { key: 'netflix', merchant: 'Netflix', category: 'Subscriptions' },
  { key: 'spotify', merchant: 'Spotify', category: 'Subscriptions' },
  { key: 'uber', merchant: 'Uber', category: 'Transport' },
  { key: 'ola', merchant: 'Ola', category: 'Transport' },
  { key: 'bigbasket', merchant: 'BigBasket', category: 'Groceries' },
  { key: 'dmart', merchant: 'D-Mart', category: 'Groceries' },
];

const cleanMerchant = (value: string) =>
  value
    .replace(/[^a-z0-9 @._-]/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();

export const deriveChannel = (text: string) => {
  if (text.includes('upi')) return 'UPI';
  if (text.includes('card') || text.includes('pos')) return 'CARD';
  if (text.includes('imps') || text.includes('neft') || text.includes('rtgs'))
    return 'BANK';
  if (text.includes('atm') || text.includes('cash')) return 'ATM';
  return 'SMS';
};

export const buildSummary = (channel: string, merchant: string) => {
  const cleaned = merchant && merchant !== 'Unknown' ? merchant : 'Unknown';
  return `${channel} \u2022 ${cleaned}`;
};

const extractMerchant = (text: string) => {
  for (const entry of MERCHANT_MAP) {
    if (text.includes(entry.key)) return { merchant: entry.merchant, category: entry.category };
  }

  const toMatch =
    text.match(/\bto\s+([a-z0-9@._ -]{3,40})/i) ||
    text.match(/\bat\s+([a-z0-9@._ -]{3,40})/i) ||
    text.match(/\bfrom\s+([a-z0-9@._ -]{3,40})/i);

  if (toMatch?.[1]) {
    return { merchant: cleanMerchant(toMatch[1]), category: 'Others' };
  }

  return { merchant: 'Unknown', category: 'Others' };
};

export const parseSmsToTransaction = (
  sms: { body: string; date: number }
): Omit<Transaction, 'id' | 'createdAt'> | null => {
  const text = sms.body.toLowerCase();

  if (SKIP_KEYWORDS.some((k) => text.includes(k))) return null;
  if (CREDIT_KEYWORDS.some((k) => text.includes(k))) return null;
  if (!DEBIT_KEYWORDS.some((k) => text.includes(k))) {
    // If no debit keyword, still parse if UPI/card markers exist.
    const isPayment = ['upi', 'card', 'pos', 'imps', 'neft', 'rtgs', 'atm'].some((k) =>
      text.includes(k)
    );
    if (!isPayment) return null;
  }

  const amountMatch = text.match(AMOUNT_REGEX);
  if (!amountMatch) return null;

  const amount = parseFloat(amountMatch[1].replace(/,/g, ''));
  if (!amount || Number.isNaN(amount)) return null;

  const { merchant, category } = extractMerchant(text);
  const channel = deriveChannel(text);

  return {
    amount,
    merchant,
    category,
    channel,
    summary: buildSummary(channel, merchant),
    date: new Date(sms.date).toISOString(),
    source: 'sms',
    rawText: sms.body,
    isRecurring: false,
  };
};
