'use client'

import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'
import { ArrowLeft, Mail, Shield, FileText, Scale, Cookie, Lock, AlertTriangle, HelpCircle } from 'lucide-react'

export default function MentionsLegalesContent() {
  const locale = useLocale()
  const t = useTranslations('Legal')
  const dir = locale === 'ar' ? 'rtl' : 'ltr'

  const sections = [
    { id: 'editor', icon: FileText, title: t('editorTitle'), content: t('editorContent') },
    { id: 'host', icon: Scale, title: t('hostTitle'), content: t('hostContent') },
    { id: 'director', icon: FileText, title: t('directorTitle'), content: t('directorContent') },
    { id: 'contact', icon: Mail, title: t('contactTitle'), content: t('contactContent') },
    { id: 'cnil', icon: Shield, title: t('cnilTitle'), content: t('cnilContent') },
    { id: 'rgpd', icon: Shield, title: t('rgpdTitle'), content: t('rgpdContent') },
    { id: 'personalData', icon: Lock, title: t('personalDataTitle'), content: t('personalDataContent') },
    { id: 'cookies', icon: Cookie, title: t('cookiesTitle'), content: t('cookiesContent') },
    { id: 'intellectual', icon: FileText, title: t('intellectualTitle'), content: t('intellectualContent') },
    { id: 'liability', icon: AlertTriangle, title: t('liabilityTitle'), content: t('liabilityContent') },
  ]

  const faqs = [
    { q: t('faq1Q'), a: t('faq1A') },
    { q: t('faq2Q'), a: t('faq2A') },
    { q: t('faq3Q'), a: t('faq3A') },
  ]

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  }

  return (
    <div className="min-h-screen bg-background" dir={dir}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
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

        {/* Table of contents */}
        <nav className="mb-8 p-4 bg-muted/50 rounded-xl" aria-label="Table of contents">
          <p className="text-sm font-medium mb-2">{locale === 'fr' ? 'Sommaire' : locale === 'en' ? 'Table of contents' : locale === 'es' ? 'Índice' : locale === 'de' ? 'Inhaltsverzeichnis' : locale === 'ar' ? 'الفهرس' : 'Índice'}</p>
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
          {sections.map(s => {
            const Icon = s.icon
            return (
              <section key={s.id} id={s.id} className="p-5 sm:p-6 rounded-xl border border-border bg-card">
                <h2 className="text-lg sm:text-xl font-semibold mb-3 flex items-center gap-2">
                  <Icon className="h-5 w-5 text-primary" />
                  {s.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line text-sm sm:text-base">{s.content}</p>
              </section>
            )
          })}
        </div>

        {/* FAQ Section */}
        <section className="mt-10" id="faq">
          <h2 className="text-xl sm:text-2xl font-bold mb-6 flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-primary" />
            {t('faqTitle')}
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="group p-4 rounded-xl border border-border bg-card">
                <summary className="cursor-pointer font-medium text-sm sm:text-base flex items-center justify-between">
                  {faq.q}
                  <span className="ml-2 text-muted-foreground group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-3 text-muted-foreground text-sm sm:text-base leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

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