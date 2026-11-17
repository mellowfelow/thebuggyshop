// src/config/guides-new-extra.js
// Extra sections inserted before the closing "Related guides" section of each November 2026 guide (see guides-new.js).
// Same rule as the guides: every number comes from the product data, every rule from a linked official source.
import { PRODUCTS } from './products.js';
import { F, $, table, byPrice, pl, spec } from './post-kit.js';

const kg = (p) => (String(p.specs?.weight || p.weightKg && `${p.weightKg} kg` || '').match(/[\d.]+\s*kg/) || ['-'])[0];
const kgNum = (p) => parseFloat(kg(p));
const range = (l) => `${$(Math.min(...l.map((p) => p.price)))} to ${$(Math.max(...l.map((p) => p.price)))}`;
const brands = (l) => [...new Set(l.map((p) => p.brandName).filter((b) => b && !/^(various|generic)$/i.test(b)))].join(', ');

const push = byPrice(PRODUCTS.filter((p) => p.category === 'push-pull-golf-buggies'));
const walk = byPrice(PRODUCTS.filter((p) => p.subcategory === 'walk-behind'));
const remote = byPrice(PRODUCTS.filter((p) => p.subcategory === 'remote-control-golf-buggies'));
const follow = byPrice(PRODUCTS.filter((p) => /follow/i.test(p.name) && p.category === 'electric-golf-buggies'));
const elec = byPrice(PRODUCTS.filter((p) => p.category === 'electric-golf-buggies' && p.subcategory !== 'conversion-kits'));
const lithiumPacks = byPrice(PRODUCTS.filter((p) => p.subcategory === 'lithium' && /lithium/i.test(p.name) && /battery/i.test(p.name)));
const usedStock = byPrice(PRODUCTS.filter((p) => p.condition === 'Used' || p.condition === 'Ex-Demo'));
const slope = (l) => l.filter((p) => /downhill|slope|dhc|descent/i.test(p.specs?.brakes || ''));
const downhill = byPrice(slope(elec));
const lightest = [...elec].filter((p) => Number.isFinite(kgNum(p))).sort((a, b) => kgNum(a) - kgNum(b)).slice(0, 6);

export const EXTRA_NEW = {
  'golf-cart-registration-qld-guide': `
## How does Queensland differ from NSW and Victoria?

${table(['Topic', 'NSW', 'Queensland', 'Victoria'], [
  ['Basic approach', 'Golf buggy medical concession through conditional registration', 'Conditional registration under location codes such as LO3, LO6(A) and LO7', 'No registration if the cart stays off the road system and meets the exemption'],
  ['Seats', 'Two seats only', 'Set by the golf buggy information sheet', 'Not specified in the exemption'],
  ['Speed', '20 km/h maximum', 'Set by the conditions of the code', 'Highway use limited to two kilometres at a time in one direction'],
  ['Permission', 'Medical evidence at a Service NSW centre', 'Road owner, plus a police permit under LO6(A)', 'Unregistered vehicle permit for a one-off road trip'],
])}

Sources: [Transport for NSW](https://www.nsw.gov.au/driving-boating-and-transport/vehicle-registration/conditional-and-seasonal/vehicle-sheets/golf-buggy), [Queensland Government](https://www.qld.gov.au/transport/registration/register/conditional/recreational) and [Transport Victoria](https://transport.vic.gov.au/road-rules-and-safety/golf-cars-and-ride-on-mowers). The three states take three different approaches, so a rule you read for one does not carry over to another.

## Common mistakes buyers make

- **Assuming lights make a cart road legal.** Equipment helps, but in Queensland the route, the road owner and sometimes the police decide.
- **Skipping council permission.** Councils manage local roads, so ask yours before you apply for anything.
- **Buying first and asking later.** A short call to the road owner before you buy can save you from a cart you cannot use as planned.
- **Forgetting the exemption is narrow.** It covers the golf course, its car park and a direct crossing of a road dividing the course, not the street outside.
`,
  'golf-cart-registration-victoria-guide': `
## Points buyers often misread

- **The two kilometre figure is per trip, in one direction, on a highway.** It is not a daily allowance, and Transport Victoria ties the exemption to the cart being designed mainly for use outside the road system and used only for its intended purpose.
- **A permit is not registration.** An unregistered vehicle permit covers a one-off trip that begins in Victoria and cannot replace registering the cart.
- **TAC cover is not automatic.** A cart that does not meet the exemption falls outside third-party personal injury cover, so insurance is part of the decision, not an afterthought.
- **Private land is different from a road.** On a course, estate or farm you own or manage, the road rules above are not the question; the road is.

## Who to contact

${table(['Question', 'Who to ask'], [
  ['Does my cart meet the exemption?', 'VicRoads or Transport Victoria'],
  ['Can I register a non-compliant vehicle?', 'VicRoads, through its register non-compliant vehicles process'],
  ['Do I need a one-off permit?', 'VicRoads, unregistered vehicle permits'],
  ['Am I covered if something goes wrong?', 'The Transport Accident Commission (TAC) and your insurer'],
  ['Which cart suits my use?', 'Our sales desk, using the specification of each model'],
])}

Our carts list their battery, range and speed on each product page, so you can give the authority exactly what it asks for. Browse [golf carts for sale](/shop/luxury-golf-carts/), including [2 seater](/shop/2-seat/) and [4 and 6 seat](/shop/4-6-seat/) models.
`,
  'side-by-side-vs-quad-bike-australia': `
## Quick decision guide

${table(['If you need to...', 'Consider'], [
  ['Carry a passenger beside you', 'A side-by-side: two or more seats side by side'],
  ['Have a steering wheel, rollover protection and seatbelts', 'A side-by-side'],
  ['Ride alone over rough ground with handlebars', 'A quad bike, with an operator protection device on general-use models'],
  ['Haul tools or feed on a working property', 'A farm UTV with a tray or bed'],
  ['Keep children safe', 'Neither: children should never drive a side-by-side, and adult-sized quad bikes are not for children'],
])}

## Questions to ask before you buy a side-by-side

1. Does it have rollover protection and seatbelts for every seat?
2. What does the manufacturer's manual say about passengers, load and terrain?
3. What warranty applies to the machine and to the battery, if it has one?
4. How is it delivered? Our delivery is a flat ${$(F.ship)} by tail-lift truck.
5. What training and protective gear do you need before the first ride?

Our side-by-sides come from brands including ${brands(PRODUCTS.filter((p) => ['side-by-side', 'farm-buggies'].includes(p.subcategory)))}. Use the questions above with every one you consider, and read the manual before you ride.
`,
  'dune-buggy-vs-side-by-side-australia': `
## Questions to ask the seller

1. What is the engine size and is the transmission automatic?
2. How many seats does it have, and does every seat have a harness or seatbelt?
3. What warranty applies, and what spare parts are available?
4. How is it delivered? Delivery is a flat ${$(F.ship)} by tail-lift truck anywhere in Australia.
5. What does the manual say about passengers, load and terrain?

## A safety check before every ride

Product Safety Australia's guidance for side-by-sides applies as common sense to any off-road buggy: wear a helmet, wear your seatbelt or harness, get proper training, tell someone your plans, wear protective gear, never ride under the influence, and carry a phone or radio. Check brakes, tyres and fuel before you start, and never let children drive.

## Brands in each category

${table(['Type', 'Brands in our range'], [
  ['Dune buggies', brands(PRODUCTS.filter((p) => p.subcategory === 'dune-buggies'))],
  ['Side-by-sides and farm UTVs', brands(PRODUCTS.filter((p) => ['side-by-side', 'farm-buggies'].includes(p.subcategory)))],
])}
`,
  'electric-vs-manual-golf-trolley-australia': `
## What does it cost to run an electric golf trolley?

An electric trolley needs charging after a round, and the battery is the part you may replace one day. Lithium battery packs for golf buggies in our range cost ${range(lithiumPacks)}, and lithium packs carry our 5-year Australian replacement warranty. A push trolley has no battery to charge or replace. See the [lithium golf buggy batteries](/shop/lithium/) and [chargers](/shop/chargers/).

## Which brands make each type?

${table(['Type', 'Brands in our range'], [
  ['Push trolleys', brands(push)],
  ['Electric walk-behind trolleys', brands(walk)],
])}

## Which one for a beginner?

If you are new to golf and play a flat nine-hole course, a push trolley keeps cost low while you find out how often you play. If you already play 18 holes on hills, an electric trolley is the one you will use. Either way, start from the weight and folded size on the product page, then add the battery for electric models.
`,
  'remote-control-vs-follow-me-golf-buggy': `
## What about slopes?

Braking matters more with a remote buggy that moves ahead of you. ${slope(remote).length} of our ${remote.length} remote-control buggies and ${slope(follow).length} of our ${follow.length} follow-me buggies list a downhill or slope braking system in their specifications. Read [what downhill control means](/blog/downhill-control-golf-buggy-guide/) before you decide.

## What to ask before you buy either type

1. How many holes does the battery cover, and can you buy a spare?
2. How does the buggy brake on a slope, and does it have a parking brake?
3. How big is it folded, and how much does it weigh?
4. What warranty applies to the buggy, and to the battery?
5. What is the delivery cost? It is a flat ${$(F.ship)} by tail-lift truck.

## Spare batteries and chargers

Lithium golf buggy batteries cost ${range(lithiumPacks)} in our range, and lithium packs carry our 5-year Australian replacement warranty. Match any spare to your buggy's voltage and connector, which are listed on the product page: [lithium golf buggy batteries](/shop/lithium/).
`,
  'golf-buggy-vs-golf-cart-difference': `
## What does it cost to own each one?

${table(['Cost', 'Golf buggy', 'Golf cart'], [
  ['Purchase price', `${$(F.push.min)} to ${$(F.remote.max)} across push, electric and remote`, `${$(F.cart.min)} upward for new carts`],
  ['Delivery', `Flat ${$(F.ship)} by tail-lift truck`, `Flat ${$(F.ship)} by tail-lift truck`],
  ['Accessories and parts', '5% off when your order includes a buggy', '5% off when your order includes a cart'],
  ['Payment', 'PayID, bank transfer, or 10% off with Bitcoin or USDT', 'The same, plus Pay in 4 on the finance page'],
])}

See [Pay in 4 and finance options](/finance/) if you want to split the cost.

## Should you buy used?

If budget decides, used and ex-demo stock costs less. Current used and ex-demo items:

${table(['Item', 'Condition', 'Price'], usedStock.map((p) => [pl(p.slug), p.condition, $(p.price)]))}

Stock changes often, so check [used golf buggies](/shop/used-golf-buggies/) or message us on WhatsApp for what has just arrived.
`,
  'downhill-control-golf-buggy-guide': `
## Questions to ask about slope braking

1. Is the braking automatic, or do you switch it on?
2. Does the buggy also have a parking brake?
3. How does the maker describe the system: downhill brake, speed regulation or dynamic braking?
4. Does the product page list the battery size, so you can judge how a hilly round affects it?
5. What warranty applies to the buggy and to the battery?

## Price bands

${table(['Band', 'Models with downhill braking listed'], [
  ['Under $1,500', String(downhill.filter((p) => p.price < 1500).length)],
  ['$1,500 to $2,499', String(downhill.filter((p) => p.price >= 1500 && p.price < 2500).length)],
  ['$2,500 and over', String(downhill.filter((p) => p.price >= 2500).length)],
])}

Lower-priced models such as the ${pl(downhill[0].slug)} at ${$(downhill[0].price)} already list a braking feature, so a hilly course does not have to mean the top of the range. Lithium battery packs carry our 5-year Australian replacement warranty, and delivery is a flat ${$(F.ship)}.
`,
  'will-a-golf-buggy-fit-in-my-car': `
## Which buggies are lightest to lift?

If lifting is the problem, start with weight. The lightest electric buggies in our range, chassis weight as listed:

${table(['Buggy', 'Weight', 'Price'], lightest.map((p) => [pl(p.slug), kg(p), $(p.price)]))}

Push buggies are lighter again, with weights from ${Math.min(...push.map(kgNum).filter(Number.isFinite))} kg. Remember that some listed weights are for the chassis only, so add the battery for electric models.

## Storing a folded buggy at home

A folded buggy takes the same space in a garage as in a boot. Check the folded size on the product page against the shelf or corner you have in mind, keep it dry, and charge an electric buggy's battery after use. For ride-on carts, which do not fold, see [golf carts for sale](/shop/luxury-golf-carts/).
`,
};
