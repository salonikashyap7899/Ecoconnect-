import Link from 'next/link';
import Reveal from '@/components/Reveal';
import { PageHero, SectionHeading, GoldButton, GhostButton, CtaBand } from '@/components/ui';
import { aboutVmp, aboutJourney, aboutFlow, aboutEcosystem, aboutWhy } from '@/lib/data';
import { getCollection } from '@/lib/cms';

// Leadership profiles are CMS-managed (WRS §10.9).
export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'About',
  description: 'Who Ecoconnect Services is — vision, mission, leadership, journey, business model, and the ecosystem behind the energy transition.',
};

export default async function AboutPage() {
  const leaders = await getCollection('leaders');
  return (
    <>
      <PageHero
        eyebrow="About Ecoconnect"
        title="Building the Capabilities Behind the Energy Transition"
        actions={<><GoldButton href="/capabilities">Explore Our Capabilities</GoldButton><GhostButton href="/contact">Contact Us</GhostButton></>}
      >
        Ecoconnect Services enables the transition towards clean energy and sustainable mobility through integrated capabilities in Skilling, Simulation, and Services — working with industry, academia, startups, and government to create lasting impact.
      </PageHero>

      {/* Overview */}
      <section className="bg-white px-8 py-[120px]">
        <div className="mx-auto grid max-w-[1280px] grid-cols-[repeat(auto-fit,minmax(360px,1fr))] items-center gap-[72px]">
          <Reveal>
            <SectionHeading eyebrow="Company Overview" title="From innovation to implementation" className="mb-[22px]" />
            <p className="m-0 mb-4 text-[16.5px] leading-[1.75] text-muted-deep">Ecoconnect Services is an execution-focused company working at the intersection of Skilling, Simulation, and Services. Our approach combines workforce development, engineering capabilities, and on-ground execution to bridge the gap between innovation and implementation.</p>
            <p className="m-0 mb-8 text-[16.5px] leading-[1.75] text-muted-deep">Our work spans electric mobility, commercial vehicles, renewable energy, battery energy storage systems, power electronics, and digital infrastructure — supporting the complete journey from concept to commercial implementation.</p>
            <a href="/downloads/ecoconnect-corporate-profile.pdf" download className="inline-flex items-center gap-2.5 rounded-lg bg-navy px-[30px] py-3.5 font-display text-[15px] font-semibold text-white no-underline transition-all hover:-translate-y-0.5 hover:bg-gold">↓ Download Corporate Profile</a>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="overflow-hidden rounded-[18px] shadow-[0_24px_60px_rgba(11,37,69,0.18)]">
              <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80" alt="Ecoconnect team at work" className="block aspect-[4/3.4] w-full object-cover" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Vision Mission Purpose */}
      <section className="bg-cream px-8 py-[120px]">
        <div className="mx-auto max-w-[1280px]">
          <Reveal><SectionHeading center eyebrow="What Drives Us" title="Vision, Mission & Purpose" className="mb-15" /></Reveal>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-7">
            {aboutVmp.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.1}>
                <div className="h-full rounded-2xl bg-white p-10 px-[34px] shadow-card transition-all hover:-translate-y-1.5 hover:shadow-card-hover">
                  <span className="mb-6 inline-grid h-[52px] w-[52px] place-items-center rounded-[13px] bg-gradient-to-br from-gold to-gold-light font-display text-lg font-bold text-white">{v.glyph}</span>
                  <h3 className="m-0 mb-3 font-display text-[21px] font-semibold text-navy">{v.title}</h3>
                  <p className="m-0 text-[15px] leading-relaxed text-muted">{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="overflow-hidden bg-white px-8 py-[120px]">
        <div className="mx-auto max-w-[1280px]">
          <Reveal><SectionHeading eyebrow="Our Journey" title="Milestones that shaped Ecoconnect" className="mb-15" /></Reveal>
          <div className="flex overflow-x-auto pb-6">
            {aboutJourney.map((j) => (
              <div key={j.year} className="min-w-[250px] flex-1 pr-7">
                <div className="mb-5 flex items-center">
                  <span className="h-4 w-4 flex-shrink-0 rounded-full border-[3px] border-sand-dark bg-gold" />
                  <span className="h-0.5 flex-1 bg-line-soft" />
                </div>
                <p className="m-0 mb-1.5 font-display text-[15px] font-bold text-gold">{j.year}</p>
                <p className="m-0 mb-1.5 font-display text-[17px] font-semibold text-navy">{j.title}</p>
                <p className="m-0 text-sm leading-relaxed text-muted">{j.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Business model flow */}
      <section className="bg-navy px-8 py-[120px]">
        <div className="mx-auto max-w-[1280px]">
          <Reveal><SectionHeading center eyebrow="Business Model" tone="champagne" titleColor="text-white" title="One integrated flow of value" className="mb-15" /></Reveal>
          <div className="flex flex-wrap items-stretch justify-center">
            {aboutFlow.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.1}>
                <div className="flex items-center">
                  <Link href={f.href} className="block min-w-[200px] rounded-[14px] border border-white/12 bg-white/5 px-[30px] py-7 text-center no-underline transition-all hover:-translate-y-1 hover:border-champagne hover:bg-champagne/12">
                    <p className="m-0 mb-1.5 font-display text-[13px] font-bold tracking-[0.1em] text-champagne">{f.step}</p>
                    <p className="m-0 font-display text-[19px] font-semibold text-white">{f.title}</p>
                  </Link>
                  {f.arrow && <span aria-hidden="true" className="px-[18px] text-[22px] text-champagne">→</span>}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="bg-white px-8 py-[120px]">
        <div className="mx-auto max-w-[1280px]">
          <Reveal><SectionHeading center eyebrow="Our Leadership" title="Led by builders and engineers" className="mb-15" /></Reveal>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-7">
            {leaders.map((l, i) => (
              <Reveal key={l.name} delay={i * 0.1}>
                <div className="h-full overflow-hidden rounded-2xl border border-line bg-white transition-all hover:-translate-y-1.5 hover:shadow-card-hover">
                  <div className="aspect-square overflow-hidden bg-cream">
                    <img src={l.img} alt={l.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="p-6 pb-7">
                    <p className="m-0 mb-1 font-display text-lg font-semibold text-navy">{l.name}</p>
                    <p className="m-0 mb-3 text-[13.5px] font-semibold text-gold">{l.role}</p>
                    <p className="m-0 mb-4 text-sm leading-relaxed text-muted">{l.bio}</p>
                    <a href="#" aria-label={`${l.name} on LinkedIn`} className="inline-grid h-[34px] w-[34px] place-items-center rounded-[7px] border border-line text-xs font-bold text-navy no-underline transition-all hover:border-navy hover:bg-navy hover:text-white">in</a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Ecosystem */}
      <section className="bg-cream px-8 py-[120px]">
        <div className="mx-auto max-w-[1280px]">
          <Reveal><SectionHeading center eyebrow="Our Ecosystem" title="The network behind the work" className="mb-15" /></Reveal>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-5">
            {aboutEcosystem.map((e, i) => (
              <Reveal key={e.name} delay={(i % 5) * 0.05}>
                <div className="grid h-[92px] place-items-center rounded-xl border border-line bg-white transition-all hover:-translate-y-1 hover:border-gold hover:shadow-[0_12px_28px_rgba(27,107,74,0.1)]">
                  <div className="text-center">
                    <p className="m-0 font-display text-[15px] font-semibold text-muted">{e.name}</p>
                    <p className="m-0 mt-1 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-faint-soft">{e.group}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why */}
      <section className="bg-white px-8 py-[120px]">
        <div className="mx-auto max-w-[1280px]">
          <Reveal><SectionHeading eyebrow="Why Ecoconnect" title="A partner you can hand the hard part to" className="mb-15" /></Reveal>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-7">
            {aboutWhy.map((w, i) => (
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

      <CtaBand heading="Let's Write the Next Milestone Together" sub="Partner with an execution-focused team that has delivered across skilling, simulation, and services since day one." />
    </>
  );
}
