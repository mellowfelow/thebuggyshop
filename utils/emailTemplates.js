// utils/emailTemplates.js
// Branded HTML Email Builder with Mandatory LIGHT Shell per WebForge v11.1
// White card body, dark header band, champagne gold accent, table-based inline styling.
import { SITE, CONTACT, REPLY, ENTITY } from '@/src/config/site';
import { money, paymentTermsHtml, paymentMethodParts } from '@/lib/order';

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

const PRIMARY_ACCENT = REPLY?.brand?.primary || '#C5A880';
const HEADER_DARK = REPLY?.brand?.headerDark || '#0B111E';

/**
 * LIGHT Shell primitive with Favicon & Gold Crest Header
 */
function shell({ eyebrow, title, meta, body }) {
  const domain = SITE.domain || 'thebuggyshop.com.au';
  const siteName = SITE.name || 'The Buggy Shop';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #F1F5F9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; color: #0F172A;">
  <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color: #F1F5F9; padding: 32px 16px;">
    <tr>
      <td align="center">
        <!-- Main Card Container (LIGHT BODY) -->
        <table width="100%" border="0" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #FFFFFF; border-radius: 14px; overflow: hidden; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.07); border: 1px solid #E2E8F0;">
          
          <!-- Dark Brand Header Band -->
          <tr>
            <td style="background-color: ${HEADER_DARK}; padding: 26px 32px; border-bottom: 3px solid ${PRIMARY_ACCENT};">
              <table width="100%" border="0" cellpadding="0" cellspacing="0">
                
                <!-- Brand Crest / Favicon & Wordmark Header Row -->
                <tr>
                  <td style="padding-bottom: 16px;">
                    <table border="0" cellpadding="0" cellspacing="0">
                      <tr>
                        <!-- Favicon & Gold Cart Emblem Box -->
                        <td width="42" height="42" valign="middle" align="center" style="background-color: #070B14; border: 1.5px solid ${PRIMARY_ACCENT}; border-radius: 10px; padding: 4px; box-shadow: 0 2px 6px rgba(0,0,0,0.4);">
                          <table border="0" cellpadding="0" cellspacing="0">
                            <tr>
                              <td align="center" style="font-size: 20px; line-height: 1; color: ${PRIMARY_ACCENT};">
                                &#9971;
                              </td>
                            </tr>
                          </table>
                        </td>
                        <td style="padding-left: 14px; vertical-align: middle;">
                          <div style="color: #FFFFFF; font-size: 15px; font-weight: 900; letter-spacing: 0.8px; text-transform: uppercase; font-family: Georgia, serif; line-height: 1.2;">
                            ${escapeHtml(siteName)}
                          </div>
                          <div style="color: ${PRIMARY_ACCENT}; font-size: 9px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase; padding-top: 2px;">
                            ${escapeHtml(ENTITY?.legalName || 'TBS NO.2 PTY LTD')} (ABN ${escapeHtml(ENTITY?.abn || '65 108 218 471')}) &bull; EST. 2004
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Eyebrow Tag -->
                ${eyebrow ? `
                <tr>
                  <td style="color: ${PRIMARY_ACCENT}; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; padding-bottom: 6px; padding-top: 4px; border-top: 1px solid rgba(197, 168, 128, 0.2);">
                    ${escapeHtml(eyebrow)}
                  </td>
                </tr>` : ''}

                <!-- Main Title -->
                <tr>
                  <td style="color: #FFFFFF; font-size: 22px; font-weight: 700; line-height: 1.3; letter-spacing: -0.3px;">
                    ${escapeHtml(title)}
                  </td>
                </tr>

                <!-- Meta subtitle -->
                ${meta ? `
                <tr>
                  <td style="color: #94A3B8; font-size: 13px; padding-top: 6px;">
                    ${escapeHtml(meta)}
                  </td>
                </tr>` : ''}
              </table>
            </td>
          </tr>

          <!-- Card Body Content -->
          <tr>
            <td style="padding: 32px; background-color: #FFFFFF; color: #0F172A; font-size: 15px; line-height: 1.6;">
              ${body}
            </td>
          </tr>

          <!-- Complete Verified Business Footer Band -->
          <tr>
            <td style="padding: 24px 32px; background-color: #F8FAFC; border-top: 1px solid #E2E8F0; text-align: center; color: #475569; font-size: 12px; line-height: 1.6;">
              <table width="100%" border="0" cellpadding="0" cellspacing="0" style="margin-bottom: 10px;">
                <tr>
                  <td align="center">
                    <span style="display: inline-block; width: 6px; height: 6px; background-color: ${PRIMARY_ACCENT}; border-radius: 50%; margin-right: 6px; vertical-align: middle;"></span>
                    <strong style="color: #0F172A; font-size: 13px; font-family: Georgia, serif;">${escapeHtml(ENTITY?.legalName || 'TBS NO.2 PTY LTD')}</strong>
                    <span style="color: #64748B; font-size: 12px; margin-left: 4px;">(ABN: ${escapeHtml(ENTITY?.abn || '65 108 218 471')})</span>
                  </td>
                </tr>
              </table>

              <p style="margin: 0 0 4px 0; color: #334155; font-weight: 600;">
                Queensland Headquarters &amp; Technical Facility: 42 Industrial Avenue, Molendinar QLD 4214, Australia
              </p>
              <p style="margin: 0 0 6px 0; color: #64748B;">
                Nationwide Hydraulic Tail-Lift Delivery to Clubs, Acreage Estates &amp; Depots Australia-Wide
              </p>
              <p style="margin: 0 0 8px 0; color: #64748B;">
                Direct Sales &amp; Technical Desk: <strong><a href="tel:0480811308" style="color: #0F172A; text-decoration: none;">0480 811 308</a></strong> &bull; Official Email: <strong><a href="mailto:sales@thebuggyshoppty.com.au" style="color: #0F172A; text-decoration: none;">sales@thebuggyshoppty.com.au</a></strong>
              </p>
              <p style="margin: 0; color: #94A3B8; font-size: 11px;">
                Operating Hours: Monday &ndash; Friday: 8:00 AM &ndash; 5:00 PM AEST | Saturday: 9:00 AM &ndash; 1:00 PM AEST
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

function field(label, valueHtml, marginBottom = 16) {
  return `
  <div style="margin-bottom: ${marginBottom}px;">
    <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #64748B; margin-bottom: 4px;">
      ${escapeHtml(label)}
    </div>
    <div style="font-size: 14px; font-weight: 600; color: #0F172A;">
      ${valueHtml}
    </div>
  </div>`;
}

function divider() {
  return `<hr style="border: 0; border-top: 1px solid #E2E8F0; margin: 24px 0;" />`;
}

function callout(innerHtml) {
  return `
  <div style="background-color: #FAF8F5; border-left: 4px solid ${PRIMARY_ACCENT}; padding: 16px 20px; border-radius: 6px; margin: 20px 0;">
    ${innerHtml}
  </div>`;
}

function button(href, text) {
  return `
  <table border="0" cellpadding="0" cellspacing="0" style="margin: 16px 0;">
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
export function orderNotificationEmail(order) {
  const ref = order.orderNumber || order.id || 'Pending';
  const customer = order.customer || {};
  const items = order.items || [];
  const total = money(order.total || 0);
  const domain = SITE.domain || 'thebuggyshop.com.au';
  const paymentMethod = order.paymentMethod || 'Direct Bank Wire / PayID';

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

    ${button(`https://${domain}/admin/send-payment-email/?orderId=${escapeHtml(ref)}`, 'Compose & Send Payment Details')}

    <p style="font-size: 12px; color: #94A3B8; margin-top: 12px;">
      Or manage all orders directly at: <a href="https://${domain}/admin/orders/${escapeHtml(ref)}/" target="_blank" style="color: #0F172A; font-weight: 600; text-decoration: underline;">View Order ${escapeHtml(ref)} in Portal</a> &bull; <a href="https://${domain}/admin/" target="_blank" style="color: #0F172A; text-decoration: underline;">Admin Dashboard Hub</a>
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
export function orderConfirmationEmail(order) {
  const ref = order.orderNumber || order.id || 'Pending';
  const customer = order.customer || {};
  const items = order.items || [];
  const total = money(order.total || 0);
  const paymentMethod = (order.paymentMethod || '').toLowerCase();

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
  } else {
    // Bank Transfer / EFT
    paymentExplanation = `
      <p style="color: #334155; margin-bottom: 10px;">
        <strong>Direct Australian Bank Wire (EFT / Osko):</strong> You have selected standard electronic funds transfer.
      </p>
      <p style="color: #334155; margin-bottom: 12px;">
        Our sales desk is reviewing your order details. <strong>You will receive an official payment-details email shortly</strong> with verified Australian Bank Wire details (BSB and Account Number), and your unique reference number (<strong>${escapeHtml(ref)}</strong>).
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
          <td align="right" style="padding-top: 8px;"><span style="color: #0F172A; font-size: 13px; font-weight: 600;">${escapeHtml(order.paymentMethod || 'Direct Bank Wire / PayID')}</span></td>
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
      Please keep your order reference <strong>${escapeHtml(ref)}</strong> handy for all correspondence. If you have any urgent dispatch requirements, feel free to call our direct technical desk at <strong>0480 811 308</strong>.
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
export function paymentDetailsEmail({ order, parsedFields = [], customNotes = '' }) {
  const ref = order.orderNumber || order.id || 'Pending';
  const customer = order.customer || {};
  const total = money(order.total || 0);
  const methodId = order.paymentMethodId || 'bank-transfer';
  const methodParts = paymentMethodParts(methodId, total, ref);
  const domain = SITE.domain || 'thebuggyshop.com.au';

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

    ${button(`https://${domain}/order/payment-details/?id=${escapeHtml(ref)}`, 'View & Tap-to-Copy Payment Details Online')}

    ${divider()}

    <h3 style="font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin: 20px 0 10px 0; color: #334155;">
      Settlement Terms &amp; Dispatch Policy
    </h3>
    <div style="color: #475569; font-size: 13px;">
      ${paymentTermsHtml(ref)}
    </div>

    ${customNotes ? `
      ${divider()}
      <div style="background-color: #F8FAFC; border: 1px dashed #CBD5E1; padding: 14px; border-radius: 8px; font-size: 13px; color: #334155;">
        <strong>Special Dispatch Note:</strong> ${escapeHtml(customNotes)}
      </div>
    ` : ''}
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
export function enquiryNotificationEmail(enquiry) {
  const isWholesale = enquiry.type === 'wholesale';
  const ref = enquiry.id || 'Enquiry';
  const domain = SITE.domain || 'thebuggyshop.com.au';

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

    ${button(`https://${domain}/admin/reply-enquiry/?enquiryId=${escapeHtml(ref)}`, 'Reply via Reply Portal Composer')}
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
