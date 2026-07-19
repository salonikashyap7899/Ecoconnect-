import Link from 'next/link';
import { notFound } from 'next/navigation';
import Hero3D from '@/components/Hero3D';
import { CtaBand } from '@/components/ui';
import { getCollection } from '@/lib/cms';

export const dynamic = 'force-dynamic';

const getArticle = (slug) => getCollection('articles').find((a) => a.slug === slug) || null;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: 'Article' };
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      type: 'article',
      title: article.title,
      description: article.excerpt,
      images: [{ url: article.img }],
    },
  };
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const articles = getCollection('articles');
  const idx = articles.findIndex((a) => a.slug === slug);
  const prev = articles[idx - 1] || null;
  const next = articles[idx + 1] || null;
  const more = articles.filter((a) => a.slug !== slug).slice(0, 3);
  const pageUrl = `https://ecoconnectservices.com/insights/${article.slug}`;
  const shareLinks = [
    { name: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}` },
    { name: 'X', href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(article.title)}` },
    { name: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}` },
    { name: 'WhatsApp', href: `https://wa.me/?text=${encodeURIComponent(`${article.title} ${pageUrl}`)}` },
  ];
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    image: article.img,
    author: { '@type': 'Person', name: article.author },
    publisher: { '@type': 'Organization', name: 'Ecoconnect Services' },
    mainEntityOfPage: pageUrl,
  };

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy px-8 pb-[110px] pt-[150px]">
        <Hero3D />
        <div aria-hidden="true" className="absolute inset-0"><img src={article.img} alt="" className="h-full w-full object-cover opacity-40" /></div>
        <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(100deg,rgba(5,17,33,0.88)_25%,rgba(5,17,33,0.55))]" />
        <div className="relative mx-auto max-w-[860px]">
          <nav aria-label="Breadcrumb" className="mb-[22px] text-[13.5px]">
            <Link href="/" className="text-white/65 no-underline">Home</Link>
            <span className="px-2 text-white/40">/</span>
            <Link href="/insights" className="text-white/65 no-underline">Insights</Link>
            <span className="px-2 text-white/40">/</span>
            <span className="text-champagne">{article.category}</span>
          </nav>
          <p className="m-0 mb-4 inline-block rounded-full bg-champagne px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-navy">{article.category}</p>
          <h1 className="m-0 mb-[22px] font-display text-[clamp(32px,4vw,52px)] font-bold leading-[1.15] text-white text-balance">{article.title}</h1>
          <p className="m-0 text-[14.5px] text-white/70">By {article.author} · {article.date} · {article.read}</p>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      {/* Body */}
      <section className="bg-white px-8 py-[90px]">
        <article className="mx-auto flex max-w-[720px] flex-col gap-6">
          {article.content.map((para, i) => (
            <p key={i} className="m-0 text-[17px] leading-[1.85] text-muted-deep">{para}</p>
          ))}
        </article>

        {/* Share */}
        <div className="mx-auto mt-12 flex max-w-[720px] flex-wrap items-center gap-3 border-t border-line pt-8">
          <span className="text-[13.5px] font-semibold uppercase tracking-[0.08em] text-faint">Share this article</span>
          {shareLinks.map((s) => (
            <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer"
               className="rounded-lg border-[1.5px] border-line-soft px-4 py-2 font-display text-[13.5px] font-semibold text-navy no-underline transition-all hover:border-gold hover:text-gold">
              {s.name}
            </a>
          ))}
        </div>

        {/* Prev / Next */}
        <nav aria-label="Article navigation" className="mx-auto mt-10 grid max-w-[720px] grid-cols-1 gap-4 sm:grid-cols-2">
          {prev ? (
            <Link href={`/insights/${prev.slug}`} className="rounded-[14px] border border-line p-5 px-6 no-underline transition-all hover:border-gold">
              <span className="mb-1.5 block text-[12.5px] font-semibold uppercase tracking-[0.08em] text-faint">← Previous</span>
              <span className="font-display text-[15px] font-semibold leading-snug text-navy">{prev.title}</span>
            </Link>
          ) : <span />}
          {next && (
            <Link href={`/insights/${next.slug}`} className="rounded-[14px] border border-line p-5 px-6 text-right no-underline transition-all hover:border-gold">
              <span className="mb-1.5 block text-[12.5px] font-semibold uppercase tracking-[0.08em] text-faint">Next →</span>
              <span className="font-display text-[15px] font-semibold leading-snug text-navy">{next.title}</span>
            </Link>
          )}
        </nav>
      </section>

      {/* More */}
      <section className="bg-cream px-8 py-[100px]">
        <div className="mx-auto max-w-[1280px]">
          <h2 className="m-0 mb-11 font-display text-[clamp(28px,3vw,36px)] font-semibold text-navy">More Insights</h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-7">
            {more.map((a) => (
              <Link key={a.slug} href={`/insights/${a.slug}`} className="flex flex-col overflow-hidden rounded-2xl bg-white text-inherit no-underline shadow-card transition-all hover:-translate-y-1.5 hover:shadow-card-hover">
                <div className="aspect-[16/9] overflow-hidden"><img src={a.img} alt={a.title} className="h-full w-full object-cover" /></div>
                <div className="flex flex-1 flex-col p-6 pb-7">
                  <div className="mb-3.5 flex items-center gap-3">
                    <span className="rounded-full bg-[#EEF2F7] px-3 py-1 text-[11.5px] font-semibold uppercase tracking-[0.08em] text-navy">{a.category}</span>
                    <span className="text-[13px] text-faint-soft">{a.date}</span>
                  </div>
                  <h3 className="m-0 flex-1 font-display text-lg font-semibold leading-snug text-navy">{a.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand heading="Have a Story Worth Telling?" sub="Partner announcements, joint case studies, and event collaborations — we're listening." />
    </>
  );
}
