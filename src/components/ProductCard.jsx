import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Star, Plus, Check, Heart } from 'lucide-react'
import { useState } from 'react'
import ProductMedia from './ProductMedia'
import { inr, discountPct } from '../lib/format'
import { useCart } from '../store/cart'
import { useWishlist } from '../store/wishlist'

export default function ProductCard({ product, index = 0 }) {
  const add = useCart((s) => s.add)
  const wished = useWishlist((s) => s.ids.includes(product.id))
  const toggleWish = useWishlist((s) => s.toggle)
  const [added, setAdded] = useState(false)
  const off = discountPct(product.mrp, product.price)

  const onAdd = (e) => {
    e.preventDefault()
    add(product.id)
    setAdded(true)
    setTimeout(() => setAdded(false), 1200)
  }

  const onWish = (e) => {
    e.preventDefault()
    toggleWish(product.id)
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

          {/* Wishlist heart */}
          <button
            onClick={onWish}
            aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
            className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full bg-white/90 shadow-soft backdrop-blur transition-transform active:scale-90"
          >
            <Heart
              className={`h-[18px] w-[18px] transition-colors ${
                wished ? 'fill-rose-500 text-rose-500' : 'text-ink-400'
              }`}
            />
          </button>
        </div>

        <div className="flex flex-col gap-2 px-4 pb-4">
          <div className="flex items-center gap-2 text-xs text-ink-500">
            <span className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              <span className="font-semibold text-ink-700">{product.rating}</span>
              <span>({product.reviews})</span>
            </span>
            {product.tags?.includes('bestseller') && (
              <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-bold text-brand-700">
                ★ Bestseller
              </span>
            )}
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
