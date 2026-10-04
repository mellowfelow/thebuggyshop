import fs from 'fs';
import path from 'path';

const manifest = JSON.parse(fs.readFileSync('public/images/_manifest.json', 'utf-8'));
const manifestMap = new Map();
manifest.products.forEach(p => {
  manifestMap.set(p.slug, p);
});

// Full specs for the new products to be added (inRepoProductsJs: false)
const NEW_PRODUCTS = [
  {
    slug: 'mgi-zip-navigator-at-all-terrain-golf-buggy',
    name: 'MGI Zip Navigator AT All-Terrain Conversion Bundle',
    brand: 'mgi',
    brandName: 'MGI',
    category: 'conversion-kits',
    categoryPath: '/electric-golf-buggies/conversion-kits/',
    price: 1999,
    condition: 'New',
    badge: 'All-Terrain Twin Motor',
    featured: false,
    rating: 5.0,
    reviewCount: 38,
    power: 'Electric Remote',
    wheels: '4-wheel',
    batteryRange: '36 hole',
    weightCategory: '10–13 kg',
    weightKg: 13.0,
    foldSize: 'Compact flat-fold',
    seats: 'Walk-behind / Remote',
    primaryKeyword: 'mgi zip navigator at all terrain buggy',
    shortDescription: 'All-terrain twin calibrated 230W motors, active gyro straight tracking, and full directional remote control.',
    description: 'The MGI Zip Navigator AT All-Terrain model conquers steep undulations and heavy Australian grass with dual independent motors, rear fifth anti-tip wheel, and Gyroscopic Straight Tracker technology that automatically corrects side-slope drift.',
    specs: {
      power: 'Full Directional Ergonomic Remote Handset',
      motor: 'Twin 230W Independent Calibrated Drive Motors',
      battery: '24V 380Wh Click & Go Lithium (36 Hole)',
      weight: '13.0 kg (Without Battery)',
      wheels: 'All-Terrain Dual Front Swivel & Rear Anti-Tip',
      foldSize: '70cm x 47cm x 42cm',
      brakes: 'Downhill Speed Regulation & Electronic Park Brake',
      warranty: '3-Year Australian Factory Warranty'
    },
    images: [] // populated from manifest
  },
  {
    slug: 'motocaddy-m5-gps-dhc-electric-golf-buggy',
    name: 'Motocaddy M5 GPS DHC Electric Golf Buggy',
    brand: 'motocaddy',
    brandName: 'Motocaddy',
    category: 'gps-follow-buggies',
    categoryPath: '/electric-golf-buggies/gps-follow/',
    price: 1899,
    condition: 'New',
    badge: 'Built-In Course GPS',
    featured: true,
    rating: 4.9,
    reviewCount: 94,
    power: 'Electric Touchscreen',
    wheels: '3-wheel',
    batteryRange: '36 hole',
    weightCategory: '10–13 kg',
    weightKg: 10.9,
    foldSize: 'Slim-Fold Compact',
    seats: 'Walk-behind',
    primaryKeyword: 'motocaddy m5 gps dhc electric golf buggy',
    shortDescription: 'Responsive 3.5-inch touchscreen GPS preloaded with 40,000+ courses, Downhill Control (DHC), and whisper-quiet 230W motor.',
    description: 'The Motocaddy M5 GPS DHC brings high-accuracy GPS fairway distances right to your buggy handle. Features a 3.5-inch colour touchscreen readable in direct Australian sunlight, automatic downhill speed control, electronic parking brake, and ultra-compact folding frame.',
    specs: {
      power: 'High-Res Touchscreen GPS & Digital Speed Dial',
      motor: '230W Whisper-Quiet DHC Motor System',
      battery: '28.8V High-Capacity Lithium Pack (36 Hole)',
      weight: '10.9 kg (Without Battery)',
      wheels: 'All-Terrain Inverted Wheels with DHC',
      foldSize: '65cm x 47cm x 41cm',
      brakes: 'Automatic Downhill Brake & Electronic Parking Brake',
      warranty: '3-Year Australian Warranty'
    },
    images: []
  },
  {
    slug: 'powakaddy-fx7-gps-36-hole-electric-golf-buggy',
    name: 'PowaKaddy FX7 GPS 36-Hole Electric Golf Buggy',
    brand: 'powakaddy',
    brandName: 'PowaKaddy',
    category: 'gps-follow-buggies',
    categoryPath: '/electric-golf-buggies/gps-follow/',
    price: 1799,
    condition: 'New',
    badge: 'Flagship 3.5" Optical GPS',
    featured: false,
    rating: 4.9,
    reviewCount: 82,
    power: 'Electric Touchscreen',
    wheels: '3-wheel',
    batteryRange: '36 hole',
    weightCategory: 'Under 10 kg',
    weightKg: 9.6,
    foldSize: '1-Click Fold',
    seats: 'Walk-behind',
    primaryKeyword: 'powakaddy fx7 gps electric golf buggy',
    shortDescription: 'Cutting-edge 3.5" full colour touchscreen with optical distance measuring, Plug\'n\'Play lithium battery, and ultra-quiet motor.',
    description: 'The PowaKaddy FX7 GPS is the most technologically advanced walk-behind buggy in the FX collection. Featuring a super-responsive 3.5" optical display, fast distance calculations to greens and hazards, and PowaKaddy\'s 1-Click folding system.',
    specs: {
      power: 'Full Colour Touchscreen GPS Interface',
      motor: 'High Power 30V 230W Motor',
      battery: 'Plug\'n\'Play 30V Max Lithium (36 Hole)',
      weight: '9.6 kg',
      wheels: 'Low-Profile Sports Wheels',
      foldSize: '80cm x 56cm x 34cm',
      brakes: 'Electronic Speed Regulation',
      warranty: '3-Year Australian Warranty'
    },
    images: []
  },
  {
    slug: 'stewart-golf-vertx-remote-electric-buggy',
    name: 'Stewart Golf VERTX Remote Electric Golf Buggy',
    brand: 'stewart-golf',
    brandName: 'Stewart Golf',
    category: 'remote-control-golf-buggies',
    categoryPath: '/remote-control-golf-buggies/',
    price: 2699,
    condition: 'New',
    badge: 'Active Terrain Stability',
    featured: true,
    rating: 5.0,
    reviewCount: 67,
    power: 'Electric Remote',
    wheels: '4-wheel',
    batteryRange: '45 hole',
    weightCategory: '14+ kg',
    weightKg: 14.5,
    foldSize: 'Compact flat-fold',
    seats: 'Remote / Walk-behind',
    primaryKeyword: 'stewart golf vertx remote electric buggy',
    shortDescription: 'British precision engineering featuring Active Terrain Control, 100-metre remote range, and SmartPower lithium battery system.',
    description: 'The Stewart Golf VERTX Remote represents the pinnacle of remote-controlled golf trolleys. Active Terrain Stability constantly calculates pitch and roll to keep the buggy tracking straight across the steepest side slopes and undulating fairways.',
    specs: {
      power: 'Rechargeable Handset with 100m Range',
      motor: 'Twin 230W Calibrated Stealth Drive Motors',
      battery: 'SmartPower Lithium (45 Hole Capacity)',
      weight: '14.5 kg',
      wheels: 'Twin Front Swivel Wheels & Anti-Tip Rear',
      foldSize: '64cm x 55cm x 32cm',
      brakes: 'Active Downhill Dynamic Braking',
      warranty: '3-Year Factory Warranty'
    },
    images: []
  },
  {
    slug: 'stewart-golf-x10-follow-electric-buggy',
    name: 'Stewart Golf X10 Follow Autonomous Electric Buggy',
    brand: 'stewart-golf',
    brandName: 'Stewart Golf',
    category: 'gps-follow-buggies',
    categoryPath: '/electric-golf-buggies/gps-follow/',
    price: 3199,
    condition: 'New',
    badge: 'True Autonomous Follow',
    featured: true,
    rating: 5.0,
    reviewCount: 78,
    power: 'Autonomous Follow & Remote',
    wheels: '4-wheel',
    batteryRange: '36 hole',
    weightCategory: '14+ kg',
    weightKg: 14.8,
    foldSize: 'Compact fold',
    seats: 'Autonomous / Remote',
    primaryKeyword: 'stewart golf x10 follow electric buggy',
    shortDescription: 'Seventh-generation autonomous follow technology that tracks you seamlessly down the fairway without touching a button.',
    description: 'The iconic Stewart Golf X10 Follow uses neural tracking technology to monitor your position and follow you automatically down the fairway. Step forward and it rolls behind; stop and it halts instantly. Includes remote handset for manual guidance.',
    specs: {
      power: 'Seventh-Gen Autonomous Follow System & Remote',
      motor: 'Twin Calibrated 230W Motors',
      battery: 'SmartPower Lithium Pack (36 Hole)',
      weight: '14.8 kg',
      wheels: 'Dual Front Casters with Dual Anti-Tip Rollers',
      foldSize: '65cm x 56cm x 33cm',
      brakes: 'Smart Regenerative Dynamic Braking',
      warranty: '3-Year Australian Warranty'
    },
    images: []
  },
  {
    slug: 'powakaddy-rx1-gps-remote-electric-golf-buggy',
    name: 'PowaKaddy RX1 GPS Remote Electric Golf Buggy',
    brand: 'powakaddy',
    brandName: 'PowaKaddy',
    category: 'remote-control-golf-buggies',
    categoryPath: '/remote-control-golf-buggies/',
    price: 2499,
    condition: 'New',
    badge: 'Remote + GPS Integrated',
    featured: false,
    rating: 4.9,
    reviewCount: 53,
    power: 'Electric Remote',
    wheels: '4-wheel',
    batteryRange: '36 hole',
    weightCategory: '14+ kg',
    weightKg: 14.0,
    foldSize: 'Slim fold',
    seats: 'Remote / Walk-behind',
    primaryKeyword: 'powakaddy rx1 gps remote electric golf buggy',
    shortDescription: 'Dual control freedom combining ergonomic remote handset navigation with a 3.5-inch touchscreen course GPS.',
    description: 'The PowaKaddy RX1 GPS Remote combines high-performance wireless handset steering with an ultra-bright 3.5" GPS touchscreen on the handle. Dual 230W motors power through deep rough and steep climbs while twin rear anti-tip wheels guarantee rock-solid stability.',
    specs: {
      power: 'Ergonomic Remote Control & 3.5" Touchscreen GPS',
      motor: 'Twin 30V 230W Motors',
      battery: 'Plug\'n\'Play 30V High-Capacity Lithium',
      weight: '14.0 kg',
      wheels: 'All-Terrain Sports Wheels with Anti-Tip',
      foldSize: '80cm x 56cm x 34cm',
      brakes: 'Electronic Slope Descent Control',
      warranty: '3-Year Australian Warranty'
    },
    images: []
  },
  {
    slug: 'powakaddy-dlx-push-button-electric-golf-buggy',
    name: 'PowaKaddy DLX Electric Golf Buggy',
    brand: 'powakaddy',
    brandName: 'PowaKaddy',
    category: 'electric-golf-buggies',
    categoryPath: '/electric-golf-buggies/walk-behind/',
    price: 1199,
    condition: 'New',
    badge: 'Push-Button Benchmark',
    featured: false,
    rating: 4.8,
    reviewCount: 65,
    power: 'Electric',
    wheels: '3-wheel',
    batteryRange: '36 hole',
    weightCategory: 'Under 10 kg',
    weightKg: 9.4,
    foldSize: '1-Click Fold',
    seats: 'Walk-behind',
    primaryKeyword: 'powakaddy dlx electric golf buggy',
    shortDescription: 'Reliable, lightweight push-button electric buggy with whisper-quiet motor and high-performance lithium power.',
    description: 'The PowaKaddy DLX delivers proven British engineering in a simple, durable walk-behind design. Turn the ergonomic speed dial, press start, and enjoy effortless power across 36 holes on a single charge.',
    specs: {
      power: 'Push-Button Variable Digital Speed Dial',
      motor: '230W Whisper-Quiet Motor',
      battery: 'Plug\'n\'Play Lightweight Lithium (36 Hole)',
      weight: '9.4 kg',
      wheels: 'Low-Profile Quick-Release Wheels',
      foldSize: '78cm x 54cm x 35cm',
      brakes: 'Dynamic Speed Descent Brakes',
      warranty: '3-Year Australian Warranty'
    },
    images: []
  },
  {
    slug: 'big-max-iq-2-360-push-golf-buggy',
    name: 'Big Max IQ 2 360 Push Golf Buggy',
    brand: 'big-max',
    brandName: 'Big Max',
    category: 'push-pull-golf-buggies',
    categoryPath: '/push-pull-golf-buggies/',
    price: 499,
    condition: 'New',
    badge: '360° Front Swivel',
    featured: false,
    rating: 4.9,
    reviewCount: 71,
    power: 'Manual Push',
    wheels: '3-wheel',
    batteryRange: 'N/A - Push',
    weightCategory: 'Under 7 kg',
    weightKg: 6.8,
    foldSize: 'Ultra-compact cubic fold',
    seats: 'Manual push',
    primaryKeyword: 'big max iq 2 360 push golf buggy',
    shortDescription: 'Full 360-degree front wheel spin for effortless fairway turning, deluxe organiser panel, and ultra-compact cubic fold.',
    description: 'The Big Max IQ 2 360 turns on a dime with its lockable 360-degree front wheel. Folds down into a compact cubic shape that fits in any Australian car boot alongside a full tour bag.',
    specs: {
      power: 'Manual Push with 360° Front Swivel Wheel',
      motor: 'None (Manual Ultra-Lightweight)',
      battery: 'None',
      weight: '6.8 kg',
      wheels: '360° Front Swivel + 2 Large Sealed Ball-Bearing Rear',
      foldSize: '58cm x 37cm x 42cm',
      brakes: 'Hand-Operated Foot Brake',
      warranty: '5-Year Manufacturer Warranty'
    },
    images: []
  }
];

// Load current products.js
const productsJsPath = path.resolve('src/config/products.js');
let content = fs.readFileSync(productsJsPath, 'utf-8');

// Function to update images for an existing product
function updateProductImageArray(productSlug, newImages) {
  // Regex to find the product block by slug
  const slugRegex = new RegExp(`(slug:\\s*['"]${productSlug}['"][\\s\\S]*?images:\\s*\\[)([\\s\\S]*?)(\\])`, 'm');
  const formattedImages = '\n' + newImages.map(img => `      '${img}'`).join(',\n') + '\n    ';
  if (slugRegex.test(content)) {
    content = content.replace(slugRegex, `$1${formattedImages}$3`);
    console.log(`Updated images for existing product: ${productSlug} (${newImages.length} images)`);
    return true;
  }
  return false;
}

// 1. Update all existing products
for (const item of manifest.products) {
  const images = [item.main, ...item.gallery];
  updateProductImageArray(item.slug, images);
}

// 2. Add new products marked inRepoProductsJs: false
const newProductsToAdd = [];
for (const newProd of NEW_PRODUCTS) {
  const manifestItem = manifestMap.get(newProd.slug);
  if (manifestItem) {
    newProd.images = [manifestItem.main, ...manifestItem.gallery];
  }
  // Check if already in products.js
  if (!content.includes(`slug: '${newProd.slug}'`) && !content.includes(`slug: "${newProd.slug}"`)) {
    newProductsToAdd.push(newProd);
  }
}

if (newProductsToAdd.length > 0) {
  console.log(`Adding ${newProductsToAdd.length} new products to products.js...`);
  // Find the closing bracket of the export const PRODUCTS array
  const lastBracketIndex = content.lastIndexOf('];');
  if (lastBracketIndex !== -1) {
    const serializedNewProducts = newProductsToAdd.map(p => {
      return `  {\n` +
        `    slug: '${p.slug}',\n` +
        `    name: '${p.name.replace(/'/g, "\\'")}',\n` +
        `    brand: '${p.brand}',\n` +
        `    brandName: '${p.brandName}',\n` +
        `    category: '${p.category}',\n` +
        `    categoryPath: '${p.categoryPath}',\n` +
        `    price: ${p.price},\n` +
        `    condition: '${p.condition}',\n` +
        `    badge: '${p.badge.replace(/'/g, "\\'")}',\n` +
        `    featured: ${p.featured},\n` +
        `    rating: ${p.rating},\n` +
        `    reviewCount: ${p.reviewCount},\n` +
        `    power: '${p.power}',\n` +
        `    wheels: '${p.wheels}',\n` +
        `    batteryRange: '${p.batteryRange}',\n` +
        `    weightCategory: '${p.weightCategory}',\n` +
        `    weightKg: ${p.weightKg},\n` +
        `    foldSize: '${p.foldSize}',\n` +
        `    seats: '${p.seats}',\n` +
        `    primaryKeyword: '${p.primaryKeyword.replace(/'/g, "\\'")}',\n` +
        `    shortDescription: '${p.shortDescription.replace(/'/g, "\\'")}',\n` +
        `    description: '${p.description.replace(/'/g, "\\'")}',\n` +
        `    specs: {\n` +
        Object.entries(p.specs).map(([k, v]) => `      ${k}: '${v.replace(/'/g, "\\'")}'`).join(',\n') + '\n' +
        `    },\n` +
        `    images: [\n` +
        p.images.map(img => `      '${img}'`).join(',\n') + '\n' +
        `    ]\n` +
        `  }`;
    }).join(',\n');

    content = content.slice(0, lastBracketIndex) + ',\n' + serializedNewProducts + '\n' + content.slice(lastBracketIndex);
    console.log('Successfully inserted new products into products.js');
  }
}

fs.writeFileSync(productsJsPath, content, 'utf-8');
console.log('Finished updating src/config/products.js!');
