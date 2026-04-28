'use client'

import Script from 'next/script'
import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'

export const ADSENSE_PUBLISHER_ID = 'ca-pub-7035626578237932'
export const ADSENSE_CLIENT = 'ca-pub-7035626578237932'

// ── Ad slot registry ──────────────────────────────────────────────────
// Each unit should have a unique slot ID from your AdSense account.
// Go to: AdSense > My ads > Ad units > Create ad unit
// Unique slots = more ad diversity = higher RPM
export const AD_SLOTS = {
  // Homepage / tool page banner (horizontal, top of content)
  BANNER: '1623570820',
  // In-Feed ad (between tool rows or search results)
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

// ── Consent Context ──────────────────────────────────────────────────
// Provides a reactive consent state that gates both the AdSense script
// loading AND individual ad unit rendering. This prevents the script
// from firing before the user has given explicit consent, which is a
// major GDPR / privacy compliance risk.

interface AdConsentState {
  hasConsent: boolean
  consentChecked: boolean // true once we've read localStorage (avoids flash)
  setConsent: (ads: boolean) => void
}

const AdConsentContext = createContext<AdConsentState>({
  hasConsent: false,
  consentChecked: false,
  setConsent: () => {},
})

export function useAdConsent() {
  return useContext(AdConsentContext)
}

const CONSENT_KEY = 'utilyx-cookie-consent'
const DISMISSED_KEY = 'utilyx-ads-dismissed'

export function AdConsentProvider({ children }: { children: ReactNode }) {
  const [hasConsent, setHasConsent] = useState(false)
  const [consentChecked, setConsentChecked] = useState(false)

  useEffect(() => {
    // Check for explicit dismissal first
    if (localStorage.getItem(DISMISSED_KEY) === 'true') {
      setHasConsent(false)
      setConsentChecked(true)
      return
    }
    // Check for prior consent
    const stored = localStorage.getItem(CONSENT_KEY)
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setHasConsent(parsed.ads === true)
      } catch {
        setHasConsent(false)
      }
    }
    setConsentChecked(true)
  }, [])

  const setConsent = useCallback((ads: boolean) => {
    localStorage.setItem(CONSENT_KEY, JSON.stringify({ ads, analytics: true, timestamp: Date.now() }))
    if (!ads) {
      localStorage.setItem(DISMISSED_KEY, 'true')
    } else {
      localStorage.removeItem(DISMISSED_KEY)
    }
    setHasConsent(ads)
  }, [])

  return (
    <AdConsentContext.Provider value={{ hasConsent, consentChecked, setConsent }}>
      {children}
    </AdConsentContext.Provider>
  )
}

// ── Ad Visibility Limiter ───────────────────────────────────────────────
// AdSense policy limits visible ad units to 3 per viewport. This context
// tracks which ad slots have registered and only allows the first 3 (by
// render order / priority) to actually push adsbygoogle. This prevents
// policy violations while keeping layout slots in place for natural flow.

const MAX_VISIBLE_ADS = 3

interface AdLimiterState {
  registerSlot: (id: string) => boolean // returns true if slot is allowed
  unregisterSlot: (id: string) => void
}

const AdLimiterContext = createContext<AdLimiterState>({
  registerSlot: () => true,
  unregisterSlot: () => {},
})

export function useAdLimiter() {
  return useContext(AdLimiterContext)
}

export function AdLimiterProvider({ children }: { children: ReactNode }) {
  // Track registered slots in order — first N get rendered
  const registeredRef = useRef<string[]>([])

  const registerSlot = useCallback((id: string): boolean => {
    if (registeredRef.current.includes(id)) {
      // Already registered — check if it's in the first 3
      return registeredRef.current.indexOf(id) < MAX_VISIBLE_ADS
    }
    registeredRef.current.push(id)
    // Only the first MAX_VISIBLE_ADS slots get to render
    return registeredRef.current.length <= MAX_VISIBLE_ADS
  }, [])

  const unregisterSlot = useCallback((id: string) => {
    registeredRef.current = registeredRef.current.filter(s => s !== id)
  }, [])

  return (
    <AdLimiterContext.Provider value={{ registerSlot, unregisterSlot }}>
      {children}
    </AdLimiterContext.Provider>
  )
}

export function AdSenseScript() {
  const { hasConsent, consentChecked } = useAdConsent()

  // Don't render the script until consent has been checked
  if (!consentChecked) return null

  // Don't render the script if user rejected ads
  if (!hasConsent) return null

  // NOTE: auto-ads (enable_page_level_ads) intentionally removed.
  // Auto-ads place ads inside interactive tool areas, violating AdSense
  // placement policy and risking invalid clicks on a tool-heavy SPA.
  return (
    <Script
      id="adsense-script"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
      strategy="afterInteractive"
      crossOrigin="anonymous"
      async
    />
  )
}