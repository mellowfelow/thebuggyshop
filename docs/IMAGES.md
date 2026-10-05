# Product image guide

## Where files go
`public/images/products/<product-slug>/main.webp` (or .jpg) and `gallery-2.webp`, `gallery-3.webp` ...
The folder name MUST equal the product `slug` in `src/config/products.js`. Then set that product's `images` array to
`['/images/products/<slug>/main.webp', '/images/products/<slug>/gallery-2.webp', ...]`.

Hero slides: `public/images/hero/hero-N.webp`. Category tiles: `public/images/categories/<category-slug>.webp`.

## Spec (WebForge)
- 2000 px long edge or larger, plain WHITE background, product fills the frame, same angle and lighting across a set.
- Deliver webp (or jpg). Do not commit both formats of the same image; Next.js serves AVIF/WebP automatically.
- Hero <= 500 KB, category tiles <= 250 KB (enforced by `npm run crosscheck`).
- Alt text is generated per image from the product name (`lib/seo.js`).

## Status
Run `npm run crosscheck`: it warns with the number of products still on the placeholder or on hotlinked stock photos.
