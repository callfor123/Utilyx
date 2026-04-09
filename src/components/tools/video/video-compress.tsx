'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { FileDown, Download, Loader2, RotateCcw } from 'lucide-react'
import { toast } from 'sonner'
import { formatFileSize, downloadBlob } from '@/lib/utils'
import { DropZone } from '@/components/layout/drop-zone'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Slider } from '@/components/ui/slider'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useFFmpeg, formatDuration } from './use-ffmpeg'

const QUALITY_PRESETS = [
  { value: 'high', label: 'Haute qualité', crf: '18', description: 'Réduction légère' },
  { value: 'medium', label: 'Qualité moyenne', crf: '28', description: 'Bon compromis' },
  { value: 'low', label: 'Compression maximale', crf: '35', description: 'Fichier très léger' },
] as const

const RESOLUTION_PRESETS = [
  { value: 'original', label: 'Résolution originale' },
  { value: '1080', label: '1080p (Full HD)' },
  { value: '720', label: '720p (HD)' },
  { value: '480', label: '480p (SD)' },
  { value: '360', label: '360p (Mobile)' },
] as const

export function VideoCompress() {
  const [file, setFile] = useState<File | null>(null)
  const [videoUrl, setVideoUrl] = useState('')
  const [duration, setDuration] = useState(0)
  const [quality, setQuality] = useState('medium')
  const [resolution, setResolution] = useState('original')
  const [isProcessing, setIsProcessing] = useState(false)
  const [resultBlob, setResultBlob] = useState<Blob | null>(null)
  const [resultUrl, setResultUrl] = useState('')
  const videoRef = useRef<HTMLVideoElement>(null)
  const { load, loading, progress } = useFFmpeg()

  const handleFiles = useCallback((files: File[]) => {
    const video = files.find(f => f.type.startsWith('video/'))
    if (!video) { toast.error('Veuillez sélectionner une vidéo valide.'); return }
    setFile(video)
    setResultBlob(null); setResultUrl('')
    const url = URL.createObjectURL(video)
    setVideoUrl(url)
  }, [])

  useEffect(() => {
    if (!videoRef.current) return
    const el = videoRef.current
    const onMeta = () => setDuration(el.duration)
    el.addEventListener('loadedmetadata', onMeta)
    return () => el.removeEventListener('loadedmetadata', onMeta)
  }, [videoUrl])

  const handleCompress = async () => {
    if (!file) return
    setIsProcessing(true)
    try {
      const ffmpeg = await load()
      if (!ffmpeg) throw new Error('FFmpeg failed to load')
      const inputExt = file.name.substring(file.name.lastIndexOf('.'))
      await ffmpeg.writeFile('input' + inputExt, new Uint8Array(await file.arrayBuffer()))

      const preset = QUALITY_PRESETS.find(p => p.value === quality)!
      // Utilisez ultrafast pour la compression web (rapide mais taille légèrement sup), et scale bilinéaire
      const args: string[] = ['-i', 'input' + inputExt, '-c:v', 'libx264', '-crf', preset.crf, '-preset', 'ultrafast', '-c:a', 'aac', '-b:a', '128k']

      if (resolution !== 'original') {
        args.push('-vf', `scale=-2:${resolution}:flags=fast_bilinear`)
      }

      args.push('output.mp4')
      await ffmpeg.exec(args)
      const data = await ffmpeg.readFile('output.mp4')
      const blob = new Blob([new Uint8Array(data as Uint8Array)], { type: 'video/mp4' })
      setResultBlob(blob)
      setResultUrl(URL.createObjectURL(blob))
      toast.success('Vidéo compressée avec succès !')
    } catch (e: any) {
      toast.error(e.message || 'Erreur lors de la compression')
    } finally {
      setIsProcessing(false)
    }
  }

  const handleReset = () => {
    if (videoUrl) URL.revokeObjectURL(videoUrl)
    if (resultUrl) URL.revokeObjectURL(resultUrl)
    setFile(null); setVideoUrl(''); setResultBlob(null); setResultUrl('')
  }

  const reduction = resultBlob && file ? Math.round((1 - resultBlob.size / file.size) * 100) : 0

  return (
    <Card className="border-0 shadow-none bg-transparent">
      <CardHeader className="px-0 pt-0">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-pink-100 dark:bg-pink-950/30 p-2.5">
            <FileDown className="h-5 w-5 text-pink-500" />
          </div>
          <div>
            <CardTitle className="text-xl">Compresser Vidéo</CardTitle>
            <CardDescription>Réduisez la taille de vos vidéos sans perte visible de qualité.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-0 space-y-6">
        {!file ? (
          <DropZone accept="video/*" onFiles={handleFiles} maxSize={500} label="Glissez-déposez votre vidéo ici" sublabel="MP4, WebM, AVI, MOV — max 500 MB" />
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{file.name}</Badge>
                <Badge variant="outline">{formatFileSize(file.size)}</Badge>
                {duration > 0 && <Badge variant="outline">{formatDuration(duration)}</Badge>}
              </div>
              <Button variant="ghost" size="sm" onClick={handleReset}><RotateCcw className="h-4 w-4 mr-1" />Réinitialiser</Button>
            </div>

            <video ref={videoRef} src={videoUrl} controls className="w-full rounded-lg max-h-[350px] bg-black" />

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Qualité</Label>
                <Select value={quality} onValueChange={setQuality}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {QUALITY_PRESETS.map(p => (
                      <SelectItem key={p.value} value={p.value}>
                        {p.label} — {p.description}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Résolution</Label>
                <Select value={resolution} onValueChange={setResolution}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {RESOLUTION_PRESETS.map(r => (
                      <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {(isProcessing || loading) && (
              <div className="space-y-2">
                <Progress value={loading ? undefined : progress} className="h-2" />
                <p className="text-xs text-muted-foreground text-center">
                  {loading ? 'Chargement du moteur vidéo…' : `Compression en cours… ${progress}%`}
                </p>
              </div>
            )}

            <Button onClick={handleCompress} disabled={isProcessing || loading} className="w-full">
              {isProcessing ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <FileDown className="h-4 w-4 mr-2" />}
              {loading ? 'Chargement…' : isProcessing ? 'Compression…' : 'Compresser la vidéo'}
            </Button>

            {resultBlob && resultUrl && (
              <div className="space-y-3 p-4 rounded-xl bg-muted/40">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Vidéo compressée</p>
                  <div className="flex gap-2">
                    <Badge variant="secondary">{formatFileSize(resultBlob.size)}</Badge>
                    {reduction > 0 && <Badge className="bg-green-500/10 text-green-600">-{reduction}%</Badge>}
                  </div>
                </div>
                <video src={resultUrl} controls className="w-full rounded-lg max-h-[300px] bg-black" />
                <Button onClick={() => downloadBlob(resultBlob, `compressed_${file.name}`)} className="w-full">
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
