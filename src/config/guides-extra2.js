// src/config/guides-extra2.js
// Second round of extra sections: scenario guides, plain-language glossaries and care notes. Definitions are general golf and
// buggy knowledge; prices come from the product data.
import { F, $, pl, price, table } from './post-kit.js';

export const EXTRA2 = {
  'ladies-golf-clubs-womens-golf-sets-guide': `
## Which ladies set suits you?

${table(['If you...', 'Look for', 'Why'], [
  ['Are new to golf', 'A complete set with a bag', 'One purchase covers every club you need'],
  ['Are returning after a long break', 'Lighter clubs with a flexible shaft', 'Easier to swing while you rebuild your game'],
  ['Are tall', 'Longer clubs, or ask about length options', 'Standard ladies length can leave you hunched'],
  ['Are shorter than average', 'Standard or shorter ladies length', 'A club that is too long is hard to control'],
  ['Want to improve fast', 'A set plus lessons', 'Good coaching beats new equipment'],
])}

## Glossary: ladies club terms

- **Flex:** how much the shaft bends in the swing. Ladies flex is the most flexible standard option.
- **Loft:** the angle of the clubface, which sets launch height. See our [wedge degrees guide](/blog/golf-wedge-degrees-loft-guide/).
- **Lie angle:** the angle between the shaft and the ground when the sole sits flat. The wrong lie angle can send shots left or right.
- **Swing weight:** how heavy the club feels when you swing it, which is different from its total weight.
- **MOI (moment of inertia):** how resistant the head is to twisting on off-centre hits. Higher is more forgiving.

## Looking after your clubs

Wipe the heads and grooves after each round, dry the clubs before putting them away and keep them in a bag cover or head covers. Store them somewhere dry and out of a hot car. Check the grips for wear every year or two, since slippery grips make you squeeze harder and lose feel.
`,

  'junior-golf-clubs-kids-golf-sets-by-age': `
## Which junior setup suits your child?

${table(['If your child...', 'Choose', 'Why'], [
  ['Is trying golf for the first time', 'A complete junior set', 'Everything in one purchase, at the lowest price: ' + price('junior-golf-club-set')],
  ['Is between two sizes', 'The smaller size for now', 'A shorter, lighter club is easier to swing well'],
  ['Is growing fast', 'A set sized for today', 'Over-sized clubs encourage bad habits'],
  ['Wants to play a full course', 'Check lengths against height again', 'Courses reward a repeatable swing'],
])}

## When to resize

- The club looks too short at address and your child is bent forward unnaturally.
- Swings feel rushed or the ball goes low and short.
- They have grown noticeably since the last check.
- Hits are consistently off the toe or heel of the club.

## Glossary: junior club terms

- **Junior flex:** a flexible shaft made for slower swing speeds.
- **Length:** the distance from the grip end to the sole. Children need shorter lengths than adults.
- **Lie angle:** the angle between the shaft and the ground when the club sits flat.
- **Grip size:** smaller hands need thinner grips for control.

## Cost over time

A junior set is an investment that lasts until the next growth spurt. Compare ${price('junior-golf-club-set')} for a complete set with the cost of buying clubs one at a time. For older players, see our [beginner club sets](/blog/best-golf-club-sets-for-beginners-australia/).
`,

  'how-to-choose-a-golf-driver': `
## Which driver suits you?

${table(['If you...', 'Look for', 'Why'], [
  ['Are a beginner', 'Higher loft and a large, forgiving head', 'Easier to launch and straighter on mishits'],
  ['Slice the ball', 'More loft and a draw-biased setting', 'Helps reduce sidespin'],
  ['Hit it high already', 'Lower loft', 'Keeps flight lower and further'],
  ['Are a senior golfer', 'Lighter weight and a flexible shaft', 'Easier to swing at slower speeds'],
  ['Are on a budget', 'A last-generation driver', 'Most of the performance for less'],
])}

## Glossary: driver terms

- **Loft:** the angle of the face, usually 8 to 12 degrees on a driver.
- **MOI:** resistance to twisting. A higher MOI is more forgiving.
- **Launch and spin:** how high the ball goes and how fast it spins. Too much spin costs distance; too little can make the ball drop.
- **Face angle:** whether the face points left, right or square to the target at address.
- **Shaft kick-point:** where the shaft bends most, which affects launch.

## Tee height basics

Tee the ball so that about half of it sits above the top of the driver's face. Too low produces pop-ups, too high can produce low, weak hits. Experiment on the range until you find the height that gives you a solid strike.

## Looking after a driver

Use a head cover, wipe the face after use and check the grip. Check the head and shaft for cracks or loose parts, and avoid hitting hard surfaces. See our [driver and iron range](/shop/woods-and-irons/).
`,

  'how-to-choose-an-iron-set': `
## Which iron set suits you?

${table(['If you...', 'Look for', 'Why'], [
  ['Are a beginner', 'Cavity-back irons with a wide sole', 'Forgiving and easier to get airborne'],
  ['Have a mid handicap', 'Players distance irons', 'A balance of forgiveness and feel'],
  ['Have a slow swing speed', 'Graphite shafts', 'Lighter, so easier to generate speed'],
  ['Have a fast swing speed', 'Steel shafts, stiff flex', 'More control at speed'],
  ['Struggle with long irons', 'A set from 6 iron with a hybrid', 'Hybrids are easier to hit'],
])}

## Glossary: iron terms

- **Cavity back:** a head with weight moved to the edge for forgiveness.
- **Lie angle:** the angle of the shaft to the ground at impact. Too upright or too flat sends the ball offline.
- **Offset:** how far the hosel sits ahead of the face. More offset helps square the face.
- **Sole width:** wider soles glide through turf and are more forgiving.
- **Combo set:** a set that mixes two designs, such as game-improvement long irons and players-distance short irons.

## Care and grooves

Keep the grooves clean with a brush and water. Clean grooves grip the ball and help control spin. Dry the clubs after a wet round, and use a head cover or a bag with dividers so the heads do not clash. Our ${pl('mid-range-golf-iron-set')} is ${price('mid-range-golf-iron-set')}.
`,

  'golf-bag-and-cart-how-to-choose-stand-cart-carry': `
## Which bag suits how you play?

${table(['If you...', 'Choose', 'Why'], [
  ['Use a golf buggy or trolley every round', 'Cart bag', 'Flat top and dividers; stable on the frame'],
  ['Carry your clubs most rounds', 'Stand bag', 'Lighter, with legs and carry straps'],
  ['Play a quick nine or practise', 'Carry bag', 'Lightest, simplest option'],
  ['Hire a cart sometimes', 'Stand bag with a wide base', 'Works on a cart or on your back'],
])}

## Looking after your bag

Empty it after wet rounds and let it dry in a ventilated space. Wipe dirt from the base and pockets, and keep zips lubricated with a dry silicone spray. A rain cover for the bag, such as the ${pl('sand-wet-weather-tyres-and-bag-rain-cover')} at ${price('sand-wet-weather-tyres-and-bag-rain-cover')}, keeps clubs and grips dry in wet weather.

## Travelling with a bag

A soft travel bag such as the ${pl('soft-golf-travel-bag')} at ${price('soft-golf-travel-bag')} protects clubs on the road and on flights. Check the airline's baggage rules for size, weight and fees before you travel, and pad the club heads.
`,

  'best-golf-club-sets-for-beginners-australia': `
## Which beginner set suits you?

${table(['If you...', 'Choose', 'Price'], [
  ['Are an adult beginner', pl('beginner-complete-golf-club-set-12-piece'), price('beginner-complete-golf-club-set-12-piece')],
  ['Are a woman new to the game', pl('ladies-complete-golf-club-set'), price('ladies-complete-golf-club-set')],
  ['Are buying for a child', pl('junior-golf-club-set'), price('junior-golf-club-set')],
])}

## Common beginner mistakes

- Buying clubs sized for someone else.
- Choosing a stiff shaft because it sounds better.
- Buying a premium set before the swing has settled.
- Skipping lessons and practising bad habits.
- Carrying too many clubs.

## Glossary: beginner set terms

- **Piece:** one item in the package, such as a club or a bag.
- **Hybrid:** a club that mixes features of an iron and a wood.
- **Flex:** how much the shaft bends. Regular is the most common for adults.
- **Loft:** the angle of the clubface. See our [wedge degrees guide](/blog/golf-wedge-degrees-loft-guide/).
`,

  'best-golf-putters-types-guide-australia': `
## Which putter suits you?

${table(['If you...', 'Choose', 'Why'], [
  ['Are a beginner', 'A mallet with alignment lines', 'Forgiving and easy to line up'],
  ['Have a strongly arcing stroke', 'A blade or toe-hang putter', 'The toe swings through naturally'],
  ['Have a straighter stroke', 'A face-balanced putter', 'Stays square through the stroke'],
  ['Miss a lot on the toe or heel', 'A high-MOI mallet', 'Stable on off-centre hits'],
])}

## Glossary: putter terms

- **MOI:** resistance to twisting. A higher MOI is more forgiving.
- **Toe hang:** how much the toe of the putter droops when you balance the shaft on a finger.
- **Face-balanced:** the face points straight up when balanced.
- **Offset:** the shaft sits ahead of the face, which can help you see the ball line.
- **Lie angle:** the angle between the shaft and the ground when the sole sits flat.
`,

  'what-golf-clubs-do-you-need-full-set-explained': `
## Which set-up suits how you play?

${table(['If you...', 'Carry', 'Why'], [
  ['Walk and carry your bag', '10 to 12 clubs', 'A lighter bag is easier on your back'],
  ['Use a buggy or cart', 'Up to 14 clubs', 'The buggy carries the weight'],
  ['Are a beginner', 'A starter set of 10 to 12', 'Fewer decisions on the course'],
  ['Play competitions', 'Up to 14, chosen for your gaps', 'Fill the distance gaps in your game'],
])}

## Glossary: club terms

- **Wood:** a larger-headed club for distance. Modern woods are made of metal.
- **Hybrid:** a cross between an iron and a wood.
- **Iron:** a numbered club used for approach shots.
- **Wedge:** a high-lofted iron for short shots.
- **Putter:** the club used on the green.
- **Loft:** the angle of the clubface that sets launch height.
`,

  'golf-rangefinder-vs-gps-watch-which-to-buy': `
## Which device suits how you play?

${table(['If you...', 'Choose', 'Why'], [
  ['Want something quick and simple', 'GPS watch', 'Always on your wrist'],
  ['Want exact distance to the flag', 'Laser rangefinder', 'Measures the flag directly'],
  ['Walk and carry your bag', 'GPS watch', 'Light and no hands needed'],
  ['Play a course you know well', 'Either', 'Pick on price and preference'],
  ['Want to track shots as well as distance', 'GPS watch', 'Many watches record rounds'],
])}

## Glossary: distance device terms

- **Laser rangefinder:** measures distance to a target using a laser.
- **GPS watch:** measures your position on the course by satellite.
- **Flag lock:** a feature that confirms you are measuring to the flag.
- **Slope:** a feature that adjusts distance for elevation. Often not allowed in competitions.
- **Front, middle, back:** distances to the green's edges and centre.
`,

  'kids-off-road-buggy-buying-guide-electric-vs-petrol': `
## Which kids buggy suits your child and property?

${table(['If...', 'Look at', 'Why'], [
  ['Your child is young and the area is small', 'An electric kids buggy with a speed limiter', 'Quieter and easier to control'],
  ['Your child is older and you have more space', 'A petrol kids buggy', 'More power and range'],
  ['You want a twin-seat buggy', 'The Crossfire twin-seat petrol', 'Room for a sibling or parent'],
  ['You want something for a teenager', 'The 208cc teen buggy', 'More engine for older riders'],
])}

## Glossary: kids buggy terms

- **cc:** engine size. Bigger numbers mean more power.
- **4-stroke:** a common petrol engine type that is generally quieter and cleaner than a 2-stroke.
- **Brushless motor:** an electric motor with no brushes to wear out.
- **Kill switch:** a switch that cuts the motor, sometimes by remote.
- **Throttle limiter:** a device that caps the throttle so a new rider cannot go too fast.
`,

  'golf-buggy-repairs-servicing-guide-australia': `
## Glossary: buggy parts

- **Controller:** the electronics that manage power from the battery to the motor.
- **Motor and gearbox:** the drive that turns the wheels.
- **Strut:** a support part that holds the bag in place on some push buggies.
- **Battery management system (BMS):** the electronics in a lithium pack that protect it.
- **Bearings:** the parts that let a wheel spin freely.

## Seasonal care

In summer, avoid leaving a buggy or its battery in a hot car or boot. In wet seasons, dry the buggy after use and keep connectors clean. After sandy or dusty rounds, brush off the wheels and fold mechanism. Store the buggy somewhere dry between rounds.
`,

  'golf-wedge-degrees-loft-guide': `
## Which wedge should you add first?

${table(['If your...', 'Add', 'Why'], [
  ['Set has only a pitching wedge', 'A sand wedge', 'Bunkers and short shots need more loft'],
  ['Pitching wedge is under 46 degrees and you have a sand wedge', 'A gap wedge', 'Fills the distance between them'],
  ['Short game is solid and you play courses with fast greens', 'A lob wedge', 'High, soft shots to tight pins'],
])}

## Glossary: wedge terms

- **Loft:** the angle of the face, which controls height and distance.
- **Bounce:** the angle that stops the sole digging into the ground.
- **Grind:** the shape of the sole, which changes how the wedge plays in different lies.
- **Gapping:** spacing your wedge lofts so distances are evenly spread.
`,

  'golf-buggy-battery-replacement-guide': `
## Glossary: battery terms

- **Voltage (V):** the electrical pressure of the battery. It must match your buggy.
- **Amp-hours (Ah):** the capacity of the battery. Larger numbers run longer.
- **Watt-hours (Wh):** energy, calculated as volts multiplied by amp-hours.
- **Hole rating:** a simple guide to how many holes the battery can power.
- **BMS:** the electronics in a lithium pack that protect it from over-charge and over-discharge.
`,
};
