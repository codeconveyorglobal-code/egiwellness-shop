// Curated, category-relevant photography (Unsplash CDN).
// ProductMedia falls back to the branded gradient tile if an image fails to load,
// so the UI never looks broken. Swap these for your real product photos anytime
// by adding an `image` field on each product in src/data/products.js.

const q = '?auto=format&fit=crop&w=600&q=70'

const byCategory = {
  cosmetics: [
    `https://images.unsplash.com/photo-1556228720-195a672e8a03${q}`,
    `https://images.unsplash.com/photo-1620916566398-39f1143ab7be${q}`,
    `https://images.unsplash.com/photo-1612817288484-6f916006741a${q}`,
    `https://images.unsplash.com/photo-1571781926291-c477ebfd024b${q}`,
    `https://images.unsplash.com/photo-1598440947619-2c35fc9aa908${q}`,
  ],
  supplements: [
    `https://images.unsplash.com/photo-1584308666744-24d5c474f2ae${q}`,
    `https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2${q}`,
    `https://images.unsplash.com/photo-1550572017-edd951b55104${q}`,
    `https://images.unsplash.com/photo-1471864190281-a93a3070b6de${q}`,
  ],
  'home-care': [
    `https://images.unsplash.com/photo-1596040033229-a9821ebd058d${q}`,
    `https://images.unsplash.com/photo-1607301406259-dfb186e15de8${q}`,
    `https://images.unsplash.com/photo-1563822249548-9a72b6353cd1${q}`,
    `https://images.unsplash.com/photo-1610970881699-44a5587cabec${q}`,
  ],
  'personal-care': [
    `https://images.unsplash.com/photo-1608571423902-eed4a5ad8108${q}`,
    `https://images.unsplash.com/photo-1556228578-8c89e6adf883${q}`,
    `https://images.unsplash.com/photo-1631730486572-226d1f595b68${q}`,
    `https://images.unsplash.com/photo-1573575155376-b5010099301b${q}`,
  ],
}

export const imageFor = (product) => {
  if (product.image) return product.image
  const list = byCategory[product.category]
  if (!list || !list.length) return null
  let h = 0
  for (let i = 0; i < product.id.length; i++) h = (h * 31 + product.id.charCodeAt(i)) >>> 0
  return list[h % list.length]
}
