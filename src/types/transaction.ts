export type Transaction = {
  id: string;
  amount: number;
  merchant: string;
  category: string;
  channel?: string;
  summary?: string;
  aiUsed?: boolean;
  date: string;
  time?: string;
  source: 'sms' | 'email' | 'manual';
  rawText?: string;
  isRecurring: boolean;
  createdAt: string;
};
