import Link from 'next/link';

export const metadata = { title: 'Legal' };

const sections = [
  {
    id: 'privacy', title: 'Privacy Policy',
    body: [
      ['', 'Ecoconnect Services ("we", "us") respects your privacy. This policy describes what personal information we collect through this website, how we use it, and the choices you have.'],
      ['Information we collect.', 'Contact details you submit through enquiry, application, or newsletter forms (name, email, phone, organisation, uploaded documents), and standard usage data collected via analytics cookies.'],
      ['How we use it.', 'To respond to enquiries, process applications, send requested communications, and improve the website. We do not sell personal information.'],
      ['Retention & rights.', 'We retain data only as long as needed for these purposes. You may request access, correction, or deletion of your data by writing to info@ecoconnectservices.com.'],
    ],
  },
  {
    id: 'terms', title: 'Terms & Conditions',
    body: [
      ['Use of this website.', 'Content on this website is provided for general information about Ecoconnect Services and its capabilities. It does not constitute a contractual offer or professional advice.'],
      ['Intellectual property.', 'All text, graphics, logos, and imagery on this website are the property of Ecoconnect Services or their respective owners and may not be reproduced without permission.'],
      ['Limitation of liability.', 'While we strive for accuracy, we make no warranties regarding the completeness of website content and accept no liability for decisions made based upon it.'],
      ['Governing law.', 'These terms are governed by the laws of India, with courts in Gurugram, Haryana having exclusive jurisdiction.'],
    ],
  },
  {
    id: 'cookies', title: 'Cookie Policy',
    body: [
      ['Essential cookies', 'are required for core site functionality (e.g., remembering your cookie preferences) and are always active.'],
      ['Analytics cookies', 'help us understand how visitors use the site (e.g., Google Analytics) so we can improve it. These are set only with your consent.'],
      ['Marketing cookies', 'may be used to measure the effectiveness of our communications. These are set only with your consent.'],
      ['', 'You can change your preferences at any time via the cookie banner or your browser settings.'],
    ],
  },
];

export default function LegalPage() {
  return (
    <>
      <section className="bg-navy px-8 pb-15 pt-[110px]">
        <div className="mx-auto max-w-[860px]">
          <p className="m-0 mb-3.5 text-[13px] font-semibold uppercase tracking-[0.16em] text-champagne">Legal</p>
          <h1 className="m-0 mb-5 font-display text-[clamp(30px,4vw,44px)] font-bold text-white">Policies &amp; Terms</h1>
          <div className="flex flex-wrap gap-3">
            {sections.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="rounded-full border-[1.5px] border-white/35 px-5 py-[9px] font-display text-sm font-semibold text-white no-underline transition-colors hover:border-champagne hover:text-champagne">{s.title}</a>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-white px-8 pb-[100px] pt-20">
        <div className="mx-auto flex max-w-[860px] flex-col gap-[72px]">
          {sections.map((s) => (
            <article key={s.id} id={s.id} className="scroll-mt-24">
              <h2 className="m-0 mb-2 font-display text-[28px] font-semibold text-navy">{s.title}</h2>
              <p className="m-0 mb-6 text-[13.5px] text-faint-soft">Last updated: July 2026 · Placeholder content pending legal review</p>
              <div className="flex flex-col gap-[18px] text-[15px] leading-[1.75] text-muted-deep">
                {s.body.map(([strong, text], i) => (
                  <p key={i} className="m-0">{strong && <strong className="text-navy">{strong} </strong>}{text}</p>
                ))}
              </div>
            </article>
          ))}
          <Link href="/" className="font-display text-[15px] font-semibold text-gold no-underline">← Back to Home</Link>
        </div>
      </section>
    </>
  );
}
