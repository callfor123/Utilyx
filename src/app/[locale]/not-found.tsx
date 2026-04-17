import Link from 'next/link'
import { routing } from '@/i18n/routing'

const notFoundMessages: Record<string, { title: string; description: string; home: string }> = {
  fr: { title: 'Page introuvable', description: "La page que vous recherchez n'existe pas ou a été déplacée.", home: "Retour à l'accueil" },
  en: { title: 'Page not found', description: 'The page you are looking for does not exist or has been moved.', home: 'Back to home' },
  es: { title: 'Página no encontrada', description: 'La página que buscas no existe o ha sido movida.', home: 'Volver al inicio' },
  de: { title: 'Seite nicht gefunden', description: 'Die gesuchte Seite existiert nicht oder wurde verschoben.', home: 'Zurück zur Startseite' },
  ar: { title: 'الصفحة غير موجودة', description: 'الصفحة التي تبحث عنها غير موجودة أو تم نقلها.', home: 'العودة للرئيسية' },
  pt: { title: 'Página não encontrada', description: 'A página que procura não existe ou foi movida.', home: 'Voltar ao início' },
}

export default function NotFound({ params }: { params: Promise<{ locale: string }> }) {
  // Fallback to French if locale cannot be determined
  const locale = typeof window !== 'undefined'
    ? window.location.pathname.split('/')[1] || 'fr'
    : 'fr'
  const msgs = notFoundMessages[locale] || notFoundMessages.fr

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-4 text-center">
      <h1 className="text-6xl font-bold text-primary">404</h1>
      <h2 className="text-2xl font-semibold">{msgs.title}</h2>
      <p className="text-muted-foreground max-w-md">
        {msgs.description}
      </p>
      <Link
        href={`/${locale}`}
        className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
      >
        {msgs.home}
      </Link>
    </div>
  )
}
