'use client'

import { useState } from 'react'
import { Youtube, Download, Loader2, Link } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { downloadBlob } from '@/lib/utils'
import { useTranslations } from 'next-intl'

export function YoutubeThumbnailDownloader() {
  const [url, setUrl] = useState('')
  const [videoId, setVideoId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const t = useTranslations('ToolsUI')

  const extractVideoId = (inputUrl: string) => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = inputUrl.match(regExp);
    return (match && match[7].length === 11) ? match[7] : false;
  }

  const handleFetch = () => {
    const id = extractVideoId(url)
    if (!id) {
      toast.error("URL YouTube invalide")
      setVideoId(null)
      return
    }
    setVideoId(id)
  }

  const downloadImage = async (sizeUrl: string, name: string) => {
    setLoading(true)
    try {
      const response = await fetch(sizeUrl)
      if (!response.ok) throw new Error('Erreur réseau')
      const blob = await response.blob()
      downloadBlob(blob, `youtube-thumbnail-${name}.jpg`)
      toast.success('Miniature téléchargée avec succès')
    } catch (e: any) {
      toast.error('Impossible de télécharger cette taille. L\'image peut être soumise à des restrictions de sécurité CORS du navigateur.')
    } finally {
      setLoading(false)
    }
  }

  const thumbnails = videoId ? [
    { name: 'HD (Max Résolution)', url: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` },
    { name: 'Qualité Standard (SD)', url: `https://img.youtube.com/vi/${videoId}/sddefault.jpg` },
    { name: 'Qualité Haute (HQ)', url: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` },
    { name: 'Qualité Normale', url: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg` }
  ] : []

  return (
    <Card className="border-0 shadow-none bg-transparent">
      <CardHeader className="px-0 pt-0">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-red-100 dark:bg-red-950/30 p-2.5">
            <Youtube className="h-5 w-5 text-red-500" />
          </div>
          <div>
            <CardTitle className="text-xl">{t('youtubeThumbnail')}</CardTitle>
            <CardDescription>{t('youtubeThumbnailDesc')}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-0 space-y-6">
        <div className="flex flex-col md:flex-row items-center gap-3 max-w-2xl">
          <div className="relative w-full">
            <Input 
              value={url} 
              onChange={e => setUrl(e.target.value)} 
              placeholder="Ex: https://www.youtube.com/watch?v=..." 
              className="pl-10 h-12"
            />
            <Link className="h-4 w-4 text-muted-foreground absolute left-3 top-4" />
          </div>
          <Button onClick={handleFetch} className="w-full md:w-auto h-12" disabled={!url || loading}>
            Extraire la miniature
          </Button>
        </div>

        {videoId && (
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
             {thumbnails.map((thumb) => (
                <Card key={thumb.name} className="overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="aspect-video relative bg-muted flex items-center justify-center overflow-hidden">
                    <img 
                       src={thumb.url} 
                       alt={thumb.name} 
                       loading="lazy" 
                       className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <CardContent className="p-4 flex items-center justify-between">
                     <span className="font-medium text-sm text-foreground/80">{thumb.name}</span>
                     <Button variant="outline" size="sm" onClick={() => downloadImage(thumb.url, thumb.name.toLowerCase().replace(/[^a-z0-9]/g, ''))}>
                        <Download className="w-4 h-4 mr-2" /> DDL
                     </Button>
                  </CardContent>
                </Card>
             ))}
           </div>
        )}
      </CardContent>
    </Card>
  )
}