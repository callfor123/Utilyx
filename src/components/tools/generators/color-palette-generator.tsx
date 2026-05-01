'use client'

import { useState, useCallback } from 'react'
import { Palette, Copy, Check, RefreshCw, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useTranslations } from 'next-intl'

interface Color {
  hex: string
  rgb: { r: number; g: number; b: number }
  hsl: { h: number; s: number; l: number }
  name: string
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const clean = hex.replace('#', '')
  const bigint = parseInt(clean, 16)
  return { r: (bigint >> 16) & 255, g: (bigint >> 8) & 255, b: bigint & 255 }
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

function hslToHex(h: number, s: number, l: number): string {
  s /= 100; l /= 100
  const a = s * Math.min(l, 1 - l)
  const f = (n: number) => {
    const k = (n + h / 30) % 12
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
    return Math.round(255 * color).toString(16).padStart(2, '0')
  }
  return `#${f(0)}${f(8)}${f(4)}`
}

function randomHex(): string {
  return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, '0')
}

type Scheme = 'analogous' | 'complementary' | 'triadic' | 'tetradic' | 'monochromatic' | 'split-complementary'

function generatePalette(baseHex: string, scheme: Scheme): Color[] {
  const rgb = hexToRgb(baseHex)
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)
  
  let hues: number[]
  switch (scheme) {
    case 'analogous':
      hues = [hsl.h, (hsl.h + 30) % 360, (hsl.h - 30 + 360) % 360, (hsl.h + 60) % 360, (hsl.h - 60 + 360) % 360]
      break
    case 'complementary':
      hues = [hsl.h, (hsl.h + 180) % 360, (hsl.h + 30) % 360, (hsl.h + 210) % 360, (hsl.h - 30 + 360) % 360]
      break
    case 'triadic':
      hues = [hsl.h, (hsl.h + 120) % 360, (hsl.h + 240) % 360, (hsl.h + 60) % 360, (hsl.h + 180) % 360]
      break
    case 'tetradic':
      hues = [hsl.h, (hsl.h + 90) % 360, (hsl.h + 180) % 360, (hsl.h + 270) % 360, hsl.h]
      break
    case 'monochromatic':
      return [20, 35, 50, 65, 80].map((l, i) => {
        const hex = hslToHex(hsl.h, hsl.s, l)
        const c = hexToRgb(hex)
        return { hex, rgb: c, hsl: rgbToHsl(c.r, c.g, c.b), name: `Teinte ${i + 1}` }
      })
    case 'split-complementary':
      hues = [hsl.h, (hsl.h + 150) % 360, (hsl.h + 210) % 360, (hsl.h + 30) % 360, (hsl.h - 30 + 360) % 360]
      break
    default:
      hues = [hsl.h]
  }

  return hues.slice(0, 5).map((h, i) => {
    const hex = hslToHex(h, hsl.s, hsl.l)
    const c = hexToRgb(hex)
    return { hex, rgb: c, hsl: rgbToHsl(c.r, c.g, c.b), name: `Couleur ${i + 1}` }
  })
}

export function ColorPaletteGenerator() {
  const t = useTranslations('ToolsUI')
  const [baseColor, setBaseColor] = useState('#6366f1')
  const [scheme, setScheme] = useState<Scheme>('analogous')
  const [palette, setPalette] = useState<Color[]>(() => generatePalette('#6366f1', 'analogous'))
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null)

  const generate = useCallback(() => {
    setPalette(generatePalette(baseColor, scheme))
  }, [baseColor, scheme])

  const randomize = () => {
    const hex = randomHex()
    setBaseColor(hex)
    setPalette(generatePalette(hex, scheme))
  }

  const copyColor = async (hex: string, idx: number) => {
    await navigator.clipboard.writeText(hex)
    setCopiedIdx(idx)
    setTimeout(() => setCopiedIdx(null), 2000)
  }

  const exportCSS = () => {
    const css = `:root {\n${palette.map((c, i) => `  --color-${i + 1}: ${c.hex}; /* ${c.hsl.h}° ${c.hsl.s}% ${c.hsl.l}% */`).join('\n')}\n}`
    const blob = new Blob([css], { type: 'text/css' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = 'palette.css'; a.click()
    URL.revokeObjectURL(url)
  }

  const SCHEMES: { value: Scheme; label: string }[] = [
    { value: 'analogous', label: 'Analogique' },
    { value: 'complementary', label: 'Complémentaire' },
    { value: 'triadic', label: 'Triadique' },
    { value: 'tetradic', label: 'Tétradique' },
    { value: 'monochromatic', label: 'Monochromatique' },
    { value: 'split-complementary', label: 'Split-complémentaire' },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            {t('colorPalette')}
          </CardTitle>
          <CardDescription>{t('colorPaletteDesc')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Couleur de base</Label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={baseColor}
                  onChange={(e) => setBaseColor(e.target.value)}
                  className="h-10 w-14 cursor-pointer rounded-md border border-input p-0.5"
                />
                <Input
                  value={baseColor}
                  onChange={(e) => {
                    const v = e.target.value
                    if (/^#[0-9a-fA-F]{0,6}$/.test(v)) setBaseColor(v)
                  }}
                  className="font-mono flex-1"
                  placeholder="#6366f1"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Schéma de couleurs</Label>
              <select
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={scheme}
                onChange={(e) => setScheme(e.target.value as Scheme)}
              >
                {SCHEMES.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-3 flex-wrap">
            <Button onClick={generate} className="flex-1 sm:flex-none">
              <Palette className="h-4 w-4 mr-2" />
              Générer la palette
            </Button>
            <Button variant="outline" onClick={randomize}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Aléatoire
            </Button>
            <Button variant="outline" onClick={exportCSS}>
              <Download className="h-4 w-4 mr-2" />
              CSS
            </Button>
          </div>

          {/* Color swatches */}
          <div className="grid grid-cols-5 gap-2">
            {palette.map((color, idx) => (
              <div key={idx} className="space-y-2">
                <div
                  className="rounded-xl aspect-square cursor-pointer hover:scale-105 transition-transform shadow-md border border-white/20"
                  style={{ backgroundColor: color.hex }}
                  onClick={() => copyColor(color.hex, idx)}
                  title={`Cliquer pour copier ${color.hex}`}
                />
                <div className="text-center space-y-1">
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-xs font-mono font-medium">{color.hex}</span>
                    <button onClick={() => copyColor(color.hex, idx)} className="text-muted-foreground hover:text-foreground transition-colors">
                      {copiedIdx === idx ? <Check className="h-3 w-3 text-green-500" /> : <Copy className="h-3 w-3" />}
                    </button>
                  </div>
                  <p className="text-[10px] text-muted-foreground hidden sm:block">
                    {color.hsl.h}° {color.hsl.s}% {color.hsl.l}%
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* RGB details */}
          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-3 py-2 text-left font-medium">Couleur</th>
                  <th className="px-3 py-2 text-left font-medium">HEX</th>
                  <th className="px-3 py-2 text-left font-medium">RGB</th>
                  <th className="px-3 py-2 text-left font-medium">HSL</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {palette.map((color, idx) => (
                  <tr key={idx} className="hover:bg-muted/30 transition-colors">
                    <td className="px-3 py-2">
                      <div className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded-full border" style={{ backgroundColor: color.hex }} />
                        <span className="text-muted-foreground text-xs">{color.name}</span>
                      </div>
                    </td>
                    <td className="px-3 py-2 font-mono text-xs">{color.hex}</td>
                    <td className="px-3 py-2 font-mono text-xs">rgb({color.rgb.r}, {color.rgb.g}, {color.rgb.b})</td>
                    <td className="px-3 py-2 font-mono text-xs">hsl({color.hsl.h}, {color.hsl.s}%, {color.hsl.l}%)</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
