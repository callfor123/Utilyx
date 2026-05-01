'use client'

import { useState, useMemo, useCallback } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { toast } from 'sonner'
import { Tags, Copy, Eye, Search, Share2 } from 'lucide-react'
import { cn, copyToClipboard } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { useTranslations } from 'next-intl'

// ── Character counter helper ──────────────────────────────────────────────
function CharCounter({ current, max }: { current: number; max: number }) {
  const ratio = current / max
  const color =
    ratio > 1
      ? 'text-red-500'
      : ratio > 0.8
        ? 'text-orange-500'
        : 'text-green-600'

  return (
    <span className={cn('text-xs font-mono', color)}>
      {current}/{max}
    </span>
  )
}

// ── Extract domain from URL ───────────────────────────────────────────────
function extractDomain(url: string): string {
  try {
    return new URL(url).hostname
  } catch {
    return url || 'example.com'
  }
}

function extractPath(url: string): string {
  try {
    const u = new URL(url)
    return u.pathname || '/'
  } catch {
    return '/'
  }
}

// ── Main component ────────────────────────────────────────────────────────
export function MetaTags() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [url, setUrl] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [siteName, setSiteName] = useState('')
  const [type, setType] = useState('website')
  const [twitterHandle, setTwitterHandle] = useState('')

  // ── Generated HTML ──────────────────────────────────────────────────────
  const htmlCode = useMemo(() => {
    const lines: string[] = []
    if (title) lines.push(`<title>${title}</title>`)
    if (description) lines.push(`<meta name="description" content="${description}" />`)
    lines.push('')

    // Open Graph
    if (title) lines.push(`<meta property="og:title" content="${title}" />`)
    if (description) lines.push(`<meta property="og:description" content="${description}" />`)
    if (url) lines.push(`<meta property="og:url" content="${url}" />`)
    if (type) lines.push(`<meta property="og:type" content="${type}" />`)
    if (imageUrl) lines.push(`<meta property="og:image" content="${imageUrl}" />`)
    if (siteName) lines.push(`<meta property="og:site_name" content="${siteName}" />`)
    lines.push('')

    // Twitter
    lines.push(`<meta name="twitter:card" content="summary_large_image" />`)
    if (twitterHandle) lines.push(`<meta name="twitter:site" content="${twitterHandle}" />`)
    if (title) lines.push(`<meta name="twitter:title" content="${title}" />`)
    if (description) lines.push(`<meta name="twitter:description" content="${description}" />`)
    if (imageUrl) lines.push(`<meta name="twitter:image" content="${imageUrl}" />`)

    return lines.join('\n')
  }, [title, description, url, imageUrl, siteName, type, twitterHandle])

  // ── Generated JSON-LD ───────────────────────────────────────────────────
  const jsonLd = useMemo(() => {
    const data: Record<string, unknown> = {
      '@context': 'https://schema.org',
      '@type': type === 'product' ? 'Product' : type === 'article' ? 'Article' : 'WebPage',
    }
    if (title) data.name = title
    if (description) data.description = description
    if (url) data.url = url
    if (imageUrl) data.image = imageUrl
    if (siteName) data.publisher = { '@type': 'Organization', name: siteName }

    return JSON.stringify(data, null, 2)
  }, [title, description, url, imageUrl, siteName, type])

  // ── Handlers ────────────────────────────────────────────────────────────
  const handleCopy = useCallback(async (text: string) => {
    await copyToClipboard(text)
    toast.success('Copié dans le presse-papiers')
  }, [])

  // ── Derived values for previews ─────────────────────────────────────────
  const domain = useMemo(() => extractDomain(url), [url])
  const path = useMemo(() => extractPath(url), [url])
  const t = useTranslations('ToolsUI')

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Tags className="h-5 w-5 text-primary" />
          <CardTitle className="text-xl">{t('metaTagsGenerator')}</CardTitle>
        </div>
        <CardDescription>{t('metaTagsDesc')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* ── Form ─────────────────────────────────────────────────────── */}
          <div className="space-y-4">
            {/* Title */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="meta-title" className="text-sm font-medium">Titre de la page</Label>
                <CharCounter current={title.length} max={60} />
              </div>
              <Input
                id="meta-title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Mon super site"
                maxLength={100}
              />
              <p className="text-[11px] text-muted-foreground">Idéal : 50-60 caractères pour Google</p>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="meta-desc" className="text-sm font-medium">Description</Label>
                <CharCounter current={description.length} max={160} />
              </div>
              <Textarea
                id="meta-desc"
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Découvrez notre site incroyable..."
                rows={3}
                maxLength={300}
              />
              <p className="text-[11px] text-muted-foreground">Idéal : 140-160 caractères pour Google</p>
            </div>

            {/* URL */}
            <div className="space-y-1.5">
              <Label htmlFor="meta-url" className="text-sm font-medium">URL de la page</Label>
              <Input
                id="meta-url"
                value={url}
                onChange={e => setUrl(e.target.value)}
                placeholder="https://www.example.com/page"
                type="url"
              />
            </div>

            {/* Image URL */}
            <div className="space-y-1.5">
              <Label htmlFor="meta-img" className="text-sm font-medium">URL de l&apos;image</Label>
              <Input
                id="meta-img"
                value={imageUrl}
                onChange={e => setImageUrl(e.target.value)}
                placeholder="https://www.example.com/image.jpg"
                type="url"
              />
            </div>

            {/* Site Name + Type row */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="meta-site" className="text-sm font-medium">Nom du site</Label>
                <Input
                  id="meta-site"
                  value={siteName}
                  onChange={e => setSiteName(e.target.value)}
                  placeholder="MonSite"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm font-medium">Type</Label>
                <Select value={type} onValueChange={setType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="website">Website</SelectItem>
                    <SelectItem value="article">Article</SelectItem>
                    <SelectItem value="product">Product</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Twitter Handle */}
            <div className="space-y-1.5">
              <Label htmlFor="meta-twitter" className="text-sm font-medium">Compte Twitter (optionnel)</Label>
              <Input
                id="meta-twitter"
                value={twitterHandle}
                onChange={e => setTwitterHandle(e.target.value)}
                placeholder="@moncompte"
              />
            </div>
          </div>

          {/* ── Previews ─────────────────────────────────────────────────── */}
          <div className="space-y-4">
            {/* Google Search Preview */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Label className="text-sm font-medium">Aperçu Google</Label>
              </div>
              <div className="rounded-lg border bg-white p-4 dark:bg-white">
                <div className="max-w-[600px]">
                  <div className="flex items-start gap-2">
                    <div className="w-7 h-7 rounded-full bg-gray-200 flex-shrink-0 mt-0.5 flex items-center justify-center text-xs font-bold text-gray-600">
                      {siteName ? siteName[0].toUpperCase() : 'E'}
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 truncate">
                        {domain}
                      </p>
                      <p className="text-lg leading-snug text-[#1a0dab] hover:underline cursor-pointer line-clamp-1">
                        {title || 'Titre de la page'}
                      </p>
                      <p className="text-sm text-[#4d5156] line-clamp-2 mt-0.5">
                        {description || 'La description de votre page apparaîtra ici. Elle est importante pour le SEO et le taux de clics.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Twitter Card Preview */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Share2 className="h-4 w-4 text-muted-foreground" />
                <Label className="text-sm font-medium">Aperçu Twitter Card</Label>
              </div>
              <div className="rounded-xl border bg-white overflow-hidden dark:bg-white max-w-[500px]">
                {imageUrl && (
                  <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                    <img
                      src={imageUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={e => {
                        (e.target as HTMLImageElement).style.display = 'none'
                      }}
                    />
                  </div>
                )}
                <div className="p-3">
                  <p className="text-xs text-gray-500">
                    {(twitterHandle || '@handle') + (siteName ? ` · ${siteName}` : '')}
                  </p>
                  <p className="text-sm font-semibold text-gray-900 mt-1 line-clamp-1">
                    {title || 'Titre de la page'}
                  </p>
                  <p className="text-sm text-gray-500 mt-0.5 line-clamp-2">
                    {description || 'La description de votre page apparaîtra ici.'}
                  </p>
                  <div className="flex items-center gap-1 mt-2 text-gray-400">
                    <span className="text-xs">🔗</span>
                    <span className="text-xs">{domain}</span>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Facebook / OG Preview */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-muted-foreground" />
                <Label className="text-sm font-medium">Aperçu Facebook / Open Graph</Label>
              </div>
              <div className="rounded-lg border bg-white overflow-hidden dark:bg-white max-w-[500px]">
                {imageUrl && (
                  <div className="w-full h-52 bg-gray-100 flex items-center justify-center">
                    <img
                      src={imageUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={e => {
                        (e.target as HTMLImageElement).style.display = 'none'
                      }}
                    />
                  </div>
                )}
                <div className="p-3 border-t">
                  <p className="text-xs text-gray-600 uppercase tracking-wide">
                    {domain}
                  </p>
                  <p className="text-base font-semibold text-gray-900 mt-0.5 line-clamp-2">
                    {title || 'Titre de la page'}
                  </p>
                  <p className="text-sm text-gray-500 mt-0.5 line-clamp-2">
                    {description || 'La description de votre page apparaîtra ici.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* ── Generated code ─────────────────────────────────────────────── */}
        <div className="space-y-4">
          <Tabs defaultValue="html">
            <TabsList>
              <TabsTrigger value="html" className="gap-1.5">
                HTML
              </TabsTrigger>
              <TabsTrigger value="jsonld" className="gap-1.5">
                JSON-LD
              </TabsTrigger>
            </TabsList>

            <TabsContent value="html" className="mt-3">
              <div className="space-y-2">
                <div className="flex justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopy(htmlCode)}
                    className="gap-1.5"
                  >
                    <Copy className="h-3.5 w-3.5" />
                    Copier
                  </Button>
                </div>
                <div className="rounded-lg border overflow-hidden">
                  <SyntaxHighlighter
                    language="html"
                    style={oneDark}
                    customStyle={{ margin: 0, fontSize: '0.8125rem' }}
                  >
                    {htmlCode}
                  </SyntaxHighlighter>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="jsonld" className="mt-3">
              <div className="space-y-2">
                <div className="flex justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopy(jsonLd)}
                    className="gap-1.5"
                  >
                    <Copy className="h-3.5 w-3.5" />
                    Copier
                  </Button>
                </div>
                <div className="rounded-lg border overflow-hidden">
                  <SyntaxHighlighter
                    language="json"
                    style={oneDark}
                    customStyle={{ margin: 0, fontSize: '0.8125rem' }}
                  >
                    {jsonLd}
                  </SyntaxHighlighter>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  )
}
