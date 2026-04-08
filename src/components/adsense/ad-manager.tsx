'use client'

import { useEffect, useState } from 'react'
import { AdBanner, AdInFeed, AdLeaderboard, AdStickyBottom } from './ad-unit'
import { AdSenseScript } from './adsense-provider'

/**
 * AdSense Manager — handles ad loading, visibility, and consent.
 * Wraps the entire app and provides strategic ad placements.
 */
export function AdSenseManager({ children }: { children: React.ReactNode }) {
  const [adConsent, setAdConsent] = useState(true)
  const [showSticky, setShowSticky] = useState(false)

  useEffect(() => {
    // Check if user has dismissed ads preference
    const dismissed = localStorage.getItem('utilyx-ads-dismissed')
    if (dismissed === 'true') {
      setAdConsent(false)
      return
    }

    // Show sticky ad after 3 seconds on mobile
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
      <AdSenseScript />
      {children}
      {showSticky && <AdStickyBottom />}
    </>
  )
}

/**
 * Pre-built ad sections for the homepage.
 * Place these between content sections for maximum revenue.
 */
export function HomePageAdSections() {
  return (
    <>
      {/* Top banner — right below the header */}
      <AdBanner className="mb-2" />

      {/* In-feed ad after category cards */}
      <AdInFeed className="my-4" />

      {/* Leaderboard between all tools and footer */}
      <AdLeaderboard className="my-6" />
    </>
  )
}

/**
 * Pre-built ad sections for tool pages.
 * Sidebar + in-content ads for tool pages.
 */
export function ToolPageAdSections() {
  return (
    <>
      {/* Banner above the tool */}
      <AdBanner className="mb-4" />

      {/* In-content ad — goes below the tool interface */}
      <AdInFeed className="mt-6" />
    </>
  )
}
