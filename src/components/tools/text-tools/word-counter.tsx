'use client'

import { useState, useMemo } from 'react'
import { Hash, Copy, RotateCcw, BookOpen, Clock, Type, AlignLeft, MessageSquare } from 'lucide-react'
import { toast } from 'sonner'
import { copyToClipboard } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'

function StatCard({ icon: Icon, label, value, color }: { icon: React.ElementType; label: string; value: number | string; color: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border bg-muted/30 p-3">
      <div className={`rounded-lg p-2 ${color}`}>
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <p className="text-xl font-bold">{value}</p>
        <p className="text-xs text-muted-foreground">{label}</p>
      </div>
    </div>
  )
}

export function WordCounter() {
  const [text, setText] = useState('')

  const stats = useMemo(() => {
    const trimmed = text.trim()
    const words = trimmed ? trimmed.split(/\s+/).length : 0
    const characters = text.length
    const charactersNoSpaces = text.replace(/\s/g, '').length
    const sentences = trimmed ? trimmed.split(/[.!?]+/).filter(s => s.trim().length > 0).length : 0
    const paragraphs = trimmed ? trimmed.split(/\n\s*\n/).filter(p => p.trim().length > 0).length : 0
    const lines = trimmed ? trimmed.split('\n').length : 0
    const readingTimeMin = Math.max(1, Math.ceil(words / 200))
    const speakingTimeMin = Math.max(1, Math.ceil(words / 130))
    return { words, characters, charactersNoSpaces, sentences, paragraphs, lines, readingTimeMin, speakingTimeMin }
  }, [text])

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Hash className="h-5 w-5" />
            Compteur de Mots
          </CardTitle>
          <CardDescription>
            Comptez les mots, caractères, phrases et paragraphes en temps réel.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Textarea
            placeholder="Collez ou tapez votre texte ici..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-[200px] text-base resize-y"
          />

          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => { setText(''); toast.success('Texte effacé') }}
            >
              <RotateCcw className="h-4 w-4 mr-1.5" />
              Effacer
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => { copyToClipboard(text); toast.success('Copié dans le presse-papiers') }}
              disabled={!text}
            >
              <Copy className="h-4 w-4 mr-1.5" />
              Copier
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard icon={Type} label="Mots" value={stats.words} color="bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" />
        <StatCard icon={AlignLeft} label="Caractères" value={stats.characters} color="bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400" />
        <StatCard icon={MessageSquare} label="Phrases" value={stats.sentences} color="bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400" />
        <StatCard icon={BookOpen} label="Paragraphes" value={stats.paragraphs} color="bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400" />
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{stats.charactersNoSpaces}</p>
              <p className="text-xs text-muted-foreground">Caractères (sans espaces)</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{stats.lines}</p>
              <p className="text-xs text-muted-foreground">Lignes</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{stats.readingTimeMin}</p>
              <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                <BookOpen className="h-3 w-3" /> min. de lecture
              </p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{stats.speakingTimeMin}</p>
              <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                <Clock className="h-3 w-3" /> min. de parole
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
