import { NextResponse } from 'next/server';
import { SITE, PRODUCTS, CATEGORIES, SHOP, CONTACT } from '@/src/config/site';

const TOOLS_DEFINITIONS = [
  {
    name: 'search_products',
    description: 'Search The Buggy Shop products by keyword, category, or maximum price.',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Search term (e.g. 72V, 4x4, lithium)' },
        category: { type: 'string', description: 'Category slug (e.g. estate-cruisers, farm-utility-4x4)' },
        max_price: { type: 'number', description: 'Maximum price in AUD' },
      },
    },
  },
  {
    name: 'get_product',
    description: 'Get full technical details, battery specs, and road-legal compliance for a buggy by slug.',
    inputSchema: {
      type: 'object',
      required: ['slug'],
      properties: {
        slug: { type: 'string', description: 'The product slug (e.g. grand-tourer-4-seat-estate-cruiser)' },
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

    // 2. tools/list
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

    // 3. tools/call
    if (method === 'tools/call') {
      const { name, arguments: args = {} } = params;

      if (name === 'search_products') {
        let results = [...PRODUCTS];
        if (args.query) {
          const q = args.query.toLowerCase();
          results = results.filter(
            (p) =>
              p.name.toLowerCase().includes(q) ||
              p.shortDescription.toLowerCase().includes(q) ||
              p.category.toLowerCase().includes(q)
          );
        }
        if (args.category) {
          results = results.filter((p) => p.category === args.category);
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
        const cats = CATEGORIES.map((c) => ({
          slug: c.slug,
          name: c.name,
          description: c.description,
          productCount: PRODUCTS.filter((p) => p.category === c.slug).length,
          url: `https://${SITE.domain}/shop/${c.slug}/`,
        }));

        return NextResponse.json(
          {
            jsonrpc: '2.0',
            id,
            result: {
              content: [{ type: 'text', text: JSON.stringify(cats, null, 2) }],
            },
          },
          { headers }
        );
      }

      if (name === 'get_policies') {
        const policies = {
          currency: SITE.currency,
          minimumOrder: SHOP.minOrder,
          shipping: 'Flat-rate hydraulic tail-lift gate delivery to property gates nationwide across Australia.',
          batteryWarranty: '5-Year transferable domestic LiFePO4 replacement guarantee with mobile technical dispatch.',
          roadCompliance: 'Turnkey conditional registration compliance for QLD (TMR), NSW (Transport for NSW), and VIC (VicRoads).',
          cryptoDiscount: `${SHOP.cryptoDiscount}% instant rebate on Bitcoin (BTC) and Tether (USDT) settlements.`,
          paymentMethods: SHOP.paymentMethods,
        };

        return NextResponse.json(
          {
            jsonrpc: '2.0',
            id,
            result: {
              content: [{ type: 'text', text: JSON.stringify(policies, null, 2) }],
            },
          },
          { headers }
        );
      }

      if (name === 'create_order_draft') {
        const items = args.items || [];
        let total = 0;
        const lineItems = items.map((it) => {
          const prod = PRODUCTS.find((p) => p.slug === it.slug) || { name: it.slug, price: 0 };
          const qty = it.quantity || 1;
          const lineTotal = prod.price * qty;
          total += lineTotal;
          return `${qty}x ${prod.name} ($${lineTotal.toLocaleString('en-AU')} AUD)`;
        });

        const waText = `G'day! I would like to confirm an order draft for:\n${lineItems.join('\n')}\nTotal: $${total.toLocaleString('en-AU')} AUD${args.notes ? `\nNotes: ${args.notes}` : ''}`;
        const waUrl = `https://wa.me/${CONTACT.whatsapp.replace('+', '')}?text=${encodeURIComponent(waText)}`;

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
                      orderDraftTotal: total,
                      currency: SITE.currency,
                      cryptoDiscountTotal: Math.round(total * (1 - SHOP.cryptoDiscount / 100)),
                      whatsAppOrderUrl: waUrl,
                      status: 'draft_prepared_human_settlement_required',
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

    return NextResponse.json(
      {
        jsonrpc: '2.0',
        id,
        error: { code: -32600, message: `Method "${method}" not supported.` },
      },
      { headers }
    );
  } catch (err) {
    return NextResponse.json(
      {
        jsonrpc: '2.0',
        id: null,
        error: { code: -32700, message: 'Parse error', data: err.message },
      },
      { status: 400, headers }
    );
  }
}
