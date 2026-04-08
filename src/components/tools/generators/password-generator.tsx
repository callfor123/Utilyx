'use client'

import { useState, useCallback, useMemo } from 'react'
import { KeyRound, Copy, RefreshCw, Shield, ShieldCheck, ShieldAlert, ShieldX } from 'lucide-react'
import { toast } from 'sonner'
import { copyToClipboard } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Checkbox } from '@/components/ui/checkbox'

function getStrength(pwd: string): { score: number; label: string; color: string; icon: React.ElementType } {
  let score = 0
  if (pwd.length >= 8) score++
  if (pwd.length >= 12) score++
  if (pwd.length >= 16) score++
  if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) score++
  if (/\d/.test(pwd)) score++
  if (/[^a-zA-Z0-9]/.test(pwd)) score++
  if (pwd.length >= 20) score++

  if (score <= 2) return { score, label: 'Faible', color: 'bg-red-500', icon: ShieldX }
  if (score <= 4) return { score, label: 'Moyen', color: 'bg-amber-500', icon: ShieldAlert }
  if (score <= 6) return { score, label: 'Fort', color: 'bg-emerald-500', icon: ShieldCheck }
  return { score, label: 'Très fort', color: 'bg-emerald-600', icon: Shield }
}

function generatePassword(length: number, opts: { upper: boolean; lower: boolean; numbers: boolean; symbols: boolean }): string {
  let chars = ''
  if (opts.upper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  if (opts.lower) chars += 'abcdefghijklmnopqrstuvwxyz'
  if (opts.numbers) chars += '0123456789'
  if (opts.symbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?'
  if (!chars) chars = 'abcdefghijklmnopqrstuvwxyz'
  const arr = new Uint32Array(length)
  crypto.getRandomValues(arr)
  return Array.from(arr, (x) => chars[x % chars.length]).join('')
}

export function PasswordGenerator() {
  const [length, setLength] = useState(16)
  const [upper, setUpper] = useState(true)
  const [lower, setLower] = useState(true)
  const [numbers, setNumbers] = useState(true)
  const [symbols, setSymbols] = useState(true)
  const [passwords, setPasswords] = useState<string[]>([])

  const generate = useCallback(() => {
    const count = 5
    const opts = { upper, lower, numbers, symbols }
    const pws = Array.from({ length: count }, () => generatePassword(length, opts))
    setPasswords(pws)
  }, [length, upper, lower, numbers, symbols])

  useMemo(() => { generate() }, [generate])

  const strength = useMemo(() => getStrength(passwords[0] || ''), [passwords])

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <KeyRound className="h-5 w-5" />
            Password Generator
          </CardTitle>
          <CardDescription>
            Générez des mots de passe sécurisés et aléatoires.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Options */}
          <div className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Longueur</Label>
                <span className="text-sm font-bold text-primary">{length}</span>
              </div>
              <Slider
                value={[length]}
                onValueChange={(val) => setLength(val[0])}
                min={4}
                max={128}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>4</span><span>128</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Majuscules (A-Z)', checked: upper, onChange: setUpper },
                { label: 'Minuscules (a-z)', checked: lower, onChange: setLower },
                { label: 'Chiffres (0-9)', checked: numbers, onChange: setNumbers },
                { label: 'Symboles (!@#$…)', checked: symbols, onChange: setSymbols },
              ].map((opt) => (
                <div key={opt.label} className="flex items-center gap-2">
                  <Checkbox
                    id={opt.label}
                    checked={opt.checked}
                    onCheckedChange={(v) => opt.onChange(!!v)}
                  />
                  <label htmlFor={opt.label} className="text-sm cursor-pointer">{opt.label}</label>
                </div>
              ))}
            </div>
          </div>

          <Button onClick={generate} className="w-full">
            <RefreshCw className="h-4 w-4 mr-1.5" />
            Générer de nouveaux mots de passe
          </Button>

          {/* Strength indicator */}
          {passwords[0] && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-1.5">
                  <strength.icon className="h-4 w-4" />
                  Force : {strength.label}
                </Label>
                <span className="text-xs text-muted-foreground">{strength.score}/7</span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${strength.color}`}
                  style={{ width: `${(strength.score / 7) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* Generated passwords */}
          <div className="space-y-2">
            {passwords.map((pw, i) => (
              <div key={i} className="flex items-center gap-2 rounded-lg border bg-muted/30 p-3">
                <code className="flex-1 text-sm font-mono break-all select-all">{pw}</code>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => { copyToClipboard(pw); toast.success('Mot de passe copié !') }}
                >
                  <Copy className="h-3.5 w-3.5" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
