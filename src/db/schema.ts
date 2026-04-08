import { db } from './database';

const safeExec = async (sql: string, params: any[] = []) => {
  try {
    await db.executeAsync(sql, params);
  } catch {
    // Ignore migration errors for columns/tables that already exist.
  }
};

export const initDB = async () => {
  await db.executeAsync(`
    CREATE TABLE IF NOT EXISTS transactions (
      id TEXT PRIMARY KEY,
      amount REAL,
      merchant TEXT,
      category TEXT,
      channel TEXT,
      summary TEXT,
      ai_used INTEGER,
      date TEXT,
      created_at TEXT,
      source TEXT,
      raw_text TEXT,
      is_recurring INTEGER
    );
  `);

  await db.executeAsync(`
    CREATE TABLE IF NOT EXISTS rules (
      id TEXT PRIMARY KEY,
      pattern TEXT,
      merchant TEXT,
      category TEXT
    );
  `);

  await db.executeAsync(`
    CREATE TABLE IF NOT EXISTS categories (
      id TEXT PRIMARY KEY,
      name TEXT,
      icon TEXT
    );
  `);

  await db.executeAsync(`
    CREATE TABLE IF NOT EXISTS insights (
      id TEXT PRIMARY KEY,
      type TEXT,
      title TEXT,
      body TEXT,
      meta TEXT,
      tag TEXT,
      message TEXT,
      created_at TEXT
    );
  `);

  await db.executeAsync(`
    CREATE TABLE IF NOT EXISTS recurring_patterns (
      id TEXT PRIMARY KEY,
      merchant TEXT,
      amount REAL,
      frequency TEXT,
      last_detected TEXT
    );
  `);

  await db.executeAsync(`
    CREATE TABLE IF NOT EXISTS sms_ai_cache (
      id TEXT PRIMARY KEY,
      merchant TEXT,
      category TEXT,
      channel TEXT,
      summary TEXT,
      ai_used INTEGER,
      updated_at TEXT
    );
  `);

  await safeExec(`ALTER TABLE transactions ADD COLUMN channel TEXT;`);
  await safeExec(`ALTER TABLE transactions ADD COLUMN summary TEXT;`);
  await safeExec(`ALTER TABLE transactions ADD COLUMN ai_used INTEGER;`);
  await safeExec(`ALTER TABLE recurring_patterns ADD COLUMN last_detected TEXT;`);
  await safeExec(`ALTER TABLE insights ADD COLUMN title TEXT;`);
  await safeExec(`ALTER TABLE insights ADD COLUMN body TEXT;`);
  await safeExec(`ALTER TABLE insights ADD COLUMN meta TEXT;`);
  await safeExec(`ALTER TABLE insights ADD COLUMN tag TEXT;`);
};
