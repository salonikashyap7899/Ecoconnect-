'use client';

import { useEffect, useRef, useState } from 'react';

// Grid of animated count-up stats. Starts counting the first time it enters view.
// stats: [{ target, suffix, label }]
export default function StatCounter({ stats, className = '', valueClass = '', labelClass = '' }) {
  const ref = useRef(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setP(1);
      return;
    }
    let done = false;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !done) {
          done = true;
          io.disconnect();
          const t0 = performance.now();
          const dur = 1400;
          const tick = (t) => {
            const q = Math.min(1, (t - t0) / dur);
            setP(1 - Math.pow(1 - q, 3));
            if (q < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {stats.map((s) => (
        <div key={s.label} className="text-center">
          <p className={valueClass || 'font-display text-[46px] font-bold text-champagne'}>
            {Math.round(s.target * p).toLocaleString('en-IN')}
            <span className="text-[0.6em]">{s.suffix}</span>
          </p>
          <p className={labelClass || 'mt-1.5 text-sm font-medium text-white/70'}>{s.label}</p>
        </div>
      ))}
    </div>
  );
}
