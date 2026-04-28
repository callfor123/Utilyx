/**
 * Search Engine Ping Service
 * Submits sitemap to Google and all tool URLs to Bing/Yandex via IndexNow.
 * URL list is built dynamically from the seo-registry (single source of truth).
 */

import { seoRegistry, getSlugForLocale } from './seo-registry'

const SITEMAP_URL = 'https://utilyx.app/sitemap.xml'
const BASE_URL = 'https://utilyx.app'
const HOST = 'utilyx.app'

const LOCALES = ['fr', 'en', 'es', 'de', 'ar', 'pt'] as const

const STATIC_PAGES = ['privacy', 'about', 'terms', 'contact', 'mentions-legales'] as const

// IndexNow API key — public by design, verified via /88bebc39ab1bcaa5025b078a15d5f36b.txt
const INDEXNOW_KEY = '88bebc39ab1bcaa5025b078a15d5f36b'

/** Build the full URL list for IndexNow from the seo-registry */
function buildUrlList(): string[] {
  const urls: string[] = []

  // Locale homepages
  for (const locale of LOCALES) {
    urls.push(`${BASE_URL}/${locale}`)
  }

  // Static pages per locale
  for (const locale of LOCALES) {
    for (const page of STATIC_PAGES) {
      urls.push(`${BASE_URL}/${locale}/${page}`)
    }
  }

  // Tool pages per locale
  for (const entry of Object.values(seoRegistry)) {
    for (const locale of LOCALES) {
      const slug = getSlugForLocale(entry.slug, locale)
      urls.push(`${BASE_URL}/${locale}/${entry.category}/${slug}`)
    }
  }

  return urls
}

/**
 * Ping Google via sitemap protocol
 */
async function pingGoogle(): Promise<boolean> {
  try {
    const url = `https://www.google.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`
    const response = await fetch(url, { method: 'GET' })
    if (!response.ok) {
      console.error('[Google Ping] Failed:', response.status)
      return false
    }
    console.log('[Google Ping] Success:', response.status)
    return true
  } catch (error) {
    console.error('[Google Ping] Error:', error instanceof Error ? error.message : error)
    return false
  }
}

/**
 * Ping Bing via IndexNow protocol with all site URLs
 */
async function pingBing(urlList: string[]): Promise<boolean> {
  try {
    const response = await fetch('https://www.bing.com/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key: INDEXNOW_KEY, host: HOST, urlList }),
    })

    if (!response.ok) {
      console.error('[Bing IndexNow] Failed:', response.status)
      return false
    }

    const text = await response.text()
    console.log('[Bing IndexNow] Success:', response.status, text.substring(0, 200))
    return true
  } catch (error) {
    console.error('[Bing IndexNow] Error:', error instanceof Error ? error.message : error)
    return false
  }
}

/**
 * Ping Yandex via IndexNow protocol with all site URLs
 */
async function pingYandex(urlList: string[]): Promise<boolean> {
  try {
    const response = await fetch('https://yandex.com/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key: INDEXNOW_KEY, host: HOST, urlList }),
    })

    if (!response.ok) {
      console.error('[Yandex IndexNow] Failed:', response.status)
      return false
    }

    const text = await response.text()
    console.log('[Yandex IndexNow] Success:', response.status, text.substring(0, 200))
    return true
  } catch (error) {
    console.error('[Yandex IndexNow] Error:', error instanceof Error ? error.message : error)
    return false
  }
}

/**
 * Ping all search engines with the full site URL list.
 * Returns summary of results.
 */
export async function pingSearchEngines(): Promise<{
  google: boolean
  bing: boolean
  yandex: boolean
  urlCount: number
  timestamp: string
}> {
  console.log('[Search Engine Ping] Building URL list from seo-registry...')

  const urlList = buildUrlList()
  console.log(`[Search Engine Ping] ${urlList.length} URLs to submit`)

  const [google, bing, yandex] = await Promise.all([
    pingGoogle(),
    pingBing(urlList),
    pingYandex(urlList),
  ])

  const results = {
    google,
    bing,
    yandex,
    urlCount: urlList.length,
    timestamp: new Date().toISOString(),
  }

  console.log('[Search Engine Ping] Results:', results)
  return results
}
