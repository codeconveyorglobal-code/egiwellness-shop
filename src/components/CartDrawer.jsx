import { motion, AnimatePresence } from 'framer-motion'
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCart } from '../store/cart'
import { productsById } from '../data/products'
import { inr } from '../lib/format'
import ProductMedia from './ProductMedia'

export default function CartDrawer() {
  const { items, isOpen, close, setQty, remove } = useCart()
  const entries = Object.entries(items)
  const lines = entries
    .map(([id, qty]) => ({ product: productsById[id], qty }))
    .filter((l) => l.product)
  const subtotal = lines.reduce((a, l) => a + l.product.price * l.qty, 0)
  const savings = lines.reduce((a, l) => a + (l.product.mrp - l.product.price) * l.qty, 0)

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-50 bg-ink-900/30 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 280 }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-sand-50 shadow-soft-lg"
          >
            <div className="flex items-center justify-between border-b border-ink-900/[0.07] p-5">
              <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-ink-900">
                <ShoppingBag className="h-5 w-5 text-brand-600" /> Your Cart
              </h2>
              <button
                onClick={close}
                className="grid h-9 w-9 place-items-center rounded-full border border-ink-900/10 bg-white hover:bg-sand-200"
                aria-label="Close cart"
              >
                <X className="h-5 w-5 text-ink-700" />
              </button>
            </div>

            {lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
                <div className="grid h-20 w-20 place-items-center rounded-full bg-white shadow-soft">
                  <ShoppingBag className="h-9 w-9 text-ink-300" />
                </div>
                <p className="text-ink-500">Your cart is empty.</p>
                <button onClick={close} className="btn-primary px-6 py-2.5 text-sm">
                  Start shopping
                </button>
              </div>
            ) : (
              <>
                <div className="flex-1 space-y-3 overflow-y-auto p-5">
                  {lines.map(({ product, qty }) => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="flex gap-3 rounded-2xl border border-ink-900/[0.06] bg-white p-3 shadow-soft"
                    >
                      <ProductMedia product={product} className="h-20 w-20 shrink-0" />
                      <div className="flex flex-1 flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="line-clamp-1 text-sm font-semibold text-ink-900">
                              {product.name}
                            </p>
                            <p className="text-xs text-ink-400">{product.size}</p>
                          </div>
                          <button
                            onClick={() => remove(product.id)}
                            className="text-ink-300 hover:text-red-500"
                            aria-label="Remove"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="mt-auto flex items-center justify-between">
                          <div className="flex items-center gap-1 rounded-full bg-sand-200 p-1">
                            <button
                              onClick={() => setQty(product.id, qty - 1)}
                              className="grid h-7 w-7 place-items-center rounded-full hover:bg-white"
                              aria-label="Decrease"
                            >
                              <Minus className="h-3.5 w-3.5 text-ink-700" />
                            </button>
                            <span className="w-6 text-center text-sm font-semibold text-ink-900">
                              {qty}
                            </span>
                            <button
                              onClick={() => setQty(product.id, qty + 1)}
                              className="grid h-7 w-7 place-items-center rounded-full hover:bg-white"
                              aria-label="Increase"
                            >
                              <Plus className="h-3.5 w-3.5 text-ink-700" />
                            </button>
                          </div>
                          <span className="font-bold text-ink-900">{inr(product.price * qty)}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="space-y-3 border-t border-ink-900/[0.07] bg-white p-5">
                  {savings > 0 && (
                    <div className="flex items-center justify-between rounded-xl bg-brand-50 px-3 py-2 text-sm text-brand-700">
                      <span>You save</span>
                      <span className="font-semibold">{inr(savings)}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between text-base">
                    <span className="text-ink-500">Subtotal</span>
                    <span className="font-display text-xl font-semibold text-ink-900">
                      {inr(subtotal)}
                    </span>
                  </div>
                  <Link to="/checkout" onClick={close} className="btn-primary w-full py-3.5 text-base">
                    Checkout <ArrowRight className="h-5 w-5" />
                  </Link>
                  <p className="text-center text-xs text-ink-400">
                    Free delivery on orders above {inr(499)}
                  </p>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
