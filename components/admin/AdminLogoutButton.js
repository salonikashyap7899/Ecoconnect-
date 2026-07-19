'use client';

import { useRouter } from 'next/navigation';

export default function AdminLogoutButton() {
  const router = useRouter();
  return (
    <button
      onClick={async () => { await fetch('/api/admin/logout', { method: 'POST' }); router.push('/admin/login'); }}
      className="rounded-lg border-[1.5px] border-line-soft px-4 py-2 text-[13px] font-semibold text-muted hover:border-gold hover:text-gold"
    >
      Sign Out
    </button>
  );
}
