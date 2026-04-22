'use client'

import dynamic from 'next/dynamic'

// These components use React context (browser APIs, DOM access) that crash
// during Next.js 16 prerendering of special pages like /_global-error.
// Dynamic import with ssr: false ensures they only render on the client.
const InvalidClickProtection = dynamic(
  () => import('@/components/adsense/invalid-click-protection').then(mod => mod.InvalidClickProtection),
  { ssr: false }
)
const AdBlockerDetector = dynamic(
  () => import('@/components/adsense/ad-blocker-detector').then(mod => mod.AdBlockerDetector),
  { ssr: false }
)
const CookieConsentBanner = dynamic(
  () => import('@/components/adsense/cookie-consent').then(mod => mod.CookieConsentBanner),
  { ssr: false }
)
const GoogleAnalytics = dynamic(
  () => import('@/components/analytics/google-analytics').then(mod => mod.GoogleAnalytics),
  { ssr: false }
)

export function ClientOnlyProviders() {
  return (
    <>
      <GoogleAnalytics />
      <InvalidClickProtection />
      <AdBlockerDetector />
      <CookieConsentBanner />
    </>
  )
}