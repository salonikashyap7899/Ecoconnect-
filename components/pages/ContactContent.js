'use client';

import { useState } from 'react';
import Reveal from '@/components/Reveal';
import Accordion from '@/components/Accordion';
import { PageHero, SectionHeading, CtaBand } from '@/components/ui';
import { contactFaqs, contactCategories } from '@/lib/data';

const inputClass = 'w-full box-border rounded-[10px] border-[1.5px] border-line-soft bg-white px-4 py-[13px] text-[14.5px] text-body outline-none focus:border-gold';

export default function ContactContent() {
  const [form, setForm] = useState({ name: '', org: '', email: '', phone: '', cat: '', subject: '', msg: '' });
  const [hp, setHp] = useState('');
  const [attachment, setAttachment] = useState(null);
  const [fileError, setFileError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const set = (k) => (e) => { setForm((f) => ({ ...f, [k]: e.target.value })); setError(false); };
  const onFile = (e) => {
    const file = e.target.files?.[0];
    setFileError('');
    if (!file) { setAttachment(null); return; }
    if (!/\.(pdf|docx?|jpe?g|png)$/i.test(file.name)) { setAttachment(null); setFileError('Attachment must be a PDF, DOC, DOCX, JPG, or PNG file.'); return; }
    if (file.size > 5 * 1024 * 1024) { setAttachment(null); setFileError('Attachment must be smaller than 5 MB.'); return; }
    setAttachment(file);
  };
  const submit = async () => {
    const ok = form.name.trim() && /.+@.+\..+/.test(form.email) && form.cat && form.subject.trim() && form.msg.trim();
    if (!ok) { setError(true); return; }
    const res = await fetch('/api/forms/enquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.name, org: form.org, email: form.email, phone: form.phone,
        category: form.cat, subject: form.subject, message: form.msg, website: hp,
      }),
    }).catch(() => null);
    if (res?.ok) setSubmitted(true);
    else setError(true);
  };
  const reset = () => { setForm({ name: '', org: '', email: '', phone: '', cat: '', subject: '', msg: '' }); setSubmitted(false); };

  return (
    <>
      <PageHero eyebrow="Contact" title="Let's Start a Conversation" maxTitle="max-w-[720px]">
        Enquiries, partnerships, programme registrations, or a project you need delivered — reach the right team in one message.
      </PageHero>

      {/* Main */}
      <section className="bg-white px-8 py-[100px]">
        <div className="mx-auto grid max-w-[1280px] grid-cols-[repeat(auto-fit,minmax(340px,1fr))] items-start gap-14">
          <div className="flex flex-col gap-5">
            <div className="rounded-2xl bg-cream p-8 px-[30px]">
              <h2 className="m-0 mb-3.5 font-display text-[19px] font-semibold text-navy">Registered Office</h2>
              <p className="m-0 mb-3.5 text-[15px] leading-relaxed text-muted-deep">Ecoconnect Services<br />512 Tower-A, DLF Corporate Greens<br />Gurugram, Haryana, India</p>
              <a href="https://maps.google.com/?q=DLF+Corporate+Greens+Gurugram" target="_blank" rel="noopener noreferrer" className="font-display text-sm font-semibold text-gold no-underline hover:text-navy">Open in Google Maps →</a>
            </div>
            <div className="rounded-2xl bg-cream p-8 px-[30px]">
              <h2 className="m-0 mb-4 font-display text-[19px] font-semibold text-navy">Reach the Right Team</h2>
              <div className="flex flex-col gap-3 text-[14.5px]">
                {[
                  ['General', 'info@ecoconnectservices.com'],
                  ['Business', 'partnerships@ecoconnectservices.com'],
                  ['Training', 'skilling@ecoconnectservices.com'],
                  ['Careers', 'hr@ecoconnectservices.com'],
                ].map(([label, email]) => (
                  <p key={label} className="m-0 flex justify-between gap-3"><span className="text-faint">{label}</span><a href={`mailto:${email}`} className="text-gold no-underline">{email}</a></p>
                ))}
                <p className="m-0 flex justify-between gap-3"><span className="text-faint">Phone</span><a href="tel:+919958550225" className="text-gold no-underline">+91 99585 50225</a></p>
              </div>
            </div>
            <div className="rounded-2xl bg-cream p-8 px-[30px]">
              <h2 className="m-0 mb-4 font-display text-[19px] font-semibold text-navy">Business Hours</h2>
              <div className="flex flex-col gap-2.5 text-[14.5px] text-muted-deep">
                <p className="m-0 flex justify-between"><span>Monday – Friday</span><span className="font-semibold">9:00 – 18:00 IST</span></p>
                <p className="m-0 flex justify-between"><span>Saturday</span><span className="font-semibold">10:00 – 14:00 IST</span></p>
                <p className="m-0 flex justify-between"><span>Sunday</span><span className="font-semibold">Closed</span></p>
              </div>
            </div>
          </div>

          <div className="rounded-[20px] border border-line bg-white p-11 px-[42px] shadow-[0_12px_40px_rgba(11,37,69,0.08)]">
            {submitted ? (
              <div className="px-4 py-12 text-center">
                <p className="m-0 mb-2.5 font-display text-[22px] font-semibold text-gold">✓ Message sent</p>
                <p className="m-0 mb-6 text-[15px] leading-relaxed text-muted-deep">Thank you for reaching out. The right team will get back to you within one business day.</p>
                <button onClick={reset} className="rounded-lg border-[1.5px] border-gold px-[26px] py-3 font-display text-sm font-semibold text-gold">Send Another Message</button>
              </div>
            ) : (
              <>
                <h2 className="m-0 mb-7 font-display text-[23px] font-semibold text-navy">Send us a message</h2>
                <input type="text" value={hp} onChange={(e) => setHp(e.target.value)} name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
                <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-[18px]">
                  <Field label="Full Name *"><input value={form.name} onChange={set('name')} className={inputClass} /></Field>
                  <Field label="Organization"><input value={form.org} onChange={set('org')} className={inputClass} /></Field>
                  <Field label="Email *"><input type="email" value={form.email} onChange={set('email')} className={inputClass} /></Field>
                  <Field label="Phone"><input type="tel" value={form.phone} onChange={set('phone')} className={inputClass} /></Field>
                </div>
                <div className="mt-[18px]">
                  <Field label="Enquiry Category *">
                    <select value={form.cat} onChange={set('cat')} className={inputClass}>
                      <option value="">Select a category…</option>
                      {contactCategories.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </Field>
                </div>
                <div className="mt-[18px]"><Field label="Subject *"><input value={form.subject} onChange={set('subject')} className={inputClass} /></Field></div>
                <div className="mt-[18px]"><Field label="Message *"><textarea value={form.msg} onChange={set('msg')} rows={5} className={inputClass} /></Field></div>
                <div className="mt-[18px]">
                  <Field label="Attachment (optional — PDF/DOC/DOCX/JPG/PNG, max 5 MB)">
                    <input type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" onChange={onFile} className={`${inputClass} file:mr-3 file:rounded-md file:border-0 file:bg-sand file:px-3 file:py-1.5 file:font-display file:text-[13px] file:font-semibold file:text-gold`} />
                  </Field>
                  {fileError && <p className="m-0 mt-2 text-sm text-[#C0392B]">{fileError}</p>}
                  {attachment && <p className="m-0 mt-2 text-sm font-semibold text-gold">✓ {attachment.name} attached</p>}
                </div>
                <p className="m-0 mt-4 text-[12.5px] leading-relaxed text-faint">By submitting this form you agree to our <a href="/legal#privacy" className="text-gold">Privacy Policy</a>. Your details are used only to respond to your enquiry.</p>
                {error && <p className="m-0 mt-4 text-sm text-[#C0392B]">Please complete all required fields with a valid email.</p>}
                <button onClick={submit} className="mt-7 w-full rounded-[10px] bg-gold px-10 py-4 font-display text-base font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-gold-dark">Send Message</button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="bg-white px-8 pb-[100px]">
        <div className="mx-auto max-w-[1280px] overflow-hidden rounded-[20px] border border-line shadow-[0_12px_40px_rgba(11,37,69,0.1)]">
          <iframe title="Ecoconnect Services office — DLF Corporate Greens, Gurugram" src="https://www.google.com/maps?q=DLF+Corporate+Greens,+Gurugram,+Haryana&output=embed" className="block h-[420px] w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-cream px-8 py-[100px]">
        <div className="mx-auto max-w-[860px]">
          <Reveal><SectionHeading center eyebrow="FAQ" title="Before you write in" className="mb-13" /></Reveal>
          <Accordion
            items={contactFaqs}
            compact
            renderTitle={(f) => <span className="font-display text-base font-semibold text-navy">{f.q}</span>}
            renderBody={(f) => <p className="m-0 px-[26px] pb-6 text-[14.5px] leading-relaxed text-muted">{f.a}</p>}
          />
        </div>
      </section>

      <CtaBand heading="We're Ready to Help" sub="One conversation is usually enough to know whether we're the right execution partner for you." />
    </>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className="mb-[7px] block text-[13.5px] font-semibold text-navy">{label}</label>
      {children}
    </div>
  );
}
