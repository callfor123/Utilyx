'use client'

import { useEffect, useState } from 'react'
import { useLocale } from 'next-intl'

const messages: Record<string, { title: string; desc: string; action: string }> = {
  fr: {
    title: 'Vous utilisez un bloqueur de publicités',
    desc: 'Utilyx est financé par la publicité pour rester 100% gratuit. En désactivant votre bloqueur, vous nous soutenez directement.',
    action: 'Désactiver le bloqueur',
  },
  en: {
    title: 'You\'re using an ad blocker',
    desc: 'Utilyx is funded by ads to stay 100% free. By disabling your ad blocker, you directly support us.',
    action: 'Disable ad blocker',
  },
  es: {
    title: 'Estás usando un bloqueador de anuncios',
    desc: 'Utilyx se financia con anuncios para seguir siendo 100% gratuito. Al desactivar tu bloqueador, nos apoyas directamente.',
    action: 'Desactivar bloqueador',
  },
  de: {
    title: 'Sie verwenden einen Werbeblocker',
    desc: 'Utilyx wird durch Werbung finanziert, um 100% kostenlos zu bleiben. Durch Deaktivierung Ihres Werbeblockers unterstützen Sie uns direkt.',
    action: 'Werbeblocker deaktivieren',
  },
  ar: {
    title: 'أنت تستخدم أداة حظر الإعلانات',
    desc: 'يتم تمويل Utilyx بالإعلانات للبقي مجانيًا 100%. بتعطيل أداة الحظر، فإنك تدعمنا مباشرة.',
    action: 'تعطيل أداة الحظر',
  },
  pt: {
    title: 'Você está usando um bloqueador de anúncios',
    desc: 'Utilyx é financiado por anúncios para continuar 100% gratuito. Ao desativar seu bloqueador, você nos apoia diretamente.',
    action: 'Desativar bloqueador',
  },
}

export function AdBlockerDetector() {
  const [adBlockDetected, setAdBlockDetected] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const locale = useLocale()
  const msg = messages[locale] || messages.fr

  useEffect(() => {
    const checkAdBlock = async () => {
      try {
        const response = await fetch(
          'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js',
          { method: 'HEAD', mode: 'no-cors', cache: 'no-store' }
        )
        if (!response) {
          setAdBlockDetected(true)
          return
        }
      } catch {
        setAdBlockDetected(true)
        return
      }

      const testAd = document.createElement('div')
      testAd.innerHTML = '&nbsp;'
      testAd.className = 'adsbox ad-placement ad-banner'
      testAd.style.position = 'absolute'
      testAd.style.left = '-9999px'
      document.body.appendChild(testAd)

      await new Promise(r => setTimeout(r, 100))

      if (testAd.offsetHeight === 0 || testAd.clientHeight === 0) {
        setAdBlockDetected(true)
      }

      document.body.removeChild(testAd)
    }

    const dismissedSession = sessionStorage.getItem('utilyx-adblock-dismissed')
    if (dismissedSession === 'true') {
      setDismissed(true)
      return
    }

    const timer = setTimeout(checkAdBlock, 2000)
    return () => clearTimeout(timer)
  }, [])

  if (!adBlockDetected || dismissed) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:max-w-sm z-50 bg-background border border-border rounded-lg shadow-lg p-4">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
          <span className="text-amber-600 dark:text-amber-400 text-sm">⚠</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium">{msg.title}</p>
          <p className="text-xs text-muted-foreground mt-1">{msg.desc}</p>
        </div>
        <button
          onClick={() => {
            setDismissed(true)
            sessionStorage.setItem('utilyx-adblock-dismissed', 'true')
          }}
          className="flex-shrink-0 text-muted-foreground hover:text-foreground text-xs p-1"
          aria-label="Dismiss"
        >
          ✕
        </button>
      </div>
    </div>
  )
}