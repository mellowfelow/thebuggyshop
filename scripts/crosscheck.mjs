// scripts/crosscheck.mjs
// Pre-ship Crosscheck for WebForge v11.1 Vercel target
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SITE, CONTACT, SHOP, BRAND, CATEGORIES, PRODUCTS, POSTS, COMPLIANCE, REPLY, FORMS } from '../src/config/site.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('[crosscheck] Starting WebForge v11.1 pre-ship crosscheck...');

let errors = [];
let warnings = [];

function checkFileExists(relPath, desc) {
  const fullPath = path.join(rootDir, relPath);
  if (!fs.existsSync(fullPath)) {
    errors.push(`Missing mandatory file: ${relPath} (${desc})`);
    return false;
  }
  return true;
}

// B6: Check Mandatory Agent Files A-N
checkFileExists('vercel.json', 'Vercel configuration and security headers');
checkFileExists('public/robots.txt', 'Robots.txt with AI crawlers');
checkFileExists('public/llms.txt', 'LLMs.txt specification file');
checkFileExists('public/auth.md', 'Auth.md for agent security info');
checkFileExists('public/.well-known/api-catalog', 'RFC 9727 API Catalog');
checkFileExists('public/.well-known/agent-skills/index.json', 'Agent skills registry');
checkFileExists('public/.well-known/mcp/server-card.json', 'MCP server card with live streamable-http');
checkFileExists('public/.well-known/oauth-protected-resource', 'OAuth protected resource metadata');
checkFileExists('public/.well-known/oauth-authorization-server', 'OAuth authorization server metadata');
checkFileExists('public/.well-known/openid-configuration', 'OpenID configuration metadata');
checkFileExists('public/.well-known/acp.json', 'ACP protocol metadata');
checkFileExists('public/.well-known/ucp', 'UCP protocol metadata');
checkFileExists('public/js/webmcp.js', 'WebMCP in-browser agent bridge');

// Reply Portal Mandatory System Files
checkFileExists('lib/mailer.js', 'Mailer singleton (nodemailer)');
checkFileExists('lib/redis.js', 'Upstash Redis client with 5 env var variants');
checkFileExists('lib/orderStore.js', 'Redis order store');
checkFileExists('lib/enquiryStore.js', 'Redis enquiry store');
checkFileExists('lib/adminAuth.js', 'Admin passcode authentication');
checkFileExists('lib/order.js', 'Order payment parser and formatter');
checkFileExists('lib/whatsapp.js', 'WhatsApp messaging helpers');
checkFileExists('utils/emailTemplates.js', 'Light branded HTML email templates');
checkFileExists('src/components/CopyField.jsx', 'Tap to copy component');
checkFileExists('app/admin/page.jsx', 'Reply Portal Admin Hub');
checkFileExists('app/order/payment-details/page.jsx', 'Public payment details copy page');
checkFileExists('app/order/confirm-payment/page.jsx', 'Public confirm payment upload page');

// B10: Robots.txt disallows /admin/
const robotsPath = path.join(rootDir, 'public/robots.txt');
if (fs.existsSync(robotsPath)) {
  const robotsContent = fs.readFileSync(robotsPath, 'utf8');
  if (!robotsContent.includes('Disallow: /admin/')) {
    errors.push('[B10 FAIL] robots.txt does not disallow /admin/');
  }
}

// B11: Web3Forms check
if (FORMS.provider === 'web3forms' || (typeof FORMS.web3FormsAccessKey !== 'undefined')) {
  errors.push('[B11 FAIL] Web3Forms is retired in WebForge v11.1. Must use smtp (or opt-in resend).');
}

// Check UCP specification compliance: "ucp": "1.0" must be present
const ucpPath = path.join(rootDir, 'public/.well-known/ucp');
if (fs.existsSync(ucpPath)) {
  try {
    const ucpContent = JSON.parse(fs.readFileSync(ucpPath, 'utf8'));
    if (ucpContent.ucp !== '1.0') {
      errors.push('public/.well-known/ucp is missing mandatory "ucp": "1.0" field');
    }
  } catch (err) {
    errors.push(`public/.well-known/ucp is not valid JSON: ${err.message}`);
  }
}

// Check Auth.md first line rule: MUST start with exactly '# Auth.md'
const authMdPath = path.join(rootDir, 'public/auth.md');
if (fs.existsSync(authMdPath)) {
  const authFirstLine = fs.readFileSync(authMdPath, 'utf8').split('\n')[0].trim();
  if (authFirstLine !== '# Auth.md') {
    errors.push(`public/auth.md first line must be exactly '# Auth.md', found: '${authFirstLine}'`);
  }
}

// Check B7: Compliance scan for banned terms
if (COMPLIANCE.bannedTerms && COMPLIANCE.bannedTerms.length > 0) {
  const banned = COMPLIANCE.bannedTerms.map(t => t.toLowerCase());
  const publicFiles = ['public/llms.txt', 'public/auth.md', 'public/.well-known/acp.json', 'public/.well-known/mcp/server-card.json'];
  publicFiles.forEach(pf => {
    const p = path.join(rootDir, pf);
    if (fs.existsSync(p)) {
      const content = fs.readFileSync(p, 'utf8').toLowerCase();
      banned.forEach(term => {
        if (content.includes(term)) {
          errors.push(`[B7 COMPLIANCE FAIL] Banned term "${term}" found in ${pf}`);
        }
      });
    }
  });
}

// Check Product Data Integrity
if (!PRODUCTS || PRODUCTS.length === 0) {
  errors.push('No products found in src/config/site.js');
} else {
  PRODUCTS.forEach(p => {
    if (!p.slug || !p.name || !p.price || !p.category || !p.images || p.images.length === 0) {
      errors.push(`Product missing mandatory fields: ${JSON.stringify(p)}`);
    }
  });
}

// Check Category Consistency
CATEGORIES.forEach(c => {
  const matching = PRODUCTS.filter(p => p.category === c.slug);
  if (matching.length === 0) {
    warnings.push(`Category "${c.slug}" has 0 products attached.`);
  }
});

console.log('\n--- WebForge v11.1 Crosscheck Summary ---');
if (errors.length === 0) {
  console.log('✅ ALL PRE-SHIP CHECKS PASSED (Zero Blocking Errors).');
  if (warnings.length > 0) {
    console.log(`⚠️  ${warnings.length} Warnings:\n - ` + warnings.join('\n - '));
  }
  process.exit(0);
} else {
  console.error(`❌ ${errors.length} BLOCKING ERRORS FOUND:`);
  errors.forEach(e => console.error(`  - ${e}`));
  process.exit(1);
}
