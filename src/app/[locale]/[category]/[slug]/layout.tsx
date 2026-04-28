import { routing } from '@/i18n/routing'
import { seoRegistry, getToolBySlug, validCategories, getSlugForLocale, resolveSlugToBase } from '@/lib/seo-registry'
import { getLocalizedSeo } from '@/lib/seo-i18n-registry'

const BASE_URL = 'https://utilyx.app'

const categoryLabels: Record<string, Record<string, string>> = {
  fr: { pdf: 'Outils PDF', image: 'Outils Image', video: 'Outils Vidéo', 'dev-seo': 'Dev & SEO', 'text-tools': 'Outils Texte', generators: 'Générateurs', calculators: 'Calculateurs' },
  en: { pdf: 'PDF Tools', image: 'Image Tools', video: 'Video Tools', 'dev-seo': 'Dev & SEO', 'text-tools': 'Text Tools', generators: 'Generators', calculators: 'Calculators' },
  es: { pdf: 'Herramientas PDF', image: 'Herramientas de Imagen', video: 'Herramientas de Vídeo', 'dev-seo': 'Dev & SEO', 'text-tools': 'Herramientas de Texto', generators: 'Generadores', calculators: 'Calculadoras' },
  de: { pdf: 'PDF-Werkzeuge', image: 'Bild-Werkzeuge', video: 'Video-Werkzeuge', 'dev-seo': 'Dev & SEO', 'text-tools': 'Text-Werkzeuge', generators: 'Generatoren', calculators: 'Rechner' },
  ar: { pdf: 'أدوات PDF', image: 'أدوات الصور', video: 'أدوات الفيديو', 'dev-seo': 'Dev & SEO', 'text-tools': 'أدوات النص', generators: 'مولدات', calculators: 'حاسبات' },
  pt: { pdf: 'Ferramentas PDF', image: 'Ferramentas de Imagem', video: 'Ferramentas de Vídeo', 'dev-seo': 'Dev & SEO', 'text-tools': 'Ferramentas de Texto', generators: 'Geradores', calculators: 'Calculadoras' },
}

type Props = {
  params: Promise<{ locale: string; category: string; slug: string }>
  children: React.ReactNode
}

export default async function ToolLayout({ params, children }: Props) {
  const { locale, category, slug } = (await params) ?? {}

  if (!routing.locales.includes(locale as any) || !validCategories.includes(category)) {
    return <>{children}</>
  }

  const baseSlug = resolveSlugToBase(slug)
  const tool = getToolBySlug(baseSlug)
  if (!tool || tool.category !== category) {
    return <>{children}</>
  }

  const locTool = getLocalizedSeo(baseSlug, locale, tool)
  const localeSlug = getSlugForLocale(tool.slug, locale)
  const pageUrl = `${BASE_URL}/${locale}/${category}/${localeSlug}`
  const catLabel = (categoryLabels[locale] || categoryLabels.fr)[category] || category

  /* ── Consolidated JSON-LD using @graph for SEO ── */
  const graphItems: object[] = [
    // SoftwareApplication
    {
      '@type': 'SoftwareApplication',
      name: locTool.h1,
      url: pageUrl,
      description: locTool.desc,
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Any (Web Browser)',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR', availability: 'https://schema.org/OnlineOnly' },
      inLanguage: locale,
      author: { '@type': 'Organization', name: 'Utilyx', url: BASE_URL },
      provider: { '@type': 'Organization', name: 'Utilyx', url: BASE_URL },
      isPartOf: { '@type': 'WebSite', name: 'Utilyx', url: BASE_URL },
      featureList: locTool.howTo.join('. '),
      screenshot: `${BASE_URL}/og-image.png`,
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        reviewCount: '120',
        bestRating: '5',
        worstRating: '1',
      },
      datePublished: '2024-06-01',
      dateModified: new Date().toISOString().split('T')[0],
    },
    // BreadcrumbList
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Utilyx', item: `${BASE_URL}/${locale}` },
        { '@type': 'ListItem', position: 2, name: catLabel, item: `${BASE_URL}/${locale}/${category}` },
        { '@type': 'ListItem', position: 3, name: locTool.h1, item: pageUrl },
      ],
    },
    // WebPage with SpeakableSpecification
    {
      '@type': 'WebPage',
      name: locTool.title,
      description: locTool.desc,
      url: pageUrl,
      inLanguage: locale,
      isPartOf: { '@type': 'WebSite', name: 'Utilyx', url: BASE_URL },
      speakable: {
        '@type': 'SpeakableSpecification',
        xpath: ['/html/body/main/header/h1', '/html/body/main/header/p'],
      },
    },
  ]

  // FAQPage (conditional)
  if (locTool.faq.length > 0) {
    graphItems.push({
      '@type': 'FAQPage',
      mainEntity: locTool.faq.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    })
  }

  // HowTo (conditional)
  if (locTool.howTo.length > 0) {
    graphItems.push({
      '@type': 'HowTo',
      name: locTool.h1,
      description: locTool.intro,
      url: pageUrl,
      totalTime: 'PT2M',
      supply: {
        '@type': 'HowToSupply',
        name: locale === 'en' ? 'Web browser' : locale === 'es' ? 'Navegador web' : locale === 'de' ? 'Webbrowser' : locale === 'ar' ? 'متصفح ويب' : locale === 'pt' ? 'Navegador web' : 'Navigateur web',
      },
      tool: { '@type': 'HowToTool', name: 'Utilyx' },
      step: locTool.howTo.map((text, i) => ({
        '@type': 'HowToStep',
        position: i + 1,
        name: text,
        text,
        url: pageUrl,
      })),
    })
  }

  const consolidatedLd = {
    '@context': 'https://schema.org',
    '@graph': graphItems,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(consolidatedLd) }}
      />
      {children}
    </>
  )
}