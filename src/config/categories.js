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
    introCopy: 'Electric golf buggies are battery-powered golf trolleys that carry your clubs and drive themselves. Most are lithium powered, fold for the boot and cover 18 to 36 holes on one charge. Electric golf buggies do the carrying so you can focus on your round. Our range covers walk-behind lithium models, hands-free remote-control buggies and GPS follow buggies from the brands Australian golfers trust. Every buggy ships with an Australian warranty and local service support. Every model here is a motorised golf buggy: shop a motorised golf buggy for sale in walk-behind, remote-control and GPS styles. Whether you call it an estate electric golf buggy or a motor golf buggy, every model here is battery powered.',
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
    introCopy: 'An electric golf trolley is a walk-behind buggy with a battery motor that pulls your clubs for you. You steer by hand and the motor does the work uphill. Push-button simple: set the speed, walk beside it, let the buggy carry the bag. These are the lightest, best-value way into an electric buggy, folding down to fit any boot. Also called an electric caddy or golf caddy electric, a walk-behind buggy is the simplest powered option. Browse an estate electric golf trolley, electric caddies and a smart golf trolley in one place.',
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
    introCopy: 'A remote control golf buggy is an electric golf buggy you steer with a handset, so it drives ahead of you down the fairway. You walk free of the buggy and it follows your commands. Steer the buggy with a handset while you walk ahead, line up your next shot or clear a bunker. Our remote-control range covers everything from first-time remote buggies to all-terrain dual-motor models built for hilly Australian courses. A remote controlled golf buggy follows your handset, so you walk free of it.',
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
    introCopy: 'A golf push buggy is a manual, wheeled cart you push or pull while you walk, carrying your golf bag on a frame. Push buggies fold flat for the boot and need no battery. No batteries, no fuss. A good push buggy rolls straight, folds in seconds and lasts for years. We stock the premium 3-wheel and 4-wheel models that hold their value, and skip the throwaway trolleys. Some players still call a push buggy a golf pram.',
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
    introCopy: 'A 3 wheel golf buggy is a push buggy with one front wheel and two rear wheels. It steers easily on tight turns and folds compactly for the boot. The classic setup: two wheels behind, one steering wheel in front for easy one-hand turns. Light, manoeuvrable and the quickest to fold. A golf three wheel trolley is the lightest style to push.',
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
    introCopy: 'A foldable golf buggy is a push buggy that collapses to a flat, compact size so it fits in a car boot. Four-wheel designs fold flatter and stand on their own. Four wheels track dead straight across slopes and never tip when you stop. Flat-fold models pack down thinner than a golf bag. These folding golf buggies, also called collapsible golf buggies, flatten for the boot.',
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
    introCopy: 'A golf cart is a small ride-on electric vehicle that carries two to six people, used on golf courses, estates and farms. Most run on a 48V battery. Browse electric golf carts for sale in 2, 4 and 6 seat layouts, new and used, and buy a golf cart online with delivery Australia-wide. Sit-in electric carts for the course, the resort, the farm or the estate. From value 2-seaters to lifted 6-seat transporters and street-legal luxury carts, with finance and Australia-wide freight. New to carts? Read our golf cart buying guide below before you choose.',
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
    redirectTo: 'used-golf-buggies', // one page owns every "used" keyword
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
    introCopy: 'Off road buggies are rugged recreation and work vehicles built for sand, dirt and farm tracks. The range covers dune buggies, side-by-side UTVs and petrol or electric farm buggies. Buggies built for sand, dirt and paddocks. Petrol dune buggies, side-by-side UTVs, classic beach buggies and electric farm buggies, from kids models up to premium performance machines. Looking for an offroad buggy for sale? Choose from dune, side-by-side and farm models.',
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
    introCopy: 'A dune buggy, also called a beach buggy, is a light off-road vehicle with big rear tyres built for sand and dirt. Petrol models range from 110cc to 300cc. Lightweight 150cc to 300cc petrol buggies with roll cages, built for sand dunes and fire trails. Some shoppers search for a dune buggy kart; the same models are listed here.',
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
    pageTitle: 'Kids Electric UTV | 24V - 48V Kids Electric Buggies',
    metaDescription: 'Kids electric UTV and buggies in Australia: 24V to 48V electric 4x4 and RZR-style ride-ons from $1,290, quiet and easy to run. Delivered Australia-wide.',
    h1: 'Kids Electric UTV and Buggies for Sale in Australia',
    targetKeywords: ['kids electric utv', 'utv for kids'],
    introCopy: 'A kids electric UTV is a battery-powered ride-on buggy for children; ours run on 24V to 48V. 24V to 48V battery buggies for ages 5 to 12, with parent remote control and speed limiting.',
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
    metaDescription: 'Kids and teen petrol buggies, 90cc to 208cc 4-stroke, with adjustable throttle governors and safety harnesses. Delivered Australia-wide.',
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
    pageTitle: 'Golf Buggy Battery Australia | Packs, Chargers & Sets',
    metaDescription: 'Golf buggy battery for sale: replacement packs for MGI, Motocaddy and more, plus chargers, battery bags and 48V cart sets, all with Australian warranty.',
    h1: 'Golf Buggy Battery for Sale in Australia',
    targetKeywords: ['golf buggy battery'],
    introCopy: 'A golf buggy battery is the rechargeable pack that powers an electric buggy; our range covers 12V 18-hole and 24V 36-hole lithium packs, lead-acid options and matching chargers. Genuine and aftermarket replacement batteries by hole-range and brand fitment, plus chargers, battery bags and full ride-on cart battery sets. Lead-acid to lithium upgrades welcome.',
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
    pageTitle: 'Golf Buggy Battery Lithium | 18 & 36 Hole Packs',
    metaDescription: 'Lithium golf buggy battery packs in 12V 18-hole and 24V 36-hole sizes for MGI, Motocaddy and more, with chargers and Australian warranty.',
    h1: 'Lithium Golf Buggy Battery: 18 & 36 Hole Packs',
    targetKeywords: ['golf buggy battery lithium'],
    introCopy: 'A lithium golf buggy battery is a lighter, longer-lasting replacement for lead-acid; ours come in 12V 18-hole and 24V 36-hole sizes. 12V and 24V lithium packs for MGI, Motocaddy, PowaKaddy and Hillbilly buggies, rated 18 to 36 holes.',
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
    pageTitle: 'Golf Cart Batteries Australia | 48V Lithium & Trojan',
    metaDescription: 'Golf cart batteries for sale in Australia: 48V lithium, Trojan and Century lead-acid and AGM sets and a lithium conversion kit. Compare prices.',
    h1: 'Golf Cart Batteries for Sale in Australia',
    targetKeywords: ['golf cart batteries', 'lithium golf cart batteries', 'golf cart batteries australia', '48v golf cart battery', 'golf cart batteries and charger', 'batteries for golf cars'],
    introCopy: 'Golf cart batteries come as 36V or 48V sets; ours range from flooded lead-acid to 48V lithium drop-in packs. 36V and 48V flooded, AGM and lithium sets for ride-on carts, plus plug-and-play lithium conversion kits.',
    heroImage: '/images/categories/batteries.webp',
    facets: ['price', 'brand']
  },

  // 2.29 - Parts & Spares
  {
    id: 'parts', parent: null, slug: 'parts',
    path: '/parts/',
    navLabel: 'Parts & Spares',
    pageTitle: 'Golf Buggy Parts Australia | Spares & Replacements',
    metaDescription: 'Golf buggy parts and golf cart parts in Australia: wheels, tyres, motors, controllers and trim parts for MGI, Clicgear, Stinger and more buggies.',
    h1: 'Golf Buggy Parts and Spares in Australia',
    targetKeywords: ['golf buggy parts', 'golf cart parts', 'buggy spare parts', 'golf buggy parts australia', 'golf cart parts australia', 'golf car parts'],
    introCopy: 'Golf buggy parts are the wheels, motors, controllers and trim that keep a buggy or cart running; we stock spares for MGI, Clicgear, Stinger and aftermarket buggies. Wheels, tyres, motors, gearboxes, controllers and trim by brand and model. If you can name the buggy, we can fit it.',
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
    metaDescription: 'Replacement 12V and 24V motors, digital speed controllers, axle gearboxes and top-box handles for electric golf buggies. Delivered Australia-wide.',
    h1: 'Drive & Electrical Spares',
    targetKeywords: ['golf buggy motor', 'golf buggy controller', 'golf buggy parts'],
    introCopy: 'Motors, gearboxes, controllers, handles and wiring for electric buggies.',
    heroImage: '/images/categories/parts.webp',
    facets: ['price', 'brand']
  },

  // 2.33 - Accessories
  {
    id: 'accessories', parent: null, slug: 'accessories',
    path: '/accessories/',
    navLabel: 'Accessories',
    pageTitle: 'Golf Buggy Accessories | Golf Cart Accessories Australia',
    metaDescription: 'Golf buggy accessories and golf cart accessories in Australia: holders, bags, covers, seats and wheel upgrades. Add a buggy and save 5% on accessories.',
    h1: 'Golf Buggy and Golf Cart Accessories in Australia',
    targetKeywords: ['golf buggy accessories', 'golf cart accessories', 'golf buggy accessories australia', 'golf cart accessories australia'],
    introCopy: 'Golf buggy accessories are the holders, covers, seats and upgrades that fit a buggy or cart; the same page serves golf cart accessories. Golf buggy accessories are add-ons that fit your push buggy or cart, such as umbrella holders, drink holders, bags, covers and upgraded wheels. Most fit the major buggy brands. Holders, seats, covers and upgrade kits to finish off your buggy. Most parts are brand-specific, so filter by your buggy.',
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
    introCopy: 'A used golf buggy is a second hand or ex-demo buggy or cart sold at a lower price than new. Our used golf buggies are inspected before sale, with prices from $1,490. Ex-demo and trade-in electric buggies, fully tested with a fresh battery health report and a short warranty. Stock changes weekly.',
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
    metaDescription: 'Golf clubs for sale in Australia: complete sets, drivers, iron sets, wedges and putters for men, women and juniors. Buy golf clubs online with delivery.',
    h1: 'Golf Clubs for Sale in Australia',
    targetKeywords: ['golf clubs for sale', 'golf clubs', 'golf clubs mens', 'cheapest golf clubs', 'golf clubs for sale au', 'where to buy golf clubs'],
    introCopy: 'Golf clubs are sold as complete sets or individually; we stock complete sets, drivers, irons, wedges and putters. Quality golf club sets for juniors, beginners, ladies and experienced players.',
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
    pageTitle: 'Golf Bags Australia | Stand, Cart & Carry Bags',
    metaDescription: 'Golf bags for sale in Australia: stand bags, cart bags and carry bags from $215, with the Big Max Dri Lite and a 14-way divider cart bag. Buy online.',
    h1: 'Golf Bags for Sale in Australia',
    targetKeywords: ['golf bag', 'golf bags for sale', 'golf stand bag', 'golf bags australia', 'golf carry bag', 'golf bag affordable'],
    introCopy: 'A golf bag is the bag that holds your clubs; we stock stand bags for carrying and cart bags for a buggy or trolley. 14-way cart bags, waterproof stand bags, and travel covers designed for golf buggies.',
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
    metaDescription: 'Golf buggy umbrella, drink, phone and GPS holders plus scorecard consoles, from $29. Order online with fast Australia-wide delivery.',
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
    metaDescription: 'Golf buggy seats and footboards: an add-on seat from $99 so you can rest between shots without moving up to a ride-on cart. Delivered Australia-wide.',
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
    metaDescription: 'Golf buggy covers, wheel bags and travel bags: protect your buggy in the boot, garage or on wet days. Covers from $49, delivered Australia-wide.',
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
    metaDescription: 'Golf buggy wheel upgrade kits: winter and all-terrain wheels and wet-weather or sand tyres from $129 for year-round play. Delivered Australia-wide.',
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
    pageTitle: 'Golf Balls Australia | Titleist, TaylorMade, Srixon',
    metaDescription: 'Golf balls in Australia: Titleist Pro V1, TaylorMade TP5 and Srixon Z-Star by the dozen. Premium tour golf balls delivered Australia-wide.',
    h1: 'Golf Balls for Sale in Australia',
    targetKeywords: ['golf balls'],
    introCopy: 'Golf balls are sold by the dozen; we stock the Titleist Pro V1, TaylorMade TP5 and Srixon Z-Star. Dozen packs of tour-tier and distance golf balls.',
    heroImage: '/images/categories/accessories.webp',
    facets: ['price', 'brand']
  },
  {
    id: 'acc-rangefinders',
    parent: 'accessories',
    slug: 'rangefinders-gps',
    path: '/accessories/rangefinders-gps/',
    navLabel: 'Rangefinders & GPS',
    pageTitle: 'Golf Rangefinder Australia | Laser Rangefinders & GPS',
    metaDescription: 'Golf rangefinder and GPS watch range in Australia: Bushnell Tour V5 and Pro X3, Precision Pro NX7, Garmin Approach and Shot Scope. Rangefinders from $479.',
    h1: 'Golf Rangefinders and GPS Watches in Australia',
    targetKeywords: ['golf rangefinder', 'golf rangefinder australia', 'laser golf range finder', 'gps golf rangefinder', 'golf finder'],
    introCopy: 'A golf rangefinder is a laser device that measures the distance to the flag; we also stock GPS golf watches from Garmin and Shot Scope. Accurate laser rangefinders and GPS golf watches for pin-point yardages.',
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
    metaDescription: 'Golf putting mats and hitting nets for home practice: a putting mat from $89, hitting mat and net to sharpen your game anywhere. Delivered Australia-wide.',
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
    pageTitle: 'Golf Club Set Australia | Complete Golf Sets for Sale',
    metaDescription: 'Golf club sets and complete golf sets in Australia: a 12-piece beginner set, a ladies set and a junior set. Sets from $249, delivered Australia-wide.',
    h1: 'Golf Club Sets and Complete Golf Sets for Sale',
    targetKeywords: ['golf club set', 'golf sets for sale', 'golf club packages', 'golf sets australia', 'complete golf sets', 'golf club sets for sale'],
    introCopy: 'A golf club set is a complete package of driver, woods, irons, putter and bag; ours cover beginner, ladies and junior players. All-in-one package sets including drivers, woods, irons, putter and cart bag.',
    heroImage: '/images/categories/golf-clubs.webp',
    facets: ['price', 'brand']
  },
  {
    id: 'clubs-woods-irons',
    parent: 'golf-clubs',
    slug: 'woods-and-irons',
    path: '/golf-clubs/woods-and-irons/',
    navLabel: 'Woods & Irons',
    pageTitle: 'Golf Driver Australia | Fairway Woods & Iron Sets',
    metaDescription: 'Golf driver and iron sets for sale in Australia: a driver from $449 and a mid-range iron set. Woods and irons for beginners and improvers, delivered.',
    h1: 'Golf Drivers and Iron Sets for Sale in Australia',
    targetKeywords: ['golf driver', 'golf irons for sale', 'golf iron sets for sale', 'golf club iron sets for sale', 'cheap golf club iron sets'],
    introCopy: 'A golf driver is the longest club in the bag for tee shots; this page also lists iron sets. High-launch drivers and forged iron sets designed for distance and forgiveness.',
    heroImage: '/images/categories/golf-clubs.webp',
    facets: ['price', 'brand']
  },
  {
    id: 'clubs-wedges-putters',
    parent: 'golf-clubs',
    slug: 'wedges-and-putters',
    path: '/golf-clubs/wedges-and-putters/',
    navLabel: 'Wedges & Putters',
    pageTitle: 'Golf Putter Australia | Wedges & Putters for Sale',
    metaDescription: 'Golf putter and wedge range in Australia: a golf putter from $199 and a golf wedge from $199. Short-game clubs delivered Australia-wide.',
    h1: 'Golf Putters and Wedges for Sale in Australia',
    targetKeywords: ['golf putter', 'putter', 'golf wedges', 'putter buy', 'golf wedge set', 'cheapest putter'],
    introCopy: 'A golf putter is the club used on the green; this page also lists wedges for short-game shots. Short game scoring clubs: high-spin wedges and precision alignment putters.',
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
  return CATEGORY_TREE.filter(c => c.parent === parentId && !c.redirectTo);
}

/** A node that has its own page (the brands node and folded nodes do not). */
export function isPage(node) {
  return !!node && node.id !== 'brands' && !node.redirectTo;
}

export function getRootCategories() {
  return CATEGORY_TREE.filter(c => c.parent === null);
}
