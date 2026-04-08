import { create } from 'zustand';

export type AiQuotaStatus = 'unknown' | 'ok' | 'limited' | 'error';

type AiState = {
  status: AiQuotaStatus;
  lastUpdated?: string;
  lastError?: string;
  setStatus: (status: AiQuotaStatus, error?: string) => void;
};

export const useAiStore = create<AiState>((set) => ({
  status: 'unknown',
  lastUpdated: undefined,
  lastError: undefined,
  setStatus: (status, error) =>
    set({
      status,
      lastUpdated: new Date().toISOString(),
      lastError: error,
    }),
}));
