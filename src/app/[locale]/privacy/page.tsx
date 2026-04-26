import type { Metadata } from 'next'
import { routing } from '@/i18n/routing'
import PrivacyContent from './privacy-content'

export const revalidate = 86400
const BASE_URL = 'https://utilyx.app'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = (await params) ?? {}
  const titles: Record<string, string> = {
    fr: 'Politique de Confidentialité — Utilyx',
    en: 'Privacy Policy — Utilyx',
    es: 'Política de Privacidad — Utilyx',
    de: 'Datenschutzrichtlinie — Utilyx',
    ar: 'سياسة الخصوصية — Utilyx',
    pt: 'Política de Privacidade — Utilyx',
  }
  const descriptions: Record<string, string> = {
    fr: 'Politique de confidentialité Utilyx — traitement 100% local, cookies, Google AdSense, RGPD, droits des utilisateurs et protection des données personnelles.',
    en: 'Utilyx privacy policy — 100% local processing, cookies, Google AdSense, GDPR, user rights and personal data protection.',
    es: 'Política de privacidad de Utilyx — procesamiento 100% local, cookies, Google AdSense, RGPD, derechos de los usuarios y protección de datos personales.',
    de: 'Utilyx Datenschutzrichtlinie — 100% lokale Verarbeitung, Cookies, Google AdSense, DSGVO, Nutzerrechte und Schutz personenbezogener Daten.',
    ar: 'سياسة خصوصية Utilyx — المعالجة 100% محلية، ملفات تعريف الارتباط، Google AdSense، اللائحة العامة لحماية البيانات وحقوق المستخدمين.',
    pt: 'Política de privacidade Utilyx — processamento 100% local, cookies, Google AdSense, RGPD, direitos dos utilizadores e proteção de dados pessoais.',
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