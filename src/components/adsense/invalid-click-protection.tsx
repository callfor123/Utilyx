'use client'

import { useEffect, useRef } from 'react'

const MAX_CLICKS_PER_AD = 3
const CLICK_WINDOW_MS = 60000
const COOLDOWN_MS = 300000
const STORAGE_KEY = 'utilyx-ad-click-guard'

interface ClickRecord {
  count: number
  firstClick: number
}

interface SessionData {
  slots: Record<string, ClickRecord>
  hiddenUntil: Record<string, number>
}

function loadSession(): SessionData {
  if (typeof window === 'undefined') return { slots: {}, hiddenUntil: {} }
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return { slots: {}, hiddenUntil: {} }
    return JSON.parse(raw)
  } catch {
    return { slots: {}, hiddenUntil: {} }
  }
}

function saveSession(data: SessionData) {
  if (typeof window === 'undefined') return
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
    // sessionStorage full or unavailable — silently degrade
  }
}

/**
 * Enhanced Invalid Click Protection with session persistence.
 *
 * - Tracks per-slot click counts within a sliding 60s window
 * - Hides ads that exceed MAX_CLICKS_PER_AD for a 5-minute cooldown
 * - Persists click data to sessionStorage so protection survives navigation
 * - On mount, restores any ads still in cooldown from a prior page
 * - Dispatches a custom event (`adsense:click-blocked`) when an ad is hidden,
 *   enabling analytics or UI feedback
 */
export function InvalidClickProtection() {
  const clickCountsRef = useRef<Map<string, ClickRecord>>(new Map())
  const hiddenAdsRef = useRef<Set<string>>(new Set())

  useEffect(() => {
    // Restore session state from sessionStorage
    const session = loadSession()
    const now = Date.now()

    // Restore active cooldowns
    for (const [slot, untilTs] of Object.entries(session.hiddenUntil)) {
      if (now < untilTs) {
        hiddenAdsRef.current.add(slot)
        // Re-hide the container if it exists in the DOM
        const ins = document.querySelector(`ins[data-ad-slot="${slot}"]`)
        const container = ins?.closest('.ad-container') as HTMLElement | null
        if (container) container.style.display = 'none'

        // Schedule restore
        const remaining = untilTs - now
        setTimeout(() => {
          hiddenAdsRef.current.delete(slot)
          if (container) container.style.display = ''
          clickCountsRef.current.delete(slot)
          // Update session
          const updated = loadSession()
          delete updated.hiddenUntil[slot]
          delete updated.slots[slot]
          saveSession(updated)
        }, remaining)
      }
    }

    // Restore active click counts (only keep non-expired ones)
    for (const [slot, record] of Object.entries(session.slots)) {
      if (now - record.firstClick <= CLICK_WINDOW_MS) {
        clickCountsRef.current.set(slot, record)
      }
    }

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const adIns = target.closest('.adsbygoogle')
      if (!adIns) return

      const adSlot = adIns.getAttribute('data-ad-slot') || 'unknown'
      const now = Date.now()

      const record = clickCountsRef.current.get(adSlot)

      if (!record) {
        const newRecord = { count: 1, firstClick: now }
        clickCountsRef.current.set(adSlot, newRecord)
        const updated = loadSession()
        updated.slots[adSlot] = newRecord
        saveSession(updated)
        return
      }

      if (now - record.firstClick > CLICK_WINDOW_MS) {
        const newRecord = { count: 1, firstClick: now }
        clickCountsRef.current.set(adSlot, newRecord)
        const updated = loadSession()
        updated.slots[adSlot] = newRecord
        saveSession(updated)
        return
      }

      record.count += 1

      // Persist updated count
      const updated = loadSession()
      updated.slots[adSlot] = record
      saveSession(updated)

      if (record.count > MAX_CLICKS_PER_AD) {
        const container = adIns.closest('.ad-container') as HTMLElement
        if (container && !hiddenAdsRef.current.has(adSlot)) {
          container.style.display = 'none'
          hiddenAdsRef.current.add(adSlot)

          // Persist cooldown end time
          const hiddenUntil = now + COOLDOWN_MS
          updated.hiddenUntil[adSlot] = hiddenUntil
          saveSession(updated)

          // Dispatch custom event for analytics
          try {
            window.dispatchEvent(new CustomEvent('adsense:click-blocked', {
              detail: { adSlot, clickCount: record.count, cooldownMs: COOLDOWN_MS }
            }))
          } catch {
            // CustomEvent not supported — ignore
          }

          setTimeout(() => {
            container.style.display = ''
            hiddenAdsRef.current.delete(adSlot)
            clickCountsRef.current.delete(adSlot)
            // Clear from session
            const s = loadSession()
            delete s.hiddenUntil[adSlot]
            delete s.slots[adSlot]
            saveSession(s)
          }, COOLDOWN_MS)
        }
      }
    }

    document.addEventListener('click', handleClick, true)
    return () => document.removeEventListener('click', handleClick, true)
  }, [])

  return null
}