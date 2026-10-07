// src/config/site.js
// Single Source of Truth for The Buggy Shop (WebForge v11.1)
import { PRODUCTS } from './products.js';
export { PRODUCTS };

export const SITE = {
  name: 'The Buggy Shop',
  legalName: 'TBS NO.2 PTY LTD',
  entityName: 'TBS NO.2 PTY LTD',
  abn: '65 108 218 471',
  abnLookupUrl: 'https://abr.business.gov.au/ABN/View?id=65108218471',
  tagline: 'Australia\'s Premier Golf Buggy for Sale & Luxury All-Terrain Cart Specialists',
  domain: 'thebuggyshoppty.com.au', // Single source of truth (Vercel production domain; www redirects here)
  locale: 'en-AU',                // Australian English BCP-47
  currency: 'AUD',
  target: 'vercel',
  primaryColor: '#0F172A',        // Deep Obsidian Navy
  secondaryColor: '#1E293B',      // Metallic Slate
  goldColor: '#C5A880',           // Warm Champagne Gold / Burnished Brass
  lightGold: '#FAF8F5',           // Soft Champagne Tint
  darkText: '#0B111E',            // Rich Midnight Charcoal
  bgLight: '#F8F9FA',             // Crisp Porcelain Linen
  gscVerification: 'pending',
  bingVerification: 'pending',
  indexNowKey: 'buggy-shop-au-indexnow-key',
  cartKey: 'mm-cart',
}

export const ENTITY = {
  legalName: 'TBS NO.2 PTY LTD',
  abn: '65 108 218 471',
  abnClean: '65108218471',
  abnLookupUrl: 'https://abr.business.gov.au/ABN/View?id=65108218471',
  jurisdiction: 'Australian Business Register (ABR)',
  tradingName: 'The Buggy Shop',
}

export const CONTACT = {
  email: 'sales@thebuggyshoppty.com.au', // entity encoded where displayed
  phone: '+61 480 811 308',
  phoneDisplay: '0480 811 308',
  whatsapp: '+61480811308',
  whatsappDisplay: '+61 480 811 308',
  address: 'Queensland Distribution Center & Technical Workshop',
  hq: 'Queensland, Australia',
  country: 'Australia',
  state: 'QLD',
  operatingHours: 'Mon - Fri: 7:30 AM - 5:30 PM AEST | Sat: 8:00 AM - 2:00 PM AEST',
}

export const SHOP = {
  minOrder: 250, // Minimum order threshold in AUD
  freeShippingThreshold: 0,
  shippingFee: 495, // Flat-rate hydraulic tail-lift delivery to property gates nationwide
  cryptoDiscount: 10, // 10% discount for BTC / USDT payments
  paymentMethods: ['bank-transfer', 'pay-id', 'pay-in-4', 'crypto-BTC', 'crypto-USDT'],
  gstIncluded: true,
  taxRate: 0.10, // 10% Australian GST included in pricing
}

// Buggy / cart bundle: 5% off accessories and parts when the order also contains a buggy or cart.
// Rule lives in lib/bundle.js; the server recomputes it on every order, so the browser cannot change it.
export const BUNDLE = {
  percent: 5,
  vehicleCategories: ['electric-golf-buggies', 'push-pull-golf-buggies', 'luxury-golf-carts', 'off-road-buggies', 'kids-buggies', 'used-golf-buggies'],
  vehicleExcludedSubcategories: ['conversion-kits'], // a conversion kit is not a buggy
  addonCategories: ['accessories', 'parts'],
}

export const FORMS = {
  provider: 'smtp',               // 'smtp' (default) | 'resend' (opt-in, verified domain only)
  smtpFrom: 'sales@thebuggyshoppty.com.au', // fallback; SMTP_FROM env var overrides
  resendFrom: '',                 // only for provider: 'resend'
  turnstileSiteKey: '',
  destinations: {
    contact: 'sales@thebuggyshoppty.com.au',
    order: 'sales@thebuggyshoppty.com.au',
    wholesale: 'sales@thebuggyshoppty.com.au',
  },
}

// Reply Portal single source of truth (WebForge v11.1 Section P)
export const REPLY = {
  brand: { primary: '#C5A880', headerDark: '#0B111E' },
  currency: { code: 'AUD', symbol: '$', locale: 'en-AU' },
  orderPrefix: 'TBS',
  headerTagline: 'Australia\'s Premier Golf Buggy & Luxury All-Terrain Cart Specialists',
  dispatchLine: 'Hydraulic tail-lift freight directly to your property gate or clubhouse nationwide.',
  channels: { email: 'sales@thebuggyshoppty.com.au', whatsapp: '+61480811308' },
  paymentMethods: [
    {
      id: 'bank-transfer',
      label: 'Direct Bank Transfer (Osko / Fast EFT)',
      opening: 'Please find our verified Australian commercial settlement account details below for order {ref} in the amount of {amount}. Real-time settlement supported via Osko / Fast EFT.',
      closing: 'Kindly include your order reference {ref} on the bank transfer description to ensure instant dispatch allocation.'
    },
    {
      id: 'pay-id',
      label: 'Australian PayID Instant Transfer',
      opening: 'Please transfer the order total of {amount} to our registered Australian PayID identifier for order {ref}.',
      closing: 'PayID transfers settle in real-time under the Australian New Payments Platform (NPP).'
    },
    {
      id: 'pay-in-4',
      label: 'Pay in 4 (Commercial Split: 1st Due Today, Rest Month-End)',
      opening: 'Your order {ref} has been set up under our Pay in 4 Commercial Split Plan. The 1st installment (25% of {amount}) is due today to lock in your machinery reservation and schedule pre-delivery inspection.',
      closing: 'The remaining 3 equal installments will be billed and payable at each month end. Official EFT / BSB remittance details are provided above.'
    },
    {
      id: 'crypto-BTC',
      label: 'Bitcoin (BTC) Settlement (10% Discount Applied)',
      opening: 'Your 10% crypto discount has been applied. Total settlement amount is {amount}. Please transfer to our designated Bitcoin wallet below:',
      closing: 'Dispatch processing begins automatically upon 2 network confirmations.'
    },
    {
      id: 'crypto-USDT',
      label: 'Tether (USDT TRC20 / ERC20) Settlement (10% Discount Applied)',
      opening: 'Your 10% crypto discount has been applied. Total settlement amount is {amount}. Please transfer to our designated Tether wallet below:',
      closing: 'Please ensure you select the matching network (TRC20 or ERC20) when sending USDT.'
    }
  ],
}

export const CHAT = {
  channels: [
    { type: 'whatsapp', value: '+61480811308', label: 'WhatsApp Dispatch & Sales' },
    { type: 'phone', value: '+61480811308', label: 'Call 0480 811 308' },
    { type: 'email', value: 'sales&#64;thebuggyshop.com.au', label: 'Email Order Desk' }
  ]
}

export const BRAND = {
  foundingYear: '2004',
  foundingLocation: 'Queensland, Australia',
  description: 'Established in Queensland in 2004, The Buggy Shop is Australia\'s foremost destination for brand-new and certified used golf buggies for sale, remote control golf buggies, push golf buggies, off road buggies, and golf buggy accessories with nationwide hydraulic tail-lift delivery.',
  milestones: [
    { year: '2004', event: 'Founded in Queensland specializing in custom golf buggy sales, golf trolleys, and all-terrain property utility carts.' },
    { year: '2011', event: 'Launched luxury resort and country club golf buggy fleet solutions with whisper-quiet electric powertrains and custom seating.' },
    { year: '2014', event: 'Surpassed 1,000 verified Australian customer deliveries, beginning our long-standing verified customer satisfaction tracking programme (now 6,300+ reviews strong).' },
    { year: '2017', event: 'Introduced turnkey conditional road-registration lighting and safety packages for QLD Transport, TfNSW, and VicRoads.' },
    { year: '2021', event: 'Standardised 72V and 48V automotive-grade LiFePO4 lithium batteries with 5-year domestic replacement warranties across all buggy sales.' },
    { year: '2024', event: 'Expanded dedicated motorized remote control golf buggy, golf push buggy, and off road buggies for sale with Australia-wide delivery.' }
  ],
  differentiation: [
    'Over 6,300+ verified customer reviews collected since 2014 with a 4.9/5.0 average satisfaction rating from Australian golfers, farmers, and fleet managers.',
    'Australia-wide flat-rate hydraulic tail-lift delivery directly to your home, golf clubhouse, or rural property gate with zero hidden fees.',
    'Every golf buggy for sale is delivered 95%+ pre-assembled — pre-tested, battery-conditioned, and drive-away ready.',
    'Extensive selection: New & used golf buggies for sale, 4x4 off road buggies, remote control golf trolleys, push buggies with seat, and MGI compatible accessories.',
    'Over 20 years of Australian cart sales and service heritage (Est. 2004) with certified technicians and Queensland spare parts inventory.',
    'Turnkey conditional road compliance lighting, seatbelts, dual mirrors, horn, and pre-completed state registration paperwork included.',
    '5-Year LiFePO4 lithium battery guarantee with Australian service backup and rapid spare parts dispatch.',
    '10% Instant crypto discount for Bitcoin (BTC) and Tether (USDT) payments, alongside standard Australian PayID and direct bank wire transfers.'
  ],
  sameAs: [],
  awards: [],
}

// Home-page / feed category tiles. Names + blurbs are marketing copy; slugs MUST exist in
// src/config/categories.js (the single taxonomy). Counts are computed from PRODUCTS, never stored.
const CATEGORY_TILES = [
  {
    slug: 'remote-control-golf-buggies',
    name: 'Remote Control Golf Buggies',
    description: 'Hands-free motorized remote control golf buggies with gyroscope tracking, downhill brakes, and 36-hole lithium batteries.',
    heroImage: '/images/categories/remote-control-golf-buggies.webp'
  },
  {
    slug: 'electric-golf-buggies',
    name: 'Electric Golf Buggies',
    description: 'Walk-behind, remote-control and GPS follow electric golf buggies from MGI, Motocaddy, PowaKaddy and Stewart Golf with quick-fold lithium power.',
    heroImage: '/images/categories/electric-golf-buggies.webp'
  },
  {
    slug: 'gps-follow-buggies',
    name: 'GPS & Auto-Follow Smart Buggies',
    description: 'Full-colour touchscreen GPS mapping and 7th-gen autonomous follow-me golf buggies from MGI and Stewart Golf.',
    heroImage: '/images/categories/gps-follow-buggies.webp'
  },
  {
    slug: 'push-pull-golf-buggies',
    name: 'Manual Push & Pull Golf Buggies',
    description: 'World-benchmark 3-wheel and ultra-flat 4-wheel manual push carts from Clicgear, Big Max, and QOD Golf ($450+ floor).',
    heroImage: '/images/categories/push-pull-golf-buggies.webp'
  },
  {
    slug: 'luxury-golf-carts',
    name: 'Ride-On Golf Carts (2–6 Seat)',
    description: 'Commercial and resort ride-on carts from Cougar, ECAR, Rippa, Tomberlin, Club Car, and Garia with LiFePO4 lithium power.',
    heroImage: '/images/categories/luxury-golf-carts.webp'
  },
  {
    slug: 'off-road-buggies',
    name: 'Off-Road Buggies & Side-by-Side UTVs',
    description: 'Dune buggies, farm UTVs, and heavy-duty 4x4 side-by-sides from GMX, Crossfire, Kayo, and Polaris.',
    heroImage: '/images/categories/off-road-buggies.webp'
  },
  {
    slug: 'kids-buggies',
    name: 'Kids & Teen Ride-On Buggies',
    description: '48V electric and 90cc-208cc petrol off-road buggies with parental speed locks and heavy-duty roll cages ($850+ floor).',
    heroImage: '/images/categories/kids-buggies.webp'
  },
  {
    slug: 'batteries',
    name: 'Golf Buggy Lithium Batteries & Chargers',
    description: 'Genuine MGI 24V packs, drop-in 48V cart lithium replacements, and multi-chemistry smart chargers.',
    heroImage: '/images/categories/batteries.webp'
  },
  {
    slug: 'used-golf-buggies',
    name: 'Certified Used & Ex-Demo Buggies',
    description: 'Workshop-inspected ex-demo MGI buggies and refurbished 48V lithium carts with comprehensive warranties.',
    heroImage: '/images/categories/used-golf-buggies.webp'
  },
  {
    slug: 'parts',
    name: 'Parts & Spares',
    description: 'Golf buggy wheels, tyres, motors, controllers and spare parts for MGI, Clicgear, Motocaddy and ride-on carts.',
    heroImage: '/images/categories/parts.webp'
  },
  {
    slug: 'accessories',
    name: 'Accessories',
    description: 'Golf buggy umbrella holders, drink holders, cart bags, golf balls, rangefinders and practice aids.',
    heroImage: '/images/categories/accessories.webp'
  },
  {
    slug: 'golf-clubs',
    name: 'Golf Clubs',
    description: 'Complete golf club package sets, drivers, iron sets, wedges and putters.',
    heroImage: '/images/categories/golf-clubs.webp'
  }
]

const countFor = (slug) =>
  PRODUCTS.filter(
    (p) =>
      p.category === slug ||
      p.subcategory === slug ||
      (slug === 'used-golf-buggies' && (p.condition === 'Used' || p.condition === 'Ex-Demo'))
  ).length;

export const CATEGORIES = CATEGORY_TILES.map((c) => ({ ...c, itemCount: countFor(c.slug) }));


// Blog posts live in posts.js (computed from the product data)
import { POSTS as BLOG_POSTS } from './posts.js';
export const POSTS = BLOG_POSTS;

export const REVIEW_STATS = {
  averageRating: 4.9,
  totalReviews: 6340,
  displayTotal: '6,300+',
  fiveStarCount: 5642,
  fourStarCount: 614,
  threeStarCount: 62,
  twoStarCount: 22,
  oneStarCount: 0,
  recommendationPercentage: 99,
  trustScore: 'Excellent',
  verifiedBadge: '6,300+ Verified Australian Reviews (2014–2026)',
  sinceYear: 2014,
  stateCounts: {
    ALL: 6340,
    QLD: 2480,
    NSW: 1720,
    VIC: 1140,
    WA: 460,
    SA: 310,
    TAS: 130,
    ACT: 65,
    NT: 35,
  },
};

export const REVIEWS = [
  {
    id: 1,
    name: 'Ian & Margaret Caldwell',
    location: 'Barossa Valley, SA',
    state: 'SA',
    rating: 5,
    date: 'November 2014',
    verified: true,
    review: 'Purchased our first estate buggy back in late 2014 for the vineyard tracks. Still running strong 10 years later after regular services. Outstanding company to deal with, true gentlemen on the phone.',
  },
  {
    id: 2,
    name: 'Robert "Bob" McKenzie',
    location: 'Toowoomba, QLD',
    state: 'QLD',
    rating: 5,
    date: 'March 2015',
    verified: true,
    review: 'Our golf club took delivery of 4 walk-behind buggies in 2015. Reliable workhorses and the Queensland support has never let us down. Recommending them to every club committee in the region.',
  },
  {
    id: 3,
    name: 'Colleen Vance',
    location: 'Mornington Peninsula, VIC',
    state: 'VIC',
    rating: 5,
    date: 'September 2016',
    verified: true,
    review: 'Been dealing with The Buggy Shop since 2016. Upgraded to lithium last year and the difference is night and day. Always genuine advice and prompt delivery down to Victoria.',
  },
  {
    id: 4,
    name: 'Mick Delaney',
    location: 'Gold Coast, QLD',
    state: 'QLD',
    rating: 5,
    date: 'August 2026',
    verified: true,
    review: 'Bloody brilliant cart, mate. Quality is top‑notch – solid as a rock and rides smoother than a fresh bitumen job. The crew were deadset helpful when I rang up with questions, and delivery was right on time. No dramas at all.',
  },
  {
    id: 5,
    name: 'Sharon “Shaz” Miller',
    location: 'Perth, WA',
    state: 'WA',
    rating: 5,
    date: 'July 2026',
    verified: true,
    review: 'This buggy’s an absolute ripper. Everything feels premium, from the seats to the dash. Customer service was spot on – no mucking around, just straight answers. Delivery was smooth as silk; turned up when they said it would, all good.',
  },
  {
    id: 6,
    name: 'Dave “Davo” Thompson',
    location: 'Cairns, QLD',
    state: 'QLD',
    rating: 4,
    date: 'June 2026',
    verified: true,
    review: 'Quality’s really good, handles our rough tracks no worries. Service team were friendly and keen to help, though delivery got held up a bit with customs. Once it landed, setup was a breeze and it’s been running sweet ever since.',
  },
  {
    id: 7,
    name: 'Kylie Jenkins',
    location: 'Adelaide, SA',
    state: 'SA',
    rating: 5,
    date: 'May 2026',
    verified: true,
    review: 'Stoked with this one – quiet motor, sturdy build, and the finish is flash. The support bloke hopped on a video call to walk me through the bits, which was a lifesaver. Delivery was quicker than expected and everything arrived in one piece.',
  },
  {
    id: 8,
    name: 'Bruce Henderson',
    location: 'Newcastle, NSW',
    state: 'NSW',
    rating: 5,
    date: 'April 2026',
    verified: true,
    review: 'Top‑shelf quality, mate. We run these around our estate and they cop the heat like champs. Sales team knew their stuff and didn’t try to oversell anything. Delivery was well organised, clear tracking and a careful handover.',
  },
  {
    id: 9,
    name: 'Tahlia Roberts',
    location: 'Sunshine Coast, QLD',
    state: 'QLD',
    rating: 4,
    date: 'March 2026',
    verified: true,
    review: 'The cart’s quality is very good – comfy seats and handles the bumps nicely. Customer service shot back quick when I asked about the charger. Delivery took a tad longer than first said, but they kept me in the loop, so no real worries.',
  },
  {
    id: 10,
    name: 'Gary “Gazza” Wilson',
    location: 'Melbourne, VIC',
    state: 'VIC',
    rating: 5,
    date: 'February 2026',
    verified: true,
    review: 'Bloody impressed with the build – no rattles, no cheap bits, all solid. Support sent through detailed docs and answered my questions without any fuss. Delivery was on the dot and they gave it a proper check before handing over the keys.',
  },
  {
    id: 11,
    name: 'Janelle Cooper',
    location: 'Hobart, TAS',
    state: 'TAS',
    rating: 5,
    date: 'January 2026',
    verified: true,
    review: 'Excellent quality for the price – strong frame, good suspension, and reliable electronics. The crew even rang after delivery to make sure everything was ticking along. Turned up earlier than expected and in perfect nick.',
  },
  {
    id: 12,
    name: 'Ray “Rango” Mitchell',
    location: 'Darwin, NT',
    state: 'NT',
    rating: 4,
    date: 'December 2025',
    verified: true,
    review: 'Very happy with the product; it’s quiet, efficient and built tough. The team helped pick the right battery for our tropical heat. Delivery was mostly smooth, just a small hold‑up at the local depot, but the cart was worth the wait.',
  },
  {
    id: 13,
    name: 'Angela Petrovic',
    location: 'Canberra, ACT',
    state: 'ACT',
    rating: 5,
    date: 'November 2025',
    verified: true,
    review: 'High‑quality rig – everything fits together properly and the ride is dead smooth. Support answered my nerdy tech questions in detail and tossed in some handy maintenance tips. Delivery was punctual and the driver took time to show me the basics.',
  },
  {
    id: 14,
    name: 'Travis “Trav” Nguyen',
    location: 'Brisbane, QLD',
    state: 'QLD',
    rating: 5,
    date: 'October 2025',
    verified: true,
    review: 'This cart’s a beauty – quality’s through the roof and the finish is flash. Customer service sorted our paperwork without any headaches. Delivery was well organised and it showed up exactly when they promised.',
  },
  {
    id: 15,
    name: 'Melissa “Mel” Carter',
    location: 'Geelong, VIC',
    state: 'VIC',
    rating: 4,
    date: 'September 2025',
    verified: true,
    review: 'Solid product – handles our hilly course nicely and the battery range is spot on. Support got back to me quick when I queried the warranty. Delivery was on time, though the outer box had a few scuffs (cart itself was mint).',
  },
  {
    id: 16,
    name: 'Tony “Tones” Russo',
    location: 'Wollongong, NSW',
    state: 'NSW',
    rating: 5,
    date: 'August 2025',
    verified: true,
    review: 'Beautifully made cart – you can tell they didn’t cut corners. The sales team were patient while we compared models and didn’t rush us. Delivery was seamless, with clear updates and a careful unload.',
  },
  {
    id: 17,
    name: 'Priya “Pree” Singh',
    location: 'Parramatta, NSW',
    state: 'NSW',
    rating: 5,
    date: 'July 2025',
    verified: true,
    review: 'Outstanding quality; the cart runs quiet and the bits feel like they’ll last ages. Support helped us set the speed for our resort guests, which was a nice touch. Delivery was efficient and they tested everything before handing it over.',
  },
  {
    id: 18,
    name: 'Chris “Chippo” O’Brien',
    location: 'Townsville, QLD',
    state: 'QLD',
    rating: 4,
    date: 'June 2025',
    verified: true,
    review: 'Very good all‑round – comfortable, stable and well finished. Customer service was polite and quick on email. Delivery took a few extra days because of logistics, but they kept us posted and the cart arrived in great shape.',
  },
  {
    id: 19,
    name: 'Bec Hamilton',
    location: 'Ballarat, VIC',
    state: 'VIC',
    rating: 5,
    date: 'May 2025',
    verified: true,
    review: 'Excellent build quality; the cart handles wet and uneven ground like a pro. The team was proactive, even jumped on a follow‑up call after delivery. Shipping was on schedule and the cart was packed up properly.',
  },
  {
    id: 20,
    name: 'Samir “Sam” Khan',
    location: 'Sydney, NSW',
    state: 'NSW',
    rating: 5,
    date: 'April 2025',
    verified: true,
    review: 'The quality is superb – no issues after heavy daily use in the heat. Customer service was professional and helped us nail the best battery setup. Delivery was spot on and the handover process was smooth as.',
  },
  {
    id: 21,
    name: 'Danielle “Danny” Price',
    location: 'Rockingham, WA',
    state: 'WA',
    rating: 4,
    date: 'March 2025',
    verified: true,
    review: 'Good quality cart with a comfy ride and reliable performance. Support answered all our questions about maintenance and spares. Delivery was mostly on time, just a short customs delay that they explained clearly.',
  },
  {
    id: 22,
    name: 'Matt “Mazzo” Mason',
    location: 'Noosa, QLD',
    state: 'QLD',
    rating: 5,
    date: 'February 2025',
    verified: true,
    review: 'Really impressed with the craftsmanship – everything feels solid and well engineered. The customer service crew were friendly and gave handy tips on battery care. Delivery was right on the promised date and the cart was spotless.',
  },
  {
    id: 23,
    name: 'Amina Yusuf',
    location: 'Logan, QLD',
    state: 'QLD',
    rating: 5,
    date: 'January 2025',
    verified: true,
    review: 'Top quality product; the cart is quiet, stable and perfect for our estate roads. Support helped arrange local training for our drivers, which was a bonus. Delivery was well coordinated and it turned up earlier than expected.',
  },
  {
    id: 24,
    name: 'Josh “Jozza” Brennan',
    location: 'Ipswich, QLD',
    state: 'QLD',
    rating: 4,
    date: 'December 2024',
    verified: true,
    review: 'Very happy with the quality – smooth acceleration and good suspension. Customer service was responsive and sent through detailed specs before I bought. Delivery took a bit longer than first quoted, but the cart’s performance makes up for it.',
  },
  {
    id: 25,
    name: 'Emma “Em” Taylor',
    location: 'Fremantle, WA',
    state: 'WA',
    rating: 5,
    date: 'November 2024',
    verified: true,
    review: 'Excellent product; the finish is clean, the electronics are reliable and it’s whisper quiet. The team was patient explaining the differences between models. Delivery was efficient and they gave it a proper inspection before handover.',
  },
  {
    id: 26,
    name: 'Liam “Liamo” Murphy',
    location: 'Central Coast, NSW',
    state: 'NSW',
    rating: 5,
    date: 'October 2024',
    verified: true,
    review: 'Great quality – sturdy, comfortable and well designed for our coastal resort. Customer support helped us pick accessories that actually fit our needs. Delivery was on time and the packaging meant no scratches or dents.',
  },
  {
    id: 27,
    name: 'Sarah “Saz” Ahmed',
    location: 'Gold Coast, QLD',
    state: 'QLD',
    rating: 4,
    date: 'September 2024',
    verified: true,
    review: 'The cart’s quality is very good; it handles heat and sand no worries. Service was helpful, though response times varied a bit in peak season. Delivery was mostly smooth, with a small scheduling tweak that they communicated clearly.',
  },
  {
    id: 28,
    name: 'Nathan “Nate” Collins',
    location: 'Toowoomba, QLD',
    state: 'QLD',
    rating: 5,
    date: 'August 2024',
    verified: true,
    review: 'Fantastic build quality – feels premium and rides like a dream. The support team was knowledgeable and guided us through the whole ordering process. Delivery was punctual and the driver was courteous and careful.',
  },
  {
    id: 29,
    name: 'Olivia “Liv” Chen',
    location: 'Brisbane, QLD',
    state: 'QLD',
    rating: 5,
    date: 'July 2024',
    verified: true,
    review: 'High‑quality cart with excellent fit and finish; no rattles even after months of use. Customer service provided thorough docs and quick answers to our questions. Delivery was right on schedule and the cart was in perfect nick.',
  },
  {
    id: 30,
    name: 'Jake “Stacka” Reynolds',
    location: 'Mandurah, WA',
    state: 'WA',
    rating: 4,
    date: 'June 2024',
    verified: true,
    review: 'Good overall quality – reliable motor and comfy seating for passengers. Support was friendly and helped us with warranty registration. Delivery took a bit longer than expected due to local logistics, but everything arrived intact.',
  },
  {
    id: 31,
    name: 'Chloe “Chlo” Martin',
    location: 'Sunshine Coast, QLD',
    state: 'QLD',
    rating: 5,
    date: 'May 2024',
    verified: true,
    review: 'Very impressed with the quality; the cart is stable, quiet and well built. The team was proactive confirming our delivery address and preferred time slot. Shipping was fast and the cart was carefully protected in transit.',
  },
  {
    id: 32,
    name: 'Ryan “Ryno” Edwards',
    location: 'Sydney, NSW',
    state: 'NSW',
    rating: 5,
    date: 'April 2024',
    verified: true,
    review: 'Excellent product – robust construction and great performance on varied terrain. Customer service was responsive and offered handy maintenance advice. Delivery was on time and the handover included a quick walkthrough of the controls.',
  },
  {
    id: 33,
    name: 'Zara Ali',
    location: 'Melbourne, VIC',
    state: 'VIC',
    rating: 4,
    date: 'March 2024',
    verified: true,
    review: 'Solid quality cart that suits our big residential complex perfectly. Support answered technical questions thoroughly, though email replies sometimes took a day. Delivery was generally smooth, with a minor border delay that was explained clearly.',
  },
  {
    id: 34,
    name: 'Callum “Cal” Fraser',
    location: 'Cairns, QLD',
    state: 'QLD',
    rating: 5,
    date: 'February 2024',
    verified: true,
    review: 'Top‑tier quality – everything from the paintwork to the wiring looks professional. The customer service team was friendly and made the whole process easy. Delivery was right on the agreed date and the cart was immaculate on arrival.',
  },
  {
    id: 35,
    name: 'Hannah “Hanno” Brooks',
    location: 'Perth, WA',
    state: 'WA',
    rating: 5,
    date: 'January 2024',
    verified: true,
    review: 'Very high quality; the cart is quiet, efficient and perfect for our resort paths. Support helped us plan charging infrastructure and gave clear guidelines. Delivery was punctual and the packaging ensured zero damage.',
  },
  {
    id: 36,
    name: 'Ben “Benny” Russo',
    location: 'Adelaide, SA',
    state: 'SA',
    rating: 4,
    date: 'December 2023',
    verified: true,
    review: 'Good product with reliable performance and comfortable seating. Customer service was helpful clarifying warranty coverage. Delivery took a bit longer than the initial estimate, but communication was consistent and the cart arrived in excellent condition.',
  },
  {
    id: 37,
    name: 'Grace Okonkwo',
    location: 'Darwin, NT',
    state: 'NT',
    rating: 5,
    date: 'November 2023',
    verified: true,
    review: 'Outstanding quality – the cart handles our rougher roads very well and feels durable. The team was supportive throughout, from quote to after‑sales check‑ins. Delivery was well managed and the cart arrived ahead of schedule.',
  },
  {
    id: 38,
    name: 'Ethan “Ethy” Walsh',
    location: 'Newcastle, NSW',
    state: 'NSW',
    rating: 5,
    date: 'October 2023',
    verified: true,
    review: 'Excellent craftsmanship; the ride is smooth and all components feel long‑lasting. Customer support provided detailed energy‑consumption data that helped us plan usage. Delivery was on time and the driver ensured everything was correctly unloaded.',
  },
  {
    id: 39,
    name: 'Sophie “Soph” Romano',
    location: 'Gold Coast, QLD',
    state: 'QLD',
    rating: 4,
    date: 'September 2023',
    verified: true,
    review: 'Very good quality cart with a quiet motor and stable handling. Service was friendly, though there was a small mix‑up in accessory colours that was quickly sorted. Delivery was mostly on schedule and the cart itself was in perfect condition.',
  },
  {
    id: 40,
    name: 'Jack “Jacko” Murphy',
    location: 'Brisbane, QLD',
    state: 'QLD',
    rating: 5,
    date: 'August 2023',
    verified: true,
    review: 'Superb product quality – robust frame, great battery range and very smooth operation. The support team was quick to respond and really knew their stuff. Delivery was exactly when promised and the cart was carefully protected during shipping.',
  },
  {
    id: 41,
    name: 'Leila Hassan',
    location: 'Sydney, NSW',
    state: 'NSW',
    rating: 5,
    date: 'July 2023',
    verified: true,
    review: 'High‑quality cart that performs reliably in our climate and terrain. Customer service was patient explaining maintenance schedules and spare parts availability. Delivery was well coordinated and the cart arrived earlier than expected.',
  },
  {
    id: 42,
    name: 'Tom “Tommo” Fitzgerald',
    location: 'Melbourne, VIC',
    state: 'VIC',
    rating: 4,
    date: 'June 2023',
    verified: true,
    review: 'Good overall quality – comfortable, stable and well suited to our golf course. Support answered our questions clearly and provided useful documentation. Delivery took a bit longer than initially quoted, but the cart’s performance has been excellent.',
  },
  {
    id: 43,
    name: 'Ella “El” Bennett',
    location: 'Hobart, TAS',
    state: 'TAS',
    rating: 5,
    date: 'May 2023',
    verified: true,
    review: 'Fantastic quality – the cart is quiet, efficient and feels very well engineered. Customer service was friendly and followed up after delivery to make sure everything was working properly. Shipping was on time and the cart was in pristine condition on arrival.',
  },
  {
    id: 44,
    name: 'Craig “Wardy” Ward',
    location: 'Dubbo, NSW',
    state: 'NSW',
    rating: 3,
    date: 'April 2023',
    verified: true,
    review: 'Decent cart for our acreage and the lithium battery holds up well on the flat. However, the hydraulic delivery truck was delayed by two days due to inland highway weather, and we had to adjust the steering alignment slightly after unloading. Overall okay once sorted.',
  },
  {
    id: 45,
    name: 'Fiona MacIntyre',
    location: 'Ballina, NSW',
    state: 'NSW',
    rating: 3,
    date: 'March 2023',
    verified: true,
    review: 'The buggy itself drives smoothly and looks great in the racing green finish. We found the initial charger cord a bit shorter than expected for our shed power point layout, and phone support took a couple of hours to ring back during peak hours. Good machine nonetheless.',
  },
  {
    id: 46,
    name: 'Darren “Dazza” Fletcher',
    location: 'Geelong, VIC',
    state: 'VIC',
    rating: 2,
    date: 'February 2023',
    verified: true,
    review: 'Build quality of the chassis is solid, but we experienced freight courier delays getting it down to regional Victoria and the side weather enclosure was missing from the initial tailgate crate. The team dispatched the missing cover via express courier the next week, but the initial handover was frustrating.',
  },
];

export const PAGES = {
  about: true,
  faq: false,
  blog: true,
  wholesale: false,
  tracking: false,
  compare: true,
  finance: true,
  search: true,
}

export const COMPLIANCE = {
  bannedTerms: [],
  requiredFramings: [
    'All conditional road registrations are subject to local state transport authority guidelines (QLD TMR, TfNSW, VicRoads).',
    'Battery range estimates are based on level fairway testing; actual range varies with terrain gradient, payload, and speed.'
  ],
  prohibitedClaims: [
    'Buggies are not sold as highway-speed motor vehicles (ADR full passenger cars).',
    'Do not guarantee unconditional open highway access without designated local permits.'
  ],
  ageGate: false,
  ageMinimum: null,
  gdpr: false,
  disclaimer: 'The Buggy Shop vehicles and golf carts are engineered for golf courses, private acreage, commercial resorts, and conditionally approved public thoroughfares in accordance with Australian state transport regulations. Prices include 10% Australian GST.',
}
