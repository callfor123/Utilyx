'use client'

import { useEffect, useState } from 'react'
import { useLocale } from 'next-intl'
import { useAdConsent } from './adsense-provider'

const messages: Record<string, { title: string; desc: string; accept: string; reject: string; link: string }> = {
  fr: {
    title: 'Consentement aux cookies',
    desc: 'Nous utilisons des cookies pour le fonctionnement du site, l\'analyse d\'audience et la publicité personnalisée (Google AdSense). Vous pouvez accepter ou refuser les cookies publicitaires.',
    accept: 'Accepter',
    reject: 'Refuser les pubs',
    link: 'Politique de confidentialité',
  },
  en: {
    title: 'Cookie consent',
    desc: 'We use cookies for site functionality, audience analytics and personalized advertising (Google AdSense). You can accept or reject advertising cookies.',
    accept: 'Accept',
    reject: 'Reject ads',
    link: 'Privacy policy',
  },
  es: {
    title: 'Consentimiento de cookies',
    desc: 'Usamos cookies para el funcionamiento del sitio, análisis de audiencia y publicidad personalizada (Google AdSense). Puede aceptar o rechazar las cookies publicitarias.',
    accept: 'Aceptar',
    reject: 'Rechazar anuncios',
    link: 'Política de privacidad',
  },
  de: {
    title: 'Cookie-Einwilligung',
    desc: 'Wir verwenden Cookies für Site-Funktionen, Analysen und personalisierte Werbung (Google AdSense). Sie können Werbe-Cookies akzeptieren oder ablehnen.',
    accept: 'Akzeptieren',
    reject: 'Werbung ablehnen',
    link: 'Datenschutzrichtlinie',
  },
  ar: {
    title: 'موافقة ملفات تعريف الارتباط',
    desc: 'نستخدم ملفات تعريف الارتباط لتشغيل الموقع وتحليل الجمهور والإعلانات المخصصة (Google AdSense). يمكنك قبول أو رفض ملفات تعريف الارتباط الإعلانية.',
    accept: 'قبول',
    reject: 'رفض الإعلانات',
    link: 'سياسة الخصوصية',
  },
  pt: {
    title: 'Consentimento de cookies',
    desc: 'Usamos cookies para o funcionamento do site, análise de público e publicidade personalizada (Google AdSense). Você pode aceitar ou rejeitar cookies publicitários.',
    accept: 'Aceitar',
    reject: 'Rejeitar anúncios',
    link: 'Política de privacidade',
  },
}

export function CookieConsentBanner() {
  const [visible, setVisible] = useState(false)
  const locale = useLocale()
  const msg = messages[locale] || messages.fr
  const { setConsent } = useAdConsent()

  useEffect(() => {
    // Only show if user hasn't made a consent choice yet
    const stored = localStorage.getItem('utilyx-cookie-consent')
    const dismissed = localStorage.getItem('utilyx-ads-dismissed')
    if (!stored && dismissed !== 'true') {
      setVisible(true)
    }
  }, [])

  const handleAccept = () => {
    setConsent(true)
    setVisible(false)
  }

  const handleReject = () => {
    setConsent(false)
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] bg-background/95 backdrop-blur-md border-t border-border/50 shadow-lg">
      <div className="container mx-auto max-w-4xl px-4 py-4 sm:py-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium">{msg.title}</p>
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{msg.desc}</p>
            <a
              href={`/${locale}/privacy#adsense`}
              className="text-xs text-primary hover:underline mt-1 inline-block"
            >
              {msg.link}
            </a>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleReject}
              className="px-3 py-1.5 text-xs rounded-md border border-border hover:bg-muted/50 transition-colors"
            >
              {msg.reject}
            </button>
            <button
              onClick={handleAccept}
              className="px-3 py-1.5 text-xs rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              {msg.accept}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}