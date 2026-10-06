# Double Analysis: keyword engine v2
**Run 6 Oct 2026.** A second, independent pass over the same 50 export files, written separately from the first pass so the two can disagree.

**Result: 12 of 12 verification checks pass, plus 308 of 308 content checks (lengths, keyword in title, links) and 0 title/H1/meta clashes against the 280 live pages.** The second pass found 5 real problems in the first pass; all are fixed (below).

## What the second pass did differently
| Check | First pass | Second pass |
| --- | --- | --- |
| Source data | Loaded by the first script | Re-read from the raw CSVs with a separate parser; recomputed volume and KD for all 450 pooled keywords |
| Clustering | Hand-written rules (first match wins) | Token-prototype test: each keyword is scored against every cluster's common words and flagged if another cluster fits clearly better |
| Export coherence | None | Does each keyword sit in a cluster that matches the export file it came from |
| Ownership | Claims by page and post | Every pooled keyword must have exactly one owner; totals must conserve |
| Cannibalisation | Cluster = one URL | Word-overlap between every pair of primary keywords |
| Copy | Written to the brief | Lengths, keyword in title, keyword in the first 150 words, FAQ 40 to 65 words, link targets exist, uniqueness vs live pages |

## Checks
| Result | Check |
| --- | --- |
| PASS | V1 raw rows re-read: 5099 rows from 50 files (first pass: 5,099) |
| PASS | V1 volume recomputed from source for all 450 pool keywords: 0 mismatches |
| PASS | V1 difficulty recomputed from source for all 450 pool keywords: 0 mismatches |
| PASS | V1 every source keyword with vol >= 50 and KD < 56 is in the pool or a documented drop list: 0 unexplained |
| PASS | V2 independent token-prototype test agrees with the rule-based clusters for 419/450 keywords (93%) |
| PASS | V3 seed coherence: 2 keywords sit in a cluster family that does not match the export they came from |
| PASS | V4 every pool keyword has exactly one owner (450 keys, 450 rows) |
| PASS | V5 volume conservation: owner totals 164,320 = pool total 164,320 |
| PASS | V5 cluster file total 164,320 = allocation total |
| PASS | V4 claim conflicts and unmatched phrases: 0 |
| PASS | V4 no keyword is the primary of two URLs (86 primaries) |
| PASS | V6 near-duplicate primary keywords across URLs (Jaccard >= 0.75): 11 found, 11 hand-reviewed and accepted (modifier variants or hierarchy), 0 unreviewed |

## Problems the second pass found, and what I did
| # | Finding | Fix |
| --- | --- | --- |
| 1 | Difficulty (KD) scores did not match the source for 26 keywords. Semrush KD drifts between exports (181 of 227 keywords in both the September and October files changed, and files from the same day disagree), and the first pass kept whichever file loaded first. | New documented rule: newest export wins; within it, highest volume and the most common KD. All 450 now reconcile to source. Tiers were re-derived from the corrected KD. |
| 2 | Eleven primary-keyword pairs overlapped by 75%, including a parent and child battery page that share most of their words. | Reviewed every pair. Nine are modifier variants with different intent; one parent and child pair mitigated by removing "lithium" from the parent title; one is an empty noindexed page. |
| 3 | The first draft had 7 claim conflicts (the same keyword owned by two pages or posts), 2 over-length metas, 4 titles missing their primary keyword and 20 FAQ answers under 40 words. | Resolved before this pass: conflicts assigned to one owner, copy adjusted, answers extended. 0 remain. |
| 4 | Brosnan Golf, assumed to be a buggy brand, is a large Australian retailer and club maker (Golf World, 16 stores) and "Stinger" is one of its club-set brands. 880 + 590 searches were mis-assigned. | Brosnan moved to the competitor list; Stinger moved to "verify first". Brand page recommended noindex. |
| 5 | Catalogue gap: most golf-gear products have boilerplate descriptions and no specs, and most lithium buggy batteries list a 1 to 2 year warranty while CLAUDE.md says 5-year LiFePO4. | Posts quote only what each product states; the Garmin, Bushnell and Shot Scope comparisons moved to the planned list until spec sheets exist. Battery warranty flagged as decision #7. |

## Clustering test: 419 of 450 agree (93%). The 31 flagged keywords, reviewed by hand
| Keyword (searches) | Rules say / nearest cluster | Verdict |
| --- | --- | --- |
| electric buggy for adults australia (70) | electric-buggy / farm | Rule assignment confirmed correct |
| electric buggy australia (50) | electric-buggy / best | Rule assignment confirmed correct |
| motorised golf buggy for sale (170) | electric / hub | Rule assignment confirmed correct |
| electric golf push cart (70) | push / electric-cart | Rule assignment confirmed correct |
| kids off road buggy (210) | kids / offroad | Rule assignment confirmed correct |
| golf cart parts (260) | parts / brand-clubcar | Rule assignment confirmed correct |
| golf cart parts australia (110) | parts / brand-clubcar | Rule assignment confirmed correct |
| golf buggies for sale sydney (70) | local / hub | Rule assignment confirmed correct |
| golf buggies for sale near me (50) | local / hub | Rule assignment confirmed correct |
| golf buggies perth (50) | local / brand-bigmax | Rule assignment confirmed correct |
| electric golf carts for sale (260) | cart / cheap | Rule assignment confirmed correct |
| golf cart sales (260) | cart / cheap | Rule assignment confirmed correct |
| golf buggy with seat (320) | cart / brand-bigmax | Rule assignment confirmed correct |
| electric ride on golf buggy (50) | cart / electric | Rule assignment confirmed correct |
| golf buggy cart (110) | cart / brand-bigmax | Rule assignment confirmed correct |
| ride on golf buggy (140) | cart / brand-bigmax | Rule assignment confirmed correct |
| golf car australia (50) | cart / home | Rule assignment confirmed correct |
| golf carts for sale australia (110) | cart / cheap | Rule assignment confirmed correct |
| new golf carts for sale australia (50) | cart / cheap | Rule assignment confirmed correct |
| golf cart australia (210) | cart / accessories | Rule assignment confirmed correct |
| golf cart auction (170) | used / brand-bigmax | Rule assignment confirmed correct |
| golf buggy service (50) | repairs / brand-bigmax | Rule assignment confirmed correct |
| can am off road (50) | brand-canam / offroad | Rule assignment confirmed correct |
| clicgear golf buggies (70) | brand-clicgear / brand-bigmax | Rule assignment confirmed correct |
| clicgear 3.5 golf buggy (50) | brand-clicgear / brand-bigmax | Rule assignment confirmed correct |
| golf watches gps (90) | rangefinder / brand-garmin | Rule assignment confirmed correct |
| best golf sticks (70) | golf-clubs / best | Rule assignment confirmed correct |
| golf club wedge set (320) | wedge / club-set | Rule assignment confirmed correct |
| golf putters second hand (70) | putter / used | Correct cluster; do not offer in copy (not sold) |
| putter golf club (110) | putter / club-set | Rule assignment confirmed correct |
| best rated putter (50) | putter / golf-watch | Rule assignment confirmed correct |

**Result of the hand review:** 29 of 31 are correct as assigned (the prototype test is crude: it over-weights shared words such as "golf" and "buggy"). The other 2 are correct clusters but terms you do not sell, so they stay out of copy.

## Spot check: 40 random allocations
| Keyword | Vol / KD | Cluster | Owner | Role |
| --- | --- | --- | --- | --- |
| best golf push buggy | 50 / 21 | best | /blog/best-electric-golf-buggies-australia/ | lsi |
| 52 degree wedge golf | 50 / 15 | wedge | /blog/golf-wedge-degrees-loft-guide/ | lsi |
| 3 wheel golf buggy | 210 / 17 | 3wheel | /shop/3-wheel/ | secondary |
| electric golf cart with remote | 90 / 18 | remote | /shop/remote-control-golf-buggies/ | lsi |
| three wheel golf buggy | 210 / 7 | 3wheel | /shop/3-wheel/ | primary |
| stix 10 piece golf club set | 50 / 9 | competitor | COMPETITOR (held for comparison content) | lsi |
| golf trolley | 880 / 13 | trolley | /shop/golf-trolleys/ | secondary |
| golf carts for sale wa | 50 / 12 | local | /golf-buggies/perth/ | secondary |
| golf putters second hand | 70 / 9 | putter | /shop/wedges-and-putters/ | lsi |
| 3 iron golf club | 210 / 14 | iron | /blog/golf-irons-explained-3-iron-to-9-iron/ | secondary |
| types of golf putters | 50 / 7 | putter | /blog/best-golf-putters-types-guide-australia/ | secondary |
| mgi zip | 110 / 20 | brand-mgi | /blog/mgi-zip-vs-ai-navigator-which-mgi-buggy/ | secondary |
| maxi golfers | 50 / 12 | ambiguous-brand | UNTARGETED | lsi |
| ecar compass 4s golf cart | 50 / 7 | brand-ecar | /brands/ecar/ | lsi |
| electric caddies | 90 / 26 | etrolley | /shop/walk-behind/ | secondary |
| batteries for golf cars | 110 / 9 | battery-cart | /shop/cart-sets/ | secondary |
| golf pram | 110 / 15 | push | /shop/push-pull-golf-buggies/ | lsi |
| motocaddy electric cart | 70 / 4 | brand-motocaddy | /blog/motocaddy-s1-vs-m5-gps-vs-m7-remote/ | secondary |
| good putters for golf | 50 / 28 | putter | /blog/best-golf-putters-types-guide-australia/ | secondary |
| golf buggies for sale sydney | 70 / 14 | local | /golf-buggies/sydney/ | primary |
| dune bug | 260 / 22 | dune | /shop/dune-buggies/ | secondary |
| l.a.b. putter australia | 70 / 6 | competitor | COMPETITOR (held for comparison content) | lsi |
| putt lab perth | 70 / 16 | competitor | COMPETITOR (held for comparison content) | lsi |
| golf buggy parts australia | 90 / 6 | parts | /shop/parts/ | secondary |
| shotscope | 590 / 14 | brand-shotscope | /brands/shot-scope/ | primary |
| new golf cart | 50 / 35 | cart | /shop/luxury-golf-carts/ | lsi |
| junior golf club set | 210 / 17 | kids-clubs | /blog/junior-golf-clubs-kids-golf-sets-by-age/ | secondary |
| range golf bags | 50 / 8 | bag | /shop/bags/ | lsi |
| golf rangefinder | 1900 / 17 | rangefinder | /shop/rangefinders-gps/ | primary |
| golf carts brisbane | 50 / 13 | local | /golf-buggies/brisbane/ | lsi |
| golf club set starter | 50 / 16 | club-set | /blog/best-golf-club-sets-for-beginners-australia/ | secondary |
| golf buggy | 6600 / 11 | home | / | secondary |
| electric golf buggy | 1900 / 41 | electric | /shop/electric-golf-buggies/ | lsi |
| can-am australia price | 50 / 18 | brand-canam | /brands/can-am/ | lsi |
| garmin golf gps | 110 / 18 | brand-garmin | /brands/garmin/ | lsi |
| gps golf rangefinder | 110 / 17 | rangefinder | /shop/rangefinders-gps/ | secondary |
| golf caddy bag | 50 / 6 | bag | /blog/small-lightweight-golf-bags-guide/ | secondary |
| black golf set | 90 / 10 | club-set | /shop/complete-sets/ | lsi |
| ladies golf clubs | 1000 / 11 | women-clubs | /blog/ladies-golf-clubs-womens-golf-sets-guide/ | primary |
| cheapest golf clubs | 70 / 8 | golf-clubs | /shop/golf-clubs/ | secondary |

## Residual risks (not fixable by analysis)
- **Semrush KD is an estimate and moves month to month.** Tiers are a guide. Re-pull the exports before building the next batch.
- **Volume merges:** "set of golf" shows 8,100 searches because Semrush merged several "golf set" phrasings; the realistic target is "golf club set" (2,900).
- **Golf-gear head terms are very competitive** for any specialist with 1 to 7 products. Expect brand and long-tail terms to rank first.
- **Catalogue content:** gear product pages have no specs, so comparison posts for rangefinders and watches stay general until you supply them.