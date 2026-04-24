/**
 * Search Engine Ping Service
 * Submits sitemap to Google, Bing, and Yandex for indexing
 */

const SITEMAP_URL = 'https://utilyx.app/sitemap.xml'
const HOST = 'utilyx.app'

// IndexNow API key (generate from your domain's root file)
// Place a file at https://utilyx.app/88bebc39ab1bcaa5025b078a15d5f36b.txt with the key
const INDEXNOW_KEY = '88bebc39ab1bcaa5025b078a15d5f36b'

/**
 * Ping Google Search Console
 * Google uses the sitemap protocol directly
 */
async function pingGoogle(): Promise<boolean> {
  try {
    const url = `https://www.google.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`
    const response = await fetch(url, { method: 'GET' })
    if (!response.ok) {
      console.error('[Google Ping] Failed:', response.status)
      return false
    }
    const text = await response.text()
    console.log('[Google Ping] Success:', text.substring(0, 200))
    return text.includes('<result>Success</result>')
  } catch (error) {
    console.error('[Google Ping] Error:', error instanceof Error ? error.message : error)
    return false
  }
}

/**
 * Ping Bing via IndexNow protocol
 */
async function pingBing(): Promise<boolean> {
  try {
    // Submit key file location for verification
    const keyFileUrl = `https://${HOST}/${INDEXNOW_KEY}.txt`

    // Verify key file exists (optional but recommended)
    const keyResponse = await fetch(keyFileUrl, { method: 'HEAD' })
    if (!keyResponse.ok) {
      console.warn('[Bing IndexNow] Key file not found at:', keyFileUrl)
    }

    const response = await fetch('https://www.bing.com/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        key: INDEXNOW_KEY,
        host: HOST,
        urlList: [
          `https://${HOST}/`,
          `https://${HOST}/fr/`,
          `https://${HOST}/en/`,
          `https://${HOST}/es/`,
          `https://${HOST}/de/`,
          `https://${HOST}/ar/`,
          `https://${HOST}/pt/`,
        ],
      }),
    })

    if (!response.ok) {
      console.error('[Bing IndexNow] Failed:', response.status)
      return false
    }

    const text = await response.text()
    console.log('[Bing IndexNow] Success:', text.substring(0, 200))
    return true
  } catch (error) {
    console.error('[Bing IndexNow] Error:', error instanceof Error ? error.message : error)
    return false
  }
}

/**
 * Ping Yandex via IndexNow protocol
 */
async function pingYandex(): Promise<boolean> {
  try {
    const response = await fetch('https://yandex.com/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        key: INDEXNOW_KEY,
        host: HOST,
        urlList: [
          `https://${HOST}/`,
          `https://${HOST}/fr/`,
          `https://${HOST}/en/`,
        ],
      }),
    })

    if (!response.ok) {
      console.error('[Yandex IndexNow] Failed:', response.status)
      return false
    }

    const text = await response.text()
    console.log('[Yandex IndexNow] Success:', text.substring(0, 200))
    return true
  } catch (error) {
    console.error('[Yandex IndexNow] Error:', error instanceof Error ? error.message : error)
    return false
  }
}

/**
 * Ping all search engines
 * Returns summary of results
 */
export async function pingSearchEngneys(): Promise<{
  google: boolean
  bing: boolean
  yandex: boolean
  timestamp: string
}> {
  console.log('[Search Engine Ping] Starting ping process...')

  const [google, bing, yandex] = await Promise.all([
    pingGoogle(),
    pingBing(),
    pingYandex(),
  ])

  const results = {
    google,
    bing,
    yandex,
    timestamp: new Date().toISOString(),
  }

  console.log('[Search Engine Ping] Results:', results)

  return results
}

// Alias for backwards compatibility
export const pingSearchEngines = pingSearchEngneys
