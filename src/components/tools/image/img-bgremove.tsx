'use client'

import { useTranslations } from 'next-intl'

import { useState, useCallback, useEffect } from 'react'
import {
  FileImage,
  Download,
  Loader2,
  RotateCcw,
  Eraser,
  Key,
  Save,
  AlertCircle,
  RefreshCw,
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

type ProcessingState = 'idle' | 'processing' | 'success' | 'error'

export function ImgBgRemove() {
  const t = useTranslations('ToolsUI')
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>('')
  const [resultUrl, setResultUrl] = useState<string>('')
  const [resultBlob, setResultBlob] = useState<Blob | null>(null)
  const [apiKey, setApiKey] = useState<string>('')
  const [state, setState] = useState<ProcessingState>('idle')
  const [errorMsg, setErrorMsg] = useState<string>('')

  // Load API key from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('removebg_api_key')
    if (saved) setApiKey(saved)
  }, [])

  const handleFiles = useCallback((files: File[]) => {
    const img = files.find((f) => f.type.startsWith('image/'))
    if (!img) {
      toast.error('Veuillez sélectionner une image valide.')
      return
    }

    if (previewUrl) URL.revokeObjectURL(previewUrl)
    if (resultUrl) URL.revokeObjectURL(resultUrl)

    const url = URL.createObjectURL(img)
    setFile(img)
    setPreviewUrl(url)
    setResultUrl('')
    setResultBlob(null)
    setState('idle')
    setErrorMsg('')
  }, [previewUrl, resultUrl])

  const handleReset = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl)
    if (resultUrl) URL.revokeObjectURL(resultUrl)
    setFile(null)
    setPreviewUrl('')
    setResultUrl('')
    setResultBlob(null)
    setState('idle')
    setErrorMsg('')
  }

  const handleSaveApiKey = () => {
    if (!apiKey.trim()) {
      toast.error('Veuillez entrer une clé API.')
      return
    }
    localStorage.setItem('removebg_api_key', apiKey.trim())
    toast.success('Clé API sauvegardée.')
  }

  const handleRemoveBg = async () => {
    if (!file) return
    if (!apiKey.trim()) {
      toast.error('Veuillez entrer votre clé API remove.bg')
      setErrorMsg('Veuillez entrer votre clé API remove.bg')
      setState('error')
      return
    }

    setState('processing')
    setErrorMsg('')

    try {
      // === remove.bg API Integration ===
      // To activate, get your API key from https://www.remove.bg/api
      // and enter it in the field above.
      //
      // const formData = new FormData()
      // formData.append('image_file', file)
      // formData.append('size', 'auto')
      //
      // const response = await fetch('https://api.remove.bg/v1.0/removebg', {
      //   method: 'POST',
      //   headers: { 'X-Api-Key': apiKey },
      //   body: formData,
      // })
      //
      // if (!response.ok) {
      //   throw new Error(`Erreur API: ${response.status} ${response.statusText}`)
      // }
      //
      // const blob = await response.blob()
      // ================================

      // Actual implementation
      const formData = new FormData()
      formData.append('image_file', file)
      formData.append('size', 'auto')

      const response = await fetch('https://api.remove.bg/v1.0/removebg', {
        method: 'POST',
        headers: { 'X-Api-Key': apiKey.trim() },
        body: formData,
      })

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          throw new Error('Clé API invalide. Vérifiez votre clé et réessayez.')
        }
        if (response.status === 429) {
          throw new Error(
            'Limite de requêtes atteinte. Réessayez dans quelques instants.'
          )
        }
        if (response.status === 402) {
          throw new Error(
            'Crédits insuffisants. Vérifiez votre abonnement remove.bg.'
          )
        }
        throw new Error(
          `Erreur API: ${response.status} ${response.statusText}`
        )
      }

      const blob = await response.blob()

      if (resultUrl) URL.revokeObjectURL(resultUrl)
      const url = URL.createObjectURL(blob)
      setResultUrl(url)
      setResultBlob(blob)
      setState('success')
      toast.success('Fond supprimé avec succès !')
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Erreur inconnue'

      if (
        message.toLowerCase().includes('network') ||
        message.toLowerCase().includes('fetch')
      ) {
        setErrorMsg('Erreur réseau. Vérifiez votre connexion.')
      } else {
        setErrorMsg(message)
      }

      setState('error')
      toast.error(message)
    }
  }

  const handleDownload = () => {
    if (!resultBlob || !file) return

    const baseName = file.name.replace(/\.[^.]+$/, '')
    downloadBlob(resultBlob, `${baseName}-sans-fond.png`)
    toast.success('Image téléchargée.')
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Eraser className="h-5 w-5" />
          Suppression d&apos;Arrière-plan
        </CardTitle>
        <CardDescription>
          Supprimez l&apos;arrière-plan de vos images automatiquement grâce à
          l&apos;API remove.bg.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* API Key input */}
        <div className="space-y-2">
          <Label htmlFor="api-key" className="flex items-center gap-1.5">
            <Key className="h-3.5 w-3.5" />
            Clé API remove.bg
          </Label>
          <div className="flex gap-2">
            <Input
              id="api-key"
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Entrez votre clé API..."
              className="flex-1"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={handleSaveApiKey}
              disabled={!apiKey.trim()}
            >
              <Save className="h-4 w-4 mr-1.5" />
              <span className="hidden sm:inline">Sauvegarder</span>
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Obtenez votre clé sur{' '}
            <a
              href="https://www.remove.bg/api"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground"
            >
              remove.bg/api
            </a>
          </p>
        </div>

        {/* Drop zone */}
        {state === 'idle' && !file && (
          <DropZone
            accept="image/*"
            onFiles={handleFiles}
            maxSize={25}
            label={t("dropImage")}
            sublabel={t("orClickBrowse")}
            icon={<FileImage className="h-8 w-8" />}
          />
        )}

        {/* Image loaded - preview and actions */}
        {file && state !== 'processing' && (
          <div className="space-y-4">
            {/* File info */}
            <div className="flex items-center gap-4 rounded-lg border bg-muted/30 p-4">
              <div className="rounded-lg bg-primary/10 p-2">
                <FileImage className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{file.name}</p>
                <p className="text-sm text-muted-foreground">
                  {formatFileSize(file.size)}
                </p>
              </div>
              <Button variant="ghost" size="sm" onClick={handleReset}>
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>

            {/* Original preview */}
            {state === 'idle' && (
              <div className="space-y-3">
                <Label>Aperçu de l&apos;image originale</Label>
                <div className="flex justify-center">
                  <div className="relative max-w-md w-full rounded-lg border overflow-hidden bg-[repeating-conic-gradient(#e5e7eb_0%_25%,white_0%_50%)] bg-[length:16px_16px]">
                    <img
                      src={previewUrl}
                      alt={t("original")}
                      className="w-full h-auto max-h-72 object-contain"
                    />
                  </div>
                </div>

                <Button
                  onClick={handleRemoveBg}
                  disabled={!apiKey.trim()}
                  className="w-full"
                  size="lg"
                >
                  <Eraser className="h-4 w-4 mr-2" />
                  Supprimer l&apos;arrière-plan
                </Button>
              </div>
            )}

            {/* Error state */}
            {state === 'error' && (
              <div className="space-y-3">
                <div className="flex items-start gap-3 rounded-lg border border-destructive/50 bg-destructive/5 p-4">
                  <AlertCircle className="h-5 w-5 text-destructive mt-0.5 shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-destructive">
                      Erreur
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {errorMsg}
                    </p>
                  </div>
                </div>
                <Button
                  onClick={handleRemoveBg}
                  variant="outline"
                  className="w-full"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Réessayer
                </Button>
              </div>
            )}

            {/* Success state */}
            {state === 'success' && resultUrl && (
              <div className="space-y-3">
                <Label>Résultat</Label>
                <div className="flex justify-center">
                  <div
                    className="relative max-w-md w-full rounded-lg border overflow-hidden"
                    style={{
                      backgroundImage:
                        'repeating-conic-gradient(#d1d5db 0% 25%, white 0% 50%)',
                      backgroundSize: '16px 16px',
                    }}
                  >
                    <img
                      src={resultUrl}
                      alt={t("noBackground")}
                      className="w-full h-auto max-h-72 object-contain"
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={handleRemoveBg}
                    variant="outline"
                    className="flex-1"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Recommencer
                  </Button>
                  <Button onClick={handleDownload} className="flex-1">
                    <Download className="h-4 w-4 mr-2" />
                    Télécharger PNG
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Processing state */}
        {state === 'processing' && (
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <div className="relative">
              <div className="h-16 w-16 rounded-full border-4 border-muted" />
              <Loader2 className="h-16 w-16 animate-spin text-primary absolute inset-0" />
            </div>
            <div className="text-center space-y-1">
              <p className="text-sm font-medium">Traitement en cours...</p>
              <p className="text-xs text-muted-foreground">
                Suppression de l&apos;arrière-plan, veuillez patienter.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
