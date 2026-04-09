'use client'

import { useState, useRef, useCallback } from 'react'

// Instance unique pour éviter de recharger les 30MB et économiser la RAM
// On utilise `any` ici pour éviter l'import statique de @ffmpeg/ffmpeg
let ffmpeg: any = null;
let loadPromise: Promise<any> | null = null;

export function useFFmpeg() {
  const [loaded, setLoaded] = useState(false)
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [logMessages, setLogMessages] = useState<string[]>([])
  
  const ffmpegRef = useRef<any>(null)

  const load = useCallback(async () => {
    if (ffmpegRef.current && loaded) return ffmpegRef.current

    setLoading(true)
    try {
      if (!ffmpeg) {
        // IMPORT DYNAMIQUE : on ne charge le code de FFmpeg que lorsqu'on clique sur le bouton.
        // Cela empêche l'application entière d'être ralentie au premier chargement.
        const { FFmpeg } = await import('@ffmpeg/ffmpeg')
        ffmpeg = new FFmpeg()
        ffmpeg.on('progress', ({ progress }: any) => {
          setProgress(Math.round(progress * 100))
        })
        ffmpeg.on('log', ({ message }: any) => {
          setLogMessages((prev: any) => [...prev.slice(-5), message])
        })
      }

      if (!loadPromise) {
        // Core v0.12.6 is the most stable/lightweight of v0.12 series
        const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd'
        loadPromise = ffmpeg.load({
          coreURL: `${baseURL}/ffmpeg-core.js`,
          wasmURL: `${baseURL}/ffmpeg-core.wasm`,
        }).then(() => ffmpeg)
      }
      
      const loadedFFmpeg = await loadPromise
      ffmpegRef.current = loadedFFmpeg
      setLoaded(true)
      return loadedFFmpeg
    } catch (e) {
      ffmpeg = null
      loadPromise = null
      throw e
    } finally {
      setLoading(false)
    }
  }, [loaded])

  return { load, loaded, loading, progress, logMessages }
}

export function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = Math.floor(seconds % 60)
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  return `${m}:${String(s).padStart(2, '0')}`
}

export function parseTimeToSeconds(time: string): number {
  const parts = time.split(':').map(Number)
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2]
  if (parts.length === 2) return parts[0] * 60 + parts[1]
  return parts[0] || 0
}
