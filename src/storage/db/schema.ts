export const schema = {
  transactions: `CREATE TABLE IF NOT EXISTS transactions (
  id TEXT PRIMARY KEY,
  amount REAL,
  merchant TEXT,
  category TEXT,
  date TEXT,
  time TEXT,
  source TEXT,
  raw_text TEXT,
  is_recurring INTEGER,
  created_at TEXT
);`,
  categories: `CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY,
  name TEXT,
  icon TEXT,
  color TEXT
);`,
  rules: `CREATE TABLE IF NOT EXISTS rules (
  id TEXT PRIMARY KEY,
  pattern TEXT,
  merchant TEXT,
  category TEXT
);`,
  recurring_patterns: `CREATE TABLE IF NOT EXISTS recurring_patterns (
  id TEXT PRIMARY KEY,
  merchant TEXT,
  amount REAL,
  frequency TEXT,
  last_detected TEXT
);`,
  insights: `CREATE TABLE IF NOT EXISTS insights (
  id TEXT PRIMARY KEY,
  type TEXT,
  message TEXT,
  created_at TEXT
);`,
};
