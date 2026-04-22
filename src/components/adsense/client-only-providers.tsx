'use client'

import dynamic from 'next/dynamic'

// These components use next-intl's useLocale() hook which crashes during
// static prerendering (e.g. /_global-error) because the NextIntlClientProvider
// context is null. Using next/dynamic with ssr: false in a Client Component
// wrapper ensures they never render during SSR/prerender.
const InvalidClickProtection = dynamic(
  () => import('./invalid-click-protection').then(mod => mod.InvalidClickProtection),
  { ssr: false }
)
const AdBlockerDetector = dynamic(
  () => import('./ad-blocker-detector').then(mod => mod.AdBlockerDetector),
  { ssr: false }
)
const CookieConsentBanner = dynamic(
  () => import('./cookie-consent').then(mod => mod.CookieConsentBanner),
  { ssr: false }
)

export function ClientOnlyProviders() {
  return (
    <>
      <CookieConsentBanner />
      <InvalidClickProtection />
      <AdBlockerDetector />
    </>
  )
}