'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { Volume1, Download, Loader2, RotateCcw, VolumeX } from 'lucide-react'
import { toast } from 'sonner'
import { formatFileSize, downloadBlob } from '@/lib/utils'
import { DropZone } from '@/components/layout/drop-zone'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Switch } from '@/components/ui/switch'
import { useFFmpeg } from './use-ffmpeg'

export function VideoRemoveAudio() {
  const [file, setFile] = useState<File | null>(null)
  const [videoUrl, setVideoUrl] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [resultBlob, setResultBlob] = useState<Blob | null>(null)
  const [resultUrl, setResultUrl] = useState('')
  const { load, loading, progress } = useFFmpeg()

  const handleFiles = useCallback((files: File[]) => {
    const video = files.find(f => f.type.startsWith('video/'))
    if (!video) { toast.error('Veuillez sélectionner une vidéo valide.'); return }
    setFile(video)
    setResultBlob(null); setResultUrl('')
    setVideoUrl(URL.createObjectURL(video))
  }, [])

  const handleProcess = async () => {
    if (!file) return
    setIsProcessing(true)
    try {
      const ffmpeg = await load()
      if (!ffmpeg) throw new Error('FFmpeg failed to load')
      const inputExt = file.name.substring(file.name.lastIndexOf('.'))
      await ffmpeg.writeFile('input' + inputExt, new Uint8Array(await file.arrayBuffer()))
      await ffmpeg.exec(['-i', 'input' + inputExt, '-an', '-c:v', 'copy', 'output.mp4'])
      const data = await ffmpeg.readFile('output.mp4')
      const blob = new Blob([new Uint8Array(data as Uint8Array)], { type: 'video/mp4' })
      setResultBlob(blob)
      setResultUrl(URL.createObjectURL(blob))
      toast.success('Audio supprimé avec succès !')
    } catch (e: any) {
      toast.error(e.message || 'Erreur lors du traitement')
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
            <VolumeX className="h-5 w-5 text-pink-500" />
          </div>
          <div>
            <CardTitle className="text-xl">Supprimer Audio de Vidéo</CardTitle>
            <CardDescription>Retirez la piste audio de votre vidéo pour obtenir une vidéo muette.</CardDescription>
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
              </div>
              <Button variant="ghost" size="sm" onClick={handleReset}><RotateCcw className="h-4 w-4 mr-1" />Réinitialiser</Button>
            </div>

            <video src={videoUrl} controls className="w-full rounded-lg max-h-[350px] bg-black" />

            {(isProcessing || loading) && (
              <div className="space-y-2">
                <Progress value={loading ? undefined : progress} className="h-2" />
                <p className="text-xs text-muted-foreground text-center">
                  {loading ? 'Chargement du moteur vidéo…' : `Traitement en cours… ${progress}%`}
                </p>
              </div>
            )}

            <Button onClick={handleProcess} disabled={isProcessing || loading} className="w-full">
              {isProcessing ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <VolumeX className="h-4 w-4 mr-2" />}
              {loading ? 'Chargement…' : isProcessing ? 'Traitement…' : 'Supprimer l\'audio'}
            </Button>

            {resultBlob && resultUrl && (
              <div className="space-y-3 p-4 rounded-xl bg-muted/40">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Vidéo sans audio</p>
                  <div className="flex gap-2">
                    <Badge variant="secondary">{formatFileSize(resultBlob.size)}</Badge>
                    {reduction > 0 && <Badge className="bg-green-500/10 text-green-600">-{reduction}%</Badge>}
                  </div>
                </div>
                <video src={resultUrl} controls className="w-full rounded-lg max-h-[300px] bg-black" />
                <Button onClick={() => downloadBlob(resultBlob, `muted_${file.name}`)} className="w-full">
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
