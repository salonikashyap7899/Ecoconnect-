'use client';

import { useCallback, useEffect, useState } from 'react';

const inputClass = 'w-full box-border rounded-[10px] border-[1.5px] border-line-soft bg-white px-3.5 py-2.5 text-[14px] text-body outline-none focus:border-gold';

function emptyItem(schema) {
  return Object.fromEntries(schema.fields.map((f) => [f.k, f.type === 'checkbox' ? false : f.type === 'lines' ? [] : '']));
}

function FieldInput({ field, value, onChange }) {
  if (field.type === 'checkbox') {
    return <label className="flex items-center gap-2 text-sm text-body"><input type="checkbox" checked={!!value} onChange={(e) => onChange(e.target.checked)} /> Yes</label>;
  }
  if (field.type === 'select') {
    return (
      <select value={value || ''} onChange={(e) => onChange(e.target.value)} className={inputClass}>
        <option value="">Select…</option>
        {field.options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    );
  }
  if (field.type === 'lines') {
    return <textarea rows={4} value={(value || []).join('\n')} onChange={(e) => onChange(e.target.value.split('\n').filter((l) => l.trim() !== ''))} className={inputClass} />;
  }
  if (field.type === 'textarea') {
    return <textarea rows={3} value={value || ''} onChange={(e) => onChange(e.target.value)} className={inputClass} />;
  }
  return <input value={value || ''} onChange={(e) => onChange(e.target.value)} className={inputClass} />;
}

export default function CollectionManager({ name }) {
  const [schema, setSchema] = useState(null);
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null); // index, or -1 for new
  const [draft, setDraft] = useState(null);
  const [status, setStatus] = useState('');

  const load = useCallback(async () => {
    const res = await fetch(`/api/admin/collections/${name}`);
    if (!res.ok) { setStatus('Failed to load collection.'); return; }
    const data = await res.json();
    setSchema(data.schema);
    setItems(data.items);
  }, [name]);

  // eslint-disable-next-line react-hooks/set-state-in-effect -- state updates happen after the fetch resolves
  useEffect(() => { load(); }, [load]);

  const persist = async (nextItems) => {
    setStatus('Saving…');
    const res = await fetch(`/api/admin/collections/${name}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: nextItems }),
    });
    if (res.ok) { setItems(nextItems); setStatus('✓ Saved'); setEditing(null); }
    else setStatus('Save failed.');
  };

  const saveDraft = () => {
    const missing = schema.fields.filter((f) => f.required && !String(draft[f.k] ?? '').trim());
    if (missing.length) { setStatus(`Required: ${missing.map((f) => f.label || f.k).join(', ')}`); return; }
    const next = [...items];
    if (editing === -1) next.unshift(draft);
    else next[editing] = draft;
    persist(next);
  };

  const remove = (i) => {
    if (!confirm('Delete this item?')) return;
    persist(items.filter((_, idx) => idx !== i));
  };

  if (!schema) return <p className="text-sm text-faint">Loading…</p>;

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className="m-0 font-display text-[24px] font-semibold text-navy">{schema.label}</h1>
        <div className="flex items-center gap-3">
          {status && <span className="text-[13px] font-semibold text-gold">{status}</span>}
          <button onClick={() => { setEditing(-1); setDraft(emptyItem(schema)); setStatus(''); }}
            className="rounded-lg bg-gold px-5 py-2.5 font-display text-[13.5px] font-semibold text-white hover:bg-gold-dark">+ Add New</button>
        </div>
      </div>

      {editing !== null && draft && (
        <div className="mb-8 rounded-2xl border border-gold/40 bg-cream p-7">
          <h2 className="m-0 mb-5 font-display text-base font-semibold text-navy">{editing === -1 ? 'New item' : 'Edit item'}</h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-4">
            {schema.fields.map((f) => (
              <div key={f.k} className={f.type === 'textarea' || f.type === 'lines' ? 'col-span-full' : ''}>
                <label className="mb-1.5 block text-[12.5px] font-semibold text-navy">{f.label || f.k}{f.required ? ' *' : ''}</label>
                <FieldInput field={f} value={draft[f.k]} onChange={(v) => setDraft((d) => ({ ...d, [f.k]: v }))} />
              </div>
            ))}
          </div>
          <div className="mt-5 flex gap-3">
            <button onClick={saveDraft} className="rounded-lg bg-gold px-6 py-2.5 font-display text-[13.5px] font-semibold text-white hover:bg-gold-dark">Save</button>
            <button onClick={() => { setEditing(null); setStatus(''); }} className="rounded-lg border-[1.5px] border-line-soft px-6 py-2.5 font-display text-[13.5px] font-semibold text-navy">Cancel</button>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-2.5">
        {items.map((item, i) => (
          <div key={`${item[schema.idKey]}-${i}`} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-line p-4 px-5">
            <div className="min-w-0">
              <p className="m-0 truncate text-sm font-semibold text-navy">{item[schema.idKey]}</p>
              <p className="m-0 truncate text-[12.5px] text-faint">
                {schema.fields.slice(1, 4).map((f) => item[f.k]).filter(Boolean).join(' · ')}
              </p>
            </div>
            <div className="flex flex-shrink-0 gap-2">
              <button onClick={() => { setEditing(i); setDraft({ ...emptyItem(schema), ...item }); setStatus(''); }}
                className="rounded-lg border-[1.5px] border-line-soft px-4 py-1.5 text-[12.5px] font-semibold text-navy hover:border-gold hover:text-gold">Edit</button>
              <button onClick={() => remove(i)} className="rounded-lg border-[1.5px] border-line-soft px-4 py-1.5 text-[12.5px] font-semibold text-[#C0392B] hover:border-[#C0392B]">Delete</button>
            </div>
          </div>
        ))}
        {!items.length && <p className="text-sm text-faint">No items yet — add the first one.</p>}
      </div>
    </div>
  );
}
