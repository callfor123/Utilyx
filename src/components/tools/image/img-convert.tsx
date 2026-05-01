'use client'

import { useTranslations } from 'next-intl'

import { useState, useCallback } from 'react'
import {
  RefreshCw,
  Download,
  FileImage,
  Loader2,
  CheckCircle2,
  X,
} from 'lucide-react'
import { toast } from 'sonner'
import { cn, formatFileSize, downloadBlob } from '@/lib/utils'
import { DropZone, FileList } from '@/components/layout/drop-zone'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface ConvertItem {
  file: File
  originalSize: number
  resultBlob: Blob | null
  resultSize: number
  status: 'pending' | 'converting' | 'done' | 'error'
  progress: number
}

const FORMAT_OPTIONS = [
  { value: 'image/webp', label: 'WebP', ext: 'webp' },
  { value: 'image/avif', label: 'AVIF', ext: 'avif' },
  { value: 'image/jpeg', label: 'JPG', ext: 'jpg' },
  { value: 'image/png', label: 'PNG', ext: 'png' },
] as const

function getMimeTypeLabel(mime: string): string {
  const map: Record<string, string> = {
    'image/jpeg': 'JPG',
    'image/png': 'PNG',
    'image/gif': 'GIF',
    'image/webp': 'WebP',
    'image/avif': 'AVIF',
  }
  return map[mime] || mime.replace('image/', '').toUpperCase()
}

function getBaseName(filename: string): string {
  const lastDot = filename.lastIndexOf('.')
  return lastDot > 0 ? filename.substring(0, lastDot) : filename
}

export function ImgConvert() {
  const t = useTranslations('ToolsUI')
  const [items, setItems] = useState<ConvertItem[]>([])
  const [outputFormat, setOutputFormat] = useState<string>('image/webp')
  const [isConverting, setIsConverting] = useState(false)

  const handleFiles = useCallback(
    (files: File[]) => {
      const validFiles = files.filter((f) =>
        [
          'image/jpeg',
          'image/png',
          'image/gif',
          'image/webp',
          'image/avif',
        ].includes(f.type)
      )
      if (validFiles.length === 0) {
        toast.error(
          'Veuillez sélectionner des images valides (JPG, PNG, GIF, WebP, AVIF).'
        )
        return
      }
      const newItems: ConvertItem[] = validFiles.map((f) => ({
        file: f,
        originalSize: f.size,
        resultBlob: null,
        resultSize: 0,
        status: 'pending',
        progress: 0,
      }))
      setItems((prev) => [...prev, ...newItems])
      toast.success(
        `${validFiles.length} image${validFiles.length > 1 ? 's' : ''} ajoutée${validFiles.length > 1 ? 's' : ''}.`
      )
    },
    []
  )

  const handleRemove = useCallback((index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index))
  }, [])

  const handleClear = useCallback(() => {
    setItems([])
    toast.success('Liste effacée.')
  }, [])

  const convertFile = (
    file: File,
    targetMime: string
  ): Promise<{ blob: Blob; size: number }> => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      const url = URL.createObjectURL(file)
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas')
          canvas.width = img.naturalWidth
          canvas.height = img.naturalHeight
          const ctx = canvas.getContext('2d')!
          ctx.drawImage(img, 0, 0)
          canvas.toBlob(
            (blob) => {
              URL.revokeObjectURL(url)
              if (blob) {
                resolve({ blob, size: blob.size })
              } else {
                reject(new Error('Échec de la conversion'))
              }
            },
            targetMime,
            targetMime === 'image/jpeg' ? 0.92 : undefined
          )
        } catch (err) {
          URL.revokeObjectURL(url)
          reject(err)
        }
      }
      img.onerror = () => {
        URL.revokeObjectURL(url)
        reject(new Error('Échec du chargement de l\'image'))
      }
      img.src = url
    })
  }

  const handleConvertAll = async () => {
    if (items.length === 0) return

    setIsConverting(true)
    setItems((prev) =>
      prev.map((item) => ({ ...item, status: 'converting', progress: 0 }))
    )

    let completed = 0
    const total = items.length
    const formatInfo = FORMAT_OPTIONS.find(
      (f) => f.value === outputFormat
    ) || FORMAT_OPTIONS[0]

    for (let i = 0; i < total; i++) {
      setItems((prev) =>
        prev.map((item, idx) =>
          idx === i
            ? { ...item, status: 'converting', progress: 10 }
            : item
        )
      )

      try {
        const { blob, size } = await convertFile(items[i].file, outputFormat)
        completed++
        const fileProgress = Math.round((completed / total) * 100)

        setItems((prev) =>
          prev.map((item, idx) =>
            idx === i
              ? {
                  ...item,
                  status: 'done',
                  progress: 100,
                  resultBlob: blob,
                  resultSize: size,
                }
              : item
          )
        )
      } catch {
        completed++
        setItems((prev) =>
          prev.map((item, idx) =>
            idx === i
              ? { ...item, status: 'error', progress: 100 }
              : item
          )
        )
      }
    }

    setIsConverting(false)
    const successCount = items.filter((_, i) => {
      // We need the updated state, but we track via completed
      return true
    }).length
    toast.success('Conversion terminée !')
  }

  const handleDownloadOne = (index: number) => {
    const item = items[index]
    if (!item.resultBlob) return
    const formatInfo = FORMAT_OPTIONS.find(
      (f) => f.value === outputFormat
    ) || FORMAT_OPTIONS[0]
    const baseName = getBaseName(item.file.name)
    downloadBlob(item.resultBlob, `${baseName}.${formatInfo.ext}`)
    toast.success('Image téléchargée.')
  }

  const handleDownloadAll = () => {
    const formatInfo = FORMAT_OPTIONS.find(
      (f) => f.value === outputFormat
    ) || FORMAT_OPTIONS[0]
    items.forEach((item) => {
      if (item.resultBlob) {
        const baseName = getBaseName(item.file.name)
        downloadBlob(item.resultBlob, `${baseName}.${formatInfo.ext}`)
      }
    })
    toast.success('Toutes les images ont été téléchargées.')
  }

  const overallProgress =
    items.length > 0
      ? Math.round(
          items.reduce((acc, item) => acc + item.progress, 0) / items.length
        )
      : 0

  const doneCount = items.filter((i) => i.status === 'done').length

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileImage className="h-5 w-5" />
          Convertisseur d&apos;Images
        </CardTitle>
        <CardDescription>
          Convertissez vos images en WebP, AVIF, JPG ou PNG. Traitement par
          lot possible.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Format selector */}
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none">
            Format de sortie
          </label>
          <Select value={outputFormat} onValueChange={setOutputFormat}>
            <SelectTrigger className="w-full sm:w-64">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {FORMAT_OPTIONS.map((f) => (
                <SelectItem key={f.value} value={f.value}>
                  {f.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Drop zone */}
        <DropZone
          accept="image/jpeg,image/png,image/gif,image/webp,image/avif"
          multiple
          onFiles={handleFiles}
          maxSize={50}
          label={t("dropImages")}
          sublabel="JPG, PNG, GIF, WebP, AVIF — plusieurs fichiers possibles"
          icon={<FileImage className="h-8 w-8" />}
        />

        {/* File list */}
        {items.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">
                {items.length} image{items.length > 1 ? 's' : ''}
              </p>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClear}
                disabled={isConverting}
              >
                <X className="h-3.5 w-3.5 mr-1" />
                Tout effacer
              </Button>
            </div>

            <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
              {items.map((item, i) => (
                <div
                  key={`${item.file.name}-${i}`}
                  className={cn(
                    'rounded-lg border bg-muted/30 p-3 space-y-2',
                    item.status === 'done' &&
                      'border-green-200 bg-green-50/50 dark:border-green-900 dark:bg-green-950/20',
                    item.status === 'error' &&
                      'border-red-200 bg-red-50/50 dark:border-red-900 dark:bg-red-950/20'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {item.file.name}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                        <span>{getMimeTypeLabel(item.file.type)}</span>
                        <span>·</span>
                        <span>{formatFileSize(item.originalSize)}</span>
                      </div>
                    </div>
                    {item.status === 'done' && (
                      <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                    )}
                    {item.status === 'converting' && (
                      <Loader2 className="h-5 w-5 animate-spin text-muted-foreground shrink-0" />
                    )}
                    {item.status === 'error' && (
                      <Badge variant="destructive" className="text-[10px] shrink-0">
                        Erreur
                      </Badge>
                    )}
                    {item.status === 'pending' && !isConverting && (
                      <button
                        onClick={() => handleRemove(i)}
                        className="rounded-full p-1 hover:bg-muted shrink-0"
                      >
                        <X className="h-4 w-4 text-muted-foreground" />
                      </button>
                    )}
                  </div>

                  {/* Progress bar for this file */}
                  {item.status === 'converting' && (
                    <Progress value={item.progress} className="h-1.5" />
                  )}

                  {/* Before/after size comparison */}
                  {item.status === 'done' && item.resultBlob && (
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-muted-foreground">
                        {formatFileSize(item.resultSize)}
                      </span>
                      {item.resultSize !== item.originalSize && (
                        <Badge
                          variant="secondary"
                          className={cn(
                            'text-[10px]',
                            item.resultSize < item.originalSize
                              ? 'text-green-600 bg-green-100 dark:bg-green-900/40 dark:text-green-400'
                              : 'text-orange-600 bg-orange-100 dark:bg-orange-900/40 dark:text-orange-400'
                          )}
                        >
                          {item.resultSize < item.originalSize
                            ? `− ${Math.round((1 - item.resultSize / item.originalSize) * 100)}%`
                            : `+ ${Math.round((item.resultSize / item.originalSize - 1) * 100)}%`}
                        </Badge>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        className="ml-auto h-7 text-xs"
                        onClick={() => handleDownloadOne(i)}
                      >
                        <Download className="h-3 w-3 mr-1" />
                        Télécharger
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Global progress */}
            {isConverting && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    Conversion en cours...
                  </span>
                  <span className="font-medium">{overallProgress}%</span>
                </div>
                <Progress value={overallProgress} className="h-2" />
              </div>
            )}

            {/* Action buttons */}
            {!isConverting && items.length > 0 && (
              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  onClick={handleConvertAll}
                  className="flex-1"
                  size="lg"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Convertir tout
                </Button>
                {doneCount > 1 && (
                  <Button
                    variant="outline"
                    onClick={handleDownloadAll}
                    size="lg"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Tout télécharger
                  </Button>
                )}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
