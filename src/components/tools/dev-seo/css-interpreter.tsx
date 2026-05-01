'use client'

import { useState } from 'react'
import { Palette, Eye, Copy, Smartphone, Monitor } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'
import { copyToClipboard } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'

export function CssInterpreter() {
  const [cssCode, setCssCode] = useState('body {\n  background-color: #f0f0f0;\n  font-family: Arial, sans-serif;\n}\n\nh1 {\n  color: #333;\n  text-align: center;\n}\n\n.container {\n  max-width: 800px;\n  margin: 0 auto;\n  padding: 20px;\n}')
  const [htmlSample, setHtmlSample] = useState('<div class="container"><h1>Titre de la page</h1><p>Paragraphe de test avec du style CSS applique.</p></div>')
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop')
  const t = useTranslations('ToolsUI')

  const previewHtml = `<!DOCTYPE html>
<html>
<head>
  <style>${cssCode}</style>
</head>
<body>
  ${htmlSample}
</body>
</html>`

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            {t('cssInterpreter')}
          </CardTitle>
          <CardDescription>
            {t('cssInterpreterDesc')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Code CSS</label>
              <Textarea
                placeholder="body { ... }"
                value={cssCode}
                onChange={(e) => setCssCode((e.target as any).value)}
                className="min-h-[200px] font-mono text-sm resize-y"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">HTML d'exemple (optionnel)</label>
              <Textarea
                placeholder="<div>...</div>"
                value={htmlSample}
                onChange={(e) => setHtmlSample((e.target as any).value)}
                className="min-h-[200px] font-mono text-sm resize-y"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={() => { copyToClipboard(cssCode); toast.success('Code CSS copie !') }} disabled={!cssCode.trim()}>
              <Copy className="h-4 w-4 mr-1.5" />
              Copier CSS
            </Button>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Apercu CSS</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode('desktop')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    viewMode === 'desktop' ? 'bg-primary text-primary-foreground' : 'bg-muted/60 text-muted-foreground'
                  }`}
                >
                  <Monitor className="h-3.5 w-3.5 inline mr-1" />
                  Desktop
                </button>
                <button
                  onClick={() => setViewMode('mobile')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    viewMode === 'mobile' ? 'bg-primary text-primary-foreground' : 'bg-muted/60 text-muted-foreground'
                  }`}
                >
                  <Smartphone className="h-3.5 w-3.5 inline mr-1" />
                  Mobile
                </button>
              </div>
            </div>

            <div className={`rounded-lg border bg-white dark:bg-black overflow-hidden ${viewMode === 'mobile' ? 'max-w-[375px] mx-auto' : ''}`}>
              <div className="bg-muted/60 px-4 py-2 border-b flex items-center gap-2">
                <Eye className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Apercu avec CSS</span>
              </div>
              <iframe
                title="CSS Preview"
                className="w-full h-[400px] bg-white dark:bg-black"
                srcDoc={previewHtml}
                sandbox="allow-scripts"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}