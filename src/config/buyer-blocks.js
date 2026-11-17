// src/config/buyer-blocks.js
// A short "how to buy" section for the pages that own a buying keyword ("buy a dune buggy", "second hand golf buggies for sale" ...).
// Wording follows what Search Console and Bing show people searching before they buy. Every price and count is computed
// from the product data, so nothing here can drift from the shop. Delivery is always the flat freight fee, never "free".
import { PRODUCTS } from './products.js';
import { FACTS, money } from './faq.js';

const grp = (f) => { const l = PRODUCTS.filter(f).map((p) => p.price); return { n: l.length, min: Math.min(...l), max: Math.max(...l) }; };
const dune = grp((p) => p.subcategory === 'dune-buggies');
const ssv = grp((p) => p.subcategory === 'side-by-side');
const farm = grp((p) => p.subcategory === 'farm-buggies');
const off = grp((p) => p.category === 'off-road-buggies');
const ship = money(FACTS.ship);

export const BUYER_BLOCKS = {
  '/shop/': {
    h2: 'How to buy a golf buggy online in Australia',
    paras: [
      `To buy a golf buggy, start with how you play. Push golf buggies start at ${money(FACTS.push.min)}, electric walk-behind buggies at ${money(FACTS.walk.min)}, remote-control buggies at ${money(FACTS.remote.min)} and ride-on golf carts at ${money(FACTS.cart.min)}. Every price includes GST, and each product page lists the specifications and warranty that apply.`,
      `We ship golf buggies for sale across Australia from our Queensland base for a flat ${ship} per order, paid by PayID, bank transfer or crypto. Looking for golf buggies for sale near me? Pick your city to see delivery times.`,
    ],
    links: [{ href: '/golf-buggies/', label: 'Golf buggies for sale near me, by city' }, { href: '/buggies-for-sale/', label: 'All buggies for sale' }],
  },
  '/shop/dune-buggies/': {
    h2: 'Buy a dune buggy in Australia',
    paras: [
      `To buy a dune buggy online, choose by engine size and seats, then order for delivery to NSW, Queensland, Victoria, Western Australia or any other state. Our ${dune.n} dune buggies run from ${money(dune.min)} to ${money(dune.max)}, and each product page lists the engine and specifications.`,
      `Dune buggies, also called beach buggies, are sold for private land and recreation use, not as road vehicles. Whether you are buying a dune buggy in NSW or anywhere else, check local rules for beaches and tracks before you ride. Delivery is a flat ${ship} per order.`,
    ],
    links: [{ href: '/shop/off-road-buggies/', label: 'All off road buggies' }, { href: '/blog/dune-buggy-vs-side-by-side-australia/', label: 'Dune buggy vs side by side' }],
  },
  '/shop/used-golf-buggies/': {
    h2: 'Second hand golf buggies and carts for sale',
    paras: [
      `Looking for second hand golf buggies for sale? Our used and ex-demo range runs from ${money(FACTS.usedAll.min)} to ${money(FACTS.usedCart.max)} and covers ex-demo MGI buggies plus ex-lease and ex-fleet E-Z-GO, Club Car and Yamaha carts. Each second hand golf buggy or cart is checked before sale.`,
      `Prices include GST and delivery is a flat ${ship} Australia-wide. Where we list a matching new model, the used product page shows what you save against it. Stock changes often, so message us on WhatsApp for what has just arrived.`,
    ],
    links: [{ href: '/shop/luxury-golf-carts/', label: 'New golf carts' }, { href: '/shop/electric-golf-buggies/', label: 'New electric golf buggies' }],
  },
  '/shop/off-road-buggies/': {
    h2: 'Off road buggies for sale: how to choose',
    paras: [
      `Our ${off.n} off road buggies for sale run from ${money(off.min)} to ${money(off.max)}. Choose a dune buggy from ${money(dune.min)} for sand and tracks, a side by side buggy from ${money(ssv.min)} to carry passengers, or a farm buggy from ${money(farm.min)} for property work.`,
      `Buying an off road buggy in QLD, NSW, Victoria, WA or SA? Delivery is a flat ${ship} per order and prices include GST. Off road buggies are sold for private land, farms and recreation areas, so check your state rules before riding anywhere public.`,
    ],
    links: [{ href: '/shop/dune-buggies/', label: 'Dune buggies' }, { href: '/shop/side-by-side/', label: 'Side by side buggies' }, { href: '/shop/farm-buggies/', label: 'Farm buggies' }, { href: '/buggies-for-sale/', label: 'All buggies for sale' }],
  },
  '/shop/farm-buggies/': {
    h2: 'Farm buggy for sale: electric and petrol options',
    paras: [
      `Our ${farm.n} farm buggies for sale run from ${money(farm.min)} to ${money(farm.max)}, in electric and petrol models for paddocks, tracks and property work. Compare drive type, seats and specifications on each product page before you order.`,
      `Delivery is a flat ${ship} per order to farms in Queensland, NSW, Victoria and every other state, and prices include GST. Call 0480 811 308 if you want help matching a farm buggy to your property.`,
    ],
    links: [{ href: '/shop/side-by-side/', label: 'Side by side buggies' }, { href: '/blog/side-by-side-vs-quad-bike-australia/', label: 'Side by side vs quad bike' }],
  },
  '/shop/side-by-side/': {
    h2: 'Side by side buggy for sale across Australia',
    paras: [
      `Our ${ssv.n} side by side buggies for sale run from ${money(ssv.min)} to ${money(ssv.max)}. Each product page lists engine, drive and seating, so you can compare models for farm work, stations or recreation on private land.`,
      `Buying a side by side buggy in QLD, NSW, Victoria or WA? Delivery is a flat ${ship} per order and prices include GST. Message us on WhatsApp to check stock and timing.`,
    ],
    links: [{ href: '/shop/farm-buggies/', label: 'Farm buggies' }, { href: '/shop/dune-buggies/', label: 'Dune buggies' }],
  },
  '/shop/luxury-golf-carts/': {
    h2: 'Golf carts for sale: new, used and cheap options',
    paras: [
      `Compare golf carts for sale by price and seats. New 2-seat carts start at ${money(FACTS.cart.min)}, new 4 to 6 seat carts at ${money(FACTS.cart46.min)}, and used or ex-lease carts at ${money(FACTS.usedCart.min)}. A cheap golf cart here usually means a used ex-lease 2-seater.`,
      `Buy golf carts online with GST-inclusive prices and a flat ${ship} delivery Australia-wide. Looking for a golf cart near you? See delivery times by city.`,
    ],
    links: [{ href: '/golf-buggies/', label: 'Golf carts near me, by city' }, { href: '/shop/used-golf-buggies/', label: 'Used golf carts' }],
  },
  '/shop/golf-trolleys/': {
    h2: 'Buy a golf trolley online',
    paras: [
      `Buy a golf trolley online from ${money(FACTS.push.min)} for a manual push buggy, or from ${money(FACTS.walk.min)} for an electric walk-behind trolley. Compare folded size, weight and battery type on each product page, and add a lithium battery or accessories to the same order.`,
      `Golf trolleys for sale here ship Australia-wide for a flat ${ship} per order, with GST included in every price.`,
    ],
    links: [{ href: '/blog/electric-vs-manual-golf-trolley-australia/', label: 'Electric vs manual trolley' }, { href: '/shop/electric-golf-buggies/', label: 'Electric golf buggies' }],
  },
};
