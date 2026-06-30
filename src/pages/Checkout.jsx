import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, CheckCircle2, ShoppingBag, Lock } from 'lucide-react'
import { useCart } from '../store/cart'
import { productsById } from '../data/products'
import { inr } from '../lib/format'
import ProductMedia from '../components/ProductMedia'

export default function Checkout() {
  const { items, clear } = useCart()
  const [placed, setPlaced] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', address: '', city: '', pin: '' })

  const lines = Object.entries(items)
    .map(([id, qty]) => ({ product: productsById[id], qty }))
    .filter((l) => l.product)
  const subtotal = lines.reduce((a, l) => a + l.product.price * l.qty, 0)
  const shipping = subtotal >= 499 || subtotal === 0 ? 0 : 49
  const total = subtotal + shipping

  const onSubmit = (e) => {
    e.preventDefault()
    setPlaced(true)
    clear()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (placed) {
    return (
      <div className="section-pad flex flex-col items-center justify-center py-32 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', damping: 12 }}
        >
          <CheckCircle2 className="h-20 w-20 text-brand-500" />
        </motion.div>
        <h1 className="mt-6 font-display text-4xl font-semibold">Order placed! 🎉</h1>
        <p className="mt-3 max-w-md text-ink-500">
          Thank you for shopping with EGI Wellness. This is a demo checkout — wire it to your
          PHP backend to process real payments &amp; orders.
        </p>
        <Link to="/shop" className="btn-primary mt-8 px-7 py-3.5">
          Continue shopping
        </Link>
      </div>
    )
  }

  if (lines.length === 0) {
    return (
      <div className="section-pad flex flex-col items-center justify-center py-32 text-center">
        <ShoppingBag className="h-16 w-16 text-ink-300" />
        <h1 className="mt-5 font-display text-2xl font-semibold">Your cart is empty</h1>
        <Link to="/shop" className="btn-primary mt-6 px-7 py-3.5">
          Browse products
        </Link>
      </div>
    )
  }

  return (
    <div className="section-pad py-10">
      <Link
        to="/shop"
        className="mb-6 inline-flex items-center gap-2 text-sm text-ink-500 hover:text-ink-900"
      >
        <ArrowLeft className="h-4 w-4" /> Continue shopping
      </Link>

      <h1 className="mb-8 font-display text-4xl font-semibold sm:text-5xl">Checkout</h1>

      <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        {/* Form */}
        <form onSubmit={onSubmit} className="card-surface space-y-5 p-6 sm:p-8">
          <h2 className="font-display text-xl font-semibold">Delivery details</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Full name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
            <Field label="Phone" type="tel" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} required />
          </div>
          <Field label="Address" value={form.address} onChange={(v) => setForm({ ...form, address: v })} required />
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="City" value={form.city} onChange={(v) => setForm({ ...form, city: v })} required />
            <Field label="PIN code" value={form.pin} onChange={(v) => setForm({ ...form, pin: v })} required />
          </div>

          <h2 className="pt-2 font-display text-xl font-semibold">Payment</h2>
          <div className="rounded-2xl border border-brand-200 bg-brand-50 p-4">
            <p className="flex items-center gap-2 text-sm font-semibold text-brand-700">
              <Lock className="h-4 w-4" /> Cash on Delivery (demo)
            </p>
            <p className="mt-1 text-xs text-ink-500">
              Online payments can be added via your PHP backend / Razorpay.
            </p>
          </div>

          <button type="submit" className="btn-primary w-full py-4 text-base">
            Place order · {inr(total)}
          </button>
        </form>

        {/* Summary */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="card-surface space-y-4 p-6">
            <h2 className="font-display text-xl font-semibold">Order summary</h2>
            <div className="space-y-3">
              {lines.map(({ product, qty }) => (
                <div key={product.id} className="flex items-center gap-3">
                  <ProductMedia product={product} className="h-14 w-14 shrink-0" />
                  <div className="flex-1">
                    <p className="line-clamp-1 text-sm font-semibold text-ink-900">{product.name}</p>
                    <p className="text-xs text-ink-400">Qty {qty}</p>
                  </div>
                  <span className="text-sm font-semibold text-ink-900">
                    {inr(product.price * qty)}
                  </span>
                </div>
              ))}
            </div>
            <div className="space-y-2 border-t border-ink-900/[0.07] pt-4 text-sm">
              <Row label="Subtotal" value={inr(subtotal)} />
              <Row
                label="Shipping"
                value={shipping === 0 ? 'Free' : inr(shipping)}
                highlight={shipping === 0}
              />
              <div className="flex items-center justify-between border-t border-ink-900/[0.07] pt-3 text-base">
                <span className="font-semibold text-ink-900">Total</span>
                <span className="font-display text-xl font-semibold text-ink-900">{inr(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Field({ label, value, onChange, type = 'text', required }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm text-ink-500">{label}</span>
      <input
        type={type}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-ink-900/10 bg-sand-100 px-4 py-3 text-sm text-ink-900 outline-none transition-colors focus:border-brand-400 focus:bg-white"
      />
    </label>
  )
}

function Row({ label, value, highlight }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-ink-500">{label}</span>
      <span className={highlight ? 'font-semibold text-brand-600' : 'font-medium text-ink-800'}>
        {value}
      </span>
    </div>
  )
}
