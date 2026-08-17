const STORE = {
  whatsapp: "966501414422",
  email: "hello.mervea@gmail.com",
  bank: "Al Rajhi Bank",
  iban: "SA1180000501608016015772",
  ibanDisplay: "SA11 8000 0501 6080 1601 5772",
};

const PRODUCTS = [
  {
    id: "hibiscus-sugar-polish",
    name: "Hibiscus Sugar Body Polish",
    category: "scrubs",
    categoryLabel: "Body Scrubs",
    price: 36,
    size: "300g · 10.6 oz",
    scent: "Hibiscus Bloom",
    ritual: "Exfoliate. Nourish. Glow.",
    image: "images/body-polish.png",
    short: "A crystalline hibiscus sugar polish that buffs away dullness and leaves skin silky, luminous, and ready to drink in moisture.",
    description:
      "Hand-blended with fine cane sugar and hibiscus petals, this body polish is a weekly ritual of renewal. The grains melt as they polish, while botanical oils leave a soft, healthy-looking glow — never stripped, never greasy.",
    benefits: [
      "100% natural botanicals",
      "Made for all skin types",
      "Healthy-looking, glowing skin",
      "Handmade in small batches",
    ],
    howTo:
      "On damp skin, massage in slow circles from ankles upward. Rinse with warm water. Follow with Glow Oil or Whipped Body Butter while skin is still dewy.",
  },
  {
    id: "whipped-body-butter",
    name: "Whipped Body Butter",
    category: "butters",
    categoryLabel: "Body Butters",
    price: 42,
    size: "200g · 7.05 oz",
    scent: "Hibiscus Soft",
    ritual: "Nourish. Moisturize. Glow.",
    image: "images/body-butter.png",
    short: "A cloud-light hibiscus butter that melts into skin, sealing in moisture for a cushioned, candlelit glow.",
    description:
      "Whipped until airy, this body butter is rich without weight. Shea, hibiscus, and a whisper of rose-gold oils sink in slowly — the kind of moisture that still looks healthy the next morning.",
    benefits: [
      "100% natural ingredients",
      "Comforts every skin type",
      "Lasting, healthy-looking glow",
      "Cruelty-free and handmade",
    ],
    howTo:
      "Warm a pearl-sized amount between palms. Press onto still-damp skin after bathing, or as the last step of your evening ritual.",
  },
  {
    id: "glow-oil",
    name: "Glow Oil",
    category: "oil",
    categoryLabel: "Glow Oil",
    price: 48,
    size: "100ml · 3.38 fl oz",
    scent: "Hibiscus Bloom",
    ritual: "Nourish. Soften. Glow.",
    image: "images/glow-oil.png",
    short: "A shimmering hibiscus oil that softens, scents, and leaves a quiet, sunlit sheen on every skin type.",
    description:
      "Amber hibiscus oil with a fine copper shimmer. It slips on like silk, never heavy, and catches the light the way healthy skin should — a daily ritual in a glass bottle.",
    benefits: [
      "100% natural hibiscus blend",
      "Made for all skin types",
      "Soft, healthy-looking radiance",
      "Fine botanical shimmer",
    ],
    howTo:
      "Dispense 2–3 pumps into palms. Sweep over body after the polish, or mix a drop into body butter for extra glow.",
  },
  {
    id: "hibiscus-botanical-soap",
    name: "Hibiscus Botanical Soap",
    category: "soap",
    categoryLabel: "Body Soap",
    price: 18,
    size: "120g · 4.23 oz",
    scent: "Hibiscus",
    ritual: "Natural. Handmade. Nurturing.",
    image: "images/botanical-soap.png",
    short: "A dusty-rose bar flecked with hibiscus, handmade to cleanse gently and leave skin calm, soft, and nurtured.",
    description:
      "Cold-process and speckled with real hibiscus, this botanical soap is a quiet daily ritual. It lathers softly, never strips, and leaves a clean, petal-warm scent on the skin.",
    benefits: [
      "100% natural botanicals",
      "Gentle on all skin types",
      "Nurtures a healthy-looking barrier",
      "Handmade with care",
    ],
    howTo:
      "Work into a soft lather on wet skin. Rinse. Follow with polish on ritual days, then oil or butter.",
  },
];

const CATEGORIES = [
  {
    id: "scrubs",
    name: "Body Scrubs",
    line: "Polish",
    copy: "Sugar grains and hibiscus petals to renew the skin.",
    image: "images/body-polish.png",
  },
  {
    id: "butters",
    name: "Body Butters",
    line: "Nourish",
    copy: "Whipped moisture for a cushioned, lasting glow.",
    image: "images/body-butter.png",
  },
  {
    id: "soap",
    name: "Body Soap",
    line: "Cleanse",
    copy: "Handmade botanical bars for a gentle daily ritual.",
    image: "images/botanical-soap.png",
  },
  {
    id: "oil",
    name: "Glow Oil",
    line: "Glow",
    copy: "A shimmering hibiscus oil for healthy-looking skin.",
    image: "images/glow-oil.png",
  },
];
