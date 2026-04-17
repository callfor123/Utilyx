import type { Metadata } from 'next'
import { routing } from '@/i18n/routing'
import ContactContent from './contact-content'

export const revalidate = 86400
const BASE_URL = 'https://utilyx.app'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const titles: Record<string, string> = {
    fr: 'Contact',
    en: 'Contact',
    es: 'Contacto',
    de: 'Kontakt',
    ar: 'اتصل بنا',
    pt: 'Contato',
  }
  const descriptions: Record<string, string> = {
    fr: 'Contactez l\u2019\u00e9quipe Utilyx \u2014 questions, suggestions ou support technique.',
    en: 'Contact the Utilyx team \u2014 questions, suggestions or technical support.',
    es: 'Contacte al equipo de Utilyx \u2014 preguntas, sugerencias o soporte t\u00e9cnico.',
    de: 'Kontaktieren Sie das Utilyx-Team \u2014 Fragen, Vorschl\u00e4ge oder technischer Support.',
    ar: '\u062a\u0648\u0627\u0635\u0644 \u0645\u0639 \u0641\u0631\u064a\u0642 Utilyx \u2014 \u0623\u0633\u0626\u0644\u0629\u060c \u0627\u0642\u062a\u0631\u0627\u062d\u0627\u062a \u0623\u0648 \u062f\u0639\u0645 \u062a\u0642\u0646\u064a.',
    pt: 'Entre em contato com a equipe Utilyx \u2014 perguntas, sugest\u00f5es ou suporte t\u00e9cnico.',
  }
  const title = titles[locale] || titles.fr
  const description = descriptions[locale] || descriptions.fr
  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/${locale}/contact`,
      languages: Object.fromEntries(routing.locales.map(l => [l, `${BASE_URL}/${l}/contact`])),
    },
  }
}

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }))
}

export default function ContactPage() {
  return <ContactContent />
}
