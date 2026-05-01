'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useLocale } from 'next-intl'
import { Copy, Check, Key, AlertTriangle, Clock, Shield, RefreshCw, ArrowUpRight, Code, Terminal, BookOpen, HelpCircle } from 'lucide-react'
import { trackEvent } from '@/lib/analytics'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'

type KeyInfo = {
  id: string
  keyPrefix: string
  name: string | null
  plan: string
  status: string
  expiresAt: string
  createdAt: string
  lastUsedAt: string | null
  usageCount: number
}

const messages: Record<string, {
  title: string
  subtitle: string
  generateTitle: string
  nameLabel: string
  namePlaceholder: string
  emailLabel: string
  emailPlaceholder: string
  generateBtn: string
  generating: string
  successTitle: string
  successDesc: string
  copyKey: string
  copied: string
  keyWarning: string
  myKeysTitle: string
  lookupBtn: string
  noKeys: string
  status: string
  plan: string
  expires: string
  created: string
  usage: string
  revoke: string
  revoked: string
  revoking: string
  free: string
  active: string
  expired: string
  backHome: string
  featuresTitle: string
  feature1: string
  feature2: string
  feature3: string
  expiresCountdown: string
  days: string
  hours: string
  modalExpiredTitle: string
  modalExpiredDesc: string
  modalRegenerateBtn: string
  modalUpgradeBtn: string
  regenerateBtn: string
  regenerating: string
}> = {
  fr: {
    title: 'Clés API Gratuites',
    subtitle: 'Générez une clé API gratuite pour accéder aux outils Utilyx par programme.',
    generateTitle: 'Générer une clé',
    nameLabel: 'Nom (optionnel)',
    namePlaceholder: 'Ma clé API',
    emailLabel: 'Email (optionnel)',
    emailPlaceholder: 'vous@example.com',
    generateBtn: 'Générer une clé',
    generating: 'Génération...',
    successTitle: 'Clé générée !',
    successDesc: 'Copiez votre clé maintenant. Elle ne sera plus affichée en clair.',
    copyKey: 'Copier la clé',
    copied: 'Copiée !',
    keyWarning: 'Attention : cette clé ne sera affichée qu\'une seule fois. Copiez-la maintenant.',
    myKeysTitle: 'Mes clés',
    lookupBtn: 'Rechercher',
    noKeys: 'Aucune clé trouvée pour cet email.',
    status: 'Statut',
    plan: 'Plan',
    expires: 'Expire le',
    created: 'Créée le',
    usage: 'Utilisations',
    revoke: 'Révoquer',
    revoked: 'Révoquée',
    revoking: 'Révocation...',
    free: 'Gratuit',
    active: 'Active',
    expired: 'Expirée',
    backHome: 'Retour à l\'accueil',
    featuresTitle: 'Caractéristiques',
    feature1: 'Expiration automatique après 5 jours',
    feature2: '100 requêtes par heure par clé',
    feature3: 'Aucune inscription requise',
    expiresCountdown: 'Expire dans',
    days: 'jours',
    hours: 'heures',
    modalExpiredTitle: 'Votre clé API a expiré',
    modalExpiredDesc: 'Votre clé gratuite n\'est plus valide. Régénérez une nouvelle clé ou passez à l\'illimité.',
    modalRegenerateBtn: 'Régénérer une clé gratuite (5 jours)',
    modalUpgradeBtn: 'Passer à l\'illimité',
    regenerateBtn: 'Régénérer',
    regenerating: 'Régénération...',
  },
  en: {
    title: 'Free API Keys',
    subtitle: 'Generate a free API key to access Utilyx tools programmatically.',
    generateTitle: 'Generate a key',
    nameLabel: 'Name (optional)',
    namePlaceholder: 'My API key',
    emailLabel: 'Email (optional)',
    emailPlaceholder: 'you@example.com',
    generateBtn: 'Generate key',
    generating: 'Generating...',
    successTitle: 'Key generated!',
    successDesc: 'Copy your key now. It won\'t be shown in plain text again.',
    copyKey: 'Copy key',
    copied: 'Copied!',
    keyWarning: 'Warning: this key will only be displayed once. Copy it now.',
    myKeysTitle: 'My keys',
    lookupBtn: 'Lookup',
    noKeys: 'No keys found for this email.',
    status: 'Status',
    plan: 'Plan',
    expires: 'Expires',
    created: 'Created',
    usage: 'Usage',
    revoke: 'Revoke',
    revoked: 'Revoked',
    revoking: 'Revoking...',
    free: 'Free',
    active: 'Active',
    expired: 'Expired',
    backHome: 'Back to home',
    featuresTitle: 'Features',
    feature1: 'Auto-expires after 5 days',
    feature2: '100 requests per hour per key',
    feature3: 'No signup required',
    expiresCountdown: 'Expires in',
    days: 'days',
    hours: 'hours',
    modalExpiredTitle: 'Your API key has expired',
    modalExpiredDesc: 'Your free key is no longer valid. Regenerate a new key or upgrade to unlimited.',
    modalRegenerateBtn: 'Regenerate free key (5 days)',
    modalUpgradeBtn: 'Upgrade to Unlimited',
    regenerateBtn: 'Regenerate',
    regenerating: 'Regenerating...',
  },
  es: {
    title: 'Claves API Gratuitas',
    subtitle: 'Genera una clave API gratuita para acceder a las herramientas de Utilyx.',
    generateTitle: 'Generar clave',
    nameLabel: 'Nombre (opcional)',
    namePlaceholder: 'Mi clave API',
    emailLabel: 'Email (opcional)',
    emailPlaceholder: 'tu@ejemplo.com',
    generateBtn: 'Generar clave',
    generating: 'Generando...',
    successTitle: 'Clave generada',
    successDesc: 'Copia tu clave ahora. No se mostrará de nuevo.',
    copyKey: 'Copiar clave',
    copied: 'Copiada',
    keyWarning: 'Atención: esta clave solo se mostrará una vez. Cópiala ahora.',
    myKeysTitle: 'Mis claves',
    lookupBtn: 'Buscar',
    noKeys: 'No se encontraron claves para este email.',
    status: 'Estado',
    plan: 'Plan',
    expires: 'Expira',
    created: 'Creada',
    usage: 'Uso',
    revoke: 'Revocar',
    revoked: 'Revocada',
    revoking: 'Revocando...',
    free: 'Gratis',
    active: 'Activa',
    expired: 'Expirada',
    backHome: 'Volver al inicio',
    featuresTitle: 'Características',
    feature1: 'Expira automáticamente después de 5 días',
    feature2: '100 solicitudes por hora por clave',
    feature3: 'Sin registro requerido',
    expiresCountdown: 'Expira en',
    days: 'días',
    hours: 'horas',
    modalExpiredTitle: 'Tu clave API ha expirado',
    modalExpiredDesc: 'Tu clave gratuita ya no es válida. Regenera una nueva clave o pasa a ilimitado.',
    modalRegenerateBtn: 'Regenerar clave gratuita (5 días)',
    modalUpgradeBtn: 'Pasar a ilimitado',
    regenerateBtn: 'Regenerar',
    regenerating: 'Regenerando...',
  },
  de: {
    title: 'Kostenlose API-Schlüssel',
    subtitle: 'Generieren Sie einen kostenlosen API-Schlüssel für den programmatischen Zugriff auf Utilyx.',
    generateTitle: 'Schlüssel generieren',
    nameLabel: 'Name (optional)',
    namePlaceholder: 'Mein API-Schlüssel',
    emailLabel: 'E-Mail (optional)',
    emailPlaceholder: 'sie@beispiel.de',
    generateBtn: 'Schlüssel generieren',
    generating: 'Generiere...',
    successTitle: 'Schlüssel generiert!',
    successDesc: 'Kopieren Sie Ihren Schlüssel jetzt. Er wird nicht erneut angezeigt.',
    copyKey: 'Schlüssel kopieren',
    copied: 'Kopiert!',
    keyWarning: 'Warnung: Dieser Schlüssel wird nur einmal angezeigt. Kopieren Sie ihn jetzt.',
    myKeysTitle: 'Meine Schlüssel',
    lookupBtn: 'Suchen',
    noKeys: 'Keine Schlüssel für diese E-Mail gefunden.',
    status: 'Status',
    plan: 'Plan',
    expires: 'Läuft ab',
    created: 'Erstellt',
    usage: 'Nutzung',
    revoke: 'Widerrufen',
    revoked: 'Widerrufen',
    revoking: 'Widerrufe...',
    free: 'Kostenlos',
    active: 'Aktiv',
    expired: 'Abgelaufen',
    backHome: 'Zurück zur Startseite',
    featuresTitle: 'Funktionen',
    feature1: 'Läuft nach 5 Tagen automatisch ab',
    feature2: '100 Anfragen pro Stunde pro Schlüssel',
    feature3: 'Keine Anmeldung erforderlich',
    expiresCountdown: 'Läuft ab in',
    days: 'Tagen',
    hours: 'Stunden',
    modalExpiredTitle: 'Ihr API-Schlüssel ist abgelaufen',
    modalExpiredDesc: 'Ihr kostenloser Schlüssel ist nicht mehr gültig. Generieren Sie einen neuen oder upgraden Sie.',
    modalRegenerateBtn: 'Neuen Schlüssel generieren (5 Tage)',
    modalUpgradeBtn: 'Auf Unlimited upgraden',
    regenerateBtn: 'Regenerieren',
    regenerating: 'Regeneriere...',
  },
  ar: {
    title: 'مفاتيح API مجانية',
    subtitle: 'أنشئ مفتاح API مجاني للوصول البرمجي إلى أدوات Utilyx.',
    generateTitle: 'إنشاء مفتاح',
    nameLabel: 'الاسم (اختياري)',
    namePlaceholder: 'مفتاح API الخاص بي',
    emailLabel: 'البريد الإلكتروني (اختياري)',
    emailPlaceholder: 'you@example.com',
    generateBtn: 'إنشاء مفتاح',
    generating: 'جاري الإنشاء...',
    successTitle: 'تم إنشاء المفتاح!',
    successDesc: 'انسخ مفتاحك الآن. لن يظهر مرة أخرى.',
    copyKey: 'نسخ المفتاح',
    copied: 'تم النسخ!',
    keyWarning: 'تحذير: سيظهر هذا المفتاح مرة واحدة فقط. انسخه الآن.',
    myKeysTitle: 'مفاتيحي',
    lookupBtn: 'بحث',
    noKeys: 'لم يتم العثور على مفاتيح لهذا البريد.',
    status: 'الحالة',
    plan: 'الخطة',
    expires: 'ينتهي في',
    created: 'أنشئ في',
    usage: 'الاستخدام',
    revoke: 'إلغاء',
    revoked: 'ملغى',
    revoking: 'جاري الإلغاء...',
    free: 'مجاني',
    active: 'نشط',
    expired: 'منتهي',
    backHome: 'العودة للرئيسية',
    featuresTitle: 'المميزات',
    feature1: 'ينتهي تلقائيًا بعد 5 أيام',
    feature2: '100 طلب في الساعة لكل مفتاح',
    feature3: 'بدون تسجيل',
    expiresCountdown: 'ينتهي في',
    days: 'أيام',
    hours: 'ساعات',
    modalExpiredTitle: 'انتهت صلاحية مفتاح API',
    modalExpiredDesc: 'مفتاحك المجاني لم يعد صالحاً. أنشئ مفتاحاً جديداً أو انتقل إلى غير المحدود.',
    modalRegenerateBtn: 'إنشاء مفتاح مجاني (5 أيام)',
    modalUpgradeBtn: 'الانتقال إلى غير المحدود',
    regenerateBtn: 'إعادة إنشاء',
    regenerating: 'جاري إعادة الإنشاء...',
  },
  pt: {
    title: 'Chaves API Gratuitas',
    subtitle: 'Gere uma chave API gratuita para acessar as ferramentas Utilyx programaticamente.',
    generateTitle: 'Gerar chave',
    nameLabel: 'Nome (opcional)',
    namePlaceholder: 'Minha chave API',
    emailLabel: 'Email (opcional)',
    emailPlaceholder: 'voce@exemplo.com',
    generateBtn: 'Gerar chave',
    generating: 'Gerando...',
    successTitle: 'Chave gerada!',
    successDesc: 'Copie sua chave agora. Ela não será exibida novamente.',
    copyKey: 'Copiar chave',
    copied: 'Copiada!',
    keyWarning: 'Aviso: esta chave será exibida apenas uma vez. Copie-a agora.',
    myKeysTitle: 'Minhas chaves',
    lookupBtn: 'Buscar',
    noKeys: 'Nenhuma chave encontrada para este email.',
    status: 'Status',
    plan: 'Plano',
    expires: 'Expira em',
    created: 'Criada em',
    usage: 'Uso',
    revoke: 'Revogar',
    revoked: 'Revogada',
    revoking: 'Revogando...',
    free: 'Gratuito',
    active: 'Ativa',
    expired: 'Expirada',
    backHome: 'Voltar ao início',
    featuresTitle: 'Recursos',
    feature1: 'Expira automaticamente após 5 dias',
    feature2: '100 requisições por hora por chave',
    feature3: 'Sem cadastro necessário',
    expiresCountdown: 'Expira em',
    days: 'dias',
    hours: 'horas',
    modalExpiredTitle: 'Sua chave API expirou',
    modalExpiredDesc: 'Sua chave gratuita não é mais válida. Regenere uma nova ou atualize para ilimitado.',
    modalRegenerateBtn: 'Regenerar chave gratuita (5 dias)',
    modalUpgradeBtn: 'Atualizar para Ilimitado',
    regenerateBtn: 'Regenerar',
    regenerating: 'Regenerando...',
  },
}

const docMessages: Record<string, {
  howItWorksTitle: string
  howItWorksSteps: string[]
  apiDocsTitle: string
  apiDocsIntro: string
  apiEndpoints: { method: string; path: string; desc: string }[]
  authTitle: string
  authDesc: string
  authExample: string
  curlExamplesTitle: string
  curlExamples: { label: string; curl: string }[]
  faqTitle: string
  faqItems: { q: string; a: string }[]
}> = {
  fr: {
    howItWorksTitle: 'Comment ça marche',
    howItWorksSteps: [
      'Générez votre clé API gratuite en un clic — aucune inscription requise',
      'Copiez votre clé et ajoutez-la à vos requêtes HTTP (header Authorization: Bearer)',
      'Appelez les endpoints Utilyx (compression d\'images, OCR, etc.) avec votre clé',
      'Votre clé expire automatiquement après 5 jours — régénérez-en une gratuitement',
    ],
    apiDocsTitle: 'Documentation API',
    apiDocsIntro: 'L\'API REST Utilyx vous permet d\'intégrer nos outils directement dans vos applications. Toutes les requêtes nécessitent une clé API valide dans le header.',
    apiEndpoints: [
      { method: 'POST', path: '/api/api-keys', desc: 'Générer une nouvelle clé API gratuite' },
      { method: 'GET', path: '/api/api-keys/validate', desc: 'Vérifier la validité d\'une clé API' },
      { method: 'POST', path: '/api/image-compress', desc: 'Compresser une image (multipart/form-data)' },
      { method: 'POST', path: '/api/ocr', desc: 'Extraire le texte d\'une image (OCR)' },
      { method: 'GET', path: '/api/api-keys/features', desc: 'Lister les fonctionnalités accessibles' },
    ],
    authTitle: 'Authentification',
    authDesc: 'Passez votre clé API dans le header Authorization ou X-API-Key de chaque requête :',
    authExample: 'Authorization: Bearer utilyx_votre_cle_api',
    curlExamplesTitle: 'Exemples curl',
    curlExamples: [
      { label: 'Générer une clé', curl: "curl -X POST https://utilyx.app/api/api-keys \\\n  -H 'Content-Type: application/json' \\\n  -d '{\"name\":\"Ma clé\",\"email\":\"vous@exemple.com\"}'" },
      { label: 'Valider une clé', curl: "curl https://utilyx.app/api/api-keys/validate \\\n  -H 'Authorization: Bearer utilyx_votre_cle_api'" },
      { label: 'Rechercher vos clés', curl: "curl 'https://utilyx.app/api/api-keys?email=vous@exemple.com'" },
      { label: 'Révoquer une clé', curl: "curl -X DELETE https://utilyx.app/api/api-keys \\\n  -H 'Content-Type: application/json' \\\n  -d '{\"id\":\"votre_cle_id\",\"email\":\"vous@exemple.com\"}'" },
      { label: 'Compresser une image', curl: "curl -X POST https://utilyx.app/api/image-compress \\\n  -H 'Authorization: Bearer utilyx_votre_cle_api' \\\n  -F 'file=@photo.jpg'" },
      { label: 'OCR — Extraire du texte', curl: "curl -X POST https://utilyx.app/api/ocr \\\n  -H 'Authorization: Bearer utilyx_votre_cle_api' \\\n  -F 'file=@document.png' \\\n  -F 'lang=fra'" },
    ],
    faqTitle: 'Questions fréquentes',
    faqItems: [
      { q: 'Comment obtenir une clé API gratuite ?', a: 'Rendez-vous sur cette page, entrez éventuellement votre email et cliquez sur "Générer une clé". Votre clé est créée instantanément, sans inscription ni carte bancaire.' },
      { q: 'Combien de requêtes puis-je faire ?', a: 'La clé gratuite permet 100 requêtes par heure par clé. C\'est suffisant pour tester l\'API et automatiser des tâches légères.' },
      { q: 'Combien de temps dure une clé ?', a: 'La clé API gratuite expire automatiquement après 5 jours. Vous pouvez régénérer une nouvelle clé gratuitement à tout moment.' },
      { q: 'Mes données sont-elles sécurisées ?', a: 'Oui. Les clés API sont stockées sous forme de hachage SHA-256. La clé complète n\'est affichée qu\'une seule fois et n\'est jamais stockée en clair.' },
      { q: 'Quels outils sont disponibles via l\'API ?', a: 'L\'API donne accès à la compression d\'images, l\'OCR, et d\'autres outils. De nouveaux endpoints sont ajoutés régulièrement.' },
      { q: 'Puis-je révoquer ma clé ?', a: 'Oui, vous pouvez révoquer votre clé à tout moment depuis la section "Mes clés" en recherchant par email.' },
    ],
  },
  en: {
    howItWorksTitle: 'How it works',
    howItWorksSteps: [
      'Generate your free API key in one click — no signup required',
      'Copy your key and add it to your HTTP requests (Authorization: Bearer header)',
      'Call Utilyx endpoints (image compression, OCR, etc.) with your key',
      'Your key auto-expires after 5 days — regenerate a new one for free',
    ],
    apiDocsTitle: 'API Documentation',
    apiDocsIntro: 'The Utilyx REST API lets you integrate our tools directly into your applications. All requests require a valid API key in the header.',
    apiEndpoints: [
      { method: 'POST', path: '/api/api-keys', desc: 'Generate a new free API key' },
      { method: 'GET', path: '/api/api-keys/validate', desc: 'Check if an API key is valid' },
      { method: 'POST', path: '/api/image-compress', desc: 'Compress an image (multipart/form-data)' },
      { method: 'POST', path: '/api/ocr', desc: 'Extract text from an image (OCR)' },
      { method: 'GET', path: '/api/api-keys/features', desc: 'List available API features' },
    ],
    authTitle: 'Authentication',
    authDesc: 'Pass your API key in the Authorization or X-API-Key header of each request:',
    authExample: 'Authorization: Bearer utilyx_your_api_key',
    curlExamplesTitle: 'curl examples',
    curlExamples: [
      { label: 'Generate a key', curl: "curl -X POST https://utilyx.app/api/api-keys \\\n  -H 'Content-Type: application/json' \\\n  -d '{\"name\":\"My key\",\"email\":\"you@example.com\"}'" },
      { label: 'Validate a key', curl: "curl https://utilyx.app/api/api-keys/validate \\\n  -H 'Authorization: Bearer utilyx_your_api_key'" },
      { label: 'Look up your keys', curl: "curl 'https://utilyx.app/api/api-keys?email=you@example.com'" },
      { label: 'Revoke a key', curl: "curl -X DELETE https://utilyx.app/api/api-keys \\\n  -H 'Content-Type: application/json' \\\n  -d '{\"id\":\"your_key_id\",\"email\":\"you@example.com\"}'" },
      { label: 'Compress an image', curl: "curl -X POST https://utilyx.app/api/image-compress \\\n  -H 'Authorization: Bearer utilyx_your_api_key' \\\n  -F 'file=@photo.jpg'" },
      { label: 'OCR — Extract text', curl: "curl -X POST https://utilyx.app/api/ocr \\\n  -H 'Authorization: Bearer utilyx_your_api_key' \\\n  -F 'file=@document.png' \\\n  -F 'lang=eng'" },
    ],
    faqTitle: 'Frequently asked questions',
    faqItems: [
      { q: 'How do I get a free API key?', a: 'Visit this page, optionally enter your email, and click "Generate key". Your key is created instantly with no signup or credit card required.' },
      { q: 'How many requests can I make?', a: 'The free key allows 100 requests per hour per key. This is sufficient for testing the API and automating lightweight tasks.' },
      { q: 'How long does a key last?', a: 'The free API key auto-expires after 5 days. You can regenerate a new key for free at any time.' },
      { q: 'Is my data secure?', a: 'Yes. API keys are stored as SHA-256 hashes. The full key is only displayed once during creation and never stored in plaintext.' },
      { q: 'Which tools are available via the API?', a: 'The API provides access to image compression, OCR, and other tools. New endpoints are added regularly.' },
      { q: 'Can I revoke my key?', a: 'Yes, you can revoke your key at any time from the "My keys" section by searching with your email.' },
    ],
  },
  es: {
    howItWorksTitle: 'Cómo funciona',
    howItWorksSteps: [
      'Genera tu clave API gratuita en un clic — sin registro requerido',
      'Copia tu clave y añádela a tus solicitudes HTTP (header Authorization: Bearer)',
      'Llama a los endpoints de Utilyx (compresión de imágenes, OCR, etc.) con tu clave',
      'Tu clave expira automáticamente después de 5 días — regenera una nueva gratis',
    ],
    apiDocsTitle: 'Documentación de la API',
    apiDocsIntro: 'La API REST de Utilyx te permite integrar nuestras herramientas directamente en tus aplicaciones. Todas las solicitudes requieren una clave API válida en el header.',
    apiEndpoints: [
      { method: 'POST', path: '/api/api-keys', desc: 'Generar una nueva clave API gratuita' },
      { method: 'GET', path: '/api/api-keys/validate', desc: 'Verificar si una clave API es válida' },
      { method: 'POST', path: '/api/image-compress', desc: 'Comprimir una imagen (multipart/form-data)' },
      { method: 'POST', path: '/api/ocr', desc: 'Extraer texto de una imagen (OCR)' },
      { method: 'GET', path: '/api/api-keys/features', desc: 'Listar las funciones disponibles' },
    ],
    authTitle: 'Autenticación',
    authDesc: 'Pasa tu clave API en el header Authorization o X-API-Key de cada solicitud:',
    authExample: 'Authorization: Bearer utilyx_tu_clave_api',
    curlExamplesTitle: 'Ejemplos curl',
    curlExamples: [
      { label: 'Generar una clave', curl: "curl -X POST https://utilyx.app/api/api-keys \\\n  -H 'Content-Type: application/json' \\\n  -d '{\"name\":\"Mi clave\",\"email\":\"tu@ejemplo.com\"}'" },
      { label: 'Validar una clave', curl: "curl https://utilyx.app/api/api-keys/validate \\\n  -H 'Authorization: Bearer utilyx_tu_clave_api'" },
      { label: 'Buscar tus claves', curl: "curl 'https://utilyx.app/api/api-keys?email=tu@ejemplo.com'" },
      { label: 'Revocar una clave', curl: "curl -X DELETE https://utilyx.app/api/api-keys \\\n  -H 'Content-Type: application/json' \\\n  -d '{\"id\":\"tu_clave_id\",\"email\":\"tu@ejemplo.com\"}'" },
      { label: 'Comprimir una imagen', curl: "curl -X POST https://utilyx.app/api/image-compress \\\n  -H 'Authorization: Bearer utilyx_tu_clave_api' \\\n  -F 'file=@foto.jpg'" },
      { label: 'OCR — Extraer texto', curl: "curl -X POST https://utilyx.app/api/ocr \\\n  -H 'Authorization: Bearer utilyx_tu_clave_api' \\\n  -F 'file=@documento.png' \\\n  -F 'lang=spa'" },
    ],
    faqTitle: 'Preguntas frecuentes',
    faqItems: [
      { q: '¿Cómo obtengo una clave API gratuita?', a: 'Visita esta página, introduce tu email opcionalmente y haz clic en "Generar clave". Tu clave se crea al instante sin registro ni tarjeta de crédito.' },
      { q: '¿Cuántas solicitudes puedo hacer?', a: 'La clave gratuita permite 100 solicitudes por hora por clave. Es suficiente para probar la API y automatizar tareas ligeras.' },
      { q: '¿Cuánto dura una clave?', a: 'La clave API gratuita expira automáticamente después de 5 días. Puedes regenerar una nueva clave gratis en cualquier momento.' },
      { q: '¿Son seguros mis datos?', a: 'Sí. Las claves API se almacenan como hashes SHA-256. La clave completa solo se muestra una vez durante la creación y nunca se almacena en texto plano.' },
      { q: '¿Qué herramientas están disponibles vía API?', a: 'La API da acceso a compresión de imágenes, OCR y otras herramientas. Se añaden nuevos endpoints regularmente.' },
      { q: '¿Puedo revocar mi clave API?', a: 'Sí, puedes revocar tu clave en cualquier momento desde la sección "Mis claves" buscando con tu email.' },
    ],
  },
  de: {
    howItWorksTitle: 'So funktioniert es',
    howItWorksSteps: [
      'Generieren Sie Ihren kostenlosen API-Schlüssel mit einem Klick — keine Anmeldung erforderlich',
      'Kopieren Sie Ihren Schlüssel und fügen Sie ihn zu Ihren HTTP-Anfragen hinzu (Authorization: Bearer Header)',
      'Rufen Sie Utilyx-Endpunkte (Bildkomprimierung, OCR usw.) mit Ihrem Schlüssel auf',
      'Ihr Schlüssel läuft nach 5 Tagen automatisch ab — generieren Sie kostenlos einen neuen',
    ],
    apiDocsTitle: 'API-Dokumentation',
    apiDocsIntro: 'Die Utilyx REST-API ermöglicht die direkte Integration unserer Tools in Ihre Anwendungen. Alle Anfragen erfordern einen gültigen API-Schlüssel im Header.',
    apiEndpoints: [
      { method: 'POST', path: '/api/api-keys', desc: 'Neuen kostenlosen API-Schlüssel generieren' },
      { method: 'GET', path: '/api/api-keys/validate', desc: 'Prüfen, ob ein API-Schlüssel gültig ist' },
      { method: 'POST', path: '/api/image-compress', desc: 'Ein Bild komprimieren (multipart/form-data)' },
      { method: 'POST', path: '/api/ocr', desc: 'Text aus einem Bild extrahieren (OCR)' },
      { method: 'GET', path: '/api/api-keys/features', desc: 'Verfügbare API-Funktionen auflisten' },
    ],
    authTitle: 'Authentifizierung',
    authDesc: 'Übergeben Sie Ihren API-Schlüssel im Authorization- oder X-API-Key-Header jeder Anfrage:',
    authExample: 'Authorization: Bearer utilyx_ihr_api_schluessel',
    curlExamplesTitle: 'curl-Beispiele',
    curlExamples: [
      { label: 'Schlüssel generieren', curl: "curl -X POST https://utilyx.app/api/api-keys \\\n  -H 'Content-Type: application/json' \\\n  -d '{\"name\":\"Mein Schlüssel\",\"email\":\"sie@beispiel.de\"}'" },
      { label: 'Schlüssel validieren', curl: "curl https://utilyx.app/api/api-keys/validate \\\n  -H 'Authorization: Bearer utilyx_ihr_api_schluessel'" },
      { label: 'Schlüssel suchen', curl: "curl 'https://utilyx.app/api/api-keys?email=sie@beispiel.de'" },
      { label: 'Schlüssel widerrufen', curl: "curl -X DELETE https://utilyx.app/api/api-keys \\\n  -H 'Content-Type: application/json' \\\n  -d '{\"id\":\"schluessel_id\",\"email\":\"sie@beispiel.de\"}'" },
      { label: 'Bild komprimieren', curl: "curl -X POST https://utilyx.app/api/image-compress \\\n  -H 'Authorization: Bearer utilyx_ihr_api_schluessel' \\\n  -F 'file=@foto.jpg'" },
      { label: 'OCR — Text extrahieren', curl: "curl -X POST https://utilyx.app/api/ocr \\\n  -H 'Authorization: Bearer utilyx_ihr_api_schluessel' \\\n  -F 'file=@dokument.png' \\\n  -F 'lang=deu'" },
    ],
    faqTitle: 'Häufig gestellte Fragen',
    faqItems: [
      { q: 'Wie erhalte ich einen kostenlosen API-Schlüssel?', a: 'Besuchen Sie diese Seite, geben Sie optional Ihre E-Mail ein und klicken Sie auf "Schlüssel generieren". Ihr Schlüssel wird sofort ohne Anmeldung erstellt.' },
      { q: 'Wie viele Anfragen kann ich stellen?', a: 'Der kostenlose Schlüssel erlaubt 100 Anfragen pro Stunde pro Schlüssel. Dies reicht zum Testen der API und zur Automatisierung leichter Aufgaben.' },
      { q: 'Wie lange gilt ein Schlüssel?', a: 'Der kostenlose API-Schlüssel läuft nach 5 Tagen automatisch ab. Sie können jederzeit einen neuen Schlüssel kostenlos generieren.' },
      { q: 'Sind meine Daten sicher?', a: 'Ja. API-Schlüssel werden als SHA-256-Hashes gespeichert. Der vollständige Schlüssel wird nur einmal bei der Erstellung angezeigt und niemals im Klartext gespeichert.' },
      { q: 'Welche Tools sind über die API zugänglich?', a: 'Die API bietet Zugang zu Bildkomprimierung, OCR und weiteren Tools. Neue Endpunkte werden regelmäßig hinzugefügt.' },
      { q: 'Kann ich meinen API-Schlüssel widerrufen?', a: 'Ja, Sie können Ihren Schlüssel jederzeit über den Bereich "Meine Schlüssel" widerrufen, indem Sie nach Ihrer E-Mail suchen.' },
    ],
  },
  ar: {
    howItWorksTitle: 'كيف يعمل',
    howItWorksSteps: [
      'أنشئ مفتاح API المجاني بنقرة واحدة — بدون تسجيل',
      'انسخ مفتاحك وأضفه إلى طلبات HTTP (رأس Authorization: Bearer)',
      'استدعِ نقاط نهاية Utilyx (ضغط الصور، OCR، إلخ) بمفتاحك',
      'ينتهي مفتاحك تلقائيًا بعد 5 أيام — أنشئ مفتاحًا جديدًا مجانًا',
    ],
    apiDocsTitle: 'توثيق API',
    apiDocsIntro: 'يتيح لك REST API من Utilyx دمج أدواتنا مباشرة في تطبيقاتك. تتطلب جميع الطلبات مفتاح API صالح في الرأس.',
    apiEndpoints: [
      { method: 'POST', path: '/api/api-keys', desc: 'إنشاء مفتاح API مجاني جديد' },
      { method: 'GET', path: '/api/api-keys/validate', desc: 'التحقق من صلاحية مفتاح API' },
      { method: 'POST', path: '/api/image-compress', desc: 'ضغط صورة (multipart/form-data)' },
      { method: 'POST', path: '/api/ocr', desc: 'استخراج النص من صورة (OCR)' },
      { method: 'GET', path: '/api/api-keys/features', desc: 'عرض الميزات المتاحة' },
    ],
    authTitle: 'المصادقة',
    authDesc: 'مرر مفتاح API في رأس Authorization أو X-API-Key لكل طلب:',
    authExample: 'Authorization: Bearer utilyx_مفتاحك_هنا',
    curlExamplesTitle: 'أمثلة curl',
    curlExamples: [
      { label: 'إنشاء مفتاح', curl: "curl -X POST https://utilyx.app/api/api-keys \\\n  -H 'Content-Type: application/json' \\\n  -d '{\"name\":\"مفتاحي\",\"email\":\"you@example.com\"}'" },
      { label: 'التحقق من مفتاح', curl: "curl https://utilyx.app/api/api-keys/validate \\\n  -H 'Authorization: Bearer utilyx_مفتاحك_هنا'" },
      { label: 'البحث عن مفاتيحك', curl: "curl 'https://utilyx.app/api/api-keys?email=you@example.com'" },
      { label: 'إلغاء مفتاح', curl: "curl -X DELETE https://utilyx.app/api/api-keys \\\n  -H 'Content-Type: application/json' \\\n  -d '{\"id\":\"معرف_المفتاح\",\"email\":\"you@example.com\"}'" },
      { label: 'ضغط صورة', curl: "curl -X POST https://utilyx.app/api/image-compress \\\n  -H 'Authorization: Bearer utilyx_مفتاحك_هنا' \\\n  -F 'file=@photo.jpg'" },
      { label: 'OCR — استخراج النص', curl: "curl -X POST https://utilyx.app/api/ocr \\\n  -H 'Authorization: Bearer utilyx_مفتاحك_هنا' \\\n  -F 'file=@document.png' \\\n  -F 'lang=ara'" },
    ],
    faqTitle: 'الأسئلة الشائعة',
    faqItems: [
      { q: 'كيف أحصل على مفتاح API مجاني؟', a: 'قم بزيارة هذه الصفحة، أدخل بريدك الإلكتروني اختياريًا وانقر على "إنشاء مفتاح". يتم إنشاء مفتاحك فورًا بدون تسجيل أو بطاقة ائتمان.' },
      { q: 'كم عدد الطلبات التي يمكنني تقديمها؟', a: 'يتيح المفتاح المجاني 100 طلب في الساعة لكل مفتاح. هذا كافٍ لاختبار API وأتمتة المهام الخفيفة.' },
      { q: 'كم مدة صلاحية المفتاح؟', a: 'ينتهي مفتاح API المجاني تلقائيًا بعد 5 أيام. يمكنك إنشاء مفتاح جديد مجانًا في أي وقت.' },
      { q: 'هل بياناتي آمنة؟', a: 'نعم. يتم تخزين مفاتيح API كتجزئة SHA-256. يظهر المفتاح الكامل مرة واحدة فقط ولا يتم تخزينه أبدًا بنص عادي.' },
      { q: 'ما الأدوات المتاحة عبر API؟', a: 'توفر API الوصول إلى ضغط الصور والتعرف على النصوص (OCR) وأدوات أخرى. تتم إضافة نقاط نهاية جديدة بانتظام.' },
      { q: 'هل يمكنني إلغاء مفتاحي؟', a: 'نعم، يمكنك إلغاء مفتاحك في أي وقت من قسم "مفاتيحي" بالبحث عبر بريدك الإلكتروني.' },
    ],
  },
  pt: {
    howItWorksTitle: 'Como funciona',
    howItWorksSteps: [
      'Gere sua chave API gratuita em um clique — sem cadastro necessário',
      'Copie sua chave e adicione às suas requisições HTTP (header Authorization: Bearer)',
      'Chame os endpoints do Utilyx (compressão de imagens, OCR, etc.) com sua chave',
      'Sua chave expira automaticamente após 5 dias — regenere uma nova gratuitamente',
    ],
    apiDocsTitle: 'Documentação da API',
    apiDocsIntro: 'A API REST do Utilyx permite integrar nossas ferramentas diretamente em seus aplicativos. Todas as requisições exigem uma chave API válida no header.',
    apiEndpoints: [
      { method: 'POST', path: '/api/api-keys', desc: 'Gerar uma nova chave API gratuita' },
      { method: 'GET', path: '/api/api-keys/validate', desc: 'Verificar se uma chave API é válida' },
      { method: 'POST', path: '/api/image-compress', desc: 'Comprimir uma imagem (multipart/form-data)' },
      { method: 'POST', path: '/api/ocr', desc: 'Extrair texto de uma imagem (OCR)' },
      { method: 'GET', path: '/api/api-keys/features', desc: 'Listar recursos disponíveis da API' },
    ],
    authTitle: 'Autenticação',
    authDesc: 'Passe sua chave API no header Authorization ou X-API-Key de cada requisição:',
    authExample: 'Authorization: Bearer utilyx_sua_chave_api',
    curlExamplesTitle: 'Exemplos curl',
    curlExamples: [
      { label: 'Gerar uma chave', curl: "curl -X POST https://utilyx.app/api/api-keys \\\n  -H 'Content-Type: application/json' \\\n  -d '{\"name\":\"Minha chave\",\"email\":\"voce@exemplo.com\"}'" },
      { label: 'Validar uma chave', curl: "curl https://utilyx.app/api/api-keys/validate \\\n  -H 'Authorization: Bearer utilyx_sua_chave_api'" },
      { label: 'Buscar suas chaves', curl: "curl 'https://utilyx.app/api/api-keys?email=voce@exemplo.com'" },
      { label: 'Revogar uma chave', curl: "curl -X DELETE https://utilyx.app/api/api-keys \\\n  -H 'Content-Type: application/json' \\\n  -d '{\"id\":\"id_da_chave\",\"email\":\"voce@exemplo.com\"}'" },
      { label: 'Comprimir uma imagem', curl: "curl -X POST https://utilyx.app/api/image-compress \\\n  -H 'Authorization: Bearer utilyx_sua_chave_api' \\\n  -F 'file=@foto.jpg'" },
      { label: 'OCR — Extrair texto', curl: "curl -X POST https://utilyx.app/api/ocr \\\n  -H 'Authorization: Bearer utilyx_sua_chave_api' \\\n  -F 'file=@documento.png' \\\n  -F 'lang=por'" },
    ],
    faqTitle: 'Perguntas frequentes',
    faqItems: [
      { q: 'Como obter uma chave API gratuita?', a: 'Acesse esta página, insira opcionalmente seu email e clique em "Gerar chave". Sua chave é criada instantaneamente, sem cadastro ou cartão de crédito.' },
      { q: 'Quantas requisições posso fazer?', a: 'A chave gratuita permite 100 requisições por hora por chave. É suficiente para testar a API e automatizar tarefas leves.' },
      { q: 'Quanto tempo dura uma chave?', a: 'A chave API gratuita expira automaticamente após 5 dias. Você pode regenerar uma nova chave gratuitamente a qualquer momento.' },
      { q: 'Meus dados estão seguros?', a: 'Sim. As chaves API são armazenadas como hashes SHA-256. A chave completa é exibida apenas uma vez durante a criação e nunca é armazenada em texto plano.' },
      { q: 'Quais ferramentas estão disponíveis via API?', a: 'A API dá acesso à compressão de imagens, OCR (reconhecimento de texto) e outras ferramentas. Novos endpoints são adicionados regularmente.' },
      { q: 'Posso revogar minha chave API?', a: 'Sim, você pode revogar sua chave a qualquer momento na seção "Minhas chaves" pesquisando pelo email.' },
    ],
  },
}

export default function ApiKeysContent() {
  const locale = useLocale()
  const msg = messages[locale] || messages.en
  const doc = docMessages[locale] || docMessages.en

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [generating, setGenerating] = useState(false)
  const [newKey, setNewKey] = useState<string | null>(null)
  const [newKeyExpires, setNewKeyExpires] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showNewKey, setShowNewKey] = useState(false)

  const [lookupEmail, setLookupEmail] = useState('')
  const [myKeys, setMyKeys] = useState<KeyInfo[]>([])
  const [lookupLoading, setLookupLoading] = useState(false)
  const [revokingId, setRevokingId] = useState<string | null>(null)

  // Conversion modal state
  const [showModal, setShowModal] = useState(false)
  const [modalContext, setModalContext] = useState<'expired' | 'regenerate'>('expired')
  const [regenerating, setRegenerating] = useState(false)

  // Countdown timer for generated key
  const [countdown, setCountdown] = useState<string | null>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const updateCountdown = useCallback(() => {
    if (!newKeyExpires) return
    const now = Date.now()
    const expires = new Date(newKeyExpires).getTime()
    const diff = expires - now
    if (diff <= 0) {
      setCountdown(null)
      if (intervalRef.current) clearInterval(intervalRef.current)
      return
    }
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    setCountdown(`${days} ${msg.days}, ${hours} ${msg.hours}`)
  }, [newKeyExpires, msg.days, msg.hours])

  useEffect(() => {
    if (newKeyExpires) {
      updateCountdown()
      intervalRef.current = setInterval(updateCountdown, 60000)
      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current)
      }
    }
    setCountdown(null)
  }, [newKeyExpires, updateCountdown])

  const handleGenerate = async () => {
    setGenerating(true)
    setError(null)
    setNewKey(null)

    try {
      const res = await fetch('/api/api-keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name || undefined, email: email || undefined }),
      })
      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Failed to generate key')
        return
      }

      setNewKey(data.data.key)
      setNewKeyExpires(data.data.expiresAt)
      setName('')
      setEmail('')
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setGenerating(false)
    }
  }

  const handleCopy = () => {
    if (!newKey) return
    navigator.clipboard.writeText(newKey)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleLookup = async () => {
    if (!lookupEmail) return
    setLookupLoading(true)

    try {
      const res = await fetch(`/api/api-keys?email=${encodeURIComponent(lookupEmail)}`)
      const data = await res.json()
      setMyKeys(data.data || [])
    } catch {
      setMyKeys([])
    } finally {
      setLookupLoading(false)
    }
  }

  const handleRevoke = async (id: string) => {
    setRevokingId(id)
    try {
      await fetch('/api/api-keys', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })
      setMyKeys(prev => prev.map(k => k.id === id ? { ...k, status: 'revoked' } : k))
    } catch {
      // ignore
    } finally {
      setRevokingId(null)
    }
  }

  const openConversionModal = (context: 'expired' | 'regenerate') => {
    setModalContext(context)
    setShowModal(true)
    trackEvent('conversion_modal_shown', { context })
  }

  const handleRegenerate = async () => {
    setRegenerating(true)
    try {
      const res = await fetch('/api/api-keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name || undefined, email: email || undefined }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Failed to regenerate key')
        return
      }
      setNewKey(data.data.key)
      setNewKeyExpires(data.data.expiresAt)
      setShowModal(false)
      setName('')
      setEmail('')
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setRegenerating(false)
    }
  }

  const statusBadge = (status: string) => {
    const colors: Record<string, string> = {
      active: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
      expired: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
      revoked: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    }
    const label: Record<string, string> = {
      active: msg.active,
      expired: msg.expired,
      revoked: msg.revoked,
    }
    return (
      <Badge className={colors[status] || ''} variant="secondary">
        {label[status] || status}
      </Badge>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 py-12 sm:py-16">
        <a href={`/${locale}`} className="text-sm text-muted-foreground hover:text-foreground mb-8 inline-block">
          &larr; {msg.backHome}
        </a>

        <div className="flex items-center gap-3 mb-2">
          <div className="rounded-xl bg-primary/10 p-2.5">
            <Key className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold">{msg.title}</h1>
        </div>
        <p className="text-muted-foreground mb-8">{msg.subtitle}</p>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50 text-sm">
            <Clock className="h-4 w-4 text-amber-500 shrink-0" />
            <span>{msg.feature1}</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50 text-sm">
            <Shield className="h-4 w-4 text-emerald-500 shrink-0" />
            <span>{msg.feature2}</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50 text-sm">
            <Key className="h-4 w-4 text-primary shrink-0" />
            <span>{msg.feature3}</span>
          </div>
        </div>

        {/* Generate Key */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg">{msg.generateTitle}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">{msg.nameLabel}</label>
              <Input
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder={msg.namePlaceholder}
                maxLength={100}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">{msg.emailLabel}</label>
              <Input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder={msg.emailPlaceholder}
                maxLength={255}
              />
            </div>

            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}

            {newKey ? (
              <div className="space-y-3">
                <div className="rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 p-4">
                  <p className="text-sm font-medium text-emerald-700 dark:text-emerald-400 mb-2">{msg.successTitle}</p>
                  <p className="text-xs text-muted-foreground mb-3">{msg.successDesc}</p>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 text-xs bg-background border rounded px-3 py-2 font-mono break-all">
                      {newKey}
                    </code>
                    <Button size="sm" variant="outline" onClick={handleCopy}>
                      {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                      {copied ? msg.copied : msg.copyKey}
                    </Button>
                  </div>
                  {newKeyExpires && (
                    <div className="flex flex-col gap-0.5 mt-2">
                      <p className="text-xs text-muted-foreground">
                        {msg.expires}: {new Date(newKeyExpires).toLocaleDateString()}
                      </p>
                      {countdown && (
                        <p className="text-xs font-medium text-amber-600 dark:text-amber-400">
                          <Clock className="h-3 w-3 inline mr-1" />
                          {msg.expiresCountdown} {countdown}
                        </p>
                      )}
                    </div>
                  )}
                </div>
                <div className="flex items-start gap-2 text-amber-600 dark:text-amber-400 text-xs">
                  <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>{msg.keyWarning}</span>
                </div>
              </div>
            ) : (
              <Button onClick={handleGenerate} disabled={generating}>
                {generating ? msg.generating : msg.generateBtn}
              </Button>
            )}
          </CardContent>
        </Card>

        {/* My Keys */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{msg.myKeysTitle}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                type="email"
                value={lookupEmail}
                onChange={e => setLookupEmail(e.target.value)}
                placeholder={msg.emailPlaceholder}
                className="flex-1"
              />
              <Button variant="outline" onClick={handleLookup} disabled={lookupLoading}>
                {lookupLoading ? '...' : msg.lookupBtn}
              </Button>
            </div>

            {myKeys.length > 0 ? (
              <div className="space-y-3">
                {myKeys.map(k => (
                  <div key={k.id} className="border rounded-lg p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <code className="text-xs font-mono bg-muted px-2 py-0.5 rounded">{k.keyPrefix}</code>
                        {statusBadge(k.status)}
                      </div>
                      {k.status === 'active' && (
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-destructive text-xs"
                          disabled={revokingId === k.id}
                          onClick={() => handleRevoke(k.id)}
                        >
                          {revokingId === k.id ? msg.revoking : msg.revoke}
                        </Button>
                      )}
                      {(k.status === 'expired') && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-xs"
                          onClick={() => openConversionModal('expired')}
                        >
                          <RefreshCw className="h-3 w-3 mr-1" />
                          {msg.regenerateBtn}
                        </Button>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                      {k.name && <span>{k.name}</span>}
                      <span>{msg.plan}: {msg.free}</span>
                      <span>{msg.expires}: {new Date(k.expiresAt).toLocaleDateString()}</span>
                      <span>{msg.usage}: {k.usageCount}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : lookupEmail && !lookupLoading ? (
              <p className="text-sm text-muted-foreground">{msg.noKeys}</p>
            ) : null}
          </CardContent>
        </Card>

        {/* Conversion Modal */}
        <Dialog open={showModal} onOpenChange={setShowModal}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                {msg.modalExpiredTitle}
              </DialogTitle>
              <DialogDescription>{msg.modalExpiredDesc}</DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-3 mt-4">
              <Button onClick={handleRegenerate} disabled={regenerating} className="w-full">
                <RefreshCw className="h-4 w-4 mr-2" />
                {regenerating ? msg.regenerating : msg.modalRegenerateBtn}
              </Button>
              <Button variant="outline" asChild className="w-full">
                <a href={`/${locale}/pricing`} onClick={() => trackEvent('conversion_modal_upgrade_clicked')}>
                  <ArrowUpRight className="h-4 w-4 mr-2" />
                  {msg.modalUpgradeBtn}
                </a>
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* SEO Documentation Section */}
        <section className="mt-12 space-y-10">
          {/* How it works */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="rounded-lg bg-primary/10 p-2">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">{doc.howItWorksTitle}</h2>
            </div>
            <ol className="space-y-3 ml-1">
              {doc.howItWorksSteps.map((step, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">{i + 1}</span>
                  <span className="pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* API Documentation */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Code className="h-5 w-5 text-primary" />
                {doc.apiDocsTitle}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{doc.apiDocsIntro}</p>

              {/* Authentication */}
              <div>
                <h3 className="text-sm font-semibold mb-1 flex items-center gap-1.5">
                  <Shield className="h-4 w-4 text-emerald-500" />
                  {doc.authTitle}
                </h3>
                <p className="text-xs text-muted-foreground mb-2">{doc.authDesc}</p>
                <div className="rounded-md bg-muted/60 border px-3 py-2">
                  <code className="text-xs font-mono text-primary">{doc.authExample}</code>
                </div>
              </div>

              {/* curl Examples */}
              <div>
                <h3 className="text-sm font-semibold mb-2 flex items-center gap-1.5">
                  <Terminal className="h-4 w-4 text-primary" />
                  {doc.curlExamplesTitle}
                </h3>
                <div className="space-y-2">
                  {doc.curlExamples.map((ex, i) => (
                    <div key={i} className="rounded-lg border bg-muted/30">
                      <div className="flex items-center justify-between px-3 py-1.5 border-b bg-muted/50 rounded-t-lg">
                        <span className="text-xs font-medium">{ex.label}</span>
                        <button
                          type="button"
                          className="text-xs text-muted-foreground hover:text-primary transition-colors"
                          onClick={() => { navigator.clipboard.writeText(ex.curl) }}
                        >
                          <Copy className="h-3 w-3" />
                        </button>
                      </div>
                      <pre className="px-3 py-2 overflow-x-auto text-xs font-mono text-muted-foreground leading-relaxed whitespace-pre-wrap break-all">
                        {ex.curl}
                      </pre>
                    </div>
                  ))}
                </div>
              </div>

              {/* Endpoints table */}
              <div>
                <h3 className="text-sm font-semibold mb-2 flex items-center gap-1.5">
                  <Terminal className="h-4 w-4 text-primary" />
                  Endpoints
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-1.5 pr-3 font-medium text-muted-foreground">Method</th>
                        <th className="text-left py-1.5 pr-3 font-medium text-muted-foreground">Path</th>
                        <th className="text-left py-1.5 font-medium text-muted-foreground">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {doc.apiEndpoints.map((ep, i) => (
                        <tr key={i} className="border-b last:border-0">
                          <td className="py-1.5 pr-3">
                            <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${ep.method === 'GET' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'}`}>{ep.method}</span>
                          </td>
                          <td className="py-1.5 pr-3 font-mono text-primary">{ep.path}</td>
                          <td className="py-1.5 text-muted-foreground">{ep.desc}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* FAQ */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="rounded-lg bg-primary/10 p-2">
                <HelpCircle className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">{doc.faqTitle}</h2>
            </div>
            <Accordion type="single" collapsible className="w-full">
              {doc.faqItems.map((item, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger className="text-sm text-left">{item.q}</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">{item.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </div>
    </div>
  )
}