import { NextResponse } from 'next/server';
import { checkCredentials, issueSession, SESSION_COOKIE } from '@/lib/adminAuth';

export async function POST(request) {
  const { username, password } = await request.json().catch(() => ({}));
  if (!checkCredentials(username || '', password || '')) {
    return NextResponse.json({ error: 'Invalid username or password.' }, { status: 401 });
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, issueSession(), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 8, // 8-hour session timeout (WRS §20.11)
  });
  return res;
}
