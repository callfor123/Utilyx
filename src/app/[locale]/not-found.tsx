import Link from 'next/link'
import { routing } from '@/i18n/routing'
import { FileText, Image, Code, Type, Sparkles, Calculator } from 'lucide-react'

const notFoundMessages: Record<string, { title: string; description: string; home: string; popularTools: string }> = {
  fr: { title: 'Page introuvable', description: "La page que vous recherchez n'existe pas ou a été déplacée.", home: "Retour à l'accueil", popularTools: 'Outils populaires' },
  en: { title: 'Page not found', description: 'The page you are looking for does not exist or has been moved.', home: 'Back to home', popularTools: 'Popular tools' },
  es: { title: 'Página no encontrada', description: 'La página que buscas no existe o ha sido movida.', home: 'Volver al inicio', popularTools: 'Herramientas populares' },
  de: { title: 'Seite nicht gefunden', description: 'Die gesuchte Seite existiert nicht oder wurde verschoben.', home: 'Zurück zur Startseite', popularTools: 'Beliebte Werkzeuge' },
  ar: { title: 'الصفحة غير موجودة', description: 'الصفحة التي تبحث عنها غير موجودة أو تم نقلها.', home: 'العودة للرئيسية', popularTools: 'أدوات شائعة' },
  pt: { title: 'Página não encontrada', description: 'A página que procura não existe ou foi movida.', home: 'Voltar ao início', popularTools: 'Ferramentas populares' },
}

const popularToolsByLocale: Record<string, { icon: React.ComponentType<{ className?: string }>; category: string; slug: string; label: Record<string, string> }[]> = {
  fr: [
    { icon: FileText, category: 'pdf', slug: 'compresser-pdf', label: { fr: 'Compresser PDF', en: 'Compress PDF', es: 'Comprimir PDF', de: 'PDF komprimieren', ar: 'ضغط PDF', pt: 'Comprimir PDF' } },
    { icon: Image, category: 'image', slug: 'convertir-image', label: { fr: 'Convertir Image', en: 'Convert Image', es: 'Convertir Imagen', de: 'Bild umwandeln', ar: 'تحويل صورة', pt: 'Converter Imagem' } },
    { icon: Code, category: 'dev-seo', slug: 'formater-json', label: { fr: 'Formater JSON', en: 'Format JSON', es: 'Formatear JSON', de: 'JSON formatieren', ar: 'تنسيق JSON', pt: 'Formatar JSON' } },
    { icon: Type, category: 'text-tools', slug: 'compteur-mots', label: { fr: 'Compteur de Mots', en: 'Word Counter', es: 'Contador de Palabras', de: 'Wortzähler', ar: 'عداد الكلمات', pt: 'Contador de Palavras' } },
    { icon: Sparkles, category: 'generators', slug: 'generateur-qr-code', label: { fr: 'Générateur QR Code', en: 'QR Code Generator', es: 'Generador QR', de: 'QR-Code-Generator', ar: 'مولد رمز QR', pt: 'Gerador QR Code' } },
    { icon: Calculator, category: 'calculators', slug: 'calculateur-imc', label: { fr: 'Calculateur IMC', en: 'BMI Calculator', es: 'Calculadora IMC', de: 'BMI-Rechner', ar: 'حاسبة BMI', pt: 'Calculadora IMC' } },
  ],
}

const tools = popularToolsByLocale.fr

export default async function NotFound({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params
  const locale = routing.locales.includes(rawLocale as any) ? rawLocale : 'fr'
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

      {/* Popular tools section to help users recover */}
      <div className="mt-8 w-full max-w-lg">
        <p className="text-sm font-medium text-muted-foreground mb-4">{msgs.popularTools}</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {tools.map((tool) => {
            const Icon = tool.icon
            const toolLabel = tool.label[locale] || tool.label.fr
            return (
              <Link
                key={tool.slug}
                href={`/${locale}/${tool.category}/${tool.slug}`}
                className="flex items-center gap-2 rounded-lg border bg-card px-3 py-2.5 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />
                <span className="truncate">{toolLabel}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}