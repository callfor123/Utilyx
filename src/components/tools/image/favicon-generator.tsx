'use client'

import { useTranslations } from 'next-intl'

import { useState, useCallback, useRef } from 'react'
import { Globe, Download, Copy, Loader2, RotateCcw, Archive, CheckCircle2 } from 'lucide-react'
import { toast } from 'sonner'
import { cn, formatFileSize, downloadBlob, copyToClipboard } from '@/lib/utils'
import { DropZone } from '@/components/layout/drop-zone'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface GeneratedIcon {
  name: string
  size: number
  blob: Blob
  dataUrl: string
  fileSize: number
}

const FAVICON_SIZES = [
  { name: 'favicon.ico', size: 32, format: 'image/x-icon' },
  { name: 'favicon-16x16.png', size: 16, format: 'image/png' },
  { name: 'favicon-32x32.png', size: 32, format: 'image/png' },
  { name: 'apple-touch-icon.png', size: 180, format: 'image/png' },
  { name: 'android-chrome-192x192.png', size: 192, format: 'image/png' },
  { name: 'android-chrome-512x512.png', size: 512, format: 'image/png' },
  { name: 'mstile-150x150.png', size: 150, format: 'image/png' },
]

function generateHtmlSnippet(baseUrl: string): string {
  return `<link rel="icon" type="image/x-icon" href="${baseUrl}/favicon.ico">
<link rel="icon" type="image/png" sizes="16x16" href="${baseUrl}/favicon-16x16.png">
<link rel="icon" type="image/png" sizes="32x32" href="${baseUrl}/favicon-32x32.png">
<link rel="apple-touch-icon" sizes="180x180" href="${baseUrl}/apple-touch-icon.png">
<link rel="manifest" href="${baseUrl}/site.webmanifest">
<meta name="msapplication-TileImage" content="${baseUrl}/mstile-150x150.png">
<meta name="msapplication-TileColor" content="#ffffff">`
}

export function FaviconGenerator() {
  const t = useTranslations('ToolsUI')
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [icons, setIcons] = useState<GeneratedIcon[]>([])
  const [isDownloadingAll, setIsDownloadingAll] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleFiles = useCallback((files: File[]) => {
    const imageFile = files.find((f) => f.type.startsWith('image/'))
    if (imageFile) {
      setFile(imageFile)
      setIcons([])
      const reader = new FileReader()
      reader.onload = () => setPreviewUrl(reader.result as string)
      reader.readAsDataURL(imageFile)
    } else {
      toast.error('Veuillez sélectionner un fichier image valide.')
    }
  }, [])

  const handleReset = () => {
    setFile(null)
    setPreviewUrl(null)
    setIcons([])
  }

  const resizeImage = (img: HTMLImageElement, size: number, format: string): Promise<{ blob: Blob; dataUrl: string }> => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas')
      canvas.width = size
      canvas.height = size
      const ctx = canvas.getContext('2d')
      if (!ctx) { reject(new Error('Canvas context unavailable')); return }

      ctx.clearRect(0, 0, size, size)
      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = 'high'
      ctx.drawImage(img, 0, 0, size, size)

      if (format === 'image/x-icon') {
        // ICO format: embed PNG data in a simple ICO wrapper
        const pngDataUrl = canvas.toDataURL('image/png')
        const pngBase64 = pngDataUrl.split(',')[1]
        const pngBinary = atob(pngBase64)
        const pngBytes = new Uint8Array(pngBinary.length)
        for (let i = 0; i < pngBinary.length; i++) pngBytes[i] = pngBinary.charCodeAt(i)

        const pngLength = pngBytes.length
        const icoHeaderSize = 6
        const icoDirEntrySize = 16
        const icoTotalSize = icoHeaderSize + icoDirEntrySize + pngLength

        const icoBuffer = new ArrayBuffer(icoTotalSize)
        const icoView = new DataView(icoBuffer)

        // ICO header
        icoView.setUint16(0, 0, true) // reserved
        icoView.setUint16(2, 1, true) // type: icon
        icoView.setUint16(4, 1, true) // count: 1 image

        // ICO directory entry
        icoView.setUint8(6, size >= 256 ? 0 : size) // width
        icoView.setUint8(7, size >= 256 ? 0 : size) // height
        icoView.setUint8(8, 0) // color palette
        icoView.setUint8(9, 0) // reserved
        icoView.setUint16(10, 1, true) // color planes
        icoView.setUint16(12, 32, true) // bits per pixel
        icoView.setUint32(14, pngLength, true) // data size
        icoView.setUint32(18, icoHeaderSize + icoDirEntrySize, true) // data offset

        const icoBytes = new Uint8Array(icoBuffer)
        icoBytes.set(pngBytes, icoHeaderSize + icoDirEntrySize)

        const blob = new Blob([icoBuffer], { type: 'image/x-icon' })
        const dataUrl = URL.createObjectURL(blob)
        resolve({ blob, dataUrl })
      } else {
        canvas.toBlob((blob) => {
          if (blob) {
            const dataUrl = URL.createObjectURL(blob)
            resolve({ blob, dataUrl })
          } else {
            reject(new Error('Failed to create blob'))
          }
        }, format)
      }
    })
  }

  const handleGenerate = async () => {
    if (!file || !previewUrl) return

    setIsGenerating(true)

    try {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve()
        img.onerror = reject
        img.src = previewUrl
      })

      const results: GeneratedIcon[] = []

      for (const { name, size, format } of FAVICON_SIZES) {
        const { blob, dataUrl } = await resizeImage(img, size, format)
        results.push({
          name,
          size,
          blob,
          dataUrl,
          fileSize: blob.size,
        })
      }

      setIcons(results)
      toast.success(`${results.length} favicon${results.length > 1 ? 's' : ''} généré${results.length > 1 ? 's' : ''} avec succès !`)
    } catch (error) {
      console.error('Generation error:', error)
      toast.error('Erreur lors de la génération des favicons.')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleDownloadSingle = (icon: GeneratedIcon) => {
    downloadBlob(icon.blob, icon.name)
    toast.success(`${icon.name} téléchargé`)
  }

  const handleDownloadAll = async () => {
    if (icons.length === 0) return
    setIsDownloadingAll(true)

    try {
      const JSZip = (await import('jszip')).default
      const zip = new JSZip()

      for (const icon of icons) {
        zip.file(icon.name, icon.blob)
      }

      // Add HTML snippet
      const snippet = generateHtmlSnippet('/favicon')
      zip.file('favicon-html-snippet.html', snippet)

      const zipBlob = await zip.generateAsync({ type: 'blob' })
      downloadBlob(zipBlob, 'favicon-pack.zip')
      toast.success('Pack de favicons téléchargé !')
    } catch (error) {
      console.error('ZIP error:', error)
      toast.error("Erreur lors de la création de l'archive ZIP.")
    } finally {
      setIsDownloadingAll(false)
    }
  }

  const handleCopySnippet = () => {
    const snippet = generateHtmlSnippet('/favicon')
    copyToClipboard(snippet)
    toast.success('Code HTML copié dans le presse-papiers')
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Générateur de Favicon
          </CardTitle>
          <CardDescription>
            Générez tous les formats de favicon nécessaires pour votre site web à partir d&apos;une seule image.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {!file ? (
            <DropZone
              accept="image/*"
              onFiles={handleFiles}
              maxSize={10}
              label={t("dropLogo")}
              sublabel="PNG ou SVG recommandé (minimum 512x512px)"
              icon={<Globe className="h-8 w-8" />}
            />
          ) : (
            <div className="space-y-6">
              {/* Source image */}
              <div className="flex items-center gap-4 rounded-lg border bg-muted/30 p-4">
                {previewUrl && (
                  <div className="rounded-lg bg-white p-1 border shrink-0">
                    <img src={previewUrl} alt="Favicon source image" className="h-12 w-12 object-contain" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{file.name}</p>
                  <p className="text-sm text-muted-foreground">{formatFileSize(file.size)}</p>
                </div>
                <Button variant="ghost" size="sm" onClick={handleReset}>
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>

              {/* Generate button */}
              <Button onClick={handleGenerate} disabled={isGenerating} className="w-full" size="lg">
                {isGenerating ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Génération en cours…
                  </>
                ) : (
                  <>
                    <Globe className="h-4 w-4 mr-2" />
                    Générer tous les favicons
                  </>
                )}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Generated icons grid */}
      {icons.length > 0 && (
        <>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                Favicons générés
              </CardTitle>
              <CardDescription>
                {icons.length} favicon(s) prêts à être téléchargés
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {icons.map((icon) => (
                  <div
                    key={icon.name}
                    className="flex flex-col items-center gap-3 rounded-xl border bg-muted/20 p-4 hover:bg-muted/40 transition-colors"
                  >
                    <div className="rounded-lg bg-white p-2 border shadow-sm">
                      <img
                        src={icon.dataUrl}
                        alt={icon.name}
                        className="object-contain"
                        style={{ width: Math.min(icon.size, 64), height: Math.min(icon.size, 64) }}
                      />
                    </div>
                    <div className="text-center">
                      <p className="text-xs font-medium truncate max-w-full">{icon.name}</p>
                      <p className="text-[10px] text-muted-foreground">{icon.size}×{icon.size}px · {formatFileSize(icon.fileSize)}</p>
                    </div>
                    <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => handleDownloadSingle(icon)}>
                      <Download className="h-3 w-3 mr-1" />
                      Télécharger
                    </Button>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-2 mt-6">
                <Button onClick={handleDownloadAll} disabled={isDownloadingAll} className="flex-1">
                  {isDownloadingAll ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Création ZIP…
                    </>
                  ) : (
                    <>
                      <Archive className="h-4 w-4 mr-2" />
                      Télécharger tout (ZIP)
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* HTML snippet */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Copy className="h-5 w-5" />
                Code HTML pour &lt;head&gt;
              </CardTitle>
              <CardDescription>
                Copiez ce code et placez-le dans la section &lt;head&gt; de votre site.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <pre className="rounded-lg bg-muted/60 p-4 text-xs sm:text-sm overflow-x-auto border">
                  <code>{generateHtmlSnippet('/favicon')}</code>
                </pre>
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={handleCopySnippet}
                >
                  <Copy className="h-3.5 w-3.5 mr-1.5" />
                  Copier
                </Button>
              </div>
            </CardContent>
          </Card>

          <canvas ref={canvasRef} className="hidden" />
        </>
      )}
    </div>
  )
}

