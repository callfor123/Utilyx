'use client'

import { useState } from 'react'
import { ArrowDownUp, Copy, RotateCcw } from 'lucide-react'
import { toast } from 'sonner'
import { copyToClipboard } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { useTranslations } from 'next-intl'

const CASE_TYPES = [
  { id: 'upper', label: 'UPPERCASE', desc: 'Tout en majuscules' },
  { id: 'lower', label: 'lowercase', desc: 'Tout en minuscules' },
  { id: 'title', label: 'Title Case', desc: 'Première lettre de chaque mot' },
  { id: 'sentence', label: 'Sentence case', desc: 'Première lettre de chaque phrase' },
  { id: 'camel', label: 'camelCase', desc: 'camelCase variable' },
  { id: 'pascal', label: 'PascalCase', desc: 'PascalCase variable' },
  { id: 'snake', label: 'snake_case', desc: 'snake_case variable' },
  { id: 'kebab', label: 'kebab-case', desc: 'kebab-case variable' },
] as const

function convertCase(text: string, type: string): string {
  if (!text) return ''
  switch (type) {
    case 'upper':
      return text.toUpperCase()
    case 'lower':
      return text.toLowerCase()
    case 'title':
      return text.replace(/\w\S*/g, (t) => t.charAt(0).toUpperCase() + t.substring(1).toLowerCase())
    case 'sentence':
      return text.replace(/(^\s*\w|[.!?]\s+\w)/g, (t) => t.toUpperCase())
    case 'camel': {
      const words = text.replace(/[^a-zA-Z0-9\s]/g, '').split(/\s+/).filter(Boolean)
      return words.map((w, i) => i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join('')
    }
    case 'pascal': {
      const words = text.replace(/[^a-zA-Z0-9\s]/g, '').split(/\s+/).filter(Boolean)
      return words.map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join('')
    }
    case 'snake':
      return text.replace(/[^a-zA-Z0-9\s]/g, '').trim().split(/\s+/).join('_').toLowerCase()
    case 'kebab':
      return text.replace(/[^a-zA-Z0-9\s]/g, '').trim().split(/\s+/).join('-').toLowerCase()
    default:
      return text
  }
}

export function CaseConverter() {
  const [input, setInput] = useState('')
  const [activeCase, setActiveCase] = useState('upper')
  const t = useTranslations('ToolsUI')

  const output = convertCase(input, activeCase)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ArrowDownUp className="h-5 w-5" />
            {t('caseConverter')}
          </CardTitle>
          <CardDescription>{t('caseConverterDesc')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="text-sm font-medium mb-2 block">Texte original</label>
            <Textarea
              placeholder="Entrez votre texte ici..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="min-h-[120px] text-base resize-y"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Type de conversion</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {CASE_TYPES.map((ct) => (
                <button
                  key={ct.id}
                  onClick={() => setActiveCase(ct.id)}
                  className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-all text-left ${
                    activeCase === ct.id
                      ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20'
                      : 'bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  <div className="font-mono text-xs">{ct.label}</div>
                  <div className={`text-[10px] mt-0.5 ${activeCase === ct.id ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                    {ct.desc}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium">Résultat</label>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => { copyToClipboard(output); toast.success('Copié !') }}
                  disabled={!output}
                >
                  <Copy className="h-3.5 w-3.5 mr-1" />
                  Copier
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => { setInput(''); toast.success('Effacé') }}
                >
                  <RotateCcw className="h-3.5 w-3.5 mr-1" />
                  Effacer
                </Button>
              </div>
            </div>
            <div className="rounded-lg border bg-muted/30 p-3 min-h-[80px]">
              <p className={`font-mono text-sm break-all ${output ? '' : 'text-muted-foreground'}`}>
                {output || 'Le résultat apparaîtra ici...'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
