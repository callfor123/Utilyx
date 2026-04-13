import type { MetadataRoute } from 'next'
import { seoRegistry } from '@/lib/seo-registry'
import { routing } from '@/i18n/routing'

const BASE_URL = 'https://utilyx.app'

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []
  const now = new Date()

  for (const locale of routing.locales) {
    entries.push({
      url: `${BASE_URL}/${locale}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: locale === 'fr' ? 1.0 : 0.8,
    })

    for (const tool of Object.values(seoRegistry)) {
      entries.push({
        url: `${BASE_URL}/${locale}/${tool.category}/${tool.slug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: locale === 'fr' ? 0.9 : 0.7,
      })
    }

    entries.push({
      url: `${BASE_URL}/${locale}/privacy`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    })

    entries.push({
      url: `${BASE_URL}/${locale}/about`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.4,
    })

    entries.push({
      url: `${BASE_URL}/${locale}/terms`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    })
  }

  return entries
}