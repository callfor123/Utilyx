'use client'

import { useState } from 'react'
import { Copy, SplitSquareVertical } from 'lucide-react'
import { toast } from 'sonner'
import { copyToClipboard } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export default function NameSplitter() {
  const [input, setInput] = useState('')
  const [separator, setSeparator] = useState(';')

  const processNames = () => {
    const lines = input.split('\n').filter((line) => line.trim() !== '')
    const results = lines.map((line) => {
      const parts = line.trim().split(/\s+/)
      if (parts.length === 1) return `${parts[0]}${separator}`
      const firstName = parts[0]
      const lastName = parts.slice(1).join(' ')
      return `${firstName}${separator}${lastName}`
    })
    return results.join('\n')
  }

  const result = processNames()

  const handleCopy = () => {
    if (!result) return
    copyToClipboard(result)
    toast.success('Liste copiée avec succès !')
  }

  return (
    <Card className="w-full max-w-3xl mx-auto border-border bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <SplitSquareVertical className="w-5 h-5 text-blue-500" />
          Séparateur Prénom / Nom
        </CardTitle>
        <CardDescription>
          Collez votre liste de noms complets avec espaces (un par ligne) pour générer automatiquement une liste "Prénom;Nom" compatible Excel ou CRM.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Liste d'origine (1 nom complet par ligne)</Label>
            <Textarea
              placeholder="Jean Michel&#10;Marie Dupont&#10;Pierre-Alain De La Tour"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="h-64 resize-y font-mono text-sm"
            />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label>Résultat Séparé</Label>
              <div className="flex gap-2 text-sm text-muted-foreground items-center">
                <span className="text-xs">Séparateur:</span>
                <select
                  value={separator}
                  onChange={(e) => setSeparator(e.target.value)}
                  className="bg-transparent border border-input rounded p-1 text-xs outline-none"
                >
                  <option value=";">Point-virgule (;)</option>
                  <option value=",">Virgule (,)</option>
                  <option value="&#9;">Tabulation</option>
                </select>
              </div>
            </div>
            <Textarea
              readOnly
              value={result}
              placeholder="Le résultat apparaîtra ici..."
              className="h-64 resize-y font-mono text-sm bg-muted/50"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button onClick={handleCopy} disabled={!result} className="w-full md:w-auto">
            <Copy className="h-4 w-4 mr-2" />
            Copier le résultat
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
