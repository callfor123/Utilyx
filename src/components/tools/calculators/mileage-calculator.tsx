'use client'

import { useState } from 'react'
import { Car, Receipt } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

export default function MileageCalculator() {
  const [distance, setDistance] = useState('1000') // distance totale
  const [rate, setRate] = useState('0.60') // Taux d'indemnité par unité
  const [currency, setCurrency] = useState('€')
  const [unit, setUnit] = useState('km')

  const d = Math.max(0, parseFloat(distance || '0'))
  const r = Math.max(0, parseFloat(rate || '0'))
  
  const indemnity = d * r

  return (
    <Card className="w-full max-w-2xl mx-auto border-border bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Car className="w-5 h-5 text-indigo-500" />
          Calculateur de Frais Kilométriques
        </CardTitle>
        <CardDescription>
          Calculez vos indemnités kilométriques globales. Saisissez la distance et le taux de remboursement de votre pays ou entreprise.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="distance">Distance totale ({unit})</Label>
            <div className="flex gap-2">
              <Input
                id="distance"
                type="number"
                min="0"
                step="0.1"
                placeholder="Ex: 8500"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
                className="flex-1"
              />
              <Select value={unit} onValueChange={setUnit}>
                <SelectTrigger className="w-24">
                  <SelectValue placeholder="Unité" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="km">km</SelectItem>
                  <SelectItem value="mi">miles</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <p className="text-xs text-muted-foreground">La distance parcourue.</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="rate">Taux d'indemnité par {unit}</Label>
            <div className="flex gap-2">
              <Input
                id="rate"
                type="number"
                min="0"
                step="0.01"
                placeholder="Ex: 0.60"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                className="flex-1"
              />
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger className="w-24">
                  <SelectValue placeholder="Devise" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="€">EUR (€)</SelectItem>
                  <SelectItem value="$">USD ($)</SelectItem>
                  <SelectItem value="£">GBP (£)</SelectItem>
                  <SelectItem value="CHF">CHF</SelectItem>
                  <SelectItem value="CAD">CAD ($)</SelectItem>
                  <SelectItem value="MAD">MAD</SelectItem>
                  <SelectItem value="DZD">DZD</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <p className="text-xs text-muted-foreground">Saisissez le cours de remboursement actuel.</p>
          </div>
        </div>

        {d > 0 && r > 0 && (
          <Alert className="mt-8 bg-indigo-50/50 dark:bg-indigo-950/20 border-indigo-200 dark:border-indigo-800">
            <Receipt className="h-4 w-4 text-indigo-500" />
            <AlertTitle className="text-indigo-700 dark:text-indigo-400 font-semibold flex items-center gap-2">
              Votre Indemnité Calculée
            </AlertTitle>
            <AlertDescription className="mt-2 text-3xl font-bold flex items-center gap-2">
              {indemnity.toFixed(2).replace('.', ',')} {currency}
            </AlertDescription>
          </Alert>
        )}

      </CardContent>
    </Card>
  )
}
