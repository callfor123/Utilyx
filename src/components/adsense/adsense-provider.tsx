'use client'

import Script from 'next/script'
import { createContext, useContext, useState, useEffect, useCallback, useRef, ReactNode } from 'react'

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
// tracks which ad slots have registered and only allows the top 3 by
// priority to actually push adsbygoogle. Priority-based ordering ensures
// high-CTR positions (near active content) always get budget over low-CTR
// positions (transition zones, footers), preventing policy violations
// while maximizing revenue.

const MAX_VISIBLE_ADS = 3

// Priority levels: lower number = higher priority (renders first)
// 1 = critical (near active tool, between content sections)
// 2 = standard (header banners, mid-content)
// 3 = low-priority (footers, transition zones)
export type AdPriority = 1 | 2 | 3

interface AdLimiterState {
  registerSlot: (id: string, priority?: AdPriority) => boolean
  unregisterSlot: (id: string) => void
}

const AdLimiterContext = createContext<AdLimiterState>({
  registerSlot: () => true,
  unregisterSlot: () => {},
})

export function useAdLimiter() {
  return useContext(AdLimiterContext)
}

interface SlotEntry {
  id: string
  priority: AdPriority
  allowed: boolean | null // null = not yet decided
}

export function AdLimiterProvider({ children }: { children: ReactNode }) {
  const slotsRef = useRef<SlotEntry[]>([])
  const [, forceUpdate] = useState(0)

  const resolveSlots = useCallback(() => {
    // Sort by priority (ascending), then by registration order for ties
    const sorted = [...slotsRef.current].sort((a, b) => {
      if (a.priority !== b.priority) return a.priority - b.priority
      return slotsRef.current.indexOf(a) - slotsRef.current.indexOf(b)
    })
    // Top MAX_VISIBLE_ADS by priority get allowed=true
    const allowedIds = new Set(sorted.slice(0, MAX_VISIBLE_ADS).map(s => s.id))
    let changed = false
    slotsRef.current.forEach(slot => {
      const newAllowed = allowedIds.has(slot.id)
      if (slot.allowed !== newAllowed) {
        slot.allowed = newAllowed
        changed = true
      }
    })
    // Re-render if any slot's allowed status changed (affects already-mounted units)
    if (changed) forceUpdate(n => n + 1)
  }, [])

  const registerSlot = useCallback((id: string, priority: AdPriority = 2): boolean => {
    const existing = slotsRef.current.find(s => s.id === id)
    if (existing) {
      // Already registered — return its current allowed status
      return existing.allowed === true
    }
    slotsRef.current.push({ id, priority, allowed: null })
    resolveSlots()
    const slot = slotsRef.current.find(s => s.id === id)!
    return slot.allowed === true
  }, [resolveSlots])

  const unregisterSlot = useCallback((id: string) => {
    slotsRef.current = slotsRef.current.filter(s => s.id !== id)
    resolveSlots()
  }, [resolveSlots])

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
