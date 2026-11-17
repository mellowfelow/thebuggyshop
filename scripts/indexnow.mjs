// scripts/indexnow.mjs
// Tell IndexNow search engines (Bing, Yandex, Seznam, Naver) which URLs changed.
// Run AFTER a deploy is live:  npm run indexnow            (URLs whose lastmod is today)
//                              npm run indexnow -- --all   (every URL in the live sitemap)
// The key file public/<indexNowKey>.txt is already served from the site root.
import { pathToFileURL, fileURLToPath } from 'url';
import path from 'path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const { SITE } = await import(pathToFileURL(path.join(root, 'src/config/core.js')).href);
const all = process.argv.includes('--all');
const today = new Date().toISOString().slice(0, 10);
const base = `https://${SITE.domain}`;

const xml = await (await fetch(`${base}/sitemap.xml`)).text();
const urls = [...xml.matchAll(/<url>\s*<loc>([^<]+)<\/loc>\s*<lastmod>([^<]+)<\/lastmod>/g)]
  .filter(([, , lm]) => all || lm === today)
  .map(([, loc]) => loc);
if (!urls.length) { console.log(`indexnow: no URLs with lastmod ${today} in the live sitemap; nothing to send (use --all to resend everything)`); process.exit(0); }

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: SITE.domain, key: SITE.indexNowKey, keyLocation: `${base}/${SITE.indexNowKey}.txt`, urlList: urls }),
});
console.log(`indexnow: sent ${urls.length} URLs -> ${res.status} ${res.statusText}`);
process.exit(res.ok || res.status === 202 ? 0 : 1);
