'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useLocale } from 'next-intl'
import { Copy, Check, Key, AlertTriangle, Clock, Shield, X, RefreshCw, ArrowUpRight } from 'lucide-react'
import { trackEvent } from '@/lib/analytics'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'

type KeyInfo = {
  id: string
  key: string
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

export default function ApiKeysContent() {
  const locale = useLocale()
  const msg = messages[locale] || messages.en

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [generating, setGenerating] = useState(false)
  const [newKey, setNewKey] = useState<string | null>(null)
  const [newKeyExpires, setNewKeyExpires] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState<string | null>(null)

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

  const handleRevoke = async (key: string) => {
    setRevokingId(key)
    try {
      await fetch('/api/api-keys', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key }),
      })
      setMyKeys(prev => prev.map(k => k.key === key ? { ...k, status: 'revoked' } : k))
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
                        <code className="text-xs font-mono bg-muted px-2 py-0.5 rounded">{k.key}</code>
                        {statusBadge(k.status)}
                      </div>
                      {k.status === 'active' && (
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-destructive text-xs"
                          disabled={revokingId === k.key}
                          onClick={() => handleRevoke(k.key)}
                        >
                          {revokingId === k.key ? msg.revoking : msg.revoke}
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
      </div>
    </div>
  )
}