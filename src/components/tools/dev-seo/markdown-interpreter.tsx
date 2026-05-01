'use client'

import { useState } from 'react'
import { FileText, Copy, Trash2, Eye } from 'lucide-react'
import { toast } from 'sonner'
import { copyToClipboard } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'

export function MarkdownInterpreter() {
  const [markdownCode, setMarkdownCode] = useState("# Titre Principal\n\nBienvenue dans l'interpreteur **Markdown** !\n\n## Sous-titre\n\n- Element 1\n- Element 2\n- Element 3\n\n[Visitez Google](https://www.google.com)\n\n`code en ligne`\n\n```javascript\nconst hello = \"world\";\nconsole.log(hello);\n```")
  const [viewMode, setViewMode] = useState<'preview' | 'code' | 'split'>('split')

  const renderMarkdown = (text: string) => {
    let html = text
      .replace(/^### (.*$)/gm, '<h3>$1</h3>')
      .replace(/^## (.*$)/gm, '<h2>$1</h2>')
      .replace(/^# (.*$)/gm, '<h1>$1</h1>')
      .replace(/^> (.*$)/gm, '<blockquote>$1</blockquote>')
      .replace(/\*\*(.*?)\*\*/gm, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/gm, '<em>$1</em>')
      .replace(/!\[(.*?)\]\((.*?)\)/gm, '<img alt="$1" src="$2" />')
      .replace(/\[(.*?)\]\((.*?)\)/gm, '<a href="$2">$1</a>')
      .replace(/`(.*?)`/gm, '<code>$1</code>')
      .replace(/^[\*\-] (.*$)/gm, '<li>$1</li>')
      .replace(/(<li>[\s\S]*<\/li>)/g, '<ul>$1</ul>')
      .replace(/^(.+)$/gm, '<p>$1</p>')

    html = html
      .replace(/<p><h/g, '<h')
      .replace(/<\/h[1-6]><\/p>/g, '</h6>')
      .replace(/<p><ul>/g, '<ul>')
      .replace(/<\/ul><\/p>/g, '</ul>')
      .replace(/<p><blockquote>/g, '<blockquote>')
      .replace(/<\/blockquote><\/p>/g, '</blockquote>')

    return html
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Interpreteur Markdown
          </CardTitle>
          <CardDescription>
            Ecrivez et previsualisez votre Markdown en temps reel. Support de la syntaxe courante.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={() => { copyToClipboard(markdownCode); toast.success('Code Markdown copie !') }} disabled={!markdownCode.trim()}>
              <Copy className="h-4 w-4 mr-1.5" />
              Copier
            </Button>
            <Button variant="outline" onClick={() => setMarkdownCode('')}>
              <Trash2 className="h-4 w-4 mr-1.5" />
              Effacer
            </Button>
          </div>

          <div className="flex gap-2 mb-2">
            <button
              onClick={() => setViewMode('code')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                viewMode === 'code' ? 'bg-primary text-primary-foreground' : 'bg-muted/60 text-muted-foreground'
              }`}
            >
              Code
            </button>
            <button
              onClick={() => setViewMode('split')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                viewMode === 'split' ? 'bg-primary text-primary-foreground' : 'bg-muted/60 text-muted-foreground'
              }`}
            >
              Split
            </button>
            <button
              onClick={() => setViewMode('preview')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                viewMode === 'preview' ? 'bg-primary text-primary-foreground' : 'bg-muted/60 text-muted-foreground'
              }`}
            >
              <Eye className="h-3.5 w-3.5 inline mr-1" />
              Apercu
            </button>
          </div>

          <div className={`grid gap-4 ${viewMode === 'split' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
            {(viewMode === 'code' || viewMode === 'split') && (
              <div>
                <label className="text-sm font-medium mb-2 block">Code Markdown</label>
                <Textarea
                  placeholder="# Titre\n\nVotre texte en **Markdown**..."
                  value={markdownCode}
                  onChange={(e) => setMarkdownCode((e.target as any).value)}
                  className="min-h-[300px] font-mono text-sm resize-y"
                />
              </div>
            )}

            {(viewMode === 'preview' || viewMode === 'split') && (
              <div>
                <label className="text-sm font-medium mb-2 block">Apercu</label>
                <div
                  className="min-h-[300px] rounded-lg border bg-white dark:bg-black p-4 prose prose-sm max-w-none dark:prose-invert"
                  dangerouslySetInnerHTML={{ __html: renderMarkdown(markdownCode) }}
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}