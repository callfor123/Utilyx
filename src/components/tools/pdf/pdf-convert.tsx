'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import {
  FileText,
  Image,
  Loader2,
  RotateCcw,
  Download,
  Settings2,
} from 'lucide-react'
import JSZip from 'jszip'
import { toast } from 'sonner'
import { cn, formatFileSize, downloadBlob, downloadDataUrl } from '@/lib/utils'
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
import { Progress } from '@/components/ui/progress'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

// Load pdfjs with Blob URL worker for reliability
let pdfjsLib: any = null
let pdfjsReady = false
async function getPdfjs() {
  if (!pdfjsLib) {
    pdfjsLib = await import('pdfjs-dist/legacy/build/pdf.mjs')
    if (!pdfjsReady) {
      pdfjsReady = true
      try {
        const resp = await fetch('/pdf.worker.min.mjs')
        if (resp.ok) {
          const workerText = await resp.text()
          const blob = new Blob([workerText], { type: 'text/javascript' })
          pdfjsLib.GlobalWorkerOptions.workerSrc = URL.createObjectURL(blob)
        } else {
          pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs'
        }
      } catch {
        pdfjsLib.GlobalWorkerOptions.workerSrc = ''
      }
    }
  }
  return pdfjsLib
}

export function PdfConvert() {
  const [file, setFile] = useState<File | null>(null)
  const [format, setFormat] = useState<'jpg' | 'png'>('png')
  const [quality, setQuality] = useState<number>(0.85)
  const [pageCount, setPageCount] = useState<number>(0)
  const [thumbnails, setThumbnails] = useState<string[]>([])
  const [isConverting, setIsConverting] = useState(false)
  const [progress, setProgress] = useState<number>(0)
  const [isRenderingThumbs, setIsRenderingThumbs] = useState(false)
  const pdfRef = useRef<unknown>(null)

  const handleFiles = useCallback(async (files: File[]) => {
    const pdf = files.find(
      (f) => f.type === 'application/pdf' || f.name.endsWith('.pdf')
    )
    if (!pdf) {
      toast.error('Veuillez sélectionner un fichier PDF valide.')
      return
    }

    setFile(pdf)
    setThumbnails([])
    setPageCount(0)
    setProgress(0)

    try {
      const arrayBuffer = await pdf.arrayBuffer()
      const pdfjs = await getPdfjs()
      const pdfDoc = await pdfjs.getDocument({ data: new Uint8Array(arrayBuffer) }).promise
      pdfRef.current = pdfDoc
      const count = pdfDoc.numPages
      setPageCount(count)

      // Generate thumbnails
      setIsRenderingThumbs(true)
      const thumbs: string[] = []
      for (let i = 1; i <= Math.min(count, 50); i++) {
        const page = await pdfDoc.getPage(i)
        const viewport = page.getViewport({ scale: 0.5 })
        const canvas = document.createElement('canvas')
        canvas.width = viewport.width
        canvas.height = viewport.height
        const ctx = canvas.getContext('2d')!
        await page.render({ canvasContext: ctx, viewport }).promise
        thumbs.push(canvas.toDataURL('image/jpeg', 0.6))
      }
      setThumbnails(thumbs)
      setIsRenderingThumbs(false)
    } catch (error) {
      console.error('PDF load error:', error)
      toast.error('Erreur lors du chargement du PDF.')
      setIsRenderingThumbs(false)
    }
  }, [])

  const handleConvert = async () => {
    if (!file) return

    setIsConverting(true)
    setProgress(0)

    try {
      const arrayBuffer = await file.arrayBuffer()
      const pdfjs = await getPdfjs()
      const pdfDoc = await pdfjs.getDocument({ data: new Uint8Array(arrayBuffer) }).promise
      const count = pdfDoc.numPages

      if (count === 1) {
        // Single page: download directly
        const page = await pdfDoc.getPage(1)
        const viewport = page.getViewport({ scale: 2 })
        const canvas = document.createElement('canvas')
        canvas.width = viewport.width
        canvas.height = viewport.height
        const ctx = canvas.getContext('2d')!
        await page.render({ canvasContext: ctx, viewport }).promise

        const mimeType = format === 'jpg' ? 'image/jpeg' : 'image/png'
        const ext = format === 'jpg' ? 'jpg' : 'png'
        const dataUrl = canvas.toDataURL(mimeType, format === 'jpg' ? quality : undefined)

        // Convert dataUrl to blob for download
        const res = await fetch(dataUrl)
        const blob = await res.blob()
        const baseName = file.name.replace(/\.pdf$/i, '')
        downloadBlob(blob, `${baseName}.${ext}`)

        toast.success('Image téléchargée avec succès !')
      } else {
        // Multiple pages: create ZIP
        const zip = new JSZip()

        for (let i = 1; i <= count; i++) {
          const page = await pdfDoc.getPage(i)
          const viewport = page.getViewport({ scale: 2 })
          const canvas = document.createElement('canvas')
          canvas.width = viewport.width
          canvas.height = viewport.height
          const ctx = canvas.getContext('2d')!
          await page.render({ canvasContext: ctx, viewport }).promise

          const mimeType = format === 'jpg' ? 'image/jpeg' : 'image/png'
          const ext = format === 'jpg' ? 'jpg' : 'png'
          const dataUrl = canvas.toDataURL(
            mimeType,
            format === 'jpg' ? quality : undefined
          )

          // Convert dataUrl to blob
          const res = await fetch(dataUrl)
          const blob = await res.blob()
          zip.file(`page_${i}.${ext}`, blob)

          setProgress(Math.round((i / count) * 100))
        }

        const zipBlob = await zip.generateAsync({ type: 'blob' })
        const baseName = file.name.replace(/\.pdf$/i, '')
        downloadBlob(zipBlob, `${baseName}_images.zip`)

        toast.success(
          `${count} images exportées dans un fichier ZIP !`
        )
      }
    } catch (error) {
      console.error('Convert error:', error)
      toast.error('Erreur lors de la conversion du PDF.')
    } finally {
      setIsConverting(false)
      setProgress(0)
    }
  }

  const handleReset = () => {
    setFile(null)
    setPageCount(0)
    setThumbnails([])
    setProgress(0)
    pdfRef.current = null
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Image className="h-5 w-5" aria-hidden="true" />
            PDF en Images
          </CardTitle>
          <CardDescription>
            Convertissez chaque page de votre PDF en image JPG ou PNG.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {!file ? (
            <DropZone
              accept=".pdf"
              onFiles={handleFiles}
              maxSize={100}
              label="Glissez-déposez votre PDF ici"
              sublabel="ou cliquez pour parcourir"
              icon={<FileText className="h-8 w-8" />}
            />
          ) : (
            <div className="space-y-6">
              {/* File info */}
              <div className="flex items-center gap-4 rounded-lg border bg-muted/30 p-4">
                <div className="rounded-lg bg-primary/10 p-2">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{file.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {pageCount} {pageCount > 1 ? 'pages' : 'page'} ·{' '}
                    {formatFileSize(file.size)}
                  </p>
                </div>
                <Button variant="ghost" size="sm" onClick={handleReset}>
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>

              {/* Settings */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Format de sortie</Label>
                  <Select
                    value={format}
                    onValueChange={(v) => setFormat(v as 'jpg' | 'png')}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="png">PNG (haute qualité)</SelectItem>
                      <SelectItem value="jpg">JPG (compressé)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Qualité JPG</Label>
                    <span className="text-sm text-muted-foreground">
                      {Math.round(quality * 100)}%
                    </span>
                  </div>
                  <Slider
                    value={[quality]}
                    onValueChange={(v) => setQuality(v[0])}
                    min={0.1}
                    max={1}
                    step={0.05}
                    disabled={format !== 'jpg'}
                    className={cn(format !== 'jpg' && 'opacity-50')}
                  />
                </div>
              </div>

              {/* Thumbnails */}
              <div className="space-y-2">
                <Label>Aperçu des pages</Label>
                {isRenderingThumbs ? (
                  <div className="flex items-center justify-center py-8 text-sm text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Génération des aperçus...
                  </div>
                ) : thumbnails.length > 0 ? (
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 max-h-64 overflow-y-auto p-1">
                    {thumbnails.map((thumb, i) => (
                      <div
                        key={i}
                        className="relative aspect-[3/4] rounded-md border overflow-hidden bg-white"
                      >
                        <img
                          src={thumb}
                          alt={`Page ${i + 1}`}
                          className="w-full h-full object-contain"
                        />
                        <span className="absolute bottom-1 right-1 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded">
                          {i + 1}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground py-4 text-center">
                    Aucun aperçu disponible.
                  </p>
                )}
              </div>

              {/* Progress */}
              {isConverting && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Conversion...</span>
                    <span className="font-medium">{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
              )}

              {/* Convert button */}
              <Button
                onClick={handleConvert}
                disabled={isConverting || isRenderingThumbs}
                className="w-full"
                size="lg"
              >
                {isConverting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Conversion en cours...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4 mr-2" />
                    {pageCount > 1
                      ? 'Convertir et Télécharger (ZIP)'
                      : 'Convertir et Télécharger'}
                  </>
                )}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

function Label({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <label className={cn('text-sm font-medium leading-none', className)}>
      {children}
    </label>
  )
}
