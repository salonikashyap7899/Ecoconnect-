import Link from 'next/link';
import Reveal from '@/components/Reveal';
import TiltCard from '@/components/TiltCard';
import { PageHero, SectionHeading, GoldButton, GhostButton, CtaBand } from '@/components/ui';
import { simPhilosophy, simEngCaps, simWorkflow, simTools, simWhy, simCases } from '@/lib/data';

export const metadata = { title: 'Simulation' };

export default function SimulationPage() {
  return (
    <>
      <PageHero
        eyebrow="Capabilities / Simulation"
        title="Engineering, Validated Before It's Built"
        maxTitle="max-w-[800px]"
        actions={<><GoldButton href="#capabilities">Explore Capabilities</GoldButton><GhostButton href="/contact">Request a Study</GhostButton></>}
      >
        System modelling, performance simulation, and design validation that de-risk engineering decisions before capital is committed.
      </PageHero>

      {/* Philosophy */}
      <section className="bg-white px-8 py-[120px]">
        <div className="mx-auto max-w-[1280px]">
          <Reveal><SectionHeading eyebrow="Our Philosophy" title="Validate first. Build once." className="mb-15" /></Reveal>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-7">
            {simPhilosophy.map((ph, i) => (
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

      {/* Engineering capabilities */}
      <section id="capabilities" className="bg-cream px-8 py-[120px]">
        <div className="mx-auto max-w-[1280px]">
          <Reveal><SectionHeading eyebrow="Engineering Capabilities" title="What our simulation practice covers" className="mb-15" /></Reveal>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
            {simEngCaps.map((ec, i) => (
              <Reveal key={ec.title} delay={(i % 4) * 0.08}>
                <div className="h-full rounded-[14px] bg-white p-[30px] px-7 shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover">
                  <span className="mb-5 inline-block h-[3px] w-8 rounded-sm bg-gold" />
                  <h3 className="m-0 mb-2.5 font-display text-[17.5px] font-semibold text-navy">{ec.title}</h3>
                  <p className="m-0 text-sm leading-relaxed text-muted">{ec.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section className="bg-navy px-8 py-[120px]">
        <div className="mx-auto max-w-[1080px]">
          <Reveal><SectionHeading center eyebrow="Engineering Workflow" tone="champagne" titleColor="text-white" title="From requirement to implementation support" className="mb-16" /></Reveal>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-[18px]">
            {simWorkflow.map((w, i) => (
              <Reveal key={w.n} delay={(i % 4) * 0.08}>
                <div className="flex items-center gap-4 rounded-xl border border-white/12 bg-white/5 px-6 py-[22px]">
                  <span className="grid h-[34px] w-[34px] flex-shrink-0 place-items-center rounded-lg bg-champagne/15 font-display text-[13px] font-bold text-champagne">{w.n}</span>
                  <p className="m-0 text-[14.5px] font-semibold leading-snug text-white">{w.title}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Tools */}
      <section className="bg-white px-8 py-[120px]">
        <div className="mx-auto max-w-[1280px]">
          <Reveal><SectionHeading center eyebrow="Tools & Technologies" title="Industry-standard toolchain" sub="Tools are the means — the deliverable is a validated, documented engineering decision." className="mb-15" /></Reveal>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-5">
            {simTools.map((t, i) => (
              <Reveal key={t.name} delay={(i % 5) * 0.06}>
                <div className="rounded-[14px] border border-line p-7 px-5 text-center transition-all hover:-translate-y-1 hover:border-gold hover:shadow-[0_14px_30px_rgba(154,123,79,0.1)]">
                  <p className="m-0 mb-1 font-display text-base font-bold text-navy">{t.name}</p>
                  <p className="m-0 text-[12.5px] text-faint">{t.use}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why */}
      <section className="bg-white px-8 pb-[120px]">
        <div className="mx-auto max-w-[1280px]">
          <Reveal><SectionHeading eyebrow="Why Ecoconnect" title="An engineering partner, not a software vendor" className="mb-15" /></Reveal>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-7">
            {simWhy.map((w, i) => (
              <Reveal key={w.title} delay={(i % 4) * 0.08}>
                <div className="h-full rounded-2xl border border-line p-9 px-[30px] transition-all hover:-translate-y-1.5 hover:border-gold hover:shadow-[0_18px_40px_rgba(154,123,79,0.1)]">
                  <span className="mb-6 inline-block h-[3px] w-9 rounded-sm bg-gold" />
                  <h3 className="m-0 mb-2.5 font-display text-[19px] font-semibold text-navy">{w.title}</h3>
                  <p className="m-0 text-[14.5px] leading-relaxed text-muted">{w.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Case studies */}
      <section className="bg-cream px-8 py-[120px]">
        <div className="mx-auto max-w-[1280px]">
          <Reveal><SectionHeading eyebrow="Case Studies" title="Recent simulation engagements" className="mb-15" /></Reveal>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-7">
            {simCases.map((cs, i) => (
              <Reveal key={cs.title} delay={i * 0.1}>
                <TiltCard href="/projects" className="flex h-full flex-col overflow-hidden rounded-2xl bg-white text-inherit no-underline shadow-card">
                  <div className="aspect-[16/9] overflow-hidden">
                    <img src={cs.img} alt={cs.alt} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex flex-1 flex-col p-7 pb-[30px]">
                    <span className="mb-4 self-start rounded-full bg-sand px-[13px] py-[5px] text-[11.5px] font-semibold uppercase tracking-[0.08em] text-gold">{cs.tag}</span>
                    <h3 className="m-0 mb-2.5 font-display text-lg font-semibold leading-snug text-navy">{cs.title}</h3>
                    <p className="m-0 mb-5 flex-1 text-[14.5px] leading-relaxed text-muted">{cs.outcome}</p>
                    <span className="font-display text-sm font-semibold text-gold">Read Case Study →</span>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand heading="Let's Engineer the Future Together" sub="Bring us the system you need validated — we'll bring the models, the studies, and the documentation." />
    </>
  );
}
