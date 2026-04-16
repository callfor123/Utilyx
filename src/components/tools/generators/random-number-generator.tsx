'use client'

import { useState, useCallback } from 'react'
import { Shuffle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'

export function RandomNumberGenerator() {
  const [min, setMin] = useState('1')
  const [max, setMax] = useState('100')
  const [count, setCount] = useState(1)
  const [results, setResults] = useState<number[]>([])
  const [unique, setUnique] = useState(false)

  const generate = useCallback(() => {
    const minNum = parseInt(min) || 1
    const maxNum = parseInt(max) || 100
    const lo = Math.min(minNum, maxNum)
    const hi = Math.max(minNum, maxNum)
    const nums: number[] = []
    const used = new Set<number>()

    for (let i = 0; i < count; i++) {
      if (unique && hi - lo + 1 <= count) {
        let n: number
        do { n = Math.floor(Math.random() * (hi - lo + 1)) + lo }
        while (used.has(n))
        used.add(n)
        nums.push(n)
      } else {
        nums.push(Math.floor(Math.random() * (hi - lo + 1)) + lo)
      }
    }
    setResults(nums)
  }, [min, max, count, unique])

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shuffle className="h-5 w-5" />
            Générateur de Nombre Aléatoire
          </CardTitle>
          <CardDescription>
            Générez un ou plusieurs nombres aléatoires dans une plage donnée.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Range */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Minimum</Label>
              <Input
                type="number"
                value={min}
                onChange={(e) => setMin(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Maximum</Label>
              <Input
                type="number"
                value={max}
                onChange={(e) => setMax(e.target.value)}
              />
            </div>
          </div>

          {/* Count */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Combien de nombres ? : {count}</Label>
            </div>
            <Slider
              value={[count]}
              onValueChange={([v]) => setCount(v)}
              min={1}
              max={20}
              step={1}
              className="w-full"
            />
          </div>

          {/* Unique toggle */}
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={unique}
              onChange={(e) => setUnique(e.target.checked)}
              className="w-4 h-4 rounded"
            />
            <span className="text-sm">Nombres uniques (pas de répétition)</span>
          </label>

          <Button onClick={generate} className="w-full gap-2">
            <Shuffle className="h-4 w-4" />
            Générer
          </Button>

          {/* Results */}
          {results.length > 0 && (
            <div className="rounded-xl bg-muted/50 p-5 text-center space-y-4">
              <div className="flex flex-wrap justify-center gap-3">
                {results.map((n, i) => (
                  <span
                    key={i}
                    className="inline-block px-4 py-2 bg-background rounded-lg text-xl font-bold shadow-sm"
                  >
                    {n}
                  </span>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
