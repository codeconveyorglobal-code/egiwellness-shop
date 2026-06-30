# EGI Wellness — Storefront (React + Vite)

A fast, responsive, animated ecommerce storefront for EGI Wellness. Catalog
(categories, products, MRP/DP pricing) referenced from egiwellness.in.

## Tech
- **React 18 + Vite 5** — instant HMR, tiny optimized bundle (~115 KB gzipped)
- **Tailwind CSS** — design system, dark "techy" wellness theme
- **Framer Motion** — page, scroll and micro animations
- **Zustand** — persistent cart (saved to localStorage)
- **React Router** — Home / Shop / Product / Checkout

## Features
- Animated hero, floating category tiles, scroll-reveal product grids
- Category filtering, live search, sorting (popularity / price / discount)
- Product detail pages with related products
- Slide-over cart with quantity controls + savings calculator
- Demo checkout (COD) with order summary
- Fully responsive (mobile-first) + mobile nav drawer

## Run locally
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs to /dist
npm run preview  # serve the production build (LAN accessible)
```

## Deploy (free)
**Easiest — Netlify Drop:** drag the `dist/` folder (or `egiwellness-dist.zip`)
onto https://app.netlify.com/drop → instant permanent URL.

**Vercel:** `npx vercel` (login once), or import the repo at vercel.com.
SPA routing handled by `vercel.json` / `netlify.toml`.

## Connect your PHP backend later
All data lives in [`src/data/products.js`](src/data/products.js). Replace the
static arrays with a `fetch()` to your PHP API (e.g. `/api/products`,
`/api/categories`) — the component layer stays unchanged.
