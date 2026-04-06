import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';

const tokenPath = path.resolve(process.cwd(), '.tokens.json');

const loadStoredTokens = () => {
  try {
    const raw = fs.readFileSync(tokenPath, 'utf8');
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

const saveTokens = (tokens) => {
  fs.writeFileSync(tokenPath, JSON.stringify(tokens, null, 2));
};

export const createOAuthClient = () => {
  const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI } = process.env;
  if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GOOGLE_REDIRECT_URI) {
    throw new Error('Missing GOOGLE_CLIENT_ID/GOOGLE_CLIENT_SECRET/GOOGLE_REDIRECT_URI');
  }
  return new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_REDIRECT_URI
  );
};

export const getAuthUrl = (oauth2Client) => {
  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: ['https://www.googleapis.com/auth/gmail.readonly'],
  });
};

export const exchangeCodeForTokens = async (oauth2Client, code) => {
  const { tokens } = await oauth2Client.getToken(code);
  if (!tokens.refresh_token) {
    // If no refresh token, keep the existing one (Google only returns it once).
    const existing = loadStoredTokens();
    if (existing?.refresh_token) {
      tokens.refresh_token = existing.refresh_token;
    }
  }
  saveTokens(tokens);
  return tokens;
};

export const getAuthorizedGmail = async () => {
  const oauth2Client = createOAuthClient();
  const stored = loadStoredTokens();
  const refreshToken = stored?.refresh_token ?? process.env.GOOGLE_REFRESH_TOKEN;

  if (!refreshToken) {
    throw new Error('Missing refresh token. Visit /auth/google to authorize.');
  }

  oauth2Client.setCredentials({ refresh_token: refreshToken });
  const gmail = google.gmail({ version: 'v1', auth: oauth2Client });
  return { gmail, oauth2Client };
};

export const listMessages = async (gmail, userId, query, maxResults) => {
  const res = await gmail.users.messages.list({
    userId,
    q: query,
    maxResults,
  });
  return res.data.messages ?? [];
};

export const getMessage = async (gmail, userId, id) => {
  const res = await gmail.users.messages.get({
    userId,
    id,
    format: 'full',
  });
  return res.data;
};

export const decodeBody = (data) => {
  if (!data) return '';
  const normalized = data.replace(/-/g, '+').replace(/_/g, '/');
  const buffer = Buffer.from(normalized, 'base64');
  return buffer.toString('utf8');
};

export const extractMessageBody = (payload) => {
  if (!payload) return '';
  if (payload.body?.data) return decodeBody(payload.body.data);
  const parts = payload.parts ?? [];
  for (const part of parts) {
    if (part.mimeType === 'text/plain' && part.body?.data) {
      return decodeBody(part.body.data);
    }
  }
  for (const part of parts) {
    if (part.parts?.length) {
      const nested = extractMessageBody(part);
      if (nested) return nested;
    }
  }
  for (const part of parts) {
    if (part.mimeType === 'text/html' && part.body?.data) {
      return decodeBody(part.body.data);
    }
  }
  return '';
};

export const extractHeader = (payload, name) => {
  const headers = payload?.headers ?? [];
  const match = headers.find((h) => h.name?.toLowerCase() === name.toLowerCase());
  return match?.value ?? '';
};
