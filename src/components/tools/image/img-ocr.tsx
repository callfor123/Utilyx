'use client'

import { useState, useCallback, useRef } from 'react'
import {
  FileImage,
  Download,
  Loader2,
  RotateCcw,
  ScanText,
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
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const LANGUAGE_OPTIONS = [
  { value: 'eng', label: 'Anglais' },
  { value: 'fra', label: 'Français' },
  { value: 'spa', label: 'Espagnol' },
  { value: 'deu', label: 'Allemand' },
  { value: 'ita', label: 'Italien' },
  { value: 'por', label: 'Portugais' },
  { value: 'nld', label: 'Néerlandais' },
  { value: 'rus', label: 'Russe' },
] as const

export function ImageOcr() {
  const [file, setFile] = useState<File | null>(null)
  const [imageUrl, setImageUrl] = useState<string>('')
  const [ocrResult, setOcrResult] = useState<string>('')
  const [confidence, setConfidence] = useState<number>(0)
  const [wordCount, setWordCount] = useState<number>(0)
  const [isProcessing, setIsProcessing] = useState(false)
  const [language, setLanguage] = useState<string>('eng')
  const [imageDimensions, setImageDimensions] = useState<{
    width: number
    height: number
  } | null>(null)

  const handleFiles = useCallback((files: File[]) => {
    const img = files.find((f) => f.type.startsWith('image/'))
    if (!img) {
      toast.error('Veuillez sélectionner une image valide.')
      return
    }

    // Cleanup previous state
    setFile(img)
    setImageUrl('')
    setOcrResult('')
    setConfidence(0)
    setWordCount(0)

    const url = URL.createObjectURL(img)
    setImageUrl(url)

    // Get dimensions
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
    setOcrResult('')
    setConfidence(0)
    setWordCount(0)
    setImageDimensions(null)
  }

  const handleProcess = async () => {
    if (!file) return
    setIsProcessing(true)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('lang', language)

      const response = await fetch('/api/ocr', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Échec du traitement OCR')
      }

      const result = await response.json()

      setOcrResult(result.text)
      setConfidence(Math.round(result.confidence))
      setWordCount(result.words)

      toast.success('Reconnaissance de texte terminée !')
    } catch (error) {
      console.error('OCR error:', error)
      toast.error('Erreur lors de la reconnaissance de texte.')
    } finally {
      setIsProcessing(false)
    }
  }

  const handleDownload = () => {
    if (!ocrResult) return

    const blob = new Blob([ocrResult], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${file?.name.replace(/\.[^.]+$/, '') || 'ocr-result'}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast.success('Texte téléchargé.')
  }

  const handleCopy = () => {
    if (!ocrResult) return

    navigator.clipboard.writeText(ocrResult)
    toast.success('Texte copié dans le presse-papiers.')
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ScanText className="h-5 w-5" />
          Reconnaissance de Texte (OCR)
        </CardTitle>
        <CardDescription>
          Extrayez le texte d&apos;images scannées, de photos de documents, etc.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {!file ? (
          <DropZone
            accept="image/*"
            onFiles={handleFiles}
            maxSize={20}
            label="Glissez-déposez votre image ici"
            sublabel="ou cliquez pour parcourir"
            icon={<ScanText className="h-8 w-8" />}
          />
        ) : (
          <div className="space-y-6">
            {/* File info */}
            <div className="flex items-center gap-4 rounded-lg border bg-muted/30 p-4">
              <div className="rounded-lg bg-primary/10 p-2">
                <ScanText className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{file.name}</p>
                <p className="text-sm text-muted-foreground">
                  {imageDimensions
                    ? `${imageDimensions.width} × ${imageDimensions.height} px · `
                    : ''}
                  {formatFileSize(file.size)}
                </p>
              </div>
              <Button variant="ghost" size="sm" onClick={handleReset}>
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>

            {/* Language selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">
                Langue du texte
              </label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {LANGUAGE_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Preview image */}
            {imageUrl && (
              <div className="space-y-3">
                <p className="text-sm font-medium">Aperçu de l&apos;image</p>
                <div className="relative mx-auto max-w-full overflow-hidden rounded-lg border bg-[repeating-conic-gradient(#e5e7eb_0%_25%,white_0%_50%)] bg-[length:16px_16px]">
                  <img
                    src={imageUrl}
                    alt="Prévisualisation"
                    className="w-full h-auto max-h-[400px] object-contain"
                    draggable={false}
                  />
                </div>
              </div>
            )}

            {/* OCR Result */}
            {ocrResult && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Texte extrait</p>
                  <div className="flex gap-2">
                    <Badge variant="secondary">
                      Confiance: {confidence}%
                    </Badge>
                    <Badge variant="secondary">
                      {wordCount} mots
                    </Badge>
                  </div>
                </div>
                <Textarea
                  value={ocrResult}
                  onChange={(e) => setOcrResult(e.target.value)}
                  rows={8}
                  className="font-mono text-sm resize-none"
                />
                <div className="flex gap-2">
                  <Button onClick={handleCopy} variant="outline" className="flex-1">
                    Copier le texte
                  </Button>
                  <Button onClick={handleDownload}>
                    <Download className="h-4 w-4 mr-2" />
                    Télécharger
                  </Button>
                </div>
              </div>
            )}

            {/* Process button */}
            <div className="flex gap-2">
              <Button
                onClick={handleProcess}
                disabled={isProcessing}
                className="flex-1"
                size="lg"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Traitement en cours...
                  </>
                ) : ocrResult ? (
                  <>
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Re-traiter
                  </>
                ) : (
                  <>
                    <ScanText className="h-4 w-4 mr-2" />
                    Extraire le texte
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}