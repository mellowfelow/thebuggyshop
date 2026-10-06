// src/config/guides-live-extra.js
// Expansion sections for the three short live posts (buyers guide, road registration, LiFePO4 batteries).
// Road-rule text stays general and points to the state authority. Prices come from the product data.
import { PRODUCTS } from './products.js';
import { F, $, pl, price, table, byPrice, inSub, lo, hi, spec } from './post-kit.js';

const roadCarts = byPrice(PRODUCTS.filter((p) => p.category === 'luxury-golf-carts' && p.subcategory !== 'used' && /conditional|registerable/i.test(String(p.specs?.topSpeed || ''))));
const lithium = byPrice(PRODUCTS.filter((p) => p.category === 'batteries' && p.subcategory !== 'chargers' && /lithium|lifepo4/i.test(p.name) && !/lead-acid/i.test(p.name)));
const chargers = byPrice(inSub('batteries', 'chargers').filter((p) => /charger/i.test(p.name)));

export const LIVE_EXTRA = {
  'golf-buggy-for-sale-buyers-guide-australia': `
## Prices at a glance

${table(['Type', 'From', 'To'], [
  ['Push golf buggy', $(F.push.min), $(F.push.max)],
  ['Electric walk-behind buggy', $(F.walk.min), $(F.walk.max)],
  ['Remote-control buggy', $(F.remote.min), $(F.remote.max)],
  ['New ride-on golf cart', $(F.cart.min), '4 to 6 seat carts from ' + $(F.cart46.min)],
  ['Used and ex-lease golf cart', $(F.usedCart.min), $(F.usedCart.max)],
])}

Prices include GST and come from the live shop, so they are the numbers you will pay. Delivery is a flat ${$(F.ship)} Australia-wide by tail-lift truck.

## Which buggy suits how you play?

${table(['If you...', 'Look at', 'Why'], [
  ['Walk a flat course and want the lowest price', 'A push buggy', 'No battery to charge or replace'],
  ['Walk a hilly course', 'An electric walk-behind with downhill braking', 'The motor does the climbing and the braking helps on descents'],
  ['Want to walk free of the buggy', 'A remote-control buggy', 'It follows a handset ahead of you'],
  ['Do not want to steer at all', 'A GPS follow buggy', 'It tracks you around the course'],
  ['Want to ride', 'A golf cart', 'Seats from two to six people'],
  ['Have a farm, estate or large property', 'A utility cart or off-road buggy', 'Built for work and rougher ground'],
])}

## Brands we stock

We stock buggies from MGI, Motocaddy, PowaKaddy, Clicgear, Stewart Golf, Big Max and more, and carts from ECAR, Tomberlin, Club Car, Yamaha and E-Z-GO. See every [brand we stock](/brands/). If you are leaning towards an MGI, our guide to the [MGI Zip and Ai ranges](/blog/mgi-zip-vs-ai-navigator-which-mgi-buggy/) compares each model.

## Questions to ask before you pay

1. What battery does it use, how big is it and what is the warranty on it?
2. Is the right charger included?
3. How much does it weigh and how does it fold?
4. Can I get spare wheels and parts easily? See our [parts range](/shop/parts/).
5. For a used buggy or cart, how old is the battery? Our guide to [buying a used golf cart](/blog/used-golf-cart-auction-vs-dealer-australia/) has a 10-point checklist.

## New or used: a quick decision table

${table(['If you...', 'Choose', 'Why'], [
  ['Want the latest battery and a full warranty', 'New', 'You know the battery age and the warranty runs from the day you buy'],
  ['Want to save money', 'Used or ex-demo', 'Used and ex-demo stock starts from ' + $(F.usedAll.min)],
  ['Are buying a cart for a farm or resort', 'New or ex-fleet', 'A known service history matters when a cart works every day'],
  ['Are unsure what you need', 'Call us first', 'A short chat avoids buying the wrong type'],
])}

## Common buying mistakes

- Buying a ride-on cart when a buggy would do, or the other way round.
- Choosing on price alone and ignoring the battery warranty.
- Forgetting the charger, the cover and the bag when you set a budget.
- Not checking that spare wheels and parts are available.
- Ordering a used buggy or cart without asking the age of the battery.

## Keep reading

- [Cheap golf buggies and carts: what each budget buys](/blog/cheap-golf-buggies-and-carts-australia/)
- [Best electric golf buggies in Australia](/blog/best-electric-golf-buggies-australia/)
- [Golf cart AC vs DC motors](/blog/golf-cart-ac-vs-dc-motor-guide/)
- [Golf buggy battery replacement](/blog/golf-buggy-battery-replacement-guide/)
`,

  'conditional-road-registration-guide-qld-nsw-vic': `
## Why the rules differ by state

Each Australian state and territory sets its own rules for registering vehicles and for what may be driven on public roads. A golf cart that is fine on a golf course or a farm is not automatically allowed on a road, and the conditions that apply in Queensland are not the same as those in New South Wales or Victoria. That is why the first step is always to check with the authority in your state.

## What conditional registration generally involves

The details change, so treat this as a general outline and confirm the current requirements with your road authority:

1. **An application** to the state authority for the vehicle you intend to use.
2. **Evidence the vehicle meets the standards** that apply, which is why a model marked road compliant matters.
3. **Conditions** on where, when and how the vehicle may be driven, which can include limits on roads, speed or times of day.
4. **A licensed driver** and the correct registration or permit.
5. **Insurance**, which you should discuss with your insurer.

## Private land or public road: quick comparison

${table(['', 'Private land only', 'Public road as well'], [
  ['Typical places', 'Farm, estate, golf course, resort', 'Roads and paths you cross or travel on'],
  ['Registration', 'Usually not required for the vehicle itself', 'Required, with the conditions your state sets'],
  ['Licence', 'Club, site or insurer rules may apply', 'A licence is required'],
  ['Which cart', 'Any cart that suits the job', 'A model marked road compliant'],
  ['First step', 'Check site and insurer rules', 'Contact your state road authority'],
])}

## Road-compliant carts in our range

${roadCarts.length ? table(['Cart', 'Price', 'Listed top speed'], roadCarts.map((p) => [pl(p.slug), $(p.price), spec(p, 'topSpeed')])) : 'Ask us which models carry road-compliance support.'}

Each product page shows the top speed and compliance wording for that model. Please do not assume a cart is road legal in your state: confirm it with the authority and ask us for the model's compliance details before you order.

## Questions to ask before you order

1. Is this model marked road compliant for my state?
2. What documents do you provide with the cart?
3. What is its top speed as supplied, and is it adjustable?
4. What does my state authority require for registration and for the driver?
5. What will my insurer need?

## Who to contact

- **Queensland:** the Department of Transport and Main Roads (TMR).
- **New South Wales:** Transport for NSW.
- **Victoria:** VicRoads.

These authorities set the current requirements. If you would like to talk through a specific cart, our [electric golf cart guide](/blog/electric-golf-carts-australia-guide/) covers the range, and our sales desk is on 0480 811 308.
`,

  'lifepo4-vs-lead-acid-battery-lifespan-australian-climate': `
## LiFePO4 in plain English

LiFePO4 stands for lithium iron phosphate, a lithium chemistry used in modern buggy and cart batteries. Each pack contains cells and a battery management system (BMS), which watches voltage and temperature and protects the cells from over-charge, over-discharge and overheating. Unlike lead-acid batteries, a lithium pack does not need topping up with water and holds a steady voltage as it discharges, so the buggy keeps its power until the pack is nearly flat.

## Sizing a lithium battery

A battery's energy in watt-hours is its voltage multiplied by its amp-hours. A 48V 100Ah pack holds 4,800Wh, or 4.8 kWh. For buggies, packs are often sold by hole rating instead, such as 18-hole and 36-hole. Always match the voltage to your buggy or cart.

## Lithium batteries in our range

${table(['Battery', 'Price', 'Warranty'], lithium.map((p) => [pl(p.slug), $(p.price), spec(p, 'warranty')]))}

Lithium packs we sell carry a 5-year Australian replacement warranty. See our [lithium golf buggy batteries](/shop/lithium/) and [golf cart batteries](/shop/cart-sets/).

## Charging and storing lithium

- Use the charger made for your battery, because lithium and lead-acid chargers are different.
- Charge in a cool, ventilated place and out of direct sun.
- Do not leave the pack in a hot car or boot.
- For long breaks, store it partly charged and check it every few months.
- Keep terminals clean and connectors seated.

${table(['Charger', 'Price'], chargers.map((p) => [pl(p.slug), $(p.price)]))}

## Upgrading from lead-acid

1. Check the voltage of your current battery and the space available.
2. Choose a lithium pack of the same voltage, or a conversion kit for your cart.
3. Swap the charger for a lithium-compatible one.
4. Fit the pack and charge it fully before you drive.

Our ${pl('voltrac-flex-lithium-conversion-kit-e-z-go-rxv-club-car-48v')} is ${price('voltrac-flex-lithium-conversion-kit-e-z-go-rxv-club-car-48v')} for 48V E-Z-GO RXV and Club Car carts.

## Signs a lithium pack needs attention

- It runs for noticeably fewer holes than it used to.
- The charger never reaches a full-charge light, or finishes very quickly.
- The buggy cuts out under load even when the pack shows charge.
- The case is swollen, hot, damaged or smells unusual: stop using it and contact us.

Do not open a lithium pack or charge a damaged one. If you are unsure, call 0480 811 308.

## Common mistakes with lithium batteries

- Using a lead-acid charger on a lithium pack.
- Buying the wrong voltage because the connector looked right.
- Storing a pack fully flat for months.
- Leaving a battery in a hot car or boot over summer.
- Assuming a bigger pack always fits: check the space and the weight first.

## Keep reading

- [Golf cart battery replacement cost](/blog/golf-cart-battery-replacement-cost-australia/)
- [Golf buggy battery replacement: 12V, 24V and lithium](/blog/golf-buggy-battery-replacement-guide/)
- [Golf buggy repairs and servicing](/blog/golf-buggy-repairs-servicing-guide-australia/)
`,
};
