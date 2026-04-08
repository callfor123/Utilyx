'use client'

import { useState, useMemo, useCallback } from 'react'
import { toast } from 'sonner'
import {
  Regex,
  Hash,
  Mail,
  Globe,
  Phone,
  Calendar,
  Network
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'

// ── Types ─────────────────────────────────────────────────────────────────
interface MatchInfo {
  value: string
  index: number
  groups?: string[]
}

interface HighlightFragment {
  text: string
  match: boolean
}

// ── Highlighting ──────────────────────────────────────────────────────────
function highlightMatches(text: string, regex: RegExp): HighlightFragment[] {
  if (!regex.source || regex.source === '(?:)') {
    return [{ text, match: false }]
  }
  try {
    const fragments: HighlightFragment[] = []
    let lastIndex = 0
    let match: RegExpExecArray | null
    regex.lastIndex = 0
    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        fragments.push({ text: text.slice(lastIndex, match.index), match: false })
      }
      fragments.push({ text: match[0], match: true })
      lastIndex = match.index + match[0].length
      if (!regex.global) break
      if (match[0].length === 0) {
        regex.lastIndex++
      }
    }
    if (lastIndex < text.length) {
      fragments.push({ text: text.slice(lastIndex), match: false })
    }
    return fragments
  } catch {
    return [{ text, match: false }]
  }
}

// ── Find all matches ──────────────────────────────────────────────────────
function findAllMatches(text: string, regex: RegExp): MatchInfo[] {
  if (!regex.source || regex.source === '(?:)') return []
  try {
    const matches: MatchInfo[] = []
    let match: RegExpExecArray | null
    regex.lastIndex = 0
    while ((match = regex.exec(text)) !== null) {
      matches.push({
        value: match[0],
        index: match.index,
        groups: match.length > 1 ? match.slice(1) : undefined,
      })
      if (!regex.global) break
      if (match[0].length === 0) {
        regex.lastIndex++
      }
    }
    return matches
  } catch {
    return []
  }
}

// ── Common patterns ───────────────────────────────────────────────────────
const COMMON_PATTERNS = [
  { name: 'Email', pattern: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}', icon: Mail },
  { name: 'URL', pattern: 'https?://[^\\s]+', icon: Globe },
  { name: 'Téléphone', pattern: '\\+?[\\d\\s-]{10,}', icon: Phone },
  { name: 'Date', pattern: '\\d{4}-\\d{2}-\\d{2}', icon: Calendar },
  { name: 'Adresse IP', pattern: '\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}', icon: Network },
]

// ── Main component ────────────────────────────────────────────────────────
export function RegexTester() {
  const [pattern, setPattern] = useState('')
  const [testString, setTestString] = useState('')
  const [flagG, setFlagG] = useState(true)
  const [flagI, setFlagI] = useState(false)
  const [flagM, setFlagM] = useState(false)

  // ── Build regex ─────────────────────────────────────────────────────────
  const regex = useMemo((): RegExp | null => {
    if (!pattern) return null
    try {
      let flags = ''
      if (flagG) flags += 'g'
      if (flagI) flags += 'i'
      if (flagM) flags += 'm'
      return new RegExp(pattern, flags)
    } catch {
      return null
    }
  }, [pattern, flagG, flagI, flagM])

  const regexError = useMemo((): string | null => {
    if (!pattern) return null
    try {
      let flags = ''
      if (flagG) flags += 'g'
      if (flagI) flags += 'i'
      if (flagM) flags += 'm'
      new RegExp(pattern, flags)
      return null
    } catch (e: unknown) {
      return (e as Error).message
    }
  }, [pattern, flagG, flagI, flagM])

  // ── Compute results ─────────────────────────────────────────────────────
  const fragments = useMemo(() => {
    if (!regex || !testString) return []
    return highlightMatches(testString, regex)
  }, [regex, testString])

  const matches = useMemo(() => {
    if (!regex || !testString) return []
    return findAllMatches(testString, regex)
  }, [regex, testString])

  // ── Handlers ────────────────────────────────────────────────────────────
  const applyPattern = useCallback((p: string) => {
    setPattern(p)
  }, [])

  const sampleText = `Contactez-nous à contact@example.com ou support@mon-site.fr.
Visitez notre site https://www.example.com/page pour plus d'infos.
Appelez le +33 1 23 45 67 89 ou le 06 12 34 56 78.
La date limite est 2024-12-31.
Notre serveur IP est 192.168.1.100.
Emails : john.doe@company.co.uk, admin@test.org`

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Regex className="h-5 w-5 text-primary" />
          <CardTitle className="text-xl">Testeur d'expressions régulières</CardTitle>
        </div>
        <CardDescription>
          Testez et déboguez vos expressions régulières en temps réel
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Pattern input */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Motif regex</Label>
          <div className="flex items-center gap-2">
            <span className="text-lg font-mono text-muted-foreground font-bold">/</span>
            <Input
              value={pattern}
              onChange={e => setPattern(e.target.value)}
              placeholder="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
              className={cn(
                'font-mono flex-1',
                regexError && 'border-destructive focus-visible:ring-destructive'
              )}
              spellCheck={false}
            />
            <span className="text-lg font-mono text-muted-foreground font-bold">/</span>
            <div className="flex items-center gap-1.5 bg-muted rounded-md px-2 py-1.5">
              {[
                { flag: 'g', label: 'Global', checked: flagG, setter: setFlagG },
                { flag: 'i', label: 'Ignorer casse', checked: flagI, setter: setFlagI },
                { flag: 'm', label: 'Multiligne', checked: flagM, setter: setFlagM },
              ].map(({ flag, label, checked, setter }) => (
                <div key={flag} className="flex items-center gap-1">
                  <Checkbox
                    id={`flag-${flag}`}
                    checked={checked}
                    onCheckedChange={(v) => setter(v === true)}
                    className="h-4 w-4"
                  />
                  <label
                    htmlFor={`flag-${flag}`}
                    className="text-xs font-mono cursor-pointer select-none"
                    title={label}
                  >
                    {flag}
                  </label>
                </div>
              ))}
            </div>
          </div>
          {regexError && (
            <p className="text-xs text-destructive">{regexError}</p>
          )}
        </div>

        {/* Common patterns */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">Motifs courants</Label>
          <div className="flex flex-wrap gap-1.5">
            {COMMON_PATTERNS.map(({ name, pattern: p, icon: Icon }) => (
              <Button
                key={name}
                variant="outline"
                size="sm"
                onClick={() => applyPattern(p)}
                className="gap-1.5 text-xs"
              >
                <Icon className="h-3.5 w-3.5" />
                {name}
              </Button>
            ))}
          </div>
        </div>

        <Separator />

        {/* Test string */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Chaîne de test</Label>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTestString(sampleText)}
              className="text-xs"
            >
              Charger exemple
            </Button>
          </div>
          <textarea
            value={testString}
            onChange={e => setTestString(e.target.value)}
            placeholder="Entrez votre texte de test ici..."
            className="w-full min-h-[150px] rounded-lg border bg-background px-3 py-2 text-sm font-mono resize-none outline-none focus-visible:ring-2 focus-visible:ring-ring"
            spellCheck={false}
          />
        </div>

        {/* Highlighted result */}
        {testString && fragments.length > 0 && (
          <div className="space-y-2">
            <Label className="text-sm font-medium text-muted-foreground">Résultat mis en surbrillance</Label>
            <div className="rounded-lg border bg-background p-3 min-h-[60px] font-mono text-sm leading-relaxed whitespace-pre-wrap break-words">
              {fragments.map((frag, i) => (
                <span
                  key={i}
                  className={cn(
                    frag.match && 'bg-amber-200 dark:bg-amber-900/50 rounded px-0.5 font-semibold'
                  )}
                >
                  {frag.text}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Match info panel */}
        {testString && regex && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Hash className="h-4 w-4 text-muted-foreground" />
              <Label className="text-sm font-medium">
                Correspondances ({matches.length})
              </Label>
            </div>

            {matches.length === 0 ? (
              <p className="text-sm text-muted-foreground italic">
                Aucune correspondance trouvée
              </p>
            ) : (
              <div className="space-y-1.5 max-h-64 overflow-y-auto rounded-lg border p-2">
                {matches.map((m, i) => (
                  <div
                    key={i}
                    className="flex flex-col gap-1 rounded-md bg-muted/50 p-2 text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="font-mono text-[10px]">
                        #{i + 1}
                      </Badge>
                      <span className="font-mono font-semibold text-foreground break-all">
                        &quot;{m.value}&quot;
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <span>Position : <span className="font-mono">{m.index}</span></span>
                      <span>Longueur : <span className="font-mono">{m.value.length}</span></span>
                    </div>
                    {m.groups && m.groups.some(g => g !== undefined) && (
                      <div className="flex flex-wrap gap-1 mt-0.5">
                        {m.groups.map((g, gi) => (
                          g !== undefined && (
                            <Badge key={gi} variant="outline" className="font-mono text-[10px]">
                              G{gi + 1}: &quot;{g}&quot;
                            </Badge>
                          )
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Empty state */}
        {!testString && (
          <div className="rounded-lg border border-dashed p-8 text-center text-muted-foreground text-sm">
            <Regex className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>Entrez un motif et une chaîne de test pour commencer</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
