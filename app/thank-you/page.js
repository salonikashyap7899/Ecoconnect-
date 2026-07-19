import Link from 'next/link';

export const metadata = {
  title: 'Thank You',
  description: 'Your submission has been received — the Ecoconnect team will respond within one business day.',
};

export default function ThankYouPage() {
  return (
    <section className="grid min-h-[calc(100vh-76px)] place-items-center bg-cream px-8 py-20">
      <div className="max-w-[560px] text-center">
        <span className="mb-7 inline-grid h-[70px] w-[70px] place-items-center rounded-full bg-gradient-to-br from-gold to-gold-light font-display text-[28px] font-bold text-white">✓</span>
        <h1 className="m-0 mb-4 font-display text-[clamp(30px,4vw,44px)] font-bold text-navy">Thank You</h1>
        <p className="m-0 mb-9 text-[17px] leading-relaxed text-muted-deep">Your submission has been received. Our team reviews every message and will get back to you within one business day.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/" className="rounded-lg bg-gold px-8 py-4 font-display text-[15.5px] font-semibold text-white no-underline transition-all hover:-translate-y-0.5 hover:bg-gold-dark">Back to Home</Link>
          <Link href="/insights" className="rounded-lg border-[1.5px] border-gold px-8 py-4 font-display text-[15.5px] font-semibold text-gold no-underline transition-all hover:bg-gold hover:text-white">Read Our Insights</Link>
        </div>
      </div>
    </section>
  );
}
