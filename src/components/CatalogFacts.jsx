// src/components/CatalogFacts.jsx (server component)
// A short, factual "at a glance" section for brand and subcategory pages that would otherwise be thin.
// Everything on it is computed from the product records (names, types, conditions, prices) and the shop-wide rules
// in core.js. It states no spec, award or claim that the data does not carry, so it can never go stale or be invented.
import Link from 'next/link';
import { SHOP, BUNDLE } from '@/src/config/core';
import { getCategoryBySlug } from '@/src/config/categories';

const money = (n) => `$${Number(n).toLocaleString('en-AU')}`;
const list = (a) => (a.length <= 1 ? a.join('') : `${a.slice(0, -1).join(', ')} and ${a[a.length - 1]}`);
const isVehicle = (p) => BUNDLE.vehicleCategories.includes(p.category) && !BUNDLE.vehicleExcludedSubcategories.includes(p.subcategory);

/** @param {{ label: string, products: object[], showBrand?: boolean }} props */
export default function CatalogFacts({ label, products, showBrand = false }) {
  if (!products?.length) return null;
  const sorted = [...products].sort((a, b) => a.price - b.price);
  const low = sorted[0];
  const high = sorted[sorted.length - 1];
  const typeOf = (p) => getCategoryBySlug(p.subcategory)?.navLabel || getCategoryBySlug(p.category)?.navLabel || '';
  const types = [...new Set(products.map(typeOf).filter(Boolean))];
  const brands = [...new Set(products.map((p) => p.brandName).filter((b) => b && !/^(various|generic)$/i.test(b)))];
  const conditions = [...new Set(products.map((p) => p.condition).filter(Boolean))];
  const vehicles = products.some(isVehicle);
  const lithium = products.filter((p) => /lithium|lifepo4/i.test(p.name)).length;

  const sentences = [
    products.length === 1
      ? `The Buggy Shop currently lists one ${label} product: ${low.name} at ${money(low.price)} including GST.`
      : `The Buggy Shop currently lists ${products.length} ${label} products, from ${money(low.price)} (${low.name}) to ${money(high.price)} (${high.name}) including GST.`,
    types.length > 1 ? `They cover ${list(types)}.` : '',
    showBrand && brands.length > 1 ? `Brands included: ${list(brands)}.` : '',
    conditions.some((c) => c !== 'New') ? `Condition: ${list(conditions.map((c) => c.toLowerCase()))}.` : '',
    lithium ? `${lithium === products.length ? 'Each' : `${lithium} of these`} lithium pack ${lithium === 1 ? 'carries' : 'products carry'} our 5-year Australian replacement warranty.` : '',
    vehicles
      ? `Vehicles are delivered Australia-wide by tail-lift truck for a flat ${money(SHOP.shippingFee)}.`
      : 'Freight for smaller items is confirmed on your order before you pay.',
    `Pay by PayID or bank transfer, or take ${SHOP.cryptoDiscount}% off with Bitcoin or USDT.`,
  ].filter(Boolean);

  return (
    <section className="space-y-4" aria-labelledby="catalog-facts-h">
      <h2 id="catalog-facts-h" className="text-xl sm:text-2xl font-black text-[#0E2A1E] tracking-tight font-serif">
        {label}: models and prices
      </h2>
      <p className="text-sm text-[#2F4439] leading-relaxed max-w-3xl">{sentences.join(' ')}</p>
      <div className="overflow-x-auto rounded-2xl border border-[#D5DFD9] bg-white">
        <table className="w-full text-left text-xs sm:text-sm border-collapse">
          <caption className="sr-only">{label} products with condition and price</caption>
          <thead>
            <tr className="bg-[#0E2A1E] text-[#C5A265]">
              <th scope="col" className="py-3 px-4 font-bold">Model</th>
              <th scope="col" className="py-3 px-4 font-bold">Type</th>
              <th scope="col" className="py-3 px-4 font-bold">Condition</th>
              <th scope="col" className="py-3 px-4 font-bold text-right">Price inc. GST</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E3EAE5]">
            {sorted.map((p) => (
              <tr key={p.slug}>
                <td className="py-3 px-4 font-semibold text-[#0E2A1E]">
                  <Link href={`/shop/${p.category}/${p.slug}/`} className="hover:text-[#7A5C22] underline underline-offset-2">{p.name}</Link>
                </td>
                <td className="py-3 px-4 text-[#3A5244]">{typeOf(p)}</td>
                <td className="py-3 px-4 text-[#3A5244]">{p.condition || 'New'}</td>
                <td className="py-3 px-4 text-right font-bold text-[#0E2A1E]">{money(p.price)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
