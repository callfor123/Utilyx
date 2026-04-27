'use client'

import dynamic from 'next/dynamic'

const NextIntlClientProvider = dynamic(
  () => import('next-intl').then(mod => mod.NextIntlClientProvider),
  { ssr: false }
) as React.ComponentType<{ locale: string; messages: Record<string, any>; children: React.ReactNode }>

export function LocaleIntlProvider({ locale, messages, children }: { locale: string; messages: Record<string, any>; children: React.ReactNode }) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  )
}