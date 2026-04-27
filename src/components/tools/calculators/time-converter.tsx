'use client'

import { useState, useMemo } from 'react'
import { Clock } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { copyToClipboard } from '@/lib/utils'

type TimeUnit = 'seconds' | 'minutes' | 'hours' | 'days' | 'weeks' | 'months' | 'years'

interface UnitDef {
  name: string
  short: string
  factor: number // seconds per unit
}

const TIME_UNITS: Record<TimeUnit, UnitDef> = {
  seconds: { name: 'Secondes', short: 's', factor: 1 },
  minutes: { name: 'Minutes', short: 'min', factor: 60 },
  hours: { name: 'Heures', short: 'h', factor: 3600 },
  days: { name: 'Jours', short: 'j', factor: 86400 },
  weeks: { name: 'Semaines', short: 'sem', factor: 604800 },
  months: { name: 'Mois', short: 'mo', factor: 2629746 }, // average month
  years: { name: 'Années', short: 'an', factor: 31556952 }, // average year
}

const UNIT_KEYS: TimeUnit[] = ['seconds', 'minutes', 'hours', 'days', 'weeks', 'months', 'years']

const UNIT_ICONS: Record<TimeUnit, string> = {
  seconds: '⏱️',
  minutes: '🕐',
  hours: '🕑',
  days: '📅',
  weeks: '📆',
  months: '🗓️',
  years: '🎯',
}

export function TimeConverter() {
  const [fromUnit, setFromUnit] = useState<TimeUnit>('hours')
  const [inputValue, setInputValue] = useState('1')

  const results = useMemo(() => {
    const val = parseFloat(inputValue)
    if (isNaN(val)) return null

    const sourceFactor = TIME_UNITS[fromUnit].factor
    const totalSeconds = val * sourceFactor

    return UNIT_KEYS.map((unit) => ({
      unit,
      value: totalSeconds / TIME_UNITS[unit].factor,
    }))
  }, [inputValue, fromUnit])

  const formatValue = (v: number) => {
    if (Number.isInteger(v)) return v.toLocaleString('fr-FR')
    if (Math.abs(v) < 0.01) return v.toExponential(2)
    if (Math.abs(v) >= 1000000) return v.toLocaleString('fr-FR', { maximumFractionDigits: 0 })
    return v.toLocaleString('fr-FR', { maximumFractionDigits: 6 })
  }

  const swap = () => {
    if (results) {
      const target = results.find((r) => r.unit !== fromUnit)
      if (target) {
        setInputValue(formatValue(target.value).replace(/\s/g, ''))
      }
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Convertisseur de Temps
          </CardTitle>
          <CardDescription>
            Convertissez entre secondes, minutes, heures, jours, semaines, mois et années.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Unit selector */}
          <div className="space-y-3">
            <Label>Unité source</Label>
            <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
              {UNIT_KEYS.map((unit) => (
                <button
                  key={unit}
                  onClick={() => setFromUnit(unit)}
                  className={`flex flex-col items-center gap-1 px-2 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    fromUnit === unit
                      ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20'
                      : 'bg-muted/60 text-muted-foreground hover:bg-muted'
                  }`}
                >
                  <span className="text-base">{UNIT_ICONS[unit]}</span>
                  <span>{TIME_UNITS[unit].short}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="space-y-2">
            <Label>Valeur en {TIME_UNITS[fromUnit].name.toLowerCase()}</Label>
            <Input
              type="number"
              placeholder="Entrez une valeur"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              min="0"
              step="any"
              className="text-lg"
            />
          </div>

          {/* Results */}
          {results && (
            <div className="rounded-2xl border bg-gradient-to-br from-primary/5 to-violet-500/5 p-4 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {results
                  .filter((r) => r.unit !== fromUnit)
                  .map((r) => (
                    <div
                      key={r.unit}
                      className="flex items-center justify-between rounded-xl bg-background/60 px-4 py-3"
                    >
                      <div className="flex items-center gap-2">
                        <span>{UNIT_ICONS[r.unit]}</span>
                        <span className="text-sm font-medium">{TIME_UNITS[r.unit].name}</span>
                      </div>
                      <span className="font-mono text-sm font-semibold">
                        {formatValue(r.value)}
                      </span>
                    </div>
                  ))}
              </div>
              <div className="flex justify-center gap-2 pt-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const val = parseFloat(inputValue)
                    if (!isNaN(val) && results) {
                      const sourceFactor = TIME_UNITS[fromUnit].factor
                      const totalSeconds = val * sourceFactor
                      copyToClipboard(`${formatValue(totalSeconds)} secondes`)
                      toast.success('Résultat copié !')
                    }
                  }}
                >
                  Copier en secondes
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}