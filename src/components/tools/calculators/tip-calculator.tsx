'use client'

import { useState, useMemo } from 'react'
import { Percent } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'

export function TipCalculator() {
  const [bill, setBill] = useState('')
  const [tipPct, setTipPct] = useState(15)
  const [people, setPeople] = useState(1)

  const results = useMemo(() => {
    const b = parseFloat(bill)
    const p = parseInt(String(people)) || 1
    if (isNaN(b) || b <= 0 || p <= 0) return null
    const tipAmount = b * (tipPct / 100)
    const total = b + tipAmount
    const perPerson = total / p
    return { tipAmount, total, perPerson }
  }, [bill, tipPct, people])

  const tipPresets = [10, 15, 18, 20, 25]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Percent className="h-5 w-5" />
            Calculateur de Pourboire
          </CardTitle>
          <CardDescription>
            Calculez le pourboire et la répartition entre convives.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Bill amount */}
          <div className="space-y-2">
            <Label>Montant de l&apos;addition (€)</Label>
            <Input
              type="number"
              placeholder="45.00"
              value={bill}
              onChange={(e) => setBill(e.target.value)}
              min="0"
              step="0.01"
            />
          </div>

          {/* Tip percentage */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Pourboire : {tipPct}%</Label>
              <span className="text-2xl font-bold text-primary">{tipPct}%</span>
            </div>
            <Slider
              value={[tipPct]}
              onValueChange={([v]) => setTipPct(v)}
              min={0}
              max={30}
              step={1}
              className="w-full"
            />
            <div className="flex gap-2 flex-wrap">
              {tipPresets.map((p) => (
                <button
                  key={p}
                  onClick={() => setTipPct(p)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    tipPct === p
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted hover:bg-muted/80 text-muted-foreground'
                  }`}
                >
                  {p}%
                </button>
              ))}
            </div>
          </div>

          {/* Number of people */}
          <div className="space-y-2">
            <Label>Nombre de personnes</Label>
            <Input
              type="number"
              placeholder="1"
              value={people}
              onChange={(e) => setPeople(e.target.value)}
              min="1"
              max="50"
            />
          </div>

          {/* Results */}
          {results && (
            <div className="rounded-xl bg-muted/50 p-5 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Pourboire</span>
                <span className="font-semibold text-lg">{results.tipAmount.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between items-center border-t border-border pt-3">
                <span className="text-muted-foreground font-medium">Total</span>
                <span className="font-bold text-xl text-primary">{results.total.toFixed(2)} €</span>
              </div>
              {people > 1 && (
                <div className="flex justify-between items-center bg-primary/10 rounded-lg p-3">
                  <span className="text-sm font-medium">Par personne ({people} personnes)</span>
                  <span className="font-bold text-xl text-primary">{results.perPerson.toFixed(2)} €</span>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
