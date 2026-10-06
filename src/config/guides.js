// src/config/guides.js
// Keyword engine v2 guides: the 17 posts in guides-cart.js and guides-golf.js, each with its extra worked-example sections inserted
// before its closing section (guides-extra.js). Word counts and read times are recomputed after the insert.
import { GUIDES_CART } from './guides-cart.js';
import { GUIDES_GOLF } from './guides-golf.js';
import { EXTRA } from './guides-extra.js';
import { EXTRA2 } from './guides-extra2.js';
import { EXTRA3 } from './guides-extra3.js';
import { mk } from './post-kit.js';

const withExtra = (slug, content) => {
  const extra = [EXTRA[slug], EXTRA2[slug], EXTRA3[slug]].filter(Boolean).join('\n');
  if (!extra) throw new Error('guides.js: no extra sections for ' + slug);
  const at = content.lastIndexOf('\n## ');
  return content.slice(0, at) + '\n' + extra.trim() + '\n' + content.slice(at);
};

export const GUIDES = [...GUIDES_CART, ...GUIDES_GOLF].map((g) => mk({ ...g, content: withExtra(g.slug, g.content) }));
