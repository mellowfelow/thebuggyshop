// scripts/gen-markdown.mjs
// Markdown twins of the indexable pages, for agents that send "Accept: text/markdown" (served by /middleware.js).
// Built from the same config as the site (products, categories, brands, posts, FAQ), so the two can never disagree.
// Output: public/md/<path>/index.md (git-ignored, regenerated on every build).
import fs from 'fs';
import path from 'path';
import { pathToFileURL, fileURLToPath } from 'url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const imp = (p) => import(pathToFileURL(path.join(root, p)).href);
const { SITE, CONTACT } = await imp('src/config/site.js');
const { PRODUCTS, getProductsByCategory } = await imp('src/config/products.js');
const { CATEGORY_TREE, isPage } = await imp('src/config/categories.js');
const { BRANDS } = await imp('src/config/brands.js');
const { LOCATIONS } = await imp('src/config/locations.js');
const { POSTS } = await imp('src/config/posts.js');
const { FAQ_BANK, HOMEPAGE_FAQS, FACTS, money } = await imp('src/config/faq.js');

const base = `https://${SITE.domain}`;
const out = path.join(root, 'public/md');
fs.rmSync(out, { recursive: true, force: true });
const write = (urlPath, md) => { const dir = path.join(out, urlPath.replace(/^\/|\/$/g, '')); fs.mkdirSync(dir, { recursive: true }); fs.writeFileSync(path.join(dir, 'index.md'), md.trim() + '\n'); };
const abs = (p) => base + p;
const absLinks = (s) => s.replace(/\]\((\/[^)\s]*)\)/g, (m, p) => `](${abs(p)})`);
const plain = (s) => String(s ?? '').replace(/\s+/g, ' ').trim();
const qa = (list) => list.map((f) => `### ${f.question}\n\n${plain(f.answer)}\n\n[${f.cta.label}](${abs(f.cta.href)})`).join('\n\n');
const prodLine = (p) => `- [${p.name}](${abs(`/shop/${p.category}/${p.slug}/`)}): $${Math.round(p.price).toLocaleString('en-AU')} AUD${p.condition && p.condition !== 'New' ? ` (${p.condition})` : ''}`;
const specLines = (p) => Object.entries(p.specs || {}).filter(([k, v]) => !['power', 'brand', 'condition', 'category'].includes(k) || (k === 'power' && v !== 'Manual / Accessory')).map(([k, v]) => `- ${k.replace(/([A-Z])/g, ' $1').replace(/^./, (c) => c.toUpperCase())}: ${plain(v)}`);
const footer = `\n---\nThe Buggy Shop, Queensland, Australia. Phone/WhatsApp ${CONTACT.phoneDisplay}. All prices in AUD and include GST. Flat-rate delivery ${money(FACTS.ship)} Australia-wide by hydraulic tail-lift truck.`;
let count = 0;
const put = (u, md) => { write(u, md + footer); count++; };

// home
const roots = CATEGORY_TREE.filter((c) => !c.parent && isPage(c) && getProductsByCategory(c.slug).length);
put('/', `# ${SITE.name}: golf buggies for sale in Australia\n\n> ${plain(SITE.tagline)}\n\nThe Buggy Shop is a Queensland-based specialist (established 2004) selling golf buggies, remote control and GPS follow buggies, ride-on golf carts, off-road buggies, batteries, parts, accessories and golf gear, with nationwide delivery.\n\n## Shop by category\n\n${roots.map((c) => `- [${c.navLabel || c.pageTitle}](${abs(`/shop/${c.slug}/`)})`).join('\n')}\n\n## Frequently asked questions\n\n${qa(HOMEPAGE_FAQS)}\n\n## Guides\n\n${POSTS.slice(0, 8).map((p) => `- [${p.title}](${abs(`/blog/${p.slug}/`)})`).join('\n')}\n\nSource: ${abs('/')}`);

// shop hub
put('/shop/', `# Golf buggies for sale in Australia\n\n${PRODUCTS.length} products across ${roots.length} categories.\n\n${roots.map((c) => `## [${c.navLabel || c.pageTitle}](${abs(`/shop/${c.slug}/`)})\n\n${plain(c.metaDescription)}`).join('\n\n')}\n\nSource: ${abs('/shop/')}`);

// categories and sub-categories
for (const c of CATEGORY_TREE.filter((n) => isPage(n) && getProductsByCategory(n.slug).length > 0)) {
  const list = getProductsByCategory(c.slug);
  put(`/shop/${c.slug}/`, `# ${c.h1}\n\n> ${plain(c.metaDescription)}\n\n${plain(c.introCopy)}\n\n## Products (${list.length})\n\n${list.map(prodLine).join('\n')}\n\nSource: ${abs(`/shop/${c.slug}/`)}`);
}

// products
for (const p of PRODUCTS) {
  const specs = specLines(p);
  put(`/shop/${p.category}/${p.slug}/`, `# ${p.name}\n\n- Price: $${Math.round(p.price).toLocaleString('en-AU')} AUD (GST included)\n- Brand: ${p.brandName || p.brand}\n- Condition: ${p.condition || 'New'}\n- Category: [${p.category}](${abs(`/shop/${p.category}/`)})\n\n${plain(p.shortDescription || p.description)}\n\n${specs.length ? `## Specifications\n\n${specs.join('\n')}\n\n` : ''}Source: ${abs(`/shop/${p.category}/${p.slug}/`)}`);
}

// brands (only those with stock, matching the sitemap)
for (const b of BRANDS.filter((x) => PRODUCTS.some((p) => p.brand === x.slug))) {
  const list = PRODUCTS.filter((p) => p.brand === b.slug);
  put(`/brands/${b.slug}/`, `# ${b.h1 || b.pageTitle}\n\n> ${plain(b.metaDescription)}\n\n${plain(b.introCopy)}\n\n## Products (${list.length})\n\n${list.map(prodLine).join('\n')}\n\nSource: ${abs(`/brands/${b.slug}/`)}`);
}
put('/brands/', `# Golf buggy and cart brands in Australia\n\n${BRANDS.filter((b) => PRODUCTS.some((p) => p.brand === b.slug)).map((b) => `- [${b.name}](${abs(`/brands/${b.slug}/`)}): ${plain(b.blurb || b.metaDescription)}`).join('\n')}\n\nSource: ${abs('/brands/')}`);

// locations
for (const l of LOCATIONS) put(`/golf-buggies/${l.slug}/`, `# ${l.h1 || l.title}\n\n> ${plain(l.metaDescription)}\n\n${plain(l.introCopy)}\n\nDelivery: ${plain(l.deliveryTime)}\n\nSource: ${abs(`/golf-buggies/${l.slug}/`)}`);
put('/golf-buggies/', `# Golf buggies for sale near you: choose your city\n\n${LOCATIONS.map((l) => `- [${l.name}, ${l.state}](${abs(`/golf-buggies/${l.slug}/`)})`).join('\n')}\n\nSource: ${abs('/golf-buggies/')}`);

// blog
put('/blog/', `# Golf buggy and golf gear guides\n\n${POSTS.map((p) => `- [${p.title}](${abs(`/blog/${p.slug}/`)}): ${plain(p.metaDescription)}`).join('\n')}\n\nSource: ${abs('/blog/')}`);
for (const p of POSTS) {
  const faqs = (p.faqIds || []).map((id) => FAQ_BANK.find((f) => f.id === id)).filter(Boolean);
  put(`/blog/${p.slug}/`, `# ${p.title}\n\n> ${plain(p.metaDescription)}\n\nUpdated ${p.updated}.\n\n${absLinks(p.content)}\n\n${faqs.length ? `## FAQ\n\n${qa(faqs)}\n\n` : ''}Source: ${abs(`/blog/${p.slug}/`)}`);
}

// faq page
put('/faq/', `# Frequently asked questions\n\n${qa(FAQ_BANK.filter((f) => f.pages.includes('/faq/') || f.home))}\n\nSource: ${abs('/faq/')}`);

console.log(`gen-markdown: ${count} markdown pages written to public/md/`);
