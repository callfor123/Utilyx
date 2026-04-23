'use client'

import React, { useEffect, useRef, memo, useState } from 'react'
import { ADSENSE_CLIENT, AD_SLOTS, AD_SLOT_HOME_GRID, AD_SLOT_TOOL_PAGE } from './adsense-provider'

export type AdFormat = 'auto' | 'rectangle' | 'horizontal' | 'vertical' | 'fluid'
export type AdLayout = '-1' | '-1a' | '-1b' | '-1c' | '-1d' | '-1e' | '-1f'

interface AdUnitProps {
  adSlot?: string
  adFormat?: AdFormat
  adLayout?: string
  style?: React.CSSProperties
  className?: string
  responsive?: boolean
}

export const AdUnit = memo(function AdUnit({
  adSlot = AD_SLOTS.BANNER,
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
        (window as any).adsbygoogle
      ) {
        clearInterval(interval)
        try {
          ;(window as any).adsbygoogle.push({})
          pushedRef.current = true
        } catch (err) {
          console.warn('AdSense push error:', err)
        }
      }
    }, 200)

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

export function AdBanner({ className = '' }: { className?: string }) {
  return (
    <div className={`w-full min-h-[90px] flex items-center justify-center ${className}`}>
      <AdUnit
        adSlot={AD_SLOTS.BANNER}
        adFormat="horizontal"
        className="w-full max-w-4xl mx-auto"
        style={{ minHeight: '90px' }}
      />
    </div>
  )
}

export function AdRectangle({ className = '' }: { className?: string }) {
  return (
    <div className={`w-full min-h-[250px] flex items-center justify-center ${className}`}>
      <AdUnit
        adSlot={AD_SLOTS.RECTANGLE}
        adFormat="rectangle"
        className="w-full max-w-[300px]"
        style={{ minHeight: '250px' }}
      />
    </div>
  )
}

export function AdInFeed({ className = '' }: { className?: string }) {
  return (
    <div className={`w-full ${className}`}>
      <AdUnit
        adSlot={AD_SLOTS.IN_FEED}
        adFormat="fluid"
        adLayout="-1e"
        className="w-full"
        style={{ minHeight: '120px' }}
      />
    </div>
  )
}

export function AdInArticle({ className = '' }: { className?: string }) {
  return (
    <div className={`w-full ${className}`}>
      <AdUnit
        adSlot={AD_SLOTS.IN_ARTICLE}
        adFormat="fluid"
        adLayout="in-article"
        className="w-full"
        style={{ minHeight: '250px' }}
      />
    </div>
  )
}

export function AdSidebar({ className = '' }: { className?: string }) {
  return (
    <div className={`w-full min-h-[600px] flex items-start justify-center ${className}`}>
      <AdUnit
        adSlot={AD_SLOTS.SIDEBAR}
        adFormat="vertical"
        className="w-full max-w-[160px]"
        style={{ minHeight: '600px' }}
      />
    </div>
  )
}

export function AdStickyBottom({ className = '' }: { className?: string }) {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-40 sm:hidden ${className}`}>
      <div className="bg-background/95 backdrop-blur-sm border-t border-border/50 py-1 px-2">
        <AdUnit
          adSlot={AD_SLOTS.STICKY_MOBILE}
          adFormat="auto"
          className="w-full max-w-[320px] mx-auto"
          style={{ minHeight: '50px' }}
        />
        <button
          onClick={() => setDismissed(true)}
          className="absolute top-0 right-2 text-xs text-muted-foreground hover:text-foreground p-1"
          aria-label="Close ad"
        >
          ✕
        </button>
      </div>
    </div>
  )
}

export function AdLeaderboard({ className = '' }: { className?: string }) {
  return (
    <div className={`w-full min-h-[90px] flex items-center justify-center ${className}`}>
      <AdUnit
        adSlot={AD_SLOTS.LEADERBOARD}
        adFormat="horizontal"
        adLayout="-1a"
        className="w-full max-w-5xl mx-auto"
        style={{ minHeight: '90px' }}
      />
    </div>
  )
}

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

// ── Page-specific ad units ──────────────────────────────────────────────
// Use these for homepage tool grid (every ~8 tools) and tool pages

/** Ad for homepage tool grid — every 8 tools */
export function AdHomeGrid({ className = '' }: { className?: string }) {
  return (
    <div className={`w-full ${className}`}>
      <AdUnit
        adSlot={AD_SLOT_HOME_GRID}
        adFormat="horizontal"
        className="w-full"
        style={{ minHeight: '90px' }}
      />
    </div>
  )
}

/** Ad for individual tool pages */
export function AdToolPage({ className = '' }: { className?: string }) {
  return (
    <div className={`w-full ${className}`}>
      <AdUnit
        adSlot={AD_SLOT_TOOL_PAGE}
        adFormat="horizontal"
        className="w-full max-w-4xl mx-auto"
        style={{ minHeight: '90px' }}
      />
    </div>
  )
}
