import type { Metadata } from 'next'
import { routing } from '@/i18n/routing'
import AboutContent from './about-content'

export const revalidate = 86400
const BASE_URL = 'https://utilyx.app'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = (await params) ?? {}
  const titles: Record<string, string> = {
    fr: 'À Propos',
    en: 'About',
    es: 'Acerca de',
    de: 'Über uns',
    ar: 'من نحن',
    pt: 'Sobre',
  }
  const descriptions: Record<string, string> = {
    fr: 'Découvrez Utilyx — suite complète de 47+ outils en ligne gratuits pour PDF, images, vidéo, SEO et texte. Traitement 100% local et privé, sans inscription requise.',
    en: 'Discover Utilyx — a complete suite of 47+ free online tools for PDF, images, video, SEO and text. 100% client-side processing, fully private, no signup required.',
    es: 'Descubre Utilyx — una suite completa de 47+ herramientas online gratuitas para PDF, imágenes, vídeo, SEO y texto. Procesamiento 100% local y privado, sin registro.',
    de: 'Entdecken Sie Utilyx — eine vollständige Suite von 47+ kostenlosen Online-Tools für PDF, Bilder, Video, SEO und Text. 100% clientseitig, privat, ohne Anmeldung.',
    ar: 'اكتشف Utilyx — مجموعة متكاملة من 47+ أداة مجانية عبر الإنترنت لملفات PDF والصور والفيديو وتحسين محركات البحث والنصوص. معالجة 100% محلية وخاصة بدون تسجيل.',
    pt: 'Descubra Utilyx — uma suíte completa de 47+ ferramentas online gratuitas para PDF, imagens, vídeo, SEO e texto. Processamento 100% local e privado, sem cadastro.',
  }
  const title = titles[locale] || titles.fr
  const description = descriptions[locale] || descriptions.fr
  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/${locale}/about`,
      languages: { 'x-default': `${BASE_URL}/fr/about`, ...Object.fromEntries(routing.locales.map(l => [l, `${BASE_URL}/${l}/about`])) },
    },
  }
}

export const dynamic = 'force-dynamic'

export default function AboutPage() {
  return <AboutContent />
}