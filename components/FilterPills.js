'use client';

// Row of filter pills. Controlled by parent via `value` / `onChange`.
export default function FilterPills({ options, value, onChange, tone = 'gold' }) {
  return (
    <div className="flex flex-wrap gap-2.5">
      {options.map((opt) => {
        const active = opt === value;
        const activeBg = tone === 'navy' ? 'bg-navy border-navy' : 'bg-gold border-gold';
        return (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={`cursor-pointer rounded-full border-[1.5px] px-[22px] py-2.5 font-display text-sm transition-all ${
              active ? `${activeBg} font-semibold text-white` : 'border-line-soft bg-white font-medium text-body hover:border-gold'
            }`}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}
