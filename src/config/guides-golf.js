// src/config/guides-golf.js
// Keyword engine v2, guides 8-17: golf clubs, bags and distance devices. Prices and product names come from the product data.
// General golf knowledge (typical lofts, club rules) is kept general; product pages in this catalogue carry no detailed specs,
// so these guides do not claim features, weights or battery life for individual clubs, bags or devices.
import { F, $, P, pl, price, table, mk, img } from './post-kit.js';

// ------------------------------------------------------------------ 8. wedge degrees
const wedge = `
The degrees for a pitching wedge are typically 44 to 48 degrees of loft, a gap wedge 50 to 52, a sand wedge 54 to 56 and a lob wedge 58 to 62 degrees. Loft is the number stamped on the club, and it decides how high and how far the ball flies. This guide explains wedge degrees, loft and how many wedges to carry.

## Wedge degrees at a glance

${table(['Wedge', 'Typical loft', 'What it does best'], [
  ['Pitching wedge (PW)', '44 to 48 degrees', 'Full shots into the green and long chips'],
  ['Gap or approach wedge (GW, AW)', '50 to 52 degrees', 'Fills the distance gap between pitching and sand wedge'],
  ['Sand wedge (SW)', '54 to 56 degrees', 'Bunker shots and short pitches'],
  ['Lob wedge (LW)', '58 to 62 degrees', 'High, soft shots over hazards to a short pin'],
])}

Lofts vary by maker, so check the number stamped on your own clubs.

## What is loft in golf?

Loft is the angle of the clubface relative to vertical. More loft launches the ball higher and shorter with more backspin. Less loft sends it lower and further. A driver is about 9 to 12 degrees, and a lob wedge can reach 60 degrees or more. The difference between the lofts in your bag is what gives you different distances.

## Pitching wedge degrees

The pitching wedge is the highest-lofted club in most iron sets. Modern sets use stronger lofts than older ones, so a pitching wedge in a new game-improvement set can sit near the bottom of the 44 to 48 degree range. That is why it pays to know the actual loft of your own pitching wedge before you add other wedges.

## Gap (approach) wedge loft

A gap wedge, also called an approach wedge, sits between the pitching wedge and sand wedge. If your pitching wedge is 46 degrees and your sand wedge is 56 degrees, there is a 10 degree gap and a big drop in distance between them. A gap wedge of about 50 to 52 degrees fills it.

## Sand wedge degrees

A sand wedge is usually 54 to 56 degrees, though sets range from 52 to 58 degrees. It is designed for bunker shots, where its sole helps the club glide through the sand, and it is also used for short pitches around the green.

## Lob wedge: 58, 60 and 62 degrees

A lob wedge is for high, soft shots, such as a ball landing on a green with no room to roll. It is harder to hit consistently, so many golfers carry a 58 or 60 degree wedge rather than a 62. Try before you commit: a lob wedge you cannot control costs strokes.

## How many wedges should you carry?

A common set-up is a pitching wedge, a gap wedge and a sand wedge, with a lob wedge added if you want one. Aim for about 4 to 6 degrees between wedges so each gives a different distance. Remember the 14-club limit in the Rules of Golf, so adding a wedge may mean leaving something else out. If you can, get fitted: a fitter can check your lofts, lie and bounce.

## Our golf wedge

We stock a ${pl('golf-wedge')} at ${price('golf-wedge')}. See our [golf wedges and putters](/shop/wedges-and-putters/), read about [what golf clubs you need](/blog/what-golf-clubs-do-you-need-full-set-explained/) and [how to choose an iron set](/blog/how-to-choose-an-iron-set/), or browse every [golf club set](/shop/complete-sets/). Questions? Call 0480 811 308.
`;

// ------------------------------------------------------------------ 9. putters
const putters = `
The best putters are the ones that suit your stroke: blade putters suit a straight-back-straight-through stroke, mallets suit an arcing stroke or help with alignment, and beginners usually do best with a forgiving mallet. This guide covers the types of golf putters, how to get fitted and what beginners should choose.

## The best putters: how to choose

${table(['Putter type', 'Shape', 'Suits', 'Main benefit'], [
  ['Blade', 'Slim, compact head', 'Straighter or lightly arcing strokes', 'Feel and feedback'],
  ['Mallet', 'Larger, deeper head', 'Arcing strokes and most beginners', 'Forgiveness and alignment'],
  ['High-MOI mallet', 'Wide head with weight at the edges', 'Anyone who mishits', 'Stability on off-centre hits'],
  ['Belly or long putter', 'Longer shaft', 'Players who want a different set-up', 'Stable base against the body'],
])}

## Types of golf putters

The two main types are the blade and the mallet. A blade putter is slim with a toe-hang, which means the toe of the putter droops when you balance the shaft. That suits a stroke that arcs. A mallet is larger and usually face-balanced, which suits a straighter stroke and helps keep the face square. Neck styles, such as plumber's neck or slant neck, change how the shaft joins the head and affect feel and toe-hang.

## Best beginner putters

For a beginner, forgiveness matters most. A mallet putter tolerates off-centre strikes and often has alignment lines that help you aim. Look for:

- A standard length that suits your height and posture.
- A comfortable grip you can hold lightly.
- A head shape you find easy to line up.

## Premium putters: are they worth it?

A more expensive putter can offer finer milling, better materials and more choice of shape, but it will not fix a poor stroke. Many golfers improve more by buying a putter that suits them and practising on a putting mat than by spending more on the club.

## Length, loft and lie

Most putters have a few degrees of loft, usually 3 to 4. The length should let you stand comfortably over the ball with your eyes roughly over the ball line. If you are unsure, a fitting session will check length, lie and loft against your stroke.

## Our putter

We stock a ${pl('golf-putter')} at ${price('golf-putter')}. Practice at home with a ${pl('golf-putting-mat')} at ${price('golf-putting-mat')}. See our [golf putters and wedges](/shop/wedges-and-putters/), our [complete golf club sets](/shop/complete-sets/) and our guide to [junior golf clubs](/blog/junior-golf-clubs-kids-golf-sets-by-age/) for children's putters. Call 0480 811 308 for help.
`;

// ------------------------------------------------------------------ 10. what clubs do you need
const clubsNeeded = `
What golf clubs do you need? The Rules of Golf allow a maximum of 14 clubs, but a typical full set has a driver, a fairway wood or hybrid, irons, wedges and a putter, and a beginner can start with fewer. This guide explains a full set of golf clubs, what each club does and whether you need all 14.

## A full set of golf clubs at a glance

${table(['Club', 'Typical number', 'What it does'], [
  ['Driver', '1', 'Longest club, for tee shots on long holes'],
  ['Fairway wood or hybrid', '1 to 3', 'Long shots from the fairway or rough'],
  ['Irons', '5 to 8', 'Approach shots; lower numbers go further, higher numbers go higher'],
  ['Wedges', '2 to 4', 'Short approach shots, chips and bunker shots'],
  ['Putter', '1', 'On the green'],
])}

## The 14-club limit

You can carry up to 14 clubs in a round. Most full sets use some or all of that allowance. Beginners do not need 14: fewer clubs means less to learn, and a set of 10 to 12 is plenty to start.

## Driver and woods

The driver is for distance off the tee. A fairway wood is smaller with more loft, so it is easier to hit from the grass. A hybrid blends an iron and a wood and is often easier to hit than a long iron. Many beginners carry a driver and one fairway wood or hybrid. See [how to choose a driver](/blog/how-to-choose-a-golf-driver/).

## Irons: what each one does

Irons are numbered. A lower number, such as a 5 iron, has less loft and goes further. A higher number, such as a 9 iron, has more loft and goes higher and shorter. Most players use irons from about 5 to 9 plus a pitching wedge. See [how to choose an iron set](/blog/how-to-choose-an-iron-set/).

## Wedges and putter

Wedges handle short shots around the green: pitching, gap, sand and lob. The putter is the club you will use most. Our guides cover [wedge degrees](/blog/golf-wedge-degrees-loft-guide/) and [the best putters](/blog/best-golf-putters-types-guide-australia/).

## Do beginners need a full set?

No. A complete starter set covers the essentials. Our range includes:

${table(['Set', 'Price'], [
  [pl('junior-golf-club-set'), price('junior-golf-club-set')],
  [pl('beginner-complete-golf-club-set-12-piece'), price('beginner-complete-golf-club-set-12-piece')],
  [pl('ladies-complete-golf-club-set'), price('ladies-complete-golf-club-set')],
])}

Browse every [golf club set](/shop/complete-sets/), read our guide to the [best golf club sets for beginners](/blog/best-golf-club-sets-for-beginners-australia/), or see all [golf clubs for sale](/shop/golf-clubs/). Call 0480 811 308 to talk it through.
`;

// ------------------------------------------------------------------ 11. beginner sets
const beginner = `
A good golf club set for beginners is a complete package of clubs at a fair price, and ours starts at ${price('beginner-complete-golf-club-set-12-piece')} for a 12-piece adult set (check each listing for exactly what is included). This guide explains what a beginner golf club set should include, how budget, starter and premium sets differ and when to upgrade.

## What a beginner set should include

- A driver and a fairway wood or hybrid for distance.
- A set of irons plus a pitching wedge.
- A sand wedge for bunkers and short shots.
- A putter.
- A bag to carry them, if it is part of the package. If it is not, our [golf bags](/shop/bags/) start from ${price('lightweight-golf-stand-bag')}.

Fewer, well-chosen clubs are better than a long list of clubs you cannot hit.

## Budget, starter and premium sets

A budget set keeps the price low with simpler materials. A starter set is a complete package aimed at new players. A premium set uses better materials and offers more choice of shaft and head. For most beginners a complete starter set is the right choice, because your swing will change a lot in the first year and a premium set is wasted until it settles.

## Men, women and junior sets

Choose a set sized to the golfer. Women's clubs are usually lighter and shorter with a more flexible shaft, and junior clubs are sized by height. Read our guides to [ladies golf clubs](/blog/ladies-golf-clubs-womens-golf-sets-guide/) and [junior golf clubs](/blog/junior-golf-clubs-kids-golf-sets-by-age/).

## Our beginner, ladies and junior sets

${table(['Set', 'Price'], [
  [pl('beginner-complete-golf-club-set-12-piece'), price('beginner-complete-golf-club-set-12-piece')],
  [pl('ladies-complete-golf-club-set'), price('ladies-complete-golf-club-set')],
  [pl('junior-golf-club-set'), price('junior-golf-club-set')],
])}

See every [golf club set for sale](/shop/complete-sets/).

## When to upgrade from a starter set

Replace individual clubs when you are hitting consistently and can feel what is holding you back. A driver and a putter are the usual first upgrades. A professional fitting can show what actually helps your swing.

## Buying checklist

1. The right size and shaft flex for the golfer.
2. What is in the box: check whether a bag and a putter are included.
3. Delivery and returns terms. See our [returns](/returns/) and [shipping](/shipping/) pages.
4. Spend the difference on lessons rather than premium clubs.

For a short guide to what the clubs do, see [what golf clubs you need](/blog/what-golf-clubs-do-you-need-full-set-explained/). Call 0480 811 308 for help.
`;

// ------------------------------------------------------------------ 12. junior golf clubs
const junior = `
A kids golf club set should be sized by your child's height, not just their age, and our Junior Golf Club Set is ${price('junior-golf-club-set')}. Choosing the right junior golf clubs helps a child hit the ball well, enjoy the game and avoid bad habits. This guide explains how to size kids golf clubs and what to look for in a junior set.

## Kids golf club set: what to buy

Junior sets are made in sizes for different heights. A set that is too long makes the swing awkward, and a set that is too short makes the child hunch over the ball. Use the maker's size chart, measure your child standing straight, and choose the nearest size.

## Junior clubs by age and height

Children grow quickly, so height beats age as a guide. A child who is tall for their age may fit the next size up. Re-check the fit every year: growing juniors may need new clubs every couple of years.

## What is in a junior set?

A junior set usually has a driver or wood, one or more irons, a wedge and a putter, often with a lightweight bag. Our ${pl('junior-golf-club-set')} is ${price('junior-golf-club-set')}. See it with our other [golf club sets](/shop/complete-sets/).

## Junior putter and wedge

A putter is the club a child will use most, so its length and weight matter. A childrens putter and a junior putter let a child stand comfortably over the ball. Read our guide to the [best putters](/blog/best-golf-putters-types-guide-australia/) for the basics.

## Teen golf clubs

When a teenager grows, the next step is a short adult set or a youth set sized to their height. Choose by height and swing speed, and have them hold a few clubs before you buy.

## Buying checklist

1. Measure your child's height and check it against the size chart.
2. Check the weight: it should be light enough to swing freely.
3. Ask us about sizing before you order if you are unsure.
4. Look at the [complete golf club sets](/shop/complete-sets/) or all [golf clubs](/shop/golf-clubs/).

Call 0480 811 308 and we can help match a set to your child.
`;

// ------------------------------------------------------------------ 13. ladies golf clubs
const ladies = `
Ladies golf clubs are lighter, shorter and have a more flexible shaft than standard men's clubs, which helps players with a slower swing speed get the ball airborne. This guide to ladies golf clubs explains what is different, how to choose a golf set for women and what our ${pl('ladies-complete-golf-club-set')} offers at ${price('ladies-complete-golf-club-set')}.

## Ladies golf clubs: what makes them different

${table(['', "Men's clubs", "Ladies' clubs"], [
  ['Shaft flex', 'Regular or stiff', 'More flexible (ladies flex)'],
  ['Length', 'Longer', 'Shorter'],
  ['Weight', 'Heavier', 'Lighter'],
  ['Loft', 'Standard', 'Often slightly higher on long clubs, for easier launch'],
])}

These are typical differences. Always check the specifications of the set you are buying.

## Shaft flex and swing speed

Shaft flex should match your swing speed. A flexible shaft helps a slower swing load the club and launch the ball. A shaft that is too stiff feels hard to swing and can lead to low, short shots. A fitting session or a simple test with a few clubs shows what suits you.

## Length and fit

Club length should suit your height and posture. Shorter players often need shorter clubs, and taller players may need standard or longer clubs. If you are unsure, ask us before you order.

## Choosing a ladies golf club set

Look for a set that includes everything you need to play: driver, fairway wood or hybrid, irons, wedge, putter and a bag. Complete sets are better value than buying clubs one at a time while you learn.

## Our Ladies' Complete Golf Club Set

The ${pl('ladies-complete-golf-club-set')} is ${price('ladies-complete-golf-club-set')}. See it among our [golf club sets](/shop/complete-sets/). For other women's golf gear, read our guide to [choosing a golf bag](/blog/golf-bag-and-cart-how-to-choose-stand-cart-carry/), and for the basics see [what golf clubs you need](/blog/what-golf-clubs-do-you-need-full-set-explained/). Call 0480 811 308 with questions.
`;

// ------------------------------------------------------------------ 14. golf bag and cart
const bag = `
A cart bag suits a golf buggy or trolley because it has a flat top, full-length dividers and a stable base, while a stand bag has legs and a lighter build for carrying. This guide to the golf bag and cart combination explains stand, cart and carry bags and how to choose a golf club bag for a buggy.

## Golf bag and cart: which bag suits which setup

${table(['Bag', 'Best for', 'Main benefit'], [
  ['Cart bag', 'Golf buggy, trolley or cart', 'Flat top and dividers keep clubs organised'],
  ['Stand bag', 'Carrying or a light trolley', 'Legs hold the bag up on the course'],
  ['Carry bag', 'Short rounds and the range', 'Lightest option'],
])}

## Cart bags for buggies and trolleys

A cart bag is built to sit on a buggy. A flat top and full-length dividers keep the clubs from tangling and make them easy to pull out. We stock a ${pl('golf-cart-bag-14-way-divider')} at ${price('golf-cart-bag-14-way-divider')} and a ${pl('big-max-dri-lite-premium-cart-bag')} at ${price('big-max-dri-lite-premium-cart-bag')}.

## Stand bags

A stand bag has legs that flip out so it stands up on the course, and it is lighter to carry. We stock a ${pl('lightweight-golf-stand-bag')} at ${price('lightweight-golf-stand-bag')}. You can put a stand bag on a buggy, but its legs and shape can sit awkwardly on the frame.

## Carry bags

A carry bag is the lightest option, with no stand and few pockets. It suits short rounds, practice sessions and a quick nine holes.

## Men's, women's and black golf bags

Bags come in men's and women's styles with different colours and trim. Black is a popular, practical colour that hides dirt. The most important thing is that the bag fits your buggy and has enough pockets for your gear.

## Bag accessories for a buggy

Protect your gear and your buggy with a ${pl('golf-buggy-travel-storage-cover-and-wheel-bags')} at ${price('golf-buggy-travel-storage-cover-and-wheel-bags')} or a ${pl('sand-wet-weather-tyres-and-bag-rain-cover')} at ${price('sand-wet-weather-tyres-and-bag-rain-cover')}. See our [golf bags](/shop/bags/), [covers and wheel bags](/shop/covers-and-bags/) and [golf buggy accessories](/shop/accessories/). If you are shopping for a buggy as well, see our [push golf buggies](/shop/push-pull-golf-buggies/). Call 0480 811 308 for help.
`;

// ------------------------------------------------------------------ 15. rangefinder vs GPS watch
const range = `
The best rated golf watches show distances to the front, middle and back of the green hands-free, while a laser rangefinder measures the exact distance to the flag; here is how to choose between them. This guide compares a golf rangefinder with a GPS watch, covers the best golf rangefinders and golf watches we stock and explains which suits you.

## Golf rangefinder vs GPS watch at a glance

${table(['', 'Laser rangefinder', 'GPS watch'], [
  ['How it measures', 'Laser to a target such as the flag', 'GPS positioning on the course'],
  ['What you get', 'Exact distance to what you aim at', 'Front, middle and back of the green and hazards'],
  ['Needs line of sight', 'Yes', 'No'],
  ['Hands-free', 'No: you hold and aim it', 'Yes: it is on your wrist'],
  ['Our range from', `${price('precision-pro-nx7-golf-rangefinder')}`, `${price('shot-scope-g5-gps-golf-watch')}`],
])}

## How a laser rangefinder works

You aim the rangefinder at the flag or another target and it shows the distance. It is very precise for anything you can see, which makes it useful for hazards and flag positions. It does not work well if the target is hidden or out of sight.

## How a GPS golf watch works

A GPS watch knows where you are on the course and shows distances to the front, middle and back of the green without you aiming at anything. It also shows hazards. It is quick to use because it is always on your wrist.

## Which suits you?

- **New golfers:** a GPS watch is quick and simple.
- **Regular golfers:** either works; choose how you like to play.
- **Competitive golfers:** a rangefinder gives precise distances to targets.
- **Seniors and anyone who prefers hands-free:** a watch.

## What we stock

${table(['Product', 'Type', 'Price'], [
  [pl('precision-pro-nx7-golf-rangefinder'), 'Laser rangefinder', price('precision-pro-nx7-golf-rangefinder')],
  [pl('bushnell-tour-v5-golf-rangefinder'), 'Laser rangefinder', price('bushnell-tour-v5-golf-rangefinder')],
  [pl('bushnell-pro-x3-golf-rangefinder'), 'Laser rangefinder', price('bushnell-pro-x3-golf-rangefinder')],
  [pl('shot-scope-g5-gps-golf-watch'), 'GPS watch', price('shot-scope-g5-gps-golf-watch')],
  [pl('garmin-approach-s12-gps-golf-watch'), 'GPS watch', price('garmin-approach-s12-gps-golf-watch')],
  [pl('garmin-approach-s42-gps-golf-watch'), 'GPS watch', price('garmin-approach-s42-gps-golf-watch')],
])}

Browse our [golf rangefinders and GPS watches](/shop/rangefinders-gps/), or see the brands: [Bushnell](/brands/bushnell/), [Garmin](/brands/garmin/) and [Shot Scope](/brands/shot-scope/).

## Tournament and club rules

Distance-measuring devices are widely allowed, but devices that measure slope are often not allowed in competitions. Check your club's or event's local rules before you play a tournament round. Call 0480 811 308 and tell us how you play, and we will help you choose.
`;

// ------------------------------------------------------------------ 16. driver
const driver = `
To choose a driver golf club, match the loft (usually 9 to 12 degrees), shaft flex and length to your swing speed and height: slower swings need more loft and a softer shaft. This guide explains how to choose a golf driver, the difference between a driver and a fairway wood and what to look for as a beginner or improver.

## Choosing a golf driver at a glance

${table(['Swing', 'Loft to consider', 'Shaft flex to consider'], [
  ['Slower swing, beginners, seniors', '11 to 12 degrees', 'More flexible'],
  ['Average swing', '10 to 10.5 degrees', 'Regular'],
  ['Faster swing', '8.5 to 9.5 degrees', 'Stiff'],
])}

Use this as a guide only: a fitting session checks your actual numbers.

## Loft: 9, 10.5 or 12 degrees?

More loft helps the ball launch higher and reduces sidespin, which suits slower swings and golfers who slice. Less loft suits faster swings that launch the ball high already. If you are unsure, 10.5 degrees suits most golfers, and many beginners do better with 12.

## Shaft flex and length

Shaft flex should match your swing speed. A shaft that is too stiff feels hard to load and makes the ball go low; one that is too flexible can feel unstable. Length affects control as well as distance, so a driver a little shorter than standard can help accuracy.

## Head size and forgiveness

Driver heads are limited to 460cc under the Rules of Golf equipment standards, and most modern drivers are at or near that limit. A larger head is more forgiving on off-centre hits, which helps beginners and mid-handicappers.

## Driver vs fairway wood vs hybrid

A driver is for the tee on long holes. A fairway wood has a smaller head and more loft, so it is easier to hit from the fairway and works for second shots on long holes. A hybrid replaces a long iron and is often easier to hit. See [what golf clubs you need](/blog/what-golf-clubs-do-you-need-full-set-explained/).

## Our driver

We stock a ${pl('golf-driver')} at ${price('golf-driver')}. See our [golf drivers and iron sets](/shop/woods-and-irons/) and our guide to [choosing an iron set](/blog/how-to-choose-an-iron-set/). Call 0480 811 308 if you want help.
`;

// ------------------------------------------------------------------ 17. iron set
const iron = `
A set of irons usually runs from a 5 or 6 iron through to a pitching wedge, and beginners and mid-handicappers do best with forgiving cavity-back irons. This guide explains how to choose a set of irons: what is in a set, steel or graphite shafts, cavity back versus blade irons and what to spend.

## Choosing a set of irons at a glance

${table(['Iron type', 'Suits', 'Main benefit'], [
  ['Game-improvement (cavity back)', 'Beginners and mid-handicappers', 'Forgiveness on off-centre hits'],
  ['Players distance', 'Improvers', 'A balance of forgiveness and feel'],
  ['Blades', 'Skilled players', 'Feel and shot-shaping control'],
])}

## What is in an iron set?

A standard set has 7 or 8 irons, usually 4 or 5 iron through to the pitching wedge. Lower numbers have less loft and go further; higher numbers have more loft and go higher. Beginners often start with a 6 iron to pitching wedge set plus a hybrid for longer shots. Our guide to [wedge degrees](/blog/golf-wedge-degrees-loft-guide/) explains the lofts at the short end of the set.

## Steel or graphite shafts?

Steel shafts are heavier and more common. Graphite shafts are lighter, which can help slower swings generate speed. Weight, feel and swing speed decide which suits you.

## Cavity back vs blade

A cavity-back iron has weight pushed to the edges of the head, which makes off-centre hits straighter and longer. Most modern game-improvement iron sets use this design today. A blade is slim and offers feel and control but punishes mishits, so it suits skilled players.

## How much should you spend?

Spend what suits your game. A beginner is usually better off with a complete starter set. If you want a stand-alone set of irons, our ${pl('mid-range-golf-iron-set')} is ${price('mid-range-golf-iron-set')}.

## Fitting basics

Iron length, lie angle and shaft flex all affect how the ball flies. A fitting session can check them against your swing. Even a few small changes can make a set much more accurate.

## Where to go next

See our [golf drivers and iron sets](/shop/woods-and-irons/), read about [how to choose a golf driver](/blog/how-to-choose-a-golf-driver/), and see [what golf clubs you need](/blog/what-golf-clubs-do-you-need-full-set-explained/). Call 0480 811 308 to talk through a set.
`;

export const GUIDES_GOLF = [
  mk({ slug: 'golf-wedge-degrees-loft-guide', title: 'Degrees for a Pitching Wedge (and Sand, Gap & Lob): Loft Guide', titleTag: 'Degrees for Pitching Wedge, Sand & Lob: Loft Guide',
    excerpt: 'Degrees for a pitching wedge, gap, sand and lob wedge explained. See typical loft, distances and how to choose the right wedge for your bag.',
    metaDescription: 'Degrees for a pitching wedge, gap, sand and lob wedge explained. See typical loft, distances and how to choose the right wedge for your bag.',
    category: 'Golf Gear', image: img('golf-wedge'), imageAlt: 'Golf wedge degrees: pitching, sand and lob wedge loft guide',
    keyword: 'degrees for pitching wedge', faqIds: ['wedge-sand', 'wedge-pitching', 'loft-def'], toc: true, content: wedge }),
  mk({ slug: 'best-golf-putters-types-guide-australia', title: 'Best Golf Putters in Australia: Types, Fitting and Beginner Picks', titleTag: 'Best Putters in Australia: Types & Beginner Picks',
    excerpt: 'The best putters explained: blade, mallet and neck styles, how to get fitted, and what beginners should choose. Buy a golf putter online in Australia.',
    metaDescription: 'The best putters explained: blade, mallet and neck styles, how to get fitted, and what beginners should choose. Buy a golf putter online in Australia.',
    category: 'Golf Gear', image: img('golf-putter'), imageAlt: 'Best putters: golf putter, blade and mallet styles',
    keyword: 'best putters', faqIds: ['putter-beginner', 'putter-blade-mallet'], toc: true, content: putters }),
  mk({ slug: 'what-golf-clubs-do-you-need-full-set-explained', title: 'What Golf Clubs Do You Need? A Full Set Explained', titleTag: 'What Golf Clubs Do You Need? Full Set Explained',
    excerpt: 'What golf clubs do you need? A full set of golf clubs explained: driver, woods, irons, wedges and putter, the 14-club limit and a beginner set from $699.',
    metaDescription: 'What golf clubs do you need? A full set of golf clubs explained: driver, woods, irons, wedges and putter, the 14-club limit and a beginner set from $699.',
    category: 'Golf Gear', image: img('beginner-complete-golf-club-set-12-piece'), imageAlt: 'What golf clubs do you need: beginner complete golf club set, 12-piece',
    keyword: 'what golf clubs do you need', faqIds: ['clubs-14', 'clubs-needed'], toc: true, content: clubsNeeded }),
  mk({ slug: 'best-golf-club-sets-for-beginners-australia', title: 'Best Golf Club Sets for Beginners in Australia', titleTag: 'Best Golf Club Set for Beginners in Australia',
    excerpt: 'Best golf club set for beginners in Australia: what to look for in a starter or budget set, what is included and where to buy a complete set online.',
    metaDescription: 'Best golf club set for beginners in Australia: what to look for in a starter or budget set, what is included and where to buy a complete set online.',
    category: 'Golf Gear', image: img('beginner-complete-golf-club-set-12-piece'), imageAlt: 'Golf club set for beginners: complete 12-piece starter set',
    keyword: 'golf club set for beginners', faqIds: ['set-best-beginner', 'set-spend'], toc: true, content: beginner }),
  mk({ slug: 'junior-golf-clubs-kids-golf-sets-by-age', title: 'Junior Golf Clubs and Kids Golf Sets: How to Size by Age', titleTag: 'Kids Golf Club Set: Junior Clubs Sized by Age',
    excerpt: 'Kids golf club set guide: how to choose junior golf clubs by height and age, what to look for in a set and a junior putter. Junior set from $249.',
    metaDescription: 'Kids golf club set guide: how to choose junior golf clubs by height and age, what to look for in a set and a junior putter. Junior set from $249.',
    category: 'Golf Gear', image: img('junior-golf-club-set'), imageAlt: 'Kids golf club set: junior golf club set',
    keyword: 'kids golf club set', faqIds: ['junior-size', 'junior-set'], toc: true, content: junior }),
  mk({ slug: 'ladies-golf-clubs-womens-golf-sets-guide', title: "Ladies Golf Clubs and Women's Golf Sets: What to Look For", titleTag: "Ladies Golf Clubs & Women's Golf Sets Guide",
    excerpt: "Ladies golf clubs and women's golf sets: shaft flex, length, weight and loft explained, with a complete ladies set from $799. Find the right fit.",
    metaDescription: "Ladies golf clubs and women's golf sets: shaft flex, length, weight and loft explained, with a complete ladies set from $799. Find the right fit.",
    category: 'Golf Gear', image: img('ladies-complete-golf-club-set'), imageAlt: "Ladies golf clubs: ladies' complete golf club set",
    keyword: 'ladies golf clubs', faqIds: ['ladies-diff', 'ladies-set'], toc: true, content: ladies }),
  mk({ slug: 'golf-bag-and-cart-how-to-choose-stand-cart-carry', title: 'Golf Bag and Cart: How to Choose a Stand, Cart or Carry Bag', titleTag: 'Golf Bag and Cart: Stand vs Cart Bag Guide',
    excerpt: 'Golf bag and cart guide: stand, cart and carry bags compared, plus the best bag for a golf buggy or trolley. Bags from $215 at The Buggy Shop.',
    metaDescription: 'Golf bag and cart guide: stand, cart and carry bags compared, plus the best bag for a golf buggy or trolley. Bags from $215 at The Buggy Shop.',
    category: 'Golf Gear', image: img('golf-cart-bag-14-way-divider'), imageAlt: 'Golf bag and cart: 14-way divider cart bag',
    keyword: 'golf bag and cart', faqIds: ['bag-for-buggy', 'bag-stand-on-buggy'], toc: true, content: bag }),
  mk({ slug: 'golf-rangefinder-vs-gps-watch-which-to-buy', title: 'Golf Rangefinder vs GPS Watch: Which Should You Buy?', titleTag: 'Best Rated Golf Watches vs Rangefinders in Australia',
    excerpt: 'Best rated golf watches vs golf rangefinders: how each works, accuracy, battery, price and who should buy which. Rangefinders from $479, watches from $239.',
    metaDescription: 'Best rated golf watches vs golf rangefinders: how each works, accuracy, battery, price and who should buy which. Rangefinders from $479, watches from $239.',
    category: 'Golf Gear', image: img('bushnell-tour-v5-golf-rangefinder'), imageAlt: 'Golf rangefinder vs GPS watch: Bushnell Tour V5 rangefinder',
    keyword: 'best rated golf watches', faqIds: ['rangefinder-vs-watch', 'rangefinder-tournament'], toc: true, content: range }),
  mk({ slug: 'how-to-choose-a-golf-driver', title: 'How to Choose a Golf Driver: Loft, Shaft and Head Size', titleTag: 'How to Choose a Driver Golf Club: Loft & Shaft Guide',
    excerpt: 'How to choose a golf driver: loft, shaft flex, head size and fit explained for beginners and improvers, with a driver from $449 in Australia.',
    metaDescription: 'How to choose a golf driver: loft, shaft flex, head size and fit explained for beginners and improvers, with a driver from $449 in Australia.',
    category: 'Golf Gear', image: img('golf-driver'), imageAlt: 'How to choose a golf driver: golf driver',
    keyword: 'driver golf club', faqIds: ['driver-loft', 'driver-vs-wood'], toc: true, content: driver }),
  mk({ slug: 'how-to-choose-an-iron-set', title: 'How to Choose an Iron Set: Cavity Back, Shafts and Fit', titleTag: 'How to Choose a Set of Irons: Beginner & Improver Guide',
    excerpt: 'How to choose a set of irons: game-improvement vs blades, steel vs graphite shafts, what is in an iron set and what to pay. Iron sets in Australia.',
    metaDescription: 'How to choose a set of irons: game-improvement vs blades, steel vs graphite shafts, what is in an iron set and what to pay. Iron sets in Australia.',
    category: 'Golf Gear', image: img('mid-range-golf-iron-set'), imageAlt: 'How to choose a set of irons: mid-range golf iron set',
    keyword: 'set of irons', faqIds: ['iron-how-many', 'iron-cavity'], toc: true, content: iron }),
];
