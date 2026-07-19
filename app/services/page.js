import Link from 'next/link';
import Reveal from '@/components/Reveal';
import ServicePortfolio from '@/components/ServicePortfolio';
import { PageHero, SectionHeading, GoldButton, GhostButton, CtaBand } from '@/components/ui';
import { servicePhilosophy, serviceFramework, serviceIndustries, serviceWhyPartner, serviceModels } from '@/lib/data';

export const metadata = {
  title: 'Services',
  description: 'Project planning, engineering support, execution, operations & maintenance, and audits across the clean energy ecosystem.',
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Capabilities / Services"
        title="From Planning to Execution — One Accountable Team"
        maxTitle="max-w-[820px]"
        actions={<><GoldButton href="#portfolio">Explore Services</GoldButton><GhostButton href="/contact">Discuss a Project</GhostButton></>}
      >
        Project planning, engineering support, execution, operations & maintenance, and audits — delivered on the ground with schedule, quality, and safety ownership.
      </PageHero>

      {/* Philosophy */}
      <section className="bg-white px-8 py-[120px]">
        <div className="mx-auto max-w-[1280px]">
          <Reveal><SectionHeading eyebrow="Service Philosophy" title="Accountability from day one to done" className="mb-15" /></Reveal>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-7">
            {servicePhilosophy.map((ph, i) => (
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

      {/* Portfolio accordion */}
      <section id="portfolio" className="bg-cream px-8 py-[120px]">
        <div className="mx-auto max-w-[980px]">
          <Reveal><SectionHeading eyebrow="Service Portfolio" title="Five service categories, one team" className="mb-13" /></Reveal>
          <Reveal><ServicePortfolio /></Reveal>
        </div>
      </section>

      {/* Delivery framework */}
      <section className="bg-navy px-8 py-[120px]">
        <div className="mx-auto max-w-[1080px]">
          <Reveal><SectionHeading center eyebrow="Delivery Framework" tone="champagne" titleColor="text-white" title="How every engagement runs" className="mb-16" /></Reveal>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-[18px]">
            {serviceFramework.map((f, i) => (
              <Reveal key={f.n} delay={(i % 4) * 0.08}>
                <div className="flex items-center gap-4 rounded-xl border border-white/12 bg-white/5 px-6 py-[22px]">
                  <span className="grid h-[34px] w-[34px] flex-shrink-0 place-items-center rounded-lg bg-champagne/15 font-display text-[13px] font-bold text-champagne">{f.n}</span>
                  <p className="m-0 text-[14.5px] font-semibold leading-snug text-white">{f.title}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="bg-white px-8 py-[120px]">
        <div className="mx-auto max-w-[1280px]">
          <Reveal><SectionHeading center eyebrow="Industries We Serve" title="Execution across the ecosystem" className="mb-15" /></Reveal>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(190px,1fr))] gap-5">
            {serviceIndustries.map((ind, i) => (
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

      {/* Why partner */}
      <section className="bg-cream px-8 py-[120px]">
        <div className="mx-auto max-w-[1280px]">
          <Reveal><SectionHeading eyebrow="Why Partner With Ecoconnect" title="One accountable partner, start to finish" className="mb-15" /></Reveal>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-7">
            {serviceWhyPartner.map((w, i) => (
              <Reveal key={w.title} delay={(i % 4) * 0.08}>
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

      {/* Featured projects band */}
      <section className="relative overflow-hidden bg-navy px-8 py-[100px]">
        <div aria-hidden="true" className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1900&q=80')] bg-cover bg-center opacity-[0.14]" />
        <div className="relative mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-8">
          <div className="max-w-[620px]">
            <p className="m-0 mb-3 text-[13px] font-semibold uppercase tracking-[0.16em] text-champagne">Featured Projects & Success Stories</p>
            <h2 className="m-0 font-display text-[clamp(26px,3vw,36px)] font-semibold text-white">See how our services perform in the field</h2>
          </div>
          <Link href="/projects" className="whitespace-nowrap rounded-lg bg-white px-8 py-[15px] font-display text-[15.5px] font-semibold text-navy no-underline transition-all hover:-translate-y-0.5 hover:text-gold hover:shadow-[0_12px_28px_rgba(0,0,0,0.3)]">View Project Portfolio →</Link>
        </div>
      </section>

      {/* Engagement models */}
      <section className="bg-white px-8 py-[120px]">
        <div className="mx-auto max-w-[1280px]">
          <Reveal><SectionHeading eyebrow="Engagement Models" title="Work with us the way that fits" className="mb-15" /></Reveal>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-6">
            {serviceModels.map((m, i) => (
              <Reveal key={m.title} delay={(i % 5) * 0.06}>
                <div className="h-full rounded-2xl border border-line p-8 px-7 transition-all hover:-translate-y-1.5 hover:border-gold hover:shadow-[0_18px_40px_rgba(27,107,74,0.1)]">
                  <span className="mb-[22px] inline-block h-[3px] w-8 rounded-sm bg-gold" />
                  <h3 className="m-0 mb-2.5 font-display text-[17.5px] font-semibold text-navy">{m.title}</h3>
                  <p className="m-0 text-sm leading-relaxed text-muted">{m.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand heading="Ready to Turn Your Vision into Reality?" sub="From site assessment to commissioning and beyond — hand us the execution and hold us accountable." />
    </>
  );
}
