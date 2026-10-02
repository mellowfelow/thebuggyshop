// lib/order.js
// Flexible payment-detail parser, monetary formatter, and payment terms single source
import { REPLY, SITE } from '@/src/config/site';

/**
 * Parses a free-text blob pasted by the admin into structured, individually-copyable { label, value } rows.
 * Works seamlessly for Australian BSB/Account, PayID, Crypto wallets (BTC, USDT), SWIFT/IBAN, PayPal, etc.
 * 
 * 3-Tier Rule:
 * 1. "Label: value" on a line (any label with a colon)
 * 2. Starts with a known label keyword without colon ("Sort Code 00-00-00", "BSB 123-456", "Account 12345678")
 * 3. Fallback: entire line becomes "Detail" (or "Detail 1", "Detail 2" for bare crypto addresses or keys)
 */
export function parsePaymentDetail(text) {
  if (!text || typeof text !== 'string') return [];

  const lines = text
    .split('\n')
    .map(l => l.trim())
    .filter(Boolean);

  if (lines.length === 0) return [];

  const knownPrefixes = [
    'bsb',
    'account name',
    'account number',
    'account no',
    'acc no',
    'acc',
    'bank',
    'payid',
    'pay id',
    'abn',
    'swift',
    'bic',
    'iban',
    'sort code',
    'wallet address',
    'wallet',
    'crypto address',
    'address',
    'network',
    'memo',
    'tag',
    'reference',
    'ref',
    'paypal',
    'payment link',
  ];

  const results = [];
  let detailCount = 1;

  for (const line of lines) {
    // 1. Colon separator
    if (line.includes(':')) {
      const colonIdx = line.indexOf(':');
      const rawLabel = line.slice(0, colonIdx).trim();
      const rawVal = line.slice(colonIdx + 1).trim();
      if (rawLabel && rawVal) {
        results.push({ label: rawLabel, value: rawVal });
        continue;
      }
    }

    // 2. Known keyword prefix match
    const lower = line.toLowerCase();
    let matchedPrefix = null;
    for (const prefix of knownPrefixes) {
      if (lower.startsWith(prefix + ' ') || lower.startsWith(prefix + '\t')) {
        matchedPrefix = prefix;
        break;
      }
    }

    if (matchedPrefix) {
      const rawLabel = line.slice(0, matchedPrefix.length).trim();
      const rawVal = line.slice(matchedPrefix.length).trim();
      if (rawVal) {
        results.push({
          label: rawLabel.charAt(0).toUpperCase() + rawLabel.slice(1),
          value: rawVal,
        });
        continue;
      }
    }

    // 3. Fallback: entire line
    results.push({
      label: lines.length > 1 ? `Detail ${detailCount++}` : 'Payment Detail',
      value: line,
    });
  }

  return results;
}

/**
 * Format currency amount according to SITE.reply.currency or locale
 */
export function money(n) {
  const num = typeof n === 'number' ? n : parseFloat(n) || 0;
  const currencyInfo = REPLY?.currency || { code: 'AUD', symbol: '$', locale: 'en-AU' };

  try {
    return new Intl.NumberFormat(currencyInfo.locale || 'en-AU', {
      style: 'currency',
      currency: currencyInfo.code || 'AUD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  } catch {
    return `${currencyInfo.symbol || '$'}${num.toFixed(2)}`;
  }
}

/**
 * Find configured payment method by ID
 */
export function findMethod(methodId) {
  const methods = REPLY?.paymentMethods || [];
  return methods.find(m => m.id === methodId) || null;
}

/**
 * Resolves opening and closing sentences for a given payment method with {amount} and {ref} replaced
 */
export function paymentMethodParts(methodId, amount, ref) {
  const method = findMethod(methodId);
  const formattedAmount = money(amount);

  if (!method) {
    return {
      opening: `Please find the settlement details for order ${ref} in the amount of ${formattedAmount} below:`,
      closing: `Kindly include your order reference ${ref} with your payment description for immediate dispatch processing.`,
    };
  }

  const opening = (method.opening || '')
    .replace(/{amount}/g, formattedAmount)
    .replace(/{ref}/g, ref);

  const closing = (method.closing || '')
    .replace(/{amount}/g, formattedAmount)
    .replace(/{ref}/g, ref);

  return { opening, closing };
}

/**
 * Generate an unambiguous alphanumeric order reference
 * Alphabet: ABCDEFGHJKLMNPQRSTUVWXYZ23456789 (no 0, O, 1, I, L)
 */
export function generateOrderRef() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let rand = '';
  for (let i = 0; i < 6; i++) {
    rand += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  const prefix = REPLY?.orderPrefix || 'TBS';
  return `${prefix}-${rand}`;
}

/**
 * Single source of truth for payment terms
 * Plain-text bullet lines for WhatsApp and preview
 */
export function paymentTermsLines(ref) {
  const dispatch = REPLY?.dispatchLine || 'Hydraulic tail-lift freight directly to your property gate or clubhouse nationwide.';
  return [
    'This order is confirmed once payment is received — it is not yet final.',
    `Use your order number — ${ref} — as the payment reference.`,
    dispatch,
    'All conditional road compliance lighting & documentation are inspected prior to dispatch.',
  ];
}

/**
 * HTML version of payment terms for emails
 */
export function paymentTermsHtml(ref) {
  const lines = paymentTermsLines(ref);
  return lines.map(line => `<li style="margin-bottom: 6px; color: #334155; font-size: 13px; line-height: 1.5;">${line}</li>`).join('');
}
