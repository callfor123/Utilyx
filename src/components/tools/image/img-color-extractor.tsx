'use client'

import { useState, useCallback, useRef, useMemo } from 'react'
import {
  Pipette,
  Copy,
  Loader2,
  RotateCcw,
  Palette,
  Download,
} from 'lucide-react'
import { toast } from 'sonner'
import { cn, formatFileSize } from '@/lib/utils'
import { DropZone } from '@/components/layout/drop-zone'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

interface ExtractedColor {
  hex: string
  rgb: { r: number; g: number; b: number }
  hsl: { h: number; s: number; l: number }
  percentage: number
}

function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('')
}

function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  const rn = r / 255, gn = g / 255, bn = b / 255
  const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn)
  let h = 0, s = 0
  const l = (max + min) / 2
  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case rn: h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6; break
      case gn: h = ((bn - rn) / d + 2) / 6; break
      case bn: h = ((rn - gn) / d + 4) / 6; break
    }
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) }
}

function extractColors(imageData: ImageData, maxColors: number): ExtractedColor[] {
  const data = imageData.data
  const colorMap = new Map<string, { r: number; g: number; b: number; count: number }>()

  // Sample every 4th pixel for performance
  const step = 4
  for (let i = 0; i < data.length; i += 4 * step) {
    const r = data[i], g = data[i + 1], b = data[i + 2], a = data[i + 3]
    if (a < 128) continue // skip transparent

    // Quantize to reduce similar colors (group by 8-value steps)
    const qr = Math.round(r / 8) * 8
    const qg = Math.round(g / 8) * 8
    const qb = Math.round(b / 8) * 8
    const key = `${qr},${qg},${qb}`

    const existing = colorMap.get(key)
    if (existing) {
      existing.count++
      // Keep the average color
      existing.r = Math.round((existing.r * (existing.count - 1) + r) / existing.count)
      existing.g = Math.round((existing.g * (existing.count - 1) + g) / existing.count)
      existing.b = Math.round((existing.b * (existing.count - 1) + b) / existing.count)
    } else {
      colorMap.set(key, { r: qr, g: qg, b: qb, count: 1 })
    }
  }

  const sorted = [...colorMap.values()].sort((a, b) => b.count - a.count)
  const totalPixels = sorted.reduce((sum, c) => sum + c.count, 0)

  return sorted.slice(0, maxColors).map(c => ({
    hex: rgbToHex(c.r, c.g, c.b),
    rgb: { r: c.r, g: c.g, b: c.b },
    hsl: rgbToHsl(c.r, c.g, c.b),
    percentage: Math.round((c.count / totalPixels) * 1000) / 10,
  }))
}

export function ImgColorExtractor() {
  const [file, setFile] = useState<File | null>(null)
  const [imageUrl, setImageUrl] = useState<string>('')
  const [colors, setColors] = useState<ExtractedColor[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [numColors, setNumColors] = useState(8)
  const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number } | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleFiles = useCallback((files: File[]) => {
    const img = files.find(f => f.type.startsWith('image/'))
    if (!img) {
      toast.error('Veuillez sélectionner une image valide.')
      return
    }
    setFile(img)
    setColors([])
    const url = URL.createObjectURL(img)
    setImageUrl(url)

    const tempImg = new Image()
    tempImg.onload = () => {
      setImageDimensions({ width: tempImg.naturalWidth, height: tempImg.naturalHeight })
      URL.revokeObjectURL(tempImg.src)
    }
    tempImg.src = url
  }, [])

  const handleReset = () => {
    if (imageUrl) URL.revokeObjectURL(imageUrl)
    setFile(null)
    setImageUrl('')
    setColors([])
    setImageDimensions(null)
  }

  const handleExtract = useCallback(() => {
    if (!file || !imageUrl) return
    setIsProcessing(true)

    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      const canvas = canvasRef.current || document.createElement('canvas')
      // Limit canvas size for performance
      const maxDim = 400
      const scale = Math.min(maxDim / img.naturalWidth, maxDim / img.naturalHeight, 1)
      canvas.width = Math.round(img.naturalWidth * scale)
      canvas.height = Math.round(img.naturalHeight * scale)

      const ctx = canvas.getContext('2d', { willReadFrequently: true })
      if (!ctx) {
        toast.error('Canvas not supported')
        setIsProcessing(false)
        return
      }

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const extracted = extractColors(imageData, numColors)
      setColors(extracted)
      setIsProcessing(false)
      toast.success(`${extracted.length} couleurs extraites !`)
    }
    img.onerror = () => {
      toast.error('Erreur lors du chargement de l\'image.')
      setIsProcessing(false)
    }
    img.src = imageUrl
  }, [file, imageUrl, numColors])

  const copyColor = (color: ExtractedColor, format: 'hex' | 'rgb' | 'hsl') => {
    let text = ''
    switch (format) {
      case 'hex': text = color.hex; break
      case 'rgb': text = `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`; break
      case 'hsl': text = `hsl(${color.hsl.h}, ${color.hsl.s}%, ${color.hsl.l}%)`; break
    }
    navigator.clipboard.writeText(text)
    toast.success(`${text} copié !`)
  }

  const handleExportPalette = () => {
    if (!colors.length) return
    const lines = colors.map(c =>
      `${c.hex}\tRGB(${c.rgb.r}, ${c.rgb.g}, ${c.rgb.b})\tHSL(${c.hsl.h}, ${c.hsl.s}%, ${c.hsl.l}%)\t${c.percentage}%`
    )
    const header = 'HEX\tRGB\tHSL\tPercentage'
    const csv = header + '\n' + lines.join('\n')
    const blob = new Blob([csv], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${file?.name.replace(/\.[^.]+$/, '') || 'palette'}-colors.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success('Palette téléchargée.')
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Pipette className="h-5 w-5" />
          Extracteur de Couleurs d&apos;Image
        </CardTitle>
        <CardDescription>
          Extrayez les couleurs dominantes d&apos;une image avec proportion HEX, RGB, HSL
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <canvas ref={canvasRef} className="hidden" />

        {!file ? (
          <DropZone
            accept="image/*"
            onFiles={handleFiles}
            maxSize={20}
            label="Glissez-déposez votre image ici"
            sublabel="ou cliquez pour parcourir"
            icon={<Pipette className="h-8 w-8" />}
          />
        ) : (
          <div className="space-y-6">
            {/* File info */}
            <div className="flex items-center gap-4 rounded-lg border bg-muted/30 p-4">
              <div className="rounded-lg bg-primary/10 p-2">
                <Pipette className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{file.name}</p>
                <p className="text-sm text-muted-foreground">
                  {imageDimensions ? `${imageDimensions.width} × ${imageDimensions.height} px · ` : ''}
                  {formatFileSize(file.size)}
                </p>
              </div>
              <Button variant="ghost" size="sm" onClick={handleReset}>
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>

            {/* Number of colors selector */}
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium">Nombre de couleurs</label>
              <div className="flex gap-2">
                {[4, 6, 8, 12, 16].map(n => (
                  <button
                    key={n}
                    onClick={() => setNumColors(n)}
                    className={cn(
                      'px-3 py-1.5 text-sm rounded-md border transition-colors',
                      numColors === n
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-background hover:bg-muted'
                    )}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>

            {/* Preview image */}
            {imageUrl && (
              <div className="space-y-3">
                <p className="text-sm font-medium">Aperçu de l&apos;image</p>
                <div className="relative mx-auto max-w-full overflow-hidden rounded-lg border bg-[repeating-conic-gradient(#e5e7eb_0%_25%,white_0%_50%)] bg-[length:16px_16px]">
                  <img
                    src={imageUrl}
                    alt="Prévisualisation"
                    className="w-full h-auto max-h-[300px] object-contain"
                    draggable={false}
                  />
                </div>
              </div>
            )}

            {/* Extract button */}
            <div className="flex gap-2">
              <Button
                onClick={handleExtract}
                disabled={isProcessing}
                className="flex-1"
                size="lg"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Extraction en cours...
                  </>
                ) : colors.length > 0 ? (
                  <>
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Ré-extraire
                  </>
                ) : (
                  <>
                    <Palette className="h-4 w-4 mr-2" />
                    Extraire les couleurs
                  </>
                )}
              </Button>
              {colors.length > 0 && (
                <Button variant="outline" onClick={handleExportPalette}>
                  <Download className="h-4 w-4 mr-2" />
                  Exporter
                </Button>
              )}
            </div>

            {/* Extracted colors */}
            {colors.length > 0 && (
              <div className="space-y-3">
                <p className="text-sm font-medium">Couleurs extraites</p>

                {/* Palette bar */}
                <div className="flex h-10 rounded-lg overflow-hidden border">
                  {colors.map((color, i) => (
                    <div
                      key={i}
                      className="flex-1 cursor-pointer hover:brightness-110 transition-all"
                      style={{ backgroundColor: color.hex }}
                      title={`${color.hex} — ${color.percentage}%`}
                      onClick={() => copyColor(color, 'hex')}
                    />
                  ))}
                </div>

                {/* Color list */}
                <div className="space-y-2">
                  {colors.map((color, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 rounded-lg border p-3 hover:bg-muted/50 transition-colors"
                    >
                      <div
                        className="w-10 h-10 rounded-md border shrink-0 cursor-pointer"
                        style={{ backgroundColor: color.hex }}
                        onClick={() => copyColor(color, 'hex')}
                        title="Cliquez pour copier HEX"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-mono text-sm font-semibold">{color.hex}</span>
                          <span className="text-xs text-muted-foreground">
                            {color.percentage}%
                          </span>
                        </div>
                        <div className="flex gap-3 text-xs text-muted-foreground mt-0.5">
                          <span>RGB({color.rgb.r}, {color.rgb.g}, {color.rgb.b})</span>
                          <span>HSL({color.hsl.h}, {color.hsl.s}%, {color.hsl.l}%)</span>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm" onClick={() => copyColor(color, 'hex')} title="Copier HEX">
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}