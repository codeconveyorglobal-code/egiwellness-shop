import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Download, X, Share, Plus } from 'lucide-react'

const DISMISS_KEY = 'egi-install-dismissed'

export default function InstallPrompt() {
  const [deferred, setDeferred] = useState(null)
  const [show, setShow] = useState(false)
  const [iosHint, setIosHint] = useState(false)

  useEffect(() => {
    if (localStorage.getItem(DISMISS_KEY)) return

    const standalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone === true
    if (standalone) return

    const onPrompt = (e) => {
      e.preventDefault()
      setDeferred(e)
      setShow(true)
    }
    window.addEventListener('beforeinstallprompt', onPrompt)

    // iOS Safari has no beforeinstallprompt — show an Add-to-Home-Screen hint.
    const ua = window.navigator.userAgent
    const isIos = /iphone|ipad|ipod/i.test(ua)
    const isSafari = /safari/i.test(ua) && !/crios|fxios|android/i.test(ua)
    if (isIos && isSafari) {
      setIosHint(true)
      setShow(true)
    }

    window.addEventListener('appinstalled', () => setShow(false))
    return () => window.removeEventListener('beforeinstallprompt', onPrompt)
  }, [])

  const dismiss = () => {
    setShow(false)
    try {
      localStorage.setItem(DISMISS_KEY, '1')
    } catch {}
  }

  const install = async () => {
    if (!deferred) return
    deferred.prompt()
    const { outcome } = await deferred.userChoice
    if (outcome === 'accepted') setShow(false)
    setDeferred(null)
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', damping: 26, stiffness: 260 }}
          className="fixed inset-x-3 bottom-24 z-[45] mx-auto max-w-md lg:bottom-6"
        >
          <div className="tech-ring glass-nav flex items-center gap-3 rounded-2xl p-3 shadow-nav">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 shadow-glow-sm">
              <img src="favicon.svg" alt="" className="h-6 w-6" />
            </span>

            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-ink-900">Install EGI Wellness</p>
              {iosHint ? (
                <p className="flex items-center gap-1 text-xs text-ink-500">
                  Tap <Share className="inline h-3.5 w-3.5" /> then “Add to Home Screen”
                  <Plus className="inline h-3.5 w-3.5" />
                </p>
              ) : (
                <p className="text-xs text-ink-500">Add to your home screen for a faster, app-like experience.</p>
              )}
            </div>

            {!iosHint && (
              <button onClick={install} className="btn-primary shrink-0 px-4 py-2 text-sm">
                <Download className="h-4 w-4" /> Install
              </button>
            )}
            <button
              onClick={dismiss}
              aria-label="Dismiss"
              className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-ink-400 hover:bg-sand-200 hover:text-ink-700"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
