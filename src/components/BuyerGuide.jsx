// src/components/BuyerGuide.jsx (server component)
// A short "how to buy" section under the catalogue, written for the buying searches the page owns. Content: src/config/buyer-blocks.js.
import Link from 'next/link';
import { BUYER_BLOCKS } from '@/src/config/buyer-blocks';

export default function BuyerGuide({ path }) {
  const b = BUYER_BLOCKS[path];
  if (!b) return null;
  return (
    <section className="max-w-3xl space-y-3" aria-labelledby="buyer-guide-h">
      <h2 id="buyer-guide-h" className="text-xl sm:text-2xl font-black text-[#0E2A1E] font-serif">{b.h2}</h2>
      {b.paras.map((t, i) => <p key={i} className="text-sm sm:text-base text-[#4A5D53] leading-relaxed">{t}</p>)}
      {b.links?.length > 0 && (
        <ul className="flex flex-wrap gap-2 pt-1">
          {b.links.map((l) => (
            <li key={l.href}><Link href={l.href} className="inline-block text-xs font-semibold text-[#0E2A1E] bg-white hover:bg-[#F0F5F2] hover:text-[#7A5C22] px-3 py-1.5 rounded-xl border border-[#CAD5CE] transition-colors">{l.label}</Link></li>
          ))}
        </ul>
      )}
    </section>
  );
}
