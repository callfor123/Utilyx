'use client'

import { useState } from 'react'
import { ArrowRightLeft, Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { useTranslations } from 'next-intl'

type Direction = 'json-to-yaml' | 'yaml-to-json'

function jsonToYaml(obj: unknown, indent = 0): string {
  const pad = '  '.repeat(indent)
  if (obj === null) return 'null'
  if (typeof obj === 'boolean') return String(obj)
  if (typeof obj === 'number') return String(obj)
  if (typeof obj === 'string') {
    // Quote strings that contain special chars or look like keywords
    if (/[:#\[\]{},\|\>&\*!?,@`"']/.test(obj) || /^\s|\s$/.test(obj) || obj === '' ||
        ['true','false','null','yes','no','on','off'].includes(obj.toLowerCase())) {
      return `"${obj.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n')}"`
    }
    return obj
  }
  if (Array.isArray(obj)) {
    if (!obj.length) return '[]'
    return obj.map(item => {
      const v = jsonToYaml(item, indent + 1)
      if (typeof item === 'object' && item !== null && !Array.isArray(item)) {
        const lines = v.split('\n')
        return `${pad}- ${lines[0]}\n${lines.slice(1).join('\n')}`
      }
      return `${pad}- ${v}`
    }).join('\n')
  }
  if (typeof obj === 'object') {
    const entries = Object.entries(obj as Record<string, unknown>)
    if (!entries.length) return '{}'
    return entries.map(([k, v]) => {
      const key = /[:#\[\]{},\|\>&\*!?,@`"'\s]/.test(k) ? `"${k}"` : k
      if (typeof v === 'object' && v !== null) {
        const rendered = jsonToYaml(v, indent + 1)
        if (Array.isArray(v) && (v as unknown[]).length === 0) return `${pad}${key}: []`
        if (!Array.isArray(v) && Object.keys(v).length === 0) return `${pad}${key}: {}`
        return `${pad}${key}:\n${rendered}`
      }
      return `${pad}${key}: ${jsonToYaml(v, indent + 1)}`
    }).join('\n')
  }
  return String(obj)
}

function yamlToJson(yaml: string): unknown {
  // Simple YAML parser for common cases (objects, arrays, scalars)
  const lines = yaml.split('\n')
  
  interface ParseResult { value: unknown; nextIndex: number }
  
  function parseValue(raw: string): unknown {
    const s = raw.trim()
    if (s === 'null' || s === '~') return null
    if (s === 'true' || s === 'yes' || s === 'on') return true
    if (s === 'false' || s === 'no' || s === 'off') return false
    if (/^-?\d+(\.\d+)?([eE][+-]?\d+)?$/.test(s)) return Number(s)
    if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
      return s.slice(1, -1).replace(/\\n/g, '\n').replace(/\\"/g, '"')
    }
    return s
  }

  function getIndent(line: string): number {
    return line.length - line.trimStart().length
  }

  function parse(startIdx: number, baseIndent: number): ParseResult {
    const result: Record<string, unknown> | unknown[] = {}
    let isArray: boolean | null = null
    let arr: unknown[] = []
    let i = startIdx

    while (i < lines.length) {
      const line = lines[i]
      if (line.trim() === '' || line.trim().startsWith('#')) { i++; continue }
      const indent = getIndent(line)
      if (indent < baseIndent) break

      const trimmed = line.trim()
      if (trimmed.startsWith('- ')) {
        isArray = true
        const val = trimmed.slice(2).trim()
        if (val === '') {
          // next lines are object
          const sub = parse(i + 1, indent + 2)
          arr.push(sub.value)
          i = sub.nextIndex
        } else if (val.includes(':')) {
          // inline key-value in array item
          const sub = parse(i, indent)
          arr = sub.value as unknown[]
          i = sub.nextIndex
          break
        } else {
          arr.push(parseValue(val))
          i++
        }
      } else if (trimmed.includes(':')) {
        isArray = false
        const colonIdx = trimmed.indexOf(':')
        const key = trimmed.slice(0, colonIdx).trim().replace(/^["']|["']$/g, '')
        const val = trimmed.slice(colonIdx + 1).trim()
        if (val === '' || val.startsWith('#')) {
          // nested
          const nextI = i + 1
          if (nextI < lines.length && lines[nextI].trim() !== '' && !lines[nextI].trim().startsWith('#')) {
            const nextIndent = getIndent(lines[nextI])
            if (nextIndent > indent) {
              const sub = parse(nextI, nextIndent)
              ;(result as Record<string, unknown>)[key] = sub.value
              i = sub.nextIndex
              continue
            }
          }
          ;(result as Record<string, unknown>)[key] = null
          i++
        } else {
          ;(result as Record<string, unknown>)[key] = parseValue(val.split('#')[0].trim())
          i++
        }
      } else {
        i++
      }
    }

    return { value: isArray ? arr : result, nextIndex: i }
  }

  try {
    const { value } = parse(0, 0)
    return value
  } catch {
    throw new Error('Invalid YAML')
  }
}

export function JsonYamlConverter() {
  const t = useTranslations('ToolsUI')
  const [direction, setDirection] = useState<Direction>('json-to-yaml')
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const convert = () => {
    setError('')
    setOutput('')
    if (!input.trim()) return
    try {
      if (direction === 'json-to-yaml') {
        const obj = JSON.parse(input)
        setOutput(jsonToYaml(obj, 0))
      } else {
        const obj = yamlToJson(input)
        setOutput(JSON.stringify(obj, null, 2))
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur de conversion')
    }
  }

  const swap = () => {
    setDirection(d => d === 'json-to-yaml' ? 'yaml-to-json' : 'json-to-yaml')
    setInput(output)
    setOutput('')
    setError('')
  }

  const copy = async () => {
    await navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ArrowRightLeft className="h-5 w-5" />
            {t('jsonYaml')}
          </CardTitle>
          <CardDescription>{t('jsonYamlDesc')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Direction selector */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex gap-2">
              <button
                onClick={() => { setDirection('json-to-yaml'); setOutput(''); setError('') }}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${direction === 'json-to-yaml' ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80'}`}
              >
                JSON → YAML
              </button>
              <button
                onClick={() => { setDirection('yaml-to-json'); setOutput(''); setError('') }}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${direction === 'yaml-to-json' ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80'}`}
              >
                YAML → JSON
              </button>
            </div>
            {output && (
              <Button size="sm" variant="outline" onClick={swap}>
                <ArrowRightLeft className="h-3.5 w-3.5 mr-1" />
                Inverser
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                {direction === 'json-to-yaml' ? 'JSON source' : 'YAML source'}
              </p>
              <Textarea
                className="font-mono text-xs h-64 resize-none"
                placeholder={direction === 'json-to-yaml' ? '{\n  "name": "exemple",\n  "version": "1.0"\n}' : 'name: exemple\nversion: "1.0"'}
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">
                  {direction === 'json-to-yaml' ? 'YAML résultat' : 'JSON résultat'}
                </p>
                {output && (
                  <Button size="sm" variant="ghost" onClick={copy}>
                    {copied ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
                    {copied ? 'Copié !' : 'Copier'}
                  </Button>
                )}
              </div>
              <Textarea
                className={`font-mono text-xs h-64 resize-none ${error ? 'border-destructive bg-destructive/5' : 'bg-muted/30'}`}
                readOnly
                value={error ? `Erreur : ${error}` : output}
                placeholder="Le résultat apparaîtra ici…"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <Button onClick={convert} disabled={!input.trim()} className="flex-1 sm:flex-none">
              Convertir
            </Button>
            <Button variant="outline" onClick={() => { setInput(''); setOutput(''); setError('') }}>
              Effacer
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
