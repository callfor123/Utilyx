import type { Metadata } from 'next'
import { routing } from '@/i18n/routing'
import ApiKeysContent from './api-keys-content'

export const revalidate = 86400
const BASE_URL = 'https://utilyx.app'

const titles: Record<string, string> = {
  fr: 'Clé API Gratuite — Générez votre clé API sans inscription | Utilyx',
  en: 'Free API Key — Generate your API key, no signup required | Utilyx',
  es: 'Clave API Gratuita — Genera tu clave API sin registro | Utilyx',
  de: 'Kostenloser API-Schlüssel — Generieren Sie Ihren Schlüssel ohne Anmeldung | Utilyx',
  ar: 'مفتاح API مجاني — أنشئ مفتاحك بدون تسجيل | Utilyx',
  pt: 'Chave API Gratuita — Gere sua chave API sem cadastro | Utilyx',
}

const descriptions: Record<string, string> = {
  fr: 'Générez une clé API gratuite pour automatiser vos tâches avec Utilyx : compression PDF, OCR, traitement d\'images et plus. 100 requêtes/heure, expiration 5 jours, sans inscription ni carte bancaire. Accédez à l\'API REST gratuitement.',
  en: 'Generate a free API key to automate tasks with Utilyx: PDF compression, OCR, image processing and more. 100 requests/hour, 5-day expiry, no signup or credit card needed. Access the REST API for free.',
  es: 'Genera una clave API gratuita para automatizar tareas con Utilyx: compresión PDF, OCR, procesamiento de imágenes y más. 100 solicitudes/hora, expira en 5 días, sin registro ni tarjeta de crédito. Accede a la API REST gratis.',
  de: 'Generieren Sie einen kostenlosen API-Schlüssel zur Automatisierung mit Utilyx: PDF-Komprimierung, OCR, Bildverarbeitung und mehr. 100 Anfragen/Stunde, 5 Tage gültig, keine Anmeldung erforderlich. Kostenlosen REST-API-Zugang nutzen.',
  ar: 'أنشئ مفتاح API مجاني لأتمتة مهامك مع Utilyx: ضغط PDF، التعرف على النصوص، معالجة الصور والمزيد. 100 طلب/ساعة، صلاحية 5 أيام، بدون تسجيل أو بطاقة ائتمان. الوصول إلى REST API مجانًا.',
  pt: 'Gere uma chave API gratuita para automatizar tarefas com Utilyx: compressão PDF, OCR, processamento de imagens e mais. 100 requisições/hora, expira em 5 dias, sem cadastro ou cartão de crédito. Acesse a API REST gratuitamente.',
}

const keywords: Record<string, string[]> = {
  fr: ['clé API gratuite', 'API REST gratuite', 'générer clé API', 'API PDF', 'API OCR', 'API compression image', 'API sans inscription', 'clé API automatique', 'outil API gratuit', 'Utilyx API'],
  en: ['free API key', 'free REST API', 'generate API key', 'PDF API', 'OCR API', 'image compression API', 'API no signup', 'automatic API key', 'free API tool', 'Utilyx API'],
  es: ['clave API gratuita', 'API REST gratuita', 'generar clave API', 'API PDF', 'API OCR', 'API compresión imágenes', 'API sin registro', 'clave API automática', 'herramienta API gratuita'],
  de: ['kostenloser API-Schlüssel', 'REST API kostenlos', 'API-Schlüssel generieren', 'PDF API', 'OCR API', 'Bildkomprimierung API', 'API ohne Anmeldung', 'Utilyx API'],
  ar: ['مفتاح API مجاني', 'REST API مجانية', 'إنشاء مفتاح API', 'API PDF', 'API التعرف على النصوص', 'أداة API مجانية', 'API بدون تسجيل'],
  pt: ['chave API gratuita', 'API REST gratuita', 'gerar chave API', 'API PDF', 'API OCR', 'API compressão de imagens', 'API sem cadastro', 'Utilyx API'],
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = (await params) ?? {}
  const title = titles[locale] || titles.fr
  const description = descriptions[locale] || descriptions.fr
  const localeKeywords = keywords[locale] || keywords.fr

  const alternates = {
    canonical: `${BASE_URL}/${locale}/api-keys`,
    languages: {
      'x-default': `${BASE_URL}/fr/api-keys`,
      ...Object.fromEntries(routing.locales.map(l => [l, `${BASE_URL}/${l}/api-keys`])),
    },
  }

  return {
    title,
    description,
    keywords: localeKeywords,
    alternates,
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/${locale}/api-keys`,
      siteName: 'Utilyx',
      type: 'website',
      locale: locale === 'ar' ? 'ar_SA' : locale === 'pt' ? 'pt_BR' : `${locale}_${locale.toUpperCase()}`,
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og-image.png'],
    },
  }
}

function getJsonLd(locale: string) {
  const title = titles[locale] || titles.fr
  const description = descriptions[locale] || descriptions.fr

  const faqItems: Record<string, { q: string; a: string }[]> = {
    fr: [
      { q: 'Comment obtenir une clé API gratuite ?', a: 'Rendez-vous sur la page /api-keys, entrez éventuellement votre email et cliquez sur "Générer une clé". Votre clé API est créée instantanément, sans inscription ni carte bancaire.' },
      { q: 'Combien de requêtes puis-je faire avec la clé gratuite ?', a: 'La clé API gratuite permet 100 requêtes par heure par clé. C\'est suffisant pour tester l\'API et automatiser des tâches légères.' },
      { q: 'Combien de temps dure une clé API gratuite ?', a: 'La clé API gratuite expire automatiquement après 5 jours. Vous pouvez régénérer une nouvelle clé gratuitement à tout moment.' },
      { q: 'Mes données sont-elles sécurisées ?', a: 'Oui. Les clés API sont stockées sous forme de hachage SHA-256. La clé complète n\'est affichée qu\'une seule fois lors de la création et n\'est jamais stockée en clair.' },
      { q: 'Quels outils sont accessibles via l\'API ?', a: 'L\'API donne accès à la compression d\'images, l\'OCR (reconnaissance de texte), et d\'autres outils Utilyx. De nouveaux endpoints sont ajoutés régulièrement.' },
      { q: 'Puis-je révoquer ma clé API ?', a: 'Oui, vous pouvez révoquer votre clé à tout moment depuis la section "Mes clés" en recherchant par email.' },
    ],
    en: [
      { q: 'How do I get a free API key?', a: 'Visit the /api-keys page, optionally enter your email, and click "Generate key". Your API key is created instantly with no signup or credit card required.' },
      { q: 'How many requests can I make with the free key?', a: 'The free API key allows 100 requests per hour per key. This is sufficient for testing the API and automating lightweight tasks.' },
      { q: 'How long does a free API key last?', a: 'The free API key auto-expires after 5 days. You can regenerate a new key for free at any time.' },
      { q: 'Is my data secure?', a: 'Yes. API keys are stored as SHA-256 hashes. The full key is only displayed once during creation and is never stored in plaintext.' },
      { q: 'Which tools are accessible via the API?', a: 'The API provides access to image compression, OCR (text recognition), and other Utilyx tools. New endpoints are added regularly.' },
      { q: 'Can I revoke my API key?', a: 'Yes, you can revoke your key at any time from the "My keys" section by searching with your email.' },
    ],
    es: [
      { q: '¿Cómo obtengo una clave API gratuita?', a: 'Visita la página /api-keys, introduce tu email opcionalmente y haz clic en "Generar clave". Tu clave API se crea al instante sin registro ni tarjeta de crédito.' },
      { q: '¿Cuántas solicitudes puedo hacer con la clave gratuita?', a: 'La clave API gratuita permite 100 solicitudes por hora por clave. Es suficiente para probar la API y automatizar tareas ligeras.' },
      { q: '¿Cuánto dura una clave API gratuita?', a: 'La clave API gratuita expira automáticamente después de 5 días. Puedes regenerar una nueva clave gratis en cualquier momento.' },
      { q: '¿Son seguros mis datos?', a: 'Sí. Las claves API se almacenan como hashes SHA-256. La clave completa solo se muestra una vez durante la creación y nunca se almacena en texto plano.' },
      { q: '¿Qué herramientas son accesibles a través de la API?', a: 'La API da acceso a compresión de imágenes, OCR (reconocimiento de texto) y otras herramientas de Utilyx. Se añaden nuevos endpoints regularmente.' },
      { q: '¿Puedo revocar mi clave API?', a: 'Sí, puedes revocar tu clave en cualquier momento desde la sección "Mis claves" buscando con tu email.' },
    ],
    de: [
      { q: 'Wie erhalte ich einen kostenlosen API-Schlüssel?', a: 'Besuchen Sie die Seite /api-keys, geben Sie optional Ihre E-Mail ein und klicken Sie auf "Schlüssel generieren". Ihr API-Schlüssel wird sofort ohne Anmeldung erstellt.' },
      { q: 'Wie viele Anfragen kann ich mit dem kostenlosen Schlüssel stellen?', a: 'Der kostenlose API-Schlüssel erlaubt 100 Anfragen pro Stunde pro Schlüssel. Dies reicht zum Testen der API und zur Automatisierung leichter Aufgaben.' },
      { q: 'Wie lange gilt ein kostenloser API-Schlüssel?', a: 'Der kostenlose API-Schlüssel läuft nach 5 Tagen automatisch ab. Sie können jederzeit einen neuen Schlüssel kostenlos generieren.' },
      { q: 'Sind meine Daten sicher?', a: 'Ja. API-Schlüssel werden als SHA-256-Hashes gespeichert. Der vollständige Schlüssel wird nur einmal bei der Erstellung angezeigt und niemals im Klartext gespeichert.' },
      { q: 'Welche Tools sind über die API zugänglich?', a: 'Die API bietet Zugang zu Bildkomprimierung, OCR (Texterkennung) und weiteren Utilyx-Tools. Neue Endpunkte werden regelmäßig hinzugefügt.' },
      { q: 'Kann ich meinen API-Schlüssel widerrufen?', a: 'Ja, Sie können Ihren Schlüssel jederzeit über den Bereich "Meine Schlüssel" widerrufen, indem Sie nach Ihrer E-Mail suchen.' },
    ],
    ar: [
      { q: 'كيف أحصل على مفتاح API مجاني؟', a: 'قم بزيارة صفحة /api-keys، أدخل بريدك الإلكتروني اختياريًا وانقر على "إنشاء مفتاح". يتم إنشاء مفتاحك فورًا بدون تسجيل أو بطاقة ائتمان.' },
      { q: 'كم عدد الطلبات التي يمكنني تقديمها بالمفتاح المجاني؟', a: 'يتيح مفتاح API المجاني 100 طلب في الساعة لكل مفتاح. هذا كافٍ لاختبار API وأتمتة المهام الخفيفة.' },
      { q: 'كم مدة صلاحية مفتاح API المجاني؟', a: 'ينتهي مفتاح API المجاني تلقائيًا بعد 5 أيام. يمكنك إنشاء مفتاح جديد مجانًا في أي وقت.' },
      { q: 'هل بياناتي آمنة؟', a: 'نعم. يتم تخزين مفاتيح API كتجزئة SHA-256. يظهر المفتاح الكامل مرة واحدة فقط عند الإنشاء ولا يتم تخزينه أبدًا بنص عادي.' },
      { q: 'ما الأدوات المتاحة عبر API؟', a: 'توفر API الوصول إلى ضغط الصور والتعرف على النصوص (OCR) وأدوات Utilyx الأخرى. تتم إضافة نقاط نهاية جديدة بانتظام.' },
      { q: 'هل يمكنني إلغاء مفتاح API الخاص بي؟', a: 'نعم، يمكنك إلغاء مفتاحك في أي وقت من قسم "مفاتيحي" بالبحث عبر بريدك الإلكتروني.' },
    ],
    pt: [
      { q: 'Como obter uma chave API gratuita?', a: 'Acesse a página /api-keys, insira opcionalmente seu email e clique em "Gerar chave". Sua chave API é criada instantaneamente, sem cadastro ou cartão de crédito.' },
      { q: 'Quantas requisições posso fazer com a chave gratuita?', a: 'A chave API gratuita permite 100 requisições por hora por chave. É suficiente para testar a API e automatizar tarefas leves.' },
      { q: 'Quanto tempo dura uma chave API gratuita?', a: 'A chave API gratuita expira automaticamente após 5 dias. Você pode regenerar uma nova chave gratuitamente a qualquer momento.' },
      { q: 'Meus dados estão seguros?', a: 'Sim. As chaves API são armazenadas como hashes SHA-256. A chave completa é exibida apenas uma vez durante a criação e nunca é armazenada em texto plano.' },
      { q: 'Quais ferramentas são acessíveis via API?', a: 'A API dá acesso à compressão de imagens, OCR (reconhecimento de texto) e outras ferramentas Utilyx. Novos endpoints são adicionados regularmente.' },
      { q: 'Posso revogar minha chave API?', a: 'Sim, você pode revogar sua chave a qualquer momento na seção "Minhas chaves" pesquisando pelo email.' },
    ],
  }

  const faq = faqItems[locale] || faqItems.fr

  return {
    productLd: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Utilyx API',
      url: `${BASE_URL}/${locale}/api-keys`,
      description,
      inLanguage: locale,
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Any (REST API)',
      author: { '@type': 'Organization', name: 'Utilyx', url: BASE_URL },
      provider: { '@type': 'Organization', name: 'Utilyx', url: BASE_URL },
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'EUR',
        availability: 'https://schema.org/OnlineOnly',
        description: locale === 'fr'
          ? 'Clé API gratuite — 100 requêtes/heure, expiration 5 jours'
          : 'Free API key — 100 requests/hour, 5-day expiry',
      },
      featureList: [
        'Compression d\'images via API',
        'OCR (reconnaissance de texte) via API',
        'Authentification par clé API REST',
        'Expiration automatique après 5 jours',
        '100 requêtes par heure par clé',
        'Aucune inscription requise',
      ],
    },
    faqLd: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faq.map(item => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.a,
        },
      })),
    },
  }
}

export const dynamic = 'force-dynamic'

export default async function ApiKeysPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = (await params) ?? {}
  const jsonLd = getJsonLd(locale)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.productLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.faqLd) }}
      />
      <ApiKeysContent />
    </>
  )
}