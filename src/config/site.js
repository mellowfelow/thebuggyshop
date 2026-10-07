// src/config/site.js
// Single Source of Truth for The Buggy Shop (WebForge v11.1)
import { PRODUCTS } from './products.js';
export { PRODUCTS };

export { SITE, ENTITY, CONTACT, SHOP, BUNDLE, FORMS, REPLY, CHAT, BRAND } from './core.js';
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

export { REVIEW_STATS, REVIEWS } from './reviews.js';

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
