// lib/mailer.js
// Nodemailer lazy singleton for WebForge v11.1
// Never crashes when unconfigured — returns { sent: false, reason: 'not-configured' }
import nodemailer from 'nodemailer';
import { FORMS } from '@/src/config/site';

let cachedTransporter = null;

function getTransporter() {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 465;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    return null;
  }

  if (!cachedTransporter) {
    cachedTransporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: {
        user,
        pass,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  return cachedTransporter;
}

/**
 * Send an email safely
 * @param {Object} opts - { to, subject, html, text, replyTo, from }
 * @returns {Promise<{sent: boolean, reason?: string, messageId?: string}>}
 */
export async function sendMail(opts) {
  const transporter = getTransporter();

  if (!transporter) {
    console.warn('[mailer] SMTP not configured. Missing SMTP_HOST, SMTP_USER, or SMTP_PASS env vars. Gracefully skipping send.');
    return { sent: false, reason: 'not-configured' };
  }

  const from = opts.from || process.env.SMTP_FROM || FORMS.smtpFrom || process.env.SMTP_USER;

  try {
    const info = await transporter.sendMail({
      from,
      to: opts.to,
      subject: opts.subject,
      text: opts.text || (opts.html ? opts.html.replace(/<[^>]+>/g, '') : ''),
      html: opts.html,
      replyTo: opts.replyTo,
    });

    return { sent: true, messageId: info.messageId };
  } catch (error) {
    console.error('[mailer] Failed to send email:', error);
    return { sent: false, reason: error.message || 'send-error' };
  }
}
