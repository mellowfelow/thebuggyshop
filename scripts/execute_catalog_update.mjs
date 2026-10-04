import fs from 'fs';
import path from 'path';

// 1. Read input product items
const inputItems = [
  {"slug":"powakaddy-dlx-push-button-electric-golf-buggy","name":"PowaKaddy DLX Push-Button Electric Golf Buggy","brand":"powakaddy","brandName":"PowaKaddy","category":"electric-golf-buggies","subcategory":"walk-behind","price":1299,"condition":"New","imageFolder":"/images/products/electric-golf-buggies/walk-behind/powakaddy-dlx-push-button-electric-golf-buggy/"},
  {"slug":"powakaddy-rx1-gps-remote-electric-golf-buggy","name":"PowaKaddy RX1 GPS Remote Electric Golf Buggy","brand":"powakaddy","brandName":"PowaKaddy","category":"remote-control-golf-buggies","subcategory":"remote-control-golf-buggies","price":2199,"condition":"New","imageFolder":"/images/products/electric-golf-buggies/remote-control-golf-buggies/powakaddy-rx1-gps-remote-electric-golf-buggy/"},
  {"slug":"motocaddy-m5-gps-dhc-electric-golf-buggy","name":"Motocaddy M5 GPS DHC Electric Golf Buggy","brand":"motocaddy","brandName":"Motocaddy","category":"gps-follow-buggies","subcategory":"gps-follow","price":1599,"condition":"New","imageFolder":"/images/products/electric-golf-buggies/gps-follow/motocaddy-m5-gps-dhc-electric-golf-buggy/"},
  {"slug":"powakaddy-fx7-gps-36-hole-electric-golf-buggy","name":"PowaKaddy FX7 GPS 36-Hole Electric Golf Buggy","brand":"powakaddy","brandName":"PowaKaddy","category":"gps-follow-buggies","subcategory":"gps-follow","price":2099,"condition":"New","imageFolder":"/images/products/electric-golf-buggies/gps-follow/powakaddy-fx7-gps-36-hole-electric-golf-buggy/"},
  {"slug":"stewart-golf-x10-follow-electric-buggy","name":"Stewart Golf X10 Follow Electric Buggy","brand":"stewart-golf","brandName":"Stewart Golf","category":"gps-follow-buggies","subcategory":"gps-follow","price":3490,"condition":"New","imageFolder":"/images/products/electric-golf-buggies/gps-follow/stewart-golf-x10-follow-electric-buggy/"},
  {"slug":"stewart-golf-vertx-remote-electric-buggy","name":"Stewart Golf Vertx Remote Electric Buggy","brand":"stewart-golf","brandName":"Stewart Golf","category":"gps-follow-buggies","subcategory":"gps-follow","price":2990,"condition":"New","imageFolder":"/images/products/electric-golf-buggies/gps-follow/stewart-golf-vertx-remote-electric-buggy/"},
  {"slug":"big-max-iq-2-360-push-golf-buggy","name":"Big Max IQ 2 360 Push Golf Buggy","brand":"big-max","brandName":"Big Max","category":"push-pull-golf-buggies","subcategory":"3-wheel","price":479,"condition":"New","imageFolder":"/images/products/push-pull-golf-buggies/3-wheel/big-max-iq-2-360-push-golf-buggy/"},
  {"slug":"clicgear-rovic-swivel-2-0-compact-push-golf-buggy","name":"Clicgear Rovic Swivel 2.0 Compact Push Golf Buggy","brand":"clicgear","brandName":"Clicgear","category":"push-pull-golf-buggies","subcategory":"4-wheel","price":459,"condition":"New"},
  {"slug":"qod-compact-push-golf-buggy","name":"QOD Compact Push Golf Buggy","brand":"qod-golf","brandName":"QOD Golf","category":"push-pull-golf-buggies","subcategory":"4-wheel","price":599,"condition":"New"},
  {"slug":"tara-spirit-plus-spirit-pro-2-seater-golf-cart","name":"Tara Spirit Plus / Spirit Pro 2-Seater Golf Cart","brand":"tara","brandName":"Tara","category":"luxury-golf-carts","subcategory":"2-seat","price":12375,"condition":"New"},
  {"slug":"lvtong-2-seater-fleet-golf-cart","name":"LVTONG 2-Seater Fleet Golf Cart","brand":"lvtong","brandName":"LVTONG","category":"luxury-golf-carts","subcategory":"2-seat","price":10990,"condition":"New"},
  {"slug":"tomberlin-e-merge-revenge-2-and-4-seat-golf-cart","name":"Tomberlin E-Merge Revenge 2 & 4 Seat Golf Cart","brand":"tomberlin","brandName":"Tomberlin","category":"luxury-golf-carts","subcategory":"2-seat","price":16990,"condition":"New"},
  {"slug":"evolution-d3-2-seater-electric-golf-cart","name":"Evolution D3 2-Seater Electric Golf Cart","brand":"evolution","brandName":"Evolution","category":"luxury-golf-carts","subcategory":"2-seat","price":12990,"condition":"New"},
  {"slug":"shelby-2-seat-electric-golf-cart","name":"Shelby 2-Seat Electric Golf Cart","brand":"shelby","brandName":"Shelby","category":"luxury-golf-carts","subcategory":"2-seat","price":20990,"condition":"New"},
  {"slug":"club-car-tempo-onward-lithium-golf-cart-2-2-2-4-seat","name":"Club Car Tempo / Onward Lithium Golf Cart (2 / 2+2 / 4 Seat)","brand":"club-car","brandName":"Club Car","category":"luxury-golf-carts","subcategory":"2-seat","price":19990,"condition":"New"},
  {"slug":"yamaha-drive2-golf-cart-2-4-seat","name":"Yamaha Drive2 Golf Cart (2 / 4 Seat)","brand":"yamaha","brandName":"Yamaha","category":"luxury-golf-carts","subcategory":"2-seat","price":16990,"condition":"New"},
  {"slug":"tara-roadster-2-2-electric-golf-cart","name":"Tara Roadster 2+2 Electric Golf Cart","brand":"tara","brandName":"Tara","category":"luxury-golf-carts","subcategory":"2-seat","price":15125,"condition":"New"},
  {"slug":"evolution-d5-4-seater-electric-golf-cart","name":"Evolution D5 4-Seater Electric Golf Cart","brand":"evolution","brandName":"Evolution","category":"luxury-golf-carts","subcategory":"4-6-seat","price":15990,"condition":"New"},
  {"slug":"tomberlin-e-merge-beachcomber-4-and-6-seat-golf-cart","name":"Tomberlin E-Merge Beachcomber 4 & 6 Seat Golf Cart","brand":"tomberlin","brandName":"Tomberlin","category":"luxury-golf-carts","subcategory":"4-6-seat","price":32990,"condition":"New"},
  {"slug":"tomberlin-e-merge-ghosthawk-4-and-6-seat-golf-cart","name":"Tomberlin E-Merge Ghosthawk 4 & 6 Seat Golf Cart","brand":"tomberlin","brandName":"Tomberlin","category":"luxury-golf-carts","subcategory":"4-6-seat","price":32990,"condition":"New"},
  {"slug":"ecar-compass-4s-6s-lifted-all-terrain-golf-cart","name":"ECAR Compass 4S / 6S Lifted All-Terrain Golf Cart","brand":"ecar","brandName":"ECAR","category":"luxury-golf-carts","subcategory":"lifted-all-terrain","price":17990,"condition":"New"},
  {"slug":"tomberlin-e-merge-defender-lifted-golf-cart-2-and-4-seat","name":"Tomberlin E-Merge Defender Lifted Golf Cart (2 & 4 Seat)","brand":"tomberlin","brandName":"Tomberlin","category":"luxury-golf-carts","subcategory":"lifted-all-terrain","price":29990,"condition":"New"},
  {"slug":"ecar-lithium-a2-utility-cart","name":"ECAR Lithium A2 Utility Cart","brand":"ecar","brandName":"ECAR","category":"luxury-golf-carts","subcategory":"utility","price":12990,"condition":"New"},
  {"slug":"ecar-lithium-a4-utility-cart","name":"ECAR Lithium A4 Utility Cart","brand":"ecar","brandName":"ECAR","category":"luxury-golf-carts","subcategory":"utility","price":12990,"condition":"New"},
  {"slug":"used-yamaha-g29-2-seat-ex-lease-golf-cart","name":"Used Yamaha G29 2-Seat Ex-Lease Golf Cart","brand":"yamaha","brandName":"Yamaha","category":"used-golf-buggies","subcategory":"used","price":4990,"condition":"Used"},
  {"slug":"used-club-car-precedent-2-seat-ex-lease-golf-cart","name":"Used Club Car Precedent 2-Seat Ex-Lease Golf Cart","brand":"club-car","brandName":"Club Car","category":"used-golf-buggies","subcategory":"used","price":6490,"condition":"Used"},
  {"slug":"used-yamaha-drive-2-seat-ex-lease-golf-cart","name":"Used Yamaha Drive 2-Seat Ex-Lease Golf Cart","brand":"yamaha","brandName":"Yamaha","category":"used-golf-buggies","subcategory":"used","price":7490,"condition":"Used"},
  {"slug":"used-e-z-go-rxv-4-seat-ex-fleet-lithium-golf-cart","name":"Used E-Z-GO RXV 4-Seat Ex-Fleet Lithium Golf Cart","brand":"e-z-go","brandName":"E-Z-GO","category":"used-golf-buggies","subcategory":"used","price":8990,"condition":"Used"},
  {"slug":"used-club-car-precedent-4-seat-ex-lease-golf-cart","name":"Used Club Car Precedent 4-Seat Ex-Lease Golf Cart","brand":"club-car","brandName":"Club Car","category":"used-golf-buggies","subcategory":"used","price":9990,"condition":"Used"},
  {"slug":"used-club-car-tempo-2-seat-lithium-ex-lease-golf-cart","name":"Used Club Car Tempo 2-Seat Lithium Ex-Lease Golf Cart","brand":"club-car","brandName":"Club Car","category":"used-golf-buggies","subcategory":"used","price":11490,"condition":"Used"},
  {"slug":"gmx-gkt110-110cc-dune-buggy","name":"GMX GKT110 110cc Dune Buggy","brand":"gmx","brandName":"GMX","category":"off-road-buggies","subcategory":"dune-buggies","price":2999,"condition":"New"},
  {"slug":"mj-motor-forza-dune-buggy-163-300cc","name":"MJ Motor Forza Dune Buggy (163-300cc)","brand":"mj-motor","brandName":"MJ Motor","category":"off-road-buggies","subcategory":"dune-buggies","price":2099,"condition":"New"},
  {"slug":"mxr-300cc-fuel-injected-dune-buggy","name":"MXR 300cc Fuel-Injected Dune Buggy","brand":"mxr-motorsports","brandName":"MXR Motorsports","category":"off-road-buggies","subcategory":"dune-buggies","price":5999,"condition":"New"},
  {"slug":"kayo-s150-150cc-2-seat-buggy","name":"Kayo S150 150cc 2-Seat Buggy","brand":"kayo","brandName":"Kayo","category":"off-road-buggies","subcategory":"side-by-side","price":4299,"condition":"New"},
  {"slug":"hawk-razorback-4-seat-utv","name":"Hawk Razorback 4-Seat UTV","brand":"hawk-carts","brandName":"Hawk Carts","category":"off-road-buggies","subcategory":"side-by-side","price":18490,"condition":"New"},
  {"slug":"trident-1000cc-side-by-side-utv","name":"Trident 1000cc Side-by-Side UTV","brand":"trident","brandName":"Trident","category":"off-road-buggies","subcategory":"side-by-side","price":21990,"condition":"New"},
  {"slug":"can-am-maverick-commander-defender-limited-side-by-side","name":"Can-Am Maverick / Commander / Defender Limited Side-by-Side","brand":"can-am","brandName":"Can-Am","category":"off-road-buggies","subcategory":"side-by-side","price":24999,"condition":"New"},
  {"slug":"cfmoto-uforce-u10-pro-zforce-side-by-side","name":"CFMOTO UForce U10 Pro / ZFORCE Side-by-Side","brand":"cfmoto","brandName":"CFMOTO","category":"off-road-buggies","subcategory":"side-by-side","price":28990,"condition":"New"},
  {"slug":"yamaha-wolverine-x2-850-rmax2-1000-side-by-side","name":"Yamaha Wolverine X2 850 / RMAX2 1000 Side-by-Side","brand":"yamaha","brandName":"Yamaha","category":"off-road-buggies","subcategory":"side-by-side","price":27000,"condition":"New"},
  {"slug":"yamaha-yxz1000r-ss-xt-r-sport-side-by-side","name":"Yamaha YXZ1000R SS XT-R Sport Side-by-Side","brand":"yamaha","brandName":"Yamaha","category":"off-road-buggies","subcategory":"side-by-side","price":39999,"condition":"New"},
  {"slug":"yamaha-rmax4-1000-xt-r-4-seat-side-by-side","name":"Yamaha RMAX4 1000 XT-R 4-Seat Side-by-Side","brand":"yamaha","brandName":"Yamaha","category":"off-road-buggies","subcategory":"side-by-side","price":42999,"condition":"New"},
  {"slug":"polaris-ranger-xd-1500-northstar-side-by-side","name":"Polaris Ranger XD 1500 NorthStar Side-by-Side","brand":"polaris","brandName":"Polaris","category":"off-road-buggies","subcategory":"side-by-side","price":39995,"condition":"New"},
  {"slug":"polaris-rzr-xpedition-adv-ultimate","name":"Polaris RZR XPEDITION ADV Ultimate","brand":"polaris","brandName":"Polaris","category":"off-road-buggies","subcategory":"side-by-side","price":40495,"condition":"New"},
  {"slug":"polaris-ranger-500-farm-utv","name":"Polaris Ranger 500 Farm UTV","brand":"polaris","brandName":"Polaris","category":"off-road-buggies","subcategory":"farm-buggies","price":15995,"condition":"New"},
  {"slug":"polaris-ranger-1000-premium-farm-utv","name":"Polaris Ranger 1000 Premium Farm UTV","brand":"polaris","brandName":"Polaris","category":"off-road-buggies","subcategory":"farm-buggies","price":23995,"condition":"New"},
  {"slug":"can-am-defender-hd7-hd9-farm-utv","name":"Can-Am Defender HD7 / HD9 Farm UTV","brand":"can-am","brandName":"Can-Am","category":"off-road-buggies","subcategory":"farm-buggies","price":21995,"condition":"New"},
  {"slug":"licensed-rzr-style-4x4-kids-electric-ride-on-buggy-24-48v","name":"Licensed RZR-Style 4x4 Kids Electric Ride-On Buggy (24-48V)","brand":"various","brandName":"Various","category":"kids-buggies","subcategory":"electric","price":1490,"condition":"New"},
  {"slug":"kids-dune-buggy-petrol-90-125cc","name":"Kids Dune Buggy Petrol (90-125cc)","brand":"various","brandName":"Various","category":"kids-buggies","subcategory":"petrol","price":1999,"condition":"New"},
  {"slug":"hammerhead-torpedo-208cc-teen-buggy","name":"Hammerhead Torpedo 208cc Teen Buggy","brand":"hammerhead","brandName":"Hammerhead","category":"kids-buggies","subcategory":"petrol","price":2299,"condition":"New"},
  {"slug":"mgi-lithium-24v-250wh-299wh-36-hole-battery","name":"MGI Lithium 24V 250Wh / 299Wh 36-Hole Battery","brand":"mgi","brandName":"MGI","category":"batteries","subcategory":"lithium","price":499,"condition":"New"},
  {"slug":"mgi-lithium-12v-20ah-299wh-18-hole-battery","name":"MGI Lithium 12V 20Ah / 299Wh 18-Hole Battery","brand":"mgi","brandName":"MGI","category":"batteries","subcategory":"lithium","price":499,"condition":"New"},
  {"slug":"mgi-lithium-24v-13ah-remote-series-battery","name":"MGI Lithium 24V 13Ah Remote Series Battery","brand":"mgi","brandName":"MGI","category":"batteries","subcategory":"lithium","price":579,"condition":"New"},
  {"slug":"motocaddy-m-series-28v-lithium-battery-charger","name":"Motocaddy M-Series 28V Lithium Battery + Charger","brand":"motocaddy","brandName":"Motocaddy","category":"batteries","subcategory":"lithium","price":599,"condition":"New"},
  {"slug":"aftermarket-36-hole-lithium-battery-kit","name":"Aftermarket 36-Hole Lithium Battery Kit","brand":"generic","brandName":"Generic","category":"batteries","subcategory":"lithium","price":399,"condition":"New"},
  {"slug":"aftermarket-12v-18-25ah-lithium-battery-charger","name":"Aftermarket 12V 18-25Ah Lithium Battery + Charger","brand":"generic","brandName":"Generic","category":"batteries","subcategory":"lithium","price":249,"condition":"New"},
  {"slug":"ultramax-22ah-12v-lithium-battery","name":"Ultramax 22Ah 12V Lithium Battery","brand":"ultramax","brandName":"Ultramax","category":"batteries","subcategory":"lithium","price":349,"condition":"New"},
  {"slug":"lead-acid-12v-24ah-buggy-battery","name":"Lead-Acid 12V 24Ah Buggy Battery","brand":"generic","brandName":"Generic","category":"batteries","subcategory":"lithium","price":259,"condition":"New"},
  {"slug":"mgi-lithium-24v-smart-charger","name":"MGI Lithium 24V Smart Charger","brand":"mgi","brandName":"MGI","category":"batteries","subcategory":"chargers","price":179,"condition":"New"},
  {"slug":"mgi-lithium-12v-charger","name":"MGI Lithium 12V Charger","brand":"mgi","brandName":"MGI","category":"batteries","subcategory":"chargers","price":129,"condition":"New"},
  {"slug":"aftermarket-lithium-charger-12-18-24ah","name":"Aftermarket Lithium Charger (12/18/24Ah)","brand":"generic","brandName":"Generic","category":"batteries","subcategory":"chargers","price":119,"condition":"New"},
  {"slug":"lead-acid-buggy-charger","name":"Lead-Acid Buggy Charger","brand":"generic","brandName":"Generic","category":"batteries","subcategory":"chargers","price":115,"condition":"New"},
  {"slug":"golf-buggy-battery-bag","name":"Golf Buggy Battery Bag","brand":"generic","brandName":"Generic","category":"batteries","subcategory":"chargers","price":39,"condition":"New"},
  {"slug":"trojan-t105-flooded-battery-set-48v-8-batteries","name":"Trojan T105 Flooded Battery Set (48V, 8 Batteries)","brand":"trojan","brandName":"Trojan","category":"batteries","subcategory":"cart-sets","price":2640,"condition":"New"},
  {"slug":"trojan-t875-flooded-battery-set-48v","name":"Trojan T875 Flooded Battery Set (48V)","brand":"trojan","brandName":"Trojan","category":"batteries","subcategory":"cart-sets","price":2199,"condition":"New"},
  {"slug":"trojan-t1275-12v-battery-set-48v","name":"Trojan T1275 12V Battery Set (48V)","brand":"trojan","brandName":"Trojan","category":"batteries","subcategory":"cart-sets","price":2499,"condition":"New"},
  {"slug":"century-golf-cart-battery-set-36v-48v","name":"Century Golf Cart Battery Set (36V / 48V)","brand":"century","brandName":"Century","category":"batteries","subcategory":"cart-sets","price":1764,"condition":"New"},
  {"slug":"trojan-agm-pro-maintenance-free-battery-set-48v","name":"Trojan AGM PRO Maintenance-Free Battery Set (48V)","brand":"trojan","brandName":"Trojan","category":"batteries","subcategory":"cart-sets","price":3127,"condition":"New"},
  {"slug":"trojan-gc2-lithium-battery-48v-24v","name":"Trojan GC2 Lithium Battery (48V / 24V)","brand":"trojan","brandName":"Trojan","category":"batteries","subcategory":"cart-sets","price":2579,"condition":"New"},
  {"slug":"voltrac-flex-lithium-conversion-kit-e-z-go-rxv-club-car-48v","name":"Voltrac Flex Lithium Conversion Kit (E-Z-GO RXV / Club Car 48V)","brand":"voltrac","brandName":"Voltrac","category":"batteries","subcategory":"cart-sets","price":2895,"condition":"New"},
  {"slug":"clicgear-wheel-kit-4-0-8-0","name":"Clicgear Wheel Kit (4.0 / 8.0+)","brand":"clicgear","brandName":"Clicgear","category":"parts","subcategory":"wheels-tyres","price":159,"condition":"New"},
  {"slug":"hedgehog-solid-wheels-clicgear-2-0-8-0","name":"Hedgehog Solid Wheels (Clicgear 2.0-8.0)","brand":"hedgehog","brandName":"Hedgehog","category":"parts","subcategory":"wheels-tyres","price":149,"condition":"New"},
  {"slug":"mgi-rear-wheels-pair-zip-ai","name":"MGI Rear Wheels Pair (Zip / Ai)","brand":"mgi","brandName":"MGI","category":"parts","subcategory":"wheels-tyres","price":179,"condition":"New"},
  {"slug":"mgi-zip-navigator-at-rear-wheel-single","name":"MGI Zip Navigator AT Rear Wheel (Single)","brand":"mgi","brandName":"MGI","category":"parts","subcategory":"wheels-tyres","price":80,"condition":"New"},
  {"slug":"mgi-winter-wheel-single","name":"MGI Winter Wheel (Single)","brand":"mgi","brandName":"MGI","category":"parts","subcategory":"wheels-tyres","price":85,"condition":"New"},
  {"slug":"mgi-quad-5th-anti-tip-wheel","name":"MGI Quad 5th / Anti-Tip Wheel","brand":"mgi","brandName":"MGI","category":"parts","subcategory":"wheels-tyres","price":30,"condition":"New"},
  {"slug":"stinger-sg-4-front-wheel-assembly-rear-wheel","name":"Stinger SG-4 Front Wheel Assembly / Rear Wheel","brand":"stinger","brandName":"Stinger","category":"parts","subcategory":"wheels-tyres","price":45,"condition":"New"},
  {"slug":"generic-buggy-front-wheel","name":"Generic Buggy Front Wheel","brand":"generic","brandName":"Generic","category":"parts","subcategory":"wheels-tyres","price":29,"condition":"New"},
  {"slug":"generic-buggy-rear-wheel-complete","name":"Generic Buggy Rear Wheel (Complete)","brand":"generic","brandName":"Generic","category":"parts","subcategory":"wheels-tyres","price":49,"condition":"New"},
  {"slug":"replacement-tyre-rubber-10-inch-universal","name":"Replacement Tyre Rubber 10 inch (Universal)","brand":"generic","brandName":"Generic","category":"parts","subcategory":"wheels-tyres","price":35,"condition":"New"},
  {"slug":"pneumatic-wheel-rim-18x8-5-8-4-stud","name":"Pneumatic Wheel + Rim 18x8.5-8 4-Stud","brand":"generic","brandName":"Generic","category":"parts","subcategory":"wheels-tyres","price":160,"condition":"New"},
  {"slug":"golf-cart-turf-tyres","name":"Golf Cart Turf Tyres","brand":"generic","brandName":"Generic","category":"parts","subcategory":"wheels-tyres","price":129,"condition":"New"},
  {"slug":"mgi-zip-navigator-motor-controller","name":"MGI Zip Navigator Motor Controller","brand":"mgi","brandName":"MGI","category":"parts","subcategory":"drive-electrical","price":350,"condition":"New"},
  {"slug":"mgi-gps-front-wheel-assembly","name":"MGI GPS+ Front Wheel Assembly","brand":"mgi","brandName":"MGI","category":"parts","subcategory":"drive-electrical","price":140,"condition":"New"},
  {"slug":"electric-buggy-motor-gearbox-aftermarket","name":"Electric Buggy Motor / Gearbox (Aftermarket)","brand":"generic","brandName":"Generic","category":"parts","subcategory":"drive-electrical","price":189,"condition":"New"},
  {"slug":"clicgear-secondary-strut-mgi-bag-rest-spacer","name":"Clicgear Secondary Strut / MGI Bag-Rest Spacer","brand":"clicgear","brandName":"Clicgear","category":"parts","subcategory":"drive-electrical","price":30,"condition":"New"},
  {"slug":"mgi-accessory-station-port-cover-and-trim-parts","name":"MGI Accessory-Station Port Cover & Trim Parts","brand":"mgi","brandName":"MGI","category":"parts","subcategory":"drive-electrical","price":12,"condition":"New"},
  {"slug":"golf-buggy-umbrella-holder","name":"Golf Buggy Umbrella Holder","brand":"generic","brandName":"Generic","category":"accessories","subcategory":"accessories","price":35,"condition":"New"},
  {"slug":"golf-buggy-drink-holder-gps-and-phone-holder","name":"Golf Buggy Drink Holder / GPS & Phone Holder","brand":"generic","brandName":"Generic","category":"accessories","subcategory":"accessories","price":29,"condition":"New"},
  {"slug":"golf-buggy-scorecard-accessory-console","name":"Golf Buggy Scorecard / Accessory Console","brand":"generic","brandName":"Generic","category":"accessories","subcategory":"accessories","price":39,"condition":"New"},
  {"slug":"golf-buggy-add-on-seat-footboard","name":"Golf Buggy Add-On Seat / Footboard","brand":"generic","brandName":"Generic","category":"accessories","subcategory":"accessories","price":99,"condition":"New"},
  {"slug":"golf-buggy-travel-storage-cover-and-wheel-bags","name":"Golf Buggy Travel / Storage Cover & Wheel Bags","brand":"generic","brandName":"Generic","category":"accessories","subcategory":"accessories","price":59,"condition":"New"},
  {"slug":"winter-all-terrain-wheel-upgrade-kit","name":"Winter / All-Terrain Wheel Upgrade Kit","brand":"generic","brandName":"Generic","category":"accessories","subcategory":"accessories","price":129,"condition":"New"},
  {"slug":"sand-wet-weather-tyres-and-bag-rain-cover","name":"Sand / Wet-Weather Tyres & Bag Rain Cover","brand":"generic","brandName":"Generic","category":"accessories","subcategory":"accessories","price":49,"condition":"New"},
  {"slug":"golf-cart-bag-14-way-divider","name":"Golf Cart Bag (14-Way Divider)","brand":"generic","brandName":"Generic","category":"accessories","subcategory":"bags","price":299,"condition":"New"},
  {"slug":"big-max-dri-lite-premium-cart-bag","name":"Big Max Dri Lite Premium Cart Bag","brand":"big-max","brandName":"Big Max","category":"accessories","subcategory":"bags","price":395,"condition":"New"},
  {"slug":"lightweight-golf-stand-bag","name":"Lightweight Golf Stand Bag","brand":"generic","brandName":"Generic","category":"accessories","subcategory":"bags","price":215,"condition":"New"},
  {"slug":"soft-golf-travel-bag","name":"Soft Golf Travel Bag","brand":"generic","brandName":"Generic","category":"accessories","subcategory":"bags","price":215,"condition":"New"},
  {"slug":"titleist-pro-v1-golf-balls-dozen","name":"Titleist Pro V1 Golf Balls (Dozen)","brand":"titleist","brandName":"Titleist","category":"accessories","subcategory":"golf-balls","price":79,"condition":"New"},
  {"slug":"taylormade-tp5-golf-balls-dozen","name":"TaylorMade TP5 Golf Balls (Dozen)","brand":"taylormade","brandName":"TaylorMade","category":"accessories","subcategory":"golf-balls","price":79,"condition":"New"},
  {"slug":"srixon-z-star-golf-balls-dozen","name":"Srixon Z-Star Golf Balls (Dozen)","brand":"srixon","brandName":"Srixon","category":"accessories","subcategory":"golf-balls","price":69,"condition":"New"},
  {"slug":"precision-pro-nx7-golf-rangefinder","name":"Precision Pro NX7 Golf Rangefinder","brand":"precision-pro","brandName":"Precision Pro","category":"accessories","subcategory":"rangefinders-gps","price":479,"condition":"New"},
  {"slug":"bushnell-tour-v5-golf-rangefinder","name":"Bushnell Tour V5 Golf Rangefinder","brand":"bushnell","brandName":"Bushnell","category":"accessories","subcategory":"rangefinders-gps","price":549,"condition":"New"},
  {"slug":"bushnell-pro-x3-golf-rangefinder","name":"Bushnell Pro X3 Golf Rangefinder","brand":"bushnell","brandName":"Bushnell","category":"accessories","subcategory":"rangefinders-gps","price":899,"condition":"New"},
  {"slug":"shot-scope-g5-gps-golf-watch","name":"Shot Scope G5 GPS Golf Watch","brand":"shot-scope","brandName":"Shot Scope","category":"accessories","subcategory":"rangefinders-gps","price":239,"condition":"New"},
  {"slug":"garmin-approach-s12-gps-golf-watch","name":"Garmin Approach S12 GPS Golf Watch","brand":"garmin","brandName":"Garmin","category":"accessories","subcategory":"rangefinders-gps","price":249,"condition":"New"},
  {"slug":"garmin-approach-s42-gps-golf-watch","name":"Garmin Approach S42 GPS Golf Watch","brand":"garmin","brandName":"Garmin","category":"accessories","subcategory":"rangefinders-gps","price":449,"condition":"New"},
  {"slug":"golf-putting-mat","name":"Golf Putting Mat","brand":"generic","brandName":"Generic","category":"accessories","subcategory":"practice-aids","price":89,"condition":"New"},
  {"slug":"golf-practice-hitting-net","name":"Golf Practice Hitting Net","brand":"generic","brandName":"Generic","category":"accessories","subcategory":"practice-aids","price":129,"condition":"New"},
  {"slug":"golf-hitting-mat","name":"Golf Hitting Mat","brand":"generic","brandName":"Generic","category":"accessories","subcategory":"practice-aids","price":119,"condition":"New"},
  {"slug":"junior-golf-club-set","name":"Junior Golf Club Set","brand":"various","brandName":"Various","category":"golf-clubs","subcategory":"complete-sets","price":249,"condition":"New"},
  {"slug":"beginner-complete-golf-club-set-12-piece","name":"Beginner Complete Golf Club Set (12-Piece)","brand":"various","brandName":"Various","category":"golf-clubs","subcategory":"complete-sets","price":699,"condition":"New"},
  {"slug":"ladies-complete-golf-club-set","name":"Ladies' Complete Golf Club Set","brand":"various","brandName":"Various","category":"golf-clubs","subcategory":"complete-sets","price":799,"condition":"New"},
  {"slug":"golf-driver","name":"Golf Driver","brand":"various","brandName":"Various","category":"golf-clubs","subcategory":"woods-and-irons","price":449,"condition":"New"},
  {"slug":"mid-range-golf-iron-set","name":"Mid-Range Golf Iron Set","brand":"various","brandName":"Various","category":"golf-clubs","subcategory":"woods-and-irons","price":1199,"condition":"New"},
  {"slug":"golf-wedge","name":"Golf Wedge","brand":"various","brandName":"Various","category":"golf-clubs","subcategory":"wedges-and-putters","price":199,"condition":"New"},
  {"slug":"golf-putter","name":"Golf Putter","brand":"various","brandName":"Various","category":"golf-clubs","subcategory":"wedges-and-putters","price":199,"condition":"New"}
];

// Read current products file
const productsFilePath = path.resolve('./src/config/products.js');
let productsContent = fs.readFileSync(productsFilePath, 'utf8');

// Match existing slugs
const existingSlugMatches = [...productsContent.matchAll(/slug:\s*'([^']+)'/g)].map(m => m[1]);
const existingSlugs = new Set(existingSlugMatches);

const skippedSlugs = [];
const newProductBlocks = [];
const placeholderProducts = [];

for (const item of inputItems) {
  if (existingSlugs.has(item.slug)) {
    skippedSlugs.push(item.slug);
    continue;
  }

  existingSlugs.add(item.slug);
  placeholderProducts.push(item.slug);

  const cleanName = item.name.replace(/'/g, "\\'");
  const cleanBrandName = item.brandName.replace(/'/g, "\\'");

  const productBlock = `  {
    slug: '${item.slug}',
    name: '${cleanName}',
    brand: '${item.brand}',
    brandName: '${cleanBrandName}',
    category: '${item.category}',
    subcategory: '${item.subcategory}',
    categoryPath: '/${item.category}/',
    price: ${item.price},
    condition: '${item.condition}',
    featured: false,
    rating: 0,
    reviewCount: 0,
    primaryKeyword: '${cleanName.toLowerCase()}',
    shortDescription: '${cleanName} available at The Buggy Shop Australia with Australian warranty and fast nationwide shipping.',
    description: 'The ${cleanName} provides high quality performance for Australian golfers and property owners. Built with durable materials and supported by local Australian technical service.',
    specs: {
      power: '${item.category.includes('electric') || item.category.includes('remote') ? 'Electric / Lithium' : item.category.includes('petrol') ? 'Petrol' : 'Manual / Accessory'}',
      brand: '${cleanBrandName}',
      condition: '${item.condition}',
      category: '${item.category}',
      warranty: '1-Year Australian Manufacturer Warranty'
    },
    // TODO: replace placeholder image
    images: [
      '/images/placeholder.webp'
    ]
  }`;

  newProductBlocks.push(productBlock);
}

// Append new products before the closing bracket of PRODUCTS array
const insertionPoint = productsContent.lastIndexOf('];');
if (insertionPoint !== -1 && newProductBlocks.length > 0) {
  const updatedProductsContent = productsContent.slice(0, insertionPoint) + 
    ',\n' + newProductBlocks.join(',\n') + '\n];\n' + 
    productsContent.slice(insertionPoint + 2);
  fs.writeFileSync(productsFilePath, updatedProductsContent, 'utf8');
  console.log(`Appended ${newProductBlocks.length} products to src/config/products.js`);
}

console.log('Skipped duplicate slugs count:', skippedSlugs.length);
console.log('Skipped duplicate slugs:', skippedSlugs);
console.log('Total placeholder products count:', placeholderProducts.length);
