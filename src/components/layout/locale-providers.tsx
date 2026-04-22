'use client'

import dynamic from 'next/dynamic'

// NextIntlClientProvider requires the next-intl server context during SSR,
// which is unavailable for special pages like /_global-error. Using
// next/dynamic with ssr: false ensures it never renders during SSR/prerender.
const NextIntlClientProvider = dynamic(
  () => import('next-intl').then(mod => mod.NextIntlClientProvider),
  { ssr: false }
) as React.ComponentType<{ messages: Record<string, any>; children: React.ReactNode }>

export function LocaleIntlProvider({ messages, children }: { messages: Record<string, any>; children: React.ReactNode }) {
  return (
    <NextIntlClientProvider messages={messages}>
      {children}
    </NextIntlClientProvider>
  )
}