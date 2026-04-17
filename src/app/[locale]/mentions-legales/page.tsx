import type { Metadata } from 'next'
import { routing } from '@/i18n/routing'
import MentionsLegalesContent from './mentions-legales-content'

export const revalidate = 86400
const BASE_URL = 'https://utilyx.app'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const titles: Record<string, string> = {
    fr: 'Mentions L\u00e9gales',
    en: 'Legal Notice',
    es: 'Aviso Legal',
    de: 'Impressum',
    ar: '\u0625\u0634\u0639\u0627\u0631 \u0642\u0627\u0646\u0648\u0646\u064a',
    pt: 'Aviso Legal',
  }
  const descriptions: Record<string, string> = {
    fr: 'Mentions l\u00e9gales du site Utilyx \u2014 \u00e9diteur, h\u00e9bergeur et informations de contact.',
    en: 'Utilyx legal notice \u2014 publisher, host and contact information.',
    es: 'Aviso legal del sitio Utilyx \u2014 editor, alojamiento e informaci\u00f3n de contacto.',
    de: 'Utilyx Impressum \u2014 Herausgeber, Hosting und Kontaktinformationen.',
    ar: '\u0627\u0644\u0625\u0634\u0639\u0627\u0631 \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064a \u0644\u0645\u0648\u0642\u0639 Utilyx \u2014 \u0627\u0644\u0646\u0627\u0634\u0631\u060c \u0627\u0644\u0627\u0633\u062a\u0636\u0627\u0641\u0629 \u0648\u0645\u0639\u0644\u0648\u0645\u0627\u062a \u0627\u0644\u0627\u062a\u0635\u0627\u0644.',
    pt: 'Aviso legal do site Utilyx \u2014 editor, hospedagem e informa\u00e7\u00f5es de contato.',
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
