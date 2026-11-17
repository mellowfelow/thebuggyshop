// src/config/guides-new.js
// Ten guides added in November 2026. Every price, model name and spec comes from the product data (post-kit.js); every rule
// quoted from a regulator or safety body carries a link to that source. Research notes and what could NOT be confirmed are
// in docs/research-sources.md. Road rules change, so each rules post tells the reader to confirm with the authority.
import { PRODUCTS } from './products.js';
import { F, $, mk, table, byPrice, pl, spec, need } from './post-kit.js';
import { EXTRA_NEW } from './guides-new-extra.js';

const DATE = '2026-11-17';
const img = (slug) => { need(slug); return `/images/products/${slug}/main.webp`; };
const kg = (p) => (String(p.specs?.weight || p.weightKg && `${p.weightKg} kg` || '').match(/[\d.]+\s*kg/) || ['-'])[0];
const bat = (p) => spec(p, 'battery');
const fold = (p) => String(p.specs?.foldSize || '-').replace(/\s*\(.*$/, '');
const foldVol = (p) => { const m = String(p.specs?.foldSize || '').match(/([\d.]+)\s*cm\s*x\s*([\d.]+)\s*cm\s*x\s*([\d.]+)\s*cm/i); return m ? m[1] * m[2] * m[3] : Infinity; };
const kgNum = (p) => parseFloat(kg(p));
const kgRange = (l) => { const n = l.map(kgNum).filter(Number.isFinite); return `${Math.min(...n)} kg to ${Math.max(...n)} kg`; };
const range = (l) => `${$(Math.min(...l.map((p) => p.price)))} to ${$(Math.max(...l.map((p) => p.price)))}`;

const newCarts = byPrice(PRODUCTS.filter((p) => p.category === 'luxury-golf-carts' && p.subcategory !== 'used'));
const twoSeat = newCarts.filter((p) => p.subcategory === '2-seat');
const specCarts = newCarts.filter((p) => p.specs?.topSpeed && p.specs?.seating);
const markedRoad = newCarts.filter((p) => /conditional|registerable/i.test(String(p.specs?.topSpeed || '')));
const push = byPrice(PRODUCTS.filter((p) => p.category === 'push-pull-golf-buggies'));
const walk = byPrice(PRODUCTS.filter((p) => p.subcategory === 'walk-behind'));
const remote = byPrice(PRODUCTS.filter((p) => p.subcategory === 'remote-control-golf-buggies'));
const follow = byPrice(PRODUCTS.filter((p) => /follow/i.test(p.name) && p.category === 'electric-golf-buggies'));
const dune = byPrice(PRODUCTS.filter((p) => p.subcategory === 'dune-buggies'));
const ssv = byPrice(PRODUCTS.filter((p) => ['side-by-side', 'farm-buggies'].includes(p.subcategory)));
const elec = byPrice(PRODUCTS.filter((p) => p.category === 'electric-golf-buggies' && p.subcategory !== 'conversion-kits'));
const downhill = byPrice(elec.filter((p) => /downhill|slope|dhc|descent/i.test(p.specs?.brakes || '')));

const cartRow = (p) => [pl(p.slug), spec(p, 'seating'), spec(p, 'topSpeed'), spec(p, 'range'), $(p.price)];

// ---------------------------------------------------------------- 1. NSW
const nsw = `
Golf cart registration in NSW depends on what the cart is used for. On a golf course, a golf buggy needs no registration. On public roads, Transport for NSW offers only a narrow golf buggy conditional registration: a medical concession for a two-seater, limited to 20 km/h. This guide summarises the official October 2025 vehicle sheet so you can check a cart against it before you buy. Rules change, so confirm the current wording with Transport for NSW.

## Do you need to register a golf cart in NSW?

Not when it is used as a golf vehicle. The Transport for NSW sheet says golf and green keeping vehicles are not subject to registration and licensing provisions if they are:

- being used in the course of a game of golf, or to observe a game;
- proceeding to or from the golf course for rolling, maintenance or surface improvement;
- proceeding to or from a car park or storage building that is separated from the golf course by a road or road-related area.

For these rules a golf course means an area of land, including tees, fairways, greens, rough, pathways, bunkers and bridges, designed and used for playing golf. A golf vehicle is a motorised buggy or cart designed and used to carry a golfer, spectator or golfing equipment on a golf course. Anywhere else on a road or road-related area, the operator must hold a valid Class C licence, unless they are driving directly across a road that intersects a golf course.

## What is the NSW golf buggy concession?

The official sheet describes it as "a two-seater motorised buggy or cart designed to carry a golfer, spectator, or golfing equipment to a nominated golf course on local roads". It is a medical concession, so the registered owner must:

- hold a car licence, Class C;
- attend the Service NSW centre closest to the garaging address;
- provide medical evidence from a doctor about their lack of mobility, and whether it is long term;
- provide written evidence of why the driver cannot float the buggy to the course, store it at the course, or hire one at the course.

For short-term medical conditions, updated evidence must be presented at renewal. Approved routes are only on local roads in close vicinity of the course and with low traffic volumes. Eligibility is restricted to two-seat configurations, and no rear-facing passengers may be carried on the road.

## What conditions and equipment apply?

${table(['Item', 'What the sheet requires'], [
  ['Maximum speed', '20 km/h (condition SP20)'],
  ['Seats', 'Two-seat configuration only'],
  ['Where it can go', 'Restricted to designated areas and routes (condition LO3)'],
  ['Beacon', 'Flashing amber beacon, required and used when the vehicle is moving'],
  ['Lights', 'Brake and direction indicator lights; headlights plus tail and number-plate lights for 24-hour operation (optional for daylight or floodlit use)'],
  ['Other equipment', 'Red rear reflectors, horn, rear vision mirror(s) and a "Vehicle Speed Limited" sign on the rear'],
  ['Number plates', 'Two "NSW - CONDITIONAL" plates are issued'],
])}

The sheet sets minimum conditions. Transport for NSW can add conditions after it assesses the vehicle, so treat this table as a starting point.

## Which other NSW vehicle sheets might apply?

A golf buggy is not the only conditional category. Transport for NSW publishes separate sheets for Multiperson Transportation and Utility Transit (both limited to a 10 km/h shared zone), for the All-Terrain Vehicle (an off-road vehicle with side-by-side seating and no rear tray), for the Light Utility Vehicle, and for golf buggies on Lord Howe Island. If you want a cart for a resort, caravan park or retirement village, ask the authority which sheet fits your use rather than assuming the golf buggy sheet applies.

## What this means when you buy a cart in NSW

The golf buggy concession is for two seats, so a four-seater does not fit it. Two-seat carts in our range today:

${table(['Cart', 'Seating', 'Top speed', 'Range', 'Price'], twoSeat.filter((p) => p.specs?.topSpeed).map(cartRow))}

Prices include GST and come from the live shop. A cart's top speed matters too: the NSW golf buggy condition is 20 km/h, and several carts above are listed at 24 km/h or more, so ask whether a given model can be limited to the speed your authority requires. Whether any particular use is approved is Transport for NSW's decision, not the seller's.

## Checklist before you buy

1. Decide the use: golf course only, a short trip to a course, or a site such as a resort.
2. Read the vehicle sheet for that use on the [Transport for NSW golf buggy page](https://www.nsw.gov.au/driving-boating-and-transport/vehicle-registration/conditional-and-seasonal/vehicle-sheets/golf-buggy).
3. Check the seat count, speed limit and equipment against the cart you are considering.
4. If you rely on the medical concession, gather the doctor's evidence and your written reasons first.
5. Ask the seller for the cart's specification sheet and any compliance documents.

## More golf cart road rules

- [Golf cart registration in Queensland](/blog/golf-cart-registration-qld-guide/)
- [Golf cart registration in Victoria](/blog/golf-cart-registration-victoria-guide/)
- [The overview of conditional registration in QLD, NSW and VIC](/blog/conditional-road-registration-guide-qld-nsw-vic/)
- [Browse golf carts for sale](/shop/luxury-golf-carts/) and [2 seater golf carts](/shop/2-seat/)
`;

// ---------------------------------------------------------------- 2. QLD
const qld = `
Golf cart registration in QLD works through conditional registration. Queensland treats a motorised golf buggy as a non-standard recreational vehicle, so the Department of Transport and Main Roads (TMR) can register it conditionally when there is a genuine need for limited access to the road network. A golf buggy used only on a golf course needs no registration. This guide explains the pieces in plain language, with links to the official sources, so you know what to confirm before you buy a cart.

## Can you drive a golf cart on the road in Queensland?

Only in limited circumstances. The Queensland Government lists "Golf buggy (or derivative)" among its conditional registration information sheets for recreational vehicles, and describes the catalogue as covering non-standard vehicles that do not comply with standard registration rules and have "a genuine need for limited access to the road network". Registration alone is not the whole answer: the road owner has to agree, and some conditions also need a police permit.

## When is a golf buggy exempt from registration?

Queensland lists vehicles that do not need registration in the regulation. As summarised in a council policy (Isaac Regional Council, effective 26 June 2024), the list includes a motorised golf buggy or other motorised machinery being used on a golf course or on a golf course car park, or a motorised golf buggy being used for directly crossing a road dividing a golf course. If your cart never leaves the course, its car park or a direct crossing of a road through the course, the exemption is the relevant rule.

## How does conditional registration work for a golf buggy?

${table(['Topic', 'What the Queensland sources say'], [
  ['Who registers it', 'TMR issues conditional registration for non-standard recreational vehicles'],
  ['Condition codes', 'A golf buggy can be conditionally registered under location codes LO3, LO6(A) and LO7'],
  ['Road owner permission', 'LO3 and LO6(A) registrations need permission from the road owner or manager, whatever the land tenure'],
  ['Police permit', 'LO6(A) needs authorisation from the road authority and a Queensland Police Service permit'],
  ['Application paperwork', 'TMR form F5390 (single rear plate) asks for a copy of the authorisation letter and the police permit'],
  ['Local roads', 'Councils manage local roads, so you need council permission to drive a golf buggy on one'],
  ['Number plate', 'Owners of conditionally registered golf buggies can apply to display one plate, at the rear only'],
])}

Each code limits where the vehicle may operate, and the information sheet sets the exact conditions. Read the current sheet on the [Queensland Government recreational vehicles page](https://www.qld.gov.au/transport/registration/register/conditional/recreational) and the [TMR form F5390](https://publications.qld.gov.au/dataset/transport-f5390) before you lodge anything.

## What does this mean when you buy a cart?

The carts in our range that carry a road-compliance note in their specifications are:

${table(['Cart', 'Seating', 'Top speed', 'Range', 'Price'], markedRoad.map(cartRow))}

A "conditional road compliant" note describes the cart's equipment and speed; it does not approve your route. In Queensland the route and the permissions come from the road owner and, for LO6(A), the police. Plan the trip you actually want to make, then ask the council and TMR whether it can be approved.

## Checklist before you buy in Queensland

1. Write down the exact roads you want to drive and who owns them (council or state).
2. Ask the road owner whether they will authorise a golf buggy on that route.
3. Ask the Queensland Police Service about a permit if the conditions need one.
4. Read the golf buggy information sheet and form F5390 for the codes that apply.
5. Choose a cart whose seats, speed and equipment match those conditions.

## More golf cart road rules

- [Golf cart registration in NSW](/blog/golf-cart-registration-nsw-guide/)
- [Golf cart registration in Victoria](/blog/golf-cart-registration-victoria-guide/)
- [The overview of conditional registration in QLD, NSW and VIC](/blog/conditional-road-registration-guide-qld-nsw-vic/)
- [Golf carts for sale in Australia](/shop/luxury-golf-carts/) and [Brisbane delivery](/golf-buggies/brisbane/)
`;

// ---------------------------------------------------------------- 3. VIC
const vic = `
Golf cart registration in Victoria turns on where the cart is used. Transport Victoria says golf cars do not need to be registered as long as they stay off the road system, and a cart that is driven on roads beyond those limits is treated like any other motor vehicle. This guide sets out the official rule, the one-off permit option, and what to check before you buy a cart for use in Victoria. Rules change, so confirm the current position with VicRoads or Transport Victoria.

## Do golf carts need registration in Victoria?

Transport Victoria's guidance on golf cars and ride-on mowers says they do not need to be registered and should not be used to travel on roads. The exemption applies only to vehicles that are:

- designed mainly for use outside the road system;
- not used on a highway for more than two kilometres at a time in one direction; and
- used only for their intended purpose.

If a golf cart does not meet those conditions, it is treated like any other motor vehicle, including the laws on driver licensing and registration. A cart that falls outside the exemption is also not covered by third-party personal injury insurance through the Transport Accident Commission (TAC).

## What if you need to drive an unregistered cart on a road once?

Transport Victoria says that to drive an unregistered vehicle on a road you need a permit. An unregistered vehicle permit can only be issued for trips that begin in Victoria, and it must not be used as a replacement for full registration. The TAC makes the same point: where an unregistered or uninsured vehicle must be driven on a highway as a one-off event, an unregistered vehicle permit has to be obtained from VicRoads.

${table(['Situation', 'What the Victorian guidance says'], [
  ['Cart used only on a course or private land', 'No registration needed if it meets the exemption conditions'],
  ['Cart driven on a highway', 'Exemption lapses if it is driven more than two kilometres at a time in one direction'],
  ['One-off trip on a road', 'An unregistered vehicle permit is needed, for trips starting in Victoria'],
  ['Regular road use', 'Treated like any motor vehicle: licensing and registration apply'],
  ['Insurance', 'A cart outside the exemption is not covered by TAC third-party personal injury insurance'],
])}

The state has consulted on changing how golf carts are treated, so the details above can move. Read the live pages before you act: [golf cars and ride-on mowers](https://transport.vic.gov.au/road-rules-and-safety/golf-cars-and-ride-on-mowers), [unregistered vehicle permits](https://transport.vic.gov.au/road-and-active-transport/road-rules-and-safety/permits/unregistered-vehicle-permits) and [registering non-compliant vehicles](https://www.vicroads.vic.gov.au/registrations/new-registrations/register-non-compliant-vehicles).

## What does this mean when you buy a cart in Victoria?

For most buyers, a golf cart in Victoria is a course, estate or property vehicle. Carts that list a conditional road-compliance note in their specifications:

${table(['Cart', 'Seating', 'Top speed', 'Range', 'Price'], markedRoad.map(cartRow))}

That note is about the cart's specification, not about Victorian approval. If you want to drive a cart on public roads regularly, ask VicRoads how a non-compliant vehicle can be registered, and get that answer before you buy rather than after.

## Checklist before you buy in Victoria

1. Decide whether the cart will stay on a course, estate or property, or touch public roads.
2. If it will touch roads, measure the distance: the exemption stops at two kilometres at a time in one direction.
3. Ask VicRoads about registration for non-compliant vehicles, or about a one-off permit.
4. Check your insurance position, because TAC cover does not apply outside the exemption.
5. Ask the seller for the specification sheet so the authority can assess the cart.

## More golf cart road rules

- [Golf cart registration in NSW](/blog/golf-cart-registration-nsw-guide/)
- [Golf cart registration in Queensland](/blog/golf-cart-registration-qld-guide/)
- [The overview of conditional registration in QLD, NSW and VIC](/blog/conditional-road-registration-guide-qld-nsw-vic/)
- [Golf carts for sale](/shop/luxury-golf-carts/) and [Melbourne delivery](/golf-buggies/melbourne/)
`;

// ---------------------------------------------------------------- 4. side by side vs quad bike
const ssvVsQuad = `
A side by side vs quad bike comparison starts with the machine itself. A quad bike has a single seat that you straddle, with handlebars for steering. A side-by-side (also called a UTV) has at least two seats side by side, a steering wheel, and safety features such as rollover protection and seatbelts, and it can carry two to six people. This guide compares the two on safety, cost and use, using Product Safety Australia's guidance and the side-by-sides in our range.

## What is the difference between a side-by-side and a quad bike?

${table(['', 'Quad bike', 'Side-by-side'], [
  ['Seating', 'One seat, straddled', 'Two or more seats side by side'],
  ['Steering', 'Handlebars', 'Steering wheel'],
  ['Protection', 'Operator protection device on general-use models', 'Rollover protection and seatbelts'],
  ['People', 'Operator only on single-rider models', '2 to 6 people'],
  ['Mandatory federal standard', 'Yes', 'No'],
])}

Source: [Product Safety Australia, quad bike and side-by-side vehicle guide](https://www.productsafety.gov.au/consumers/drive-and-ride-safely/quad-bike-and-side-by-side-vehicle-guide).

## Which is safer?

The two are different risks, and the guidance reflects that. Quad bikes are covered by a mandatory standard that suppliers and retailers must meet. From 11 October 2021, general-use quad bikes must have an operator protection device (OPD) fitted or built in; the ACCC explains that an OPD helps prevent fatalities by holding the vehicle off the ground and creating a crawl-out space. Youth and sports quad bikes are not required to have one.

Side-by-sides do not have a mandatory standard. Instead Product Safety Australia advises owners to follow the manufacturer's instructions and warnings and to always wear a seatbelt. Its guide notes that coronial inquests found people wearing seatbelts would not have been thrown from the cabin. The ACCC's final recommendation said quad bikes carry more operator risk in a rollover because they lack the occupant protection found on side-by-sides, such as rollover protection and seatbelts. See the ACCC pages on the [quad bikes mandatory standard](https://www.productsafety.gov.au/business/search-mandatory-standards/quad-bikes-mandatory-standard) and [operator protection devices](https://www.productsafety.gov.au/business/search-mandatory-standards/quad-bikes-mandatory-standard/quad-bike-operator-protection-devices-opds).

## How much does a side-by-side cost?

We sell side-by-sides and farm UTVs, not quad bikes. Side-by-sides in our range run from ${$(Math.min(...ssv.map((p) => p.price)))} to ${$(Math.max(...ssv.map((p) => p.price)))}. A sample, cheapest first:

${table(['Model', 'Type', 'Price'], ssv.slice(0, 8).map((p) => [pl(p.slug), p.subcategory === 'farm-buggies' ? 'Farm UTV' : 'Side-by-side', $(p.price)]))}

See every model in our [side by side buggies](/shop/side-by-side/) and [farm buggies](/shop/farm-buggies/) ranges. Prices include GST, and delivery is a flat ${$(F.ship)} by tail-lift truck.

## What should you check before you buy?

1. **Seatbelts and rollover protection.** Product Safety Australia says to use only vehicles with rollover protection.
2. **The manufacturer's warnings.** There is no federal standard to rely on, so the manual matters.
3. **Who will drive it.** Never let children drive a side-by-side, and check the manufacturer's advice before letting them ride as passengers.
4. **Protective gear and training.** Wear a helmet, get proper training, tell someone your plans and carry a phone or radio.
5. **Where you will use it.** Side-by-sides are sold for private property; road rules are set by each state, so confirm with your road authority.

## Related guides

- [Dune buggy vs side by side: which one suits you](/blog/dune-buggy-vs-side-by-side-australia/)
- [Electric buggies for adults: golf, farm and off-road options](/blog/electric-buggy-for-adults-australia/)
- [Kids off-road buggies: electric vs petrol](/blog/kids-off-road-buggy-buying-guide-electric-vs-petrol/)
- [Off-road buggies for sale](/shop/off-road-buggies/)
`;

// ---------------------------------------------------------------- 5. dune buggy vs side by side
const duneVsSsv = `
A dune buggy vs side by side choice comes down to seats, steering and what you want to do with it. A dune buggy is a lightweight recreational buggy built for sand, farm tracks and fun. A side-by-side (UTV) has a steering wheel, seats side by side and rollover protection, and is built for carrying people and loads. This guide compares them using the models in our range and Product Safety Australia's guidance.

## What is the difference between a dune buggy and a side-by-side?

${table(['', 'Dune buggy', 'Side-by-side (UTV)'], [
  ['Built for', 'Recreation on sand and private tracks', 'Farm work, property access and recreation'],
  ['Price in our range', range(dune), range(ssv)],
  ['Seating in our range', 'Two-seat models', '2 to 6 seats depending on model'],
  ['Cargo', 'Little or none', 'Tray or bed on many farm models'],
  ['Safety standard', 'Follow the manufacturer\'s warnings', 'No mandatory federal standard; seatbelts and rollover protection advised'],
])}

## Which dune buggies do we sell?

${table(['Dune buggy', 'Engine', 'Price'], dune.map((p) => [pl(p.slug), p.specs?.engine ? spec(p, 'engine') : (p.name.match(/\d+(-\d+)?cc/) || ['See product page'])[0], $(p.price)]))}

Engine sizes shown are from the product record or the model name, and the product page carries the full specification. Side-by-sides are listed by price and type because most of them are specified on their own product pages. Browse the full [dune buggy range](/shop/dune-buggies/).

## Which side-by-sides do we sell?

${table(['Side-by-side', 'Type', 'Price'], ssv.slice(0, 10).map((p) => [pl(p.slug), p.subcategory === 'farm-buggies' ? 'Farm UTV' : 'Side-by-side', $(p.price)]))}

The full range is in [side by side buggies](/shop/side-by-side/) and [farm buggies](/shop/farm-buggies/).

## How do the safety rules differ?

Product Safety Australia describes side-by-sides as having at least two seats side by side, a steering wheel, and features such as rollover protection and seatbelts, carrying 2 to 6 people. It says there is no mandatory standard for side-by-sides, so owners should follow the manufacturer's instructions and warnings, always wear a seatbelt and helmet, and never let children drive. Read the [official guide](https://www.productsafety.gov.au/consumers/drive-and-ride-safely/quad-bike-and-side-by-side-vehicle-guide). Whatever you choose, read the manual and check the brakes, seatbelts and roll cage before every ride.

## Which one should you choose?

- **Choose a dune buggy** if you want a lower-cost recreational buggy for sand, tracks or a farm and do not need cargo.
- **Choose a side-by-side** if you need more seats, a steering wheel, a tray for tools or feed, or a machine for daily property work.
- **Choose by use, not price:** a ${$(Math.min(...dune.map((p) => p.price)))} dune buggy and a ${$(Math.min(...ssv.map((p) => p.price)))} side-by-side are different tools.

Both are sold for private land. Road rules are set by each state, so confirm with your road authority before driving either off your property. Delivery is a flat ${$(F.ship)} by tail-lift truck.

## Related guides

- [Side by side vs quad bike: safety, cost and use](/blog/side-by-side-vs-quad-bike-australia/)
- [Electric buggies for adults](/blog/electric-buggy-for-adults-australia/)
- [Off-road buggies for sale](/shop/off-road-buggies/)
`;

// ---------------------------------------------------------------- 6. electric vs manual trolley
const electricVsManual = `
Electric vs manual golf trolley is mostly a question of hills, rounds and budget. A manual (push) golf trolley has no battery or motor, so you push or pull it. An electric golf trolley adds a lithium battery and motor that pull the bag while you walk beside it. Push trolleys in our range cost ${range(push)}, and electric walk-behind trolleys cost ${range(walk)}. This guide compares them with real numbers from the shop.

## What is the difference between an electric and a manual golf trolley?

${table(['', 'Manual (push)', 'Electric walk-behind'], [
  ['Price in our range', range(push), range(walk)],
  ['Power', 'None: you push', 'Lithium battery and motor'],
  ['Weight', `${kgRange(push)} chassis`, `${kgRange(walk)} chassis`],
  ['Maintenance', 'Wheels and frame only', 'Battery charging as well'],
  ['Best for', 'Flat courses, lowest cost and weight', 'Hills, long rounds, saving your energy'],
])}

## Which manual golf trolleys do we sell?

${table(['Push trolley', 'Price', 'Weight', 'Folded size', 'Brakes'], push.filter((p) => p.specs?.weight).map((p) => [pl(p.slug), $(p.price), kg(p), fold(p), spec(p, 'brakes')]))}

See the full range of [push golf buggies](/shop/push-pull-golf-buggies/), including [3 wheel](/shop/3-wheel/) and [4 wheel](/shop/4-wheel/) models, or every [golf trolley](/shop/golf-trolleys/) in one place.

## Which electric golf trolleys do we sell?

${table(['Electric trolley', 'Price', 'Battery', 'Weight', 'Braking'], walk.map((p) => [pl(p.slug), $(p.price), bat(p), kg(p), spec(p, 'brakes')]))}

Every electric walk-behind model here uses a lithium battery, and lithium battery packs carry our 5-year Australian replacement warranty. See them in [electric golf trolleys](/shop/walk-behind/).

## How do you decide?

1. **Hills.** If your course is flat and you walk 9 holes, a push trolley may be all you need. If there are climbs, a motor does the work.
2. **Rounds per week.** Electric trolleys list batteries sized for 18 or 36 holes, so match capacity to how much you play.
3. **Lifting.** A push trolley is lighter to lift into a car. The weights above are for the chassis, so add the battery for electric models.
4. **Budget.** The cheapest way to stop carrying your clubs is a push trolley at ${$(F.push.min)}. Electric starts at ${$(F.walk.min)}.
5. **Accessories.** Add a bag, umbrella holder or cover with your trolley and accessories and parts are 5% off when the order includes a buggy.

## Related guides

- [Cheap golf buggies and carts: what each budget buys](/blog/cheap-golf-buggies-and-carts-australia/)
- [Best electric golf buggies in Australia, compared](/blog/best-electric-golf-buggies-australia/)
- [Remote control vs follow-me golf buggy](/blog/remote-control-vs-follow-me-golf-buggy/)
`;

// ---------------------------------------------------------------- 7. remote vs follow
const remoteVsFollow = `
A remote control vs follow me golf buggy comparison is about how much steering you want to do. A remote-control golf buggy is driven by a handset: you press a button and it moves ahead of you or beside you. A follow-me golf buggy tracks you automatically, so you walk and it follows. Remote-control models in our range cost ${range(remote)}, and follow-me models cost ${range(follow)}. This guide compares them using our product data.

## What is the difference between remote control and follow-me?

${table(['', 'Remote-control buggy', 'Follow-me buggy'], [
  ['How it moves', 'You steer it with a handset', 'It tracks you on its own'],
  ['Price in our range', range(remote), range(follow)],
  ['Weight in our range', kgRange(remote), kgRange(follow)],
  ['Models', `${remote.length} in our range`, `${follow.length} in our range`],
])}

## Which remote-control golf buggies do we sell?

${table(['Remote buggy', 'Price', 'Battery', 'Weight', 'Braking'], remote.map((p) => [pl(p.slug), $(p.price), bat(p), kg(p), spec(p, 'brakes')]))}

Compare them in [remote control golf buggies](/shop/remote-control-golf-buggies/).

## Which follow-me golf buggies do we sell?

${table(['Follow-me buggy', 'Price', 'Battery', 'Weight', 'Braking'], follow.map((p) => [pl(p.slug), $(p.price), bat(p), kg(p), spec(p, 'brakes')]))}

See the full [GPS and follow-me range](/shop/gps-follow-buggies/).

## Which should you choose?

- **Choose remote control** if you like to decide where the buggy goes, want the lowest price, or play courses where you want to park it beside the green.
- **Choose follow-me** if you want your hands free and are happy to pay more for automatic tracking.
- **Check the basics either way:** battery size, braking on slopes and folded size. Every model listed here uses a lithium battery, and lithium packs carry our 5-year Australian replacement warranty.

Prices include GST and delivery is a flat ${$(F.ship)} by tail-lift truck. Pay by PayID or bank transfer, or take 10% off with Bitcoin or USDT.

## Related guides

- [Best electric golf buggies in Australia, compared](/blog/best-electric-golf-buggies-australia/)
- [MGI Zip vs Ai Navigator: which MGI buggy to buy](/blog/mgi-zip-vs-ai-navigator-which-mgi-buggy/)
- [Electric vs manual golf trolley](/blog/electric-vs-manual-golf-trolley-australia/)
- [Downhill control on golf buggies](/blog/downhill-control-golf-buggy-guide/)
`;

// ---------------------------------------------------------------- 8. golf buggy vs golf cart
const buggyVsCart = `
The golf buggy vs golf cart difference is simple once you know the Australian usage. A golf buggy is a wheeled trolley that carries your clubs: you push it, walk beside it, or steer it by remote. A golf cart is a ride-on electric vehicle that carries two to six people. Buggies start at ${$(F.push.min)}, new carts start at ${$(F.cart.min)}. This guide shows what each one costs, carries and suits.

## What is the difference between a golf buggy and a golf cart?

${table(['', 'Golf buggy', 'Golf cart'], [
  ['What it is', 'Wheeled trolley for your clubs', 'Ride-on electric vehicle'],
  ['Carries', 'Your golf bag', 'Two to six people and bags'],
  ['Price from', `${$(F.push.min)} push, ${$(F.walk.min)} electric`, `${$(F.cart.min)} new, ${$(F.usedCart.min)} used`],
  ['Top speed', 'Walking pace', `${F.speed.min} to ${F.speed.max} km/h on the carts that list it`],
  ['Range on a charge', 'Battery sized for 18 or 36 holes', `${F.range.min} to ${F.range.max} km on the carts that list it`],
  ['Delivery', `Flat ${$(F.ship)} by tail-lift truck`, `Flat ${$(F.ship)} by tail-lift truck`],
])}

## When does a golf buggy make sense?

A buggy suits golfers who walk the course and want help carrying the bag. Choose a push buggy for the lowest price, an electric walk-behind buggy for hills and long rounds, or a remote or follow-me buggy for hands-free play. See [push golf buggies](/shop/push-pull-golf-buggies/), [electric golf buggies](/shop/electric-golf-buggies/) and [remote control golf buggies](/shop/remote-control-golf-buggies/).

## When does a golf cart make sense?

A cart suits clubs, resorts, estates, retirement villages and farms, or any golfer who needs to ride. New carts in our range with their listed specifications:

${table(['Cart', 'Seating', 'Top speed', 'Range', 'Price'], specCarts.map(cartRow))}

Browse all of them in [golf carts for sale](/shop/luxury-golf-carts/), including [2 seater](/shop/2-seat/) and [4 and 6 seat](/shop/4-6-seat/) models, and [used carts from ${$(F.usedCart.min)}](/shop/used-golf-buggies/).

## What about road rules?

Road rules for golf carts are set by each state, and a cart used only on a golf course is treated differently from one driven on public roads. Our state guides summarise the official sources: [NSW](/blog/golf-cart-registration-nsw-guide/), [Queensland](/blog/golf-cart-registration-qld-guide/) and [Victoria](/blog/golf-cart-registration-victoria-guide/). A buggy walked beside you is not a road vehicle in the same way, but always confirm local rules.

## Which should you buy?

1. If you walk and want to save your back or legs, buy a buggy.
2. If you need to ride, or to carry passengers or tools, buy a cart.
3. If budget decides, compare [cheap golf buggies and carts](/blog/cheap-golf-buggies-and-carts-australia/).
4. If you are unsure, read the [buyer's guide](/blog/golf-buggy-for-sale-buyers-guide-australia/) or message us on WhatsApp.

Lithium battery packs carry our 5-year Australian replacement warranty, and prices include GST.

## Related guides

- [Electric golf carts in Australia: prices, range and rego](/blog/electric-golf-carts-australia-guide/)
- [Electric buggies for adults](/blog/electric-buggy-for-adults-australia/)
- [Remote control vs follow-me golf buggy](/blog/remote-control-vs-follow-me-golf-buggy/)
`;

// ---------------------------------------------------------------- 9. downhill control
const downhillGuide = `
A downhill control golf buggy has a braking feature that regulates its speed on slopes, so the buggy does not run ahead of you on the way down. This guide explains what downhill control is, which electric golf buggies in our range list a downhill or slope braking system, and what to check if your course is hilly. ${downhill.length} of our ${elec.length} electric golf buggies list one in their specifications.

## What is downhill control on a golf buggy?

On a slope, a buggy with no speed control can pick up pace and pull at your arm. Downhill control uses the motor and brake to hold a steady speed going down. Manufacturers use different names: automatic downhill brake, downhill speed regulation, slope control, dynamic braking. The product page for each model lists the system fitted, and the table below shows what each says.

## Which electric golf buggies list downhill braking?

${table(['Buggy', 'Type', 'Braking system listed', 'Price'], downhill.map((p) => [pl(p.slug), p.subcategory === 'walk-behind' ? 'Walk-behind' : p.subcategory === 'remote-control-golf-buggies' ? 'Remote control' : 'GPS or follow', spec(p, 'brakes'), $(p.price)]))}

Prices include GST. Compare them side by side in [electric golf buggies](/shop/electric-golf-buggies/) or use the [compare tool](/compare/).

## Do you need downhill control?

- **Flat course:** you may not notice the difference, and a [push buggy](/shop/push-pull-golf-buggies/) can be enough.
- **Rolling course:** downhill braking keeps the buggy beside you on descents.
- **Hilly course:** treat it as a must-have, and also look at battery size, because climbing uses more power.
- **Remote buggies:** a remote buggy moves ahead of you, so slope braking matters most there.

## What else should you check on a hilly course?

1. **Battery capacity.** Each product page lists the battery; larger packs suit longer or hillier rounds.
2. **Motor.** Twin motors are listed on several remote models; the specification table shows what each model has.
3. **Weight.** A heavier chassis is harder to lift into a car, so check weight against your boot space.
4. **Parking brake.** Several models list an electronic or parking brake in the braking line.
5. **Warranty.** Lithium battery packs carry our 5-year Australian replacement warranty; the product page lists the buggy's own warranty.

## Related guides

- [Remote control vs follow-me golf buggy](/blog/remote-control-vs-follow-me-golf-buggy/)
- [Electric vs manual golf trolley](/blog/electric-vs-manual-golf-trolley-australia/)
- [MGI Zip vs Ai Navigator: which MGI buggy to buy](/blog/mgi-zip-vs-ai-navigator-which-mgi-buggy/)
- [Best electric golf buggies in Australia](/blog/best-electric-golf-buggies-australia/)
`;

// ---------------------------------------------------------------- 10. will it fit in the car
const smallest = [...elec].filter((p) => foldVol(p) < Infinity).sort((a, b) => foldVol(a) - foldVol(b)).slice(0, 8);
const fitCar = `
Will a golf buggy fit in your car? To fit a golf buggy in a car, compare its folded size with your boot, not with the car's make or model. A folded electric golf buggy in our range measures from ${fold(smallest[0])} for the smallest to about ${fold([...elec].filter((p) => foldVol(p) < Infinity).sort((a, b) => foldVol(b) - foldVol(a))[0])} for the largest, and push buggies fold flatter again. This guide shows the folded sizes and how to measure.

## How do you check if a golf buggy fits your boot?

1. **Measure your boot:** length, width and height with the rear seats up, and again with them down if you fold them.
2. **Read the folded size:** each product page lists the folded dimensions in centimetres.
3. **Compare each side:** the folded buggy needs to fit in at least one orientation. Rotate it to find the best fit.
4. **Allow room for the battery and bag:** you will carry these as well.
5. **Check the weight:** you have to lift it, so the weight on the product page matters as much as the size.

## Which electric golf buggies fold smallest?

${table(['Buggy', 'Folded size', 'Weight', 'Price'], smallest.map((p) => [pl(p.slug), fold(p), kg(p), $(p.price)]))}

Folded sizes are as supplied by the manufacturer and listed on each product page. See all of them in [electric golf buggies](/shop/electric-golf-buggies/).

## What about push buggies?

A push buggy has no battery, so it is usually lighter and often folds flatter:

${table(['Push buggy', 'Folded size', 'Weight', 'Price'], push.filter((p) => p.specs?.foldSize).map((p) => [pl(p.slug), fold(p), kg(p), $(p.price)]))}

The Big Max Blade IP 2 is listed as ultra-flat at 12.5cm deep, which suits a shallow boot. See the full range of [push golf buggies](/shop/push-pull-golf-buggies/).

## Tips for carrying a golf buggy

- Fold it the way the manual shows, and fit the folded unit in before the bag.
- Take the battery out and carry it separately if the product allows it.
- Lay a mat or cover down first so wheels do not mark the boot.
- If your boot is small, shortlist the models in the table above and check the product page for fold details.

## Related guides

- [Electric vs manual golf trolley](/blog/electric-vs-manual-golf-trolley-australia/)
- [Cheap golf buggies and carts: what each budget buys](/blog/cheap-golf-buggies-and-carts-australia/)
- [Best electric golf buggies in Australia](/blog/best-electric-golf-buggies-australia/)
`;

// Extra sections go in before the closing "Related guides" heading.
const withExtra = (slug, content) => {
  const extra = EXTRA_NEW[slug];
  if (!extra) return content;
  const at = content.lastIndexOf('\n## ');
  return content.slice(0, at) + '\n' + extra.trim() + '\n' + content.slice(at);
};

const RAW = [
  mk({ slug: 'golf-cart-registration-nsw-guide', title: 'Golf Cart Registration in NSW: What Transport for NSW Allows', titleTag: 'Golf Cart Registration NSW: What the Rules Allow',
    excerpt: 'Golf cart registration in NSW explained: the golf buggy medical concession, 20 km/h limit, required equipment and what it means for the cart you buy.',
    metaDescription: 'Golf cart registration NSW explained: the golf buggy medical concession, 20 km/h limit and required equipment, and what it means for the cart you buy.',
    category: 'Road Compliance', date: DATE, image: img('cougar-2-seater-electric-golf-cart'), imageAlt: 'Two-seat electric golf cart: Cougar 2-seater',
    keyword: 'golf cart registration nsw', faqIds: ['nsw-rego-needed', 'nsw-rego-speed'], toc: true, content: nsw }),
  mk({ slug: 'golf-cart-registration-qld-guide', title: 'Golf Cart Registration in QLD: Conditional Rego Explained', titleTag: 'Golf Cart Registration QLD: Conditional Rego Explained',
    excerpt: 'Golf cart registration in QLD explained: TMR conditional registration, the LO3, LO6(A) and LO7 codes, road owner permission and when none is needed.',
    metaDescription: 'Golf cart registration QLD explained: TMR conditional registration, the LO3, LO6(A) and LO7 codes, road owner permission and when none is needed.',
    category: 'Road Compliance', date: DATE, image: img('rippa-4-seat-electric-golf-cart'), imageAlt: 'Electric golf cart for Queensland: Rippa 4-seat',
    keyword: 'golf cart registration qld', faqIds: ['qld-rego-roads', 'qld-rego-course'], toc: true, content: qld }),
  mk({ slug: 'golf-cart-registration-victoria-guide', title: 'Golf Cart Registration in Victoria: When You Need It', titleTag: 'Golf Cart Registration Victoria: When You Need It',
    excerpt: 'Golf cart registration in Victoria explained: the exemption, the two kilometre rule, unregistered vehicle permits and what to check before you buy.',
    metaDescription: 'Golf cart registration Victoria explained: the exemption, the two kilometre highway rule, unregistered vehicle permits and what to check before you buy.',
    category: 'Road Compliance', date: DATE, image: img('ecar-lithium-a2-2-seater-golf-cart'), imageAlt: 'Electric golf cart for Victoria: ECAR Lithium A2 2-seater',
    keyword: 'golf cart registration victoria', faqIds: ['vic-rego-exempt', 'vic-rego-permit'], toc: true, content: vic }),
  mk({ slug: 'side-by-side-vs-quad-bike-australia', title: 'Side by Side vs Quad Bike: Safety, Cost and Use in Australia', titleTag: 'Side by Side vs Quad Bike: Safety, Cost & Use',
    excerpt: 'Side by side vs quad bike in Australia: the seating and safety differences, the mandatory standard for quad bikes, costs, and what to check before you buy.',
    metaDescription: 'Side by side vs quad bike in Australia: seating, rollover protection, the quad bike mandatory standard, costs and what to check before you buy.',
    category: 'Comparisons', date: DATE, image: img('kayo-s350-side-by-side-utv'), imageAlt: 'Side-by-side UTV: Kayo S350',
    keyword: 'side by side vs quad bike', faqIds: ['ssv-standard', 'ssv-children'], toc: true, content: ssvVsQuad }),
  mk({ slug: 'dune-buggy-vs-side-by-side-australia', title: 'Dune Buggy vs Side by Side: Which One Suits You?', titleTag: 'Dune Buggy vs Side by Side: Which Suits You?',
    excerpt: 'Dune buggy vs side by side in Australia: prices, seating, cargo and safety compared, using the models we stock and Product Safety Australia guidance.',
    metaDescription: 'Dune buggy vs side by side in Australia: prices, seating, cargo and safety compared across the models we stock, with official safety guidance.',
    category: 'Comparisons', date: DATE, image: img('gmx-gkt150-dune-buggy'), imageAlt: 'Dune buggy: GMX GKT150',
    keyword: 'dune buggy vs side by side', faqIds: ['dune-vs-ssv-price', 'dune-private-land'], toc: true, content: duneVsSsv }),
  mk({ slug: 'electric-vs-manual-golf-trolley-australia', title: 'Electric vs Manual Golf Trolley: Which Should You Buy?', titleTag: 'Electric vs Manual Golf Trolley: Which to Buy?',
    excerpt: 'Electric vs manual golf trolley in Australia: price, weight, battery and hills compared, with every push and electric trolley we stock.',
    metaDescription: 'Electric vs manual golf trolley in Australia: price, weight, battery and hills compared, with every push and electric walk-behind trolley we stock.',
    category: 'Comparisons', date: DATE, image: img('mgi-zip-x1-electric-golf-buggy'), imageAlt: 'Electric golf trolley: MGI Zip X1',
    keyword: 'electric vs manual golf trolley', faqIds: ['trolley-cost', 'trolley-battery-holes'], toc: true, content: electricVsManual }),
  mk({ slug: 'remote-control-vs-follow-me-golf-buggy', title: 'Remote Control vs Follow Me Golf Buggy: Which Is Better?', titleTag: 'Remote Control vs Follow Me Golf Buggy Compared',
    excerpt: 'Remote control vs follow me golf buggy in Australia: how each moves, prices, batteries and braking, with every model we stock.',
    metaDescription: 'Remote control vs follow me golf buggy in Australia: how each one moves, plus prices, batteries and braking for every model we stock.',
    category: 'Comparisons', date: DATE, image: img('stewart-golf-q-follow-electric-buggy'), imageAlt: 'Follow-me golf buggy: Stewart Golf Q Follow',
    keyword: 'remote control vs follow me golf buggy', faqIds: ['remote-vs-follow-price', 'follow-me-meaning'], toc: true, content: remoteVsFollow }),
  mk({ slug: 'golf-buggy-vs-golf-cart-difference', title: 'Golf Buggy vs Golf Cart: What Is the Difference?', titleTag: 'Golf Buggy vs Golf Cart: What Is the Difference?',
    excerpt: 'Golf buggy vs golf cart: what each one is, what it costs, carries and suits, with prices and specifications from our range.',
    metaDescription: 'Golf buggy vs golf cart: what each one is, what it costs, carries and suits, with prices and specifications from our Australian range.',
    category: 'Buying Guides', date: DATE, image: img('mgi-zip-navigator-at-all-terrain-golf-buggy'), imageAlt: 'Golf buggy: MGI Zip Navigator AT',
    keyword: 'golf buggy vs golf cart', faqIds: ['cart-vs-buggy-cost', 'buggy-carry-person'], toc: true, content: buggyVsCart }),
  mk({ slug: 'downhill-control-golf-buggy-guide', title: 'Downhill Control Golf Buggy: What It Is and Which Models Have It', titleTag: 'Downhill Control Golf Buggy: Which Models Have It',
    excerpt: 'Downhill control on a golf buggy explained, with the electric golf buggies in our range that list downhill or slope braking.',
    metaDescription: 'Downhill control golf buggy explained: what the braking feature does and which electric golf buggies in our range list downhill or slope braking.',
    category: 'Engineering & Tech', date: DATE, image: img('motocaddy-m1-dhc-electric-golf-buggy'), imageAlt: 'Downhill control golf buggy: Motocaddy M1 DHC',
    keyword: 'downhill control golf buggy', faqIds: ['dhc-meaning', 'dhc-count'], toc: true, content: downhillGuide }),
  mk({ slug: 'will-a-golf-buggy-fit-in-my-car', title: 'Will a Golf Buggy Fit in My Car? Folded Sizes Compared', titleTag: 'Will a Golf Buggy Fit in My Car? Folded Sizes',
    excerpt: 'How to fit a golf buggy in a car: how to measure your boot and the folded sizes and weights of the electric and push buggies we stock.',
    metaDescription: 'Will a golf buggy fit in your car? How to measure your boot, plus folded sizes and weights of the electric and push buggies we stock.',
    category: 'Buying Guides', date: DATE, image: img('big-max-blade-ip2-flat-fold-golf-buggy'), imageAlt: 'Ultra-flat folding golf buggy: Big Max Blade IP 2',
    keyword: 'fit a golf buggy in a car', faqIds: ['fold-smallest', 'fold-measure'], toc: true, content: fitCar }),
];

export const GUIDES_NEW = RAW.map((g) => mk({ ...g, content: withExtra(g.slug, g.content) }));
