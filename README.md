# The Buggy Shop — Australian Luxury All-Terrain & Estate Buggies

Built with **WebForge v9.1** for **Next.js 15 (App Router)** and **Vercel** deployment.

## Key Capabilities
- **Single Source of Truth**: All vehicle specifications, pricing, battery ratings, categories, and authority facts reside in `src/config/site.js`.
- **Live Agent-Ready Layer (V1–V6)**:
  - Streamable HTTP MCP JSON-RPC Server at `/api/mcp`
  - RFC 9727 API Catalog at `/.well-known/api-catalog`
  - UCP 1.0 Services at `/.well-known/ucp` and `/api/ucp/services`
  - ACP 0.1.0 at `/.well-known/acp.json` and `/api/acp/catalog`
  - LLMs documentation at `/llms.txt`
  - Auth declarations at `/auth.md`
  - Client-side WebMCP at `/public/js/webmcp.js`
- **E-Commerce & Order Drafting**: LocalStorage shopping cart, WhatsApp settlement automation, 10% Bitcoin/USDT rebate calculation, and Pay in 4 installment breakdown.
- **Interactive Specs Matrix & Finance Calculator**: Multi-vehicle comparison matrix and commercial agricultural lease estimator.
- **Pre-Ship Validation**: Integrated `scripts/crosscheck.mjs` verifying SEO, Schema, JSON-LD, and compliance rules.

## Local Development & Build

```bash
# Install dependencies
npm install

# Generate agent-ready files
npm run gen

# Run pre-ship validation crosscheck
npm run crosscheck

# Start local Next.js dev server
npm run dev

# Production build
npm run build
```

## Deployment to Vercel via GitHub

1. Create a new empty GitHub repository.
2. Push this codebase to the repository:
   ```bash
   git init
   git remote add origin https://github.com/[username]/[repo-name].git
   git add .
   git commit -m "Initial build — WebForge v9.1 The Buggy Shop"
   git push -u origin main
   ```
3. Import project in Vercel.
4. **CRITICAL**: Confirm Framework Preset is set to **Next.js**.
5. Deploy.
