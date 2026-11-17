// src/components/BrandNotes.jsx (server component)
// "About the brand" facts and official-source safety/road notes for brand pages. Content comes from
// src/config/brand-facts.js, where every fact carries its public source.
import Link from 'next/link';
import { BRAND_FACTS, KIND_NOTES, kindsForProducts } from '@/src/config/brand-facts';

const SRC = 'font-semibold text-[#7A5C22] underline underline-offset-2 hover:text-[#0E2A1E]';

export default function BrandNotes({ brand, products }) {
  const about = BRAND_FACTS[brand.slug];
  const kinds = kindsForProducts(products);
  if (!about && !kinds.length) return null;

  return (
    <div className="space-y-8">
      {about && (
        <section className="space-y-3" aria-labelledby="brand-about-h">
          <h2 id="brand-about-h" className="text-xl sm:text-2xl font-black text-[#0E2A1E] tracking-tight font-serif">About {brand.name}</h2>
          <p className="text-sm text-[#2F4439] leading-relaxed max-w-3xl">{about.facts.join(' ')}</p>
          <p className="text-xs text-[#4A5D53]">
            Sources:{' '}
            {about.sources.map((s, i) => (
              <span key={s.url}>{i > 0 && ', '}<a href={s.url} target="_blank" rel="noopener noreferrer" className={SRC}>{s.label}</a></span>
            ))}
          </p>
        </section>
      )}

      {kinds.map((k) => {
        const n = KIND_NOTES[k];
        return (
          <section key={k} className="space-y-3" aria-label={n.heading}>
            <h2 className="text-xl sm:text-2xl font-black text-[#0E2A1E] tracking-tight font-serif">{n.heading}</h2>
            <ul className="list-disc pl-5 space-y-1.5 text-sm text-[#2F4439] leading-relaxed max-w-3xl">
              {n.points.map((pt) => <li key={pt}>{pt}</li>)}
            </ul>
            {n.sources.length > 0 && (
              <p className="text-xs text-[#4A5D53]">
                Source:{' '}
                {n.sources.map((s, i) => (
                  <span key={s.url}>{i > 0 && ', '}<a href={s.url} target="_blank" rel="noopener noreferrer" className={SRC}>{s.label}</a></span>
                ))}
              </p>
            )}
            <ul className="flex flex-wrap gap-x-5 gap-y-1 text-sm">
              {n.links.map((l) => <li key={l.href}><Link href={l.href} className={SRC}>{l.label}</Link></li>)}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
