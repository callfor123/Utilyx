'use client'

import { useState } from 'react'
import { HardHat, Calculator } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function ConcreteCalculator() {
  const [calcMode, setCalcMode] = useState<'volume' | 'dimensions'>('dimensions')
  
  // Dimensions
  const [length, setLength] = useState('5')
  const [width, setWidth] = useState('3')
  const [thickness, setThickness] = useState('15') // cm
  
  // Volume direct
  const [volume, setVolume] = useState('2.25') // m3

  // Dosage
  const [dosage, setDosage] = useState('350') // kg/m3

  const calculatedVolume = calcMode === 'dimensions' 
    ? (parseFloat(length || '0') * parseFloat(width || '0') * (parseFloat(thickness || '0') / 100))
    : parseFloat(volume || '0')

  // Les règles générales (par m3 pour un béton à 350kg):
  // 350kg ciment / 680kg sable sec / 1175kg gravillons / 175L eau
  // On ajuste en fonction du dosage ciblé: ratio = dosage / 350
  
  const ratio = parseFloat(dosage) / 350
  
  const cementKg = calculatedVolume * parseFloat(dosage)
  const sandKg = calculatedVolume * 680 * ratio
  const gravelKg = calculatedVolume * 1175 * ratio
  const waterL = calculatedVolume * 175 * ratio

  const bags35kg = Math.ceil(cementKg / 35)
  const sandBags35kg = Math.ceil(sandKg / 35)
  const gravelBags35kg = Math.ceil(gravelKg / 35)

  return (
    <Card className="w-full max-w-3xl mx-auto border-border bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <HardHat className="w-5 h-5 text-orange-500" />
          Calculateur de Dosage Béton
        </CardTitle>
        <CardDescription>
          Estimez rapidement les quantités de ciment, de sable, de gravier et d'eau nécessaires pour votre dalle ou vos fondations.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        
        {/* Entrée des données */}
        <div className="space-y-4">
          <Tabs value={calcMode} onValueChange={(v: any) => setCalcMode(v)} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="dimensions">Je connais les dimensions</TabsTrigger>
              <TabsTrigger value="volume">Je connais le volume (m³)</TabsTrigger>
            </TabsList>
            <div className="pt-4">
              <TabsContent value="dimensions" className="mt-0">
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Longueur (m)</Label>
                    <Input type="number" value={length} onChange={e => setLength(e.target.value)} min="0" />
                  </div>
                  <div className="space-y-2">
                    <Label>Largeur (m)</Label>
                    <Input type="number" value={width} onChange={e => setWidth(e.target.value)} min="0" />
                  </div>
                  <div className="space-y-2">
                    <Label>Épaisseur (cm)</Label>
                    <Input type="number" value={thickness} onChange={e => setThickness(e.target.value)} min="0" />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="volume" className="mt-0">
                <div className="space-y-2">
                  <Label>Volume total nécessaire (m³)</Label>
                  <Input type="number" value={volume} onChange={e => setVolume(e.target.value)} step="0.1" min="0" />
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>

        <div className="space-y-3">
          <Label>Choix du dosage (Usage)</Label>
          <RadioGroup value={dosage} onValueChange={setDosage} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2 border p-3 rounded-md has-[:checked]:border-orange-500 has-[:checked]:bg-orange-50 dark:has-[:checked]:bg-orange-950/20 cursor-pointer">
              <RadioGroupItem value="300" id="v300" />
              <Label htmlFor="v300" className="cursor-pointer">Fondations / Scellement (300 kg/m³)</Label>
            </div>
            <div className="flex items-center space-x-2 border p-3 rounded-md has-[:checked]:border-orange-500 has-[:checked]:bg-orange-50 dark:has-[:checked]:bg-orange-950/20 cursor-pointer">
              <RadioGroupItem value="350" id="v350" />
              <Label htmlFor="v350" className="cursor-pointer">Dalle piétonne / Terrasse (350 kg/m³)</Label>
            </div>
            <div className="flex items-center space-x-2 border p-3 rounded-md has-[:checked]:border-orange-500 has-[:checked]:bg-orange-50 dark:has-[:checked]:bg-orange-950/20 cursor-pointer">
              <RadioGroupItem value="400" id="v400" />
              <Label htmlFor="v400" className="cursor-pointer">Dalle carrossable (400 kg/m³)</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Résultats */}
        {calculatedVolume > 0 && (
          <div className="bg-muted p-6 rounded-lg space-y-6">
            <h3 className="font-semibold flex items-center gap-2 text-lg">
              <Calculator className="w-5 h-5" /> 
              Résultat pour {calculatedVolume.toFixed(2)} m³ de béton
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-background p-4 rounded-md border text-center shadow-sm">
                <p className="text-sm text-muted-foreground mb-1">Ciment (35kg)</p>
                <p className="text-2xl font-bold flex flex-col items-center">
                  <span>{bags35kg} sacs</span>
                  <span className="text-xs text-muted-foreground font-normal mt-1">{Math.round(cementKg)} kg</span>
                </p>
              </div>
              <div className="bg-background p-4 rounded-md border text-center shadow-sm">
                <p className="text-sm text-muted-foreground mb-1">Sable</p>
                <p className="text-2xl font-bold flex flex-col items-center">
                  <span>{sandBags35kg} sacs</span>
                  <span className="text-xs text-muted-foreground font-normal mt-1">{Math.round(sandKg)} kg</span>
                </p>
              </div>
              <div className="bg-background p-4 rounded-md border text-center shadow-sm">
                <p className="text-sm text-muted-foreground mb-1">Gravier</p>
                <p className="text-2xl font-bold flex flex-col items-center">
                  <span>{gravelBags35kg} sacs</span>
                  <span className="text-xs text-muted-foreground font-normal mt-1">{Math.round(gravelKg)} kg</span>
                </p>
              </div>
              <div className="bg-background p-4 rounded-md border text-center shadow-sm">
                <p className="text-sm text-muted-foreground mb-1">Eau</p>
                <p className="text-2xl font-bold flex flex-col items-center">
                  <span className="text-blue-500">{Math.round(waterL)} L</span>
                </p>
              </div>
            </div>
          </div>
        )}

      </CardContent>
    </Card>
  )
}
