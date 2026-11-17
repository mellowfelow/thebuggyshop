// src/config/product-copy.js
// Honest copy for catalogue entries that were imported without supplier copy or spec sheets.
// Those records carried one boilerplate sentence repeated across 100+ products. This module replaces it with a
// description built ONLY from what the record states (name, brand, type, condition, price) plus shop-wide facts
// from core.js (freight, GST, payment, bundle discount). It never invents a spec, weight, range, speed or feature.
// When a real spec sheet arrives, write the description and specs on the product record: this module then leaves it alone.
import { SHOP, BUNDLE } from './core.js';
import { hasLithiumWarranty, LITHIUM_WARRANTY_LABEL } from '../../lib/warranty.js';
import { PRODUCT_FACTS } from './product-facts.js';

const STUB_SHORT = /available at The Buggy Shop Australia with Australian warranty/i;
const STUB_LONG = /provides high quality performance for Australian golfers and property owners/i;
const money = (n) => `$${Number(n).toLocaleString('en-AU')}`;
const an = (s) => (/^(used|[aeio])/i.test(s) && !/^(one|uni)/i.test(s) ? 'an' : /^u(?!sed)/i.test(s) ? 'a' : /^[aeiou]/i.test(s) ? 'an' : 'a');

// type(p) -> [plain-language product type, one sentence on what that type of product is for]
const TYPES = {
  '4-wheel': () => ['four-wheel push golf buggy', 'A four-wheel push buggy folds flat for the car boot and stays stable on sloping fairways.'],
  '2-seat': () => ['ride-on golf cart', 'Ride-on golf carts suit golf clubs, resorts, retirement villages and private estates.'],
  '4-6-seat': () => ['multi-seat ride-on golf cart', 'Carts with four or six seats suit resorts, larger properties and families who travel together.'],
  'lifted-all-terrain': () => ['lifted all-terrain golf cart', 'A lifted cart sits higher than a standard golf cart, which suits acreage, unsealed tracks and uneven ground.'],
  utility: () => ['electric utility cart', 'A utility cart is built to carry tools and loads around resorts, farms, schools and work sites.'],
  used: () => ['ex-lease golf cart', 'An ex-lease cart is a lower-cost way into a ride-on golf cart for a club, estate or farm.'],
  'dune-buggies': () => ['petrol dune buggy', 'Dune buggies are for private property, farm tracks and sand, not for public roads.'],
  'side-by-side': () => ['side-by-side buggy (UTV)', 'A side-by-side seats driver and passenger next to each other, which suits farm work, property access and recreation.'],
  'farm-buggies': () => ['farm side-by-side (UTV)', 'Farm side-by-sides carry people, tools and loads around a working property.'],
  electric: () => ['kids electric ride-on buggy', 'Electric ride-on buggies are for supervised use by children on private property.'],
  petrol: () => ['petrol buggy for kids and teens', 'Petrol buggies for younger riders are for supervised use on private property.'],
  lithium: (p) => (/lead[- ]acid/i.test(p.name) ? ['lead-acid golf buggy battery', 'A lead-acid battery is the lower-cost replacement for older electric golf buggies.'] : ['lithium golf buggy battery', 'A lithium pack is lighter than lead-acid and is the standard power source for modern electric golf buggies.']),
  chargers: (p) => (/bag/i.test(p.name) ? ['golf buggy battery bag', 'A battery bag protects and carries your buggy battery between the car and the course.'] : ['golf buggy battery charger', 'Match the charger to your battery chemistry and voltage before you order.']),
  'cart-sets': (p) => (/conversion kit/i.test(p.name) ? ['lithium conversion kit for golf carts', 'A conversion kit replaces a lead-acid set with lithium in a compatible 48V golf cart.'] : ['golf cart battery set', 'A battery set replaces the full pack in a ride-on golf cart. Check your cart voltage and tray size before you order.']),
  'wheels-tyres': () => ['wheel or tyre part', 'Check the fitment against your buggy model before you order.'],
  'drive-electrical': () => ['replacement part', 'Check the part against your buggy model before you order.'],
  holders: () => ['golf buggy holder accessory', 'Holders keep an umbrella, drink, phone or scorecard within reach while you walk the course.'],
  'seats-footboards': () => ['add-on seat or footboard for a golf buggy', 'An add-on seat gives you somewhere to rest between shots.'],
  'covers-and-bags': () => ['cover or bag for golf buggies and clubs', 'Covers and bags keep a buggy and clubs clean in the car, in storage and in wet weather.'],
  'wheel-upgrades': () => ['wheel upgrade kit', 'Upgrade wheels improve grip on wet, soft or hilly courses.'],
  bags: () => ['golf bag', 'Cart bags sit securely on a buggy; stand bags suit golfers who also carry.'],
  'golf-balls': () => ['box of golf balls', 'Sold by the dozen.'],
  'rangefinders-gps': (p) => (/watch/i.test(p.name) ? ['GPS golf watch', 'A GPS watch shows distances to the green on your wrist.'] : ['laser golf rangefinder', 'A laser rangefinder measures the distance to the flag or a hazard.']),
  'practice-aids': () => ['golf practice aid', 'Practice aids let you work on your game at home between rounds.'],
  'complete-sets': () => ['complete golf club set', 'A complete set gives a new or returning golfer the clubs and bag in one purchase.'],
  'woods-and-irons': (p) => (/iron/i.test(p.name) ? ['golf iron set', 'An iron set covers approach shots from the fairway.'] : ['golf driver', 'The driver is the longest club in the bag, used for tee shots.']),
  'wedges-and-putters': (p) => (/putter/i.test(p.name) ? ['golf putter', 'The putter is the club used on the green.'] : ['golf wedge', 'Wedges are used for short approach shots, chips and bunker play.']),
};

const isVehicle = (p) => BUNDLE.vehicleCategories.includes(p.category) && !BUNDLE.vehicleExcludedSubcategories.includes(p.subcategory);
const isLithiumPack = (p) => p.category === 'batteries' && hasLithiumWarranty(p);

export function isStubCopy(p) {
  return STUB_SHORT.test(p.shortDescription || '') || STUB_LONG.test(p.description || '');
}

export function withHonestCopy(p) {
  if (!isStubCopy(p)) return p;
  const sub = p.condition === 'Used' && p.category === 'luxury-golf-carts' ? 'used' : p.subcategory;
  const [type, purpose] = (TYPES[sub] || (() => ['product', '']))(p);
  const branded = p.brandName && !/^(various|generic)$/i.test(p.brandName);
  const by = branded && !p.name.toLowerCase().includes(p.brandName.toLowerCase()) ? ` from ${p.brandName}` : '';
  const vehicle = isVehicle(p);
  const freight = money(SHOP.shippingFee);

  const sameAsName = p.name.toLowerCase().replace(/^(the|a|an)\s+/, '') === type;
  const facts = PRODUCT_FACTS[p.slug];
  const firstSentence = facts ? (facts.lead.match(/^.*?\.(?=\s|$)/) || [facts.lead])[0] : '';
  const shortDescription = facts
    ? firstSentence
    : sameAsName
    ? `${purpose} ${money(p.price)} inc. GST, delivered Australia-wide.`
    : vehicle
    ? `${p.name}: ${an(type)} ${type}${by}, delivered Australia-wide by tail-lift truck for a flat ${freight}.`
    : `${p.name}: ${an(type)} ${type}${by}, ${money(p.price)} inc. GST, delivered Australia-wide.`;

  const parts = [
    facts ? facts.lead : '',
    facts ? '' : sameAsName ? '' : `The ${p.name} is ${an(type)} ${type}${by}${p.condition && p.condition !== 'New' && !type.includes('ex-lease') ? `, sold as ${p.condition.toLowerCase()}` : ''}.`,
    facts ? '' : purpose,
    `It is ${money(p.price)} including GST.`,
    vehicle
      ? `Delivery is by hydraulic tail-lift truck to your property gate or clubhouse for a flat ${freight}, anywhere in Australia.`
      : BUNDLE.addonCategories.includes(p.category)
        ? `Add it to a buggy or cart order and save ${BUNDLE.percent}% on parts and accessories. Freight for small items is confirmed on your order before you pay.`
        : 'Freight is confirmed on your order before you pay.',
    isLithiumPack(p) ? 'Lithium battery packs carry our 5-year Australian replacement warranty.' : '',
    `Pay by PayID or bank transfer, or save ${SHOP.cryptoDiscount}% with Bitcoin or USDT.`,
    'Message us on WhatsApp for the manufacturer spec sheet, current stock and delivery timing before you order.',
  ].filter(Boolean);

  // Imported placeholder spec rows: an internal category slug is not a spec, and "Manual / Accessory" is wrong for vehicles and batteries.
  const specs = { ...(p.specs || {}) };
  delete specs.category;
  if (specs.power === 'Manual / Accessory') delete specs.power; // import placeholder, not a spec
  if (isLithiumPack(p)) specs.warranty = LITHIUM_WARRANTY_LABEL;
  if (facts) Object.assign(specs, facts.specs);

  // A product named exactly like a search term ("Golf Driver") must not fight its category page for that term.
  const generic = p.name.split(/\s+/).length <= 3 && !branded;
  return { ...p, shortDescription, description: parts.join(' '), specs, ...(facts ? { factSources: facts.sources } : {}), ...(generic ? { titleTag: `Buy ${p.name} Online | ${money(p.price)} inc. GST` } : {}) };
}
