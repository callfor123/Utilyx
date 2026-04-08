'use client'

import { useState, useMemo, useCallback } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { toast } from 'sonner'
import {
  FileCode2,
  Shield,
  Plus,
  Trash2,
  Copy,
  Download,
} from 'lucide-react'
import { cn, downloadBlob, copyToClipboard } from '@/lib/utils'
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
import { Checkbox } from '@/components/ui/checkbox'

// ── Types ─────────────────────────────────────────────────────────────────
interface SitemapUrl {
  id: string
  loc: string
  priority: number
  changefreq: string
  lastmod: string
}

interface RobotsRule {
  id: string
  type: 'allow' | 'disallow'
  path: string
}

interface RobotsSection {
  id: string
  userAgent: string
  rules: RobotsRule[]
  sitemap: string
}

const CHANGE_FREQ_OPTIONS = [
  'always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never',
]

const USER_AGENT_OPTIONS = ['*', 'Googlebot', 'Bingbot', 'Slurp', 'DuckDuckBot', 'Baiduspider', 'YandexBot']

// ── Helpers ───────────────────────────────────────────────────────────────
let nextId = 0
function uid() {
  return String(++nextId)
}

function todayStr() {
  return new Date().toISOString().split('T')[0]
}

// ── Sitemap XML Generator ─────────────────────────────────────────────────
function generateSitemapXml(urls: SitemapUrl[]): string {
  if (urls.length === 0) return ''
  const lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ]
  for (const url of urls) {
    lines.push('  <url>')
    lines.push(`    <loc>${escapeXml(url.loc)}</loc>`)
    if (url.lastmod) {
      lines.push(`    <lastmod>${url.lastmod}</lastmod>`)
    }
    if (url.changefreq) {
      lines.push(`    <changefreq>${url.changefreq}</changefreq>`)
    }
    lines.push(`    <priority>${url.priority.toFixed(1)}</priority>`)
    lines.push('  </url>')
  }
  lines.push('</urlset>')
  return lines.join('\n')
}

function escapeXml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

// ── Robots.txt Generator ──────────────────────────────────────────────────
function generateRobotsTxt(sections: RobotsSection[]): string {
  const lines: string[] = []
  for (const section of sections) {
    lines.push(`User-agent: ${section.userAgent}`)
    for (const rule of section.rules) {
      lines.push(`${rule.type === 'allow' ? 'Allow' : 'Disallow'}: ${rule.path}`)
    }
    lines.push('')
  }
  // Sitemaps (from last section or global)
  const sitemaps = sections
    .map(s => s.sitemap)
    .filter(Boolean)
  const uniqueSitemaps = [...new Set(sitemaps)]
  for (const sm of uniqueSitemaps) {
    lines.push(`Sitemap: ${sm}`)
  }
  return lines.join('\n')
}

// ── Main component ────────────────────────────────────────────────────────
export function SitemapRobots() {
  // ── Sitemap state ───────────────────────────────────────────────────────
  const [sitemapUrls, setSitemapUrls] = useState<SitemapUrl[]>([])
  const [newUrl, setNewUrl] = useState('')
  const [newPriority, setNewPriority] = useState('0.8')
  const [newFreq, setNewFreq] = useState('weekly')
  const [newLastmod, setNewLastmod] = useState(todayStr())
  const [bulkUrls, setBulkUrls] = useState('')

  // ── Robots state ────────────────────────────────────────────────────────
  const [robotsSections, setRobotsSections] = useState<RobotsSection[]>([
    {
      id: uid(),
      userAgent: '*',
      rules: [
        { id: uid(), type: 'allow', path: '/' },
      ],
      sitemap: '',
    },
  ])
  const [robotsSitemap, setRobotsSitemap] = useState('')

  // ── Sitemap actions ─────────────────────────────────────────────────────
  const addUrl = useCallback(() => {
    if (!newUrl.trim()) {
      toast.error('Veuillez entrer une URL')
      return
    }
    const urlObj: SitemapUrl = {
      id: uid(),
      loc: newUrl.trim(),
      priority: parseFloat(newPriority),
      changefreq: newFreq,
      lastmod: newLastmod,
    }
    setSitemapUrls(prev => [...prev, urlObj])
    setNewUrl('')
    toast.success('URL ajoutée')
  }, [newUrl, newPriority, newFreq, newLastmod])

  const removeUrl = useCallback((id: string) => {
    setSitemapUrls(prev => prev.filter(u => u.id !== id))
  }, [])

  const addBulkUrls = useCallback(() => {
    if (!bulkUrls.trim()) {
      toast.error('Veuillez entrer au moins une URL')
      return
    }
    const lines = bulkUrls.split('\n').map(l => l.trim()).filter(Boolean)
    const newEntries: SitemapUrl[] = lines.map(loc => ({
      id: uid(),
      loc,
      priority: parseFloat(newPriority),
      changefreq: newFreq,
      lastmod: newLastmod,
    }))
    setSitemapUrls(prev => [...prev, ...newEntries])
    setBulkUrls('')
    toast.success(`${newEntries.length} URL(s) ajoutée(s)`)
  }, [bulkUrls, newPriority, newFreq, newLastmod])

  // ── Sitemap XML output ──────────────────────────────────────────────────
  const sitemapXml = useMemo(() => generateSitemapXml(sitemapUrls), [sitemapUrls])

  // ── Robots actions ──────────────────────────────────────────────────────
  const addSection = useCallback(() => {
    setRobotsSections(prev => [
      ...prev,
      {
        id: uid(),
        userAgent: '*',
        rules: [],
        sitemap: '',
      },
    ])
  }, [])

  const removeSection = useCallback((sectionId: string) => {
    setRobotsSections(prev => prev.filter(s => s.id !== sectionId))
  }, [])

  const updateSectionUserAgent = useCallback((sectionId: string, userAgent: string) => {
    setRobotsSections(prev =>
      prev.map(s => (s.id === sectionId ? { ...s, userAgent } : s))
    )
  }, [])

  const addRule = useCallback((sectionId: string, type: 'allow' | 'disallow') => {
    setRobotsSections(prev =>
      prev.map(s =>
        s.id === sectionId
          ? { ...s, rules: [...s.rules, { id: uid(), type, path: '' }] }
          : s
      )
    )
  }, [])

  const updateRule = useCallback((sectionId: string, ruleId: string, path: string) => {
    setRobotsSections(prev =>
      prev.map(s =>
        s.id === sectionId
          ? {
              ...s,
              rules: s.rules.map(r =>
                r.id === ruleId ? { ...r, path } : r
              ),
            }
          : s
      )
    )
  }, [])

  const removeRule = useCallback((sectionId: string, ruleId: string) => {
    setRobotsSections(prev =>
      prev.map(s =>
        s.id === sectionId
          ? { ...s, rules: s.rules.filter(r => r.id !== ruleId) }
          : s
      )
    )
  }, [])

  const toggleRuleType = useCallback((sectionId: string, ruleId: string) => {
    setRobotsSections(prev =>
      prev.map(s =>
        s.id === sectionId
          ? {
              ...s,
              rules: s.rules.map(r =>
                r.id === ruleId
                  ? { ...r, type: r.type === 'allow' ? 'disallow' : 'allow' }
                  : r
              ),
            }
          : s
      )
    )
  }, [])

  // ── Robots.txt output ───────────────────────────────────────────────────
  const robotsTxt = useMemo(() => {
    const sectionsWithSitemap = robotsSections.map((s, i) => ({
      ...s,
      sitemap: i === 0 ? robotsSitemap : s.sitemap,
    }))
    return generateRobotsTxt(sectionsWithSitemap)
  }, [robotsSections, robotsSitemap])

  // ── Copy / Download ─────────────────────────────────────────────────────
  const handleCopy = useCallback(async (text: string) => {
    await copyToClipboard(text)
    toast.success('Copié dans le presse-papiers')
  }, [])

  const handleDownload = useCallback((content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/xml;charset=utf-8' })
    downloadBlob(blob, filename)
    toast.success('Fichier téléchargé')
  }, [])

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <FileCode2 className="h-5 w-5 text-primary" />
          <CardTitle className="text-xl">Sitemap XML &amp; Robots.txt</CardTitle>
        </div>
        <CardDescription>
          Générez des fichiers sitemap et robots.txt optimisés pour le référencement
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="sitemap">
          <TabsList>
            <TabsTrigger value="sitemap" className="gap-1.5">
              <FileCode2 className="h-4 w-4" />
              Sitemap XML
            </TabsTrigger>
            <TabsTrigger value="robots" className="gap-1.5">
              <Shield className="h-4 w-4" />
              Robots.txt
            </TabsTrigger>
          </TabsList>

          {/* ═══════════════════════════════════════════════════════════════ */}
          {/* SITEMAP TAB */}
          {/* ═══════════════════════════════════════════════════════════════ */}
          <TabsContent value="sitemap" className="mt-4 space-y-6">
            {/* URL builder form */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Ajouter une URL</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="sm:col-span-2 lg:col-span-1">
                  <Input
                    value={newUrl}
                    onChange={e => setNewUrl(e.target.value)}
                    placeholder="https://example.com/page"
                    type="url"
                    onKeyDown={e => e.key === 'Enter' && addUrl()}
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-[11px] text-muted-foreground">Priorité</Label>
                  <Select value={newPriority} onValueChange={setNewPriority}>
                    <SelectTrigger className="h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0].map(v => (
                        <SelectItem key={v} value={String(v)}>{v.toFixed(1)}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label className="text-[11px] text-muted-foreground">Fréquence</Label>
                  <Select value={newFreq} onValueChange={setNewFreq}>
                    <SelectTrigger className="h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {CHANGE_FREQ_OPTIONS.map(f => (
                        <SelectItem key={f} value={f}>{f.charAt(0).toUpperCase() + f.slice(1)}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label className="text-[11px] text-muted-foreground">Dernière modif.</Label>
                  <Input
                    type="date"
                    value={newLastmod}
                    onChange={e => setNewLastmod(e.target.value)}
                    className="h-9"
                  />
                </div>
              </div>
              <Button onClick={addUrl} size="sm" className="gap-1.5">
                <Plus className="h-3.5 w-3.5" />
                Ajouter
              </Button>
            </div>

            {/* Bulk add */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Ajout en masse</Label>
              <Textarea
                value={bulkUrls}
                onChange={e => setBulkUrls(e.target.value)}
                placeholder="https://example.com/page1&#10;https://example.com/page2&#10;https://example.com/page3"
                rows={3}
                className="font-mono text-sm"
              />
              <Button onClick={addBulkUrls} variant="outline" size="sm" className="gap-1.5">
                <Plus className="h-3.5 w-3.5" />
                Ajouter tout ({bulkUrls.split('\n').filter(l => l.trim()).length} URL(s))
              </Button>
            </div>

            <Separator />

            {/* URL list */}
            {sitemapUrls.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">
                    URLs ({sitemapUrls.length})
                  </Label>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSitemapUrls([])}
                    className="text-destructive text-xs"
                  >
                    Tout effacer
                  </Button>
                </div>
                <div className="max-h-64 overflow-y-auto rounded-lg border">
                  <table className="w-full text-sm">
                    <thead className="bg-muted/50 sticky top-0">
                      <tr>
                        <th className="text-left px-3 py-2 font-medium text-xs text-muted-foreground">URL</th>
                        <th className="text-center px-2 py-2 font-medium text-xs text-muted-foreground w-20">Priorité</th>
                        <th className="text-center px-2 py-2 font-medium text-xs text-muted-foreground w-28">Fréquence</th>
                        <th className="text-center px-2 py-2 font-medium text-xs text-muted-foreground w-28">Modif.</th>
                        <th className="w-10"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {sitemapUrls.map(url => (
                        <tr key={url.id} className="border-t last:border-0">
                          <td className="px-3 py-2 font-mono text-xs truncate max-w-[250px]" title={url.loc}>
                            {url.loc}
                          </td>
                          <td className="px-2 py-2 text-center">
                            <Badge variant="secondary" className="font-mono text-[10px]">
                              {url.priority.toFixed(1)}
                            </Badge>
                          </td>
                          <td className="px-2 py-2 text-center text-xs text-muted-foreground">
                            {url.changefreq}
                          </td>
                          <td className="px-2 py-2 text-center text-xs text-muted-foreground">
                            {url.lastmod}
                          </td>
                          <td className="px-1 py-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeUrl(url.id)}
                              className="h-7 w-7 p-0 text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Generated XML */}
            {sitemapXml && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Sitemap XML généré</Label>
                  <div className="flex gap-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCopy(sitemapXml)}
                      className="gap-1.5"
                    >
                      <Copy className="h-3.5 w-3.5" />
                      Copier
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDownload(sitemapXml, 'sitemap.xml')}
                      className="gap-1.5"
                    >
                      <Download className="h-3.5 w-3.5" />
                      Télécharger
                    </Button>
                  </div>
                </div>
                <div className="rounded-lg border overflow-hidden max-h-80 overflow-y-auto">
                  <SyntaxHighlighter
                    language="xml"
                    style={oneDark}
                    customStyle={{ margin: 0, fontSize: '0.8125rem' }}
                  >
                    {sitemapXml}
                  </SyntaxHighlighter>
                </div>
              </div>
            )}

            {!sitemapXml && sitemapUrls.length === 0 && (
              <div className="rounded-lg border border-dashed p-8 text-center text-muted-foreground text-sm">
                <FileCode2 className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>Ajoutez des URLs pour générer le sitemap XML</p>
              </div>
            )}
          </TabsContent>

          {/* ═══════════════════════════════════════════════════════════════ */}
          {/* ROBOTS.TXT TAB */}
          {/* ═══════════════════════════════════════════════════════════════ */}
          <TabsContent value="robots" className="mt-4 space-y-6">
            {/* Sections builder */}
            <div className="space-y-4">
              {robotsSections.map((section, sectionIndex) => (
                <div key={section.id} className="rounded-lg border p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">
                      Section {sectionIndex + 1}
                    </Label>
                    {robotsSections.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeSection(section.id)}
                        className="h-7 w-7 p-0 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    )}
                  </div>

                  {/* User-agent */}
                  <div className="flex items-center gap-3">
                    <Label className="text-xs text-muted-foreground w-24">User-agent</Label>
                    <Select
                      value={section.userAgent}
                      onValueChange={v => updateSectionUserAgent(section.id, v)}
                    >
                      <SelectTrigger className="h-9 flex-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {USER_AGENT_OPTIONS.map(ua => (
                          <SelectItem key={ua} value={ua}>{ua}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Rules */}
                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">Règles</Label>
                    {section.rules.map(rule => (
                      <div key={rule.id} className="flex items-center gap-2">
                        <Button
                          variant={rule.type === 'allow' ? 'default' : 'destructive'}
                          size="sm"
                          onClick={() => toggleRuleType(section.id, rule.id)}
                          className="w-24 text-xs capitalize shrink-0"
                        >
                          {rule.type === 'allow' ? 'Allow' : 'Disallow'}
                        </Button>
                        <Input
                          value={rule.path}
                          onChange={e => updateRule(section.id, rule.id, e.target.value)}
                          placeholder="/"
                          className="h-9 font-mono text-sm"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeRule(section.id, rule.id)}
                          className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive shrink-0"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    ))}
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => addRule(section.id, 'allow')}
                        className="text-xs gap-1"
                      >
                        <Plus className="h-3 w-3" />
                        Allow
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => addRule(section.id, 'disallow')}
                        className="text-xs gap-1"
                      >
                        <Plus className="h-3 w-3" />
                        Disallow
                      </Button>
                    </div>
                  </div>
                </div>
              ))}

              <Button
                variant="outline"
                size="sm"
                onClick={addSection}
                className="gap-1.5"
              >
                <Plus className="h-3.5 w-3.5" />
                Ajouter une section
              </Button>
            </div>

            {/* Sitemap URL for robots.txt */}
            <div className="space-y-2">
              <Label htmlFor="robots-sitemap" className="text-sm font-medium">
                URL du Sitemap
              </Label>
              <Input
                id="robots-sitemap"
                value={robotsSitemap}
                onChange={e => setRobotsSitemap(e.target.value)}
                placeholder="https://example.com/sitemap.xml"
                type="url"
              />
            </div>

            <Separator />

            {/* Generated robots.txt */}
            {robotsTxt.trim() && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Robots.txt généré</Label>
                  <div className="flex gap-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCopy(robotsTxt)}
                      className="gap-1.5"
                    >
                      <Copy className="h-3.5 w-3.5" />
                      Copier
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDownload(robotsTxt, 'robots.txt')}
                      className="gap-1.5"
                    >
                      <Download className="h-3.5 w-3.5" />
                      Télécharger
                    </Button>
                  </div>
                </div>
                <div className="rounded-lg border overflow-hidden max-h-80 overflow-y-auto">
                  <SyntaxHighlighter
                    language="text"
                    style={oneDark}
                    customStyle={{ margin: 0, fontSize: '0.8125rem' }}
                  >
                    {robotsTxt}
                  </SyntaxHighlighter>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
