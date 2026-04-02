
📱** RupeeLens AI — Screen & Navigation Documentation**

🧭** 1. Navigation Overview**

**Primary Navigation:**

* Bottom Tab Bar (floating, glass style)
* No sidebar

**Tabs:**

1. Dashboard
2. Transactions
3. Insights
4. Profile

🎨** Bottom Bar Behavior**

* Floating pill-shaped container
* Semi-transparent background
* Active tab:
  * Rounded capsule background
  * Icon + label
  * Subtle glow
* Inactive tab:
  * Icon only
  * Dim color

🏠** 2. Dashboard Screen**

🎯** Purpose:**

Give user instant understanding of spending

🧩** Sections:**

**1. Hero Card (Top)**

* Total monthly spend (₹XXXX)
* Comparison:
  * “↑ 12% from last month”
* Optional: mini trend indicator

**2. Quick Insight (Primary Highlight)**

* 1–2 key insights
* Examples:
  * “Food spending increased by 20%”
  * “Late-night spending detected”

**3. Category Overview**

* Top 3 categories:
  * Food 🍔
  * Shopping 🛒
  * Bills 💡

Each card shows:

* Amount
* Percentage

**4. Recent Transactions Preview**

* Last 3–5 transactions
* “View All” button → Transactions screen

📄** 3. Transactions Screen**

🎯** Purpose:**

Detailed transaction tracking

🧩** Sections:**

**1. Filter Bar**

* Time filters:
  * Today / Week / Month
* Category filter (Phase 2)

**2. Transaction List**

Each item includes:

* Merchant name
* Amount
* Category icon
* Date

**3. Empty State**

* “No transactions yet”
* Suggest adding manually

**4. Search (Future)**

* Search by merchant

🧠** 4. Insights Screen (Core Feature)**

🎯** Purpose:**

Show intelligence, not raw data

🧩** Sections:**

**1. Highlight Insight (Top Card)**

* Most important insight of the period

**2. Insight Cards List**

Examples:

* “Food spending increased 20%”
* “3 subscriptions detected”
* “You can save ₹1800/month”

**3. Savings Suggestions**

* Actionable recommendations:
  * Reduce category spending
  * Detect waste

**4. Insight Types**

* Trend (increase/decrease)
* Warning (overspending)
* Opportunity (saving)

⚙️** 5. Profile / Settings Screen**

🎯** Purpose:**

User control + trust

🧩** Sections:**

**1. Permissions**

* SMS access
* Email access

**2. Data Sources**

* SMS status
* Gmail connection

**3. Privacy Controls**

* Local storage info
* Delete all data

**4. App Settings**

* Theme (future)
* Notifications (future)

**5. Subscription (Future)**

* Upgrade to premium

➕** 6. Add Expense (Modal / Floating Action)**

🎯** Purpose:**

Manual data entry (MVP critical)

**Trigger:**

* Floating “+” button

**Fields:**

* Amount
* Category
* Merchant (optional)
* Date

**Actions:**

* Save
* Cancel

🔄** 7. User Flow**

1. User opens app
2. Lands on Dashboard
3. Sees:
   * total spend
   * key insight
4. Navigates:
   * Transactions → details
   * Insights → deeper analysis

🎨** 8. UI Principles**

* Minimal UI
* Card-based layout
* Dark premium theme
* Glassmorphism elements
* Focus on insights, not clutter

⚠️** 9. What NOT to Include (MVP)**

* Too many tabs
* Complex charts
* Social features
* Multi-account sync

🏁** Final UX Goal**

User should feel:

“Now I understand where my money is going”

Not:

“This is complicated”
