# The Buggy Shop — Project Instructions

React/Next.js luxury all-terrain & estate buggy ecommerce site, Vercel target, deployed via GitHub.

## Non-negotiable: Australian Vehicle & Safety Standards
- Never fabricate speed claims exceeding state conditional registration parameters without noting road compliance context.
- LiFePO4 battery warranty is strictly 5-Year domestic replacement.
- Turnkey road legal compliance applies to Queensland (TMR), New South Wales (Transport for NSW), and Victoria (VicRoads).
- If a request would require breaking the above, stop and say so rather than complying.

## Architecture
`src/config/site.js` is the single source of truth. Adding one entry to `PRODUCTS`, `CATEGORIES`, or `POSTS`
generates the page, route, meta, JSON-LD, sitemap entry and nav links. Never hand-write redundant pages.
Never hand-edit generated files (`llms.txt`, `.well-known/*`, `vercel.json`) — edit `src/config/site.js` and run `npm run gen` or build.

## Rules
- `npm run build && npm run crosscheck` must pass before every push.
- One `<h1>` per page. Meta descriptions ~150 chars. Titles ≤60 chars.
- Emails entity-encoded (&#64;) everywhere, including in JSON-LD.
- Never commit `node_modules/`, `.next/`, `out/`.
- Framework Preset on Vercel must be "Next.js".

## Live Placeholders
- `SITE.domain`: `thebuggyshoppty.com.au` (Vercel production domain; www 308-redirects to it). `CROSSCHECK_PRODUCTION=1 npm run crosscheck` fails if a placeholder domain ever returns.
- Forms: ALL forms (checkout, contact, wholesale) post to `/api/contact` and send through SMTP. Web3Forms is retired and must not return.
- Env vars (Vercel): `SMTP_HOST/PORT/USER/PASS/FROM`, `ORDER_EMAIL`, `CONTACT_EMAIL`, `WHOLESALE_EMAIL`, `ADMIN_PASSCODE` (required, 8+ chars, NO default), `UPSTASH_REDIS_REST_URL/TOKEN`, `SITE_URL`.
- `SITE.gscVerification`: pending Google Search Console token.

## Hard rules learned from the audit
- Never put real or sample bank / PayID / wallet details in code. The operator pastes live details per order in /admin; the public payment page only shows details the admin has sent.
- Never emit AggregateRating unless a product carries real supplied `rating` + `reviewCount` (use `hasRealRating`). Migrated client reviews in `REVIEWS` / `REVIEW_STATS` are real and stay untouched.
- Taxonomy has ONE source: `src/config/categories.js`. Product `category` = a tree ROOT slug, `subcategory` = a child of that root. Counts are computed, never stored.
- Product images live in `public/images/products/<product-slug>/main.webp|jpg + gallery-N`. See docs/IMAGES.md.
- Never take URLs for emails from request headers; use `lib/siteUrl.js`.

## Brand Authority Facts
- Founded: 2004, Queensland, Australia (20+ Years continuous trading).
- HQ: QLD, Australia.
- Phone & WhatsApp: +61 480 811 308 (Display: 0480 811 308).
- Payment: PayID, Bank Transfer (EFT), Commercial Chattel Invoice, 10% Crypto rebate (BTC/USDT).
- Shipping: Flat-rate hydraulic tail-lift gate delivery nationwide.
No invented statistics, awards, press, or named clients. Ever.
