// src/config/core.js
// Site identity, contact, shop rules, reply and brand config. NO catalogue data lives here, so client components
// can import it without shipping the product catalogue to every page. site.js re-exports everything below.

export const SITE = {
  name: 'The Buggy Shop',
  legalName: 'TBS NO.2 PTY LTD',
  entityName: 'TBS NO.2 PTY LTD',
  abn: '65 108 218 471',
  abnLookupUrl: 'https://abr.business.gov.au/ABN/View?id=65108218471',
  tagline: 'Australia\'s Premier Golf Buggy for Sale & Luxury All-Terrain Cart Specialists',
  domain: 'thebuggyshoppty.com.au', // Single source of truth (Vercel production domain; www redirects here)
  locale: 'en-AU',                // Australian English BCP-47
  currency: 'AUD',
  target: 'vercel',
  primaryColor: '#0F172A',        // Deep Obsidian Navy
  secondaryColor: '#1E293B',      // Metallic Slate
  goldColor: '#C5A880',           // Warm Champagne Gold / Burnished Brass
  lightGold: '#FAF8F5',           // Soft Champagne Tint
  darkText: '#0B111E',            // Rich Midnight Charcoal
  bgLight: '#F8F9FA',             // Crisp Porcelain Linen
  gscVerification: 'KlWeGpNv9-wuMIEFgIVANpj8RPV-5Hzlxg6Skc87Uj8',
  bingVerification: 'pending',
  indexNowKey: 'buggy-shop-au-indexnow-key',
  cartKey: 'mm-cart',
}

export const ENTITY = {
  legalName: 'TBS NO.2 PTY LTD',
  abn: '65 108 218 471',
  abnClean: '65108218471',
  abnLookupUrl: 'https://abr.business.gov.au/ABN/View?id=65108218471',
  jurisdiction: 'Australian Business Register (ABR)',
  tradingName: 'The Buggy Shop',
}

export const CONTACT = {
  email: 'sales@thebuggyshoppty.com.au', // entity encoded where displayed
  phone: '+61 480 811 308',
  phoneDisplay: '0480 811 308',
  whatsapp: '+61480811308',
  whatsappDisplay: '+61 480 811 308',
  address: 'Queensland Distribution Center & Technical Workshop',
  hq: 'Queensland, Australia',
  country: 'Australia',
  state: 'QLD',
  operatingHours: 'Mon - Fri: 7:30 AM - 5:30 PM AEST | Sat: 8:00 AM - 2:00 PM AEST',
}

export const SHOP = {
  minOrder: 250, // Minimum order threshold in AUD
  freeShippingThreshold: 0,
  shippingFee: 495, // Flat-rate hydraulic tail-lift delivery to property gates nationwide
  cryptoDiscount: 10, // 10% discount for BTC / USDT payments
  paymentMethods: ['bank-transfer', 'pay-id', 'pay-in-4', 'crypto-BTC', 'crypto-USDT'],
  gstIncluded: true,
  taxRate: 0.10, // 10% Australian GST included in pricing
}

// Buggy / cart bundle: 5% off accessories and parts when the order also contains a buggy or cart.
// Rule lives in lib/bundle.js; the server recomputes it on every order, so the browser cannot change it.
export const BUNDLE = {
  percent: 5,
  vehicleCategories: ['electric-golf-buggies', 'push-pull-golf-buggies', 'luxury-golf-carts', 'off-road-buggies', 'kids-buggies', 'used-golf-buggies'],
  vehicleExcludedSubcategories: ['conversion-kits'], // a conversion kit is not a buggy
  addonCategories: ['accessories', 'parts'],
}

export const FORMS = {
  provider: 'smtp',               // 'smtp' (default) | 'resend' (opt-in, verified domain only)
  smtpFrom: 'sales@thebuggyshoppty.com.au', // fallback; SMTP_FROM env var overrides
  resendFrom: '',                 // only for provider: 'resend'
  turnstileSiteKey: '',
  destinations: {
    contact: 'sales@thebuggyshoppty.com.au',
    order: 'sales@thebuggyshoppty.com.au',
    wholesale: 'sales@thebuggyshoppty.com.au',
  },
}

// Reply Portal single source of truth (WebForge v11.1 Section P)
export const REPLY = {
  brand: { primary: '#C5A880', headerDark: '#0B111E' },
  currency: { code: 'AUD', symbol: '$', locale: 'en-AU' },
  orderPrefix: 'TBS',
  headerTagline: 'Australia\'s Premier Golf Buggy & Luxury All-Terrain Cart Specialists',
  dispatchLine: 'Hydraulic tail-lift freight directly to your property gate or clubhouse nationwide.',
  channels: { email: 'sales@thebuggyshoppty.com.au', whatsapp: '+61480811308' },
  paymentMethods: [
    {
      id: 'bank-transfer',
      label: 'Direct Bank Transfer (Osko / Fast EFT)',
      opening: 'Please find our verified Australian commercial settlement account details below for order {ref} in the amount of {amount}. Real-time settlement supported via Osko / Fast EFT.',
      closing: 'Kindly include your order reference {ref} on the bank transfer description to ensure instant dispatch allocation.'
    },
    {
      id: 'pay-id',
      label: 'Australian PayID Instant Transfer',
      opening: 'Please transfer the order total of {amount} to our registered Australian PayID identifier for order {ref}.',
      closing: 'PayID transfers settle in real-time under the Australian New Payments Platform (NPP).'
    },
    {
      id: 'pay-in-4',
      label: 'Pay in 4 (Commercial Split: 1st Due Today, Rest Month-End)',
      opening: 'Your order {ref} has been set up under our Pay in 4 Commercial Split Plan. The 1st installment (25% of {amount}) is due today to lock in your machinery reservation and schedule pre-delivery inspection.',
      closing: 'The remaining 3 equal installments will be billed and payable at each month end. Official EFT / BSB remittance details are provided above.'
    },
    {
      id: 'crypto-BTC',
      label: 'Bitcoin (BTC) Settlement (10% Discount Applied)',
      opening: 'Your 10% crypto discount has been applied. Total settlement amount is {amount}. Please transfer to our designated Bitcoin wallet below:',
      closing: 'Dispatch processing begins automatically upon 2 network confirmations.'
    },
    {
      id: 'crypto-USDT',
      label: 'Tether (USDT TRC20 / ERC20) Settlement (10% Discount Applied)',
      opening: 'Your 10% crypto discount has been applied. Total settlement amount is {amount}. Please transfer to our designated Tether wallet below:',
      closing: 'Please ensure you select the matching network (TRC20 or ERC20) when sending USDT.'
    }
  ],
}

export const CHAT = {
  channels: [
    { type: 'whatsapp', value: '+61480811308', label: 'WhatsApp Dispatch & Sales' },
    { type: 'phone', value: '+61480811308', label: 'Call 0480 811 308' },
    { type: 'email', value: 'sales&#64;thebuggyshop.com.au', label: 'Email Order Desk' }
  ]
}

export const BRAND = {
  foundingYear: '2004',
  foundingLocation: 'Queensland, Australia',
  description: 'Established in Queensland in 2004, The Buggy Shop is Australia\'s foremost destination for brand-new and certified used golf buggies for sale, remote control golf buggies, push golf buggies, off road buggies, and golf buggy accessories with nationwide hydraulic tail-lift delivery.',
  milestones: [
    { year: '2004', event: 'Founded in Queensland specializing in custom golf buggy sales, golf trolleys, and all-terrain property utility carts.' },
    { year: '2011', event: 'Launched luxury resort and country club golf buggy fleet solutions with whisper-quiet electric powertrains and custom seating.' },
    { year: '2014', event: 'Surpassed 1,000 verified Australian customer deliveries, beginning our long-standing verified customer satisfaction tracking programme (now 6,300+ reviews strong).' },
    { year: '2017', event: 'Introduced turnkey conditional road-registration lighting and safety packages for QLD Transport, TfNSW, and VicRoads.' },
    { year: '2021', event: 'Standardised 72V and 48V automotive-grade LiFePO4 lithium batteries with 5-year domestic replacement warranties across all buggy sales.' },
    { year: '2024', event: 'Expanded dedicated motorized remote control golf buggy, golf push buggy, and off road buggies for sale with Australia-wide delivery.' }
  ],
  differentiation: [
    'Over 6,300+ verified customer reviews collected since 2014 with a 4.9/5.0 average satisfaction rating from Australian golfers, farmers, and fleet managers.',
    'Australia-wide flat-rate hydraulic tail-lift delivery directly to your home, golf clubhouse, or rural property gate with zero hidden fees.',
    'Every golf buggy for sale is delivered 95%+ pre-assembled — pre-tested, battery-conditioned, and drive-away ready.',
    'Extensive selection: New & used golf buggies for sale, 4x4 off road buggies, remote control golf trolleys, push buggies with seat, and MGI compatible accessories.',
    'Over 20 years of Australian cart sales and service heritage (Est. 2004) with certified technicians and Queensland spare parts inventory.',
    'Turnkey conditional road compliance lighting, seatbelts, dual mirrors, horn, and pre-completed state registration paperwork included.',
    '5-Year LiFePO4 lithium battery guarantee with Australian service backup and rapid spare parts dispatch.',
    '10% Instant crypto discount for Bitcoin (BTC) and Tether (USDT) payments, alongside standard Australian PayID and direct bank wire transfers.'
  ],
  sameAs: [],
  awards: [],
}
