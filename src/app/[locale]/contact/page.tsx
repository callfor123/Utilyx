import type { Metadata } from 'next'
import { routing } from '@/i18n/routing'
import ContactContent from './contact-content'

export const revalidate = 86400
const BASE_URL = 'https://utilyx.app'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const titles: Record<string, string> = {
    fr: 'Contact — Utilyx',
    en: 'Contact — Utilyx',
    es: 'Contacto — Utilyx',
    de: 'Kontakt — Utilyx',
    ar: 'اتصل بنا — Utilyx',
    pt: 'Contato — Utilyx',
  }
  const descriptions: Record<string, string> = {
    fr: 'Contactez l\'équipe Utilyx — formulaire de contact, email et FAQ. Questions, suggestions ou support technique pour nos 47+ outils gratuits en ligne.',
    en: 'Contact the Utilyx team — contact form, email and FAQ. Questions, suggestions or technical support for our 47+ free online tools.',
    es: 'Contacte al equipo de Utilyx — formulario de contacto, email y FAQ. Preguntas, sugerencias o soporte técnico para nuestras 47+ herramientas gratuitas.',
    de: 'Kontaktieren Sie das Utilyx-Team — Kontaktformular, E-Mail und FAQ. Fragen, Vorschläge oder technischer Support für unsere 47+ kostenlosen Online-Tools.',
    ar: 'تواصل مع فريق Utilyx — نموذج اتصال، بريد إلكتروني وأسئلة شائعة. أسئلة، اقتراحات أو دعم تقني لأدواتنا المجانية.',
    pt: 'Entre em contato com a equipe Utilyx — formulário de contato, email e FAQ. Perguntas, sugestões ou suporte técnico para nossas 47+ ferramentas gratuitas.',
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