import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { routing } from '@/i18n/routing'
import { seoRegistry, getToolBySlug, validCategories, getSlugForLocale, resolveSlugToBase } from '@/lib/seo-registry'
import { getLocalizedSeo } from '@/lib/seo-i18n-registry'
import { ToolRenderer } from '@/components/tool-renderer'
import { AdLeaderboard as AdHeader, ToolPageAdSections as AdMidContent } from '@/components/adsense'
import { AdInArticle, AdRectangle, AdToolPage } from '@/components/adsense'
import { ChevronRight, Shield, Zap } from 'lucide-react'
import { ShareButtons } from '@/components/share/share-buttons'
import { ToolPageHeader } from '@/components/layout/tool-page-header'
import { ScrollToTop } from '@/components/layout/scroll-to-top'
import { SiteFooter } from '@/components/layout/site-footer'

// ISR: revalidate tool pages every 24h for SEO
export const revalidate = 86400

const BASE_URL = 'https://utilyx.app'

type Props = {
  params: Promise<{ locale: string; category: string; slug: string }>
}

/* ── Category labels per locale ─────────────────────────────────────── */
const categoryLabels: Record<string, Record<string, string>> = {
  fr: { pdf: 'Outils PDF', image: 'Outils Image', video: 'Outils Vidéo', 'dev-seo': 'Dev & SEO', interpreters: 'Interpréteurs de Code', 'text-tools': 'Outils Texte', generators: 'Générateurs', calculators: 'Calculateurs' },
  en: { pdf: 'PDF Tools', image: 'Image Tools', video: 'Video Tools', 'dev-seo': 'Dev & SEO', interpreters: 'Code Interpreters', 'text-tools': 'Text Tools', generators: 'Generators', calculators: 'Calculators' },
  es: { pdf: 'Herramientas PDF', image: 'Herramientas de Imagen', video: 'Herramientas de Vídeo', 'dev-seo': 'Dev & SEO', interpreters: 'Intérpretes de Código', 'text-tools': 'Herramientas de Texto', generators: 'Generadores', calculators: 'Calculadoras' },
  de: { pdf: 'PDF-Werkzeuge', image: 'Bild-Werkzeuge', video: 'Video-Werkzeuge', 'dev-seo': 'Dev & SEO', interpreters: 'Code-Interpreter', 'text-tools': 'Text-Werkzeuge', generators: 'Generatoren', calculators: 'Rechner' },
  ar: { pdf: 'أدوات PDF', image: 'أدوات الصور', video: 'أدوات الفيديو', 'dev-seo': 'Dev & SEO', interpreters: 'مفسرون الكود', 'text-tools': 'أدوات النص', generators: 'مولدات', calculators: 'حاسبات' },
  pt: { pdf: 'Ferramentas PDF', image: 'Ferramentas de Imagem', video: 'Ferramentas de Vídeo', 'dev-seo': 'Dev & SEO', interpreters: 'Interpretadores de Código', 'text-tools': 'Ferramentas de Texto', generators: 'Geradores', calculators: 'Calculadoras' },
}

/* ── Content labels per locale ──────────────────────────────────────── */
const howToLabels: Record<string, string> = {
  fr: 'Comment utiliser cet outil ?',
  en: 'How to use this tool?',
  es: '¿Cómo usar esta herramienta?',
  de: 'So verwenden Sie dieses Tool',
  ar: 'كيفية استخدام هذه الأداة',
  pt: 'Como usar esta ferramenta?',
}

const faqLabels: Record<string, string> = {
  fr: 'Questions fréquentes',
  en: 'Frequently Asked Questions',
  es: 'Preguntas frecuentes',
  de: 'Häufig gestellte Fragen',
  ar: 'الأسئلة الشائعة',
  pt: 'Perguntas frequentes',
}

const relatedLabels: Record<string, string> = {
  fr: 'Outils similaires',
  en: 'Similar tools',
  es: 'Herramientas similares',
  de: 'Ähnliche Werkzeuge',
  ar: 'أدوات مشابهة',
  pt: 'Ferramentas semelhantes',
}

const categoryIconColors: Record<string, string> = {
  pdf: 'text-red-500 bg-red-50 dark:bg-red-950/30',
  image: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/30',
  video: 'text-pink-500 bg-pink-50 dark:bg-pink-950/30',
  'dev-seo': 'text-violet-500 bg-violet-50 dark:bg-violet-950/30',
  interpreters: 'text-orange-500 bg-orange-50 dark:bg-orange-950/30',
  'text-tools': 'text-blue-500 bg-blue-50 dark:bg-blue-950/30',
  generators: 'text-rose-500 bg-rose-50 dark:bg-rose-950/30',
  calculators: 'text-amber-500 bg-amber-50 dark:bg-amber-950/30',
}

const categorySvgs: Record<string, string> = {
  pdf: '<path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y1="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/>',
  image: '<rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>',
  video: '<path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"/><rect x="2" y="6" width="14" height="12" rx="2"/>',
  'dev-seo': '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>',
  interpreters: '<polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/>',
  'text-tools': '<polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/>',
  generators: '<path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.582a.5.5 0 0 1 0 .962L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/>',
  calculators: '<rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/><line x1="8" y1="18" x2="8" y2="18.01"/><line x1="12" y1="18" x2="12" y2="18.01"/><line x1="16" y1="18" x2="16" y2="18.01"/>',
}


/* ── Metadata: server-rendered <head> for Googlebot ──────────────────── */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, category, slug } = (await params) ?? {}

  const baseSlug = resolveSlugToBase(slug)
  const tool = getToolBySlug(baseSlug)
  if (!tool || tool.category !== category) return {}

  const locTool = getLocalizedSeo(baseSlug, locale, tool)

  const localeSlug = getSlugForLocale(tool.slug, locale)
  const url = `${BASE_URL}/${locale}/${category}/${localeSlug}`

  const hreflangLangs: Record<string, string> = {}
  for (const l of routing.locales) {
    hreflangLangs[l] = `${BASE_URL}/${l}/${category}/${getSlugForLocale(tool.slug, l)}`
  }

  // Build per-tool keywords from title, h1, and category
  const metaCatLabel = (categoryLabels[locale] || categoryLabels.fr)[category] || category
  const toolKeywords = [
    locTool.h1,
    tool.slug,
    metaCatLabel,
    ...locTool.howTo.slice(0, 2),
    locale === 'fr' ? 'gratuit' : locale === 'en' ? 'free' : locale === 'es' ? 'gratis' : locale === 'de' ? 'kostenlos' : locale === 'ar' ? 'مجاني' : 'gratuito',
    locale === 'fr' ? 'en ligne' : locale === 'en' ? 'online' : locale === 'es' ? 'en línea' : locale === 'de' ? 'online' : locale === 'ar' ? 'عبر الإنترنت' : 'online',
    'Utilyx',
  ]

  return {
    title: locTool.title,
    description: locTool.desc,
    keywords: toolKeywords,
    alternates: {
      canonical: url,
      languages: { 'x-default': `${BASE_URL}/fr/${category}/${tool.slug}`, ...hreflangLangs },
    },
    openGraph: {
      type: 'website',
      url,
      title: locTool.title,
      description: locTool.desc,
      siteName: 'Utilyx',
      locale: locale === 'ar' ? 'ar_SA' : locale === 'pt' ? 'pt_BR' : `${locale}_${locale.toUpperCase()}`,
      images: [{ url: `${BASE_URL}/og-image.png`, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: locTool.title,
      description: locTool.desc,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

/* ── Page Component ──────────────────────────────────────────────────── */
export default async function ToolPage({ params }: Props) {
  const { locale, category, slug } = (await params) ?? {}

  if (!routing.locales.includes(locale as any)) notFound()
  if (!validCategories.includes(category)) notFound()

  const baseSlug = resolveSlugToBase(slug)
  const tool = getToolBySlug(baseSlug)
  if (!tool || tool.category !== category) notFound()

  const locTool = getLocalizedSeo(baseSlug, locale, tool)

  const localeSlug = getSlugForLocale(tool.slug, locale)
  const pageUrl = `${BASE_URL}/${locale}/${category}/${localeSlug}`
  const catLabel = (categoryLabels[locale] || categoryLabels.fr)[category] || category
  const howToLabel = howToLabels[locale] || howToLabels.fr
  const faqLabel = faqLabels[locale] || faqLabels.fr
  const relatedLabel = relatedLabels[locale] || relatedLabels.fr

  /* ── Related tools ── */
  const relatedTools = tool.relatedSlugs
    .map((s) => {
      const rt = getToolBySlug(s)
      if (!rt) return null
      const locRt = getLocalizedSeo(s, locale, rt)
      return { slug: s, category: rt.category, h1: locRt.h1, desc: locRt.desc }
    })
    .filter(Boolean) as { slug: string; category: string; h1: string; desc: string }[]

  /* ── Category tools (for internal linking hub) ── */
  const categoryTools = Object.values(seoRegistry)
    .filter((t) => t.category === category && t.slug !== baseSlug)
    .map((t) => {
      const locT = getLocalizedSeo(t.slug, locale, t)
      return { slug: t.slug, category: t.category, h1: locT.h1, desc: locT.desc }
    })

  const categoryMoreLabel: Record<string, string> = {
    fr: `Autres outils ${catLabel}`,
    en: `More ${catLabel}`,
    es: `Más ${catLabel}`,
    de: `Weitere ${catLabel}`,
    ar: `${catLabel} أخرى`,
    pt: `Mais ${catLabel}`,
  }

  return (
    <>
      <div className="min-h-screen flex flex-col bg-background">
        {/* ── Header ── */}
        <ToolPageHeader locale={locale} />

        {/* ── Main ── */}
        <main id="main-content" className="flex-1 container mx-auto px-4 py-6 sm:py-8 max-w-4xl">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-muted-foreground mb-6">
            <Link href={`/${locale}`} className="hover:text-foreground transition-colors">Utilyx</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-muted-foreground">
              {catLabel}
            </span>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground font-medium truncate max-w-[200px]">{locTool.h1}</span>
          </nav>

          {/* H1 + intro (server-rendered, visible to Google) */}
          <header className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">{locTool.h1}</h1>
            <p className="text-muted-foreground leading-relaxed max-w-3xl">{locTool.intro}</p>
            <div className="flex items-center gap-3 mt-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Shield className="h-3.5 w-3.5 text-emerald-500" /> 100% {locale === 'en' ? 'private' : locale === 'es' ? 'privado' : locale === 'de' ? 'privat' : locale === 'ar' ? 'خاص' : locale === 'pt' ? 'privado' : 'privé'}</span>
              <span className="flex items-center gap-1"><Zap className="h-3.5 w-3.5 text-amber-500" /> {locale === 'en' ? 'Free, no signup' : locale === 'es' ? 'Gratis, sin registro' : locale === 'de' ? 'Kostenlos, ohne Anmeldung' : locale === 'ar' ? 'مجاني، بدون تسجيل' : locale === 'pt' ? 'Grátis, sem cadastro' : 'Gratuit, sans inscription'}</span>
            </div>
          </header>

          {/* ── Tool (client-rendered) ── */}
          <section className="mb-8">
            <ToolRenderer toolId={tool.toolId} />
          </section>

          {/* ── Social Share ── */}
          <ShareButtons url={pageUrl} title={locTool.h1} description={locTool.intro} locale={locale} />

          {/* ── Ad: Header leaderboard ── */}
          {/* @ts-ignore */}
          <AdHeader className="mb-6 hidden sm:flex" />

          {/* ── Ad: Mid-content (between tool and result) ── */}
          {/* @ts-ignore */}
          <AdMidContent className="my-8" />

          {/* ── How To (server-rendered SEO content) ── */}
          {locTool.howTo.length > 0 && (
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">{howToLabel}</h2>
              <ol className="space-y-3">
                {locTool.howTo.map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="shrink-0 flex items-center justify-center h-7 w-7 rounded-full bg-primary/10 text-primary text-sm font-semibold">{i + 1}</span>
                    <p className="text-muted-foreground leading-relaxed pt-0.5">{step}</p>
                  </li>
                ))}
              </ol>
            </section>
          )}

          {/* ── Ad: In-article ── */}
          {locTool.howTo.length > 0 && locTool.faq.length > 0 && (
            <AdInArticle className="mb-8" />
          )}

          {/* ── FAQ (server-rendered SEO content) ── */}
          {locTool.faq.length > 0 && (
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-6">{faqLabel}</h2>
              <div className="space-y-4">
                {locTool.faq.map((item, i) => (
                  <details key={i} className="group border border-border/50 rounded-xl open:bg-muted/30 transition-colors" open={i === 0}>
                    <summary className="font-medium cursor-pointer list-none flex items-center justify-between p-4 select-none">
                      <span>{item.q}</span>
                      <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-90" />
                    </summary>
                    <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out group-open:grid-rows-[1fr]">
                      <div className="overflow-hidden">
                        <p className="px-4 pb-4 text-muted-foreground leading-relaxed">{item.a}</p>
                      </div>
                    </div>
                  </details>
                ))}
              </div>
            </section>
          )}

          {/* ── Related Tools (internal links for SEO) ── */}
          {relatedTools.length > 0 && (
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">{relatedLabel}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {relatedTools.map((rt: any) => {
                  const iconSvg = categorySvgs[rt.category] || categorySvgs['generators']
                  const iconColorClass = categoryIconColors[rt.category] || categoryIconColors['generators']
                  return (
                    <Link
                      key={rt.slug}
                      href={`/${locale}/${rt.category}/${getSlugForLocale(resolveSlugToBase(rt.slug), locale)}`}
                      className="group flex items-start gap-3 p-4 border border-border/50 rounded-xl hover:bg-muted/30 hover:border-primary/20 hover:shadow-md transition-all duration-200"
                    >
                      <div className={`shrink-0 rounded-lg p-2 ${iconColorClass} transition-transform duration-200 group-hover:scale-110`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: iconSvg }} />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-medium text-sm group-hover:text-primary transition-colors">{rt.h1}</h3>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{rt.desc}</p>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </section>
          )}

          {/* ── Ad: Rectangle (300x250, between related tools and category hub) ── */}
          {relatedTools.length > 0 && <AdRectangle className="my-6" />}

          {/* ── Category Hub (more tools in same category for internal linking) ── */}
          {categoryTools.length > 0 && (
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">{categoryMoreLabel[locale] || categoryMoreLabel.fr}</h2>
              <div className="flex flex-wrap gap-2">
                {categoryTools.map((ct) => (
                  <Link
                    key={ct.slug}
                    href={`/${locale}/${ct.category}/${getSlugForLocale(ct.slug, locale)}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border border-border/50 rounded-lg hover:bg-muted/30 hover:border-primary/20 transition-all duration-200"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: categorySvgs[ct.category] || categorySvgs['generators'] }} />
                    {ct.h1}
                  </Link>
                ))}
              </div>
            </section>
          )}
        </main>

        {/* ── Ad: Tool page footer (dedicated tool page slot) ── */}
        <AdToolPage className="my-6" />

        <SiteFooter />

        {/* ── Scroll to top ── */}
        <ScrollToTop locale={locale} />
      </div>
    </>
  )
}
