import { ENV } from '../../config/env';

export type GmailTransaction = {
  id: string;
  amount: number;
  merchant: string;
  category: string;
  date: string;
  source: 'email';
};

type SyncOptions = {
  days?: number;
  maxResults?: number;
  q?: string;
};

export const fetchGmailTransactions = async (
  options: SyncOptions = {}
): Promise<GmailTransaction[]> => {
  const res = await fetch(`${ENV.GMAIL_SYNC_BASE_URL}/gmail/sync`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(options),
  });

  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || 'Failed to sync Gmail transactions.');
  }

  const data = await res.json();
  return data.transactions ?? [];
};
