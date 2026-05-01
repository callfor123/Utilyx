'use client'

import { useState } from 'react'
import { Minimize2, Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { useTranslations } from 'next-intl'

type Lang = 'css' | 'js' | 'html'

function minifyCSS(css: string): string {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, '') // comments
    .replace(/\s*([{}:;,>~+])\s*/g, '$1')
    .replace(/\s+/g, ' ')
    .replace(/;\}/g, '}')
    .replace(/\s*!\s*important/g, '!important')
    .trim()
}

function minifyJS(js: string): string {
  // Basic JS minification: remove comments, compress whitespace
  return js
    .replace(/\/\/[^\n]*/g, '') // single-line comments
    .replace(/\/\*[\s\S]*?\*\//g, '') // multi-line comments
    .replace(/\n\s*\n/g, '\n')
    .replace(/[ \t]+/g, ' ')
    .replace(/ ?([\{\}\(\)\[\];,=\+\-\*\/\<\>\!\|\&\?\:]) ?/g, '$1')
    .replace(/\n/g, '')
    .trim()
}

function minifyHTML(html: string): string {
  return html
    .replace(/<!--[\s\S]*?-->/g, '') // comments
    .replace(/\s+/g, ' ')
    .replace(/> </g, '><')
    .replace(/ >/g, '>')
    .trim()
}

const MINIFIERS: Record<Lang, (s: string) => string> = {
  css: minifyCSS,
  js: minifyJS,
  html: minifyHTML,
}

export function CodeMinifier() {
  const t = useTranslations('ToolsUI')
  const [lang, setLang] = useState<Lang>('css')
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)
  const [stats, setStats] = useState<{ original: number; minified: number } | null>(null)

  const minify = () => {
    if (!input.trim()) return
    const result = MINIFIERS[lang](input)
    setOutput(result)
    setStats({ original: new Blob([input]).size, minified: new Blob([result]).size })
  }

  const copy = async () => {
    await navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const saving = stats ? ((1 - stats.minified / stats.original) * 100).toFixed(1) : null

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Minimize2 className="h-5 w-5" />
            {t('codeMinifier')}
          </CardTitle>
          <CardDescription>{t('codeMinifierDesc')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Language tabs */}
          <div className="flex gap-2">
            {(['css', 'js', 'html'] as Lang[]).map((l) => (
              <button
                key={l}
                onClick={() => { setLang(l); setOutput(''); setStats(null) }}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${lang === l ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80'}`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Code source</p>
              <Textarea
                className="font-mono text-xs h-56 resize-none"
                placeholder={`Collez votre code ${lang.toUpperCase()} ici…`}
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">{new Blob([input]).size} octets</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">Résultat minifié</p>
                {output && (
                  <Button size="sm" variant="ghost" onClick={copy}>
                    {copied ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
                    {copied ? 'Copié !' : 'Copier'}
                  </Button>
                )}
              </div>
              <Textarea
                className="font-mono text-xs h-56 resize-none bg-muted/30"
                readOnly
                value={output}
                placeholder="Le code minifié apparaîtra ici…"
              />
              {stats && saving && (
                <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                  {stats.original} → {stats.minified} octets · économie de {saving}%
                </p>
              )}
            </div>
          </div>

          <div className="flex gap-3">
            <Button onClick={minify} disabled={!input.trim()} className="flex-1 sm:flex-none">
              <Minimize2 className="h-4 w-4 mr-2" />
              Minifier le {lang.toUpperCase()}
            </Button>
            <Button variant="outline" onClick={() => { setInput(''); setOutput(''); setStats(null) }}>
              Effacer
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
