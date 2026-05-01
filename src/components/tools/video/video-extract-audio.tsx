'use client'

import { useTranslations } from 'next-intl'

import { useState, useCallback } from 'react'
import { Music, Download, Loader2, RotateCcw } from 'lucide-react'
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

const AUDIO_FORMATS = [
  { value: 'mp3', label: 'MP3', ext: '.mp3', mime: 'audio/mpeg' },
  { value: 'wav', label: 'WAV', ext: '.wav', mime: 'audio/wav' },
  { value: 'aac', label: 'AAC', ext: '.aac', mime: 'audio/aac' },
  { value: 'ogg', label: 'OGG Vorbis', ext: '.ogg', mime: 'audio/ogg' },
  { value: 'flac', label: 'FLAC (sans perte)', ext: '.flac', mime: 'audio/flac' },
] as const

const BITRATE_OPTIONS = [
  { value: '128k', label: '128 kbps (Standard)' },
  { value: '192k', label: '192 kbps (Haute qualité)' },
  { value: '256k', label: '256 kbps (Très haute qualité)' },
  { value: '320k', label: '320 kbps (Maximum)' },
] as const

export function VideoExtractAudio() {
  const t = useTranslations('ToolsUI')
  const [file, setFile] = useState<File | null>(null)
  const [audioFormat, setAudioFormat] = useState('mp3')
  const [bitrate, setBitrate] = useState('192k')
  const [isProcessing, setIsProcessing] = useState(false)
  const [resultBlob, setResultBlob] = useState<Blob | null>(null)
  const [resultUrl, setResultUrl] = useState('')
  const { load, loading, progress } = useFFmpeg()

  const handleFiles = useCallback((files: File[]) => {
    const video = files.find(f => f.type.startsWith('video/'))
    if (!video) { toast.error('Veuillez sélectionner une vidéo valide.'); return }
    setFile(video)
    setResultBlob(null)
  }, [])

  const handleExtract = async () => {
    if (!file) return
    setIsProcessing(true)
    try {
      const ffmpeg = await load()
      if (!ffmpeg) throw new Error('FFmpeg failed to load')
      const inputExt = file.name.substring(file.name.lastIndexOf('.'))
      const format = AUDIO_FORMATS.find(f => f.value === audioFormat)!
      await ffmpeg.writeFile('input' + inputExt, new Uint8Array(await file.arrayBuffer()))

      const args: string[] = ['-i', 'input' + inputExt, '-vn', '-threads', '4']
      if (audioFormat === 'mp3') {
        args.push('-c:a', 'libmp3lame', '-b:a', bitrate)
      } else if (audioFormat === 'wav') {
        args.push('-c:a', 'pcm_s16le')
      } else if (audioFormat === 'aac') {
        args.push('-c:a', 'aac', '-b:a', bitrate)
      } else if (audioFormat === 'ogg') {
        args.push('-c:a', 'libvorbis', '-b:a', bitrate)
      } else if (audioFormat === 'flac') {
        args.push('-c:a', 'flac')
      }
      args.push('output' + format.ext)

      await ffmpeg.exec(args)
      const data = await ffmpeg.readFile('output' + format.ext)
      const blob = new Blob([new Uint8Array(data as Uint8Array)], { type: format.mime })
      setResultBlob(blob)
      setResultUrl(URL.createObjectURL(blob))
      toast.success('Audio extrait avec succès !')
    } catch (e: any) {
      toast.error(e.message || 'Erreur lors de l\'extraction')
    } finally {
      setIsProcessing(false)
    }
  }

  const handleReset = () => {
    if (resultUrl) URL.revokeObjectURL(resultUrl)
    setFile(null); setResultBlob(null); setResultUrl('')
  }

  const format = AUDIO_FORMATS.find(f => f.value === audioFormat)!

  return (
    <Card className="border-0 shadow-none bg-transparent">
      <CardHeader className="px-0 pt-0">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-pink-100 dark:bg-pink-950/30 p-2.5">
            <Music className="h-5 w-5 text-pink-500" />
          </div>
          <div>
            <CardTitle className="text-xl">Extraire Audio de Vidéo</CardTitle>
            <CardDescription>Extrayez la piste audio de n'importe quelle vidéo en MP3, WAV, AAC, OGG ou FLAC.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-0 space-y-6">
        {!file ? (
          <DropZone accept="video/*" onFiles={handleFiles} maxSize={500} label={t("dropVideo")} sublabel={t("videoFormats")} />
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{file.name}</Badge>
                <Badge variant="outline">{formatFileSize(file.size)}</Badge>
              </div>
              <Button variant="ghost" size="sm" onClick={handleReset}><RotateCcw className="h-4 w-4 mr-1" />Réinitialiser</Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Format audio</Label>
                <Select value={audioFormat} onValueChange={setAudioFormat}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {AUDIO_FORMATS.map(f => (
                      <SelectItem key={f.value} value={f.value}>{f.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {audioFormat !== 'wav' && audioFormat !== 'flac' && (
                <div className="space-y-2">
                  <Label>Débit (Bitrate)</Label>
                  <Select value={bitrate} onValueChange={setBitrate}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {BITRATE_OPTIONS.map(b => (
                        <SelectItem key={b.value} value={b.value}>{b.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            {(isProcessing || loading) && (
              <div className="space-y-2">
                <Progress value={loading ? undefined : progress} className="h-2" />
                <p className="text-xs text-muted-foreground text-center">
                  {loading ? 'Chargement du moteur vidéo…' : `Extraction en cours… ${progress}%`}
                </p>
              </div>
            )}

            <Button onClick={handleExtract} disabled={isProcessing || loading} className="w-full">
              {isProcessing ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Music className="h-4 w-4 mr-2" />}
              {loading ? 'Chargement…' : isProcessing ? 'Extraction…' : `Extraire en ${format.label}`}
            </Button>

            {resultBlob && (
              <div className="space-y-3 p-4 rounded-xl bg-muted/40">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Audio extrait</p>
                  <div className="flex gap-2">
                    <Badge variant="outline">{format.label}</Badge>
                    <Badge variant="secondary">{formatFileSize(resultBlob.size)}</Badge>
                  </div>
                </div>
                <audio controls className="w-full">
                  <source src={resultUrl} type={format.mime} />
                </audio>
                <Button onClick={() => downloadBlob(resultBlob, `${file.name.replace(/\.[^.]+$/, '')}${format.ext}`)} className="w-full">
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
