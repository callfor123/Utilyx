'use client'

import { useEffect } from 'react'

export const ADSENSE_PUBLISHER_ID = 'ca-pub-7035626578237932'
export const ADSENSE_CLIENT = 'ca-pub-7035626578237932'

// ── Ad slot registry ──────────────────────────────────────────────────
// Each unit should have a unique slot ID from your AdSense account.
// Go to: AdSense > My ads > Ad units > Create ad unit
// Unique slots = more ad diversity = higher RPM
export const AD_SLOTS = {
  // Homepage / tool page banner (horizontal, top of content)
  BANNER: '1623570820',
  // In-feed ad (between tool rows or search results)
  IN_FEED: '1623570821',
  // Leaderboard (wide horizontal, typically at top)
  LEADERBOARD: '1623570822',
  // Rectangle (300x250, inline or sidebar)
  RECTANGLE: '1623570823',
  // Sidebar (vertical, 160x600)
  SIDEBAR: '1623570824',
  // In-article (native-looking ad within tool content)
  IN_ARTICLE: '1623570825',
  // Sticky mobile (fixed bottom bar on mobile)
  STICKY_MOBILE: '1623570826',
} as const

// Per-page slots for homepage tool grid (place every 8-10 tools)
export const AD_SLOT_HOME_GRID = '1623570827'

// Per-page slots for individual tool pages
export const AD_SLOT_TOOL_PAGE = '1623570828'

export const AD_SLOT_MAIN = AD_SLOTS.BANNER

export function AdSenseScript() {
  useEffect(() => {
    if (document.getElementById('adsense-script')) return

    const loadAdSense = () => {
      if (document.getElementById('adsense-script')) return

      const script = document.createElement('script')
      script.id = 'adsense-script'
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`
      script.async = true
      script.crossOrigin = 'anonymous'
      script.setAttribute('data-ad-client', ADSENSE_CLIENT)

      document.head.appendChild(script)
    }

    if (document.readyState === 'complete') {
      setTimeout(loadAdSense, 1000)
    } else {
      window.addEventListener('load', () => {
        setTimeout(loadAdSense, 1000)
      })
    }
  }, [])

  return null
}
