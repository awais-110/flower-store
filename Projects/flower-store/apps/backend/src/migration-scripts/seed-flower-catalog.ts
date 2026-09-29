import { MedusaContainer } from "@medusajs/framework"
import type { FulfillmentWorkflow } from "@medusajs/framework/types"
import {
  ContainerRegistrationKeys,
  ModuleRegistrationName,
  Modules,
  ProductStatus,
} from "@medusajs/framework/utils"
import {
  createApiKeysWorkflow,
  createCollectionsWorkflow,
  createInventoryLevelsWorkflow,
  createProductCategoriesWorkflow,
  createProductTagsWorkflow,
  createProductTypesWorkflow,
  createProductsWorkflow,
  createRegionsWorkflow,
  createSalesChannelsWorkflow,
  createShippingOptionsWorkflow,
  createStockLocationsWorkflow,
  createStoresWorkflow,
  createTaxRegionsWorkflow,
  deleteProductsWorkflow,
  linkSalesChannelsToApiKeyWorkflow,
  linkSalesChannelsToStockLocationWorkflow,
  updateProductsWorkflow,
} from "@medusajs/medusa/core-flows"

type Stem = {
  handle: string
  name: string
  priceEur: number
}

const COUNTRY_CODES = ["gb", "de", "dk", "se", "fr", "es", "it"]

const IMG = {
  rose:
    "https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=1200&q=80",
  white:
    "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=1200&q=80",
  garden:
    "https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=1200&q=80",
  ranunculus:
    "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1200&q=80",
  ranunculusPink:
    "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&w=1200&q=80",
  orchid:
    "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80",
  candle:
    "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=1200&q=80",
  truffles:
    "https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=1200&q=80",
  shears:
    "https://images.unsplash.com/photo-1598880940371-c756e015fea1?auto=format&fit=crop&w=1200&q=80",
  vase:
    "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1200&q=80",
  sunflower:
    "https://images.unsplash.com/photo-1508614999368-9260051292e5?auto=format&fit=crop&w=1200&q=80",
  lavender:
    "https://images.unsplash.com/photo-1581783898377-1c85bf937427?auto=format&fit=crop&w=1200&q=80",
  dahlia:
    "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=1200&q=80",
  olive:
    "https://images.unsplash.com/photo-1522735338363-cc7313be0ae0?auto=format&fit=crop&w=1200&q=80",
}

const CARE_DEFAULT = [
  "Trim stems at a 45-degree angle under cold running water upon arrival.",
  "Place in a clean vase filled with cold water and flower food.",
  "Keep away from direct sunlight, heating drafts and fruit bowls.",
  "Refresh the water every 2 days for prolonged bloom life.",
]

const COLLECTIONS = [
  { handle: "signature-curations", title: "The Signature Collection" },
  { handle: "best-sellers", title: "Best Sellers" },
  { handle: "seasonal-harvest", title: "The Seasonal Harvest" },
  { handle: "the-icons", title: "The Atelier Icons" },
  { handle: "single-stems", title: "Curated Single Stems" },
  { handle: "gifts-accessories", title: "Gifts & Atelier Accessories" },
]

const CATEGORY_TREE = [
  { name: "Bouquets", handle: "bouquets", children: ["Roses", "Peonies & Ranunculus", "Seasonal Blooms"] },
  { name: "Arrangements", handle: "arrangements", children: [] },
  { name: "Single Stems", handle: "single-stems", children: [] },
  { name: "Plants", handle: "plants", children: ["Orchids", "Indoor Trees & Foliage"] },
  { name: "Gift Sets", handle: "gift-sets", children: ["Add-Ons"] },
]

const PRODUCT_TYPES = ["Bouquet", "Arrangement", "Plant", "Single Stem", "Add-On"]

const PRODUCT_TAGS = [
  "for-love",
  "for-celebration",
  "for-gratitude",
  "just-because",
  "rose",
  "ranunculus",
  "peony",
  "orchid",
  "sunflower",
  "lavender",
  "dahlia",
  "jasmine",
  "eucalyptus",
  "anemone",
  "olive",
  "best-seller",
  "featured",
]

const DEMO_HANDLES = [
  "red-rose-bouquet",
  "t-shirt",
  "sweatshirt",
  "sweatpants",
  "shorts",
]

type Variant = {
  title: string
  sku: string
  eur: number
  usd: number
}

type ProductSeed = {
  title: string
  subtitle: string
  handle: string
  description: string
  type: string
  categories: string[]
  collections: string[]
  tags: string[]
  thumbnail: string
  images: string[]
  feeling: string
  badge?: string
  rating?: number
  review_count?: number
  origin?: string
  stem_count?: string
  vase_life?: string
  scent_profile?: string
  care_instructions?: string[]
  variants: Variant[]
}

const PRODUCT_SEEDS: ProductSeed[] = [
  {
    title: "The Romanée Blush",
    subtitle: "Garden Roses, Wild Ranunculus & Silver Dollar Eucalyptus",
    handle: "the-romanee-blush",
    description:
      "An ethereal ode to classic French botanical painters. Hand-selected garden roses in delicate shades of antique alabaster and tea blush, nested with fluttering butterfly ranunculus and fragrant cascading silver eucalyptus. Designed to evoke romantic softness and quiet luxury.",
    type: "Bouquet",
    categories: ["Bouquets", "Roses"],
    collections: ["signature-curations", "best-sellers", "the-icons"],
    tags: ["for-love", "rose", "ranunculus", "eucalyptus", "best-seller", "featured"],
    thumbnail: IMG.rose,
    images: [IMG.rose, IMG.ranunculus, IMG.garden],
    feeling: "FOR LOVE",
    badge: "Most Coveted",
    rating: 4.96,
    review_count: 84,
    origin: "Loire Valley, France & San Remo, Italy",
    stem_count: "32-36 premium stems",
    vase_life: "7-10 days with a cold water change every 48h",
    scent_profile: "Green tea notes, wild honey, damascena rose",
    care_instructions: CARE_DEFAULT,
    variants: [
      { title: "Classic (24 Stems)", sku: "ROM-BLUSH-CLS", eur: 9800, usd: 10900 },
      { title: "Signature (36 Stems)", sku: "ROM-BLUSH-SIG", eur: 13500, usd: 14900 },
      { title: "Grand Luxe (52 Stems)", sku: "ROM-BLUSH-GRD", eur: 18900, usd: 20900 },
    ],
  },
  {
    title: "The Florentine Cypress",
    subtitle: "Olive Branches, White Anemones & Green Hellebores",
    handle: "the-florentine-cypress",
    description:
      "Sculptural Tuscan greens married with stark black-eyed anemones and nodding emerald hellebores. A sophisticated architectural arrangement celebrating textural foliage, silver-dusted olive leaves and rare winter blooms.",
    type: "Arrangement",
    categories: ["Arrangements"],
    collections: ["signature-curations"],
    tags: ["for-gratitude", "anemone", "olive"],
    thumbnail: IMG.white,
    images: [IMG.white, IMG.ranunculusPink],
    feeling: "FOR GRATITUDE",
    badge: "Editorial Pick",
    rating: 4.92,
    review_count: 51,
    origin: "Tuscany, Italy & Somerset, UK",
    stem_count: "28-32 stems",
    vase_life: "9-12 days",
    scent_profile: "Wild cypress, crushed rosemary, herbal green",
    care_instructions: [
      "Cut 2cm off woody stems at an angle with sharp shears.",
      "Remove any foliage below the water line.",
      "Maintain a room temperature around 18-20C.",
    ],
    variants: [
      { title: "Signature (30 Stems)", sku: "FLO-CYP-SIG", eur: 14500, usd: 15900 },
      { title: "Grand Luxe (48 Stems)", sku: "FLO-CYP-GRD", eur: 19900, usd: 21900 },
    ],
  },
  {
    title: "Soleil d'Antibes",
    subtitle: "Mimosa Fronds, Apricot Ranunculus & Champagne Peonies",
    handle: "soleil-d-antibes",
    description:
      "Golden Mediterranean sunlight captured in botanical form. Feathery mimosa fluff paired with plump, ruffled apricot garden roses and luminous champagne peonies. A joyful, radiant statement piece tailored for milestones and elevated celebrations.",
    type: "Bouquet",
    categories: ["Bouquets", "Peonies & Ranunculus"],
    collections: ["signature-curations", "seasonal-harvest"],
    tags: ["for-celebration", "peony", "ranunculus", "featured"],
    thumbnail: IMG.ranunculus,
    images: [IMG.ranunculus, IMG.ranunculusPink],
    feeling: "FOR CELEBRATION",
    badge: "Limited Seasonal Harvest",
    rating: 4.98,
    review_count: 67,
    origin: "Cote d'Azur, France",
    stem_count: "35 stems",
    vase_life: "6-8 days",
    scent_profile: "Honeyed almond, mimosa pollen, warm amber",
    care_instructions: [
      "Mist the mimosa with room temperature water.",
      "Keep away from direct heating radiators.",
    ],
    variants: [
      { title: "Classic (25 Stems)", sku: "SOL-ANT-CLS", eur: 11500, usd: 12900 },
      { title: "Signature (35 Stems)", sku: "SOL-ANT-SIG", eur: 15900, usd: 17500 },
      { title: "Imperial (60 Stems)", sku: "SOL-ANT-IMP", eur: 23900, usd: 25900 },
    ],
  },
  {
    title: "The Alabaster Court",
    subtitle: "Climbing White Jasmine, Avalanche Roses & Bleached Ruscus",
    handle: "the-alabaster-court",
    description:
      "A monument of serene, monochrome majesty. Layered ivory petals of immaculate Avalanche garden roses interwoven with tendrils of star jasmine, sweet peas and architectural bleached ruscus. Pure quiet luxury.",
    type: "Bouquet",
    categories: ["Bouquets", "Roses"],
    collections: ["the-icons", "best-sellers"],
    tags: ["just-because", "jasmine", "rose", "best-seller"],
    thumbnail: IMG.garden,
    images: [IMG.garden, IMG.rose],
    feeling: "JUST BECAUSE",
    badge: "Atelier Icon",
    rating: 5.0,
    review_count: 112,
    origin: "Aalsmeer, The Netherlands & Grasse, France",
    stem_count: "40 stems",
    vase_life: "8-11 days",
    scent_profile: "Night-blooming jasmine, clean linen, dewy petals",
    care_instructions: [
      "Jasmine vines can be gently trained around the rim of your vase.",
      "Replenish the floral preservative solution every third day.",
    ],
    variants: [
      { title: "Signature (30 Stems)", sku: "ALA-CRT-SIG", eur: 16500, usd: 17900 },
      { title: "Grand (45 Stems)", sku: "ALA-CRT-GRD", eur: 23500, usd: 25500 },
    ],
  },
  {
    title: "Verveine & Wild Ranunculus",
    subtitle: "Deep Plum Buttercups, Lemon Verbena & Pistache Foliage",
    handle: "verveine-and-wild-ranunculus",
    description:
      "Sensory, moody and deeply tactile. Velvety layers of jewel-toned plum ranunculus contrast with fresh citrus-aromatic verbena and feather-light wild grasses, arranged with wild painterly asymmetry.",
    type: "Bouquet",
    categories: ["Bouquets", "Peonies & Ranunculus"],
    collections: ["seasonal-harvest"],
    tags: ["for-love", "ranunculus"],
    thumbnail: IMG.ranunculusPink,
    images: [IMG.ranunculusPink],
    feeling: "FOR LOVE",
    badge: "Staff Selection",
    rating: 4.89,
    review_count: 38,
    origin: "San Remo, Italy",
    stem_count: "28 stems",
    vase_life: "7-9 days",
    scent_profile: "Zesty crushed verbena leaf, earthy moss",
    care_instructions: [
      "Handle stems near the bloom base when positioning.",
      "Keep a 10-12cm water level to avoid soft stem deterioration.",
    ],
    variants: [
      { title: "Signature (28 Stems)", sku: "VER-RAN-SIG", eur: 15500, usd: 16900 },
      { title: "Abundance (42 Stems)", sku: "VER-RAN-ABU", eur: 21500, usd: 23500 },
    ],
  },
  {
    title: "The Kyoto Orchid Cascade",
    subtitle: "Cascade White Phalaenopsis & Preserved Magnolia Leaves",
    handle: "the-kyoto-orchid-cascade",
    description:
      "A living sculpture of balance and tranquility. Arching pristine double-stemmed white moth orchids anchored in river pebbles and dressed in polished matte vessels. Endures for up to two months with minimal mindful care.",
    type: "Arrangement",
    categories: ["Plants", "Orchids"],
    collections: ["signature-curations", "the-icons", "best-sellers"],
    tags: ["for-gratitude", "orchid", "featured"],
    thumbnail: IMG.orchid,
    images: [IMG.orchid],
    feeling: "FOR GRATITUDE",
    badge: "Rare Specimen",
    rating: 4.97,
    review_count: 44,
    origin: "Kyoto Prefecture, Japan",
    stem_count: "2 multi-branch specimen orchids",
    vase_life: "6-8 weeks flowering duration",
    scent_profile: "Clean mineral notes, faint sweet vanilla",
    care_instructions: [
      "Water with 3 ice cubes or 50ml tepid water once per week.",
      "Prefers indirect filtered daylight.",
    ],
    variants: [
      { title: "Charcoal Stoneware Urn", sku: "KYO-ORC-URN", eur: 17500, usd: 19500 },
      { title: "Smoked Fluted Glass", sku: "KYO-ORC-GLS", eur: 18900, usd: 20900 },
    ],
  },
  {
    title: "The Tuscan Sun",
    subtitle: "Helios Sunflowers, Golden Montbretia & Olive Fronds",
    handle: "the-tuscan-sun",
    description:
      "A harvest of radiant summer light. Velvet-soft helios sunflowers gathered with saffron montbretia and dusty olive fronds, composed for tables that command attention.",
    type: "Bouquet",
    categories: ["Bouquets", "Seasonal Blooms"],
    collections: ["seasonal-harvest"],
    tags: ["for-celebration", "sunflower"],
    thumbnail: IMG.sunflower,
    images: [IMG.sunflower, IMG.rose],
    feeling: "FOR CELEBRATION",
    badge: "Glowing Harvest",
    rating: 4.91,
    review_count: 29,
    origin: "Tuscany, Italy",
    stem_count: "28 stems",
    vase_life: "5-7 days",
    scent_profile: "Warm hay, fresh-cut stems, subtle citrus",
    care_instructions: CARE_DEFAULT,
    variants: [
      { title: "Classic (22 Stems)", sku: "TUS-SUN-CLS", eur: 8500, usd: 9500 },
      { title: "Signature (30 Stems)", sku: "TUS-SUN-SIG", eur: 11900, usd: 12900 },
      { title: "Grand Luxe (48 Stems)", sku: "TUS-SUN-GRD", eur: 16500, usd: 17900 },
    ],
  },
  {
    title: "The Provence Lavender",
    subtitle: "True Lavender, Silver Eucalyptus & Ivory Garden Roses",
    handle: "the-provence-lavender",
    description:
      "Sun-drenched Provencal fragrance bottled into an arrangement. Scented true lavender woven through silvery eucalyptus and a whisper of ivory garden roses - calm, clean and deeply evocative of the French countryside.",
    type: "Bouquet",
    categories: ["Bouquets", "Seasonal Blooms"],
    collections: ["seasonal-harvest", "best-sellers"],
    tags: ["just-because", "lavender", "best-seller"],
    thumbnail: IMG.lavender,
    images: [IMG.lavender, IMG.garden],
    feeling: "JUST BECAUSE",
    badge: "Summer Romance",
    rating: 4.94,
    review_count: 73,
    origin: "Valensole Plateau, France",
    stem_count: "32 stems",
    vase_life: "7-9 days",
    scent_profile: "Dried lavender, camphor, clean linen",
    care_instructions: CARE_DEFAULT,
    variants: [
      { title: "Classic (24 Stems)", sku: "PRO-LAV-CLS", eur: 9200, usd: 9900 },
      { title: "Signature (36 Stems)", sku: "PRO-LAV-SIG", eur: 12900, usd: 13900 },
    ],
  },
  {
    title: "The Amber Dahlia",
    subtitle: "Cafe au Lait Dahlias, Bronze Ruscus & Apricot Lisianthus",
    handle: "the-amber-dahlia",
    description:
      "An autumnal masterpiece in painterly amber. Enormous cafe au lait dahlias layered with bronze ruscus and apricot lisianthus for a dazzling, museum-worthy centrepiece.",
    type: "Bouquet",
    categories: ["Bouquets", "Seasonal Blooms"],
    collections: ["seasonal-harvest"],
    tags: ["for-celebration", "dahlia"],
    thumbnail: IMG.dahlia,
    images: [IMG.dahlia, IMG.ranunculus],
    feeling: "FOR CELEBRATION",
    badge: "Autumn Bespoke",
    rating: 4.9,
    review_count: 41,
    origin: "Hilversum, The Netherlands",
    stem_count: "24 stems",
    vase_life: "5-8 days",
    scent_profile: "Earthy petals, fresh stems",
    care_instructions: CARE_DEFAULT,
    variants: [
      { title: "Signature (24 Stems)", sku: "AMB-DAH-SIG", eur: 13900, usd: 14900 },
      { title: "Grand (38 Stems)", sku: "AMB-DAH-GRD", eur: 19500, usd: 20900 },
    ],
  },
  {
    title: "Ivory Garden Rose",
    subtitle: "Single Stem, wrapped in kraft and ready to be tucked into your bespoke composition",
    handle: "ivory-rose-stem",
    description:
      "A single alabaster tea rose from the Loire Valley, wrapped in kraft and ready to be tucked into your bespoke composition.",
    type: "Single Stem",
    categories: ["Single Stems"],
    collections: ["single-stems"],
    tags: ["for-love", "rose"],
    thumbnail: IMG.rose,
    images: [IMG.rose],
    feeling: "FOR LOVE",
    badge: "Studio Cut",
    rating: 4.8,
    review_count: 12,
    origin: "Loire Valley, France",
    stem_count: "1 premium stem",
    vase_life: "5-7 days",
    scent_profile: "Wild honey, damascena rose",
    care_instructions: CARE_DEFAULT,
    variants: [{ title: "Standard Stem", sku: "IVY-ROSE-STM", eur: 1200, usd: 1400 }],
  },
  {
    title: "Butterfly Ranunculus",
    subtitle: "Single Stem, candy-toned translucent petals",
    handle: "butterfly-ranunculus-stem",
    description:
      "Candy-toned butterfly ranunculus with airy, translucent petals that catch the light like hand-blown glass.",
    type: "Single Stem",
    categories: ["Single Stems"],
    collections: ["single-stems"],
    tags: ["for-love", "ranunculus"],
    thumbnail: IMG.ranunculus,
    images: [IMG.ranunculus],
    feeling: "FOR LOVE",
    badge: "Studio Cut",
    rating: 4.7,
    review_count: 8,
    origin: "San Remo, Italy",
    stem_count: "1 premium stem",
    vase_life: "6-8 days",
    scent_profile: "Fresh, green, delicate",
    care_instructions: CARE_DEFAULT,
    variants: [{ title: "Standard Stem", sku: "BUT-RAN-STM", eur: 1100, usd: 1300 }],
  },
  {
    title: "Champagne Coral Peony",
    subtitle: "Single Stem, bowl-shaped coral bloom",
    handle: "coral-peony-stem",
    description:
      "A single bowl-shaped coral peony with hypnotic vanilla fragrance - plumper than a cloud, softer than silk.",
    type: "Single Stem",
    categories: ["Single Stems"],
    collections: ["single-stems"],
    tags: ["for-celebration", "peony"],
    thumbnail: IMG.ranunculusPink,
    images: [IMG.ranunculusPink],
    feeling: "FOR CELEBRATION",
    badge: "Studio Cut",
    rating: 4.85,
    review_count: 19,
    origin: "Hilversum, The Netherlands",
    stem_count: "1 premium stem",
    vase_life: "4-6 days",
    scent_profile: "Hypnotic vanilla, honey",
    care_instructions: CARE_DEFAULT,
    variants: [{ title: "Standard Stem", sku: "COR-PEO-STM", eur: 1500, usd: 1700 }],
  },
  {
    title: "Black-Eyed White Anemone",
    subtitle: "Single Stem, papery ivory petals",
    handle: "white-anemone-stem",
    description:
      "Striking charcoal centers surrounded by papery pure white petals - the architectural star of sculptural arrangements.",
    type: "Single Stem",
    categories: ["Single Stems"],
    collections: ["single-stems"],
    tags: ["for-gratitude", "anemone"],
    thumbnail: IMG.white,
    images: [IMG.white],
    feeling: "FOR GRATITUDE",
    badge: "Studio Cut",
    rating: 4.6,
    review_count: 7,
    origin: "Cornwall, UK",
    stem_count: "1 premium stem",
    vase_life: "5-7 days",
    scent_profile: "Clean, cool, mineral",
    care_instructions: CARE_DEFAULT,
    variants: [{ title: "Standard Stem", sku: "ANE-STM", eur: 1000, usd: 1200 }],
  },
  {
    title: "Silver Dollar Eucalyptus",
    subtitle: "Single Stem, architectural silver foliage",
    handle: "eucalyptus-stem",
    description:
      "Fragrant silvery blue-green foliage lending architectural drape and volume to any bespoke composition.",
    type: "Single Stem",
    categories: ["Single Stems"],
    collections: ["single-stems"],
    tags: ["just-because", "eucalyptus"],
    thumbnail: IMG.garden,
    images: [IMG.garden],
    feeling: "JUST BECAUSE",
    badge: "Studio Cut",
    rating: 4.75,
    review_count: 11,
    origin: "Somerset, UK",
    stem_count: "1 premium stem",
    vase_life: "10-14 days",
    scent_profile: "Minty eucalyptus, clean",
    care_instructions: CARE_DEFAULT,
    variants: [{ title: "Standard Stem", sku: "EUC-STM", eur: 700, usd: 900 }],
  },
  {
    title: "Star Jasmine Tendril",
    subtitle: "Single Stem, fragrant climbing vine",
    handle: "star-jasmine-stem",
    description:
      "Delicate fragrant vines cascading gracefully around the bouquet perimeter - night-blooming and impossibly romantic.",
    type: "Single Stem",
    categories: ["Single Stems"],
    collections: ["single-stems"],
    tags: ["just-because", "jasmine"],
    thumbnail: IMG.orchid,
    images: [IMG.orchid],
    feeling: "JUST BECAUSE",
    badge: "Studio Cut",
    rating: 4.7,
    review_count: 6,
    origin: "Grasse, France",
    stem_count: "1 premium stem",
    vase_life: "6-9 days",
    scent_profile: "Night-blooming jasmine",
    care_instructions: CARE_DEFAULT,
    variants: [{ title: "Standard Stem", sku: "JAS-STM", eur: 900, usd: 1100 }],
  },
  {
    title: "White Phalaenopsis Orchid Plant",
    subtitle: "Living plant, arching white moth orchids",
    handle: "phalaenopsis-orchid-plant",
    description:
      "A graceful living orchid plant rooted in river pebbles and dressed in a matte ceramic vessel. Blooms for up to three months with minimal care.",
    type: "Plant",
    categories: ["Plants", "Orchids"],
    collections: ["best-sellers"],
    tags: ["for-gratitude", "orchid"],
    thumbnail: IMG.orchid,
    images: [IMG.orchid],
    feeling: "FOR GRATITUDE",
    badge: "Living Gift",
    rating: 4.88,
    review_count: 56,
    origin: "Kyoto Prefecture, Japan",
    stem_count: "1 multi-branch plant",
    vase_life: "8-12 weeks flowering duration",
    scent_profile: "Faint sweet vanilla",
    care_instructions: [
      "Water with 3 ice cubes or 50ml tepid water once per week.",
      "Prefers indirect filtered daylight.",
    ],
    variants: [{ title: "Stoneware Vessel", sku: "PHAL-PLT", eur: 5900, usd: 6500 }],
  },
  {
    title: "The Silver Olive Tree",
    subtitle: "Living plant, silver-dusted tabletop olive",
    handle: "silver-olive-tree",
    description:
      "A sculptural silver-dusted olive tree trained as a tabletop specimen - a serene, architectural living gift that thrives indoors.",
    type: "Plant",
    categories: ["Plants", "Indoor Trees & Foliage"],
    collections: [],
    tags: ["just-because", "olive"],
    thumbnail: IMG.olive,
    images: [IMG.olive, IMG.white],
    feeling: "JUST BECAUSE",
    badge: "Architectural Living",
    rating: 4.83,
    review_count: 22,
    origin: "Puglia, Italy",
    stem_count: "1 specimen tree",
    vase_life: "Perennial, low-maintenance",
    scent_profile: "Fresh herbal green",
    care_instructions: [
      "Water sparingly; allow the soil to dry between waterings.",
      "Place in bright, indirect light.",
    ],
    variants: [{ title: "Terracotta Pot", sku: "SIL-OLV-POT", eur: 7900, usd: 8500 }],
  },
  {
    title: "Damask Rose & Fig Scented Candle",
    subtitle: "Hand-poured soy wax with Grasse damask rose",
    handle: "damask-rose-candle",
    description:
      "Hand-poured soy wax infused with Grasse damask rose and wild Mediterranean fig - a slow-burning 60-hour fragrance companion.",
    type: "Add-On",
    categories: ["Gift Sets", "Add-Ons"],
    collections: ["gifts-accessories"],
    tags: ["just-because", "featured"],
    thumbnail: IMG.candle,
    images: [IMG.candle],
    feeling: "JUST BECAUSE",
    badge: "Curated Pairing",
    rating: 4.9,
    review_count: 61,
    care_instructions: [
      "Trim the wick to 5mm before each burn.",
      "Allow it to melt to the edges on the first burn.",
    ],
    variants: [{ title: "Single 180g Candle", sku: "DAM-FIG-CND", eur: 3800, usd: 4200 }],
  },
  {
    title: "Artisanal Champagne Truffles",
    subtitle: "Eight handcrafted chocolate truffles",
    handle: "champagne-truffles",
    description:
      "Eight handcrafted truffles dusted with Breton fleur de sel and filled with Grand Cru champagne ganache.",
    type: "Add-On",
    categories: ["Gift Sets", "Add-Ons"],
    collections: ["gifts-accessories", "best-sellers"],
    tags: ["for-celebration", "best-seller"],
    thumbnail: IMG.truffles,
    images: [IMG.truffles],
    feeling: "FOR CELEBRATION",
    badge: "Gourmet Pairing",
    rating: 4.86,
    review_count: 48,
    care_instructions: [
      "Keep refrigerated.",
      "Remove from the fridge 20 minutes before serving.",
    ],
    variants: [{ title: "Box of Eight", sku: "CHP-TRF-BOX", eur: 2800, usd: 3100 }],
  },
  {
    title: "Fluted Ceramic Atelier Vase",
    subtitle: "Matte cream stoneware, thrown in Provence",
    handle: "fluted-ceramic-vase",
    description:
      "Matte cream stoneware thrown on the wheel by artisans in Provence. The definitive vessel for your atelier arrangements.",
    type: "Add-On",
    categories: ["Gift Sets", "Add-Ons"],
    collections: ["gifts-accessories"],
    tags: ["just-because", "featured"],
    thumbnail: IMG.vase,
    images: [IMG.vase],
    feeling: "JUST BECAUSE",
    badge: "Atelier Vessel",
    rating: 4.84,
    review_count: 33,
    care_instructions: ["Hand-wash only.", "Dry with a soft cloth."],
    variants: [{ title: "H 28cm", sku: "FLU-VAS-28", eur: 5500, usd: 6000 }],
  },
  {
    title: "Brass Japanese Florist Shears",
    subtitle: "Hand-forged carbon steel and brass",
    handle: "brass-florist-shears",
    description:
      "Hand-forged carbon steel and brass pruners for clean botanical stem cuts - a lifetime tool for the discerning gardener.",
    type: "Add-On",
    categories: ["Gift Sets", "Add-Ons"],
    collections: ["gifts-accessories"],
    tags: ["just-because"],
    thumbnail: IMG.shears,
    images: [IMG.shears],
    feeling: "JUST BECAUSE",
    badge: "Curated Pairing",
    rating: 4.92,
    review_count: 27,
    care_instructions: ["Wipe clean after use.", "Oil the joint occasionally."],
    variants: [{ title: "Standard Pair", sku: "BRK-SHR-PR", eur: 4500, usd: 4900 }],
  },
]

export const STEM_PRODUCTS: Stem[] = [
  { handle: "ivory-rose-stem", name: "Loire Valley Garden Roses", priceEur: 1200 },
  { handle: "butterfly-ranunculus-stem", name: "Butterfly Ranunculus", priceEur: 1100 },
  { handle: "white-anemone-stem", name: "Black-Eyed White Anemones", priceEur: 1000 },
  { handle: "eucalyptus-stem", name: "Silver Dollar Eucalyptus", priceEur: 700 },
  { handle: "coral-peony-stem", name: "Champagne Coral Peonies", priceEur: 1500 },
  { handle: "star-jasmine-stem", name: "Star Jasmine Tendrils", priceEur: 900 },
]

export default async function seedFlowerCatalog({
  container,
}: {
  container: MedusaContainer
}) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const link = container.resolve(ContainerRegistrationKeys.LINK)
  const query = container.resolve(ContainerRegistrationKeys.QUERY)
  const productModule = container.resolve(ModuleRegistrationName.PRODUCT)
  const regionModule = container.resolve(ModuleRegistrationName.REGION)
  const salesChannelModule = container.resolve(ModuleRegistrationName.SALES_CHANNEL)
  const apiKeyModule = container.resolve(ModuleRegistrationName.API_KEY)
  const storeModule = container.resolve(ModuleRegistrationName.STORE)
  const stockLocationModule = container.resolve(ModuleRegistrationName.STOCK_LOCATION)
  const fulfillmentModule = container.resolve(ModuleRegistrationName.FULFILLMENT)

  logger.info("Seed: ensuring sales channel, publishable key and store")

  const [salesChannel] = await salesChannelModule.listSalesChannels(
    { name: "Default Sales Channel" },
    { take: 1 }
  )
  const defaultSalesChannel =
    salesChannel ??
    (
      await createSalesChannelsWorkflow(container).run({
        input: {
          salesChannelsData: [
            {
              name: "Default Sales Channel",
              description: "Created by Medusa",
            },
          ],
        },
      })
    ).result[0]

  const [existingApiKey] = await apiKeyModule.listApiKeys(
    { title: "Default Publishable API Key" },
    { take: 1 }
  )
  const publishableApiKey =
    existingApiKey ??
    (
      await createApiKeysWorkflow(container).run({
        input: {
          api_keys: [
            {
              title: "Default Publishable API Key",
              type: "publishable",
              created_by: "",
            },
          ],
        },
      })
    ).result[0]

  try {
    await linkSalesChannelsToApiKeyWorkflow(container).run({
      input: {
        id: publishableApiKey.id,
        add: [defaultSalesChannel.id],
      },
    })
  } catch (e) {
    logger.warn(`Seed: sales channel / api key link already exists (${(e as Error).message})`)
  }

  const [existingStore] = await storeModule.listStores({ name: "Default Store" }, { take: 1 })
  if (!existingStore) {
    await createStoresWorkflow(container).run({
      input: {
        stores: [
          {
            name: "Default Store",
            supported_currencies: [
              { currency_code: "eur", is_default: true },
              { currency_code: "usd", is_default: false },
            ],
            default_sales_channel_id: defaultSalesChannel.id,
          },
        ],
      },
    })
  }

  const [region] = await regionModule.listRegions({ name: "Europe" }, { take: 1 })

  let stockLocationId: string | undefined

  if (!region) {
    logger.info("Seed: fresh database detected, creating region, fulfillment and shipping")

    const { result: regionResult } = await createRegionsWorkflow(container).run({
      input: {
        regions: [
          {
            name: "Europe",
            currency_code: "eur",
            countries: COUNTRY_CODES,
            payment_providers: ["pp_system_default"],
          },
        ],
      },
    })
    const europeRegion = regionResult[0]

    await createTaxRegionsWorkflow(container).run({
      input: COUNTRY_CODES.map((country_code) => ({
        country_code,
        provider_id: "tp_system",
      })),
    })

    const { result: stockLocationResult } = await createStockLocationsWorkflow(
      container
    ).run({
      input: {
        locations: [
          {
            name: "European Warehouse",
            address: {
              city: "Copenhagen",
              country_code: "DK",
              address_1: "",
            },
          },
        ],
      },
    })
    const stockLocation = stockLocationResult[0]
    stockLocationId = stockLocation.id

    await link.create({
      [Modules.STOCK_LOCATION]: {
        stock_location_id: stockLocation.id,
      },
      [Modules.FULFILLMENT]: {
        fulfillment_provider_id: "manual_manual",
      },
    })

    const { data: shippingProfileResult } = await query.graph({
      entity: "shipping_profile",
      fields: ["id"],
    })
    const shippingProfile = shippingProfileResult[0]

    const fulfillmentSet = await fulfillmentModule.createFulfillmentSets({
      name: "European Warehouse delivery",
      type: "shipping",
      service_zones: [
        {
          name: "Europe",
          geo_zones: COUNTRY_CODES.map((country_code) => ({
            country_code: country_code.toUpperCase(),
            type: "country" as const,
          })),
        },
      ],
    })

    await link.create({
      [Modules.STOCK_LOCATION]: {
        stock_location_id: stockLocation.id,
      },
      [Modules.FULFILLMENT]: {
        fulfillment_set_id: fulfillmentSet.id,
      },
    })

    const shippingInput: FulfillmentWorkflow.CreateShippingOptionsWorkflowInput[] = [
      {
        name: "Standard Shipping",
        price_type: "flat",
        provider_id: "manual_manual",
        service_zone_id: fulfillmentSet.service_zones[0].id,
        shipping_profile_id: shippingProfile.id,
        type: {
          label: "Standard",
          description: "Ship in 2-3 days.",
          code: "standard",
        },
        prices: [
          { currency_code: "eur", amount: 900 },
          { currency_code: "usd", amount: 1000 },
          { region_id: europeRegion.id, amount: 900 },
        ],
        rules: [
          { attribute: "enabled_in_store", value: "true", operator: "eq" },
          { attribute: "is_return", value: "false", operator: "eq" },
        ],
      },
      {
        name: "Express Shipping",
        price_type: "flat",
        provider_id: "manual_manual",
        service_zone_id: fulfillmentSet.service_zones[0].id,
        shipping_profile_id: shippingProfile.id,
        type: {
          label: "Express",
          description: "Ship in 24 hours.",
          code: "express",
        },
        prices: [
          { currency_code: "eur", amount: 1900 },
          { currency_code: "usd", amount: 2100 },
          { region_id: europeRegion.id, amount: 1900 },
        ],
        rules: [
          { attribute: "enabled_in_store", value: "true", operator: "eq" },
          { attribute: "is_return", value: "false", operator: "eq" },
        ],
      },
    ]

    await createShippingOptionsWorkflow(container).run({ input: shippingInput })

    await linkSalesChannelsToStockLocationWorkflow(container).run({
      input: {
        id: stockLocation.id,
        add: [defaultSalesChannel.id],
      },
    })

    logger.info("Seed: region and shipping infrastructure created")
  } else {
    const [stockLocation] = await stockLocationModule.listStockLocations(
      { name: "European Warehouse" },
      { take: 1 }
    )
    stockLocationId = stockLocation?.id
  }

  if (!stockLocationId) {
    throw new Error("Seed: stock location not found or created")
  }

  logger.info("Seed: ensuring categories, types, tags and collections")

  const categoriesByName: Record<string, string> = {}

  const ensureChildCategories = async (
    names: string[],
    parent: string,
    existing: Record<string, string>
  ) => {
    for (const name of names) {
      if (existing[name]) continue
      const [found] = await productModule.listProductCategories({ name }, { take: 1 })
      if (found) {
        existing[name] = found.id
        continue
      }
      const created = await createProductCategoriesWorkflow(container).run({
        input: {
          product_categories: [
            {
              name,
              is_active: true,
              parent_category_id: parent,
            },
          ],
        },
      })
      existing[name] = created.result[0].id
    }
  }

  for (const level of CATEGORY_TREE) {
    if (!categoriesByName[level.name]) {
      const [found] = await productModule.listProductCategories(
        { name: level.name },
        { take: 1 }
      )
      if (found) {
        categoriesByName[level.name] = found.id
        continue
      }
      const created = await createProductCategoriesWorkflow(container).run({
        input: {
          product_categories: [{ name: level.name, is_active: true }],
        },
      })
      categoriesByName[level.name] = created.result[0].id
    }
  }

  for (const level of CATEGORY_TREE) {
    await ensureChildCategories(
      level.children,
      categoriesByName[level.name],
      categoriesByName
    )
  }

  const existingTypes = await productModule.listProductTypes()
  const missingTypes = PRODUCT_TYPES.filter(
    (type) => !existingTypes.some((t) => t.value === type)
  )
  if (missingTypes.length) {
    await createProductTypesWorkflow(container).run({
      input: { product_types: missingTypes.map((value) => ({ value })) },
    })
  }

  const existingTags = await productModule.listProductTags()
  const missingTags = PRODUCT_TAGS.filter(
    (tag) => !existingTags.some((t) => t.value === tag)
  )
  if (missingTags.length) {
    await createProductTagsWorkflow(container).run({
      input: { product_tags: missingTags.map((value) => ({ value })) },
    })
  }

  const collectionByHandle: Record<string, string> = {}
  for (const col of COLLECTIONS) {
    const [found] = await productModule.listProductCollections(
      { handle: col.handle },
      { take: 1 }
    )
    if (found) {
      collectionByHandle[col.handle] = found.id
      continue
    }
    const { result } = await createCollectionsWorkflow(container).run({
      input: {
        collections: [{ title: col.title, handle: col.handle }],
      },
    })
    collectionByHandle[col.handle] = result[0].id
  }

  logger.info("Seed: removing demo products")

  const demoIds: string[] = []
  for (const handle of DEMO_HANDLES) {
    const [found] = await productModule.listProducts({ handle }, { take: 1 })
    if (found) demoIds.push(found.id)
  }
  if (demoIds.length) {
    await deleteProductsWorkflow(container).run({ input: { ids: demoIds } })
  }

  logger.info("Seed: upserting catalog products")

  const typeIdByValue: Record<string, string> = {}
  const tagIdByValue: Record<string, string> = {}

  for (const type of PRODUCT_TYPES) {
    const [found] = await productModule.listProductTypes({ value: type }, { take: 1 })
    typeIdByValue[type] = found.id
  }
  for (const tag of PRODUCT_TAGS) {
    const [found] = await productModule.listProductTags({ value: tag }, { take: 1 })
    tagIdByValue[tag] = found.id
  }

  for (const seed of PRODUCT_SEEDS) {
    const [existing] = await productModule.listProducts(
      { handle: seed.handle },
      { take: 1 }
    )

    const commonFields = {
      title: seed.title,
      subtitle: seed.subtitle,
      description: seed.description,
      handle: seed.handle,
      status: ProductStatus.PUBLISHED,
      type_id: typeIdByValue[seed.type],
      collection_id: seed.collections[0]
        ? collectionByHandle[seed.collections[0]]
        : undefined,
      category_ids: seed.categories.map((c) => categoriesByName[c]),
      tag_ids: seed.tags.map((t) => tagIdByValue[t]),
      thumbnail: seed.thumbnail,
      images: seed.images.map((url) => ({ url })),
      metadata: {
        feeling: seed.feeling,
        badge: seed.badge,
        rating: seed.rating,
        review_count: seed.review_count,
        origin: seed.origin,
        stem_count: seed.stem_count,
        vase_life: seed.vase_life,
        scent_profile: seed.scent_profile,
        care_instructions: seed.care_instructions,
      },
    }

    if (existing) {
      await updateProductsWorkflow(container).run({
        input: {
          products: [
            {
              id: existing.id,
              ...commonFields,
              sales_channels: [{ id: defaultSalesChannel.id }],
            },
          ],
        },
      })
      logger.info(`Seed: updated ${seed.handle}`)
      continue
    }

    const { result } = await createProductsWorkflow(container).run({
      input: {
        products: [
          {
            ...commonFields,
            sales_channels: [{ id: defaultSalesChannel.id }],
            options: [
              {
                title: "Variant",
                values: seed.variants.map((v) => v.title),
              },
            ],
            variants: seed.variants.map((v) => ({
              title: v.title,
              sku: v.sku,
              options: { Variant: v.title },
              allow_backorder: false,
              manage_inventory: true,
              prices: [
                { currency_code: "eur", amount: v.eur },
                { currency_code: "usd", amount: v.usd },
              ],
            })),
          },
        ],
      },
    })
    logger.info(`Seed: created ${seed.handle}`)
  }

  logger.info("Seed: syncing inventory levels")

  const { data: inventoryItems } = await query.graph({
    entity: "inventory_item",
    fields: ["id"],
  })

  const { data: existingLevels } = await query.graph({
    entity: "inventory_level",
    fields: ["id", "inventory_item_id"],
    filters: { location_id: stockLocationId },
  })

  const coveredItems = new Set(
    (existingLevels as { inventory_item_id: string }[]).map((l) => l.inventory_item_id)
  )
  const missingItems = (inventoryItems as { id: string }[]).filter(
    (item) => !coveredItems.has(item.id)
  )

  if (missingItems.length) {
    await createInventoryLevelsWorkflow(container).run({
      input: {
        inventory_levels: missingItems.map((item) => ({
          location_id: stockLocationId,
          stocked_quantity: 1000,
          inventory_item_id: item.id,
        })),
      },
    })
  }

  logger.info("Seed: flower catalog seed complete")
}