import type { Metadata } from 'next'
import { routing } from '@/i18n/routing'
import TermsContent from './terms-content'

export const revalidate = 86400
const BASE_URL = 'https://utilyx.app'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const titles: Record<string, string> = {
    fr: 'Conditions Générales d\'Utilisation',
    en: 'Terms of Service',
    es: 'Condiciones de Uso',
    de: 'Nutzungsbedingungen',
    ar: 'شروط الاستخدام',
    pt: 'Termos de Uso',
  }
  const descriptions: Record<string, string> = {
    fr: 'Conditions générales d\'utilisation du site Utilyx — mentions légales, responsabilités et droits.',
    en: 'Terms of service for Utilyx — legal notices, responsibilities and rights.',
    es: 'Condiciones de uso del sitio Utilyx — avisos legales, responsabilidades y derechos.',
    de: 'Nutzungsbedingungen für Utilyx — rechtliche Hinweise, Verantwortlichkeiten und Rechte.',
    ar: 'شروط استخدام موقع Utilyx — إشعارات قانونية، مسؤوليات وحقوق.',
    pt: 'Termos de uso do site Utilyx — avisos legais, responsabilidades e direitos.',
  }
  const title = titles[locale] || titles.fr
  const description = descriptions[locale] || descriptions.fr
  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/${locale}/terms`,
      languages: Object.fromEntries(routing.locales.map(l => [l, `${BASE_URL}/${l}/terms`])),
    },
  }
}

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }))
}

export default function TermsPage() {
  return <TermsContent />
}