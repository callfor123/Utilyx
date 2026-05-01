'use client'

import { useState, useMemo } from 'react'
import { Diff, RotateCcw } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { useTranslations } from 'next-intl'

interface DiffLine {
  type: 'same' | 'added' | 'removed'
  text: string
}

function computeDiff(textA: string, textB: string): DiffLine[] {
  const linesA = textA.split('\n')
  const linesB = textB.split('\n')
  const result: DiffLine[] = []
  const maxLen = Math.max(linesA.length, linesB.length)

  for (let i = 0; i < maxLen; i++) {
    const a = linesA[i] ?? ''
    const b = linesB[i] ?? ''
    if (a === b) {
      result.push({ type: 'same', text: a })
    } else {
      if (a) result.push({ type: 'removed', text: a })
      if (b) result.push({ type: 'added', text: b })
    }
  }

  return result
}

export function TextDiffChecker() {
  const [textA, setTextA] = useState('')
  const [textB, setTextB] = useState('')

  const diff = useMemo(() => {
    if (!textA && !textB) return []
    return computeDiff(textA, textB)
  }, [textA, textB])

  const stats = useMemo(() => {
  const t = useTranslations('ToolsUI')
    const added = diff.filter(d => d.type === 'added').length
    const removed = diff.filter(d => d.type === 'removed').length
    const same = diff.filter(d => d.type === 'same').length
    return { added, removed, same }
  }, [diff])

  const hasChanges = stats.added > 0 || stats.removed > 0

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Diff className="h-5 w-5" />
            {t('textDiff')}
          </CardTitle>
          <CardDescription>{t('textDiffDesc')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Texte original</label>
              <Textarea
                placeholder="Collez le texte original..."
                value={textA}
                onChange={(e) => setTextA(e.target.value)}
                className="min-h-[150px] text-sm resize-y"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Texte modifié</label>
              <Textarea
                placeholder="Collez le texte modifié..."
                value={textB}
                onChange={(e) => setTextB(e.target.value)}
                className="min-h-[150px] text-sm resize-y"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" onClick={() => { setTextA(''); setTextB(''); toast.success('Effacé') }}>
              <RotateCcw className="h-4 w-4 mr-1.5" />
              Effacer
            </Button>
          </div>
        </CardContent>
      </Card>

      {diff.length > 0 && (
        <>
          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-xl border bg-emerald-50 dark:bg-emerald-950/20 p-3 text-center">
              <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">+{stats.added}</p>
              <p className="text-xs text-muted-foreground">Ajoutés</p>
            </div>
            <div className="rounded-xl border bg-red-50 dark:bg-red-950/20 p-3 text-center">
              <p className="text-xl font-bold text-red-600 dark:text-red-400">-{stats.removed}</p>
              <p className="text-xs text-muted-foreground">Supprimés</p>
            </div>
            <div className="rounded-xl border bg-muted/30 p-3 text-center">
              <p className="text-xl font-bold">{stats.same}</p>
              <p className="text-xs text-muted-foreground">Identiques</p>
            </div>
          </div>

          {/* Diff view */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                {hasChanges ? 'Différences trouvées' : 'Les textes sont identiques'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border overflow-hidden max-h-96 overflow-y-auto scrollbar-thin font-mono text-sm">
                {diff.map((line, i) => (
                  <div
                    key={i}
                    className={`px-3 py-1 border-b border-border/30 ${
                      line.type === 'added'
                        ? 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300'
                        : line.type === 'removed'
                          ? 'bg-red-100 dark:bg-red-950/40 text-red-800 dark:text-red-300'
                          : 'text-muted-foreground'
                    }`}
                  >
                    <span className="inline-block w-6 text-xs opacity-50 mr-2 select-none">
                      {line.type === 'added' ? '+' : line.type === 'removed' ? '-' : ' '}
                    </span>
                    {line.text || '\u00A0'}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
