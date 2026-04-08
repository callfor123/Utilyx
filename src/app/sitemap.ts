import type { MetadataRoute } from 'next'

const BASE_URL = 'https://utilyx.app'
const locales = ['fr', 'en', 'es', 'de', 'ar', 'pt']

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  for (const locale of locales) {
    entries.push({
      url: `${BASE_URL}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: locale === 'fr' ? 1 : 0.9,
    })
  }

  return entries
}
