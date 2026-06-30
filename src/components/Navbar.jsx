import { Link, NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Search, Menu, X, Leaf, ChevronRight } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { useCart } from '../store/cart'
import { categories } from '../data/products'

const mainLinks = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
]
const catLinks = categories.map((c) => ({ to: `/shop?cat=${c.id}`, label: c.name }))

export default function Navbar() {
  const count = useCart((s) => Object.values(s.items).reduce((a, b) => a + b, 0))
  const openCart = useCart((s) => s.open)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [q, setQ] = useState('')
  const navigate = useNavigate()
  const searchRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus()
  }, [searchOpen])

  // lock body scroll when sidebar open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => (document.body.style.overflow = '')
  }, [menuOpen])

  const submitSearch = (e) => {
    e.preventDefault()
    navigate(`/shop?q=${encodeURIComponent(q)}`)
    setMenuOpen(false)
    setSearchOpen(false)
  }

  return (
    <header className="sticky top-0 z-40 px-3 pt-3 sm:px-5">
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 220, damping: 26 }}
        className={`tech-ring glass-nav relative mx-auto flex h-16 max-w-7xl items-center gap-3 rounded-2xl px-3 transition-shadow duration-300 sm:px-5 ${
          scrolled ? 'shadow-nav' : 'shadow-soft'
        }`}
      >
        <span className="pointer-events-none absolute inset-x-6 -bottom-px h-px bg-gradient-to-r from-transparent via-brand-500/70 to-transparent" />

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMenuOpen(true)}
          className="grid h-10 w-10 place-items-center rounded-full border border-ink-900/[0.08] bg-white/70 backdrop-blur lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5 text-ink-800" />
        </button>

        {/* Logo */}
        <Link to="/" className="flex shrink-0 items-center gap-2.5">
          <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 shadow-glow-sm">
            <span className="absolute inset-0 rounded-xl bg-brand-400/40 animate-pulse-ring" />
            <Leaf className="relative h-5 w-5 text-white" strokeWidth={2.4} />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight text-ink-900">
            egi <span className="text-brand-600">wellness</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="ml-2 hidden items-center gap-1 lg:flex">
          {mainLinks.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                `relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  isActive ? 'text-ink-900' : 'text-ink-500 hover:text-ink-900'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-full bg-brand-50 shadow-[inset_0_0_0_1px_rgba(34,197,94,0.25)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {l.label}
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* Animated icon → expanding search */}
        <motion.form
          onSubmit={submitSearch}
          initial={false}
          animate={{ width: searchOpen ? 248 : 44 }}
          transition={{ type: 'spring', stiffness: 320, damping: 30 }}
          className={`ml-auto hidden h-11 items-center overflow-hidden rounded-full sm:flex ${
            searchOpen
              ? 'border border-brand-400/60 bg-white shadow-glow-sm'
              : 'border border-ink-900/[0.08] bg-white/70 backdrop-blur'
          }`}
        >
          <button
            type="button"
            onClick={() => (searchOpen ? submitSearchOrToggle() : setSearchOpen(true))}
            className="grid h-11 w-11 shrink-0 place-items-center text-ink-600"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </button>
          <input
            ref={searchRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onBlur={() => !q && setSearchOpen(false)}
            placeholder="Search products…"
            className="h-full w-full bg-transparent pr-3 text-sm text-ink-800 outline-none placeholder:text-ink-400"
            tabIndex={searchOpen ? 0 : -1}
          />
        </motion.form>

        {/* Cart */}
        <button
          onClick={openCart}
          className="relative ml-auto grid h-11 w-11 shrink-0 place-items-center rounded-full border border-ink-900/[0.08] bg-white/70 backdrop-blur transition-all hover:border-brand-400/50 hover:shadow-glow-sm sm:ml-0"
          aria-label="Open cart"
        >
          <ShoppingBag className="h-5 w-5 text-ink-800" />
          <AnimatePresence>
            {count > 0 && (
              <motion.span
                key={count}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute -right-1 -top-1 grid h-5 min-w-[20px] place-items-center rounded-full bg-gradient-to-br from-brand-400 to-brand-600 px-1 text-[11px] font-bold text-white shadow-glow-sm"
              >
                {count}
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </motion.nav>

      {/* ===== Mobile sidebar ===== */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-50 bg-ink-900/30 backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 280 }}
              className="fixed left-0 top-0 z-50 flex h-full w-[82%] max-w-xs flex-col bg-sand-50 shadow-soft-lg lg:hidden"
            >
              <div className="flex items-center justify-between border-b border-ink-900/[0.07] p-5">
                <Link
                  to="/"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2.5"
                >
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 shadow-glow-sm">
                    <Leaf className="h-5 w-5 text-white" strokeWidth={2.4} />
                  </span>
                  <span className="font-display text-lg font-semibold text-ink-900">
                    egi <span className="text-brand-600">wellness</span>
                  </span>
                </Link>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="grid h-9 w-9 place-items-center rounded-full border border-ink-900/10 bg-white"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5 text-ink-700" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-5">
                <form
                  onSubmit={submitSearch}
                  className="mb-6 flex items-center gap-2 rounded-full border border-ink-900/10 bg-white px-4 py-3"
                >
                  <Search className="h-4 w-4 text-ink-400" />
                  <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Search products…"
                    className="w-full bg-transparent text-sm text-ink-800 outline-none placeholder:text-ink-400"
                  />
                </form>

                <p className="mb-2 px-1 text-xs font-semibold uppercase tracking-widest text-ink-400">
                  Menu
                </p>
                <nav className="mb-6 flex flex-col">
                  {mainLinks.map((l) => (
                    <SideLink key={l.to} to={l.to} onClick={() => setMenuOpen(false)}>
                      {l.label}
                    </SideLink>
                  ))}
                </nav>

                <p className="mb-2 px-1 text-xs font-semibold uppercase tracking-widest text-ink-400">
                  Categories
                </p>
                <nav className="flex flex-col">
                  {catLinks.map((l) => (
                    <SideLink key={l.to} to={l.to} onClick={() => setMenuOpen(false)}>
                      {l.label}
                    </SideLink>
                  ))}
                </nav>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  )

  function submitSearchOrToggle() {
    if (q.trim()) navigate(`/shop?q=${encodeURIComponent(q)}`)
    setSearchOpen(false)
  }
}

function SideLink({ to, onClick, children }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className="flex items-center justify-between rounded-xl px-3 py-3 text-sm font-medium text-ink-700 transition-colors hover:bg-brand-50 hover:text-ink-900"
    >
      {children}
      <ChevronRight className="h-4 w-4 text-ink-300" />
    </NavLink>
  )
}
