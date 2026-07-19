'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// Attaches a magnetic pull effect to any [data-magnetic] element currently in
// the DOM. Re-scans on route change so newly-mounted CTAs get wired up.
export default function Magnetic() {
  const pathname = usePathname();

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const els = Array.from(document.querySelectorAll('[data-magnetic]'));
    const cleanups = els.map((el) => {
      const onMove = (e) => {
        const r = el.getBoundingClientRect();
        const mx = e.clientX - (r.left + r.width / 2);
        const my = e.clientY - (r.top + r.height / 2);
        el.style.transition = 'transform 0.15s ease-out';
        el.style.transform = `translate(${(mx * 0.25).toFixed(1)}px, ${(my * 0.25).toFixed(1)}px)`;
      };
      const onLeave = () => {
        el.style.transition = 'transform 0.5s cubic-bezier(0.22,1,0.36,1)';
        el.style.transform = 'translate(0,0)';
      };
      el.addEventListener('pointermove', onMove);
      el.addEventListener('pointerleave', onLeave);
      return () => {
        el.removeEventListener('pointermove', onMove);
        el.removeEventListener('pointerleave', onLeave);
      };
    });
    return () => cleanups.forEach((fn) => fn());
  }, [pathname]);

  return null;
}
