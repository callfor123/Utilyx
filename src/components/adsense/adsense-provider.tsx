'use client'

import Script from 'next/script'
import { createContext, useContext, useState, useEffect, useCallback, useRef, ReactNode } from 'react'
import { ADSENSE_CLIENT, AD_SLOTS, AD_SLOT_HOME_GRID, AD_SLOT_TOOL_PAGE, AD_SLOT_MAIN, ADSENSE_PUBLISHER_ID, type AdPriority } from './ad-constants'

// Re-export constants for backward compatibility
export { ADSENSE_PUBLISHER_ID, ADSENSE_CLIENT, AD_SLOTS, AD_SLOT_HOME_GRID, AD_SLOT_TOOL_PAGE, AD_SLOT_MAIN, type AdPriority }

// ── Consent Context ──────────────────────────────────────────────────
// Provides a reactive consent state that gates both the AdSense script
// loading AND individual ad unit rendering. This prevents the script
// from firing before the user has given explicit consent, which is a
// major GDPR / privacy compliance risk.

const CONSENT_KEY = 'utilyx-cookie-consent'
const DISMISSED_KEY = 'utilyx-ads-dismissed'
// Re-prompt dismissed users after 30 days (gives them a chance to opt back in)
const DISMISSED_TTL_MS = 30 * 24 * 60 * 60 * 1000

interface AdConsentState {
  hasConsent: boolean
  consentChecked: boolean // true once we've read localStorage (avoids flash)
  setConsent: (ads: boolean) => void
  resetConsent: () => void // re-shows the consent banner
}

const AdConsentContext = createContext<AdConsentState>({
  hasConsent: false,
  consentChecked: false,
  setConsent: () => {},
  resetConsent: () => {},
})

export function useAdConsent() {
  return useContext(AdConsentContext)
}

export function AdConsentProvider({ children }: { children: ReactNode }) {
  const [hasConsent, setHasConsent] = useState(false)
  const [consentChecked, setConsentChecked] = useState(false)

  useEffect(() => {
    // Check for explicit dismissal — but only if within TTL
    const dismissedRaw = localStorage.getItem(DISMISSED_KEY)
    if (dismissedRaw) {
      try {
        const dismissed = JSON.parse(dismissedRaw)
        const dismissedAt = dismissed.timestamp || 0
        if (Date.now() - dismissedAt < DISMISSED_TTL_MS) {
          setHasConsent(false)
          setConsentChecked(true)
          return
        }
        // TTL expired — clear dismissal so banner re-shows
        localStorage.removeItem(DISMISSED_KEY)
      } catch {
        // Legacy format ("true" string) — treat as expired for re-prompt
        localStorage.removeItem(DISMISSED_KEY)
      }
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
      localStorage.setItem(DISMISSED_KEY, JSON.stringify({ timestamp: Date.now() }))
    } else {
      localStorage.removeItem(DISMISSED_KEY)
    }
    setHasConsent(ads)
  }, [])

  const resetConsent = useCallback(() => {
    localStorage.removeItem(CONSENT_KEY)
    localStorage.removeItem(DISMISSED_KEY)
    setHasConsent(false)
    setConsentChecked(false)
  }, [])

  return (
    <AdConsentContext.Provider value={{ hasConsent, consentChecked, setConsent, resetConsent }}>
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
