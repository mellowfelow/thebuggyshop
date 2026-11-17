// lib/obfuscate.js
// Project rule: email addresses are entity-encoded (&#64;) wherever they are rendered, so address scrapers that
// match "name@domain" find nothing in the HTML. Browsers still show and follow the address normally.
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const EMAIL = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g;

/** Escape plain text for innerHTML and turn every email address in it into an entity-encoded mailto link. */
export function encodeEmails(text) {
  return esc(text).replace(EMAIL, (m) => {
    const enc = m.replace('@', '&#64;');
    return `<a href="mailto:${enc}" class="underline underline-offset-2">${enc}</a>`;
  });
}
