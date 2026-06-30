import { Link } from 'react-router-dom'
import { Leaf, Instagram, Facebook, Twitter, Mail, Phone } from 'lucide-react'
import { categories } from '../data/products'

const policies = [
  'Disclaimer',
  'Payment Policy',
  'Refund Policy',
  'Shipping Policy',
  'Privacy Policy',
]

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-ink-900/[0.07] bg-sand-50">
      <div className="section-pad grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link to="/" className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-600">
              <Leaf className="h-5 w-5 text-white" strokeWidth={2.4} />
            </span>
            <span className="font-display text-lg font-semibold text-ink-900">
              egi <span className="text-brand-600">wellness</span>
            </span>
          </Link>
          <p className="mt-4 max-w-xs text-sm text-ink-500">
            Natural cosmetics, supplements and everyday essentials. 100% freshness, fast
            delivery, great value.
          </p>
          <div className="mt-5 flex gap-2">
            {[Instagram, Facebook, Twitter].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="grid h-9 w-9 place-items-center rounded-full border border-ink-900/10 bg-white text-ink-500 transition-colors hover:text-brand-600"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-4 font-semibold text-ink-900">Shop</h4>
          <ul className="space-y-2.5 text-sm text-ink-500">
            {categories.map((c) => (
              <li key={c.id}>
                <Link to={`/shop?cat=${c.id}`} className="hover:text-brand-600">
                  {c.name}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/shop" className="hover:text-brand-600">
                All Products
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-semibold text-ink-900">Policies</h4>
          <ul className="space-y-2.5 text-sm text-ink-500">
            {policies.map((p) => (
              <li key={p}>
                <a href="#" className="hover:text-brand-600">
                  {p}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-semibold text-ink-900">Get in touch</h4>
          <ul className="space-y-3 text-sm text-ink-500">
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-brand-600" /> care@egiwellness.in
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-brand-600" /> +91 00000 00000
            </li>
          </ul>
          <div className="mt-5 rounded-2xl border border-ink-900/[0.06] bg-white p-4 shadow-soft">
            <p className="text-xs text-ink-500">Join our newsletter for offers &amp; tips.</p>
            <div className="mt-3 flex gap-2">
              <input
                placeholder="Email address"
                className="w-full rounded-full bg-sand-100 px-3 py-2 text-xs text-ink-800 outline-none placeholder:text-ink-400"
              />
              <button className="btn-primary px-4 py-2 text-xs">Join</button>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-ink-900/[0.07]">
        <div className="section-pad flex flex-col items-center justify-between gap-2 py-5 text-xs text-ink-400 sm:flex-row">
          <p>© {new Date().getFullYear()} EGI Wellness. All rights reserved.</p>
          <p>Demo storefront · built with React + Vite. Catalog referenced from egiwellness.in</p>
        </div>
      </div>
    </footer>
  )
}
