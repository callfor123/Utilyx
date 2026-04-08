'use client'

import { useState, useCallback, useEffect } from 'react'
import {
  FileImage,
  Download,
  Loader2,
  RotateCcw,
  Lock,
  Unlock,
  Maximize2,
} from 'lucide-react'
import { toast } from 'sonner'
import { cn, formatFileSize, downloadBlob } from '@/lib/utils'
import { DropZone } from '@/components/layout/drop-zone'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

const PRESETS = [
  { label: '50%', factor: 0.5 },
  { label: '75%', factor: 0.75 },
  { label: '150%', factor: 1.5 },
  { label: '200%', factor: 2.0 },
] as const

export function ImgResize() {
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>('')
  const [originalWidth, setOriginalWidth] = useState<number>(0)
  const [originalHeight, setOriginalHeight] = useState<number>(0)
  const [newWidth, setNewWidth] = useState<number>(0)
  const [newHeight, setNewHeight] = useState<number>(0)
  const [keepAspect, setKeepAspect] = useState<boolean>(true)
  const [isResizing, setIsResizing] = useState(false)

  const handleFiles = useCallback((files: File[]) => {
    const img = files.find((f) => f.type.startsWith('image/'))
    if (!img) {
      toast.error('Veuillez sélectionner une image valide.')
      return
    }

    if (previewUrl) URL.revokeObjectURL(previewUrl)

    const url = URL.createObjectURL(img)
    const tempImg = new Image()
    tempImg.onload = () => {
      const w = tempImg.naturalWidth
      const h = tempImg.naturalHeight
      setFile(img)
      setPreviewUrl(url)
      setOriginalWidth(w)
      setOriginalHeight(h)
      setNewWidth(w)
      setNewHeight(h)
    }
    tempImg.onerror = () => {
      toast.error('Impossible de charger cette image.')
      URL.revokeObjectURL(url)
    }
    tempImg.src = url
  }, [previewUrl])

  const handleReset = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl)
    setFile(null)
    setPreviewUrl('')
    setOriginalWidth(0)
    setOriginalHeight(0)
    setNewWidth(0)
    setNewHeight(0)
    setKeepAspect(true)
  }

  // Maintain aspect ratio
  useEffect(() => {
    if (!keepAspect || originalWidth === 0 || originalHeight === 0) return
    // This effect only runs when one dimension changes
    // We use a flag to prevent infinite loops
  }, [keepAspect, originalWidth, originalHeight])

  const handleWidthChange = (val: string) => {
    const w = parseInt(val, 10)
    if (isNaN(w) || w <= 0) {
      setNewWidth(parseInt(val, 10) || 0)
      return
    }
    setNewWidth(w)
    if (keepAspect && originalWidth > 0 && originalHeight > 0) {
      setNewHeight(Math.round((w / originalWidth) * originalHeight))
    }
  }

  const handleHeightChange = (val: string) => {
    const h = parseInt(val, 10)
    if (isNaN(h) || h <= 0) {
      setNewHeight(parseInt(val, 10) || 0)
      return
    }
    setNewHeight(h)
    if (keepAspect && originalWidth > 0 && originalHeight > 0) {
      setNewWidth(Math.round((h / originalHeight) * originalWidth))
    }
  }

  const handlePreset = (factor: number) => {
    setNewWidth(Math.round(originalWidth * factor))
    setNewHeight(Math.round(originalHeight * factor))
    toast.success(`Dimensions appliquées : ${Math.round(factor * 100)}%`)
  }

  const handleResize = async () => {
    if (!file || newWidth <= 0 || newHeight <= 0) return
    setIsResizing(true)

    try {
      const img = new Image()
      const url = URL.createObjectURL(file)

      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve()
        img.onerror = () => reject(new Error('Erreur de chargement'))
        img.src = url
      })

      const canvas = document.createElement('canvas')
      canvas.width = newWidth
      canvas.height = newHeight
      const ctx = canvas.getContext('2d')!
      ctx.drawImage(img, 0, 0, newWidth, newHeight)
      URL.revokeObjectURL(url)

      const mimeType = file.type === 'image/png' ? 'image/png' : 'image/jpeg'
      const quality = file.type === 'image/png' ? undefined : 0.92

      canvas.toBlob(
        (blob) => {
          if (blob) {
            const baseName = file.name.replace(/\.[^.]+$/, '')
            const ext = file.type === 'image/png' ? 'png' : 'jpg'
            downloadBlob(blob, `${baseName}-${newWidth}x${newHeight}.${ext}`)
            toast.success(
              `Image redimensionnée en ${newWidth} × ${newHeight} px et téléchargée !`
            )
          } else {
            toast.error('Erreur lors de l\'export.')
          }
          setIsResizing(false)
        },
        mimeType,
        quality
      )
    } catch (error) {
      console.error('Resize error:', error)
      toast.error('Erreur lors du redimensionnement.')
      setIsResizing(false)
    }
  }

  const sizeDiff =
    originalWidth > 0 && newWidth > 0
      ? Math.round(((newWidth * newHeight) / (originalWidth * originalHeight)) * 100)
      : 0

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Maximize2 className="h-5 w-5" />
          Redimensionnement d&apos;Image
        </CardTitle>
        <CardDescription>
          Modifiez les dimensions de vos images avec des presets rapides ou des
          valeurs personnalisées.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {!file ? (
          <DropZone
            accept="image/*"
            onFiles={handleFiles}
            maxSize={50}
            label="Glissez-déposez votre image ici"
            sublabel="ou cliquez pour parcourir"
            icon={<FileImage className="h-8 w-8" />}
          />
        ) : (
          <div className="space-y-6">
            {/* File info */}
            <div className="flex items-center gap-4 rounded-lg border bg-muted/30 p-4">
              <div className="rounded-lg bg-primary/10 p-2">
                <FileImage className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{file.name}</p>
                <p className="text-sm text-muted-foreground">
                  {originalWidth} × {originalHeight} px · {formatFileSize(file.size)}
                </p>
              </div>
              <Button variant="ghost" size="sm" onClick={handleReset}>
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>

            {/* Preview */}
            <div className="flex justify-center">
              <div className="relative max-w-md w-full rounded-lg border overflow-hidden bg-[repeating-conic-gradient(#e5e7eb_0%_25%,white_0%_50%)] bg-[length:16px_16px]">
                <img
                  src={previewUrl}
                  alt="Aperçu"
                  className="w-full h-auto max-h-64 object-contain"
                />
              </div>
            </div>

            {/* Presets */}
            <div className="space-y-2">
              <Label>Presets rapides</Label>
              <div className="flex flex-wrap gap-2">
                {PRESETS.map((p) => (
                  <Button
                    key={p.label}
                    variant="outline"
                    size="sm"
                    onClick={() => handlePreset(p.factor)}
                    disabled={isResizing}
                  >
                    {p.label}
                    <span className="text-xs text-muted-foreground ml-1.5">
                      ({Math.round(originalWidth * p.factor)}×
                      {Math.round(originalHeight * p.factor)})
                    </span>
                  </Button>
                ))}
              </div>
            </div>

            <Separator />

            {/* Dimension inputs */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="keep-aspect"
                  checked={keepAspect}
                  onCheckedChange={(checked) => setKeepAspect(checked === true)}
                />
                <Label htmlFor="keep-aspect" className="cursor-pointer flex items-center gap-1.5">
                  {keepAspect ? (
                    <Lock className="h-3.5 w-3.5" />
                  ) : (
                    <Unlock className="h-3.5 w-3.5" />
                  )}
                  Conserver les proportions
                </Label>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="width-input">Largeur (px)</Label>
                  <Input
                    id="width-input"
                    type="number"
                    min={1}
                    value={newWidth}
                    onChange={(e) => handleWidthChange(e.target.value)}
                    disabled={isResizing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height-input">Hauteur (px)</Label>
                  <Input
                    id="height-input"
                    type="number"
                    min={1}
                    value={newHeight}
                    onChange={(e) => handleHeightChange(e.target.value)}
                    disabled={isResizing}
                  />
                </div>
              </div>
            </div>

            {/* Size comparison */}
            <div className="flex items-center justify-between rounded-lg border bg-muted/30 p-4">
              <div className="text-center">
                <p className="text-xs text-muted-foreground">Original</p>
                <p className="text-sm font-bold">
                  {originalWidth} × {originalHeight}
                </p>
              </div>

              <div className="flex flex-col items-center gap-1">
                <Badge
                  variant="secondary"
                  className={cn(
                    sizeDiff < 100 &&
                      'text-green-600 bg-green-100 dark:bg-green-900/40 dark:text-green-400',
                    sizeDiff > 100 &&
                      'text-orange-600 bg-orange-100 dark:bg-orange-900/40 dark:text-orange-400'
                  )}
                >
                  {sizeDiff}%
                </Badge>
              </div>

              <div className="text-center">
                <p className="text-xs text-muted-foreground">Nouveau</p>
                <p className="text-sm font-bold">
                  {newWidth} × {newHeight}
                </p>
              </div>
            </div>

            {/* Resize button */}
            <Button
              onClick={handleResize}
              disabled={isResizing || newWidth <= 0 || newHeight <= 0}
              className="w-full"
              size="lg"
            >
              {isResizing ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Redimensionnement...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  Redimensionner et Télécharger
                </>
              )}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
