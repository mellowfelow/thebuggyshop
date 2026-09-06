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
9. `/contact/` (Web3Forms CORS form, WhatsApp direct channel, Queensland HQ details)
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
