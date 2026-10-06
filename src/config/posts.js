// src/config/posts.js
// Blog posts. Written to the keyword plan (docs/keyword-map.md, docs/blog-plan.md).
// Every price, model name and spec below is pulled from the live product data, so a post cannot quote a stale number.
// Format: markdown subset (## ### - 1. > | tables | **bold** [links](/path/)); see src/components/ArticleBody.jsx.
// Rules: no invented statistics, awards or named clients. Road-rule text stays general and points to the state authority.
import { PRODUCTS } from './products.js';
import { FACTS as F, money as $ } from './faq.js';
import { GUIDES } from './guides.js';

const P = Object.fromEntries(PRODUCTS.map((p) => [p.slug, p]));
const need = (slug) => { if (!P[slug]) throw new Error(`posts.js references a missing product: ${slug}`); return P[slug]; };
const pl = (slug, label) => { const p = need(slug); return `[${label || p.name}](/shop/${p.category}/${p.slug}/)`; };
const cell = (s) => String(s ?? '').replace(/\|/g, '/').replace(/\s+/g, ' ').trim() || '-';
const table = (head, rows) => [`| ${head.join(' | ')} |`, `| ${head.map(() => '---').join(' | ')} |`, ...rows.map((r) => `| ${r.map(cell).join(' | ')} |`)].join('\n');
const kg = (p) => (String(p.specs?.weight || '').match(/[\d.]+\s*kg/) || ['-'])[0];
const bat = (p) => String(p.specs?.battery || '-').replace(/\s*\(.*$/, '');
const byPrice = (list) => [...list].sort((a, b) => a.price - b.price);
const when = (iso) => new Date(iso).toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' });
const TODAY = '2026-10-06';

const push = byPrice(PRODUCTS.filter((p) => p.category === 'push-pull-golf-buggies'));
const walk = byPrice(PRODUCTS.filter((p) => p.subcategory === 'walk-behind'));
const remote = byPrice(PRODUCTS.filter((p) => p.subcategory === 'remote-control-golf-buggies'));
const gps = byPrice(PRODUCTS.filter((p) => p.subcategory === 'gps-follow-buggies'));
const usedAll = byPrice(PRODUCTS.filter((p) => p.condition === 'Used' || p.condition === 'Ex-Demo'));
const usedCarts = byPrice(PRODUCTS.filter((p) => p.category === 'luxury-golf-carts' && p.subcategory === 'used'));
const newCarts = byPrice(PRODUCTS.filter((p) => p.category === 'luxury-golf-carts' && p.subcategory !== 'used'));
const specCarts = newCarts.filter((p) => p.specs?.range && p.specs?.topSpeed && p.specs?.battery);
const roadCarts = newCarts.filter((p) => /conditional|registerable/i.test(String(p.specs?.topSpeed || '')));

// ------------------------------------------------------------------ 1. cheap golf buggies
const cheap = `
A cheap golf buggy in Australia can cost from ${$(F.push.min)} for a push buggy, or from ${$(F.usedAll.min)} for a used or ex-demo electric buggy. Electric walk-behind buggies start at ${$(F.walk.min)} new. This guide shows what each budget buys, using the prices in our shop today, and how to pay less on the buggy you choose.

## What counts as a cheap golf buggy?

"Cheap" depends on what you compare it with. A manual push buggy, an electric walk-behind buggy and a ride-on golf cart are three different purchases, so we group them by budget:

- **Under ${$(F.push.max + 1)}:** manual push golf buggies, no battery.
- **${$(F.walk.min)} to ${$(F.walk.max)}:** electric walk-behind buggies with a lithium battery.
- **${$(F.remote.min)} to ${$(F.remote.max)}:** remote-control electric buggies.
- **From ${$(F.usedAll.min)}:** used and ex-demo buggies and carts.
- **Ride-on golf carts:** used from ${$(F.usedCart.min)}, new from ${$(F.cart.min)}.

Every price below includes GST and comes from the live shop. Prices and stock change, so check the product page before you decide.

## Under ${$(F.push.max + 1)}: push golf buggies

A push golf buggy has no battery or motor. You push or pull it, it carries your bag, and it folds for the boot. That makes it the cheapest way to stop carrying your clubs, and there is nothing to charge or replace. Our push range runs from ${$(F.push.min)} to ${$(F.push.max)}:

${table(['Push buggy', 'Brand', 'Price', 'Weight'], push.map((p) => [pl(p.slug), p.brandName, $(p.price), kg(p)]))}

Look at weight and how the buggy folds if you lift it in and out of a car often. See every model in our [push golf buggy range](/shop/push-pull-golf-buggies/), or compare [3 wheel](/shop/3-wheel/) and [foldable 4 wheel](/shop/4-wheel/) designs.

## ${$(F.walk.min)} to ${$(F.walk.max)}: electric walk-behind buggies

An electric walk-behind buggy adds a battery and motor, so it pulls the bag up hills while you walk beside it. These are the cheapest new electric buggies we sell, and every one uses a lithium battery:

${table(['Electric buggy', 'Brand', 'Price', 'Battery', 'Weight'], walk.map((p) => [pl(p.slug), p.brandName, $(p.price), bat(p), kg(p)]))}

Browse them all in our [electric walk-behind range](/shop/walk-behind/).

## ${$(F.remote.min)} and up: remote-control buggies

A remote-control buggy drives ahead of you on a handset, so you walk free of it. The cheapest three in our range:

${table(['Remote-control buggy', 'Brand', 'Price', 'Battery'], remote.slice(0, 3).map((p) => [pl(p.slug), p.brandName, $(p.price), bat(p)]))}

If you do not need the remote, a walk-behind buggy above costs less. See the full [remote-control range](/shop/remote-control-golf-buggies/) when you are ready to compare.

## Used and ex-demo: the cheapest way to get electric

Used and ex-demo stock is the lowest price you can pay for an electric buggy or cart. We stock inspected buggies and carts from ${$(F.usedAll.min)}:

${table(['Used / ex-demo', 'Condition', 'Price'], usedAll.map((p) => [pl(p.slug), p.condition, $(p.price)]))}

Stock changes often, so check the [used golf buggy page](/shop/used-golf-buggies/) for what is in today.

## Cheap golf carts: used from ${$(F.usedCart.min)}, new from ${$(F.cart.min)}

Ride-on carts cost far more than buggies. The cheapest new cart in our range is the ${pl('cougar-2-seater-electric-golf-cart', 'Cougar 2-Seater Electric Golf Cart')} at ${$(P['cougar-2-seater-electric-golf-cart'].price)}. Used and ex-fleet carts start lower:

${table(['Used cart', 'Price'], usedCarts.slice(0, 4).map((p) => [pl(p.slug), $(p.price)]))}

Compare new and used in our [golf cart range](/shop/luxury-golf-carts/).

## Five ways to pay less

1. **Bundle accessories.** When your order includes a golf buggy or cart, every accessory and part in it is **5% off**, applied automatically at checkout.
2. **Pay with crypto.** Paying with Bitcoin or USDT takes **10% off** the order total after any other discount.
3. **Buy used or ex-demo.** It is the largest single saving, with prices from ${$(F.usedAll.min)}.
4. **Skip features you will not use.** A walk-behind buggy from ${$(F.walk.min)} does the same carrying as a remote-control model.
5. **Spread the cost.** Pay in 4 splits the price into four equal payments at 0% interest. It does not lower the price, but it eases cash flow. See our [finance options](/finance/).

Delivery is a flat ${$(F.ship)} Australia-wide by hydraulic tail-lift truck, so factor that into any comparison with a shop that quotes freight separately.

## What to avoid with very cheap buggies

A low price can cost more later. Before you buy any cheap buggy, check four things:

- **Battery type and capacity.** Lithium is lighter and lasts longer than lead-acid. Ask how many holes one charge covers.
- **Warranty.** Find out what is covered and for how long, and who services it in Australia.
- **Spare parts.** Wheels, chargers and batteries wear out. Make sure they are sold locally. Ours are in our [parts](/shop/parts/) and [battery](/shop/batteries/) ranges.
- **Weight and fold.** If you lift it into a car, a heavy buggy gets old fast.

## The bottom line

If you only want to stop carrying your bag, start with a push buggy from ${$(F.push.min)}. If you want the buggy to do the pulling, an electric walk-behind from ${$(F.walk.min)} is the entry point. If budget is tight but you want electric, look at used and ex-demo stock first. Browse the whole range at [our shop](/shop/), or call 0480 811 308 and we will point you to the right model.
`;

// ------------------------------------------------------------------ 2. best electric golf buggies
const bestRows = [
  ['mgi-zip-x1-electric-golf-buggy', 'Walk-behind'], ['powakaddy-dlx-push-button-electric-golf-buggy', 'Walk-behind'], ['motocaddy-m1-dhc-electric-golf-buggy', 'Walk-behind'],
  ['stinger-golf-sg4-crossover-remote-electric-buggy', 'Remote control'], ['motocaddy-m7-remote-electric-golf-buggy', 'Remote control'], ['mgi-zip-navigator-at-remote-electric-golf-buggy', 'Remote control'], ['stewart-golf-vertx-remote-electric-buggy', 'Remote control'],
  ['powakaddy-fx7-gps-36-hole-electric-golf-buggy', 'GPS'], ['motocaddy-m5-gps-dhc-electric-golf-buggy', 'GPS'], ['mgi-ai-navigator-gps-plus-electric-golf-buggy', 'GPS'],
  ['stewart-golf-x10-follow-electric-buggy', 'Auto-follow'], ['clicgear-model-4-5-push-golf-buggy', 'Push (no battery)'],
];
const best = `
The best electric golf buggy in Australia depends on how you play. A walk-behind buggy from ${$(F.walk.min)} is the value pick, a remote-control buggy from ${$(F.remote.min)} lets you walk free of the buggy, and GPS and follow buggies add distances or hands-free tracking. This guide compares the electric golf buggies in our shop by price, battery, weight and control type.

## How we compared electric golf buggies

We compare only the buggies on our shop today, so every price is current, and every price includes GST. We look at five things:

- **Price**, because it sets the budget.
- **Battery type and capacity**, because it decides how many holes you can play.
- **Weight**, because you lift it into the car.
- **Fold size**, because it has to fit the boot.
- **Control type**: walk-behind, remote control, GPS or auto-follow.

All the electric buggies below use lithium batteries. Where a picture helps, the model name links to its product page.

## Quick comparison table

${table(['Model', 'Type', 'Price', 'Battery', 'Weight'], bestRows.map(([s, type]) => [pl(s), type, $(P[s].price), bat(P[s]), kg(P[s])]))}

## Best value walk-behind buggy

A walk-behind buggy is the simplest electric buggy: you steer by hand and the motor does the pulling. The lowest-priced is the ${pl('mgi-zip-x1-electric-golf-buggy')} at ${$(P['mgi-zip-x1-electric-golf-buggy'].price)}, with a ${bat(P['mgi-zip-x1-electric-golf-buggy'])} battery. The lightest is the ${pl('powakaddy-dlx-push-button-electric-golf-buggy')} at ${kg(P['powakaddy-dlx-push-button-electric-golf-buggy'])} and ${$(P['powakaddy-dlx-push-button-electric-golf-buggy'].price)}. For a bigger battery, look at the ${pl('motocaddy-m1-dhc-electric-golf-buggy')}.

Our pick for value is the MGI Zip X1: it is the cheapest lithium buggy we stock and the entry point to the whole MGI range. See every model in our [walk-behind range](/shop/walk-behind/).

## Best remote-control golf buggy

A remote-control buggy drives ahead of you on a handset. We list eight models from ${$(F.remote.min)} to ${$(F.remote.max)}:

- **Lowest price:** ${pl('stinger-golf-sg4-crossover-remote-electric-buggy')} at ${$(P['stinger-golf-sg4-crossover-remote-electric-buggy'].price)}.
- **Mid-range:** ${pl('motocaddy-m7-remote-electric-golf-buggy')} at ${$(P['motocaddy-m7-remote-electric-golf-buggy'].price)}, with a high-capacity ${bat(P['motocaddy-m7-remote-electric-golf-buggy'])} battery.
- **All-terrain:** ${pl('mgi-zip-navigator-at-remote-electric-golf-buggy')} at ${$(P['mgi-zip-navigator-at-remote-electric-golf-buggy'].price)}.
- **Premium:** ${pl('stewart-golf-vertx-remote-electric-buggy')} at ${$(P['stewart-golf-vertx-remote-electric-buggy'].price)}.

For most golfers who want a remote, our pick is the Motocaddy M7: it sits in the middle of the price range and carries a high-capacity battery. See them all in the [remote-control range](/shop/remote-control-golf-buggies/).

## Best GPS and follow-me golf buggy

GPS buggies show distances on a screen. Follow buggies track you and drive behind you automatically. The cheapest GPS buggy in our range is the ${pl('powakaddy-fx7-gps-36-hole-electric-golf-buggy')} at ${$(P['powakaddy-fx7-gps-36-hole-electric-golf-buggy'].price)}, followed by the ${pl('motocaddy-m5-gps-dhc-electric-golf-buggy')} at ${$(P['motocaddy-m5-gps-dhc-electric-golf-buggy'].price)}. The auto-follow models are the ${pl('stewart-golf-x10-follow-electric-buggy')} at ${$(P['stewart-golf-x10-follow-electric-buggy'].price)} and ${pl('stewart-golf-q-follow-electric-buggy')} at ${$(P['stewart-golf-q-follow-electric-buggy'].price)}. Browse the [GPS and follow range](/shop/gps-follow-buggies/).

## Best golf push buggy (no battery)

If you want no battery at all, a push buggy is the cheapest way to stop carrying your bag. The ${pl('clicgear-rovic-rv1s-swivel-push-golf-buggy')} is our lowest price at ${$(P['clicgear-rovic-rv1s-swivel-push-golf-buggy'].price)}, the ${pl('big-max-blade-ip2-flat-fold-golf-buggy')} is the lightest at ${kg(P['big-max-blade-ip2-flat-fold-golf-buggy'])}, and the ${pl('clicgear-model-4-5-push-golf-buggy')} is a popular 3-wheel design at ${$(P['clicgear-model-4-5-push-golf-buggy'].price)}. See the [push golf buggy range](/shop/push-pull-golf-buggies/).

## What the specifications mean

- **Battery voltage and watt-hours (Wh).** Watt-hours is the size of the fuel tank: the higher the number, the longer the buggy runs. Voltage is how the battery is wired, and it matters for compatibility. A "36-hole" battery is rated to cover about 36 holes on one charge, depending on terrain and load.
- **Weight.** The electric buggies in the table above weigh from ${kg(P['powakaddy-fx7-gps-36-hole-electric-golf-buggy'])} to ${kg(P['stewart-golf-x10-follow-electric-buggy'])} before the bag goes on. Some listings give the weight without the battery, so check the product page.
- **Downhill control.** Some models hold a steady speed downhill (DHC or downhill braking), which stops the buggy running away on slopes.
- **Fold size.** Flat-fold buggies pack smaller, which helps in a small boot.
- **Control type.** Walk-behind is simplest. Remote control and follow models add convenience and cost more.

## Accessories worth adding

Most golfers add a few accessories to their buggy. In our shop you will find [umbrella holders, drink holders and scorecard consoles](/shop/accessories/), travel covers and [replacement wheels](/shop/parts/). When your order includes a buggy, every accessory and part is 5% off, applied automatically at checkout.

## Looking after your electric golf buggy

- Charge the battery after every round, and use only the charger made for that battery.
- Keep lithium batteries out of direct heat and store them partly charged over a long break.
- Wipe the buggy down after wet rounds and check the wheels spin freely.
- Replace worn wheels and tyres early. Parts are in our [parts range](/shop/parts/).

## Lithium or lead-acid?

Every electric buggy above uses a lithium battery. Lithium is lighter, charges faster and needs no topping up, which is why it has replaced lead-acid in walk-behind buggies. If you own an older buggy with a lead-acid battery, our [battery range](/shop/batteries/) has lithium replacements.

## How to choose

1. **Set a budget.** Under ${$(F.push.max + 1)}: push. ${$(F.walk.min)} to ${$(F.walk.max)}: walk-behind. ${$(F.remote.min)} and up: remote control.
2. **Think about hills.** A bigger battery and more weight help on hilly courses.
3. **Check the boot.** Compare weight and fold size against your car.
4. **Decide how hands-free you want to be.** Walk-behind is simple, remote control is easier, follow is hands-free.
5. **Check the warranty.** New lithium buggies from us carry a 5-year LiFePO4 battery guarantee, and each product page lists the warranty for that model.

Compare everything side by side in our [electric golf buggy range](/shop/electric-golf-buggies/), or call 0480 811 308 for advice.
`;

// ------------------------------------------------------------------ 3. Aldi vs specialist
const aldi = `
An Aldi golf buggy is a supermarket special-buy electric buggy that people search for by name. Before you buy any electric buggy, from any retailer, check the battery type, the warranty length, whether spare parts are sold locally, and who services it. We have no connection with Aldi, and we have not tested its buggies, so this guide gives you a checklist rather than a verdict.

## What shoppers mean by an Aldi golf buggy

Searches for "aldi golf buggy" and "aldi electric golf buggy" come from golfers who saw a low-priced electric buggy in a supermarket catalogue and want to know if it is worth buying. Special-buy stock is usually available for a limited time, so check the current Aldi listing yourself for the model, price and specifications. We do not quote them here because they change.

## The five things to check on any electric golf buggy

Whoever sells it, ask these five questions:

1. **What battery does it use, and how big is it?** Lithium is lighter and lasts longer than lead-acid. Ask how many holes one charge covers, and what a replacement battery costs.
2. **What is the warranty?** Find out how long it lasts, what it covers, and whether the battery has its own warranty.
3. **Can you buy spare parts in Australia?** Wheels, chargers, batteries and remotes wear out. If the model is discontinued, parts may disappear.
4. **Who services it?** Ask where to take it, and whether you can reach someone by phone.
5. **How heavy is it and how does it fold?** You lift it into the car. Compare weight and folded size.

## Supermarket special-buy or specialist retailer?

${table(['What to compare', 'Special-buy buggy', 'Specialist retailer'], [
  ['Range', 'Usually one or two models', `${F.walk.min ? 'Dozens of models across' : ''} walk-behind, remote, GPS and push`],
  ['Availability', 'Often limited-time stock', 'Ongoing range'],
  ['Spare parts', 'Check before buying', 'Parts and chargers sold separately'],
  ['Advice', 'Self-service', 'Phone and WhatsApp support'],
  ['Upgrades', 'Check for compatibility', 'Lithium batteries, wheels and accessories'],
])}

This table lists what to check, not claims about any one retailer.

## A simple three-year cost check

The price on the shelf is only the first cost. To compare two buggies fairly, write down:

1. **Purchase price**, including delivery.
2. **Replacement battery cost.** Ask the price and the typical lifespan of the battery that comes with the buggy.
3. **Spare parts you are likely to need**, such as wheels, a charger or a remote.
4. **What happens if it fails**: who repairs it, how long it takes, and what the warranty covers.

A buggy that costs a little less but needs a new battery in two years can end up costing more.

## Questions to ask any seller

- How many holes does one charge cover, and on what terrain?
- Is the battery lithium or lead-acid, and what is its warranty?
- Can I buy a replacement battery, charger and wheels separately?
- Where is it serviced in Australia, and how do I reach someone?
- What is the return or refund policy if it does not suit me?

## If you already own a supermarket buggy

If you have bought a special-buy buggy and need a battery, charger or wheels, check whether the part fits before you order. Our [chargers](/shop/chargers/), [batteries](/shop/batteries/) and [parts](/shop/parts/) pages list what we stock and the buggies they suit. If you are unsure, call 0480 811 308 with the model name and we will tell you honestly whether we can help.

## What a specialist adds

A specialist keeps the whole system available: the buggy, the charger, replacement batteries, wheels, umbrella holders and covers. In our shop you can find [spare parts](/shop/parts/), [lithium batteries](/shop/batteries/) and [accessories](/shop/accessories/) for the buggies we sell. When your order includes a buggy, accessories and parts are 5% off. New lithium buggies carry a 5-year LiFePO4 battery guarantee, and you can phone 0480 811 308 with questions.

## Alternatives at similar prices

If you are comparing a budget electric buggy, start with our walk-behind range. The cheapest is the ${pl('mgi-zip-x1-electric-golf-buggy')} at ${$(P['mgi-zip-x1-electric-golf-buggy'].price)}, and we have six walk-behind models from ${$(F.walk.min)} to ${$(F.walk.max)}. Put the Aldi specifications next to any of them using the five checks above. See the [walk-behind range](/shop/walk-behind/) or the wider [electric golf buggy range](/shop/electric-golf-buggies/).

## The bottom line

A low price is only a good price if the buggy is still working in three years. Use the five checks to compare any special-buy buggy with a specialist model. If you would like a second opinion on a model you are considering, call us on 0480 811 308.
`;

// ------------------------------------------------------------------ 4. electric golf carts pillar
const electricCart = `
An electric golf cart is a battery-powered ride-on vehicle that carries two to six people. New carts start at ${$(F.cart.min)} in Australia, and most run on a 48V battery. This guide covers what they cost, how far and fast they go, which batteries to choose, how to charge them, the road rules to check, and how to buy new or used.

## What is an electric golf cart?

An electric golf cart is a small ride-on electric vehicle with a seat for the driver and passengers, a rear bag rack or cargo area, and an electric motor powered by a battery pack. It is different from a golf buggy, which is the wheeled trolley you walk behind. Carts are used on golf courses, on estates and resorts, on farms and on larger properties.

We sell new and used carts in three groups: [2-seat carts](/shop/2-seat/), [4 and 6 seat carts](/shop/4-6-seat/), and [utility carts](/shop/utility/). You can see them all in our [golf cart range](/shop/luxury-golf-carts/).

## Where electric golf carts are used

- **Golf courses and clubs:** 2 and 4 seat carts for players and for course staff.
- **Estates and gated communities:** short trips between houses, clubhouses and amenities.
- **Resorts and venues:** moving guests and luggage quietly.
- **Farms and properties:** a quiet, fuel-free way to cover a large property, with utility carts for hauling.
- **Commercial sites:** wineries, factories and councils use utility carts for light loads.

## Electric golf cart prices in Australia

Prices depend on seats, battery and brand. In our shop today:

${table(['Cart type', 'Price range', 'Where to look'], [
  ['New 2-seat', `From ${$(F.cart.min)}`, '[2-seat carts](/shop/2-seat/)'],
  ['New 4 to 6 seat', `From ${$(F.cart46.min)} to ${$(F.cart46.max)}`, '[4 and 6 seat carts](/shop/4-6-seat/)'],
  ['Used and ex-fleet', `${$(F.usedCart.min)} to ${$(F.usedCart.max)}`, '[Used golf carts](/shop/used-golf-buggies/)'],
])}

Prices include GST, and delivery is a flat ${$(F.ship)} Australia-wide.

### What the cheapest new carts look like

The lowest-priced new cart is the ${pl('cougar-2-seater-electric-golf-cart')} at ${$(P['cougar-2-seater-electric-golf-cart'].price)}. Lithium-powered 2-seaters start at ${$(P['ecar-lithium-a2-2-seater-golf-cart'].price)} with the ${pl('ecar-lithium-a2-2-seater-golf-cart')}. For four seats, the ${pl('rippa-4-seat-electric-golf-cart')} is ${$(P['rippa-4-seat-electric-golf-cart'].price)} and the ${pl('ecar-lithium-a4-4-seater-golf-cart')} is ${$(P['ecar-lithium-a4-4-seater-golf-cart'].price)}.

## Every new cart in our range

${table(['Cart', 'Brand', 'Group', 'Price'], newCarts.map((p) => [pl(p.slug), p.brandName, ({ '2-seat': '2-seat', '4-6-seat': '4 to 6 seat', 'lifted-all-terrain': 'Lifted all-terrain', utility: 'Utility' })[p.subcategory] || p.subcategory, $(p.price)]))}

## Range and speed

Our product pages list range and top speed for each cart. Across the carts with full specifications, range runs from ${F.range.min} km to ${F.range.max}+ km per charge and top speeds from ${F.speed.min} km/h to ${F.speed.max} km/h:

${table(['Cart', 'Price', 'Range', 'Top speed', 'Battery'], specCarts.map((p) => [pl(p.slug), $(p.price), p.specs.range, p.specs.topSpeed, bat(p)]))}

Range depends on terrain, load and battery age, so treat the figure as a guide. Some carts are speed-limited for golf course use.

## Batteries: lead-acid or LiFePO4 lithium?

Electric golf carts use either lead-acid batteries or LiFePO4 (lithium iron phosphate) batteries.

- **Lead-acid** costs less to buy, is heavy, and flooded types need regular topping up with water.
- **LiFePO4 lithium** costs more up front, weighs far less, needs no watering, and is rated for thousands of charge cycles.

New lithium carts and buggies from us carry a 5-year LiFePO4 battery guarantee. If you own an older cart, you can replace or upgrade the batteries:

${table(['Option', 'Type', 'Price'], [
  [pl('trojan-t105-flooded-battery-set-48v-8-batteries'), 'Flooded lead-acid, 48V set', $(P['trojan-t105-flooded-battery-set-48v-8-batteries'].price)],
  [pl('trojan-agm-pro-maintenance-free-battery-set-48v'), 'AGM lead-acid, maintenance-free', $(P['trojan-agm-pro-maintenance-free-battery-set-48v'].price)],
  [pl('trojan-gc2-lithium-battery-48v-24v'), 'Lithium', $(P['trojan-gc2-lithium-battery-48v-24v'].price)],
  [pl('giant-48v-100ah-golf-cart-drop-in-lithium-battery'), 'Drop-in lithium, 48V 100Ah', $(P['giant-48v-100ah-golf-cart-drop-in-lithium-battery'].price)],
  [pl('voltrac-flex-lithium-conversion-kit-e-z-go-rxv-club-car-48v'), 'Lithium conversion kit', $(P['voltrac-flex-lithium-conversion-kit-e-z-go-rxv-club-car-48v'].price)],
])}

See the full [battery range](/shop/batteries/).

## Charging

Plug the charger that suits your battery into a power outlet and leave it until it finishes. Lithium and lead-acid batteries need different chargers, so never swap them. We stock lithium and lead-acid chargers and leads at [our chargers page](/shop/chargers/), and we can confirm the right one if you call 0480 811 308.

## Road rules and registration

Road rules are set by each state and territory. A cart used only on private land, such as a farm, estate or golf course, is treated differently from one driven on public roads. Check the current rules with your state road authority (TMR in Queensland, Transport for NSW, and VicRoads in Victoria) before you buy.

We provide conditional registration compliance support for QLD, NSW and VIC on models marked road compliant. In our range these include:

${roadCarts.map((p) => `- ${pl(p.slug)}: ${p.specs.topSpeed}`).join('\n')}

Read more in our [registration guide](/blog/conditional-road-registration-guide-qld-nsw-vic/).

## New or used and ex-fleet carts

A used cart costs far less than a new one, and ex-fleet carts have often been serviced regularly. Our used carts run from ${$(F.usedCart.min)} to ${$(F.usedCart.max)}:

${table(['Used cart', 'Price'], usedCarts.map((p) => [pl(p.slug), $(p.price)]))}

When you inspect any used cart, check the battery age and type, the condition of the tyres and brakes, and whether a charger is included. See what is in stock at our [used golf buggy page](/shop/used-golf-buggies/).

## Which electric golf cart should you buy?

- **Golf course or weekend rounds, two people:** a 2-seater. The ${pl('cougar-2-seater-electric-golf-cart', 'Cougar')} is the lowest price, and the ${pl('ecar-lithium-a2-2-seater-golf-cart', 'ECAR Lithium A2')} adds a lithium battery.
- **Family, club or resort, four people:** a 4-seater such as the ${pl('rippa-4-seat-electric-golf-cart', 'Rippa')} or the ${pl('ecar-lithium-a4-4-seater-golf-cart', 'ECAR Lithium A4')}.
- **Premium look and road-registration pathway:** the ${pl('tomberlin-e-merge-ss-4-seat-saloon-cart', 'Tomberlin E-Merge SS')}.
- **Rough ground or hills:** a lifted cart such as the ${pl('ecar-lithium-magnum-4lr-lifted-golf-cart', 'ECAR Magnum 4LR')}.
- **Work and cargo:** a utility cart such as the ${pl('ecar-lithium-a2-utility-cart', 'ECAR Lithium A2 Utility Cart')}.

## Looking after an electric golf cart

- **Charge after use.** Lithium packs do not need to be run flat. Lead-acid sets should be charged regularly and, if they are flooded, topped up with water as the maker directs.
- **Check tyre pressure** and look over the brakes before each season.
- **Keep it clean and dry**, and store it out of direct heat.
- **Use the right charger** for your battery chemistry.
- **Have it serviced** at the interval in the maker's manual. Spare parts are in our [parts range](/shop/parts/).

## Golf cart terms explained

- **48V, 105Ah:** the battery voltage and capacity. Higher amp-hours (Ah) means a bigger tank and more range.
- **kW:** the motor's power rating. A higher figure means more pulling power on hills and with a load.
- **AC motor:** an alternating-current motor, common in newer carts, often more efficient than older DC motors.
- **LiFePO4:** lithium iron phosphate, the lithium chemistry used in most modern cart batteries.
- **BMS:** the battery management system that protects a lithium pack from over-charge, over-discharge and over-temperature.
- **Conditional registration:** a limited registration pathway some states offer for low-speed vehicles. See the road rules section above.

## Buying checklist

1. Choose the number of seats and the use (course, estate, farm, road).
2. Decide on lithium or lead-acid, and check the battery warranty.
3. Check range and top speed on the product page.
4. If you want road use, confirm the model's compliance and your state rules first.
5. Ask about delivery, the warranty and spare parts before you pay.

Browse the [golf cart range](/shop/luxury-golf-carts/) or call 0480 811 308, and we will help you match a cart to your property.
`;

// ------------------------------------------------------------------ 5. electric buggy for adults pillar
const electricBuggy = `
An electric buggy for adults is a battery-powered vehicle, from a walk-behind golf buggy to a ride-on cart or utility vehicle. The right one depends on whether you want to walk, ride or work with it. In Australia the word "buggy" can also mean a baby stroller, so this guide covers only the adult options we sell.

## What people mean by "electric buggy"

Search for "electric buggy" and you will see a mix of results. These are the four things people usually want:

- **An electric golf buggy:** a trolley you walk behind that carries your clubs.
- **A ride-on electric cart:** a small vehicle with seats, used on courses, estates and properties.
- **An electric utility or work cart:** a cart with a cargo bed for tools and supplies.
- **An off-road buggy:** a dune buggy or side-by-side. Most of these are petrol, which we explain below.

## Electric golf buggies (walk-behind)

Electric golf buggies start at ${$(F.walk.min)}. You walk beside the buggy while its motor pulls the bag. Our range covers:

${table(['Type', 'Price range', 'Browse'], [
  ['Walk-behind', `${$(F.walk.min)} to ${$(F.walk.max)}`, '[Walk-behind buggies](/shop/walk-behind/)'],
  ['Remote control', `${$(F.remote.min)} to ${$(F.remote.max)}`, '[Remote-control buggies](/shop/remote-control-golf-buggies/)'],
  ['GPS and follow', `${$(gps[0].price)} to ${$(gps[gps.length - 1].price)}`, '[GPS and follow buggies](/shop/gps-follow-buggies/)'],
])}

If you want a no-battery option, a [push golf buggy](/shop/push-pull-golf-buggies/) starts at ${$(F.push.min)}. For brands and models see our [electric golf buggy range](/shop/electric-golf-buggies/), and our guide to the [best electric golf buggies](/blog/best-electric-golf-buggies-australia/).

### Every electric golf buggy in our range

${table(['Model', 'Type', 'Price', 'Battery', 'Weight'], [...walk.map((p) => [p, 'Walk-behind']), ...remote.map((p) => [p, 'Remote control']), ...gps.map((p) => [p, 'GPS / follow'])].map(([p, type]) => [pl(p.slug), type, $(p.price), bat(p), kg(p)]))}

## Ride-on electric carts

A ride-on electric cart carries two to six people. New carts start at ${$(F.cart.min)} and used carts at ${$(F.usedCart.min)}. Most run on a 48V battery and travel between ${F.speed.min} and ${F.speed.max} km/h across our range, with ${F.range.min} to ${F.range.max}+ km of range per charge on the carts with full specifications. See the [golf cart range](/shop/luxury-golf-carts/) and our full [electric golf cart guide](/blog/electric-golf-carts-australia-guide/).

### Ride-on carts with full specifications

${table(['Cart', 'Price', 'Range', 'Top speed', 'Battery'], specCarts.map((p) => [pl(p.slug), $(p.price), p.specs.range, p.specs.topSpeed, bat(p)]))}

## Electric utility and work carts

Utility carts have a cargo bed for tools, stock feed and supplies, and an electric motor means no fuel and low noise. The ${pl('ecar-lithium-a2-utility-cart')} and ${pl('ecar-lithium-a4-utility-cart')} are both ${$(P['ecar-lithium-a2-utility-cart'].price)}. Browse the [utility cart range](/shop/utility/).

## Off-road options: mostly petrol

Most of our dune buggies, side-by-side UTVs and farm buggies are petrol. The electric off-road options in our range are:

- **Lifted electric carts** for rougher ground, such as the ${pl('ecar-lithium-magnum-4lr-lifted-golf-cart')} at ${$(P['ecar-lithium-magnum-4lr-lifted-golf-cart'].price)} and the ${pl('ecar-compass-4s-6s-lifted-all-terrain-golf-cart')} at ${$(P['ecar-compass-4s-6s-lifted-all-terrain-golf-cart'].price)}.
- **Kids electric buggies**, such as the ${pl('electric-48v-kids-4x4-off-road-buggy')} at ${$(P['electric-48v-kids-4x4-off-road-buggy'].price)}.

If you want a petrol vehicle, see our [off-road buggies](/shop/off-road-buggies/), [dune buggies](/shop/dune-buggies/), [side-by-sides](/shop/side-by-side/) and [farm buggies](/shop/farm-buggies/).

## Looking for a buggy for children?

This guide is about adult electric buggies. For young riders we have a separate range of [kids' ride-on buggies](/shop/kids-buggies/), including electric models from ${$(P['electric-48v-kids-4x4-off-road-buggy'].price)}, such as the ${pl('electric-48v-kids-4x4-off-road-buggy')}. Check the age and weight guidance on each product page before you order.

## Electric buggy terms explained

- **Walk-behind buggy:** an electric trolley you steer by hand.
- **Remote-control buggy:** an electric trolley you steer with a handset.
- **GPS buggy:** shows distances to the green on a screen.
- **Follow buggy:** tracks you and drives behind you automatically.
- **Wh and Ah:** battery size. More means a longer run between charges.
- **LiFePO4:** the lithium chemistry used in most modern buggy and cart batteries.

## Licence, registration and where you can drive

Rules depend on where you drive. On public roads you need a licence and a registered, compliant vehicle. On private land such as a farm, estate or golf course, road licence rules apply differently, and clubs or insurers may set their own. Check with your state road authority before you buy, and read our [registration guide](/blog/conditional-road-registration-guide-qld-nsw-vic/). If you are unsure, call 0480 811 308.

## What it costs to own

- **Charging:** an electric buggy or cart plugs into a normal power outlet, so there is no fuel to buy.
- **Battery:** lithium lasts longer than lead-acid, and new lithium buggies from us carry a 5-year LiFePO4 battery guarantee. Replacement options are in our [battery range](/shop/batteries/).
- **Servicing and spares:** wheels, chargers and accessories are in our [parts](/shop/parts/) and [accessories](/shop/accessories/) ranges, and accessories are 5% off when your order includes a buggy or cart.
- **Delivery:** a flat ${$(F.ship)} Australia-wide by tail-lift truck.

## Looking after an electric buggy

- Charge after every use and use only the charger made for your battery.
- Keep lithium batteries out of direct heat, and store them partly charged over a long break.
- Check wheels, tyres and brakes regularly, and replace worn parts early.
- Wipe the buggy down after wet or dusty use.

## How to choose an electric buggy

${table(['If you want to...', 'Choose', 'From'], [
  ['Stop carrying your golf bag', 'Push buggy', $(F.push.min)],
  ['Have the buggy pull the bag', 'Electric walk-behind buggy', $(F.walk.min)],
  ['Walk free of the buggy', 'Remote-control buggy', $(F.remote.min)],
  ['Ride around a course, estate or property', 'Electric golf cart', $(F.cart.min)],
  ['Haul tools or supplies', 'Electric utility cart', $(P['ecar-lithium-a2-utility-cart'].price)],
])}

Start with the [full shop](/shop/), or call 0480 811 308 and tell us how you plan to use it.
`;

// ------------------------------------------------------------------ 6-8. existing posts, rewritten with verified facts
const buyers = `
A golf buggy for sale in Australia can be a push buggy, an electric walk-behind buggy, a remote-control buggy or a ride-on golf cart. Prices start at ${$(F.push.min)} for a push buggy and ${$(F.cart.min)} for a new ride-on cart. This guide explains how to choose between them, and between new and used.

## Which type of golf buggy do you need?

${table(['Type', 'What it is', 'Price from', 'Browse'], [
  ['Push buggy', 'Manual trolley you push or pull, no battery', $(F.push.min), '[Push buggies](/shop/push-pull-golf-buggies/)'],
  ['Electric walk-behind', 'Battery motor pulls the bag while you walk', $(F.walk.min), '[Walk-behind](/shop/walk-behind/)'],
  ['Remote control', 'Drives ahead of you on a handset', $(F.remote.min), '[Remote control](/shop/remote-control-golf-buggies/)'],
  ['GPS and follow', 'Shows distances or follows you', $(gps[0].price), '[GPS and follow](/shop/gps-follow-buggies/)'],
  ['Ride-on golf cart', '2 to 6 seats, 48V battery', $(F.cart.min), '[Golf carts](/shop/luxury-golf-carts/)'],
])}

## New or used?

New buggies and carts come with the latest batteries and a full warranty. New lithium buggies from us carry a 5-year LiFePO4 battery guarantee. Used and ex-demo stock costs less, from ${$(F.usedAll.min)}, and is inspected before sale. See [used golf buggies](/shop/used-golf-buggies/).

## Battery: lithium or lead-acid?

Lithium is lighter, needs no topping up and lasts longer, so most buggies now use it. Lead-acid costs less but is heavy and needs more care. If you are buying a cart, ask which battery it has and what replacement costs. Our [battery range](/shop/batteries/) lists options.

## Off-road buggies

If you need a vehicle for a farm, property or sand, look at our [off-road buggies](/shop/off-road-buggies/): [dune buggies](/shop/dune-buggies/), [side-by-sides](/shop/side-by-side/) and [farm buggies](/shop/farm-buggies/). Most are petrol.

## Delivery and payment

Every order ships by hydraulic tail-lift truck for a flat ${$(F.ship)} Australia-wide. You can pay by bank transfer, PayID, or in four payments at 0% interest, and crypto payments take 10% off. Accessories and parts are 5% off when your order includes a buggy or cart.

## What to check before you pay

1. **Battery:** type, capacity, age if it is used, and the warranty on it.
2. **Charger:** is the right one included, or do you need to buy it?
3. **Wheels and tyres:** wear, and whether replacements are sold locally.
4. **Brakes and steering:** do they feel firm and straight?
5. **Weight and fold:** can you lift it into your car?
6. **Support:** who services it, and can you phone them?

## Next step

Browse the [whole shop](/shop/) or read our [electric golf buggy comparison](/blog/best-electric-golf-buggies-australia/). If you would like help choosing, call 0480 811 308.
`;

const rego = `
Conditional road registration lets some low-speed vehicles, such as certain golf carts, be driven on public roads in limited circumstances. The rules are set by each state and territory, and they change, so always confirm the current requirements with your state road authority: TMR in Queensland, Transport for NSW, or VicRoads in Victoria.

## Private land and public roads

A golf cart used only on private land, such as a farm, estate or golf course, is treated differently from one driven on a public road. If you plan to cross or travel on a road, you need a vehicle that meets the registration requirements for your state, a licensed driver, and the correct registration or permit.

## What we provide

We provide conditional registration compliance support for QLD, NSW and VIC on models marked road compliant. In our range these include:

${roadCarts.map((p) => `- ${pl(p.slug)}: ${p.specs.topSpeed}`).join('\n')}

Each product page lists top speed and compliance wording for that model. If you want a road-compliant cart, ask us about the compliance documents for the specific model before you order.

## Before you buy

1. Decide where you will drive: private land only, or public roads as well.
2. Contact your state road authority and confirm the current rules and any permit you need.
3. Choose a model marked road compliant, and ask us for its compliance details.
4. Check insurance with your insurer, because requirements vary.

See our [golf cart range](/shop/luxury-golf-carts/), read the [electric golf cart guide](/blog/electric-golf-carts-australia-guide/), or call 0480 811 308.
`;

const lifepo4 = `
A lithium battery for a golf buggy or cart is now the standard upgrade: LiFePO4 (lithium iron phosphate) cells last longer, weigh far less and need no maintenance compared with lead-acid batteries. This guide compares the two chemistries and shows the options in our range.

## Lead-acid versus LiFePO4 lithium

${table(['', 'Lead-acid', 'LiFePO4 lithium'], [
  ['Upfront cost', 'Lower', 'Higher'],
  ['Weight', 'Heavy', 'Much lighter'],
  ['Maintenance', 'Flooded types need regular topping up with water', 'None'],
  ['Cycle life', 'Shorter', 'Rated for thousands of cycles'],
  ['Charger', 'Lead-acid charger', 'Lithium-compatible charger'],
])}

The charger matters: lithium and lead-acid batteries need different chargers, so never swap them. Our [chargers](/shop/chargers/) cover both.

## Heat and Australian conditions

Batteries of every kind lose performance and life when they run hot, and Australian summers are hard on them. Park in the shade, avoid charging in direct heat, and follow the maker's guidance. Lithium packs include a battery management system that protects against over-temperature.

## What is in our range

${table(['Option', 'Type', 'Price'], [
  [pl('trojan-t105-flooded-battery-set-48v-8-batteries'), 'Flooded lead-acid, 48V set', $(P['trojan-t105-flooded-battery-set-48v-8-batteries'].price)],
  [pl('trojan-agm-pro-maintenance-free-battery-set-48v'), 'AGM lead-acid, maintenance-free', $(P['trojan-agm-pro-maintenance-free-battery-set-48v'].price)],
  [pl('trojan-gc2-lithium-battery-48v-24v'), 'Lithium', $(P['trojan-gc2-lithium-battery-48v-24v'].price)],
  [pl('giant-48v-100ah-golf-cart-drop-in-lithium-battery'), 'Drop-in lithium, 48V 100Ah', $(P['giant-48v-100ah-golf-cart-drop-in-lithium-battery'].price)],
  [pl('mgi-24v-380wh-click-and-go-lithium-battery'), 'Lithium for MGI buggies', $(P['mgi-24v-380wh-click-and-go-lithium-battery'].price)],
])}

New lithium golf buggies and carts from us carry a 5-year LiFePO4 battery guarantee. See the full [battery range](/shop/batteries/), or call 0480 811 308 to match a battery to your buggy or cart.
`;

const wc = (s) => s.trim().split(/\s+/).length;
const mk = (o) => ({ ...o, content: o.content.trim(), readTime: `${Math.max(3, Math.round(wc(o.content) / 200))} min read`, words: wc(o.content), updated: TODAY });

const BASE_POSTS = [
  mk({ slug: 'cheap-golf-buggies-and-carts-australia', title: 'Cheap Golf Buggies & Carts in Australia: What Each Budget Buys', titleTag: 'Cheap Golf Buggies in Australia: Prices by Budget',
    excerpt: `Cheap golf buggy options in Australia, from ${$(F.push.min)} push buggies to used buggies and electric models. See what each budget buys and how to save.`,
    metaDescription: `Cheap golf buggy options in Australia, from ${$(F.push.min)} push buggies to used buggies and electric models. See what each budget buys and how to save.`,
    category: 'Buying Guides', date: '2026-10-06', image: '/images/products/clicgear-model-4-5-push-golf-buggy/main.webp', imageAlt: 'Cheap golf buggy: Clicgear Model 4.5 push golf buggy',
    keyword: 'cheap golf buggy', faqIds: ['cost-buggy', 'cost-cart', 'used', 'bundle'], content: cheap }),
  mk({ slug: 'best-electric-golf-buggies-australia', title: 'Best Electric Golf Buggies in Australia: Compared', titleTag: 'Best Electric Golf Buggy in Australia: Compared',
    excerpt: 'The best electric golf buggy in Australia for each type of golfer. Compare remote-control, GPS follow and walk-behind buggies by price, battery and weight.',
    metaDescription: 'The best electric golf buggy in Australia for each type of golfer. Compare remote-control, GPS follow and walk-behind buggies by price, battery and weight.',
    category: 'Comparisons', date: '2026-10-06', image: '/images/products/motocaddy-m7-remote-electric-golf-buggy/main.webp', imageAlt: 'Best electric golf buggy: Motocaddy M7 remote control',
    keyword: 'best electric golf buggies', faqIds: ['best-electric', 'warranty', 'cost-buggy'], content: best }),
  mk({ slug: 'aldi-golf-buggy-vs-specialist-buggy', title: 'Aldi Golf Buggy vs a Specialist Electric Buggy: What to Check', titleTag: 'Aldi Golf Buggy vs Specialist Electric Buggy',
    excerpt: 'Thinking of an Aldi golf buggy? See what to check before you buy any electric golf buggy: battery, warranty, spare parts and service.',
    metaDescription: 'Thinking of an Aldi golf buggy? See what to check before you buy any electric golf buggy: battery, warranty, spare parts and service.',
    category: 'Comparisons', date: '2026-10-06', image: '/images/products/mgi-zip-x1-electric-golf-buggy/main.webp', imageAlt: 'Electric golf buggy alternative: MGI Zip X1',
    keyword: 'aldi golf buggy', faqIds: ['warranty', 'best-electric', 'cost-buggy'], content: aldi }),
  mk({ slug: 'electric-golf-carts-australia-guide', title: 'Electric Golf Carts in Australia: Prices, Range & Rego Guide', titleTag: 'Electric Golf Carts in Australia: Prices & Range Guide',
    excerpt: `Electric golf carts in Australia: prices from ${$(F.cart.min)}, range, speed, lithium batteries and road rules in QLD, NSW and VIC. The complete buyer guide.`,
    metaDescription: `Electric golf carts in Australia: prices from ${$(F.cart.min)}, range, speed, lithium batteries and road rules in QLD, NSW and VIC. The complete buyer guide.`,
    category: 'Buying Guides', date: '2026-10-06', image: '/images/products/ecar-lithium-a2-2-seater-golf-cart/main.webp', imageAlt: 'Electric golf cart in Australia: ECAR Lithium A2 2-seater',
    keyword: 'electric golf cart', faqIds: ['cost-cart', 'speed', 'range', 'charge', 'battery-life', 'road-legal', 'electric-or-gas'], toc: true, content: electricCart }),
  mk({ slug: 'electric-buggy-for-adults-australia', title: 'Electric Buggies for Adults in Australia: Golf, Farm & Off-Road', titleTag: 'Electric Buggy for Adults in Australia: Options Explained',
    excerpt: 'Electric buggies for adults in Australia: golf buggies, ride-on carts, utility carts and off-road buggies explained, with prices, licence rules and how to choose.',
    metaDescription: 'Electric buggies for adults in Australia: golf buggies, ride-on carts, utility carts and off-road options explained, with prices and how to choose.',
    category: 'Buying Guides', date: '2026-10-06', image: '/images/products/ecar-lithium-a2-utility-cart/main.webp', imageAlt: 'Electric buggy for adults: ECAR Lithium A2 utility cart',
    keyword: 'electric buggy', faqIds: ['buggy-vs-cart', 'cost-buggy', 'licence', 'road-legal', 'electric-or-gas'], toc: true, content: electricBuggy }),
  mk({ slug: 'golf-buggy-for-sale-buyers-guide-australia', title: "Golf Buggy for Sale: The Australian Buyer's Guide (New vs Used)", titleTag: "Golf Buggy for Sale: The Australian Buyer's Guide",
    excerpt: 'How to choose a golf buggy for sale in Australia: push, electric, remote control or ride-on cart, new or used, with prices and what to check.',
    metaDescription: 'How to choose a golf buggy for sale in Australia: push, electric, remote control or ride-on cart, new or used, with prices and what to check.',
    category: 'Buying Guides', date: '2026-02-28', image: '/images/products/mgi-zip-navigator-at-all-terrain-golf-buggy/main.webp', imageAlt: 'Golf buggy for sale in Australia: MGI Zip Navigator AT',
    keyword: 'golf buggy for sale', faqIds: ['cost-buggy', 'used', 'delivery'], content: buyers }),
  mk({ slug: 'conditional-road-registration-guide-qld-nsw-vic', title: 'Conditional Road Registration for Golf Carts in QLD, NSW & VIC', titleTag: 'Golf Cart Road Registration in QLD, NSW & VIC',
    excerpt: 'How conditional road registration applies to golf carts in Queensland, NSW and Victoria, what we provide, and what to confirm with your state authority before you buy.',
    metaDescription: 'How conditional road registration applies to golf carts in Queensland, NSW and Victoria, what we provide, and what to confirm with your road authority.',
    category: 'Road Compliance', date: '2026-02-15', image: '/images/products/rippa-4-seat-electric-golf-cart/main.webp', imageAlt: 'Road compliant golf cart: Rippa 4-seat electric golf cart',
    keyword: 'golf cart road registration', faqIds: ['road-legal', 'licence'], content: rego }),
  mk({ slug: 'lifepo4-vs-lead-acid-battery-lifespan-australian-climate', title: 'LiFePO4 Lithium vs Lead-Acid Golf Cart Batteries in Australia', titleTag: 'LiFePO4 vs Lead-Acid Golf Cart Batteries',
    excerpt: 'LiFePO4 lithium versus lead-acid golf cart batteries: cost, weight, maintenance and life compared, with the battery options in our range.',
    metaDescription: 'LiFePO4 lithium versus lead-acid golf cart batteries in Australia: cost, weight, maintenance and life compared, with the options we stock and their prices.',
    category: 'Engineering & Tech', date: '2026-01-20', image: '/images/products/giant-48v-100ah-golf-cart-drop-in-lithium-battery/main.webp', imageAlt: 'LiFePO4 golf cart battery: GIANT 48V 100Ah drop-in lithium',
    keyword: 'lithium battery golf buggy', faqIds: ['battery-life', 'charge'], content: lifepo4 }),
];

// Keyword engine v2 guides (batteries, buggies, golf gear) live in guides-cart.js and guides-golf.js.
export const POSTS = [...BASE_POSTS, ...GUIDES];

export const POST_UPDATED_LABEL = when(TODAY);
