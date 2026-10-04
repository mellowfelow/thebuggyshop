// src/config/categories.js
// Australian Golf Buggy Category Tree & Structure (WebForge v9.1 AU)

export const CATEGORY_TREE = [
  // 2.1 - Electric Golf Buggies
  {
    id: 'electric-golf-buggies',
    parent: null,
    slug: 'electric-golf-buggies',
    path: '/electric-golf-buggies/',
    navLabel: 'Electric Golf Buggies',
    pageTitle: 'Electric Golf Buggies for Sale Australia',
    metaDescription: 'Shop electric and motorised golf buggies in Australia. MGI, Motocaddy, PowaKaddy and more, with lithium batteries, remote control and GPS. Free delivery, Australia-wide.',
    h1: 'Electric Golf Buggies',
    targetKeywords: ['electric golf buggy', 'motorised golf buggy', 'battery golf buggy', 'lithium golf buggy', 'electric golf buggy australia'],
    introCopy: 'Electric golf buggies do the carrying so you can focus on your round. Our range covers walk-behind lithium models, hands-free remote-control buggies and GPS follow buggies from the brands Australian golfers trust. Every buggy ships with an Australian warranty and local service support.',
    heroImage: '/images/categories/electric-golf-buggies.jpg',
    itemCount: 6,
    facets: ['power', 'wheels', 'batteryRange', 'weight', 'price', 'foldSize', 'condition', 'brand']
  },
  // 2.2 - Walk-behind Electric Buggies
  {
    id: 'electric-walk-behind',
    parent: 'electric-golf-buggies',
    slug: 'walk-behind',
    path: '/electric-golf-buggies/walk-behind/',
    navLabel: 'Walk-behind Electric',
    pageTitle: 'Walk-behind Electric Golf Buggies',
    metaDescription: 'Speed-dial electric golf buggies with 18 to 36 hole lithium batteries. MGI Zip, Motocaddy M1 and PowaKaddy from The Buggy Shop. Australia-wide delivery.',
    h1: 'Walk-behind Electric Golf Buggies',
    targetKeywords: ['walk behind electric golf buggy', 'motorised golf buggy', 'MGI Zip'],
    introCopy: 'Push-button simple: set the speed, walk beside it, let the buggy carry the bag. These are the lightest, best-value way into an electric buggy, folding down to fit any boot.',
    heroImage: 'https://images.unsplash.com/photo-1593111774642-a1548e64c5d5?auto=format&fit=crop&w=1200&q=80',
    itemCount: 0,
    facets: ['power', 'wheels', 'batteryRange', 'weight', 'price', 'foldSize', 'condition', 'brand']
  },
  // 2.3 - Remote-control Golf Buggies
  {
    id: 'remote-control-golf-buggies',
    parent: 'electric-golf-buggies',
    slug: 'remote-control-golf-buggies',
    path: '/remote-control-golf-buggies/',
    navLabel: 'Remote-control Buggies',
    pageTitle: 'Remote Control Golf Buggies Australia',
    metaDescription: 'Hands-free remote control golf buggies from MGI, Motocaddy, Stinger and Alphard. Dual-motor, all-terrain, lithium powered. Shop online with Australia-wide delivery.',
    h1: 'Remote-control Golf Buggies',
    targetKeywords: ['remote control golf buggy', 'electric golf buggy with remote', 'remote golf buggy australia'],
    introCopy: 'Steer the buggy with a handset while you walk ahead, line up your next shot or clear a bunker. Our remote-control range covers everything from first-time remote buggies to all-terrain dual-motor models built for hilly Australian courses.',
    heroImage: '/images/categories/remote-control-golf-buggies.jpg',
    itemCount: 8,
    facets: ['power', 'wheels', 'batteryRange', 'weight', 'price', 'foldSize', 'condition', 'brand']
  },
  // 2.4 - GPS & Follow Buggies
  {
    id: 'gps-follow-buggies',
    parent: 'electric-golf-buggies',
    slug: 'gps-follow',
    path: '/electric-golf-buggies/gps-follow/',
    navLabel: 'GPS & Follow Buggies',
    pageTitle: 'GPS & Follow Golf Buggies',
    metaDescription: 'Smart golf buggies that follow you around the course or show hole distances on board. Stewart, MGI Ai and Motocaddy GPS models. The Buggy Shop, Australia.',
    h1: 'GPS & Follow Golf Buggies',
    targetKeywords: ['follow me golf buggy', 'GPS golf buggy', 'smart golf buggy'],
    introCopy: 'The buggy tracks you with a smart handset or magnetic sensor and rolls along behind, hands free. Onboard GPS models add course distances without a second device.',
    heroImage: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=1200&q=80',
    itemCount: 0,
    facets: ['power', 'wheels', 'batteryRange', 'weight', 'price', 'foldSize', 'condition', 'brand']
  },
  // 2.5 - Electric Conversion Kits
  {
    id: 'conversion-kits',
    parent: 'electric-golf-buggies',
    slug: 'conversion-kits',
    path: '/electric-golf-buggies/conversion-kits/',
    navLabel: 'Conversion Kits',
    pageTitle: 'Golf Buggy Electric Conversion Kits',
    metaDescription: 'Turn your manual push buggy into a remote-control electric buggy with an Alphard Club Booster kit. Fits most 3-wheel push buggies. Shop at The Buggy Shop.',
    h1: 'Electric Conversion Kits',
    targetKeywords: ['golf buggy conversion kit', 'make push buggy electric', 'Alphard Club Booster'],
    introCopy: 'Already own a push buggy you like? A conversion kit adds motors, a battery and remote control to the frame you already have, for a fraction of the price of a new electric buggy.',
    heroImage: 'https://images.unsplash.com/photo-1592919505780-303950717480?auto=format&fit=crop&w=1200&q=80',
    itemCount: 2,
    facets: ['power', 'price', 'condition', 'brand']
  },

  // 2.6 - Push & Pull Buggies
  {
    id: 'push-pull-golf-buggies',
    parent: null,
    slug: 'push-pull-golf-buggies',
    path: '/push-pull-golf-buggies/',
    navLabel: 'Push & Pull Buggies',
    pageTitle: 'Push Golf Buggies & Trolleys for Sale',
    metaDescription: 'Premium 3-wheel and 4-wheel push golf buggies from Clicgear, Big Max and Rovic. Lightweight, fast-folding, built to last. Australia-wide delivery from The Buggy Shop.',
    h1: 'Push & Pull Golf Buggies',
    targetKeywords: ['golf push buggy', 'push golf buggy', 'golf trolley', '3 wheel golf buggy', 'manual golf buggy'],
    introCopy: 'No batteries, no fuss. A good push buggy rolls straight, folds in seconds and lasts for years. We stock the premium 3-wheel and 4-wheel models that hold their value, and skip the throwaway trolleys.',
    heroImage: '/images/categories/push-pull-golf-buggies.jpg',
    itemCount: 6,
    facets: ['power', 'wheels', 'weight', 'price', 'foldSize', 'condition', 'brand']
  },
  // 2.7 - 3-wheel Push Buggies
  {
    id: 'push-3-wheel',
    parent: 'push-pull-golf-buggies',
    slug: '3-wheel',
    path: '/push-pull-golf-buggies/3-wheel/',
    navLabel: '3-wheel',
    pageTitle: '3-Wheel Push Golf Buggies',
    metaDescription: '3-wheel push golf buggies from Clicgear, Big Max and Rovic. Quick fold, one-hand steering, Australia-wide delivery.',
    h1: '3-Wheel Push Golf Buggies',
    targetKeywords: ['3 wheel golf buggy', 'three wheel golf buggy', 'clicgear'],
    introCopy: 'The classic setup: two wheels behind, one steering wheel in front for easy one-hand turns. Light, manoeuvrable and the quickest to fold.',
    heroImage: 'https://images.unsplash.com/photo-1593111774642-a1548e64c5d5?auto=format&fit=crop&w=1200&q=80',
    itemCount: 0,
    facets: ['wheels', 'weight', 'price', 'foldSize', 'condition', 'brand']
  },
  // 2.8 - 4-wheel & Flat-fold Push Buggies
  {
    id: 'push-4-wheel',
    parent: 'push-pull-golf-buggies',
    slug: '4-wheel',
    path: '/push-pull-golf-buggies/4-wheel/',
    navLabel: '4-wheel & Compact',
    pageTitle: '4-Wheel & Compact Push Golf Buggies',
    metaDescription: '4-wheel and ultra-compact flat-fold push golf buggies. Big Max Blade, Rovic Swivel and QOD. Stable, boot-friendly, Australia-wide delivery.',
    h1: '4-Wheel & Compact Push Golf Buggies',
    targetKeywords: ['4 wheel golf buggy', 'compact golf buggy', 'foldable golf buggy'],
    introCopy: 'Four wheels track dead straight across slopes and never tip when you stop. Flat-fold models pack down thinner than a golf bag.',
    heroImage: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=1200&q=80',
    itemCount: 2,
    facets: ['wheels', 'weight', 'price', 'foldSize', 'condition', 'brand']
  },
  // 2.9 - Golf Trolleys (synonym landing page)
  {
    id: 'golf-trolleys',
    parent: 'push-pull-golf-buggies',
    slug: 'golf-trolleys',
    path: '/golf-trolleys/',
    navLabel: 'Golf Trolleys',
    pageTitle: 'Golf Trolleys for Sale Australia',
    metaDescription: 'Golf trolleys, push buggies and electric trolleys for sale in Australia. Clicgear, Big Max, MGI and Motocaddy. The Buggy Shop, free Australia-wide delivery.',
    h1: 'Golf Trolleys',
    targetKeywords: ['golf trolley', 'electric golf trolley', 'golf trolleys', 'push golf trolley'],
    introCopy: '"Trolley" or "buggy", it is the same thing. This page brings together our full push and electric trolley range for shoppers who call it a trolley.',
    canonical: 'https://DOMAIN.com/push-pull-golf-buggies/',
    heroImage: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=1200&q=80',
    itemCount: 0,
    facets: ['power', 'wheels', 'weight', 'price', 'condition', 'brand']
  },

  // 2.10 - Ride-On Golf Carts
  {
    id: 'golf-carts',
    parent: null,
    slug: 'golf-carts',
    path: '/golf-carts/',
    navLabel: 'Ride-On Golf Carts',
    pageTitle: 'Golf Carts for Sale Australia | 2, 4 & 6 Seat',
    metaDescription: 'New and used ride-on golf carts for sale in Australia. 2, 4 and 6 seat electric carts from ECAR, Club Car, Yamaha, Tomberlin and Garia. Delivery Australia-wide.',
    h1: 'Ride-On Golf Carts',
    targetKeywords: ['golf cart for sale australia', 'golf buggy with seat', 'electric buggy for adults', 'ride on golf buggy'],
    introCopy: 'Sit-in electric carts for the course, the resort, the farm or the estate. From value 2-seaters to lifted 6-seat transporters and street-legal luxury carts, with finance and Australia-wide freight.',
    heroImage: '/images/categories/luxury-golf-carts.jpg',
    itemCount: 0,
    facets: ['seats', 'power', 'condition', 'price', 'brand']
  },
  // 2.11 - 2-Seat Golf Carts
  {
    id: 'carts-2-seat',
    parent: 'golf-carts',
    slug: '2-seat',
    path: '/golf-carts/2-seat/',
    navLabel: '2-Seat',
    pageTitle: '2-Seat Golf Carts for Sale Australia',
    metaDescription: '2-seat electric golf carts for sale in Australia. ECAR, Club Car and Yamaha carts with lithium power and 36-hole range.',
    h1: '2-Seat Golf Carts',
    targetKeywords: ['2 seater golf cart', '2 seat electric golf cart'],
    introCopy: 'The standard course cart: two seats, a bag rack and enough range for 36 holes.',
    heroImage: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1200&q=80',
    itemCount: 8,
    facets: ['power', 'condition', 'price', 'brand']
  },
  // 2.12 - 4 & 6-Seat Golf Carts
  {
    id: 'carts-4-6-seat',
    parent: 'golf-carts',
    slug: '4-6-seat',
    path: '/golf-carts/4-6-seat/',
    navLabel: '4 & 6-Seat',
    pageTitle: '4 & 6-Seat Golf Carts for Sale Australia',
    metaDescription: '4-passenger and 6-passenger electric golf carts. Resort transporters, family buggies and estate cruisers with lithium batteries.',
    h1: '4 & 6-Seat Golf Carts',
    targetKeywords: ['4 seater golf cart', '6 seat golf cart', 'family golf cart'],
    introCopy: 'Rear-facing or forward-facing extra seats for families, resorts and clubs.',
    heroImage: 'https://images.unsplash.com/photo-1594495894542-a46cc73e081a?auto=format&fit=crop&w=1200&q=80',
    itemCount: 3,
    facets: ['seats', 'power', 'condition', 'price', 'brand']
  },
  // 2.13 - Lifted & All-Terrain Carts
  {
    id: 'carts-lifted',
    parent: 'golf-carts',
    slug: 'lifted-all-terrain',
    path: '/golf-carts/lifted-all-terrain/',
    navLabel: 'Lifted & All-Terrain',
    pageTitle: 'Lifted & All-Terrain Golf Carts Australia',
    metaDescription: 'Lifted golf carts with knobby all-terrain tyres, heavy-duty suspension and extra ground clearance for paddocks, trails and estates.',
    h1: 'Lifted & All-Terrain Carts',
    targetKeywords: ['lifted golf cart', 'all terrain golf cart', 'off road golf cart'],
    introCopy: 'Raised suspension, knobby tyres and more ground clearance for tracks, paddocks and the beach path.',
    heroImage: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80',
    itemCount: 2,
    facets: ['seats', 'power', 'condition', 'price', 'brand']
  },
  // 2.14 - Utility & Commercial Carts
  {
    id: 'carts-utility',
    parent: 'golf-carts',
    slug: 'utility',
    path: '/golf-carts/utility/',
    navLabel: 'Utility & Commercial',
    pageTitle: 'Utility & Commercial Electric Carts Australia',
    metaDescription: 'Commercial utility golf carts with cargo trays, aluminium tipping beds and tow hitches for wineries, resorts and industry.',
    h1: 'Utility & Commercial Carts',
    targetKeywords: ['utility golf cart', 'electric utility cart', 'commercial cart'],
    introCopy: 'Cargo beds, tipper trays and load ratings for wineries, retirement villages, factories and councils.',
    heroImage: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80',
    itemCount: 2,
    facets: ['power', 'condition', 'price', 'brand']
  },
  // 2.15 - Used & Ex-Fleet Carts
  {
    id: 'carts-used',
    parent: 'golf-carts',
    slug: 'used',
    path: '/golf-carts/used/',
    navLabel: 'Used & Ex-Fleet',
    pageTitle: 'Used & Ex-Fleet Golf Carts for Sale Australia',
    metaDescription: 'Refurbished ex-lease Club Car, Yamaha and E-Z-GO golf carts for sale with fresh batteries and workshop warranties.',
    h1: 'Used & Ex-Fleet Carts',
    targetKeywords: ['used golf cart for sale australia', 'second hand golf cart', 'ex fleet golf cart'],
    introCopy: 'Ex-lease and refurbished Club Car, Yamaha and E-Z-GO carts, checked and reconditioned.',
    heroImage: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80',
    itemCount: 8,
    facets: ['seats', 'condition', 'price', 'brand']
  },

  // 2.16 - Off-Road & Recreational Buggies
  {
    id: 'off-road-buggies',
    parent: null,
    slug: 'off-road-buggies',
    path: '/off-road-buggies/',
    navLabel: 'Off-Road Buggies',
    pageTitle: 'Off-Road Buggies for Sale Australia',
    metaDescription: 'Off-road buggies for sale in Australia: dune buggies, side-by-side UTVs, beach buggies and farm buggies. Petrol and electric, kids to premium. The Buggy Shop.',
    h1: 'Off-Road & Recreational Buggies',
    targetKeywords: ['off road buggies', 'off road buggy for sale', 'dune buggy', 'side by side buggy'],
    introCopy: 'Buggies built for sand, dirt and paddocks. Petrol dune buggies, side-by-side UTVs, classic beach buggies and electric farm buggies, from kids models up to premium performance machines.',
    heroImage: '/images/categories/off-road-buggies.jpg',
    itemCount: 21,
    facets: ['power', 'seats', 'condition', 'price', 'brand']
  },
  // 2.17 - Dune Buggies
  {
    id: 'dune-buggies',
    parent: 'off-road-buggies',
    slug: 'dune-buggies',
    path: '/off-road-buggies/dune-buggies/',
    navLabel: 'Dune Buggies',
    pageTitle: 'Dune Buggies for Sale Australia',
    metaDescription: 'Lightweight petrol dune buggies with roll cages, disc brakes and off-road suspension for dunes, dirt tracks and farm trails.',
    h1: 'Dune Buggies',
    targetKeywords: ['dune buggy', 'dune buggies for sale', 'dune buggy for sale australia'],
    introCopy: 'Lightweight 150cc to 300cc petrol buggies with roll cages, built for sand dunes and fire trails.',
    heroImage: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80',
    itemCount: 3,
    facets: ['power', 'price', 'condition', 'brand']
  },
  // 2.18 - Side-by-Side / UTV Buggies
  {
    id: 'side-by-side-buggies',
    parent: 'off-road-buggies',
    slug: 'side-by-side',
    path: '/off-road-buggies/side-by-side/',
    navLabel: 'Side-by-Side / UTV',
    pageTitle: 'Side-by-Side Buggies & UTVs Australia',
    metaDescription: '2-seat and 4-seat side-by-side UTV buggies for recreation and property management. Petrol and electric AWD models.',
    h1: 'Side-by-Side / UTV Buggies',
    targetKeywords: ['side by side buggy', 'UTV buggy', 'side by side for sale'],
    introCopy: 'Two to four seats side by side, cargo bed, roll-over protection. Recreational models through to 1000cc performance UTVs.',
    heroImage: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80',
    itemCount: 10,
    facets: ['power', 'seats', 'price', 'condition', 'brand']
  },
  // 2.19 - Beach Buggies
  {
    id: 'beach-buggies',
    parent: 'off-road-buggies',
    slug: 'beach-buggies',
    path: '/off-road-buggies/beach-buggies/',
    navLabel: 'Beach Buggies',
    pageTitle: 'Beach Buggies for Sale Australia',
    metaDescription: 'Classic VW-based beach buggies and modern beach-ready off-road buggies for sale in Australia. Registered cars, body kits and all-terrain models. The Buggy Shop.',
    h1: 'Beach Buggies',
    targetKeywords: ['beach buggy for sale australia', 'beach buggy', 'beach buggies for sale australia'],
    introCopy: 'From registered classic VW-based beach buggies to modern all-terrain buggies with sand tyres. Complete road-registered cars, restoration projects and fibreglass body kits.',
    heroImage: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80',
    itemCount: 0,
    facets: ['power', 'price', 'condition', 'brand']
  },
  // 2.20 - Farm & Utility Buggies
  {
    id: 'farm-buggies',
    parent: 'off-road-buggies',
    slug: 'farm-buggies',
    path: '/off-road-buggies/farm-buggies/',
    navLabel: 'Farm Buggies',
    pageTitle: 'Farm Buggies for Sale Australia | Electric & Petrol',
    metaDescription: 'Farm buggies and agricultural UTVs for sale in Australia. Electric 4WD farm buggies, tipper-tray utility vehicles and petrol side-by-sides. The Buggy Shop.',
    h1: 'Farm & Utility Buggies',
    targetKeywords: ['farm buggy', 'electric farm buggy for sale australia', 'farm buggies for sale', 'agricultural UTV'],
    introCopy: 'Work buggies for properties: full-time 4WD, tow ratings, tipper trays and long service intervals. Electric models cut running costs to near zero and run silent around stock.',
    heroImage: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80',
    itemCount: 3,
    facets: ['power', 'seats', 'price', 'condition', 'brand']
  },
  // 2.21 - Adult 2-Seater Petrol Buggies
  {
    id: 'adult-2-seat-petrol',
    parent: 'off-road-buggies',
    slug: '2-seater-petrol',
    path: '/off-road-buggies/2-seater-petrol/',
    navLabel: '2-Seater Petrol',
    pageTitle: 'Adult 2-Seater Petrol Buggies Australia',
    metaDescription: 'Petrol 2-seater off-road buggies with roll cages, hydraulic disc brakes and CVT automatic transmissions for trail riding and recreation.',
    h1: 'Adult 2-Seater Petrol Buggies',
    targetKeywords: ['2 seater buggy for sale', 'petrol 2 seater buggy'],
    introCopy: 'Petrol-powered two-seat buggies for trail riding and property use, roll cage and disc brakes standard.',
    heroImage: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80',
    itemCount: 0,
    facets: ['power', 'price', 'condition', 'brand']
  },

  // 2.22 - Kids' Ride-On Buggies
  {
    id: 'kids-buggies',
    parent: null,
    slug: 'kids-buggies',
    path: '/kids-buggies/',
    navLabel: 'Kids\' Buggies',
    pageTitle: 'Kids Ride-On Buggies for Sale Australia',
    metaDescription: 'Real kids ride-on buggies: 24V to 48V electric off-road buggies and 90cc to 208cc petrol kids buggies. Roll cages, harnesses, parent speed limits. The Buggy Shop.',
    h1: 'Kids\' Ride-On Buggies',
    targetKeywords: ['kids buggy for sale', 'kids electric buggy 48v', 'ride on buggy kids', 'children\'s petrol buggy'],
    introCopy: 'Proper off-road buggies scaled for kids and teens, not plastic toys. Roll cages, seat belts, adjustable speed limits and adult remote cut-off on the electric models.',
    heroImage: '/images/categories/kids-buggies.jpg',
    itemCount: 5,
    facets: ['power', 'price', 'condition', 'brand']
  },
  // 2.23 - Electric Kids Buggies
  {
    id: 'kids-electric',
    parent: 'kids-buggies',
    slug: 'electric',
    path: '/kids-buggies/electric/',
    navLabel: 'Electric',
    pageTitle: 'Kids Electric Buggies for Sale Australia | 24V - 48V',
    metaDescription: '24V, 36V and 48V kids electric off-road buggies with parental speed controls, roll bars and disc brakes. Australia-wide shipping.',
    h1: 'Electric Kids Buggies',
    targetKeywords: ['kids electric buggy 48v', 'electric offroad buggy kids'],
    introCopy: '24V to 48V battery buggies for ages 5 to 12, with parent remote control and speed limiting.',
    heroImage: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80',
    itemCount: 1,
    facets: ['power', 'price', 'condition', 'brand']
  },
  // 2.24 - Petrol Kids & Teen Buggies
  {
    id: 'kids-petrol',
    parent: 'kids-buggies',
    slug: 'petrol',
    path: '/kids-buggies/petrol/',
    navLabel: 'Petrol',
    pageTitle: 'Kids & Teen Petrol Buggies Australia | 90cc - 208cc',
    metaDescription: '90cc to 208cc 4-stroke petrol buggies for kids and teens with adjustable throttle governors and safety harnesses.',
    h1: 'Petrol Kids & Teen Buggies',
    targetKeywords: ['children\'s petrol buggy', 'kids petrol buggy', 'teen buggy'],
    introCopy: '90cc to 208cc petrol buggies for older kids and teens, with governors and tethered kill switches.',
    heroImage: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80',
    itemCount: 2,
    facets: ['power', 'price', 'condition', 'brand']
  },

  // 2.25 - Batteries & Chargers
  {
    id: 'batteries',
    parent: null,
    slug: 'golf-buggy-batteries',
    path: '/golf-buggy-batteries/',
    navLabel: 'Batteries & Chargers',
    pageTitle: 'Golf Buggy Batteries & Chargers Australia',
    metaDescription: 'Replacement lithium and lead-acid golf buggy batteries, chargers and cart battery sets. MGI, Motocaddy, PowaKaddy fitment plus Trojan cart sets. The Buggy Shop.',
    h1: 'Golf Buggy Batteries & Chargers',
    targetKeywords: ['golf buggy battery replacement price', 'lithium battery golf buggy', 'golf buggy battery', 'golf cart batteries'],
    introCopy: 'Genuine and aftermarket replacement batteries by hole-range and brand fitment, plus chargers, battery bags and full ride-on cart battery sets. Lead-acid to lithium upgrades welcome.',
    heroImage: '/images/categories/batteries.jpg',
    itemCount: 0,
    facets: ['batteryRange', 'price', 'condition', 'brand']
  },
  // 2.26 - Buggy Lithium Batteries
  {
    id: 'batteries-buggy-lithium',
    parent: 'batteries',
    slug: 'lithium',
    path: '/golf-buggy-batteries/lithium/',
    navLabel: 'Buggy Lithium Batteries',
    pageTitle: 'Golf Buggy Lithium Batteries | 18 & 36 Hole',
    metaDescription: '12V and 24V lithium battery replacements for MGI, Motocaddy and PowaKaddy electric golf buggies. Lightweight, fast charge.',
    h1: 'Buggy Lithium Batteries',
    targetKeywords: ['lithium battery golf buggy', '36 hole lithium battery', 'MGI lithium battery replacement'],
    introCopy: '12V and 24V lithium packs for MGI, Motocaddy, PowaKaddy and Hillbilly buggies, rated 18 to 36 holes.',
    heroImage: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=1200&q=80',
    itemCount: 8,
    facets: ['batteryRange', 'price', 'condition', 'brand']
  },
  // 2.27 - Buggy Chargers
  {
    id: 'batteries-chargers',
    parent: 'batteries',
    slug: 'chargers',
    path: '/golf-buggy-batteries/chargers/',
    navLabel: 'Chargers & Leads',
    pageTitle: 'Golf Buggy Chargers & Leads Australia',
    metaDescription: 'Smart lithium and lead-acid battery chargers with Australian 3-pin plugs for MGI, Motocaddy, Clicgear and standard buggies.',
    h1: 'Chargers & Leads',
    targetKeywords: ['golf buggy charger', 'electric golf trolley battery charger'],
    introCopy: 'Smart lithium chargers and lead-acid chargers matched to your buggy.',
    heroImage: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=1200&q=80',
    itemCount: 5,
    facets: ['price', 'brand']
  },
  // 2.28 - Golf Cart Battery Sets
  {
    id: 'batteries-cart-sets',
    parent: 'batteries',
    slug: 'cart-sets',
    path: '/golf-buggy-batteries/cart-sets/',
    navLabel: 'Cart Battery Sets',
    pageTitle: 'Ride-On Golf Cart Battery Sets | 48V & Lithium',
    metaDescription: '36V and 48V Trojan deep-cycle and drop-in LiFePO4 lithium battery sets for Club Car, Yamaha, EZGO and ECAR golf carts.',
    h1: 'Cart Battery Sets',
    targetKeywords: ['golf cart battery', '48v golf cart battery', 'trojan golf cart batteries'],
    introCopy: '36V and 48V flooded, AGM and lithium sets for ride-on carts, plus plug-and-play lithium conversion kits.',
    heroImage: 'https://images.unsplash.com/photo-1594495894542-a46cc73e081a?auto=format&fit=crop&w=1200&q=80',
    itemCount: 7,
    facets: ['price', 'brand']
  },

  // 2.29 - Parts & Spares
  {
    id: 'parts',
    parent: null,
    slug: 'golf-buggy-parts',
    path: '/golf-buggy-parts/',
    navLabel: 'Parts & Spares',
    pageTitle: 'Golf Buggy Parts & Spares Australia',
    metaDescription: 'Golf buggy wheels, tyres, motors, controllers and spare parts by brand. MGI, Clicgear, Big Max, Stinger and cart tyres. Fast Australia-wide dispatch. The Buggy Shop.',
    h1: 'Golf Buggy Parts & Spares',
    targetKeywords: ['golf buggy spare parts', 'golf buggy wheels', 'golf buggy parts australia'],
    introCopy: 'Wheels, tyres, motors, gearboxes, controllers and trim by brand and model. If you can name the buggy, we can fit it.',
    heroImage: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=1200&q=80',
    itemCount: 17,
    facets: ['price', 'brand']
  },
  // 2.30 - Wheels & Tyres
  {
    id: 'parts-wheels',
    parent: 'parts',
    slug: 'wheels-tyres',
    path: '/golf-buggy-parts/wheels-tyres/',
    navLabel: 'Wheels & Tyres',
    pageTitle: 'Golf Buggy Wheels & Tyres Australia',
    metaDescription: 'Replacement front and rear wheels, all-terrain winter tyre treads, and golf cart turf tyres for MGI, Clicgear and ride-on carts.',
    h1: 'Wheels & Tyres',
    targetKeywords: ['golf buggy wheels', 'golf buggy tyres', 'golf cart tyres'],
    introCopy: 'Front and rear wheels, winter and all-terrain wheels for buggies, plus turf and DOT tyres for carts.',
    heroImage: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=1200&q=80',
    itemCount: 12,
    facets: ['price', 'brand']
  },
  // 2.31 - Drive & Electrical Spares
  {
    id: 'parts-drive',
    parent: 'parts',
    slug: 'drive-electrical',
    path: '/golf-buggy-parts/drive-electrical/',
    navLabel: 'Drive & Electrical',
    pageTitle: 'Golf Buggy Motors, Controllers & Electrical Spares',
    metaDescription: 'Replacement 12V and 24V motors, digital speed controllers, axle gearboxes and top-box handles for electric buggies.',
    h1: 'Drive & Electrical Spares',
    targetKeywords: ['golf buggy motor', 'golf buggy controller', 'golf buggy parts'],
    introCopy: 'Motors, gearboxes, controllers, handles and wiring for electric buggies.',
    heroImage: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=1200&q=80',
    itemCount: 5,
    facets: ['price', 'brand']
  },
  // 2.32 - Repairs & Servicing (Bookable service page)
  {
    id: 'parts-service',
    parent: 'parts',
    slug: 'golf-buggy-repairs',
    path: '/golf-buggy-repairs/',
    navLabel: 'Repairs & Servicing',
    pageTitle: 'Golf Buggy Repairs & Servicing Australia',
    metaDescription: 'Book a professional golf buggy repair or service with Australian technicians. Battery health checks, motor diagnostics, wheel alignment.',
    h1: 'Golf Buggy Repairs & Servicing',
    targetKeywords: ['golf buggy repairs', 'golf buggy service', 'golf buggy repairs near me'],
    introCopy: 'Book a service or repair for any make of buggy or cart. Battery health checks, motor and wheel replacement, controller diagnostics.',
    isBookableService: true,
    heroImage: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=1200&q=80',
    itemCount: 0,
    facets: []
  },

  // 2.33 - Accessories
  {
    id: 'accessories',
    parent: null,
    slug: 'golf-buggy-accessories',
    path: '/golf-buggy-accessories/',
    navLabel: 'Accessories',
    pageTitle: 'Golf Buggy Accessories Australia',
    metaDescription: 'Golf buggy accessories: umbrella holders, drink holders, GPS mounts, seats, footboards, travel covers and all-terrain wheel kits. The Buggy Shop, Australia-wide.',
    h1: 'Golf Buggy Accessories',
    targetKeywords: ['golf buggy accessories', 'golf buggy accessories australia'],
    introCopy: 'Holders, seats, covers and upgrade kits to finish off your buggy. Most parts are brand-specific, so filter by your buggy.',
    heroImage: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=1200&q=80',
    itemCount: 23,
    facets: ['price', 'brand']
  },

  // 2.34 - Shop by Brand
  {
    id: 'brands',
    parent: null,
    slug: 'brands',
    path: '/brands/',
    navLabel: 'Brands',
    pageTitle: 'Shop Golf Buggies by Brand',
    metaDescription: 'Browse golf buggies and carts by brand: MGI, Motocaddy, PowaKaddy, Stinger, Alphard, Clicgear, Big Max, ECAR, Club Car and more. The Buggy Shop, Australia.',
    h1: 'Shop by Brand',
    targetKeywords: ['mgi golf buggy', 'motocaddy australia', 'powakaddy australia'],
    introCopy: 'Every brand we stock, with its full range and matching spare parts on one page.',
    heroImage: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=1200&q=80',
    itemCount: 0,
    facets: ['brand']
  },

  // 2.35 - Used Golf Buggies
  {
    id: 'used-buggies',
    parent: null,
    slug: 'used-golf-buggies',
    path: '/used-golf-buggies/',
    navLabel: 'Used Buggies',
    pageTitle: 'Used & Ex-Demo Golf Buggies for Sale Australia',
    metaDescription: 'Second hand and ex-demo electric golf buggies, checked and warranted. MGI, Motocaddy and PowaKaddy trade-ins. The Buggy Shop, Australia-wide delivery.',
    h1: 'Used & Ex-Demo Golf Buggies',
    targetKeywords: ['used golf buggy for sale', 'second hand golf buggies for sale', 'golf buggy for sale used'],
    introCopy: 'Ex-demo and trade-in electric buggies, fully tested with a fresh battery health report and a short warranty. Stock changes weekly.',
    heroImage: '/images/categories/used-golf-buggies.jpg',
    itemCount: 8,
    facets: ['power', 'wheels', 'condition', 'price', 'brand']
  },

  // 2.36 - Golf Clubs
  {
    id: 'golf-clubs',
    parent: null,
    slug: 'golf-clubs',
    path: '/golf-clubs/',
    navLabel: 'Golf Clubs',
    pageTitle: 'Golf Clubs for Sale Australia | Sets, Drivers, Irons & Putters',
    metaDescription: 'Shop complete golf package sets, drivers, iron sets, wedges and putters at The Buggy Shop.',
    h1: 'Golf Clubs',
    targetKeywords: ['golf clubs for sale australia', 'complete golf club set', 'golf driver'],
    introCopy: 'Quality golf club sets for juniors, beginners, ladies and experienced players.',
    heroImage: '/images/placeholder.webp',
    itemCount: 7,
    facets: ['price', 'brand']
  },
  // Subcategories for Accessories
  {
    id: 'acc-bags',
    parent: 'accessories',
    slug: 'bags',
    path: '/golf-buggy-accessories/bags/',
    navLabel: 'Golf Bags',
    pageTitle: 'Golf Cart & Stand Bags Australia',
    metaDescription: '14-way cart bags, lightweight stand bags and travel covers.',
    h1: 'Golf Bags',
    targetKeywords: ['golf cart bag', 'golf stand bag', 'golf travel bag'],
    introCopy: '14-way cart bags, waterproof stand bags, and travel covers designed for golf buggies.',
    heroImage: '/images/placeholder.webp',
    itemCount: 4,
    facets: ['price', 'brand']
  },
  {
    id: 'acc-balls',
    parent: 'accessories',
    slug: 'golf-balls',
    path: '/golf-buggy-accessories/golf-balls/',
    navLabel: 'Golf Balls',
    pageTitle: 'Premium Golf Balls Australia',
    metaDescription: 'Titleist Pro V1, TaylorMade TP5, Srixon Z-Star golf balls.',
    h1: 'Golf Balls',
    targetKeywords: ['titleist pro v1', 'taylormade tp5', 'srixon z-star'],
    introCopy: 'Dozen packs of tour-tier and distance golf balls.',
    heroImage: '/images/placeholder.webp',
    itemCount: 3,
    facets: ['price', 'brand']
  },
  {
    id: 'acc-rangefinders',
    parent: 'accessories',
    slug: 'rangefinders-gps',
    path: '/golf-buggy-accessories/rangefinders-gps/',
    navLabel: 'Rangefinders & GPS',
    pageTitle: 'Golf Laser Rangefinders & GPS Watches',
    metaDescription: 'Bushnell, Garmin, Precision Pro rangefinders and Shot Scope watches.',
    h1: 'Rangefinders & GPS Watches',
    targetKeywords: ['golf rangefinder', 'garmin approach', 'bushnell tour v5'],
    introCopy: 'Accurate laser rangefinders and GPS golf watches for pin-point yardages.',
    heroImage: '/images/placeholder.webp',
    itemCount: 6,
    facets: ['price', 'brand']
  },
  {
    id: 'acc-practice',
    parent: 'accessories',
    slug: 'practice-aids',
    path: '/golf-buggy-accessories/practice-aids/',
    navLabel: 'Practice Aids',
    pageTitle: 'Golf Putting Mats & Hitting Nets Australia',
    metaDescription: 'Home golf practice nets, putting mats and hitting mats.',
    h1: 'Practice Aids',
    targetKeywords: ['golf putting mat', 'golf practice net', 'golf hitting mat'],
    introCopy: 'Home putting greens and hitting nets to practice your game anywhere.',
    heroImage: '/images/placeholder.webp',
    itemCount: 3,
    facets: ['price', 'brand']
  },
  // Subcategories for Golf Clubs
  {
    id: 'clubs-complete',
    parent: 'golf-clubs',
    slug: 'complete-sets',
    path: '/golf-clubs/complete-sets/',
    navLabel: 'Complete Package Sets',
    pageTitle: 'Complete Golf Package Sets Australia',
    metaDescription: 'Beginner, junior and ladies complete package sets with bag.',
    h1: 'Complete Golf Package Sets',
    targetKeywords: ['complete golf club set', 'junior golf club set'],
    introCopy: 'All-in-one package sets including drivers, woods, irons, putter and cart bag.',
    heroImage: '/images/placeholder.webp',
    itemCount: 3,
    facets: ['price', 'brand']
  },
  {
    id: 'clubs-woods-irons',
    parent: 'golf-clubs',
    slug: 'woods-and-irons',
    path: '/golf-clubs/woods-and-irons/',
    navLabel: 'Woods & Irons',
    pageTitle: 'Golf Drivers, Fairways & Iron Sets Australia',
    metaDescription: 'Drivers, fairway woods and iron sets for all handicap levels.',
    h1: 'Woods & Irons',
    targetKeywords: ['golf driver', 'golf iron set'],
    introCopy: 'High-launch drivers and forged iron sets designed for distance and forgiveness.',
    heroImage: '/images/placeholder.webp',
    itemCount: 2,
    facets: ['price', 'brand']
  },
  {
    id: 'clubs-wedges-putters',
    parent: 'golf-clubs',
    slug: 'wedges-and-putters',
    path: '/golf-clubs/wedges-and-putters/',
    navLabel: 'Wedges & Putters',
    pageTitle: 'Golf Wedges & Putters Australia',
    metaDescription: 'Precision wedges and mallet/blade putters.',
    h1: 'Wedges & Putters',
    targetKeywords: ['golf wedge', 'golf putter'],
    introCopy: 'Short game scoring clubs: high-spin wedges and precision alignment putters.',
    heroImage: '/images/placeholder.webp',
    itemCount: 2,
    facets: ['price', 'brand']
  }
];

// Helper functions for categories
export function getCategoryBySlug(slug) {
  if (!slug) return null;
  const cleanSlug = slug.replace(/^\/|\/$/g, '');
  return CATEGORY_TREE.find(c => c.slug === cleanSlug || c.path === `/${cleanSlug}/` || c.id === cleanSlug);
}

export function getSubcategories(parentId) {
  return CATEGORY_TREE.filter(c => c.parent === parentId);
}

export function getRootCategories() {
  return CATEGORY_TREE.filter(c => c.parent === null);
}
