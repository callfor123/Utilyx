'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { Volume2, Download, Loader2, RotateCcw, Music } from 'lucide-react'
import { toast } from 'sonner'
import { formatFileSize, downloadBlob } from '@/lib/utils'
import { DropZone } from '@/components/layout/drop-zone'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useFFmpeg, formatDuration } from './use-ffmpeg'

export function VideoAddAudio() {
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [audioFile, setAudioFile] = useState<File | null>(null)
  const [videoUrl, setVideoUrl] = useState('')
  const [videoDuration, setVideoDuration] = useState(0)
  const [audioVolume, setAudioVolume] = useState(100)
  const [keepOriginalAudio, setKeepOriginalAudio] = useState(true)
  const [originalVolume, setOriginalVolume] = useState(50)
  const [audioUrl, setAudioUrl] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [resultBlob, setResultBlob] = useState<Blob | null>(null)
  const [resultUrl, setResultUrl] = useState('')
  const videoRef = useRef<HTMLVideoElement>(null)
  const { load, loading, progress } = useFFmpeg()

  const handleVideoFiles = useCallback((files: File[]) => {
    const video = files.find(f => f.type.startsWith('video/'))
    if (!video) { toast.error('Veuillez sélectionner une vidéo valide.'); return }
    setVideoFile(video)
    setResultBlob(null); setResultUrl('')
    const url = URL.createObjectURL(video)
    setVideoUrl(url)
  }, [])

  const handleAudioFiles = useCallback((files: File[]) => {
    const audio = files.find(f => f.type.startsWith('audio/'))
    if (!audio) { toast.error('Veuillez sélectionner un fichier audio valide.'); return }
    setAudioFile(audio)
    setAudioUrl(URL.createObjectURL(audio))
  }, [])

  useEffect(() => {
    if (!videoRef.current) return
    const el = videoRef.current
    const onMeta = () => setVideoDuration(el.duration)
    el.addEventListener('loadedmetadata', onMeta)
    return () => el.removeEventListener('loadedmetadata', onMeta)
  }, [videoUrl])

  const handleProcess = async () => {
    if (!videoFile || !audioFile) return
    setIsProcessing(true)
    try {
      const ffmpeg = await load()
      if (!ffmpeg) throw new Error('FFmpeg failed to load')
      const videoExt = videoFile.name.substring(videoFile.name.lastIndexOf('.'))
      const audioExt = audioFile.name.substring(audioFile.name.lastIndexOf('.'))
      await ffmpeg.writeFile('input_video' + videoExt, new Uint8Array(await videoFile.arrayBuffer()))
      await ffmpeg.writeFile('input_audio' + audioExt, new Uint8Array(await audioFile.arrayBuffer()))

      const audioVol = (audioVolume / 100).toFixed(2)
      const origVol = (originalVolume / 100).toFixed(2)

      if (keepOriginalAudio) {
        // Try with amix first; if video has no audio stream, fall back to just new audio
        const mixResult = await ffmpeg.exec([
          '-i', 'input_video' + videoExt, '-i', 'input_audio' + audioExt,
          '-filter_complex',
          `[0:a]volume=${origVol}[a0];[1:a]volume=${audioVol}[a1];[a0][a1]amix=inputs=2:duration=first[aout]`,
          '-map', '0:v', '-map', '[aout]',
          '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-shortest', 'output.mp4'
        ])
        if (mixResult !== 0) {
          // Fallback: video likely has no audio, just add the new audio
          await ffmpeg.exec([
            '-i', 'input_video' + videoExt, '-i', 'input_audio' + audioExt,
            '-map', '0:v', '-map', '1:a',
            '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k',
            '-filter:a', `volume=${audioVol}`,
            '-shortest', 'output.mp4'
          ])
        }
      } else {
        await ffmpeg.exec([
          '-i', 'input_video' + videoExt, '-i', 'input_audio' + audioExt,
          '-map', '0:v', '-map', '1:a',
          '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k',
          '-filter:a', `volume=${audioVol}`,
          '-shortest', 'output.mp4'
        ])
      }
      const data = await ffmpeg.readFile('output.mp4')
      const blob = new Blob([new Uint8Array(data as Uint8Array)], { type: 'video/mp4' })
      setResultBlob(blob)
      setResultUrl(URL.createObjectURL(blob))
      toast.success('Audio ajouté avec succès !')
    } catch (e: any) {
      toast.error(e.message || 'Erreur lors du traitement')
    } finally {
      setIsProcessing(false)
    }
  }

  const handleReset = () => {
    if (videoUrl) URL.revokeObjectURL(videoUrl)
    if (resultUrl) URL.revokeObjectURL(resultUrl)
    if (audioUrl) URL.revokeObjectURL(audioUrl)
    setVideoFile(null); setAudioFile(null); setVideoUrl(''); setAudioUrl('')
    setResultBlob(null); setResultUrl('')
    setAudioVolume(100); setOriginalVolume(50); setKeepOriginalAudio(true)
  }

  return (
    <Card className="border-0 shadow-none bg-transparent">
      <CardHeader className="px-0 pt-0">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-pink-100 dark:bg-pink-950/30 p-2.5">
            <Volume2 className="h-5 w-5 text-pink-500" />
          </div>
          <div>
            <CardTitle className="text-xl">Ajouter Audio à Vidéo</CardTitle>
            <CardDescription>Ajoutez une piste audio, de la musique ou une voix-off à votre vidéo.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-0 space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label className="text-sm font-medium">Vidéo</Label>
            {!videoFile ? (
              <DropZone accept="video/*" onFiles={handleVideoFiles} maxSize={500} label="Déposez votre vidéo" sublabel="MP4, WebM, AVI, MOV" className="min-h-[150px]" />
            ) : (
              <div className="p-3 rounded-lg bg-muted/40 space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs truncate max-w-[200px]">{videoFile.name}</Badge>
                  <Badge variant="outline" className="text-xs">{formatFileSize(videoFile.size)}</Badge>
                </div>
                <video ref={videoRef} src={videoUrl} controls className="w-full rounded max-h-[200px] bg-black" />
              </div>
            )}
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium">Audio</Label>
            {!audioFile ? (
              <DropZone accept="audio/*" onFiles={handleAudioFiles} maxSize={100} label="Déposez votre audio" sublabel="MP3, WAV, AAC, OGG" icon={<Music className="h-6 w-6 text-muted-foreground" />} className="min-h-[150px]" />
            ) : (
              <div className="p-3 rounded-lg bg-muted/40 space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs truncate max-w-[200px]">{audioFile.name}</Badge>
                  <Badge variant="outline" className="text-xs">{formatFileSize(audioFile.size)}</Badge>
                </div>
                <audio controls className="w-full">
                  <source src={audioUrl} />
                </audio>
              </div>
            )}
          </div>
        </div>

        {videoFile && audioFile && (
          <div className="space-y-4 p-4 rounded-xl bg-muted/30">
            <div className="space-y-2">
              <Label>Volume de l'audio ajouté : {audioVolume}%</Label>
              <Slider value={[audioVolume]} onValueChange={v => setAudioVolume(v[0])} min={0} max={200} step={5} />
            </div>

            <div className="flex items-center gap-3">
              <Switch checked={keepOriginalAudio} onCheckedChange={setKeepOriginalAudio} />
              <Label>Conserver l'audio d'origine</Label>
            </div>

            {keepOriginalAudio && (
              <div className="space-y-2">
                <Label>Volume de l'audio d'origine : {originalVolume}%</Label>
                <Slider value={[originalVolume]} onValueChange={v => setOriginalVolume(v[0])} min={0} max={200} step={5} />
              </div>
            )}
          </div>
        )}

        {(isProcessing || loading) && (
          <div className="space-y-2">
            <Progress value={loading ? undefined : progress} className="h-2" />
            <p className="text-xs text-muted-foreground text-center">
              {loading ? 'Chargement du moteur vidéo…' : `Traitement en cours… ${progress}%`}
            </p>
          </div>
        )}

        <div className="flex gap-2">
          <Button onClick={handleProcess} disabled={!videoFile || !audioFile || isProcessing || loading} className="flex-1">
            {isProcessing ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Volume2 className="h-4 w-4 mr-2" />}
            {loading ? 'Chargement…' : isProcessing ? 'Traitement…' : 'Ajouter l\'audio'}
          </Button>
          {(videoFile || audioFile) && (
            <Button variant="outline" onClick={handleReset}><RotateCcw className="h-4 w-4" /></Button>
          )}
        </div>

        {resultBlob && resultUrl && (
          <div className="space-y-3 p-4 rounded-xl bg-muted/40">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Résultat</p>
              <Badge variant="secondary">{formatFileSize(resultBlob.size)}</Badge>
            </div>
            <video src={resultUrl} controls className="w-full rounded-lg max-h-[300px] bg-black" />
            <Button onClick={() => downloadBlob(resultBlob, `audio_added_${videoFile?.name || 'video.mp4'}`)} className="w-full">
              <Download className="h-4 w-4 mr-2" />Télécharger
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
