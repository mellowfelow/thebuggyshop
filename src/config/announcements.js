// src/config/announcements.js
// Default content for the single announcement bar.
// The client edits the live version in the admin portal (/admin/announcements/);
// these defaults show until they save their first change, and when "Reset to defaults" is used.
// Keep every message truthful: no invented offers, awards or numbers.

export const ANNOUNCEMENT_LIMITS = {
  maxSlides: 10,
  maxTextLength: 140,
  minSeconds: 3,
  maxSeconds: 20,
};

export const DEFAULT_ANNOUNCEMENTS = {
  seconds: 5,
  slides: [
    { id: 'bundle', text: 'Buy any buggy or cart and take 5% off every accessory and part in your order', href: '/shop/accessories/', active: true },
    { id: 'crypto', text: '10% rebate when you pay with crypto (BTC / USDT) on golf buggy orders', href: '/finance/', active: true },
    { id: 'delivery', text: 'Australia-wide hydraulic tail-lift delivery to your property, club or farm', href: '/shipping/', active: true },
    { id: 'battery', text: '5-year LiFePO4 lithium guarantee on new golf and all-terrain buggies', href: '/shop/batteries/', active: true },
    { id: 'rego', text: 'Road registration compliance support for QLD, NSW and VIC', href: '/contact/', active: true },
  ],
};

// Shared sanitiser used by the API route and the store. Returns a clean object or throws Error(message).
export function sanitizeAnnouncements(input) {
  const { maxSlides, maxTextLength, minSeconds, maxSeconds } = ANNOUNCEMENT_LIMITS;
  if (!input || typeof input !== 'object') throw new Error('Invalid announcement data.');
  const rawSlides = Array.isArray(input.slides) ? input.slides : [];
  if (rawSlides.length > maxSlides) throw new Error(`You can have at most ${maxSlides} messages.`);

  const slides = rawSlides.map((s, i) => {
    const text = String(s?.text ?? '').replace(/\s+/g, ' ').trim();
    if (!text) throw new Error(`Message ${i + 1} is empty.`);
    if (text.length > maxTextLength) throw new Error(`Message ${i + 1} is longer than ${maxTextLength} characters.`);
    let href = String(s?.href ?? '').trim();
    if (href && !(href.startsWith('/') && !href.startsWith('//')) && !/^https:\/\/[^\s]+$/i.test(href)) {
      throw new Error(`Link on message ${i + 1} must start with / or https://`);
    }
    if (href.length > 300) throw new Error(`Link on message ${i + 1} is too long.`);
    const id = String(s?.id || `s${Date.now().toString(36)}${i}`).replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 24) || `s${i}`;
    return { id, text, href, active: s?.active !== false };
  });

  const secondsNum = Number(input.seconds);
  const seconds = Number.isFinite(secondsNum) ? Math.min(maxSeconds, Math.max(minSeconds, Math.round(secondsNum))) : DEFAULT_ANNOUNCEMENTS.seconds;
  return { seconds, slides };
}
