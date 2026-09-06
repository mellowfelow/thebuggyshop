// src/config/site.js
// Single Source of Truth for The Buggy Shop (WebForge v9.1)

export const SITE = {
  name: 'The Buggy Shop',
  legalName: 'TBS NO.2 PTY LTD',
  entityName: 'TBS NO.2 PTY LTD',
  abn: '65 108 218 471',
  abnLookupUrl: 'https://abr.business.gov.au/ABN/View?id=65108218471',
  tagline: 'Australia\'s Premier Golf Buggy for Sale & Luxury All-Terrain Cart Specialists',
  domain: 'DOMAIN.com',           // Single source of truth (pending domain)
  locale: 'en-AU',                // Australian English BCP-47
  currency: 'AUD',
  target: 'vercel',
  primaryColor: '#0E2A1E',        // Deep Heritage Racing Forest Green
  secondaryColor: '#163E2D',      // Rich Hunter Forest
  goldColor: '#C5A265',           // Warm Champagne Brass / Antique Gold
  lightGold: '#F5EFE4',           // Soft Champagne Tint
  darkText: '#111C16',            // Deep Forest Charcoal
  bgLight: '#F8F8F5',             // Crisp Porcelain Linen
  gscVerification: 'pending',
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
  email: 'sales@thebuggyshop.com.au', // entity encoded where displayed
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
  minOrder: 0,
  freeShippingThreshold: 0,
  shippingFee: 495, // Flat-rate hydraulic tail-lift delivery to property gates nationwide
  cryptoDiscount: 10, // 10% discount for BTC / USDT payments
  paymentMethods: ['bank-transfer', 'pay-id', 'crypto-BTC', 'crypto-USDT'],
  gstIncluded: true,
  taxRate: 0.10, // 10% Australian GST included in pricing
}

export const FORMS = {
  provider: 'web3forms',
  web3formsKey: 'YOUR_WEB3FORMS_ACCESS_KEY',
  resendFrom: '',
  turnstileSiteKey: '',
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
    { year: '2017', event: 'Introduced turnkey conditional road-registration lighting and safety packages for QLD Transport, TfNSW, and VicRoads.' },
    { year: '2021', event: 'Standardised 72V and 48V automotive-grade LiFePO4 lithium batteries with 5-year transferable warranties across all buggy sales.' },
    { year: '2024', event: 'Expanded dedicated motorized remote control golf buggy, golf push buggy, and off road buggies for sale with Australia-wide delivery.' }
  ],
  differentiation: [
    'Australia-wide flat-rate hydraulic tail-lift delivery directly to your home, golf clubhouse, or rural property gate with zero hidden fees.',
    'Every golf buggy for sale is delivered 95%+ pre-assembled — pre-tested, battery-conditioned, and drive-away ready.',
    'Extensive selection: New & used golf buggies for sale, 4x4 off road buggies, remote control golf trolleys, push buggies with seat, and MGI compatible accessories.',
    'Over 20 years of Australian cart sales and service heritage (Est. 2004) with certified technicians and Queensland spare parts inventory.',
    'Turnkey conditional road compliance lighting, seatbelts, dual mirrors, horn, and pre-completed state registration paperwork included.',
    '5-Year LiFePO4 lithium battery guarantee with Australian service backup and rapid spare parts dispatch.',
    '10% Instant crypto discount for Bitcoin (BTC) and Tether (USDT), alongside instant Australian PayID and bank transfers.'
  ],
  sameAs: [],
  awards: [],
}

export const CATEGORIES = [
  {
    slug: 'luxury-golf-buggies',
    name: 'Luxury Golf Buggies & Resort Carts',
    description: 'Premium 2-seat, 4-seat, and 6-seat electric golf buggies for sale with luxury contoured seating, whisper-quiet lithium power, and road compliance options.',
    heroImage: 'https://images.unsplash.com/photo-1594495894542-a46cc73e081a?auto=format&fit=crop&w=1200&q=80',
    itemCount: 3
  },
  {
    slug: 'off-road-buggies',
    name: 'Off Road Buggies & Farm Utility',
    description: 'Heavy-duty 4x4 off road buggies for sale with hydraulic tipping beds, high-clearance suspension, tow hitches, and all-terrain puncture-resistant tyres.',
    heroImage: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80',
    itemCount: 3
  },
  {
    slug: 'remote-push-golf-buggies',
    name: 'Remote Control & Push Golf Buggies',
    description: 'Motorized remote control golf buggies, motorized golf trolleys with seat, and lightweight 3-wheel push golf buggies for effortless fairway walking.',
    heroImage: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=1200&q=80',
    itemCount: 2
  },
  {
    slug: 'used-golf-buggies',
    name: 'Used Golf Buggies for Sale',
    description: 'Certified pre-owned and workshop-inspected used golf buggies for sale with fresh lithium battery upgrades and comprehensive Australian warranties.',
    heroImage: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80',
    itemCount: 2
  },
  {
    slug: 'golf-buggy-accessories',
    name: 'Golf Buggy Accessories & Parts',
    description: 'Universal and MGI golf buggy compatible accessories, weather enclosures, seat kits, sand bottle holders, lithium upgrade packs, and solar roof kits.',
    heroImage: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=1200&q=80',
    itemCount: 2
  }
]

export const PRODUCTS = [
  {
    slug: 'grand-tourer-4-seat-luxury-golf-buggy',
    name: 'The Grand Tourer 4-Seat Luxury Golf Buggy',
    price: 18990,
    category: 'luxury-golf-buggies',
    badge: 'Best Seller',
    featured: true,
    seats: '4 Seats (4-Passenger)',
    rating: 4.9,
    reviewCount: 48,
    shortDescription: 'Premium 4-passenger golf buggy for sale with diamond-stitched luxury seats, 72V 150Ah LiFePO4 battery, 95km range, and turnkey conditional road compliance.',
    description: 'The Grand Tourer 4-Seat is Australia\'s premier luxury golf buggy for sale, designed for championship golf courses, gated resort communities, and private acreage estates. Powered by a high-efficiency 72V 5kW brushless AC motor and automotive-grade 150Ah LiFePO4 lithium battery delivering up to 95km per charge. Features luxury marine-grade UV-resistant contoured seating with seatbelts, Bluetooth soundbar, DOT tinted split windscreen, 4-wheel hydraulic disc brakes, and turnkey road-ready LED lighting.',
    specs: {
      motor: '5.0 kW High-Torque Brushless AC Motor',
      battery: '72V 150Ah LiFePO4 Lithium Battery (5-Year Warranty)',
      range: 'Up to 95 km per charge',
      topSpeed: '40 km/h (programmable governor)',
      chargingTime: '5-6 Hours with onboard smart charger (Standard 10A 240V Aussie Wall Plug)',
      seating: '4 Passengers (Luxury forward captain seats + rear flip-flop utility seat)',
      suspension: 'Independent Double A-Arm Front with Nitrogen Coil-Over Shocks',
      brakes: '4-Wheel Hydraulic Disc Brakes + Auto Electromagnetic Parking Brake',
      groundClearance: '210 mm',
      payloadCapacity: '480 kg',
      roadCompliance: 'Turnkey QLD/NSW/VIC conditional road compliance kit included',
      lighting: 'Automotive LED High/Low Beam, Daytime Halo, Turn Signals, Brake Lights, Horn',
      warranty: '5-Year LiFePO4 Battery + 3-Year Chassis & Powertrain Warranty'
    },
    images: [
      'https://images.unsplash.com/photo-1594495894542-a46cc73e081a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    slug: 'sundowner-2-seat-golf-buggy-with-seat',
    name: 'Sundowner 2-Seat Golf Buggy with Seat & Club Carrier',
    price: 13950,
    category: 'luxury-golf-buggies',
    badge: 'Clubhouse Favourite',
    featured: true,
    seats: '2 Seats (2-Passenger)',
    rating: 4.8,
    reviewCount: 36,
    shortDescription: 'Agile 2-seater golf buggy with seat, dual golf bag attachments, cooler box, sand bottles, and 48V 105Ah lithium battery for 36+ holes daily.',
    description: 'The classic Australian golfer\'s dream cart. The Sundowner 2-Seat golf buggy with seat features dual golf bag brackets, integrated ball and tee holders, side cooler box, dual sand divot bottles, and whisper-quiet 48V AC power. With an ultra-tight turning radius and turf-friendly low-pressure radial tyres, it preserves pristine fairway greens while delivering seamless, effortless riding comfort.',
    specs: {
      motor: '48V 4.0 kW AC Brushless Motor',
      battery: '48V 105Ah LiFePO4 Lithium Battery (3,500+ cycles)',
      range: 'Up to 75 km (easily covers 54 holes)',
      topSpeed: '32 km/h (speed-limiter adjustable for golf course rules)',
      chargingTime: '4.5 Hours on standard 240V GPO',
      seating: '2 Passengers in Ergonomic Contour High-Back Bench with Seatbelts',
      suspension: 'Independent Front Suspension with Dual Coil Springs & Rear Dampers',
      brakes: 'Rear Mechanical Drum + Front Disc Brakes with Automatic Park Lock',
      groundClearance: '175 mm',
      payloadCapacity: '360 kg',
      roadCompliance: 'Golf course & private resort compliance kit pre-fitted',
      lighting: 'LED Headlights, Rear Lights, and Daytime Position Markers',
      warranty: '5-Year LiFePO4 Battery + 2-Year Full Machine Warranty'
    },
    images: [
      'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1594495894542-a46cc73e081a?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    slug: 'pinnacle-6-seat-vip-resort-golf-buggy',
    name: 'Pinnacle 6-Seat VIP Resort & Estate Golf Buggy',
    price: 24800,
    category: 'luxury-golf-buggies',
    badge: 'VIP Fleet',
    featured: true,
    seats: '6 Seats (3 Rows)',
    rating: 5.0,
    reviewCount: 31,
    shortDescription: 'Extended wheelbase 6-passenger luxury golf buggy for sale with quilted leather-style seating, roof luggage rack, and extended 105km range.',
    description: 'Engineered for luxury resort transfers, winery tours, and VIP golf clubhouse hospitality. The Pinnacle 6-Seat VIP golf buggy provides three rows of spacious, deeply padded seating with individual USB fast-charging ports, overhead stereo system with Apple CarPlay, extended all-weather canvas enclosure, and a heavy-duty 72V 200Ah LiFePO4 lithium battery pack.',
    specs: {
      motor: '72V 7.0 kW AC High-Output Whisper Motor',
      battery: '72V 200Ah Ultra-Capacity LiFePO4 Battery Pack',
      range: 'Up to 105 km per charge with full passenger load',
      topSpeed: '38 km/h (speed limited for passenger safety)',
      chargingTime: '7 Hours with High-Efficiency Delta-Q Smart Charger',
      seating: '6 Adult Passengers (4 forward-facing, 2 rear-facing)',
      suspension: 'Reinforced Long-Wheelbase Double Wishbone Suspension',
      brakes: '4-Wheel Vacuum-Assisted Hydraulic Disc Brakes',
      groundClearance: '195 mm',
      payloadCapacity: '620 kg',
      roadCompliance: 'Fully compliant with QLD / NSW / VIC Low-Speed Vehicle requirements',
      lighting: 'Full LED projector headlights, perimeter step lights, roof lights',
      warranty: '5-Year Transferable Lithium Warranty + 3-Year Fleet Guarantee'
    },
    images: [
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1594495894542-a46cc73e081a?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    slug: 'outback-boss-4x4-off-road-buggy-for-sale',
    name: 'Outback Boss 4x4 Heavy Duty Off Road Buggy for Sale',
    price: 22450,
    category: 'off-road-buggies',
    badge: 'Off Road 4x4',
    featured: true,
    seats: '2 Seats (Workforce UTV)',
    rating: 5.0,
    reviewCount: 44,
    shortDescription: 'Dual-motor 4x4 off road buggies for sale featuring electro-hydraulic tipping tray, 650kg payload, 3,500lb winch, and 25" all-terrain tyres.',
    description: 'The ultimate Australian electric workhorse. The Outback Boss is one of our top-selling off road buggies for sale, purpose-built for rugged regional properties, steep rural hills, cattle stations, and heavy agricultural hauling. Twin synchronous AC motors generate instant all-wheel drive torque without smelly exhaust or expensive diesel maintenance. Standard with hydraulic dump bed, heavy 50mm tow hitch, and 3,500lb recovery winch.',
    specs: {
      motor: 'Dual 4.5kW AC Synchronous Motors (Total 9kW Peak AWD)',
      battery: '72V 160Ah High-Density LiFePO4 with Thermal Balancing',
      range: 'Up to 85 km on heavy paddock & trail terrain',
      topSpeed: '45 km/h with High/Low torque transfer switch',
      chargingTime: '6 Hours via standard 240V Aussie Wall Outlet',
      seating: '2 Passengers in Heavy-Duty Waterproof Bucket Seats',
      suspension: 'Heavy-Duty MacPherson Strut Front & Leaf Spring Heavy Axle Rear',
      brakes: 'Heavy-Duty 4-Wheel Hydraulic Disc Brakes with Hill Descent Control',
      groundClearance: '280 mm with Underbody Heavy Steel Skid Plates',
      payloadCapacity: '650 kg total payload (450 kg tipping cargo tray)',
      towingCapacity: '900 kg rated 50mm tow ball receiver',
      roadCompliance: 'Amber strobe beacon, road indicator kit & mirrors fitted',
      warranty: '5-Year LiFePO4 Battery + 3-Year Commercial Farm Chassis Warranty'
    },
    images: [
      'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    slug: 'dunemaster-4x4-stealth-hunting-off-road-buggy',
    name: 'DuneMaster 4x4 Stealth Hunting & Off Road Buggy',
    price: 21900,
    category: 'off-road-buggies',
    badge: 'Stealth 4x4',
    featured: false,
    seats: '2 or 4 Seats (Convertible)',
    rating: 4.9,
    reviewCount: 27,
    shortDescription: 'Whisper-quiet electric off road buggies for sale with 300mm portal ground clearance, 28" Maxxis tyres, roof safari rack, and stealth lighting.',
    description: 'Engineered for silent bush traversal, wildlife surveying, hunting, and extreme off-road terrain. The DuneMaster pairs high-clearance suspension with a silent magnetic motor, allowing you to glide undetected through bushland and scrub without engine noise or heat signatures. Equipped with front/rear heavy brush guards, 50,000 lumen curved LED lightbars, and IP67 waterproof lithium battery enclosure.',
    specs: {
      motor: '72V 6.5 kW Peak High-Torque Silent Magnetic AC Motor',
      battery: '72V 160Ah IP67 Submersible Waterproof LiFePO4 Pack',
      range: 'Up to 88 km on rugged bush tracks',
      topSpeed: '42 km/h with Crawl/Trail/Sport drive modes',
      chargingTime: '5.5 Hours with Weatherproof Smart Charger',
      seating: '2 or 4 Convertible Quick-Release Camo Seats',
      suspension: 'Fox-Style Adjustable Gas Shocks with 12" Long Travel',
      brakes: '4-Wheel Oversized Hydraulic Ventilated Disc Brakes',
      groundClearance: '300 mm with Aluminium Sump and A-Arm Skid Plates',
      payloadCapacity: '500 kg',
      roadCompliance: 'NSW / QLD Conditional Bush & Secondary Road Ready',
      lighting: 'Twin 40" Curved LED Roof Lightbars + Stealth Low Light Mode',
      warranty: '5-Year Lithium Guarantee + 3-Year Extreme Terrain Warranty'
    },
    images: [
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    slug: 'stockman-1-tonne-hydraulic-tipper-buggy',
    name: 'Stockman 1-Tonne Electric Hydraulic Tipper Buggy',
    price: 19650,
    category: 'off-road-buggies',
    badge: '1000kg Payload',
    featured: false,
    seats: '2 Seats (Heavy Industrial)',
    rating: 4.9,
    reviewCount: 22,
    shortDescription: 'Industrial heavy-payload electric buggies for sale with 1,000kg certified capacity, 3-way drop-side steel bed, and regenerative downhill retarder.',
    description: 'Built for commercial nurseries, golf course superintendents, equine centres, and council grounds maintenance. The Stockman delivers immense low-end drawbar torque with an automotive direct-drive differential, regenerative braking for safe downhill load management, and an electric-hydraulic 3-way drop-side steel tipping tray with push-button remote.',
    specs: {
      motor: '72V 7.5 kW Heavy Industrial AC Motor with Reduction Gearbox',
      battery: '72V 180Ah Heavy-Duty High-Discharge LiFePO4 Pack',
      range: 'Up to 75 km with continuous stop-start heavy hauling',
      topSpeed: '30 km/h (optimised for maximum drawbar torque)',
      chargingTime: '6.5 Hours via 240V AC 10A / 15A socket',
      seating: '2 Heavy Industrial Vinyl Seats with Retractable Seatbelts',
      suspension: 'Multi-Leaf Heavy-Duty Steel Springs Front & Rear',
      brakes: 'Hydraulic Drum/Disc Dual Circuit with Electric Retarder Braking',
      groundClearance: '200 mm',
      payloadCapacity: '1,000 kg (1 Tonne certified)',
      towingCapacity: '1,200 kg braked trailer rating',
      roadCompliance: 'Pre-fitted with flashing amber beacon, reversing buzzer, lighting',
      warranty: '5-Year LiFePO4 Battery + 3-Year Industrial Chassis Warranty'
    },
    images: [
      'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    slug: 'titan-caddy-pro-remote-control-golf-buggy',
    name: 'Titan Caddy Pro Remote Control Golf Buggy (MGI Compatible)',
    price: 2490,
    category: 'remote-push-golf-buggies',
    badge: 'Remote Control',
    featured: true,
    seats: '1 Seat (Padded Caddy Seat)',
    rating: 4.9,
    reviewCount: 52,
    shortDescription: 'All-directional remote control golf buggy with dual 230W motors, gyroscope straight-line tracking, downhill speed control, and padded seat.',
    description: 'Walk the course like a tour pro without pushing or carrying. The Titan Caddy Pro is Australia\'s leading remote control golf buggy, featuring 100m directional remote control, smart downhill speed control (electronic braking), 360-degree swivelling all-terrain front wheels, and automatic electronic anti-tip rear stabilizers. Compatible with standard MGI golf buggy accessories and umbrella holders. Comes complete with integrated padded storage seat, score card holder, and 24V 380Wh lithium battery providing 36 holes on a single charge.',
    specs: {
      motor: 'Dual 230W Calibrated Low-Noise Tubular Motors (460W Total)',
      battery: '24V 12.8Ah (380Wh) Quick-Release Lithium Battery',
      range: 'Up to 36 holes on hilly championship courses',
      seating: '1 Integrated Padded Storage Seat Included',
      controlSystem: 'Fully directional remote (Forward, Reverse, Left, Right) + Handle controls',
      gyroscope: 'Smart automatic gyroscope straight-line tracking on sloping fairways',
      brakes: 'Electronic Downhill Speed Control & Automatic Park Lock',
      weight: '11.5 kg (Chassis) + 2.1 kg (Battery)',
      foldedDimensions: '82 cm x 58 cm x 36 cm (Fits in compact boot)',
      accessoriesIncluded: 'Padded golf buggy with seat, umbrella holder, drink holder, GPS bracket',
      warranty: '3-Year Full Australian Replacement Warranty'
    },
    images: [
      'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    slug: 'apex-tour-3-wheel-golf-push-buggy-with-seat',
    name: 'Apex Tour 3-Wheel Golf Push Buggy with Seat',
    price: 495,
    category: 'remote-push-golf-buggies',
    badge: 'Best Value Push',
    featured: false,
    seats: '1 Seat (Spring Padded Seat)',
    rating: 4.8,
    reviewCount: 64,
    shortDescription: 'Ultra-lightweight aircraft aluminium push golf buggy with seat, 1-click fold system, foot brake, umbrella mount, and insulated cooler pouch.',
    description: 'The premier push golf buggy for Australian golfers seeking effortless glide and ergonomic durability. Built with an ultra-lightweight aircraft-grade aluminium frame that folds down in a single fluid motion. Features large maintenance-free ball-bearing wheels, convenient spring-assisted padded seat with internal storage compartment, umbrella holder, scorecard console, and insulated drink cooler pouch.',
    specs: {
      frame: 'Hydroformed Aircraft-Grade Aluminium with Anodized Finish',
      foldingSystem: '1-Click Compact Quick-Fold Mechanism',
      wheels: 'High-Impact Maintenance-Free Ball Bearing Wheels with All-Weather Tread',
      seat: 'Spring-loaded padded golf buggy with seat & storage compartment',
      seating: '1 Spring-Loaded Padded Seat with Storage',
      brakes: 'Dual Foot-Activated Ergonomic Parking Brake',
      weight: '6.8 kg total chassis weight',
      foldedDimensions: '68 cm x 42 cm x 35 cm',
      accessoriesIncluded: 'Padded seat, umbrella holder, scorecard holder, tee holder, cooler bag',
      warranty: '2-Year Australian Replacement Warranty'
    },
    images: [
      'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    slug: 'club-car-tempo-48v-certified-used-golf-buggy-for-sale',
    name: 'Club Car Tempo 48V Certified Used Golf Buggy for Sale',
    price: 8990,
    category: 'used-golf-buggies',
    badge: 'Certified Pre-Owned',
    featured: true,
    seats: '2 Seats (2-Passenger)',
    rating: 4.9,
    reviewCount: 28,
    shortDescription: 'Fully refurbished used golf buggy for sale with brand-new 48V 105Ah LiFePO4 lithium conversion, new tyres, split windscreen, and 2-year warranty.',
    description: 'Looking for a reliable used golf buggy for sale in Australia? Our certified pre-owned Club Car Tempo buggies undergo an exhaustive 45-point workshop inspection in Queensland. Upgraded with a brand-new 48V 105Ah LiFePO4 lithium battery pack (saving 130kg over old lead-acid batteries), brand new high-grip turf tyres, refreshed premium upholstery, tinted fold-down windscreen, and onboard smart charger.',
    specs: {
      makeModel: 'Club Car Tempo 48V Electric (Certified Used Golf Buggy)',
      batteryUpgrade: 'Brand-New 48V 105Ah LiFePO4 Lithium Battery with Bluetooth App',
      range: 'Up to 70 km per charge (36+ holes easily)',
      condition: 'Grade A+ Certified Workshop Refurbished (45-Point Inspection Passed)',
      chassis: 'AlumiCore Rust-Proof Aircraft Aluminium Frame',
      seating: '2 Passengers in Re-trimmed Marine Vinyl Bench with Dual Bag Straps',
      accessoriesIncluded: 'Tinted split windscreen, dual sand bottles, esky cooler, battery charger',
      warranty: '2-Year Full Machine Warranty + 5-Year Battery Warranty'
    },
    images: [
      'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1594495894542-a46cc73e081a?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    slug: 'yamaha-drive2-lithium-used-golf-buggy-for-sale',
    name: 'Yamaha Drive2 LiFePO4 Pre-Owned Golf Buggy for Sale',
    price: 9450,
    category: 'used-golf-buggies',
    badge: 'Pre-Owned Deal',
    featured: false,
    seats: '2 Seats (2-Passenger)',
    rating: 4.8,
    reviewCount: 21,
    shortDescription: 'Immaculate used golf buggy for sale with independent front suspension, new RoyPow lithium battery, rear bag cover, and fast tail-lift delivery.',
    description: 'Exceptional value in the used golf buggy sales market. This immaculate pre-owned Yamaha Drive2 features Yamaha\'s legendary independent front suspension for the smoothest ride on the fairways. Fully retrofitted by our Queensland technicians with a brand-new high-output LiFePO4 battery, automotive LED lighting kit, rear club protector rain hood, and custom black alloy wheels.',
    specs: {
      makeModel: 'Yamaha Drive2 AC Electric (Pre-Owned)',
      batteryUpgrade: 'Brand-New 48V 105Ah LiFePO4 Lithium Battery Pack',
      range: 'Up to 75 km per charge',
      suspension: 'Yamaha Tru-Trak II Fully Independent Automotive Front Struts',
      seating: '2 Passengers with Extra Deep Contoured Foam Cushions',
      accessoriesIncluded: 'Club protector rain hood, sand bottles, scorecard clip, charger',
      warranty: '2-Year Workshop Mechanical Warranty + 5-Year Battery Guarantee'
    },
    images: [
      'https://images.unsplash.com/photo-1594495894542-a46cc73e081a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    slug: 'deluxe-all-weather-golf-buggy-enclosure-cover',
    name: 'Deluxe All-Weather Golf Buggy Enclosure & Rain Cover',
    price: 380,
    category: 'golf-buggy-accessories',
    badge: 'Essential Accessory',
    featured: false,
    seats: 'Fits 2 or 4 Seats',
    rating: 4.9,
    reviewCount: 78,
    shortDescription: 'Heavy-duty 600D marine canvas 4-sided golf buggy weather enclosure with roll-up doors, crystal-clear UV windows, and universal 2/4-seat fit.',
    description: 'Keep dry and comfortable in all Australian seasons with our deluxe golf buggy accessories range. Fits most 2-seat and 4-seat golf buggies including Club Car, EZGO, Yamaha, and The Buggy Shop models. Made from heavy-duty 600D water-repellent polyester with reinforced heavy-duty zippers, clear roll-up side doors, and rear club access flap.',
    specs: {
      material: '600D Marine Grade Solution-Dyed Polyester with UV50+ Protection',
      windows: 'Ultra-Clear Marine Grade Scratch-Resistant PVC Windows',
      compatibility: 'Fits universal 2-passenger and 4-passenger golf buggies with standard roofs',
      seating: 'Universal Fit for 2-Seat & 4-Seat Golf Carts',
      features: 'Roll-up zippered doors, rear bag opening, elastic hem cords with J-hooks',
      warranty: '2-Year Australian Replacement Warranty'
    },
    images: [
      'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1594495894542-a46cc73e081a?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    slug: 'universal-mgi-compatible-accessory-bundle',
    name: 'Universal MGI Golf Buggy Compatible Accessory Bundle',
    price: 195,
    category: 'golf-buggy-accessories',
    badge: 'MGI Compatible',
    featured: false,
    seats: 'Universal Trolley Fit',
    rating: 4.8,
    reviewCount: 45,
    shortDescription: 'Complete 4-piece golf trolley accessory pack: adjustable umbrella holder, GPS phone cradle, drinks holder, and sand bottle kit (fits MGI & Titan).',
    description: 'Premium golf buggy accessories pack engineered to fit MGI golf buggy models (Zip, Navigator, Quad series) as well as Titan and standard motorised golf trolleys. Includes an extra-tall dual-pivot umbrella holder, heavy-duty phone/GPS mount with silicone grip, insulated beverage holder, and quick-mount sand divot bucket.',
    specs: {
      bundleContents: 'Umbrella Holder, GPS/Phone Clamp, Insulated Drink Bottle Cage, Sand Bottle Kit',
      compatibility: 'Fits all 25mm to 32mm round tube frames including MGI Zip, Navigator, Titan Caddy',
      seating: 'Universal MGI & Push Buggy Compatibility',
      installation: 'Tool-free quick-release thumb screw clamps',
      warranty: '2-Year Australian Replacement Warranty'
    },
    images: [
      'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=1200&q=80'
    ]
  }
]

export const POSTS = [
  {
    slug: 'golf-buggy-for-sale-buyers-guide-australia',
    title: 'Golf Buggy for Sale: The Complete Australian Buyer\'s Guide (New vs Used, Lithium & 4x4)',
    excerpt: 'Everything you need to know before buying a golf buggy for sale in Australia: motor kilowatt specs, LiFePO4 battery life, conditional road registration, and key accessories.',
    category: 'Buying Guides',
    date: '2026-02-28',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1594495894542-a46cc73e081a?auto=format&fit=crop&w=1200&q=80',
    content: `Looking for a **golf buggy for sale** in Australia? Whether you need a 2-seat luxury golf cart with a seat for weekend rounds at your local country club, an extended 4-seat or 6-seat estate cruiser, or a heavy-duty 4x4 off road buggy for regional property management, choosing the right model makes all the difference.

In this comprehensive Australian buyer's guide, our Queensland workshop technicians break down the most vital considerations when navigating golf buggy sales:

### 1. New vs Used Golf Buggy for Sale: What Offers Better Value?
- **New Golf Buggies:** Offer the latest 72V high-efficiency brushless AC motors, factory 5-year LiFePO4 lithium warranties, Bluetooth sound systems, and pre-fitted road compliance lights for state conditional registration.
- **Used Golf Buggy for Sale:** A certified pre-owned cart (such as a re-conditioned Club Car Tempo or Yamaha Drive2) retrofitted with a brand-new lithium battery pack can save you thousands while delivering 10+ years of dependable fairway performance.

### 2. Remote Control Golf Buggy vs Push Golf Buggy
If you love walking the course without carrying a heavy bag, motorized **remote control golf buggies** (such as the Titan Caddy Pro with gyroscope straight-line tracking) and lightweight **push golf buggies with seat** provide effortless maneuverability across all 18 holes. Look for models compatible with **MGI golf buggy** accessories and umbrella holders.

### 3. Off Road Buggies for Sale vs Standard Golf Carts
For steep acreage, cattle properties, and hobby farms, standard turf carts lack ground clearance and low-end torque. Our **off road buggies for sale** feature dual 4x4 motors, 280mm+ ground clearance, hydraulic tipping dump trays, and 3,500lb winches.

### 4. Nationwide Delivery
At The Buggy Shop, every golf buggy for sale is shipped via flat-rate hydraulic tail-lift delivery directly to your property gate, ready to drive away.`
  },
  {
    slug: 'conditional-road-registration-guide-qld-nsw-vic',
    title: 'Conditional Road Registration for Golf Buggies in QLD, NSW & VIC: The Complete 2026 Guide',
    excerpt: 'How to legally drive your golf buggy between properties, cross roads, and access golf communities with turnkey state-approved lighting and permits.',
    category: 'Road Compliance & Law',
    date: '2026-02-15',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80',
    content: `For Australian golf community residents and acreage owners, having the freedom to drive your golf buggy between holes, cross local roads, or travel between non-contiguous property boundaries is essential.

At The Buggy Shop, all road-capable buggies for sale come pre-fitted with compliant LED turn signals, horn, dual rear-view mirrors, hazard lights, and pre-filled conditional registration paperwork for QLD TMR, Transport for NSW, and VicRoads.`
  },
  {
    slug: 'lifepo4-vs-lead-acid-battery-lifespan-australian-climate',
    title: 'LiFePO4 Lithium vs Lead-Acid in Australian Extreme Heat: Why Lithium Wins Every Time',
    excerpt: 'Why traditional lead-acid and AGM batteries fail prematurely in 40°C+ Australian outback heat, and how 72V LiFePO4 chemistry delivers 3,500+ charge cycles.',
    category: 'Engineering & Tech',
    date: '2026-01-20',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80',
    content: `Australian summers place extraordinary demands on golf buggy batteries. Ambient temperatures in regional Queensland, inland NSW, and rural Victoria routinely exceed 38°C, which rapidly degrades conventional lead-acid batteries.

### Why LiFePO4 Lithium Is Superior for Golf Buggies:
1. **3,500+ Deep Discharge Cycles:** Easily lasts 10 to 12+ years of daily golf and estate use.
2. **70% Weight Reduction:** Saves 130kg to 180kg over lead-acid, preserving turf quality and extending range by 40%.
3. **Zero Maintenance:** No water topping, zero terminal corrosion, and zero toxic fumes.`
  }
]

export const PAGES = {
  about: true,
  faq: false,
  blog: true,
  wholesale: false,
  tracking: false,
  compare: true,
  finance: true,
  search: true,
}

export const COMPLIANCE = {
  bannedTerms: [],
  requiredFramings: [
    'All conditional road registrations are subject to local state transport authority guidelines (QLD TMR, TfNSW, VicRoads).',
    'Battery range estimates are based on level fairway testing; actual range varies with terrain gradient, payload, and speed.'
  ],
  prohibitedClaims: [
    'Buggies are not sold as highway-speed motor vehicles (ADR full passenger cars).',
    'Do not guarantee unconditional open highway access without designated local permits.'
  ],
  ageGate: false,
  ageMinimum: null,
  gdpr: false,
  disclaimer: 'The Buggy Shop vehicles and golf carts are engineered for golf courses, private acreage, commercial resorts, and conditionally approved public thoroughfares in accordance with Australian state transport regulations. Prices include 10% Australian GST.',
}
