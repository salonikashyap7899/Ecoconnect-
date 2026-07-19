'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const inputClass = 'w-full box-border rounded-[10px] border-[1.5px] border-line-soft bg-white px-4 py-[13px] text-[14.5px] text-body outline-none focus:border-gold';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    setBusy(false);
    if (res.ok) router.push('/admin');
    else setError((await res.json().catch(() => ({}))).error || 'Login failed.');
  };

  return (
    <section className="grid min-h-[calc(100vh-76px)] place-items-center bg-cream px-8 py-20">
      <form onSubmit={submit} className="w-full max-w-[400px] rounded-[20px] border border-line bg-white p-10 shadow-card">
        <h1 className="m-0 mb-1.5 font-display text-[22px] font-semibold text-navy">CMS Login</h1>
        <p className="m-0 mb-7 text-[13.5px] text-faint">Authorised administrators only.</p>
        <label className="mb-[7px] block text-[13.5px] font-semibold text-navy">Username</label>
        <input value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="username" className={`${inputClass} mb-[18px]`} />
        <label className="mb-[7px] block text-[13.5px] font-semibold text-navy">Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" className={inputClass} />
        {error && <p className="m-0 mt-4 text-sm text-[#C0392B]">{error}</p>}
        <button disabled={busy} className="mt-7 w-full rounded-[10px] bg-gold px-10 py-3.5 font-display text-[15px] font-semibold text-white transition-colors hover:bg-gold-dark disabled:opacity-60">
          {busy ? 'Signing in…' : 'Sign In'}
        </button>
      </form>
    </section>
  );
}
