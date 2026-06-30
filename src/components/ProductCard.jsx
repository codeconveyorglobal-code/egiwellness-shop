import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Star, Plus, Check } from 'lucide-react'
import { useState } from 'react'
import ProductMedia from './ProductMedia'
import { inr, discountPct } from '../lib/format'
import { useCart } from '../store/cart'

export default function ProductCard({ product, index = 0 }) {
  const add = useCart((s) => s.add)
  const [added, setAdded] = useState(false)
  const off = discountPct(product.mrp, product.price)

  const onAdd = (e) => {
    e.preventDefault()
    add(product.id)
    setAdded(true)
    setTimeout(() => setAdded(false), 1200)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: (index % 8) * 0.05 }}
      className="group"
    >
      <Link
        to={`/product/${product.id}`}
        className="card-surface block h-full overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-soft-lg"
      >
        <div className="relative p-3">
          <ProductMedia product={product} className="aspect-square w-full" />
          {off > 0 && (
            <span className="chip absolute left-5 top-5 bg-ink-900 text-white shadow-soft">
              {off}% OFF
            </span>
          )}
          {product.tags?.includes('bestseller') && (
            <span className="chip absolute right-5 top-5 bg-white/90 text-brand-700 shadow-soft backdrop-blur">
              ★ Bestseller
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2 px-4 pb-4">
          <div className="flex items-center gap-1.5 text-xs text-ink-500">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            <span className="font-semibold text-ink-700">{product.rating}</span>
            <span>({product.reviews})</span>
          </div>

          <h3 className="line-clamp-2 min-h-[2.5rem] font-semibold leading-snug text-ink-900">
            {product.name}
          </h3>
          {product.size && <span className="text-xs text-ink-400">{product.size}</span>}

          <div className="mt-1 flex items-end justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-ink-900">{inr(product.price)}</span>
              {off > 0 && (
                <span className="text-sm text-ink-400 line-through">{inr(product.mrp)}</span>
              )}
            </div>

            <button
              onClick={onAdd}
              aria-label="Add to cart"
              className={`btn h-10 w-10 shrink-0 rounded-full transition-all ${
                added
                  ? 'bg-brand-500 text-white'
                  : 'bg-sand-200 text-ink-800 group-hover:bg-ink-900 group-hover:text-white'
              }`}
            >
              {added ? <Check className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
