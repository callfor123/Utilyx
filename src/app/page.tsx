'use client'

import React, { useState, useMemo } from 'react'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from 'next-themes'
import { useToolsStore, modules, type ModuleId, type ToolId } from '@/lib/tools-store'

// Existing tools
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

// New tools — Text
import { WordCounter } from '@/components/tools/text-tools/word-counter'
import { CaseConverter } from '@/components/tools/text-tools/case-converter'
import { LoremIpsumGenerator } from '@/components/tools/text-tools/lorem-ipsum-generator'
import { Base64EncodeDecode } from '@/components/tools/text-tools/base64-encode-decode'
import { TextDiffChecker } from '@/components/tools/text-tools/text-diff-checker'

// New tools — Generators
import { QrCodeGenerator } from '@/components/tools/generators/qr-code-generator'
import { PasswordGenerator } from '@/components/tools/generators/password-generator'
import { HashGenerator } from '@/components/tools/generators/hash-generator'
import { ColorPicker } from '@/components/tools/generators/color-picker'

// New tools — Dev & SEO
import { JsonFormatter } from '@/components/tools/dev-seo/json-formatter'
import { UrlEncodeDecode } from '@/components/tools/dev-seo/url-encode-decode'
import { CssGradientGenerator } from '@/components/tools/dev-seo/css-gradient-generator'
import { MarkdownPreview } from '@/components/tools/dev-seo/markdown-preview'

// New tools — Calculators
import { BmiCalculator } from '@/components/tools/calculators/bmi-calculator'
import { AgeCalculator } from '@/components/tools/calculators/age-calculator'
import { PercentageCalculator } from '@/components/tools/calculators/percentage-calculator'
import { UnitConverter } from '@/components/tools/calculators/unit-converter'

// New tools — PDF
const PdfUnlock = dynamic(
  () => import('@/components/tools/pdf/pdf-unlock').then(m => ({ default: m.PdfUnlock })),
  { ssr: false, loading: () => <ToolLoader label="Déverrouiller PDF" /> }
)
const PdfProtect = dynamic(
  () => import('@/components/tools/pdf/pdf-protect').then(m => ({ default: m.PdfProtect })),
  { ssr: false, loading: () => <ToolLoader label="Protéger PDF" /> }
)

// HEIC converter uses heic2any (browser-only)
const HeicToJpgDynamic = dynamic(
  () => import('@/components/tools/image/heic-to-jpg').then(m => ({ default: m.HeicToJpg })),
  { ssr: false, loading: () => <ToolLoader label="HEIC vers JPG" /> }
)
const FaviconGeneratorDynamic = dynamic(
  () => import('@/components/tools/image/favicon-generator').then(m => ({ default: m.FaviconGenerator })),
  { ssr: false, loading: () => <ToolLoader label="Générateur de Favicon" /> }
)

// pdfjs-dist uses DOMMatrix — SSR incompatible
const PdfConvert = dynamic(
  () => import('@/components/tools/pdf/pdf-convert').then(m => ({ default: m.PdfConvert })),
  { ssr: false, loading: () => <ToolLoader label="Conversion PDF" /> }
)
const PdfSign = dynamic(
  () => import('@/components/tools/pdf/pdf-sign').then(m => ({ default: m.PdfSign })),
  { ssr: false, loading: () => <ToolLoader label="Signature PDF" /> }
)

import {
  ArrowLeft,
  FileText,
  Image as ImageIcon,
  Code,
  ChevronRight,
  Search,
  Shield,
  Zap,
  Sparkles,
  Sun,
  Moon,
  ArrowRight,
  FileDown,
  Merge,
  PenTool,
  RefreshCw,
  Maximize2,
  Scissors,
  Braces,
  Terminal,
  Globe,
  // New icons
  Type,
  Wand2,
  Calculator,
  Hash,
  QrCode,
  KeyRound,
  Palette,
  Heart,
  Calendar,
  Percent,
  ArrowRightLeft,
  Link,
  Paintbrush,
  FileCode,
  ArrowDownUp,
  Diff,
  Lock,
  Smartphone,
  Unlock,
  ShieldCheck,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

/* ── Tool Loader ─────────────────────────────────────────────────────── */
function ToolLoader({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <div className="relative">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />
        <div className="absolute inset-0 animate-ping rounded-full bg-primary/10" />
      </div>
      <p className="text-sm text-muted-foreground">Chargement de {label}…</p>
    </div>
  )
}

/* ── Placeholder ─────────────────────────────────────────────────────── */
function Placeholder({ name }: { name: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-3 text-center">
      <div className="rounded-2xl bg-primary/10 p-4">
        <Sparkles className="h-8 w-8 text-primary" />
      </div>
      <p className="text-lg font-semibold">{name}</p>
      <p className="text-sm text-muted-foreground">Cet outil sera bientôt disponible.</p>
    </div>
  )
}

/* ── Component Map ───────────────────────────────────────────────────── */
const toolComponentMap: Record<ToolId, React.ComponentType> = {
  'pdf-compress': PdfCompress,
  'pdf-merge': PdfMerge,
  'pdf-convert': PdfConvert,
  'pdf-sign': PdfSign,
  'pdf-unlock': PdfUnlock,
  'pdf-protect': PdfProtect,
  'img-convert': ImgConvert,
  'img-compress': ImgCompress,
  'img-resize': ImgResize,
  'img-bgremove': ImgBgRemove,
  'heic-to-jpg': HeicToJpgDynamic,
  'favicon-generator': FaviconGeneratorDynamic,
  'json-csv': JsonCsv,
  'regex-tester': RegexTester,
  'meta-tags': MetaTags,
  'sitemap-robots': SitemapRobots,
  'json-formatter': JsonFormatter,
  'url-encode-decode': UrlEncodeDecode,
  'css-gradient-generator': CssGradientGenerator,
  'markdown-preview': MarkdownPreview,
  'word-counter': WordCounter,
  'case-converter': CaseConverter,
  'lorem-ipsum-generator': LoremIpsumGenerator,
  'base64-encode-decode': Base64EncodeDecode,
  'text-diff-checker': TextDiffChecker,
  'qr-code-generator': QrCodeGenerator,
  'password-generator': PasswordGenerator,
  'hash-generator': HashGenerator,
  'color-picker': ColorPicker,
  'bmi-calculator': BmiCalculator,
  'age-calculator': AgeCalculator,
  'percentage-calculator': PercentageCalculator,
  'unit-converter': UnitConverter,
}

const toolIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FileDown, Merge, PenTool, RefreshCw, Maximize2, Scissors,
  Braces, Terminal, Globe, FileText, Code,
  // New icons
  Type, Wand2, Calculator, Hash, QrCode, KeyRound, Palette,
  Heart, Calendar, Percent, ArrowRightLeft, Link, Paintbrush,
  FileCode, ArrowDownUp, Diff, Lock, Smartphone, Unlock, ShieldCheck,
}

// Image icon mapped separately (reserved keyword)
toolIconMap['Image'] = ImageIcon

function getToolIcon(iconName: string): React.ComponentType<{ className?: string }> {
  return toolIconMap[iconName] || Code
}

function ToolIconDisplay({ iconName, className }: { iconName: string; className?: string }) {
  const Icon = toolIconMap[iconName] || Code
  return React.createElement(Icon, { className })
}

/* ── Framer Motion Variants ──────────────────────────────────────────── */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { type: 'spring', stiffness: 200, damping: 22 },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

/* ── Module Color Gradient ───────────────────────────────────────────── */
const moduleGradients: Record<string, string> = {
  pdf: 'from-red-500/20 via-orange-500/10 to-amber-500/20',
  image: 'from-emerald-500/20 via-teal-500/10 to-cyan-500/20',
  'dev-seo': 'from-violet-500/20 via-purple-500/10 to-fuchsia-500/20',
  'text-tools': 'from-blue-500/20 via-sky-500/10 to-cyan-500/20',
  generators: 'from-rose-500/20 via-pink-500/10 to-fuchsia-500/20',
  calculators: 'from-amber-500/20 via-orange-500/10 to-yellow-500/20',
}

const moduleIconColors: Record<string, string> = {
  pdf: 'text-red-500 bg-red-50 dark:bg-red-950/30',
  image: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/30',
  'dev-seo': 'text-violet-500 bg-violet-50 dark:bg-violet-950/30',
  'text-tools': 'text-blue-500 bg-blue-50 dark:bg-blue-950/30',
  generators: 'text-rose-500 bg-rose-50 dark:bg-rose-950/30',
  calculators: 'text-amber-500 bg-amber-50 dark:bg-amber-950/30',
}

const moduleBadgeClasses: Record<string, string> = {
  pdf: 'category-badge-pdf',
  image: 'category-badge-image',
  'dev-seo': 'category-badge-dev-seo',
  'text-tools': 'category-badge-text-tools',
  generators: 'category-badge-generators',
  calculators: 'category-badge-calculators',
}

const moduleIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  pdf: FileText,
  image: ImageIcon,
  'dev-seo': Code,
  'text-tools': Type,
  generators: Wand2,
  calculators: Calculator,
}

/* ── Theme Toggle ────────────────────────────────────────────────────── */
function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {theme === 'dark' ? 'Mode clair' : 'Mode sombre'}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

/* ── Module Card ─────────────────────────────────────────────────────── */
function ModuleCard({ module, index }: { module: typeof modules[0]; index: number }) {
  const { setActiveModule } = useToolsStore()
  const IconComponent = moduleIcons[module.id] || Code
  const gradient = moduleGradients[module.id] || ''
  const iconColor = moduleIconColors[module.id] || ''

  return (
    <motion.div variants={itemVariants}>
      <Card
        className="group relative overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 glass-card card-hover-lift h-full"
        onClick={() => setActiveModule(module.id)}
      >
        {/* Background gradient on hover */}
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

        <CardContent className="relative p-6 flex flex-col h-full gap-4">
          {/* Icon + arrow */}
          <div className="flex items-start justify-between">
            <div className={`rounded-2xl p-3 transition-transform duration-300 group-hover:scale-110 ${iconColor}`}>
              <IconComponent className="h-7 w-7" />
            </div>
            <div className="rounded-full p-2 bg-muted/50 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>

          {/* Text */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-1.5 tracking-tight">{module.label}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{module.description}</p>
          </div>

          {/* Tool badges */}
          <div className="flex flex-wrap gap-1.5">
            {module.tools.slice(0, 3).map((tool) => (
              <Badge key={tool.id} variant="secondary" className="text-[11px] font-normal bg-muted/60 hover:bg-muted">
                {tool.label}
              </Badge>
            ))}
            {module.tools.length > 3 && (
              <Badge variant="secondary" className="text-[11px] font-normal bg-muted/40">
                +{module.tools.length - 3}
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

/* ── Quick Access Tool Button ────────────────────────────────────────── */
function ToolQuickAccess({
  tool,
  moduleId,
  moduleLabel,
}: {
  tool: { id: ToolId; label: string; icon: string; description: string }
  moduleId: ModuleId
  moduleLabel: string
}) {
  const { setActiveModule } = useToolsStore()
  return (
    <motion.div variants={itemVariants}>
      <button
        className="group flex flex-col items-center gap-3 p-4 rounded-xl glass-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg w-full text-center card-hover-lift"
        onClick={() => {
          setActiveModule(moduleId)
          useToolsStore.getState().setActiveTool(tool.id)
        }}
      >
        <div className="rounded-xl bg-muted/60 p-2.5 transition-transform duration-300 group-hover:scale-110 group-hover:bg-primary/10">
          <ToolIconDisplay iconName={tool.icon} className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
        </div>
        <div>
          <p className="text-xs font-medium leading-tight">{tool.label}</p>
          <p className="text-[10px] text-muted-foreground mt-0.5">{moduleLabel}</p>
        </div>
      </button>
    </motion.div>
  )
}

/* ── Module View ─────────────────────────────────────────────────────── */
function ModuleView({ moduleId }: { moduleId: ModuleId }) {
  const { setActiveModule, activeTool, setActiveTool } = useToolsStore()
  const mod = modules.find((m) => m.id === moduleId)
  if (!mod) return null

  const ActiveToolComponent = activeTool ? toolComponentMap[activeTool] : null
  const IconComponent = moduleIcons[moduleId] || Code
  const iconColor = moduleIconColors[moduleId] || ''

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="space-y-6"
    >
      {/* Back + title */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setActiveModule('home')}
          className="shrink-0 hover:bg-muted/60"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Accueil
        </Button>
        <div className="h-5 w-px bg-border" />
        <div className={`rounded-lg p-1.5 ${iconColor}`}>
          <IconComponent className="h-4 w-4" />
        </div>
        <h1 className="text-lg font-semibold tracking-tight">{mod.label}</h1>
      </div>

      {/* Tool tabs */}
      <div className="flex flex-wrap gap-2 p-1.5 glass-card rounded-xl">
        {mod.tools.map((tool) => {
          const ToolIcon = getToolIcon(tool.icon)
          const isActive = activeTool === tool.id
          return (
            <button
              key={tool.id}
              onClick={() => setActiveTool(tool.id)}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                ${isActive
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
                }
              `}
            >
              <ToolIcon className="h-4 w-4" />
              <span className="hidden sm:inline">{tool.label}</span>
            </button>
          )
        })}
      </div>

      {/* Active tool content */}
      <AnimatePresence mode="wait">
        {activeTool && ActiveToolComponent ? (
          <motion.div
            key={activeTool}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            <ActiveToolComponent />
          </motion.div>
        ) : (
          <motion.div
            key="placeholder"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-20 text-center gap-3"
          >
            <div className="rounded-2xl bg-muted/40 p-4">
              <Sparkles className="h-8 w-8 text-muted-foreground/50" />
            </div>
            <p className="text-muted-foreground text-sm">
              Sélectionnez un outil ci-dessus pour commencer
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

/* ── Home Page ───────────────────────────────────────────────────────── */
function HomePage() {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredTools = useMemo(() => {
    if (!searchQuery.trim()) return []
    const q = searchQuery.toLowerCase()
    return modules.flatMap((mod) =>
      mod.tools
        .filter(
          (tool) =>
            tool.label.toLowerCase().includes(q) ||
            tool.description.toLowerCase().includes(q) ||
            mod.label.toLowerCase().includes(q)
        )
        .map((tool) => ({ ...tool, moduleId: mod.id, moduleLabel: mod.label }))
    )
  }, [searchQuery])

  return (
    <div className="space-y-12">
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="relative text-center py-8 sm:py-12"
      >
        {/* Background glow */}
        <div className="absolute inset-0 -z-10 mesh-gradient-strong" />

        {/* Animated orbs */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="orb orb-1" />
          <div className="orb orb-2" />
          <div className="orb orb-3" />
        </div>

        {/* Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 18, delay: 0.05 }}
          className="flex justify-center mb-6"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-150" />
            <div className="relative glass-strong rounded-3xl p-5 gradient-border">
              <Sparkles className="h-10 w-10 text-primary" />
            </div>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4"
        >
          <span className="gradient-text-hero">Utilyx</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg leading-relaxed mb-8"
        >
          Suite multi-outils <span className="text-foreground font-medium">100% gratuite</span> et{' '}
          <span className="text-foreground font-medium">privée</span>. PDF, images, SEO, texte, générateurs
          et calculateurs — tout directement dans votre navigateur.
        </motion.p>

        {/* Search bar */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="max-w-md mx-auto relative"
        >
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Rechercher un outil…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-11 h-12 rounded-xl glass-card border-border/50 focus:border-primary/40 text-base"
          />
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-4 mt-8 text-xs text-muted-foreground"
        >
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-card">
            <Shield className="h-3.5 w-3.5 text-emerald-500" />
            <span>100% Privé</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-card">
            <Zap className="h-3.5 w-3.5 text-amber-500" />
            <span>Rapide & Offline</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-card">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span>32+ Outils Premium</span>
          </div>
        </motion.div>
      </motion.section>

      {/* ── Search Results ────────────────────────────────────────── */}
      <AnimatePresence>
        {searchQuery.trim() && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
          >
            {filteredTools.length > 0 ? (
              <div>
                <h2 className="text-sm font-medium text-muted-foreground mb-3">
                  {filteredTools.length} outil{filteredTools.length > 1 ? 's' : ''} trouvé{filteredTools.length > 1 ? 's' : ''}
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {filteredTools.map((tool) => (
                    <ToolQuickAccess
                      key={tool.id}
                      tool={tool}
                      moduleId={tool.moduleId}
                      moduleLabel={tool.moduleLabel}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-muted-foreground text-sm">Aucun outil trouvé pour « {searchQuery} »</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Module Cards ─────────────────────────────────────────── */}
      {!searchQuery.trim() && (
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="mb-5">
            <h2 className="text-xl font-semibold tracking-tight">Catégories</h2>
            <p className="text-sm text-muted-foreground mt-1">Choisissez une catégorie pour explorer ses outils</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {modules.map((mod, i) => (
              <ModuleCard key={mod.id} module={mod} index={i} />
            ))}
          </div>
        </motion.section>
      )}

      {/* ── All Tools ─────────────────────────────────────────────── */}
      {!searchQuery.trim() && (
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          <motion.div variants={itemVariants} className="mb-5">
            <h2 className="text-xl font-semibold tracking-tight">Tous les outils</h2>
            <p className="text-sm text-muted-foreground mt-1">Accès rapide à tous les outils disponibles</p>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {modules.flatMap((mod) =>
              mod.tools.map((tool) => (
                <ToolQuickAccess
                  key={tool.id}
                  tool={tool}
                  moduleId={mod.id}
                  moduleLabel={mod.label}
                />
              ))
            )}
          </div>
        </motion.section>
      )}
    </div>
  )
}

/* ── Footer Column ──────────────────────────────────────────────────── */
function FooterColumn({ moduleId, title }: { moduleId: ModuleId; title: string }) {
  const mod = modules.find(m => m.id === moduleId)
  if (!mod) return null
  return (
    <div>
      <h3 className="text-sm font-semibold mb-3">{title}</h3>
      <ul className="space-y-2">
        {mod.tools.map(tool => (
          <li key={tool.id}>
            <button
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => {
                useToolsStore.getState().setActiveModule(moduleId)
                useToolsStore.getState().setActiveTool(tool.id)
              }}
            >
              {tool.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

/* ── Main App ────────────────────────────────────────────────────────── */
export default function Home() {
  const { activeModule } = useToolsStore()

  return (
    <div className="min-h-screen flex flex-col bg-background relative">
      {/* Subtle grid background */}
      <div className="fixed inset-0 bg-grid -z-50 pointer-events-none" />
      <div className="fixed inset-0 mesh-gradient -z-40 pointer-events-none" />

      {/* ── Header ─────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 w-full">
        <div className="glass-strong border-b border-border/50">
          <div className="container mx-auto flex h-14 items-center px-4">
            {/* Logo */}
            <button
              className="flex items-center gap-2.5 font-bold text-lg mr-auto hover:opacity-80 transition-opacity"
              onClick={() => useToolsStore.getState().setActiveModule('home')}
            >
              <div className="rounded-lg bg-primary/10 p-1.5">
                <Sparkles className="h-4 w-4 text-primary" />
              </div>
              <span className="gradient-text">Utilyx</span>
            </button>

            {/* Nav — responsive: icons on mobile, text on desktop */}
            <nav className="flex items-center gap-1">
              {modules.map((mod) => {
                const IconComponent = moduleIcons[mod.id] || Code
                const isActive = activeModule === mod.id
                return (
                  <Button
                    key={mod.id}
                    variant={isActive ? 'secondary' : 'ghost'}
                    size="sm"
                    className={`
                      text-xs sm:text-sm rounded-lg transition-all duration-200
                      ${isActive
                        ? 'bg-primary/10 text-primary hover:bg-primary/15 font-semibold'
                        : 'hover:bg-muted/60'
                      }
                    `}
                    onClick={() => useToolsStore.getState().setActiveModule(mod.id)}
                  >
                    <IconComponent className="h-4 w-4 sm:mr-1.5" />
                    <span className="hidden md:inline">{mod.label}</span>
                  </Button>
                )
              })}
              <div className="w-px h-5 bg-border mx-1.5" />
              <ThemeToggle />
            </nav>
          </div>
        </div>
      </header>

      {/* ── Main Content ────────────────────────────────────────── */}
      <main className="flex-1">
        <div className="container mx-auto px-4 py-6 sm:py-8 max-w-5xl">
          <AnimatePresence mode="wait">
            {activeModule === 'home' ? (
              <HomePage key="home" />
            ) : (
              <ModuleView key={activeModule} moduleId={activeModule} />
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* ── Footer ─────────────────────────────────────────────── */}
      <footer className="border-t border-border/50 mt-auto">
        <div className="container mx-auto px-4 py-8 sm:py-10">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-8 mb-8">
            {/* Brand */}
            <div className="col-span-2 sm:col-span-3 lg:col-span-1">
              <div className="flex items-center gap-2 font-bold text-lg mb-3">
                <div className="rounded-lg bg-primary/10 p-1.5">
                  <Sparkles className="h-4 w-4 text-primary" />
                </div>
                <span className="gradient-text">Utilyx</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Suite multi-outils 100% gratuite et privée.
              </p>
            </div>

            <FooterColumn moduleId="pdf" title="PDF & Documents" />
            <FooterColumn moduleId="image" title="Images" />
            <FooterColumn moduleId="dev-seo" title="Dev & SEO" />
            <FooterColumn moduleId="text-tools" title="Text Tools" />
            <FooterColumn moduleId="generators" title="Generators" />
            <FooterColumn moduleId="calculators" title="Calculators" />
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-border/50">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} Utilyx. Tous droits réservés.
            </p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Shield className="h-3 w-3 text-emerald-500" />
                <span>Données 100% locales</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="h-3 w-3 text-amber-500" />
                <span>Zéro inscription requise</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
