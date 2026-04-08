import { addTransactionsIfMissing } from './transactionService';
import { parseSmsToTransaction } from './parserService';
import { enrichSmsTransaction } from './aiSmsService';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const SmsAndroid = require('react-native-get-sms-android');

export const readSmsAndIngest = async (maxCount = 50, maxAiCalls = 10) => {
  return new Promise<{ count: number; skipped: number }>((resolve, reject) => {
    const filter = {
      box: 'inbox',
      maxCount,
    };

    SmsAndroid.list(
      JSON.stringify(filter),
      (fail: any) => reject(fail),
      async (_count: number, smsList: string) => {
        const messages = JSON.parse(smsList) as Array<{ body: string; date: number }>;
        let count = 0;
        let skipped = 0;
        const batch = [];
        let remainingAi = maxAiCalls;
        for (const sms of messages) {
          const parsed = parseSmsToTransaction(sms);
          if (!parsed) {
            skipped += 1;
            continue;
          }
          const allowAi = remainingAi > 0;
          const enriched = await enrichSmsTransaction(parsed, sms.body, allowAi);
          if (enriched.aiUsed) remainingAi -= 1;
          batch.push(enriched);
        }
        if (batch.length > 0) {
          const inserted = await addTransactionsIfMissing(batch);
          count = inserted.length;
          skipped += batch.length - inserted.length;
        }
        resolve({ count, skipped });
      }
    );
  });
};
