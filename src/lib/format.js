export const inr = (n) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(n)

export const discountPct = (mrp, price) =>
  mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0

// Deterministic soft-pastel gradient per product id — premium & airy on light bg.
const palettes = [
  ['#d9f5e3', '#a7e8c4'], // mint
  ['#d7f0f7', '#a9dcef'], // sky
  ['#eaf4cf', '#cfe49a'], // lime
  ['#fdeccb', '#f6d79e'], // honey
  ['#fbe2ec', '#f4bcd2'], // blush
  ['#e6e6fb', '#c3c4f0'], // lavender
]

export const gradientFor = (id) => {
  let h = 0
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0
  return palettes[h % palettes.length]
}

export const initials = (name) =>
  name
    .replace(/[^a-zA-Z ]/g, '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
