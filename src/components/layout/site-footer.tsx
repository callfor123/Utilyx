'use client'

import Link from 'next/link'
import { Sparkles, Shield, Zap } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'
import { useToolsStore, type ModuleId } from '@/lib/tools-store'
import { useTranslatedModules } from '@/lib/use-translated-modules'
import { getPathForLocale } from '@/lib/seo-registry'

export function SiteFooter() {
  const t = useTranslations('Common')
  const tMod = useTranslations('Modules')
  const tFooter = useTranslations('Footer')
  const translatedModules = useTranslatedModules()
  const pathname = usePathname()
  const locale = pathname.split('/')[1] || 'fr'

  const footerModules: ModuleId[] = [
    'pdf',
    'image',
    'video',
    'dev-seo',
    'interpreters',
    'text-tools',
    'generators',
    'calculators',
  ]

  return (
    <footer className="border-t border-border/50 mt-auto">
      <div className="container mx-auto px-4 py-8 sm:py-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-9 gap-8 mb-8">
          <div className="col-span-2 sm:col-span-4 lg:col-span-1">
            <div className="flex items-center gap-2 font-bold text-lg mb-3">
              <div className="rounded-lg bg-primary/10 p-1.5">
                <Sparkles className="h-4 w-4 text-primary" />
              </div>
              <span className="gradient-text">Utilyx</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {tFooter('tagline')}
            </p>
          </div>

          {footerModules.map((moduleId) => {
            const mod = translatedModules.find((m) => m.id === moduleId)
            if (!mod) return null
            const categoryLabel = tMod(`${moduleId}.label` as `pdf.label`)
            return (
              <div key={moduleId}>
                <h3 className="text-sm font-semibold mb-3">{categoryLabel}</h3>
                <ul className="space-y-2">
                  {mod.tools.map((tool) => {
                    const path = getPathForLocale(tool.id, locale)
                    return (
                      <li key={tool.id}>
                        <Link
                          href={path ? `/${locale}/${path.category}/${path.slug}` : `/${locale}`}
                          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {tool.label}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )
          })}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-border/50">
          <p className="text-xs text-muted-foreground">
            {t('copyright', { year: new Date().getFullYear() })}
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <Link href={`/${locale}/api-keys`} className="hover:text-foreground transition-colors">{tFooter('apiKeys')}</Link>
            <Link href={`/${locale}/privacy`} className="hover:text-foreground transition-colors">{tFooter('privacy')}</Link>
            <Link href={`/${locale}/about`} className="hover:text-foreground transition-colors">{tFooter('about')}</Link>
            <Link href={`/${locale}/terms`} className="hover:text-foreground transition-colors">{tFooter('terms')}</Link>
            <Link href={`/${locale}/contact`} className="hover:text-foreground transition-colors">{tFooter('contact')}</Link>
            <Link href={`/${locale}/mentions-legales`} className="hover:text-foreground transition-colors">{tFooter('legal')}</Link>
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Shield className="h-3 w-3 text-emerald-500" />
              <span>{t('localData')}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Zap className="h-3 w-3 text-amber-500" />
              <span>{t('noSignup')}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}