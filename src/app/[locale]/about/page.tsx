import type { Metadata } from 'next'
import { routing } from '@/i18n/routing'
import AboutContent from './about-content'

export const revalidate = 86400
const BASE_URL = 'https://utilyx.app'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const titles: Record<string, string> = {
    fr: 'À Propos',
    en: 'About',
    es: 'Acerca de',
    de: 'Über uns',
    ar: 'من نحن',
    pt: 'Sobre',
  }
  const descriptions: Record<string, string> = {
    fr: 'Découvrez Utilyx — suite de 47+ outils en ligne gratuits, 100% privés et sans inscription.',
    en: 'Discover Utilyx — suite of 47+ free online tools, 100% private and no signup required.',
    es: 'Descubre Utilyx — suite de 47+ herramientas online gratuitas, 100% privadas y sin registro.',
    de: 'Entdecken Sie Utilyx — 47+ kostenlose Online-Tools, 100% privat und ohne Anmeldung.',
    ar: 'اكتشف Utilyx — مجموعة من 47+ أداة مجانية عبر الإنترنت، خصوصية 100% بدون تسجيل.',
    pt: 'Descubra Utilyx — suíte de 47+ ferramentas online gratuitas, 100% privadas e sem cadastro.',
  }
  const title = titles[locale] || titles.fr
  const description = descriptions[locale] || descriptions.fr
  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/${locale}/about`,
      languages: Object.fromEntries(routing.locales.map(l => [l, `${BASE_URL}/${l}/about`])),
    },
  }
}

export const dynamic = 'force-dynamic'

export default function AboutPage() {
  return <AboutContent />
}