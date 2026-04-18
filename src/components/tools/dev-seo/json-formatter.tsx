'use client'

import { useState } from 'react'
import { Braces, Copy, Minimize2, Maximize2, TreePine } from 'lucide-react'
import { toast } from 'sonner'
import { copyToClipboard } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'

export function JsonFormatter() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [view, setView] = useState<'formatted' | 'tree'>('formatted')

  const handleFormat = () => {
    setError('')
    if (!input.trim()) return
    try {
      const parsed = JSON.parse(input)
      setOutput(JSON.stringify(parsed, null, 2))
      setView('formatted')
      toast.success('JSON formaté avec succès')
    } catch (e) {
      setError(e instanceof Error ? e.message : 'JSON invalide')
      setOutput('')
    }
  }

  const handleMinify = () => {
    setError('')
    if (!input.trim()) return
    try {
      const parsed = JSON.parse(input)
      const minified = JSON.stringify(parsed)
      setOutput(minified)
      setView('formatted')
      toast.success('JSON minifié')
    } catch (e) {
      setError(e instanceof Error ? e.message : 'JSON invalide')
      setOutput('')
    }
  }

  const parsedTree = output ? (() => { try { return JSON.parse(output) } catch { return null } })() : null

  const treeView = parsedTree ? (
    <div className="font-mono text-sm space-y-1 max-h-[400px] overflow-y-auto scrollbar-thin">
      {renderTree(parsedTree, 0)}
    </div>
  ) : null

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Braces className="h-5 w-5" />
            JSON Formatter
          </CardTitle>
          <CardDescription>
            Formatez, validez et minifiez vos données JSON.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">JSON Input</label>
            <Textarea
              placeholder='{"key": "value", "number": 42}'
              value={input}
              onChange={(e) => { setInput(e.target.value); setError('') }}
              className="min-h-[150px] font-mono text-sm resize-y"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Button onClick={handleFormat} disabled={!input.trim()}>
              <Maximize2 className="h-4 w-4 mr-1.5" />
              Formater
            </Button>
            <Button variant="outline" onClick={handleMinify} disabled={!input.trim()}>
              <Minimize2 className="h-4 w-4 mr-1.5" />
              Minifier
            </Button>
          </div>

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/30 p-3">
              <p className="text-sm text-red-600 dark:text-red-400 font-mono">{error}</p>
            </div>
          )}

          {output && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <button
                    onClick={() => setView('formatted')}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      view === 'formatted' ? 'bg-primary text-primary-foreground' : 'bg-muted/60 text-muted-foreground'
                    }`}
                  >
                    Formaté
                  </button>
                  <button
                    onClick={() => setView('tree')}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      view === 'tree' ? 'bg-primary text-primary-foreground' : 'bg-muted/60 text-muted-foreground'
                    }`}
                  >
                    <TreePine className="h-3.5 w-3.5 inline mr-1" />
                    Arbre
                  </button>
                </div>
                <Button variant="ghost" size="sm" onClick={() => { copyToClipboard(output); toast.success('Copié !') }}>
                  <Copy className="h-3.5 w-3.5 mr-1" />
                  Copier
                </Button>
              </div>
              {view === 'formatted' ? (
                <pre className="rounded-lg border bg-muted/30 p-4 max-h-[400px] overflow-auto scrollbar-thin text-sm font-mono">
                  <SyntaxHighlightedJson json={output} />
                </pre>
              ) : (
                <div className="rounded-lg border bg-muted/30 p-4">
                  {treeView}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

function SyntaxHighlightedJson({ json }: { json: string }) {
  const highlighted = json.replace(
    /("(?:\\.|[^"\\])*")\s*:/g,
    '<span style="color:#6366f1">$1</span>:'
  ).replace(
    /:(\s*"(?:\\.|[^"\\])*")/g,
    ':<span style="color:#059669">$1</span>'
  ).replace(
    /:\s*(\d+\.?\d*)/g,
    ': <span style="color:#d97706">$1</span>'
  ).replace(
    /:\s*(true|false|null)/g,
    ': <span style="color:#dc2626">$1</span>'
  )

  return <code dangerouslySetInnerHTML={{ __html: highlighted }} />
}

function renderTree(obj: unknown, depth: number): React.ReactNode {
  const indent = depth * 16
  if (obj === null) return <div style={{ paddingLeft: indent }} className="text-red-500">null</div>
  if (typeof obj === 'boolean') return <div style={{ paddingLeft: indent }} className="text-red-500">{String(obj)}</div>
  if (typeof obj === 'number') return <div style={{ paddingLeft: indent }} className="text-amber-500">{obj}</div>
  if (typeof obj === 'string') return <div style={{ paddingLeft: indent }} className="text-emerald-600">"{obj}"</div>

  if (Array.isArray(obj)) {
    return (
      <div>
        <div style={{ paddingLeft: indent }} className="text-muted-foreground">[{obj.length} items]</div>
        {obj.map((item, i) => (
          <div key={i}>
            {renderTree(item, depth + 1)}
          </div>
        ))}
      </div>
    )
  }

  if (typeof obj === 'object') {
    const entries = Object.entries(obj as Record<string, unknown>)
    return (
      <div>
        <div style={{ paddingLeft: indent }} className="text-muted-foreground">{'{}'} {entries.length} clés</div>
        {entries.map(([key, val]) => (
          <div key={key}>
            <span style={{ paddingLeft: indent + 16 }} className="text-primary font-medium">{key}:</span>
            {renderTree(val, depth + 2)}
          </div>
        ))}
      </div>
    )
  }

  return null
}
