'use client'

import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'

export default function MentionsLegalesContent() {
  const locale = useLocale()
  const t = useTranslations('Legal')

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 py-12 sm:py-16">
        <Link
          href={`/${locale}`}
          className="text-sm text-muted-foreground hover:text-foreground mb-8 inline-block"
        >
          ← {t('backHome')}
        </Link>

        <h1 className="text-3xl sm:text-4xl font-bold mb-4">{t('title')}</h1>
        <p className="text-lg text-muted-foreground mb-10">{t('subtitle')}</p>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">{t('editorTitle')}</h2>
          <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{t('editorContent')}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">{t('hostTitle')}</h2>
          <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{t('hostContent')}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">{t('directorTitle')}</h2>
          <p className="text-muted-foreground leading-relaxed">{t('directorContent')}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">{t('contactTitle')}</h2>
          <p className="text-muted-foreground leading-relaxed">{t('contactContent')}</p>
        </section>

        <div className="text-center mt-12">
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
          >
            {t('contactCta')}
          </Link>
        </div>
      </div>
    </div>
  )
}
