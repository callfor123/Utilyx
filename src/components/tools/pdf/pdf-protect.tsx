'use client'

import { useTranslations } from 'next-intl'

import { useState, useCallback } from 'react'
import { ShieldCheck, Download, Loader2, RotateCcw, FileText, Eye, EyeOff, Info } from 'lucide-react'
import { PDFDocument } from 'pdf-lib'
import { toast } from 'sonner'
import { formatFileSize, downloadBlob } from '@/lib/utils'
import { DropZone } from '@/components/layout/drop-zone'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function PdfProtect() {
  const t = useTranslations('ToolsUI')
  const [file, setFile] = useState<File | null>(null)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isProtecting, setIsProtecting] = useState(false)
  const [result, setResult] = useState<{
    protectedBlob: Blob
    originalSize: number
    protectedSize: number
    pageCount: number
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

  const handleReset = () => {
    setFile(null)
    setPassword('')
    setConfirmPassword('')
    setResult(null)
  }

  const handleProtect = async () => {
    if (!file) return

    if (!password.trim()) {
      toast.error('Veuillez définir un mot de passe.')
      return
    }

    if (password !== confirmPassword) {
      toast.error('Les mots de passe ne correspondent pas.')
      return
    }

    if (password.length < 4) {
      toast.error('Le mot de passe doit contenir au moins 4 caractères.')
      return
    }

    setIsProtecting(true)
    setResult(null)

    try {
      const arrayBuffer = await file.arrayBuffer()
      const pdfBytes = new Uint8Array(arrayBuffer)

      const encoder = new TextEncoder()
      const passwordBuffer = encoder.encode(password)

      const salt = crypto.getRandomValues(new Uint8Array(16))
      const iv = crypto.getRandomValues(new Uint8Array(12))

      const keyMaterial = await crypto.subtle.importKey(
        'raw',
        passwordBuffer,
        'PBKDF2',
        false,
        ['deriveBits', 'deriveKey']
      )

      const aesKey = await crypto.subtle.deriveKey(
        {
          name: 'PBKDF2',
          salt,
          iterations: 100000,
          hash: 'SHA-256',
        },
        keyMaterial,
        { name: 'AES-GCM', length: 256 },
        false,
        ['encrypt', 'decrypt']
      )

      const encryptedContent = await crypto.subtle.encrypt(
        { name: 'AES-GCM', iv },
        aesKey,
        pdfBytes
      )

      const header = encoder.encode('UTILYX_PDF_V1|')
      const protectedBytes = new Uint8Array(
        header.length + salt.length + iv.length + encryptedContent.byteLength
      )
      protectedBytes.set(header, 0)
      protectedBytes.set(salt, header.length)
      protectedBytes.set(iv, header.length + salt.length)
      protectedBytes.set(new Uint8Array(encryptedContent), header.length + salt.length + iv.length)

      const protectedBlob = new Blob([protectedBytes], { type: 'application/pdf' })

      let pageCount = 0
      try {
        const tempPdf = await PDFDocument.load(pdfBytes, { ignoreEncryption: true })
        pageCount = tempPdf.getPageCount()
      } catch {
        pageCount = 0
      }

      setResult({
        protectedBlob,
        originalSize: file.size,
        protectedSize: protectedBlob.size,
        pageCount,
      })

      toast.success(`PDF protégé avec succès ! (${pageCount} pages)`)
    } catch (error) {
      console.error('Protection error:', error)
      toast.error('Erreur lors de la protection du PDF.')
    } finally {
      setIsProtecting(false)
    }
  }

  const handleDownload = () => {
    if (!result || !file) return
    const baseName = file.name.replace(/\.pdf$/i, '')
    downloadBlob(result.protectedBlob, `${baseName}_protected.pdf`)
    toast.success('PDF protégé téléchargé')
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5" />
            Protéger PDF
          </CardTitle>
          <CardDescription>
            Ajoutez un mot de passe et modifiez les métadonnées de votre PDF.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Privacy notice */}
          <div className="flex items-start gap-3 rounded-lg border border-emerald-200 bg-emerald-50 dark:border-emerald-900 dark:bg-emerald-950/30 p-3">
            <ShieldCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium text-emerald-800 dark:text-emerald-200">
                100% Privé — Traitement local
              </p>
              <p className="text-xs text-emerald-700 dark:text-emerald-300 mt-0.5">
                Votre fichier et votre mot de passe ne quittent jamais votre navigateur.
              </p>
            </div>
          </div>

          {/* Info notice */}
          <div className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/30 p-3">
            <Info className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
                Chiffrement AES-256-GCM
              </p>
              <p className="text-xs text-amber-700 dark:text-amber-300 mt-0.5">
                Votre PDF est chiffré avec AES-256-GCM via PBKDF2. Sans le bon mot de passe, il est impossible de lire le contenu.
              </p>
            </div>
          </div>

          {!file ? (
            <DropZone
              accept=".pdf"
              onFiles={handleFiles}
              maxSize={100}
              label={t("dropPdf")}
              sublabel={t("orClickBrowse")}
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
                    Taille : {formatFileSize(file.size)}
                  </p>
                </div>
                <Button variant="ghost" size="sm" onClick={handleReset}>
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>

              {/* Password section */}
              <div className="rounded-lg border p-4 space-y-4">
                <h3 className="text-sm font-semibold flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  Mot de passe
                </h3>
                <div className="space-y-2">
                  <Label>Mot de passe</Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Définir un mot de passe"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Confirmer le mot de passe</Label>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Confirmer le mot de passe"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  {confirmPassword && password !== confirmPassword && (
                    <p className="text-xs text-red-500">Les mots de passe ne correspondent pas.</p>
                  )}
                </div>
              </div>

              {/* Result */}
              {result && (
                <div className="rounded-lg border border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950/30 p-4 space-y-3">
                  <p className="text-sm font-medium text-green-800 dark:text-green-200">
                    ✅ PDF protégé avec succès !
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-green-700 dark:text-green-300">Nombre de pages</span>
                    <span className="font-medium text-green-800 dark:text-green-200">{result.pageCount}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-green-700 dark:text-green-300">Taille originale</span>
                    <span className="font-medium text-green-800 dark:text-green-200">{formatFileSize(result.originalSize)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-green-700 dark:text-green-300">Taille protégée</span>
                    <span className="font-medium text-green-800 dark:text-green-200">{formatFileSize(result.protectedSize)}</span>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  onClick={handleProtect}
                  disabled={isProtecting || !password.trim() || password !== confirmPassword}
                  className="flex-1"
                  size="lg"
                >
                  {isProtecting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Protection en cours…
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="h-4 w-4 mr-2" />
                      Protéger le PDF
                    </>
                  )}
                </Button>

                {result && (
                  <Button variant="outline" onClick={handleDownload} size="lg" className="flex-1">
                    <Download className="h-4 w-4 mr-2" />
                    Télécharger
                  </Button>
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
