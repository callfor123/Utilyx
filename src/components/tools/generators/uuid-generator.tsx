'use client'

import { useState } from 'react'
import { Fingerprint, Copy, RefreshCw } from 'lucide-react'
import { toast } from 'sonner'
import { copyToClipboard } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function UuidGenerator() {
  const [uuid, setUuid] = useState(crypto.randomUUID())
  const [count, setCount] = useState(1)
  const [bulkUuids, setBulkUuids] = useState<string[]>([])

  const generateNew = () => {
    setUuid(crypto.randomUUID())
    if (count > 1) {
      const newUuids = Array.from({ length: count }, () => crypto.randomUUID())
      setBulkUuids(newUuids)
    } else {
      setBulkUuids([])
    }
  }

  const handleCopy = async (text: string) => {
    await copyToClipboard(text)
    toast.success('UUID copié dans le presse-papier !')
  }

  const handleBulkCopy = async () => {
    await copyToClipboard(bulkUuids.join('\n'))
    toast.success(`${count} UUIDs copiés !`)
  }

  return (
    <Card className="border-0 shadow-none bg-transparent">
      <CardHeader className="px-0 pt-0">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-emerald-100 dark:bg-emerald-950/30 p-2.5">
            <Fingerprint className="h-5 w-5 text-emerald-500" />
          </div>
          <div>
            <CardTitle className="text-xl">Générateur d'UUID / GUID</CardTitle>
            <CardDescription>Générez instantanément des UUID (Universally Unique Identifiers) version 4 parfaitement aléatoires et sécurisés.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-0 space-y-6">
        <div className="bg-muted/30 p-8 rounded-xl border border-border/50 flex flex-col items-center justify-center space-y-6 text-center">
          
          <div className="text-2xl md:text-3xl font-mono font-bold tracking-wider text-primary bg-background px-6 py-4 rounded-lg border shadow-sm w-full break-all">
            {uuid}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 w-full">
            <Button onClick={() => handleCopy(uuid)} variant="secondary" className="flex-1 md:flex-none">
              <Copy className="w-4 h-4 mr-2" /> Copier
            </Button>
            <Button onClick={generateNew} className="flex-1 md:flex-none">
              <RefreshCw className="w-4 h-4 mr-2" /> Générer un nouveau
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <Label>Générer en masse</Label>
          <div className="flex items-center gap-4">
            <Input 
              type="number" 
              min="1" 
              max="500" 
              value={count} 
              onChange={(e) => setCount(Math.min(500, Math.max(1, parseInt(e.target.value) || 1)))} 
              className="w-24"
            />
            <Button onClick={generateNew} variant="outline">Générer {count} UUIDs</Button>
          </div>
          
          {bulkUuids.length > 0 && (
             <div className="space-y-3 pt-4">
               <div className="flex items-center justify-between">
                  <Label>Résultats ({bulkUuids.length})</Label>
                  <Button variant="ghost" size="sm" onClick={handleBulkCopy}>
                    <Copy className="h-4 w-4 mr-2" /> Tout copier
                  </Button>
               </div>
               <textarea 
                 readOnly 
                 value={bulkUuids.join('\n')}
                 className="w-full h-48 p-4 font-mono text-sm bg-muted rounded-lg border resize-y"
               />
             </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}