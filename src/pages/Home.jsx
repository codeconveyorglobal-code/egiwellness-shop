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
  Quote,
  Check,
} from 'lucide-react'
import { categories, products, bestsellers } from '../data/products'
import ProductCard from '../components/ProductCard'
import BannerSlider from '../components/BannerSlider'
import FlashSale from '../components/FlashSale'
import SectionHeading from '../components/SectionHeading'

const editorialImg = (id) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=900&q=75`

const promises = [
  { icon: Leaf, title: 'Naturally derived', text: 'Botanical actives, no harsh chemicals.' },
  { icon: ShieldCheck, title: 'Lab tested', text: 'Quality-checked for purity & safety.' },
  { icon: Truck, title: 'Fresh to door', text: 'Sealed fresh, delivered fast.' },
]

const testimonials = [
  { name: 'Aarti S.', city: 'Pune', quote: 'The Kesar serum gave my skin a real glow in two weeks. Beautiful packaging too!', rating: 5 },
  { name: 'Rahul M.', city: 'Delhi', quote: 'Genuine ayurvedic products at honest prices. Delivery was quick and well packed.', rating: 5 },
  { name: 'Sneha K.', city: 'Bengaluru', quote: 'Switched my whole routine to EGI. The amla oil and rose water are my favourites.', rating: 4 },
]

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
      <section className="section-pad relative mt-12 sm:mt-20">
        <div className="aurora left-[-6%] top-10 h-56 w-56 bg-brand-200/70" />
        <SectionHeading
          eyebrow="Explore"
          title="Shop by category"
          subtitle="Find exactly what your routine needs."
          to="/shop"
          linkLabel="View all"
        />

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

      {/* ===== EDITORIAL: ROOTED IN NATURE ===== */}
      <section className="section-pad mt-16 sm:mt-24">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
          {/* image collage */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative aspect-[5/4] w-full">
              <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-brand-200 to-lime-100 blur-2xl" />
              <div
                className="absolute left-0 top-0 h-[78%] w-[72%] overflow-hidden rounded-[1.75rem] bg-brand-100 shadow-soft-lg ring-8 ring-sand-50"
                style={{ backgroundImage: `url(${editorialImg('1556228720-195a672e8a03')})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
              />
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute bottom-0 right-0 h-[58%] w-[54%] overflow-hidden rounded-[1.5rem] bg-lime-100 shadow-soft-lg ring-8 ring-sand-50"
                style={{ backgroundImage: `url(${editorialImg('1596040033229-a9821ebd058d')})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
              />
              {/* floating badge */}
              <div className="absolute -left-2 bottom-6 flex items-center gap-2 rounded-2xl bg-white/90 px-4 py-3 shadow-soft backdrop-blur sm:bottom-10">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-500 text-white">
                  <Leaf className="h-5 w-5" />
                </span>
                <div className="leading-tight">
                  <p className="font-display text-sm font-semibold text-ink-900">100% Natural</p>
                  <p className="text-[11px] text-ink-500">Freshly sourced</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* text */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="order-1 lg:order-2"
          >
            <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-brand-600">
              <span className="h-px w-6 bg-brand-500/60" /> Our promise
            </p>
            <h2 className="font-display text-3xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">
              Rooted in nature,
              <br />
              <span className="gradient-text italic">made for you.</span>
            </h2>
            <p className="mt-5 max-w-md text-ink-500">
              Every EGI product blends time-honoured Ayurvedic wisdom with modern care —
              thoughtfully formulated, gently effective, and kind to your skin and the planet.
            </p>

            <div className="mt-7 space-y-3">
              {promises.map((p) => (
                <div key={p.title} className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
                    <p.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-semibold text-ink-900">{p.title}</p>
                    <p className="text-sm text-ink-500">{p.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link to="/shop" className="btn-primary mt-8 px-7 py-3.5 text-base">
              Discover the range <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ===== FLASH SALE ===== */}
      <FlashSale />

      {/* ===== BESTSELLERS ===== */}
      <section className="section-pad mt-16 sm:mt-24">
        <SectionHeading
          eyebrow="Most loved"
          title="Bestsellers"
          subtitle="Loved by our community."
          to="/shop"
        />

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
      <section className="section-pad relative mt-16 sm:mt-24">
        <div className="aurora right-[-6%] top-0 h-56 w-56 bg-lime-200/70" />
        <SectionHeading
          eyebrow="Save more"
          title="Popular deals"
          subtitle="Biggest savings, picked for you."
          to="/shop?sort=discount"
        />

        <div className="no-scrollbar -mx-5 flex snap-x gap-3 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:gap-4 sm:px-8 lg:mx-0 lg:px-0">
          {dealsRail.map((p, i) => (
            <div key={p.id} className="w-40 shrink-0 snap-start sm:w-52">
              <ProductCard product={p} index={i} />
            </div>
          ))}
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="section-pad mt-16 sm:mt-24">
        <SectionHeading
          eyebrow="Kind words"
          title="Loved by thousands"
          subtitle="Real reviews from our wellness community."
        />
        <div className="grid gap-4 sm:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card-surface relative flex flex-col p-6"
            >
              <Quote className="absolute right-5 top-5 h-8 w-8 text-brand-100" />
              <div className="mb-3 flex gap-0.5">
                {[...Array(5)].map((_, s) => (
                  <Star
                    key={s}
                    className={`h-4 w-4 ${
                      s < t.rating ? 'fill-amber-400 text-amber-400' : 'text-ink-300'
                    }`}
                  />
                ))}
              </div>
              <blockquote className="flex-1 text-sm leading-relaxed text-ink-700">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-brand-400 to-brand-600 text-sm font-bold text-white">
                  {t.name.charAt(0)}
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink-900">{t.name}</p>
                  <p className="text-xs text-ink-400">{t.city}</p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section className="section-pad mt-16 sm:mt-24">
        <div className="relative overflow-hidden rounded-[2.25rem] bg-ink-900 p-8 sm:p-16">
          <div className="aurora right-0 top-0 h-60 w-60 bg-brand-500/50" />
          <div className="aurora bottom-0 left-10 h-52 w-52 bg-lime-400/30" />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
              backgroundSize: '48px 48px',
            }}
          />
          <div className="relative max-w-lg">
            <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-brand-300">
              <span className="h-px w-6 bg-brand-400/60" /> Start today
            </p>
            <h2 className="font-display text-3xl font-semibold leading-tight text-white sm:text-5xl">
              Your daily dose of <span className="italic text-brand-300">natural goodness.</span>
            </h2>
            <p className="mt-4 text-white/70">
              Up to <strong className="text-brand-300">50% off</strong> on bestsellers. Free
              delivery on orders above ₹499.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <Link to="/shop" className="btn-accent px-7 py-3.5 text-base">
                Start shopping <ArrowRight className="h-5 w-5" />
              </Link>
              <span className="flex items-center gap-2 text-sm text-white/70">
                <Check className="h-4 w-4 text-brand-300" /> No-hassle returns
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
