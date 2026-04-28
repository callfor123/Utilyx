'use client'

import { useEffect, useState } from 'react'
import { useAdConsent } from './adsense-provider'
import { AdBlockerDetector } from './ad-blocker-detector'
import { InvalidClickProtection } from './invalid-click-protection'
import { AdStickyBottom, AdBanner, AdInFeed, AdLeaderboard } from './ad-unit'

export function AdSenseManager({ children }: { children: React.ReactNode }) {
  const { hasConsent } = useAdConsent()
  const [showSticky, setShowSticky] = useState(false)

  useEffect(() => {
    if (!hasConsent) return

    const timer = setTimeout(() => {
      setShowSticky(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [hasConsent])

  if (!hasConsent) {
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