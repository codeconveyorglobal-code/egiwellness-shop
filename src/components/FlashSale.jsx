import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Zap, ArrowRight } from 'lucide-react'
import { products } from '../data/products'
import { discountPct } from '../lib/format'
import ProductCard from './ProductCard'

const WINDOW_MS = 6 * 60 * 60 * 1000 // rolling 6-hour sale

// Persisted rolling deadline so the countdown survives refreshes.
function getDeadline() {
  try {
    const saved = Number(localStorage.getItem('egi-flash-deadline'))
    if (saved && saved > Date.now()) return saved
  } catch {}
  const next = Date.now() + WINDOW_MS
  try {
    localStorage.setItem('egi-flash-deadline', String(next))
  } catch {}
  return next
}

function useCountdown() {
  const [deadline, setDeadline] = useState(getDeadline)
  const [remaining, setRemaining] = useState(() => deadline - Date.now())

  useEffect(() => {
    const t = setInterval(() => {
      let left = deadline - Date.now()
      if (left <= 0) {
        const next = Date.now() + WINDOW_MS
        try {
          localStorage.setItem('egi-flash-deadline', String(next))
        } catch {}
        setDeadline(next)
        left = WINDOW_MS
      }
      setRemaining(left)
    }, 1000)
    return () => clearInterval(t)
  }, [deadline])

  const s = Math.max(0, Math.floor(remaining / 1000))
  return {
    h: String(Math.floor(s / 3600)).padStart(2, '0'),
    m: String(Math.floor((s % 3600) / 60)).padStart(2, '0'),
    s: String(s % 60).padStart(2, '0'),
  }
}

function Digit({ value, label }) {
  return (
    <div className="flex flex-col items-center">
      <div className="grid h-12 w-12 place-items-center rounded-xl bg-ink-900 font-display text-xl font-bold tabular-nums text-white shadow-soft sm:h-14 sm:w-14 sm:text-2xl">
        {value}
      </div>
      <span className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-ink-400">
        {label}
      </span>
    </div>
  )
}

export default function FlashSale() {
  const { h, m, s } = useCountdown()
  const deals = [...products]
    .filter((p) => discountPct(p.mrp, p.price) >= 45)
    .sort((a, b) => discountPct(b.mrp, b.price) - discountPct(a.mrp, a.price))
    .slice(0, 10)

  return (
    <section className="section-pad relative mt-16 sm:mt-20">
      <div className="aurora left-1/2 top-0 h-48 w-72 -translate-x-1/2 bg-rose-200/50" />

      <div className="relative overflow-hidden rounded-3xl border border-rose-200/60 bg-gradient-to-br from-rose-50 via-sand-50 to-amber-50 p-5 sm:p-7">
        {/* header row */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="relative grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-rose-500 to-amber-500 shadow-glow-sm">
              <span className="absolute inset-0 rounded-2xl bg-rose-400/40 animate-pulse-ring" />
              <Zap className="relative h-6 w-6 text-white" strokeWidth={2.2} />
            </span>
            <div>
              <h2 className="font-display text-2xl font-semibold leading-none sm:text-3xl">
                Flash Sale
              </h2>
              <p className="mt-1 text-sm text-ink-500">Up to 60% off — ends soon!</p>
            </div>
          </div>

          {/* countdown */}
          <div className="flex items-center gap-2">
            <Digit value={h} label="Hrs" />
            <span className="font-display text-2xl font-bold text-ink-300">:</span>
            <Digit value={m} label="Min" />
            <span className="font-display text-2xl font-bold text-ink-300">:</span>
            <Digit value={s} label="Sec" />
          </div>
        </div>

        {/* deals rail */}
        <div className="no-scrollbar -mx-5 flex snap-x gap-3 overflow-x-auto px-5 pb-1 sm:-mx-7 sm:gap-4 sm:px-7">
          {deals.map((p, i) => (
            <div key={p.id} className="w-40 shrink-0 snap-start sm:w-48">
              <ProductCard product={p} index={i} />
            </div>
          ))}
        </div>

        <div className="mt-5 flex justify-center">
          <Link to="/shop?sort=discount" className="btn-primary px-6 py-3 text-sm">
            Shop all deals <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
