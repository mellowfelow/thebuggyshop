# The Buggy Shop — Strategic Project Architecture

## Executive Summary
- **Entity**: The Buggy Shop
- **Core Market**: Australia (Queensland HQ, NSW, VIC, WA, SA, TAS, NT)
- **Offering**: Turnkey lithium (LiFePO4) luxury all-terrain buggies, estate cruisers, and agricultural farm utility vehicles.
- **Key Positioning**: 20+ years of Australian engineering heritage, turnkey road-legal conditional registration, 5-year battery warranty, flat-rate hydraulic tail-lift delivery.
- **Settlement Channels**: PayID, Direct Bank Transfer, Commercial Chattel Mortgage Invoice, 10% Instant Crypto (BTC/USDT) Discount.

## Route Architecture
1. `/` (Homepage — Single H1, 4-slide hero, trust bar, 3 category tiles, interactive featured models, road compliance featurette, Pay in 4 teaser, 8 authority pillars, blog highlights, WhatsApp CTA)
2. `/shop/` (Full vehicle catalog, category filters, price sort)
3. `/shop/[category]/` (Category index with `generateStaticParams`)
4. `/shop/[category]/[slug]/` (Product detail with `generateStaticParams`, interactive photo gallery, specs table, Pay in 4 split, WhatsApp instant quote, Product + Offer JSON-LD)
5. `/compare/` (Engineering specs comparison matrix)
6. `/finance/` (Interactive Pay in 4 and commercial asset lease calculator)
7. `/blog/` & `/blog/[slug]/` (Outback technical guides, battery care, road registration)
8. `/about/` (>700 words Australian heritage, milestones, 8 differentiators, Organization JSON-LD)
9. `/contact/` (SMTP-backed enquiry form via `/api/contact`, WhatsApp direct channel, Queensland HQ details), plus `/wholesale/`, `/faq/`, `/shipping/`, `/returns/`, `/privacy/`, `/terms/`
10. `/search/` (Instant search for vehicles, categories, and technical articles)
11. `/thank-you-contact/` & `/thank-you-order/` (noindex, follow)
12. `/not-found` (Custom 404, noindex, follow)

## Agent-Ready Protocols
- MCP (Streamable HTTP Server at `/api/mcp`)
- UCP 1.0 (`/.well-known/ucp` + `/api/ucp/services`)
- ACP 0.1.0 (`/.well-known/acp.json` + `/api/acp/catalog`)
- RFC 9727 API Catalog (`/.well-known/api-catalog`)
- Agent Skills (`/.well-known/agent-skills/index.json`)
- LLMs (`/llms.txt`)
- Auth (`/auth.md`)
- WebMCP (`/public/js/webmcp.js`)


## Taxonomy (single source: src/config/categories.js)
Roots: electric-golf-buggies (walk-behind, remote-control-golf-buggies, gps-follow-buggies, conversion-kits), push-pull-golf-buggies (3-wheel, 4-wheel, golf-trolleys), luxury-golf-carts (2-seat, 4-6-seat, lifted-all-terrain, utility, used), off-road-buggies (dune-buggies, side-by-side, farm-buggies, beach-buggies, 2-seater-petrol), kids-buggies (electric, petrol), batteries (lithium, chargers, cart-sets), parts (wheels-tyres, drive-electrical, golf-buggy-repairs), accessories (holders, seats-footboards, covers-and-bags, wheel-upgrades, bags, golf-balls, rangefinders-gps, practice-aids), golf-clubs (complete-sets, woods-and-irons, wedges-and-putters), used-golf-buggies (ex-demo; cross-lists every Used / Ex-Demo product).
URLs: `/shop/<node-slug>/` for every node, `/shop/<root>/<product-slug>/` for products. Parent pages list the whole family.

## Open items (client)
- Final domain (repo currently uses thebuggyshop.com.au and thebuggyshoppty.com.au in different places).
- Real photos for 128 products (109 placeholder, 19 stock).
- Review the drafted shipping / returns / privacy / terms wording.
- Brand pages for 28 product brands that have none.
