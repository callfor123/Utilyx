import type { Metadata } from 'next'
import { routing } from '@/i18n/routing'
import ApiDocsContent from './api-docs-content'

export const revalidate = 86400
const BASE_URL = 'https://utilyx.app'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = (await params) ?? {}
  const titles: Record<string, string> = {
    fr: 'API Gratuite Utilyx — Documentation',
    en: 'Free Utilyx API — Documentation',
    es: 'API Gratuita Utilyx — Documentación',
    de: 'Kostenlose Utilyx API — Dokumentation',
    ar: 'API مجانية Utilyx — التوثيق',
    pt: 'API Gratuita Utilyx — Documentação',
  }
  const descriptions: Record<string, string> = {
    fr: 'API gratuite sans carte bancaire pour automatiser vos tâches : compteur de mots, QR code, UUID, compression d\'images et plus. Clé API gratuite, 100 requêtes/heure.',
    en: 'Free API with no credit card required to automate your tasks: word counter, QR code, UUID, image compression and more. Free API key, 100 requests/hour.',
    es: 'API gratuita sin tarjeta de crédito para automatizar tareas: contador de palabras, QR, UUID, compresión de imágenes y más. Clave API gratuita, 100 solicitudes/hora.',
    de: 'Kostenlose API ohne Kreditkarte zur Automatisierung: Wortzähler, QR-Code, UUID, Bildkomprimierung und mehr. Kostenloser API-Schlüssel, 100 Anfragen/Stunde.',
    ar: 'API مجانية بدون بطاقة ائتمان لأتمتة مهامك: عداد كلمات، رمز QR، UUID، ضغط صور والمزيد. مفتاح API مجاني، 100 طلب/ساعة.',
    pt: 'API gratuita sem cartão de crédito para automatizar tarefas: contador de palavras, QR code, UUID, compressão de imagens e mais. Chave API gratuita, 100 requisições/hora.',
  }
  const title = titles[locale] || titles.fr
  const description = descriptions[locale] || descriptions.fr
  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/${locale}/api-docs`,
      languages: { 'x-default': `${BASE_URL}/fr/api-docs`, ...Object.fromEntries(routing.locales.map(l => [l, `${BASE_URL}/${l}/api-docs`])) },
    },
  }
}

export const dynamic = 'force-dynamic'

export default function ApiDocsPage() {
  return <ApiDocsContent />
}