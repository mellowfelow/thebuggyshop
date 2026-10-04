import fs from 'fs';
import path from 'path';
import { PRODUCTS, getProductsByCategory } from '../src/config/products.js';

// Count products per category/subcategory
console.log('Total products loaded:', PRODUCTS.length);

const categoriesFile = path.resolve('./src/config/categories.js');
let categoriesContent = fs.readFileSync(categoriesFile, 'utf8');

// Insert golf-clubs category and missing subcategories before closing ];
const newSubcategoriesAndCategories = `
  // 2.36 - Golf Clubs
  {
    id: 'golf-clubs',
    parent: null,
    slug: 'golf-clubs',
    path: '/golf-clubs/',
    navLabel: 'Golf Clubs',
    pageTitle: 'Golf Clubs for Sale Australia | Sets, Drivers, Irons & Putters',
    metaDescription: 'Shop complete golf package sets, drivers, iron sets, wedges and putters at The Buggy Shop.',
    h1: 'Golf Clubs',
    targetKeywords: ['golf clubs for sale australia', 'complete golf club set', 'golf driver'],
    introCopy: 'Quality golf club sets for juniors, beginners, ladies and experienced players.',
    heroImage: '/images/placeholder.webp',
    itemCount: 0,
    facets: ['price', 'brand']
  },
  // Subcategories for Accessories
  {
    id: 'acc-bags',
    parent: 'accessories',
    slug: 'bags',
    path: '/golf-buggy-accessories/bags/',
    navLabel: 'Golf Bags',
    pageTitle: 'Golf Cart & Stand Bags Australia',
    metaDescription: '14-way cart bags, lightweight stand bags and travel covers.',
    h1: 'Golf Bags',
    targetKeywords: ['golf cart bag', 'golf stand bag', 'golf travel bag'],
    introCopy: '14-way cart bags, waterproof stand bags, and travel covers designed for golf buggies.',
    heroImage: '/images/placeholder.webp',
    itemCount: 0,
    facets: ['price', 'brand']
  },
  {
    id: 'acc-balls',
    parent: 'accessories',
    slug: 'golf-balls',
    path: '/golf-buggy-accessories/golf-balls/',
    navLabel: 'Golf Balls',
    pageTitle: 'Premium Golf Balls Australia',
    metaDescription: 'Titleist Pro V1, TaylorMade TP5, Srixon Z-Star golf balls.',
    h1: 'Golf Balls',
    targetKeywords: ['titleist pro v1', 'taylormade tp5', 'srixon z-star'],
    introCopy: 'Dozen packs of tour-tier and distance golf balls.',
    heroImage: '/images/placeholder.webp',
    itemCount: 0,
    facets: ['price', 'brand']
  },
  {
    id: 'acc-rangefinders',
    parent: 'accessories',
    slug: 'rangefinders-gps',
    path: '/golf-buggy-accessories/rangefinders-gps/',
    navLabel: 'Rangefinders & GPS',
    pageTitle: 'Golf Laser Rangefinders & GPS Watches',
    metaDescription: 'Bushnell, Garmin, Precision Pro rangefinders and Shot Scope watches.',
    h1: 'Rangefinders & GPS Watches',
    targetKeywords: ['golf rangefinder', 'garmin approach', 'bushnell tour v5'],
    introCopy: 'Accurate laser rangefinders and GPS golf watches for pin-point yardages.',
    heroImage: '/images/placeholder.webp',
    itemCount: 0,
    facets: ['price', 'brand']
  },
  {
    id: 'acc-practice',
    parent: 'accessories',
    slug: 'practice-aids',
    path: '/golf-buggy-accessories/practice-aids/',
    navLabel: 'Practice Aids',
    pageTitle: 'Golf Putting Mats & Hitting Nets Australia',
    metaDescription: 'Home golf practice nets, putting mats and hitting mats.',
    h1: 'Practice Aids',
    targetKeywords: ['golf putting mat', 'golf practice net', 'golf hitting mat'],
    introCopy: 'Home putting greens and hitting nets to practice your game anywhere.',
    heroImage: '/images/placeholder.webp',
    itemCount: 0,
    facets: ['price', 'brand']
  },
  // Subcategories for Golf Clubs
  {
    id: 'clubs-complete',
    parent: 'golf-clubs',
    slug: 'complete-sets',
    path: '/golf-clubs/complete-sets/',
    navLabel: 'Complete Package Sets',
    pageTitle: 'Complete Golf Package Sets Australia',
    metaDescription: 'Beginner, junior and ladies complete package sets with bag.',
    h1: 'Complete Golf Package Sets',
    targetKeywords: ['complete golf club set', 'junior golf club set'],
    introCopy: 'All-in-one package sets including drivers, woods, irons, putter and cart bag.',
    heroImage: '/images/placeholder.webp',
    itemCount: 0,
    facets: ['price', 'brand']
  },
  {
    id: 'clubs-woods-irons',
    parent: 'golf-clubs',
    slug: 'woods-and-irons',
    path: '/golf-clubs/woods-and-irons/',
    navLabel: 'Woods & Irons',
    pageTitle: 'Golf Drivers, Fairways & Iron Sets Australia',
    metaDescription: 'Drivers, fairway woods and iron sets for all handicap levels.',
    h1: 'Woods & Irons',
    targetKeywords: ['golf driver', 'golf iron set'],
    introCopy: 'High-launch drivers and forged iron sets designed for distance and forgiveness.',
    heroImage: '/images/placeholder.webp',
    itemCount: 0,
    facets: ['price', 'brand']
  },
  {
    id: 'clubs-wedges-putters',
    parent: 'golf-clubs',
    slug: 'wedges-and-putters',
    path: '/golf-clubs/wedges-and-putters/',
    navLabel: 'Wedges & Putters',
    pageTitle: 'Golf Wedges & Putters Australia',
    metaDescription: 'Precision wedges and mallet/blade putters.',
    h1: 'Wedges & Putters',
    targetKeywords: ['golf wedge', 'golf putter'],
    introCopy: 'Short game scoring clubs: high-spin wedges and precision alignment putters.',
    heroImage: '/images/placeholder.webp',
    itemCount: 0,
    facets: ['price', 'brand']
  }
`;

const insertIndex = categoriesContent.indexOf('];\n\n// Helper functions');
if (insertIndex !== -1) {
  categoriesContent = categoriesContent.slice(0, insertIndex) + newSubcategoriesAndCategories + categoriesContent.slice(insertIndex);
  fs.writeFileSync(categoriesFile, categoriesContent, 'utf8');
  console.log('Added new categories and subcategories to categories.js');
}
