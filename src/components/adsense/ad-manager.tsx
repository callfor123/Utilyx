'use client'

import { useEffect, useState } from 'react'
import { AdBlockerDetector } from './ad-blocker-detector'
import { InvalidClickProtection } from './invalid-click-protection'
import { AdStickyBottom, AdBanner, AdInFeed, AdLeaderboard } from './ad-unit'

export function AdSenseManager({ children }: { children: React.ReactNode }) {
  const [adConsent, setAdConsent] = useState(true)
  const [showSticky, setShowSticky] = useState(false)

  useEffect(() => {
    const dismissed = localStorage.getItem('utilyx-ads-dismissed')
    if (dismissed === 'true') {
      setAdConsent(false)
      return
    }

    const timer = setTimeout(() => {
      setShowSticky(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const dismissAds = () => {
    localStorage.setItem('utilyx-ads-dismissed', 'true')
    setAdConsent(false)
    setShowSticky(false)
  }

  if (!adConsent) {
    return <>{children}</>
  }

  return (
    <>
      <InvalidClickProtection />
      {children}
      {showSticky && <AdStickyBottom />}
      <AdBlockerDetector />
    </>
  )
}

export function HomePageAdSections() {
  return (
    <>
      <AdBanner className="mb-2" />
      <AdInFeed className="my-4" />
      <AdLeaderboard className="my-6" />
    </>
  )
}

export function ToolPageAdSections() {
  return (
    <>
      <AdBanner className="mb-4" />
      <AdInFeed className="mt-6" />
    </>
  )
}
