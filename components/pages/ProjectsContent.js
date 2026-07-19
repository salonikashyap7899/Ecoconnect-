'use client';

import { useState } from 'react';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import StatCounter from '@/components/StatCounter';
import FilterPills from '@/components/FilterPills';
import { PageHero, SectionHeading, CtaBand } from '@/components/ui';
import { projects, projectStats, projectTestimonials } from '@/lib/data';

const caps = ['All', 'Skilling', 'Simulation', 'Services'];
const inds = ['All', 'Electric Mobility', 'Renewable Energy', 'BESS', 'Industrial'];

export default function ProjectsContent() {
  const [cap, setCap] = useState('All');
  const [ind, setInd] = useState('All');

  const visible = projects.filter(
    (p) => (cap === 'All' || p.capability === cap) && (ind === 'All' || p.industry === ind),
  );

  return (
    <>
      <PageHero eyebrow="Our Work" title="Projects That Drive Real-World Impact" maxTitle="max-w-[760px]">
        Skilling, simulation, and services engagements delivered across the clean energy and mobility ecosystem.
      </PageHero>

      {/* Grid + filters */}
      <section className="bg-white px-8 py-[100px]">
        <div className="mx-auto max-w-[1280px]">
          <div className="mb-12 flex flex-wrap items-center gap-7">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="text-[13px] font-semibold uppercase tracking-[0.08em] text-faint">Capability</span>
              <FilterPills options={caps} value={cap} onChange={setCap} />
            </div>
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="text-[13px] font-semibold uppercase tracking-[0.08em] text-faint">Industry</span>
              <FilterPills options={inds} value={ind} onChange={setInd} />
            </div>
          </div>

          {visible.length ? (
            <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-7">
              {visible.map((pr) => (
                <article key={pr.slug} className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-card transition-all hover:-translate-y-1.5 hover:shadow-card-hover">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img src={pr.img} alt={pr.title} className="h-full w-full object-cover" />
                    <span className="absolute left-[18px] top-4 rounded-full bg-gold/90 px-3.5 py-1.5 text-[11.5px] font-semibold uppercase tracking-[0.08em] text-white">{pr.capability}</span>
                  </div>
                  <div className="flex flex-1 flex-col p-7 pb-[30px]">
                    <p className="m-0 mb-2 text-[12.5px] font-semibold uppercase tracking-[0.06em] text-faint">{pr.industry} · {pr.location}</p>
                    <h3 className="m-0 mb-2.5 font-display text-[19px] font-semibold leading-snug text-navy">{pr.title}</h3>
                    <p className="m-0 mb-5 flex-1 text-[14.5px] leading-relaxed text-muted">{pr.summary}</p>
                    <Link href={`/projects/${pr.slug}`} className="self-start font-display text-[15px] font-semibold text-gold no-underline hover:text-navy">View Project →</Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="py-15 text-center text-base text-faint">No projects match these filters yet.</p>
          )}
        </div>
      </section>

      {/* Impact stats */}
      <section className="bg-navy px-8 py-[100px]">
        <StatCounter stats={projectStats} className="mx-auto grid max-w-[1280px] grid-cols-[repeat(auto-fit,minmax(190px,1fr))] gap-7" />
      </section>

      {/* Testimonials */}
      <section className="bg-cream px-8 py-[120px]">
        <div className="mx-auto max-w-[1280px]">
          <Reveal><SectionHeading eyebrow="What Partners Say" title="Judged by delivery" className="mb-15" /></Reveal>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-7">
            {projectTestimonials.map((t, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <figure className="m-0 flex h-full flex-col rounded-2xl bg-white p-9 px-8 shadow-card">
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
        </div>
      </section>

      <CtaBand heading="Have a Project in Mind?" sub="Tell us the outcome you need — we'll bring the plan, the team, and the accountability." />
    </>
  );
}
