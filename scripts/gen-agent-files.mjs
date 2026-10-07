// scripts/gen-agent-files.mjs
// Generates all domain-bearing and agent-ready files from src/config/site.js per WebForge v11.1
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SITE, CONTACT, SHOP, BRAND, CATEGORIES, PRODUCTS, POSTS, COMPLIANCE } from '../src/config/site.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const domain = SITE.domain || 'DOMAIN.com';
const baseUrl = `https://${domain}`;

console.log(`[gen-agent-files] Generating agent & config files for domain: ${domain}...`);

// Ensure directories exist
const publicDir = path.join(rootDir, 'public');
const wellKnownDir = path.join(publicDir, '.well-known');
const mcpDir = path.join(wellKnownDir, 'mcp');
const agentSkillsDir = path.join(wellKnownDir, 'agent-skills');
const jsDir = path.join(publicDir, 'js');

[publicDir, wellKnownDir, mcpDir, agentSkillsDir, jsDir].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// 1. vercel.json
const isPlaceholderDomain = /DOMAIN/i.test(domain);
const vercelConfig = {
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "trailingSlash": true,
  // www -> apex redirect only once a real domain is configured (never emit www.DOMAIN.com)
  "redirects": isPlaceholderDomain ? [] : [
    {
      "source": "/:path*",
      "has": [{ "type": "host", "value": `www.${domain}` }],
      "destination": `https://${domain}/:path*`,
      "permanent": true
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Frame-Options", "value": "SAMEORIGIN" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "Strict-Transport-Security", "value": "max-age=31536000; includeSubDomains" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "geolocation=(), microphone=(), camera=()" },
        { "key": "Content-Security-Policy", "value": "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https:; font-src 'self' data:; connect-src 'self'; media-src 'self'; frame-src 'none'; frame-ancestors 'self'; base-uri 'self'; form-action 'self'; object-src 'none'; upgrade-insecure-requests" },
        { "key": "Link", "value": `</.well-known/api-catalog>; rel="api-catalog", </.well-known/agent-skills/index.json>; rel="describedby", </llms.txt>; rel="describedby", </.well-known/mcp/server-card.json>; rel="service-desc", </auth.md>; rel="auth", </.well-known/openid-configuration>; rel="openid-configuration"` }
      ]
    },
    { "source": "/.well-known/api-catalog", "headers": [{ "key": "Content-Type", "value": "application/linkset+json" }, { "key": "Access-Control-Allow-Origin", "value": "*" }] },
    { "source": "/.well-known/agent-skills/index.json", "headers": [{ "key": "Content-Type", "value": "application/json" }, { "key": "Access-Control-Allow-Origin", "value": "*" }] },
    { "source": "/.well-known/mcp/server-card.json", "headers": [{ "key": "Content-Type", "value": "application/json" }, { "key": "Access-Control-Allow-Origin", "value": "*" }] },
    { "source": "/.well-known/oauth-protected-resource", "headers": [{ "key": "Content-Type", "value": "application/json" }, { "key": "Access-Control-Allow-Origin", "value": "*" }] },
    { "source": "/.well-known/oauth-authorization-server", "headers": [{ "key": "Content-Type", "value": "application/json" }, { "key": "Access-Control-Allow-Origin", "value": "*" }] },
    { "source": "/.well-known/openid-configuration", "headers": [{ "key": "Content-Type", "value": "application/json" }, { "key": "Access-Control-Allow-Origin", "value": "*" }] },
    { "source": "/.well-known/acp.json", "headers": [{ "key": "Content-Type", "value": "application/json" }, { "key": "Access-Control-Allow-Origin", "value": "*" }] },
    { "source": "/.well-known/ucp", "headers": [{ "key": "Content-Type", "value": "application/json" }, { "key": "Access-Control-Allow-Origin", "value": "*" }] },
    { "source": "/auth.md", "headers": [{ "key": "Content-Type", "value": "text/markdown; charset=utf-8" }, { "key": "Access-Control-Allow-Origin", "value": "*" }] },
    { "source": "/llms.txt", "headers": [{ "key": "Content-Type", "value": "text/plain; charset=utf-8" }, { "key": "Access-Control-Allow-Origin", "value": "*" }] },
    { "source": "/:path*.md", "headers": [{ "key": "Content-Type", "value": "text/markdown; charset=utf-8" }] },
    { "source": "/api/:path*", "headers": [{ "key": "Access-Control-Allow-Origin", "value": "*" }, { "key": "Access-Control-Allow-Methods", "value": "GET, POST, OPTIONS" }, { "key": "Access-Control-Allow-Headers", "value": "Content-Type, Accept, Mcp-Session-Id, x-admin-passcode" }] }
  ]
};
fs.writeFileSync(path.join(rootDir, 'vercel.json'), JSON.stringify(vercelConfig, null, 2));

// 2. public/robots.txt  (single source: app/robots.js was removed - it conflicted with this file)
const PRIVATE_PATHS = ['/admin/', '/order/', '/thank-you-contact/', '/thank-you-order/', '/thank-you-wholesale/'];
const AI_BOTS = ['GPTBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-Web', 'PerplexityBot', 'Applebot', 'Amazonbot', 'Bytespider', 'CCBot', 'Google-Extended', 'Meta-ExternalAgent', 'cohere-ai'];
const disallowBlock = PRIVATE_PATHS.map((p) => `Disallow: ${p}`).join('\n');
const robotsTxt = `User-agent: *
Content-Signal: search=yes, ai-input=yes, ai-train=no
Allow: /
${disallowBlock}

# AI crawlers - welcome on product and content pages (private paths stay blocked)
${AI_BOTS.map((b) => `User-agent: ${b}\nAllow: /\n${disallowBlock}`).join('\n\n')}

Sitemap: ${baseUrl}/sitemap.xml

# Agent-readable resources
# llms.txt: ${baseUrl}/llms.txt
# API Catalog: ${baseUrl}/.well-known/api-catalog
# Agent Skills: ${baseUrl}/.well-known/agent-skills/index.json
# MCP Server Card: ${baseUrl}/.well-known/mcp/server-card.json
`;
fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsTxt);

// 3. public/llms.txt
const llmsTxt = `# ${SITE.name}
> ${SITE.tagline}

${BRAND.description}

## Identity & Core Info
- **Established**: ${BRAND.foundingYear} in ${BRAND.foundingLocation}
- **Headquarters**: ${CONTACT.hq}
- **Phone / WhatsApp**: ${CONTACT.phone} (${CONTACT.operatingHours})
- **Currency**: ${SITE.currency} (All prices include 10% Australian GST)
- **Nationwide Freight**: Flat-rate hydraulic tail-lift delivery to property gates and regional depots across Australia ($${SHOP.shippingFee} AUD).
- **Payment Methods**: Direct Bank Wire, Australian PayID, and Crypto (Bitcoin BTC / Tether USDT with an instant ${SHOP.cryptoDiscount}% discount).
- **Warranty**: 5-Year Domestic LiFePO4 Lithium Battery Replacement Warranty + 3-Year Chassis & Powertrain Warranty.
- **Road Compliance**: Pre-fitted state-compliant lighting, dual mirrors, horn, beacons, and pre-filled conditional registration paperwork for QLD TMR, Transport for NSW, and VicRoads.

## Product Categories & Models
${CATEGORIES.map(c => `- [${c.name}](${baseUrl}/shop/${c.slug}/): ${c.description}`).join('\n')}

### Available Buggies
${PRODUCTS.map(p => `- [${p.name}](${baseUrl}/shop/${p.category}/${p.slug}/): $${p.price.toLocaleString('en-AU')} ${SITE.currency} — ${p.shortDescription}`).join('\n')}

## Educational Guides & Insights
${POSTS.map(post => `- [${post.title}](${baseUrl}/blog/${post.slug}/): ${post.excerpt}`).join('\n')}

## Core Navigation
- [Catalog & Store](${baseUrl}/shop/): Browse all turnkey electric and lithium buggies.
- [Product Comparison Matrix](${baseUrl}/compare/): Side-by-side engineering specs and payload comparisons.
- [Pay in 4 & Finance Calculator](${baseUrl}/finance/): Weekly and monthly payment breakdowns.
- [About & Australian Heritage](${baseUrl}/about/): 20+ years of Queensland outback engineering.
- [Contact & Dispatch Desk](${baseUrl}/contact/): Direct phone, WhatsApp, and email order assistance.
- [Frequently Asked Questions](${baseUrl}/faq/): Answers on prices, delivery, warranty, batteries, golf gear and road rules.

## Optional Agent Resources
- [API Catalog](${baseUrl}/.well-known/api-catalog): RFC 9727 linkset descriptor.
- [Agent Skills](${baseUrl}/.well-known/agent-skills/index.json): High-level commerce and discovery skills.
- [MCP Server Card](${baseUrl}/.well-known/mcp/server-card.json): Model Context Protocol streamable HTTP capabilities.
- [Authentication & Access Rules](${baseUrl}/auth.md): Public access terms and human-in-the-loop ordering.
`;
fs.writeFileSync(path.join(publicDir, 'llms.txt'), llmsTxt);

// 4. public/auth.md (Critical: MUST start with exactly '# Auth.md' as first line)
const authMd = `# Auth.md

## Site: ${SITE.name} — Commercial & Luxury Utility Vehicles

## Agent Registration
No authentication required. All catalog, specification, and educational resources are publicly accessible.

## Public Resources
| Resource | URL |
|---|---|
| Product Catalog | ${baseUrl}/shop/ |
| Product Compare | ${baseUrl}/compare/ |
| Finance Calculator | ${baseUrl}/finance/ |
| Educational Blog | ${baseUrl}/blog/ |
| About & Heritage | ${baseUrl}/about/ |
| Contact & Support | ${baseUrl}/contact/ |
| FAQ | ${baseUrl}/faq/ |

## Authentication

\`\`\`json
{
  "agent_auth": {
    "register_uri": null,
    "identity_types_supported": ["none"],
    "credential_types_supported": ["none"],
    "notes": "No authentication required. All resources are public."
  }
}
\`\`\`

## Ordering
Human-in-the-loop required. Agents may browse catalog items, perform comparison queries, and prepare order drafts via the MCP server.
Orders are completed securely by a human customer via WhatsApp dispatch (${CONTACT.phoneDisplay}) or the official order request form.
`;
fs.writeFileSync(path.join(publicDir, 'auth.md'), authMd);

// 5. public/.well-known/api-catalog (RFC 9727)
const apiCatalog = {
  "linkset": [
    { "anchor": `${baseUrl}/`, "https://www.iana.org/assignments/link-relations/service-doc": [{ "href": `${baseUrl}/about/` }], "title": `${SITE.name} — ${SITE.tagline}` },
    { "anchor": `${baseUrl}/shop/`, "type": "text/html", "title": `${SITE.name} Product Catalog` },
    { "anchor": `${baseUrl}/compare/`, "type": "text/html", "title": `${SITE.name} Compare Matrix` },
    { "anchor": `${baseUrl}/finance/`, "type": "text/html", "title": `${SITE.name} Finance Calculator` },
    { "anchor": `${baseUrl}/api/products/`, "type": "application/json", "title": `${SITE.name} Products API` },
    { "anchor": `${baseUrl}/api/categories/`, "type": "application/json", "title": `${SITE.name} Categories API` },
    { "anchor": `${baseUrl}/api/search/`, "type": "application/json", "title": `${SITE.name} Search API` },
    { "anchor": `${baseUrl}/api/mcp/`, "type": "application/json", "https://www.iana.org/assignments/link-relations/service-desc": [{ "href": `${baseUrl}/.well-known/mcp/server-card.json` }], "title": `${SITE.name} MCP Server` }
  ]
};
fs.writeFileSync(path.join(wellKnownDir, 'api-catalog'), JSON.stringify(apiCatalog, null, 2));

// 6. public/.well-known/agent-skills/index.json
const agentSkills = {
  "$schema": "https://agentskills.io/schema/v0.2.0/index.json",
  "name": SITE.name,
  "url": baseUrl,
  "description": SITE.tagline,
  "skills": [
    { "name": "search-products", "type": "commerce", "description": "Search Australian luxury all-terrain & farm utility buggies by keyword, category, or price", "url": `${baseUrl}/api/mcp/`, "sha256": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855" },
    { "name": "browse-catalog", "type": "navigation", "description": "Browse the complete electric buggy catalog with LiFePO4 battery specifications", "url": `${baseUrl}/shop/`, "sha256": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855" },
    { "name": "order-draft", "type": "commerce", "description": "Create a prefilled order draft URL. Human customer completes transaction via WhatsApp.", "url": `${baseUrl}/api/mcp/`, "sha256": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855" },
    { "name": "compare-models", "type": "commerce", "description": "Compare engineering specifications, payload capacities, and terrain ratings", "url": `${baseUrl}/compare/`, "sha256": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855" },
    { "name": "product-education", "type": "content", "description": "Educational articles on QLD/NSW/VIC conditional road rego and LiFePO4 battery care", "url": `${baseUrl}/blog/`, "sha256": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855" },
    { "name": "contact", "type": "support", "description": "Contact The Buggy Shop Queensland dispatch and sales desk", "url": `${baseUrl}/contact/`, "sha256": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855" }
  ]
};
fs.writeFileSync(path.join(agentSkillsDir, 'index.json'), JSON.stringify(agentSkills, null, 2));

// 7. public/.well-known/mcp/server-card.json (Vercel variant with live streamable-http MCP endpoint)
const mcpServerCard = {
  "$schema": "https://modelcontextprotocol.io/schemas/server-card/v1.json",
  "serverInfo": {
    "name": SITE.name,
    "version": "1.0.0",
    "description": SITE.tagline,
    "homepage": baseUrl,
    "contact": { "email": CONTACT.email, "whatsapp": CONTACT.phone }
  },
  "transport": { "type": "streamable-http", "endpoint": `${baseUrl}/api/mcp/` },
  "capabilities": {
    "tools": [
      {
        "name": "search_products",
        "description": "Search Australian luxury all-terrain & utility buggies by keyword, category, or maximum price in AUD",
        "inputSchema": {
          "type": "object",
          "properties": {
            "query": { "type": "string" },
            "category": { "type": "string" },
            "max_price": { "type": "number" }
          }
        }
      },
      {
        "name": "get_product",
        "description": "Get full engineering specifications, LiFePO4 battery details, payload, and pricing for a specific buggy model by slug",
        "inputSchema": {
          "type": "object",
          "required": ["slug"],
          "properties": {
            "slug": { "type": "string" }
          }
        }
      },
      {
        "name": "list_categories",
        "description": "List all buggy vehicle categories (Estate Cruisers, Farm Utility, Outback Adventure)",
        "inputSchema": { "type": "object", "properties": {} }
      },
      {
        "name": "get_policies",
        "description": "Get Australian nationwide tail-lift shipping fees, 5-year LiFePO4 warranty, and 10% crypto discount rules",
        "inputSchema": { "type": "object", "properties": {} }
      },
      {
        "name": "create_order_draft",
        "description": "Create a prefilled WhatsApp or order form URL. Human completes transaction — never captures payment directly.",
        "inputSchema": {
          "type": "object",
          "properties": {
            "items": { "type": "array" },
            "notes": { "type": "string" }
          }
        }
      }
    ],
    "resources": [
      { "name": "product-catalog", "description": "Full Australian electric buggy catalog", "uri": `${baseUrl}/shop/` },
      { "name": "compare", "description": "Product comparison matrix", "uri": `${baseUrl}/compare/` },
      { "name": "blog", "description": "Educational guides and road compliance rules", "uri": `${baseUrl}/blog/` }
    ],
    "commerce": {
      "ordering": "human-assisted-whatsapp-or-form",
      "payment": SHOP.paymentMethods,
      "currency": SITE.currency,
      "minimumOrder": SHOP.minOrder,
      "flatShipping": SHOP.shippingFee,
      "cryptoDiscountPercent": SHOP.cryptoDiscount
    }
  },
  "legal": {
    "ageRestriction": "none",
    "productType": "electric-all-terrain-utility-vehicles",
    "compliance": "Turnkey QLD/NSW/VIC conditional road compliance lighting and pre-filled registration paperwork."
  }
};
fs.writeFileSync(path.join(mcpDir, 'server-card.json'), JSON.stringify(mcpServerCard, null, 2));

// 8. public/.well-known/oauth-protected-resource
const oauthProtectedResource = {
  "resource": baseUrl,
  "resource_name": `${SITE.name} Public Catalog`,
  "authorization_servers": [],
  "scopes_supported": [],
  "bearer_methods_supported": [],
  "resource_documentation": `${baseUrl}/auth.md`,
  "resource_policy_uri": `${baseUrl}/about/`,
  "tls_client_certificate_bound_access_tokens": false,
  "note": `All resources on ${domain} are publicly accessible. No OAuth tokens required.`
};
fs.writeFileSync(path.join(wellKnownDir, 'oauth-protected-resource'), JSON.stringify(oauthProtectedResource, null, 2));

// 9. public/.well-known/oauth-authorization-server
const oauthAuthServer = {
  "issuer": baseUrl,
  "authorization_endpoint": null,
  "token_endpoint": null,
  "jwks_uri": null,
  "grant_types_supported": [],
  "response_types_supported": [],
  "scopes_supported": [],
  "note": `${SITE.name} has no protected APIs. All vehicle catalog resources are publicly accessible.`,
  "public_resources": [
    `${baseUrl}/shop/`,
    `${baseUrl}/compare/`,
    `${baseUrl}/finance/`,
    `${baseUrl}/blog/`,
    `${baseUrl}/about/`,
    `${baseUrl}/contact/`,
    `${baseUrl}/llms.txt`,
    `${baseUrl}/.well-known/api-catalog`,
    `${baseUrl}/.well-known/agent-skills/index.json`,
    `${baseUrl}/.well-known/mcp/server-card.json`
  ],
  "agent_auth": {
    "register_uri": null,
    "identity_types_supported": ["none"],
    "credential_types_supported": ["none"],
    "notes": "No registration required. All content is publicly accessible to autonomous agents."
  }
};
fs.writeFileSync(path.join(wellKnownDir, 'oauth-authorization-server'), JSON.stringify(oauthAuthServer, null, 2));

// 10. public/.well-known/openid-configuration
const openidConfig = {
  "issuer": baseUrl,
  "note": `${SITE.name} does not operate an OpenID Connect provider. All resources publicly accessible.`,
  "public_site": true,
  "authorization_endpoint": null,
  "token_endpoint": null,
  "userinfo_endpoint": null,
  "jwks_uri": null,
  "scopes_supported": [],
  "response_types_supported": [],
  "grant_types_supported": [],
  "subject_types_supported": [],
  "id_token_signing_alg_values_supported": []
};
fs.writeFileSync(path.join(wellKnownDir, 'openid-configuration'), JSON.stringify(openidConfig, null, 2));

// 11. public/.well-known/acp.json
const acpJson = {
  "protocol": { "name": "acp", "version": "0.1.0" },
  "name": SITE.name,
  "description": SITE.tagline,
  "api_base_url": baseUrl,
  "homepage": baseUrl,
  "transports": ["https"],
  "capabilities": {
    "services": ["product-catalog", "compare", "finance", "blog", "mcp-server"],
    "ordering": "human-assisted",
    "payment_methods": SHOP.paymentMethods,
    "currency": SITE.currency,
    "minimum_order_usd": 0,
    "flat_shipping_fee_aud": SHOP.shippingFee,
    "crypto_discount_percent": SHOP.cryptoDiscount
  },
  "contact": {
    "whatsapp": `https://wa.me/${CONTACT.whatsapp.replace('+', '')}`,
    "email": CONTACT.email
  },
  "legal": {
    "age_restriction": "none",
    "region": "Australia",
    "ships_to": "Australia nationwide (tail-lift freight)",
    "product_type": "Electric All-Terrain & Utility Buggies",
    "compliance": "Australian state conditional road registration compliance (QLD, NSW, VIC)"
  }
};
fs.writeFileSync(path.join(wellKnownDir, 'acp.json'), JSON.stringify(acpJson, null, 2));

// 12. public/.well-known/ucp (Mandatory "ucp": "1.0" field!)
const ucpJson = {
  "ucp": "1.0",
  "protocol_version": "1.0",
  "spec": "https://ucp.dev/specification/overview/",
  "schema": "https://ucp.dev/schema/v1.json",
  "site": baseUrl,
  "name": SITE.name,
  "description": SITE.tagline,
  "services": [
    { "id": "product-catalog", "type": "catalog", "url": `${baseUrl}/shop/`, "description": "Full Australian electric buggy catalog" },
    { "id": "mcp-server", "type": "mcp", "url": `${baseUrl}/api/mcp/`, "description": "MCP Streamable HTTP server for AI agents" },
    { "id": "order", "type": "commerce", "url": `https://wa.me/${CONTACT.whatsapp.replace('+', '')}`, "description": "Place orders or request custom freight quotes via WhatsApp" },
    { "id": "compare", "type": "b2b", "url": `${baseUrl}/compare/`, "description": "Technical comparison matrix" }
  ],
  "capabilities": ["browse", "search", "inquiry", "compare", "finance", "content", "mcp"],
  "endpoints": {
    "mcp": `${baseUrl}/api/mcp/`,
    "catalog": `${baseUrl}/shop/`,
    "contact": `${baseUrl}/contact/`,
    "agent_skills": `${baseUrl}/.well-known/agent-skills/index.json`,
    "mcp_server_card": `${baseUrl}/.well-known/mcp/server-card.json`,
    "api_catalog": `${baseUrl}/.well-known/api-catalog`,
    "llms_txt": `${baseUrl}/llms.txt`
  },
  "currency": SITE.currency,
  "payment_methods": SHOP.paymentMethods,
  "legal": {
    "age_restriction": "none",
    "product_type": "electric-all-terrain-utility-vehicles",
    "compliance": "Turnkey Australian state road compliance lighting pre-fitted"
  }
};
fs.writeFileSync(path.join(wellKnownDir, 'ucp'), JSON.stringify(ucpJson, null, 2));

// 13. public/js/webmcp.js
const webmcpJs = `(function () {
  if (typeof navigator === 'undefined' || !navigator.modelContext) return;
  navigator.modelContext.provideContext({
    tools: [
      {
        name: "search_products",
        description: "Search ${SITE.name} electric buggies by keyword, category, or max price",
        inputSchema: { type: "object", properties: { query: { type: "string" }, category: { type: "string" }, max_price: { type: "number" } } },
        execute: async ({ query, category, max_price }) => {
          const params = new URLSearchParams();
          if (query) params.set('q', query);
          if (category) params.set('category', category);
          if (max_price) params.set('max_price', max_price);
          const res = await fetch(\`${baseUrl}/api/search/?\${params}\`);
          return res.json();
        }
      },
      {
        name: "browse_products",
        description: "Browse electric buggies by category",
        inputSchema: { type: "object", properties: { category: { type: "string" } } },
        execute: async ({ category }) => {
          const url = category ? \`${baseUrl}/shop/\${category}/\` : \`${baseUrl}/shop/\`;
          window.location.href = url;
          return { url };
        }
      },
      {
        name: "order_via_whatsapp",
        description: "Initiate a WhatsApp order for delivery across Australia. Human completes transaction.",
        inputSchema: { type: "object", properties: { message: { type: "string" } } },
        execute: async ({ message }) => {
          const greeting = "Hi ${SITE.name}, ";
          const url = \`https://wa.me/${CONTACT.whatsapp.replace('+', '')}?text=\${encodeURIComponent(greeting + (message || ''))}\`;
          window.open(url, '_blank');
          return { url };
        }
      },
      {
        name: "compare_buggies",
        description: "Open the technical comparison matrix",
        inputSchema: { type: "object", properties: {} },
        execute: async () => {
          window.location.href = \`${baseUrl}/compare/\`;
          return { url: \`${baseUrl}/compare/\` };
        }
      },
      {
        name: "contact",
        description: "Contact ${SITE.name} Queensland dispatch and sales desk",
        inputSchema: { type: "object", properties: {} },
        execute: async () => {
          window.location.href = \`${baseUrl}/contact/\`;
          return { url: \`${baseUrl}/contact/\` };
        }
      }
    ]
  });
})();
`;
fs.writeFileSync(path.join(jsDir, 'webmcp.js'), webmcpJs);

// 14. public/[SITE.indexNowKey].txt
if (SITE.indexNowKey) {
  fs.writeFileSync(path.join(publicDir, `${SITE.indexNowKey}.txt`), SITE.indexNowKey);
}

console.log('[gen-agent-files] All Agent-Ready files successfully created in public/ and vercel.json!');
