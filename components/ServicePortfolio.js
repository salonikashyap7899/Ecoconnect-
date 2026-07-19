'use client';

import { useState } from 'react';
import { servicePortfolio } from '@/lib/data';

const items = servicePortfolio.map((c, i) => ({ ...c, n: '0' + (i + 1) }));

export default function ServicePortfolio() {
  const [open, setOpen] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      {items.map((cat, i) => {
        const isOpen = open === i;
        return (
          <div key={cat.title} className="overflow-hidden rounded-[14px] bg-white shadow-card">
            <button
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              className="flex w-full cursor-pointer items-center justify-between gap-5 border-none bg-transparent px-[30px] py-[26px] text-left"
            >
              <span className="flex items-center gap-[18px]">
                <span className="grid h-[42px] w-[42px] flex-shrink-0 place-items-center rounded-[10px] bg-sand font-display text-[15px] font-bold text-gold">{cat.n}</span>
                <span className="font-display text-[19px] font-semibold text-navy">{cat.title}</span>
              </span>
              <span aria-hidden="true" className="flex-shrink-0 text-xl text-gold">{isOpen ? '−' : '+'}</span>
            </button>
            {isOpen && (
              <div className="px-[30px] pb-[30px] pl-[90px]">
                <p className="m-0 mb-[18px] text-[15px] leading-relaxed text-muted">{cat.desc}</p>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-2.5">
                  {cat.subs.map((sub) => (
                    <div key={sub} className="flex items-center gap-2.5 text-sm text-body"><span aria-hidden="true" className="font-bold text-gold">✓</span>{sub}</div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
