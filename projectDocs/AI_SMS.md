# AI SMS Parsing (Phase 4 - Design Doc)

## Goal
Convert raw SMS text into clear, human-readable expense entries with minimal AI usage:
- Merchant
- Amount
- Category
- Channel (UPI / CARD / BANK / CASH)
- Readable summary (one line)

## Non-Goals (for now)
- Gmail parsing flow (on hold)
- Full ML categorization for every merchant
- Real-time sync on every SMS (batch only)

## Current State (Code)
- Android-only SMS access via `react-native-get-sms-android`
- Parsing is rule-based in `src/services/parserService.ts`
- Transactions saved to SQLite and listed in `TransactionsScreen`

## Proposed AI-Assisted Flow
### 1) Rule-Based First (cheap + fast)
Use regex + keyword rules to extract:
- amount
- channel
- merchant candidate
- debit vs credit

If confidence is high, skip AI entirely.

### 2) AI Fallback (only when needed)
Call AI only when:
- merchant is unknown OR
- summary is unclear OR
- category is "Others"

### 3) AI Provider Priority
Use Gemini models in this order:
1. `gemini-2.5-flash`
2. `gemini-flash-latest`
If both fail or quota is exhausted, fallback to GROQ.

### 4) Quota Control
Rules to limit usage:
- Max 1 AI call per SMS
- No hard daily cap (free tier), but keep calls minimal
- Cache AI results by SMS hash (raw_text)
- Skip AI when rule-based output is already clear

## AI Prompt Output (strict JSON)
AI should return a structured object:
```
{
  "merchant": "Amazon",
  "category": "Shopping",
  "channel": "CARD",
  "summary": "CARD • Amazon"
}
```
No AI mention in summary text. Summary stays short and readable.

## Data Handling
- No sensitive data should be logged.
- Store only derived fields in DB.
- Raw SMS should remain local.

## Caching Strategy
- Create `sms_ai_cache` table:
  - id (hash of sms body)
  - summary
  - merchant
  - category
  - channel
  - created_at
- Before AI call, check cache.

## Android vs iOS
- Android: full SMS read + AI conversion
- iOS: no SMS access (by Apple policy)

## UX Requirements
- If AI is used, show a small "AI" pill on the transaction row
- If AI fails, show a generic rule-based summary with no AI badge
- Profile should show AI quota status (OK / LIMITED / ERROR / UNKNOWN)

## Implementation Plan
1. Add AI service layer with provider priority (Gemini -> Groq).
2. Add cache table + cache lookup.
3. Update SMS parse flow:
   - rule-based parse
   - fallback to AI only when needed
4. Update UI display to use `summary`.

## Required Env Keys
- `GOOGLE_API_KEY`
- `GROQ_API_KEY`

## Risks
- Quota exhaustion if AI is called too frequently
- Wrong merchant mapping if AI hallucinates
- Latency spikes (use async + cache)

## Decisions
- All parsing runs on-device (no backend).
- Free tier only, no hard daily cap.
- If AI fails, show generic summary (no AI label).
- Show AI badge only when AI was used.
