'use client'

import { useState, useMemo } from 'react'
import { Receipt } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useTranslations } from 'next-intl'

const VAT_RATES = [
  { label: 'FR 20%', value: 20 },
  { label: 'FR 10%', value: 10 },
  { label: 'FR 5,5%', value: 5.5 },
  { label: 'FR 2,1%', value: 2.1 },
  { label: 'BE 21%', value: 21 },
  { label: 'BE 6%', value: 6 },
  { label: 'CH 7,7%', value: 7.7 },
  { label: 'CH 3,7%', value: 3.7 },
  { label: 'CH 2,5%', value: 2.5 },
  { label: 'DE 19%', value: 19 },
  { label: 'DE 7%', value: 7 },
  { label: 'ES 21%', value: 21 },
  { label: 'ES 10%', value: 10 },
  { label: 'ES 4%', value: 4 },
  { label: 'UK 20%', value: 20 },
  { label: 'UK 5%', value: 5 },
]

export function VatCalculator() {
  const [tab, setTab] = useState<'fromTTC' | 'fromHT'>('fromTTC')
  const [amount, setAmount] = useState('')
  const [customRate, setCustomRate] = useState('')
  const [selectedRate, setSelectedRate] = useState(20)

  const rate = customRate !== '' ? parseFloat(customRate) : selectedRate

  const results = useMemo(() => {
  const t = useTranslations('ToolsUI')
    const a = parseFloat(amount)
    if (isNaN(a) || a <= 0 || isNaN(rate) || rate < 0) return null

    if (tab === 'fromTTC') {
      const ht = a / (1 + rate / 100)
      const vat = a - ht
      return { ht, vat, ttc: a, rate }
    } else {
      const vat = a * (rate / 100)
      const ttc = a + vat
      return { ht: a, vat, ttc, rate }
    }
  }, [tab, amount, rate])

  const clear = () => {
    setAmount('')
    setCustomRate('')
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Receipt className="h-5 w-5" />
            {t('vatCalc')}
          </CardTitle>
          <CardDescription>{t('vatCalcDesc')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs value={tab} onValueChange={(v) => { setTab(v as 'fromTTC' | 'fromHT'); clear() }}>
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="fromTTC">Du TTC vers HT</TabsTrigger>
              <TabsTrigger value="fromHT">Du HT vers TTC</TabsTrigger>
            </TabsList>

            <TabsContent value="fromTTC" className="space-y-4">
              <div className="space-y-2">
                <Label>Montant TTC (€)</Label>
                <Input
                  type="number"
                  placeholder="120,00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  min="0"
                  step="0.01"
                />
              </div>
            </TabsContent>

            <TabsContent value="fromHT" className="space-y-4">
              <div className="space-y-2">
                <Label>Montant HT (€)</Label>
                <Input
                  type="number"
                  placeholder="100,00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  min="0"
                  step="0.01"
                />
              </div>
            </TabsContent>
          </Tabs>

          {/* Rate selection */}
          <div className="space-y-3">
            <Label>Taux de TVA : {rate}%</Label>
            <div className="flex gap-2 flex-wrap">
              {VAT_RATES.map((r) => (
                <button
                  key={r.label}
                  onClick={() => { setSelectedRate(r.value); setCustomRate('') }}
                  className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                    customRate === '' && selectedRate === r.value
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted hover:bg-muted/80 text-muted-foreground'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <Label className="text-sm whitespace-nowrap">Taux personnalisé :</Label>
              <Input
                type="number"
                placeholder="ex: 8,5"
                value={customRate}
                onChange={(e) => setCustomRate(e.target.value)}
                min="0"
                max="100"
                step="0.1"
                className="w-28"
              />
              <span className="text-sm text-muted-foreground">%</span>
            </div>
          </div>

          {/* Results */}
          {results && (
            <div className="rounded-2xl border bg-gradient-to-br from-primary/5 to-violet-500/5 p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Montant HT</p>
                  <p className="text-2xl font-bold">{results.ht.toFixed(2)} €</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">TVA ({results.rate}%)</p>
                  <p className="text-2xl font-bold text-primary">{results.vat.toFixed(2)} €</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Montant TTC</p>
                  <p className="text-2xl font-bold">{results.ttc.toFixed(2)} €</p>
                </div>
              </div>
              {tab === 'fromTTC' && (
                <p className="text-xs text-muted-foreground text-center">
                  {results.ht.toFixed(2)} € HT + {results.vat.toFixed(2)} € TVA = {results.ttc.toFixed(2)} € TTC
                </p>
              )}
              {tab === 'fromHT' && (
                <p className="text-xs text-muted-foreground text-center">
                  {results.ht.toFixed(2)} € HT × {results.rate}% = {results.vat.toFixed(2)} € TVA → {results.ttc.toFixed(2)} € TTC
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
