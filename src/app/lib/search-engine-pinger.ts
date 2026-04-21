// Search engine pinger for IndexNow
const INDEXNOW_KEY = '88bebc39ab1bcaa5025b078a15d5f36b';
const HOST = 'utilyx.app';

async function pingBing(urls: string[]) {
  try {
    const response = await fetch('https://www.bing.com/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        key: INDEXNOW_KEY,
        host: HOST,
        urlList: urls,
      }),
    });

    console.log('Bing IndexNow response:', response.status, await response.text());
    return response.ok;
  } catch (error) {
    console.error('Error pinging Bing:', error);
    return false;
  }
}

async function pingYandex(urls: string[]) {
  try {
    const response = await fetch('https://yandex.com/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        key: INDEXNOW_KEY,
        host: HOST,
        urlList: urls,
      }),
    });

    console.log('Yandex IndexNow response:', response.status, await response.text());
    return response.ok;
  } catch (error) {
    console.error('Error pinging Yandex:', error);
    return false;
  }
}

export async function pingSearchEngines() {
  try {
    // For now, we'll use a predefined list of important URLs
    const urls = [
      `https://${HOST}/`,
      `https://${HOST}/en/pdf/compress-pdf`,
      `https://${HOST}/en/pdf/merge-pdf`,
      `https://${HOST}/en/pdf/pdf-to-images`,
      `https://${HOST}/en/image/compress-image`,
      `https://${HOST}/en/text-tools/word-counter`,
      `https://${HOST}/en/video/trim-video`,
      `https://${HOST}/en/dev-seo/regex-tester`,
      `https://${HOST}/en/generators/qr-code-generator`,
      `https://${HOST}/en/calculators/bmi-calculator`,
    ];

    // Ping both search engines
    await Promise.all([
      pingBing(urls),
      pingYandex(urls),
    ]);

    console.log('Successfully pinged search engines with IndexNow');
  } catch (error) {
    console.error('Error in pingSearchEngines:', error);
    throw error;
  }
}

// If run directly, execute the ping function
if (typeof window === 'undefined' && typeof process !== 'undefined' && process.argv.includes('--run')) {
  pingSearchEngines()
    .then(() => console.log('Ping completed successfully'))
    .catch((error) => console.error('Ping failed:', error));
}