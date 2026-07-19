'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import Reveal from '@/components/Reveal';
import FilterPills from '@/components/FilterPills';
import { PageHero, SectionHeading, CtaBand } from '@/components/ui';
import { articles, events, announcements } from '@/lib/data';

const tabs = ['All', 'Blog', 'News', 'Case Study', 'Technical Article', 'Announcement'];

export default function InsightsContent({ articlesData = articles, eventsData = events, announcementsData = announcements }) {
  const featured = articlesData.find((a) => a.featured);
  const insightArticleCards = articlesData.filter((a) => !a.featured);
  const router = useRouter();
  const params = useSearchParams();
  const urlCategory = params.get('category');
  const tab = tabs.includes(urlCategory) ? urlCategory : 'All';
  const setTab = (next) => {
    router.replace(next === 'All' ? '/insights' : `/insights?category=${encodeURIComponent(next)}`, { scroll: false });
  };
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const visible = tab === 'All' ? insightArticleCards : insightArticleCards.filter((a) => a.category === tab);

  const subscribe = async () => {
    if (!/.+@.+\..+/.test(email)) { setEmailError(true); return; }
    const res = await fetch('/api/forms/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    }).catch(() => null);
    if (res?.ok) setSubscribed(true);
    else setEmailError(true);
  };

  return (
    <>
      <PageHero eyebrow="Insights" title="Thinking That Powers the Transition" maxTitle="max-w-[760px]">
        Blog, news, events, and announcements from the front line of clean energy execution.
      </PageHero>

      {/* Featured */}
      {featured && (
        <section className="bg-white px-8 pb-15 pt-[100px]">
          <div className="mx-auto max-w-[1280px]">
            <Reveal>
              <Link href={`/insights/${featured.slug}`} className="grid grid-cols-[repeat(auto-fit,minmax(340px,1fr))] overflow-hidden rounded-[20px] bg-navy no-underline shadow-[0_12px_40px_rgba(11,37,69,0.2)] transition-all hover:-translate-y-1.5 hover:shadow-[0_32px_64px_rgba(11,37,69,0.3)]">
                <div className="relative min-h-[320px]">
                  <img src={featured.img} alt={featured.title} className="absolute inset-0 h-full w-full object-cover" />
                </div>
                <div className="flex flex-col justify-center p-[52px] px-12">
                  <span className="mb-5 self-start rounded-full bg-champagne px-3.5 py-1.5 text-[11.5px] font-semibold uppercase tracking-[0.1em] text-navy">Featured · {featured.category}</span>
                  <h2 className="m-0 mb-3.5 font-display text-[clamp(24px,2.6vw,32px)] font-semibold leading-[1.25] text-white">{featured.title}</h2>
                  <p className="m-0 mb-[22px] text-[15.5px] leading-relaxed text-white/[0.78]">{featured.excerpt}</p>
                  <p className="m-0 text-[13.5px] text-white/55">By {featured.author} · {featured.date} · {featured.read}</p>
                </div>
              </Link>
            </Reveal>
          </div>
        </section>
      )}

      {/* Article grid */}
      <section className="bg-white px-8 pb-[100px] pt-15">
        <div className="mx-auto max-w-[1280px]">
          <div className="mb-11"><FilterPills options={tabs} value={tab} onChange={setTab} tone="navy" /></div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-7">
            {visible.map((a) => (
              <Link key={a.slug} href={`/insights/${a.slug}`} className="flex flex-col overflow-hidden rounded-2xl bg-white text-inherit no-underline shadow-card transition-all hover:-translate-y-1.5 hover:shadow-card-hover">
                <div className="aspect-[16/9] overflow-hidden"><img src={a.img} alt={a.title} className="h-full w-full object-cover" /></div>
                <div className="flex flex-1 flex-col p-6 pb-7">
                  <div className="mb-3.5 flex items-center gap-3">
                    <span className="rounded-full bg-[#EEF2F7] px-3 py-1 text-[11.5px] font-semibold uppercase tracking-[0.08em] text-navy">{a.category}</span>
                    <span className="text-[13px] text-faint-soft">{a.date}</span>
                  </div>
                  <h3 className="m-0 mb-2.5 font-display text-lg font-semibold leading-snug text-navy">{a.title}</h3>
                  <p className="m-0 mb-[18px] flex-1 text-sm leading-relaxed text-muted">{a.excerpt}</p>
                  <p className="m-0 text-[13px] text-faint-soft">{a.author} · {a.read}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Events */}
      <section id="events" className="bg-cream px-8 py-[100px]">
        <div className="mx-auto max-w-[1280px]">
          <Reveal><SectionHeading eyebrow="Events" title="Meet us in the field" className="mb-13" /></Reveal>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
            {eventsData.map((e, i) => (
              <Reveal key={e.title} delay={i * 0.1}>
                <div className="flex h-full flex-col rounded-2xl bg-white p-8 px-[30px] shadow-card">
                  <div className="mb-[18px] flex items-center justify-between">
                    <span className={`self-start rounded-full px-[13px] py-[5px] text-[11.5px] font-semibold uppercase tracking-[0.08em] ${e.primary ? 'bg-sand text-gold' : 'bg-[#EEF1F0] text-faint'}`}>{e.status}</span>
                    <span className="text-[13.5px] text-faint">{e.date}</span>
                  </div>
                  <h3 className="m-0 mb-2 font-display text-[18.5px] font-semibold text-navy">{e.title}</h3>
                  <p className="m-0 mb-5 flex-1 text-sm leading-relaxed text-muted">{e.desc}</p>
                  {e.primary ? (
                    <Link href="/contact" className="self-start rounded-lg bg-gold px-6 py-[11px] font-display text-sm font-semibold text-white no-underline">{e.cta}</Link>
                  ) : (
                    <Link href="/contact" className="self-start font-display text-sm font-semibold text-gold no-underline">{e.cta}</Link>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Announcements */}
      <section className="bg-white px-8 py-[100px]">
        <div className="mx-auto max-w-[860px]">
          <Reveal><SectionHeading eyebrow="Company Announcements" title="Milestones & updates" className="mb-13" /></Reveal>
          <div className="flex flex-col">
            {announcementsData.map((an, i) => (
              <Reveal key={an.title} delay={i * 0.06}>
                <div className="flex gap-6">
                  <div className="flex flex-col items-center">
                    <span className="mt-1 h-3.5 w-3.5 flex-shrink-0 rounded-full border-[3px] border-sand-dark bg-gold" />
                    <span className="w-0.5 flex-1 bg-line-soft" />
                  </div>
                  <div className="pb-9">
                    <p className="m-0 mb-1 font-display text-[13px] font-bold text-gold">{an.date}</p>
                    <p className="m-0 mb-1.5 font-display text-[17.5px] font-semibold text-navy">{an.title}</p>
                    <p className="m-0 text-[14.5px] leading-relaxed text-muted">{an.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-white px-8 pb-[100px]">
        <div className="mx-auto max-w-[760px] text-center">
          <SectionHeading center eyebrow="Newsletter" title="The transition, in your inbox" sub="One monthly email — project learnings, programme launches, and event invites. No noise." className="mb-8" />
          {subscribed ? (
            <p className="m-0 inline-block rounded-[10px] bg-sand px-7 py-3.5 text-[15px] font-semibold text-gold">✓ You're subscribed. See you next month.</p>
          ) : (
            <>
              <div className="flex flex-wrap justify-center gap-3">
                <input value={email} onChange={(e) => { setEmail(e.target.value); setEmailError(false); }} type="email" placeholder="you@company.com" aria-label="Email address"
                  className="min-w-[260px] max-w-[380px] flex-1 rounded-[10px] border-[1.5px] border-line-soft px-5 py-[15px] text-[15px] text-body outline-none focus:border-gold" />
                <button onClick={subscribe} className="rounded-[10px] bg-gold px-[30px] py-[15px] font-display text-[15px] font-semibold text-white transition-colors hover:bg-gold-dark">Subscribe</button>
              </div>
              {emailError && <p className="m-0 mt-3 text-[13.5px] text-[#C0392B]">Please enter a valid email address.</p>}
            </>
          )}
        </div>
      </section>

      <CtaBand heading="Have a Story Worth Telling?" sub="Partner announcements, joint case studies, and event collaborations — we're listening." />
    </>
  );
}
