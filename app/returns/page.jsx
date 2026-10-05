import LegalPage from '@/src/components/LegalPage';
import { SITE, CONTACT } from '@/src/config/site';
import { seoTitle, seoDesc } from '@/lib/seo';

export const metadata = {
  title: { absolute: seoTitle('Returns, Refunds & Warranty') },
  description: seoDesc('Returns, refunds and warranty at The Buggy Shop, including your rights under the Australian Consumer Law and our 5-year LiFePO4 battery warranty.'),
  alternates: { canonical: `https://${SITE.domain}/returns/` },
};

// NOTE: draft. The Australian Consumer Law wording below is standard and cannot be excluded.
// The business owner must confirm any additional change-of-mind terms before publishing.
export default function ReturnsPage() {
  return (
    <LegalPage
      title="Returns, Refunds & Warranty"
      path="/returns/"
      intro="What you can expect if something is wrong with your purchase."
      updated="October 2026"
      sections={[
        {
          heading: 'Your rights under the Australian Consumer Law',
          body: [
            'Our goods come with guarantees that cannot be excluded under the Australian Consumer Law. You are entitled to a replacement or refund for a major failure and compensation for any other reasonably foreseeable loss or damage. You are also entitled to have the goods repaired or replaced if they fail to be of acceptable quality and the failure does not amount to a major failure.',
          ],
        },
        {
          heading: 'Battery warranty',
          body: [
            'LiFePO4 lithium batteries supplied with our vehicles carry a 5-year domestic replacement warranty. Warranty is for faults in materials and workmanship under normal use and does not cover damage from misuse, neglect, unauthorised modification or accidents.',
          ],
        },
        {
          heading: 'Other products',
          body: [
            'Brand-supplied products such as trolleys, batteries, parts and accessories are covered by the manufacturer or importer warranty stated on the product listing, in addition to your consumer guarantees.',
          ],
        },
        {
          heading: 'How to make a claim',
          body: [
            [
              `Contact us on ${CONTACT.phoneDisplay} or ${CONTACT.email} with your order number and a description of the problem.`,
              'Include clear photos or video of the issue and, for delivery damage, the carrier paperwork.',
              'We will confirm the next step (repair, replacement or refund) in writing. Where a return is required we will arrange and pay for freight for faulty goods.',
            ],
          ],
        },
        {
          heading: 'Change of mind',
          body: [
            'If you are considering cancelling or changing an order, contact us before the vehicle is dispatched. Any change-of-mind arrangement will be confirmed in writing on your order.',
          ],
        },
      ]}
    />
  );
}
