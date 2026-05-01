'use client'

import { useState, useCallback } from 'react'
import { FileImage, Download, Trash2, MoveUp, MoveDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { useTranslations } from 'next-intl'

interface ImageFile {
  id: string
  file: File
  preview: string
  width: number
  height: number
}

type PageSize = 'A4' | 'A3' | 'Letter' | 'original'
type Orientation = 'portrait' | 'landscape' | 'auto'

export function ImgToPdf() {
  const t = useTranslations('ToolsUI')
  const [images, setImages] = useState<ImageFile[]>([])
  const [pageSize, setPageSize] = useState<PageSize>('A4')
  const [orientation, setOrientation] = useState<Orientation>('auto')
  const [margin, setMargin] = useState(10)
  const [loading, setLoading] = useState(false)
  const [dragging, setDragging] = useState(false)

  const PAGE_SIZES: Record<string, { w: number; h: number }> = {
    A4: { w: 595.28, h: 841.89 },
    A3: { w: 841.89, h: 1190.55 },
    Letter: { w: 612, h: 792 },
  }

  const loadImageMeta = (file: File): Promise<ImageFile> =>
    new Promise((resolve) => {
      const url = URL.createObjectURL(file)
      const img = new Image()
      img.onload = () =>
        resolve({ id: crypto.randomUUID(), file, preview: url, width: img.naturalWidth, height: img.naturalHeight })
      img.src = url
    })

  const addFiles = useCallback(async (files: FileList | File[]) => {
    const valid = Array.from(files).filter((f) => f.type.startsWith('image/'))
    const loaded = await Promise.all(valid.map(loadImageMeta))
    setImages((prev) => [...prev, ...loaded])
  }, [])

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setDragging(false)
      addFiles(e.dataTransfer.files)
    },
    [addFiles]
  )

  const removeImage = (id: string) => {
    setImages((prev) => {
      const img = prev.find((i) => i.id === id)
      if (img) URL.revokeObjectURL(img.preview)
      return prev.filter((i) => i.id !== id)
    })
  }

  const moveImage = (idx: number, dir: -1 | 1) => {
    setImages((prev) => {
      const next = [...prev]
      const [item] = next.splice(idx, 1)
      next.splice(idx + dir, 0, item)
      return next
    })
  }

  const generatePdf = async () => {
    if (!images.length) return
    setLoading(true)
    try {
      const { PDFDocument } = await import('pdf-lib')
      const pdfDoc = await PDFDocument.create()

      for (const imgFile of images) {
        const bytes = await imgFile.file.arrayBuffer()
        const mime = imgFile.file.type

        let embeddedImage
        if (mime === 'image/jpeg' || mime === 'image/jpg') {
          embeddedImage = await pdfDoc.embedJpg(bytes)
        } else {
          // Convert to PNG via canvas for all other formats (PNG, WebP, HEIC, etc.)
          const canvas = document.createElement('canvas')
          const ctx = canvas.getContext('2d')!
          const img = new Image()
          await new Promise<void>((res) => {
            img.onload = () => res()
            img.src = imgFile.preview
          })
          canvas.width = img.naturalWidth
          canvas.height = img.naturalHeight
          ctx.drawImage(img, 0, 0)
          const pngBytes = await new Promise<Uint8Array>((res) => {
            canvas.toBlob((blob) => {
              blob!.arrayBuffer().then((buf) => res(new Uint8Array(buf)))
            }, 'image/png')
          })
          embeddedImage = await pdfDoc.embedPng(pngBytes)
        }

        const imgW = embeddedImage.width
        const imgH = embeddedImage.height

        let pageW: number
        let pageH: number

        if (pageSize === 'original') {
          pageW = imgW + margin * 2
          pageH = imgH + margin * 2
        } else {
          const base = PAGE_SIZES[pageSize]
          const isLandscape =
            orientation === 'landscape' ||
            (orientation === 'auto' && imgW > imgH)
          pageW = isLandscape ? base.h : base.w
          pageH = isLandscape ? base.w : base.h
        }

        const page = pdfDoc.addPage([pageW, pageH])
        const availW = pageW - margin * 2
        const availH = pageH - margin * 2
        const scale = Math.min(availW / imgW, availH / imgH)
        const drawW = imgW * scale
        const drawH = imgH * scale
        const x = margin + (availW - drawW) / 2
        const y = margin + (availH - drawH) / 2

        page.drawImage(embeddedImage, { x, y, width: drawW, height: drawH })
      }

      const pdfBytes = await pdfDoc.save()
      const blob = new Blob([pdfBytes], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'images-converties.pdf'
      a.click()
      URL.revokeObjectURL(url)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileImage className="h-5 w-5" />
            {t('imgToPdf')}
          </CardTitle>
          <CardDescription>{t('imgToPdfDesc')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Drop zone */}
          <div
            className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${dragging ? 'border-primary bg-primary/5' : 'border-muted-foreground/30 hover:border-primary/60'}`}
            onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
            onDragLeave={() => setDragging(false)}
            onDrop={onDrop}
            onClick={() => document.getElementById('img-input')?.click()}
          >
            <FileImage className="mx-auto h-10 w-10 text-muted-foreground mb-3" />
            <p className="text-sm font-medium">Glissez vos images ici ou cliquez pour parcourir</p>
            <p className="text-xs text-muted-foreground mt-1">JPG, PNG, WebP, GIF, BMP — plusieurs fichiers acceptés</p>
            <input
              id="img-input"
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => e.target.files && addFiles(e.target.files)}
            />
          </div>

          {/* Options */}
          {images.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Format de page</Label>
                <select
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={pageSize}
                  onChange={(e) => setPageSize(e.target.value as PageSize)}
                >
                  <option value="A4">A4 (210×297 mm)</option>
                  <option value="A3">A3 (297×420 mm)</option>
                  <option value="Letter">Letter (US)</option>
                  <option value="original">Taille originale</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>Orientation</Label>
                <select
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={orientation}
                  onChange={(e) => setOrientation(e.target.value as Orientation)}
                >
                  <option value="auto">Automatique</option>
                  <option value="portrait">Portrait</option>
                  <option value="landscape">Paysage</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>Marge (pt)</Label>
                <select
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={margin}
                  onChange={(e) => setMargin(Number(e.target.value))}
                >
                  <option value={0}>Sans marge</option>
                  <option value={10}>Petite (10pt)</option>
                  <option value={20}>Moyenne (20pt)</option>
                  <option value={40}>Grande (40pt)</option>
                </select>
              </div>
            </div>
          )}

          {/* Image list */}
          {images.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">{images.length} image(s) — glissez pour réorganiser</p>
              <div className="space-y-2">
                {images.map((img, idx) => (
                  <div key={img.id} className="flex items-center gap-3 rounded-lg border p-3 bg-muted/20">
                    <img
                      src={img.preview}
                      alt={img.file.name}
                      className="h-12 w-16 object-contain rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{img.file.name}</p>
                      <p className="text-xs text-muted-foreground">{img.width}×{img.height} px · {(img.file.size / 1024).toFixed(0)} KB</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => moveImage(idx, -1)} disabled={idx === 0}>
                        <MoveUp className="h-3.5 w-3.5" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => moveImage(idx, 1)} disabled={idx === images.length - 1}>
                        <MoveDown className="h-3.5 w-3.5" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive" onClick={() => removeImage(img.id)}>
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 flex-wrap">
            <Button
              onClick={generatePdf}
              disabled={!images.length || loading}
              className="flex-1 sm:flex-none"
            >
              <Download className="h-4 w-4 mr-2" />
              {loading ? 'Conversion…' : `Convertir en PDF (${images.length})`}
            </Button>
            {images.length > 0 && (
              <Button variant="outline" onClick={() => setImages([])}>
                <Trash2 className="h-4 w-4 mr-2" />
                Tout effacer
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
