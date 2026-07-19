import Link from 'next/link';
import Hero3D from '@/components/Hero3D';
import Reveal from '@/components/Reveal';
import TiltCard from '@/components/TiltCard';
import StatCounter from '@/components/StatCounter';
import { Eyebrow, SectionHeading, GoldButton, GhostButton, CtaBand } from '@/components/ui';
import {
  pillars, capabilities, industries, whyCards, homeStats, partners,
  projects, insightArticleCards,
} from '@/lib/data';

export default function HomePage() {
  const featuredProjects = projects.slice(0, 3);
  const latest = insightArticleCards.slice(0, 3);
  const partnerLoop = [...partners, ...partners];

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[calc(100vh-76px)] items-center overflow-hidden bg-navy">
        <Hero3D />
        <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(100deg,rgba(5,17,33,0.82)_20%,rgba(5,17,33,0.42)_60%,rgba(154,123,79,0.25)_100%)]" />
        <div className="relative mx-auto w-full max-w-[1280px] px-8 py-[120px]">
          <Reveal className="max-w-[760px]">
            <Eyebrow tone="champagne" rule className="mb-[22px]">Skilling · Simulation · Services</Eyebrow>
            <h1 className="m-0 mb-[26px] font-display text-[clamp(38px,5vw,64px)] font-bold leading-[1.1] text-white text-balance">
              Building the Capabilities Behind the Energy Transition
            </h1>
            <p className="m-0 mb-[42px] max-w-[620px] text-lg leading-relaxed text-white/85">
              Ecoconnect Services integrates Skilling, Simulation, and Services to help industries develop talent, engineer reliable solutions, and successfully execute projects across the clean energy and sustainable mobility ecosystem.
            </p>
            <div className="flex flex-wrap gap-4">
              <GoldButton href="/contact">Partner With Us</GoldButton>
              <GhostButton href="/capabilities">Explore Our Capabilities</GhostButton>
            </div>
          </Reveal>
        </div>
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1 bg-[linear-gradient(90deg,#9A7B4F,#C3A572,#0B2545)]" />
      </section>

      {/* About preview */}
      <section className="bg-white px-8 py-[120px]">
        <div className="mx-auto grid max-w-[1280px] grid-cols-[repeat(auto-fit,minmax(360px,1fr))] items-center gap-[72px]">
          <Reveal>
            <Eyebrow className="mb-3.5">About Ecoconnect</Eyebrow>
            <h2 className="m-0 mb-[22px] font-display text-[clamp(30px,3.4vw,40px)] font-semibold leading-[1.2] text-navy text-balance">An execution partner for the clean energy era</h2>
            <p className="m-0 mb-4 text-[16.5px] leading-[1.75] text-muted-deep">Ecoconnect Services works at the intersection of workforce development, engineering, and on-ground execution — bridging the gap between innovation and implementation across electric mobility, renewable energy, battery storage, power electronics, and digital infrastructure.</p>
            <p className="m-0 mb-8 text-[16.5px] leading-[1.75] text-muted-deep">We collaborate with industry, academia, startups, and government to develop practical, scalable solutions — supporting the complete journey from concept to commercial implementation.</p>
            <div className="mb-9 flex flex-col gap-3.5">
              {pillars.map((p) => (
                <div key={p.n} className="flex items-start gap-3.5">
                  <span className="grid h-[42px] w-[42px] flex-shrink-0 place-items-center rounded-[10px] bg-sand font-display text-[15px] font-bold text-gold">{p.n}</span>
                  <div>
                    <p className="m-0 mb-0.5 font-display text-base font-semibold text-navy">{p.title}</p>
                    <p className="m-0 text-[14.5px] leading-relaxed text-muted">{p.line}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/about" className="inline-flex items-center gap-2 border-b-2 border-gold pb-[3px] font-display text-[15px] font-semibold text-gold no-underline transition-colors hover:border-navy hover:text-navy">Learn More About Ecoconnect →</Link>
          </Reveal>
          <Reveal delay={0.15} className="relative">
            <div className="overflow-hidden rounded-[18px] shadow-[0_24px_60px_rgba(11,37,69,0.18)]">
              <img src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1200&q=80" alt="Engineer working on industrial energy systems" className="block aspect-[4/4.4] w-full object-cover" />
            </div>
            <div className="absolute bottom-10 -left-7 rounded-[14px] bg-navy px-7 py-[22px] text-white shadow-[0_16px_40px_rgba(11,37,69,0.35)]">
              <p className="m-0 font-display text-2xl font-bold">Concept → Commercial</p>
              <p className="m-0 mt-1 text-[13.5px] text-white/75">One integrated execution journey</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Capabilities */}
      <section className="bg-cream px-8 py-[120px]">
        <div className="mx-auto max-w-[1280px]">
          <Reveal><SectionHeading eyebrow="Our Capabilities" title="Three capabilities. One execution partner." sub="Integrated verticals that support the complete journey from talent to technology to on-ground delivery." className="mb-15" /></Reveal>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-7">
            {capabilities.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.12}>
                <TiltCard href={c.href} className="flex h-full flex-col overflow-hidden rounded-2xl bg-white text-inherit no-underline shadow-card">
                  <div className="relative aspect-[16/9.5] overflow-hidden">
                    <img src={c.img} alt={c.alt} className="h-full w-full object-cover" />
                    <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,37,69,0)_40%,rgba(11,37,69,0.65))]" />
                    <span className="absolute bottom-[18px] left-[22px] font-display text-[13px] font-semibold uppercase tracking-[0.12em] text-white">{c.eyebrow}</span>
                  </div>
                  <div className="flex flex-1 flex-col p-[30px] pb-8">
                    <h3 className="m-0 mb-3 font-display text-[23px] font-semibold text-navy">{c.title}</h3>
                    <p className="m-0 mb-[26px] flex-1 text-[15px] leading-relaxed text-muted">{c.desc}</p>
                    <span className="font-display text-[14.5px] font-semibold text-gold">Learn More →</span>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="bg-white px-8 py-[120px]">
        <div className="mx-auto max-w-[1280px]">
          <Reveal><SectionHeading center eyebrow="Industries We Serve" title="Deep expertise across the energy transition" className="mb-15" /></Reveal>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(190px,1fr))] gap-5">
            {industries.map((ind, i) => (
              <Reveal key={ind.name} delay={(i % 5) * 0.06}>
                <Link href="/projects" className="block rounded-[14px] border border-line bg-white p-7 px-[18px] text-center text-inherit no-underline transition-all hover:-translate-y-1 hover:border-gold hover:shadow-[0_14px_30px_rgba(154,123,79,0.12)]">
                  <span aria-hidden="true" className="mb-3.5 inline-grid h-[50px] w-[50px] place-items-center rounded-[13px] bg-gradient-to-br from-sand to-sand-dark font-display text-[15px] font-bold text-gold">{ind.glyph}</span>
                  <p className="m-0 text-sm font-semibold leading-snug text-navy">{ind.name}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why + stats */}
      <section className="relative overflow-hidden bg-navy px-8 py-[120px]">
        <div aria-hidden="true" className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1900&q=80')] bg-cover bg-center opacity-10" />
        <div className="relative mx-auto max-w-[1280px]">
          <Reveal><SectionHeading eyebrow="Why Ecoconnect" tone="champagne" titleColor="text-white" title="Built to execute, end to end" className="mb-15" /></Reveal>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-7">
            {whyCards.map((w, i) => (
              <Reveal key={w.title} delay={i * 0.12}>
                <div className="rounded-2xl border border-white/12 bg-white/5 p-9 px-8 backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-champagne/50 hover:bg-white/[0.09]">
                  <span className="mb-[26px] inline-block h-[3px] w-9 rounded-sm bg-champagne" />
                  <h3 className="m-0 mb-3 font-display text-xl font-semibold text-white">{w.title}</h3>
                  <p className="m-0 text-[15px] leading-relaxed text-white/70">{w.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <StatCounter
            stats={homeStats}
            className="mt-[76px] grid grid-cols-[repeat(auto-fit,minmax(190px,1fr))] gap-7 border-t border-white/15 pt-14"
          />
        </div>
      </section>

      {/* Featured projects */}
      <section className="bg-white px-8 py-[120px]">
        <div className="mx-auto max-w-[1280px]">
          <Reveal>
            <div className="mb-15 flex flex-wrap items-end justify-between gap-8">
              <SectionHeading eyebrow="Featured Projects" title="Work that drives real-world impact" className="max-w-[560px]" />
              <Link href="/projects" className="whitespace-nowrap rounded-lg border-[1.5px] border-gold px-7 py-[13px] font-display text-[15px] font-semibold text-gold no-underline transition-all hover:bg-gold hover:text-white">View All Projects</Link>
            </div>
          </Reveal>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-7">
            {featuredProjects.map((pr, i) => (
              <Reveal key={pr.slug} delay={i * 0.12}>
                <TiltCard href={`/projects/${pr.slug}`} className="flex h-full flex-col overflow-hidden rounded-2xl bg-white text-inherit no-underline shadow-card">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img src={pr.img} alt={pr.title} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex flex-1 flex-col p-7 pb-[30px]">
                    <span className="mb-4 self-start rounded-full bg-sand px-[13px] py-[5px] text-xs font-semibold uppercase tracking-[0.08em] text-gold">{pr.capability} · {pr.industry}</span>
                    <h3 className="m-0 mb-2.5 font-display text-[19px] font-semibold leading-snug text-navy">{pr.title}</h3>
                    <p className="m-0 mb-[22px] flex-1 text-[14.5px] leading-relaxed text-muted">{pr.summary}</p>
                    <span className="font-display text-sm font-semibold text-gold">View Project →</span>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Partners marquee */}
      <section className="overflow-hidden bg-cream py-24">
        <div className="mx-auto mb-12 max-w-[1280px] px-8 text-center">
          <Reveal><SectionHeading center eyebrow="Partners & Collaborations" title="Trusted across industry, academia & government" /></Reveal>
        </div>
        <div className="flex w-max gap-6 px-3 motion-safe:animate-marquee">
          {partnerLoop.map((pt, i) => (
            <div key={i} className="grid h-[88px] w-[200px] flex-shrink-0 place-items-center rounded-xl border border-line bg-white">
              <div className="text-center">
                <p className="m-0 font-display text-[15px] font-semibold text-muted">{pt.label}</p>
                <p className="m-0 mt-1 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-faint-soft">{pt.group}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Latest insights */}
      <section className="bg-white px-8 py-[120px]">
        <div className="mx-auto max-w-[1280px]">
          <Reveal>
            <div className="mb-15 flex flex-wrap items-end justify-between gap-8">
              <SectionHeading eyebrow="Latest Insights" title="Thinking that powers the transition" className="max-w-[560px]" />
              <Link href="/insights" className="whitespace-nowrap rounded-lg border-[1.5px] border-gold px-7 py-[13px] font-display text-[15px] font-semibold text-gold no-underline transition-all hover:bg-gold hover:text-white">All Insights</Link>
            </div>
          </Reveal>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-7">
            {latest.map((a, i) => (
              <Reveal key={a.slug} delay={i * 0.12}>
                <TiltCard href={`/insights/${a.slug}`} className="flex h-full flex-col overflow-hidden rounded-2xl bg-white text-inherit no-underline shadow-card">
                  <div className="aspect-[16/9] overflow-hidden">
                    <img src={a.img} alt={a.title} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex flex-1 flex-col p-6 pb-7">
                    <div className="mb-3.5 flex items-center gap-3">
                      <span className="rounded-full bg-[#EEF2F7] px-3 py-1 text-[11.5px] font-semibold uppercase tracking-[0.08em] text-navy">{a.category}</span>
                      <span className="text-[13px] text-faint-soft">{a.date}</span>
                    </div>
                    <h3 className="m-0 mb-5 flex-1 font-display text-lg font-semibold leading-snug text-navy">{a.title}</h3>
                    <span className="font-display text-sm font-semibold text-gold">Read More →</span>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand heading="Let's Build the Future Together" sub="Whether you're looking to build a skilled workforce, validate engineering solutions, or execute clean energy projects, Ecoconnect Services is ready to support your journey." />
    </>
  );
}
