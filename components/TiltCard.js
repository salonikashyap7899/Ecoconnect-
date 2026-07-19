'use client';

import { useRef } from 'react';
import Link from 'next/link';

// Subtle GPU-only 3D tilt that follows the pointer, snapping back on leave.
// Pass `href` to render as a Next.js Link, otherwise renders a div.
export default function TiltCard({ href, className = '', children, max = 6, ...rest }) {
  const ref = useRef(null);
  const raf = useRef(null);

  function onMove(e) {
    const el = ref.current;
    if (!el || raf.current) return;
    raf.current = requestAnimationFrame(() => {
      raf.current = null;
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      el.style.transition = 'transform 0.12s ease-out, box-shadow 0.25s ease';
      el.style.transform = `perspective(1000px) rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg) translateY(-6px) scale(1.015)`;
    });
  }

  function onLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.transition = 'transform 0.5s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s ease';
    el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)';
  }

  const shared = {
    ref,
    className,
    style: { willChange: 'transform' },
    onPointerMove: onMove,
    onPointerLeave: onLeave,
    ...rest,
  };

  if (href) return <Link href={href} {...shared}>{children}</Link>;
  return <div {...shared}>{children}</div>;
}
