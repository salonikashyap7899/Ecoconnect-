// Admin session helpers (WRS §20.11). Credentials come from env vars with
// documented development defaults — set ADMIN_USERNAME / ADMIN_PASSWORD /
// ADMIN_SECRET in production.

import crypto from 'crypto';

const USERNAME = process.env.ADMIN_USERNAME || 'admin';
const PASSWORD = process.env.ADMIN_PASSWORD || 'ecoconnect2026';
const SECRET = process.env.ADMIN_SECRET || 'ecoconnect-dev-secret';

export const SESSION_COOKIE = 'ec_admin_session';

function sessionToken() {
  return crypto.createHmac('sha256', SECRET).update(`${USERNAME}:${PASSWORD}`).digest('hex');
}

export function checkCredentials(username, password) {
  const a = Buffer.from(`${username}:${password}`);
  const b = Buffer.from(`${USERNAME}:${PASSWORD}`);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export function issueSession() {
  return sessionToken();
}

export function isValidSession(token) {
  if (!token) return false;
  const expected = sessionToken();
  const a = Buffer.from(token);
  const b = Buffer.from(expected);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}
