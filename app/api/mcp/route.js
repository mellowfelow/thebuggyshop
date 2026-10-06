import { NextResponse } from 'next/server';
import { SITE, SHOP, CONTACT } from '@/src/config/site';
import { PRODUCTS } from '@/src/config/products';
import { CATEGORY_TREE } from '@/src/config/categories';
import { searchProducts } from '@/lib/search';
import { inNode } from '@/lib/catalog';

const TOOLS_DEFINITIONS = [
  {
    name: 'search_products',
    description: 'Search The Buggy Shop products by keyword, category, brand, or maximum price.',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Search term (e.g. MGI, lithium, remote, 4-seat)' },
        category: { type: 'string', description: 'Category slug (e.g. electric-golf-buggies, remote-control-golf-buggies)' },
        brand: { type: 'string', description: 'Brand slug (e.g. mgi, motocaddy, club-car)' },
        max_price: { type: 'number', description: 'Maximum price in AUD' },
      },
    },
  },
  {
    name: 'get_product',
    description: 'Get full technical details, key specs, battery details, and compliance for a buggy by slug.',
    inputSchema: {
      type: 'object',
      required: ['slug'],
      properties: {
        slug: { type: 'string', description: 'The product slug (e.g. mgi-zip-navigator-at-remote-electric-golf-buggy)' },
      },
    },
  },
  {
    name: 'list_categories',
    description: 'List all buggy vehicle categories and their current machine counts.',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'get_policies',
    description: 'Get shipping fees, LiFePO4 battery warranty terms, and accepted payment methods.',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'create_order_draft',
    description: 'Create a prefilled WhatsApp or order draft link. Human completes order — never captures payment directly.',
    inputSchema: {
      type: 'object',
      required: ['items'],
      properties: {
        items: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              slug: { type: 'string' },
              quantity: { type: 'number' },
            },
          },
        },
        notes: { type: 'string' },
      },
    },
  },
];

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Accept, Mcp-Session-Id',
    },
  });
}

export async function POST(request) {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Accept, Mcp-Session-Id',
  };

  try {
    const body = await request.json();
    const { jsonrpc = '2.0', id = null, method, params = {} } = body;

    // 1. Initialize
    if (method === 'initialize') {
      return NextResponse.json(
        {
          jsonrpc: '2.0',
          id,
          result: {
            protocolVersion: '2025-03-26',
            capabilities: {
              tools: {},
            },
            serverInfo: {
              name: SITE.name,
              version: '1.0.0',
            },
          },
        },
        { headers }
      );
    }

    // 2. Tools List
    if (method === 'tools/list') {
      return NextResponse.json(
        {
          jsonrpc: '2.0',
          id,
          result: {
            tools: TOOLS_DEFINITIONS,
          },
        },
        { headers }
      );
    }

    // 3. Tools Call
    if (method === 'tools/call') {
      const { name, arguments: args = {} } = params;

      if (name === 'search_products') {
        let results = args.query ? searchProducts(String(args.query)).results.map((r) => r.product) : [...PRODUCTS];
        if (args.category) {
          results = results.filter((p) => inNode(p, args.category));
        }
        if (args.brand) {
          results = results.filter((p) => p.brand === args.brand);
        }
        if (args.max_price) {
          results = results.filter((p) => p.price <= Number(args.max_price));
        }

        return NextResponse.json(
          {
            jsonrpc: '2.0',
            id,
            result: {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify(
                    results.map((p) => ({
                      slug: p.slug,
                      name: p.name,
                      price: p.price,
                      currency: SITE.currency,
                      category: p.category,
                      brand: p.brandName,
                      shortDescription: p.shortDescription,
                      url: `https://${SITE.domain}/shop/${p.category}/${p.slug}/`,
                    })),
                    null,
                    2
                  ),
                },
              ],
            },
          },
          { headers }
        );
      }

      if (name === 'get_product') {
        const product = PRODUCTS.find((p) => p.slug === args.slug);
        if (!product) {
          return NextResponse.json(
            {
              jsonrpc: '2.0',
              id,
              error: { code: -32602, message: `Product slug "${args.slug}" not found.` },
            },
            { headers }
          );
        }

        return NextResponse.json(
          {
            jsonrpc: '2.0',
            id,
            result: {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify(
                    {
                      ...product,
                      currency: SITE.currency,
                      url: `https://${SITE.domain}/shop/${product.category}/${product.slug}/`,
                    },
                    null,
                    2
                  ),
                },
              ],
            },
          },
          { headers }
        );
      }

      if (name === 'list_categories') {
        const cats = CATEGORY_TREE.filter((c) => !c.redirectTo).map((c) => ({
          slug: c.slug,
          name: c.navLabel,
          pageTitle: c.pageTitle,
          productCount: PRODUCTS.filter((p) => inNode(p, c.slug)).length,
          url: `https://${SITE.domain}/shop/${c.slug}/`,
        }));

        return NextResponse.json(
          {
            jsonrpc: '2.0',
            id,
            result: {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify(cats, null, 2),
                },
              ],
            },
          },
          { headers }
        );
      }

      if (name === 'get_policies') {
        const policies = {
          currency: SITE.currency,
          pricesIncludeGst: true,
          minimumOrder: SHOP.minOrder,
          shipping: {
            flatFee: SHOP.shippingFee,
            freeThreshold: SHOP.freeShippingThreshold,
            method: 'Australia-wide hydraulic tail-lift direct freight to course or property',
          },
          cryptoDiscount: {
            percentage: SHOP.cryptoDiscount,
            description: '10% instant rebate on Bitcoin (BTC) or Tether (USDT) cryptocurrency settlement. Standard pricing on PayID and direct bank wire.',
          },
          warranty: 'Australian warranty with factory parts backup from our Queensland workshop',
          ordering: 'Human-assisted checkout. Drafts prepared by agent and finalized with Queensland Sales Desk.',
        };

        return NextResponse.json(
          {
            jsonrpc: '2.0',
            id,
            result: {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify(policies, null, 2),
                },
              ],
            },
          },
          { headers }
        );
      }

      if (name === 'create_order_draft') {
        const items = args.items || [];
        const populatedItems = [];
        let subtotal = 0;

        for (const item of items) {
          const product = PRODUCTS.find((p) => p.slug === item.slug);
          if (product) {
            const qty = item.quantity || 1;
            const lineTotal = product.price * qty;
            subtotal += lineTotal;
            populatedItems.push({
              slug: product.slug,
              name: product.name,
              price: product.price,
              quantity: qty,
              lineTotal,
            });
          }
        }

        const cryptoDiscountAmount = subtotal * (SHOP.cryptoDiscount / 100);
        const totalAfterCrypto = subtotal - cryptoDiscountAmount;

        const summaryText = populatedItems
          .map((i) => `• ${i.quantity}x ${i.name} ($${i.price.toLocaleString('en-AU')} AUD)`)
          .join('\n');

        const message = `Hello The Buggy Shop! I would like to order:\n\n${summaryText}\n\nSubtotal: $${subtotal.toLocaleString(
          'en-AU'
        )} AUD\nEstimated with 10% Crypto Rebate: $${totalAfterCrypto.toLocaleString('en-AU')} AUD\n${
          args.notes ? `\nNotes: ${args.notes}` : ''
        }`;

        const whatsappUrl = `https://wa.me/${CONTACT.whatsapp.replace('+', '')}?text=${encodeURIComponent(
          message
        )}`;

        return NextResponse.json(
          {
            jsonrpc: '2.0',
            id,
            result: {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify(
                    {
                      status: 'draft_created',
                      currency: SITE.currency,
                      items: populatedItems,
                      subtotal,
                      cryptoDiscount: {
                        discountPercent: SHOP.cryptoDiscount,
                        discountAmount: cryptoDiscountAmount,
                        totalWithCrypto: totalAfterCrypto,
                      },
                      notes: args.notes || null,
                      whatsappOrderUrl: whatsappUrl,
                      instruction: 'Click the whatsappOrderUrl to review and submit with Queensland sales team.',
                    },
                    null,
                    2
                  ),
                },
              ],
            },
          },
          { headers }
        );
      }

      return NextResponse.json(
        {
          jsonrpc: '2.0',
          id,
          error: { code: -32601, message: `Tool "${name}" not found.` },
        },
        { headers }
      );
    }

    // Unknown JSON-RPC method
    return NextResponse.json(
      {
        jsonrpc: '2.0',
        id,
        error: { code: -32601, message: `Method "${method}" not implemented.` },
      },
      { headers }
    );
  } catch (error) {
    return NextResponse.json(
      {
        jsonrpc: '2.0',
        id: null,
        error: { code: -32700, message: 'Parse error or invalid request payload.' },
      },
      { headers }
    );
  }
}
