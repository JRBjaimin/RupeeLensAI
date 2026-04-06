# RupeeLens Gmail Backend (Phase 4)

## Setup
1. Create a Google Cloud project and OAuth client (Web application).
2. Add the redirect URI: `http://localhost:8787/auth/google/callback`.
3. Copy `.env.example` to `.env` and fill in the values.

## Run
```sh
npm install
npm run dev
```

## Authorize Gmail
Visit:
```
http://localhost:8787/auth/google
```
This will store a refresh token in `.tokens.json` (kept local).

## Sync
Send a POST request:
```
POST http://localhost:8787/gmail/sync
{
  "days": 30,
  "maxResults": 50
}
```

The response contains parsed transactions ready for the app to ingest.
