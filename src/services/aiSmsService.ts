import { db } from '../db/database';
import { Transaction } from '../types/transaction';
import { AI_KEYS } from '../config/aiKeys';
import { useAiStore } from '../store/useAiStore';

const GEMINI_MODELS = ['gemini-2.5-flash', 'gemini-flash-latest'] as const;
const GROQ_MODEL = 'llama-3.1-8b-instant';

export type AiSmsResult = {
  merchant: string;
  category: string;
  channel: string;
  summary: string;
  aiUsed: boolean;
};

type CachedRow = {
  merchant?: string;
  category?: string;
  channel?: string;
  summary?: string;
  ai_used?: number;
};

const getCacheKey = (text: string) => {
  let hash = 5381;
  for (let i = 0; i < text.length; i += 1) {
    hash = (hash * 33) ^ text.charCodeAt(i);
  }
  return `sms_${(hash >>> 0).toString(16)}`;
};

const parseJsonFromText = (text: string) => {
  try {
    return JSON.parse(text);
  } catch {
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) return null;
    try {
      return JSON.parse(match[0]);
    } catch {
      return null;
    }
  }
};

const normalizeAiResult = (raw: any): AiSmsResult | null => {
  if (!raw) return null;
  const merchant = String(raw.merchant ?? 'Unknown').trim() || 'Unknown';
  const category = String(raw.category ?? 'Others').trim() || 'Others';
  const channel = String(raw.channel ?? 'SMS').trim() || 'SMS';
  const summary = String(raw.summary ?? `${channel} • ${merchant}`).trim();
  return { merchant, category, channel, summary, aiUsed: true };
};

const aiStore = () => useAiStore.getState();

const setStatusOk = () => aiStore().setStatus('ok');
const setStatusLimited = (message?: string) => aiStore().setStatus('limited', message);
const setStatusError = (message?: string) => aiStore().setStatus('error', message);

const getCached = async (cacheId: string): Promise<AiSmsResult | null> => {
  const result = await db.executeAsync(
    `SELECT merchant, category, channel, summary, ai_used FROM sms_ai_cache WHERE id = ? LIMIT 1`,
    [cacheId]
  );
  const rows = result.results ?? [];
  if (!rows.length) return null;
  const row = rows[0] as CachedRow;
  if (!row.summary && !row.merchant) return null;
  return {
    merchant: row.merchant ?? 'Unknown',
    category: row.category ?? 'Others',
    channel: row.channel ?? 'SMS',
    summary: row.summary ?? 'SMS • Unknown',
    aiUsed: Boolean(row.ai_used),
  };
};

const saveCached = async (cacheId: string, result: AiSmsResult) => {
  const now = new Date().toISOString();
  await db.executeAsync(
    `INSERT OR REPLACE INTO sms_ai_cache (id, merchant, category, channel, summary, ai_used, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      cacheId,
      result.merchant,
      result.category,
      result.channel,
      result.summary,
      result.aiUsed ? 1 : 0,
      now,
    ]
  );
};

const buildPrompt = (smsText: string) => `
Extract a clean transaction summary from this SMS. Return ONLY JSON with keys:
merchant, category, channel, summary.
Category must be one of: Food, Transport, Shopping, Groceries, Subscriptions, Utilities, Travel, Health, Education, Entertainment, Bills, Transfers, Cash, Others.
Channel must be one of: UPI, CARD, BANK, ATM, CASH, WALLET, SMS.
Summary should be short (6-10 words), no emojis, no AI mention.
SMS: """${smsText}"""
`;

const callGemini = async (model: string, smsText: string) => {
  if (!AI_KEYS.GOOGLE_API_KEY) return null;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${AI_KEYS.GOOGLE_API_KEY}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ role: 'user', parts: [{ text: buildPrompt(smsText) }] }],
      generationConfig: { temperature: 0.2, maxOutputTokens: 160 },
    }),
  });
  if (res.status === 429) {
    setStatusLimited('Gemini rate limit');
    return null;
  }
  if (!res.ok) {
    setStatusError(`Gemini error ${res.status}`);
    return null;
  }
  const json = await res.json();
  const text = json?.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
  const parsed = parseJsonFromText(text);
  const normalized = normalizeAiResult(parsed);
  if (normalized) setStatusOk();
  return normalized;
};

const callGroq = async (smsText: string) => {
  if (!AI_KEYS.GROQ_API_KEY) return null;
  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${AI_KEYS.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      messages: [
        {
          role: 'system',
          content:
            'You are a finance SMS parser. Return only strict JSON with keys: merchant, category, channel, summary.',
        },
        { role: 'user', content: buildPrompt(smsText) },
      ],
      temperature: 0.2,
      max_tokens: 160,
    }),
  });
  if (res.status === 429) {
    setStatusLimited('Groq rate limit');
    return null;
  }
  if (!res.ok) {
    setStatusError(`Groq error ${res.status}`);
    return null;
  }
  const json = await res.json();
  const text = json?.choices?.[0]?.message?.content ?? '';
  const parsed = parseJsonFromText(text);
  const normalized = normalizeAiResult(parsed);
  if (normalized) setStatusOk();
  return normalized;
};

export const shouldUseAi = (txn: Omit<Transaction, 'id' | 'createdAt'>) => {
  const merchant = txn.merchant?.toLowerCase() ?? 'unknown';
  if (merchant === 'unknown' || merchant.length <= 2) return true;
  if (txn.category === 'Others') return true;
  if (!txn.summary) return true;
  return false;
};

export const enrichSmsTransaction = async (
  txn: Omit<Transaction, 'id' | 'createdAt'>,
  smsText: string,
  allowAi: boolean
): Promise<Omit<Transaction, 'id' | 'createdAt'>> => {
  if (!allowAi || !shouldUseAi(txn)) {
    return { ...txn, aiUsed: false };
  }

  const cacheId = getCacheKey(smsText);
  const cached = await getCached(cacheId);
  if (cached) {
    return {
      ...txn,
      merchant: cached.merchant,
      category: cached.category,
      channel: cached.channel,
      summary: cached.summary,
      aiUsed: cached.aiUsed,
    };
  }

  for (const model of GEMINI_MODELS) {
    const result = await callGemini(model, smsText);
    if (result) {
      await saveCached(cacheId, result);
      return {
        ...txn,
        merchant: result.merchant,
        category: result.category,
        channel: result.channel,
        summary: result.summary,
        aiUsed: true,
      };
    }
  }

  const groqResult = await callGroq(smsText);
  if (groqResult) {
    await saveCached(cacheId, groqResult);
    return {
      ...txn,
      merchant: groqResult.merchant,
      category: groqResult.category,
      channel: groqResult.channel,
      summary: groqResult.summary,
      aiUsed: true,
    };
  }

  return { ...txn, aiUsed: false };
};
