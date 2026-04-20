'use client'

import React, { useState, useRef, useCallback } from 'react'

export default function Stopwatch() {
  const [time, setTime] = useState(0)
  const [running, setRunning] = useState(false)
  const [laps, setLaps] = useState<number[]>([])
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const startTimeRef = useRef<number>(0)

  const start = useCallback(() => {
    if (running) return
    startTimeRef.current = Date.now() - time
    setRunning(true)
    intervalRef.current = setInterval(() => {
      setTime(Date.now() - startTimeRef.current)
    }, 10)
  }, [running, time])

  const stop = useCallback(() => {
    if (!running) return
    setRunning(false)
    if (intervalRef.current) clearInterval(intervalRef.current)
  }, [running])

  const reset = useCallback(() => {
    setRunning(false)
    setTime(0)
    setLaps([])
    if (intervalRef.current) clearInterval(intervalRef.current)
  }, [])

  const lap = useCallback(() => {
    if (running) setLaps(prev => [time, ...prev])
  }, [running, time])

  const formatTime = (ms: number) => {
    const mins = Math.floor(ms / 60000)
    const secs = Math.floor((ms % 60000) / 1000)
    const centis = Math.floor((ms % 1000) / 10)
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}.${String(centis).padStart(2, '0')}`
  }

  return (
    <div className="space-y-6 text-center">
      <div className="text-6xl font-mono font-bold tabular-nums">{formatTime(time)}</div>
      <div className="flex justify-center gap-3">
        {!running ? (
          <button onClick={start} className="px-6 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90">
            {time > 0 ? 'Reprendre' : 'Démarrer'}
          </button>
        ) : (
          <button onClick={stop} className="px-6 py-2 rounded-md bg-destructive text-destructive-foreground hover:bg-destructive/90">
            Pause
          </button>
        )}
        {running && (
          <button onClick={lap} className="px-6 py-2 rounded-md border hover:bg-muted">
            Tour
          </button>
        )}
        {time > 0 && !running && (
          <button onClick={reset} className="px-6 py-2 rounded-md border hover:bg-muted">
            Réinitialiser
          </button>
        )}
      </div>
      {laps.length > 0 && (
        <div className="max-h-48 overflow-y-auto border rounded-lg">
          {laps.map((l, i) => (
            <div key={i} className="flex justify-between px-4 py-2 border-b last:border-0 text-sm font-mono">
              <span>Tour {laps.length - i}</span>
              <span>{formatTime(l)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
