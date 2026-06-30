import { Link } from 'react-router-dom'
import { Leaf } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="section-pad flex flex-col items-center justify-center py-32 text-center">
      <span className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-brand-400 to-brand-600 shadow-soft">
        <Leaf className="h-8 w-8 text-white" />
      </span>
      <h1 className="mt-6 font-display text-6xl font-semibold gradient-text">404</h1>
      <p className="mt-3 text-ink-500">This page wandered off into the wild.</p>
      <Link to="/" className="btn-primary mt-8 px-7 py-3.5">
        Back home
      </Link>
    </div>
  )
}
