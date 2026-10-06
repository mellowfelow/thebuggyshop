// lib/whatsapp.js
// WhatsApp messaging helpers for The Buggy Shop per WebForge v11.1
// Strict Rule:
// - Customer -> Business messages open with: "Hi {SITE.name},"
// - Admin -> Customer messages open with: "*{SITE.name}*"
import { SITE, CONTACT } from '@/src/config/site';
import { money, paymentMethodParts, paymentTermsLines } from './order';
import { resolveBaseUrl } from '@/utils/emailTemplates';

export const WA_HEADER = `*${SITE.name}*`;

function waGreeting() {
  return `Hi ${SITE.name},`;
}

export function toWhatsAppNumber(phone) {
  if (!phone) return '';
  return phone.replace(/[^0-9]/g, '');
}

/**
 * Admin -> Customer message link
 */
export function waLinkTo(phone, body) {
  const cleanPhone = toWhatsAppNumber(phone);
  const text = encodeURIComponent(body);
  return `https://wa.me/${cleanPhone}?text=${text}`;
}

/**
 * Text suitable for admin "Copy message" button fallback
 */
export function waMessageText(body) {
  return body;
}

/**
 * Customer -> Business WhatsApp message link
 */
export function waLink(body) {
  const shopPhone = toWhatsAppNumber(CONTACT.whatsapp || CONTACT.phone);
  const text = encodeURIComponent(`${waGreeting()}\n\n${body}`);
  return `https://wa.me/${shopPhone}?text=${text}`;
}

/**
 * Generates an itemized customer order request link
 */
export function waOrderLink(order, customer) {
  const itemsText = (order.items || [])
    .map(i => `• ${i.name} (x${i.quantity || 1}) - ${money(i.price * (i.quantity || 1))}`)
    .join('\n');

  const ref = order.orderNumber || order.id || 'Pending';
  const total = money(order.total || order.subtotal || 0);
  const payMethod = order.paymentMethod || 'Direct Bank Transfer (Osko / Fast EFT)';
  
  let scheduleText = '';
  if (order.installmentPlan) {
    scheduleText = `\n*Payment Terms:* Commercial Pay in 4 Plan\n*1st Split (Due Today):* ${money(order.installmentPlan.firstInstallment)}\n*Remaining 3 Splits:* 3 x ${money(order.installmentPlan.monthlyInstallment)} at month-end`;
  } else {
    scheduleText = `\n*Payment Terms:* Pay in Full (${total} upfront settlement)`;
  }

  const body = `I would like to place an order for immediate dispatch:

*Order Reference:* ${ref}
*Items:*
${itemsText}

${order.bundleDiscount > 0 ? `*Bundle discount (5% off accessories & parts):* -${money(order.bundleDiscount)}
` : ''}*Order Total:* ${total}
*Settlement Rail:* ${payMethod}${scheduleText}

*Customer Details:*
• Name: ${customer.name || ''}
• Email: ${customer.email || ''}
• Phone: ${customer.phone || ''}
• Delivery Address: ${customer.address || ''}${customer.state ? `, ${customer.state}` : ''}${customer.postcode ? ` ${customer.postcode}` : ''}
${customer.notes ? `• Special Notes: ${customer.notes}` : ''}`;

  return waLink(body);
}

/**
 * Customer -> Business payment confirmation alert link
 */
export function waPaymentConfirmationLink(ref) {
  const body = `I have completed payment for order *${ref}*. Please find my receipt details for dispatch release.`;
  return waLink(body);
}

/**
 * Admin -> Customer payment instructions message for WhatsApp
 */
export function waPaymentDetailsMessage({ order, methodId, parsedFields, rawDetail, customBaseUrl }) {
  const ref = order.orderNumber || order.id || 'Order';
  const amount = order.total || 0;
  const { opening, closing } = paymentMethodParts(methodId, amount, ref);
  const terms = paymentTermsLines(ref);
  const baseUrl = customBaseUrl || resolveBaseUrl();

  const formattedFields = (parsedFields || [])
    .map(f => `▫️ *${f.label}:* ${f.value}`)
    .join('\n');

  const lines = [
    `*${SITE.name.toUpperCase()}*`,
    `═══════════════════════`,
    `🧾 *OFFICIAL PAYMENT INSTRUCTIONS*`,
    `═══════════════════════`,
    '',
    `• *Order Reference:* \`${ref}\``,
    `• *Amount Due:* *${money(amount)}*`,
    `• *Order Status:* Awaiting Settlement`,
    '',
    `💬 *Notice from Workshop Desk:*`,
    opening,
    '',
    `💳 *SETTLEMENT DETAILS:*`,
    formattedFields || rawDetail || '',
    '',
    closing,
    '',
    `⚡ *QUICK ACTIONS:*`,
    `👉 *View & Tap-to-Copy Details Online:*`,
    `${baseUrl}/order/payment-details/?id=${encodeURIComponent(ref)}`,
    '',
    `📷 *Upload Payment Receipt (Direct from Gallery):*`,
    `${baseUrl}/order/confirm-payment/?id=${encodeURIComponent(ref)}`,
    '',
    `🚚 *DISPATCH & TERMS:*`,
    ...terms.map(t => `• ${t}`),
    '',
    `═══════════════════════`,
    `_Thank you for choosing ${SITE.name}. Please reply directly to this chat if you have any questions._`,
  ];

  return lines.join('\n');
}
