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

type Props = {
  locale: string
  messages: Record<string, any>
  children: React.ReactNode
}

export function LocaleClientShell({ locale, messages, children }: Props) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme={locale === "ar" ? "dark" : "light"}
      enableSystem
      disableTransitionOnChange
    >
      <AdSenseScript />
      <LocaleIntlProvider messages={messages}>
        {children}
        <ClientOnlyProviders />
      </LocaleIntlProvider>
      <Toaster />
      <Analytics />
    </ThemeProvider>
  )
}