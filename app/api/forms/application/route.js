import { NextResponse } from 'next/server';
import { addSubmission } from '@/lib/cms';
import { sendMail } from '@/lib/mailer';

const EMAIL_RE = /.+@.+\..+/;
const MAX_RESUME_BYTES = 5 * 1024 * 1024;

export async function POST(request) {
  const form = await request.formData().catch(() => null);
  if (!form) return NextResponse.json({ error: 'Invalid form data.' }, { status: 400 });

  if (form.get('website')) return NextResponse.json({ ok: true }); // honeypot

  const fields = Object.fromEntries(
    ['name', 'email', 'phone', 'location', 'area', 'exp', 'linkedin', 'message'].map((k) => [k, (form.get(k) || '').toString().trim()]),
  );
  const resume = form.get('resume');

  if (!fields.name || !EMAIL_RE.test(fields.email) || !fields.area) {
    return NextResponse.json({ error: 'Name, a valid email, and area of interest are required.' }, { status: 400 });
  }
  if (!resume || typeof resume === 'string') {
    return NextResponse.json({ error: 'A resume file is required.' }, { status: 400 });
  }
  if (!/\.(pdf|docx?)$/i.test(resume.name)) {
    return NextResponse.json({ error: 'Resume must be a PDF, DOC, or DOCX file.' }, { status: 400 });
  }
  if (resume.size > MAX_RESUME_BYTES) {
    return NextResponse.json({ error: 'Resume must be smaller than 5 MB.' }, { status: 400 });
  }

  const entry = addSubmission('applications', {
    ...fields,
    resumeName: resume.name,
    resumeSize: resume.size,
  });

  const buffer = Buffer.from(await resume.arrayBuffer());
  await sendMail({
    subject: `[Ecoconnect Career Application] ${fields.name} — ${fields.area}`,
    replyTo: fields.email,
    text: `New application (${entry.id})\n\nName: ${fields.name}\nEmail: ${fields.email}\nPhone: ${fields.phone}\nLocation: ${fields.location}\nArea: ${fields.area}\nExperience: ${fields.exp}\nLinkedIn: ${fields.linkedin}\n\n${fields.message}`,
    attachment: { filename: resume.name, content: buffer },
  }).catch(() => {});

  return NextResponse.json({ ok: true, id: entry.id });
}
