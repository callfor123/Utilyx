'use client'

import { useState } from 'react'
import { Regex, Eye, Copy, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { copyToClipboard } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'

interface MatchResult {
  match: string
  index: number
  groups: string[]
}

export function RegexInterpreter() {
  const [pattern, setPattern] = useState('(\\d{4})-(\\d{2})-(\\d{2})')
  const [flags, setFlags] = useState('g')
  const [testString, setTestString] = useState('Date: 2025-04-30, autre date: 2026-01-15')
  const [matches, setMatches] = useState<MatchResult[]>([])
  const [error, setError] = useState('')

  const handleTest = () => {
    setError('')
    setMatches([])

    try {
      const regex = new RegExp(pattern, flags)
      const results: MatchResult[] = []
      let match: RegExpExecArray | null

      if (flags.includes('g')) {
        while ((match = regex.exec(testString)) !== null) {
          results.push({
            match: match[0],
            index: match.index,
            groups: match.slice(1)
          })
        }
      } else {
        match = regex.exec(testString)
        if (match) {
          results.push({
            match: match[0],
            index: match.index,
            groups: match.slice(1)
          })
        }
      }

      setMatches(results)
      toast.success(`${results.length} correspondance(s) trouvee(s)`)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Expression reguliere invalide')
    }
  }

  const highlightText = (text: string, matchResults: MatchResult[]) => {
    if (matchResults.length === 0) return text

    const parts: React.ReactNode[] = []
    let lastIndex = 0

    matchResults.forEach((m, i) => {
      if (m.index > lastIndex) {
        parts.push(text.slice(lastIndex, m.index))
      }
      parts.push(
        <mark key={i} className="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">
          {m.match}
        </mark>
      )
      lastIndex = m.index + m.match.length
    })

    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex))
    }

    return parts
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Regex className="h-5 w-5" />
            Testeur d'Expressions Regulieres
          </CardTitle>
          <CardDescription>
            Testez et visualisez vos expressions regulieres avec surlignage en temps reel.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Expression Reguliere</label>
              <div className="flex gap-2">
                <Input
                  placeholder="ex: \\d+"
                  value={pattern}
                  onChange={(e) => setPattern((e.target as any).value)}
                  className="font-mono text-sm"
                />
                <Input
                  placeholder="flags (g,i,m,s)"
                  value={flags}
                  onChange={(e) => setFlags((e.target as any).value)}
                  className="w-24 font-mono text-sm"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Chaine de test</label>
              <Textarea
                placeholder="Texte a tester..."
                value={testString}
                onChange={(e) => setTestString((e.target as any).value)}
                className="min-h-[100px] font-mono text-sm resize-y"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button onClick={handleTest} disabled={!pattern || !testString}>
              <Eye className="h-4 w-4 mr-1.5" />
              Tester
            </Button>
            <Button variant="outline" onClick={() => { setPattern(''); setTestString(''); setMatches([]); setError('') }}>
              <Trash2 className="h-4 w-4 mr-1.5" />
              Effacer
            </Button>
            <Button variant="outline" onClick={() => { copyToClipboard(pattern); toast.success('Expression copiee !') }} disabled={!pattern}>
              <Copy className="h-4 w-4 mr-1.5" />
              Copier
            </Button>
          </div>

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/30 p-3">
              <p className="text-sm text-red-600 dark:text-red-400 font-mono">{error}</p>
            </div>
          )}

          {matches.length > 0 && (
            <div className="space-y-3">
              <label className="text-sm font-medium">Texte avec surlignage :</label>
              <div className="rounded-lg border bg-muted/30 p-4 font-mono text-sm whitespace-pre-wrap break-all">
                {highlightText(testString, matches)}
              </div>

              <label className="text-sm font-medium">Resultats ({matches.length}) :</label>
              <div className="rounded-lg border overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="text-left p-3">#</th>
                      <th className="text-left p-3">Correspondance</th>
                      <th className="text-left p-3">Position</th>
                      <th className="text-left p-3">Groupes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {matches.map((m, i) => (
                      <tr key={i} className="border-b last:border-0">
                        <td className="p-3">{i + 1}</td>
                        <td className="p-3 font-mono">{m.match}</td>
                        <td className="p-3 text-muted-foreground">{m.index}</td>
                        <td className="p-3 text-muted-foreground font-mono">
                          {m.groups.length > 0 ? m.groups.join(', ') : '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}