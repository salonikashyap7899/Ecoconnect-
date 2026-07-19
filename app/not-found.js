import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="grid min-h-[calc(100vh-76px)] place-items-center bg-cream px-8 py-20">
      <div className="max-w-[540px] text-center">
        <p className="m-0 mb-2 font-display text-[clamp(80px,14vw,140px)] font-bold leading-none text-gold/25">404</p>
        <h1 className="m-0 mb-4 font-display text-[clamp(28px,3.5vw,40px)] font-bold text-navy">Page not found</h1>
        <p className="m-0 mb-9 text-[16.5px] leading-relaxed text-muted-deep">The page you're looking for doesn't exist or has moved. Let's get you back on track.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/" className="rounded-lg bg-gold px-8 py-4 font-display text-[15.5px] font-semibold text-white no-underline transition-all hover:-translate-y-0.5 hover:bg-gold-dark">Back to Home</Link>
          <Link href="/contact" className="rounded-lg border-[1.5px] border-gold px-8 py-4 font-display text-[15.5px] font-semibold text-gold no-underline transition-all hover:bg-gold hover:text-white">Contact Us</Link>
        </div>
      </div>
    </section>
  );
}
