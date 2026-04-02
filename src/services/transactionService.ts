import uuid from 'react-native-uuid';
import { db } from '../db/database';
import { Transaction } from '../types/transaction';

export type NewTransactionInput = Omit<
  Transaction,
  'id' | 'createdAt' | 'isRecurring'
> & {
  isRecurring?: boolean;
};

export const addTransaction = async (txn: NewTransactionInput) => {
  const id = uuid.v4().toString();
  const createdAt = new Date().toISOString();
  const isRecurring = txn.isRecurring ? 1 : 0;

  await db.executeAsync(
    `INSERT INTO transactions (id, amount, merchant, category, date, created_at, source, raw_text, is_recurring)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      id,
      txn.amount,
      txn.merchant,
      txn.category,
      txn.date,
      createdAt,
      txn.source,
      txn.rawText ?? null,
      isRecurring,
    ]
  );

  return { ...txn, id, createdAt, isRecurring: !!txn.isRecurring } as Transaction;
};

export const getTransactions = async (): Promise<Transaction[]> => {
  const result = await db.executeAsync(
    `SELECT * FROM transactions ORDER BY date DESC`
  );
  const rows = result.results ?? [];
  return rows.map(mapRowToTransaction);
};

export const getTransactionsByDateRange = async (
  startDate: string,
  endDate: string
): Promise<Transaction[]> => {
  const result = await db.executeAsync(
    `SELECT * FROM transactions WHERE date BETWEEN ? AND ? ORDER BY date DESC`,
    [startDate, endDate]
  );
  const rows = result.results ?? [];
  return rows.map(mapRowToTransaction);
};

const mapRowToTransaction = (row: any): Transaction => ({
  id: row.id,
  amount: row.amount,
  merchant: row.merchant,
  category: row.category,
  date: row.date,
  source: row.source,
  rawText: row.raw_text ?? undefined,
  isRecurring: Boolean(row.is_recurring),
  createdAt: row.created_at ?? row.date,
});
