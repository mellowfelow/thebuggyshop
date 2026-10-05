import fs from 'fs';

// 1. Read products.js
let productsJs = fs.readFileSync('./src/config/products.js', 'utf8');

// Subcategory rules for products without subcategory
const subcategoryRules = [
  { cat: 'electric-golf-buggies', sub: 'walk-behind' },
  { cat: 'remote-control-golf-buggies', sub: 'remote-control' },
  { cat: 'gps-follow-buggies', sub: 'gps-follow' },
  { cat: 'conversion-kits', sub: 'conversion-kits' },
  { cat: 'used-golf-buggies', sub: 'used' }
];

// 2. Read products from products.js dynamically
const { PRODUCTS } = await import('../src/config/products.js');

// Map products with missing subcategories
PRODUCTS.forEach(p => {
  if (!p.subcategory || p.subcategory === 'NO_SUBCATEGORY') {
    const cat = p.category;
    const nameLower = (p.name + " " + p.slug + " " + (p.description || "")).toLowerCase();

    if (cat === "electric-golf-buggies") p.subcategory = "walk-behind";
    else if (cat === "remote-control-golf-buggies") p.subcategory = "remote-control";
    else if (cat === "gps-follow-buggies") p.subcategory = "gps-follow";
    else if (cat === "conversion-kits") p.subcategory = "conversion-kits";
    else if (cat === "push-pull-golf-buggies") {
      if (nameLower.includes("4-wheel") || nameLower.includes("4 wheel")) p.subcategory = "4-wheel";
      else if (nameLower.includes("trolley")) p.subcategory = "golf-trolleys";
      else p.subcategory = "3-wheel";
    } else if (cat === "luxury-golf-carts") {
      if (nameLower.includes("4-seat") || nameLower.includes("4 seat") || nameLower.includes("6-seat")) p.subcategory = "4-6-seat";
      else if (nameLower.includes("lifted") || nameLower.includes("all-terrain")) p.subcategory = "lifted-all-terrain";
      else if (nameLower.includes("utility")) p.subcategory = "utility";
      else p.subcategory = "2-seat";
    } else if (cat === "off-road-buggies") {
      if (nameLower.includes("dune")) p.subcategory = "dune-buggies";
      else if (nameLower.includes("farm") || nameLower.includes("utv")) p.subcategory = "farm-buggies";
      else p.subcategory = "side-by-side";
    } else if (cat === "kids-buggies") {
      if (nameLower.includes("petrol") || nameLower.includes("90cc")) p.subcategory = "petrol";
      else p.subcategory = "electric";
    } else if (cat === "batteries") {
      if (nameLower.includes("charger")) p.subcategory = "chargers";
      else if (nameLower.includes("set") || nameLower.includes("48v")) p.subcategory = "cart-sets";
      else p.subcategory = "lithium";
    } else if (cat === "used-golf-buggies") {
      p.subcategory = "used";
    } else if (cat === "parts") {
      if (nameLower.includes("motor") || nameLower.includes("controller")) p.subcategory = "drive-electrical";
      else p.subcategory = "wheels-tyres";
    } else if (cat === "accessories") {
      if (nameLower.includes("bag")) p.subcategory = "bags";
      else if (nameLower.includes("ball")) p.subcategory = "golf-balls";
      else if (nameLower.includes("rangefinder") || nameLower.includes("gps") || nameLower.includes("watch")) p.subcategory = "rangefinders-gps";
      else if (nameLower.includes("net") || nameLower.includes("mat") || nameLower.includes("putting")) p.subcategory = "practice-aids";
      else p.subcategory = "accessories";
    } else if (cat === "golf-clubs") {
      if (nameLower.includes("set") || nameLower.includes("package")) p.subcategory = "complete-sets";
      else if (nameLower.includes("driver") || nameLower.includes("iron") || nameLower.includes("wood")) p.subcategory = "woods-and-irons";
      else p.subcategory = "wedges-and-putters";
    }
  }
});

// Update products.js content to add subcategory properties if not present in file text
let newProductsJs = productsJs.replace(/{\s*slug:\s*'([^']+)'/g, (match, slug) => {
  const p = PRODUCTS.find(prod => prod.slug === slug);
  if (p && p.subcategory) {
    if (!match.includes('subcategory:')) {
      return `{\n    slug: '${slug}',\n    subcategory: '${p.subcategory}'`;
    }
  }
  return match;
});

fs.writeFileSync('./src/config/products.js', newProductsJs, 'utf8');
console.log('Updated src/config/products.js with subcategories');

// 3. Fix categories.js
let categoriesJs = fs.readFileSync('./src/config/categories.js', 'utf8');

// Replace category slugs
categoriesJs = categoriesJs
  .replace(/id:\s*'golf-carts'/g, "id: 'luxury-golf-carts'")
  .replace(/slug:\s*'golf-carts'/g, "slug: 'luxury-golf-carts'")
  .replace(/path:\s*'\s*\/golf-carts\/\s*'/g, "path: '/luxury-golf-carts/'")
  .replace(/parent:\s*'golf-carts'/g, "parent: 'luxury-golf-carts'")
  .replace(/id:\s*'gps-follow'/g, "id: 'gps-follow-buggies'")
  .replace(/slug:\s*'gps-follow'/g, "slug: 'gps-follow-buggies'")
  .replace(/path:\s*'\s*\/electric-golf-buggies\/gps-follow\/\s*'/g, "path: '/gps-follow-buggies/'")
  .replace(/id:\s*'batteries',\s*parent:\s*null,\s*slug:\s*'golf-buggy-batteries'/g, "id: 'batteries', parent: null, slug: 'batteries'")
  .replace(/path:\s*'\s*\/golf-buggy-batteries\/\s*'/g, "path: '/batteries/'")
  .replace(/path:\s*'\s*\/golf-buggy-batteries\/([^\/]+)\/\s*'/g, "path: '/batteries/$1/'")
  .replace(/id:\s*'parts',\s*parent:\s*null,\s*slug:\s*'golf-buggy-parts'/g, "id: 'parts', parent: null, slug: 'parts'")
  .replace(/path:\s*'\s*\/golf-buggy-parts\/\s*'/g, "path: '/parts/'")
  .replace(/path:\s*'\s*\/golf-buggy-parts\/([^\/]+)\/\s*'/g, "path: '/parts/$1/'")
  .replace(/id:\s*'accessories',\s*parent:\s*null,\s*slug:\s*'golf-buggy-accessories'/g, "id: 'accessories', parent: null, slug: 'accessories'")
  .replace(/path:\s*'\s*\/golf-buggy-accessories\/\s*'/g, "path: '/accessories/'")
  .replace(/path:\s*'\s*\/golf-buggy-accessories\/([^\/]+)\/\s*'/g, "path: '/accessories/$1/'");

fs.writeFileSync('./src/config/categories.js', categoriesJs, 'utf8');
console.log('Updated src/config/categories.js slugs');
