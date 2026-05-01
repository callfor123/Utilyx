'use client'

import { useTranslations } from 'next-intl'

import { useState, useCallback, useRef, useEffect } from 'react'
import { Scissors, Download, Loader2, RotateCcw, Play, Pause, Clock } from 'lucide-react'
import { toast } from 'sonner'
import { cn, formatFileSize, downloadBlob } from '@/lib/utils'
import { DropZone } from '@/components/layout/drop-zone'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Slider } from '@/components/ui/slider'
import { useFFmpeg, formatDuration, parseTimeToSeconds } from './use-ffmpeg'

export function VideoTrim() {
  const t = useTranslations('ToolsUI')
  const [file, setFile] = useState<File | null>(null)
  const [videoUrl, setVideoUrl] = useState('')
  const [duration, setDuration] = useState(0)
  const [startTime, setStartTime] = useState('0:00')
  const [endTime, setEndTime] = useState('0:00')
  const [isProcessing, setIsProcessing] = useState(false)
  const [resultBlob, setResultBlob] = useState<Blob | null>(null)
  const [resultUrl, setResultUrl] = useState('')
  const videoRef = useRef<HTMLVideoElement>(null)
  const { load, loading, progress } = useFFmpeg()

  const handleFiles = useCallback((files: File[]) => {
    const video = files.find(f => f.type.startsWith('video/'))
    if (!video) { toast.error('Veuillez sélectionner une vidéo valide.'); return }
    setFile(video)
    setResultBlob(null)
    setResultUrl('')
    const url = URL.createObjectURL(video)
    setVideoUrl(url)
  }, [])

  useEffect(() => {
    if (!videoRef.current) return
    const el = videoRef.current
    const onMeta = () => {
      setDuration(el.duration)
      setEndTime(formatDuration(el.duration))
    }
    el.addEventListener('loadedmetadata', onMeta)
    return () => el.removeEventListener('loadedmetadata', onMeta)
  }, [videoUrl])

  const handleTrim = async () => {
    if (!file) return
    const start = parseTimeToSeconds(startTime)
    const end = parseTimeToSeconds(endTime)

    if (start < 0 || end <= 0 || end <= start) {
      toast.error('Les heures de début et de fin doivent être valides et la fin doit être après le début.')
      return
    }

    const trimmedEnd = duration > 0 && end > duration ? duration : end
    const length = trimmedEnd - start
    if (length <= 0) {
      toast.error('La durée de découpage doit être supérieure à zéro.')
      return
    }

    setIsProcessing(true)
    try {
      const ffmpeg = await load()
      if (!ffmpeg) throw new Error('FFmpeg failed to load')
      const inputName = 'input' + file.name.substring(file.name.lastIndexOf('.'))
      const outputName = 'output.mp4'
      await ffmpeg.writeFile(inputName, new Uint8Array(await file.arrayBuffer()))
      // Stream copy: no re-encoding, nearly instant
      await ffmpeg.exec([
        '-ss', String(start),
        '-i', inputName,
        '-t', String(length),
        '-map', '0',
        '-c', 'copy',
        '-avoid_negative_ts', 'make_zero',
        outputName,
      ])
      const data = await ffmpeg.readFile(outputName)
      const blob = new Blob([new Uint8Array(data as Uint8Array)], { type: 'video/mp4' })
      setResultBlob(blob)
      setResultUrl(URL.createObjectURL(blob))
      toast.success('Vidéo découpée avec succès !')
    } catch (e: any) {
      console.error('VideoTrim error', e)
      toast.error(e?.message || 'Erreur lors du découpage')
    } finally {
      setIsProcessing(false)
    }
  }

  const handleReset = () => {
    if (videoUrl) URL.revokeObjectURL(videoUrl)
    if (resultUrl) URL.revokeObjectURL(resultUrl)
    setFile(null); setVideoUrl(''); setResultBlob(null); setResultUrl('')
    setStartTime('0:00'); setEndTime('0:00'); setDuration(0)
  }

  return (
    <Card className="border-0 shadow-none bg-transparent">
      <CardHeader className="px-0 pt-0">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-pink-100 dark:bg-pink-950/30 p-2.5">
            <Scissors className="h-5 w-5 text-pink-500" />
          </div>
          <div>
            <CardTitle className="text-xl">Découper Vidéo</CardTitle>
            <CardDescription>Coupez et extrayez des portions de vos vidéos. 100% dans le navigateur.</CardDescription>
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
                {duration > 0 && <Badge variant="outline">{formatDuration(duration)}</Badge>}
              </div>
              <Button variant="ghost" size="sm" onClick={handleReset}><RotateCcw className="h-4 w-4 mr-1" />Réinitialiser</Button>
            </div>

            <video ref={videoRef} src={videoUrl} controls className="w-full rounded-lg max-h-[400px] bg-black" />

            <div className="bg-muted/40 p-5 rounded-xl border space-y-8 relative overflow-hidden">
              {duration > 0 && (
                <div className="px-2 pt-2">
                  <Slider 
                    value={[parseTimeToSeconds(startTime), parseTimeToSeconds(endTime) > 0 ? parseTimeToSeconds(endTime) : duration]} 
                    min={0} 
                    max={Math.floor(duration)} 
                    step={1}
                    onValueChange={(val) => {
                      setStartTime(formatDuration(val[0]))
                      setEndTime(formatDuration(val[1]))
                    }}
                    className="w-full"
                  />
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-border text-muted-foreground z-10">
                  <Scissors className="w-4 h-4" />
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500">
                      <Play className="w-4 h-4" />
                    </div>
                    <Label className="text-sm font-semibold text-foreground/80 m-0">Début de découpe</Label>
                  </div>
                  <div className="space-y-1.5">
                    <div className="relative group">
                      <Input 
                        value={startTime} 
                        onChange={e => setStartTime(e.target.value)} 
                        placeholder="ex: 0:00" 
                        className="pl-10 h-12 text-lg font-mono tracking-wider transition-colors focus-visible:ring-emerald-500/50"
                      />
                      <Clock className="w-4 h-4 text-muted-foreground absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-emerald-500 transition-colors" />
                    </div>
                    <p className="text-[11px] text-muted-foreground font-medium flex items-center gap-1.5 ml-1">
                      Format: m:ss ou h:mm:ss
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 text-rose-500">
                      <Pause className="w-4 h-4" />
                    </div>
                    <Label className="text-sm font-semibold text-foreground/80 m-0">Fin de découpe</Label>
                  </div>
                  <div className="space-y-1.5">
                    <div className="relative group">
                      <Input 
                        value={endTime} 
                        onChange={e => setEndTime(e.target.value)} 
                        placeholder="ex: 1:30" 
                        className="pl-10 h-12 text-lg font-mono tracking-wider transition-colors focus-visible:ring-rose-500/50"
                      />
                      <Clock className="w-4 h-4 text-muted-foreground absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-rose-500 transition-colors" />
                    </div>
                    <p className="text-[11px] text-muted-foreground font-medium flex items-center gap-1.5 ml-1">
                      Format: m:ss ou h:mm:ss
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {(isProcessing || loading) && (
              <div className="space-y-2">
                <Progress value={loading ? undefined : progress} className="h-2" />
                <p className="text-xs text-muted-foreground text-center">
                  {loading ? 'Chargement du moteur vidéo…' : `Traitement en cours… ${progress}%`}
                </p>
              </div>
            )}

            <Button onClick={handleTrim} disabled={isProcessing || loading} className="w-full">
              {isProcessing ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Scissors className="h-4 w-4 mr-2" />}
              {loading ? 'Chargement…' : isProcessing ? 'Découpage…' : 'Découper la vidéo'}
            </Button>

            {resultBlob && resultUrl && (
              <div className="space-y-3 p-4 rounded-xl bg-muted/40">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Vidéo découpée</p>
                  <Badge variant="secondary">{formatFileSize(resultBlob.size)}</Badge>
                </div>
                <video src={resultUrl} controls className="w-full rounded-lg max-h-[300px] bg-black" />
                <Button onClick={() => downloadBlob(resultBlob, `trimmed_${file.name}`)} className="w-full">
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
