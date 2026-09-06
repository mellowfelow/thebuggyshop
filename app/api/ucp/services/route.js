import { NextResponse } from 'next/server';
import { SITE, CONTACT, SHOP } from '@/src/config/site';

export async function GET() {
  return NextResponse.json(
    {
      ucp: '1.0',
      protocol_version: '1.0',
      spec: 'https://ucp.dev/specification/overview/',
      schema: 'https://ucp.dev/schema/v1.json',
      site: `https://${SITE.domain}`,
      name: SITE.name,
      description: "Australia's premier distributor of turnkey electric, hybrid, and lithium-powered luxury all-terrain buggies.",
      services: [
        {
          id: 'product-catalog',
          type: 'catalog',
          url: `https://${SITE.domain}/shop/`,
          description: 'Full Australian buggy and UTV vehicle catalog',
        },
        {
          id: 'mcp-server',
          type: 'mcp',
          url: `https://${SITE.domain}/api/mcp`,
          description: 'MCP Streamable HTTP Server',
        },
        {
          id: 'order',
          type: 'commerce',
          url: `https://wa.me/${CONTACT.whatsapp.replace('+', '')}`,
          description: 'Place vehicle inquiries and orders via WhatsApp',
        },
        {
          id: 'specs-compare',
          type: 'utility',
          url: `https://${SITE.domain}/compare/`,
          description: 'Vehicle specifications comparison matrix',
        },
        {
          id: 'finance-calculator',
          type: 'utility',
          url: `https://${SITE.domain}/finance/`,
          description: 'Pay in 4 and commercial asset finance calculator',
        },
      ],
      capabilities: ['browse', 'search', 'inquiry', 'finance', 'content', 'mcp'],
      currency: SITE.currency,
      minimum_order_aud: SHOP.minOrder,
      payment_methods: SHOP.paymentMethods,
    },
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=300',
      },
    }
  );
}
