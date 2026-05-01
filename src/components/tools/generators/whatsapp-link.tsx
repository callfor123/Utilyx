'use client'

import { useTranslations } from 'next-intl'

import { useState } from 'react'
import { MessageCircle, Copy, ExternalLink } from 'lucide-react'
import { toast } from 'sonner'
import { copyToClipboard } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export default function WhatsAppLinkGenerator() {
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')

  const getLink = () => {
    // Remove all non-numeric characters except +
    const cleanPhone = phone.replace(/[^\d+]/g, '')
    // Remove leading zeroes
    const noLeadingZeros = cleanPhone.replace(/^\+?0+/, '')
    const baseUrl = `https://wa.me/${noLeadingZeros}`
    if (!message) return baseUrl
    return `${baseUrl}?text=${encodeURIComponent(message)}`
  }

  const link = getLink()

  const handleCopy = () => {
    if (!phone) {
      toast.error('Veuillez entrer un numéro de téléphone valide.')
      return
    }
    copyToClipboard(link)
    toast.success('Lien copié dans le presse-papiers !')
  }

  const handleTest = () => {
    if (!phone) {
      toast.error('Veuillez entrer un numéro de téléphone valide.')
      return
    }
    window.open(link, '_blank', 'noopener,noreferrer')
  }

  return (
    <Card className="w-full max-w-2xl mx-auto border-border bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-green-500" />
          Générateur de Lien WhatsApp
        </CardTitle>
        <CardDescription>
          Créez facilement un lien direct pour envoyer un message WhatsApp sans avoir à enregistrer le numéro dans vos contacts.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="phone">Numéro de téléphone (avec indicatif de pays)</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="ex: +33612345678"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="font-mono text-sm"
            />
            <p className="text-xs text-muted-foreground">N'oubliez pas l'indicatif régional (ex: +33 pour la France, +1 pour les US, +32 pour la Belgique).</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message pré-rempli (Optionnel)</Label>
            <Textarea
              id="message"
              placeholder="Ex: Bonjour, je vous contacte suite à votre annonce..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="resize-y"
              rows={3}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Votre lien direct</Label>
          <div className="flex flex-col sm:flex-row gap-2">
            <code className="relative rounded bg-muted max-h-24 overflow-y-auto px-[0.3rem] py-[0.2rem] font-mono text-sm break-all flex-1 p-3">
              {phone ? link : 'Entrez un numéro pour voir le lien'}
            </code>
            <div className="flex gap-2">
              <Button onClick={handleCopy} disabled={!phone} size="icon" variant="outline" className="shrink-0" title={t("copyLink")}>
                <Copy className="h-4 w-4" />
              </Button>
              <Button onClick={handleTest} disabled={!phone} size="icon" variant="outline" className="shrink-0 group hover:bg-green-500 hover:text-white" title={t("testLinkBtn")}>
                <ExternalLink className="h-4 w-4 group-hover:block" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
