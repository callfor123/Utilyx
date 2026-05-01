'use client'

import { useTranslations } from 'next-intl'

import { useState, useCallback } from 'react'
import { RefreshCw, Download, Loader2, RotateCcw } from 'lucide-react'
import { toast } from 'sonner'
import { formatFileSize, downloadBlob } from '@/lib/utils'
import { DropZone } from '@/components/layout/drop-zone'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useFFmpeg } from './use-ffmpeg'

const OUTPUT_FORMATS = [
  { value: 'mp4', label: 'MP4 (H.264)', ext: '.mp4', mime: 'video/mp4' },
  { value: 'webm', label: 'WebM (VP9)', ext: '.webm', mime: 'video/webm' },
  { value: 'avi', label: 'AVI', ext: '.avi', mime: 'video/x-msvideo' },
  { value: 'mkv', label: 'MKV', ext: '.mkv', mime: 'video/x-matroska' },
  { value: 'mov', label: 'MOV', ext: '.mov', mime: 'video/quicktime' },
  { value: 'gif', label: 'GIF Animé', ext: '.gif', mime: 'image/gif' },
] as const

export function VideoConvert() {
  const t = useTranslations('ToolsUI')
  const [file, setFile] = useState<File | null>(null)
  const [outputFormat, setOutputFormat] = useState('mp4')
  const [isProcessing, setIsProcessing] = useState(false)
  const [resultBlob, setResultBlob] = useState<Blob | null>(null)
  const [resultUrl, setResultUrl] = useState('')
  const { load, loading, progress } = useFFmpeg()

  const handleFiles = useCallback((files: File[]) => {
    const video = files.find(f => f.type.startsWith('video/') || f.name.match(/\.(mp4|webm|avi|mkv|mov|flv|wmv)$/i))
    if (!video) { toast.error('Veuillez sélectionner une vidéo valide.'); return }
    setFile(video)
    setResultBlob(null); setResultUrl('')
  }, [])

  const handleConvert = async () => {
    if (!file) return
    setIsProcessing(true)
    try {
      const ffmpeg = await load()
      if (!ffmpeg) throw new Error('FFmpeg failed to load')
      const inputExt = file.name.substring(file.name.lastIndexOf('.'))
      const format = OUTPUT_FORMATS.find(f => f.value === outputFormat)!
      await ffmpeg.writeFile('input' + inputExt, new Uint8Array(await file.arrayBuffer()))

      const args: string[] = ['-i', 'input' + inputExt]
      if (outputFormat === 'gif') {
        args.push('-vf', 'fps=15,scale=480:-1:flags=fast_bilinear', '-loop', '0')
      } else if (outputFormat === 'webm') {
        // vp9 can be very slow, using realtime deadline and cpu-used 8 for absolute maximum speed
        args.push('-c:v', 'libvpx-vp9', '-crf', '35', '-b:v', '0', '-c:a', 'libopus', '-deadline', 'realtime', '-cpu-used', '8', '-row-mt', '1', '-threads', '4')
      } else if (outputFormat === 'mp4' || outputFormat === 'mkv' || outputFormat === 'mov') {
        // Utiliser libx264 avec le profil ultrafast pour garantir la rapidité
        args.push('-c:v', 'libx264', '-preset', 'ultrafast', '-crf', '28', '-c:a', 'aac')
      } else if (outputFormat === 'avi') {
        // Pour l'AVI, mpeg4 encodera bien plus rapidement que h264 dans la plupart des cas
        args.push('-c:v', 'mpeg4', '-qscale:v', '4', '-c:a', 'libmp3lame')
      }
      args.push('output' + format.ext)

      await ffmpeg.exec(args)
      const data = await ffmpeg.readFile('output' + format.ext)
      const blob = new Blob([new Uint8Array(data as Uint8Array)], { type: format.mime })
      setResultBlob(blob)
      setResultUrl(URL.createObjectURL(blob))
      toast.success('Vidéo convertie avec succès !')
    } catch (e: any) {
      toast.error(e.message || 'Erreur lors de la conversion')
    } finally {
      setIsProcessing(false)
    }
  }

  const handleReset = () => {
    if (resultUrl) URL.revokeObjectURL(resultUrl)
    setFile(null); setResultBlob(null); setResultUrl('')
  }

  const format = OUTPUT_FORMATS.find(f => f.value === outputFormat)!

  return (
    <Card className="border-0 shadow-none bg-transparent">
      <CardHeader className="px-0 pt-0">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-pink-100 dark:bg-pink-950/30 p-2.5">
            <RefreshCw className="h-5 w-5 text-pink-500" />
          </div>
          <div>
            <CardTitle className="text-xl">Convertir Vidéo</CardTitle>
            <CardDescription>Convertissez vos vidéos entre MP4, WebM, AVI, MKV, MOV et GIF.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-0 space-y-6">
        {!file ? (
          <DropZone accept="video/*,.avi,.mkv,.flv,.wmv" onFiles={handleFiles} maxSize={500} label={t("dropVideo")} sublabel={t("videoFormatsExtended")} />
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{file.name}</Badge>
                <Badge variant="outline">{formatFileSize(file.size)}</Badge>
              </div>
              <Button variant="ghost" size="sm" onClick={handleReset}><RotateCcw className="h-4 w-4 mr-1" />Réinitialiser</Button>
            </div>

            <div className="space-y-2">
              <Label>Format de sortie</Label>
              <Select value={outputFormat} onValueChange={setOutputFormat}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {OUTPUT_FORMATS.map(f => (
                    <SelectItem key={f.value} value={f.value}>{f.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {(isProcessing || loading) && (
              <div className="space-y-2">
                <Progress value={loading ? undefined : progress} className="h-2" />
                <p className="text-xs text-muted-foreground text-center">
                  {loading ? 'Chargement du moteur vidéo…' : `Conversion en cours… ${progress}%`}
                </p>
              </div>
            )}

            <Button onClick={handleConvert} disabled={isProcessing || loading} className="w-full">
              {isProcessing ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <RefreshCw className="h-4 w-4 mr-2" />}
              {loading ? 'Chargement…' : isProcessing ? 'Conversion…' : `Convertir en ${format.label}`}
            </Button>

            {resultBlob && resultUrl && (
              <div className="space-y-3 p-4 rounded-xl bg-muted/40">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Vidéo convertie</p>
                  <div className="flex gap-2">
                    <Badge variant="outline">{format.label}</Badge>
                    <Badge variant="secondary">{formatFileSize(resultBlob.size)}</Badge>
                  </div>
                </div>
                {outputFormat === 'gif' ? (
                  <img src={resultUrl} alt="Converted GIF result" className="w-full rounded-lg max-h-[300px] object-contain" />
                ) : (
                  <video src={resultUrl} controls className="w-full rounded-lg max-h-[300px] bg-black" />
                )}
                <Button onClick={() => downloadBlob(resultBlob, `converted_${file.name.replace(/\.[^.]+$/, format.ext)}`)} className="w-full">
                  <Download className="h-4 w-4 mr-2" />Télécharger
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

