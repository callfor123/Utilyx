'use client'

import dynamic from 'next/dynamic'

const AdHeader = dynamic(
  () => import('@/components/ads/AdBanner').then(m => ({ default: m.AdHeader })),
  { ssr: false }
)
const AdMidContent = dynamic(
  () => import('@/components/ads/AdBanner').then(m => ({ default: m.AdMidContent })),
  { ssr: false }
)
const AdFooter = dynamic(
  () => import('@/components/ads/AdBanner').then(m => ({ default: m.AdFooter })),
  { ssr: false }
)
const AdInArticle = dynamic(
  () => import('@/components/adsense/ad-unit').then(m => ({ default: m.AdInArticle })),
  { ssr: false }
)

export { AdHeader, AdMidContent, AdFooter, AdInArticle }
