'use client';

import Link from 'next/link';

// Custom branded 500 / runtime error page (WRS §22.7).
export default function Error({ reset }) {
  return (
    <section className="grid min-h-[calc(100vh-76px)] place-items-center bg-cream px-8 py-20">
      <div className="max-w-[540px] text-center">
        <p className="m-0 mb-2 font-display text-[clamp(80px,14vw,140px)] font-bold leading-none text-gold/25">500</p>
        <h1 className="m-0 mb-4 font-display text-[clamp(28px,3.5vw,40px)] font-bold text-navy">Something went wrong</h1>
        <p className="m-0 mb-9 text-[16.5px] leading-relaxed text-muted-deep">An unexpected error occurred on our side. Please try again — if the problem persists, our team would like to hear about it.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <button onClick={() => reset()} className="rounded-lg bg-gold px-8 py-4 font-display text-[15.5px] font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-gold-dark">Try Again</button>
          <Link href="/" className="rounded-lg border-[1.5px] border-gold px-8 py-4 font-display text-[15.5px] font-semibold text-gold no-underline transition-all hover:bg-gold hover:text-white">Back to Home</Link>
        </div>
      </div>
    </section>
  );
}
