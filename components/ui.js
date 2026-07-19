import Link from 'next/link';
import Hero3D from './Hero3D';
import Reveal from './Reveal';
import Breadcrumbs from './Breadcrumbs';

// Eyebrow label — small uppercase kicker with optional leading rule.
export function Eyebrow({ children, tone = 'gold', rule = false, className = '' }) {
  const color = tone === 'champagne' ? 'text-champagne' : 'text-gold';
  return (
    <p className={`m-0 inline-flex items-center gap-2.5 text-[13px] font-semibold uppercase tracking-[0.16em] ${color} ${className}`}>
      {rule && <span className="inline-block h-0.5 w-[30px] bg-current" />}
      {children}
    </p>
  );
}

// Standard inner hero band (navy + animated Hero3D) used on interior pages.
export function PageHero({ eyebrow, title, children, actions, align = 'left', maxTitle = 'max-w-[780px]' }) {
  const center = align === 'center';
  return (
    <section className="relative overflow-hidden bg-navy px-8 pb-[130px] pt-[150px]">
      <Hero3D />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(100deg,rgba(5,17,33,0.78)_25%,rgba(5,17,33,0.35))]" aria-hidden="true" />
      <div className={`relative mx-auto max-w-[1280px] ${center ? 'text-center' : ''}`}>
        <Reveal>
          {!center && <Breadcrumbs />}
          {eyebrow && <Eyebrow tone="champagne" className="mb-[18px]">{eyebrow}</Eyebrow>}
          <h1 className={`m-0 mb-6 font-display text-[clamp(34px,4.4vw,56px)] font-bold leading-[1.12] text-white text-balance ${center ? 'mx-auto' : ''} ${maxTitle}`}>{title}</h1>
          {children && <div className={`text-[17.5px] leading-relaxed text-white/85 ${center ? 'mx-auto' : ''} max-w-[680px]`}>{children}</div>}
          {actions && <div className={`mt-9 flex flex-wrap gap-4 ${center ? 'justify-center' : ''}`}>{actions}</div>}
        </Reveal>
      </div>
    </section>
  );
}

// Gold primary CTA (magnetic).
export function GoldButton({ href, children, className = '' }) {
  return (
    <Link href={href} data-magnetic
      className={`inline-block rounded-lg bg-gold px-8 py-4 font-display text-[15.5px] font-semibold text-white no-underline shadow-gold transition-all hover:-translate-y-0.5 hover:bg-gold-light ${className}`}>
      {children}
    </Link>
  );
}

// Ghost / outline button on dark backgrounds.
export function GhostButton({ href, children, className = '' }) {
  return (
    <Link href={href}
      className={`inline-block rounded-lg border-[1.5px] border-white/45 bg-white/5 px-8 py-4 font-display text-[15.5px] font-semibold text-white no-underline backdrop-blur-sm transition-all hover:border-white hover:bg-white/12 ${className}`}>
      {children}
    </Link>
  );
}

// Section heading block.
export function SectionHeading({ eyebrow, title, sub, center = false, tone = 'gold', titleColor = 'text-navy', className = '' }) {
  return (
    <div className={`${center ? 'mx-auto text-center' : ''} max-w-[660px] ${className}`}>
      {eyebrow && <Eyebrow tone={tone} className="mb-3.5">{eyebrow}</Eyebrow>}
      <h2 className={`m-0 font-display text-[clamp(30px,3.4vw,40px)] font-semibold leading-[1.2] ${titleColor} text-balance`}>{title}</h2>
      {sub && <p className={`mt-4 text-[16.5px] leading-relaxed ${titleColor === 'text-white' ? 'text-white/75' : 'text-muted-deep'}`}>{sub}</p>}
    </div>
  );
}

// Bottom CTA band that appears above the global footer on each page.
export function CtaBand({ heading, sub }) {
  return (
    <section className="relative overflow-hidden bg-navy px-8 py-[100px]">
      <div aria-hidden="true" className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1900&q=80')] bg-cover bg-center" />
      <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(100deg,rgba(6,20,38,0.92),rgba(27,107,74,0.82))]" />
      <div className="relative mx-auto max-w-[860px] text-center">
        <h2 className="m-0 mb-[18px] font-display text-[clamp(30px,4vw,46px)] font-bold text-white text-balance">{heading}</h2>
        <p className="mx-auto mb-10 max-w-[640px] text-[17px] leading-relaxed text-white/85">{sub}</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/contact" className="rounded-lg bg-white px-[34px] py-[15px] font-display text-base font-semibold text-gold no-underline transition-all hover:-translate-y-0.5 hover:text-navy hover:shadow-[0_10px_24px_rgba(0,0,0,0.25)]">Contact Us</Link>
          <Link href="/contact" className="rounded-lg border-[1.5px] border-white/55 px-[34px] py-[15px] font-display text-base font-semibold text-white no-underline transition-all hover:border-white hover:bg-white/10">Partner With Us</Link>
        </div>
      </div>
    </section>
  );
}
