// src/config/product-facts.js
// Manufacturer facts for individual products, each with the page it came from (researched November 2026).
// Rules: (1) only attributes that stay true across model years go in, worded as "the manufacturer describes ...";
// (2) where manufacturer pages disagree (Srixon compression, Shot Scope battery and course counts, Bushnell lens size),
// the figure is left out; (3) a product with no entry here keeps the honest generated copy from product-copy.js.
// What could NOT be confirmed is listed in docs/research-sources.md.
//
// Shape: slug -> { lead: string, specs: { specKey: value }, sources: [{ label, url }] }

export const PRODUCT_FACTS = {
  'titleist-pro-v1-golf-balls-dozen': {
    lead: 'Titleist describes the Pro V1 as a three-piece golf ball with a cast urethane cover.',
    specs: { construction: '3-piece', cover: 'Cast urethane', pack: 'One dozen (12 balls)' },
    sources: [{ label: 'Titleist: inside the golf ball lineup', url: 'https://www.titleist.com/golf-balls/inside-the-titleist-golf-ball-lineup' }],
  },
  'taylormade-tp5-golf-balls-dozen': {
    lead: 'TaylorMade describes the TP5 as a five-layer golf ball with a soft urethane cover.',
    specs: { construction: '5-layer', cover: 'Urethane', pack: 'One dozen (12 balls)' },
    sources: [{ label: 'TaylorMade: TP5 golf balls', url: 'https://www.taylormadegolf.com.au/TP5-Golf-Balls/M7152701.html?lang=en_AU' }],
  },
  'srixon-z-star-golf-balls-dozen': {
    lead: 'Srixon describes the Z-Star as a three-piece golf ball with a thin urethane cover.',
    specs: { construction: '3-piece', cover: 'Thin urethane', pack: 'One dozen (12 balls)' },
    sources: [{ label: 'Srixon: Z-Star golf balls', url: 'https://us.dunlopsports.com/srixon/balls/z-star-series/z-star/z-star-golf-balls/ZSTAR9.html' }],
  },
  'bushnell-tour-v5-golf-rangefinder': {
    lead: 'The Bushnell Tour V5 is a laser rangefinder with 6x magnification and a range of 5 to 1,300 yards, accurate to within one yard. It runs on a CR2 lithium battery.',
    specs: { magnification: '6x', range: '5 to 1,300 yards', accuracy: 'Plus or minus 1 yard', battery: 'CR2 3V lithium', slope: 'No (the Tour V5 Shift adds slope)' },
    sources: [
      { label: 'Bushnell: Tour V5 owner\'s guide', url: 'https://www.bushnellgolf.com/content/product/Laser%20Rangfinders/Tour%20V5/Manual/201901_201911_TourV5_TourV5Shift_FullManual_10LIM_web.pdf' },
      { label: 'Bushnell: Tour V5', url: 'https://www.bushnellgolf.com/products/laser-rangefinders/tour-v5/' },
    ],
  },
  'bushnell-pro-x3-golf-rangefinder': {
    lead: 'Bushnell lists the Pro X3 as a 7x laser rangefinder with a range of 5 to 1,300 yards and one-yard accuracy, with a slope switch that can be locked off for tournament play.',
    specs: { magnification: '7x', range: '5 to 1,300 yards', accuracy: '1 yard', battery: 'CR2 3V lithium', weight: '12 oz', waterproof: 'IPX7', slope: 'Switchable' },
    sources: [{ label: 'Bushnell: Pro X3', url: 'https://www.bushnellgolf.com/products/pro-x3' }],
  },
  'garmin-approach-s12-gps-golf-watch': {
    lead: 'Garmin rates the Approach S12 at up to 30 hours of battery life in GPS golf mode and up to 10 weeks in watch mode, with a 1.3-inch sunlight-readable round display and about 42,000 preloaded CourseView maps.',
    specs: { battery: 'Up to 30 hours GPS golf, up to 10 weeks watch mode', display: '1.3-inch round, sunlight-readable', courses: 'About 42,000 preloaded CourseView maps', waterRating: '5 ATM' },
    sources: [{ label: 'Garmin: Approach S12 specifications', url: 'https://www8.garmin.com/manuals/webhelp/GUID-20B1A0A2-73B9-4655-8848-D21854EFD433/EN-US/GUID-03D49EDC-F46E-4333-BDB1-BB4F18609397.html' }],
  },
  'garmin-approach-s42-gps-golf-watch': {
    lead: 'Garmin rates the Approach S42 at about 15 hours of battery life in GPS mode and up to 10 days in watch mode, with a 1.2-inch colour touchscreen and more than 42,000 preloaded CourseView maps.',
    specs: { battery: 'About 15 hours GPS, up to 10 days watch mode', display: '1.2-inch colour touchscreen', courses: 'More than 42,000 preloaded CourseView maps', features: 'Green View, AutoShot shot distances', waterRating: '5 ATM' },
    sources: [
      { label: 'Garmin: Approach S40/S42 specifications', url: 'https://www8.garmin.com/manuals/webhelp/approachs40/EN-US/GUID-4728CCA2-B763-410D-B911-9B9B95421812.html' },
      { label: 'Garmin: Approach S42', url: 'https://www.garmin.com/en-US/p/743387/' },
    ],
  },
  'shot-scope-g5-gps-golf-watch': {
    lead: 'Shot Scope lists the G5 as a 42 g GPS golf watch with a 44 mm case and a daylight-readable colour screen that shows distances on the course without needing a phone.',
    specs: { weight: '42 g', caseSize: '44 mm diameter', display: 'Daylight-readable colour screen', connectivity: 'GPS and Bluetooth 5; no phone needed on the course', shotData: 'Last shot distance' },
    sources: [{ label: 'Shot Scope: G5 GPS watch', url: 'https://shotscope.com/us/shop/products/golf-gps-watches/g5-gps-watch/' }],
  },
  'trojan-t105-flooded-battery-set-48v-8-batteries': {
    lead: 'Each Trojan T-105 is a 6V flooded lead-acid battery rated 225 Ah at the 20-hour rate, and eight of them in series make a 48V set. Trojan lists each battery at 28 kg (62 lb).',
    specs: { chemistry: 'Flooded lead-acid', cellVoltage: '6V per battery (8 batteries = 48V)', capacity: '225 Ah at the 20-hour rate', weightEach: '28 kg (62 lb)' },
    sources: [{ label: 'Trojan Battery: T-105', url: 'https://www.trojanbattery.com/products/t-105-6v-flooded-battery' }],
  },
  'trojan-t875-flooded-battery-set-48v': {
    lead: 'Each Trojan T-875 is an 8V flooded lead-acid battery rated 170 Ah at the 20-hour rate. Trojan lists each battery at 29 kg (63 lb).',
    specs: { chemistry: 'Flooded lead-acid', voltageEach: '8V per battery', capacity: '170 Ah at the 20-hour rate', weightEach: '29 kg (63 lb)' },
    sources: [{ label: 'Trojan Battery: T-875', url: 'https://www.trojanbattery.com/products/t-875-8v-flooded-battery' }],
  },
};
