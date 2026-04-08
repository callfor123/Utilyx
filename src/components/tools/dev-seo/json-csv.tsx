'use client'

import { useState, useCallback, useMemo } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { toast } from 'sonner'
import { Copy, Download, FileJson, FileSpreadsheet, Wand2, Minimize2, ArrowRightLeft } from 'lucide-react'
import { cn, downloadBlob, copyToClipboard } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'

// ── JSON validation with line number ─────────────────────────────────────
function validateJson(text: string): { valid: boolean; error?: string; line?: number } {
  if (!text.trim()) return { valid: true }
  try {
    JSON.parse(text)
    return { valid: true }
  } catch (e: unknown) {
    const err = e as Error
    const match = err.message.match(/position (\d+)/)
    if (match) {
      const pos = parseInt(match[1])
      const line = text.substring(0, pos).split('\n').length
      return { valid: false, error: err.message, line }
    }
    return { valid: false, error: err.message }
  }
}

// ── JSON → CSV conversion ────────────────────────────────────────────────
function jsonToCsv(json: object[]): string {
  if (json.length === 0) return ''
  const headers = Object.keys(json[0])
  const csvRows = [headers.join(',')]
  for (const row of json) {
    const values = headers.map(h => {
      const val = String((row as Record<string, unknown>)[h] ?? '')
      return `"${val.replace(/"/g, '""')}"`
    })
    csvRows.push(values.join(','))
  }
  return csvRows.join('\n')
}

// ── CSV → JSON conversion ────────────────────────────────────────────────
function csvToJson(csv: string): object[] {
  if (!csv.trim()) return []
  const lines = csv.split('\n').filter(l => l.trim())
  if (lines.length < 2) return []

  function parseCsvLine(line: string): string[] {
    const result: string[] = []
    let current = ''
    let inQuotes = false
    for (let i = 0; i < line.length; i++) {
      const ch = line[i]
      if (inQuotes) {
        if (ch === '"') {
          if (i + 1 < line.length && line[i + 1] === '"') {
            current += '"'
            i++
          } else {
            inQuotes = false
          }
        } else {
          current += ch
        }
      } else {
        if (ch === '"') {
          inQuotes = true
        } else if (ch === ',') {
          result.push(current.trim())
          current = ''
        } else {
          current += ch
        }
      }
    }
    result.push(current.trim())
    return result
  }

  const headers = parseCsvLine(lines[0])
  const result: object[] = []
  for (let i = 1; i < lines.length; i++) {
    const values = parseCsvLine(lines[i])
    const obj: Record<string, string> = {}
    headers.forEach((h, idx) => {
      obj[h] = values[idx] || ''
    })
    result.push(obj)
  }
  return result
}

// ── Line numbers component ───────────────────────────────────────────────
function LineNumbers({ text }: { text: string }) {
  const lines = text.split('\n')
  return (
    <div className="flex-shrink-0 select-none text-right pr-2 text-muted-foreground/50 text-xs font-mono leading-[1.5rem]">
      {lines.map((_, i) => (
        <div key={i}>{i + 1}</div>
      ))}
    </div>
  )
}

// ── Main component ───────────────────────────────────────────────────────
export function JsonCsv() {
  const [mode, setMode] = useState<'json-csv' | 'csv-json'>('json-csv')
  const [input, setInput] = useState('')

  // ── Process output (derived, no setState in useMemo) ──────────────────
  const { output, error, errorLine } = useMemo(() => {
    let result = ''
    let err: string | null = null
    let errLine: number | null = null

    if (!input.trim()) return { output: result, error: err, errorLine: errLine }

    if (mode === 'json-csv') {
      const validation = validateJson(input)
      if (!validation.valid) {
        err = validation.error || 'JSON invalide'
        errLine = validation.line || null
        return { output: '', error: err, errorLine: errLine }
      }
      try {
        const parsed = JSON.parse(input)
        if (!Array.isArray(parsed) || parsed.length === 0) {
          err = "Le JSON doit être un tableau d'objets non vide"
          return { output: '', error: err, errorLine: null }
        }
        if (typeof parsed[0] !== 'object' || parsed[0] === null) {
          err = 'Le tableau doit contenir des objets'
          return { output: '', error: err, errorLine: null }
        }
        result = jsonToCsv(parsed)
      } catch {
        err = 'Erreur lors de la conversion'
      }
    } else {
      try {
        const json = csvToJson(input)
        if (json.length === 0) {
          err = "Le CSV doit contenir au moins une ligne d'en-tête et une ligne de données"
        } else {
          result = JSON.stringify(json, null, 2)
        }
      } catch {
        err = "Erreur lors de l'analyse du CSV"
      }
    }
    return { output: result, error: err, errorLine: errLine }
  }, [input, mode])

  // ── Actions ───────────────────────────────────────────────────────────
  const handleCopy = useCallback(async () => {
    if (!output) {
      toast.error('Rien à copier')
      return
    }
    await copyToClipboard(output)
    toast.success('Copié dans le presse-papiers')
  }, [output])

  const handleDownload = useCallback(() => {
    if (!output) {
      toast.error('Rien à télécharger')
      return
    }
    const ext = mode === 'json-csv' ? 'csv' : 'json'
    const blob = new Blob([output], { type: 'text/plain;charset=utf-8' })
    downloadBlob(blob, `converted.${ext}`)
    toast.success('Fichier téléchargé')
  }, [output, mode])

  const handleFormat = useCallback(() => {
    if (!input.trim()) return
    if (mode === 'csv-json') {
      const validation = validateJson(input)
      if (validation.valid) {
        try {
          const parsed = JSON.parse(input)
          setInput(JSON.stringify(parsed, null, 2))
          toast.success('JSON formaté')
        } catch {
          toast.error('Impossible de formater le JSON')
        }
      }
    } else {
      // In JSON→CSV mode, format the JSON input
      const validation = validateJson(input)
      if (validation.valid) {
        try {
          const parsed = JSON.parse(input)
          setInput(JSON.stringify(parsed, null, 2))
          toast.success('JSON formaté')
        } catch {
          toast.error('Impossible de formater le JSON')
        }
      }
    }
  }, [input, mode])

  const handleMinify = useCallback(() => {
    if (!input.trim()) return
    const validation = validateJson(input)
    if (validation.valid) {
      try {
        const parsed = JSON.parse(input)
        setInput(JSON.stringify(parsed))
        toast.success('JSON minifié')
      } catch {
        toast.error('Impossible de minifier le JSON')
      }
    } else {
      toast.error('JSON invalide')
    }
  }, [input])

  const sampleJson = JSON.stringify(
    [
      { nom: 'Dupont', prénom: 'Jean', âge: 30, ville: 'Paris' },
      { nom: 'Martin', prénom: 'Marie', âge: 25, ville: 'Lyon' },
      { nom: 'Bernard', prénom: 'Pierre', âge: 35, ville: 'Marseille' }
    ],
    null,
    2
  )

  const sampleCsv = `nom,prénom,âge,ville\nDupont,Jean,30,Paris\nMartin,Marie,25,Lyon\nBernard,Pierre,35,Marseille`

  const loadSample = useCallback(() => {
    if (mode === 'json-csv') {
      setInput(sampleJson)
    } else {
      setInput(sampleCsv)
    }
  }, [mode, sampleJson, sampleCsv])

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <ArrowRightLeft className="h-5 w-5 text-primary" />
          <CardTitle className="text-xl">Convertisseur JSON / CSV</CardTitle>
        </div>
        <CardDescription>
          Convertissez facilement entre les formats JSON et CSV
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={mode} onValueChange={(v) => { setMode(v as 'json-csv' | 'csv-json'); setInput('') }} className="w-full">
          <div className="flex items-center justify-between mb-4">
            <TabsList>
              <TabsTrigger value="json-csv" className="gap-1.5">
                <FileJson className="h-4 w-4" />
                JSON → CSV
              </TabsTrigger>
              <TabsTrigger value="csv-json" className="gap-1.5">
                <FileSpreadsheet className="h-4 w-4" />
                CSV → JSON
              </TabsTrigger>
            </TabsList>
            <Button variant="outline" size="sm" onClick={loadSample}>
              Exemple
            </Button>
          </div>

          <TabsContent value="json-csv" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Input panel */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Entrée JSON</Label>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" onClick={handleFormat} title="Formater">
                      <Wand2 className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={handleMinify} title="Minifier">
                      <Minimize2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
                <div className="flex rounded-lg border overflow-hidden bg-[#1e1e2e]">
                  <LineNumbers text={input} />
                  <textarea
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder='[{"nom": "Dupont", "prénom": "Jean"}]'
                    className="flex-1 min-h-[300px] bg-transparent text-[#cdd6f4] font-mono text-sm p-2 resize-none outline-none leading-[1.5rem] placeholder:text-[#585b70]"
                    spellCheck={false}
                  />
                </div>
                {error && (
                  <div className="flex items-center gap-1.5 text-destructive text-xs">
                    <Badge variant="destructive" className="text-xs">
                      {errorLine ? `Ligne ${errorLine}` : 'Erreur'}
                    </Badge>
                    <span className="truncate">{error}</span>
                  </div>
                )}
              </div>

              {/* Output panel */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Sortie CSV</Label>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" onClick={handleCopy} title="Copier">
                      <Copy className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={handleDownload} title="Télécharger">
                      <Download className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
                <div className="rounded-lg border overflow-hidden min-h-[300px]">
                  {output ? (
                    <SyntaxHighlighter
                      language="csv"
                      style={oneDark}
                      customStyle={{
                        margin: 0,
                        borderRadius: 0,
                        minHeight: '300px',
                        fontSize: '0.8125rem',
                      }}
                    >
                      {output}
                    </SyntaxHighlighter>
                  ) : (
                    <div className="h-[300px] flex items-center justify-center text-muted-foreground text-sm bg-[#1e1e2e]">
                      La sortie apparaîtra ici...
                    </div>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="csv-json" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Input panel */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Entrée CSV</Label>
                </div>
                <div className="flex rounded-lg border overflow-hidden bg-[#1e1e2e]">
                  <LineNumbers text={input} />
                  <textarea
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="nom,prénom,âge&#10;Dupont,Jean,30"
                    className="flex-1 min-h-[300px] bg-transparent text-[#cdd6f4] font-mono text-sm p-2 resize-none outline-none leading-[1.5rem] placeholder:text-[#585b70]"
                    spellCheck={false}
                  />
                </div>
                {error && (
                  <div className="flex items-center gap-1.5 text-destructive text-xs">
                    <Badge variant="destructive" className="text-xs">Erreur</Badge>
                    <span className="truncate">{error}</span>
                  </div>
                )}
              </div>

              {/* Output panel */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Sortie JSON</Label>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" onClick={handleCopy} title="Copier">
                      <Copy className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={handleDownload} title="Télécharger">
                      <Download className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
                <div className="rounded-lg border overflow-hidden min-h-[300px]">
                  {output ? (
                    <SyntaxHighlighter
                      language="json"
                      style={oneDark}
                      customStyle={{
                        margin: 0,
                        borderRadius: 0,
                        minHeight: '300px',
                        fontSize: '0.8125rem',
                      }}
                    >
                      {output}
                    </SyntaxHighlighter>
                  ) : (
                    <div className="h-[300px] flex items-center justify-center text-muted-foreground text-sm bg-[#1e1e2e]">
                      La sortie apparaîtra ici...
                    </div>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
