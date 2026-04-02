import { addTransaction } from './transactionService';
import { parseSmsToTransaction } from './parserService';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const SmsAndroid = require('react-native-get-sms-android');

export const readSmsAndIngest = async (maxCount = 50) => {
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
        for (const sms of messages) {
          const parsed = parseSmsToTransaction(sms);
          if (!parsed) {
            skipped += 1;
            continue;
          }
          await addTransaction(parsed);
          count += 1;
        }
        resolve({ count, skipped });
      }
    );
  });
};
