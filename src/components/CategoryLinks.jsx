// src/components/CategoryLinks.jsx (server component)
// Two small link rows at the foot of a category page: sibling subcategories ("More in Accessories") and the brands
// that actually have products on this page ("Shop by brand"). Both are plain crawlable links built from the data.
import Link from 'next/link';

const CHIP = 'inline-block text-xs font-semibold text-[#0E2A1E] bg-white hover:bg-[#F0F5F2] hover:text-[#7A5C22] px-3 py-1.5 rounded-xl border border-[#CAD5CE] transition-colors';

export default function CategoryLinks({ parentLabel, siblings = [], brands = [] }) {
  if (!siblings.length && !brands.length) return null;
  return (
    <nav className="space-y-6" aria-label="Related categories and brands">
      {siblings.length > 0 && (
        <div className="space-y-2">
          <h2 className="text-sm font-black text-[#0E2A1E] uppercase tracking-wider">More in {parentLabel}</h2>
          <ul className="flex flex-wrap gap-2">
            {siblings.map((s) => <li key={s.slug}><Link href={`/shop/${s.slug}/`} className={CHIP}>{s.navLabel}</Link></li>)}
          </ul>
        </div>
      )}
      {brands.length > 0 && (
        <div className="space-y-2">
          <h2 className="text-sm font-black text-[#0E2A1E] uppercase tracking-wider">Shop by brand</h2>
          <ul className="flex flex-wrap gap-2">
            {brands.map((b) => <li key={b.slug}><Link href={`/brands/${b.slug}/`} className={CHIP}>{b.name}</Link></li>)}
          </ul>
        </div>
      )}
    </nav>
  );
}
