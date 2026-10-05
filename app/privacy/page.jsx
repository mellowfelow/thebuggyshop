import LegalPage from '@/src/components/LegalPage';
import { SITE, ENTITY, CONTACT } from '@/src/config/site';
import { seoTitle, seoDesc } from '@/lib/seo';

export const metadata = {
  title: { absolute: seoTitle('Privacy Policy') },
  description: seoDesc('How The Buggy Shop collects, uses and protects your personal information under the Australian Privacy Principles.'),
  alternates: { canonical: `https://${SITE.domain}/privacy/` },
};

// NOTE: draft describing what the site actually does today (enquiry/checkout forms, order store,
// email, cart in browser storage; no analytics or advertising trackers are installed).
// The business owner / their adviser must review before publishing.
export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      path="/privacy/"
      intro={`${ENTITY.legalName} (trading as ${ENTITY.tradingName}, ABN ${ENTITY.abn}) respects your privacy and handles personal information in line with the Privacy Act 1988 (Cth) and the Australian Privacy Principles.`}
      updated="October 2026"
      sections={[
        {
          heading: 'What we collect',
          body: [
            ['Contact details you give us in enquiry, wholesale and checkout forms: name, email, phone, delivery address and postcode.', 'Order details: items, amounts, payment method chosen and your order reference.', 'Anything you write in a message to us, including by email or WhatsApp.', 'If you send a payment screenshot or reference, the information it contains.'],
          ],
        },
        {
          heading: 'Why we collect it',
          body: [
            ['To respond to your enquiry and prepare quotes.', 'To process, pay for, deliver and support your order and warranty.', 'To meet legal, tax and record-keeping obligations.'],
          ],
        },
        {
          heading: 'Who we share it with',
          body: [
            'Only with service providers who help us run the shop: freight carriers (to deliver your order), our email provider (to send confirmations and replies), our hosting and order-storage providers, and payment or banking channels you choose. We do not sell your personal information.',
          ],
        },
        {
          heading: 'Cookies and browser storage',
          body: [
            'Your shopping cart is kept in your own browser storage so it is still there when you return. We do not use advertising or analytics trackers on this site at the time of writing.',
          ],
        },
        {
          heading: 'Security and retention',
          body: [
            'Orders and enquiries are stored with access restricted to authorised staff. We keep records for as long as needed to support your order, warranty and legal obligations and then delete or de-identify them.',
          ],
        },
        {
          heading: 'Access, correction and complaints',
          body: [
            `You can ask to access or correct the personal information we hold about you by contacting us at ${CONTACT.email} or ${CONTACT.phoneDisplay}. If you are not satisfied with our response you can complain to the Office of the Australian Information Commissioner (oaic.gov.au).`,
          ],
        },
      ]}
    />
  );
}
