'use client'

import { useEffect } from 'react'

export const ADSENSE_PUBLISHER_ID = 'ca-pub-7035626578237932'
export const ADSENSE_CLIENT = 'ca-pub-7035626578237932'

export const AD_SLOTS = {
  BANNER: '1623570820',
  IN_FEED: '1623570820',
  LEADERBOARD: '1623570820',
  RECTANGLE: '1623570820',
  SIDEBAR: '1623570820',
  IN_ARTICLE: '1623570820',
  STICKY_MOBILE: '1623570820',
} as const

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