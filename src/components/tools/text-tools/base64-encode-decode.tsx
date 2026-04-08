'use client'

import { useState } from 'react'
import { Lock, Copy, RotateCcw } from 'lucide-react'
import { toast } from 'sonner'
import { copyToClipboard } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'

export function Base64EncodeDecode() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState<'encode' | 'decode'>('encode')
  const [error, setError] = useState('')

  const handleConvert = () => {
    setError('')
    if (!input) {
      setOutput('')
      return
    }
    try {
      if (mode === 'encode') {
        setOutput(btoa(unescape(encodeURIComponent(input))))
      } else {
        setOutput(decodeURIComponent(escape(atob(input.trim()))))
      }
      toast.success(mode === 'encode' ? 'Encodé avec succès' : 'Décodé avec succès')
    } catch {
      setError(mode === 'encode' ? 'Erreur lors de l\'encodage' : 'Chaîne Base64 invalide')
      setOutput('')
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Base64 Encode / Decode
          </CardTitle>
          <CardDescription>
            Encodez du texte en Base64 ou décodez une chaîne Base64.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Mode selector */}
          <div className="flex gap-2">
            <button
              onClick={() => { setMode('encode'); setError('') }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex-1 ${
                mode === 'encode'
                  ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20'
                  : 'bg-muted/60 text-muted-foreground hover:bg-muted'
              }`}
            >
              Encode →
            </button>
            <button
              onClick={() => { setMode('decode'); setError('') }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex-1 ${
                mode === 'decode'
                  ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20'
                  : 'bg-muted/60 text-muted-foreground hover:bg-muted'
              }`}
            >
              ← Decode
            </button>
          </div>

          {/* Input */}
          <div>
            <label className="text-sm font-medium mb-2 block">
              {mode === 'encode' ? 'Texte à encoder' : 'Base64 à décoder'}
            </label>
            <Textarea
              placeholder={mode === 'encode' ? 'Entrez le texte à encoder...' : 'Collez votre chaîne Base64...'}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="min-h-[100px] text-base font-mono resize-y"
            />
          </div>

          <Button onClick={handleConvert} className="w-full">
            {mode === 'encode' ? 'Encoder' : 'Décoder'}
          </Button>

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/30 p-3">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          {/* Output */}
          {output && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium">Résultat</label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => { copyToClipboard(output); toast.success('Copié !') }}
                >
                  <Copy className="h-3.5 w-3.5 mr-1" />
                  Copier
                </Button>
              </div>
              <div className="rounded-lg border bg-muted/30 p-3 max-h-[200px] overflow-y-auto scrollbar-thin">
                <p className="text-sm font-mono break-all">{output}</p>
              </div>
            </div>
          )}

          <div className="flex justify-end">
            <Button variant="ghost" size="sm" onClick={() => { setInput(''); setOutput(''); setError('') }}>
              <RotateCcw className="h-4 w-4 mr-1.5" />
              Effacer tout
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
