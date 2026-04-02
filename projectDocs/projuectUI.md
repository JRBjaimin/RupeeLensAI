**Product + UI/UX + Technical Documentation**

🧠** 1. Product Overview**

**RupeeLens AI** is a privacy-first financial intelligence app that aggregates user spending data (SMS, Email, etc.) and provides AI-powered insights to help users understand and improve their financial behavior.

“Your money, decoded.”

🎯** 2. Product Principles**

* Clarity over complexity
* Insights over raw data
* Privacy-first architecture
* Minimal but premium UI
* Daily usability (habit-forming)

🧭** 3. Navigation System**

🔹** Primary Navigation: Bottom Tab Bar**

* No sidebar (outdated UX)
* Floating bottom bar (modern fintech style)
* Glassmorphism design (blur + transparency)

🔹** Tabs (Final)**

[ Dashboard ] [ Transactions ] [ Insights ] [ Profile ]

🎨** Bottom Bar Design**

* Floating (not attached to edge)
* Rounded pill shape
* Blur background (glass effect)
* Active tab glow
* Icon-first (minimal text)

📱** 4. Screen Architecture**

🏠** 4.1 Dashboard Screen**

🎯** Goal:**

Understand spending in < 3 seconds

🔹** Sections**

**1. Hero Card (Top)**

* Total monthly spend (₹XXXX)
* Comparison:
  * “↑ 12% from last month”

**2. Quick Insights (USP)**

* 1–2 key insights:
  * “Food spending increased 20%”
  * “Late-night spending detected”

**3. Category Cards**

* Food 🍔
* Shopping 🛒
* Bills 💡

Each shows:

* Amount
* Percentage

**4. Recent Transactions Preview**

* Last 3–5 entries
* “View All” → Transactions

📄** 4.2 Transactions Screen**

🎯** Goal:**

Detailed financial tracking

🔹** Sections**

**1. Filter Bar**

* Today / Week / Month
* Category filter

**2. Transaction List**

Each item:

* Merchant name
* Amount
* Category icon
* Date

**3. Search (Phase 2)**

* Search by merchant

🧠** 4.3 Insights Screen**

🎯** Goal:**

Deliver intelligence (core differentiator)

🔹** Sections**

**1. Highlight Insight (Top)**

* Most important insight

**2. Insight Cards**

* Spending trends
* Behavior patterns
* Subscription alerts

**3. Savings Opportunities**

Example:

“Reduce food orders → save ₹1800/month”

⚙️** 4.4 Profile / Settings**

🎯** Goal:**

Control + trust

🔹** Sections**

**1. Permissions**

* SMS access
* Email access

**2. Data Sources**

* Connected Gmail
* SMS status

**3. Privacy Controls**

* Local storage toggle
* Delete all data

**4. Subscription (Future)**

* Premium upgrade

➕** 4.5 Floating Action (Optional)**

**“Add Expense”**

* Floating button (+)
* Opens modal:
  * Amount
  * Category

🎨** 5. UI Design System**

🌑** Theme: Dark Premium (CRED Inspired)**

**Colors:**

* Background:
  * #0B0F1A
  * #121826
* Accent:
  * #6C5CE7 (Purple)
  * #00D4FF (Blue)
* Semantic:
  * Green → savings
  * Red → overspending

🧊** Glassmorphism Style**

* Blur background
* Transparent cards
* Soft borders
* Rounded corners

🧩** Core Components**

**1. Glass Card**

* Reusable base component

**2. Hero Card**

* Large, attention-grabbing

**3. Insight Card**

* Highlighted + subtle glow

**4. Transaction Item**

* Clean list item

✨** Micro Interactions**

* Smooth transitions
* Slight scale on press
* Subtle glow animations

🏗️** 6. Technical Architecture**

🔹** Input Layer**

* SMS Reader
* Gmail API
* (Future: PDF upload)

🔹** Processing Layer**

* Text cleaning
* Regex parsing
* Data normalization

🔹** Storage Layer**

* SQLite (local-first)

🔹** Intelligence Layer**

* Categorization rules
* Recurring detection

🔹** AI Layer**

* Behavior analysis
* Insight generation

🧩** 7. Database Schema**

**transactions**

CREATE TABLE transactions (

**  **id TEXT PRIMARY KEY,

**  **amount REAL,

**  **merchant TEXT,

**  **category TEXT,

**  **date TEXT,

**  **source TEXT,

**  **is_recurring BOOLEAN

);

**insights**

CREATE TABLE insights (

**  **id TEXT PRIMARY KEY,

**  **message TEXT,

**  **created_at TEXT

);

🔌** 8. Data Pipeline**

SMS / Email → Parser → Structured Data → DB → AI Insights → UI

🔍** 9. Parsing System**

**SMS Parsing:**

* Regex-based extraction
* Pattern detection

**Email Parsing:**

* Gmail API
* Keyword filtering

🔁** 10. Recurring Detection**

Criteria:

* Same merchant
* Same amount
* Monthly pattern

🧠** 11. AI Insight Engine**

**Outputs:**

* Spending trends
* Behavior analysis
* Suggestions

**Example:**

“Food spending increased 25% this week”

🔐** 12. Privacy & Security**

* Local data storage
* No financial data sent externally (MVP)
* User-controlled permissions

💰** 13. Monetization**

**Free:**

* Basic tracking

**Premium:**

* AI insights
* Alerts
* Advanced analytics

Pricing:

* ₹149–₹299/month

🚀** 14. MVP Scope**

**Include:**

* SMS parsing
* Basic UI
* Transaction storage
* Simple insights

**Exclude:**

* PDF parsing
* Advanced AI
* Cloud sync

⚠️** 15. Risks**

* SMS format variations
* Email inconsistency
* User trust issues

📈** 16. Future Roadmap**

* Email parsing
* PDF statements
* Investment tracking
* Smart budgeting

🏁** Final Vision**

RupeeLens AI is not an expense tracker.

It is:

A **financial intelligence system** that helps users understand and improve their money habits.
