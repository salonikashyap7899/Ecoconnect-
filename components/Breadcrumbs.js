'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const labels = {
  about: 'About', capabilities: 'Capabilities', skilling: 'Skilling', simulation: 'Simulation',
  services: 'Services', projects: 'Projects', insights: 'Insights', careers: 'Careers',
  contact: 'Contact', legal: 'Legal', search: 'Search', 'thank-you': 'Thank You',
};

// Auto-generated breadcrumb trail for inner pages (hidden on the home page).
export default function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);
  if (!segments.length) return null;

  const crumbs = segments.map((seg, i) => ({
    label: labels[seg] || seg.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
    href: '/' + segments.slice(0, i + 1).join('/'),
    last: i === segments.length - 1,
  }));

  return (
    <nav aria-label="Breadcrumb" className="mb-[22px] text-[13.5px]">
      <Link href="/" className="text-white/65 no-underline transition-colors hover:text-white">Home</Link>
      {crumbs.map((c) => (
        <span key={c.href}>
          <span className="px-2 text-white/40">/</span>
          {c.last
            ? <span className="text-champagne">{c.label}</span>
            : <Link href={c.href} className="text-white/65 no-underline transition-colors hover:text-white">{c.label}</Link>}
        </span>
      ))}
    </nav>
  );
}
