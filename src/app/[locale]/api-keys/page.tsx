import type { Metadata } from 'next'
import { routing } from '@/i18n/routing'
import ApiKeysContent from './api-keys-content'

export const revalidate = 86400
const BASE_URL = 'https://utilyx.app'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = (await params) ?? {}
  const titles: Record<string, string> = {
    fr: 'API Keys Gratuites',
    en: 'Free API Keys',
    es: 'Claves API Gratuitas',
    de: 'Kostenlose API-Schlüssel',
    ar: 'مفاتيح API مجانية',
    pt: 'Chaves API Gratuitas',
  }
  const descriptions: Record<string, string> = {
    fr: 'Générez une clé API gratuite pour accéder aux outils Utilyx. Expiration automatique après 7 jours, sans inscription.',
    en: 'Generate a free API key to access Utilyx tools. Auto-expires after 7 days, no signup required.',
    es: 'Genera una clave API gratuita para acceder a las herramientas de Utilyx. Expira automáticamente después de 7 días.',
    de: 'Generieren Sie einen kostenlosen API-Schlüssel für Utilyx-Tools. Läuft nach 7 Tagen automatisch ab.',
    ar: 'أنشئ مفتاح API مجاني للوصول إلى أدوات Utilyx. ينتهي تلقائيًا بعد 7 أيام.',
    pt: 'Gere uma chave API gratuita para acessar as ferramentas Utilyx. Expira automaticamente após 7 dias.',
  }
  const title = titles[locale] || titles.fr
  const description = descriptions[locale] || descriptions.fr
  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/${locale}/api-keys`,
      languages: { 'x-default': `${BASE_URL}/fr/api-keys`, ...Object.fromEntries(routing.locales.map(l => [l, `${BASE_URL}/${l}/api-keys`])) },
    },
  }
}

export const dynamic = 'force-dynamic'

export default function ApiKeysPage() {
  return <ApiKeysContent />
}