// src/config/guides-extra.js
// Extra sections for the keyword-engine v2 guides: worked examples, cost tables and checklists. Every number is computed from the
// product data or is a plain definition. Each entry is inserted before the closing section of the guide it belongs to.
import { PRODUCTS } from './products.js';
import { F, $, P, pl, price, table, byPrice, inSub, lo, hi, spec } from './post-kit.js';

const kwh = (battery) => { const m = String(battery || '').match(/(\d+)\s*V\s*(\d+)\s*Ah/i); return m ? (Number(m[1]) * Number(m[2])) / 1000 : null; };
const acCarts = byPrice(PRODUCTS.filter((p) => p.category === 'luxury-golf-carts' && /\bAC\b/.test(String(p.specs?.motor || ''))));
const used = byPrice(inSub('luxury-golf-carts', 'used'));
const mgi = byPrice(PRODUCTS.filter((p) => p.brand === 'mgi' && p.category === 'electric-golf-buggies' && p.subcategory !== 'conversion-kits'));
const cartSets = byPrice(inSub('batteries', 'cart-sets'));
const parts = byPrice(inSub('parts'));
const kidsE = byPrice(inSub('kids-buggies', 'electric'));
const kidsP = byPrice(inSub('kids-buggies', 'petrol'));
const warrYears = (p) => { const m = String(p.specs?.warranty || '').match(/(\d+)[- ]?(Year|Month)/i); if (!m) return null; return /month/i.test(m[2]) ? Number(m[1]) / 12 : Number(m[1]); };

export const EXTRA = {
  'golf-cart-ac-vs-dc-motor-guide': `
## Reading a cart's spec sheet

Three numbers tell you most of what you need: the motor rating in kilowatts, the battery voltage and the battery capacity. Battery energy in kilowatt-hours is volts multiplied by amp-hours, divided by 1,000. A 48V 105Ah pack holds 5.04 kWh. Here is the maths for the AC carts we list:

${table(['Cart', 'Motor', 'Battery', 'Energy (kWh)', 'Listed range'], acCarts.map((p) => [pl(p.slug), spec(p, 'motor'), spec(p, 'battery'), kwh(spec(p, 'battery')) ? kwh(spec(p, 'battery')).toFixed(2) : '-', spec(p, 'range')]))}

A higher kilowatt rating means more power for hills and loads. A bigger battery means more range. Neither matters much if the controller and motor are poorly matched, which is why a maker's listed range on your kind of terrain is worth asking about.

## Common myths about AC and DC carts

- **"AC carts are always faster."** Top speed is set by the controller and the cart's limits, not by the motor type alone.
- **"DC carts cannot climb hills."** A well-specified DC cart climbs fine. AC drives are usually smoother and more efficient on a climb.
- **"An AC cart never needs servicing."** There are no brushes to replace, but tyres, brakes and the battery still need care.
- **"Lithium means AC."** Not always. Battery chemistry and motor type are separate choices, so check each.
`,

  'used-golf-cart-auction-vs-dealer-australia': `
## What to budget on top of the purchase price

The advertised price is not the whole cost. For a used cart, plan for these:

- **Delivery:** a flat ${$(F.ship)} Australia-wide by tail-lift truck when you buy from us.
- **Batteries:** if a cart needs a new set, our 48V sets run from ${lo(byPrice(inSub('batteries', 'cart-sets')))} to ${hi(byPrice(inSub('batteries', 'cart-sets')))}. See the [battery replacement cost guide](/blog/golf-cart-battery-replacement-cost-australia/).
- **Insurance and registration:** if the cart will go on a public road, rules and costs depend on your state.
- **Accessories:** accessories and parts are 5% off when your order includes a buggy or cart.

${table(['Used cart', 'Price', 'Price plus flat delivery'], used.map((p) => [pl(p.slug), $(p.price), $(p.price + F.ship)]))}

## Questions to ask any seller

1. How old are the batteries, and have they been replaced?
2. Has the cart been serviced, and is there a record?
3. Where was it used: a golf course, a resort, a farm, near the coast?
4. Why is it being sold?
5. Is the charger included, and does it work?
6. Can I drive it, and can I have it inspected?
7. Is there any warranty, even a short one?

A seller who answers these openly is a better bet than one who will not.
`,

  'mgi-zip-vs-ai-navigator-which-mgi-buggy': `
## Fold size, weight and warranty compared

Portability matters if you lift the buggy in and out of a car. Here are the figures from each product's specification:

${table(['Model', 'Weight', 'Folded size', 'Brakes', 'Warranty'], mgi.map((p) => [pl(p.slug), spec(p, 'weight'), spec(p, 'foldSize'), spec(p, 'brakes'), spec(p, 'warranty')]))}

Weights are listed with or without the battery on each product page, so check before you compare two models directly. MGI buggies fold for the boot; check each product page for its folded size.

## What to check before you buy

1. **Course terrain.** Hills favour downhill braking or a remote or GPS model.
2. **Battery size.** 18-hole and 36-hole packs differ; see our [lithium battery range](/shop/lithium/).
3. **Accessories.** A scorecard console, drink holder and umbrella holder start from ${price('golf-buggy-drink-holder-gps-and-phone-holder')}; see [golf buggy accessories](/shop/accessories/).
4. **Delivery.** A flat ${$(F.ship)} Australia-wide by tail-lift truck.
5. **Spares.** Wheels and parts are in our [parts range](/shop/parts/).
`,

  'golf-cart-battery-replacement-cost-australia': `
## Comparing cost against warranty

Price alone is a poor guide. One simple measure is cost per year of warranty cover. This is not a lifespan, but it shows what you are paying for the cover on offer:

${table(['Battery option', 'Price', 'Warranty', 'Price per warranty year'], cartSets.filter((p) => warrYears(p)).map((p) => [pl(p.slug), $(p.price), spec(p, 'warranty'), $(p.price / warrYears(p))]))}

A longer warranty on a higher-priced lithium pack can work out cheaper per year than a short warranty on a cheaper set. Check the terms of each warranty before you rely on this.

## Converting a cart to lithium

If your cart has a lead-acid set, a conversion kit can swap it for lithium. Our ${pl('voltrac-flex-lithium-conversion-kit-e-z-go-rxv-club-car-48v')} fits E-Z-GO RXV and Club Car 48V carts and is ${price('voltrac-flex-lithium-conversion-kit-e-z-go-rxv-club-car-48v')}. Confirm your cart and charger before you order, and call 0480 811 308 if you are unsure.

## Charging and care after a replacement

- Use the charger made for the new battery type.
- Charge a new set fully before the first drive.
- Keep batteries out of direct heat.
- Check terminals and connections every few months.
`,

  'golf-buggy-battery-replacement-guide': `
## What "18-hole" and "36-hole" mean

Hole ratings are a simple way to size a battery. An 18-hole pack is intended for one round, and a 36-hole pack for two. A battery's energy in watt-hours is its volts multiplied by its amp-hours, and our 24V 36-hole packs are rated from 250Wh to 380Wh. A larger pack gives more rounds between charges, but weighs a little more.

## Lithium and lead-acid packs side by side

${table(['Battery', 'Chemistry', 'Price'], byPrice(inSub('batteries', 'lithium')).map((p) => [pl(p.slug), /lead-acid/i.test(p.name) ? 'Lead-acid' : 'Lithium', $(p.price)]))}

## After you fit a new battery

1. Charge it fully before the first round.
2. Use the charger made for its chemistry.
3. Check the connector is seated and the buggy powers up.
4. Keep spare packs charged and stored indoors.
5. Contact us if the buggy does not run as it did: call 0480 811 308.
`,

  'golf-buggy-repairs-servicing-guide-australia': `
## Parts cost guide

Here is what common spares cost on our range:

${table(['Part', 'Price'], parts.map((p) => [pl(p.slug), $(p.price)]))}

See them all in our [parts range](/shop/parts/).

## A two-minute check before every round

1. Is the battery charged?
2. Are the tyres inflated or the wheels free of damage?
3. Do the brakes hold?
4. Do all the connectors and handles sit firmly?
5. Does the buggy fold and unfold smoothly?

Catching a loose bolt or a flat tyre in the car park is far easier than fixing it on the course.
`,

  'kids-off-road-buggy-buying-guide-electric-vs-petrol': `
## Safety and control features compared

The details are in each product's specification:

${table(['Buggy', 'Speed or throttle control', 'Safety features', 'Payload', 'Warranty'], [...kidsE, ...kidsP].map((p) => [pl(p.slug), spec(p, 'speedLimit') !== '-' ? spec(p, 'speedLimit') : spec(p, 'safety') !== '-' ? 'Parental throttle limiter' : 'See product page', spec(p, 'safety'), spec(p, 'payloadCapacity'), spec(p, 'warranty')]))}

Speed limiters, harnesses and kill switches are worth having, particularly for a first ride.

## Running costs and upkeep

An electric kids buggy needs charging and an occasional battery check. A petrol buggy needs fuel, oil and more regular servicing. Both need tyre checks, brake checks and cleaning after muddy rides. Parts and local support matter as much as the sticker price, so ask us about spares before you buy.
`,

  'golf-wedge-degrees-loft-guide': `
## Wedge bounce in plain English

Bounce is the angle between the leading edge of a wedge and the lowest part of its sole. More bounce stops the club digging into soft sand or turf. Less bounce suits firm ground and tight lies. Sand wedges commonly have more bounce than pitching wedges, which is part of why they work well in bunkers.

## Example wedge set-ups

${table(['Set-up', 'Wedges', 'Gaps between wedges'], [
  ['Three wedges', '46 (PW), 52 (GW), 58 (SW)', '6 degrees each'],
  ['Three wedges, higher loft', '48 (PW), 54 (GW), 58 (SW)', '6 then 4 degrees'],
  ['Four wedges', '46 (PW), 50 (GW), 54 (SW), 58 (LW)', '4 degrees each'],
])}

These are examples only. Start from the loft of your own pitching wedge and work out from there.

## Common wedge mistakes

- Carrying two wedges with the same loft and no gap wedge.
- Carrying a lob wedge you cannot hit consistently.
- Never checking the actual loft on a new set's pitching wedge.
- Ignoring bounce on a course with soft bunkers or hard fairways.
`,

  'best-golf-putters-types-guide-australia': `
## How to practise putting at home

A short routine at home does more for your scores than a new putter. A ${pl('golf-putting-mat')} is ${price('golf-putting-mat')}, and you can set up a few simple drills:

1. **Gate drill.** Place two tees just wider than the putter head and stroke through them.
2. **Short putt ladder.** Hole 10 putts from one metre before you step back.
3. **Lag drill.** Roll putts to a line three to six metres away and aim to stop them close.

## Questions to ask before you buy a putter

- Does the length let you stand comfortably, eyes roughly over the ball?
- Can you line up the head easily?
- Do you like the sound and feel at impact?
- Is the grip comfortable and not too thick or thin?
- Is the weight right for your stroke?

If you cannot test it in a shop, buy from a retailer with a clear returns policy: see our [returns page](/returns/).
`,

  'what-golf-clubs-do-you-need-full-set-explained': `
## A sample 14-club bag

${table(['Club', 'Count'], [
  ['Driver', '1'],
  ['Fairway wood (3 wood)', '1'],
  ['Hybrid', '1'],
  ['Irons (6 to 9)', '4'],
  ['Wedges (pitching, gap, sand, lob)', '4'],
  ['Putter', '1'],
  ['Total', '12'],
])}

That is 12 clubs, so there is room for two more: perhaps a 5 iron and a second hybrid. Add the clubs you actually use, rather than filling the bag for the sake of it.

## What to leave out as a beginner

Long irons are hard to hit, so most beginners skip a 3 and 4 iron and use hybrids instead. A lob wedge is optional until you have a reliable short game. A smaller set also keeps the bag light, which is helpful if you walk the course or carry your own bag. As you improve, add clubs to fill the gaps in your distances.
`,

  'best-golf-club-sets-for-beginners-australia': `
## The cost of getting started

A set is only part of what you need to play. Here is a realistic starter budget using prices from our range:

${table(['Item', 'Price'], [
  [pl('beginner-complete-golf-club-set-12-piece'), price('beginner-complete-golf-club-set-12-piece')],
  [pl('titleist-pro-v1-golf-balls-dozen', 'A dozen premium golf balls'), price('titleist-pro-v1-golf-balls-dozen')],
  [pl('golf-putting-mat'), price('golf-putting-mat')],
  [pl('golf-hitting-mat'), price('golf-hitting-mat')],
  [pl('golf-practice-hitting-net'), price('golf-practice-hitting-net')],
])}

You do not need all of it on day one. A set and a few balls will get you started, and practice aids are worth adding when you want to improve at home.

## Questions to ask before you buy

1. Does the set suit my height and swing speed?
2. What clubs are in it, and is a bag included?
3. What is the delivery cost and how long will it take?
4. What is the returns policy if the set does not fit?
5. Can I add clubs later or swap individual clubs?
`,

  'junior-golf-clubs-kids-golf-sets-by-age': `
## Practising at home

A child can improve a lot between rounds. A ${pl('golf-practice-hitting-net')} is ${price('golf-practice-hitting-net')}, a ${pl('golf-hitting-mat')} is ${price('golf-hitting-mat')}, and a ${pl('golf-putting-mat')} is ${price('golf-putting-mat')}. Keep sessions short and fun, with a few targets to aim at.

## Taking a child to the course

- Start on a short course or a par-3 course, or play a few holes.
- Teach course etiquette early: stay quiet, repair divots and keep up with the group in front.
- Let them use tees closer to the green so holes feel achievable.
- Bring water, snacks and sun protection.
- Finish while they are still enjoying it.
`,

  'ladies-golf-clubs-womens-golf-sets-guide': `
## A simple fitting check at home

1. Stand up straight with your arms relaxed by your sides.
2. Measure from your wrist crease to the floor and compare it to the maker's size chart.
3. Hold a club in your address position and check you can stand comfortably without stretching or hunching.
4. Take a few slow swings and check the club feels easy to swing.

## Gear to add as you improve

${table(['Item', 'Price'], [
  [pl('ladies-complete-golf-club-set'), price('ladies-complete-golf-club-set')],
  [pl('lightweight-golf-stand-bag'), price('lightweight-golf-stand-bag')],
  [pl('shot-scope-g5-gps-golf-watch'), price('shot-scope-g5-gps-golf-watch')],
  [pl('precision-pro-nx7-golf-rangefinder'), price('precision-pro-nx7-golf-rangefinder')],
])}
`,

  'golf-bag-and-cart-how-to-choose-stand-cart-carry': `
## How to check a bag fits your buggy

1. Check the width of the base of the bag against the bag well on your buggy.
2. Check how the bag attaches: straps, a cradle or a clip.
3. Place a loaded bag on the buggy and push it a few metres to check it stays stable.
4. Make sure the bag does not block the handle, controls or console.

## Bag features checklist

- Dividers: full-length dividers keep clubs apart and easier to pull.
- Pockets: room for balls, tees, a rain jacket, drinks and valuables.
- Rain hood: handy in wet weather.
- Straps and handles: comfortable if you ever carry it.
- Base: flat and stable if it sits on a buggy.
`,

  'golf-rangefinder-vs-gps-watch-which-to-buy': `
## A price ladder from our range

${table(['Product', 'Type', 'Price'], byPrice(inSub('accessories', 'rangefinders-gps')).map((p) => [pl(p.slug), /watch/i.test(p.name) ? 'GPS watch' : 'Laser rangefinder', $(p.price)]))}

## Using a device on the course

Use a rangefinder or watch to keep play moving: check the distance, choose your club and hit. Do not stand over the ball for long measuring every target. Keep your device off the green and follow the club's rules. If you play in competitions, check what is allowed before you bring it.
`,

  'how-to-choose-a-golf-driver': `
## Common driver mistakes

- Choosing a stiff shaft for a swing that does not need one.
- Using too little loft for a slower swing.
- Choosing a driver by headline distance claims rather than how it feels.
- Never getting a fitting or testing a few drivers.
- Keeping the same driver for a decade after your swing has changed.

## How to test a driver

Hit at least 10 shots with each driver you are comparing, on the same day and with the same ball. Note where the ball ends up, not just how far it goes. A driver that puts more shots in play is usually the better choice.
`,

  'how-to-choose-an-iron-set': `
## Gapping your irons

Each iron should go about the same distance further than the one before. If two irons go the same distance, you have a gap problem: you are wasting a club slot. If there is a big jump between two irons, you may need a different loft or an added hybrid. Hit 10 balls with each iron and write down the average distance.

## Common iron-set mistakes

- Buying blades because a better player uses them.
- Choosing an iron set before checking the loft of the pitching wedge.
- Overlooking shaft flex.
- Buying a long-iron-heavy set when a hybrid would be easier to hit.
- Spending more on irons than on lessons.
`,
};
