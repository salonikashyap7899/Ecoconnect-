'use client';

// Controlled image lightbox overlay. Parent owns the open index.
export default function Lightbox({ item, onClose }) {
  if (!item) return null;
  return (
    <div
      role="dialog"
      aria-label="Image viewer"
      onClick={onClose}
      className="fixed inset-0 z-[300] grid cursor-zoom-out place-items-center bg-ink/90 p-10"
    >
      <div className="w-full max-w-[1000px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={item.img} alt={item.caption} className="block max-h-[74vh] w-full rounded-xl object-contain" />
        <p className="mt-4 text-center text-[15px] text-white/80">{item.caption}</p>
      </div>
    </div>
  );
}
