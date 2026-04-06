import { addTransactionsIfMissing, NewTransactionInput } from '../transactionService';
import { fetchGmailTransactions } from './gmailClient';

export const syncGmailTransactions = async () => {
  const remote = await fetchGmailTransactions({ days: 30, maxResults: 50 });
  const toInsert: NewTransactionInput[] = remote.map((txn) => ({
    amount: txn.amount,
    merchant: txn.merchant,
    category: txn.category,
    date: txn.date,
    source: 'email',
    rawText: `gmail:${txn.id}`,
    isRecurring: false,
  }));

  return addTransactionsIfMissing(toInsert);
};
