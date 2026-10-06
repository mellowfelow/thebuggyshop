// src/config/related.js
// Internal-link plan from the keyword map (docs/keyword-map.md): which guides and sibling pages each category page links to.
// Rendered by <RelatedLinks> at the bottom of category pages. Every href must resolve (crosscheck B17c).
const G = {
  cheap: { href: '/blog/cheap-golf-buggies-and-carts-australia/', label: 'Cheap golf buggies and carts: what each budget buys' },
  best: { href: '/blog/best-electric-golf-buggies-australia/', label: 'Best electric golf buggies in Australia, compared' },
  aldi: { href: '/blog/aldi-golf-buggy-vs-specialist-buggy/', label: 'Aldi golf buggy vs a specialist buggy: what to check' },
  cart: { href: '/blog/electric-golf-carts-australia-guide/', label: 'Electric golf carts in Australia: prices, range and rego' },
  buggy: { href: '/blog/electric-buggy-for-adults-australia/', label: 'Electric buggies for adults: golf, farm and off-road options' },
  buyers: { href: '/blog/golf-buggy-for-sale-buyers-guide-australia/', label: "Golf buggy buyer's guide: new vs used" },
  rego: { href: '/blog/conditional-road-registration-guide-qld-nsw-vic/', label: 'Golf cart road registration in QLD, NSW and VIC' },
  battery: { href: '/blog/lifepo4-vs-lead-acid-battery-lifespan-australian-climate/', label: 'LiFePO4 vs lead-acid golf cart batteries' },
};
const S = {
  trolleys: { href: '/shop/golf-trolleys/', label: 'Golf trolleys: push and electric' },
  push: { href: '/shop/push-pull-golf-buggies/', label: 'Push golf buggies' },
  walk: { href: '/shop/walk-behind/', label: 'Electric walk-behind buggies' },
  remote: { href: '/shop/remote-control-golf-buggies/', label: 'Remote-control golf buggies' },
  used: { href: '/shop/used-golf-buggies/', label: 'Used and ex-demo golf buggies' },
  carts: { href: '/shop/luxury-golf-carts/', label: 'Golf carts for sale' },
  batteries: { href: '/shop/batteries/', label: 'Batteries and lithium upgrades' },
  chargers: { href: '/shop/chargers/', label: 'Golf buggy chargers' },
  accessories: { href: '/shop/accessories/', label: 'Golf buggy accessories' },
  parts: { href: '/shop/parts/', label: 'Spare parts and wheels' },
  electric: { href: '/shop/electric-golf-buggies/', label: 'Electric golf buggies' },
  offroad: { href: '/shop/off-road-buggies/', label: 'Off-road buggies' },
};

export const RELATED = {
  '/shop/': [G.cheap, G.best, G.cart, G.buyers],
  '/shop/electric-golf-buggies/': [G.best, G.buggy, G.aldi, G.cheap],
  '/shop/remote-control-golf-buggies/': [G.best, G.cheap, S.walk],
  '/shop/walk-behind/': [G.aldi, G.best, S.trolleys, G.cheap],
  '/shop/gps-follow-buggies/': [G.best, S.remote],
  '/shop/push-pull-golf-buggies/': [G.cheap, G.best, S.trolleys],
  '/shop/golf-trolleys/': [G.cheap, G.best, S.push, S.walk],
  '/shop/luxury-golf-carts/': [G.cart, G.cheap, G.rego, S.used],
  '/shop/2-seat/': [G.cart, G.cheap],
  '/shop/utility/': [G.cart, G.buggy],
  '/shop/used-golf-buggies/': [G.cheap, G.cart, S.carts],
  '/shop/off-road-buggies/': [G.buggy],
  '/shop/farm-buggies/': [G.buggy],
  '/shop/accessories/': [G.cheap, S.parts],
  '/shop/chargers/': [G.battery, S.batteries],
  '/shop/batteries/': [G.battery, G.cart, S.chargers],
  '/shop/parts/': [G.aldi, S.accessories],
};

export const relatedFor = (url) => RELATED[url] || [];
