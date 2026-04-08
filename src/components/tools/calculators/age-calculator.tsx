'use client'

import { useState, useMemo } from 'react'
import { Calendar, Gift } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const DAYS = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']
const MONTHS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre']

export function AgeCalculator() {
  const [birthdate, setBirthdate] = useState('')

  const result = useMemo(() => {
    if (!birthdate) return null
    const birth = new Date(birthdate)
    const now = new Date()

    if (isNaN(birth.getTime())) return null
    if (birth > now) return null

    // Calculate exact age
    let years = now.getFullYear() - birth.getFullYear()
    let months = now.getMonth() - birth.getMonth()
    let days = now.getDate() - birth.getDate()

    if (days < 0) {
      months--
      const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0)
      days += prevMonth.getDate()
    }
    if (months < 0) {
      years--
      months += 12
    }

    // Total days
    const diffMs = now.getTime() - birth.getTime()
    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
    const totalWeeks = Math.floor(totalDays / 7)
    const totalHours = Math.floor(diffMs / (1000 * 60 * 60))
    const totalMinutes = Math.floor(diffMs / (1000 * 60))

    // Day of birth
    const dayOfBirth = DAYS[birth.getDay()]

    // Next birthday
    const nextBirthday = new Date(now.getFullYear(), birth.getMonth(), birth.getDate())
    if (nextBirthday <= now) {
      nextBirthday.setFullYear(nextBirthday.getFullYear() + 1)
    }
    const daysUntilNext = Math.ceil((nextBirthday.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    const nextAge = nextBirthday.getFullYear() - birth.getFullYear()

    return { years, months, days, totalDays, totalWeeks, totalHours, totalMinutes, dayOfBirth, daysUntilNext, nextAge }
  }, [birthdate])

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Age Calculator
          </CardTitle>
          <CardDescription>
            Calculez votre âge exact en années, mois et jours.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Date de naissance</Label>
            <Input
              type="date"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              max={new Date().toISOString().split('T')[0]}
            />
          </div>

          {result && (
            <>
              {/* Main age display */}
              <div className="rounded-2xl border bg-gradient-to-br from-primary/5 to-violet-500/5 p-6 text-center">
                <p className="text-sm text-muted-foreground mb-2">Votre âge</p>
                <div className="flex items-center justify-center gap-4">
                  <div>
                    <p className="text-4xl sm:text-5xl font-bold text-primary">{result.years}</p>
                    <p className="text-xs text-muted-foreground mt-1">ans</p>
                  </div>
                  <span className="text-2xl text-muted-foreground">/</span>
                  <div>
                    <p className="text-4xl sm:text-5xl font-bold">{result.months}</p>
                    <p className="text-xs text-muted-foreground mt-1">mois</p>
                  </div>
                  <span className="text-2xl text-muted-foreground">/</span>
                  <div>
                    <p className="text-4xl sm:text-5xl font-bold">{result.days}</p>
                    <p className="text-xs text-muted-foreground mt-1">jours</p>
                  </div>
                </div>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="rounded-xl border bg-muted/30 p-3 text-center">
                  <p className="text-xl font-bold">{result.totalDays.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Jours vécus</p>
                </div>
                <div className="rounded-xl border bg-muted/30 p-3 text-center">
                  <p className="text-xl font-bold">{result.totalWeeks.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Semaines</p>
                </div>
                <div className="rounded-xl border bg-muted/30 p-3 text-center">
                  <p className="text-xl font-bold">{result.totalHours.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Heures</p>
                </div>
              </div>

              {/* Extra info */}
              <div className="rounded-xl border bg-muted/30 p-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Jour de naissance</span>
                  <span className="font-medium">{result.dayOfBirth}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-1.5">
                    <Gift className="h-3.5 w-3.5" />
                    Prochain anniversaire
                  </span>
                  <span className="font-medium">{result.daysUntilNext} jour{result.daysUntilNext > 1 ? 's' : ''} ({result.nextAge} ans)</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Total minutes</span>
                  <span className="font-medium">{result.totalMinutes.toLocaleString()}</span>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
