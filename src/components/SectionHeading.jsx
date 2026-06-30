import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function SectionHeading({ eyebrow, title, subtitle, to, linkLabel = 'See all' }) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4 sm:mb-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {eyebrow && (
          <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-brand-600">
            <span className="h-px w-6 bg-brand-500/60" />
            {eyebrow}
          </p>
        )}
        <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
        {subtitle && <p className="mt-1.5 text-sm text-ink-500 sm:text-base">{subtitle}</p>}
      </motion.div>

      {to && (
        <Link
          to={to}
          className="group flex shrink-0 items-center gap-1 text-sm font-semibold text-brand-600 hover:text-brand-700"
        >
          {linkLabel}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  )
}
