// src/config/products.js
// Australian Golf Buggy Products Catalog (WebForge v9.1 AU)
// Adheres strictly to floor pricing: Electric >= $1,000 | Manual Push >= $450 | Kids >= $850 | Inc. GST | Australian English

export const PRODUCTS = [
  // ==========================================
  // 1. ELECTRIC GOLF BUGGIES - REMOTE CONTROL
  // ==========================================
  {
    slug: 'mgi-zip-navigator-at-remote-electric-golf-buggy',
    name: 'MGI Zip Navigator AT Remote Control Electric Golf Buggy',
    brand: 'mgi',
    brandName: 'MGI',
    category: 'remote-control-golf-buggies',
    categoryPath: '/remote-control-golf-buggies/',
    price: 1899,
    condition: 'New',
    badge: 'Australia #1 Remote',
    featured: true,
    rating: 4.9,
    reviewCount: 52,
    power: 'Remote control',
    wheels: '4-wheel',
    batteryRange: '36 hole',
    weightCategory: '10–13 kg',
    weightKg: 13.0,
    foldSize: 'Compact / flat-fold',
    seats: 'Walk-behind',
    primaryKeyword: 'mgi zip navigator at remote electric golf buggy',
    shortDescription: 'Australia\'s best-selling all-terrain remote control golf buggy with dual 230W motors, gyroscope straight-tracker, and 36-hole 24V lithium battery.',
    description: 'The MGI Zip Navigator AT (All-Terrain) is Australia\'s benchmark remote-control electric golf buggy. Engineered with dual 230-watt calibrated motors and patented Patented Gyroscope Straight Tracker technology that automatically corrects alignment across steep Australian side-slopes. Features a directional remote handset with forward, reverse, left, right and speed control, all-terrain rear tread tyres, foldable 4th rear stabiliser wheel, and a Click & Go 24V 380Wh lithium battery delivering 36+ holes per charge.',
    specs: {
      power: 'Remote control (Full Directional Wireless Handset)',
      motor: 'Twin 230W Calibrated Low-Noise Motors',
      battery: '24V 380Wh Click & Go Lithium (36+ Hole Capacity)',
      weight: '13.0 kg (Without Battery) / 15.8 kg (With Battery)',
      wheels: '4-Wheel All-Terrain with Foldable Rear Stabiliser',
      foldSize: '70cm x 47cm x 42cm (Inverted Rear Wheels)',
      brakes: 'Downhill Speed Control & Electronic Park Brake',
      warranty: '3-Year Australian Manufacturer Warranty'
    },
    images: [
      'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1593111774642-a1548e64c5d5?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    slug: 'motocaddy-m7-gps-remote-electric-golf-buggy',
    name: 'Motocaddy M7 GPS Remote Electric Golf Buggy',
    brand: 'motocaddy',
    brandName: 'Motocaddy',
    category: 'remote-control-golf-buggies',
    categoryPath: '/remote-control-golf-buggies/',
    price: 2499,
    condition: 'New',
    badge: 'Touchscreen GPS',
    featured: true,
    rating: 4.9,
    reviewCount: 38,
    power: 'Remote control',
    wheels: '4-wheel',
    batteryRange: '36 hole',
    weightCategory: '10–13 kg',
    weightKg: 14.4,
    foldSize: 'Compact / flat-fold',
    seats: 'Walk-behind',
    primaryKeyword: 'motocaddy m7 gps remote golf buggy',
    shortDescription: 'World\'s first remote-control electric golf buggy with integrated 3.5" high-resolution touchscreen GPS and active downhill braking control.',
    description: 'The Motocaddy M7 GPS Remote combines ultra-responsive wireless remote navigation with a high-definition 3.5-inch LCD touchscreen GPS preloaded with 40,000+ courses worldwide (including all Australian courses with zero subscription fees). Features dual 230W 28.8V brushless motors, anti-glare sunlight readable display, dynamic green view with pin repositioning, Downhill Control (DHC), and an ultra-compact boot-friendly fold.',
    specs: {
      power: 'Remote control & On-Handle Speed Dial',
      gps: '3.5" Colour LCD Touchscreen (40,000+ Courses Preloaded)',
      motor: 'Dual 230W 28.8V Brushless Motors',
      battery: 'High-Capacity 28.8V Super-Light Lithium (36 Holes)',
      weight: '14.4 kg (Without Battery)',
      wheels: '4-Wheel All-Terrain with Anti-Tip Wheel',
      foldSize: '65cm x 47cm x 42cm (Ultra-Compact M-Series Fold)',
      warranty: '2-Year Buggy + 5-Year Pro-Rata Lithium Warranty'
    },
    images: [
      'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    slug: 'mgi-ai-navigator-gps-follow-electric-golf-buggy',
    name: 'MGI Ai Navigator GPS Follow Electric Golf Buggy',
    brand: 'mgi',
    brandName: 'MGI',
    category: 'gps-follow-buggies',
    categoryPath: '/electric-golf-buggies/gps-follow/',
    price: 2899,
    condition: 'New',
    badge: 'Ai Smart Follow',
    featured: true,
    rating: 5.0,
    reviewCount: 29,
    power: 'Follow / GPS',
    wheels: '4-wheel',
    batteryRange: '36 hole',
    weightCategory: 'Over 13 kg',
    weightKg: 15.2,
    foldSize: 'Compact / flat-fold',
    seats: 'Walk-behind',
    primaryKeyword: 'mgi ai navigator gps follow golf buggy',
    shortDescription: 'Smart artificial intelligence follow buggy with 4-inch full-colour touchscreen GPS, auto-follow handset tracking and smartphone connectivity.',
    description: 'Experience hands-free fairway autonomy with the MGI Ai Navigator GPS. Equipped with ultra-wideband tracking sensors, the buggy follows smoothly behind you as you walk the fairway. The 4-inch high-resolution touchscreen provides accurate front, centre, and back green distances, hazard mapping, and live pin positioning. Dual 230W motors handle heavy bags and steep wet hills with complete stability.',
    specs: {
      power: 'Follow / GPS & Directional Remote & Manual Drive',
      screen: '4.0" All-Weather Colour Touchscreen GPS',
      motor: 'Twin 230W High-Torque Calibrated Motors',
      battery: '24V 380Wh Lithium Battery (36 Holes Guaranteed)',
      weight: '15.2 kg',
      connectivity: 'Bluetooth MGI App & Course Over-The-Air Updates',
      foldSize: '70cm x 47cm x 42cm',
      warranty: '3-Year Australian Full Warranty'
    },
    images: [
      'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=1200&q=80'
    ]
  },

  // ==========================================
  // 2. ELECTRIC GOLF BUGGIES - WALK-BEHIND
  // ==========================================
  {
    slug: 'mgi-zip-x1-electric-golf-buggy',
    name: 'MGI Zip X1 Walk-Behind Electric Golf Buggy',
    brand: 'mgi',
    brandName: 'MGI',
    category: 'electric-walk-behind',
    categoryPath: '/electric-golf-buggies/walk-behind/',
    price: 1199,
    condition: 'New',
    badge: 'Best Value Electric',
    featured: false,
    rating: 4.8,
    reviewCount: 64,
    power: 'Electric',
    wheels: '3-wheel',
    batteryRange: '27 hole',
    weightCategory: '10–13 kg',
    weightKg: 10.5,
    foldSize: 'Compact / flat-fold',
    seats: 'Walk-behind',
    primaryKeyword: 'mgi zip x1 electric golf buggy',
    shortDescription: 'Smooth whisper-quiet walk-behind electric buggy with digital 9-speed dial, fixed front wheel, and 24V 250Wh lithium battery pack.',
    description: 'The MGI Zip X1 is the best-value entry into Australian-engineered electric golf buggies. Lightweight and intuitive, it features a smooth variable speed dial, fixed front wheel for pinpoint tracking on flat to rolling fairways, and a single-action Zip fold system that fits in compact boots.',
    specs: {
      power: 'Walk-Behind Electric (Digital Speed Dial)',
      motor: '230W Single Whisper AC Motor with Whisper Gearbox',
      battery: '24V 250Wh Click & Go Lithium (27-36 Holes)',
      weight: '10.5 kg (Without Battery)',
      wheels: '3-Wheel with Quick-Release All-Terrain Tyres',
      foldSize: '70cm x 47cm x 42cm',
      warranty: '2-Year Australian Manufacturer Warranty'
    },
    images: [
      'https://images.unsplash.com/photo-1593111774642-a1548e64c5d5?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    slug: 'mgi-zip-x5-electric-golf-buggy-downhill-control',
    name: 'MGI Zip X5 Electric Golf Buggy with Downhill Speed Control',
    brand: 'mgi',
    brandName: 'MGI',
    category: 'electric-walk-behind',
    categoryPath: '/electric-golf-buggies/walk-behind/',
    price: 1549,
    condition: 'New',
    badge: 'Downhill Control',
    featured: false,
    rating: 4.9,
    reviewCount: 31,
    power: 'Electric',
    wheels: '3-wheel',
    batteryRange: '36 hole',
    weightCategory: '10–13 kg',
    weightKg: 11.2,
    foldSize: 'Compact / flat-fold',
    seats: 'Walk-behind',
    primaryKeyword: 'mgi zip x5 electric golf buggy',
    shortDescription: 'Electronic Downhill Speed Control (DHC) and electronic park brake for effortless walk-behind control on steep undulating golf courses.',
    description: 'Designed specifically for golfers who play hilly courses. The MGI Zip X5 features Controlled Downhill Speed Braking that maintains your set pace automatically on descents without touching the handle, plus an electronic park brake to stop securely on slopes at the push of a button.',
    specs: {
      power: 'Walk-Behind Electric with Electronic Braking',
      motor: '230W High-Torque Motor with Regenerative Braking',
      battery: '24V 380Wh Long-Range Lithium (36 Holes)',
      weight: '11.2 kg',
      wheels: '3-Wheel with Swivelling Front Wheel Lock',
      brakes: 'Downhill Speed Braking + Electronic Park Brake',
      warranty: '3-Year Australian Warranty'
    },
    images: [
      'https://images.unsplash.com/photo-1593111774642-a1548e64c5d5?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    slug: 'powakaddy-ct6-ultra-compact-electric-golf-buggy',
    name: 'PowaKaddy CT6 Ultra-Compact Electric Golf Buggy',
    brand: 'powakaddy',
    brandName: 'PowaKaddy',
    category: 'electric-walk-behind',
    categoryPath: '/electric-golf-buggies/walk-behind/',
    price: 1449,
    condition: 'New',
    badge: 'Ultra Compact',
    featured: false,
    rating: 4.8,
    reviewCount: 22,
    power: 'Electric',
    wheels: '3-wheel',
    batteryRange: '36 hole',
    weightCategory: 'Under 10 kg',
    weightKg: 9.9,
    foldSize: 'Compact / flat-fold',
    seats: 'Walk-behind',
    primaryKeyword: 'powakaddy ct6 electric golf buggy',
    shortDescription: 'Folds 35% smaller than competitor buggies with 2.8" full-colour widescreen display and 30V Max Plug \'n\' Play lithium battery.',
    description: 'The PowaKaddy CT6 is the world\'s smallest ultra-compact electric golf trolley. Features Simple-2-Fold technology, a vibrant 2.8-inch OCA full colour widescreen display, integrated USB charging port, and an ultra-thin 30V Plug \'n\' Play lithium battery.',
    specs: {
      power: 'Walk-Behind Electric (Speed Dial & Distance Function)',
      battery: '30V Max Ultra-Thin Plug \'n\' Play Lithium (36 Holes)',
      motor: '220W 30V Whisper Motor',
      weight: '9.9 kg (Lightest in class)',
      foldSize: '51cm x 42.5cm x 37.5cm (35% Smaller)',
      warranty: '2-Year Buggy + 5-Year Lithium Warranty'
    },
    images: [
      'https://images.unsplash.com/photo-1593111774642-a1548e64c5d5?auto=format&fit=crop&w=1200&q=80'
    ]
  },

  // ==========================================
  // 3. ELECTRIC CONVERSION KITS
  // ==========================================
  {
    slug: 'alphard-club-booster-v2-electric-buggy-conversion-kit',
    name: 'Alphard Club Booster V2 Electric Buggy Conversion Kit',
    brand: 'alphard',
    brandName: 'Alphard Golf',
    category: 'conversion-kits',
    categoryPath: '/electric-golf-buggies/conversion-kits/',
    price: 1299,
    condition: 'New',
    badge: 'Conversion Kit',
    featured: false,
    rating: 4.8,
    reviewCount: 45,
    power: 'Remote control',
    wheels: '2-wheel',
    batteryRange: '27 hole',
    weightCategory: '10–13 kg',
    weightKg: 10.8,
    foldSize: 'Compact / flat-fold',
    seats: 'Walk-behind',
    primaryKeyword: 'alphard club booster v2 conversion kit',
    shortDescription: 'Transform your existing Clicgear, Rovic, Big Max or Bag Boy push buggy into a dual-motor remote-control electric buggy in minutes.',
    description: 'Convert your favourite manual push buggy into a high-performance remote-controlled electric buggy. The Alphard Club Booster V2 replaces the rear axle of your buggy with dual brushless hub motors, an integrated lithium battery, automatic gyroscope hill compensation, and wireless remote handset.',
    specs: {
      compatibility: 'Clicgear (all models), Rovic, Big Max, Bag Boy, Sun Mountain',
      power: 'Remote Control Dual Brushless Hub Motors',
      battery: '36V 5200mAh Lithium-Ion Quick-Swap Pack (27 Holes)',
      features: 'Electronic Parking Brake, Cruise Control, Free-Wheel Mode',
      warranty: '2-Year Australian Manufacturer Warranty'
    },
    images: [
      'https://images.unsplash.com/photo-1592919505780-303950717480?auto=format&fit=crop&w=1200&q=80'
    ]
  },

  // ==========================================
  // 4. PUSH & PULL GOLF BUGGIES
  // ==========================================
  {
    slug: 'clicgear-model-4-push-golf-buggy',
    name: 'Clicgear Model 4.0 3-Wheel Push Golf Buggy',
    brand: 'clicgear',
    brandName: 'Clicgear',
    category: 'push-3-wheel',
    categoryPath: '/push-pull-golf-buggies/3-wheel/',
    price: 499,
    condition: 'New',
    badge: 'Legendary Durability',
    featured: true,
    rating: 4.9,
    reviewCount: 88,
    power: 'Manual push',
    wheels: '3-wheel',
    batteryRange: 'N/A',
    weightCategory: 'Under 10 kg',
    weightKg: 8.4,
    foldSize: 'Compact / flat-fold',
    seats: 'Walk-behind',
    primaryKeyword: 'clicgear model 4 push golf buggy',
    shortDescription: 'Heavy-duty aircraft-grade aluminium 3-wheel push buggy with positive-lock handbrake, silicone bag straps, and compact fold.',
    description: 'The Clicgear Model 4.0 is the gold standard for 3-wheel manual push golf buggies. Built with heavy-gauge aircraft-grade aluminium tubing, maintenance-free airless tyres, easy-clip silicone bag straps, an oversized console box with umbrella mount, and front wheel alignment adjustment.',
    specs: {
      power: 'Manual Push (Ultra-Smooth Sealed Ball Bearings)',
      frame: 'Heavy-Gauge Aircraft Aluminium Tubing',
      weight: '8.4 kg',
      wheels: '3-Wheel Maintenance-Free Airless Tyres',
      brakes: 'Front Wheel Positive Lever Lock Handbrake',
      foldSize: '33cm x 38cm x 60cm (Ultra-Compact Cube)',
      warranty: '3-Year Manufacturer Warranty'
    },
    images: [
      'https://images.unsplash.com/photo-1593111774642-a1548e64c5d5?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    slug: 'big-max-blade-ip-flat-fold-push-golf-buggy',
    name: 'Big Max Blade IP Ultra Flat-Fold Push Golf Buggy',
    brand: 'big-max',
    brandName: 'Big Max',
    category: 'push-4-wheel',
    categoryPath: '/push-pull-golf-buggies/4-wheel/',
    price: 549,
    condition: 'New',
    badge: 'Flattest Fold 12.5cm',
    featured: false,
    rating: 4.8,
    reviewCount: 34,
    power: 'Manual push',
    wheels: '3-wheel',
    batteryRange: 'N/A',
    weightCategory: 'Under 10 kg',
    weightKg: 6.5,
    foldSize: 'Compact / flat-fold',
    seats: 'Walk-behind',
    primaryKeyword: 'big max blade ip flat fold golf buggy',
    shortDescription: 'Folds down to an incredible 12.5cm depth with Autofold wheel retraction for effortless boot and locker storage.',
    description: 'The Big Max Blade IP features patented Flat-Fold technology that collapses the entire frame and automatically tucks all three wheels underneath in a single motion, resulting in an ultra-slim 12.5cm profile that slides behind front car seats or into slim golf lockers.',
    specs: {
      power: 'Manual Push',
      frame: 'Ultra-Lightweight Hydroformed Aluminium',
      weight: '6.5 kg',
      foldDepth: '12.5 cm Flat Profile',
      brakes: 'Dual Rear Wheel Foot Brake',
      warranty: '5-Year Manufacturer Warranty upon registration'
    },
    images: [
      'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    slug: 'clicgear-model-8-plus-4-wheel-push-golf-buggy',
    name: 'Clicgear Model 8.0+ 4-Wheel Push Golf Buggy',
    brand: 'clicgear',
    brandName: 'Clicgear',
    category: 'push-4-wheel',
    categoryPath: '/push-pull-golf-buggies/4-wheel/',
    price: 599,
    condition: 'New',
    badge: '4-Wheel Stability',
    featured: false,
    rating: 4.9,
    reviewCount: 27,
    power: 'Manual push',
    wheels: '4-wheel',
    batteryRange: 'N/A',
    weightCategory: 'Under 10 kg',
    weightKg: 9.8,
    foldSize: 'Compact / flat-fold',
    seats: 'Walk-behind',
    primaryKeyword: 'clicgear 8.0 plus 4 wheel golf buggy',
    shortDescription: 'Engineered 4-wheel stability with dual front-wheel handbrake, oversized console, and patented 4XFold mechanism.',
    description: 'For golfers seeking rock-solid 4-wheel stability across uneven turf and sidehills. The Clicgear 8.0+ features twin front brake levers, oversized lower saddle for tour bags, and patented V-Slide folding.',
    specs: {
      power: 'Manual Push (4-Wheel Wide-Track Stance)',
      weight: '9.8 kg',
      wheels: '4-Wheel Airless Foam Filled Tyres',
      brakes: 'Dual Front Wheel Handbrake',
      foldSize: '38cm x 68cm x 43cm',
      warranty: '3-Year Australian Warranty'
    },
    images: [
      'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=1200&q=80'
    ]
  },

  // ==========================================
  // 5. RIDE-ON GOLF CARTS (2, 4, 6 SEAT & LIFTED)
  // ==========================================
  {
    slug: 'ecar-lt-a627-2-seat-electric-golf-cart',
    name: 'ECAR LT-A627 2-Seat Electric Golf Cart',
    brand: 'ecar',
    brandName: 'ECAR',
    category: 'carts-2-seat',
    categoryPath: '/golf-carts/2-seat/',
    price: 13990,
    condition: 'New',
    badge: 'Course Standard',
    featured: true,
    rating: 4.9,
    reviewCount: 41,
    power: 'Electric',
    wheels: '4-wheel',
    batteryRange: '36 hole',
    weightCategory: 'Over 13 kg',
    weightKg: 430,
    foldSize: 'Standard',
    seats: '2',
    primaryKeyword: 'ecar lt a627 2 seat electric golf cart',
    shortDescription: 'Commercial-grade 2-passenger electric golf cart with 48V 4.0kW AC brushless motor, onboard Delta-Q charger, and 36+ hole range.',
    description: 'The ECAR LT-A627 is Australia\'s premier 2-seat golf cart for private owners, golf resorts, and residential estate commuting. Powered by an advanced 48V AC brushless powertrain with regenerative downhill braking, deep-cycle Trojan battery pack or drop-in lithium upgrade, split tinted windscreen, dual bag rack, and weather-sealed sand bottles.',
    specs: {
      power: '48V 4.0 kW AC Brushless Motor with Curtis Controller',
      battery: '48V Deep-Cycle Pack or Drop-in LiFePO4 Lithium (Optional)',
      range: '70 km per charge (36+ Holes)',
      topSpeed: '24 km/h (Golf Course Governor) / 32 km/h (Estate Mode)',
      brakes: 'Self-Compensating Rear Drum & Auto Hill Park Brake',
      seating: '2 Adult Passengers on UV-Resistant Marine Cushions',
      warranty: '2-Year Chassis & Electrical + 3-Year Battery Warranty'
    },
    images: [
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1594495894542-a46cc73e081a?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    slug: 'club-car-onward-4-passenger-lifted-lithium-golf-cart',
    name: 'Club Car Onward 4-Passenger Lifted Lithium Golf Cart',
    brand: 'club-car',
    brandName: 'Club Car',
    category: 'carts-lifted',
    categoryPath: '/golf-carts/lifted-all-terrain/',
    price: 26990,
    condition: 'New',
    badge: 'Luxury Lifted',
    featured: true,
    rating: 5.0,
    reviewCount: 35,
    power: 'Electric',
    wheels: '4-wheel',
    batteryRange: '36 hole',
    weightCategory: 'Over 13 kg',
    weightKg: 490,
    foldSize: 'Standard',
    seats: '4',
    primaryKeyword: 'club car onward 4 passenger lifted lithium golf cart',
    shortDescription: 'Rustproof aircraft aluminium AlumiCore chassis, factory 4-inch lift kit, 23" all-terrain tyres, and maintenance-free Li-ion battery.',
    description: 'The Club Car Onward 4-Passenger Lifted Lithium is the ultimate expression of personal resort mobility. Features Club Car\'s legendary rustproof aluminium frame, factory-tuned lifted suspension with double A-arms, 14" alloy wheels on 23" rugged all-terrain tyres, flip-flop rear seat with concealed storage bucket, and automotive LED headlights with daylight running accents.',
    specs: {
      chassis: 'AlumiCore Rustproof Aircraft-Grade Aluminium Frame',
      power: '4.7 hp (3.5 kW) Rated AC Motor (14.8 hp Peak)',
      battery: '48V Maintenance-Free Lithium-Ion (6-Year Warranty)',
      suspension: 'Factory 4-Inch Lift Kit with Heavy-Duty Leaf Springs',
      groundClearance: '165 mm Under Differential',
      seating: '4 Passengers (2 Forward, 2 Rear-Facing Flip Seat)',
      brakes: 'Self-Adjusting Rear Drum Brakes',
      warranty: '3-Year Limited Vehicle + 6-Year Lithium Battery Warranty'
    },
    images: [
      'https://images.unsplash.com/photo-1594495894542-a46cc73e081a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    slug: 'ecar-lt-a627-6-seat-resort-vip-transporter',
    name: 'ECAR LT-A627.6 6-Seat Resort & Estate VIP Transporter',
    brand: 'ecar',
    brandName: 'ECAR',
    category: 'carts-4-6-seat',
    categoryPath: '/golf-carts/4-6-seat/',
    price: 23800,
    condition: 'New',
    badge: '6-Seat Transporter',
    featured: true,
    rating: 4.9,
    reviewCount: 19,
    power: 'Electric',
    wheels: '4-wheel',
    batteryRange: '36 hole',
    weightCategory: 'Over 13 kg',
    weightKg: 580,
    foldSize: 'Standard',
    seats: '6',
    primaryKeyword: 'ecar 6 seat resort golf cart',
    shortDescription: 'Extended chassis 6-seat luxury passenger transporter with 72V 5.0kW AC high-torque motor and hydraulic disc brakes.',
    description: 'Designed for VIP hospitality, gated estate shuttles, winery tours and large families. Offers three spacious rows of deeply contoured marine vinyl seating, overhead stereo soundbar, tinted extended canopy, and full LED road-lighting package with horn and indicators.',
    specs: {
      power: '72V 5.0 kW AC Brushless Motor with Toyota Controller',
      battery: '72V 150Ah LiFePO4 Lithium Battery with Bluetooth BMS',
      range: 'Up to 90 km per charge with 6 passengers',
      brakes: '4-Wheel Hydraulic Disc Brakes + Auto Electromagnetic Brake',
      seating: '6 Adult Passengers (4 Forward, 2 Rear)',
      lighting: 'High/Low Beam LED Headlights, Indicators, Brake Lights, Horn',
      warranty: '2-Year Vehicle Warranty + 5-Year Lithium Warranty'
    },
    images: [
      'https://images.unsplash.com/photo-1594495894542-a46cc73e081a?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    slug: 'ecar-commercial-electric-utility-tipper-cart',
    name: 'ECAR Commercial Electric Utility Tipper Cart',
    brand: 'ecar',
    brandName: 'ECAR',
    category: 'carts-utility',
    categoryPath: '/golf-carts/utility/',
    price: 16990,
    condition: 'New',
    badge: 'Commercial Utility',
    featured: false,
    rating: 4.8,
    reviewCount: 23,
    power: 'Electric',
    wheels: '4-wheel',
    batteryRange: '36 hole',
    weightCategory: 'Over 13 kg',
    weightKg: 510,
    foldSize: 'Standard',
    seats: '2',
    primaryKeyword: 'commercial electric utility tipper golf cart',
    shortDescription: 'Heavy-duty commercial utility buggy with aluminium drop-side tipper tray, 500kg payload rating, and 48V AC powertrain.',
    description: 'Engineered for councils, golf course greenskeeping, schools, equestrian centres, and industrial facilities. Features an electro-hydraulic tipping aluminium cargo bed with drop-down tailgate and removable sides, 50mm tow ball hitch, and whisper-quiet electric drive.',
    specs: {
      power: '48V 4.0 kW AC Motor with Heavy-Duty Transaxle',
      tray: 'Aluminium Tipper Tray (1200mm x 1100mm x 300mm)',
      payload: '500 kg Payload Capacity / 750 kg Tow Rating',
      brakes: 'Mechanical Rear Drum with Handbrake Lock',
      tyres: 'Heavy-Duty 6-Ply Turf Master Puncture Resistant Tyres',
      warranty: '2-Year Commercial Fleet Warranty'
    },
    images: [
      'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    slug: 'club-car-precedent-certified-used-golf-cart',
    name: 'Club Car Precedent Certified Used 2-Seat Golf Cart',
    brand: 'club-car',
    brandName: 'Club Car',
    category: 'carts-used',
    categoryPath: '/golf-carts/used/',
    price: 7990,
    condition: 'Used',
    badge: 'Certified Pre-Owned',
    featured: false,
    rating: 4.7,
    reviewCount: 26,
    power: 'Electric',
    wheels: '4-wheel',
    batteryRange: '36 hole',
    weightCategory: 'Over 13 kg',
    weightKg: 420,
    foldSize: 'Standard',
    seats: '2',
    primaryKeyword: 'used club car precedent golf cart australia',
    shortDescription: 'Workshop-certified refurbished Club Car Precedent with tested batteries, new body panels, split windscreen, and 12-month warranty.',
    description: 'Each pre-owned Club Car Precedent undergoes a rigorous 48-point workshop inspection, brake rebuild, electrical diagnostic, and fresh battery health testing. Standard with charger, dual golf bag holder, and Australian workshop warranty.',
    specs: {
      condition: 'Certified Workshop Reconditioned',
      chassis: 'AlumiCore Rustproof Aluminium Chassis',
      power: '48V DC Motor with Curtis Controller',
      battery: 'Tested Deep-Cycle 48V Pack with Fresh Capacity Certificate',
      warranty: '12-Month Comprehensive Australian Warranty'
    },
    images: [
      'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80'
    ]
  },

  // ==========================================
  // 6. OFF-ROAD & RECREATIONAL BUGGIES
  // ==========================================
  {
    slug: 'outback-boss-4x4-electric-farm-buggy-utv',
    name: 'Outback Boss 4x4 Electric Farm Buggy UTV',
    brand: 'bennche',
    brandName: 'Bennche',
    category: 'farm-buggies',
    categoryPath: '/off-road-buggies/farm-buggies/',
    price: 22450,
    condition: 'New',
    badge: 'AWD Electric Farm UTV',
    featured: true,
    rating: 5.0,
    reviewCount: 44,
    power: 'Electric',
    wheels: '4-wheel',
    batteryRange: 'N/A',
    weightCategory: 'Over 13 kg',
    weightKg: 680,
    foldSize: 'Standard',
    seats: '2',
    primaryKeyword: 'outback boss 4x4 electric farm buggy utv',
    shortDescription: 'Twin-motor 9kW peak AWD electric farm UTV with hydraulic tipping bed, 3,500lb winch, 25" all-terrain tyres, and 72V lithium pack.',
    description: 'The ultimate zero-emission agricultural utility machine for Australian farms and cattle stations. Twin synchronous AC motors deliver instantaneous 4WD torque without engine noise or expensive diesel maintenance. Standard with hydraulic dump bed, 50mm tow receiver, heavy steel skid plates, and full roll cage.',
    specs: {
      power: 'Dual 4.5kW AC Synchronous Motors (9kW Peak AWD)',
      battery: '72V 160Ah High-Density LiFePO4 with Thermal Balancing',
      range: '85 km on heavy paddock & trail terrain',
      payload: '650 kg total payload (450 kg tipping cargo tray)',
      towing: '900 kg rated 50mm tow ball receiver',
      winch: '3,500 lb Electric Front Recovery Winch Standard',
      warranty: '5-Year LiFePO4 Battery + 3-Year Chassis Warranty'
    },
    images: [
      'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    slug: 'trail-blazer-200cc-petrol-dune-buggy',
    name: 'Trail Blazer 200cc 2-Seater Petrol Dune Buggy',
    brand: 'bennche',
    brandName: 'Bennche',
    category: 'dune-buggies',
    categoryPath: '/off-road-buggies/dune-buggies/',
    price: 4990,
    condition: 'New',
    badge: 'Trail & Dunes',
    featured: false,
    rating: 4.8,
    reviewCount: 18,
    power: 'Petrol',
    wheels: '4-wheel',
    batteryRange: 'N/A',
    weightCategory: 'Over 13 kg',
    weightKg: 195,
    foldSize: 'Standard',
    seats: '2',
    primaryKeyword: '200cc petrol dune buggy australia',
    shortDescription: '200cc 4-stroke petrol dune buggy with full roll cage, 4-point racing harnesses, dual hydraulic disc brakes, and automatic CVT with reverse.',
    description: 'Built for sand dunes, dirt tracks and rural property fun. Powered by a reliable GY6 200cc 4-stroke engine with electric key start, fully independent dual A-arm front suspension, adjustable bucket seats, and overhead LED spotlight bar.',
    specs: {
      engine: '200cc 4-Stroke Air-Cooled Single Cylinder (Electric Start)',
      transmission: 'Automatic CVT with Forward, Neutral & Reverse',
      brakes: 'Front & Rear Ventilated Hydraulic Disc Brakes',
      suspension: 'Independent Dual A-Arm Front / Heavy Swing Arm Rear',
      safety: 'Reinforced Tubular Steel Roll Cage & 4-Point Harnesses',
      warranty: '12-Month Australian Parts Warranty'
    },
    images: [
      'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    slug: 'classic-coastal-volkswagen-beach-buggy',
    name: 'Classic Coastal Custom Fibreglass Beach Buggy (Turnkey)',
    brand: 'kandi',
    brandName: 'The Buggy Shop Custom',
    category: 'beach-buggies',
    categoryPath: '/off-road-buggies/beach-buggies/',
    price: 24900,
    condition: 'New',
    badge: 'Coastal Classic',
    featured: false,
    rating: 5.0,
    reviewCount: 14,
    power: 'Petrol',
    wheels: '4-wheel',
    batteryRange: 'N/A',
    weightCategory: 'Over 13 kg',
    weightKg: 580,
    foldSize: 'Standard',
    seats: '2',
    primaryKeyword: 'beach buggy for sale australia',
    shortDescription: 'Turnkey Australian-built Manx-style fibreglass beach buggy with wide paddle sand tyres, stainless roll bar, and road-compliance lighting.',
    description: 'A genuine Australian summer icon. Built on a reinforced short-wheelbase chassis with a vibrant gel-coat heavy-gauge fibreglass body, classic chrome roll bar, twin high-back marine bucket seats, and all-weather digital instrumentation.',
    specs: {
      chassis: 'Reinforced Sand-Blasted & Powder-Coated Short Wheelbase Chassis',
      body: 'Heavy-Gauge Hand-Laid Gel-Coat Fibreglass',
      tyres: 'Wide Deep-Dish Polished Alloys with High-Flotation Tyres',
      safety: 'Full Roll Hoop & ADR Approved Lap-Sash Seatbelts',
      warranty: '2-Year Australian Drivetrain Warranty'
    },
    images: [
      'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80'
    ]
  },

  // ==========================================
  // 7. KIDS' RIDE-ON BUGGIES
  // ==========================================
  {
    slug: 'kandi-48v-electric-kids-off-road-buggy',
    name: 'Kandi 48V 1000W Electric Kids Off-Road Buggy',
    brand: 'kandi',
    brandName: 'Kandi',
    category: 'kids-electric',
    categoryPath: '/kids-buggies/electric/',
    price: 2290,
    condition: 'New',
    badge: 'Kids Electric 48V',
    featured: true,
    rating: 4.9,
    reviewCount: 37,
    power: 'Electric',
    wheels: '4-wheel',
    batteryRange: 'N/A',
    weightCategory: 'Over 13 kg',
    weightKg: 85,
    foldSize: 'Standard',
    seats: '2',
    primaryKeyword: 'kids electric buggy 48v australia',
    shortDescription: 'Proper 48V 1000W brushless electric kids buggy with 3-speed parental key lock governor, full roll cage, and remote engine cut-off.',
    description: 'A real off-road buggy designed for kids and tweens (ages 6 to 13). Features a powerful 1000W 48V brushless electric motor that runs whisper-quiet around the yard or farm. Equipped with 3-speed parental key limit settings (10 km/h, 20 km/h, 35 km/h), full roll cage, twin seats with seatbelts, and disc brakes.',
    specs: {
      motor: '1000W 48V High-Efficiency Brushless Electric Motor',
      battery: '48V 20Ah Lead-Acid / Li-Ion Pack (Up to 2.5 Hours Runtime)',
      safetyControls: 'Parental 3-Speed Key Lock (10 / 20 / 35 km/h) & Remote Kill Handset',
      chassis: 'Full Steel Tubular Roll Cage & Padded Side Protection',
      brakes: 'Hydraulic Rear Disc Brakes with Child-Proportion Foot Pedal',
      warranty: '12-Month Australian Manufacturer Warranty'
    },
    images: [
      'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    slug: 'predator-110cc-petrol-kids-teen-buggy',
    name: 'Predator 110cc 4-Stroke Kids & Teen Petrol Buggy',
    brand: 'bennche',
    brandName: 'Bennche',
    category: 'kids-petrol',
    categoryPath: '/kids-buggies/petrol/',
    price: 2890,
    condition: 'New',
    badge: 'Kids Petrol 110cc',
    featured: false,
    rating: 4.8,
    reviewCount: 21,
    power: 'Petrol',
    wheels: '4-wheel',
    batteryRange: 'N/A',
    weightCategory: 'Over 13 kg',
    weightKg: 115,
    foldSize: 'Standard',
    seats: '2',
    primaryKeyword: 'childrens petrol buggy australia',
    shortDescription: '110cc 4-stroke automatic petrol buggy for kids and teens with electric start, adjustable throttle limiter, and tethered safety lanyard.',
    description: 'Built tough for paddocks and fire trails. The Predator 110cc gives young riders real driving experience with an easy electric start, automatic transmission with reverse, adjustable speed governor screw on the gas pedal, and full dual seatbelts.',
    specs: {
      engine: '110cc 4-Stroke Single Cylinder (Electric Key Start)',
      transmission: 'Fully Automatic with Reverse (F-N-R)',
      speedControl: 'Adjustable Throttle Screw Governor (15 km/h to 45 km/h)',
      safety: 'Dual 4-Point Harnesses & Engine Safety Cut-Off Switch',
      warranty: '12-Month Australian Parts Warranty'
    },
    images: [
      'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80'
    ]
  },

  // ==========================================
  // 8. BATTERIES & CHARGERS
  // ==========================================
  {
    slug: 'mgi-24v-380wh-click-and-go-lithium-battery',
    name: 'MGI 24V 380Wh Click & Go 36-Hole Lithium Battery Pack',
    brand: 'mgi',
    brandName: 'MGI',
    category: 'batteries-buggy-lithium',
    categoryPath: '/golf-buggy-batteries/lithium/',
    price: 549,
    condition: 'New',
    badge: '36 Hole Lithium',
    featured: false,
    rating: 4.9,
    reviewCount: 72,
    power: 'Electric',
    wheels: 'N/A',
    batteryRange: '36 hole',
    weightCategory: 'Under 10 kg',
    weightKg: 2.8,
    foldSize: 'Standard',
    seats: 'Walk-behind',
    primaryKeyword: 'mgi lithium battery replacement 36 hole',
    shortDescription: 'Genuine MGI 24V 380Wh Click & Go lithium replacement battery for MGI Zip Navigator, Zip X5, X3 and X1 models with 3-year warranty.',
    description: 'Genuine MGI replacement 24V 380Wh lithium battery. Delivers up to 36 holes of continuous operation even on undulating courses. Features integrated digital battery management system (BMS) with overcharge and temperature protection.',
    specs: {
      voltage: '24V Nominal (Click & Go Interface)',
      capacity: '380Wh (36 Holes Capacity)',
      weight: '2.8 kg Ultra-Lightweight',
      compatibility: 'MGI Zip Navigator AT, Ai Navigator, Zip X5, Zip X3, Zip X1',
      warranty: '3-Year Full Replacement Australian Warranty'
    },
    images: [
      'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    slug: 'trojan-t-105-6v-golf-cart-battery-set-48v',
    name: 'Trojan T-105 6V Deep-Cycle Golf Cart Battery Set (Set of 8 - 48V)',
    brand: 'trojan',
    brandName: 'Trojan',
    category: 'batteries-cart-sets',
    categoryPath: '/golf-buggy-batteries/cart-sets/',
    price: 2490,
    condition: 'New',
    badge: 'Industry Standard',
    featured: false,
    rating: 4.9,
    reviewCount: 39,
    power: 'Electric',
    wheels: 'N/A',
    batteryRange: '36 hole',
    weightCategory: 'Over 13 kg',
    weightKg: 240,
    foldSize: 'Standard',
    seats: '2',
    primaryKeyword: 'trojan t105 golf cart batteries australia',
    shortDescription: 'Complete 48V set of 8 genuine Trojan T-105 6V deep-cycle flooded batteries for Club Car, Yamaha, EZGO and ECAR golf carts.',
    description: 'The global benchmark for deep-cycle golf cart longevity. Trojan T-105 features Alpha Plus Paste with T2 Technology for maximum operating hours and sustained energy output across Australian conditions.',
    specs: {
      voltage: '48V System (8 x 6V T-105 Batteries)',
      capacity: '225Ah @ 20-Hr Rate',
      terminal: 'Standard Automotive & Threaded Post Options',
      warranty: '2-Year Commercial & Private Golf Cart Warranty'
    },
    images: [
      'https://images.unsplash.com/photo-1594495894542-a46cc73e081a?auto=format&fit=crop&w=1200&q=80'
    ]
  },

  // ==========================================
  // 9. PARTS & ACCESSORIES
  // ==========================================
  {
    slug: 'mgi-all-terrain-winter-rear-wheel-kit',
    name: 'MGI Zip All-Terrain Winter & Sand Rear Wheel Kit (Pair)',
    brand: 'mgi',
    brandName: 'MGI',
    category: 'parts-wheels',
    categoryPath: '/golf-buggy-parts/wheels-tyres/',
    price: 139,
    condition: 'New',
    badge: 'All-Terrain Traction',
    featured: false,
    rating: 4.8,
    reviewCount: 28,
    power: 'Manual push',
    wheels: '2-wheel',
    batteryRange: 'N/A',
    weightCategory: 'Under 10 kg',
    weightKg: 1.4,
    foldSize: 'Standard',
    seats: 'Walk-behind',
    primaryKeyword: 'mgi zip all terrain rear wheels',
    shortDescription: 'Heavy-duty deep-tread polyurethane rear wheels for MGI Zip Series buggies to eliminate fairway slipping in wet, sandy or muddy conditions.',
    description: 'Upgrade your MGI Zip buggy for maximum grip on wet fairways, sand, and steep slopes. These polyurethane high-traction tyres clip on in seconds using MGI quick-release hubs.',
    specs: {
      compatibility: 'All MGI Zip Series Models (Navigator, X5, X3, X1)',
      material: 'Durable Non-Marking Polyurethane Deep Lug Tread',
      package: 'Pair of Left & Right Wheels with Hub Clips'
    },
    images: [
      'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    slug: 'deluxe-golf-buggy-accessory-bundle',
    name: 'Deluxe Universal Golf Buggy Accessory Bundle (Umbrella, Seat & Bottle Holder)',
    brand: 'stinger',
    brandName: 'The Buggy Shop',
    category: 'accessories',
    categoryPath: '/golf-buggy-accessories/',
    price: 249,
    condition: 'New',
    badge: '3-Piece Bundle',
    featured: false,
    rating: 4.9,
    reviewCount: 42,
    power: 'Manual push',
    wheels: 'N/A',
    batteryRange: 'N/A',
    weightCategory: 'Under 10 kg',
    weightKg: 2.1,
    foldSize: 'Standard',
    seats: 'Walk-behind',
    primaryKeyword: 'golf buggy accessories australia',
    shortDescription: 'Complete 3-piece accessory pack including padded spring-loaded seat, dual-pivot umbrella holder, and insulated drink holder.',
    description: 'Transform your on-course comfort with our best-selling accessory bundle. Includes a padded spring-loaded seat with internal dry storage compartment for balls and tees, an adjustable dual-axis umbrella holder, and an insulated beverage holder.',
    specs: {
      includes: 'Padded Storage Seat + Dual-Pivot Umbrella Extender + Insulated Drink Mount',
      fitment: 'Universal Bracket Clamps fit 25mm to 35mm round & oval buggy frames',
      seatCapacity: '110 kg Recommended Maximum Sitting Load'
    },
    images: [
      'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=1200&q=80'
    ]
  },

  // ==========================================
  // 10. USED & EX-DEMO GOLF BUGGIES
  // ==========================================
  {
    slug: 'mgi-zip-navigator-ex-demo-electric-golf-buggy',
    name: 'MGI Zip Navigator AT Remote Electric Golf Buggy (Ex-Demo)',
    brand: 'mgi',
    brandName: 'MGI',
    category: 'used-buggies',
    categoryPath: '/used-golf-buggies/',
    price: 1490,
    condition: 'Ex-demo',
    badge: 'Ex-Demo Warranty',
    featured: false,
    rating: 4.8,
    reviewCount: 15,
    power: 'Remote control',
    wheels: '4-wheel',
    batteryRange: '36 hole',
    weightCategory: '10–13 kg',
    weightKg: 13.0,
    foldSize: 'Compact / flat-fold',
    seats: 'Walk-behind',
    primaryKeyword: 'used mgi zip navigator golf buggy',
    shortDescription: 'Workshop-inspected ex-demo MGI Zip Navigator AT with tested 24V lithium battery, remote handset, and 12-month Australian workshop warranty.',
    description: 'Save hundreds on an ex-demonstrator MGI Zip Navigator AT. Used only for supervised clubhouse demo rounds, fully serviced and certified with new tyre treads and a fresh battery capacity test report.',
    specs: {
      condition: 'Ex-Demo (Under 10 Rounds Use)',
      battery: '24V 380Wh Tested Lithium Battery (100% Health Certificate)',
      includes: 'Remote Handset, Charger, Umbrella Holder',
      warranty: '12-Month Australian Workshop Warranty'
    },
    images: [
      'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=1200&q=80'
    ]
  }
];

// Helper functions for products
export function getProductBySlug(slug) {
  if (!slug) return null;
  const clean = slug.toLowerCase().trim();
  return PRODUCTS.find(p => p.slug === clean);
}

export function getProductsByCategory(categorySlug) {
  if (!categorySlug) return [];
  const clean = categorySlug.toLowerCase().trim();
  
  // Special category handling
  if (clean === 'electric-golf-buggies') {
    return PRODUCTS.filter(p => 
      p.category === 'electric-golf-buggies' || 
      p.category === 'remote-control-golf-buggies' || 
      p.category === 'electric-walk-behind' || 
      p.category === 'gps-follow-buggies' || 
      p.category === 'conversion-kits' ||
      p.power === 'Electric' || p.power === 'Remote control' || p.power === 'Follow / GPS'
    );
  }
  if (clean === 'push-pull-golf-buggies' || clean === 'golf-trolleys') {
    return PRODUCTS.filter(p => 
      p.category === 'push-pull-golf-buggies' || 
      p.category === 'push-3-wheel' || 
      p.category === 'push-4-wheel' ||
      p.power === 'Manual push'
    );
  }
  if (clean === 'golf-carts') {
    return PRODUCTS.filter(p => 
      p.category === 'golf-carts' ||
      p.category === 'carts-2-seat' ||
      p.category === 'carts-4-6-seat' ||
      p.category === 'carts-lifted' ||
      p.category === 'carts-utility' ||
      p.category === 'carts-used' ||
      p.seats === '2' || p.seats === '4' || p.seats === '6'
    );
  }
  if (clean === 'off-road-buggies') {
    return PRODUCTS.filter(p => 
      p.category === 'off-road-buggies' ||
      p.category === 'dune-buggies' ||
      p.category === 'side-by-side-buggies' ||
      p.category === 'beach-buggies' ||
      p.category === 'farm-buggies' ||
      p.category === 'adult-2-seat-petrol'
    );
  }
  if (clean === 'kids-buggies') {
    return PRODUCTS.filter(p => 
      p.category === 'kids-buggies' ||
      p.category === 'kids-electric' ||
      p.category === 'kids-petrol'
    );
  }
  if (clean === 'batteries' || clean === 'golf-buggy-batteries') {
    return PRODUCTS.filter(p => 
      p.category.startsWith('batteries') || p.category === 'batteries'
    );
  }
  if (clean === 'parts' || clean === 'golf-buggy-parts') {
    return PRODUCTS.filter(p => 
      p.category.startsWith('parts') || p.category === 'parts'
    );
  }

  // Exact category match or categoryPath match
  return PRODUCTS.filter(p => 
    p.category === clean || 
    p.categoryPath === `/${clean}/` || 
    p.categoryPath.includes(`/${clean}/`)
  );
}

export function getProductsByBrand(brandSlug) {
  if (!brandSlug) return [];
  const clean = brandSlug.toLowerCase().trim();
  return PRODUCTS.filter(p => p.brand === clean || p.brandName?.toLowerCase() === clean);
}
