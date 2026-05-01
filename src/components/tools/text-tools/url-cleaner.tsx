'use client'

import { useState } from 'react'
import { Link2Off, Copy, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { copyToClipboard } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useTranslations } from 'next-intl'

// Liste des paramètres de tracking les plus connus (Amazon, Facebook, Google, etc.)
const trackingParams = new Set([
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'utm_id',
  'fbclid', 'gclid', 'wbraid', 'gbraid', 'msclkid', 'twclid',
  'igshid', '_ga', '_gl', 'mc_cid', 'mc_eid', 
  'ref', 'ref_', 'pd_rd_r', 'pd_rd_w', 'pd_rd_wg', 'pf_rd_p', 'pf_rd_r', 'pf_rd_s', 'pf_rd_t', 'pf_rd_i', 'pf_rd_m' // Amazon
])

export default function UrlCleaner() {
  const [url, setUrl] = useState('')
  const t = useTranslations('ToolsUI')

  const getCleanUrl = () => {
    if (!url) return { clean: '', removed: 0 }
    
    try {
      const parsedUrl = new URL(url)
      
      // Nettoyage des paramètres de recherche
      let removedCount = 0
      const paramsToKeep = new URLSearchParams()
      
      parsedUrl.searchParams.forEach((value, key) => {
        if (!trackingParams.has(key.toLowerCase()) && !key.toLowerCase().startsWith('utm_')) {
          paramsToKeep.append(key, value)
        } else {
          removedCount++
        }
      })

      parsedUrl.search = paramsToKeep.toString()
      return { clean: parsedUrl.toString(), removed: removedCount }
    } catch (e) {
      // Si ce n'est pas une URL valide
      return { clean: url, removed: 0, error: true }
    }
  }

  const { clean: cleanUrl, removed, error } = getCleanUrl()

  const handleCopy = () => {
    if (!cleanUrl || error) return
    copyToClipboard(cleanUrl)
    toast.success('Lien propre copié !')
  }

  return (
    <Card className="w-full max-w-2xl mx-auto border-border bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Link2Off className="w-5 h-5 text-indigo-500" />
          {t('urlCleaner')}
        </CardTitle>
        <CardDescription>{t('urlCleanerDesc')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="dirty-url">Collez votre lien complet</Label>
          <div className="flex gap-2">
            <Input
              id="dirty-url"
              type="url"
              placeholder="https://example.com/page?utm_source=facebook&fbclid=12345"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1"
            />
            {url && (
              <Button variant="ghost" size="icon" onClick={() => setUrl('')} className="shrink-0">
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {error && url && (
          <p className="text-sm text-destructive">Ce n'est pas une URL valide. (N'oubliez pas https://)</p>
        )}

        {url && !error && (
          <div className="space-y-4">
            <div className="p-4 bg-muted rounded-md space-y-2">
              <Label className="text-muted-foreground flex justify-between">
                <span>Résultat (Lien propre)</span>
                {removed > 0 && (
                  <span className="text-green-600 dark:text-green-400 font-semibold">{removed} traceur(s) supprimé(s) !</span>
                )}
              </Label>
              <div className="flex items-center gap-2">
                <code className="text-sm font-mono break-all flex-1 p-2 bg-background rounded border">
                  {cleanUrl}
                </code>
              </div>
            </div>
            
            <Button onClick={handleCopy} className="w-full" size="lg">
              <Copy className="h-4 w-4 mr-2" />
              Copier le lien nettoyé
            </Button>
            
            {removed === 0 && url && (
              <Alert>
                <AlertDescription className="text-xs">
                  Aucun paramètre de tracking connu n'a été détecté dans ce lien.
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
