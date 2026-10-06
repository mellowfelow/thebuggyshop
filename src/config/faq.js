// src/config/faq.js
// FAQ bank for The Buggy Shop. Single source for the homepage, /faq/, category pages and blog posts.
// Prices, speeds and ranges are COMPUTED from the product data below, so an answer can never drift from the shop.
// Rules (keyword engine): answers 40-55 words on the homepage, 40-65 elsewhere, concrete (never "it depends"), one link each.
// Road-rule answers are written cautiously: have them reviewed before changing them.
import { PRODUCTS } from './products.js';

const money = (n) => '$' + Math.round(n).toLocaleString('en-AU');
const range = (f) => { const l = PRODUCTS.filter(f).map((p) => p.price); return { min: Math.min(...l), max: Math.max(...l) }; };
const nums = (a) => a.filter((x) => Number.isFinite(x));
const carts = PRODUCTS.filter((p) => p.category === 'luxury-golf-carts' && p.subcategory !== 'used');
const speeds = nums(carts.map((p) => parseInt(String(p.specs?.topSpeed || '').match(/(\d+)\s*km/)?.[1], 10)));
const ranges = nums(carts.map((p) => parseInt(String(p.specs?.range || '').match(/(\d+)/)?.[1], 10)));
const SHIP = 495; // flat-rate hydraulic tail-lift freight (SHOP.shippingFee)

const d = {
  push: range((p) => p.category === 'push-pull-golf-buggies'),
  walk: range((p) => p.subcategory === 'walk-behind'),
  remote: range((p) => p.subcategory === 'remote-control-golf-buggies'),
  elec: range((p) => p.category === 'electric-golf-buggies' && p.subcategory !== 'conversion-kits'),
  cart: range((p) => p.category === 'luxury-golf-carts' && p.subcategory !== 'used'),
  cart46: range((p) => p.subcategory === '4-6-seat'),
  usedCart: range((p) => p.category === 'luxury-golf-carts' && p.subcategory === 'used'),
  usedAll: range((p) => p.condition === 'Used' || p.condition === 'Ex-Demo'),
  dune: range((p) => p.subcategory === 'dune-buggies'),
  speed: { min: Math.min(...speeds), max: Math.max(...speeds) },
  range: { min: Math.min(...ranges), max: Math.max(...ranges) },
};

export const FAQ_THEMES = ['Buying & prices', 'Delivery, payment & warranty', 'Speed, range & charging', 'Road rules & licences', 'Off-road buggies'];

export const FAQ_BANK = [
  // ---------------- homepage set
  { id: 'cost-buggy', home: true, theme: 'Buying & prices', pages: ['/', '/shop/'], question: 'How much does a golf buggy cost in Australia?',
    answer: `Push golf buggies start at ${money(d.push.min)}. Electric walk-behind buggies run from ${money(d.walk.min)}, and remote-control models from ${money(d.remote.min)}. Ride-on golf carts start at ${money(d.cart.min)}. All prices include GST and delivery is a flat ${money(SHIP)} Australia-wide. Compare every model and filter by price in our shop.`,
    cta: { href: '/shop/', label: 'Browse all golf buggies' } },
  { id: 'cost-cart', home: true, theme: 'Buying & prices', pages: ['/', '/shop/luxury-golf-carts/'], question: 'How much does an electric golf cart cost?',
    answer: `New electric golf carts start at ${money(d.cart.min)} for a 2-seater, and 4 to 6 seat carts start at ${money(d.cart46.min)}. Used and ex-fleet carts start from ${money(d.usedCart.min)}. Prices include GST, and delivery is a flat ${money(SHIP)} Australia-wide. Browse every cart in our golf cart range.`,
    cta: { href: '/shop/luxury-golf-carts/', label: 'See golf carts for sale' } },
  { id: 'best-electric', home: true, theme: 'Buying & prices', pages: ['/', '/shop/electric-golf-buggies/'], question: 'What is the best electric golf buggy in Australia?',
    answer: `For most golfers, a lithium remote-control or walk-behind buggy from MGI, Motocaddy, PowaKaddy or Stewart Golf is the right pick. Our electric range runs from ${money(d.elec.min)} to ${money(d.elec.max)}. Choose remote control for hands-free, or walk-behind to save money. Compare them in our electric golf buggy range.`,
    cta: { href: '/shop/electric-golf-buggies/', label: 'Compare electric golf buggies' } },
  { id: 'delivery', home: true, theme: 'Delivery, payment & warranty', pages: ['/', '/golf-buggies/'], question: 'Do you deliver golf buggies Australia-wide?',
    answer: `Yes. We deliver nationwide by hydraulic tail-lift truck to your property gate or clubhouse for a flat ${money(SHIP)} per order. We are based in Queensland and ship to every state. Call 0480 811 308 or check delivery times for your city.`,
    cta: { href: '/golf-buggies/', label: 'Delivery by city' } },
  { id: 'payment', home: true, theme: 'Delivery, payment & warranty', pages: ['/'], question: 'What payment options do you offer?',
    answer: 'Pay by bank transfer (Osko or EFT), PayID, or split the cost into four equal payments at 0% interest. Pay with Bitcoin or USDT and take 10% off. All prices include GST. You choose at checkout and we email payment details with your order reference. See our finance options.',
    cta: { href: '/finance/', label: 'Pay in 4 and finance options' } },
  { id: 'warranty', home: true, theme: 'Delivery, payment & warranty', pages: ['/', '/shop/electric-golf-buggies/'], question: 'Is there a warranty on new golf buggies?',
    answer: 'New lithium golf buggies include a 5-year LiFePO4 battery guarantee, and each product page lists the warranty that applies to that model. We support what we sell from our Queensland base. Ask which warranty applies before you order, or call 0480 811 308.',
    cta: { href: '/shop/electric-golf-buggies/', label: 'See electric golf buggies' } },
  { id: 'used', home: true, theme: 'Buying & prices', pages: ['/', '/shop/used-golf-buggies/'], question: 'Can I buy a used golf buggy?',
    answer: `Yes. We stock inspected used and ex-demo golf buggies and carts from ${money(d.usedAll.min)}, including MGI ex-demo buggies and ex-fleet E-Z-GO, Club Car and Yamaha carts. Each one is checked before sale and comes with local support. Stock changes often, so message us on WhatsApp for what has just arrived.`,
    cta: { href: '/shop/used-golf-buggies/', label: 'See used golf buggies' } },
  { id: 'bundle', home: true, theme: 'Buying & prices', pages: ['/', '/shop/accessories/'], question: 'Do I get a discount on accessories when I buy a buggy?',
    answer: 'Yes. When your order includes a golf buggy or cart, every accessory and part in it is 5% off, applied automatically at checkout. Paying with crypto takes a further 10% off the order. Browse our accessories and parts before you check out.',
    cta: { href: '/shop/accessories/', label: 'Shop accessories' } },

  // ---------------- FAQ page and category pages
  { id: 'buggy-vs-cart', theme: 'Buying & prices', pages: ['/faq/'], question: 'What is the difference between a golf buggy and a golf cart?',
    answer: `In Australia a golf buggy usually means a wheeled trolley you walk behind, either push or electric. A golf cart is a ride-on electric vehicle that carries two to six people. We sell both: buggies from ${money(d.push.min)} and carts from ${money(d.cart.min)}.`,
    cta: { href: '/shop/', label: 'Browse buggies and carts' } },
  { id: 'electric-or-gas', theme: 'Buying & prices', pages: ['/faq/'], question: 'Are golf carts electric or petrol?',
    answer: 'Most modern golf carts are electric, and all our golf buggies are electric. Petrol is more common in off-road buggies such as dune buggies and some farm UTVs. Browse electric carts in our golf cart range, or petrol buggies in our off-road range.',
    cta: { href: '/shop/luxury-golf-carts/', label: 'See electric golf carts' } },
  { id: 'speed', theme: 'Speed, range & charging', pages: ['/faq/', '/shop/luxury-golf-carts/'], question: 'How fast does an electric golf cart go?',
    answer: `Top speeds of the golf carts we list run from ${d.speed.min} km/h to ${d.speed.max} km/h, and each product page shows the figure for that model. Some carts are speed-limited for golf course use, and road-compliant models are noted on their pages. Compare models side by side in our golf cart range.`,
    cta: { href: '/shop/luxury-golf-carts/', label: 'Compare golf carts' } },
  { id: 'range', theme: 'Speed, range & charging', pages: ['/faq/', '/shop/luxury-golf-carts/'], question: 'How far can an electric golf cart go on one charge?',
    answer: `The ride-on golf carts we list show a range of ${d.range.min} km to ${d.range.max}+ km per charge, depending on the battery and terrain. Lithium LiFePO4 models usually go furthest. Each product page lists the range for that cart, so you can compare models before you buy.`,
    cta: { href: '/shop/luxury-golf-carts/', label: 'See cart ranges' } },
  { id: 'charge', theme: 'Speed, range & charging', pages: ['/faq/', '/shop/chargers/'], question: 'How do you charge an electric golf cart?',
    answer: 'Plug the charger that suits your battery into a power outlet and leave it until it finishes. Lithium and lead-acid batteries need different chargers, so never swap them. We stock lithium and lead-acid chargers and leads, and can confirm the right one if you call.',
    cta: { href: '/shop/chargers/', label: 'Golf buggy chargers' } },
  { id: 'battery-life', theme: 'Speed, range & charging', pages: ['/faq/', '/shop/batteries/'], question: 'How long does an electric golf cart battery last?',
    answer: 'Lithium LiFePO4 batteries are rated for thousands of charge cycles and last far longer than lead-acid. New lithium buggies from us carry a 5-year LiFePO4 guarantee. Lead-acid sets need replacing sooner. See upgrade and replacement options in our battery range.',
    cta: { href: '/shop/batteries/', label: 'Batteries and lithium upgrades' } },
  { id: 'road-legal', theme: 'Road rules & licences', pages: ['/faq/'], question: 'Are golf carts and buggies road legal in Australia?',
    answer: 'Road rules are set by each state, and a cart used only on private land or a course is treated differently from one driven on public roads. We provide conditional registration compliance support for QLD, NSW and VIC on models marked road compliant. Read our registration guide for the detail.',
    cta: { href: '/blog/conditional-road-registration-guide-qld-nsw-vic/', label: 'Read the registration guide' } },
  { id: 'licence', theme: 'Road rules & licences', pages: ['/faq/'], question: 'Do you need a licence to drive a golf cart?',
    answer: 'On public roads you need a licence and a registered, compliant vehicle. On private land such as a farm, estate or golf course, road licence rules apply differently, and clubs or insurers may set their own. Check with your state road authority or call 0480 811 308 for advice before you buy.',
    cta: { href: '/contact/', label: 'Ask our sales desk' } },
  { id: 'dune', theme: 'Off-road buggies', pages: ['/faq/', '/shop/dune-buggies/'], question: 'What is a dune buggy?',
    answer: `A dune buggy, also called a beach buggy, is a light off-road vehicle with big rear tyres built for sand, dirt and tracks. Ours are petrol models from 110cc to 300cc and start at ${money(d.dune.min)}. Each model page lists its engine size and specifications so you can compare before you order.`,
    cta: { href: '/shop/dune-buggies/', label: 'See dune buggies' } },
  { id: 'dune-legal', theme: 'Off-road buggies', pages: ['/faq/', '/shop/dune-buggies/'], question: 'Are dune buggies road legal?',
    answer: 'Dune and off-road buggies are sold for use on private land, farms and recreation areas, not as road vehicles. Using one on public roads requires meeting your state registration rules, which most do not. Ask our team about your state.',
    cta: { href: '/shop/off-road-buggies/', label: 'See off-road buggies' } },
];

// Backwards-compatible export used by the homepage and the FAQ component
export const HOMEPAGE_FAQS = FAQ_BANK.filter((f) => f.home);

/** FAQs written for a given page path, e.g. faqsForPage('/shop/luxury-golf-carts/') */
export const faqsForPage = (url) => FAQ_BANK.filter((f) => f.pages.includes(url));

/** Plain-text word count (used by the crosscheck). */
export const faqWords = (text) => text.trim().split(/\s+/).length;
