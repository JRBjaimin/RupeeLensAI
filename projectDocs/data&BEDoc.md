# 🚀 RupeeLens AI — Data & Backend Architecture Documentation

---

# 🧠 1. SYSTEM OVERVIEW

## 🎯 Goal:

Convert raw financial data → structured data → insights → UI

---

## 🔁 Data Flow:

```plaintext
SMS / Email / Manual Input
        ↓
Parsing Engine
        ↓
Database (SQLite)
        ↓
Logic Engine (Insights)
        ↓
UI (Dashboard / Insights / Transactions)
```

---

# 📥 2. DATA SOURCES

---

## 🔹 2.1 SMS DATA (ANDROID)

### 📌 What you read:

* Bank alerts
* UPI transactions
* Card payments

---

### ⚙️ Implementation:

* Use Android permission:

```plaintext
READ_SMS
```

---

### 📦 Flow:

```plaintext
Read SMS → Filter financial messages → Parse → Store
```

---

### 🧠 Example SMS:

```plaintext
₹500 spent on Swiggy using HDFC card
```

---

### Extract:

* amount = 500
* merchant = Swiggy
* category = Food

---

---

## 🔹 2.2 EMAIL DATA (GMAIL)

---

### ⚙️ Setup:

* Gmail API
* OAuth login

---

### 📦 Flow:

```plaintext
User connects Gmail
        ↓
Fetch emails with keywords:
("order", "payment", "invoice")
        ↓
Parse content
        ↓
Store transactions
```

---

### 🧠 Example Email:

```plaintext
Your order of ₹799 from Amazon has been confirmed
```

---

---

## 🔹 2.3 MANUAL INPUT (MVP PRIMARY)

---

### 📦 Flow:

```plaintext
User enters data → Save → DB
```

---

---

# 🧠 3. PARSING ENGINE (CORE SYSTEM)

---

## 🎯 Purpose:

Convert raw text → structured transaction

---

## 🔹 Approach:

### Step 1: Clean text

```ts
removeSymbols()
normalizeText()
```

---

### Step 2: Extract fields

```ts
amount = extractAmount(text)
merchant = detectMerchant(text)
```

---

### Step 3: Apply rules

```ts
if (text.includes("swiggy")) → category = "Food"
```

---

---

## 🔥 RULES TABLE (VERY IMPORTANT)

```sql
CREATE TABLE rules (
  id TEXT PRIMARY KEY,
  pattern TEXT,
  merchant TEXT,
  category TEXT
);
```

---

💥 This becomes your **learning system**

---

---

# 🗄️ 4. DATABASE DESIGN (SQLITE)

---

## 🔹 4.1 transactions

```sql
CREATE TABLE transactions (
  id TEXT PRIMARY KEY,
  amount REAL,
  merchant TEXT,
  category TEXT,
  date TEXT,
  source TEXT,
  raw_text TEXT,
  is_recurring INTEGER
);
```

---

## 🔹 4.2 categories

```sql
CREATE TABLE categories (
  id TEXT PRIMARY KEY,
  name TEXT,
  icon TEXT
);
```

---

## 🔹 4.3 insights

```sql
CREATE TABLE insights (
  id TEXT PRIMARY KEY,
  type TEXT,
  message TEXT,
  created_at TEXT
);
```

---

## 🔹 4.4 recurring_patterns

```sql
CREATE TABLE recurring_patterns (
  id TEXT PRIMARY KEY,
  merchant TEXT,
  amount REAL,
  frequency TEXT
);
```

---

---

# 🔌 5. SERVICE / API LAYER (IMPORTANT)

👉 Even if local app, create **service layer**

---

## 🔹 Transaction Service

```ts
getAllTransactions()
addTransaction()
getByDateRange()
```

---

---

## 🔹 Insight Service

```ts
generateInsights(transactions)
```

---

---

## 🔹 Parser Service

```ts
parseSMS(text)
parseEmail(text)
```

---

---

# 🧠 6. INSIGHT ENGINE

---

## 🎯 Input:

transactions[]

---

## 🔹 Step 1: Aggregation

```ts
groupByCategory()
monthlyComparison()
```

---

## 🔹 Step 2: Rules

```ts
if (foodIncrease > 20%) → warning
if (subscriptions > 3) → alert
```

---

## 🔹 Step 3: Output

```ts
insights[]
```

---

---

# 🤖 7. AI INTEGRATION (OPTIONAL)

---

## 🎯 Use only for:

* wording
* suggestions

---

## Example:

```plaintext
Input: Food increased 20%
Output: "You spent 20% more on food this month"
```

---

---

# 📱 8. SCREEN INTEGRATION

---

## 🏠 Dashboard

### Uses:

* total spend
* category split
* top insight

---

## 📄 Transactions

### Uses:

```ts
getAllTransactions()
```

---

## 🧠 Insights

### Uses:

```ts
generateInsights()
```

---

## 🧠 Intelligence Feed

### Uses:

* detailed insights
* suggestions

---

## ⚙️ Profile

### Uses:

* permissions
* source status

---

---

# 🔄 9. STATE MANAGEMENT

---

## Recommended:

* Zustand OR Context API

---

## Example:

```ts
transactions: []
addTransaction()
loadTransactions()
```

---

---

# 🔐 10. PRIVACY

---

* Store data locally
* No external sharing (MVP)
* User controls access

---

---

# ⚠️ 11. RISKS

---

* SMS format variation
* Email parsing complexity
* Permission denial

---

---

# 🚀 12. DEVELOPMENT PLAN

---

## Phase 1:

* DB setup
* Manual input
* UI connection

---

## Phase 2:

* SMS parsing

---

## Phase 3:

* Email parsing

---

## Phase 4:

* AI integration

---

---

# 🏁 FINAL ARCHITECTURE

```plaintext
Input (SMS/Email/Manual)
        ↓
Parser
        ↓
Database
        ↓
Logic Engine
        ↓
Insights
        ↓
UI
```

---
