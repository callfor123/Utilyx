'use client'

import { useState, useCallback } from 'react'
import { Unlock, Download, Loader2, RotateCcw, FileText, ShieldCheck, Eye } from 'lucide-react'
import { PDFDocument } from 'pdf-lib'
import { toast } from 'sonner'
import { formatFileSize, downloadBlob } from '@/lib/utils'
import { DropZone } from '@/components/layout/drop-zone'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function PdfUnlock() {
  const [file, setFile] = useState<File | null>(null)
  const [password, setPassword] = useState('')
  const [isUnlocking, setIsUnlocking] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [result, setResult] = useState<{
    unlockedBlob: Blob
    originalSize: number
    unlockedSize: number
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
    setResult(null)
  }

  const handleUnlock = async () => {
    if (!file) return

    if (!password.trim()) {
      toast.error('Veuillez entrer le mot de passe du PDF.')
      return
    }

    setIsUnlocking(true)
    setResult(null)

    try {
      const arrayBuffer = await file.arrayBuffer()
      const bytes = new Uint8Array(arrayBuffer)

      const headerStr = new TextDecoder().decode(bytes.slice(0, 14))
      let pageCount = 0
      let unlockedBytes: Uint8Array

      if (headerStr === 'UTILYX_PDF_V1|') {
        const salt = bytes.slice(14, 30)
        const iv = bytes.slice(30, 42)
        const encryptedContent = bytes.slice(42)

        const encoder = new TextEncoder()
        const passwordBuffer = encoder.encode(password)

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

        try {
          const decryptedContent = await crypto.subtle.decrypt(
            { name: 'AES-GCM', iv },
            aesKey,
            encryptedContent
          )
          unlockedBytes = new Uint8Array(decryptedContent)
        } catch {
          toast.error('Mot de passe incorrect. Veuillez réessayer.')
          setIsUnlocking(false)
          return
        }

        try {
          const tempPdf = await PDFDocument.load(unlockedBytes, { ignoreEncryption: true })
          pageCount = tempPdf.getPageCount()
        } catch {
          pageCount = 0
        }
      } else {
        const pdfDoc = await PDFDocument.load(arrayBuffer, {
          password,
          ignoreEncryption: false,
        } as any)

        pageCount = pdfDoc.getPageCount()
        const savedBytes = await pdfDoc.save()
        unlockedBytes = new Uint8Array(savedBytes)
      }

      const unlockedBlob = new Blob([unlockedBytes as BlobPart], { type: 'application/pdf' })

      setResult({
        unlockedBlob,
        originalSize: file.size,
        unlockedSize: unlockedBlob.size,
        pageCount,
      })

      toast.success(`PDF déverrouillé avec succès ! (${pageCount} pages)`)
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : String(error)
      if (msg.includes('password') || msg.includes('Password')) {
        toast.error('Mot de passe incorrect. Veuillez réessayer.')
      } else if (msg.includes('encrypted') || msg.includes('Encrypted')) {
        toast.error('Ce PDF est protégé. Veuillez entrer le bon mot de passe.')
      } else {
        toast.error('Erreur lors du déverrouillage. Vérifiez que le fichier est un PDF valide.')
      }
    } finally {
      setIsUnlocking(false)
    }
  }

  const handleDownload = () => {
    if (!result || !file) return
    const baseName = file.name.replace(/\.pdf$/i, '')
    downloadBlob(result.unlockedBlob, `${baseName}_deverrouille.pdf`)
    toast.success('PDF déverrouillé téléchargé')
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Unlock className="h-5 w-5" />
            Déverrouiller PDF
          </CardTitle>
          <CardDescription>
            Retirez le mot de passe de protection de vos fichiers PDF.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Privacy notice */}
          <div className="flex items-start gap-3 rounded-lg border border-emerald-200 bg-emerald-50 dark:border-emerald-900 dark:bg-emerald-950/30 p-3">
            <ShieldCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium text-emerald-800 dark:text-emerald-200">
                100% Privé — Aucune donnée envoyée
              </p>
              <p className="text-xs text-emerald-700 dark:text-emerald-300 mt-0.5">
                Votre fichier ne quitte jamais votre navigateur. Le déverrouillage est effectué entièrement côté client.
              </p>
            </div>
          </div>

          {!file ? (
            <DropZone
              accept=".pdf"
              onFiles={handleFiles}
              maxSize={100}
              label="Glissez-déposez votre PDF protégé ici"
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
                    Taille : {formatFileSize(file.size)}
                  </p>
                </div>
                <Button variant="ghost" size="sm" onClick={handleReset}>
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>

              {/* Password input */}
              <div className="space-y-2">
                <Label>Mot de passe du PDF</Label>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Entrez le mot de passe du PDF"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleUnlock()}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Result */}
              {result && (
                <div className="rounded-lg border border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950/30 p-4 space-y-3">
                  <p className="text-sm font-medium text-green-800 dark:text-green-200">
                    ✅ PDF déverrouillé avec succès !
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
                    <span className="text-green-700 dark:text-green-300">Taille déverrouillée</span>
                    <span className="font-medium text-green-800 dark:text-green-200">{formatFileSize(result.unlockedSize)}</span>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  onClick={handleUnlock}
                  disabled={isUnlocking || !password.trim()}
                  className="flex-1"
                  size="lg"
                >
                  {isUnlocking ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Déverrouillage…
                    </>
                  ) : (
                    <>
                      <Unlock className="h-4 w-4 mr-2" />
                      Déverrouiller
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
