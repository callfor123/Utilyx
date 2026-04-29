'use client'

import React, { useEffect, useRef, memo, useState, useCallback } from 'react'
import { ADSENSE_CLIENT, AD_SLOTS, AD_SLOT_HOME_GRID, AD_SLOT_TOOL_PAGE, type AdPriority } from './ad-constants'
import { useAdConsent, useAdLimiter } from './adsense-provider'
import { adEvents } from './ad-events'
import { AdErrorBoundary } from './ad-error-boundary'

export type AdFormat = 'auto' | 'rectangle' | 'horizontal' | 'vertical' | 'fluid'
export type AdLayout = '-1' | '-1a' | '-1b' | '-1c' | '-1d' | '-1e' | '-1f'

interface AdUnitProps {
  adSlot?: string
  adFormat?: AdFormat
  adLayout?: string
  style?: React.CSSProperties
  className?: string
  responsive?: boolean
  /** Priority for the ad limiter: 1 = highest (near active content), 2 = standard, 3 = low (footers) */
  priority?: AdPriority
}

/**
 * Lazy-loaded AdSense unit that only renders and pushes when:
 * 1. User has given ad consent (via AdConsentContext)
 * 2. The unit is visible in the viewport (IntersectionObserver)
 *
 * This eliminates the old 200ms polling loop and prevents off-screen ads
 * from loading, reducing unnecessary ad requests and improving Core Web Vitals.
 */
export const AdUnit = memo(function AdUnit({
  adSlot = AD_SLOTS.BANNER,
  adFormat = 'auto',
  adLayout,
  style,
  className = '',
  responsive = true,
  priority = 2,
}: AdUnitProps) {
  const adRef = useRef<HTMLDivElement>(null)
  const pushedRef = useRef(false)
  const [isVisible, setIsVisible] = useState(false)
  const [shouldRender, setShouldRender] = useState(false)
  const { hasConsent, consentChecked } = useAdConsent()
  const { registerSlot, unregisterSlot } = useAdLimiter()

  // Unique ID for this ad unit instance
  const slotIdRef = useRef(`${adSlot}-${Math.random().toString(36).slice(2, 9)}`)

  // IntersectionObserver: only mark visible when the ad container enters viewport
  useEffect(() => {
    const el = adRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          adEvents.viewportEntered({
            instanceId: slotIdRef.current,
            slotId: adSlot,
            timestamp: Date.now(),
          })
          observer.disconnect() // Once visible, stop observing
        }
      },
      { rootMargin: '200px' } // Start loading 200px before entering viewport
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [adSlot])

  // Unregister from limiter on unmount
  useEffect(() => {
    return () => {
      unregisterSlot(slotIdRef.current)
    }
  }, [unregisterSlot])

  // Consent gate: only render the <ins> element when consent is given
  // AND the ad limiter allows this slot (max 3 visible ads per viewport)
  useEffect(() => {
    if (consentChecked && hasConsent && isVisible) {
      const allowed = registerSlot(slotIdRef.current, priority)
      adEvents.slotRegistered({
        instanceId: slotIdRef.current,
        slotId: adSlot,
        priority,
        allowed: allowed || false,
        timestamp: Date.now(),
      })
      if (allowed) {
        setShouldRender(true)
        adEvents.slotRendered({
          instanceId: slotIdRef.current,
          slotId: adSlot,
          priority,
          allowed: true,
          timestamp: Date.now(),
        })
      }
    }
  }, [consentChecked, hasConsent, isVisible, registerSlot, priority])

  // Push to adsbygoogle once the <ins> is in the DOM and consent is granted
  useEffect(() => {
    if (!shouldRender || pushedRef.current) return

    // Use a short requestAnimationFrame to ensure the <ins> element is painted
    const rafId = requestAnimationFrame(() => {
      if (pushedRef.current) return
      if (typeof window === 'undefined' || !(window as any).adsbygoogle) {
        // AdSense script not yet loaded — retry briefly
        let attempts = 0
        const retry = setInterval(() => {
          if (pushedRef.current || attempts > 25) {
            clearInterval(retry)
            return
          }
          if ((window as any).adsbygoogle) {
            clearInterval(retry)
            try {
              ;(window as any).adsbygoogle.push({})
              pushedRef.current = true
              adEvents.slotPushed({
                instanceId: slotIdRef.current,
                slotId: adSlot,
                attempt: attempts + 1,
                timestamp: Date.now(),
              })
            } catch (err) {
              console.warn('AdSense push error:', err)
            }
          }
          attempts++
        }, 200)
        // Clean up retry on unmount
        return () => clearInterval(retry)
      }

      try {
        ;(window as any).adsbygoogle.push({})
        pushedRef.current = true
        adEvents.slotPushed({
          instanceId: slotIdRef.current,
          slotId: adSlot,
          attempt: 1,
          timestamp: Date.now(),
        })
      } catch (err) {
        console.warn('AdSense push error:', err)
      }
    })

    return () => cancelAnimationFrame(rafId)
  }, [shouldRender, adSlot])

  const defaultStyle: React.CSSProperties = {
    display: shouldRender ? 'block' : 'none',
    ...style,
  }

  // Detect unfilled ads via MutationObserver on data-ad-status attribute
  useEffect(() => {
    if (!shouldRender) return
    const el = adRef.current
    if (!el) return

    const ins = el.querySelector('ins.adsbygoogle')
    if (!ins) return

    // Check current state immediately
    if (ins.getAttribute('data-ad-status') === 'unfilled') {
      adEvents.slotUnfilled({
        instanceId: slotIdRef.current,
        slotId: adSlot,
        timestamp: Date.now(),
      })
    }

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-ad-status') {
          const status = (mutation.target as HTMLElement).getAttribute('data-ad-status')
          if (status === 'unfilled') {
            adEvents.slotUnfilled({
              instanceId: slotIdRef.current,
              slotId: adSlot,
              timestamp: Date.now(),
            })
          }
        }
      }
    })

    observer.observe(ins, { attributes: true, attributeFilter: ['data-ad-status'] })
    return () => observer.disconnect()
  }, [shouldRender, adSlot])

  return (
    <div className={`ad-container ${className}`} ref={adRef}>
      {shouldRender && (
        <ins
          className="adsbygoogle"
          style={defaultStyle}
          data-ad-client={ADSENSE_CLIENT}
          data-ad-slot={adSlot}
          data-ad-format={adFormat}
          data-full-width-responsive={responsive ? 'true' : 'false'}
          {...(adLayout ? { 'data-ad-layout': adLayout } : {})}
        />
      )}
    </div>
  )
})

export function AdBanner({ className = '' }: { className?: string }) {
  return (
    <AdErrorBoundary>
      <div className={`w-full min-h-[90px] flex items-center justify-center ${className}`}>
        <AdUnit
          adSlot={AD_SLOTS.BANNER}
          adFormat="horizontal"
          priority={2}
          className="w-full max-w-4xl mx-auto"
          style={{ minHeight: '90px' }}
        />
      </div>
    </AdErrorBoundary>
  )
}

export function AdRectangle({ className = '' }: { className?: string }) {
  return (
    <AdErrorBoundary>
      <div className={`w-full min-h-[250px] flex items-center justify-center ${className}`}>
        <AdUnit
          adSlot={AD_SLOTS.RECTANGLE}
          adFormat="rectangle"
          priority={3}
          className="w-full max-w-[300px]"
          style={{ minHeight: '250px' }}
        />
      </div>
    </AdErrorBoundary>
  )
}

export function AdInFeed({ className = '', priority: priorityOverride }: { className?: string; priority?: AdPriority }) {
  return (
    <AdErrorBoundary>
      <div className={`w-full ${className}`}>
        <AdUnit
          adSlot={AD_SLOTS.IN_FEED}
          adFormat="fluid"
          adLayout="-1e"
          priority={priorityOverride ?? 2}
          className="w-full"
          style={{ minHeight: '120px' }}
        />
      </div>
    </AdErrorBoundary>
  )
}

export function AdInArticle({ className = '' }: { className?: string }) {
  return (
    <AdErrorBoundary>
      <div className={`w-full ${className}`}>
        <AdUnit
          adSlot={AD_SLOTS.IN_ARTICLE}
          adFormat="fluid"
          adLayout="in-article"
          priority={1}
          className="w-full"
          style={{ minHeight: '250px' }}
        />
      </div>
    </AdErrorBoundary>
  )
}

export function AdSidebar({ className = '' }: { className?: string }) {
  return (
    <AdErrorBoundary>
      <div className={`w-full min-h-[600px] flex items-start justify-center ${className}`}>
        <AdUnit
          adSlot={AD_SLOTS.SIDEBAR}
          adFormat="vertical"
          priority={3}
          className="w-full max-w-[160px]"
          style={{ minHeight: '600px' }}
        />
      </div>
    </AdErrorBoundary>
  )
}

export function AdStickyBottom({ className = '' }: { className?: string }) {
  const [dismissed, setDismissed] = useState(false)
  const [animatingOut, setAnimatingOut] = useState(false)
  const { hasConsent, consentChecked } = useAdConsent()

  // Don't render until consent is explicitly resolved — avoids z-index conflict
  // with the cookie consent banner (z-[60]) and prevents layout flicker
  if (!consentChecked || !hasConsent) return null

  const handleDismiss = () => {
    setAnimatingOut(true)
    setTimeout(() => setDismissed(true), 300)
  }

  if (dismissed) return null

  return (
    <AdErrorBoundary>
      <div className={`fixed bottom-0 left-0 right-0 z-40 sm:hidden transition-all duration-300 ease-in-out ${animatingOut ? 'translate-y-full opacity-0' : 'translate-y-0 opacity-100'} ${className}`}>
        <div className="bg-background/95 backdrop-blur-sm border-t border-border/50 py-1 px-2">
          <AdUnit
            adSlot={AD_SLOTS.STICKY_MOBILE}
            adFormat="auto"
            priority={1}
            className="w-full max-w-[320px] mx-auto"
            style={{ minHeight: '50px' }}
          />
          <button
            onClick={handleDismiss}
            className="absolute top-0 right-2 text-xs text-muted-foreground hover:text-foreground p-1 rounded-sm hover:bg-muted/50 transition-colors"
            aria-label="Close ad"
          >
            ✕
          </button>
        </div>
      </div>
    </AdErrorBoundary>
  )
}

export function AdLeaderboard({ className = '', priority: priorityOverride }: { className?: string; priority?: AdPriority }) {
  return (
    <AdErrorBoundary>
      <div className={`w-full min-h-[90px] flex items-center justify-center ${className}`}>
        <AdUnit
          adSlot={AD_SLOTS.LEADERBOARD}
          adFormat="horizontal"
          adLayout="-1a"
          priority={priorityOverride ?? 2}
          className="w-full max-w-5xl mx-auto"
          style={{ minHeight: '90px' }}
        />
      </div>
    </AdErrorBoundary>
  )
}

export function AdFlexible({ className = '' }: { className?: string }) {
  return (
    <AdErrorBoundary>
      <div className={`w-full min-h-[100px] ${className}`}>
        <AdUnit
          adFormat="auto"
          priority={3}
          className="w-full"
          style={{ minHeight: '100px' }}
        />
      </div>
    </AdErrorBoundary>
  )
}

// ── Page-specific ad units ──────────────────────────────────────────────
// Use these for homepage tool grid (every ~8 tools) and tool pages

/** Ad for homepage tool grid — every 8 tools */
export function AdHomeGrid({ className = '' }: { className?: string }) {
  return (
    <AdErrorBoundary>
      <div className={`w-full ${className}`}>
        <AdUnit
          adSlot={AD_SLOT_HOME_GRID}
          adFormat="horizontal"
          priority={1}
          className="w-full"
          style={{ minHeight: '90px' }}
        />
      </div>
    </AdErrorBoundary>
  )
}

/** Ad for individual tool pages */
export function AdToolPage({ className = '' }: { className?: string }) {
  return (
    <AdErrorBoundary>
      <div className={`w-full ${className}`}>
        <AdUnit
          adSlot={AD_SLOT_TOOL_PAGE}
          adFormat="horizontal"
          priority={2}
          className="w-full max-w-4xl mx-auto"
          style={{ minHeight: '90px' }}
        />
      </div>
    </AdErrorBoundary>
  )
}
