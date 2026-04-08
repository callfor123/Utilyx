'use client'

import { useState, useMemo } from 'react'
import { Palette, Copy } from 'lucide-react'
import { toast } from 'sonner'
import { copyToClipboard } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const match = hex.replace('#', '').match(/^([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i)
  if (!match) return null
  return { r: parseInt(match[1], 16), g: parseInt(match[2], 16), b: parseInt(match[3], 16) }
}

function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255; g /= 255; b /= 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  let h = 0, s = 0
  const l = (max + min) / 2
  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
      case g: h = ((b - r) / d + 2) / 6; break
      case b: h = ((r - g) / d + 4) / 6; break
    }
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) }
}

function getComplementary(hex: string): string {
  const rgb = hexToRgb(hex)
  if (!rgb) return '#000000'
  const comp = { r: 255 - rgb.r, g: 255 - rgb.g, b: 255 - rgb.b }
  return `#${comp.r.toString(16).padStart(2, '0')}${comp.g.toString(16).padStart(2, '0')}${comp.b.toString(16).padStart(2, '0')}`
}

const PRESET_COLORS = [
  '#ef4444', '#f97316', '#f59e0b', '#eab308', '#84cc16', '#22c55e',
  '#10b981', '#14b8a6', '#06b6d4', '#0ea5e9', '#3b82f6', '#6366f1',
  '#8b5cf6', '#a855f7', '#d946ef', '#ec4899', '#f43f5e', '#ffffff',
  '#64748b', '#1e293b', '#0f172a', '#000000', '#fbbf24', '#34d399',
]

export function ColorPicker() {
  const [hex, setHex] = useState('#6366f1')

  const rgb = useMemo(() => hexToRgb(hex), [hex])
  const hsl = useMemo(() => rgb ? rgbToHsl(rgb.r, rgb.g, rgb.b) : null, [rgb])
  const complementary = useMemo(() => getComplementary(hex), [hex])

  const handleHexChange = (val: string) => {
    let v = val
    if (!v.startsWith('#')) v = '#' + v
    if (/^#[0-9a-f]{6}$/i.test(v)) setHex(v)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Color Picker
          </CardTitle>
          <CardDescription>
            Sélectionnez une couleur et obtenez ses valeurs HEX, RGB, HSL.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Color preview + picker */}
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <div className="flex flex-col items-center gap-3">
              <div
                className="w-40 h-40 rounded-2xl border-2 border-border shadow-lg cursor-pointer"
                style={{ backgroundColor: hex }}
              >
                <input
                  type="color"
                  value={hex}
                  onChange={(e) => setHex(e.target.value)}
                  className="w-full h-full opacity-0 cursor-pointer"
                  aria-label="Color picker"
                />
              </div>
              <p className="text-xs text-muted-foreground">Cliquez pour changer</p>
            </div>

            <div className="flex-1 space-y-4 w-full">
              <div className="space-y-2">
                <Label>HEX</Label>
                <div className="flex gap-2">
                  <Input
                    value={hex}
                    onChange={(e) => handleHexChange(e.target.value)}
                    className="font-mono"
                    maxLength={7}
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => { copyToClipboard(hex); toast.success('HEX copié !') }}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {rgb && (
                <div className="space-y-2">
                  <Label>RGB</Label>
                  <div className="flex gap-2">
                    <Input value={`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`} readOnly className="font-mono" />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => { copyToClipboard(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`); toast.success('RGB copié !') }}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {hsl && (
                <div className="space-y-2">
                  <Label>HSL</Label>
                  <div className="flex gap-2">
                    <Input value={`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`} readOnly className="font-mono" />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => { copyToClipboard(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`); toast.success('HSL copié !') }}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Preset colors */}
          <div>
            <Label className="mb-2 block">Couleurs populaires</Label>
            <div className="flex flex-wrap gap-2">
              {PRESET_COLORS.map((color) => (
                <button
                  key={color}
                  onClick={() => setHex(color)}
                  className={`w-8 h-8 rounded-lg border-2 transition-transform hover:scale-110 ${
                    hex === color ? 'border-foreground scale-110' : 'border-border'
                  }`}
                  style={{ backgroundColor: color }}
                  aria-label={color}
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Complementary color */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="flex gap-3">
              <div className="text-center">
                <div className="w-16 h-16 rounded-xl border" style={{ backgroundColor: hex }} />
                <p className="text-[10px] text-muted-foreground mt-1">Original</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-xl border" style={{ backgroundColor: complementary }} />
                <p className="text-[10px] text-muted-foreground mt-1">Complémentaire</p>
              </div>
            </div>
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium">Couleur complémentaire</p>
              <div className="flex items-center gap-2">
                <code className="text-sm font-mono">{complementary}</code>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7"
                  onClick={() => { copyToClipboard(complementary); toast.success('Copié !') }}
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
