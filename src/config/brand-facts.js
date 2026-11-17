// src/config/brand-facts.js
// Verified facts for brand pages, each with the public sources it came from (researched November 2026).
// Rule: nothing goes in here unless at least one named source states it. Where a brand has no verifiable public
// information (several imported cart and UTV brands), it simply has no entry and the page relies on the product data.
// The full source list, including what could NOT be confirmed, is in docs/research-sources.md.

export const BRAND_FACTS = {
  titleist: {
    facts: [
      'Titleist was founded in 1932 by Philip E. Young, a graduate of the Massachusetts Institute of Technology.',
      'The Pro V1 golf ball made its debut on the PGA Tour in October 2000, at the event in Las Vegas that Billy Andrade won.',
    ],
    sources: [
      { label: 'Titleist company history', url: 'https://www.titleist.com/company/history' },
      { label: 'Titleist on Wikipedia', url: 'https://en.wikipedia.org/wiki/Titleist' },
    ],
  },
  taylormade: {
    facts: [
      'TaylorMade was founded in 1979 in McHenry, Illinois by Gary Adams, and its first product was a 12-degree metalwood shown at the PGA Show in January 1979.',
      'The company is now based in Carlsbad, California.',
    ],
    sources: [
      { label: 'TaylorMade Golf Co. (Encyclopedia.com)', url: 'https://encyclopedia.com/books/politics-and-business-magazines/taylor-made-golf-co' },
      { label: 'TaylorMade at Carlsbad Chamber', url: 'https://web.carlsbad.org/Manufacturers/TaylorMade-Golf-Company-377' },
    ],
  },
  srixon: {
    facts: [
      'Srixon is owned by Sumitomo Rubber Industries of Japan, a tyre maker that also owns Cleveland Golf, XXIO and the Dunlop sports brands.',
      'The Z-Star family of golf balls includes the Z-Star, the Z-Star XV and the Z-Star Diamond.',
    ],
    sources: [
      { label: 'Golf Monthly: things you did not know about Srixon', url: 'https://www.golfmonthly.com/features/the-game/things-you-didnt-know-about-srixon-188645' },
      { label: 'MyGolfSpy: the 2025 Srixon Z-Star lineup', url: 'https://mygolfspy.com/news-opinion/five-things-to-know-about-the-2025-srixon-z-star-golf-ball-lineup/' },
    ],
  },
  'shot-scope': {
    facts: [
      'Shot Scope is a golf performance-tracking company founded in 2014 by David Hunter and based in Edinburgh, Scotland.',
      'It makes GPS watches, laser rangefinders and shot-tracking devices.',
    ],
    sources: [
      { label: 'The Scotsman: Shot Scope', url: 'https://www.scotsman.com/news/scots-firms-pushing-boundaries-wearable-tech-golf-wristband-1452578' },
      { label: 'Scottish Financial News: Shot Scope funding', url: 'https://www.scottishfinancialnews.com/articles/shot-scope-secures-1-5-million-from-virgin-money-to-aid-global-expansion' },
    ],
  },
  'precision-pro': {
    facts: [
      'Precision Pro Golf is a Cincinnati, Ohio company founded in 2013 that makes golf laser rangefinders and GPS devices.',
      'Its co-founders are Clay Hood and Jonah Mytro.',
    ],
    sources: [
      { label: 'MyGolfSpy: Precision Pro puts the consumer first', url: 'https://mygolfspy.com/news-opinion/precision-pro-rangefinders/' },
      { label: 'Better Business Bureau profile', url: 'https://www.bbb.org/us/oh/cincinnati/profile/golf-equipment/precision-pro-golf-0292-90022740' },
    ],
  },
  century: {
    facts: [
      'Century Batteries began in 1928, when its first factory opened in Alexandria, Sydney, as Century Storage Battery Co. Ltd.',
      'It is now part of Century Yuasa Batteries, and its batteries are built at the Carole Park plant in Queensland.',
    ],
    sources: [{ label: 'Century Batteries: our history', url: 'https://www.centurybatteries.com.au/about-us/our-history' }],
  },
  ultramax: {
    facts: [
      'According to its UK business directory listing, UltraMax Batteries Ltd makes lithium iron phosphate (LiFePO4) batteries for golf trolleys, mobility scooters and leisure use.',
    ],
    sources: [
      { label: 'UltraMax Batteries Ltd on FreeIndex', url: 'https://www.freeindex.co.uk/profile(ultramax-batteries-ltd)_854089.htm' },
    ],
  },
  lvtong: {
    facts: [
      'LVTONG is a Guangdong, China-based manufacturer of electric golf carts and electric utility vehicles, registered as Guangdong Lvtong New Energy Electric Vehicle Technology Co., Ltd.',
    ],
    sources: [
      { label: 'EV Trader: Lvtong', url: 'https://evtrader.com/ev-company/lvtong-china' },
      { label: 'Lvtong New Energy Electric Vehicle Technology (directory)', url: 'https://www.industrialautomationindia.in/directory/lvtong-new-energy-electric-vehicle-technology-co-ltd' },
    ],
  },
};

// Safety and road-use notes by product type, each tied to an official source.
export const KIND_NOTES = {
  ssv: {
    heading: 'Side-by-side safety in Australia',
    points: [
      'Side-by-sides have at least two seats side by side, a steering wheel, and safety features such as rollover protection and seatbelts. They can carry 2 to 6 people.',
      'Unlike quad bikes, side-by-side vehicles do not have a mandatory federal safety standard, so follow the manufacturer\'s instructions and warnings.',
      'Drivers and passengers should always wear a seatbelt and a helmet, and children should never drive a side-by-side.',
    ],
    sources: [{ label: 'Product Safety Australia: quad bike and side-by-side vehicle guide', url: 'https://www.productsafety.gov.au/consumers/drive-and-ride-safely/quad-bike-and-side-by-side-vehicle-guide' }],
    links: [{ label: 'Side by side vs quad bike: safety, cost and use', href: '/blog/side-by-side-vs-quad-bike-australia/' }],
  },
  dune: {
    heading: 'Dune buggies: where they can be used',
    points: [
      'Dune and off-road buggies are sold for use on private land, farm tracks and recreation areas, not on public roads.',
      'Check the engine size, seating and brakes on the product page, and compare them with a side-by-side before you decide.',
    ],
    sources: [],
    links: [{ label: 'Dune buggy vs side by side: which one suits you', href: '/blog/dune-buggy-vs-side-by-side-australia/' }],
  },
  cart: {
    heading: 'Driving a golf cart on the road',
    points: [
      'Road rules for golf carts are set by each state. A cart used only on a golf course or private land is treated differently from one driven on public roads.',
      'Read the official summary for your state before you buy, and confirm the details with the road authority.',
    ],
    sources: [],
    links: [
      { label: 'Golf cart registration in NSW', href: '/blog/golf-cart-registration-nsw-guide/' },
      { label: 'Golf cart registration in Queensland', href: '/blog/golf-cart-registration-qld-guide/' },
      { label: 'Golf cart registration in Victoria', href: '/blog/golf-cart-registration-victoria-guide/' },
    ],
  },
};

/** Which note applies to a brand, from the products it actually sells. */
export function kindsForProducts(products) {
  const kinds = new Set();
  for (const p of products) {
    if (['side-by-side', 'farm-buggies'].includes(p.subcategory)) kinds.add('ssv');
    else if (p.subcategory === 'dune-buggies') kinds.add('dune');
    else if (p.category === 'luxury-golf-carts') kinds.add('cart');
  }
  return [...kinds];
}
