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
    pageTitle: 'Electric Golf Buggy for Sale Australia | Lithium Buggies',
    metaDescription: 'Electric golf buggy for sale in Australia. Motorised walk-behind, remote and GPS lithium buggies from MGI, Motocaddy and PowaKaddy. Shop with warranty.',
    h1: 'Electric Golf Buggies for Sale',
    targetKeywords: ['electric golf buggy for sale', 'battery golf buggies', 'motorised golf buggy for sale', 'estate electric golf buggy', 'motorised golf buggy', 'electric golf'],
    introCopy: 'Electric golf buggies are battery-powered golf trolleys that carry your clubs and drive themselves. Most are lithium powered, fold for the boot and cover 18 to 36 holes on one charge. Electric golf buggies do the carrying so you can focus on your round. Our range covers walk-behind lithium models, hands-free remote-control buggies and GPS follow buggies from the brands Australian golfers trust. Every buggy ships with an Australian warranty and local service support.',
    heroImage: '/images/categories/electric-golf-buggies.webp',
    facets: ['power', 'wheels', 'batteryRange', 'weight', 'price', 'foldSize', 'condition', 'brand']
  },
  // 2.2 - Walk-behind Electric Buggies
  {
    id: 'electric-walk-behind',
    parent: 'electric-golf-buggies',
    slug: 'walk-behind',
    path: '/electric-golf-buggies/walk-behind/',
    navLabel: 'Walk-behind Electric',
    pageTitle: 'Electric Golf Trolley Australia | Walk-Behind Buggies',
    metaDescription: 'Electric golf trolley in Australia. Walk-behind motorised buggies with lithium batteries, fold-flat frames and warranty. Compare models and shop now.',
    h1: 'Electric Golf Trolleys',
    targetKeywords: ['electric golf trolley', 'battery trolley', 'estate electric golf trolley', 'golf caddy electric', 'electric caddies', 'smart golf trolley'],
    introCopy: 'An electric golf trolley is a walk-behind buggy with a battery motor that pulls your clubs for you. You steer by hand and the motor does the work uphill. Push-button simple: set the speed, walk beside it, let the buggy carry the bag. These are the lightest, best-value way into an electric buggy, folding down to fit any boot.',
    heroImage: '/images/categories/electric-golf-buggies.webp',
    facets: ['power', 'wheels', 'batteryRange', 'weight', 'price', 'foldSize', 'condition', 'brand']
  },
  // 2.3 - Remote-control Golf Buggies
  {
    id: 'remote-control-golf-buggies',
    parent: 'electric-golf-buggies',
    slug: 'remote-control-golf-buggies',
    path: '/remote-control-golf-buggies/',
    navLabel: 'Remote-control Buggies',
    pageTitle: 'Remote Control Golf Buggy Australia | Hands-Free Buggies',
    metaDescription: 'Remote control golf buggy in Australia. Hands-free electric buggies with handset steering and lithium power. Compare models and order with delivery.',
    h1: 'Remote Control Golf Buggies',
    targetKeywords: ['remote control golf buggy', 'remote control electric golf buggy', 'remote control golf buggy for sale', 'remote golf buggy', 'electric golf buggy with remote', 'remote controlled golf buggy'],
    introCopy: 'A remote control golf buggy is an electric golf buggy you steer with a handset, so it drives ahead of you down the fairway. You walk free of the buggy and it follows your commands. Steer the buggy with a handset while you walk ahead, line up your next shot or clear a bunker. Our remote-control range covers everything from first-time remote buggies to all-terrain dual-motor models built for hilly Australian courses.',
    heroImage: '/images/categories/remote-control-golf-buggies.webp',
    facets: ['power', 'wheels', 'batteryRange', 'weight', 'price', 'foldSize', 'condition', 'brand']
  },
  // 2.4 - GPS & Follow Buggies
  {
    id: 'gps-follow-buggies',
    parent: 'electric-golf-buggies',
    slug: 'gps-follow-buggies',
    path: '/gps-follow-buggies/',
    navLabel: 'GPS & Follow Buggies',
    pageTitle: 'Follow Me Golf Buggy Australia | GPS & Auto-Follow',
    metaDescription: 'Follow me golf buggy in Australia. Autonomous follow and GPS golf buggies that track you around the course. Compare models and shop with warranty.',
    h1: 'Follow Me Golf Buggies with GPS',
    targetKeywords: ['follow me golf buggy', 'automatic golf buggy'],
    introCopy: 'A follow me golf buggy is an electric buggy that tracks you with a sensor or handset and drives behind you automatically. GPS models also show distances to the green on a screen. The buggy tracks you with a smart handset or magnetic sensor and rolls along behind, hands free. Onboard GPS models add course distances without a second device.',
    heroImage: '/images/categories/gps-follow-buggies.webp',
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
    heroImage: '/images/categories/electric-golf-buggies.webp',
    facets: ['power', 'price', 'condition', 'brand']
  },

  // 2.6 - Push & Pull Buggies
  {
    id: 'push-pull-golf-buggies',
    parent: null,
    slug: 'push-pull-golf-buggies',
    path: '/push-pull-golf-buggies/',
    navLabel: 'Push & Pull Buggies',
    pageTitle: 'Golf Push Buggy for Sale Australia | Push & Pull Buggies',
    metaDescription: 'Golf push buggy for sale in Australia. Lightweight 3-wheel and 4-wheel push and pull buggies from Clicgear, Big Max and QOD. Prices from $450.',
    h1: 'Golf Push Buggies for Sale',
    targetKeywords: ['golf push buggy', 'golf bag and buggy', 'push golf buggy for sale', 'golf pull buggy', 'push buggy', 'pull buggy'],
    introCopy: 'A golf push buggy is a manual, wheeled cart you push or pull while you walk, carrying your golf bag on a frame. Push buggies fold flat for the boot and need no battery. No batteries, no fuss. A good push buggy rolls straight, folds in seconds and lasts for years. We stock the premium 3-wheel and 4-wheel models that hold their value, and skip the throwaway trolleys.',
    heroImage: '/images/categories/push-pull-golf-buggies.webp',
    facets: ['power', 'wheels', 'weight', 'price', 'foldSize', 'condition', 'brand']
  },
  // 2.7 - 3-wheel Push Buggies
  {
    id: 'push-3-wheel',
    parent: 'push-pull-golf-buggies',
    slug: '3-wheel',
    path: '/push-pull-golf-buggies/3-wheel/',
    navLabel: '3-wheel',
    pageTitle: '3 Wheel Golf Buggy for Sale Australia | Push Buggies',
    metaDescription: '3 wheel golf buggy for sale in Australia. Easy-steering push buggies from Clicgear and others, with local support and delivery. Shop 3 wheel buggies.',
    h1: '3 Wheel Golf Buggies',
    targetKeywords: ['three wheel golf buggy', '3 wheel golf buggy', 'three wheel golf cart', '3 wheel golf cart', 'golf three wheel trolley'],
    introCopy: 'A 3 wheel golf buggy is a push buggy with one front wheel and two rear wheels. It steers easily on tight turns and folds compactly for the boot. The classic setup: two wheels behind, one steering wheel in front for easy one-hand turns. Light, manoeuvrable and the quickest to fold.',
    heroImage: '/images/categories/push-pull-golf-buggies.webp',
    facets: ['wheels', 'weight', 'price', 'foldSize', 'condition', 'brand']
  },
  // 2.8 - 4-wheel & Flat-fold Push Buggies
  {
    id: 'push-4-wheel',
    parent: 'push-pull-golf-buggies',
    slug: '4-wheel',
    path: '/push-pull-golf-buggies/4-wheel/',
    navLabel: '4-wheel & Compact',
    pageTitle: 'Foldable Golf Buggy Australia | Compact 4 Wheel Buggies',
    metaDescription: 'Foldable golf buggy for sale in Australia. Compact 4 wheel push buggies that fold flat for the boot. Compare folding golf buggies and order online.',
    h1: 'Foldable Golf Buggies',
    targetKeywords: ['foldable golf buggy', 'folding golf buggy', 'collapsible golf buggy'],
    introCopy: 'A foldable golf buggy is a push buggy that collapses to a flat, compact size so it fits in a car boot. Four-wheel designs fold flatter and stand on their own. Four wheels track dead straight across slopes and never tip when you stop. Flat-fold models pack down thinner than a golf bag.',
    heroImage: '/images/categories/push-pull-golf-buggies.webp',
    facets: ['wheels', 'weight', 'price', 'foldSize', 'condition', 'brand']
  },
  // 2.9 - Golf Trolleys (synonym landing page)
  {
    id: 'golf-trolleys',
    parent: 'push-pull-golf-buggies',
    slug: 'golf-trolleys',
    path: '/golf-trolleys/',
    navLabel: 'Golf Trolleys',
    pageTitle: 'Golf Trolley for Sale Australia | Push & Electric',
    metaDescription: 'Golf trolley for sale in Australia. Shop electric and push golf trolleys with warranty and nationwide delivery. Compare models and buy online today.',
    h1: 'Golf Trolleys for Sale',
    targetKeywords: ['golf trolley', 'golf troley'],
    introCopy: 'A golf trolley is a wheeled frame that carries your golf bag while you walk. Push trolleys are manual, and electric golf trolleys have a battery motor. "Trolley" or "buggy", it is the same thing. This page brings together our full push and electric trolley range for shoppers who call it a trolley.',
    heroImage: '/images/categories/push-pull-golf-buggies.webp',
    facets: ['power', 'wheels', 'weight', 'price', 'condition', 'brand']
  },

  // 2.10 - Ride-On Golf Carts
  {
    id: 'luxury-golf-carts',
    parent: null,
    slug: 'luxury-golf-carts',
    path: '/luxury-golf-carts/',
    navLabel: 'Ride-On Golf Carts',
    pageTitle: 'Golf Cart for Sale Australia | 2, 4 & 6 Seat Carts',
    metaDescription: 'Golf cart for sale in Australia. New and used 2, 4 and 6 seat electric golf carts with warranty and tail-lift delivery. Compare models and shop golf carts.',
    h1: 'Golf Carts for Sale in Australia',
    targetKeywords: ['golf cart', 'electric golf carts for sale', 'golf carts for sale', 'golf buggy with seat', 'electric ride on golf buggy', 'buy golf cart'],
    introCopy: 'A golf cart is a small ride-on electric vehicle that carries two to six people, used on golf courses, estates and farms. Most run on a 48V battery. Sit-in electric carts for the course, the resort, the farm or the estate. From value 2-seaters to lifted 6-seat transporters and street-legal luxury carts, with finance and Australia-wide freight.',
    heroImage: '/images/categories/luxury-golf-carts.webp',
    facets: ['seats', 'power', 'condition', 'price', 'brand']
  },
  // 2.11 - 2-Seat Golf Carts
  {
    id: 'carts-2-seat',
    parent: 'luxury-golf-carts',
    slug: '2-seat',
    path: '/golf-carts/2-seat/',
    navLabel: '2-Seat',
    pageTitle: '2 Seater Buggy for Sale Australia | 2 Seat Golf Carts',
    metaDescription: '2 seater buggy for sale in Australia. Electric 2 seat golf carts for courses, farms and estates, with lithium power and warranty. Browse 2 seat carts.',
    h1: '2 Seater Buggies and Golf Carts for Sale',
    targetKeywords: ['2 seater buggy for sale', '2 seater electric buggy', '2 seater electric golf carts'],
    introCopy: 'A 2 seater buggy is a compact electric golf cart that carries a driver and one passenger. It suits golf courses, farms and larger properties. The standard course cart: two seats, a bag rack and enough range for 36 holes.',
    heroImage: '/images/categories/luxury-golf-carts.webp',
    facets: ['power', 'condition', 'price', 'brand']
  },
  // 2.12 - 4 & 6-Seat Golf Carts
  {
    id: 'carts-4-6-seat',
    parent: 'luxury-golf-carts',
    slug: '4-6-seat',
    path: '/golf-carts/4-6-seat/',
    navLabel: '4 & 6-Seat',
    pageTitle: '4 & 6-Seat Golf Carts for Sale Australia',
    metaDescription: '4-passenger and 6-passenger electric golf carts. Resort transporters, family buggies and estate cruisers with lithium batteries.',
    h1: '4 & 6-Seat Golf Carts',
    targetKeywords: ['4 seater golf cart', '6 seat golf cart', 'family golf cart'],
    introCopy: 'Rear-facing or forward-facing extra seats for families, resorts and clubs.',
    heroImage: '/images/categories/luxury-golf-carts.webp',
    facets: ['seats', 'power', 'condition', 'price', 'brand']
  },
  // 2.13 - Lifted & All-Terrain Carts
  {
    id: 'carts-lifted',
    parent: 'luxury-golf-carts',
    slug: 'lifted-all-terrain',
    path: '/golf-carts/lifted-all-terrain/',
    navLabel: 'Lifted & All-Terrain',
    pageTitle: 'Lifted & All-Terrain Golf Carts Australia',
    metaDescription: 'Lifted golf carts with knobby all-terrain tyres, heavy-duty suspension and extra ground clearance for paddocks, trails and estates.',
    h1: 'Lifted & All-Terrain Carts',
    targetKeywords: ['lifted golf cart', 'all terrain golf cart', 'off road golf cart'],
    introCopy: 'Raised suspension, knobby tyres and more ground clearance for tracks, paddocks and the beach path.',
    heroImage: '/images/categories/luxury-golf-carts.webp',
    facets: ['seats', 'power', 'condition', 'price', 'brand']
  },
  // 2.14 - Utility & Commercial Carts
  {
    id: 'carts-utility',
    parent: 'luxury-golf-carts',
    slug: 'utility',
    path: '/golf-carts/utility/',
    navLabel: 'Utility & Commercial',
    pageTitle: 'Electric Utility Cart Australia | Commercial Carts',
    metaDescription: 'Electric utility cart for sale in Australia. Commercial and farm carts with cargo beds and lithium power, backed by local warranty. Browse utility carts.',
    h1: 'Electric Utility Carts for Sale',
    targetKeywords: ['electric utility cart', 'electric commercial carts', 'electric utility cart for sale'],
    introCopy: 'An electric utility cart is a battery-powered work vehicle with a cargo bed for hauling tools, stock and supplies. Lithium models need no fuel and run quietly. Cargo beds, tipper trays and load ratings for wineries, retirement villages, factories and councils.',
    heroImage: '/images/categories/luxury-golf-carts.webp',
    facets: ['power', 'condition', 'price', 'brand']
  },
  // 2.15 - Used & Ex-Fleet Carts
  {
    id: 'carts-used',
    parent: 'luxury-golf-carts',
    slug: 'used',
    path: '/golf-carts/used/',
    navLabel: 'Used & Ex-Fleet',
    pageTitle: 'Used & Ex-Fleet Golf Carts for Sale Australia',
    metaDescription: 'Refurbished ex-lease Club Car, Yamaha and E-Z-GO golf carts for sale with fresh batteries and workshop warranties.',
    h1: 'Used & Ex-Fleet Carts',
    targetKeywords: ['used golf cart for sale australia', 'second hand golf cart', 'ex fleet golf cart'],
    introCopy: 'Ex-lease and refurbished Club Car, Yamaha and E-Z-GO carts, checked and reconditioned.',
    heroImage: '/images/categories/luxury-golf-carts.webp',
    facets: ['seats', 'condition', 'price', 'brand']
  },

  // 2.16 - Off-Road & Recreational Buggies
  {
    id: 'off-road-buggies',
    parent: null,
    slug: 'off-road-buggies',
    path: '/off-road-buggies/',
    navLabel: 'Off-Road Buggies',
    pageTitle: 'Off Road Buggies for Sale Australia | Dune, UTV & Farm',
    metaDescription: 'Off road buggies for sale in Australia. Dune buggies, side by sides, farm UTVs and kids buggies with local support and delivery. Shop off road buggies.',
    h1: 'Off Road Buggies for Sale in Australia',
    targetKeywords: ['off road buggies', 'off road buggy for sale', 'off road buggies for sale australia', 'offroad buggy for sale', 'dirt buggy', 'atv buggy for sale'],
    introCopy: 'Off road buggies are rugged recreation and work vehicles built for sand, dirt and farm tracks. The range covers dune buggies, side-by-side UTVs and petrol or electric farm buggies. Buggies built for sand, dirt and paddocks. Petrol dune buggies, side-by-side UTVs, classic beach buggies and electric farm buggies, from kids models up to premium performance machines.',
    heroImage: '/images/categories/off-road-buggies.webp',
    facets: ['power', 'seats', 'condition', 'price', 'brand']
  },
  // 2.17 - Dune Buggies
  {
    id: 'dune-buggies',
    parent: 'off-road-buggies',
    slug: 'dune-buggies',
    path: '/off-road-buggies/dune-buggies/',
    navLabel: 'Dune Buggies',
    pageTitle: 'Dune Buggies for Sale Australia | Beach & Sand Buggies',
    metaDescription: 'Dune buggies for sale in Australia. Petrol dune and beach buggies for sand, dirt and tracks, with local support and delivery. Shop dune buggies today.',
    h1: 'Dune Buggies and Beach Buggies for Sale',
    targetKeywords: ['dune buggies for sale', 'beach buggy for sale australia', 'dune buggy kart', 'dune buggies for sale in australia', 'buggy dune buggy'],
    introCopy: 'A dune buggy, also called a beach buggy, is a light off-road vehicle with big rear tyres built for sand and dirt. Petrol models range from 110cc to 300cc. Lightweight 150cc to 300cc petrol buggies with roll cages, built for sand dunes and fire trails.',
    heroImage: '/images/categories/off-road-buggies.webp',
    facets: ['power', 'price', 'condition', 'brand']
  },
  // 2.18 - Side-by-Side / UTV Buggies
  {
    id: 'side-by-side-buggies',
    parent: 'off-road-buggies',
    slug: 'side-by-side',
    path: '/off-road-buggies/side-by-side/',
    navLabel: 'Side-by-Side / UTV',
    pageTitle: 'Side by Side Buggy for Sale Australia | UTV Range',
    metaDescription: 'Side by side buggy for sale in Australia. Polaris, Can-Am, Yamaha, CFMOTO and more, with local support and delivery. Compare side by side UTVs.',
    h1: 'Side by Side Buggies and UTVs for Sale',
    targetKeywords: ['side by side buggy for sale', 'side by side buggy for sale qld', 'side by side farm buggy', 'side by side buggy for sale australia'],
    introCopy: 'A side by side buggy, or UTV, is a four-wheel off-road vehicle with two seats side by side, used for farm work and recreation. It carries more and goes further than a quad. Two to four seats side by side, cargo bed, roll-over protection. Recreational models through to 1000cc performance UTVs.',
    heroImage: '/images/categories/off-road-buggies.webp',
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
    targetKeywords: ['beach buggy', 'beach buggies for sale australia'],
    introCopy: 'From registered classic VW-based beach buggies to modern all-terrain buggies with sand tyres. Complete road-registered cars, restoration projects and fibreglass body kits.',
    heroImage: '/images/categories/off-road-buggies.webp',
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
    metaDescription: 'Farm buggies for sale in Australia. Electric and petrol farm UTVs for paddock and property work, with local warranty and delivery. Shop farm buggies.',
    h1: 'Farm Buggies for Sale',
    targetKeywords: ['farm buggies for sale', 'electric farm buggy for sale australia'],
    introCopy: 'A farm buggy is a utility vehicle for property and paddock work, available as an electric or petrol UTV. It carries tools, stock feed and passengers across rough ground. Work buggies for properties: full-time 4WD, tow ratings, tipper trays and long service intervals. Electric models cut running costs to near zero and run silent around stock.',
    heroImage: '/images/categories/off-road-buggies.webp',
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
    targetKeywords: ['petrol 2 seater buggy'],
    introCopy: 'Petrol-powered two-seat buggies for trail riding and property use, roll cage and disc brakes standard.',
    heroImage: '/images/categories/off-road-buggies.webp',
    facets: ['power', 'price', 'condition', 'brand']
  },

  // 2.22 - Kids' Ride-On Buggies
  {
    id: 'kids-buggies',
    parent: null,
    slug: 'kids-buggies',
    path: '/kids-buggies/',
    navLabel: 'Kids\' Buggies',
    pageTitle: 'Kids Buggy for Sale Australia | Electric & Petrol',
    metaDescription: 'Kids buggy for sale in Australia. Electric and petrol ride-on off-road buggies and UTVs for children and teens, with local support. Shop kids buggies.',
    h1: 'Kids Buggies for Sale',
    targetKeywords: ['kids buggy for sale', 'kids atv buggy', 'buggies for kids', 'children\'s petrol buggy', 'utv for kids', 'kids electric utv'],
    introCopy: 'A kids buggy is a small electric or petrol ride-on off-road vehicle for children and teens. Electric models are quieter than petrol and run on a rechargeable battery. Proper off-road buggies scaled for kids and teens, not plastic toys. Roll cages, seat belts, adjustable speed limits and adult remote cut-off on the electric models.',
    heroImage: '/images/categories/kids-buggies.webp',
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
    heroImage: '/images/categories/kids-buggies.webp',
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
    targetKeywords: ['kids petrol buggy', 'teen buggy'],
    introCopy: '90cc to 208cc petrol buggies for older kids and teens, with governors and tethered kill switches.',
    heroImage: '/images/categories/kids-buggies.webp',
    facets: ['power', 'price', 'condition', 'brand']
  },

  // 2.25 - Batteries & Chargers
  {
    id: 'batteries', parent: null, slug: 'batteries',
    path: '/batteries/',
    navLabel: 'Batteries & Chargers',
    pageTitle: 'Golf Buggy Batteries & Chargers Australia',
    metaDescription: 'Replacement lithium and lead-acid golf buggy batteries, chargers and cart battery sets. MGI, Motocaddy, PowaKaddy fitment plus Trojan cart sets. The Buggy Shop.',
    h1: 'Golf Buggy Batteries & Chargers',
    targetKeywords: ['golf buggy battery replacement price', 'lithium battery golf buggy', 'golf buggy battery', 'golf cart batteries'],
    introCopy: 'Genuine and aftermarket replacement batteries by hole-range and brand fitment, plus chargers, battery bags and full ride-on cart battery sets. Lead-acid to lithium upgrades welcome.',
    heroImage: '/images/categories/batteries.webp',
    facets: ['batteryRange', 'price', 'condition', 'brand']
  },
  // 2.26 - Buggy Lithium Batteries
  {
    id: 'batteries-buggy-lithium',
    parent: 'batteries',
    slug: 'lithium',
    path: '/batteries/lithium/',
    navLabel: 'Buggy Lithium Batteries',
    pageTitle: 'Golf Buggy Lithium Batteries | 18 & 36 Hole',
    metaDescription: '12V and 24V lithium battery replacements for MGI, Motocaddy and PowaKaddy electric golf buggies. Lightweight, fast charge.',
    h1: 'Buggy Lithium Batteries',
    targetKeywords: ['lithium battery golf buggy', '36 hole lithium battery', 'MGI lithium battery replacement'],
    introCopy: '12V and 24V lithium packs for MGI, Motocaddy, PowaKaddy and Hillbilly buggies, rated 18 to 36 holes.',
    heroImage: '/images/categories/batteries.webp',
    facets: ['batteryRange', 'price', 'condition', 'brand']
  },
  // 2.27 - Buggy Chargers
  {
    id: 'batteries-chargers',
    parent: 'batteries',
    slug: 'chargers',
    path: '/batteries/chargers/',
    navLabel: 'Chargers & Leads',
    pageTitle: 'Golf Buggy Charger Australia | Lithium & Lead-Acid',
    metaDescription: 'Golf buggy charger in Australia. Lithium and lead-acid smart chargers and leads for MGI and other electric buggies. Match your battery and order today.',
    h1: 'Golf Buggy Chargers',
    targetKeywords: ['golf buggy charger'],
    introCopy: 'A golf buggy charger refills your buggy battery. Lithium and lead-acid batteries need different chargers, so match the charger to your battery type. Smart lithium chargers and lead-acid chargers matched to your buggy.',
    heroImage: '/images/categories/batteries.webp',
    facets: ['price', 'brand']
  },
  // 2.28 - Golf Cart Battery Sets
  {
    id: 'batteries-cart-sets',
    parent: 'batteries',
    slug: 'cart-sets',
    path: '/batteries/cart-sets/',
    navLabel: 'Cart Battery Sets',
    pageTitle: 'Ride-On Golf Cart Battery Sets | 48V & Lithium',
    metaDescription: '36V and 48V Trojan deep-cycle and drop-in LiFePO4 lithium battery sets for Club Car, Yamaha, EZGO and ECAR golf carts.',
    h1: 'Cart Battery Sets',
    targetKeywords: ['golf cart battery', '48v golf cart battery', 'trojan golf cart batteries'],
    introCopy: '36V and 48V flooded, AGM and lithium sets for ride-on carts, plus plug-and-play lithium conversion kits.',
    heroImage: '/images/categories/batteries.webp',
    facets: ['price', 'brand']
  },

  // 2.29 - Parts & Spares
  {
    id: 'parts', parent: null, slug: 'parts',
    path: '/parts/',
    navLabel: 'Parts & Spares',
    pageTitle: 'Golf Buggy Parts & Spares Australia',
    metaDescription: 'Golf buggy wheels, tyres, motors, controllers and spare parts by brand. MGI, Clicgear, Big Max, Stinger and cart tyres. Fast Australia-wide dispatch. The Buggy Shop.',
    h1: 'Golf Buggy Parts & Spares',
    targetKeywords: ['golf buggy spare parts', 'golf buggy wheels', 'golf buggy parts australia'],
    introCopy: 'Wheels, tyres, motors, gearboxes, controllers and trim by brand and model. If you can name the buggy, we can fit it.',
    heroImage: '/images/categories/parts.webp',
    facets: ['price', 'brand']
  },
  // 2.30 - Wheels & Tyres
  {
    id: 'parts-wheels',
    parent: 'parts',
    slug: 'wheels-tyres',
    path: '/parts/wheels-tyres/',
    navLabel: 'Wheels & Tyres',
    pageTitle: 'Golf Buggy Wheels & Tyres Australia',
    metaDescription: 'Replacement front and rear wheels, all-terrain winter tyre treads, and golf cart turf tyres for MGI, Clicgear and ride-on carts.',
    h1: 'Wheels & Tyres',
    targetKeywords: ['golf buggy wheels', 'golf buggy tyres', 'golf cart tyres'],
    introCopy: 'Front and rear wheels, winter and all-terrain wheels for buggies, plus turf and DOT tyres for carts.',
    heroImage: '/images/categories/parts.webp',
    facets: ['price', 'brand']
  },
  // 2.31 - Drive & Electrical Spares
  {
    id: 'parts-drive',
    parent: 'parts',
    slug: 'drive-electrical',
    path: '/parts/drive-electrical/',
    navLabel: 'Drive & Electrical',
    pageTitle: 'Golf Buggy Motors, Controllers & Electrical Spares',
    metaDescription: 'Replacement 12V and 24V motors, digital speed controllers, axle gearboxes and top-box handles for electric buggies.',
    h1: 'Drive & Electrical Spares',
    targetKeywords: ['golf buggy motor', 'golf buggy controller', 'golf buggy parts'],
    introCopy: 'Motors, gearboxes, controllers, handles and wiring for electric buggies.',
    heroImage: '/images/categories/parts.webp',
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
    heroImage: '/images/categories/parts.webp',
    facets: []
  },

  // 2.33 - Accessories
  {
    id: 'accessories', parent: null, slug: 'accessories',
    path: '/accessories/',
    navLabel: 'Accessories',
    pageTitle: 'Golf Buggy Accessories Australia | Holders, Bags & More',
    metaDescription: 'Golf buggy accessories in Australia: umbrella and drink holders, bags, covers and wheel upgrades. Save 5% on accessories when you buy a buggy or cart.',
    h1: 'Golf Buggy Accessories',
    targetKeywords: ['golf buggy accessories', 'golf buggy accessories australia'],
    introCopy: 'Golf buggy accessories are add-ons that fit your push buggy or cart, such as umbrella holders, drink holders, bags, covers and upgraded wheels. Most fit the major buggy brands. Holders, seats, covers and upgrade kits to finish off your buggy. Most parts are brand-specific, so filter by your buggy.',
    heroImage: '/images/categories/accessories.webp',
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
    heroImage: '/images/placeholder.webp',
    facets: ['brand']
  },

  // 2.35 - Used Golf Buggies
  {
    id: 'used-buggies',
    parent: null,
    slug: 'used-golf-buggies',
    path: '/used-golf-buggies/',
    navLabel: 'Used Buggies',
    pageTitle: 'Used Golf Buggy for Sale Australia | Ex-Demo & Used',
    metaDescription: 'Used golf buggy for sale in Australia. Inspected ex-demo and second hand golf buggies and carts at lower prices, with warranty. See what is in stock.',
    h1: 'Used Golf Buggies for Sale',
    targetKeywords: ['used golf buggy for sale', 'used golf buggies', 'second hand golf buggies for sale', 'second hand petrol golf carts for sale', 'second hand golf buggies', 'used electric golf buggy for sale'],
    introCopy: 'A used golf buggy is a second hand or ex-demo buggy or cart sold at a lower price than new. Ours are inspected before sale, with prices from $1,490. Ex-demo and trade-in electric buggies, fully tested with a fresh battery health report and a short warranty. Stock changes weekly.',
    heroImage: '/images/categories/used-golf-buggies.webp',
    facets: ['power', 'wheels', 'condition', 'price', 'brand']
  },

  // 2.36 - Golf Clubs
  {
    id: 'golf-clubs',
    parent: null,
    slug: 'golf-clubs',
    path: '/golf-clubs/',
    navLabel: 'Golf Clubs',
    pageTitle: 'Golf Clubs for Sale Australia | Sets, Drivers & Irons',
    metaDescription: 'Shop complete golf package sets, drivers, iron sets, wedges and putters at The Buggy Shop.',
    h1: 'Golf Clubs',
    targetKeywords: ['golf clubs for sale australia', 'complete golf club set', 'golf driver'],
    introCopy: 'Quality golf club sets for juniors, beginners, ladies and experienced players.',
    heroImage: '/images/categories/golf-clubs.webp',
    facets: ['price', 'brand']
  },
  // Subcategories for Accessories
  {
    id: 'acc-bags',
    parent: 'accessories',
    slug: 'bags',
    path: '/accessories/bags/',
    navLabel: 'Golf Bags',
    pageTitle: 'Golf Cart & Stand Bags Australia',
    metaDescription: '14-way cart bags, lightweight stand bags and travel covers.',
    h1: 'Golf Bags',
    targetKeywords: ['golf cart bag', 'golf stand bag', 'golf travel bag'],
    introCopy: '14-way cart bags, waterproof stand bags, and travel covers designed for golf buggies.',
    heroImage: '/images/categories/accessories.webp',
    facets: ['price', 'brand']
  },
  {
    id: 'acc-holders',
    parent: 'accessories',
    slug: 'holders',
    path: '/accessories/holders/',
    navLabel: 'Holders',
    pageTitle: 'Golf Buggy Holders Australia',
    metaDescription: 'Umbrella, drink, phone and GPS holders plus scorecard consoles for golf buggies. Fast Australia-wide delivery.',
    h1: 'Golf Buggy Holders',
    targetKeywords: ['golf buggy umbrella holder', 'golf buggy drink holder'],
    introCopy: 'Umbrella, drink, GPS and phone holders and scorecard consoles that fit most golf buggies and push carts.',
    heroImage: '/images/categories/accessories.webp',
    facets: ['price', 'brand']
  },
  {
    id: 'acc-seats',
    parent: 'accessories',
    slug: 'seats-footboards',
    path: '/accessories/seats-footboards/',
    navLabel: 'Seats & Footboards',
    pageTitle: 'Golf Buggy Seats & Footboards Australia',
    metaDescription: 'Add-on seats and footboards for golf buggies. Rest between shots without buying a ride-on cart.',
    h1: 'Seats & Footboards',
    targetKeywords: ['golf buggy seat', 'golf buggy footboard'],
    introCopy: 'Add-on seats and footboards for golfers who want somewhere to rest between shots without moving to a ride-on cart.',
    heroImage: '/images/categories/accessories.webp',
    facets: ['price', 'brand']
  },
  {
    id: 'acc-covers',
    parent: 'accessories',
    slug: 'covers-and-bags',
    path: '/accessories/covers-and-bags/',
    navLabel: 'Covers & Wheel Bags',
    pageTitle: 'Golf Buggy Covers & Wheel Bags Australia',
    metaDescription: 'Travel and storage covers, wheel bags and bag rain covers for golf buggies and trolleys.',
    h1: 'Covers & Wheel Bags',
    targetKeywords: ['golf buggy cover','golf buggy travel cover','golf buggy wheel bag'],
    introCopy: 'Travel and storage covers, wheel bags and rain covers that protect your buggy in the boot, the garage and on wet days.',
    heroImage: '/images/categories/accessories.webp',
    facets: ['price', 'brand']
  },
  {
    id: 'acc-wheel-upgrades',
    parent: 'accessories',
    slug: 'wheel-upgrades',
    path: '/accessories/wheel-upgrades/',
    navLabel: 'Wheel Upgrades',
    pageTitle: 'Golf Buggy Wheel Upgrade Kits Australia',
    metaDescription: 'Winter, all-terrain and sand-ready wheel upgrade kits for golf buggies.',
    h1: 'Wheel Upgrades',
    targetKeywords: ['golf buggy winter wheels','all terrain golf buggy wheels','golf buggy sand tyres'],
    introCopy: 'Winter wheels, all-terrain upgrade kits and wet-weather or sand tyres for year-round play.',
    heroImage: '/images/categories/accessories.webp',
    facets: ['price', 'brand']
  },
  {
    id: 'acc-balls',
    parent: 'accessories',
    slug: 'golf-balls',
    path: '/accessories/golf-balls/',
    navLabel: 'Golf Balls',
    pageTitle: 'Premium Golf Balls Australia',
    metaDescription: 'Titleist Pro V1, TaylorMade TP5, Srixon Z-Star golf balls.',
    h1: 'Golf Balls',
    targetKeywords: ['titleist pro v1', 'taylormade tp5', 'srixon z-star'],
    introCopy: 'Dozen packs of tour-tier and distance golf balls.',
    heroImage: '/images/categories/accessories.webp',
    facets: ['price', 'brand']
  },
  {
    id: 'acc-rangefinders',
    parent: 'accessories',
    slug: 'rangefinders-gps',
    path: '/accessories/rangefinders-gps/',
    navLabel: 'Rangefinders & GPS',
    pageTitle: 'Golf Laser Rangefinders & GPS Watches',
    metaDescription: 'Bushnell, Garmin, Precision Pro rangefinders and Shot Scope watches.',
    h1: 'Rangefinders & GPS Watches',
    targetKeywords: ['golf rangefinder', 'garmin approach', 'bushnell tour v5'],
    introCopy: 'Accurate laser rangefinders and GPS golf watches for pin-point yardages.',
    heroImage: '/images/categories/accessories.webp',
    facets: ['price', 'brand']
  },
  {
    id: 'acc-practice',
    parent: 'accessories',
    slug: 'practice-aids',
    path: '/accessories/practice-aids/',
    navLabel: 'Practice Aids',
    pageTitle: 'Golf Putting Mats & Hitting Nets Australia',
    metaDescription: 'Home golf practice nets, putting mats and hitting mats.',
    h1: 'Practice Aids',
    targetKeywords: ['golf putting mat', 'golf practice net', 'golf hitting mat'],
    introCopy: 'Home putting greens and hitting nets to practice your game anywhere.',
    heroImage: '/images/categories/accessories.webp',
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
    heroImage: '/images/categories/golf-clubs.webp',
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
    heroImage: '/images/categories/golf-clubs.webp',
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
    heroImage: '/images/categories/golf-clubs.webp',
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
