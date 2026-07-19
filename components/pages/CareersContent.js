'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Reveal from '@/components/Reveal';
import Accordion from '@/components/Accordion';
import FilterPills from '@/components/FilterPills';
import { PageHero, SectionHeading, GoldButton, GhostButton, CtaBand } from '@/components/ui';
import {
  careersWhyJoin, careersValues, careersJobs, careersDepts, careersInternships,
  careersBenefits, careersProcess, careersFaqs,
} from '@/lib/data';

const inputClass = 'w-full box-border rounded-[10px] border-[1.5px] border-line-soft bg-white px-4 py-[13px] text-[14.5px] text-body outline-none focus:border-gold';

export default function CareersContent() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [dept, setDept] = useState('All');
  const [form, setForm] = useState({ name: '', email: '', phone: '', area: '', msg: '' });
  const [error, setError] = useState(false);

  const q = search.toLowerCase();
  const jobs = careersJobs.filter(
    (j) => (dept === 'All' || j.dept === dept) && (!q || j.title.toLowerCase().includes(q) || j.location.toLowerCase().includes(q)),
  );

  const set = (k) => (e) => { setForm((f) => ({ ...f, [k]: e.target.value })); setError(false); };
  const submit = () => {
    if (form.name.trim() && /.+@.+\..+/.test(form.email) && form.area) router.push('/thank-you');
    else setError(true);
  };

  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Build the Technologies and Talent of Tomorrow"
        maxTitle="max-w-[800px]"
        actions={<><GoldButton href="#openings">View Open Positions</GoldButton><GhostButton href="#apply">Submit General Application</GhostButton></>}
      >
        The energy transition needs builders — engineers, trainers, and field teams who turn ambition into commissioned reality.
      </PageHero>

      {/* Why join */}
      <section className="bg-white px-8 py-[120px]">
        <div className="mx-auto max-w-[1280px]">
          <Reveal><SectionHeading eyebrow="Why Join Ecoconnect" title="Work that outlasts the workday" className="mb-15" /></Reveal>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-7">
            {careersWhyJoin.map((w, i) => (
              <Reveal key={w.title} delay={(i % 4) * 0.08}>
                <div className="h-full rounded-2xl bg-cream p-9 px-[30px] transition-all hover:-translate-y-1.5 hover:bg-white hover:shadow-card-hover">
                  <span className="mb-6 inline-block h-[3px] w-9 rounded-sm bg-gold" />
                  <h3 className="m-0 mb-2.5 font-display text-[19px] font-semibold text-navy">{w.title}</h3>
                  <p className="m-0 text-[14.5px] leading-relaxed text-muted">{w.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-navy px-8 py-[120px]">
        <div className="mx-auto max-w-[1280px]">
          <Reveal><SectionHeading center eyebrow="Culture & Values" tone="champagne" titleColor="text-white" title="What we hold each other to" className="mb-15" /></Reveal>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(190px,1fr))] gap-5">
            {careersValues.map((v, i) => (
              <Reveal key={v.name} delay={(i % 6) * 0.05}>
                <div className="rounded-[14px] border border-white/12 bg-white/5 p-[30px] px-5 text-center">
                  <span aria-hidden="true" className="mb-3.5 inline-grid h-12 w-12 place-items-center rounded-xl bg-champagne/15 font-display text-base font-bold text-champagne">{v.glyph}</span>
                  <p className="m-0 font-display text-[15.5px] font-semibold text-white">{v.name}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Openings */}
      <section id="openings" className="bg-cream px-8 py-[120px]">
        <div className="mx-auto max-w-[1080px]">
          <Reveal><SectionHeading eyebrow="Open Positions" title="Current openings" className="mb-11" /></Reveal>
          <div className="mb-9 flex flex-wrap gap-3">
            <input value={search} onChange={(e) => setSearch(e.target.value)} type="search" placeholder="Search roles…" aria-label="Search roles"
              className="min-w-[220px] flex-1 rounded-[10px] border-[1.5px] border-line-soft bg-white px-[18px] py-[13px] text-[14.5px] text-body outline-none focus:border-gold" />
            <FilterPills options={careersDepts} value={dept} onChange={setDept} />
          </div>
          {jobs.length ? (
            <div className="flex flex-col gap-3.5">
              {jobs.map((j) => (
                <div key={j.title} className="flex flex-wrap items-center justify-between gap-6 rounded-[14px] bg-white p-[26px] px-[30px] shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover">
                  <div>
                    <h3 className="m-0 mb-1.5 font-display text-lg font-semibold text-navy">{j.title}</h3>
                    <p className="m-0 text-[13.5px] text-faint">{j.dept} · {j.location} · {j.type} · {j.exp}</p>
                  </div>
                  <a href="#apply" className="whitespace-nowrap rounded-lg border-[1.5px] border-gold px-6 py-[11px] font-display text-sm font-semibold text-gold no-underline transition-all hover:bg-gold hover:text-white">Apply Now</a>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl bg-white p-15 px-6 text-center">
              <p className="m-0 mb-2 font-display text-lg font-semibold text-navy">No matching openings right now</p>
              <p className="m-0 text-[14.5px] text-faint">Submit a general application below — we review every profile.</p>
            </div>
          )}
        </div>
      </section>

      {/* Internships + benefits */}
      <section className="bg-white px-8 py-[120px]">
        <div className="mx-auto grid max-w-[1280px] grid-cols-[repeat(auto-fit,minmax(340px,1fr))] gap-14">
          <div>
            <SectionHeading eyebrow="Internships & Graduate Programmes" title="Start here, grow fast" className="mb-6" />
            <div className="flex flex-col gap-3.5">
              {careersInternships.map((it) => (
                <div key={it.title} className="flex items-start gap-3.5 rounded-xl bg-cream p-[18px] px-5">
                  <span aria-hidden="true" className="mt-px font-bold text-gold">✓</span>
                  <div>
                    <p className="m-0 mb-0.5 font-display text-[15.5px] font-semibold text-navy">{it.title}</p>
                    <p className="m-0 text-[13.5px] leading-relaxed text-muted">{it.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <SectionHeading eyebrow="Employee Benefits" title="Why people stay" className="mb-6" />
            <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3.5">
              {careersBenefits.map((b) => (
                <div key={b.name} className="rounded-xl border border-line p-[22px] px-5 transition-all hover:-translate-y-1 hover:border-gold hover:shadow-[0_12px_28px_rgba(154,123,79,0.1)]">
                  <span aria-hidden="true" className="mb-3 inline-grid h-10 w-10 place-items-center rounded-[10px] bg-sand font-display text-[13px] font-bold text-gold">{b.glyph}</span>
                  <p className="m-0 text-sm font-semibold leading-snug text-navy">{b.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-white px-8 pb-[120px]">
        <div className="mx-auto max-w-[1080px]">
          <Reveal><SectionHeading center eyebrow="Recruitment Process" title="Six steps, no black box" className="mb-16" /></Reveal>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-[18px]">
            {careersProcess.map((pr, i) => (
              <Reveal key={pr.n} delay={(i % 6) * 0.05}>
                <div className="text-center">
                  <span className="mb-3.5 inline-grid h-[52px] w-[52px] place-items-center rounded-full bg-sand font-display text-base font-bold text-gold">{pr.n}</span>
                  <p className="m-0 text-sm font-semibold leading-snug text-navy">{pr.title}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-cream px-8 py-[120px]">
        <div className="mx-auto max-w-[860px]">
          <Reveal><SectionHeading center eyebrow="FAQ" title="Questions candidates ask" className="mb-13" /></Reveal>
          <Accordion
            items={careersFaqs}
            compact
            renderTitle={(f) => <span className="font-display text-base font-semibold text-navy">{f.q}</span>}
            renderBody={(f) => <p className="m-0 px-[26px] pb-6 text-[14.5px] leading-relaxed text-muted">{f.a}</p>}
          />
        </div>
      </section>

      {/* Application */}
      <section id="apply" className="bg-white px-8 py-[120px]">
        <div className="mx-auto max-w-[760px]">
          <div className="mb-12 text-center">
            <SectionHeading center eyebrow="General Application" title="Don't see your role? Apply anyway." sub="We review every profile and reach out when a fit opens up." />
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5">
            <Field label="Full Name *"><input value={form.name} onChange={set('name')} className={inputClass} /></Field>
            <Field label="Email *"><input type="email" value={form.email} onChange={set('email')} className={inputClass} /></Field>
            <Field label="Phone"><input type="tel" value={form.phone} onChange={set('phone')} className={inputClass} /></Field>
            <Field label="Area of Interest *">
              <select value={form.area} onChange={set('area')} className={inputClass}>
                <option value="">Select…</option>
                <option value="Skilling">Skilling &amp; Training</option>
                <option value="Simulation">Simulation &amp; Engineering</option>
                <option value="Services">Services &amp; Execution</option>
                <option value="Corporate">Corporate Functions</option>
              </select>
            </Field>
          </div>
          <div className="mt-5">
            <Field label="Message"><textarea value={form.msg} onChange={set('msg')} rows={4} className={inputClass} /></Field>
          </div>
          {error && <p className="m-0 mt-4 text-sm text-[#C0392B]">Please fill in name, a valid email, and your area of interest.</p>}
          <button onClick={submit} className="mt-7 rounded-[10px] bg-gold px-10 py-4 font-display text-base font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-gold-dark">Submit Application</button>
        </div>
      </section>

      <CtaBand heading="Grow With the Transition" sub="The energy transition needs builders. If that's you, we should talk." />
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
