'use client';

import { useState } from 'react';
import Reveal from '@/components/Reveal';
import StatCounter from '@/components/StatCounter';
import FilterPills from '@/components/FilterPills';
import Lightbox from '@/components/Lightbox';
import { PageHero, SectionHeading, GoldButton, GhostButton, CtaBand } from '@/components/ui';
import {
  skillingPhilosophy, skillingEcosystem, skillingCollab, skillingGallery,
  skillingProgrammes, skillingProgrammeCategories, skillingCareerDev,
  skillingTestimonials, skillingStats,
} from '@/lib/data';

export default function SkillingContent() {
  const [filter, setFilter] = useState('All');
  const [lightbox, setLightbox] = useState(null);

  const programmes = filter === 'All' ? skillingProgrammes : skillingProgrammes.filter((p) => p.category === filter);

  return (
    <>
      <PageHero
        eyebrow="Capabilities / Skilling"
        title="Building the Workforce Behind the Energy Transition"
        maxTitle="max-w-[800px]"
        actions={<><GoldButton href="#programmes">Explore Our Programmes</GoldButton><GhostButton href="/contact">Partner With Us</GhostButton></>}
      >
        Industry-aligned training programmes, Centres of Excellence, and career pathways that turn learners into deployment-ready professionals.
      </PageHero>

      {/* Philosophy */}
      <section className="bg-white px-8 py-[120px]">
        <div className="mx-auto max-w-[1280px]">
          <Reveal><SectionHeading eyebrow="Skilling Philosophy" title="Learning that ends in employment, not certificates" className="mb-15" /></Reveal>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-7">
            {skillingPhilosophy.map((ph, i) => (
              <Reveal key={ph.n} delay={i * 0.1}>
                <div className="h-full rounded-2xl bg-cream p-10 px-[34px] transition-all hover:-translate-y-1.5 hover:bg-white hover:shadow-card-hover">
                  <span className="mb-6 inline-grid h-[52px] w-[52px] place-items-center rounded-[13px] bg-gradient-to-br from-gold to-gold-light font-display text-[17px] font-bold text-white">{ph.n}</span>
                  <h3 className="m-0 mb-3 font-display text-xl font-semibold text-navy">{ph.title}</h3>
                  <p className="m-0 text-[15px] leading-relaxed text-muted">{ph.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Learning ecosystem */}
      <section className="bg-navy px-8 py-[120px]">
        <div className="mx-auto max-w-[1080px]">
          <Reveal><SectionHeading center eyebrow="Learning Ecosystem" tone="champagne" titleColor="text-white" title="From industry requirement to career growth" className="mb-16" /></Reveal>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-[18px]">
            {skillingEcosystem.map((e, i) => (
              <Reveal key={e.n} delay={(i % 4) * 0.08}>
                <div className="flex items-center gap-4 rounded-xl border border-white/12 bg-white/5 px-6 py-[22px]">
                  <span className="grid h-[34px] w-[34px] flex-shrink-0 place-items-center rounded-lg bg-champagne/15 font-display text-[13px] font-bold text-champagne">{e.n}</span>
                  <p className="m-0 text-[14.5px] font-semibold leading-snug text-white">{e.title}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Centres of Excellence gallery */}
      <section className="bg-white px-8 py-[120px]">
        <div className="mx-auto max-w-[1280px]">
          <Reveal>
            <div className="mb-15 flex flex-wrap items-end justify-between gap-8">
              <SectionHeading eyebrow="Centres of Excellence" title="Real equipment. Real conditions." className="max-w-[560px]" />
              <p className="m-0 text-[14.5px] text-faint">Click any image to enlarge</p>
            </div>
          </Reveal>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-5">
            {skillingGallery.map((g, i) => (
              <Reveal key={g.caption} delay={(i % 4) * 0.08}>
                <button onClick={() => setLightbox(i)} className="w-full cursor-zoom-in overflow-hidden rounded-[14px] bg-cream transition-all hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(11,37,69,0.15)]">
                  <img src={g.img} alt={g.caption} className="block aspect-[4/3] w-full object-cover" />
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Industry collaboration */}
      <section className="bg-cream px-8 py-[120px]">
        <div className="mx-auto max-w-[1280px]">
          <Reveal><SectionHeading eyebrow="Industry Collaboration" title="Learning that stays close to industry" className="mb-15" /></Reveal>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-6">
            {skillingCollab.map((c, i) => (
              <Reveal key={c.title} delay={(i % 3) * 0.08}>
                <div className="h-full rounded-[14px] bg-white p-[30px] px-7 shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover">
                  <span className="mb-[18px] inline-grid h-11 w-11 place-items-center rounded-[11px] bg-sand font-display text-sm font-bold text-gold">{c.glyph}</span>
                  <h3 className="m-0 mb-2 font-display text-[17px] font-semibold text-navy">{c.title}</h3>
                  <p className="m-0 text-sm leading-relaxed text-muted">{c.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Programmes */}
      <section id="programmes" className="bg-cream px-8 py-[120px]">
        <div className="mx-auto max-w-[1280px]">
          <Reveal><SectionHeading eyebrow="Training Programmes" title="Programmes built with hiring partners" className="mb-11" /></Reveal>
          <div className="mb-11"><FilterPills options={skillingProgrammeCategories} value={filter} onChange={setFilter} /></div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
            {programmes.map((pg) => (
              <div key={pg.name} className="flex flex-col rounded-2xl bg-white p-[34px] px-[30px] shadow-card transition-all hover:-translate-y-1.5 hover:shadow-card-hover">
                <span className="mb-[18px] self-start rounded-full bg-sand px-[13px] py-[5px] text-[11.5px] font-semibold uppercase tracking-[0.08em] text-gold">{pg.category}</span>
                <h3 className="m-0 mb-2.5 font-display text-[19px] font-semibold leading-snug text-navy">{pg.name}</h3>
                <p className="m-0 mb-[18px] flex-1 text-[14.5px] leading-relaxed text-muted">{pg.overview}</p>
                <div className="mb-5 flex gap-[18px] text-[13.5px] text-faint">
                  <span>👤 {pg.audience}</span>
                  <span>⏱ {pg.duration}</span>
                </div>
                <a href="/contact" className="font-display text-sm font-semibold text-gold no-underline hover:text-navy">Learn More →</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Career development */}
      <section className="bg-navy px-8 py-[120px]">
        <div className="mx-auto max-w-[1280px]">
          <Reveal><SectionHeading center eyebrow="Career Development & Outcomes" tone="champagne" titleColor="text-white" title="Support that continues beyond the classroom" className="mb-15" /></Reveal>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(190px,1fr))] gap-5">
            {skillingCareerDev.map((cd, i) => (
              <Reveal key={cd.name} delay={(i % 5) * 0.06}>
                <div className="rounded-[14px] border border-white/12 bg-white/5 p-[30px] px-5 text-center">
                  <span aria-hidden="true" className="mb-3.5 inline-grid h-12 w-12 place-items-center rounded-xl bg-champagne/15 font-display text-[15px] font-bold text-champagne">{cd.glyph}</span>
                  <p className="m-0 font-display text-[15px] font-semibold leading-snug text-white">{cd.name}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Success stories */}
      <section className="bg-white px-8 py-[120px]">
        <div className="mx-auto max-w-[1280px]">
          <Reveal><SectionHeading eyebrow="Success Stories" title="Outcomes our partners talk about" className="mb-15" /></Reveal>
          <div className="mb-[72px] grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-7">
            {skillingTestimonials.map((t, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <figure className="m-0 flex h-full flex-col rounded-2xl bg-cream p-9 px-8">
                  <span aria-hidden="true" className="font-display text-[44px] leading-none text-champagne-soft">“</span>
                  <blockquote className="m-0 mb-6 mt-2 flex-1 text-[15.5px] leading-relaxed text-muted-deep">{t.quote}</blockquote>
                  <figcaption>
                    <p className="m-0 font-display text-[15px] font-semibold text-navy">{t.name}</p>
                    <p className="m-0 mt-0.5 text-[13.5px] text-faint">{t.role}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
          <StatCounter stats={skillingStats} className="grid grid-cols-[repeat(auto-fit,minmax(190px,1fr))] gap-7 rounded-[20px] bg-navy p-14 px-10" valueClass="font-display text-[42px] font-bold text-champagne" />
        </div>
      </section>

      <CtaBand heading="Build Skills That Shape the Future" sub="Partner with us on Centres of Excellence, corporate upskilling, or industry-aligned cohorts." />

      <Lightbox item={lightbox !== null ? skillingGallery[lightbox] : null} onClose={() => setLightbox(null)} />
    </>
  );
}
