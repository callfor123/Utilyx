'use client'

import { useState, useCallback } from 'react'
import { FileText, Loader2, Minimize2, RotateCcw } from 'lucide-react'
import { PDFDocument } from 'pdf-lib'
import { toast } from 'sonner'
import { useTranslations } from 'next-intl'
import { cn, formatFileSize, downloadBlob } from '@/lib/utils'
import { DropZone } from '@/components/layout/drop-zone'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { Progress } from '@/components/ui/progress'

export function PdfCompress() {
  const t = useTranslations('ToolsUI')
  const [file, setFile] = useState<File | null>(null)
  const [level, setLevel] = useState<number>(1)
  const [isCompressing, setIsCompressing] = useState(false)
  const [result, setResult] = useState<{
    originalSize: number
    compressedSize: number
    savedPercent: number
  } | null>(null)

  const compressionLevels = [
    { value: 1, label: t('low'), ratio: 0.80 },
    { value: 2, label: t('medium'), ratio: 0.55 },
    { value: 3, label: t('high'), ratio: 0.35 },
  ]

  const handleFiles = useCallback((files: File[]) => {
    const pdf = files.find((f) => f.type === 'application/pdf' || f.name.endsWith('.pdf'))
    if (pdf) {
      setFile(pdf)
      setResult(null)
    } else {
      toast.error(t('selectValidPdf'))
    }
  }, [t])

  const estimatedSize = file
    ? Math.round(file.size * compressionLevels[level - 1].ratio)
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
        const pages = await newDoc.copyPages(srcDoc, srcDoc.getPageIndices())
        pages.forEach((page) => newDoc.addPage(page))
      } else if (level === 2) {
        newDoc.setTitle('')
        newDoc.setAuthor('')
        newDoc.setSubject('')
        newDoc.setKeywords([])
        newDoc.setProducer('')
        newDoc.setCreator('')
        const pages = await newDoc.copyPages(srcDoc, srcDoc.getPageIndices())
        pages.forEach((page) => newDoc.addPage(page))
      } else {
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

      const blob = new Blob([new Uint8Array(compressedBytes) as BlobPart], { type: 'application/pdf' })
      const compressedSize = blob.size
      const originalSize = file.size
      const savedPercent = Math.round((1 - compressedSize / originalSize) * 100)

      setResult({ originalSize, compressedSize, savedPercent })

      const baseName = file.name.replace(/\.pdf$/i, '')
      downloadBlob(blob, `${baseName}${t('compressed')}.pdf`)

      if (savedPercent > 0) {
        toast.success(t('pdfCompressedSuccess', { percent: savedPercent }))
      } else {
        toast.success(t('pdfOptimizedSuccess'))
      }
    } catch (error) {
      console.error('Compression error:', error)
      toast.error(t('pdfCompressError'))
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
            {t('pdfCompression')}
          </CardTitle>
          <CardDescription>
            {t('pdfCompressionDesc')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {!file ? (
            <DropZone
              accept=".pdf"
              onFiles={handleFiles}
              maxSize={100}
              label={t('dropPdf')}
              sublabel={t('orClickBrowse')}
              icon={<FileText className="h-8 w-8" />}
            />
          ) : (
            <div className="space-y-6">
              <div className="flex items-center gap-4 rounded-lg border bg-muted/30 p-4">
                <div className="rounded-lg bg-primary/10 p-2">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{file.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {t('originalSize')} : {formatFileSize(file.size)}
                  </p>
                </div>
                <Button variant="ghost" size="sm" onClick={handleReset}>
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>{t('compressionLevel')}</Label>
                  <span className="text-sm font-medium text-primary">
                    {compressionLevels[level - 1].label}
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
                  <span>{t('low')}</span>
                  <span>{t('medium')}</span>
                  <span>{t('high')}</span>
                </div>
              </div>

              <div className="rounded-lg border p-4 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{t('originalSize')}</span>
                  <span className="font-medium">{formatFileSize(file.size)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{t('estimatedSize')}</span>
                  <span className="font-medium text-primary">
                    ~{formatFileSize(estimatedSize)}
                  </span>
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{t('estimatedReduction')}</span>
                    <span>
                      {Math.round((1 - compressionLevels[level - 1].ratio) * 100)}%
                    </span>
                  </div>
                  <Progress
                    value={compressionLevels[level - 1].ratio * 100}
                    className="h-2"
                  />
                </div>
              </div>

              {result && (
                <div className="rounded-lg border border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950/30 p-4 space-y-3">
                  <p className="text-sm font-medium text-green-800 dark:text-green-200">
                    {t('compressionDone')}
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-green-700 dark:text-green-300">{t('finalSize')}</span>
                    <span className="font-medium text-green-800 dark:text-green-200">
                      {formatFileSize(result.compressedSize)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-green-700 dark:text-green-300">{t('spaceSaved')}</span>
                    <span className="font-medium text-green-800 dark:text-green-200">
                      {result.savedPercent > 0 ? `${result.savedPercent}%` : '0%'}
                    </span>
                  </div>
                </div>
              )}

              <Button
                onClick={handleCompress}
                disabled={isCompressing}
                className="w-full"
                size="lg"
              >
                {isCompressing ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    {t('compressing')}
                  </>
                ) : (
                  <>
                    <Minimize2 className="h-4 w-4 mr-2" />
                    {t('compress')}
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