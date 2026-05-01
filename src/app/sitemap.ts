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

type Locale = (typeof routing.locales)[number]

/** Build hreflang languages map for a given path-per-locale. */
function buildAlternates(urlPerLocale: Record<Locale, string>): {
  languages: Record<string, string>
} {
  const languages: Record<string, string> = {}
  for (const [locale, url] of Object.entries(urlPerLocale)) {
    languages[locale] = url
  }
  // x-default points to the French (default) version
  languages['x-default'] = urlPerLocale['fr']
  return { languages }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  // ── Home pages ──────────────────────────────────────────────────────────────
  const homeUrls = Object.fromEntries(
    routing.locales.map((l) => [l, `${BASE_URL}/${l}`])
  ) as Record<Locale, string>

  for (const locale of routing.locales) {
    entries.push({
      url: homeUrls[locale],
      lastModified: LAST_MOD.home,
      changeFrequency: 'weekly',
      priority: locale === 'fr' ? 1.0 : 0.8,
      alternates: buildAlternates(homeUrls),
    })
  }

  // ── Tool pages ───────────────────────────────────────────────────────────────
  for (const tool of Object.values(seoRegistry)) {
    const toolUrls = Object.fromEntries(
      routing.locales.map((l) => [
        l,
        `${BASE_URL}/${l}/${tool.category}/${getSlugForLocale(tool.slug, l)}`,
      ])
    ) as Record<Locale, string>

    for (const locale of routing.locales) {
      entries.push({
        url: toolUrls[locale],
        lastModified: LAST_MOD.tools,
        changeFrequency: 'monthly',
        priority: locale === 'fr' ? 0.9 : 0.7,
        alternates: buildAlternates(toolUrls),
      })
    }
  }

  // ── Static pages ─────────────────────────────────────────────────────────────
  const staticPages: Array<{
    path: string
    lastMod: Date
    freq: MetadataRoute.Sitemap[number]['changeFrequency']
    priority: number
  }> = [
    { path: 'privacy', lastMod: LAST_MOD.privacy, freq: 'yearly', priority: 0.3 },
    { path: 'about', lastMod: LAST_MOD.about, freq: 'yearly', priority: 0.4 },
    { path: 'terms', lastMod: LAST_MOD.terms, freq: 'yearly', priority: 0.3 },
    { path: 'contact', lastMod: LAST_MOD.contact, freq: 'yearly', priority: 0.3 },
    { path: 'api-keys', lastMod: LAST_MOD.apiKeys, freq: 'monthly', priority: 0.7 },
    { path: 'api-docs', lastMod: LAST_MOD.apiDocs, freq: 'monthly', priority: 0.8 },
    { path: 'mentions-legales', lastMod: LAST_MOD.mentionsLegales, freq: 'yearly', priority: 0.2 },
  ]

  for (const page of staticPages) {
    const pageUrls = Object.fromEntries(
      routing.locales.map((l) => [l, `${BASE_URL}/${l}/${page.path}`])
    ) as Record<Locale, string>

    for (const locale of routing.locales) {
      entries.push({
        url: pageUrls[locale],
        lastModified: page.lastMod,
        changeFrequency: page.freq,
        priority: page.priority,
        alternates: buildAlternates(pageUrls),
      })
    }
  }

  return entries
}