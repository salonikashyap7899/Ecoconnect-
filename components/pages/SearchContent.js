'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import FilterPills from '@/components/FilterPills';
import { PageHero, CtaBand } from '@/components/ui';
import { searchIndex, searchTypes } from '@/lib/data';

function Highlight({ text, terms }) {
  if (!terms.length) return text;
  const pattern = new RegExp(`(${terms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'ig');
  return text.split(pattern).map((part, i) =>
    terms.includes(part.toLowerCase())
      ? <mark key={i} className="rounded-sm bg-champagne px-0.5 text-navy">{part}</mark>
      : <span key={i}>{part}</span>,
  );
}

export default function SearchContent() {
  const router = useRouter();
  const params = useSearchParams();
  const [query, setQuery] = useState(params.get('q') || '');
  const [type, setType] = useState('All');
  const inputRef = useRef(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      const qs = query.trim() ? `?q=${encodeURIComponent(query.trim())}` : '';
      router.replace(`/search${qs}`, { scroll: false });
    }, 300);
    return () => clearTimeout(t);
  }, [query, router]);

  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  const results = useMemo(() => {
    if (!terms.length) return [];
    return searchIndex.filter((entry) => {
      if (type !== 'All' && entry.type !== type) return false;
      const haystack = `${entry.title} ${entry.desc}`.toLowerCase();
      return terms.every((t) => haystack.includes(t));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, type]);

  return (
    <>
      <PageHero eyebrow="Search" title="Find Anything on Ecoconnect" maxTitle="max-w-[720px]">
        Search across pages, projects, articles, events, programmes, and job openings.
      </PageHero>

      <section className="bg-white px-8 py-[90px]">
        <div className="mx-auto max-w-[860px]">
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="search"
            placeholder="Search for projects, programmes, articles…"
            aria-label="Search the website"
            className="mb-7 w-full box-border rounded-xl border-[1.5px] border-line-soft bg-white px-6 py-[18px] text-[17px] text-body shadow-card outline-none focus:border-gold"
          />
          <div className="mb-10"><FilterPills options={searchTypes} value={type} onChange={setType} /></div>

          {terms.length === 0 ? (
            <p className="py-10 text-center text-[15.5px] text-faint">Start typing to see live results.</p>
          ) : results.length === 0 ? (
            <div className="rounded-2xl bg-cream p-12 px-6 text-center">
              <p className="m-0 mb-2 font-display text-lg font-semibold text-navy">No results for “{query}”</p>
              <p className="m-0 text-[14.5px] text-faint">Try a different keyword, or <Link href="/contact" className="text-gold">contact us</Link> — we’ll point you in the right direction.</p>
            </div>
          ) : (
            <>
              <p className="m-0 mb-6 text-[13.5px] font-semibold uppercase tracking-[0.08em] text-faint">{results.length} result{results.length === 1 ? '' : 's'}</p>
              <div className="flex flex-col gap-3.5">
                {results.map((r) => (
                  <Link key={`${r.type}-${r.href}-${r.title}`} href={r.href} className="rounded-[14px] border border-line bg-white p-6 px-7 no-underline shadow-card transition-all hover:-translate-y-1 hover:border-gold hover:shadow-card-hover">
                    <span className="mb-2 inline-block rounded-full bg-sand px-3 py-1 text-[11.5px] font-semibold uppercase tracking-[0.08em] text-gold">{r.type}</span>
                    <h2 className="m-0 mb-1.5 font-display text-[17.5px] font-semibold text-navy"><Highlight text={r.title} terms={terms} /></h2>
                    <p className="m-0 text-[14px] leading-relaxed text-muted"><Highlight text={r.desc} terms={terms} /></p>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <CtaBand heading="Can't Find What You Need?" sub="One message reaches the right team — enquiries are answered within a business day." />
    </>
  );
}
