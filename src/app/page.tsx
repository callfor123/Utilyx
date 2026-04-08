'use client'

import dynamic from 'next/dynamic'
import { useToolsStore, modules, type ModuleId, type ToolId } from '@/lib/tools-store'
import { PdfCompress } from '@/components/tools/pdf/pdf-compress'
import { PdfMerge } from '@/components/tools/pdf/pdf-merge'
import { ImgConvert } from '@/components/tools/image/img-convert'
import { ImgCompress } from '@/components/tools/image/img-compress'
import { ImgResize } from '@/components/tools/image/img-resize'
import { ImgBgRemove } from '@/components/tools/image/img-bgremove'
import { JsonCsv } from '@/components/tools/dev-seo/json-csv'
import { RegexTester } from '@/components/tools/dev-seo/regex-tester'
import { MetaTags } from '@/components/tools/dev-seo/meta-tags'
import { SitemapRobots } from '@/components/tools/dev-seo/sitemap-robots'

// pdfjs-dist uses DOMMatrix which is not available during SSR
const PdfConvert = dynamic(
  () => import('@/components/tools/pdf/pdf-convert').then(m => ({ default: m.PdfConvert })),
  { ssr: false, loading: () => <ToolLoader label="Conversion PDF" /> }
)
const PdfSign = dynamic(
  () => import('@/components/tools/pdf/pdf-sign').then(m => ({ default: m.PdfSign })),
  { ssr: false, loading: () => <ToolLoader label="Signature PDF" /> }
)

function ToolLoader({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-3 text-muted-foreground">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      <p className="text-sm">Chargement de {label}...</p>
    </div>
  )
}

import {
  ArrowLeft,
  FileText,
  Image as ImageIcon,
  Code,
  ChevronRight,
  Wrench,
  Zap,
  Shield,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FileText,
  Image: ImageIcon,
  Code,
  Merge: () => <FileText className="h-5 w-5" />,
  FileDown: () => <FileText className="h-5 w-5" />,
  PenTool: () => <FileText className="h-5 w-5" />,
  RefreshCw: () => <ImageIcon className="h-5 w-5" />,
  Maximize2: () => <ImageIcon className="h-5 w-5" />,
  Scissors: () => <ImageIcon className="h-5 w-5" />,
  Braces: () => <Code className="h-5 w-5" />,
  Terminal: () => <Code className="h-5 w-5" />,
  Search: () => <Code className="h-5 w-5" />,
  Globe: () => <Code className="h-5 w-5" />,
}

const toolComponentMap: Record<ToolId, React.ComponentType> = {
  'pdf-compress': PdfCompress,
  'pdf-merge': PdfMerge,
  'pdf-convert': PdfConvert,
  'pdf-sign': PdfSign,
  'img-convert': ImgConvert,
  'img-compress': ImgCompress,
  'img-resize': ImgResize,
  'img-bgremove': ImgBgRemove,
  'json-csv': JsonCsv,
  'regex-tester': RegexTester,
  'meta-tags': MetaTags,
  'sitemap-robots': SitemapRobots,
}

function ModuleIcon({ moduleId }: { moduleId: string }) {
  switch (moduleId) {
    case 'pdf': return <FileText className="h-8 w-8" />
    case 'image': return <ImageIcon className="h-8 w-8" />
    case 'dev-seo': return <Code className="h-8 w-8" />
    default: return <Wrench className="h-8 w-8" />
  }
}

function ModuleCard({ module }: { module: typeof modules[0] }) {
  const { setActiveModule } = useToolsStore()

  return (
    <Card
      className="group cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 border-border/50 hover:border-primary/30"
      onClick={() => setActiveModule(module.id)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="rounded-xl bg-primary/10 p-3 text-primary group-hover:bg-primary/15 transition-colors">
            <ModuleIcon moduleId={module.id} />
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
        </div>
      </CardHeader>
      <CardContent>
        <CardTitle className="text-lg mb-1">{module.label}</CardTitle>
        <CardDescription className="text-sm mb-4">{module.description}</CardDescription>
        <div className="flex flex-wrap gap-1.5">
          {module.tools.map((tool) => (
            <Badge key={tool.id} variant="secondary" className="text-xs font-normal">
              {tool.label}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function ModuleView({ moduleId }: { moduleId: ModuleId }) {
  const { setActiveModule, activeTool, setActiveTool } = useToolsStore()
  const mod = modules.find((m) => m.id === moduleId)
  if (!mod) return null

  const ActiveToolComponent = activeTool ? toolComponentMap[activeTool] : null

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setActiveModule('home')}
          className="shrink-0"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Accueil
        </Button>
        <div className="h-5 w-px bg-border" />
        <h2 className="text-lg font-semibold truncate">{mod.label}</h2>
      </div>

      <Tabs
        value={activeTool || ''}
        onValueChange={(v) => setActiveTool(v as ToolId)}
        className="w-full"
      >
        <TabsList className="w-full justify-start h-auto flex-wrap gap-1 bg-muted/50 p-1">
          {mod.tools.map((tool) => (
            <TabsTrigger
              key={tool.id}
              value={tool.id}
              className="text-xs sm:text-sm px-3 py-1.5 data-[state=active]:bg-background data-[state=active]:shadow-sm"
            >
              {tool.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {mod.tools.map((tool) => (
          <TabsContent key={tool.id} value={tool.id} className="mt-6">
            {activeTool === tool.id && ActiveToolComponent ? (
              <ActiveToolComponent />
            ) : null}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

function HomePage() {
  const { setActiveModule } = useToolsStore()

  return (
    <div className="space-y-8">
      {/* Hero section */}
      <div className="text-center space-y-4 py-4">
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 blur-2xl rounded-full" />
            <div className="relative rounded-2xl bg-primary/10 p-4">
              <Wrench className="h-10 w-10 text-primary" />
            </div>
          </div>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
          Toolbox<span className="text-primary">.dev</span>
        </h1>
        <p className="text-muted-foreground max-w-lg mx-auto text-sm sm:text-base">
          Suite multi-outils 100% côté client. Traitez vos fichiers PDF, optimisez vos images et
          boostez votre SEO sans jamais envoyer vos données sur un serveur.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Shield className="h-3.5 w-3.5" />
            <span>100% Privé</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Zap className="h-3.5 w-3.5" />
            <span>Rapide & Offline</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Wrench className="h-3.5 w-3.5" />
            <span>12 Outils intégrés</span>
          </div>
        </div>
      </div>

      {/* Module cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {modules.map((mod) => (
          <ModuleCard key={mod.id} module={mod} />
        ))}
      </div>

      {/* Quick access */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-muted-foreground">Accès rapide</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {modules.flatMap((mod) =>
            mod.tools.map((tool) => (
              <Button
                key={tool.id}
                variant="outline"
                className="h-auto py-2 px-3 flex flex-col items-center gap-1.5 text-xs"
                onClick={() => {
                  setActiveModule(mod.id)
                  useToolsStore.getState().setActiveTool(tool.id)
                }}
              >
                <span className="font-medium">{tool.label}</span>
                <Badge variant="secondary" className="text-[10px] font-normal">
                  {mod.label.split(' ')[0]}
                </Badge>
              </Button>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  const { activeModule } = useToolsStore()

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-14 items-center px-4">
          <button
            className="flex items-center gap-2 font-semibold text-lg mr-auto"
            onClick={() => useToolsStore.getState().setActiveModule('home')}
          >
            <Wrench className="h-5 w-5 text-primary" />
            <span>
              Toolbox<span className="text-primary">.dev</span>
            </span>
          </button>
          <nav className="flex items-center gap-1">
            {modules.map((mod) => (
              <Button
                key={mod.id}
                variant={activeModule === mod.id ? 'secondary' : 'ghost'}
                size="sm"
                className="text-xs sm:text-sm"
                onClick={() => useToolsStore.getState().setActiveModule(mod.id)}
              >
                <ModuleIcon moduleId={mod.id} className="h-4 w-4 mr-1.5" />
                <span className="hidden sm:inline">{mod.label}</span>
              </Button>
            ))}
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-5xl">
        {activeModule === 'home' ? <HomePage /> : <ModuleView moduleId={activeModule} />}
      </main>

      <footer className="border-t mt-auto">
        <div className="container mx-auto flex h-12 items-center justify-center px-4 text-xs text-muted-foreground">
          Toolbox.dev — Tous les traitements sont effectués localement dans votre navigateur.
        </div>
      </footer>
    </div>
  )
}
