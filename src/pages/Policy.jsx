import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ShieldCheck } from 'lucide-react'

const policies = {
  disclaimer: {
    title: 'Disclaimer',
    intro:
      'The information and products offered on EGI Wellness are intended for general wellness and personal-care purposes only.',
    sections: [
      ['General information', 'Our products are not intended to diagnose, treat, cure, or prevent any disease. Always consult a qualified healthcare professional before starting any supplement, especially if you are pregnant, nursing, or have a medical condition.'],
      ['Product use', 'Read all labels and directions before use. Results may vary from person to person. Discontinue use if irritation occurs.'],
      ['Liability', 'EGI Wellness shall not be held liable for any misuse of products or for outcomes arising from information presented on this website.'],
    ],
  },
  payment: {
    title: 'Payment Policy',
    intro: 'We aim to make payments simple, secure, and transparent.',
    sections: [
      ['Accepted methods', 'We accept Cash on Delivery and (where enabled) online payments via UPI, cards, and net banking through a secure payment gateway.'],
      ['Pricing', 'All prices are listed in Indian Rupees (₹) and are inclusive of applicable taxes unless stated otherwise.'],
      ['Security', 'Online payment information is processed by PCI-compliant gateways. We do not store your full card details on our servers.'],
    ],
  },
  refund: {
    title: 'Refund Policy',
    intro: 'Your satisfaction matters. Here is how returns and refunds work.',
    sections: [
      ['Eligibility', 'Unopened, unused products in original packaging may be returned within 7 days of delivery. Certain hygiene and consumable items may be non-returnable.'],
      ['Process', 'Raise a request from My Orders or contact support with your order ID. Once approved and the item is received, your refund is initiated.'],
      ['Timelines', 'Approved refunds are credited to the original payment method within 5–7 business days.'],
    ],
  },
  shipping: {
    title: 'Shipping Policy',
    intro: 'Fast, reliable delivery across India.',
    sections: [
      ['Coverage & charges', 'We deliver across India. Free delivery on orders above ₹499; a nominal fee applies below that.'],
      ['Dispatch & delivery', 'Orders are usually dispatched within 24–48 hours and delivered within 3–7 business days depending on your location.'],
      ['Tracking', 'You will receive tracking details once your order ships. Delays may occur due to weather or courier constraints.'],
    ],
  },
  privacy: {
    title: 'Privacy Policy',
    intro: 'We respect your privacy and protect your personal information.',
    sections: [
      ['Information we collect', 'We collect details you provide (name, contact, address) and basic usage data to process orders and improve our service.'],
      ['How we use it', 'Your data is used to fulfil orders, provide support, and—only with consent—send offers. We never sell your personal information.'],
      ['Your choices', 'You can request access, correction, or deletion of your data, and opt out of marketing at any time by contacting us.'],
    ],
  },
}

export default function Policy() {
  const { slug } = useParams()
  const policy = policies[slug]

  if (!policy) {
    return (
      <div className="section-pad flex flex-col items-center gap-4 py-32 text-center">
        <h1 className="font-display text-2xl font-semibold">Policy not found</h1>
        <Link to="/" className="btn-primary px-6 py-3">
          Back home
        </Link>
      </div>
    )
  }

  return (
    <div className="section-pad max-w-3xl py-10">
      <Link
        to="/"
        className="mb-6 inline-flex items-center gap-2 text-sm text-ink-500 hover:text-ink-900"
      >
        <ArrowLeft className="h-4 w-4" /> Back home
      </Link>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-brand-600">
          <ShieldCheck className="h-4 w-4" /> EGI Wellness
        </p>
        <h1 className="font-display text-4xl font-semibold sm:text-5xl">{policy.title}</h1>
        <p className="mt-4 text-ink-500">{policy.intro}</p>

        <div className="mt-8 space-y-6">
          {policy.sections.map(([heading, body]) => (
            <div key={heading} className="card-surface p-6">
              <h2 className="font-display text-lg font-semibold text-ink-900">{heading}</h2>
              <p className="mt-2 leading-relaxed text-ink-600">{body}</p>
            </div>
          ))}
        </div>

        <p className="mt-8 text-sm text-ink-400">
          Questions about this policy? Email{' '}
          <a href="mailto:care@egiwellness.in" className="font-semibold text-brand-600 hover:underline">
            care@egiwellness.in
          </a>
          .
        </p>
      </motion.div>
    </div>
  )
}
