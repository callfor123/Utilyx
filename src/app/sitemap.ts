import type { MetadataRoute } from 'next'
import { seoRegistry, getSlugForLocale } from '@/lib/seo-registry'
import { routing } from '@/i18n/routing'

const BASE_URL = 'https://utilyx.app'

/**
 * Stable lastModified dates per section.
 * Update these ONLY when the corresponding content actually changes,
 * so crawlers can rely on them for crawl efficiency.
 */
const LAST_MOD = {
  home: new Date('2026-04-15'),
  tools: new Date('2026-04-20'),
  privacy: new Date('2026-04-01'),
  about: new Date('2026-04-01'),
  terms: new Date('2026-04-01'),
  contact: new Date('2026-04-01'),
  apiKeys: new Date('2026-04-20'),
  apiDocs: new Date('2026-04-20'),
  mentionsLegales: new Date('2026-04-01'),
} as const

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  for (const locale of routing.locales) {
    entries.push({
      url: `${BASE_URL}/${locale}`,
      lastModified: LAST_MOD.home,
      changeFrequency: 'weekly',
      priority: locale === 'fr' ? 1.0 : 0.8,
    })

    for (const tool of Object.values(seoRegistry)) {
      entries.push({
        url: `${BASE_URL}/${locale}/${tool.category}/${getSlugForLocale(tool.slug, locale)}`,
        lastModified: LAST_MOD.tools,
        changeFrequency: 'monthly',
        priority: locale === 'fr' ? 0.9 : 0.7,
      })
    }

    entries.push({
      url: `${BASE_URL}/${locale}/privacy`,
      lastModified: LAST_MOD.privacy,
      changeFrequency: 'yearly',
      priority: 0.3,
    })

    entries.push({
      url: `${BASE_URL}/${locale}/about`,
      lastModified: LAST_MOD.about,
      changeFrequency: 'yearly',
      priority: 0.4,
    })

    entries.push({
      url: `${BASE_URL}/${locale}/terms`,
      lastModified: LAST_MOD.terms,
      changeFrequency: 'yearly',
      priority: 0.3,
    })

    entries.push({
      url: `${BASE_URL}/${locale}/contact`,
      lastModified: LAST_MOD.contact,
      changeFrequency: 'yearly',
      priority: 0.3,
    })

    entries.push({
      url: `${BASE_URL}/${locale}/api-keys`,
      lastModified: LAST_MOD.apiKeys,
      changeFrequency: 'monthly',
      priority: 0.7,
    })

    entries.push({
      url: `${BASE_URL}/${locale}/api-docs`,
      lastModified: LAST_MOD.apiDocs,
      changeFrequency: 'monthly',
      priority: 0.8,
    })

    entries.push({
      url: `${BASE_URL}/${locale}/mentions-legales`,
      lastModified: LAST_MOD.mentionsLegales,
      changeFrequency: 'yearly',
      priority: 0.2,
    })
  }

  return entries
}