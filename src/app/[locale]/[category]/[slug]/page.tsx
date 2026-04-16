import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { routing } from '@/i18n/routing'
import { seoRegistry, getToolBySlug, validCategories } from '@/lib/seo-registry'
import { ToolRenderer } from '@/components/tool-renderer'
import { AdInArticle, ToolPageAdSections as AdToolPage } from '@/components/adsense'
import { ChevronRight, Shield, Zap } from 'lucide-react'

const BASE_URL = 'https://utilyx.app'

type Props = {
  params: Promise<{ locale: string; category: string; slug: string }>
}

/* ── Category display labels ─────────────────────────────────────────── */
const categoryLabels: Record<string, string> = {
  pdf: 'Outils PDF',
  image: 'Outils Image',
  video: 'Outils Vidéo',
  'dev-seo': 'Dev & SEO',
  'text-tools': 'Outils Texte',
  generators: 'Générateurs',
  calculators: 'Calculateurs',
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

/* ── Static Params: pre-generate all tool pages for all locales ──────── */
export function generateStaticParams() {
  const params: { locale: string; category: string; slug: string }[] = []
  for (const locale of routing.locales) {
    for (const entry of Object.values(seoRegistry)) {
      params.push({ locale, category: entry.category, slug: entry.slug })
    }
  }
  return params
}

/* ── Metadata: server-rendered <head> for Googlebot ──────────────────── */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, category, slug } = await params

  const tool = getToolBySlug(slug)
  if (!tool || tool.category !== category) return {}

  const url = `${BASE_URL}/${locale}/${category}/${slug}`

  return {
    title: tool.title,
    description: tool.desc,
    alternates: {
      canonical: url,
      languages: {
        'x-default': `${BASE_URL}/fr/${category}/${slug}`,
        ...Object.fromEntries(
          routing.locales.map((l) => [l, `${BASE_URL}/${l}/${category}/${slug}`])
        ),
      },
    },
    openGraph: {
      type: 'website',
      url,
      title: tool.title,
      description: tool.desc,
      siteName: 'Utilyx',
      locale: locale === 'ar' ? 'ar_SA' : locale === 'pt' ? 'pt_BR' : `${locale}_${locale.toUpperCase()}`,
      images: [{ url: `${BASE_URL}/og-image.png`, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: tool.title,
      description: tool.desc,
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
  const { locale, category, slug } = await params

  if (!routing.locales.includes(locale as any)) notFound()
  if (!validCategories.includes(category)) notFound()

  const tool = getToolBySlug(slug)
  if (!tool || tool.category !== category) notFound()

  const pageUrl = `${BASE_URL}/${locale}/${category}/${slug}`
  const howToLabel = howToLabels[locale] || howToLabels.fr
  const faqLabel = faqLabels[locale] || faqLabels.fr
  const relatedLabel = relatedLabels[locale] || relatedLabels.fr

  /* ── JSON-LD: WebApplication ── */
  const webAppLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: tool.title,
    url: pageUrl,
    description: tool.desc,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any (Web Browser)',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
    inLanguage: locale,
    isPartOf: { '@type': 'WebSite', name: 'Utilyx', url: BASE_URL },
  }

  /* ── JSON-LD: FAQPage ── */
  const faqLd = tool.faq.length > 0
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: tool.faq.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      }
    : null

  /* ── JSON-LD: HowTo ── */
  const howToLd = tool.howTo.length > 0
    ? {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: tool.h1,
        description: tool.intro,
        step: tool.howTo.map((text, i) => ({
          '@type': 'HowToStep',
          position: i + 1,
          name: text,
          text,
        })),
      }
    : null

  /* ── JSON-LD: BreadcrumbList ── */
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Utilyx', item: `${BASE_URL}/${locale}` },
      { '@type': 'ListItem', position: 2, name: categoryLabels[category] || category, item: `${BASE_URL}/${locale}/${category}` },
      { '@type': 'ListItem', position: 3, name: tool.h1 },
    ],
  }

  /* ── Related tools ── */
  const relatedTools = tool.relatedSlugs
    .map((s) => getToolBySlug(s))
    .filter(Boolean) as NonNullable<ReturnType<typeof getToolBySlug>>[]

  return (
    <>
      {/* Structured data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppLd) }} />
      {faqLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />}
      {howToLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToLd) }} />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <div className="min-h-screen flex flex-col bg-background">
        {/* ── Header ── */}
        <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-lg">
          <div className="container mx-auto flex h-14 items-center px-4">
            <Link href={`/${locale}`} className="flex items-center gap-2 font-bold text-lg hover:opacity-80 transition-opacity">
              <div className="rounded-lg bg-primary/10 p-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.582a.5.5 0 0 1 0 .962L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/></svg>
              </div>
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Utilyx</span>
            </Link>
          </div>
        </header>

        {/* ── Main ── */}
        <main className="flex-1 container mx-auto px-4 py-6 sm:py-8 max-w-4xl">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-muted-foreground mb-6">
            <Link href={`/${locale}`} className="hover:text-foreground transition-colors">Utilyx</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-muted-foreground">
              {categoryLabels[category] || category}
            </span>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground font-medium truncate max-w-[200px]">{tool.h1}</span>
          </nav>

          {/* H1 + intro (server-rendered, visible to Google) */}
          <header className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">{tool.h1}</h1>
            <p className="text-muted-foreground leading-relaxed max-w-3xl">{tool.intro}</p>
            <div className="flex items-center gap-3 mt-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Shield className="h-3.5 w-3.5 text-emerald-500" /> 100% {locale === 'en' ? 'private' : locale === 'es' ? 'privado' : locale === 'de' ? 'privat' : locale === 'ar' ? 'خاص' : locale === 'pt' ? 'privado' : 'privé'}</span>
              <span className="flex items-center gap-1"><Zap className="h-3.5 w-3.5 text-amber-500" /> {locale === 'en' ? 'Free, no signup' : locale === 'es' ? 'Gratis, sin registro' : locale === 'de' ? 'Kostenlos, ohne Anmeldung' : locale === 'ar' ? 'مجاني، بدون تسجيل' : locale === 'pt' ? 'Grátis, sem cadastro' : 'Gratuit, sans inscription'}</span>
            </div>
          </header>

          {/* ── Tool (client-rendered) ── */}
          <section className="mb-8">
            <ToolRenderer toolId={tool.toolId} />
          </section>

          {/* ── Ad: Tool page banner ── */}
          <AdToolPage className="mb-8" />

          {/* ── How To (server-rendered SEO content) ── */}
          {tool.howTo.length > 0 && (
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">{howToLabel}</h2>
              <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                {tool.howTo.map((step, i) => (
                  <li key={i} className="leading-relaxed">{step}</li>
                ))}
              </ol>
            </section>
          )}

          {/* ── Ad: In-article ── */}
          {tool.howTo.length > 0 && tool.faq.length > 0 && (
            <AdInArticle className="mb-8" />
          )}

          {/* ── FAQ (server-rendered SEO content) ── */}
          {tool.faq.length > 0 && (
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-6">{faqLabel}</h2>
              <div className="space-y-4">
                {tool.faq.map((item, i) => (
                  <details key={i} className="group border border-border/50 rounded-xl p-4 open:bg-muted/30 transition-colors" open={i === 0}>
                    <summary className="font-medium cursor-pointer list-none flex items-center justify-between">
                      <span>{item.q}</span>
                      <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-90" />
                    </summary>
                    <p className="mt-3 text-muted-foreground leading-relaxed">{item.a}</p>
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
                {relatedTools.map((rt) => (
                  <Link
                    key={rt.slug}
                    href={`/${locale}/${rt.category}/${rt.slug}`}
                    className="block p-4 border border-border/50 rounded-xl hover:bg-muted/30 transition-colors group"
                  >
                    <h3 className="font-medium text-sm group-hover:text-primary transition-colors">{rt.h1}</h3>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{rt.desc}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </main>

        {/* ── Footer ── */}
        <footer className="border-t border-border/50 mt-auto">
          <div className="container mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} Utilyx — Tous droits réservés
            </p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Shield className="h-3 w-3 text-emerald-500" /> Données 100 % locales</span>
              <span className="flex items-center gap-1"><Zap className="h-3 w-3 text-amber-500" /> Sans inscription</span>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
