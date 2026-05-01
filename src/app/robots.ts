import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/_next/', '/api-keys/generate'],
      },
      {
        // AdSense content bot (determines which ads to show)
        userAgent: 'Mediapartners-Google',
        allow: '/',
      },
      {
        // AdSense quality/validation bot — does NOT follow the wildcard rule
        userAgent: 'AdsBot-Google',
        allow: '/',
      },
      {
        // AdSense mobile quality bot
        userAgent: 'AdsBot-Google-Mobile',
        allow: '/',
      },
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/api-keys/generate'],
      },
    ],
    sitemap: 'https://utilyx.app/sitemap.xml',
  }
}