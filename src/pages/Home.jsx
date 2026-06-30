import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Sparkles,
  Pill,
  House,
  HeartPulse,
  Truck,
  Leaf,
  ShieldCheck,
  Star,
} from 'lucide-react'
import { categories, products, bestsellers } from '../data/products'
import ProductCard from '../components/ProductCard'
import BannerSlider from '../components/BannerSlider'
import FlashSale from '../components/FlashSale'

const iconMap = { Sparkles, Pill, House, HeartPulse }

const valueProps = [
  { icon: Leaf, title: '100% Freshness', text: 'Sourced & packed fresh, always.' },
  { icon: Truck, title: 'Fast Delivery', text: 'Doorstep delivery across India.' },
  { icon: ShieldCheck, title: 'Great Value', text: 'Honest prices, real savings.' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
}

export default function Home() {
  const featured = bestsellers.length ? bestsellers : products.slice(0, 8)
  const dealsRail = [...products]
    .sort((a, b) => (b.mrp - b.price) / b.mrp - (a.mrp - a.price) / a.mrp)
    .slice(0, 10)

  return (
    <div className="overflow-x-hidden">
      {/* ===== HERO ===== */}
      <section className="relative">
        <div className="tech-grid pointer-events-none absolute inset-0 -z-10" />
        <div className="aurora left-[-8%] top-[-6%] h-72 w-72 bg-brand-300" />
        <div className="aurora right-[-4%] top-[18%] h-80 w-80 bg-lime-200" />

        <div className="section-pad relative hidden items-center gap-10 py-14 lg:grid lg:grid-cols-2 lg:py-24">
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.12 } } }}
          >
            <motion.span
              variants={fadeUp}
              className="chip mb-5 border border-ink-900/[0.07] bg-white text-brand-700 shadow-soft"
            >
              <Sparkles className="h-3.5 w-3.5" /> Natural • Ayurvedic • Everyday
            </motion.span>

            <motion.h1
              variants={fadeUp}
              className="font-display text-5xl font-semibold leading-[1.02] tracking-tight text-ink-900 sm:text-6xl lg:text-7xl"
            >
              Wellness that feels
              <br />
              <span className="gradient-text italic">pure &amp; powerful.</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="mt-6 max-w-md text-lg text-ink-500">
              Cosmetics, supplements and home essentials crafted from nature — delivered
              fresh to your door with great value.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
              <Link to="/shop" className="btn-primary px-7 py-3.5 text-base">
                Shop now <ArrowRight className="h-5 w-5" />
              </Link>
              <Link to="/shop?cat=cosmetics" className="btn-ghost px-7 py-3.5 text-base">
                Explore cosmetics
              </Link>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="mt-10 flex items-center gap-6 text-sm text-ink-500"
            >
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span>4.7/5 rated</span>
              </div>
              <span className="h-4 w-px bg-ink-900/15" />
              <span>
                <strong className="text-ink-900">{products.length}+</strong> products
              </span>
            </motion.div>
          </motion.div>

          {/* Hero visual — hidden on phones so the slider follows the title directly */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="relative mx-auto hidden w-full max-w-md lg:block"
          >
            <div className="relative aspect-square">
              <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-brand-200/60 to-lime-100 blur-2xl" />
              <div className="card-surface relative grid h-full grid-cols-2 grid-rows-2 gap-3 rounded-[2.5rem] p-3">
                {categories.map((c, i) => {
                  const Icon = iconMap[c.icon] || Leaf
                  return (
                    <motion.div
                      key={c.id}
                      animate={{ y: [0, i % 2 ? 10 : -10, 0] }}
                      transition={{ duration: 5 + i, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <Link
                        to={`/shop?cat=${c.id}`}
                        className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl p-4"
                        style={{
                          background: `linear-gradient(140deg, ${c.gradient[0]}, ${c.gradient[1]})`,
                        }}
                      >
                        <Icon className="h-7 w-7 text-white/90" strokeWidth={1.7} />
                        <div className="text-white">
                          <p className="text-[11px] font-medium uppercase tracking-wide text-white/75">
                            {c.tagline}
                          </p>
                          <p className="font-display text-lg font-semibold leading-tight">
                            {c.name}
                          </p>
                        </div>
                        <ArrowRight className="absolute right-4 top-4 h-4 w-4 -translate-y-1 translate-x-1 text-white/0 transition-all group-hover:translate-x-0 group-hover:translate-y-0 group-hover:text-white/90" />
                      </Link>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Mobile: page starts with the slider, sitting on the hero background */}
        <div className="section-pad relative pb-2 pt-5 lg:hidden">
          <BannerSlider />
        </div>
      </section>

      {/* ===== PROMO BANNER SLIDER (desktop, below hero) ===== */}
      <section className="section-pad hidden lg:block">
        <BannerSlider />
      </section>

      {/* ===== VALUE PROPS (compact horizontal scroll) ===== */}
      <section className="section-pad mt-6">
        <div className="no-scrollbar -mx-5 flex gap-3 overflow-x-auto px-5 pb-1 sm:mx-0 sm:px-0">
          {valueProps.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="card-surface flex shrink-0 items-center gap-3 px-4 py-3 sm:flex-1"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
                <v.icon className="h-5 w-5" />
              </span>
              <div className="whitespace-nowrap sm:whitespace-normal">
                <p className="text-sm font-semibold text-ink-900">{v.title}</p>
                <p className="text-xs text-ink-500">{v.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== CATEGORIES ===== */}
      <section className="section-pad relative mt-10 sm:mt-16">
        <div className="aurora left-[-6%] top-10 h-56 w-56 bg-brand-200/70" />
        <div className="mb-5 flex items-end justify-between sm:mb-8">
          <div>
            <h2 className="font-display text-2xl font-semibold sm:text-4xl">Shop by category</h2>
            <p className="mt-1 text-sm text-ink-500 sm:text-base">Find exactly what your routine needs.</p>
          </div>
          <Link
            to="/shop"
            className="hidden items-center gap-1 text-sm font-semibold text-brand-600 hover:text-brand-700 sm:flex"
          >
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="no-scrollbar -mx-5 flex snap-x gap-5 overflow-x-auto px-5 pb-3 sm:-mx-8 sm:px-8 lg:mx-0 lg:px-0">
          {categories.map((c, i) => {
            const Icon = iconMap[c.icon] || Leaf
            return (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="snap-start"
              >
                <Link
                  to={`/shop?cat=${c.id}`}
                  className="group flex w-24 flex-col items-center gap-3 sm:w-28"
                >
                  <span className="relative grid h-24 w-24 place-items-center rounded-full ring-4 ring-white transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-glow sm:h-28 sm:w-28">
                    {/* animated gradient ring */}
                    <span
                      className="absolute -inset-1 rounded-full opacity-70 blur-[6px] transition-opacity group-hover:opacity-100"
                      style={{
                        background: `conic-gradient(from 0deg, ${c.gradient[0]}, ${c.gradient[1]}, ${c.gradient[0]})`,
                      }}
                    />
                    {/* thumbnail */}
                    <span
                      className="relative grid h-full w-full place-items-center overflow-hidden rounded-full"
                      style={{
                        background: `linear-gradient(150deg, ${c.gradient[0]}, ${c.gradient[1]})`,
                      }}
                    >
                      <span className="absolute -right-3 -top-3 h-10 w-10 rounded-full bg-white/25 blur-md" />
                      <Icon className="relative h-9 w-9 text-white" strokeWidth={1.7} />
                    </span>
                  </span>
                  <span className="text-center text-sm font-semibold text-ink-800 group-hover:text-ink-900">
                    {c.name}
                  </span>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* ===== FLASH SALE ===== */}
      <FlashSale />

      {/* ===== BESTSELLERS ===== */}
      <section className="section-pad mt-16 sm:mt-20">
        <div className="mb-6 flex items-end justify-between sm:mb-8">
          <div>
            <h2 className="font-display text-2xl font-semibold sm:text-4xl">Bestsellers</h2>
            <p className="mt-1 text-sm text-ink-500 sm:text-base">Loved by our community.</p>
          </div>
          <Link
            to="/shop"
            className="flex items-center gap-1 text-sm font-semibold text-brand-600 hover:text-brand-700"
          >
            See all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Mobile: horizontal rail (HyperMart style) */}
        <div className="no-scrollbar -mx-5 flex snap-x gap-3 overflow-x-auto px-5 pb-2 sm:hidden">
          {featured.slice(0, 8).map((p, i) => (
            <div key={p.id} className="w-40 shrink-0 snap-start">
              <ProductCard product={p} index={i} />
            </div>
          ))}
        </div>

        {/* Tablet/desktop: grid */}
        <div className="hidden grid-cols-2 gap-4 sm:grid md:grid-cols-3 lg:grid-cols-4">
          {featured.slice(0, 8).map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>

      {/* ===== POPULAR DEALS (horizontal rail, all sizes) ===== */}
      <section className="section-pad relative mt-16 sm:mt-20">
        <div className="aurora right-[-6%] top-0 h-56 w-56 bg-lime-200/70" />
        <div className="mb-6 flex items-end justify-between sm:mb-8">
          <div>
            <h2 className="font-display text-2xl font-semibold sm:text-4xl">Popular deals</h2>
            <p className="mt-1 text-sm text-ink-500 sm:text-base">Biggest savings, picked for you.</p>
          </div>
          <Link
            to="/shop?cat=cosmetics"
            className="flex items-center gap-1 text-sm font-semibold text-brand-600 hover:text-brand-700"
          >
            See all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="no-scrollbar -mx-5 flex snap-x gap-3 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:gap-4 sm:px-8 lg:mx-0 lg:px-0">
          {dealsRail.map((p, i) => (
            <div key={p.id} className="w-40 shrink-0 snap-start sm:w-52">
              <ProductCard product={p} index={i} />
            </div>
          ))}
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section className="section-pad mt-20">
        <div className="relative overflow-hidden rounded-[2rem] bg-ink-900 p-8 sm:p-14">
          <div className="aurora right-0 top-0 h-60 w-60 bg-brand-500/50" />
          <div className="aurora bottom-0 left-10 h-52 w-52 bg-lime-400/30" />
          <div className="relative max-w-lg">
            <h2 className="font-display text-3xl font-semibold text-white sm:text-5xl">
              Your daily dose of <span className="italic text-brand-300">natural goodness.</span>
            </h2>
            <p className="mt-4 text-white/70">
              Up to <strong className="text-brand-300">50% off</strong> on bestsellers. Free
              delivery on orders above ₹499.
            </p>
            <Link to="/shop" className="btn-accent mt-7 px-7 py-3.5 text-base">
              Start shopping <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
