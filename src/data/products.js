// Product catalog seeded from egiwellness.in.
// Structured to be easily swapped for a live PHP API response later.
// `mrp` = printed price, `price` = discounted (DP) selling price.

export const categories = [
  {
    id: 'cosmetics',
    name: 'Cosmetics',
    tagline: 'Glow, naturally',
    icon: 'Sparkles',
    gradient: ['#34d399', '#059669'],
    blurb: 'Skin & hair care crafted with botanical actives.',
  },
  {
    id: 'supplements',
    name: 'Supplements',
    tagline: 'Wellness from within',
    icon: 'Pill',
    gradient: ['#22d3ee', '#0e7490'],
    blurb: 'Ayurvedic capsules, oils and drops for daily vitality.',
  },
  {
    id: 'home-care',
    name: 'Home Care',
    tagline: 'A purer home',
    icon: 'House',
    gradient: ['#a3e635', '#4d7c0f'],
    blurb: 'Cleaners, kitchen spices and teas for a fresh home.',
  },
  {
    id: 'personal-care',
    name: 'Personal Care',
    tagline: 'Everyday essentials',
    icon: 'HeartPulse',
    gradient: ['#fbbf24', '#b45309'],
    blurb: 'Oils, lotions and oral care for your daily ritual.',
  },
]

export const products = [
  // ---------- Cosmetics ----------
  { id: 'charcoal-soap', name: 'Charcoal Soap', size: '75 gm', category: 'cosmetics', mrp: 125, price: 70, rating: 4.6, reviews: 214, tags: ['detox', 'bestseller'], desc: 'Activated charcoal soap that draws out impurities and excess oil for clearer, brighter skin.' },
  { id: 'red-wine-facial', name: 'Red Wine Facial', size: '50 gm', category: 'cosmetics', mrp: 199, price: 130, rating: 4.7, reviews: 156, tags: ['glow'], desc: 'Antioxidant-rich red wine facial that revives dull skin and restores a youthful radiance.' },
  { id: 'keser-serum', name: 'Kesar Serum', size: '30 ml', category: 'cosmetics', mrp: 985, price: 500, rating: 4.8, reviews: 98, tags: ['premium', 'brightening'], desc: 'Saffron-infused serum that visibly brightens, evens tone and adds a luminous finish.' },
  { id: 'face-wash', name: 'Face Wash (Ubtan / Papaya / Haldi)', size: '100 ml', category: 'cosmetics', mrp: 175, price: 100, rating: 4.5, reviews: 320, tags: ['daily'], desc: 'Gentle herbal face wash available in Ubtan, Papaya and Haldi variants for everyday cleansing.' },
  { id: 'skin-whitening-cream', name: 'Skin Brightening Cream', size: '', category: 'cosmetics', mrp: 399, price: 250, rating: 4.4, reviews: 187, tags: ['brightening'], desc: 'Lightweight cream that targets dullness and uneven tone for visibly brighter skin.' },
  { id: 'moringa-soap', name: 'Moringa Soap', size: '75 gm', category: 'cosmetics', mrp: 99, price: 50, rating: 4.6, reviews: 142, tags: ['nourishing'], desc: 'Moringa-enriched soap packed with vitamins to nourish and soften the skin.' },
  { id: 'anti-marks-cream', name: 'Anti Marks Cream', size: '', category: 'cosmetics', mrp: 350, price: 200, rating: 4.3, reviews: 110, tags: ['repair'], desc: 'Helps fade marks, spots and blemishes while improving overall skin texture.' },
  { id: 'rose-water', name: 'Rose Water', size: '100 ml', category: 'cosmetics', mrp: 75, price: 50, rating: 4.7, reviews: 401, tags: ['toner', 'bestseller'], desc: 'Pure steam-distilled rose water that tones, hydrates and refreshes tired skin.' },
  { id: 'milk-protein-shampoo', name: 'Milk Protein Shampoo', size: '200 ml', category: 'cosmetics', mrp: 278, price: 150, rating: 4.5, reviews: 176, tags: ['hair'], desc: 'Milk protein shampoo that strengthens, smooths and adds shine to every strand.' },
  { id: 'keratin-shampoo', name: 'Keratin Shampoo', size: '300 ml', category: 'cosmetics', mrp: 999, price: 400, rating: 4.8, reviews: 89, tags: ['premium', 'hair'], desc: 'Salon-grade keratin shampoo that repairs frizz and rebuilds soft, manageable hair.' },

  // ---------- Supplements ----------
  { id: 'ayush-kwath', name: 'Ayush Kwath', size: '60 Caps', category: 'supplements', mrp: 499, price: 300, rating: 4.6, reviews: 132, tags: ['immunity'], desc: 'Classical Ayush Kwath blend in convenient capsules to support natural immunity.' },
  { id: 'nav-jyoti-eye-drop', name: 'Nav Jyoti Eye Drop', size: '10 ml', category: 'supplements', mrp: 120, price: 50, rating: 4.4, reviews: 76, tags: ['eye care'], desc: 'Soothing herbal eye drops that relieve strain and refresh tired eyes.' },
  { id: 'pain-oil', name: 'Pain Relief Oil', size: '50 ml', category: 'supplements', mrp: 220, price: 100, rating: 4.7, reviews: 245, tags: ['bestseller', 'relief'], desc: 'Fast-absorbing herbal oil that eases joint and muscle pain with a warming effect.' },
  { id: 'nabhinas-oil', name: 'Nabhinas Oil', size: '30 ml', category: 'supplements', mrp: 550, price: 250, rating: 4.5, reviews: 64, tags: ['navel care'], desc: 'Navel-care oil rooted in Ayurveda to support digestion, skin and overall balance.' },
  { id: 'hepacid-tab', name: 'Hepacid Tablets', size: '60 Tabs', category: 'supplements', mrp: 1850, price: 1000, rating: 4.8, reviews: 41, tags: ['premium', 'liver'], desc: 'Liver-support formulation designed to aid detox and healthy digestion.' },
  { id: 'k-tox', name: 'K Tox Capsules', size: '60 Caps', category: 'supplements', mrp: 999, price: 500, rating: 4.6, reviews: 58, tags: ['detox'], desc: 'Herbal detox capsules to help cleanse and rejuvenate the body from within.' },
  { id: 'anti-itch-lotion', name: 'Anti Itch Lotion', size: '100 ml', category: 'supplements', mrp: 400, price: 200, rating: 4.5, reviews: 93, tags: ['relief'], desc: 'Calming lotion that relieves itching and irritation for comfortable, healthy skin.' },
  { id: 'curcumin', name: 'Curcumin Capsules', size: '60 Caps', category: 'supplements', mrp: 999, price: 500, rating: 4.7, reviews: 121, tags: ['antioxidant'], desc: 'High-potency curcumin for its antioxidant and joint-support benefits.' },
  { id: 'hair-bc-tab', name: 'Hair BC Tablets', size: '', category: 'supplements', mrp: 460, price: 200, rating: 4.4, reviews: 70, tags: ['hair'], desc: 'Biotin & herbal complex that nourishes hair from the root for stronger growth.' },
  { id: 'pro-active', name: 'Pro-Active', size: '200 gm', category: 'supplements', mrp: 499, price: 200, rating: 4.5, reviews: 84, tags: ['nutrition'], desc: 'Daily nutrition supplement to fuel energy, recovery and active living.' },

  // ---------- Home Care ----------
  { id: 'toilet-cleaner', name: 'Toilet Cleaner', size: '500 ml', category: 'home-care', mrp: 99, price: 80, rating: 4.4, reviews: 132, tags: ['cleaning'], desc: 'Powerful yet safe toilet cleaner that removes tough stains and leaves a fresh scent.' },
  { id: 'kefi-240', name: 'Kefi 240MM', size: '', category: 'home-care', mrp: 99, price: 80, rating: 4.3, reviews: 41, tags: ['kitchen'], desc: 'Durable everyday kitchen essential for a tidy, organised home.' },
  { id: 'kefi-340', name: 'Kefi 340MM', size: '', category: 'home-care', mrp: 99, price: 60, rating: 4.3, reviews: 38, tags: ['kitchen'], desc: 'Larger Kefi size for bigger storage and serving needs.' },
  { id: 'floor-cleaner', name: 'Floor Cleaner', size: '200 ml', category: 'home-care', mrp: 199, price: 100, rating: 4.6, reviews: 156, tags: ['cleaning', 'bestseller'], desc: 'Concentrated floor cleaner that cuts grease and disinfects with a long-lasting fragrance.' },
  { id: 'haldi-powder', name: 'Haldi (Turmeric) Powder', size: '250 gm', category: 'home-care', mrp: 125, price: 100, rating: 4.7, reviews: 210, tags: ['spice'], desc: 'Pure, lab-tested turmeric powder with rich colour and authentic aroma.' },
  { id: 'tea-250', name: 'Premium Tea', size: '250 gm', category: 'home-care', mrp: 149, price: 100, rating: 4.6, reviews: 98, tags: ['beverage'], desc: 'Hand-picked tea leaves for a strong, refreshing and aromatic cup.' },
  { id: 'tea-500', name: 'Premium Tea', size: '500 gm', category: 'home-care', mrp: 299, price: 200, rating: 4.6, reviews: 87, tags: ['beverage'], desc: 'Family-size pack of our hand-picked premium tea leaves.' },
  { id: 'garam-masala', name: 'Garam Masala', size: '100 gm', category: 'home-care', mrp: 99, price: 80, rating: 4.7, reviews: 143, tags: ['spice'], desc: 'Aromatic blend of whole spices, freshly ground for authentic Indian flavour.' },
  { id: 'jeera', name: 'Jeera (Cumin)', size: '100 gm', category: 'home-care', mrp: 125, price: 70, rating: 4.6, reviews: 76, tags: ['spice'], desc: 'Premium cumin seeds with a warm, earthy aroma for everyday cooking.' },
  { id: 'ajwain', name: 'Ajwain (Carom)', size: '100 gm', category: 'home-care', mrp: 75, price: 50, rating: 4.5, reviews: 64, tags: ['spice'], desc: 'Fresh carom seeds known for flavour and traditional digestive benefits.' },

  // ---------- Personal Care ----------
  { id: 'amla-oil', name: 'Amla Hair Oil', size: '100 ml', category: 'personal-care', mrp: 99, price: 50, rating: 4.6, reviews: 188, tags: ['hair', 'bestseller'], desc: 'Nourishing amla oil that strengthens roots, reduces hair fall and adds shine.' },
  { id: 'sunscreen-lotion', name: 'Sunscreen Lotion', size: '', category: 'personal-care', mrp: 300, price: 200, rating: 4.5, reviews: 132, tags: ['spf'], desc: 'Broad-spectrum sunscreen lotion that shields skin from UV while keeping it hydrated.' },
  { id: 'bhrinraj-hair-oil', name: 'Bhringraj Hair Oil', size: '120 ml', category: 'personal-care', mrp: 399, price: 200, rating: 4.7, reviews: 154, tags: ['hair'], desc: 'Traditional bhringraj oil that promotes growth and prevents premature greying.' },
  { id: 'denta-gel', name: 'Healthy Denta Gel', size: '', category: 'personal-care', mrp: 150, price: 100, rating: 4.4, reviews: 71, tags: ['oral care'], desc: 'Herbal dental gel that fights germs for fresh breath and stronger gums.' },
  { id: 'soft-shine-shampoo', name: 'Soft & Shine Shampoo', size: '200 ml', category: 'personal-care', mrp: 140, price: 100, rating: 4.5, reviews: 96, tags: ['hair'], desc: 'Gentle daily shampoo that leaves hair soft, shiny and easy to manage.' },
  { id: 'shea-butter-lotion', name: 'Shea Butter Lotion', size: '100 ml', category: 'personal-care', mrp: 150, price: 100, rating: 4.6, reviews: 118, tags: ['moisturiser'], desc: 'Rich shea butter lotion that deeply moisturises and protects dry skin.' },
  { id: 'toothpaste-salvogum', name: 'Salvogum Toothpaste', size: '100 gm', category: 'personal-care', mrp: 149, price: 70, rating: 4.5, reviews: 88, tags: ['oral care'], desc: 'Herbal toothpaste with salvogum for healthy gums and lasting freshness.' },
]

export const productsById = Object.fromEntries(products.map((p) => [p.id, p]))

export const getProductsByCategory = (categoryId) =>
  products.filter((p) => p.category === categoryId)

export const categoriesById = Object.fromEntries(categories.map((c) => [c.id, c]))

export const bestsellers = products.filter((p) => p.tags?.includes('bestseller'))
