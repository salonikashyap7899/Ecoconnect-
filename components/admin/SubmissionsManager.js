'use client';

import { useCallback, useEffect, useState } from 'react';

const STATUSES = ['New', 'In Progress', 'Closed'];

export default function SubmissionsManager({ type }) {
  const [label, setLabel] = useState('');
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('All');
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    const res = await fetch(`/api/admin/submissions/${type}`);
    if (!res.ok) { setError('Failed to load submissions.'); return; }
    const data = await res.json();
    setLabel(data.label);
    setItems(data.items);
  }, [type]);

  // eslint-disable-next-line react-hooks/set-state-in-effect -- state updates happen after the fetch resolves
  useEffect(() => { load(); }, [load]);

  const setStatus = async (id, status) => {
    const res = await fetch(`/api/admin/submissions/${type}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });
    if (res.ok) setItems((list) => list.map((i) => (i.id === id ? { ...i, status } : i)));
  };

  const visible = filter === 'All' ? items : items.filter((i) => i.status === filter);
  const hasStatus = type !== 'subscribers';

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className="m-0 font-display text-[24px] font-semibold text-navy">{label || 'Submissions'}</h1>
        <a href={`/api/admin/submissions/${type}?format=csv`} className="rounded-lg border-[1.5px] border-gold px-5 py-2.5 font-display text-[13.5px] font-semibold text-gold no-underline hover:bg-gold hover:text-white">Export CSV</a>
      </div>

      {hasStatus && (
        <div className="mb-6 flex flex-wrap gap-2">
          {['All', ...STATUSES].map((s) => (
            <button key={s} onClick={() => setFilter(s)}
              className={`rounded-full px-4 py-1.5 text-[13px] font-semibold ${filter === s ? 'bg-gold text-white' : 'border-[1.5px] border-line-soft text-muted hover:border-gold hover:text-gold'}`}>
              {s}
            </button>
          ))}
        </div>
      )}

      {error && <p className="text-sm text-[#C0392B]">{error}</p>}

      <div className="flex flex-col gap-3">
        {visible.map((item) => (
          <div key={item.id} className="rounded-xl border border-line p-5 px-6">
            <div className="mb-2 flex flex-wrap items-center justify-between gap-3">
              <p className="m-0 text-sm font-semibold text-navy">
                {item.name || item.email}
                {item.category ? ` · ${item.category}` : ''}{item.area ? ` · ${item.area}` : ''}
              </p>
              <div className="flex items-center gap-3">
                <span className="text-[12.5px] text-faint">{new Date(item.createdAt).toLocaleString()}</span>
                {hasStatus && (
                  <select value={item.status} onChange={(e) => setStatus(item.id, e.target.value)}
                    className="rounded-lg border-[1.5px] border-line-soft px-2.5 py-1 text-[12.5px] font-semibold text-navy outline-none focus:border-gold">
                    {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-1 text-[13.5px] text-muted">
              {item.email && <p className="m-0"><span className="font-semibold text-navy">Email:</span> <a href={`mailto:${item.email}`} className="text-gold">{item.email}</a></p>}
              {item.phone && <p className="m-0"><span className="font-semibold text-navy">Phone:</span> {item.phone}</p>}
              {item.org && <p className="m-0"><span className="font-semibold text-navy">Organisation:</span> {item.org}</p>}
              {item.location && <p className="m-0"><span className="font-semibold text-navy">Location:</span> {item.location}</p>}
              {item.exp && <p className="m-0"><span className="font-semibold text-navy">Experience:</span> {item.exp}</p>}
              {item.linkedin && <p className="m-0"><span className="font-semibold text-navy">LinkedIn:</span> {item.linkedin}</p>}
              {item.resumeName && <p className="m-0"><span className="font-semibold text-navy">Resume:</span> {item.resumeName} ({Math.round((item.resumeSize || 0) / 1024)} KB — forwarded by email)</p>}
              {item.subject && <p className="m-0"><span className="font-semibold text-navy">Subject:</span> {item.subject}</p>}
              {item.message && <p className="m-0 whitespace-pre-wrap"><span className="font-semibold text-navy">Message:</span> {item.message}</p>}
            </div>
          </div>
        ))}
        {!visible.length && <p className="text-sm text-faint">No submissions{filter !== 'All' ? ` with status “${filter}”` : ''} yet.</p>}
      </div>
    </div>
  );
}
