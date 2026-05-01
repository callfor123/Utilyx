'use client'

import { useState, useMemo } from 'react'
import { Paintbrush, Copy } from 'lucide-react'
import { toast } from 'sonner'
import { copyToClipboard } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Input } from '@/components/ui/input'
import { useTranslations } from 'next-intl'

interface ColorStop {
  id: string
  color: string
  position: number
}

export function CssGradientGenerator() {
  const [type, setType] = useState<'linear' | 'radial'>('linear')
  const [angle, setAngle] = useState(135)
  const [stops, setStops] = useState<ColorStop[]>([
    { id: '1', color: '#6366f1', position: 0 },
    { id: '2', color: '#06b6d4', position: 50 },
    { id: '3', color: '#a855f7', position: 100 },
  ])

  const addStop = () => {
    const id = String(Date.now())
    const colors = ['#ef4444', '#f59e0b', '#22c55e', '#3b82f6', '#8b5cf6', '#ec4899']
    setStops([...stops, { id, color: colors[Math.floor(Math.random() * colors.length)], position: 50 }])
  }

  const removeStop = (id: string) => {
    if (stops.length <= 2) return
    setStops(stops.filter(s => s.id !== id))
  }

  const updateStop = (id: string, updates: Partial<ColorStop>) => {
    setStops(stops.map(s => s.id === id ? { ...s, ...updates } : s))
  }

  const cssCode = useMemo(() => {
  const t = useTranslations('ToolsUI')
    const sorted = [...stops].sort((a, b) => a.position - b.position)
    const stopsStr = sorted.map(s => `${s.color} ${s.position}%`).join(', ')
    if (type === 'linear') {
      return `background: linear-gradient(${angle}deg, ${stopsStr});`
    }
    return `background: radial-gradient(circle, ${stopsStr});`
  }, [type, angle, stops])

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Paintbrush className="h-5 w-5" />
            {t('cssGradient')}
          </CardTitle>
          <CardDescription>{t('cssGradientDesc')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Type */}
          <div className="flex gap-2">
            <button
              onClick={() => setType('linear')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex-1 ${
                type === 'linear' ? 'bg-primary text-primary-foreground shadow-md' : 'bg-muted/60 text-muted-foreground'
              }`}
            >
              Linéaire
            </button>
            <button
              onClick={() => setType('radial')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex-1 ${
                type === 'radial' ? 'bg-primary text-primary-foreground shadow-md' : 'bg-muted/60 text-muted-foreground'
              }`}
            >
              Radial
            </button>
          </div>

          {/* Angle */}
          {type === 'linear' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Angle</Label>
                <span className="text-sm font-bold text-primary">{angle}°</span>
              </div>
              <Slider
                value={[angle]}
                onValueChange={(val) => setAngle(val[0])}
                min={0}
                max={360}
                step={1}
              />
            </div>
          )}

          {/* Color stops */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Couleurs</Label>
              <Button variant="ghost" size="sm" onClick={addStop}>
                + Ajouter
              </Button>
            </div>
            {stops.map((stop) => (
              <div key={stop.id} className="flex items-center gap-3 rounded-lg border bg-muted/30 p-3">
                <input
                  type="color"
                  value={stop.color}
                  onChange={(e) => updateStop(stop.id, { color: e.target.value })}
                  className="w-8 h-8 rounded-lg cursor-pointer border-0"
                  aria-label="Pick color"
                />
                <Input
                  value={stop.color}
                  onChange={(e) => updateStop(stop.id, { color: e.target.value })}
                  className="w-24 font-mono text-sm"
                />
                <div className="flex-1">
                  <Slider
                    value={[stop.position]}
                    onValueChange={(val) => updateStop(stop.id, { position: val[0] })}
                    min={0}
                    max={100}
                    step={1}
                  />
                </div>
                <span className="text-xs text-muted-foreground w-8 text-right">{stop.position}%</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => removeStop(stop.id)}
                  disabled={stops.length <= 2}
                >
                  ×
                </Button>
              </div>
            ))}
          </div>

          {/* Preview */}
          <div>
            <Label className="mb-2 block">Aperçu</Label>
            <div
              className="w-full h-48 rounded-xl border"
              style={{
                background: type === 'linear'
                  ? `linear-gradient(${angle}deg, ${stops.map(s => `${s.color} ${s.position}%`).join(', ')})`
                  : `radial-gradient(circle, ${stops.map(s => `${s.color} ${s.position}%`).join(', ')})`,
              }}
            />
          </div>

          {/* CSS Code */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label>Code CSS</Label>
              <Button variant="ghost" size="sm" onClick={() => { copyToClipboard(cssCode); toast.success('CSS copié !') }}>
                <Copy className="h-3.5 w-3.5 mr-1" />
                Copier
              </Button>
            </div>
            <pre className="rounded-lg border bg-muted/30 p-4 text-sm font-mono overflow-x-auto">
              {cssCode}
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
