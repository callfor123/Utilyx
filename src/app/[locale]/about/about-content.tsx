'use client'

import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'
import { Shield, Zap, Globe, Lock } from 'lucide-react'

export default function AboutContent() {
  const locale = useLocale()
  const t = useTranslations('About')

  const features = [
    { icon: Shield, title: t('feature1Title'), desc: t('feature1Desc') },
    { icon: Zap, title: t('feature2Title'), desc: t('feature2Desc') },
    { icon: Globe, title: t('feature3Title'), desc: t('feature3Desc') },
    { icon: Lock, title: t('feature4Title'), desc: t('feature4Desc') },
  ]

  const categories = [
    { name: t('catPdf'), count: '6' },
    { name: t('catImage'), count: '7' },
    { name: t('catVideo'), count: '7' },
    { name: t('catDevSeo'), count: '9' },
    { name: t('catText'), count: '6' },
    { name: t('catGenerators'), count: '6' },
    { name: t('catCalculators'), count: '6' },
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

        <h1 className="text-3xl sm:text-4xl font-bold mb-4">{t('title')}</h1>
        <p className="text-lg text-muted-foreground mb-10">{t('subtitle')}</p>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">{t('missionTitle')}</h2>
          <p className="text-muted-foreground leading-relaxed">{t('missionContent')}</p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">{t('whyTitle')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((f, i) => (
              <div key={i} className="p-4 bg-muted/50 rounded-lg">
                <f.icon className="h-6 w-6 text-primary mb-2" />
                <h3 className="font-medium mb-1">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">{t('toolsTitle')}</h2>
          <p className="text-muted-foreground mb-4">{t('toolsContent')}</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {categories.map((cat, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <span className="text-sm">{cat.name}</span>
                <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">{cat.count}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">{t('privacyTitle')}</h2>
          <p className="text-muted-foreground leading-relaxed">{t('privacyContent')}</p>
        </section>

        <div className="text-center mt-12">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
          >
            {t('cta')}
          </Link>
        </div>
      </div>
    </div>
  )
}