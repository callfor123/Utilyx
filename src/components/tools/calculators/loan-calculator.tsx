'use client'

import React, { useState, useMemo } from 'react'
import { Calculator, TrendingDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useTranslations } from 'next-intl'

export function LoanCalculator() {
  const t = useTranslations('ToolsUI')
  const [amount, setAmount] = useState('200000')
  const [rate, setRate] = useState('3.5')
  const [years, setYears] = useState('20')

  const result = useMemo(() => {
    const P = parseFloat(amount)
    const annualRate = parseFloat(rate)
    const n = parseInt(years)
    if (!P || !annualRate || !n || P <= 0 || annualRate <= 0 || n <= 0) return null

    const r = annualRate / 100 / 12
    const N = n * 12
    const monthly = P * (r * Math.pow(1 + r, N)) / (Math.pow(1 + r, N) - 1)
    const totalPaid = monthly * N
    const totalInterest = totalPaid - P

    // Build amortization schedule (first 3 and last month for summary)
    const schedule: { month: number; principal: number; interest: number; balance: number }[] = []
    let balance = P
    for (let m = 1; m <= N; m++) {
      const interestPart = balance * r
      const principalPart = monthly - interestPart
      balance -= principalPart
      if (m <= 3 || m === N) {
        schedule.push({ month: m, principal: principalPart, interest: interestPart, balance: Math.max(0, balance) })
      }
    }

    return { monthly, totalPaid, totalInterest, P, N, schedule }
  }, [amount, rate, years])

  const fmt = (n: number) => n.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            {t('loanCalc')}
          </CardTitle>
          <CardDescription>{t('loanCalcDesc')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Montant emprunté (€)</Label>
              <Input
                type="number"
                placeholder="200000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min={1}
              />
            </div>
            <div className="space-y-2">
              <Label>Taux annuel (%)</Label>
              <Input
                type="number"
                placeholder="3.5"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                min={0.01}
                step={0.01}
              />
            </div>
            <div className="space-y-2">
              <Label>Durée (années)</Label>
              <Input
                type="number"
                placeholder="20"
                value={years}
                onChange={(e) => setYears(e.target.value)}
                min={1}
                max={50}
              />
            </div>
          </div>

          <Button variant="outline" className="w-full" onClick={() => { setAmount(''); setRate(''); setYears('') }}>
            Effacer
          </Button>

          {result && (
            <div className="space-y-4">
              {/* Main result */}
              <div className="rounded-2xl border bg-muted/30 p-6">
                <div className="text-center mb-4">
                  <p className="text-sm text-muted-foreground">Mensualité estimée</p>
                  <p className="text-4xl font-bold text-primary mt-1">{fmt(result.monthly)} €</p>
                  <p className="text-sm text-muted-foreground mt-1">pendant {result.N} mois ({years} ans)</p>
                </div>

                <div className="grid grid-cols-3 gap-3 mt-4">
                  <div className="rounded-xl bg-background border p-3 text-center">
                    <p className="text-xs text-muted-foreground">Capital</p>
                    <p className="text-base font-semibold mt-0.5">{fmt(result.P)} €</p>
                  </div>
                  <div className="rounded-xl bg-background border p-3 text-center">
                    <p className="text-xs text-muted-foreground">Total intérêts</p>
                    <p className="text-base font-semibold text-amber-600 dark:text-amber-400 mt-0.5">{fmt(result.totalInterest)} €</p>
                  </div>
                  <div className="rounded-xl bg-background border p-3 text-center">
                    <p className="text-xs text-muted-foreground">Total remboursé</p>
                    <p className="text-base font-semibold mt-0.5">{fmt(result.totalPaid)} €</p>
                  </div>
                </div>
              </div>

              {/* Interest ratio bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Capital ({((result.P / result.totalPaid) * 100).toFixed(1)}%)</span>
                  <span>Intérêts ({((result.totalInterest / result.totalPaid) * 100).toFixed(1)}%)</span>
                </div>
                <div className="h-3 rounded-full overflow-hidden flex">
                  <div
                    className="h-full bg-primary"
                    style={{ width: `${(result.P / result.totalPaid) * 100}%` }}
                  />
                  <div className="h-full bg-amber-400 flex-1" />
                </div>
              </div>

              {/* Amortization preview */}
              <div className="overflow-x-auto rounded-lg border">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="px-3 py-2 text-left font-medium">Mois</th>
                      <th className="px-3 py-2 text-right font-medium">Capital</th>
                      <th className="px-3 py-2 text-right font-medium">Intérêts</th>
                      <th className="px-3 py-2 text-right font-medium">Solde restant</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {result.schedule.map((row, i) => (
                      <React.Fragment key={row.month}>
                        {i === 3 && result.N > 4 && (
                          <tr className="bg-muted/20">
                            <td colSpan={4} className="px-3 py-1 text-center text-xs text-muted-foreground">
                              <TrendingDown className="inline h-3 w-3 mr-1" />
                              {result.N - 4} mois suivants…
                            </td>
                          </tr>
                        )}
                        <tr className="hover:bg-muted/30 transition-colors">
                          <td className="px-3 py-2">{row.month}</td>
                          <td className="px-3 py-2 text-right text-emerald-600 dark:text-emerald-400">{fmt(row.principal)} €</td>
                          <td className="px-3 py-2 text-right text-amber-600 dark:text-amber-400">{fmt(row.interest)} €</td>
                          <td className="px-3 py-2 text-right font-medium">{fmt(row.balance)} €</td>
                        </tr>
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
