import type { MetadataRoute } from 'next'
import { seoRegistry } from '@/lib/seo-registry'

const BASE_URL = 'https://utilyx.app'

/**
 * Sitemap: FR-only for now.
 * A new/low-authority domain should focus its crawl budget on a small set of
 * high-quality pages. Once French pages are indexed, other locales can be added.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []
  const now = new Date()

  // Homepage (FR)
  entries.push({
    url: `${BASE_URL}/fr`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 1.0,
  })

  // Individual tool pages (FR only — single source: seoRegistry)
  for (const tool of Object.values(seoRegistry)) {
    entries.push({
      url: `${BASE_URL}/fr/${tool.category}/${tool.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    })
  }

  return entries
}
