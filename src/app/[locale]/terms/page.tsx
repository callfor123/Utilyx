import type { Metadata } from 'next'
import { routing } from '@/i18n/routing'
import TermsContent from './terms-content'

export const revalidate = 86400
const BASE_URL = 'https://utilyx.app'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = (await params) ?? {}
  const titles: Record<string, string> = {
    fr: 'Conditions Générales d\'Utilisation — Utilyx',
    en: 'Terms of Service — Utilyx',
    es: 'Condiciones de Uso — Utilyx',
    de: 'Nutzungsbedingungen — Utilyx',
    ar: 'شروط الاستخدام — Utilyx',
    pt: 'Termos de Uso — Utilyx',
  }
  const descriptions: Record<string, string> = {
    fr: 'Conditions générales d\'utilisation du site Utilyx — responsabilités, propriété intellectuelle, publicité AdSense et droits des utilisateurs.',
    en: 'Terms of service for Utilyx — responsibilities, intellectual property, AdSense advertising and user rights.',
    es: 'Condiciones de uso del sitio Utilyx — responsabilidades, propiedad intelectual, publicidad AdSense y derechos de los usuarios.',
    de: 'Nutzungsbedingungen für Utilyx — Verantwortlichkeiten, geistiges Eigentum, AdSense-Werbung und Nutzerrechte.',
    ar: 'شروط استخدام موقع Utilyx — المسؤوليات، الملكية الفكرية، إعلانات AdSense وحقوق المستخدمين.',
    pt: 'Termos de uso do site Utilyx — responsabilidades, propriedade intelectual, publicidade AdSense e direitos dos utilizadores.',
  }
  const title = titles[locale] || titles.fr
  const description = descriptions[locale] || descriptions.fr
  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/${locale}/terms`,
      languages: { 'x-default': `${BASE_URL}/fr/terms`, ...Object.fromEntries(routing.locales.map(l => [l, `${BASE_URL}/${l}/terms`])) },
    },
  }
}

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }))
}

export default function TermsPage() {
  return <TermsContent />
}