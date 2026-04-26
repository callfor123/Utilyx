import type { Metadata } from 'next'
import { routing } from '@/i18n/routing'
import MentionsLegalesContent from './mentions-legales-content'

export const revalidate = 86400
const BASE_URL = 'https://utilyx.app'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = (await params) ?? {}
  const titles: Record<string, string> = {
    fr: 'Mentions Légales — Utilyx',
    en: 'Legal Notice — Utilyx',
    es: 'Aviso Legal — Utilyx',
    de: 'Impressum — Utilyx',
    ar: 'إشعار قانوني — Utilyx',
    pt: 'Aviso Legal — Utilyx',
  }
  const descriptions: Record<string, string> = {
    fr: 'Mentions légales du site Utilyx — éditeur, hébergeur, RGPD, CNIL, cookies, propriété intellectuelle et informations de contact.',
    en: 'Utilyx legal notice — publisher, host, GDPR, cookies, intellectual property and contact information.',
    es: 'Aviso legal del sitio Utilyx — editor, alojamiento, RGPD, cookies, propiedad intelectual e información de contacto.',
    de: 'Utilyx Impressum — Herausgeber, Hosting, DSGVO, Cookies, geistiges Eigentum und Kontaktinformationen.',
    ar: 'الإشعار القانوني لموقع Utilyx — الناشر، الاستضافة، اللائحة العامة لحماية البيانات، ملفات تعريف الارتباط ومعلومات الاتصال.',
    pt: 'Aviso legal do site Utilyx — editor, hospedagem, RGPD, cookies, propriedade intelectual e informações de contato.',
  }
  const title = titles[locale] || titles.fr
  const description = descriptions[locale] || descriptions.fr
  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/${locale}/mentions-legales`,
      languages: Object.fromEntries(routing.locales.map(l => [l, `${BASE_URL}/${l}/mentions-legales`])),
    },
  }
}

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }))
}

export default function MentionsLegalesPage() {
  return <MentionsLegalesContent />
}