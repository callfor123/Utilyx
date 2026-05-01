'use client'

import { useTranslations } from 'next-intl'

import { useState, useMemo } from 'react'
import { Tag } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export function DiscountCalculator() {
  const t = useTranslations('ToolsUI')
  const [tab, setTab] = useState<'single' | 'double'>('single')
  const [originalPrice, setOriginalPrice] = useState('')
  const [discountPct, setDiscountPct] = useState('')
  const [secondDiscountPct, setSecondDiscountPct] = useState('')
  const [finalPriceInput, setFinalPriceInput] = useState('')
  const [reverseMode, setReverseMode] = useState(false)

  const discountPresets = [5, 10, 15, 20, 25, 30, 40, 50]

  const singleResults = useMemo(() => {
    if (reverseMode) {
      const original = parseFloat(originalPrice)
      const final = parseFloat(finalPriceInput)
      if (isNaN(original) || original <= 0 || isNaN(final) || final <= 0 || final >= original) return null
      const saved = original - final
      const pct = (saved / original) * 100
      return { saved, final, pct }
    }
    const price = parseFloat(originalPrice)
    const pct = parseFloat(discountPct)
    if (isNaN(price) || price <= 0 || isNaN(pct) || pct < 0 || pct > 100) return null
    const saved = price * (pct / 100)
    const final = price - saved
    return { saved, final, pct }
  }, [originalPrice, discountPct, finalPriceInput, reverseMode])

  const doubleResults = useMemo(() => {
    const price = parseFloat(originalPrice)
    const pct1 = parseFloat(discountPct)
    const pct2 = parseFloat(secondDiscountPct)
    if (isNaN(price) || price <= 0 || isNaN(pct1) || pct1 < 0 || isNaN(pct2) || pct2 < 0) return null
    if (pct1 > 100 || pct2 > 100) return null
    const afterFirst = price * (1 - pct1 / 100)
    const afterSecond = afterFirst * (1 - pct2 / 100)
    const saved = price - afterSecond
    const effectivePct = (saved / price) * 100
    return { afterFirst, final: afterSecond, saved, effectivePct }
  }, [originalPrice, discountPct, secondDiscountPct])

  const clear = () => {
    setOriginalPrice('')
    setDiscountPct('')
    setSecondDiscountPct('')
    setFinalPriceInput('')
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Tag className="h-5 w-5" />
            Calculateur de Remise
          </CardTitle>
          <CardDescription>
            Calculez le prix après remise, l&apos;économie réalisée, ou le pourcentage de réduction.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs value={tab} onValueChange={(v) => { setTab(v as 'single' | 'double'); clear() }}>
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="single">Remise simple</TabsTrigger>
              <TabsTrigger value="double">Double remise</TabsTrigger>
            </TabsList>

            <TabsContent value="single" className="space-y-4">
              {/* Original price */}
              <div className="space-y-2">
                <Label>Prix original (€)</Label>
                <Input
                  type="number"
                  placeholder="89.99"
                  value={originalPrice}
                  onChange={(e) => setOriginalPrice(e.target.value)}
                  min="0"
                  step="0.01"
                />
              </div>

              {/* Mode toggle */}
              <div className="flex gap-2">
                <button
                  onClick={() => { setReverseMode(false); clear() }}
                  className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    !reverseMode ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80 text-muted-foreground'
                  }`}
                >
                  Prix → Remise
                </button>
                <button
                  onClick={() => { setReverseMode(true); clear() }}
                  className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    reverseMode ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80 text-muted-foreground'
                  }`}
                >
                  Prix → % remise
                </button>
              </div>

              {!reverseMode ? (
                <>
                  {/* Discount percentage */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>Remise : {discountPct || 0}%</Label>
                      <span className="text-2xl font-bold text-primary">{discountPct || 0}%</span>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {discountPresets.map((p) => (
                        <button
                          key={p}
                          onClick={() => setDiscountPct(String(p))}
                          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                            discountPct === String(p)
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted hover:bg-muted/80 text-muted-foreground'
                          }`}
                        >
                          {p}%
                        </button>
                      ))}
                    </div>
                    <Input
                      type="number"
                      placeholder={t("customPercentage")}
                      value={discountPct}
                      onChange={(e) => setDiscountPct(e.target.value)}
                      min="0"
                      max="100"
                      step="0.1"
                    />
                  </div>
                </>
              ) : (
                <div className="space-y-2">
                  <Label>Prix payé (€)</Label>
                  <Input
                    type="number"
                    placeholder="59.99"
                    value={finalPriceInput}
                    onChange={(e) => setFinalPriceInput(e.target.value)}
                    min="0"
                    step="0.01"
                  />
                </div>
              )}

              {/* Results */}
              {singleResults && (
                <div className="rounded-2xl border bg-gradient-to-br from-primary/5 to-emerald-500/5 p-6 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Prix original</p>
                      <p className="text-2xl font-bold">{parseFloat(originalPrice).toFixed(2)} €</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{reverseMode ? 'Remise' : 'Économie'}</p>
                      <p className="text-2xl font-bold text-emerald-600">{singleResults.saved.toFixed(2)} €</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Prix final</p>
                      <p className="text-2xl font-bold">{singleResults.final.toFixed(2)} €</p>
                    </div>
                  </div>
                  <div className="text-center">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-sm font-semibold">
                      -{singleResults.pct.toFixed(1)}%
                    </span>
                  </div>
                  {!reverseMode && (
                    <p className="text-xs text-muted-foreground text-center">
                      {parseFloat(originalPrice).toFixed(2)} € - {singleResults.pct.toFixed(1)}% = {singleResults.final.toFixed(2)} €
                    </p>
                  )}
                  {reverseMode && (
                    <p className="text-xs text-muted-foreground text-center">
                      {parseFloat(originalPrice).toFixed(2)} € - {singleResults.saved.toFixed(2)} € = {singleResults.final.toFixed(2)} € (remise {singleResults.pct.toFixed(1)}%)
                    </p>
                  )}
                </div>
              )}
            </TabsContent>

            <TabsContent value="double" className="space-y-4">
              {/* Original price */}
              <div className="space-y-2">
                <Label>Prix original (€)</Label>
                <Input
                  type="number"
                  placeholder="89.99"
                  value={originalPrice}
                  onChange={(e) => setOriginalPrice(e.target.value)}
                  min="0"
                  step="0.01"
                />
              </div>

              {/* First discount */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Première remise : {discountPct || 0}%</Label>
                  <span className="text-xl font-bold text-primary">{discountPct || 0}%</span>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {discountPresets.slice(0, 6).map((p) => (
                    <button
                      key={p}
                      onClick={() => setDiscountPct(String(p))}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                        discountPct === String(p)
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted hover:bg-muted/80 text-muted-foreground'
                      }`}
                    >
                      {p}%
                    </button>
                  ))}
                </div>
                <Input
                  type="number"
                  placeholder="Première remise (%)"
                  value={discountPct}
                  onChange={(e) => setDiscountPct(e.target.value)}
                  min="0"
                  max="100"
                  step="0.1"
                />
              </div>

              {/* Second discount */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Deuxième remise : {secondDiscountPct || 0}%</Label>
                  <span className="text-xl font-bold text-primary">{secondDiscountPct || 0}%</span>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {discountPresets.slice(0, 6).map((p) => (
                    <button
                      key={p}
                      onClick={() => setSecondDiscountPct(String(p))}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                        secondDiscountPct === String(p)
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted hover:bg-muted/80 text-muted-foreground'
                      }`}
                    >
                      {p}%
                    </button>
                  ))}
                </div>
                <Input
                  type="number"
                  placeholder="Deuxième remise (%)"
                  value={secondDiscountPct}
                  onChange={(e) => setSecondDiscountPct(e.target.value)}
                  min="0"
                  max="100"
                  step="0.1"
                />
              </div>

              {/* Results */}
              {doubleResults && (
                <div className="rounded-2xl border bg-gradient-to-br from-primary/5 to-emerald-500/5 p-6 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Après 1re remise</p>
                      <p className="text-xl font-bold">{doubleResults.afterFirst.toFixed(2)} €</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Prix final</p>
                      <p className="text-2xl font-bold">{doubleResults.final.toFixed(2)} €</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center border-t border-border pt-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Économie totale</p>
                      <p className="text-xl font-bold text-emerald-600">{doubleResults.saved.toFixed(2)} €</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Remise effective</p>
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-sm font-semibold">
                        -{doubleResults.effectivePct.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground text-center">
                    {parseFloat(originalPrice).toFixed(2)} € -{discountPct}% puis -{secondDiscountPct}% = {doubleResults.final.toFixed(2)} € (remise globale {doubleResults.effectivePct.toFixed(1)}%)
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

export default DiscountCalculator