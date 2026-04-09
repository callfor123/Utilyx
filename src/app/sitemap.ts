import type { MetadataRoute } from 'next'

const BASE_URL = 'https://utilyx.app'
const locales = ['fr', 'en', 'es', 'de', 'ar', 'pt']

// All tool slugs organized by category
const toolCategories: Record<string, { slug: string; priority: number }[]> = {
  pdf: [
    { slug: 'compresser-pdf', priority: 0.95 },
    { slug: 'fusionner-pdf', priority: 0.92 },
    { slug: 'pdf-en-images', priority: 0.88 },
    { slug: 'signer-pdf', priority: 0.85 },
    { slug: 'deverrouiller-pdf', priority: 0.93 },
    { slug: 'proteger-pdf', priority: 0.90 },
  ],
  image: [
    { slug: 'convertir-image', priority: 0.90 },
    { slug: 'compresser-image', priority: 0.92 },
    { slug: 'redimensionner-image', priority: 0.85 },
    { slug: 'supprimer-arriere-plan', priority: 0.88 },
    { slug: 'heic-vers-jpg', priority: 0.93 },
    { slug: 'generateur-favicon', priority: 0.87 },
  ],
  video: [
    { slug: 'decouper-video', priority: 0.95 },
    { slug: 'compresser-video', priority: 0.95 },
    { slug: 'convertir-video', priority: 0.93 },
    { slug: 'ajouter-audio-video', priority: 0.90 },
    { slug: 'extraire-audio-video', priority: 0.92 },
    { slug: 'video-en-gif', priority: 0.91 },
    { slug: 'supprimer-audio-video', priority: 0.88 },
  ],
  'dev-seo': [
    { slug: 'json-csv', priority: 0.82 },
    { slug: 'testeur-regex', priority: 0.78 },
    { slug: 'meta-tags', priority: 0.85 },
    { slug: 'sitemap-robots', priority: 0.83 },
    { slug: 'formateur-json', priority: 0.87 },
    { slug: 'url-encode-decode', priority: 0.80 },
    { slug: 'css-gradient', priority: 0.76 },
    { slug: 'markdown-preview', priority: 0.74 },
  ],
  'text-tools': [
    { slug: 'compteur-mots', priority: 0.90 },
    { slug: 'convertisseur-casse', priority: 0.82 },
    { slug: 'lorem-ipsum', priority: 0.80 },
    { slug: 'base64', priority: 0.78 },
    { slug: 'comparateur-texte', priority: 0.75 },
  ],
  generators: [
    { slug: 'generateur-qr-code', priority: 0.92 },
    { slug: 'generateur-mot-de-passe', priority: 0.88 },
    { slug: 'generateur-hash', priority: 0.80 },
    { slug: 'color-picker', priority: 0.83 },
  ],
  calculators: [
    { slug: 'calculateur-imc', priority: 0.85 },
    { slug: 'calculateur-age', priority: 0.82 },
    { slug: 'calculateur-pourcentage', priority: 0.80 },
    { slug: 'convertisseur-unites', priority: 0.83 },
  ],
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []
  const now = new Date()

  // Homepage for each locale
  for (const locale of locales) {
    entries.push({
      url: `${BASE_URL}/${locale}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: locale === 'fr' ? 1.0 : 0.9,
    })
  }

  // Category pages for each locale
  for (const locale of locales) {
    for (const category of Object.keys(toolCategories)) {
      entries.push({
        url: `${BASE_URL}/${locale}/${category}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.85,
      })
    }
  }

  // Individual tool pages for each locale
  for (const locale of locales) {
    for (const [category, tools] of Object.entries(toolCategories)) {
      for (const tool of tools) {
        entries.push({
          url: `${BASE_URL}/${locale}/${category}/${tool.slug}`,
          lastModified: now,
          changeFrequency: 'monthly',
          priority: tool.priority * (locale === 'fr' ? 1 : 0.9),
        })
      }
    }
  }

  return entries
}
