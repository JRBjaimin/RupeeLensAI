import { create } from 'zustand';
import { Transaction } from '../types/transaction';
import { getTransactions } from '../services/transactionService';
import { generateInsights } from '../services/insightService';
import { Insight } from '../types/insight';
import { getInsights, saveInsights } from '../services/insightDbService';
import { detectRecurringPatterns, saveRecurringPatterns } from '../services/recurringService';

type AppState = {
  transactions: Transaction[];
  insights: Insight[];
  isSyncing: boolean;
  setIsSyncing: (val: boolean) => void;
  loadTransactions: () => Promise<void>;
  refreshInsights: () => Promise<void>;
};

export const useAppStore = create<AppState>((set, get) => ({
  transactions: [],
  insights: [],
  isSyncing: false,
  setIsSyncing: (isSyncing) => set({ isSyncing }),
  loadTransactions: async () => {
    const data = await getTransactions();
    set({ transactions: data });
    const patterns = detectRecurringPatterns(data);
    await saveRecurringPatterns(patterns);
    const nextInsights = generateInsights(data);
    await saveInsights(nextInsights);
    const persisted = await getInsights();
    set({ insights: persisted });
  },
  refreshInsights: async () => {
    const data = get().transactions;
    const patterns = detectRecurringPatterns(data);
    await saveRecurringPatterns(patterns);
    const nextInsights = generateInsights(data);
    await saveInsights(nextInsights);
    const persisted = await getInsights();
    set({ insights: persisted });
  },
}));
