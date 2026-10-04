import fs from 'fs';
import path from 'path';
import { PRODUCTS, getProductsByCategory } from '../src/config/products.js';
import { CATEGORY_TREE } from '../src/config/categories.js';

console.log('Total products:', PRODUCTS.length);

const categoriesFile = path.resolve('./src/config/categories.js');
let categoriesContent = fs.readFileSync(categoriesFile, 'utf8');

// For each category in CATEGORY_TREE, count matching products
for (const cat of CATEGORY_TREE) {
  const count = getProductsByCategory(cat.slug).length;
  // Update itemCount in categoriesContent for this category slug or id
  const regex = new RegExp(`(slug:\\s*'${cat.slug}',[\\s\\S]*?itemCount:\\s*)\\d+`, 'g');
  categoriesContent = categoriesContent.replace(regex, `$1${count}`);
}

fs.writeFileSync(categoriesFile, categoriesContent, 'utf8');
console.log('Updated category item counts in src/config/categories.js');
