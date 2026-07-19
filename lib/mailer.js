// Email notifications for form submissions (WRS §7.4, §21.9).
// Sends only when SMTP_HOST is configured; otherwise it is a silent no-op so
// the site works without email credentials.

export async function sendMail({ subject, text, replyTo, attachment }) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_FROM, MAIL_TO } = process.env;
  if (!SMTP_HOST || !MAIL_TO) return { sent: false, reason: 'smtp-not-configured' };

  const nodemailer = (await import('nodemailer')).default;
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT || 587),
    secure: Number(SMTP_PORT) === 465,
    auth: SMTP_USER ? { user: SMTP_USER, pass: SMTP_PASS } : undefined,
  });

  await transporter.sendMail({
    from: MAIL_FROM || SMTP_USER,
    to: MAIL_TO,
    subject,
    text,
    replyTo,
    attachments: attachment ? [attachment] : undefined,
  });
  return { sent: true };
}
