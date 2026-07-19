import Link from 'next/link';
import { collections, getCollection, getSubmissions, submissionTypes } from '@/lib/cms';

export const dynamic = 'force-dynamic';

export default function AdminDashboard() {
  const subCounts = Object.keys(submissionTypes).map((key) => ({
    key, label: submissionTypes[key].label, items: getSubmissions(key) || [],
  }));
  const contentCounts = Object.keys(collections).map((key) => ({
    key, label: collections[key].label, count: (getCollection(key) || []).length,
  }));
  const latestEnquiries = (getSubmissions('enquiries') || []).slice(0, 5);
  const pendingCount = subCounts.reduce((n, s) => n + s.items.filter((i) => i.status === 'New').length, 0);

  return (
    <div>
      <h1 className="m-0 mb-1.5 font-display text-[26px] font-semibold text-navy">Dashboard</h1>
      <p className="m-0 mb-9 text-[14.5px] text-muted">{pendingCount} new submission{pendingCount === 1 ? '' : 's'} awaiting review.</p>

      <div className="mb-10 grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-4">
        {subCounts.map((s) => (
          <Link key={s.key} href={`/admin/submissions/${s.key}`} className="rounded-2xl bg-cream p-6 no-underline transition-all hover:-translate-y-0.5 hover:shadow-card">
            <p className="m-0 font-display text-[30px] font-bold text-gold">{s.items.length}</p>
            <p className="m-0 text-[13.5px] font-semibold text-navy">{s.label}</p>
          </Link>
        ))}
      </div>

      <h2 className="m-0 mb-4 font-display text-lg font-semibold text-navy">Latest Enquiries</h2>
      {latestEnquiries.length ? (
        <div className="mb-10 flex flex-col gap-2.5">
          {latestEnquiries.map((e) => (
            <div key={e.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-line p-4 px-5">
              <div>
                <p className="m-0 text-sm font-semibold text-navy">{e.name} · {e.category}</p>
                <p className="m-0 text-[13px] text-faint">{e.subject} — {new Date(e.createdAt).toLocaleString()}</p>
              </div>
              <span className={`rounded-full px-3 py-1 text-[11.5px] font-semibold uppercase tracking-[0.08em] ${e.status === 'New' ? 'bg-sand text-gold' : e.status === 'Closed' ? 'bg-cream text-faint' : 'bg-champagne text-navy'}`}>{e.status}</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="mb-10 text-[14px] text-faint">No enquiries yet.</p>
      )}

      <h2 className="m-0 mb-4 font-display text-lg font-semibold text-navy">Content Modules</h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
        {contentCounts.map((c) => (
          <Link key={c.key} href={`/admin/content/${c.key}`} className="rounded-xl border border-line p-5 no-underline transition-all hover:border-gold">
            <p className="m-0 text-sm font-semibold text-navy">{c.label}</p>
            <p className="m-0 text-[13px] text-faint">{c.count} item{c.count === 1 ? '' : 's'}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
