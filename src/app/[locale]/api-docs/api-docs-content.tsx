'use client'

import { useLocale } from 'next-intl'
import { Key, Code, Zap, Globe, ArrowRight, Terminal, FileText, QrCode, Hash, Binary, Palette, Lock, Paintbrush } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

type ToolApiInfo = {
  id: string
  label: Record<string, string>
  description: Record<string, string>
  endpoint: string
  method: string
  icon: React.ReactNode
  href: string
}

const toolApis: ToolApiInfo[] = [
  {
    id: 'word-counter',
    label: { fr: 'API Compteur de Mots', en: 'Word Counter API', es: 'API Contador de Palabras', de: 'Wortzähler-API', ar: 'API عداد الكلمات', pt: 'API Contador de Palavras' },
    description: { fr: 'Comptez mots, caractères, phrases et temps de lecture via API.', en: 'Count words, characters, sentences and reading time via API.', es: 'Cuenta palabras, caracteres, oraciones y tiempo de lectura vía API.', de: 'Zählen Sie Wörter, Zeichen, Sätze und Lesezeit per API.', ar: 'عد الكلمات والأحرف والجمل ووقت القراءة عبر API.', pt: 'Conte palavras, caracteres, frases e tempo de leitura via API.' },
    endpoint: '/api/v1/word-counter',
    method: 'POST',
    icon: <FileText className="h-5 w-5" />,
    href: '/api-docs/word-counter',
  },
  {
    id: 'qr-code-generator',
    label: { fr: 'API QR Code', en: 'QR Code API', es: 'API QR Code', de: 'QR-Code-API', ar: 'API رمز QR', pt: 'API QR Code' },
    description: { fr: 'Générez des QR codes en PNG ou SVG via API.', en: 'Generate QR codes in PNG or SVG format via API.', es: 'Genera códigos QR en PNG o SVG vía API.', de: 'Erstellen Sie QR-Codes im PNG- oder SVG-Format per API.', ar: 'أنشئ رموز QR بتنسيق PNG أو SVG عبر API.', pt: 'Gere QR codes em formato PNG ou SVG via API.' },
    endpoint: '/api/v1/qr-code-generator',
    method: 'POST',
    icon: <QrCode className="h-5 w-5" />,
    href: '/api-docs/qr-code-generator',
  },
  {
    id: 'uuid-generator',
    label: { fr: 'API UUID', en: 'UUID API', es: 'API UUID', de: 'UUID-API', ar: 'API UUID', pt: 'API UUID' },
    description: { fr: 'Générez des UUID v4 uniques via API.', en: 'Generate unique UUID v4s via API.', es: 'Genera UUID v4 únicos vía API.', de: 'Erstellen Sie eindeutige UUID v4 per API.', ar: 'أنشئ UUID v4 فريدة عبر API.', pt: 'Gere UUID v4 únicos via API.' },
    endpoint: '/api/v1/uuid-generator',
    method: 'GET',
    icon: <Hash className="h-5 w-5" />,
    href: '/api-docs/uuid-generator',
  },
  {
    id: 'base64',
    label: { fr: 'API Base64', en: 'Base64 API', es: 'API Base64', de: 'Base64-API', ar: 'API Base64', pt: 'API Base64' },
    description: { fr: 'Encodez ou décodez du texte en Base64 via API.', en: 'Encode or decode text to/from Base64 via API.', es: 'Codifica o decodifica texto en Base64 vía API.', de: 'Kodieren oder dekodieren Sie Text per Base64-API.', ar: 'رمّز أو فك ترميز النص بتنسيق Base64 عبر API.', pt: 'Codifique ou decodifique texto em Base64 via API.' },
    endpoint: '/api/v1/base64',
    method: 'POST',
    icon: <Binary className="h-5 w-5" />,
    href: '/api-docs/base64',
  },
  {
    id: 'hash-generator',
    label: { fr: 'API Hash', en: 'Hash API', es: 'API Hash', de: 'Hash-API', ar: 'API هاش', pt: 'API Hash' },
    description: { fr: 'Générez des hashes MD5, SHA-1, SHA-256, SHA-384, SHA-512 via API.', en: 'Generate MD5, SHA-1, SHA-256, SHA-384, SHA-512 hashes via API.', es: 'Genera hashes MD5, SHA-1, SHA-256, SHA-384, SHA-512 vía API.', de: 'Erstellen Sie MD5, SHA-1, SHA-256, SHA-384, SHA-512-Hashes per API.', ar: 'أنشئ هاشات MD5, SHA-1, SHA-256, SHA-384, SHA-512 عبر API.', pt: 'Gere hashes MD5, SHA-1, SHA-256, SHA-384, SHA-512 via API.' },
    endpoint: '/api/v1/hash-generator',
    method: 'POST',
    icon: <Lock className="h-5 w-5" />,
    href: '/api-docs/hash-generator',
  },
  {
    id: 'password-generator',
    label: { fr: 'API Mot de passe', en: 'Password API', es: 'API Contraseña', de: 'Passwort-API', ar: 'API كلمة المرور', pt: 'API Senha' },
    description: { fr: 'Générez des mots de passe aléatoires et sécurisés via API.', en: 'Generate random, secure passwords via API.', es: 'Genera contraseñas aleatorias y seguras vía API.', de: 'Erstellen Sie zufällige, sichere Passwörter per API.', ar: 'أنشئ كلمات مرور عشوائية وآمنة عبر API.', pt: 'Gere senhas aleatórias e seguras via API.' },
    endpoint: '/api/v1/password-generator',
    method: 'POST',
    icon: <Key className="h-5 w-5" />,
    href: '/api-docs/password-generator',
  },
  {
    id: 'color-converter',
    label: { fr: 'API Convertisseur couleur', en: 'Color Converter API', es: 'API Conversor de colores', de: 'Farbkonverter-API', ar: 'API محول الألوان', pt: 'API Conversor de cores' },
    description: { fr: 'Convertissez des couleurs entre HEX, RGB, HSL et CMYK via API.', en: 'Convert colors between HEX, RGB, HSL and CMYK via API.', es: 'Convierte colores entre HEX, RGB, HSL y CMYK vía API.', de: 'Konvertieren Sie Farben zwischen HEX, RGB, HSL und CMYK per API.', ar: 'حوّل الألوان بين HEX, RGB, HSL و CMYK عبر API.', pt: 'Converta cores entre HEX, RGB, HSL e CMYK via API.' },
    endpoint: '/api/v1/color-converter',
    method: 'POST',
    icon: <Palette className="h-5 w-5" />,
    href: '/api-docs/color-converter',
  },
]

const content: Record<string, {
  h1: string
  subtitle: string
  getStartedTitle: string
  step1Title: string
  step1Desc: string
  step2Title: string
  step2Desc: string
  step3Title: string
  step3Desc: string
  endpointsTitle: string
  featuresTitle: string
  feature1Title: string
  feature1Desc: string
  feature2Title: string
  feature2Desc: string
  feature3Title: string
  feature3Desc: string
  feature4Title: string
  feature4Desc: string
  faqTitle: string
  faq1Q: string
  faq1A: string
  faq2Q: string
  faq2A: string
  faq3Q: string
  faq3A: string
  faq4Q: string
  faq4A: string
  faq5Q: string
  faq5A: string
  tryItTitle: string
  tryItDesc: string
  getApiKeyBtn: string
  viewToolBtn: string
}> = {
  fr: {
    h1: 'API Gratuite Utilyx',
    subtitle: 'Automatisez vos tâches avec notre API gratuite. Aucune carte bancaire requise, inscrivez-vous en 30 secondes.',
    getStartedTitle: 'Démarrer en 3 étapes',
    step1Title: 'Obtenez une clé API',
    step1Desc: 'Créez une clé API gratuite sur Utilyx. Aucune inscription requise, juste un email optionnel.',
    step2Title: 'Appelez les endpoints',
    step2Desc: 'Envoyez votre clé via l\'en-tête Authorization: Bearer <key> ou X-API-Key.',
    step3Title: 'Traitez les résultats',
    step3Desc: 'Recevez des réponses JSON structurées, prêtes à intégrer dans votre application.',
    endpointsTitle: 'Endpoints disponibles',
    featuresTitle: 'Caractéristiques de l\'API',
    feature1Title: '100% gratuite',
    feature1Desc: 'Aucune carte bancaire, aucun abonnement. Renouvelez votre clé tous les 5 jours.',
    feature2Title: '100 requêtes/heure',
    feature2Desc: 'Limite généreuse pour un usage gratuit. Suffisant pour la plupart des projets.',
    feature3Title: 'Réponses JSON',
    feature3Desc: 'Réponses structurées et cohérentes, faciles à parser dans n\'importe quel langage.',
    feature4Title: 'CORS activé',
    feature4Desc: 'Appelez l\'API directement depuis votre navigateur ou votre frontend.',
    faqTitle: 'Questions fréquentes',
    faq1Q: 'L\'API Utilyx est-elle vraiment gratuite ?',
    faq1A: 'Oui, totalement gratuite. Aucune carte bancaire requise. Votre clé expire après 5 jours, il suffit de revenir sur le site pour en régénérer une.',
    faq2Q: 'Pourquoi la clé expire-t-elle après 5 jours ?',
    faq2A: 'Pour éviter les abus et vous encourager à revenir sur Utilyx. La régénération est instantanée et gratuite.',
    faq3Q: 'Quelle est la limite de requêtes ?',
    faq3A: '100 requêtes par heure par clé API. C\'est suffisant pour la plupart des projets personnels et prototypes.',
    faq4Q: 'Quels outils sont accessibles via l\'API ?',
    faq4A: 'Actuellement : compteur de mots, QR code, UUID, Base64, hash, mot de passe et convertisseur couleur. D\'autres endpoints arrivent bientôt.',
    faq5Q: 'Comment m\'authentifier ?',
    faq5A: 'Ajoutez votre clé dans l\'en-tête Authorization: Bearer <votre-clé> ou X-API-Key: <votre-clé>.',
    tryItTitle: 'Essayez maintenant',
    tryItDesc: 'Obtenez votre clé API gratuite et commencez à automatiser vos tâches en moins d\'une minute.',
    getApiKeyBtn: 'Obtenir une clé API gratuite',
    viewToolBtn: 'Voir les outils',
  },
  en: {
    h1: 'Free Utilyx API',
    subtitle: 'Automate your tasks with our free API. No credit card required, sign up in 30 seconds.',
    getStartedTitle: 'Get started in 3 steps',
    step1Title: 'Get an API key',
    step1Desc: 'Create a free API key on Utilyx. No signup required, just an optional email.',
    step2Title: 'Call the endpoints',
    step2Desc: 'Send your key via the Authorization: Bearer <key> or X-API-Key header.',
    step3Title: 'Process the results',
    step3Desc: 'Receive structured JSON responses, ready to integrate into your application.',
    endpointsTitle: 'Available endpoints',
    featuresTitle: 'API features',
    feature1Title: '100% free',
    feature1Desc: 'No credit card, no subscription. Renew your key every 5 days.',
    feature2Title: '100 requests/hour',
    feature2Desc: 'Generous limit for free usage. Enough for most projects.',
    feature3Title: 'JSON responses',
    feature3Desc: 'Structured and consistent responses, easy to parse in any language.',
    feature4Title: 'CORS enabled',
    feature4Desc: 'Call the API directly from your browser or frontend.',
    faqTitle: 'Frequently asked questions',
    faq1Q: 'Is the Utilyx API really free?',
    faq1A: 'Yes, completely free. No credit card required. Your key expires after 5 days — just come back to the site to regenerate one.',
    faq2Q: 'Why does the key expire after 5 days?',
    faq2A: 'To prevent abuse and encourage you to return to Utilyx. Regeneration is instant and free.',
    faq3Q: 'What is the rate limit?',
    faq3A: '100 requests per hour per API key. Sufficient for most personal projects and prototypes.',
    faq4Q: 'Which tools are accessible via the API?',
    faq4A: 'Currently: word counter, QR code, UUID, Base64, hash, password and color converter. More endpoints coming soon.',
    faq5Q: 'How do I authenticate?',
    faq5A: 'Add your key in the Authorization: Bearer <your-key> or X-API-Key: <your-key> header.',
    tryItTitle: 'Try it now',
    tryItDesc: 'Get your free API key and start automating your tasks in under a minute.',
    getApiKeyBtn: 'Get a free API key',
    viewToolBtn: 'View tools',
  },
  es: {
    h1: 'API Gratuita Utilyx',
    subtitle: 'Automatiza tus tareas con nuestra API gratuita. Sin tarjeta de crédito, regístrate en 30 segundos.',
    getStartedTitle: 'Comienza en 3 pasos',
    step1Title: 'Obtén una clave API',
    step1Desc: 'Crea una clave API gratuita en Utilyx. Sin registro, solo un email opcional.',
    step2Title: 'Llama a los endpoints',
    step2Desc: 'Envía tu clave vía Authorization: Bearer <key> o X-API-Key.',
    step3Title: 'Procesa los resultados',
    step3Desc: 'Recibe respuestas JSON estructuradas, listas para integrar en tu aplicación.',
    endpointsTitle: 'Endpoints disponibles',
    featuresTitle: 'Características de la API',
    feature1Title: '100% gratuita',
    feature1Desc: 'Sin tarjeta de crédito, sin suscripción. Renueva tu clave cada 5 días.',
    feature2Title: '100 solicitudes/hora',
    feature2Desc: 'Límite generoso para uso gratuito. Suficiente para la mayoría de proyectos.',
    feature3Title: 'Respuestas JSON',
    feature3Desc: 'Respuestas estructuradas y consistentes, fáciles de parsear en cualquier lenguaje.',
    feature4Title: 'CORS habilitado',
    feature4Desc: 'Llama a la API directamente desde tu navegador o frontend.',
    faqTitle: 'Preguntas frecuentes',
    faq1Q: '¿La API de Utilyx es realmente gratuita?',
    faq1A: 'Sí, totalmente gratuita. Sin tarjeta de crédito. Tu clave expira después de 5 días — solo vuelve al sitio para regenerarla.',
    faq2Q: '¿Por qué expira la clave después de 5 días?',
    faq2A: 'Para evitar abusos y animarte a volver a Utilyx. La regeneración es instantánea y gratuita.',
    faq3Q: '¿Cuál es el límite de solicitudes?',
    faq3A: '100 solicitudes por hora por clave API. Suficiente para la mayoría de proyectos personales y prototipos.',
    faq4Q: '¿Qué herramientas son accesibles vía API?',
    faq4A: 'Actualmente: contador de palabras, QR code, UUID, Base64, hash, contraseña y conversor de colores. Más endpoints próximamente.',
    faq5Q: '¿Cómo me autentico?',
    faq5A: 'Agrega tu clave en el encabezado Authorization: Bearer <tu-clave> o X-API-Key: <tu-clave>.',
    tryItTitle: 'Pruébalo ahora',
    tryItDesc: 'Obtén tu clave API gratuita y comienza a automatizar tus tareas en menos de un minuto.',
    getApiKeyBtn: 'Obtener clave API gratuita',
    viewToolBtn: 'Ver herramientas',
  },
  de: {
    h1: 'Kostenlose Utilyx API',
    subtitle: 'Automatisieren Sie Ihre Aufgaben mit unserer kostenlosen API. Keine Kreditkarte, Anmeldung in 30 Sekunden.',
    getStartedTitle: 'In 3 Schritten starten',
    step1Title: 'API-Schlüssel erhalten',
    step1Desc: 'Erstellen Sie einen kostenlosen API-Schlüssel auf Utilyx. Keine Anmeldung, nur eine optionale E-Mail.',
    step2Title: 'Endpoints aufrufen',
    step2Desc: 'Senden Sie Ihren Schlüssel über Authorization: Bearer <key> oder X-API-Key.',
    step3Title: 'Ergebnisse verarbeiten',
    step3Desc: 'Empfangen Sie strukturierte JSON-Antworten, bereit zur Integration in Ihre Anwendung.',
    endpointsTitle: 'Verfügbare Endpoints',
    featuresTitle: 'API-Funktionen',
    feature1Title: '100% kostenlos',
    feature1Desc: 'Keine Kreditkarte, kein Abo. Erneuern Sie Ihren Schlüssel alle 5 Tage.',
    feature2Title: '100 Anfragen/Stunde',
    feature2Desc: 'Großzügiges Limit für kostenlose Nutzung. Ausreichend für die meisten Projekte.',
    feature3Title: 'JSON-Antworten',
    feature3Desc: 'Strukturierte und konsistente Antworten, einfach in jeder Sprache zu parsen.',
    feature4Title: 'CORS aktiviert',
    feature4Desc: 'Rufen Sie die API direkt aus Ihrem Browser oder Frontend auf.',
    faqTitle: 'Häufig gestellte Fragen',
    faq1Q: 'Ist die Utilyx API wirklich kostenlos?',
    faq1A: 'Ja, völlig kostenlos. Keine Kreditkarte erforderlich. Ihr Schlüssel läuft nach 5 Tagen ab — kommen Sie einfach zurück, um einen neuen zu generieren.',
    faq2Q: 'Warum läuft der Schlüssel nach 5 Tagen ab?',
    faq2A: 'Um Missbrauch zu verhindern und Sie zur Rückkehr zu ermutigen. Die Regeneration ist sofort und kostenlos.',
    faq3Q: 'Wie hoch ist das Ratenlimit?',
    faq3A: '100 Anfragen pro Stunde pro API-Schlüssel. Ausreichend für die meisten persönlichen Projekte und Prototypen.',
    faq4Q: 'Welche Tools sind über die API zugänglich?',
    faq4A: 'Aktuell: Wortzähler, QR-Code, UUID, Base64, Hash, Passwort und Farbkonverter. Weitere Endpoints folgen bald.',
    faq5Q: 'Wie authentifiziere ich mich?',
    faq5A: 'Fügen Sie Ihren Schlüssel im Header Authorization: Bearer <ihr-schlüssel> oder X-API-Key: <ihr-schlüssel> hinzu.',
    tryItTitle: 'Jetzt ausprobieren',
    tryItDesc: 'Holen Sie sich Ihren kostenlosen API-Schlüssel und automatisieren Sie Ihre Aufgaben in unter einer Minute.',
    getApiKeyBtn: 'Kostenlosen API-Schlüssel erhalten',
    viewToolBtn: 'Tools ansehen',
  },
  ar: {
    h1: 'API مجانية Utilyx',
    subtitle: 'أتمت مهامك مع API المجانية لدينا. بدون بطاقة ائتمان، سجّل في 30 ثانية.',
    getStartedTitle: 'ابدأ في 3 خطوات',
    step1Title: 'احصل على مفتاح API',
    step1Desc: 'أنشئ مفتاح API مجاني على Utilyx. بدون تسجيل، فقط بريد إلكتروني اختياري.',
    step2Title: 'استدعِ النقاط النهائية',
    step2Desc: 'أرسل مفتاحك عبر Authorization: Bearer <key> أو X-API-Key.',
    step3Title: 'عالج النتائج',
    step3Desc: 'استقبل استجابات JSON منظمة، جاهزة للدمج في تطبيقك.',
    endpointsTitle: 'النقاط النهائية المتاحة',
    featuresTitle: 'ميزات API',
    feature1Title: 'مجانية 100%',
    feature1Desc: 'بدون بطاقة ائتمان، بدون اشتراك. جدد مفتاحك كل 5 أيام.',
    feature2Title: '100 طلب/ساعة',
    feature2Desc: 'حد سخي للاستخدام المجاني. كافٍ لمعظم المشاريع.',
    feature3Title: 'استجابات JSON',
    feature3Desc: 'استجابات منظمة ومتسقة، سهلة التحليل بأي لغة.',
    feature4Title: 'CORS مفعّل',
    feature4Desc: 'استدعِ API مباشرة من متصفحك أو واجهتك الأمامية.',
    faqTitle: 'الأسئلة الشائعة',
    faq1Q: 'هل API Utilyx مجانية فعلاً؟',
    faq1A: 'نعم، مجانية بالكامل. بدون بطاقة ائتمان. ينتهي مفتاحك بعد 5 أيام — فقط عد للموقع لتجديده.',
    faq2Q: 'لماذا ينتهي المفتاح بعد 5 أيام؟',
    faq2A: 'لمنع الإساءة وتشجيعك على العودة لـ Utilyx. التجديد فوري ومجاني.',
    faq3Q: 'ما هو حد الطلبات؟',
    faq3A: '100 طلب في الساعة لكل مفتاح API. كافٍ لمعظم المشاريع الشخصية والنماذج الأولية.',
    faq4Q: 'ما الأدوات المتاحة عبر API؟',
    faq4A: 'حالياً: عداد الكلمات، رمز QR و UUID. المزيد قريباً.',
    faq5Q: 'كيف أ المصادقة؟',
    faq5A: 'أضف مفتاحك في ترويسة Authorization: Bearer <مفتاحك> أو X-API-Key: <مفتاحك>.',
    tryItTitle: 'جرّب الآن',
    tryItDesc: 'احصل على مفتاح API المجاني وابدأ أتمتة مهامك في أقل من دقيقة.',
    getApiKeyBtn: 'احصل على مفتاح API مجاني',
    viewToolBtn: 'عرض الأدوات',
  },
  pt: {
    h1: 'API Gratuita Utilyx',
    subtitle: 'Automatize suas tarefas com nossa API gratuita. Sem cartão de crédito, cadastre-se em 30 segundos.',
    getStartedTitle: 'Comece em 3 passos',
    step1Title: 'Obtenha uma chave API',
    step1Desc: 'Crie uma chave API gratuita no Utilyx. Sem cadastro, apenas um email opcional.',
    step2Title: 'Chame os endpoints',
    step2Desc: 'Envie sua chave via Authorization: Bearer <key> ou X-API-Key.',
    step3Title: 'Processe os resultados',
    step3Desc: 'Receba respostas JSON estruturadas, prontas para integrar na sua aplicação.',
    endpointsTitle: 'Endpoints disponíveis',
    featuresTitle: 'Recursos da API',
    feature1Title: '100% gratuita',
    feature1Desc: 'Sem cartão de crédito, sem assinatura. Renove sua chave a cada 5 dias.',
    feature2Title: '100 requisições/hora',
    feature2Desc: 'Limite generoso para uso gratuito. Suficiente para a maioria dos projetos.',
    feature3Title: 'Respostas JSON',
    feature3Desc: 'Respostas estruturadas e consistentes, fáceis de analisar em qualquer linguagem.',
    feature4Title: 'CORS habilitado',
    feature4Desc: 'Chame a API diretamente do seu navegador ou frontend.',
    faqTitle: 'Perguntas frequentes',
    faq1Q: 'A API Utilyx é realmente gratuita?',
    faq1A: 'Sim, totalmente gratuita. Sem cartão de crédito. Sua chave expira após 5 dias — basta voltar ao site para regenerar.',
    faq2Q: 'Por que a chave expira após 5 dias?',
    faq2A: 'Para evitar abuso e encorajar você a retornar ao Utilyx. A regeneração é instantânea e gratuita.',
    faq3Q: 'Qual é o limite de requisições?',
    faq3A: '100 requisições por hora por chave API. Suficiente para a maioria dos projetos pessoais e protótipos.',
    faq4Q: 'Quais ferramentas são acessíveis via API?',
    faq4A: 'Atualmente: contador de palavras, QR code e UUID. Mais endpoints (OCR, compressão de imagens, etc.) em breve.',
    faq5Q: 'Como me autenticar?',
    faq5A: 'Adicione sua chave no cabeçalho Authorization: Bearer <sua-chave> ou X-API-Key: <sua-chave>.',
    tryItTitle: 'Experimente agora',
    tryItDesc: 'Obtenha sua chave API gratuita e comece a automatizar suas tarefas em menos de um minuto.',
    getApiKeyBtn: 'Obter chave API gratuita',
    viewToolBtn: 'Ver ferramentas',
  },
}

export default function ApiDocsContent() {
  const locale = useLocale()
  const c = content[locale] || content.en
  const dir = locale === 'ar' ? 'rtl' : 'ltr'

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: c.faq1Q, acceptedAnswer: { '@type': 'Answer', text: c.faq1A } },
      { '@type': 'Question', name: c.faq2Q, acceptedAnswer: { '@type': 'Answer', text: c.faq2A } },
      { '@type': 'Question', name: c.faq3Q, acceptedAnswer: { '@type': 'Answer', text: c.faq3A } },
      { '@type': 'Question', name: c.faq4Q, acceptedAnswer: { '@type': 'Answer', text: c.faq4A } },
      { '@type': 'Question', name: c.faq5Q, acceptedAnswer: { '@type': 'Answer', text: c.faq5A } },
    ],
  }

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: c.h1,
    description: c.subtitle,
    step: [
      { '@type': 'HowToStep', name: c.step1Title, text: c.step1Desc },
      { '@type': 'HowToStep', name: c.step2Title, text: c.step2Desc },
      { '@type': 'HowToStep', name: c.step3Title, text: c.step3Desc },
    ],
  }

  return (
    <div className="min-h-screen bg-background" dir={dir}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      <div className="max-w-4xl mx-auto px-4 py-12 sm:py-16">
        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <div className="rounded-xl bg-primary/10 p-2.5">
            <Code className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold">{c.h1}</h1>
        </div>
        <p className="text-lg text-muted-foreground mb-10 max-w-2xl">{c.subtitle}</p>

        {/* Get Started Steps */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">{c.getStartedTitle}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: <Key className="h-5 w-5" />, title: c.step1Title, desc: c.step1Desc },
              { icon: <Terminal className="h-5 w-5" />, title: c.step2Title, desc: c.step2Desc },
              { icon: <Zap className="h-5 w-5" />, title: c.step3Title, desc: c.step3Desc },
            ].map((step, i) => (
              <div key={i} className="border rounded-xl p-5 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary/10 text-primary text-sm font-bold">{i + 1}</span>
                  <span className="text-primary">{step.icon}</span>
                </div>
                <h3 className="font-semibold">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Available Endpoints */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">{c.endpointsTitle}</h2>
          <div className="space-y-4">
            {toolApis.map(tool => (
              <a key={tool.id} href={`/${locale}${tool.href}`} className="block border rounded-xl p-5 hover:border-primary/50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-primary">{tool.icon}</span>
                    <h3 className="font-semibold">{tool.label[locale] || tool.label.en}</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="font-mono text-xs">{tool.method}</Badge>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{tool.description[locale] || tool.description.en}</p>
                <code className="text-xs bg-muted px-2 py-1 rounded font-mono">{tool.endpoint}</code>
              </a>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">{c.featuresTitle}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: <Key className="h-5 w-5 text-emerald-500" />, title: c.feature1Title, desc: c.feature1Desc },
              { icon: <Zap className="h-5 w-5 text-amber-500" />, title: c.feature2Title, desc: c.feature2Desc },
              { icon: <Code className="h-5 w-5 text-primary" />, title: c.feature3Title, desc: c.feature3Desc },
              { icon: <Globe className="h-5 w-5 text-blue-500" />, title: c.feature4Title, desc: c.feature4Desc },
            ].map((f, i) => (
              <Card key={i}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    {f.icon} {f.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{f.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">{c.faqTitle}</h2>
          <div className="space-y-4">
            {[
              { q: c.faq1Q, a: c.faq1A },
              { q: c.faq2Q, a: c.faq2A },
              { q: c.faq3Q, a: c.faq3A },
              { q: c.faq4Q, a: c.faq4A },
              { q: c.faq5Q, a: c.faq5A },
            ].map((faq, i) => (
              <details key={i} className="border rounded-lg group">
                <summary className="cursor-pointer px-5 py-4 font-medium text-sm hover:bg-muted/50 rounded-lg flex items-center justify-between">
                  {faq.q}
                  <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-90" />
                </summary>
                <div className="px-5 pb-4 text-sm text-muted-foreground">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="border rounded-xl p-8 text-center bg-muted/30">
          <h2 className="text-2xl font-semibold mb-2">{c.tryItTitle}</h2>
          <p className="text-muted-foreground mb-6">{c.tryItDesc}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={`/${locale}/api-keys`}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <Key className="h-4 w-4" />
              {c.getApiKeyBtn}
            </a>
            <a
              href={`/${locale}`}
              className="inline-flex items-center justify-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-medium hover:bg-muted/50 transition-colors"
            >
              {c.viewToolBtn}
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}