import { NextResponse } from 'next/server';
import { addSubmission, getSubmissions } from '@/lib/cms';
import { sendMail } from '@/lib/mailer';

const EMAIL_RE = /.+@.+\..+/;

export async function POST(request) {
  const { email, name, website } = await request.json().catch(() => ({}));

  if (website) return NextResponse.json({ ok: true }); // honeypot
  if (!EMAIL_RE.test(email || '')) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
  }

  const existing = getSubmissions('subscribers') || [];
  if (existing.some((s) => s.email?.toLowerCase() === email.toLowerCase())) {
    return NextResponse.json({ ok: true, duplicate: true });
  }

  const entry = addSubmission('subscribers', { email: email.trim(), name: name?.trim() || '' });

  await sendMail({
    subject: '[Ecoconnect] New newsletter subscriber',
    text: `New subscriber (${entry.id}): ${entry.email}${entry.name ? ` (${entry.name})` : ''}`,
  }).catch(() => {});

  return NextResponse.json({ ok: true, id: entry.id });
}
