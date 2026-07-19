import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { isValidSession, SESSION_COOKIE } from '@/lib/adminAuth';
import { collections, submissionTypes } from '@/lib/cms';
import AdminLogoutButton from '@/components/admin/AdminLogoutButton';

export const dynamic = 'force-dynamic';

export const metadata = { title: 'CMS', robots: { index: false, follow: false } };

export default async function AdminLayout({ children }) {
  const store = await cookies();
  if (!isValidSession(store.get(SESSION_COOKIE)?.value)) redirect('/admin/login');

  return (
    <div className="mx-auto flex max-w-[1280px] flex-col gap-10 px-8 py-14 lg:flex-row">
      <aside className="w-full flex-shrink-0 lg:w-[230px]">
        <p className="m-0 mb-5 font-display text-lg font-semibold text-navy">Ecoconnect CMS</p>
        <nav aria-label="Admin" className="flex flex-col gap-1">
          <Link href="/admin" className="rounded-lg px-3.5 py-2.5 text-sm font-semibold text-navy no-underline hover:bg-cream">Dashboard</Link>
          <p className="m-0 mb-1 mt-4 text-[11.5px] font-semibold uppercase tracking-[0.1em] text-faint">Submissions</p>
          {Object.entries(submissionTypes).map(([key, t]) => (
            <Link key={key} href={`/admin/submissions/${key}`} className="rounded-lg px-3.5 py-2 text-sm text-body no-underline hover:bg-cream hover:text-gold">{t.label}</Link>
          ))}
          <p className="m-0 mb-1 mt-4 text-[11.5px] font-semibold uppercase tracking-[0.1em] text-faint">Content</p>
          {Object.entries(collections).map(([key, c]) => (
            <Link key={key} href={`/admin/content/${key}`} className="rounded-lg px-3.5 py-2 text-sm text-body no-underline hover:bg-cream hover:text-gold">{c.label}</Link>
          ))}
        </nav>
        <div className="mt-6"><AdminLogoutButton /></div>
      </aside>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
