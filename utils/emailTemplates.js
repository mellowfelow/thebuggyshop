// utils/emailTemplates.js
// Branded Light HTML Email Builder (WebForge v11.1 Standard)
// Mandatory: Light shell (white card, dark brand header band, near-black text, brand colour as accent only).
// All domain links dynamically resolve the live host so Zoho Mail notifications directly open the admin dashboard.

import { SITE, CONTACT, REPLY } from '@/src/config/site';
import { money, paymentMethodParts, paymentTermsHtml } from '@/lib/order';

// Palette constants driven directly by SITE.reply config
const PRIMARY_ACCENT = REPLY?.brand?.primary || '#C5A880';
const HEADER_DARK = REPLY?.brand?.headerDark || '#0F172A';

/**
 * Escapes HTML entities to prevent injection
 */
function escapeHtml(str) {
  if (typeof str !== 'string') return String(str || '');
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Dynamically resolves the base URL so email links in Zoho Mail
 * always lead directly to the active store and admin dashboard.
 */
export function resolveBaseUrl(customBaseUrl) {
  if (customBaseUrl && typeof customBaseUrl === 'string' && customBaseUrl.startsWith('http')) {
    return customBaseUrl.replace(/\/$/, '');
  }
  if (process.env.NEXT_PUBLIC_SITE_URL && !process.env.NEXT_PUBLIC_SITE_URL.includes('DOMAIN')) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '');
  }
  if (process.env.SITE_URL && !process.env.SITE_URL.includes('DOMAIN')) {
    return process.env.SITE_URL.replace(/\/$/, '');
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  if (SITE.domain && SITE.domain !== 'DOMAIN.com' && !SITE.domain.includes('DOMAIN')) {
    return `https://${SITE.domain}`;
  }
  // Cloud environment / preview fallback
  return 'https://ais-dev-xdh4d5ckavk5dajkxx66zn-274197567478.us-west2.run.app';
}

/**
 * Base shell wrapper: White card on light background, dark header band, light body.
 */
function shell({ eyebrow, title, meta, body }) {
  const currentYear = new Date().getFullYear();

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)}</title>
  <style>
    body { margin: 0; padding: 0; background-color: #F1F5F9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; }
    table { border-collapse: collapse; }
    img { border: 0; outline: none; text-decoration: none; }
    a { color: ${PRIMARY_ACCENT}; text-decoration: underline; }
  </style>
</head>
<body style="margin: 0; padding: 24px 12px; background-color: #F1F5F9;">
  <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color: #F1F5F9;">
    <tr>
      <td align="center">
        <!-- Main Card (Max 600px) -->
        <table width="100%" border="0" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #FFFFFF; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(15, 23, 42, 0.08); border: 1px solid #E2E8F0;">
          
          <!-- Dark Brand Header Band -->
          <tr>
            <td style="background-color: ${HEADER_DARK}; padding: 32px 28px; text-align: left;">
              ${eyebrow ? `
                <div style="font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1.5px; color: ${PRIMARY_ACCENT}; margin-bottom: 6px;">
                  ${escapeHtml(eyebrow)}
                </div>
              ` : ''}
              
              <div style="font-size: 24px; font-weight: 800; color: #FFFFFF; line-height: 1.2; margin: 0 0 4px 0;">
                ${escapeHtml(SITE.name)}
              </div>

              <div style="font-size: 13px; color: #94A3B8; margin: 0 0 12px 0;">
                ${escapeHtml(REPLY?.headerTagline || 'Australia\'s Premier Golf Buggies & Luxury Carts')}
              </div>

              <div style="font-size: 18px; font-weight: 700; color: #F8FAFC; margin: 0;">
                ${escapeHtml(title)}
              </div>

              ${meta ? `
                <div style="font-size: 12px; color: #CBD5E1; margin-top: 6px; font-family: monospace;">
                  ${escapeHtml(meta)}
                </div>
              ` : ''}
            </td>
          </tr>

          <!-- Gold Accent Rule (3px) -->
          <tr>
            <td style="height: 3px; background-color: ${PRIMARY_ACCENT}; font-size: 0; line-height: 0;">&nbsp;</td>
          </tr>

          <!-- Light Email Body -->
          <tr>
            <td style="padding: 32px 28px; color: #0F172A; font-size: 14px; line-height: 1.6; background-color: #FFFFFF;">
              ${body}
            </td>
          </tr>

          <!-- Light Footer -->
          <tr>
            <td style="background-color: #F8FAFC; padding: 20px 28px; border-top: 1px solid #E2E8F0; text-align: center; font-size: 12px; color: #64748B;">
              <p style="margin: 0 0 6px 0; font-weight: 700; color: #334155;">
                ${escapeHtml(SITE.legalName || SITE.name)} &bull; ABN: ${escapeHtml(SITE.abn || '65 108 218 471')}
              </p>
              <p style="margin: 0 0 6px 0;">
                Gold Coast &amp; Brisbane Technical Workshop &bull; Dispatching Australia-Wide
              </p>
              <p style="margin: 0; color: #94A3B8;">
                Phone: ${escapeHtml(CONTACT.phoneDisplay || '0480 811 308')} &bull; Email: ${escapeHtml(CONTACT.email || 'sales@thebuggyshop.com.au')}
              </p>
              <p style="margin: 8px 0 0 0; font-size: 11px; color: #CBD5E1;">
                &copy; ${currentYear} ${escapeHtml(SITE.name)}. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/**
 * Label + Value row primitive
 */
function field(label, valueHtml, marginBottom = 12) {
  return `
    <div style="margin-bottom: ${marginBottom}px;">
      <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; color: #64748B; margin-bottom: 2px;">
        ${escapeHtml(label)}
      </div>
      <div style="font-size: 14px; color: #0F172A; font-weight: 500;">
        ${valueHtml}
      </div>
    </div>
  `;
}

/**
 * Callout panel with left gold border
 */
function callout(innerHtml) {
  return `
    <div style="background-color: #FAF8F5; border-left: 4px solid ${PRIMARY_ACCENT}; border-radius: 6px; padding: 16px 20px; margin: 18px 0; border-top: 1px solid #EBE5D8; border-right: 1px solid #EBE5D8; border-bottom: 1px solid #EBE5D8;">
      ${innerHtml}
    </div>
  `;
}

/**
 * Horizontal rule divider
 */
function divider() {
  return '<hr style="border: 0; height: 1px; background-color: #E2E8F0; margin: 24px 0;" />';
}
divider.toString = () => '<hr style="border: 0; height: 1px; background-color: #E2E8F0; margin: 24px 0;" />';

/**
 * Dark styled CTA button with arrow
 */
function button(href, text) {
  return `
  <table border="0" cellpadding="0" cellspacing="0" style="margin: 20px 0;">
    <tr>
      <td align="center" style="border-radius: 8px; background-color: ${HEADER_DARK};">
        <a href="${escapeHtml(href)}" target="_blank" style="display: inline-block; padding: 14px 28px; font-size: 14px; font-weight: 700; color: #FFFFFF; text-decoration: none; border-radius: 8px; letter-spacing: 0.3px; border: 1px solid ${PRIMARY_ACCENT};">
          ${escapeHtml(text)} &rarr;
        </a>
      </td>
    </tr>
  </table>`;
}

/**
 * 1. Order Notification Email to Admin Desk (Zoho Mail)
 */
export function orderNotificationEmail(order, customBaseUrl) {
  const ref = order.orderNumber || order.id || 'Pending';
  const customer = order.customer || {};
  const items = order.items || [];
  const total = money(order.total || 0);
  const baseUrl = resolveBaseUrl(customBaseUrl);
  const paymentMethod = order.paymentMethod || 'Direct Bank Transfer (Osko / Fast EFT)';

  const itemsHtml = items.map(item => `
    <tr>
      <td style="padding: 10px 0; border-bottom: 1px solid #E2E8F0; font-size: 14px; color: #0F172A;">
        <strong>${escapeHtml(item.name)}</strong> x ${item.quantity || 1}
      </td>
      <td align="right" style="padding: 10px 0; border-bottom: 1px solid #E2E8F0; font-size: 14px; font-weight: 600; color: #0F172A;">
        ${money(item.price * (item.quantity || 1))}
      </td>
    </tr>
  `).join('');

  const body = `
    <p style="margin-top: 0; font-size: 16px; color: #334155;">
      A new sales order has been placed via the <strong>${escapeHtml(order.channel === 'whatsapp' ? 'WhatsApp Checkout' : 'Online Store Checkout')}</strong>.
    </p>

    ${callout(`
      <table width="100%" border="0" cellpadding="0" cellspacing="0">
        <tr>
          <td><strong style="color: #0F172A; font-size: 16px;">Order Reference:</strong></td>
          <td align="right"><span style="font-family: monospace; font-size: 18px; font-weight: 700; color: #0F172A;">${escapeHtml(ref)}</span></td>
        </tr>
        <tr>
          <td style="padding-top: 8px;"><strong style="color: #0F172A;">Total Amount Due:</strong></td>
          <td align="right" style="padding-top: 8px;"><strong style="font-size: 18px; color: #0F172A;">${total}</strong></td>
        </tr>
        <tr>
          <td style="padding-top: 8px;"><strong style="color: #64748B; font-size: 13px;">Selected Payment:</strong></td>
          <td align="right" style="padding-top: 8px;"><span style="color: #0F172A; font-size: 13px; font-weight: 600;">${escapeHtml(paymentMethod)}</span></td>
        </tr>
      </table>
    `)}

    <h3 style="font-size: 15px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin: 24px 0 12px 0; color: #334155;">
      Customer Dispatch Information
    </h3>
    ${field('Customer Name', escapeHtml(customer.name || 'N/A'))}
    ${field('Email Address', `<a href="mailto:${escapeHtml(customer.email)}" style="color: #0F172A; text-decoration: underline;">${escapeHtml(customer.email)}</a>`)}
    ${field('Contact Phone', `<a href="tel:${escapeHtml(customer.phone)}" style="color: #0F172A;">${escapeHtml(customer.phone || 'N/A')}</a>`)}
    ${field('Delivery Destination', `${escapeHtml(customer.address || '')}${customer.state ? `, ${escapeHtml(customer.state)}` : ''}${customer.postcode ? ` ${escapeHtml(customer.postcode)}` : ''}`)}
    ${customer.notes ? field('Access / Delivery Notes', escapeHtml(customer.notes)) : ''}

    ${divider()}

    <h3 style="font-size: 15px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin: 24px 0 12px 0; color: #334155;">
      Allocated Vehicles &amp; Equipment
    </h3>
    <table width="100%" border="0" cellpadding="0" cellspacing="0">
      ${itemsHtml}
    </table>

    ${divider()}

    <h3 style="font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin: 20px 0 8px 0; color: #334155;">
      Reply &amp; Payment Dispatch Actions
    </h3>
    <p style="font-size: 13px; color: #64748B; margin-bottom: 12px;">
      Click below to compose and send verified payment details directly to this customer:
    </p>

    ${button(`${baseUrl}/admin/send-payment-email/?orderId=${escapeHtml(ref)}`, 'Compose & Send Payment Details')}

    <p style="font-size: 12px; color: #64748B; margin-top: 14px; line-height: 1.6;">
      Direct Portal Links:<br />
      &bull; <a href="${baseUrl}/admin/orders/${escapeHtml(ref)}/" target="_blank" style="color: #0F172A; font-weight: 700; text-decoration: underline;">Open Order ${escapeHtml(ref)} in Admin Dashboard</a><br />
      &bull; <a href="${baseUrl}/admin/" target="_blank" style="color: #0F172A; text-decoration: underline;">View All Orders in Admin Hub</a>
    </p>
  `;

  return shell({
    eyebrow: 'New Order Notification',
    title: `Order ${ref} — ${escapeHtml(customer.name || 'Client')}`,
    meta: `Total: ${total} | Channel: ${order.channel === 'whatsapp' ? 'WhatsApp' : 'Online Store'}`,
    body,
  });
}

/**
 * 2. Customer Confirmation Email with Tailored "What Happens Next"
 */
export function orderConfirmationEmail(order, customBaseUrl) {
  const ref = order.orderNumber || order.id || 'Pending';
  const customer = order.customer || {};
  const items = order.items || [];
  const total = money(order.total || 0);
  const paymentMethod = (order.paymentMethod || '').toLowerCase();
  const baseUrl = resolveBaseUrl(customBaseUrl);

  const itemsList = items.map(item => `
    <li style="margin-bottom: 6px; color: #334155;">
      <strong>${escapeHtml(item.name)}</strong> (x${item.quantity || 1}) &mdash; ${money(item.price * (item.quantity || 1))}
    </li>
  `).join('');

  // Dynamic tailoring of What Happens Next based on payment choice
  let paymentExplanation = '';
  if (paymentMethod.includes('btc') || paymentMethod.includes('crypto') || paymentMethod.includes('usdt') || paymentMethod.includes('tether')) {
    paymentExplanation = `
      <p style="color: #334155; margin-bottom: 10px;">
        <strong>10% Instant Cryptocurrency Rebate Applied:</strong> You have selected direct cryptocurrency settlement.
      </p>
      <p style="color: #334155; margin-bottom: 12px;">
        Our treasury desk is preparing your dedicated deposit wallet address (<strong>Bitcoin BTC Native</strong> or <strong>Tether USDT TRC-20</strong>) and discounted AUD-to-crypto invoice total. <strong>You will receive an official payment-details email shortly</strong> containing verified deposit addresses.
      </p>
    `;
  } else if (paymentMethod.includes('pay-id') || paymentMethod.includes('payid')) {
    paymentExplanation = `
      <p style="color: #334155; margin-bottom: 10px;">
        <strong>Australian PayID Instant Settlement:</strong> You have selected instant Australian PayID transfer.
      </p>
      <p style="color: #334155; margin-bottom: 12px;">
        Our commercial desk is preparing your registered ABN PayID identifier and exact reference instructions. <strong>You will receive an official payment-details email shortly</strong> with tap-to-copy PayID details. Once settled, your vehicle will enter pre-delivery inspection.
      </p>
    `;
  } else if (paymentMethod.includes('pay-in-4') || paymentMethod.includes('pay in 4')) {
    const firstSplit = money(Math.round((order.total || 0) / 4));
    paymentExplanation = `
      <p style="color: #334155; margin-bottom: 10px;">
        <strong>Commercial Pay in 4 Schedule Activated:</strong> You have selected our 4-split commercial equipment plan (0% interest).
      </p>
      <p style="color: #334155; margin-bottom: 12px;">
        <strong>1st Installment Due Today:</strong> ${firstSplit} is required to lock in your machinery reservation and trigger pre-delivery mechanical testing.
      </p>
      <p style="color: #334155; margin-bottom: 12px;">
        <strong>Subsequent 3 Installments:</strong> The remaining 3 installments will be billed and payable at each consecutive month end. Our commercial team will email your verified payment details and schedule shortly.
      </p>
    `;
  } else {
    // Bank Transfer / Osko / Fast EFT
    paymentExplanation = `
      <p style="color: #334155; margin-bottom: 10px;">
        <strong>Direct Australian Bank Transfer (Osko / Fast EFT):</strong> You have selected standard electronic funds transfer.
      </p>
      <p style="color: #334155; margin-bottom: 12px;">
        Our sales desk is reviewing your order details. <strong>You will receive an official payment-details email shortly</strong> with verified Australian Bank Transfer details (BSB and Account Number), and your unique reference number (<strong>${escapeHtml(ref)}</strong>).
      </p>
    `;
  }

  const body = `
    <p style="margin-top: 0; font-size: 16px;">
      Dear ${escapeHtml(customer.name || 'Valued Client')},
    </p>

    <p style="color: #334155;">
      Thank you for your order with <strong>${escapeHtml(SITE.name)}</strong>. We have logged your purchase allocation and are preparing your vehicle dispatch schedule from our Queensland facility.
    </p>

    ${callout(`
      <table width="100%" border="0" cellpadding="0" cellspacing="0">
        <tr>
          <td><strong style="color: #0F172A;">Your Order Reference:</strong></td>
          <td align="right"><span style="font-family: monospace; font-size: 17px; font-weight: 700; color: #0F172A;">${escapeHtml(ref)}</span></td>
        </tr>
        <tr>
          <td style="padding-top: 8px;"><strong style="color: #0F172A;">Total Order Amount:</strong></td>
          <td align="right" style="padding-top: 8px;"><strong style="font-size: 17px; color: #0F172A;">${total}</strong></td>
        </tr>
        <tr>
          <td style="padding-top: 8px;"><strong style="color: #64748B; font-size: 13px;">Selected Payment:</strong></td>
          <td align="right" style="padding-top: 8px;"><span style="color: #0F172A; font-size: 13px; font-weight: 600;">${escapeHtml(order.paymentMethod || 'Direct Bank Transfer (Osko / Fast EFT)')}</span></td>
        </tr>
      </table>
    `)}

    <h3 style="font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin: 20px 0 10px 0; color: #334155;">
      Allocated Vehicles &amp; Equipment
    </h3>
    <ul style="padding-left: 20px; margin: 0 0 20px 0;">
      ${itemsList}
    </ul>

    ${divider()}

    <h3 style="font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin: 20px 0 8px 0; color: #334155;">
      What Happens Next?
    </h3>
    
    ${paymentExplanation}

    <p style="color: #64748B; font-size: 13px; margin: 0;">
      Please keep your order reference <strong>${escapeHtml(ref)}</strong> handy for all correspondence. If you have any urgent dispatch requirements, feel free to call our direct technical desk at <strong>${escapeHtml(CONTACT.phoneDisplay || '0480 811 308')}</strong>.
    </p>
  `;

  return shell({
    eyebrow: 'Order Allocation Confirmed',
    title: 'Thank You for Your Order',
    meta: `Order Reference: ${ref}`,
    body,
  });
}

/**
 * 3. Payment Details Email (Sent by Admin via Reply Portal Composer)
 */
export function paymentDetailsEmail(order, { methodId = 'bank-transfer', parsedFields = [], customNote = '', customBaseUrl } = {}) {
  const ref = order.orderNumber || order.id || 'Pending';
  const customer = order.customer || {};
  const total = money(order.total || 0);
  const methodParts = paymentMethodParts(methodId, total, ref);
  const baseUrl = resolveBaseUrl(customBaseUrl);

  const fieldsHtml = parsedFields.map(f => `
    <div style="background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 12px 16px; margin-bottom: 10px;">
      <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #64748B; margin-bottom: 4px;">
        ${escapeHtml(f.label)}
      </div>
      <div style="font-family: monospace; font-size: 15px; font-weight: 700; color: #0F172A; word-break: break-all;">
        ${escapeHtml(f.value)}
      </div>
    </div>
  `).join('');

  const body = `
    <p style="margin-top: 0; font-size: 16px;">
      Dear ${escapeHtml(customer.name || 'Valued Client')},
    </p>

    <p style="color: #334155;">
      ${escapeHtml(methodParts.opening)}
    </p>

    ${callout(`
      <table width="100%" border="0" cellpadding="0" cellspacing="0">
        <tr>
          <td><strong style="color: #0F172A;">Settlement Reference:</strong></td>
          <td align="right"><span style="font-family: monospace; font-size: 17px; font-weight: 700; color: #0F172A;">${escapeHtml(ref)}</span></td>
        </tr>
        <tr>
          <td style="padding-top: 8px;"><strong style="color: #0F172A;">Total Amount Due:</strong></td>
          <td align="right" style="padding-top: 8px;"><strong style="font-size: 18px; color: #0F172A;">${total}</strong></td>
        </tr>
      </table>
    `)}

    <h3 style="font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin: 24px 0 12px 0; color: #334155;">
      Official Payment Instructions
    </h3>

    ${fieldsHtml}

    <p style="color: #334155; margin-top: 16px;">
      ${escapeHtml(methodParts.closing)}
    </p>

    ${button(`${baseUrl}/order/payment-details/?id=${escapeHtml(ref)}`, 'View & Tap-to-Copy Payment Details Online')}

    ${divider()}

    <h3 style="font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin: 20px 0 10px 0; color: #334155;">
      Settlement Terms &amp; Dispatch Policy
    </h3>
    <div style="color: #475569; font-size: 13px;">
      ${paymentTermsHtml(ref)}
    </div>

    ${customNote ? `
      ${divider()}
      <div style="background-color: #F8FAFC; border: 1px dashed #CBD5E1; padding: 14px; border-radius: 8px; font-size: 13px; color: #334155;">
        <strong>Special Dispatch Note:</strong> ${escapeHtml(customNote)}
      </div>
    ` : ''}

    <p style="font-size: 12px; color: #64748B; margin-top: 14px;">
      Once paid, you can submit your remittance proof directly at: <a href="${baseUrl}/order/confirm-payment/?id=${escapeHtml(ref)}" target="_blank" style="color: #0F172A; text-decoration: underline; font-weight: 600;">Confirm Remittance Receipt Online</a>
    </p>
  `;

  return shell({
    eyebrow: 'Official Payment Details',
    title: `Payment Instructions — Order ${ref}`,
    meta: `Total Due: ${total}`,
    body,
  });
}

/**
 * 4. General & Wholesale Enquiry Notification to Admin Desk
 */
export function enquiryNotificationEmail(enquiry, customBaseUrl) {
  const isWholesale = enquiry.type === 'wholesale';
  const ref = enquiry.id || 'Enquiry';
  const baseUrl = resolveBaseUrl(customBaseUrl);

  const body = `
    <p style="margin-top: 0; font-size: 16px; color: #334155;">
      A new <strong>${isWholesale ? 'Wholesale & Fleet Application' : 'General Customer Enquiry'}</strong> has been submitted.
    </p>

    ${field('Contact Name', escapeHtml(enquiry.name))}
    ${field('Email Address', `<a href="mailto:${escapeHtml(enquiry.email)}" style="color: #0F172A; text-decoration: underline;">${escapeHtml(enquiry.email)}</a>`)}
    ${field('Phone Number', `<a href="tel:${escapeHtml(enquiry.phone)}" style="color: #0F172A;">${escapeHtml(enquiry.phone || 'N/A')}</a>`)}
    ${field('Subject', escapeHtml(enquiry.subject || 'Enquiry'))}

    ${divider()}

    <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #64748B; margin-bottom: 6px;">
      Message Content
    </div>
    <div style="background-color: #F8FAFC; border: 1px solid #E2E8F0; padding: 16px; border-radius: 8px; font-size: 14px; color: #0F172A; white-space: pre-wrap;">
      ${escapeHtml(enquiry.message)}
    </div>

    ${button(`${baseUrl}/admin/reply-enquiry/?enquiryId=${escapeHtml(ref)}`, 'Reply via Reply Portal Composer')}

    <p style="font-size: 12px; color: #64748B; margin-top: 14px;">
      Direct Portal Links:<br />
      &bull; <a href="${baseUrl}/admin/enquiries/${escapeHtml(ref)}/" target="_blank" style="color: #0F172A; font-weight: 700; text-decoration: underline;">View Enquiry ${escapeHtml(ref)} in Dashboard</a><br />
      &bull; <a href="${baseUrl}/admin/" target="_blank" style="color: #0F172A; text-decoration: underline;">Admin Dashboard Hub</a>
    </p>
  `;

  return shell({
    eyebrow: isWholesale ? 'Fleet / Wholesale Application' : 'General Enquiry',
    title: `${escapeHtml(enquiry.subject || 'Enquiry')} — ${escapeHtml(enquiry.name)}`,
    meta: `Reference: ${ref}`,
    body,
  });
}

/**
 * 5. Enquiry Reply Email (Sent by Admin via Reply Portal)
 */
export function enquiryReplyEmail({ enquiry, replyMessage, adminName = 'The Buggy Shop Technical Desk' }) {
  const ref = enquiry.id || 'TBS-ENQ';

  const body = `
    <p style="margin-top: 0; font-size: 16px;">
      Dear ${escapeHtml(enquiry.name || 'Valued Client')},
    </p>

    <div style="color: #0F172A; font-size: 15px; line-height: 1.7; margin: 16px 0 24px 0; white-space: pre-wrap;">
      ${escapeHtml(replyMessage)}
    </div>

    <p style="margin: 24px 0 0 0; color: #334155; font-size: 14px;">
      Warm regards,<br>
      <strong>${escapeHtml(adminName)}</strong><br>
      <span style="color: #64748B; font-size: 12px;">${escapeHtml(SITE.name)} &bull; ${escapeHtml(CONTACT.phoneDisplay || '0480 811 308')}</span>
    </p>

    ${divider()}

    <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #94A3B8; margin-bottom: 6px;">
      Your Original Message (${escapeHtml(ref)})
    </div>
    <div style="background-color: #F8FAFC; border-left: 3px solid #CBD5E1; padding: 12px 16px; font-size: 13px; color: #64748B; font-style: italic;">
      ${escapeHtml(enquiry.message)}
    </div>
  `;

  return shell({
    eyebrow: 'Customer Support & Sales Desk',
    title: `Re: ${escapeHtml(enquiry.subject || 'Your Enquiry')}`,
    meta: `Reference: ${ref}`,
    body,
  });
}

/**
 * 6. Payment Confirmation Alert Notification to Admin Desk
 */
export function paymentConfirmationNotificationEmail(order, note = '', screenshotUrl = '', customBaseUrl) {
  const ref = order.orderNumber || order.id || 'Order';
  const customer = order.customer || {};
  const baseUrl = resolveBaseUrl(customBaseUrl);

  const body = `
    <p style="margin-top: 0; font-size: 16px; color: #334155;">
      A customer has submitted a <strong>Payment Confirmation / Remittance Notification</strong> for order <strong>${escapeHtml(ref)}</strong>.
    </p>

    ${field('Order Reference', escapeHtml(ref))}
    ${field('Customer Name', escapeHtml(customer.name || 'N/A'))}
    ${field('Customer Email', `<a href="mailto:${escapeHtml(customer.email)}" style="color: #0F172A;">${escapeHtml(customer.email)}</a>`)}
    ${field('Customer Phone', `<a href="tel:${escapeHtml(customer.phone)}" style="color: #0F172A;">${escapeHtml(customer.phone || 'N/A')}</a>`)}
    ${field('Total Amount Due', money(order.total || 0))}
    
    ${note ? `
      ${divider()}
      <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #64748B; margin-bottom: 6px;">
        Customer Payment Reference / Transaction Note
      </div>
      <div style="background-color: #F8FAFC; border: 1px solid #E2E8F0; padding: 14px; border-radius: 8px; font-size: 14px; color: #0F172A;">
        ${escapeHtml(note)}
      </div>
    ` : ''}

    ${screenshotUrl ? `
      ${divider()}
      <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #64748B; margin-bottom: 6px;">
        Remittance Receipt Link
      </div>
      <div>
        <a href="${escapeHtml(screenshotUrl)}" target="_blank" style="color: #0F172A; font-weight: 700; text-decoration: underline;">
          View Uploaded Remittance Screenshot &rarr;
        </a>
      </div>
    ` : ''}

    ${button(`${baseUrl}/admin/orders/${escapeHtml(ref)}/`, 'Open Order in Admin Portal')}
  `;

  return shell({
    eyebrow: 'Payment Remittance Alert',
    title: `Payment Submitted: Order ${ref}`,
    meta: `Customer: ${escapeHtml(customer.name || 'Client')}`,
    body,
  });
}
