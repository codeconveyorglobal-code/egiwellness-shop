import { useMemo, useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { SlidersHorizontal, Search, X } from 'lucide-react'
import { products, categories, categoriesById } from '../data/products'
import ProductCard from '../components/ProductCard'

const sorts = [
  { id: 'popular', label: 'Popular' },
  { id: 'price-asc', label: 'Price ↑' },
  { id: 'price-desc', label: 'Price ↓' },
  { id: 'discount', label: 'Biggest discount' },
]

export default function Shop() {
  const [params, setParams] = useSearchParams()
  const cat = params.get('cat') || 'all'
  const urlQ = params.get('q') || ''

  const [q, setQ] = useState(urlQ)
  const [sort, setSort] = useState('popular')

  useEffect(() => setQ(urlQ), [urlQ])

  const setCat = (id) => {
    const next = new URLSearchParams(params)
    if (id === 'all') next.delete('cat')
    else next.set('cat', id)
    setParams(next, { replace: true })
  }

  const filtered = useMemo(() => {
    let list = products
    if (cat !== 'all') list = list.filter((p) => p.category === cat)
    if (q.trim()) {
      const t = q.toLowerCase()
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(t) ||
          p.desc.toLowerCase().includes(t) ||
          p.tags?.some((tag) => tag.includes(t))
      )
    }
    list = [...list]
    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') list.sort((a, b) => b.price - a.price)
    if (sort === 'discount')
      list.sort((a, b) => (b.mrp - b.price) / b.mrp - (a.mrp - a.price) / a.mrp)
    if (sort === 'popular') list.sort((a, b) => b.reviews - a.reviews)
    return list
  }, [cat, q, sort])

  const heading = cat === 'all' ? 'All products' : categoriesById[cat]?.name

  return (
    <div className="section-pad py-10">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-brand-600">
          EGI Wellness Store
        </p>
        <h1 className="mt-1 font-display text-4xl font-semibold sm:text-5xl">{heading}</h1>
        <p className="mt-2 text-ink-500">
          {filtered.length} product{filtered.length !== 1 && 's'} available
        </p>
      </motion.div>

      {/* Controls */}
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
          <Pill active={cat === 'all'} onClick={() => setCat('all')}>
            All
          </Pill>
          {categories.map((c) => (
            <Pill key={c.id} active={cat === c.id} onClick={() => setCat(c.id)}>
              {c.name}
            </Pill>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="flex flex-1 items-center gap-2 rounded-full border border-ink-900/10 bg-white px-4 py-2.5 lg:w-64">
            <Search className="h-4 w-4 text-ink-400" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search…"
              className="w-full bg-transparent text-sm text-ink-800 outline-none placeholder:text-ink-400"
            />
            {q && (
              <button onClick={() => setQ('')} aria-label="Clear">
                <X className="h-4 w-4 text-ink-400 hover:text-ink-700" />
              </button>
            )}
          </div>

          <div className="relative flex items-center gap-2 rounded-full border border-ink-900/10 bg-white px-4 py-2.5">
            <SlidersHorizontal className="h-4 w-4 text-ink-400" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-transparent text-sm text-ink-800 outline-none"
            >
              {sorts.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="card-surface flex flex-col items-center gap-3 py-20 text-center">
          <Search className="h-10 w-10 text-ink-300" />
          <p className="text-ink-500">No products match your search.</p>
          <button
            onClick={() => {
              setQ('')
              setCat('all')
            }}
            className="btn-ghost px-5 py-2 text-sm"
          >
            Reset filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      )}
    </div>
  )
}

function Pill({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-all ${
        active
          ? 'bg-ink-900 text-white shadow-soft'
          : 'border border-ink-900/10 bg-white text-ink-600 hover:text-ink-900'
      }`}
    >
      {children}
    </button>
  )
}
