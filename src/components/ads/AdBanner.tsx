'use client'

import { memo, useEffect, useRef } from 'react'
import { ADSENSE_CLIENT, AD_SLOTS, AD_SLOT_TOOL_PAGE } from '@/components/adsense/adsense-provider'

/* ── CLS-safe ad container ──────────────────────────────────────────────
   Fixed dimensions prevent layout shift (CLS < 0.1).
   Each wrapper reserves exact pixel space before the ad loads.
   If AdSense fills a smaller ad, the container stays at the reserved
   height so surrounding content never jumps.                                  */

interface AdSlotProps {
  slot: string
  format?: 'auto' | 'horizontal' | 'rectangle' | 'vertical' | 'fluid'
  layout?: string
  className?: string
}

/** Low-level <ins> pusher — never use directly, prefer the named wrappers. */
const AdSlot = memo(function AdSlot({
  slot,
  format = 'auto',
  layout,
  className = '',
}: AdSlotProps) {
  const ref = useRef<HTMLDivElement>(null)
  const pushed = useRef(false)

  useEffect(() => {
    const iv = setInterval(() => {
      if (pushed.current) return
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
        try {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ;(window as any).adsbygoogle.push({})
          pushed.current = true
          clearInterval(iv)
        } catch { /* AdSense not ready */ }
      }
    }, 300)
    const t = setTimeout(() => clearInterval(iv), 12000)
    return () => { clearInterval(iv); clearTimeout(t) }
  }, [slot])

  return (
    <div ref={ref} className={className}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="false"
        {...(layout ? { 'data-ad-layout': layout } : {})}
      />
    </div>
  )
})

/* ── Named wrappers (fixed dimensions → CLS < 0.1) ────────────────── */

/** Header banner — 728×90 (leaderboard), collapses to 320×50 on mobile */
export function AdHeader({ className = '' }: { className?: string }) {
  return (
    <div className={`w-full flex items-center justify-center ${className}`} style={{ minHeight: 90 }}>
      <div className="w-full max-w-[728px]">
        <AdSlot slot={AD_SLOTS.LEADERBOARD} format="horizontal" />
      </div>
    </div>
  )
}

/** Mid-content ad — placed between tool input and result output */
export function AdMidContent({ className = '' }: { className?: string }) {
  return (
    <div className={`w-full flex items-center justify-center ${className}`} style={{ minHeight: 100 }}>
      <div className="w-full max-w-4xl">
        <AdSlot slot={AD_SLOT_TOOL_PAGE} format="horizontal" />
      </div>
    </div>
  )
}

/** Footer banner — 728×90, mirrors the header */
export function AdFooter({ className = '' }: { className?: string }) {
  return (
    <div className={`w-full flex items-center justify-center ${className}`} style={{ minHeight: 90 }}>
      <div className="w-full max-w-[728px]">
        <AdSlot slot={AD_SLOTS.BANNER} format="horizontal" />
      </div>
    </div>
  )
}

export { AdSlot }
