'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { nav } from '@/lib/data';

function activeKey(pathname) {
  if (pathname === '/') return 'home';
  const seg = '/' + pathname.split('/')[1];
  const map = {
    '/about': 'about', '/capabilities': 'capabilities', '/skilling': 'capabilities',
    '/simulation': 'capabilities', '/services': 'capabilities', '/projects': 'projects',
    '/insights': 'insights', '/careers': 'careers', '/contact': 'contact',
  };
  return map[seg] || '';
}

export default function SiteHeader() {
  const pathname = usePathname();
  const active = activeKey(pathname);
  const [open, setOpen] = useState(null);
  const [drawer, setDrawer] = useState(false);

  useEffect(() => { setDrawer(false); }, [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-[100] border-b border-line bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-[76px] max-w-[1280px] items-center justify-between gap-6 px-8">
        <Link href="/" className="flex items-center gap-2.5 no-underline">
          <span className="grid h-9 w-9 place-items-center rounded-[9px] bg-gradient-to-br from-gold to-gold-light font-display text-[17px] font-bold text-white">E</span>
          <span className="font-display text-lg font-semibold text-navy">Ecoconnect<span className="text-gold"> Services</span></span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-0.5 lg:flex">
          {nav.map((item, i) => (
            <div key={item.key} className="relative" onMouseEnter={() => setOpen(i)} onMouseLeave={() => setOpen(null)}>
              <Link
                href={item.href}
                className={`inline-flex items-center rounded-[7px] px-3.5 py-2.5 text-[15px] no-underline transition-colors hover:bg-cream hover:text-gold ${active === item.key ? 'font-semibold text-gold' : 'font-medium text-body'}`}
              >
                {item.label}
                {item.menu && <span className="ml-1.5 text-[9px] text-faint">▾</span>}
              </Link>
              {item.menu && open === i && (
                <div className="absolute left-0 top-full min-w-[224px] pt-2.5">
                  <div className="flex flex-col rounded-xl border border-line bg-white p-2 shadow-[0_16px_40px_rgba(11,37,69,0.14)]">
                    {item.menu.map((m) => (
                      <Link key={m.label} href={m.href} className="rounded-lg px-3.5 py-2.5 text-sm font-medium text-navy no-underline transition-colors hover:bg-cream hover:text-gold">
                        {m.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <Link
          href="/contact"
          data-magnetic
          className="hidden whitespace-nowrap rounded-lg bg-gold px-6 py-3 font-display text-sm font-semibold text-white no-underline shadow-[0_2px_8px_rgba(154,123,79,0.25)] transition-all hover:-translate-y-px hover:bg-gold-dark lg:inline-block"
        >
          Partner With Us
        </Link>

        <button
          onClick={() => setDrawer(true)}
          aria-label="Open menu"
          className="grid h-11 w-11 place-items-center rounded-lg border border-line bg-white hover:border-gold lg:hidden"
        >
          <span aria-hidden="true" className="flex flex-col gap-[5px]">
            <span className="block h-0.5 w-5 bg-navy" />
            <span className="block h-0.5 w-5 bg-navy" />
            <span className="block h-0.5 w-5 bg-navy" />
          </span>
        </button>
      </div>

      {drawer && (
        <div role="dialog" aria-label="Menu" className="fixed inset-0 z-[200] flex flex-col overflow-y-auto bg-navy px-7 pb-10 pt-6 lg:hidden">
          <div className="mb-9 flex items-center justify-between">
            <span className="font-display text-lg font-semibold text-white">Ecoconnect Services</span>
            <button onClick={() => setDrawer(false)} aria-label="Close menu" className="h-11 w-11 rounded-lg border border-white/25 text-lg text-white">✕</button>
          </div>
          <nav aria-label="Mobile" className="flex flex-col">
            {nav.map((item) => (
              <div key={item.key}>
                <Link href={item.href} className={`block border-b border-white/10 py-3.5 font-display text-xl font-semibold no-underline ${active === item.key ? 'text-champagne-soft' : 'text-white'}`}>
                  {item.label}
                </Link>
                {item.menu?.map((m) => (
                  <Link key={m.label} href={m.href} className="block border-b border-white/[0.06] py-2.5 pl-7 text-[15px] text-white/70 no-underline">
                    {m.label}
                  </Link>
                ))}
              </div>
            ))}
          </nav>
          <Link href="/contact" className="mt-8 rounded-lg bg-gold px-8 py-4 text-center font-display text-[17px] font-semibold text-white no-underline">
            Partner With Us
          </Link>
        </div>
      )}
    </header>
  );
}
