'use client'

import { useEffect, useRef, memo } from 'react'
import { ADSENSE_CLIENT, AD_SLOT_MAIN } from './adsense-provider'

export type AdFormat = 'auto' | 'rectangle' | 'horizontal' | 'vertical' | 'fluid'
export type AdLayout = '-1' | '-1a' | '-1b' | '-1c' | '-1d' | '-1e' | '-1f'

interface AdUnitProps {
  adSlot?: string
  adFormat?: AdFormat
  adLayout?: string
  style?: React.CSSProperties
  className?: string
  responsive?: boolean
  /** Unique identifier for this ad unit */
  dataAdSlot?: string
}

/**
 * Reusable Google AdSense ad unit component.
 * Uses IntersectionObserver for lazy loading and proper cleanup.
 */
export const AdUnit = memo(function AdUnit({
  adSlot = AD_SLOT_MAIN,
  adFormat = 'auto',
  adLayout,
  style,
  className = '',
  responsive = true,
}: AdUnitProps) {
  const adRef = useRef<HTMLDivElement>(null)
  const pushedRef = useRef(false)

  useEffect(() => {
    const interval = setInterval(() => {
      if (
        adRef.current &&
        !pushedRef.current &&
        typeof window !== 'undefined' &&
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).adsbygoogle
      ) {
        clearInterval(interval)
        try {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ;(window as any).adsbygoogle.push({})
          pushedRef.current = true
        } catch (err) {
          console.warn('AdSense push error:', err)
        }
      }
    }, 200)

    // Clear interval after 10 seconds to avoid memory leak if ads never load
    const timeout = setTimeout(() => clearInterval(interval), 10000)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [adSlot])

  const defaultStyle: React.CSSProperties = {
    display: 'block',
    ...style,
  }

  return (
    <div className={`ad-container ${className}`} ref={adRef}>
      <ins
        className="adsbygoogle"
        style={defaultStyle}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={responsive ? 'true' : 'false'}
        {...(adLayout ? { 'data-ad-layout': adLayout } : {})}
      />
    </div>
  )
})

/* ── Pre-configured Ad Components ─────────────────────────────────── */

/**
 * Horizontal leaderboard banner (728x90 desktop, responsive mobile)
 * Best for: below header, above footer, between sections
 */
export function AdBanner({ className = '' }: { className?: string }) {
  return (
    <div className={`w-full min-h-[90px] flex items-center justify-center ${className}`}>
      <AdUnit
        adFormat="horizontal"
        className="w-full max-w-4xl mx-auto"
        style={{ minHeight: '90px' }}
      />
    </div>
  )
}

/**
 * Medium rectangle (300x250)
 * Best for: sidebar, between content sections
 */
export function AdRectangle({ className = '' }: { className?: string }) {
  return (
    <div className={`w-full min-h-[250px] flex items-center justify-center ${className}`}>
      <AdUnit
        adFormat="rectangle"
        className="w-full max-w-[300px]"
        style={{ minHeight: '250px' }}
      />
    </div>
  )
}

/**
 * In-feed ad (native style, blends with content)
 * Best for: between tool cards, in grids
 */
export function AdInFeed({ className = '' }: { className?: string }) {
  return (
    <div className={`w-full ${className}`}>
      <AdUnit
        adFormat="fluid"
        adLayout="-1e"
        className="w-full"
        style={{ minHeight: '120px' }}
      />
    </div>
  )
}

/**
 * Vertical skyscraper (160x600 or responsive)
 * Best for: sidebar
 */
export function AdSidebar({ className = '' }: { className?: string }) {
  return (
    <div className={`w-full min-h-[600px] flex items-start justify-center ${className}`}>
      <AdUnit
        adFormat="vertical"
        className="w-full max-w-[160px]"
        style={{ minHeight: '600px' }}
      />
    </div>
  )
}

/**
 * Anchor/sticky ad for mobile (320x50 fixed at bottom)
 * Best for: mobile users, high visibility
 */
export function AdStickyBottom({ className = '' }: { className?: string }) {
  return (
    <div className={`fixed bottom-0 left-0 right-0 z-40 sm:hidden ${className}`}>
      <div className="bg-background/95 backdrop-blur-sm border-t border-border/50 py-1 px-2">
        <AdUnit
          adFormat="auto"
          className="w-full max-w-[320px] mx-auto"
          style={{ minHeight: '50px' }}
        />
        <button
          onClick={() => {
            const el = document.querySelector('.fixed.bottom-0.z-40')
            if (el) el.remove()
          }}
          className="absolute top-0 right-2 text-xs text-muted-foreground hover:text-foreground p-1"
          aria-label="Close ad"
        >
          ✕
        </button>
      </div>
    </div>
  )
}

/**
 * Large leaderboard (970x90)
 * Best for: top of page, major content breaks
 */
export function AdLeaderboard({ className = '' }: { className?: string }) {
  return (
    <div className={`w-full min-h-[90px] flex items-center justify-center ${className}`}>
      <AdUnit
        adFormat="horizontal"
        adLayout="-1a"
        className="w-full max-w-5xl mx-auto"
        style={{ minHeight: '90px' }}
      />
    </div>
  )
}

/**
 * Multi-size flexible ad that adapts to container
 * Best for: between content blocks, responsive layouts
 */
export function AdFlexible({ className = '' }: { className?: string }) {
  return (
    <div className={`w-full min-h-[100px] ${className}`}>
      <AdUnit
        adFormat="auto"
        className="w-full"
        style={{ minHeight: '100px' }}
      />
    </div>
  )
}
