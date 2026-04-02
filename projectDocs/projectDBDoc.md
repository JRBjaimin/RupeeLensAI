 🗄️📊** DATABASE RELATIONSHIP GRAPH**

**                        **┌───────────────┐

**                        **│ **  **categories**  **│

**                        **├───────────────┤

**                        **│ id (PK) **      **│

**                        **│ name**          **│

**                        **│ icon**          **│

**                        **│ color **        **│

**                        **└──────┬────────┘

**                               **│

**                               **│ (category name)

**                               **│

┌──────────────────────────────▼──────────────────────────────┐

│**                      **transactions **                  **│

├─────────────────────────────────────────────────────────────┤

│ id (PK) **                                                    **│

│ amount**                                                      **│

│ merchant**                                                    **│

│ category**                                                    **│

│ date**                                                        **│

│ time**                                                        **│

│ source (sms/email/manual) **                                  **│

│ raw_text**                                                    **│

│ is_recurring**                                                **│

│ created_at**                                                  **│

└───────────────┬───────────────────────────────┬─────────────┘

**                **│ **                              **│

**                **│ **                              **│

**                **│ **                              **│

**      **┌─────────▼──────────┐ **        **┌──────────▼────────────┐

**      **│ recurring_patterns │ **        **│ **      **insights**        **│

**      **├────────────────────┤ **        **├───────────────────────┤

**      **│ id (PK)**            **│ **        **│ id (PK) **              **│

**      **│ merchant **          **│ **        **│ type**                  **│

**      **│ amount **            **│ **        **│ message **              **│

**      **│ frequency**          **│ **        **│ created_at**            **│

**      **│ last_detected**      **│ **        **└───────────────────────┘

**      **└────────────────────┘

┌───────────────────────────────┐

│**            **rules**              **│

├───────────────────────────────┤

│ id (PK) **                      **│

│ pattern (regex/keyword) **      **│

│ merchant**                      **│

│ category**                      **│

└───────────────┬───────────────┘

**                **│

**                **│ (used during parsing)

**                **▼

**        **transactions

🧠** HOW TO READ THIS (IMPORTANT)**

🔹** 1. ****transactions**** = CENTER OF EVERYTHING**

👉 This is your **main table**

Everything connects to it:

* categories → classify it
* rules → create it
* insights → analyze it
* recurring → detect patterns

🔹** 2. ****rules**** → feeds transactions**

SMS → rules → transactions

Example:

* SMS: “₹299 Swiggy”
* Rule: swiggy → Food
* Output → transaction stored

💥 This is your **core engine**

🔹** 3. ****categories**** → classification layer**

👉 You don’t hardcode categories

Instead:

* Keep them flexible
* Easily editable

**🔹**** 4. ****recurring_patterns**

👉 Derived from transactions

Logic:

Same merchant + same amount + interval → recurring

**🔹**** 5. ****insights**

👉 Generated from transactions

Example:

* “Food spending ↑ 20%”

🔁** DATA FLOW VISUAL**

SMS / Email

**   **↓

rules (pattern match)

**   **↓

transactions (stored)

**   **↓

recurring detection

**   **↓

insights generation

⚙️** SIMPLE RELATION LOGIC**

| **From**             | **To**   | **Type** |
| --------------------------| -------------- | -------------- |
| rules → transactions      | creation       | logic          |
| transactions → categories | classification | soft link      |
| transactions → recurring  | pattern        | derived        |
| transactions → insights   | analysis       | derived        |

🧠** IMPORTANT DESIGN CHOICE**

👉 Notice:

* No heavy foreign keys
* No complex joins

💥 Why?

* SQLite (mobile) → keep it simple
* Faster queries
* Easier debugging

🔥** YOUR CORE ADVANTAGE**

👉 Not AI

👉 Not UI

💥 It is:

**rules + transactions + clean data pipeline**

🚀** NEXT STEP**

Now you should:

👉 Create DB

👉 Insert dummy transactions

👉 Test parsing

If you want next:

👉 I can give **visual UI flow connected with DB**

👉 Or **real query examples (important)**

Just say **👍**
