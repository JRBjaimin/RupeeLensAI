import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import {
  createOAuthClient,
  exchangeCodeForTokens,
  extractHeader,
  extractMessageBody,
  getAuthUrl,
  getAuthorizedGmail,
  getMessage,
  listMessages,
} from './gmailClient.js';
import { parseEmailToTransaction } from './parser.js';

const app = express();
const port = process.env.PORT || 8787;

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ ok: true, service: 'rupeelens-gmail', time: new Date().toISOString() });
});

app.get('/auth/google', (_req, res) => {
  const oauth2Client = createOAuthClient();
  const url = getAuthUrl(oauth2Client);
  res.redirect(url);
});

app.get('/auth/google/callback', async (req, res) => {
  const code = req.query.code;
  if (!code || typeof code !== 'string') {
    return res.status(400).send('Missing code');
  }
  try {
    const oauth2Client = createOAuthClient();
    await exchangeCodeForTokens(oauth2Client, code);
    return res.send('Gmail connected. You can close this window.');
  } catch (err) {
    return res.status(500).send(`Auth failed: ${err.message}`);
  }
});

app.post('/gmail/sync', async (req, res) => {
  try {
    const { gmail } = await getAuthorizedGmail();
    const userId = 'me';
    const days = Number(req.body?.days ?? 30);
    const maxResults = Number(req.body?.maxResults ?? 50);
    const defaultQuery = `newer_than:${days}d (payment OR paid OR invoice OR order)`;
    const query = req.body?.q || defaultQuery;

    const messages = await listMessages(gmail, userId, query, maxResults);
    const transactions = [];

    for (const msg of messages) {
      const detail = await getMessage(gmail, userId, msg.id);
      const payload = detail.payload;
      const body = extractMessageBody(payload);
      const subject = extractHeader(payload, 'Subject');
      const from = extractHeader(payload, 'From');
      const txn = parseEmailToTransaction({
        subject,
        from,
        body,
        snippet: detail.snippet ?? '',
        internalDate: detail.internalDate,
        messageId: msg.id,
      });
      if (txn) transactions.push(txn);
    }

    res.json({
      count: transactions.length,
      transactions,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`RupeeLens Gmail backend running on :${port}`);
});
