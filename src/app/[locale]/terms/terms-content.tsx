'use client'

import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'

export default function TermsContent() {
  const locale = useLocale()
  const t = useTranslations('Terms')

  const sections = [
    { id: 'acceptance', title: t('acceptanceTitle'), content: t('acceptanceContent') },
    { id: 'description', title: t('descriptionTitle'), content: t('descriptionContent') },
    { id: 'use', title: t('useTitle'), content: t('useContent') },
    { id: 'intellectual', title: t('intellectualTitle'), content: t('intellectualContent') },
    { id: 'liability', title: t('liabilityTitle'), content: t('liabilityContent') },
    { id: 'data', title: t('dataTitle'), content: t('dataContent') },
    { id: 'ads', title: t('adsTitle'), content: t('adsContent') },
    { id: 'modifications', title: t('modificationsTitle'), content: t('modificationsContent') },
    { id: 'law', title: t('lawTitle'), content: t('lawContent') },
    { id: 'contact', title: t('contactTitle'), content: t('contactContent') },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 py-12 sm:py-16">
        <Link
          href={`/${locale}`}
          className="text-sm text-muted-foreground hover:text-foreground mb-8 inline-block"
        >
          ← {t('backHome')}
        </Link>

        <h1 className="text-3xl sm:text-4xl font-bold mb-2">{t('title')}</h1>
        <p className="text-muted-foreground mb-10">{t('subtitle')}</p>

        <div className="space-y-8">
          {sections.map(s => (
            <section key={s.id} id={s.id}>
              <h2 className="text-xl font-semibold mb-3">{s.title}</h2>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{s.content}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}