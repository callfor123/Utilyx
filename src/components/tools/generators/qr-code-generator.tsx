'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { QrCode, Download, Copy, Link, Wifi, Mail, Phone, FileText } from 'lucide-react'
import QRCode from 'qrcode'
import { toast } from 'sonner'
import { copyToClipboard } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useTranslations } from 'next-intl'

const TABS = [
  { id: 'url', label: 'URL', icon: Link },
  { id: 'text', label: 'Texte', icon: FileText },
  { id: 'wifi', label: 'WiFi', icon: Wifi },
  { id: 'email', label: 'Email', icon: Mail },
  { id: 'phone', label: 'Téléphone', icon: Phone },
] as const

export function QrCodeGenerator() {
  const [tab, setTab] = useState<string>('url')
  const [url, setUrl] = useState('')
  const [text, setText] = useState('')
  const [wifiSsid, setWifiSsid] = useState('')
  const [wifiPass, setWifiPass] = useState('')
  const [wifiEnc, setWifiEnc] = useState('WPA')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [qrDataUrl, setQrDataUrl] = useState('')
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const getQrValue = useCallback((): string => {
    switch (tab) {
      case 'url': return url
      case 'text': return text
      case 'wifi': return `WIFI:T:${wifiEnc};S:${wifiSsid};P:${wifiPass};;`
      case 'email': return `mailto:${email}`
      case 'phone': return `tel:${phone}`
      default: return ''
    }
  }, [tab, url, text, wifiSsid, wifiPass, wifiEnc, email, phone])

  const qrValue = getQrValue()

  useEffect(() => {
  const t = useTranslations('ToolsUI')
    if (!qrValue) {
      setQrDataUrl('')
      return
    }
    const canvas = canvasRef.current
    if (!canvas) return
    let cancelled = false
    QRCode.toCanvas(canvas, qrValue, {
      width: 280,
      margin: 2,
      color: { dark: '#0f172a', light: '#ffffff' },
    }).then(() => {
      if (!cancelled) {
        setQrDataUrl(canvas.toDataURL('image/png'))
      }
    }).catch(() => {
      if (!cancelled) {
        toast.error('Erreur de génération du QR code')
      }
    })
    return () => { cancelled = true }
  }, [qrValue])

  const handleDownload = () => {
    if (!qrDataUrl) return
    const a = document.createElement('a')
    a.href = qrDataUrl
    a.download = `qrcode-${tab}.png`
    a.click()
    toast.success('QR code téléchargé')
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <QrCode className="h-5 w-5" />
            {t('qrCodeGenerator')}
          </CardTitle>
          <CardDescription>{t('qrCodeDesc')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs value={tab} onValueChange={setTab}>
            <TabsList className="grid grid-cols-5 w-full">
              {TABS.map((t) => (
                <TabsTrigger key={t.id} value={t.id} className="text-xs sm:text-sm">
                  <t.icon className="h-3.5 w-3.5 mr-1 hidden sm:inline" />
                  {t.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="url" className="space-y-3">
              <Label>URL</Label>
              <Input placeholder="https://example.com" value={url} onChange={(e) => setUrl(e.target.value)} />
            </TabsContent>

            <TabsContent value="text" className="space-y-3">
              <Label>Texte</Label>
              <textarea
                className="flex min-h-[100px] w-full rounded-lg border border-input bg-background px-3 py-2 text-sm resize-y focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Entrez le texte..."
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </TabsContent>

            <TabsContent value="wifi" className="space-y-3">
              <div className="space-y-2">
                <Label>Nom du réseau (SSID)</Label>
                <Input placeholder="MonWiFi" value={wifiSsid} onChange={(e) => setWifiSsid(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Mot de passe</Label>
                <Input type="password" placeholder="********" value={wifiPass} onChange={(e) => setWifiPass(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Chiffrement</Label>
                <div className="flex gap-2">
                  {['WPA', 'WEP', 'nopass'].map((e) => (
                    <button
                      key={e}
                      onClick={() => setWifiEnc(e)}
                      className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                        wifiEnc === e ? 'bg-primary text-primary-foreground' : 'bg-muted/60 text-muted-foreground hover:bg-muted'
                      }`}
                    >
                      {e === 'nopass' ? 'Ouvert' : e}
                    </button>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="email" className="space-y-3">
              <Label>Adresse email</Label>
              <Input type="email" placeholder="hello@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            </TabsContent>

            <TabsContent value="phone" className="space-y-3">
              <Label>Numéro de téléphone</Label>
              <Input type="tel" placeholder="+33612345678" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </TabsContent>
          </Tabs>

          {/* QR Preview */}
          <div className="flex flex-col items-center gap-4">
            <div className="rounded-2xl border-2 border-dashed border-border p-4 bg-white">
              <canvas ref={canvasRef} className="rounded-lg" />
              {!qrDataUrl && (
                <div className="w-[280px] h-[280px] flex items-center justify-center text-muted-foreground text-sm">
                  Entrez des données pour générer un QR code
                </div>
              )}
            </div>
            <div className="flex gap-2">
              <Button onClick={handleDownload} disabled={!qrDataUrl}>
                <Download className="h-4 w-4 mr-1.5" />
                Télécharger PNG
              </Button>
              <Button
                variant="outline"
                onClick={() => { copyToClipboard(getQrValue()); toast.success('Contenu copié') }}
                disabled={!qrDataUrl}
              >
                <Copy className="h-4 w-4 mr-1.5" />
                Copier
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
