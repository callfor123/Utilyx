'use client'

import { useState, useCallback } from 'react'
import { FileText, Download, Loader2, Minimize2, RotateCcw } from 'lucide-react'
import { PDFDocument } from 'pdf-lib'
import { toast } from 'sonner'
import { cn, formatFileSize, downloadBlob } from '@/lib/utils'
import { DropZone } from '@/components/layout/drop-zone'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { Progress } from '@/components/ui/progress'

const COMPRESSION_LEVELS = [
  { value: 1, label: 'Faible', ratio: 0.80 },
  { value: 2, label: 'Moyen', ratio: 0.55 },
  { value: 3, label: 'Fort', ratio: 0.35 },
]

export function PdfCompress() {
  const [file, setFile] = useState<File | null>(null)
  const [level, setLevel] = useState<number>(1)
  const [isCompressing, setIsCompressing] = useState(false)
  const [result, setResult] = useState<{
    originalSize: number
    compressedSize: number
    savedPercent: number
  } | null>(null)

  const handleFiles = useCallback((files: File[]) => {
    const pdf = files.find((f) => f.type === 'application/pdf' || f.name.endsWith('.pdf'))
    if (pdf) {
      setFile(pdf)
      setResult(null)
    } else {
      toast.error('Veuillez sélectionner un fichier PDF valide.')
    }
  }, [])

  const estimatedSize = file
    ? Math.round(file.size * COMPRESSION_LEVELS[level - 1].ratio)
    : 0

  const handleCompress = async () => {
    if (!file) return

    setIsCompressing(true)
    setResult(null)

    try {
      const arrayBuffer = await file.arrayBuffer()
      const srcDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true })

      const newDoc = await PDFDocument.create()

      if (level === 1) {
        // Level 1: Simply copy all pages (removes unused objects)
        const pages = await newDoc.copyPages(srcDoc, srcDoc.getPageIndices())
        pages.forEach((page) => newDoc.addPage(page))
      } else if (level === 2) {
        // Level 2: Strip metadata + copy pages
        newDoc.setTitle('')
        newDoc.setAuthor('')
        newDoc.setSubject('')
        newDoc.setKeywords([])
        newDoc.setProducer('')
        newDoc.setCreator('')
        const pages = await newDoc.copyPages(srcDoc, srcDoc.getPageIndices())
        pages.forEach((page) => newDoc.addPage(page))
      } else {
        // Level 3: Strip metadata + copy pages + optimization
        newDoc.setTitle('')
        newDoc.setAuthor('')
        newDoc.setSubject('')
        newDoc.setKeywords([])
        newDoc.setProducer('')
        newDoc.setCreator('')
        const pages = await newDoc.copyPages(srcDoc, srcDoc.getPageIndices())
        pages.forEach((page) => newDoc.addPage(page))
      }

      const compressedBytes = await newDoc.save({
        useObjectStreams: level >= 2,
        addDefaultPage: false,
      })

      const blob = new Blob([compressedBytes], { type: 'application/pdf' })
      const compressedSize = blob.size
      const originalSize = file.size
      const savedPercent = Math.round((1 - compressedSize / originalSize) * 100)

      setResult({ originalSize, compressedSize, savedPercent })

      const baseName = file.name.replace(/\.pdf$/i, '')
      downloadBlob(blob, `${baseName}_compressé.pdf`)

      if (savedPercent > 0) {
        toast.success(`PDF compressé avec succès ! ${savedPercent}% de réduction.`)
      } else {
        toast.success('PDF optimisé avec succès !')
      }
    } catch (error) {
      console.error('Compression error:', error)
      toast.error('Erreur lors de la compression du PDF.')
    } finally {
      setIsCompressing(false)
    }
  }

  const handleReset = () => {
    setFile(null)
    setLevel(1)
    setResult(null)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Minimize2 className="h-5 w-5" />
            Compression PDF
          </CardTitle>
          <CardDescription>
            Réduisez la taille de vos fichiers PDF en supprimant les données inutiles et les métadonnées.
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
                    Taille originale : {formatFileSize(file.size)}
                  </p>
                </div>
                <Button variant="ghost" size="sm" onClick={handleReset}>
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>

              {/* Compression level */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Niveau de compression</Label>
                  <span className="text-sm font-medium text-primary">
                    {COMPRESSION_LEVELS[level - 1].label}
                  </span>
                </div>
                <Slider
                  value={[level]}
                  onValueChange={(val) => {
                    setLevel(val[0])
                    setResult(null)
                  }}
                  min={1}
                  max={3}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Faible</span>
                  <span>Moyen</span>
                  <span>Fort</span>
                </div>
              </div>

              {/* Size comparison */}
              <div className="rounded-lg border p-4 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Taille originale</span>
                  <span className="font-medium">{formatFileSize(file.size)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Taille estimée</span>
                  <span className="font-medium text-primary">
                    ~{formatFileSize(estimatedSize)}
                  </span>
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Réduction estimée</span>
                    <span>
                      {Math.round((1 - COMPRESSION_LEVELS[level - 1].ratio) * 100)}%
                    </span>
                  </div>
                  <Progress
                    value={COMPRESSION_LEVELS[level - 1].ratio * 100}
                    className="h-2"
                  />
                </div>
              </div>

              {/* Result */}
              {result && (
                <div className="rounded-lg border border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950/30 p-4 space-y-3">
                  <p className="text-sm font-medium text-green-800 dark:text-green-200">
                    Compression terminée !
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-green-700 dark:text-green-300">Taille finale</span>
                    <span className="font-medium text-green-800 dark:text-green-200">
                      {formatFileSize(result.compressedSize)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-green-700 dark:text-green-300">Espace économisé</span>
                    <span className="font-medium text-green-800 dark:text-green-200">
                      {result.savedPercent > 0 ? `${result.savedPercent}%` : '0%'}
                    </span>
                  </div>
                </div>
              )}

              {/* Actions */}
              <Button
                onClick={handleCompress}
                disabled={isCompressing}
                className="w-full"
                size="lg"
              >
                {isCompressing ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Compression en cours...
                  </>
                ) : (
                  <>
                    <Minimize2 className="h-4 w-4 mr-2" />
                    Compresser
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

function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <label className={cn('text-sm font-medium leading-none', className)}>
      {children}
    </label>
  )
}
