import { gradientFor, initials } from '../lib/format'
import { Sparkles, Pill, House, HeartPulse, Leaf } from 'lucide-react'

const catIcon = {
  cosmetics: Sparkles,
  supplements: Pill,
  'home-care': House,
  'personal-care': HeartPulse,
}

// Branded soft-pastel "product photo" placeholder. Premium and airy on light UI,
// trivially swappable for a real <img src={product.image}/> later.
export default function ProductMedia({ product, className = '', rounded = 'rounded-2xl' }) {
  const [from, to] = gradientFor(product.id)
  const Icon = catIcon[product.category] || Leaf

  return (
    <div
      className={`relative overflow-hidden ${rounded} ${className}`}
      style={{ background: `linear-gradient(140deg, ${from}, ${to})` }}
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/40 to-white/0" />
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/40 blur-2xl" />
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(20,32,27,0.25) 1px, transparent 1px)',
          backgroundSize: '15px 15px',
        }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-ink-800">
        <Icon className="mb-1 h-7 w-7 opacity-70" strokeWidth={1.6} />
        <span className="font-display text-3xl font-bold tracking-tight">
          {initials(product.name)}
        </span>
      </div>
      <div className="absolute inset-x-0 bottom-2 px-3 text-center">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink-700/60">
          EGI Wellness
        </span>
      </div>
    </div>
  )
}
