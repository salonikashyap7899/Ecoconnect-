'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { socials } from '@/lib/data';

const columns = [
  { title: 'Company', links: [['About', '/about'], ['Leadership', '/about'], ['Careers', '/careers'], ['Contact', '/contact']] },
  { title: 'Capabilities', links: [['Skilling', '/skilling'], ['Simulation', '/simulation'], ['Services', '/services'], ['Projects', '/projects']] },
  { title: 'Resources', links: [['Blog', '/insights?category=Blog'], ['News', '/insights?category=News'], ['Events', '/insights#events'], ['Announcements', '/insights?category=Announcement'], ['Search', '/search']] },
];

export default function SiteFooter() {
  const [showTop, setShowTop] = useState(false);
  const [consent, setConsent] = useState('pending');
  const [customizing, setCustomizing] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    try { setConsent(localStorage.getItem('ec_cookie_consent')); } catch { setConsent(null); }
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const save = (v) => {
    try { localStorage.setItem('ec_cookie_consent', v); } catch {}
    setConsent(v);
  };

  return (
    <>
      <footer className="bg-navy-deep px-8 pt-20 text-white/75">
        <div className="mx-auto max-w-[1280px]">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-12 pb-16">
            <div>
              <div className="mb-5 flex items-center gap-2.5">
                <span className="grid h-9 w-9 place-items-center rounded-[9px] bg-gradient-to-br from-gold to-gold-light font-display text-[17px] font-bold text-white">E</span>
                <span className="font-display text-lg font-semibold text-white">Ecoconnect Services</span>
              </div>
              <p className="mb-6 max-w-[300px] text-[14.5px] leading-relaxed">Enabling the clean energy and sustainable mobility transition through Skilling, Simulation, and Services.</p>
              <div className="flex gap-2.5">
                {socials.map((s) => (
                  <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.name}
                     className="grid h-[38px] w-[38px] place-items-center rounded-lg border border-white/20 text-xs font-semibold text-white/80 no-underline transition-all hover:border-gold hover:bg-gold hover:text-white">
                    {s.glyph}
                  </a>
                ))}
              </div>
            </div>
            {columns.map((col) => (
              <nav key={col.title} aria-label={`${col.title} footer`}>
                <p className="mb-[18px] font-display text-[13.5px] font-semibold uppercase tracking-[0.1em] text-champagne-soft">{col.title}</p>
                <div className="flex flex-col gap-3">
                  {col.links.map(([label, href], i) => (
                    <Link key={`${label}-${i}`} href={href} className="text-[14.5px] text-white/70 no-underline transition-colors hover:text-champagne-soft">{label}</Link>
                  ))}
                </div>
              </nav>
            ))}
            <div>
              <p className="mb-[18px] font-display text-[13.5px] font-semibold uppercase tracking-[0.1em] text-champagne-soft">Contact</p>
              <div className="flex flex-col gap-3 text-[14.5px] leading-relaxed">
                <p>512 Tower-A, DLF Corporate Greens<br />Gurugram, Haryana, India</p>
                <a href="tel:+919958550225" className="text-white/70 no-underline transition-colors hover:text-champagne-soft">+91 99585 50225</a>
                <a href="mailto:info@ecoconnectservices.com" className="text-white/70 no-underline transition-colors hover:text-champagne-soft">info@ecoconnectservices.com</a>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-6 border-t border-white/10 py-6">
            <p className="text-[13.5px] text-white/50">© 2026 Ecoconnect Services. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/legal#privacy" className="text-[13.5px] text-white/50 no-underline transition-colors hover:text-champagne-soft">Privacy Policy</Link>
              <Link href="/legal#terms" className="text-[13.5px] text-white/50 no-underline transition-colors hover:text-champagne-soft">Terms &amp; Conditions</Link>
              <Link href="/legal#cookies" className="text-[13.5px] text-white/50 no-underline transition-colors hover:text-champagne-soft">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </footer>

      {showTop && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top"
                className="fixed bottom-7 right-7 z-90 h-12 w-12 rounded-full bg-gold text-lg text-white shadow-[0_8px_20px_rgba(27,107,74,0.35)] transition-all hover:-translate-y-0.5 hover:bg-navy">
          ↑
        </button>
      )}

      {consent === null && (
        <div role="dialog" aria-label="Cookie consent" className="fixed inset-x-6 bottom-6 z-[250] mx-auto max-w-[680px] rounded-2xl border border-line bg-white p-7 shadow-[0_24px_64px_rgba(11,37,69,0.3)]">
          <p className="mb-2 font-display text-base font-semibold text-navy">We value your privacy</p>
          <p className="mb-[18px] text-[13.5px] leading-relaxed text-muted">We use cookies to improve your experience and analyse site traffic. See our <Link href="/legal#cookies" className="text-gold">Cookie Policy</Link>.</p>
          {customizing && (
            <div className="mb-[18px] flex flex-col gap-2.5">
              <label className="flex items-center gap-2.5 text-sm text-body"><input type="checkbox" checked disabled /> Essential cookies (always on)</label>
              <label className="flex cursor-pointer items-center gap-2.5 text-sm text-body"><input type="checkbox" checked={analytics} onChange={() => setAnalytics((v) => !v)} /> Analytics cookies</label>
              <label className="flex cursor-pointer items-center gap-2.5 text-sm text-body"><input type="checkbox" checked={marketing} onChange={() => setMarketing((v) => !v)} /> Marketing cookies</label>
            </div>
          )}
          <div className="flex flex-wrap gap-3">
            <button onClick={() => save('all')} className="rounded-lg bg-gold px-[22px] py-2.5 font-display text-[13.5px] font-semibold text-white">Accept All</button>
            <button onClick={() => save('essential')} className="rounded-lg border-[1.5px] border-line-soft bg-white px-[22px] py-2.5 font-display text-[13.5px] font-semibold text-navy">Reject Non-Essential</button>
            {customizing ? (
              <button onClick={() => save(`custom:analytics=${analytics},marketing=${marketing}`)} className="rounded-lg bg-navy px-[22px] py-2.5 font-display text-[13.5px] font-semibold text-white">Save Preferences</button>
            ) : (
              <button onClick={() => setCustomizing(true)} className="px-3 py-2.5 font-display text-[13.5px] font-semibold text-gold underline">Customize</button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
