import type { MetadataRoute } from 'next'

const BASE_URL = 'https://utilyx.io'

export default function sitemap(): MetadataRoute.Sitemap {
  const tools = [
    // PDF & Documents
    { url: `${BASE_URL}/#pdf-compress`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${BASE_URL}/#pdf-merge`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${BASE_URL}/#pdf-convert`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${BASE_URL}/#pdf-sign`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${BASE_URL}/#pdf-unlock`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${BASE_URL}/#pdf-protect`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    // Images
    { url: `${BASE_URL}/#img-convert`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${BASE_URL}/#img-compress`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${BASE_URL}/#img-resize`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${BASE_URL}/#img-bgremove`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${BASE_URL}/#heic-to-jpg`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${BASE_URL}/#favicon-generator`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    // Dev & SEO
    { url: `${BASE_URL}/#json-csv`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${BASE_URL}/#regex-tester`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${BASE_URL}/#meta-tags`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${BASE_URL}/#sitemap-robots`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${BASE_URL}/#json-formatter`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${BASE_URL}/#url-encode-decode`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${BASE_URL}/#css-gradient-generator`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${BASE_URL}/#markdown-preview`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    // Text Tools
    { url: `${BASE_URL}/#word-counter`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.9 },
    { url: `${BASE_URL}/#case-converter`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${BASE_URL}/#lorem-ipsum-generator`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${BASE_URL}/#base64-encode-decode`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${BASE_URL}/#text-diff-checker`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    // Generators
    { url: `${BASE_URL}/#qr-code-generator`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.9 },
    { url: `${BASE_URL}/#password-generator`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.9 },
    { url: `${BASE_URL}/#hash-generator`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${BASE_URL}/#color-picker`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    // Calculators
    { url: `${BASE_URL}/#bmi-calculator`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.9 },
    { url: `${BASE_URL}/#age-calculator`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.9 },
    { url: `${BASE_URL}/#percentage-calculator`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${BASE_URL}/#unit-converter`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
  ]

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...tools,
  ]
}
