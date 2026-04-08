'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import {
  FileImage,
  Download,
  Loader2,
  RotateCcw,
  GripVertical,
} from 'lucide-react'
import imageCompression from 'browser-image-compression'
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
import { Slider } from '@/components/ui/slider'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const OUTPUT_FORMAT_OPTIONS = [
  { value: 'original', label: 'Format original' },
  { value: 'image/webp', label: 'WebP' },
  { value: 'image/jpeg', label: 'JPG' },
] as const

function getMimeTypeLabel(mime: string): string {
  const map: Record<string, string> = {
    'image/jpeg': 'JPG',
    'image/png': 'PNG',
    'image/gif': 'GIF',
    'image/webp': 'WebP',
    'image/avif': 'AVIF',
    'image/bmp': 'BMP',
  }
  return map[mime] || mime.replace('image/', '').toUpperCase()
}

export function ImgCompress() {
  const [file, setFile] = useState<File | null>(null)
  const [originalUrl, setOriginalUrl] = useState<string>('')
  const [compressedUrl, setCompressedUrl] = useState<string>('')
  const [compressedBlob, setCompressedBlob] = useState<Blob | null>(null)
  const [compressedSize, setCompressedSize] = useState<number>(0)
  const [quality, setQuality] = useState<number>(80)
  const [outputFormat, setOutputFormat] = useState<string>('original')
  const [isCompressing, setIsCompressing] = useState(false)
  const [imageDimensions, setImageDimensions] = useState<{
    width: number
    height: number
  } | null>(null)

  // Before/after slider
  const [sliderPos, setSliderPos] = useState<number>(50)
  const sliderRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef<boolean>(false)

  const handleFiles = useCallback((files: File[]) => {
    const img = files.find((f) => f.type.startsWith('image/'))
    if (!img) {
      toast.error('Veuillez sélectionner une image valide.')
      return
    }

    // Cleanup previous URLs
    setFile(img)
    setOriginalUrl('')
    setCompressedUrl('')
    setCompressedBlob(null)
    setCompressedSize(0)
    setSliderPos(50)

    const url = URL.createObjectURL(img)
    setOriginalUrl(url)

    // Get dimensions
    const tempImg = new Image()
    tempImg.onload = () => {
      setImageDimensions({ width: tempImg.naturalWidth, height: tempImg.naturalHeight })
      URL.revokeObjectURL(tempImg.src)
    }
    tempImg.src = url
  }, [])

  const handleReset = () => {
    if (originalUrl) URL.revokeObjectURL(originalUrl)
    if (compressedUrl) URL.revokeObjectURL(compressedUrl)
    setFile(null)
    setOriginalUrl('')
    setCompressedUrl('')
    setCompressedBlob(null)
    setCompressedSize(0)
    setQuality(80)
    setOutputFormat('original')
    setImageDimensions(null)
    setSliderPos(50)
  }

  const handleCompress = async () => {
    if (!file) return
    setIsCompressing(true)

    try {
      // Determine target file type
      let targetType: string | undefined
      if (outputFormat !== 'original') {
        targetType = outputFormat
      }

      // Calculate maxSizeMB based on quality
      // quality 100 = same size roughly, 10 = much smaller
      const qualityRatio = quality / 100
      // We estimate a target max size; the library will compress to at most this
      const estimatedMaxMB = (file.size / 1024 / 1024) * qualityRatio

      const options = {
        maxSizeMB: Math.max(0.01, estimatedMaxMB),
        maxWidthOrHeight: 4096,
        useWebWorker: true,
        initialQuality: qualityRatio,
        fileType: targetType,
      }

      const compressed = await imageCompression(file, options)
      const url = URL.createObjectURL(compressed)

      if (compressedUrl) URL.revokeObjectURL(compressedUrl)
      setCompressedUrl(url)
      setCompressedBlob(compressed)
      setCompressedSize(compressed.size)
      setSliderPos(50)

      const savings = Math.round((1 - compressed.size / file.size) * 100)
      if (savings > 0) {
        toast.success(`Image compressée ! Réduction de ${savings}% (${formatFileSize(compressed.size)})`)
      } else {
        toast.info(`Image traitée : ${formatFileSize(compressed.size)} (aucune réduction)`)
      }
    } catch (error) {
      console.error('Compression error:', error)
      toast.error('Erreur lors de la compression.')
    } finally {
      setIsCompressing(false)
    }
  }

  const handleDownload = () => {
    if (!compressedBlob || !file) return

    const baseName = file.name.replace(/\.[^.]+$/, '')
    let ext = file.name.split('.').pop() || 'png'
    if (outputFormat === 'image/webp') ext = 'webp'
    if (outputFormat === 'image/jpeg') ext = 'jpg'

    downloadBlob(compressedBlob, `${baseName}-compressé.${ext}`)
    toast.success('Image téléchargée.')
  }

  // Before/after slider interaction
  const updateSliderPosition = useCallback((clientX: number) => {
    if (!sliderRef.current) return
    const rect = sliderRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setSliderPos(pct)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging.current) {
        e.preventDefault()
        updateSliderPosition(e.clientX)
      }
    }
    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging.current) {
        updateSliderPosition(e.touches[0].clientX)
      }
    }
    const handleUp = () => {
      isDragging.current = false
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('touchmove', handleTouchMove)
    window.addEventListener('mouseup', handleUp)
    window.addEventListener('touchend', handleUp)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('mouseup', handleUp)
      window.removeEventListener('touchend', handleUp)
    }
  }, [updateSliderPosition])

  const savings =
    file && compressedSize > 0
      ? Math.round((1 - compressedSize / file.size) * 100)
      : 0

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileImage className="h-5 w-5" />
          Compression d&apos;Image
        </CardTitle>
        <CardDescription>
          Réduisez la taille de vos images tout en maintenant une bonne qualité.
          Comparez avant et après avec le curseur.
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
                  {imageDimensions
                    ? `${imageDimensions.width} × ${imageDimensions.height} px · `
                    : ''}
                  {getMimeTypeLabel(file.type)} · {formatFileSize(file.size)}
                </p>
              </div>
              <Button variant="ghost" size="sm" onClick={handleReset}>
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>

            {/* Settings */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">
                  Qualité
                </label>
                <div className="space-y-1">
                  <Slider
                    value={[quality]}
                    onValueChange={(v) => setQuality(v[0])}
                    min={10}
                    max={100}
                    step={5}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Faible</span>
                    <span className="font-medium text-foreground">
                      {quality}%
                    </span>
                    <span>Max</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">
                  Format de sortie
                </label>
                <Select value={outputFormat} onValueChange={setOutputFormat}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {OUTPUT_FORMAT_OPTIONS.map((f) => (
                      <SelectItem key={f.value} value={f.value}>
                        {f.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Before/After comparison */}
            {compressedUrl && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">
                    Comparaison Avant / Après
                  </label>
                  <p className="text-xs text-muted-foreground">
                    Glissez le curseur pour comparer
                  </p>
                </div>

                {/* Slider comparison container */}
                <div
                  ref={sliderRef}
                  className="relative w-full overflow-hidden rounded-lg border bg-[repeating-conic-gradient(#e5e7eb_0%_25%,white_0%_50%)] bg-[length:16px_16px] select-none cursor-ew-resize touch-none"
                  style={{ aspectRatio: imageDimensions ? `${imageDimensions.width}/${imageDimensions.height}` : 'auto' }}
                  onMouseDown={(e) => {
                    isDragging.current = true
                    updateSliderPosition(e.clientX)
                  }}
                  onTouchStart={(e) => {
                    isDragging.current = true
                    updateSliderPosition(e.touches[0].clientX)
                  }}
                >
                  {/* Original image (full, on the left) */}
                  <img
                    src={originalUrl}
                    alt="Original"
                    className="absolute inset-0 w-full h-full object-contain"
                    draggable={false}
                  />

                  {/* Compressed image (clipped from right side) */}
                  <div
                    className="absolute inset-0"
                    style={{
                      clipPath: `inset(0 0 0 ${sliderPos}%)`,
                    }}
                  >
                    <img
                      src={compressedUrl}
                      alt="Compressée"
                      className="w-full h-full object-contain"
                      draggable={false}
                    />
                  </div>

                  {/* Slider line */}
                  <div
                    className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg z-10 pointer-events-none"
                    style={{ left: `${sliderPos}%` }}
                  >
                    {/* Handle */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-lg border-2 border-white/80 p-1 pointer-events-none">
                      <GripVertical className="h-4 w-4 text-gray-600" />
                    </div>
                  </div>

                  {/* Labels */}
                  <div className="absolute top-2 left-2 z-20">
                    <Badge variant="secondary" className="text-[10px] bg-black/60 text-white hover:bg-black/60">
                      Original
                    </Badge>
                  </div>
                  <div className="absolute top-2 right-2 z-20">
                    <Badge variant="secondary" className="text-[10px] bg-black/60 text-white hover:bg-black/60">
                      Compressée
                    </Badge>
                  </div>
                </div>

                {/* Size comparison */}
                <div className="flex items-center justify-between rounded-lg border bg-muted/30 p-4">
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">Original</p>
                    <p className="text-lg font-bold">
                      {formatFileSize(file.size)}
                    </p>
                  </div>

                  <div className="flex flex-col items-center gap-1">
                    {savings > 0 ? (
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100 dark:bg-green-900/40 dark:text-green-400">
                        − {savings}%
                      </Badge>
                    ) : savings < 0 ? (
                      <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100 dark:bg-orange-900/40 dark:text-orange-400">
                        + {Math.abs(savings)}%
                      </Badge>
                    ) : (
                      <Badge variant="secondary">0%</Badge>
                    )}
                  </div>

                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">Compressée</p>
                    <p className="text-lg font-bold">
                      {formatFileSize(compressedSize)}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Compress button */}
            <div className="flex gap-2">
              <Button
                onClick={handleCompress}
                disabled={isCompressing}
                className="flex-1"
                size="lg"
              >
                {isCompressing ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Compression...
                  </>
                ) : compressedBlob ? (
                  <>
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Recompresser
                  </>
                ) : (
                  <>
                    <FileImage className="h-4 w-4 mr-2" />
                    Compresser
                  </>
                )}
              </Button>

              {compressedBlob && (
                <Button onClick={handleDownload} size="lg">
                  <Download className="h-4 w-4 mr-2" />
                  Télécharger
                </Button>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
