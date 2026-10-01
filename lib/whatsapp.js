// lib/whatsapp.js
// WhatsApp messaging helpers for The Buggy Shop per WebForge v11.1
// Strict Rule:
// - Customer -> Business messages open with: "Hi {SITE.name},"
// - Admin -> Customer messages open with: "*{SITE.name}*"
import { SITE, CONTACT, REPLY } from '@/src/config/site';
import { money, paymentMethodParts, paymentTermsLines } from './order';

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
  const payMethod = order.paymentMethod || 'Direct Bank Transfer / PayID';

  const body = `I would like to place an order for immediate dispatch:

*Order Reference:* ${ref}
*Items:*
${itemsText}

*Total:* ${total}
*Preferred Payment:* ${payMethod}

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
export function waPaymentDetailsMessage({ order, methodId, parsedFields, rawDetail }) {
  const ref = order.orderNumber || order.id;
  const amount = order.total || 0;
  const { opening, closing } = paymentMethodParts(methodId, amount, ref);
  const terms = paymentTermsLines(ref);

  const fieldsText = (parsedFields || [])
    .map(f => `• *${f.label}:* ${f.value}`)
    .join('\n');

  const lines = [
    WA_HEADER,
    `Payment Details for Order: *${ref}*`,
    `Amount Due: *${money(amount)}*`,
    '',
    opening,
    '',
    fieldsText || rawDetail || '',
    '',
    closing,
    '',
    '*Terms & Dispatch:*',
    ...terms.map(t => `• ${t}`),
    '',
    `You can also view and copy details online: https://${SITE.domain}/order/payment-details/?id=${ref}`,
  ];

  return lines.join('\n');
}
