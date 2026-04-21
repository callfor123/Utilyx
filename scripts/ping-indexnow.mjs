import fetch from 'node-fetch';

const apiKey = '88bebc39ab1bcaa5025b078a15d5f36b';
const host = 'utilyx.app';

// Submit to Bing IndexNow
async function pingBing() {
  try {
    const response = await fetch('https://www.bing.com/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        key: apiKey,
        host: host,
        urlList: [
          `https://${host}/`,
          `https://${host}/en/pdf/compress-pdf`,
          `https://${host}/en/pdf/merge-pdf`,
          `https://${host}/en/pdf/pdf-to-images`,
          `https://${host}/en/image/compress-image`,
          `https://${host}/en/text-tools/word-counter`
        ]
      })
    });

    console.log('Bing IndexNow response:', response.status, await response.text());
  } catch (error) {
    console.error('Error pinging Bing:', error);
  }
}

// Submit to Yandex IndexNow
async function pingYandex() {
  try {
    const response = await fetch('https://yandex.com/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        key: apiKey,
        host: host,
        urlList: [
          `https://${host}/`,
          `https://${host}/en/pdf/compress-pdf`,
          `https://${host}/en/pdf/merge-pdf`,
          `https://${host}/en/pdf/pdf-to-images`,
          `https://${host}/en/image/compress-image`,
          `https://${host}/en/text-tools/word-counter`
        ]
      })
    });

    console.log('Yandex IndexNow response:', response.status, await response.text());
  } catch (error) {
    console.error('Error pinging Yandex:', error);
  }
}

// Run both submissions
pingBing();
pingYandex();