# Product Gap Analysis: The Buggy Shop (Australia)
**Generated:** 6 Oct 2026  |  **Total gaps found:** 5  |  **Category/page gaps:** 2  |  **Product gaps:** 2  |  **Brand gaps:** 1 (unverified)  |  **Accessory gaps:** 0

**Status 6 Oct 2026:** DONE: golf trolleys page stocked (cross-listed), beach buggies merged into dune buggies. OPEN: junior golf buggy, golf scooter (unverified). NOT PURSUED: Hillside Buggies, Walkinshaw and Axglo (not stocked yet, no pages).

**Honest summary:** this export finds very few true product gaps. The site already stocks almost everything people search for. The real gaps are pages with demand and no stock mapped to them. Brand and accessory gaps need the next export (the seeds did not cover them).

## Priority matrix

| Gap | Type | Demand signal | CPC signal | Priority | Revenue potential |
|---|---|---|---|---|---|
| Golf trolley page is empty | Category gap (page exists, no products listed) | 1,070 + electric trolleys 990 | Low (US$0.3) | T1 | High: no new stock needed |
| Beach buggy page empty / dune buggy split | Category gap (merge) | 1,570 | Low to medium (US$0 to 0.6) | T1 | Medium |
| Junior / kids golf buggy | Product gap | 220 | Low | T1 | Low to medium |
| Golf scooter | Product gap (unverified) | 180 | Low | T1 | Unknown: check what shoppers mean |
| Hillside Buggies, Walkinshaw, Axglo | Brand gap (unverified) | 390 combined | Low | T2 | Unknown: verify first |

---

## Category gap: Golf trolleys (stock the page that already exists)

**Priority:** T1  |  **Demand signal:** 1,070 ("golf trolley" 880 plus variants) and 990 for electric trolley terms  |  **CPC:** low

### The opportunity
"Golf trolley" is one of the largest non-head keywords in the export (880 searches a month, KD 13), and `/shop/golf-trolleys/` has 0 products. Australians use "golf buggy" and "golf trolley" for the same product, so the push and walk-behind buggies you already sell belong on that page.

### Suggested products to list
| Item | Why | Demand |
|---|---|---|
| All 6 push buggies (Clicgear, Big Max, QOD) | The core "golf trolley" shopper | 880 |
| All 6 walk-behind electric buggies | "electric golf trolley" 260 and variants | 990 |

### Suggested page structure
- **URL:** /shop/golf-trolleys/ (exists)
- **Title:** Golf Trolley for Sale Australia | Push & Electric
- **Primary keyword:** golf trolley (Vol 880, KD 13, T1)
- **Secondary:** golf trolleys, electric golf trolley, golf troley (typo)
- **Internal links:** link TO /shop/push-pull-golf-buggies/ and /shop/walk-behind/; link FROM both and the homepage.
- **Build note:** this needs a cross-listing rule in the catalogue code (a product can appear on two pages), not new stock.

## Category gap: Beach and dune buggies (merge)

**Demand signal:** 1,570  |  "beach buggy for sale australia" 260 (KD 18), "dune buggies for sale" 210 (KD 16), plus variants.
Both words describe the same product. Keep `/shop/dune-buggies/` (5 products), redirect `/shop/beach-buggies/` (0 products) to it, and put "beach buggy" in the title and H1. If you want a true VW-style beach buggy range, that is a separate sourcing decision.

## Product gap: Junior / kids golf buggy

**Demand signal:** 220 ("kids golf buggy" 110, "junior golf buggy" 110, both KD 7-9).
People want a small push buggy for young golfers. You sell a Junior Golf Club Set but no junior buggy. Source one compact junior push buggy, then create a section under /shop/push-pull-golf-buggies/. Demand is small, so only do this if a supplier is easy.

## Product gap: Golf scooter (unverified)
"scooter golf" and "scooter for golf" total 180 searches at KD 2-3. This could mean a golf-course mobility scooter or an electric scooter for golfers. **Check the Google results before sourcing anything.**

## Brand gap (unverified): Hillside Buggies, Walkinshaw, Axglo
Hillside Buggies (210, KD 28), Walkinshaw (110) and Axglo (70) appear as "[name] golf buggy". They may be competitors or brands you could stock. **Do not create pages until verified.** If you decide to stock one, add a brand page; if not, ignore.

## Accessory gaps
None found in this export. "golf buggy accessories" (390) and "mgi golf buggy accessories" (90) are covered by existing pages. Run an accessory-specific export (umbrella holder, seat, bag, cover, wheels, battery bag) next.

---

## Competitor brand opportunities
- **Aldi golf buggy** (390 + 210 + 100 review terms = 700): comparison blog, see blog-plan.md.
- Bunnings (90), Gumtree (70), Drummond (70): too small to build pages; use as supporting copy in the Aldi post and the used-buggies page.

---

## llms.txt Priority Map

### P1: core pages (always include)
- `/` Homepage
- `/shop/` Shop hub
- `/shop/electric-golf-buggies/`, `/shop/push-pull-golf-buggies/`, `/shop/luxury-golf-carts/`, `/shop/used-golf-buggies/`, `/shop/off-road-buggies/`
- `/brands/` and `/faq/`

### P2: high-value pages (demand 500 or more in this plan)
- `/shop/remote-control-golf-buggies/` (demand 2,740)
- `/brands/mgi/` (demand 2,100)
- `/shop/dune-buggies/` (demand 1,570)
- `/shop/walk-behind/` (demand 990)
- `/shop/3-wheel/` (demand 940)
- `/shop/accessories/` (demand 500)

### P3: content pages
- `/blog/cheap-golf-buggies-and-carts-australia/` (Guide / price roundup, 1500 words; add once published)
- `/blog/best-electric-golf-buggies-australia/` (Listicle / comparison, 2000 words; add once published)
- `/blog/aldi-golf-buggy-vs-specialist-buggy/` (Comparison, 1300 words; add once published)
- `/blog/electric-golf-carts-australia-guide/` (Pillar guide, 3200 words; add once published)
- `/blog/electric-buggy-for-adults-australia/` (Pillar guide, 3000 words; add once published)

### Exclude
`/checkout/`, `/thank-you-*`, `/admin/`, `/search/`, `/compare/`, `/order/*`, pagination (`?page=`) and filter URLs.