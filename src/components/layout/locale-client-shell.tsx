'use client'

import dynamic from 'next/dynamic'
import { ThemeProvider } from '@/components/theme-provider'
import { LocaleIntlProvider } from '@/components/layout/locale-providers'
import { AdSenseScript } from '@/components/adsense/adsense-provider'

// All client-only components loaded with ssr: false to prevent
// useContext null crashes during Next.js 16 prerendering of
// special pages like /_global-error
const Toaster = dynamic(
  () => import('@/components/ui/sonner').then(mod => mod.Toaster),
  { ssr: false }
)
const ClientOnlyProviders = dynamic(
  () => import('@/components/layout/client-only-providers').then(mod => mod.ClientOnlyProviders),
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