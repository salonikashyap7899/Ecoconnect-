import { NextResponse } from 'next/server';
import { addSubmission } from '@/lib/cms';
import { sendMail } from '@/lib/mailer';

const EMAIL_RE = /.+@.+\..+/;

export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const { name, org, email, phone, category, subject, message, website } = body;

  // Honeypot — real users never fill this hidden field (WRS §22.2 spam protection).
  if (website) return NextResponse.json({ ok: true });

  if (!name?.trim() || !EMAIL_RE.test(email || '') || !category || !subject?.trim() || !message?.trim()) {
    return NextResponse.json({ error: 'Please complete all required fields with a valid email.' }, { status: 400 });
  }

  const entry = await addSubmission('enquiries', {
    name: name.trim(), org: org?.trim() || '', email: email.trim(), phone: phone?.trim() || '',
    category, subject: subject.trim(), message: message.trim(),
  });

  await sendMail({
    subject: `[Ecoconnect Enquiry] ${category} — ${subject.trim()}`,
    replyTo: email.trim(),
    text: `New enquiry (${entry.id})\n\nName: ${entry.name}\nOrganisation: ${entry.org}\nEmail: ${entry.email}\nPhone: ${entry.phone}\nCategory: ${entry.category}\nSubject: ${entry.subject}\n\n${entry.message}`,
  }).catch(() => {});

  return NextResponse.json({ ok: true, id: entry.id });
}
