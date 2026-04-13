import type { Metadata } from 'next'
import { routing } from '@/i18n/routing'
import PrivacyContent from './privacy-content'

const BASE_URL = 'https://utilyx.app'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const titles: Record<string, string> = {
    fr: 'Politique de Confidentialité',
    en: 'Privacy Policy',
    es: 'Política de Privacidad',
    de: 'Datenschutzrichtlinie',
    ar: 'سياسة الخصوصية',
    pt: 'Política de Privacidade',
  }
  const descriptions: Record<string, string> = {
    fr: 'Politique de confidentialité Utilyx — traitement local, cookies, Google AdSense et protection des données.',
    en: 'Utilyx privacy policy — local processing, cookies, Google AdSense and data protection.',
    es: 'Política de privacidad de Utilyx — procesamiento local, cookies, Google AdSense y protección de datos.',
    de: 'Utilyx Datenschutzrichtlinie — lokale Verarbeitung, Cookies, Google AdSense und Datenschutz.',
    ar: 'سياسة خصوصية Utilyx — المعالجة المحلية، ملفات تعريف الارتباط، Google AdSense وحماية البيانات.',
    pt: 'Política de privacidade Utilyx — processamento local, cookies, Google AdSense e proteção de dados.',
  }
  const title = titles[locale] || titles.fr
  const description = descriptions[locale] || descriptions.fr
  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/${locale}/privacy`,
      languages: Object.fromEntries(routing.locales.map(l => [l, `${BASE_URL}/${l}/privacy`])),
    },
  }
}

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }))
}

export default function PrivacyPage() {
  return <PrivacyContent />
}