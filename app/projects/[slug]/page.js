import Link from 'next/link';
import { notFound } from 'next/navigation';
import Hero3D from '@/components/Hero3D';
import Reveal from '@/components/Reveal';
import { CtaBand } from '@/components/ui';
import { projects, getProject } from '@/lib/data';

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProject(slug);
  return { title: project ? project.title : 'Project' };
}

export default async function ProjectDetailPage({ params }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const idx = projects.findIndex((p) => p.slug === slug);
  const prev = projects[(idx - 1 + projects.length) % projects.length];
  const next = projects[(idx + 1) % projects.length];
  const related = projects.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy px-8 pb-[110px] pt-[150px]">
        <Hero3D />
        <div aria-hidden="true" className="absolute inset-0">
          <img src={project.img} alt="" className="h-full w-full object-cover opacity-40" />
        </div>
        <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(100deg,rgba(5,17,33,0.85)_25%,rgba(5,17,33,0.5))]" />
        <div className="relative mx-auto max-w-[1080px]">
          <nav aria-label="Breadcrumb" className="mb-[22px] text-[13.5px]">
            <Link href="/" className="text-white/65 no-underline">Home</Link>
            <span className="px-2 text-white/40">/</span>
            <Link href="/projects" className="text-white/65 no-underline">Projects</Link>
            <span className="px-2 text-white/40">/</span>
            <span className="text-champagne">{project.title}</span>
          </nav>
          <p className="m-0 mb-4 text-[13px] font-semibold uppercase tracking-[0.16em] text-champagne">{project.capability} · {project.industry} · {project.location}</p>
          <h1 className="m-0 mb-[22px] max-w-[820px] font-display text-[clamp(34px,4.4vw,56px)] font-bold leading-[1.12] text-white text-balance">{project.title}</h1>
          <p className="m-0 mb-[26px] max-w-[680px] text-[17px] leading-relaxed text-white/85">{project.summary}</p>
          <div className="flex flex-wrap gap-7 text-[14.5px] text-white/70">
            <p className="m-0"><span className="font-semibold text-champagne">Client</span> · {project.client}</p>
            <p className="m-0"><span className="font-semibold text-champagne">Duration</span> · {project.duration}</p>
          </div>
        </div>
      </section>

      {/* Detail */}
      <section className="bg-white px-8 py-[100px]">
        <div className="mx-auto flex max-w-[1080px] flex-col gap-12">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8">
            <Reveal>
              <div className="h-full rounded-2xl bg-cream p-[38px] px-[34px]">
                <h2 className="m-0 mb-3.5 font-display text-[26px] font-semibold text-navy">The Challenge</h2>
                <p className="m-0 text-[15.5px] leading-[1.75] text-muted-deep">{project.challenge}</p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="h-full rounded-2xl bg-cream p-[38px] px-[34px]">
                <h2 className="m-0 mb-3.5 font-display text-[26px] font-semibold text-navy">Our Solution</h2>
                <p className="m-0 text-[15.5px] leading-[1.75] text-muted-deep">{project.solution}</p>
              </div>
            </Reveal>
          </div>

          <Reveal>
            <h2 className="m-0 mb-[18px] font-display text-[26px] font-semibold text-navy">Technologies &amp; Methods</h2>
            <div className="flex flex-wrap gap-3">
              {project.technologies.map((t) => (
                <span key={t} className="rounded-full border border-sand-dark bg-sand px-5 py-[9px] text-[13.5px] font-medium text-gold">{t}</span>
              ))}
            </div>
          </Reveal>

          <Reveal>
            <div className="rounded-[20px] bg-navy p-[46px] px-11">
              <h2 className="m-0 mb-3.5 font-display text-[26px] font-semibold text-champagne">Outcomes &amp; Impact</h2>
              <p className="m-0 text-[16.5px] leading-[1.75] text-white/90">{project.outcomes}</p>
            </div>
          </Reveal>

          <Reveal>
            <h2 className="m-0 mb-5 font-display text-[26px] font-semibold text-navy">Project Gallery</h2>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-[18px]">
              {project.gallery.map((g, i) => (
                <div key={i} className="overflow-hidden rounded-[14px] bg-cream">
                  <img src={g} alt="Project photograph" className="block aspect-[4/3] w-full object-cover" />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Related */}
      <section className="bg-cream px-8 py-[100px]">
        <div className="mx-auto max-w-[1080px]">
          <div className="mb-11 flex flex-wrap items-end justify-between gap-6">
            <h2 className="m-0 font-display text-[clamp(28px,3vw,36px)] font-semibold text-navy">Related Projects</h2>
            <div className="flex gap-3">
              <Link href={`/projects/${prev.slug}`} className="rounded-lg border-[1.5px] border-gold px-[22px] py-[11px] font-display text-[15px] font-semibold text-gold no-underline transition-all hover:bg-gold hover:text-white">← Previous</Link>
              <Link href={`/projects/${next.slug}`} className="rounded-lg border-[1.5px] border-gold px-[22px] py-[11px] font-display text-[15px] font-semibold text-gold no-underline transition-all hover:bg-gold hover:text-white">Next →</Link>
            </div>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
            {related.map((r) => (
              <Link key={r.slug} href={`/projects/${r.slug}`} className="flex flex-col overflow-hidden rounded-2xl bg-white text-inherit no-underline shadow-card transition-all hover:-translate-y-1.5 hover:shadow-card-hover">
                <div className="aspect-[16/9] overflow-hidden"><img src={r.img} alt={r.title} className="h-full w-full object-cover" /></div>
                <div className="p-6 pb-7">
                  <p className="m-0 mb-2 text-xs font-semibold uppercase tracking-[0.08em] text-gold">{r.capability} · {r.industry}</p>
                  <h3 className="m-0 font-display text-[21px] font-semibold leading-snug text-navy">{r.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand heading="Have a Project in Mind?" sub="Tell us the outcome you need — we'll bring the plan, the team, and the accountability." />
    </>
  );
}
