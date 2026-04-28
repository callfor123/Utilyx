'use client'

import dynamic from 'next/dynamic'

// All client-side providers are dynamically imported with ssr: false to prevent
// "Cannot read properties of null (useContext)" crashes during Next.js 16 prerendering
// of special pages like /_global-error. During prerender, React context is unavailable,
// so any component that calls useContext() will crash. Using next/dynamic with ssr: false
// ensures these components are never rendered during SSR/prerendering.

const ThemeProvider = dynamic(
  () => import('@/components/theme-provider').then(mod => mod.ThemeProvider),
  { ssr: false }
)
const LocaleIntlProvider = dynamic(
  () => import('@/components/layout/locale-providers').then(mod => mod.LocaleIntlProvider),
  { ssr: false }
)
const AdConsentProvider = dynamic(
  () => import('@/components/adsense/adsense-provider').then(mod => mod.AdConsentProvider),
  { ssr: false }
)
const AdLimiterProvider = dynamic(
  () => import('@/components/adsense/adsense-provider').then(mod => mod.AdLimiterProvider),
  { ssr: false }
)
const AdSenseScript = dynamic(
  () => import('@/components/adsense/adsense-provider').then(mod => mod.AdSenseScript),
  { ssr: false }
)
const ClientOnlyProviders = dynamic(
  () => import('@/components/layout/client-only-providers').then(mod => mod.ClientOnlyProviders),
  { ssr: false }
)
const Toaster = dynamic(
  () => import('@/components/ui/sonner').then(mod => mod.Toaster),
  { ssr: false }
)
const Analytics = dynamic(
  () => import('@vercel/analytics/react').then(mod => mod.Analytics),
  { ssr: false }
)
const SetLocaleAttrs = dynamic(
  () => import('@/components/i18n/set-locale-attrs').then(mod => mod.SetLocaleAttrs),
  { ssr: false }
)

type Props = {
  locale: string
  dir: string
  messages: Record<string, any>
  children: React.ReactNode
}

export function LocaleClientShell({ locale, dir, messages, children }: Props) {
  return (
    <>
      <SetLocaleAttrs locale={locale} dir={dir} />
      <ThemeProvider
        attribute="class"
        defaultTheme={locale === "ar" ? "dark" : "light"}
        enableSystem
        disableTransitionOnChange
      >
        <AdConsentProvider>
          <AdLimiterProvider>
            <AdSenseScript />
            <LocaleIntlProvider locale={locale} messages={messages}>
              {children}
              <ClientOnlyProviders />
            </LocaleIntlProvider>
          </AdLimiterProvider>
        </AdConsentProvider>
        <Toaster />
        <Analytics />
      </ThemeProvider>
    </>
  )
}
