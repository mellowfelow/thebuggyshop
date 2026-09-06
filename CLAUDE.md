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
- `SITE.domain`: Currently `DOMAIN.com` (change before live custom domain DNS propagation).
- `FORMS.web3formsKey`: Form submissions fallback to thank-you redirect until key is populated; WhatsApp chat remains live order channel.
- `SITE.gscVerification`: Pending Google Search Console verification token.

## Brand Authority Facts
- Founded: 2004, Queensland, Australia (20+ Years continuous trading).
- HQ: QLD, Australia.
- Phone & WhatsApp: +61 480 811 308 (Display: 0480 811 308).
- Payment: PayID, Bank Transfer (EFT), Commercial Chattel Invoice, 10% Crypto rebate (BTC/USDT).
- Shipping: Flat-rate hydraulic tail-lift gate delivery nationwide.
No invented statistics, awards, press, or named clients. Ever.
