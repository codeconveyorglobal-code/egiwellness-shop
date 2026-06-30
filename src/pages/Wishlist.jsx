import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart, ArrowLeft, Trash2 } from 'lucide-react'
import { useWishlist } from '../store/wishlist'
import { productsById } from '../data/products'
import ProductCard from '../components/ProductCard'

export default function Wishlist() {
  const { ids, clear } = useWishlist()
  const items = ids.map((id) => productsById[id]).filter(Boolean)

  return (
    <div className="section-pad py-10">
      <Link
        to="/shop"
        className="mb-6 inline-flex items-center gap-2 text-sm text-ink-500 hover:text-ink-900"
      >
        <ArrowLeft className="h-4 w-4" /> Continue shopping
      </Link>

      <div className="mb-8 flex items-end justify-between">
        <div>
          <h1 className="flex items-center gap-2 font-display text-3xl font-semibold sm:text-4xl">
            <Heart className="h-7 w-7 fill-rose-500 text-rose-500" /> Wishlist
          </h1>
          <p className="mt-1 text-ink-500">
            {items.length} saved item{items.length !== 1 && 's'}
          </p>
        </div>
        {items.length > 0 && (
          <button
            onClick={clear}
            className="flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-rose-500"
          >
            <Trash2 className="h-4 w-4" /> Clear all
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-surface flex flex-col items-center gap-4 py-20 text-center"
        >
          <div className="grid h-20 w-20 place-items-center rounded-full bg-rose-50">
            <Heart className="h-9 w-9 text-rose-300" />
          </div>
          <p className="text-ink-500">Your wishlist is empty. Tap the ♥ on any product to save it.</p>
          <Link to="/shop" className="btn-primary px-6 py-3 text-sm">
            Browse products
          </Link>
        </motion.div>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {items.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      )}
    </div>
  )
}
