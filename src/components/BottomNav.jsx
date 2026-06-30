import { useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, Store, Search, ShoppingBag, Heart } from 'lucide-react'
import { useCart } from '../store/cart'
import { useWishlist } from '../store/wishlist'

export default function BottomNav() {
  const { pathname, search } = useLocation()
  const navigate = useNavigate()
  const count = useCart((s) => Object.values(s.items).reduce((a, b) => a + b, 0))
  const openCart = useCart((s) => s.open)
  const cartOpen = useCart((s) => s.isOpen)
  const wishCount = useWishlist((s) => s.ids.length)

  const isShop = pathname.startsWith('/shop')
  const items = [
    { key: 'home', label: 'Home', icon: Home, active: pathname === '/', onClick: () => navigate('/') },
    { key: 'shop', label: 'Shop', icon: Store, active: isShop && !search.includes('q='), onClick: () => navigate('/shop') },
    { key: 'search', label: 'Search', icon: Search, active: search.includes('q='), onClick: () => navigate('/shop?q=') },
    { key: 'wishlist', label: 'Wishlist', icon: Heart, active: pathname.startsWith('/wishlist'), onClick: () => navigate('/wishlist'), badge: wishCount },
    { key: 'cart', label: 'Cart', icon: ShoppingBag, active: cartOpen, onClick: openCart, badge: count },
  ]

  return (
    <motion.nav
      initial={{ y: 90, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 240, damping: 28, delay: 0.15 }}
      className="glass-nav fixed inset-x-0 bottom-0 z-40 flex items-stretch justify-around border-t border-white/40 px-1 pt-1.5 pb-[max(0.5rem,env(safe-area-inset-bottom))] shadow-nav lg:hidden"
    >
      {/* techy gradient hairline on top edge */}
      <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-500/70 to-transparent" />

      {items.map((it) => {
        const Icon = it.icon
        return (
          <button
            key={it.key}
            onClick={it.onClick}
            aria-label={it.label}
            className="relative flex flex-1 flex-col items-center justify-center gap-0.5 py-1.5"
          >
            {it.active && (
              <motion.span
                layoutId="bottom-active"
                className="absolute inset-x-2 inset-y-0 rounded-2xl bg-gradient-to-br from-brand-400 to-brand-600 shadow-glow-sm"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative">
              <Icon
                className={`h-[22px] w-[22px] transition-colors ${
                  it.active ? 'text-white' : 'text-ink-500'
                }`}
                strokeWidth={2.1}
              />
              <AnimatePresence>
                {it.badge > 0 && (
                  <motion.span
                    key={it.badge}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className={`absolute -right-2.5 -top-2 grid h-4 min-w-[16px] place-items-center rounded-full px-1 text-[10px] font-bold ${
                      it.active ? 'bg-white text-brand-700' : 'bg-brand-500 text-white'
                    }`}
                  >
                    {it.badge}
                  </motion.span>
                )}
              </AnimatePresence>
            </span>
            <span
              className={`relative text-[10px] font-semibold transition-colors ${
                it.active ? 'text-white' : 'text-ink-500'
              }`}
            >
              {it.label}
            </span>
          </button>
        )
      })}
    </motion.nav>
  )
}
