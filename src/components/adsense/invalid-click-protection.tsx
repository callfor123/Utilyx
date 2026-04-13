'use client'

import { useEffect, useRef } from 'react'

const MAX_CLICKS_PER_AD = 3
const CLICK_WINDOW_MS = 60000
const COOLDOWN_MS = 300000

export function InvalidClickProtection() {
  const clickCountsRef = useRef<Map<string, { count: number; firstClick: number }>>(new Map())
  const hiddenAdsRef = useRef<Set<string>>(new Set())

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const adIns = target.closest('.adsbygoogle')
      if (!adIns) return

      const adSlot = adIns.getAttribute('data-ad-slot') || 'unknown'
      const now = Date.now()

      const record = clickCountsRef.current.get(adSlot)

      if (!record) {
        clickCountsRef.current.set(adSlot, { count: 1, firstClick: now })
        return
      }

      if (now - record.firstClick > CLICK_WINDOW_MS) {
        clickCountsRef.current.set(adSlot, { count: 1, firstClick: now })
        return
      }

      record.count += 1

      if (record.count > MAX_CLICKS_PER_AD) {
        const container = adIns.closest('.ad-container') as HTMLElement
        if (container && !hiddenAdsRef.current.has(adSlot)) {
          container.style.display = 'none'
          hiddenAdsRef.current.add(adSlot)

          setTimeout(() => {
            container.style.display = ''
            hiddenAdsRef.current.delete(adSlot)
            clickCountsRef.current.delete(adSlot)
          }, COOLDOWN_MS)
        }
      }
    }

    document.addEventListener('click', handleClick, true)
    return () => document.removeEventListener('click', handleClick, true)
  }, [])

  return null
}