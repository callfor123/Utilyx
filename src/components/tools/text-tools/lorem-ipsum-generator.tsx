'use client'

import { useState } from 'react'
import { FileText, Copy, RefreshCw } from 'lucide-react'
import { toast } from 'sonner'
import { copyToClipboard } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { useTranslations } from 'next-intl'

const LOREM_PARAGRAPHS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris.',
  'Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula ut dictum pharetra, nisi nunc fringilla magna, in commodo elit erat nec turpis. Ut pharetra augue nec augue.',
  'Nam dui ligula, fringilla a, euismod sodales, sollicitudin vel, wisi. Morbi auctor lorem non justo. Nam lacus libero, pretium at, lobortis vitae, ultricies et, tellus. Donec aliquet, tortor sed accumsan bibendum, erat ligula aliquet magna, vitae ornare odio metus a mi.',
  'Morbi ac orci et nisl hendrerit mollis. Suspendisse ut massa. Cras nec ante. Pellentesque a nulla. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aliquam tincidunt urna. Nulla ullamcorper vestibulum turpis. Pellentesque cursus luctus mauris.',
  'Nulla malesuada porttitor diam. Donec felis erat, congue non, volutpat at, tincidunt tristique, libero. Vivamus viverra fermentum felis. Donec nonummy pellentesque ante. Phasellus adipiscing semper elit. Proin fermentum massa ac quam. Sed diam turpis, molestie vitae, placerat a, molestie nec, leo.',
  'Maecenas lacinia. Nam ipsum ligula, eleifend at, accumsan nec, suscipit a, ipsum. Morbi blandit ligula feugiat magna. Nunc eleifend consequat lorem. Sed lacinia nulla vitae enim. Pellentesque tincidunt purus vel magna. Integer non enim. Praesent euismod nunc eu purus.',
  'Donec bibendum quam in tellus. Nullam cursus pulvinar lectus. Donec et mi. Nam vulputate metus eu enim. Vestibulum pellentesque felis eu massa. Quisque ullamcorper placerat ipsum. Cras nibh. Morbi vel justo vitae lacus tincidunt ultrices. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
  'In hac habitasse platea dictumst. Integer tempus convallis augue. Etiam facilisis. Nunc elementum fermentum wisi. Aenean placerat. Ut imperdiet, enim sed gravida sollicitudin, felis odio placerat quam, ac pulvinar elit purus eget enim. Nunc vitae tortor.',
  'Praesent id justo in neque elementum ultricies. Integer vitae justo. Aliquam vestibulum morbi blandit cursus risus. Nulla facilisi. Proin pellentesque, libero ut convallis tristique, est ligula ornare arcu, ac dictum erat eros non dolor. Sed et augue.',
]

function generateSentence(): string {
  const words = ['lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore', 'magna', 'aliqua']
  const len = 8 + Math.floor(Math.random() * 12)
  let sentence: string[] = []
  for (let i = 0; i < len; i++) {
    sentence.push(words[Math.floor(Math.random() * words.length)])
  }
  sentence[0] = sentence[0].charAt(0).toUpperCase() + sentence[0].slice(1)
  return sentence.join(' ') + '.'
}

export function LoremIpsumGenerator() {
  const [count, setCount] = useState(3)
  const [type, setType] = useState<'paragraphs' | 'sentences' | 'words'>('paragraphs')
  const t = useTranslations('ToolsUI')

  const output = (() => {
    const result: string[] = []
    if (type === 'paragraphs') {
      for (let i = 0; i < count; i++) {
        result.push(LOREM_PARAGRAPHS[i % LOREM_PARAGRAPHS.length])
      }
      return result.join('\n\n')
    } else if (type === 'sentences') {
      for (let i = 0; i < count; i++) {
        result.push(generateSentence())
      }
      return result.join(' ')
    } else {
      const words = LOREM_PARAGRAPHS.join(' ').split(' ')
      return words.slice(0, count).join(' ')
    }
  })()

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            {t('loremIpsum')}
          </CardTitle>
          <CardDescription>{t('loremIpsumDesc')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Type selector */}
          <div className="flex flex-wrap gap-2">
            {(['paragraphs', 'sentences', 'words'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  type === t
                    ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20'
                    : 'bg-muted/60 text-muted-foreground hover:bg-muted'
                }`}
              >
                {t === 'paragraphs' ? 'Paragraphes' : t === 'sentences' ? 'Phrases' : 'Mots'}
              </button>
            ))}
          </div>

          {/* Count slider */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>
                Nombre de {type === 'paragraphs' ? 'paragraphes' : type === 'sentences' ? 'phrases' : 'mots'}
              </Label>
              <span className="text-sm font-bold text-primary">{count}</span>
            </div>
            <Slider
              value={[count]}
              onValueChange={(val) => setCount(val[0])}
              min={1}
              max={type === 'paragraphs' ? 20 : type === 'sentences' ? 50 : 200}
              step={1}
              className="w-full"
            />
          </div>

          {/* Output */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Aperçu</Label>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => { copyToClipboard(output); toast.success('Copié !') }}
                >
                  <Copy className="h-3.5 w-3.5 mr-1" />
                  Copier
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setCount(3)
                    setType('paragraphs')
                  }}
                >
                  <RefreshCw className="h-3.5 w-3.5 mr-1" />
                  Reset
                </Button>
              </div>
            </div>
            <div className="rounded-lg border bg-muted/30 p-4 max-h-80 overflow-y-auto scrollbar-thin">
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{output}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
