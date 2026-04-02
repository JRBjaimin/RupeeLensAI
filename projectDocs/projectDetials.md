**Product : RupeeLens AI**

🚀** Product Documentation**

🧠** 1. Vision**

**RupeeLens AI** is a privacy-first financial intelligence app that automatically collects user spending data from multiple sources (SMS, Email, PDFs) and uses AI to provide actionable insights, detect money leaks, and improve financial behavior.

“See where your money actually goes — and fix it.”

🎯** 2. Problem Statement**

Users today:

* Don’t know where their money goes
* Use multiple platforms (UPI, Swiggy, Amazon, subscriptions)
* Cannot track recurring payments
* Miss hidden expenses

Existing apps:

* Only track manually
* Or show basic charts
* No real intelligence or behavioral insights

💡** 3. Solution Overview**

RupeeLens AI:

* Aggregates financial data automatically
* Structures messy data into usable format
* Uses AI to generate insights and suggestions

⚙️** 4. Core Features (MVP)**

🔹** 4.1 SMS Parsing Engine**

* Read transaction SMS (Android)
* Extract:
  * Amount
  * Merchant
  * Date

🔹** 4.2 Email Integration (Gmail)**

* OAuth login
* Parse emails:
  * Orders
  * Payment confirmations
* Extract structured data

🔹** 4.3 Transaction Engine**

* Normalize all inputs into:

  {
* **  **"amount": 499,
* **  **"merchant": "Swiggy",
* **  **"category": "Food",
* **  **"date": "2026-03-30"
* }
* 

🔹** 4.4 Categorization System**

* Rule-based mapping:
  * Swiggy → Food
  * Amazon → Shopping
  * Netflix → Subscription

🔹** 4.5 Recurring Detection**

* Identify:
  * Same merchant
  * Same amount
  * Monthly pattern

🔹** 4.6 AI Insight Engine**

* Behavior analysis:
  * Spending trends
  * Category spikes
* Suggestions:
  * “Reduce food orders by 20% → save ₹X”

🔹** 4.7 Dashboard**

* Monthly spend summary
* Category breakdown
* Alerts

🏗️** 5. System Architecture**

🔹** Input Layer**

* SMS Reader
* Gmail API
* (Future: PDF Upload)

🔹** Processing Layer**

* Text cleaning
* Regex extraction
* Data normalization

🔹** Storage Layer**

* Local DB (SQLite)

🔹** Intelligence Layer**

* Rule engine
* Pattern detection

🔹** AI Layer**

* Insight generation
* Recommendation engine

🛠️** 6. Tech Stack**

**Frontend:**

* React / React Native

**Backend:**

* Node.js

**Database:**

* SQLite (local-first)

**AI:**

* Local models via Ollama OR minimal API usage

**Integrations:**

* Gmail API

🔐** 7. Privacy & Security**

* All sensitive data stored locally
* No financial data sent to server (MVP)
* Clear permission system
* User-controlled access

📊** 8. Data Flow**

1. User connects SMS / Gmail
2. Raw data fetched
3. Parser extracts structured data
4. Stored in DB
5. AI processes patterns
6. Insights displayed

💰** 9. Monetization Strategy**

**Free Tier:**

* Basic tracking
* Limited insights

**Premium:**

* AI insights
* Alerts
* Subscription detection

Pricing:

* ₹149–₹299/month

🚀** 10. MVP Scope (STRICT)**

Include:

* SMS parsing
* Email parsing
* Basic dashboard
* Simple AI insights

Exclude:

* PDF parsing
* Advanced ML
* Multi-device sync

⚠️** 11. Challenges & Risks**

* SMS format variations
* Email parsing inconsistency
* Privacy concerns
* Data accuracy

🧠** 12. Competitive Advantage**

* Multi-source aggregation
* India-first design
* AI behavioral insights
* Privacy-first architecture

📈** 13. Future Roadmap**

* PDF bank statement parsing
* Investment tracking
* Credit card analysis
* Smart budgeting AI
* Cross-device sync

💡** 14. Tagline Options**

* “Track less. Understand more.”
* “Your money, decoded.”
* “Stop guessing. Start knowing.”

🧩** 15. MVP Success Criteria**

* 100 active users
* Accurate transaction parsing (>80%)
* Users check app weekly
* Positive feedback on insights

🏁** Conclusion**

RupeeLens AI is not just an expense tracker — it is a **financial intelligence layer** that turns raw transaction data into meaningful, actionable insights.
