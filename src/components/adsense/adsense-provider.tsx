'use client'

import { useEffect } from 'react'

// Google AdSense Configuration
export const ADSENSE_PUBLISHER_ID = 'ca-pub-7035626578237932'
export const ADSENSE_CLIENT = 'ca-pub-7035626578237932'
export const AD_SLOT_MAIN = '1623570820'

/**
 * Loads the Google AdSense script once.
 * Must be placed inside <head> or high in the component tree.
 */
export function AdSenseScript() {
  useEffect(() => {
    // Prevent duplicate script injection
    if (document.getElementById('adsense-script')) return

    const script = document.createElement('script')
    script.id = 'adsense-script'
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`
    script.async = true
    script.crossOrigin = 'anonymous'
    script.setAttribute('data-ad-client', ADSENSE_CLIENT)

    document.head.appendChild(script)
  }, [])

  return null
}
