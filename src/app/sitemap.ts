import type { MetadataRoute } from 'next'
import { seoRegistry } from '@/lib/seo-registry'

const BASE_URL = 'https://utilyx.app'
const locales = ['fr', 'en', 'es', 'de', 'ar', 'pt']

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []
  const now = new Date()

  // Homepage for each locale (with hreflang alternates)
  for (const locale of locales) {
    entries.push({
      url: `${BASE_URL}/${locale}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: locale === 'fr' ? 1.0 : 0.9,
      alternates: {
        languages: Object.fromEntries(locales.map(l => [l, `${BASE_URL}/${l}`])),
      },
    })
  }

  // Individual tool pages for each locale (single source: seoRegistry)
  for (const locale of locales) {
    for (const tool of Object.values(seoRegistry)) {
      entries.push({
        url: `${BASE_URL}/${locale}/${tool.category}/${tool.slug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: locale === 'fr' ? 0.9 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            locales.map(l => [l, `${BASE_URL}/${l}/${tool.category}/${tool.slug}`])
          ),
        },
      })
    }
  }

  return entries
}
