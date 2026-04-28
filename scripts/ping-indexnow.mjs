/**
 * Standalone IndexNow ping script.
 * Usage: node scripts/ping-indexnow.mjs
 *
 * For programmatic use, prefer the /api/ping-search-engines endpoint
 * which dynamically builds the URL list from the seo-registry.
 */
const BASE_URL = 'https://utilyx.app';
const INDEXNOW_KEY = '88bebc39ab1bcaa5025b078a15d5f36b';
const HOST = 'utilyx.app';

// Fallback URL list — the API route builds this dynamically from seo-registry
const URLS = [
  `${BASE_URL}/fr`, `${BASE_URL}/en`, `${BASE_URL}/es`,
  `${BASE_URL}/de`, `${BASE_URL}/ar`, `${BASE_URL}/pt`,
];

async function pingIndexNow(engine: string, endpoint: string, urls: string[]) {
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key: INDEXNOW_KEY, host: HOST, urlList: urls }),
    });
    console.log(`[${engine}] Status: ${response.status}`);
    const text = await response.text();
    console.log(`[${engine}] Response: ${text.substring(0, 200)}`);
    return response.ok;
  } catch (error) {
    console.error(`[${engine}] Error:`, error);
    return false;
  }
}

console.log('Pinging search engines via IndexNow...');
console.log('Tip: For full URL list, use: curl -H "Authorization: Bearer $ADMIN_API_KEY" https://utilyx.app/api/ping-search-engines');
console.log('');

await Promise.all([
  pingIndexNow('Bing', 'https://www.bing.com/indexnow', URLS),
  pingIndexNow('Yandex', 'https://yandex.com/indexnow', URLS),
]);