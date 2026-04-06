const MERCHANT_MAP = [
  { key: 'swiggy', merchant: 'Swiggy', category: 'Food' },
  { key: 'zomato', merchant: 'Zomato', category: 'Food' },
  { key: 'uber', merchant: 'Uber', category: 'Transport' },
  { key: 'ola', merchant: 'Ola', category: 'Transport' },
  { key: 'amazon', merchant: 'Amazon', category: 'Shopping' },
  { key: 'flipkart', merchant: 'Flipkart', category: 'Shopping' },
  { key: 'bigbasket', merchant: 'BigBasket', category: 'Groceries' },
  { key: 'netflix', merchant: 'Netflix', category: 'Subscriptions' },
  { key: 'spotify', merchant: 'Spotify', category: 'Subscriptions' },
  { key: 'youtube', merchant: 'YouTube', category: 'Subscriptions' },
  { key: 'google pay', merchant: 'Google Pay', category: 'Bills' },
  { key: 'paytm', merchant: 'Paytm', category: 'Bills' },
];

const AMOUNT_REGEX = /(?:₹|rs\.?|inr)\s?([0-9,]+(?:\.[0-9]{1,2})?)/i;

export const parseEmailToTransaction = ({
  subject,
  from,
  body,
  snippet,
  internalDate,
  messageId,
}) => {
  const combined = `${subject}\n${from}\n${snippet}\n${body}`.toLowerCase();
  const amountMatch = combined.match(AMOUNT_REGEX);
  if (!amountMatch) return null;

  const amount = parseFloat(amountMatch[1].replace(/,/g, ''));
  if (!amount || Number.isNaN(amount)) return null;

  let merchant = 'Unknown';
  let category = 'Others';

  for (const entry of MERCHANT_MAP) {
    if (combined.includes(entry.key)) {
      merchant = entry.merchant;
      category = entry.category;
      break;
    }
  }

  const date = internalDate
    ? new Date(Number(internalDate)).toISOString()
    : new Date().toISOString();

  return {
    id: messageId,
    amount,
    merchant,
    category,
    date,
    source: 'email',
  };
};
