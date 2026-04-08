'use client'

import { useState, useMemo } from 'react'
import { Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

function getBMICategory(bmi: number): { label: string; color: string; bg: string; range: string } {
  if (bmi < 18.5) return { label: 'Insuffisance pondérale', color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-500', range: '< 18.5' }
  if (bmi < 25) return { label: 'Poids normal', color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-500', range: '18.5 – 24.9' }
  if (bmi < 30) return { label: 'Surpoids', color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-500', range: '25 – 29.9' }
  return { label: 'Obésité', color: 'text-red-600 dark:text-red-400', bg: 'bg-red-500', range: '≥ 30' }
}

export function BmiCalculator() {
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')

  const bmi = useMemo(() => {
    const h = parseFloat(height)
    const w = parseFloat(weight)
    if (!h || !w || h <= 0 || w <= 0) return null
    const hM = h / 100
    return w / (hM * hM)
  }, [height, weight])

  const category = useMemo(() => bmi ? getBMICategory(bmi) : null, [bmi])

  const bmiPercent = useMemo(() => {
    if (!bmi) return 0
    return Math.min(100, (bmi / 40) * 100)
  }, [bmi])

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5" />
            BMI Calculator
          </CardTitle>
          <CardDescription>
            Calculez votre indice de masse corporelle (IMC).
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Taille (cm)</Label>
              <Input
                type="number"
                placeholder="170"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                min={1}
              />
            </div>
            <div className="space-y-2">
              <Label>Poids (kg)</Label>
              <Input
                type="number"
                placeholder="70"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                min={1}
              />
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => { setHeight(''); setWeight('') }}
          >
            Effacer
          </Button>

          {/* Result */}
          {bmi && category && (
            <div className="space-y-4">
              <div className="rounded-2xl border bg-muted/30 p-6 text-center">
                <p className="text-sm text-muted-foreground mb-1">Votre IMC</p>
                <p className="text-5xl font-bold">{bmi.toFixed(1)}</p>
                <p className={`text-lg font-semibold mt-2 ${category.color}`}>{category.label}</p>
              </div>

              {/* Gauge */}
              <div className="space-y-2">
                <div className="h-3 rounded-full bg-muted overflow-hidden flex">
                  <div className="h-full bg-blue-500" style={{ width: `${(18.5 / 40) * 100}%` }} />
                  <div className="h-full bg-emerald-500" style={{ width: `${((25 - 18.5) / 40) * 100}%` }} />
                  <div className="h-full bg-amber-500" style={{ width: `${((30 - 25) / 40) * 100}%` }} />
                  <div className="h-full bg-red-500 flex-1" />
                </div>
                {/* Indicator */}
                <div className="relative h-4">
                  <div
                    className="absolute top-0 w-0 h-0 border-l-[6px] border-r-[6px] border-b-[8px] border-transparent border-b-foreground"
                    style={{ left: `calc(${bmiPercent}% - 6px)` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-muted-foreground">
                  <span>0</span>
                  <span>18.5</span>
                  <span>25</span>
                  <span>30</span>
                  <span>40+</span>
                </div>
              </div>

              {/* Categories */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { label: 'Insuffisant', color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800', range: '< 18.5' },
                  { label: 'Normal', color: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800', range: '18.5–24.9' },
                  { label: 'Surpoids', color: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800', range: '25–29.9' },
                  { label: 'Obésité', color: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800', range: '≥ 30' },
                ].map((cat) => (
                  <div key={cat.label} className={`rounded-lg border p-2 text-center text-xs ${cat.color}`}>
                    <p className="font-semibold">{cat.label}</p>
                    <p className="opacity-70 mt-0.5">{cat.range}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
