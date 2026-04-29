'use client'

import { useEffect, useState, useCallback } from 'react'
import { useLocale } from 'next-intl'
import { useAdConsent } from './adsense-provider'
import { X, Check, ShieldOff } from 'lucide-react'

const messages: Record<string, { title: string; desc: string; accept: string; reject: string; link: string; settings: string; accepted: string; rejected: string }> = {
  fr: {
    title: 'Consentement aux cookies',
    desc: 'Nous utilisons des cookies pour le fonctionnement du site, l\'analyse d\'audience et la publicité personnalisée (Google AdSense). Vous pouvez accepter ou refuser les cookies publicitaires.',
    accept: 'Accepter',
    reject: 'Refuser les pubs',
    link: 'Politique de confidentialité',
    settings: 'Paramètres des cookies',
    accepted: 'Cookies acceptés',
    rejected: 'Cookies refusés',
  },
  en: {
    title: 'Cookie consent',
    desc: 'We use cookies for site functionality, audience analytics and personalized advertising (Google AdSense). You can accept or reject advertising cookies.',
    accept: 'Accept',
    reject: 'Reject ads',
    link: 'Privacy policy',
    settings: 'Cookie settings',
    accepted: 'Cookies accepted',
    rejected: 'Ads rejected',
  },
  es: {
    title: 'Consentimiento de cookies',
    desc: 'Usamos cookies para el funcionamiento del sitio, análisis de audiencia y publicidad personalizada (Google AdSense). Puede aceptar o rechazar las cookies publicitarias.',
    accept: 'Aceptar',
    reject: 'Rechazar anuncios',
    link: 'Política de privacidad',
    settings: 'Configuración de cookies',
    accepted: 'Cookies aceptados',
    rejected: 'Anuncios rechazados',
  },
  de: {
    title: 'Cookie-Einwilligung',
    desc: 'Wir verwenden Cookies für Site-Funktionen, Analysen und personalisierte Werbung (Google AdSense). Sie können Werbe-Cookies akzeptieren oder ablehnen.',
    accept: 'Akzeptieren',
    reject: 'Werbung ablehnen',
    link: 'Datenschutzrichtlinie',
    settings: 'Cookie-Einstellungen',
    accepted: 'Cookies akzeptiert',
    rejected: 'Werbung abgelehnt',
  },
  ar: {
    title: 'موافقة ملفات تعريف الارتباط',
    desc: 'نستخدم ملفات تعريف الارتباط لتشغيل الموقع وتحليل الجمهور والإعلانات المخصصة (Google AdSense). يمكنك قبول أو رفض ملفات تعريف الارتباط الإعلانية.',
    accept: 'قبول',
    reject: 'رفض الإعلانات',
    link: 'سياسة الخصوصية',
    settings: 'إعدادات ملفات تعريف الارتباط',
    accepted: 'تم قبول ملفات تعريف الارتباط',
    rejected: 'تم رفض الإعلانات',
  },
  pt: {
    title: 'Consentimento de cookies',
    desc: 'Usamos cookies para o funcionamento do site, análise de público e publicidade personalizada (Google AdSense). Você pode aceitar ou rejeitar cookies publicitários.',
    accept: 'Aceitar',
    reject: 'Rejeitar anúncios',
    link: 'Política de privacidade',
    settings: 'Configurações de cookies',
    accepted: 'Cookies aceitos',
    rejected: 'Anúncios rejeitados',
  },
}

type ConsentChoice = 'accepted' | 'rejected' | null

export function CookieConsentBanner() {
  const [visible, setVisible] = useState(false)
  const [animating, setAnimating] = useState(false)
  const [choice, setChoice] = useState<ConsentChoice>(null)
  const locale = useLocale()
  const msg = messages[locale] || messages.fr
  const { setConsent, resetConsent, consentChecked } = useAdConsent()

  useEffect(() => {
    // Show banner if no consent choice stored or dismissal has expired
    const stored = localStorage.getItem('utilyx-cookie-consent')
    const dismissedRaw = localStorage.getItem('utilyx-ads-dismissed')
    if (dismissedRaw) {
      try {
        const parsed = JSON.parse(dismissedRaw)
        // Only treat as dismissed if within 30-day TTL
        if (Date.now() - (parsed.timestamp || 0) < 30 * 24 * 60 * 60 * 1000) {
          return // still within dismissal period
        }
      } catch {
        // Legacy format — ignore, show banner
      }
      localStorage.removeItem('utilyx-ads-dismissed')
    }
    if (!stored) {
      // Use rAF to ensure CSS transition plays from initial hidden state
      requestAnimationFrame(() => {
        setVisible(true)
        // Delay animating class so transition triggers
        requestAnimationFrame(() => setAnimating(true))
      })
    }
  }, [])

  // Re-show banner when consent is reset (e.g. from footer "Cookie settings" link)
  useEffect(() => {
    if (consentChecked === false && !visible) {
      requestAnimationFrame(() => {
        setVisible(true)
        requestAnimationFrame(() => setAnimating(true))
      })
    }
  }, [consentChecked, visible])

  const dismiss = useCallback((onComplete: () => void) => {
    setAnimating(false)
    // Wait for CSS transition to finish before removing from DOM
    setTimeout(onComplete, 300)
  }, [])

  const handleAccept = useCallback(() => {
    setChoice('accepted')
    // Brief confirmation delay so user sees the feedback
    setTimeout(() => {
      dismiss(() => setConsent(true))
    }, 600)
  }, [dismiss, setConsent])

  const handleReject = useCallback(() => {
    setChoice('rejected')
    setTimeout(() => {
      dismiss(() => setConsent(false))
    }, 600)
  }, [dismiss, setConsent])

  const handleDismiss = useCallback(() => {
    // Treat dismiss same as reject — store dismissal
    dismiss(() => setConsent(false))
  }, [dismiss, setConsent])

  if (!visible) return null

  const showConfirmation = choice !== null

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-[60] bg-background/95 backdrop-blur-md border-t border-border/50 shadow-lg transition-all duration-300 ease-in-out ${
        animating ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}
      role="dialog"
      aria-label={msg.title}
    >
      <div className="container mx-auto max-w-4xl px-4 py-3 sm:py-3">
        {showConfirmation ? (
          <div className="flex items-center justify-center gap-2 py-1">
            {choice === 'accepted' ? (
              <>
                <Check className="h-4 w-4 text-emerald-500 animate-in fade-in zoom-in duration-200" />
                <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">{msg.accepted}</span>
              </>
            ) : (
              <>
                <ShieldOff className="h-4 w-4 text-muted-foreground animate-in fade-in zoom-in duration-200" />
                <span className="text-sm font-medium text-muted-foreground">{msg.rejected}</span>
              </>
            )}
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 relative">
            <button
              onClick={handleDismiss}
              className="absolute -top-1 right-0 sm:top-0 sm:right-0 p-1 rounded-full hover:bg-muted/80 transition-colors text-muted-foreground hover:text-foreground"
              aria-label="Dismiss"
            >
              <X className="h-3.5 w-3.5" />
            </button>
            <div className="flex-1 min-w-0 pr-6 sm:pr-0">
              <p className="text-sm font-medium">{msg.title}</p>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{msg.desc}</p>
              <a
                href={`/${locale}/privacy#adsense`}
                className="text-xs text-primary hover:underline mt-1 inline-block"
              >
                {msg.link}
              </a>
            </div>
            <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
              <button
                onClick={handleReject}
                className="flex-1 sm:flex-none px-3 py-2 sm:py-1.5 text-xs rounded-md border border-border hover:bg-muted/50 transition-colors"
              >
                {msg.reject}
              </button>
              <button
                onClick={handleAccept}
                className="flex-1 sm:flex-none px-3 py-2 sm:py-1.5 text-xs rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                {msg.accept}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

/**
 * Hook to re-show the consent banner from anywhere (e.g., footer link).
 * Usage: const { openCookieSettings } = useCookieSettings(); openCookieSettings() in an onClick.
 * The CookieConsentBanner will re-appear on next render.
 */
export function useCookieSettings() {
  const { resetConsent } = useAdConsent()
  return { openCookieSettings: resetConsent }
}
