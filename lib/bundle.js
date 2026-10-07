// lib/bundle.js
// The buggy / cart bundle rule and the order maths, shared by the cart, checkout and the order API.
// Pure functions only (relative imports) so the browser, the server and the crosscheck all agree.
//
// Rule: if the order contains a buggy or cart, every accessory and part in it is BUNDLE.percent % off.
// Accessories or parts on their own get nothing. Golf clubs and batteries are not accessories/parts for this offer.
import { SHOP, BUNDLE } from '../src/config/core.js';

export const isVehicle = (item) =>
  BUNDLE.vehicleCategories.includes(item?.category) && !BUNDLE.vehicleExcludedSubcategories.includes(item?.subcategory);

export const isAddon = (item) => BUNDLE.addonCategories.includes(item?.category);

const lineTotal = (i) => (Number(i.price) || 0) * (Number(i.quantity) || 1);

/**
 * Totals for a list of { price, quantity, category, subcategory } lines.
 * Whole-dollar rounding, same as the existing crypto rebate.
 * Order of discounts: bundle first, then the crypto rebate on what is left, then freight.
 */
export function computeTotals(items, { isCrypto = false } = {}) {
  const list = Array.isArray(items) ? items : [];
  const subtotal = list.reduce((s, i) => s + lineTotal(i), 0);
  const hasVehicle = list.some(isVehicle);
  const addonLines = list.filter(isAddon);
  const addonSubtotal = addonLines.reduce((s, i) => s + lineTotal(i), 0);
  const bundleDiscount = hasVehicle ? Math.round(addonSubtotal * (BUNDLE.percent / 100)) : 0;
  const afterBundle = subtotal - bundleDiscount;
  const cryptoDiscount = isCrypto ? Math.round(afterBundle * (SHOP.cryptoDiscount / 100)) : 0;
  const isFreeShipping = SHOP.freeShippingThreshold > 0 && subtotal >= SHOP.freeShippingThreshold;
  const shipping = subtotal > 0 ? (isFreeShipping ? 0 : SHOP.shippingFee) : 0;
  const total = afterBundle - cryptoDiscount + shipping;

  // 'applied' = discount is running, 'offer' = buggy/cart in order but no accessories yet,
  // 'locked' = accessories/parts in the order but no buggy/cart, 'none' = neither
  const state = hasVehicle ? (addonLines.length ? 'applied' : 'offer') : (addonLines.length ? 'locked' : 'none');
  return { subtotal, hasVehicle, addonCount: addonLines.length, addonSubtotal, bundleDiscount, cryptoDiscount, shipping, total, state, percent: BUNDLE.percent };
}
