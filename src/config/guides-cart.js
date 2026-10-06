// src/config/guides-cart.js
// Keyword engine v2, guides 1-7: buggy, cart, battery and kids topics. Facts come from the product data (see post-kit.js).
// Rules: no invented statistics, awards or named clients. Legal statements stay general and point to the state authority.
import { PRODUCTS } from './products.js';
import { F, $, P, pl, price, table, byPrice, inSub, lo, hi, spec, mk, img } from './post-kit.js';

// ------------------------------------------------------------------ 1. golf cart AC vs DC
const acCarts = byPrice(PRODUCTS.filter((p) => p.category === 'luxury-golf-carts' && /\bAC\b/.test(String(p.specs?.motor || ''))));
const acVsDc = `
A golf cart AC motor is an alternating-current drive that is more efficient and needs less servicing than an older DC motor, and most new lithium golf carts now use one. If you are comparing carts, "AC" on the spec sheet is a good sign. This guide explains what AC and DC mean on a golf cart, how they differ in daily use, and which carts in our range have an AC motor.

## What "AC" means on a golf cart

Every electric golf cart has a motor driven by a controller and a battery. The battery stores direct current (DC). In an older DC-motor cart, that direct current goes more or less straight to a brushed motor. In an AC-motor cart, the controller converts the battery's DC into alternating current to drive an AC motor.

${table(['', 'DC motor cart', 'AC motor cart'], [
  ['Motor type', 'Brushed DC motor', 'AC induction motor'],
  ['Efficiency', 'Lower', 'Higher, so more range from the same battery'],
  ['Brushes to wear out', 'Yes', 'No'],
  ['Regenerative braking', 'Rare', 'Common, which helps on hills'],
  ['Upfront cost', 'Lower', 'Higher'],
  ['Typical age of cart', 'Older and ex-lease carts', 'Most new lithium carts'],
])}

## AC vs DC: the practical differences

### Efficiency and range

An AC drive wastes less energy as heat, so the same battery goes further. That matters most with lithium batteries, because you are paying for every kilowatt-hour you carry. The AC carts in our range list ranges from ${Math.min(...acCarts.map((p) => parseInt(spec(p, 'range'), 10)).filter(Number.isFinite))} km to ${Math.max(...acCarts.map((p) => parseInt(spec(p, 'range'), 10)).filter(Number.isFinite))}+ km per charge, depending on the cart and its battery.

### Servicing and wear

A brushed DC motor has carbon brushes that wear and need replacing. An AC motor has none, so there is one less routine job. Both types still need the same basics: tyres, brakes, wheel bearings and a healthy battery.

### Braking and downhill control

Many AC drives can slow the cart on a descent by feeding energy back to the battery. That gives smoother, more controlled downhill driving than a DC cart that relies on its mechanical brakes alone.

## Golf carts in our range with an AC motor

These carts list an AC motor in their specifications:

${table(['Cart', 'Price', 'Motor', 'Battery', 'Range'], acCarts.map((p) => [pl(p.slug), $(p.price), spec(p, 'motor'), spec(p, 'battery'), spec(p, 'range')]))}

See the full [golf cart range](/shop/luxury-golf-carts/), or read about [ECAR golf carts](/brands/ecar/), where the A2, A4 and Magnum list AC systems.

## When DC still makes sense

A DC cart is not a bad cart. Older carts are often simple to repair, widely supported and cost much less to buy. Check each cart's specification to see which motor it has: our used carts start at ${price('used-yamaha-g29-2-seat-ex-lease-golf-cart')} for the ${pl('used-yamaha-g29-2-seat-ex-lease-golf-cart', 'Used Yamaha G29')}. If your budget is under ${$(F.cart.min)}, our [used golf carts](/shop/used-golf-buggies/) are the place to look.

## Questions to ask before you buy

1. Is the motor AC or DC, and what is its power rating in kilowatts?
2. What battery does it use, and what is the warranty on the battery?
3. Does the cart have regenerative braking?
4. What range does the maker list, and on what terrain?
5. Can you service it locally, and are parts easy to get?

Our guide to [lithium versus lead-acid batteries](/blog/lifepo4-vs-lead-acid-battery-lifespan-australian-climate/) covers the battery side of the same decision. For help choosing, call 0480 811 308.
`;

// ------------------------------------------------------------------ 2. used golf cart auction vs dealer
const used = byPrice(inSub('luxury-golf-carts', 'used'));
const usedAuction = `
A golf cart auction can be cheap, but auction carts are normally sold as-is, usually with no warranty, so buyers should inspect the batteries and drive system closely or buy from a dealer that backs the cart. This guide compares an auction, Gumtree and a dealer for a used golf cart in Australia, and gives you a checklist to use whichever way you buy.

## Auction, Gumtree or dealer: the short answer

${table(['', 'Golf cart auction', 'Gumtree or private seller', 'Dealer'], [
  ['Price', 'Often lowest', 'Low to mid', 'Highest, but includes checks'],
  ['Warranty', 'Usually none', 'Rarely', 'Yes, stated on the listing'],
  ['Test drive', 'Often not possible', 'Usually possible', 'Usually possible'],
  ['Battery history', 'Often unknown', 'Ask the seller', 'Stated on the listing'],
  ['Moving the cart', 'You arrange it', 'You arrange it', 'Delivery available'],
])}

## Buying at a golf cart auction

Auction carts are typically sold as seen. You may not be able to drive the cart, charge it or see its service history. The risk is a tired battery set, which is the most expensive part to replace, so allow for that cost before you bid. You also arrange and pay to move the cart.

## Buying from Gumtree or a private seller

A private seller can offer a fair price, and you can usually drive the cart first. Ask how old the batteries are, whether the cart has been serviced, and why it is being sold. There is rarely any warranty, so check the cart carefully against the list below.

## Buying from a dealer

A dealer costs more, but the cart is checked, the listing states the battery and warranty, and delivery is arranged. We list ${used.length} used and ex-lease carts from ${lo(used)} to ${hi(used)}, plus an ${pl('ex-demo-mgi-zip-navigator-at-remote-buggy', 'ex-demo MGI Zip Navigator AT remote buggy')} at ${price('ex-demo-mgi-zip-navigator-at-remote-buggy')}.

${table(['Used cart', 'Price', 'Warranty'], used.map((p) => [pl(p.slug), $(p.price), spec(p, 'warranty')]))}

Delivery is a flat ${$(F.ship)} Australia-wide by tail-lift truck. See all [used golf carts for sale](/shop/used-golf-buggies/).

## A 10-point used golf cart checklist

1. **Battery age and health.** Ask for the age and, for lithium, the health reading.
2. **Motor and controller.** Listen for grinding or whining and look for error codes.
3. **Brakes.** The cart should stop straight and hold on a slope.
4. **Tyres and wheels.** Check wear and cracks.
5. **Chassis and rust.** Look under the cart and around the suspension mounts.
6. **Steering.** There should be no excessive play.
7. **Seats and body.** Check for splits and sun damage.
8. **Charger.** Make sure the right charger is included and works.
9. **Serial plate and paperwork.** The details should match.
10. **Test drive.** Drive it up and down a slope, if you can.

## What a used cart warranty should cover

Compare warranties line by line. Our ex-fleet ${pl('ex-fleet-ezgo-rxv-48v-lithium-2-seat-cart', 'E-Z-GO RXV 48V lithium cart')} lists ${spec(P['ex-fleet-ezgo-rxv-48v-lithium-2-seat-cart'], 'warranty')}, and our ex-demo MGI buggy lists ${spec(P['ex-demo-mgi-zip-navigator-at-remote-buggy'], 'warranty')}. An as-is auction sale covers none of this.

## Which should you choose?

If you are happy to inspect, repair and move a cart yourself, an auction or private sale can save money. If you want a tested cart with a warranty and delivery, buy from a dealer. Either way, read our [golf buggy buyer's guide](/blog/golf-buggy-for-sale-buyers-guide-australia/), look at [Club Car](/brands/club-car/), [Yamaha](/brands/yamaha/) and [E-Z-GO](/brands/ez-go/) carts, and call 0480 811 308 with questions.
`;

// ------------------------------------------------------------------ 3. MGI zip vs ai
const mgiWalk = byPrice(PRODUCTS.filter((p) => p.brand === 'mgi' && p.subcategory === 'walk-behind'));
const mgiRemote = byPrice(PRODUCTS.filter((p) => p.brand === 'mgi' && p.subcategory === 'remote-control-golf-buggies'));
const mgiGps = byPrice(PRODUCTS.filter((p) => p.brand === 'mgi' && p.subcategory === 'gps-follow-buggies'));
const mgiAll = [...mgiWalk.map((p) => [p, 'Walk-behind']), ...mgiRemote.map((p) => [p, 'Remote control']), ...mgiGps.map((p) => [p, 'GPS follow'])];
const mgi = `
The MGI electric golf buggy range runs from the walk-behind Zip X1 at ${price('mgi-zip-x1-electric-golf-buggy')} to the Ai Navigator GPS+ follow-me buggy at ${price('mgi-ai-navigator-gps-plus-electric-golf-buggy')}. The right model depends on whether you want to steer it, drive it by remote or have it follow you. This guide compares the MGI Zip and Ai ranges so you can choose.

## The MGI range at a glance

${table(['Model', 'Type', 'Price', 'Battery', 'Weight'], mgiAll.map(([p, type]) => [pl(p.slug), type, $(p.price), spec(p, 'battery'), spec(p, 'weight')]))}

Every price is from the live shop. See them all on the [MGI brand page](/brands/mgi/).

## MGI Zip X1, X3 and X5 (walk-behind)

A walk-behind electric buggy has a motor that pulls the bag while you steer by the handle. The Zip range is the entry point:

- ${pl('mgi-zip-x1-electric-golf-buggy', 'Zip X1')} at ${price('mgi-zip-x1-electric-golf-buggy')}: the simplest and cheapest MGI buggy.
- ${pl('mgi-zip-x3-electric-golf-buggy', 'Zip X3')} at ${price('mgi-zip-x3-electric-golf-buggy')}: sized for 36 holes.
- ${pl('mgi-zip-x5-electric-golf-buggy', 'Zip X5')} at ${price('mgi-zip-x5-electric-golf-buggy')}: adds downhill braking, which holds the buggy's speed on slopes.

Compare other walk-behind models in our [walk-behind range](/shop/walk-behind/).

## MGI Zip Navigator AT and Ai 500 (remote control)

A remote-control buggy follows a handset, so you walk free of it. The ${pl('mgi-zip-navigator-at-remote-electric-golf-buggy', 'Zip Navigator AT')} is ${price('mgi-zip-navigator-at-remote-electric-golf-buggy')} and the ${pl('mgi-ai-500-remote-electric-golf-buggy', 'Ai 500')} is ${price('mgi-ai-500-remote-electric-golf-buggy')}. We also list a certified ${pl('ex-demo-mgi-zip-navigator-at-remote-buggy', 'ex-demo Zip Navigator AT')} at ${price('ex-demo-mgi-zip-navigator-at-remote-buggy')}. See every [remote control golf buggy](/shop/remote-control-golf-buggies/).

## MGI Ai Navigator GPS+ and Halo (follow-me)

The Ai Navigator range is the top of the MGI lineup. It uses GPS to follow you around the course. The ${pl('mgi-ai-navigator-gps-plus-electric-golf-buggy', 'Ai Navigator GPS+')} is ${price('mgi-ai-navigator-gps-plus-electric-golf-buggy')} and the ${pl('mgi-ai-navigator-halo-flagship-buggy', 'Ai Navigator Halo')} is ${price('mgi-ai-navigator-halo-flagship-buggy')}. Browse the [GPS and follow buggies](/shop/gps-follow-buggies/).

## Batteries, chargers and spares

MGI buggies use lithium packs, and we stock replacements and spares:

- ${pl('mgi-lithium-12v-20ah-299wh-18-hole-battery')}, ${price('mgi-lithium-12v-20ah-299wh-18-hole-battery')}
- ${pl('mgi-24v-380wh-click-and-go-lithium-battery')}, ${price('mgi-24v-380wh-click-and-go-lithium-battery')}
- ${pl('mgi-lithium-24v-13ah-remote-series-battery')}, ${price('mgi-lithium-24v-13ah-remote-series-battery')}
- ${pl('mgi-lithium-24v-smart-charger')}, ${price('mgi-lithium-24v-smart-charger')}
- ${pl('mgi-zip-navigator-motor-controller')}, ${price('mgi-zip-navigator-motor-controller')}

See our [lithium golf buggy batteries](/shop/lithium/) and [golf buggy parts](/shop/parts/). Lithium packs we sell carry a 5-year Australian replacement warranty.

## Which MGI buggy should you buy?

${table(['If you...', 'Choose'], [
  ['Want the lowest price', 'Zip X1'],
  ['Play 36 holes', 'Zip X3'],
  ['Play a hilly course', 'Zip X5 (downhill braking)'],
  ['Want to walk free of the buggy', 'Zip Navigator AT or Ai 500'],
  ['Want the buggy to follow you', 'Ai Navigator GPS+ or Halo'],
  ['Want a lower price on a remote buggy', 'Ex-demo Zip Navigator AT'],
])}

Questions? Call 0480 811 308.
`;

// ------------------------------------------------------------------ 4. golf cart battery replacement cost
const cartSets = byPrice(inSub('batteries', 'cart-sets'));
const cartBattery = `
Golf cart battery replacement costs from ${lo(cartSets)} to ${hi(cartSets)} on our range, depending on whether you choose flooded lead-acid, AGM or lithium. This guide shows what a 48V golf cart battery replacement costs, how to choose between the types, and how to replace a set safely.

## What golf cart battery replacement costs

${table(['Battery option', 'Type', 'Price', 'Warranty'], cartSets.map((p) => [pl(p.slug), /lithium|lifepo4/i.test(p.name) ? 'Lithium' : /agm/i.test(p.name) ? 'AGM lead-acid' : 'Flooded lead-acid', $(p.price), spec(p, 'warranty')]))}

Check each listing for what is included. See the full range of [golf cart batteries](/shop/cart-sets/).

## Lead-acid, AGM or lithium?

- **Flooded lead-acid** is the cheapest to buy but heavy, and needs regular topping up with water.
- **AGM lead-acid** is sealed and maintenance-free, at a higher price.
- **Lithium (LiFePO4)** costs the most upfront, weighs far less and needs no maintenance.

Our guide to [lithium versus lead-acid batteries](/blog/lifepo4-vs-lead-acid-battery-lifespan-australian-climate/) goes into the detail.

## How to tell it is time to replace

- The cart runs out of charge much sooner than it used to.
- It charges slowly or the charger never finishes.
- Voltage drops sharply when you accelerate or climb.
- Cases are swollen, cracked or leaking.

## Matching voltage and size

Golf cart batteries are sold as sets that make up the cart's voltage, so a 48V cart needs 48V of batteries in total. A set can be eight 6V batteries, four 12V batteries, or one 48V lithium pack. Check the voltage on your cart, the tray size and your charger before you order. Lithium packs need a lithium-compatible charger: see our [chargers](/shop/chargers/).

## Warranty: read it line by line

Every product states its own warranty. The ${pl('giant-48v-100ah-golf-cart-drop-in-lithium-battery', 'GIANT 48V 100Ah lithium drop-in')} lists ${spec(P['giant-48v-100ah-golf-cart-drop-in-lithium-battery'], 'warranty')}, and our Trojan lead-acid sets list ${spec(P['trojan-t105-flooded-battery-set-48v-8-batteries'], 'warranty')}. Compare cost against warranty, not price alone. Brands we stock include [Trojan](/brands/trojan/) and [GIANT](/brands/giant/).

## How to replace a battery set safely

1. Switch the cart off, remove the key and put it in tow or maintenance mode.
2. Photograph the wiring and label each cable before disconnecting.
3. Disconnect from the negative end of the pack first.
4. Lift each battery carefully; lead-acid batteries are heavy.
5. Clean the trays and terminals, fit the new set and reconnect in the original order.
6. Charge fully with the correct charger before the first drive.

Lead-acid batteries contain acid. Wear gloves and eye protection, and ask us if you are unsure. Call 0480 811 308 to match a battery to your cart.
`;

// ------------------------------------------------------------------ 5. golf buggy battery replacement
const buggyBat = byPrice(inSub('batteries', 'lithium'));
const buggyChargers = byPrice(inSub('batteries', 'chargers').filter((p) => /charger/i.test(p.name)));
const buggyBattery = `
To replace a golf buggy battery, match the voltage, hole rating and connector of the original pack: our golf buggy battery replacement range includes 12V 18-hole and 24V 36-hole lithium packs from ${lo(buggyBat)}. This guide shows how to choose the right pack, which charger to use and how to fit it.

## Which battery fits my golf buggy?

${table(['Battery', 'Price', 'Warranty'], buggyBat.map((p) => [pl(p.slug), $(p.price), spec(p, 'warranty')]))}

Check the product page for the exact fit. Browse every [lithium golf buggy battery](/shop/lithium/).

## 12V vs 24V golf buggy batteries

The voltage must match the buggy. A 12V golf buggy battery is common on smaller buggies and is sold by hole rating: an 18-hole pack is enough for one round. A 24V pack is usually sold as a 36-hole battery and suits buggies built for longer play. Never swap one for the other, and check the connector before you order.

## Lithium or lead-acid for a buggy?

Lithium is lighter, charges faster and needs no maintenance. Lead-acid costs less: our ${pl('lead-acid-12v-24ah-buggy-battery')} is ${price('lead-acid-12v-24ah-buggy-battery')}. Our guide to [lithium versus lead-acid batteries](/blog/lifepo4-vs-lead-acid-battery-lifespan-australian-climate/) covers the trade-offs. Lithium packs we sell carry a 5-year Australian replacement warranty.

## Chargers and battery bags

Lithium and lead-acid batteries need different chargers. Our range:

${table(['Charger or bag', 'Price'], [...buggyChargers.map((p) => [pl(p.slug), $(p.price)]), [pl('golf-buggy-battery-bag'), price('golf-buggy-battery-bag')]])}

See every [golf buggy charger](/shop/chargers/).

## How to replace the battery

1. Switch the buggy off and unplug the old pack.
2. Photograph the connectors so you can refit them the same way.
3. Slide out the old battery.
4. Fit the new pack and connect it.
5. Charge it fully with the correct charger before the first round.

## Recycling the old battery

Do not put a lead-acid or lithium battery in the household bin. Take it to a battery recycling drop-off. Many battery retailers and council sites accept them.

Need help matching a pack to your buggy? Call 0480 811 308, or browse [MGI buggies](/brands/mgi/) and [golf buggy batteries](/shop/batteries/).
`;

// ------------------------------------------------------------------ 6. repairs and servicing
const wheels = byPrice(inSub('parts', 'wheels-tyres'));
const repairs = `
Most golf cart repairs start with one of four things: the battery, the charger, the wheels or the controller, and many problems can be checked at home before you buy a part. This guide covers common golf buggy and cart faults, the checks to do first and the parts that fix them.

## Common golf buggy and cart problems

${table(['Symptom', 'Likely cause', 'First check', 'Part to look at'], [
  ['Will not turn on', 'Flat battery or loose connector', 'Charge level and main connector', '[Battery](/shop/batteries/)'],
  ['Slow or short range', 'Tired battery, low tyre pressure', 'Battery age and tyres', '[Battery](/shop/batteries/) or tyres'],
  ['Will not charge', 'Wrong or faulty charger', 'Charger light and lead', '[Charger](/shop/chargers/)'],
  ['Wobbly or noisy wheel', 'Worn wheel or bearing', 'Spin and wiggle the wheel', '[Wheels and tyres](/shop/wheels-tyres/)'],
  ['Cuts out or surges', 'Controller or motor fault', 'Connectors and error codes', '[Motor and controller](/shop/drive-electrical/)'],
])}

## Buggy will not turn on

Check the battery first. A deeply discharged pack is the most common cause. Make sure the main connector is seated and any fuse is intact, then try the charger. If the pack charges but the buggy still does nothing, the controller or key switch is next. See our [golf buggy parts](/shop/parts/).

## Slow speed or short range

A battery that has lost capacity is the usual reason, followed by low tyre pressure or a binding wheel. If your lead-acid set is several years old, compare the cost of a new set with a lithium upgrade in our [battery range](/shop/batteries/).

## Wheel, tyre and strut problems

Wheels and tyres wear faster than anything else on a buggy. Our wheel and tyre range runs from ${lo(wheels)} to ${hi(wheels)}, including ${pl('mgi-rear-wheels-pair-zip-ai')} at ${price('mgi-rear-wheels-pair-zip-ai')} and the ${pl('clicgear-secondary-strut-mgi-bag-rest-spacer')} at ${price('clicgear-secondary-strut-mgi-bag-rest-spacer')}.

## Motor, gearbox and controller faults

Electrical faults are best left to someone who knows the system. The parts exist: the ${pl('mgi-zip-navigator-motor-controller')} is ${price('mgi-zip-navigator-motor-controller')} and an ${pl('electric-buggy-motor-gearbox-aftermarket', 'aftermarket motor and gearbox')} is ${price('electric-buggy-motor-gearbox-aftermarket')}. Browse [motors and controllers](/shop/drive-electrical/).

## A simple servicing routine

- Charge after every round and use the right charger.
- Check wheels, tyres and bolts every month.
- Wipe the buggy down after wet or sandy rounds.
- Store lithium batteries partly charged and out of direct heat.
- Replace worn tyres and wheels early.

## When to get professional help

Call a specialist for controller faults, burning smells, brake problems or anything involving the battery pack's internals. Do not open a lithium pack. We sell parts and can help you identify the right one: call 0480 811 308. MGI owners can also see our [MGI spares](/brands/mgi/).
`;

// ------------------------------------------------------------------ 7. kids off-road buggy guide
const kidsE = byPrice(inSub('kids-buggies', 'electric'));
const kidsP = byPrice(inSub('kids-buggies', 'petrol'));
const kids = `
A kids off road buggy is a small electric or petrol buggy built for children to ride on private land: our range runs from ${lo(kidsE)} for 24V to 48V electric models to ${hi(kidsP)} for a 208cc teen buggy. This guide compares electric and petrol, explains what to check for safety and lists the buggies we stock.

## Our kids off-road buggies compared

${table(['Buggy', 'Type', 'Price', 'Power'], [...kidsE, ...kidsP].map((p) => [pl(p.slug), p.subcategory === 'electric' ? 'Electric' : 'Petrol', $(p.price), spec(p, 'battery') !== '-' ? spec(p, 'battery') : spec(p, 'engine') !== '-' ? spec(p, 'engine') : 'See product page']))}

See every model in our [kids buggy range](/shop/kids-buggies/).

## Electric vs petrol kids buggy

- **Electric:** quieter, no fuel, simple to run and charge at home. Our [kids electric buggies](/shop/electric/) run on 24V to 48V.
- **Petrol:** more power and longer running, but louder and with more maintenance. Our [kids petrol buggies](/shop/petrol/) run from 90cc to 208cc.

Electric suits younger riders and backyard use. Petrol suits older children and larger properties.

## Choosing the right buggy for your child

Read the maker's guidance on rider age, weight and height for each model, and choose a buggy your child can control comfortably. Start with the lower-powered option, since children grow into power quickly. If a buggy has a speed limiter, use it at first.

## Safety checklist before the first ride

1. A properly fitted helmet, closed shoes and long clothing.
2. An adult supervising at all times.
3. A flat, private area away from roads, water and livestock.
4. A pre-ride check of tyres, brakes, steering and the throttle.
5. Seatbelts or harnesses fitted and used where the buggy has them.
6. A talk about the rules before the child rides.

## Where can kids ride a buggy?

Kids buggies are built for private land and are not road registered, so they should not be ridden on public roads. State and territory rules differ on riding on rural and recreational land, so check with your state authority before you buy.

## Dune buggies and older riders

For older teens and adults who want more power, see our [dune buggies](/shop/dune-buggies/) and [off-road buggies](/shop/off-road-buggies/). The [Crossfire](/brands/crossfire/) range includes a 90cc twin-seat buggy for kids.

Call 0480 811 308 to talk through which buggy suits your child.
`;

const faq = (ids) => ids;
export const GUIDES_CART = [
  mk({ slug: 'golf-cart-ac-vs-dc-motor-guide', title: 'Golf Cart AC vs DC Motors: What It Means When You Buy', titleTag: 'Golf Cart AC vs DC Motor: Which Is Better?',
    excerpt: 'Golf cart AC vs DC motors explained: efficiency, servicing, braking and cost. See which AC carts we stock and who should still choose DC.',
    metaDescription: 'Golf cart AC vs DC motors explained: efficiency, servicing, braking and cost. See which AC carts we stock and who should still choose DC.',
    category: 'Engineering & Tech', image: img('ecar-lithium-a2-2-seater-golf-cart'), imageAlt: 'Golf cart AC motor: ECAR Lithium A2 2-seater golf cart',
    keyword: 'golf cart ac', faqIds: faq(['ac-vs-dc', 'ac-vs-dc-better']), toc: true, content: acVsDc }),
  mk({ slug: 'used-golf-cart-auction-vs-dealer-australia', title: 'Used Golf Carts: Auction, Gumtree or Dealer? What to Check First', titleTag: 'Golf Cart Auction vs Dealer: Used Cart Buyer Guide',
    excerpt: 'Golf cart auction or dealer? Compare auctions, Gumtree and dealers for used carts in Australia, plus an inspection checklist and what a warranty covers.',
    metaDescription: 'Golf cart auction or dealer? Compare auctions, Gumtree and dealers for used carts in Australia, plus an inspection checklist and what a warranty covers.',
    category: 'Buying Guides', image: img('used-club-car-precedent-2-seat-ex-lease-golf-cart'), imageAlt: 'Used golf cart for sale: Club Car Precedent 2-seat ex-lease',
    keyword: 'golf cart auction', faqIds: faq(['used-auction-safe', 'used-cart-price', 'used-cart-check']), toc: true, content: usedAuction }),
  mk({ slug: 'mgi-zip-vs-ai-navigator-which-mgi-buggy', title: 'MGI Zip vs Ai Navigator: Which MGI Electric Golf Buggy to Buy?', titleTag: 'MGI Electric Golf Buggy: Zip vs Ai Navigator Compared',
    excerpt: 'MGI electric golf buggy compared: Zip X1, X3, X5, Navigator remote and Ai GPS+. Prices, batteries and who each model suits, from The Buggy Shop.',
    metaDescription: 'MGI electric golf buggy compared: Zip X1, X3, X5, Navigator remote and Ai GPS+. Prices, batteries and who each model suits, from The Buggy Shop.',
    category: 'Comparisons', image: img('mgi-zip-x3-electric-golf-buggy'), imageAlt: 'MGI electric golf buggy: MGI Zip X3 36-hole',
    keyword: 'mgi electric golf buggy', faqIds: faq(['mgi-zip-vs-ai', 'mgi-hills', 'mgi-battery']), toc: true, content: mgi }),
  mk({ slug: 'golf-cart-battery-replacement-cost-australia', title: 'Golf Cart Battery Replacement Cost in Australia (48V Guide)', titleTag: 'Golf Cart Battery Replacement Cost in Australia',
    excerpt: 'Golf cart battery replacement cost in Australia: lead-acid, AGM and lithium 48V sets compared, with real prices and what each warranty covers.',
    metaDescription: 'Golf cart battery replacement cost in Australia: lead-acid, AGM and lithium 48V sets compared, with real prices and what each warranty covers.',
    category: 'Engineering & Tech', image: img('giant-48v-100ah-golf-cart-drop-in-lithium-battery'), imageAlt: 'Golf cart battery replacement: GIANT 48V 100Ah lithium drop-in',
    keyword: 'golf cart battery replacement', faqIds: faq(['battery-cost-cart', 'battery-replace-when']), toc: true, content: cartBattery }),
  mk({ slug: 'golf-buggy-battery-replacement-guide', title: 'Golf Buggy Battery Replacement: 12V, 24V and Lithium Packs', titleTag: 'Golf Buggy Battery Replacement: 12V & 24V Guide',
    excerpt: 'Golf buggy battery replacement made simple: 12V 18-hole and 24V 36-hole lithium packs, lead-acid options, chargers and how to match your buggy.',
    metaDescription: 'Golf buggy battery replacement made simple: 12V 18-hole and 24V 36-hole lithium packs, lead-acid options, chargers and how to match your buggy.',
    category: 'Engineering & Tech', image: img('mgi-lithium-12v-20ah-299wh-18-hole-battery'), imageAlt: 'Golf buggy battery replacement: MGI lithium 12V 18-hole battery',
    keyword: 'golf buggy battery replacement', faqIds: faq(['battery-size', 'battery-lithium-swap', 'battery-cost-buggy']), toc: true, content: buggyBattery }),
  mk({ slug: 'golf-buggy-repairs-servicing-guide-australia', title: 'Golf Buggy Repairs and Servicing: Common Faults and Fixes', titleTag: 'Golf Cart Repairs: Common Faults, Fixes & Servicing',
    excerpt: 'Golf cart repairs explained: no power, slow speed, charger faults and worn wheels. What you can fix yourself, which parts to buy and when to get help.',
    metaDescription: 'Golf cart repairs explained: no power, slow speed, charger faults and worn wheels. What you can fix yourself, which parts to buy and when to get help.',
    category: 'Engineering & Tech', image: img('mgi-zip-navigator-motor-controller'), imageAlt: 'Golf cart repairs: MGI Zip Navigator motor controller',
    keyword: 'golf cart repairs', faqIds: faq(['cart-wont-start', 'buggy-service-often']), toc: true, content: repairs }),
  mk({ slug: 'kids-off-road-buggy-buying-guide-electric-vs-petrol', title: 'Kids Off-Road Buggy Buying Guide: Electric vs Petrol', titleTag: 'Kids Off Road Buggy Guide: Electric vs Petrol',
    excerpt: 'Kids off road buggy guide: electric vs petrol, 24V to 48V and 90cc to 208cc models, what to check for safety and which buggies we stock from $1,290.',
    metaDescription: 'Kids off road buggy guide: electric vs petrol, 24V to 48V and 90cc to 208cc models, what to check for safety and which buggies we stock from $1,290.',
    category: 'Buying Guides', image: img('electric-48v-kids-4x4-off-road-buggy'), imageAlt: 'Kids off road buggy: 48V electric kids 4x4 buggy',
    keyword: 'kids off road buggy', faqIds: faq(['kids-power', 'kids-road']), toc: true, content: kids }),
];
