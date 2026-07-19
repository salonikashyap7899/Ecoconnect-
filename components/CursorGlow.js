'use client';

import { useEffect } from 'react';

// Site-wide premium cursor: a soft gold halo that trails the pointer and blooms
// over links/buttons. Fine-pointer devices only (hidden on touch via CSS).
export default function CursorGlow() {
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const cursor = document.createElement('div');
    cursor.className = 'ec-cursor';
    cursor.setAttribute('aria-hidden', 'true');
    cursor.style.cssText =
      'position:fixed;top:0;left:0;width:24px;height:24px;border-radius:50%;pointer-events:none;z-index:9999;' +
      'background:radial-gradient(circle, rgba(216,190,145,0.55) 0%, rgba(216,190,145,0) 72%);' +
      'transform:translate3d(-50%,-50%,0);opacity:0;' +
      'transition:opacity 0.35s ease, width 0.3s cubic-bezier(0.22,1,0.36,1), height 0.3s cubic-bezier(0.22,1,0.36,1);';
    document.body.appendChild(cursor);

    let cx = -100, cy = -100, cxT = -100, cyT = -100, raf = null;

    const onMove = (e) => {
      cxT = e.clientX;
      cyT = e.clientY;
      if (cursor.style.opacity !== '1') cursor.style.opacity = '1';
    };
    const onOut = () => { cursor.style.opacity = '0'; };
    const onOver = (e) => {
      if (e.target.closest && e.target.closest('a, button')) { cursor.style.width = '44px'; cursor.style.height = '44px'; }
    };
    const onOverOut = (e) => {
      if (e.target.closest && e.target.closest('a, button')) { cursor.style.width = '24px'; cursor.style.height = '24px'; }
    };

    const loop = () => {
      cx += (cxT - cx) * 0.2;
      cy += (cyT - cy) * 0.2;
      cursor.style.transform = `translate3d(${cx.toFixed(1)}px,${cy.toFixed(1)}px,0) translate(-50%,-50%)`;
      raf = requestAnimationFrame(loop);
    };
    loop();

    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', onOut);
    document.addEventListener('pointerover', onOver);
    document.addEventListener('pointerout', onOverOut);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      cursor.remove();
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('mouseleave', onOut);
      document.removeEventListener('pointerover', onOver);
      document.removeEventListener('pointerout', onOverOut);
    };
  }, []);

  return null;
}
