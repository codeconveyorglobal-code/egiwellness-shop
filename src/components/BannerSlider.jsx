import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles, Truck, Tag, ChevronLeft, ChevronRight } from 'lucide-react'

const AUTO_MS = 4800

const slides = [
  {
    id: 'offer',
    badge: 'Limited time',
    title: 'Up to 50% OFF',
    subtitle: 'On cosmetics & skincare bestsellers',
    cta: 'Shop deals',
    to: '/shop?cat=cosmetics',
    icon: Tag,
    gradient: ['#16a34a', '#065f46'],
  },
  {
    id: 'delivery',
    badge: 'Every order',
    title: 'Free Delivery',
    subtitle: 'On all orders above ₹499 across India',
    cta: 'Start shopping',
    to: '/shop',
    icon: Truck,
    gradient: ['#0e7490', '#155e75'],
  },
  {
    id: 'new',
    badge: 'Fresh in',
    title: 'New Arrivals',
    subtitle: 'Ayurvedic supplements for daily vitality',
    cta: 'Explore',
    to: '/shop?cat=supplements',
    icon: Sparkles,
    gradient: ['#65a30d', '#3f6212'],
  },
]

export default function BannerSlider() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const timer = useRef(null)

  useEffect(() => {
    if (paused) return
    timer.current = setTimeout(() => setIndex((i) => (i + 1) % slides.length), AUTO_MS)
    return () => clearTimeout(timer.current)
  }, [index, paused])

  const go = (i) => setIndex((i + slides.length) % slides.length)

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* animated gradient border */}
      <div className="tech-ring overflow-hidden rounded-[1.75rem]">
        <div className="overflow-hidden rounded-[1.75rem]">
          <motion.div
            className="flex"
            animate={{ x: `-${index * 100}%` }}
            transition={{ type: 'spring', stiffness: 260, damping: 32 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.18}
            onDragEnd={(e, info) => {
              if (info.offset.x < -60) go(index + 1)
              else if (info.offset.x > 60) go(index - 1)
            }}
          >
            {slides.map((s) => {
              const Icon = s.icon
              return (
                <div key={s.id} className="flex w-full shrink-0">
                  <div
                    className="relative flex min-h-[190px] w-full flex-col justify-center overflow-hidden rounded-[1.75rem] p-6 sm:min-h-[230px] sm:p-9"
                    style={{
                      background: `linear-gradient(125deg, ${s.gradient[0]}, ${s.gradient[1]})`,
                    }}
                  >
                    {/* techy decor */}
                    <div className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-white/15 blur-2xl" />
                    <div className="pointer-events-none absolute -bottom-16 right-20 h-36 w-36 rounded-full bg-white/10 blur-xl" />
                    <div
                      className="pointer-events-none absolute inset-0 opacity-[0.18]"
                      style={{
                        backgroundImage:
                          'radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)',
                        backgroundSize: '20px 20px',
                      }}
                    />
                    {/* faint grid lines */}
                    <div
                      className="pointer-events-none absolute inset-0 opacity-10"
                      style={{
                        backgroundImage:
                          'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
                        backgroundSize: '46px 46px',
                      }}
                    />
                    {/* diagonal shine sweep */}
                    <motion.div
                      className="pointer-events-none absolute -inset-y-2 -left-1/3 w-1/3 skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/25 to-transparent"
                      animate={{ left: ['-35%', '135%'] }}
                      transition={{ duration: 3.2, repeat: Infinity, repeatDelay: 1.6, ease: 'easeInOut' }}
                    />

                    <div className="relative flex items-center justify-between gap-4">
                      <div className="max-w-[68%]">
                        <span className="chip mb-2 gap-1 bg-white/20 text-white backdrop-blur">
                          <Sparkles className="h-3 w-3" /> {s.badge}
                        </span>
                        <h3 className="font-display text-2xl font-semibold leading-tight text-white drop-shadow-sm sm:text-4xl">
                          {s.title}
                        </h3>
                        <p className="mt-1.5 text-sm text-white/85 sm:text-base">{s.subtitle}</p>
                        <Link
                          to={s.to}
                          className="btn group mt-4 bg-white px-5 py-2.5 text-sm font-semibold text-ink-900 shadow-soft hover:-translate-y-0.5"
                        >
                          {s.cta}
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        </Link>
                      </div>

                      {/* glowing icon medallion */}
                      <div className="relative grid h-24 w-24 shrink-0 place-items-center sm:h-32 sm:w-32">
                        <span className="absolute inset-0 rounded-full bg-white/20 blur-md" />
                        <span className="absolute inset-0 rounded-full bg-white/30 animate-pulse-ring" />
                        <motion.div
                          animate={{ rotate: [0, 6, -6, 0], y: [0, -6, 0] }}
                          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                          className="relative grid h-full w-full place-items-center rounded-3xl border border-white/30 bg-white/15 backdrop-blur"
                        >
                          <Icon className="h-12 w-12 text-white sm:h-16 sm:w-16" strokeWidth={1.5} />
                        </motion.div>
                      </div>
                    </div>

                    {/* autoplay progress bar */}
                    <div className="absolute inset-x-5 bottom-3 h-1 overflow-hidden rounded-full bg-white/20 sm:inset-x-9">
                      <motion.div
                        key={index + '-' + paused}
                        className="h-full rounded-full bg-white/80"
                        initial={{ width: '0%' }}
                        animate={{ width: paused ? '0%' : '100%' }}
                        transition={{ duration: paused ? 0 : AUTO_MS / 1000, ease: 'linear' }}
                      />
                    </div>
                  </div>
                </div>
              )
            })}
          </motion.div>
        </div>
      </div>

      {/* Glass arrows (desktop) */}
      <button
        onClick={() => go(index - 1)}
        aria-label="Previous"
        className="absolute -left-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 place-items-center rounded-full glass-nav shadow-nav transition-transform hover:scale-105 md:grid"
      >
        <ChevronLeft className="h-5 w-5 text-ink-800" />
      </button>
      <button
        onClick={() => go(index + 1)}
        aria-label="Next"
        className="absolute -right-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 place-items-center rounded-full glass-nav shadow-nav transition-transform hover:scale-105 md:grid"
      >
        <ChevronRight className="h-5 w-5 text-ink-800" />
      </button>

      {/* Dots */}
      <div className="mt-4 flex items-center justify-center gap-2">
        {slides.map((s, i) => (
          <button
            key={s.id}
            onClick={() => go(i)}
            aria-label={`Go to slide ${i + 1}`}
            className="h-2 rounded-full transition-all duration-300"
            style={{
              width: i === index ? 26 : 8,
              background: i === index ? '#16a34a' : 'rgba(20,32,27,0.18)',
            }}
          />
        ))}
      </div>
    </div>
  )
}
