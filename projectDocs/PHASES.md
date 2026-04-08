# RupeeLens AI - Remaining Work & Phases

## Current Status (Completed)

- ~~Phase 1 foundation: SQLite schema/init, services, Zustand store, DB bootstrap.~~
- ~~Dashboard dynamic: total spend, insight text, recent transactions.~~
- ~~Transactions dynamic: filters, list, empty state.~~
- ~~Add Expense modal + header action wired to DB and store refresh.~~
- ~~Intelligence Feed screen built and navigable from Dashboard.~~
- ~~Styles + components refactor done (no inline components in screens).~~
- ~~Phase 2 input sources: SMS parsing (Android) + dynamic permissions/data sources.~~

## Remaining Work (From Docs)

1. ~~Navigation: Insights card tap -> Intelligence Feed.~~
2. ~~Dashboard: category cards (Food/Shopping/Bills) should be dynamic.~~
3. ~~Dashboard: “View All” should navigate to Transactions.~~
4. ~~Insights: list cards should be clickable to Intelligence Feed.~~
5. ~~Profile: make permissions + data sources dynamic (toggle states, source status).~~
6. ~~Add Expense: validate inputs + category picker (optional).~~
7. ~~SMS parsing (Phase 2)~~ and email parsing (Phase 4) per docs (started).
8. ~~Insight engine rules expansion (Phase 3) + persist insights in DB.~~

## Proposed Phases

### ~~Phase 1B: Dynamic UI Wiring (Completed)~~

- ~~Add Insights -> Intelligence Feed navigation.~~
- ~~Make Dashboard category split dynamic (group by category).~~
- ~~Hook “View All” to Transactions tab.~~
- ~~Convert Insights cards to use dynamic insight list.~~

### ~~Phase 2: Input Sources (Completed)~~

- ~~Integrate SMS parsing pipeline (Android only).~~
- ~~Add manual source status into Profile (mocked at first).~~
  - Note: iOS does not allow SMS access; SMS parsing is Android-only by platform policy.

### ~~Phase 3: Insight Engine Expansion (Completed)~~

- Rules engine (food spike, recurring detection).  
- Subscriptions module: intentionally paused (on hold).
- Store insights in DB and render from DB.

### Phase 4: Email Parsing (Backend) (In Progress)

- Add backend pipeline for Gmail API. (done: backend skeleton + Gmail sync endpoint)
- Sync insights back to app. (done: app Gmail sync + local insight refresh)
- Remaining:
  - App-side OAuth flow (in-app auth + secure token storage).
  - Deploy backend + configure production base URL.
  - Background/scheduled sync and error handling.

## Immediate Next Step Suggestion

~~Start Phase 3 (insight engine expansion + persistence).~~
