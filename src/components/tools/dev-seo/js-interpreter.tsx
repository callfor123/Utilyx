'use client'

import { useState } from 'react'
import { Code2, Play, Copy, Trash2 } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'
import { copyToClipboard } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'

export function JsInterpreter() {
  const [jsCode, setJsCode] = useState('console.log("Hello World");\n\nfunction addition(a, b) {\n  return a + b;\n}\n\nconsole.log("2 + 3 =", addition(2, 3));')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const t = useTranslations('ToolsUI')

  const handleRun = () => {
    setError('')
    setOutput('')

    const logs: string[] = []
    const originalLog = console.log
    const originalError = console.error

    console.log = (...args: unknown[]) => {
      logs.push(args.map(arg =>
        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
      ).join(' '))
    }

    console.error = (...args: unknown[]) => {
      logs.push('ERROR: ' + args.map(arg =>
        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
      ).join(' '))
    }

    try {
      const result = eval(jsCode)
      if (result !== undefined) {
        logs.push('Resultat: ' + (typeof result === 'object' ? JSON.stringify(result, null, 2) : result))
      }
      setOutput(logs.join('\n'))
      toast.success('Code execute avec succes')
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur inconnue')
    } finally {
      console.log = originalLog
      console.error = originalError
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code2 className="h-5 w-5" />
            {t('jsConsole')}
          </CardTitle>
          <CardDescription>
            {t('jsConsoleDesc')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Code JavaScript</label>
            <Textarea
              placeholder="console.log('Hello');"
              value={jsCode}
              onChange={(e) => setJsCode((e.target as any).value)}
              className="min-h-[200px] font-mono text-sm resize-y"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Button onClick={handleRun} disabled={!jsCode.trim()}>
              <Play className="h-4 w-4 mr-1.5" />
              Executer
            </Button>
            <Button variant="outline" onClick={() => { setJsCode(''); setOutput(''); setError('') }}>
              <Trash2 className="h-4 w-4 mr-1.5" />
              Effacer
            </Button>
            <Button variant="outline" onClick={() => { copyToClipboard(jsCode); toast.success('Code JS copie !') }} disabled={!jsCode.trim()}>
              <Copy className="h-4 w-4 mr-1.5" />
              Copier
            </Button>
          </div>

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/30 p-3">
              <p className="text-sm text-red-600 dark:text-red-400 font-mono">{error}</p>
            </div>
          )}

          {output && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Sortie :</label>
              <pre className="rounded-lg border bg-muted/30 p-4 min-h-[100px] font-mono text-sm overflow-auto whitespace-pre-wrap break-all">
                {output}
              </pre>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}