'use client'

import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'

export default function PrivacyContent() {
  const locale = useLocale()
  const t = useTranslations('Privacy')

  const sections = [
    { id: 'intro', title: t('introTitle'), content: t('introContent') },
    { id: 'local', title: t('localTitle'), content: t('localContent') },
    { id: 'adsense', title: t('adsenseTitle'), content: t('adsenseContent') },
    { id: 'analytics', title: t('analyticsTitle'), content: t('analyticsContent') },
    { id: 'cookies', title: t('cookiesTitle'), content: t('cookiesContent') },
    { id: 'third', title: t('thirdTitle'), content: t('thirdContent') },
    { id: 'children', title: t('childrenTitle'), content: t('childrenContent') },
    { id: 'changes', title: t('changesTitle'), content: t('changesContent') },
    { id: 'contact', title: t('contactTitle'), content: t('contactContent') },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 py-12 sm:py-16">
        <Link
          href={`/${locale}`}
          className="text-sm text-muted-foreground hover:text-foreground mb-8 inline-block"
        >
          ← {locale === 'fr' ? 'Retour à l\'accueil' : locale === 'en' ? 'Back to home' : locale === 'es' ? 'Volver al inicio' : locale === 'de' ? 'Zurück zur Startseite' : locale === 'ar' ? 'العودة للرئيسية' : 'Voltar ao início'}
        </Link>

        <h1 className="text-3xl sm:text-4xl font-bold mb-2">{t('title')}</h1>
        <p className="text-muted-foreground mb-10">{t('subtitle')}</p>

        <nav className="mb-10 p-4 bg-muted/50 rounded-lg">
          <p className="text-sm font-medium mb-2">{t('navLabel')}</p>
          <ul className="flex flex-wrap gap-2">
            {sections.map(s => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="text-xs text-primary hover:underline">
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

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