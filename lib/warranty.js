// lib/warranty.js
// ONE rule for "does this product carry the 5-year Australian lithium replacement warranty?".
// Used by the product page, the compare page and the generated product copy so they can never disagree.
// The 5-year cover applies to lithium battery PACKS: a lithium battery product, or a vehicle whose own spec says its
// standard battery is lithium. "Lithium upgrade available" on a lead-acid cart does not count, and neither does a charger.

export const LITHIUM_WARRANTY_LABEL = '5-Year Australian Replacement Warranty';

export function hasLithiumWarranty(p) {
  const name = String(p?.name || '');
  const battery = String(p?.specs?.battery || '');
  if (/lead[- ]acid|flooded|agm|charger\b(?!.*battery)/i.test(name)) return false;
  if (p?.category === 'batteries') return /lithium|lifepo4/i.test(name) && /battery|pack|conversion/i.test(name);
  return /lithium|lifepo4/i.test(battery) && !/upgrade|optional|available/i.test(battery);
}
