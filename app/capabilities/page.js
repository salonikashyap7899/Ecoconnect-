import Link from 'next/link';
import Reveal from '@/components/Reveal';
import TiltCard from '@/components/TiltCard';
import { PageHero, SectionHeading, CtaBand } from '@/components/ui';
import { capabilityCards, capabilityFlow, industries, capabilityWhy } from '@/lib/data';

export const metadata = {
  title: 'Capabilities',
  description: 'Three capabilities, one execution partner — how Skilling, Simulation, and Services combine into an integrated delivery ecosystem.',
};

export default function CapabilitiesPage() {
  return (
    <>
      <PageHero eyebrow="Our Capabilities" title="Three Capabilities. One Execution Partner." maxTitle="max-w-[760px]">
        Skilling builds the people. Simulation validates the engineering. Services delivers on the ground. Together, they carry your programme from concept to commercial operation.
      </PageHero>

      {/* Capability cards */}
      <section className="bg-white px-8 py-[120px]">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-8">
          {capabilityCards.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.08}>
              <TiltCard href={c.href} max={3} className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] overflow-hidden rounded-[20px] bg-white text-inherit no-underline shadow-[0_6px_24px_rgba(11,37,69,0.08)]">
                <div className="relative min-h-[300px] overflow-hidden">
                  <img src={c.img} alt={c.alt} className="absolute inset-0 h-full w-full object-cover" />
                  <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(120deg,rgba(11,37,69,0.55),rgba(11,37,69,0))]" />
                  <span className="absolute left-[26px] top-6 rounded-full bg-gold/85 px-4 py-2 font-display text-[13px] font-bold tracking-[0.14em] text-white">{c.eyebrow}</span>
                </div>
                <div className="flex flex-col justify-center p-12 px-[46px]">
                  <h2 className="m-0 mb-2 font-display text-[28px] font-semibold text-navy">{c.title}</h2>
                  <p className="m-0 mb-3.5 font-display text-base font-semibold text-gold">{c.tagline}</p>
                  <p className="m-0 mb-6 text-[15.5px] leading-relaxed text-muted">{c.desc}</p>
                  <span className="font-display text-[15px] font-semibold text-gold">Explore {c.title} →</span>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Integrated workflow */}
      <section className="bg-navy px-8 py-[120px]">
        <div className="mx-auto max-w-[1280px]">
          <Reveal><SectionHeading center eyebrow="How It Works Together" tone="champagne" titleColor="text-white" title="An integrated execution workflow" className="mb-15" /></Reveal>
          <div className="flex flex-wrap items-stretch justify-center">
            {capabilityFlow.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.1}>
                <div className="flex items-center">
                  <div className="min-w-[210px] rounded-[14px] border border-white/12 bg-white/5 p-7 text-center">
                    <p className="m-0 mb-1.5 font-display text-[13px] font-bold tracking-[0.1em] text-champagne">{f.step}</p>
                    <p className="m-0 mb-2 font-display text-[19px] font-semibold text-white">{f.title}</p>
                    <p className="m-0 text-[13.5px] leading-snug text-white/65">{f.desc}</p>
                  </div>
                  {f.arrow && <span aria-hidden="true" className="px-4 text-[22px] text-champagne">→</span>}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="bg-white px-8 py-[120px]">
        <div className="mx-auto max-w-[1280px]">
          <Reveal><SectionHeading center eyebrow="Industries We Serve" title="Where our capabilities go to work" className="mb-15" /></Reveal>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(190px,1fr))] gap-5">
            {industries.map((ind, i) => (
              <Reveal key={ind.name} delay={(i % 5) * 0.06}>
                <div className="rounded-[14px] border border-line bg-white p-7 px-[18px] text-center transition-all hover:-translate-y-1 hover:border-gold hover:shadow-[0_14px_30px_rgba(27,107,74,0.12)]">
                  <span aria-hidden="true" className="mb-3.5 inline-grid h-[50px] w-[50px] place-items-center rounded-[13px] bg-gradient-to-br from-sand to-sand-dark font-display text-[15px] font-bold text-gold">{ind.glyph}</span>
                  <p className="m-0 text-sm font-semibold leading-snug text-navy">{ind.name}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why integrated */}
      <section className="bg-cream px-8 py-[120px]">
        <div className="mx-auto max-w-[1280px]">
          <Reveal><SectionHeading eyebrow="Why Our Integrated Approach" title="The whole is greater than the parts" className="mb-15" /></Reveal>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-7">
            {capabilityWhy.map((w, i) => (
              <Reveal key={w.title} delay={i * 0.1}>
                <div className="h-full rounded-2xl bg-white p-9 px-[30px] shadow-card transition-all hover:-translate-y-1.5 hover:shadow-card-hover">
                  <span className="mb-6 inline-block h-[3px] w-9 rounded-sm bg-gold" />
                  <h3 className="m-0 mb-2.5 font-display text-[19px] font-semibold text-navy">{w.title}</h3>
                  <p className="m-0 text-[14.5px] leading-relaxed text-muted">{w.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand heading="Ready to Build the Future?" sub="Bring us the capability gap — talent, engineering, or execution — and we'll close it." />
    </>
  );
}
