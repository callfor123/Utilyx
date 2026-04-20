'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'

type Phase = 'work' | 'shortBreak' | 'longBreak'

const PHASE_LABELS: Record<Phase, string> = {
  work: 'Travail',
  shortBreak: 'Pause courte',
  longBreak: 'Pause longue',
}

const PHASE_DURATIONS: Record<Phase, number> = {
  work: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60,
}

export default function PomodoroTimer() {
  const [phase, setPhase] = useState<Phase>('work')
  const [timeLeft, setTimeLeft] = useState(PHASE_DURATIONS.work)
  const [running, setRunning] = useState(false)
  const [sessions, setSessions] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (!running) {
      if (intervalRef.current) clearInterval(intervalRef.current)
      return
    }
    intervalRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setRunning(false)
          if (phase === 'work') {
            setSessions(s => s + 1)
          }
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [running, phase])

  const start = useCallback(() => setRunning(true), [])
  const pause = useCallback(() => setRunning(false), [])

  const reset = useCallback(() => {
    setRunning(false)
    setTimeLeft(PHASE_DURATIONS[phase])
  }, [phase])

  const switchPhase = useCallback((newPhase: Phase) => {
    setPhase(newPhase)
    setTimeLeft(PHASE_DURATIONS[newPhase])
    setRunning(false)
  }, [])

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60
  const progress = 1 - timeLeft / PHASE_DURATIONS[phase]

  return (
    <div className="space-y-6 text-center">
      <h2 className="text-xl font-semibold">{PHASE_LABELS[phase]}</h2>
      <div className="text-6xl font-mono font-bold tabular-nums">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>
      <div className="w-full bg-muted rounded-full h-2">
        <div className="bg-primary rounded-full h-2 transition-all" style={{ width: `${progress * 100}%` }} />
      </div>
      <div className="flex justify-center gap-3">
        {!running ? (
          <button onClick={start} className="px-6 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90">
            {timeLeft === PHASE_DURATIONS[phase] ? 'Démarrer' : 'Reprendre'}
          </button>
        ) : (
          <button onClick={pause} className="px-6 py-2 rounded-md bg-destructive text-destructive-foreground hover:bg-destructive/90">
            Pause
          </button>
        )}
        <button onClick={reset} className="px-6 py-2 rounded-md border hover:bg-muted">
          Réinitialiser
        </button>
      </div>
      <div className="flex justify-center gap-2">
        {(['work', 'shortBreak', 'longBreak'] as Phase[]).map(p => (
          <button
            key={p}
            onClick={() => switchPhase(p)}
            className={`px-3 py-1.5 rounded-md text-sm ${phase === p ? 'bg-primary text-primary-foreground' : 'border hover:bg-muted'}`}
          >
            {PHASE_LABELS[p]}
          </button>
        ))}
      </div>
      <p className="text-sm text-muted-foreground">Sessions complétées : {sessions}</p>
    </div>
  )
}
