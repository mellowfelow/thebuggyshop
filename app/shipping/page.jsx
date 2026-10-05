import LegalPage from '@/src/components/LegalPage';
import { SITE, SHOP, CONTACT } from '@/src/config/site';
import { seoTitle, seoDesc } from '@/lib/seo';

export const metadata = {
  title: { absolute: seoTitle('Shipping & Delivery Australia') },
  description: seoDesc('Nationwide hydraulic tail-lift delivery for golf buggies and carts from The Buggy Shop. Flat-rate freight to your property gate or clubhouse across Australia.'),
  alternates: { canonical: `https://${SITE.domain}/shipping/` },
};

// NOTE: draft built only from facts already published on the site (flat freight fee, tail-lift
// carriers, pre-delivery inspection). The business owner must confirm transit times and any
// remote-area surcharges before this page is relied on.
export default function ShippingPage() {
  return (
    <LegalPage
      title="Shipping & Delivery"
      path="/shipping/"
      intro="How your golf buggy, ride-on cart, battery or accessory reaches you anywhere in Australia."
      updated="October 2026"
      sections={[
        {
          heading: 'Flat-rate nationwide freight',
          body: [
            `Vehicles are delivered Australia-wide by specialist carriers using hydraulic tail-lift trucks for a flat rate of $${SHOP.shippingFee.toLocaleString('en-AU')} inc. GST. The driver unloads to your driveway, property gate, regional depot or clubhouse pro-shop.`,
            'Smaller items such as parts, batteries and accessories are shipped separately and the freight cost for them is confirmed on your order before payment.',
          ],
        },
        {
          heading: 'Before it leaves us',
          body: [
            'Every vehicle is inspected before dispatch and arrives 95%+ pre-assembled and battery-conditioned for drive-away use.',
            'Dispatch begins once payment has cleared. We email you the carrier details and tracking information when your order ships.',
          ],
        },
        {
          heading: 'On delivery',
          body: [
            ['Be available at the delivery address, or nominate someone who can receive the vehicle.', 'Check the vehicle and packaging at the time of delivery and note any visible damage on the carrier paperwork.', `Contact us on ${CONTACT.phoneDisplay} or ${CONTACT.email} the same day if anything is damaged or missing so we can lodge a claim.`],
          ],
        },
        {
          heading: 'Delivery times and remote areas',
          body: [
            'Transit time depends on the carrier route and your location. We confirm an estimated delivery window by email when your order is dispatched. Rural, regional and island addresses may need extra time.',
          ],
        },
      ]}
    />
  );
}
