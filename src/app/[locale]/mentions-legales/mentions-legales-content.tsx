'use client'

import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'
import { ArrowLeft, Mail } from 'lucide-react'

export default function MentionsLegalesContent() {
  const locale = useLocale()
  const t = useTranslations('Legal')
  const dir = locale === 'ar' ? 'rtl' : 'ltr'

  return (
    <div className="min-h-screen bg-background" dir={dir}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <Link
          href={`/${locale}`}
          className="text-sm text-muted-foreground hover:text-foreground mb-6 sm:mb-8 inline-flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          {t('backHome')}
        </Link>

        <h1 className="text-3xl sm:text-4xl font-bold mb-3">{t('title')}</h1>
        <p className="text-base sm:text-lg text-muted-foreground mb-8 sm:mb-10">{t('subtitle')}</p>

        <div className="space-y-8">
          <section className="p-5 sm:p-6 rounded-xl border border-border bg-card">
            <h2 className="text-lg sm:text-xl font-semibold mb-3">{t('editorTitle')}</h2>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-line text-sm sm:text-base">{t('editorContent')}</p>
          </section>

          <section className="p-5 sm:p-6 rounded-xl border border-border bg-card">
            <h2 className="text-lg sm:text-xl font-semibold mb-3">{t('hostTitle')}</h2>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-line text-sm sm:text-base">{t('hostContent')}</p>
          </section>

          <section className="p-5 sm:p-6 rounded-xl border border-border bg-card">
            <h2 className="text-lg sm:text-xl font-semibold mb-3">{t('directorTitle')}</h2>
            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">{t('directorContent')}</p>
          </section>

          <section className="p-5 sm:p-6 rounded-xl border border-border bg-card">
            <h2 className="text-lg sm:text-xl font-semibold mb-3">{t('contactTitle')}</h2>
            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">{t('contactContent')}</p>
          </section>
        </div>

        <div className="text-center mt-10 sm:mt-12">
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Mail className="h-4 w-4" />
            {t('contactCta')}
          </Link>
        </div>
      </div>
    </div>
  )
}
