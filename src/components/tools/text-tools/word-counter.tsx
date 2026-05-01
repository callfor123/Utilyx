'use client'

import { useState, useMemo } from 'react'
import { Hash, Copy, RotateCcw, BookOpen, Clock, Type, AlignLeft, MessageSquare, ChevronDown, ChevronUp, BarChart3 } from 'lucide-react'
import { toast } from 'sonner'
import { copyToClipboard } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { useTranslations } from 'next-intl'

const STOP_WORDS = new Set([
  'le', 'la', 'les', 'de', 'des', 'un', 'une', 'et', 'en', 'est', 'dans', 'que', 'qui', 'a', 'à', 'pour',
  'ne', 'pas', 'sur', 'se', 'ce', 'il', 'elle', 'du', 'au', 'aux', 'par', 'ou', 'où', 'son', 'sa', 'ses',
  'ont', 'ai', 'as', 'avons', 'avez', 'ont', 'sont', 'été', 'être', 'avoir', 'avec', 'tout', 'tous',
  'cette', 'ces', 'mais', 'si', 'leur', 'leurs', 'nous', 'vous', 'ils', 'elles', 'mon', 'ma', 'mes',
  'ton', 'ta', 'tes', 'on', 'y', 'plus', 'très', 'aussi', 'bien', 'fait', 'peut', 'comme',
  'the', 'a', 'an', 'is', 'are', 'was', 'were', 'in', 'on', 'at', 'to', 'for', 'of', 'and', 'or',
  'but', 'not', 'with', 'it', 'this', 'that', 'from', 'by', 'as', 'be', 'has', 'have', 'had',
  'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'can', 'shall',
  'its', 'my', 'your', 'his', 'her', 'our', 'their', 'we', 'they', 'he', 'she', 'me', 'him',
  'us', 'them', 'i', 'you', 'am', 'been', 'being', 'no', 'so', 'if', 'than', 'then', 'there',
  'what', 'when', 'where', 'which', 'who', 'whom', 'how', 'all', 'each', 'every', 'both', 'few',
  'more', 'most', 'other', 'some', 'such', 'only', 'own', 'same', 'about', 'up', 'out', 'into',
  'just', 'over', 'after', 'before', 'between', 'under', 'again', 'once', 'here', 'why', 'while',
])

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
  const [densityExpanded, setDensityExpanded] = useState(true)

  const stats = useMemo(() => {
    const trimmed = text.trim()
    const words = trimmed ? trimmed.split(/\s+/) : []
    const wordCount = words.length
    const characters = text.length
    const charactersNoSpaces = text.replace(/\s/g, '').length
    const sentences = trimmed ? trimmed.split(/[.!?]+/).filter(s => s.trim().length > 0).length : 0
    const paragraphs = trimmed ? trimmed.split(/\n\s*\n/).filter(p => p.trim().length > 0).length : 0
    const lines = trimmed ? trimmed.split('\n').length : 0
    const readingTimeMin = Math.max(1, Math.ceil(wordCount / 200))
    const speakingTimeMin = Math.max(1, Math.ceil(wordCount / 130))
    return { words: wordCount, characters, charactersNoSpaces, sentences, paragraphs, lines, readingTimeMin, speakingTimeMin }
  }, [text])

  const keywordDensity = useMemo(() => {
  const t = useTranslations('ToolsUI')
    if (stats.words === 0) return []

    const wordCounts = new Map<string, number>()
    const words = text.trim().split(/\s+/)

    for (const word of words) {
      const cleaned = word.toLowerCase().replace(/[^a-zA-ZÀ-ÿ0-9'-]/g, '')
      if (cleaned.length < 2 || STOP_WORDS.has(cleaned)) continue
      wordCounts.set(cleaned, (wordCounts.get(cleaned) || 0) + 1)
    }

    return Array.from(wordCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([word, count]) => ({
        word,
        count,
        percentage: ((count / stats.words) * 100).toFixed(1),
      }))
  }, [text, stats.words])

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Hash className="h-5 w-5" />
            {t('wordCounter')}
          </CardTitle>
          <CardDescription>{t('wordCounterDesc')}</CardDescription>
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

      {/* Keyword Density Section */}
      <Card>
        <CardHeader
          className="cursor-pointer select-none"
          onClick={() => setDensityExpanded(!densityExpanded)}
        >
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-base">
              <BarChart3 className="h-5 w-5" />
              Densité des mots-clés
            </CardTitle>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              {densityExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </div>
          <CardDescription>
            Top 10 des mots les plus utilisés (hors mots courants)
          </CardDescription>
        </CardHeader>
        {densityExpanded && (
          <CardContent>
            {stats.words === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                Commencez à taper pour voir la densité des mots-clés
              </p>
            ) : keywordDensity.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                Pas assez de contenu pour analyser la densité
              </p>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {keywordDensity.map(({ word, count, percentage }) => (
                  <div key={word} className="space-y-1.5">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{word}</span>
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <span className="text-xs">{count} occurrence{count > 1 ? 's' : ''}</span>
                        <span className="text-xs font-medium text-primary w-12 text-right">{percentage}%</span>
                      </div>
                    </div>
                    <div className="h-2 rounded-full bg-muted/60 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-primary/70 transition-all duration-500"
                        style={{ width: `${Math.min(Number(percentage) * 3, 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        )}
      </Card>
    </div>
  )
}
