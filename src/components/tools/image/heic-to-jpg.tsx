'use client'

import { useState, useCallback } from 'react'
import { Smartphone, Download, Loader2, RotateCcw, Image as ImageIcon, Archive, CheckCircle2 } from 'lucide-react'
import { toast } from 'sonner'
import { cn, formatFileSize, downloadBlob } from '@/lib/utils'
import { DropZone } from '@/components/layout/drop-zone'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { Progress } from '@/components/ui/progress'

interface ConvertedFile {
  original: File
  converted: Blob
  name: string
  originalSize: number
  convertedSize: number
}

export function HeicToJpg() {
  const [files, setFiles] = useState<File[]>([])
  const [outputFormat, setOutputFormat] = useState<'image/jpeg' | 'image/png'>('image/jpeg')
  const [quality, setQuality] = useState(0.9)
  const [isConverting, setIsConverting] = useState(false)
  const [progress, setProgress] = useState(0)
  const [convertedFiles, setConvertedFiles] = useState<ConvertedFile[]>([])
  const [isDownloadingAll, setIsDownloadingAll] = useState(false)

  const handleFiles = useCallback((newFiles: File[]) => {
    const heicFiles = newFiles.filter(
      (f) =>
        f.type === 'image/heic' ||
        f.type === 'image/heif' ||
        f.name.toLowerCase().endsWith('.heic') ||
        f.name.toLowerCase().endsWith('.heif')
    )
    if (heicFiles.length === 0) {
      toast.error('Veuillez sélectionner des fichiers HEIC/HEIF.')
      return
    }
    setFiles((prev) => [...prev, ...heicFiles])
    setConvertedFiles([])
  }, [])

  const handleRemoveFile = useCallback((index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
    setConvertedFiles([])
  }, [])

  const handleReset = () => {
    setFiles([])
    setConvertedFiles([])
    setProgress(0)
  }

  const handleConvert = async () => {
    if (files.length === 0 || typeof window === 'undefined') return

    setIsConverting(true)
    setProgress(0)
    setConvertedFiles([])

    try {
      const heic2any = (await import('heic2any')).default
      const results: ConvertedFile[] = []

      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        try {
          const blob = await heic2any({
            blob: file,
            toType: outputFormat,
            quality: outputFormat === 'image/jpeg' ? quality : undefined,
          })

          const convertedBlob = Array.isArray(blob) ? blob[0] : blob
          const ext = outputFormat === 'image/jpeg' ? 'jpg' : 'png'
          const baseName = file.name.replace(/\.(heic|heif)$/i, '')

          results.push({
            original: file,
            converted: convertedBlob,
            name: `${baseName}.${ext}`,
            originalSize: file.size,
            convertedSize: convertedBlob.size,
          })
        } catch {
          toast.error(`Erreur de conversion pour ${file.name}`)
        }

        setProgress(Math.round(((i + 1) / files.length) * 100))
      }

      if (results.length > 0) {
        setConvertedFiles(results)
        toast.success(`${results.length} fichier${results.length > 1 ? 's' : ''} converti${results.length > 1 ? 's' : ''} avec succès !`)
      }
    } catch (error) {
      console.error('Conversion error:', error)
      toast.error('Erreur lors de la conversion des fichiers.')
    } finally {
      setIsConverting(false)
    }
  }

  const handleDownloadSingle = (item: ConvertedFile) => {
    downloadBlob(item.converted, item.name)
    toast.success(`${item.name} téléchargé`)
  }

  const handleDownloadAll = async () => {
    if (convertedFiles.length === 0 || typeof window === 'undefined') return
    setIsDownloadingAll(true)

    try {
      const JSZip = (await import('jszip')).default
      const zip = new JSZip()

      for (const item of convertedFiles) {
        zip.file(item.name, item.converted)
      }

      const zipBlob = await zip.generateAsync({ type: 'blob' })
      downloadBlob(zipBlob, 'heic-converted.zip')
      toast.success('Archive ZIP téléchargée !')
    } catch (error) {
      console.error('ZIP error:', error)
      toast.error("Erreur lors de la création de l'archive ZIP.")
    } finally {
      setIsDownloadingAll(false)
    }
  }

  const totalOriginalSize = files.reduce((sum, f) => sum + f.size, 0)
  const totalConvertedSize = convertedFiles.reduce((sum, f) => sum + f.convertedSize, 0)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            HEIC vers JPG / PNG
          </CardTitle>
          <CardDescription>
            Convertissez vos photos iPhone HEIC/HEIF en JPG ou PNG. Traitement 100% local dans votre navigateur.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {files.length === 0 ? (
            <DropZone
              accept=".heic,.heif"
              multiple
              onFiles={handleFiles}
              maxSize={100}
              label="Glissez-déposez vos fichiers HEIC/HEIF ici"
              sublabel="ou cliquez pour parcourir — plusieurs fichiers possibles"
              icon={<Smartphone className="h-8 w-8" />}
            />
          ) : (
            <div className="space-y-6">
              {/* File list */}
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {files.map((file, i) => (
                  <div key={`${file.name}-${i}`} className="flex items-center gap-3 rounded-lg border bg-muted/30 px-3 py-2 text-sm">
                    <div className="rounded-lg bg-primary/10 p-2 shrink-0">
                      <ImageIcon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="truncate font-medium">{file.name}</p>
                      <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                    </div>
                    {convertedFiles[i] ? (
                      <div className="text-xs text-emerald-600 dark:text-emerald-400 shrink-0">
                        ✓ {formatFileSize(convertedFiles[i].convertedSize)}
                      </div>
                    ) : (
                      <button onClick={() => handleRemoveFile(i)} className="rounded-full p-1 hover:bg-muted shrink-0">
                        <RotateCcw className="h-4 w-4 text-muted-foreground" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Format selection */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none">Format de sortie</label>
                  <div className="flex gap-2">
                    {[
                      { value: 'image/jpeg' as const, label: 'JPG' },
                      { value: 'image/png' as const, label: 'PNG' },
                    ].map((fmt) => (
                      <button
                        key={fmt.value}
                        onClick={() => { setOutputFormat(fmt.value); setConvertedFiles([]) }}
                        className={cn(
                          'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                          outputFormat === fmt.value
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted/60 text-muted-foreground hover:bg-muted'
                        )}
                      >
                        {fmt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quality slider (JPG only) */}
                {outputFormat === 'image/jpeg' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium leading-none">Qualité</label>
                      <span className="text-sm font-medium text-primary">{Math.round(quality * 100)}%</span>
                    </div>
                    <Slider
                      value={[quality * 100]}
                      onValueChange={(val) => { setQuality(val[0] / 100); setConvertedFiles([]) }}
                      min={10}
                      max={100}
                      step={5}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Petit fichier</span>
                      <span>Haute qualité</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Progress */}
              {isConverting && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Conversion en cours…</span>
                    <span className="font-medium">{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
              )}

              {/* Size comparison */}
              {convertedFiles.length > 0 && (
                <div className="rounded-lg border border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950/30 p-4 space-y-3">
                  <p className="text-sm font-medium text-green-800 dark:text-green-200 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4" />
                    Conversion terminée !
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-green-700 dark:text-green-300">Taille totale originale</span>
                    <span className="font-medium text-green-800 dark:text-green-200">{formatFileSize(totalOriginalSize)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-green-700 dark:text-green-300">Taille totale convertie</span>
                    <span className="font-medium text-green-800 dark:text-green-200">{formatFileSize(totalConvertedSize)}</span>
                  </div>
                  {totalOriginalSize > 0 && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-green-700 dark:text-green-300">Réduction</span>
                      <span className="font-medium text-green-800 dark:text-green-200">
                        {totalConvertedSize < totalOriginalSize
                          ? `${Math.round((1 - totalConvertedSize / totalOriginalSize) * 100)}%`
                          : '+0%'}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-2">
                <Button onClick={handleConvert} disabled={isConverting} className="flex-1" size="lg">
                  {isConverting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Conversion…
                    </>
                  ) : (
                    <>
                      <Smartphone className="h-4 w-4 mr-2" />
                      Convertir ({files.length} fichier{files.length > 1 ? 's' : ''})
                    </>
                  )}
                </Button>

                {convertedFiles.length > 0 && (
                  <>
                    {convertedFiles.length === 1 ? (
                      <Button variant="outline" onClick={() => handleDownloadSingle(convertedFiles[0])} size="lg" className="flex-1">
                        <Download className="h-4 w-4 mr-2" />
                        Télécharger
                      </Button>
                    ) : (
                      <Button variant="outline" onClick={handleDownloadAll} disabled={isDownloadingAll} size="lg" className="flex-1">
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
                    )}
                  </>
                )}

                <Button variant="ghost" onClick={handleReset} size="lg">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Réinitialiser
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
