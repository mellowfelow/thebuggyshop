import LegalPage from '@/src/components/LegalPage';
import { SITE, ENTITY, SHOP, COMPLIANCE } from '@/src/config/site';
import { seoTitle, seoDesc } from '@/lib/seo';

export const metadata = {
  title: { absolute: seoTitle('Terms & Conditions of Sale') },
  description: seoDesc('Terms and conditions for buying golf buggies, carts, batteries, parts and accessories from The Buggy Shop in Australia. Read them before you order.'),
  alternates: { canonical: `https://${SITE.domain}/terms/` },
};

// NOTE: draft assembled from published site facts. Governing-law, title/risk and any
// cancellation-fee terms must be confirmed by the business owner or their adviser.
export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions of Sale"
      path="/terms/"
      intro={`These terms apply to purchases from ${ENTITY.tradingName}, operated by ${ENTITY.legalName} (ABN ${ENTITY.abn}).`}
      updated="October 2026"
      sections={[
        {
          heading: 'Orders and pricing',
          body: [
            'All prices are in Australian dollars and include 10% GST. An order is accepted when we confirm it by email. Prices and availability can change; where a listing shows a price range or "from" price, the final price is confirmed on your order.',
            `The minimum order value is $${SHOP.minOrder.toLocaleString('en-AU')}.`,
          ],
        },
        {
          heading: 'Payment',
          body: [
            'After you place an order we email you the payment details for your chosen method (bank transfer, PayID or cryptocurrency). Only pay into account details sent to you by us from our verified email address or WhatsApp number. Dispatch begins once payment has cleared.',
            `Eligible cryptocurrency payments receive a ${SHOP.cryptoDiscount}% discount.`,
          ],
        },
        {
          heading: 'Delivery',
          body: ['Delivery is covered on our Shipping & Delivery page. Delivery estimates are not guaranteed dates.'],
        },
        {
          heading: 'Warranty and consumer guarantees',
          body: ['Warranty and your rights under the Australian Consumer Law are covered on our Returns, Refunds & Warranty page. Nothing in these terms excludes rights that cannot be excluded by law.'],
        },
        {
          heading: 'Road use and compliance',
          body: [COMPLIANCE.disclaimer, ...COMPLIANCE.requiredFramings],
        },
        {
          heading: 'Product information',
          body: ['We take care to describe products accurately. Photos are illustrative and specifications can change between production runs. Battery range estimates vary with terrain, payload and speed.'],
        },
        {
          heading: 'Contact',
          body: ['Questions about these terms can be sent through our contact page.'],
        },
      ]}
    />
  );
}
