'use client'

import { useState, useMemo } from 'react'
import { FileCode, Copy, RotateCcw } from 'lucide-react'
import { marked } from 'marked'
import { toast } from 'sonner'
import { copyToClipboard } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'

const DEFAULT_MD = `# Titre H1

## Titre H2

Voici un paragraphe avec du **texte en gras** et de l'*texte en italique*.

### Liste non-ordonnée
- Premier élément
- Deuxième élément
- Troisième élément

### Liste ordonnée
1. Étape une
2. Étape deux
3. Étape trois

> Ceci est une citation

\`\`\`javascript
function hello() {
  console.log("Bonjour le monde !");
}
\`\`\`

[Lien exemple](https://example.com)

---

| Colonne 1 | Colonne 2 |
|-----------|-----------|
| Cellule 1 | Cellule 2 |
| Cellule 3 | Cellule 4 |`

export function MarkdownPreview() {
  const [markdown, setMarkdown] = useState(DEFAULT_MD)

  const html = useMemo(() => {
    try {
      return marked(markdown, { breaks: true }) as string
    } catch {
      return '<p>Erreur de parsing Markdown</p>'
    }
  }, [markdown])

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileCode className="h-5 w-5" />
            Markdown Preview
          </CardTitle>
          <CardDescription>
            Éditeur Markdown avec aperçu en direct.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-end gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => { setMarkdown(DEFAULT_MD); toast.success('Réinitialisé') }}
            >
              <RotateCcw className="h-4 w-4 mr-1.5" />
              Reset
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => { copyToClipboard(markdown); toast.success('Markdown copié !') }}
            >
              <Copy className="h-4 w-4 mr-1.5" />
              Copier MD
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 min-h-[500px]">
            {/* Editor */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Markdown</label>
              <Textarea
                value={markdown}
                onChange={(e) => setMarkdown(e.target.value)}
                className="min-h-[500px] font-mono text-sm resize-none"
                placeholder="Écrivez votre Markdown ici..."
              />
            </div>

            {/* Preview */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Aperçu</label>
              <div
                className="rounded-lg border bg-white dark:bg-card p-4 min-h-[500px] overflow-y-auto scrollbar-thin markdown-preview"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
