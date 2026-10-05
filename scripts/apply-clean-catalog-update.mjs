import fs from 'fs';
import path from 'path';

// 1. Read products.js and assign subcategories to any product missing one
let productsContent = fs.readFileSync('./src/config/products.js', 'utf8');

// Subcategory mapping function based on product name/slug/category
function getSubcategoryForProduct(p) {
  if (p.subcategory && p.subcategory !== 'NO_SUBCATEGORY') return p.subcategory;
  const cat = p.category;
  const nameLower = (p.name + " " + p.slug + " " + (p.description || "")).toLowerCase();

  if (cat === "electric-golf-buggies") return "walk-behind";
  if (cat === "remote-control-golf-buggies") return "remote-control";
  if (cat === "gps-follow-buggies") return "gps-follow";
  if (cat === "conversion-kits") return "conversion-kits";
  if (cat === "push-pull-golf-buggies") {
    if (nameLower.includes("4-wheel") || nameLower.includes("4 wheel")) return "4-wheel";
    if (nameLower.includes("trolley")) return "golf-trolleys";
    return "3-wheel";
  }
  if (cat === "luxury-golf-carts") {
    if (nameLower.includes("4-seat") || nameLower.includes("4 seat") || nameLower.includes("6-seat")) return "4-6-seat";
    if (nameLower.includes("lifted") || nameLower.includes("all-terrain")) return "lifted-all-terrain";
    if (nameLower.includes("utility")) return "utility";
    return "2-seat";
  }
  if (cat === "off-road-buggies") {
    if (nameLower.includes("dune")) return "dune-buggies";
    if (nameLower.includes("farm") || nameLower.includes("utv")) return "farm-buggies";
    return "side-by-side";
  }
  if (cat === "kids-buggies") {
    if (nameLower.includes("petrol") || nameLower.includes("90cc")) return "petrol";
    return "electric";
  }
  if (cat === "batteries") {
    if (nameLower.includes("charger")) return "chargers";
    if (nameLower.includes("set") || nameLower.includes("48v")) return "cart-sets";
    return "lithium";
  }
  if (cat === "used-golf-buggies") return "used";
  if (cat === "parts") {
    if (nameLower.includes("motor") || nameLower.includes("controller")) return "drive-electrical";
    return "wheels-tyres";
  }
  if (cat === "accessories") {
    if (nameLower.includes("bag")) return "bags";
    if (nameLower.includes("ball")) return "golf-balls";
    if (nameLower.includes("rangefinder") || nameLower.includes("gps") || nameLower.includes("watch")) return "rangefinders-gps";
    if (nameLower.includes("net") || nameLower.includes("mat") || nameLower.includes("putting")) return "practice-aids";
    return "accessories";
  }
  if (cat === "golf-clubs") {
    if (nameLower.includes("set") || nameLower.includes("package")) return "complete-sets";
    if (nameLower.includes("driver") || nameLower.includes("iron") || nameLower.includes("wood")) return "woods-and-irons";
    return "wedges-and-putters";
  }
  return cat;
}

// Dynamically import current PRODUCTS
const { PRODUCTS } = await import('../src/config/products.js');

// Add missing subcategories directly into products.js text
let updatedProductsContent = productsContent.replace(/{\s*slug:\s*'([^']+)'/g, (match, slug) => {
  const p = PRODUCTS.find(prod => prod.slug === slug);
  if (p) {
    const sub = getSubcategoryForProduct(p);
    p.subcategory = sub; // update in memory as well
    if (!match.includes('subcategory:')) {
      return `{\n    slug: '${slug}',\n    subcategory: '${sub}'`;
    }
  }
  return match;
});

// Also ensure getProductsByCategory in products.js handles subcategories properly
const updatedGetProductsFn = `export function getProductsByCategory(categorySlug) {
  if (!categorySlug) return [];
  const clean = categorySlug.replace(/^\\/|\\/$/g, '');
  if (clean === 'used-golf-buggies' || clean === 'used') {
    return PRODUCTS.filter((p) => p.condition === 'Used' || p.category === 'used-golf-buggies' || p.subcategory === 'used');
  }
  return PRODUCTS.filter((p) => 
    p.category === clean || 
    p.subcategory === clean || 
    (p.category === 'parts' && (clean === 'golf-buggy-parts' || clean === 'parts')) || 
    (p.category === 'accessories' && (clean === 'golf-buggy-accessories' || clean === 'accessories')) ||
    (p.category === 'luxury-golf-carts' && (clean === 'golf-carts' || clean === 'luxury-golf-carts')) ||
    (p.category === 'batteries' && (clean === 'golf-buggy-batteries' || clean === 'batteries')) ||
    (p.category === 'gps-follow-buggies' && (clean === 'gps-follow' || clean === 'gps-follow-buggies'))
  );
}`;

if (updatedProductsContent.includes('export function getProductsByCategory')) {
  updatedProductsContent = updatedProductsContent.replace(
    /export function getProductsByCategory[\s\S]*?\n\}/,
    updatedGetProductsFn
  );
}

fs.writeFileSync('./src/config/products.js', updatedProductsContent, 'utf8');
console.log('Successfully updated src/config/products.js');

// 2. Update categories.js
let categoriesContent = fs.readFileSync('./src/config/categories.js', 'utf8');

// Fix category IDs, slugs, and paths
categoriesContent = categoriesContent
  .replace(/id:\s*'golf-carts'/g, "id: 'luxury-golf-carts'")
  .replace(/slug:\s*'golf-carts'/g, "slug: 'luxury-golf-carts'")
  .replace(/path:\s*'\s*\/golf-carts\/\s*'/g, "path: '/luxury-golf-carts/'")
  .replace(/parent:\s*'golf-carts'/g, "parent: 'luxury-golf-carts'")
  .replace(/id:\s*'gps-follow'/g, "id: 'gps-follow-buggies'")
  .replace(/slug:\s*'gps-follow'/g, "slug: 'gps-follow-buggies'")
  .replace(/path:\s*'\s*\/electric-golf-buggies\/gps-follow\/\s*'/g, "path: '/gps-follow-buggies/'")
  .replace(/id:\s*'batteries',\s*parent:\s*null,\s*slug:\s*'golf-buggy-batteries'/g, "id: 'batteries', parent: null, slug: 'batteries'")
  .replace(/path:\s*'\s*\/golf-buggy-batteries\/\s*'/g, "path: '/batteries/'")
  .replace(/\/golf-buggy-batteries\//g, "/batteries/")
  .replace(/id:\s*'parts',\s*parent:\s*null,\s*slug:\s*'golf-buggy-parts'/g, "id: 'parts', parent: null, slug: 'parts'")
  .replace(/path:\s*'\s*\/golf-buggy-parts\/\s*'/g, "path: '/parts/'")
  .replace(/\/golf-buggy-parts\//g, "/parts/")
  .replace(/id:\s*'accessories',\s*parent:\s*null,\s*slug:\s*'golf-buggy-accessories'/g, "id: 'accessories', parent: null, slug: 'accessories'")
  .replace(/path:\s*'\s*\/golf-buggy-accessories\/\s*'/g, "path: '/accessories/'")
  .replace(/\/golf-buggy-accessories\//g, "/accessories/");

// Calculate dynamic itemCount for categories.js
const catCounts = {};
PRODUCTS.forEach(p => {
  catCounts[p.category] = (catCounts[p.category] || 0) + 1;
  if (p.subcategory) {
    catCounts[p.subcategory] = (catCounts[p.subcategory] || 0) + 1;
  }
});

// Update itemCounts in CATEGORY_TREE objects inside categories.js
categoriesContent = categoriesContent.replace(/slug:\s*'([^']+)'[\s\S]*?itemCount:\s*\d+/g, (match, slug) => {
  const count = catCounts[slug] || catCounts[slug.replace('golf-buggy-', '')] || 0;
  return match.replace(/itemCount:\s*\d+/, `itemCount: ${count}`);
});

fs.writeFileSync('./src/config/categories.js', categoriesContent, 'utf8');
console.log('Successfully updated src/config/categories.js');

// 3. Update site.js CATEGORIES array itemCounts and slugs
let siteContent = fs.readFileSync('./src/config/site.js', 'utf8');

const siteCategoryMap = [
  { oldSlug: 'golf-carts', newSlug: 'luxury-golf-carts' },
  { oldSlug: 'gps-follow', newSlug: 'gps-follow-buggies' },
  { oldSlug: 'golf-buggy-batteries', newSlug: 'batteries' },
  { oldSlug: 'golf-buggy-parts', newSlug: 'parts' },
  { oldSlug: 'golf-buggy-accessories', newSlug: 'accessories' }
];

siteCategoryMap.forEach(({ oldSlug, newSlug }) => {
  const regex = new RegExp(`slug:\\s*'${oldSlug}'`, 'g');
  siteContent = siteContent.replace(regex, `slug: '${newSlug}'`);
});

siteContent = siteContent.replace(/slug:\s*'([^']+)'[\s\S]*?itemCount:\s*\d+/g, (match, slug) => {
  const count = catCounts[slug] || 0;
  return match.replace(/itemCount:\s*\d+/, `itemCount: ${count}`);
});

fs.writeFileSync('./src/config/site.js', siteContent, 'utf8');
console.log('Successfully updated src/config/site.js');
