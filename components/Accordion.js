'use client';

import { useState } from 'react';

// Reusable single-open accordion. `items` render via the `renderBody` prop so
// callers control the body markup (service portfolio, FAQs, etc.).
export default function Accordion({ items, defaultOpen = 0, renderTitle, renderBody, itemClass = '', compact = false }) {
  const [open, setOpen] = useState(defaultOpen);
  const pad = compact ? 'px-[26px] py-[22px]' : 'px-[30px] py-[26px]';

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className={`overflow-hidden rounded-xl bg-white shadow-card ${itemClass}`}>
            <button
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              className={`flex w-full cursor-pointer items-center justify-between gap-[18px] border-none bg-transparent text-left ${pad}`}
            >
              {renderTitle(item, i)}
              <span aria-hidden="true" className="flex-shrink-0 text-xl text-gold">{isOpen ? '−' : '+'}</span>
            </button>
            {isOpen && renderBody(item, i)}
          </div>
        );
      })}
    </div>
  );
}
