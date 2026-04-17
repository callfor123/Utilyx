'use client'

import { useState, useEffect } from 'react'
import { ArrowUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

const scrollUpLabels: Record<string, string> = {
  fr: 'Retour en haut',
  en: 'Back to top',
  es: 'Volver arriba',
  de: 'Nach oben',
  ar: 'العودة للأعلى',
  pt: 'Voltar ao topo',
}

export function ScrollToTop({ locale }: { locale: string }) {
  const [visible, setVisible] = useState(false)
  const label = scrollUpLabels[locale] || scrollUpLabels.fr

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="fixed bottom-6 right-6 z-40 h-10 w-10 rounded-full shadow-lg bg-background/90 backdrop-blur-sm border-border/50 hover:bg-primary hover:text-primary-foreground transition-all duration-300 animate-in fade-in slide-in-from-bottom-4"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <ArrowUp className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left">
          {label}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}