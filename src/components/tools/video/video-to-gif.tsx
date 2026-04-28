'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { Film, Download, Loader2, RotateCcw } from 'lucide-react'
import { toast } from 'sonner'
import { formatFileSize, downloadBlob } from '@/lib/utils'
import { DropZone } from '@/components/layout/drop-zone'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { useFFmpeg, formatDuration, parseTimeToSeconds } from './use-ffmpeg'

const GIF_SIZES = [
  { value: '320', label: '320px (Petit)' },
  { value: '480', label: '480px (Moyen)' },
  { value: '640', label: '640px (Grand)' },
  { value: '800', label: '800px (Très grand)' },
] as const

export function VideoToGif() {
  const [file, setFile] = useState<File | null>(null)
  const [videoUrl, setVideoUrl] = useState('')
  const [duration, setDuration] = useState(0)
  const [startTime, setStartTime] = useState('0:00')
  const [gifDuration, setGifDuration] = useState(5)
  const [fps, setFps] = useState(15)
  const [width, setWidth] = useState('480')
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

  const handleConvert = async () => {
    if (!file) return
    setIsProcessing(true)
    try {
      const ffmpeg = await load()
      if (!ffmpeg) throw new Error('FFmpeg failed to load')
      const inputExt = file.name.substring(file.name.lastIndexOf('.'))
      await ffmpeg.writeFile('input' + inputExt, new Uint8Array(await file.arrayBuffer()))

      const start = parseTimeToSeconds(startTime)
      await ffmpeg.exec([
        '-i', 'input' + inputExt,
        '-ss', String(start),
        '-t', String(gifDuration),
        // fast_bilinear is much faster than lanczos, bayer dither is fast but text/palette could be simplified
        '-vf', `fps=${fps},scale=${width}:-1:flags=fast_bilinear,split[s0][s1];[s0]palettegen=max_colors=128[p];[s1][p]paletteuse=dither=bayer`,
        '-loop', '0',
        'output.gif',
      ])
      const data = await ffmpeg.readFile('output.gif')
      const blob = new Blob([new Uint8Array(data as Uint8Array)], { type: 'image/gif' })
      setResultBlob(blob)
      setResultUrl(URL.createObjectURL(blob))
      toast.success('GIF créé avec succès !')
    } catch (e: any) {
      toast.error(e.message || 'Erreur lors de la création du GIF')
    } finally {
      setIsProcessing(false)
    }
  }

  const handleReset = () => {
    if (videoUrl) URL.revokeObjectURL(videoUrl)
    if (resultUrl) URL.revokeObjectURL(resultUrl)
    setFile(null); setVideoUrl(''); setResultBlob(null); setResultUrl('')
    setStartTime('0:00'); setGifDuration(5)
  }

  return (
    <Card className="border-0 shadow-none bg-transparent">
      <CardHeader className="px-0 pt-0">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-pink-100 dark:bg-pink-950/30 p-2.5">
            <Film className="h-5 w-5 text-pink-500" />
          </div>
          <div>
            <CardTitle className="text-xl">Vidéo vers GIF</CardTitle>
            <CardDescription>Créez des GIF animés à partir de vos vidéos avec contrôle total.</CardDescription>
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
                <Label>Début (m:ss)</Label>
                <Input value={startTime} onChange={e => setStartTime(e.target.value)} placeholder="0:00" />
              </div>
              <div className="space-y-2">
                <Label>Durée du GIF : {gifDuration}s</Label>
                <Slider value={[gifDuration]} onValueChange={v => setGifDuration(v[0])} min={1} max={30} step={1} />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Largeur</Label>
                <Select value={width} onValueChange={setWidth}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {GIF_SIZES.map(s => (
                      <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>FPS : {fps}</Label>
                <Slider value={[fps]} onValueChange={v => setFps(v[0])} min={5} max={30} step={1} />
              </div>
            </div>

            {(isProcessing || loading) && (
              <div className="space-y-2">
                <Progress value={loading ? undefined : progress} className="h-2" />
                <p className="text-xs text-muted-foreground text-center">
                  {loading ? 'Chargement du moteur vidéo…' : `Création du GIF… ${progress}%`}
                </p>
              </div>
            )}

            <Button onClick={handleConvert} disabled={isProcessing || loading} className="w-full">
              {isProcessing ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Film className="h-4 w-4 mr-2" />}
              {loading ? 'Chargement…' : isProcessing ? 'Création…' : 'Créer le GIF'}
            </Button>

            {resultBlob && resultUrl && (
              <div className="space-y-3 p-4 rounded-xl bg-muted/40">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">GIF créé</p>
                  <Badge variant="secondary">{formatFileSize(resultBlob.size)}</Badge>
                </div>
                <img src={resultUrl} alt="Generated GIF result" className="w-full rounded-lg max-h-[300px] object-contain bg-black" />
                <Button onClick={() => downloadBlob(resultBlob, `${file.name.replace(/\.[^.]+$/, '')}.gif`)} className="w-full">
                  <Download className="h-4 w-4 mr-2" />Télécharger le GIF
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

