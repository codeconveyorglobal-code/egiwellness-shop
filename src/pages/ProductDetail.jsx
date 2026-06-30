import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Star,
  Minus,
  Plus,
  ShoppingBag,
  ArrowLeft,
  Truck,
  ShieldCheck,
  Leaf,
  Check,
} from 'lucide-react'
import { useState } from 'react'
import { productsById, getProductsByCategory, categoriesById } from '../data/products'
import { inr, discountPct } from '../lib/format'
import { useCart } from '../store/cart'
import ProductMedia from '../components/ProductMedia'
import ProductCard from '../components/ProductCard'

const perks = [
  { icon: Truck, label: 'Fast delivery' },
  { icon: ShieldCheck, label: 'Authentic & safe' },
  { icon: Leaf, label: '100% fresh' },
]

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = productsById[id]
  const add = useCart((s) => s.add)
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  if (!product) {
    return (
      <div className="section-pad flex flex-col items-center gap-4 py-32 text-center">
        <h1 className="font-display text-2xl font-semibold">Product not found</h1>
        <Link to="/shop" className="btn-primary px-6 py-3">
          Back to shop
        </Link>
      </div>
    )
  }

  const off = discountPct(product.mrp, product.price)
  const cat = categoriesById[product.category]
  const related = getProductsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 4)

  const onAdd = () => {
    add(product.id, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <div className="section-pad py-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 inline-flex items-center gap-2 text-sm text-ink-500 hover:text-ink-900"
      >
        <ArrowLeft className="h-4 w-4" /> Back
      </button>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-14">
        {/* Media */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="lg:sticky lg:top-24 lg:self-start"
        >
          <div className="card-surface relative p-4">
            <ProductMedia
              product={product}
              className="aspect-square w-full"
              rounded="rounded-[1.5rem]"
            />
            {off > 0 && (
              <span className="chip absolute left-7 top-7 bg-ink-900 text-white shadow-soft">
                {off}% OFF
              </span>
            )}
          </div>
          <div className="mt-3 grid grid-cols-3 gap-3">
            {perks.map((p) => (
              <div
                key={p.label}
                className="flex flex-col items-center gap-1.5 rounded-2xl border border-ink-900/[0.06] bg-white py-3 text-center shadow-soft"
              >
                <p.icon className="h-5 w-5 text-brand-600" />
                <span className="text-xs text-ink-500">{p.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
        >
          <Link
            to={`/shop?cat=${product.category}`}
            className="chip bg-brand-50 text-brand-700 hover:bg-brand-100"
          >
            {cat?.name}
          </Link>

          <h1 className="mt-4 font-display text-4xl font-semibold leading-tight sm:text-5xl">
            {product.name}
          </h1>
          {product.size && <p className="mt-1 text-ink-500">{product.size}</p>}

          <div className="mt-3 flex items-center gap-3">
            <div className="flex items-center gap-1 text-amber-500">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span className="font-semibold">{product.rating}</span>
            </div>
            <span className="text-sm text-ink-400">{product.reviews} verified reviews</span>
          </div>

          <div className="mt-6 flex items-end gap-3">
            <span className="font-display text-4xl font-semibold text-ink-900">
              {inr(product.price)}
            </span>
            {off > 0 && (
              <>
                <span className="mb-1 text-lg text-ink-400 line-through">{inr(product.mrp)}</span>
                <span className="mb-1 font-semibold text-brand-600">
                  Save {inr(product.mrp - product.price)}
                </span>
              </>
            )}
          </div>
          <p className="mt-1 text-xs text-ink-400">Inclusive of all taxes</p>

          <p className="mt-6 leading-relaxed text-ink-600">{product.desc}</p>

          {product.tags?.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {product.tags.map((t) => (
                <span
                  key={t}
                  className="chip border border-ink-900/10 bg-white capitalize text-ink-500"
                >
                  {t}
                </span>
              ))}
            </div>
          )}

          {/* Qty + add */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 rounded-full border border-ink-900/10 bg-white p-1.5">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="grid h-10 w-10 place-items-center rounded-full hover:bg-sand-200"
                aria-label="Decrease"
              >
                <Minus className="h-4 w-4 text-ink-700" />
              </button>
              <span className="w-8 text-center text-lg font-bold text-ink-900">{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="grid h-10 w-10 place-items-center rounded-full hover:bg-sand-200"
                aria-label="Increase"
              >
                <Plus className="h-4 w-4 text-ink-700" />
              </button>
            </div>

            <button onClick={onAdd} className="btn-primary min-w-[200px] flex-1 py-4 text-base">
              {added ? (
                <>
                  <Check className="h-5 w-5" /> Added to cart
                </>
              ) : (
                <>
                  <ShoppingBag className="h-5 w-5" /> Add to cart · {inr(product.price * qty)}
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="mb-6 font-display text-3xl font-semibold">You may also like</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
