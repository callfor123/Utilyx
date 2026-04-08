'use client'

import { useState, useEffect } from 'react'
import { Link, Copy, RotateCcw } from 'lucide-react'
import { toast } from 'sonner'
import { copyToClipboard } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export function UrlEncodeDecode() {
  const [input, setInput] = useState('')
  const [encoded, setEncoded] = useState('')
  const [decoded, setDecoded] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (!input) { setEncoded(''); setDecoded(''); setError(''); return }
    try {
      setEncoded(encodeURIComponent(input))
      try {
        setDecoded(decodeURIComponent(input))
        setError('')
      } catch {
        setDecoded('')
        setError("L'entrée n'est pas une URL encodée valide")
      }
    } catch {
      setError('Erreur lors de l\'encodage')
      setEncoded('')
      setDecoded('')
    }
  }, [input])

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Link className="h-5 w-5" />
            URL Encode / Decode
          </CardTitle>
          <CardDescription>
            Encodez ou décodez des URLs en temps réel.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label className="mb-2 block">Entrée</Label>
            <Textarea
              placeholder="Entrez une URL ou du texte..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="min-h-[100px] font-mono text-sm resize-y"
            />
          </div>

          {error && (
            <div className="rounded-lg border border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/30 p-3">
              <p className="text-sm text-amber-600 dark:text-amber-400">{error}</p>
            </div>
          )}

          {/* Encoded */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label>Encodé (encodeURIComponent)</Label>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => { copyToClipboard(encoded); toast.success('Copié !') }}
                disabled={!encoded}
              >
                <Copy className="h-3.5 w-3.5 mr-1" />
                Copier
              </Button>
            </div>
            <div className="rounded-lg border bg-muted/30 p-3 max-h-[150px] overflow-y-auto scrollbar-thin">
              <p className="text-sm font-mono break-all">{encoded || '—'}</p>
            </div>
          </div>

          {/* Decoded */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label>Décodé (decodeURIComponent)</Label>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => { copyToClipboard(decoded); toast.success('Copié !') }}
                disabled={!decoded}
              >
                <Copy className="h-3.5 w-3.5 mr-1" />
                Copier
              </Button>
            </div>
            <div className="rounded-lg border bg-muted/30 p-3 max-h-[150px] overflow-y-auto scrollbar-thin">
              <p className="text-sm font-mono break-all">{decoded || '—'}</p>
            </div>
          </div>

          <div className="flex justify-end">
            <Button variant="ghost" size="sm" onClick={() => setInput('')}>
              <RotateCcw className="h-4 w-4 mr-1.5" />
              Effacer
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
