'use client'

import { useState, useMemo } from 'react'
import { Percent } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export function PercentageCalculator() {
  const [tab, setTab] = useState('of')
  const [x, setX] = useState('')
  const [y, setY] = useState('')

  const results = useMemo(() => {
    const fx = parseFloat(x)
    const fy = parseFloat(y)
    if (isNaN(fx) || isNaN(fy) || fy === 0) return null
    switch (tab) {
      case 'of':
        return { label: `${x}% de ${y}`, value: (fx / 100) * fy }
      case 'iswhat':
        return { label: `${x} est quel % de ${y}`, value: (fx / fy) * 100, suffix: '%' }
      case 'change':
        return { label: `Variation de ${x} à ${y}`, value: ((fy - fx) / Math.abs(fx)) * 100, suffix: '%' }
      default:
        return null
    }
  }, [tab, x, y])

  const clear = () => { setX(''); setY('') }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Percent className="h-5 w-5" />
            Percentage Calculator
          </CardTitle>
          <CardDescription>
            Tous les calculs de pourcentages dont vous avez besoin.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs value={tab} onValueChange={(v) => { setTab(v); clear() }}>
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="of">X% de Y</TabsTrigger>
              <TabsTrigger value="iswhat">X est % de Y</TabsTrigger>
              <TabsTrigger value="change">% variation</TabsTrigger>
            </TabsList>

            <TabsContent value="of" className="space-y-4">
              <div className="space-y-2">
                <Label>Quel pourcentage ?</Label>
                <div className="flex items-center gap-2">
                  <Input type="number" placeholder="25" value={x} onChange={(e) => setX(e.target.value)} />
                  <span className="text-sm font-medium">% de</span>
                  <Input type="number" placeholder="200" value={y} onChange={(e) => setY(e.target.value)} />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="iswhat" className="space-y-4">
              <div className="space-y-2">
                <Label>X est quel pourcentage de Y ?</Label>
                <div className="flex items-center gap-2">
                  <Input type="number" placeholder="50" value={x} onChange={(e) => setX(e.target.value)} />
                  <span className="text-sm font-medium">est quel % de</span>
                  <Input type="number" placeholder="200" value={y} onChange={(e) => setY(e.target.value)} />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="change" className="space-y-4">
              <div className="space-y-2">
                <Label>Variation de pourcentage</Label>
                <div className="flex items-center gap-2">
                  <Input type="number" placeholder="80" value={x} onChange={(e) => setX(e.target.value)} />
                  <span className="text-sm font-medium">→</span>
                  <Input type="number" placeholder="100" value={y} onChange={(e) => setY(e.target.value)} />
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <Button variant="outline" className="w-full" onClick={clear}>
            Effacer
          </Button>

          {results && (
            <div className="rounded-2xl border bg-gradient-to-br from-primary/5 to-violet-500/5 p-6 text-center">
              <p className="text-sm text-muted-foreground mb-2">{results.label}</p>
              <p className="text-4xl font-bold text-primary">
                {tab === 'change' ? (results.value >= 0 ? '+' : '') : ''}
                {results.value.toFixed(2)}
                {results.suffix || ''}
              </p>
              {tab === 'change' && (
                <p className={`text-sm mt-1 font-medium ${results.value >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                  {results.value >= 0 ? 'Augmentation' : 'Diminution'}
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
