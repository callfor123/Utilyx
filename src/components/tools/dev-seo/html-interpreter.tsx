'use client'

import { useState } from 'react'
import { Code2, Eye, Copy, Smartphone, Monitor } from 'lucide-react'
import { toast } from 'sonner'
import { copyToClipboard } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'

export function HtmlInterpreter() {
  const [htmlCode, setHtmlCode] = useState('<!DOCTYPE html>\n<html>\n<head>\n  <title>Ma Page</title>\n</head>\n<body>\n  <h1>Bonjour le monde!</h1>\n  <p>Ceci est un exemple de code HTML.</p>\n</body>\n</html>')
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop')

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code2 className="h-5 w-5" />
            Interpreteur HTML
          </CardTitle>
          <CardDescription>
            Ecrivez et previsualisez votre code HTML en temps reel. Outil gratuit en ligne pour tester et apprendre le HTML.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Code HTML</label>
            <Textarea
              placeholder="<html>...</html>"
              value={htmlCode}
              onChange={(e) => setHtmlCode((e.target as any).value)}
              className="min-h-[200px] font-mono text-sm resize-y"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={() => { copyToClipboard(htmlCode); toast.success('Code HTML copie !') }} disabled={!htmlCode.trim()}>
              <Copy className="h-4 w-4 mr-1.5" />
              Copier
            </Button>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Apercu</label>
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
                <span className="text-sm text-muted-foreground">Apercu HTML</span>
              </div>
              <iframe
                title="HTML Preview"
                className="w-full h-[400px] bg-white dark:bg-black"
                srcDoc={htmlCode}
                sandbox="allow-scripts"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}