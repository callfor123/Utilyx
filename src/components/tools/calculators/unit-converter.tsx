'use client'

import { useState, useMemo } from 'react'
import { ArrowRightLeft } from 'lucide-react'
import { toast } from 'sonner'
import { copyToClipboard } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useTranslations } from 'next-intl'

type Category = 'length' | 'weight' | 'temperature' | 'volume'

interface UnitDef {
  name: string
  factor: number // For length/weight/volume: multiply by factor to get base unit
  // For temperature: special handling
}

const CATEGORIES: Record<Category, { label: string; units: Record<string, UnitDef> }> = {
  length: {
    label: 'Longueur',
    units: {
      m: { name: 'Mètres', factor: 1 },
      km: { name: 'Kilomètres', factor: 1000 },
      cm: { name: 'Centimètres', factor: 0.01 },
      mm: { name: 'Millimètres', factor: 0.001 },
      mi: { name: 'Miles', factor: 1609.344 },
      ft: { name: 'Pieds', factor: 0.3048 },
      in: { name: 'Pouces', factor: 0.0254 },
      yd: { name: 'Yards', factor: 0.9144 },
    },
  },
  weight: {
    label: 'Poids',
    units: {
      kg: { name: 'Kilogrammes', factor: 1 },
      g: { name: 'Grammes', factor: 0.001 },
      mg: { name: 'Milligrammes', factor: 0.000001 },
      lb: { name: 'Livres', factor: 0.453592 },
      oz: { name: 'Onces', factor: 0.0283495 },
      t: { name: 'Tonnes', factor: 1000 },
    },
  },
  temperature: {
    label: 'Température',
    units: {
      c: { name: 'Celsius', factor: 0 },
      f: { name: 'Fahrenheit', factor: 0 },
      k: { name: 'Kelvin', factor: 0 },
    },
  },
  volume: {
    label: 'Volume',
    units: {
      l: { name: 'Litres', factor: 1 },
      ml: { name: 'Millilitres', factor: 0.001 },
      gal: { name: 'Gallons (US)', factor: 3.78541 },
      cup: { name: 'Tasses', factor: 0.236588 },
      floz: { name: 'Onces liquides', factor: 0.0295735 },
      m3: { name: 'Mètres cubes', factor: 1000 },
    },
  },
}

const CATEGORY_ICONS: Record<Category, string> = {
  length: '📏',
  weight: '⚖️',
  temperature: '🌡️',
  volume: '🧪',
}

function convertTemperature(val: number, from: string, to: string): number {
  // Convert to Celsius first
  let celsius: number
  switch (from) {
    case 'c': celsius = val; break
    case 'f': celsius = (val - 32) * 5 / 9; break
    case 'k': celsius = val - 273.15; break
    default: return val
  }
  // Convert from Celsius to target
  switch (to) {
    case 'c': return celsius
    case 'f': return (celsius * 9 / 5) + 32
    case 'k': return celsius + 273.15
    default: return celsius
  }
}

export function UnitConverter() {
  const [category, setCategory] = useState<Category>('length')
  const [fromUnit, setFromUnit] = useState('m')
  const [toUnit, setToUnit] = useState('km')
  const [inputValue, setInputValue] = useState('')

  const cat = CATEGORIES[category]
  const unitKeys = Object.keys(cat.units)

  // Reset units when category changes
  const handleCategoryChange = (newCat: Category) => {
    setCategory(newCat)
    const keys = Object.keys(CATEGORIES[newCat].units)
    setFromUnit(keys[0])
    setToUnit(keys[1])
    setInputValue('')
  }

  const result = useMemo(() => {
  const t = useTranslations('ToolsUI')
    const val = parseFloat(inputValue)
    if (isNaN(val)) return null
    if (category === 'temperature') {
      return convertTemperature(val, fromUnit, toUnit)
    }
    const fromFactor = cat.units[fromUnit].factor
    const toFactor = cat.units[toUnit].factor
    return (val * fromFactor) / toFactor
  }, [inputValue, fromUnit, toUnit, category, cat])

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ArrowRightLeft className="h-5 w-5" />
            {t('unitConverter')}
          </CardTitle>
          <CardDescription>{t('unitConverterDesc')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Category selector */}
          <div className="grid grid-cols-4 gap-2">
            {(Object.entries(CATEGORIES) as [Category, typeof CATEGORIES[Category]][]).map(([key, val]) => (
              <button
                key={key}
                onClick={() => handleCategoryChange(key)}
                className={`px-3 py-3 rounded-xl text-sm font-medium transition-all text-center ${
                  category === key
                    ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20'
                    : 'bg-muted/60 text-muted-foreground hover:bg-muted'
                }`}
              >
                <span className="text-lg block">{CATEGORY_ICONS[key]}</span>
                <span className="text-xs">{val.label}</span>
              </button>
            ))}
          </div>

          {/* From */}
          <div className="space-y-2">
            <Label>De</Label>
            <div className="flex gap-2">
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                className="rounded-lg border border-input bg-background px-3 py-2 text-sm h-10"
              >
                {unitKeys.map((k) => (
                  <option key={k} value={k}>{cat.units[k].name}</option>
                ))}
              </select>
              <Input
                type="number"
                placeholder="0"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1"
              />
            </div>
          </div>

          {/* Swap button */}
          <div className="flex justify-center">
            <Button
              variant="outline"
              size="icon"
              onClick={() => { setFromUnit(toUnit); setToUnit(fromUnit) }}
            >
              <ArrowRightLeft className="h-4 w-4" />
            </Button>
          </div>

          {/* To */}
          <div className="space-y-2">
            <Label>Vers</Label>
            <div className="flex gap-2">
              <select
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
                className="rounded-lg border border-input bg-background px-3 py-2 text-sm h-10"
              >
                {unitKeys.map((k) => (
                  <option key={k} value={k}>{cat.units[k].name}</option>
                ))}
              </select>
              <div className="flex-1 rounded-lg border bg-muted/30 px-3 py-2 h-10 flex items-center">
                <span className="text-sm font-mono">
                  {result !== null ? (Number.isInteger(result) ? result : result.toFixed(6)) : '—'}
                </span>
              </div>
            </div>
          </div>

          {/* Result card */}
          {result !== null && inputValue && (
            <div className="rounded-2xl border bg-gradient-to-br from-primary/5 to-violet-500/5 p-4 text-center">
              <p className="text-2xl font-bold text-primary">
                {parseFloat(inputValue)} {cat.units[fromUnit].name}
              </p>
              <p className="text-sm text-muted-foreground my-1">=</p>
              <p className="text-2xl font-bold">
                {Number.isInteger(result) ? result : result.toFixed(6)} {cat.units[toUnit].name}
              </p>
              <Button
                variant="ghost"
                size="sm"
                className="mt-2"
                onClick={() => {
                  copyToClipboard(`${result}`)
                  toast.success('Résultat copié !')
                }}
              >
                Copier
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
