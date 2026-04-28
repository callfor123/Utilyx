'use client'

import React, { useState, useMemo } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from 'next-themes'
import { useTranslations } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'
import { useToolsStore, modules, type ModuleId, type ToolId } from '@/lib/tools-store'
import { routing, type Locale } from '@/i18n/routing'
import { toolIdToPath, getPathForLocale } from '@/lib/seo-registry'
import { AdBanner, AdInFeed, AdLeaderboard, AdStickyBottom, AdHomeGrid } from '@/components/adsense'


// Existing tools
import { PdfCompress } from '@/components/tools/pdf/pdf-compress'
import { PdfMerge } from '@/components/tools/pdf/pdf-merge'
import { ImgConvert } from '@/components/tools/image/img-convert'
import { ImgCompress } from '@/components/tools/image/img-compress'
import { ImgResize } from '@/components/tools/image/img-resize'
import { ImgBgRemove } from '@/components/tools/image/img-bgremove'
import { ImageOcr } from '@/components/tools/image/img-ocr'
import { JsonCsv } from '@/components/tools/dev-seo/json-csv'
import { RegexTester } from '@/components/tools/dev-seo/regex-tester'
import { MetaTags } from '@/components/tools/dev-seo/meta-tags'
import { SitemapRobots } from '@/components/tools/dev-seo/sitemap-robots'

// Text tools
import { WordCounter } from '@/components/tools/text-tools/word-counter'
import { CaseConverter } from '@/components/tools/text-tools/case-converter'
import { LoremIpsumGenerator } from '@/components/tools/text-tools/lorem-ipsum-generator'
import { Base64EncodeDecode } from '@/components/tools/text-tools/base64-encode-decode'
import { TextDiffChecker } from '@/components/tools/text-tools/text-diff-checker'

// Generators
import { QrCodeGenerator } from '@/components/tools/generators/qr-code-generator'
import { PasswordGenerator } from '@/components/tools/generators/password-generator'
import { HashGenerator } from '@/components/tools/generators/hash-generator'
import { ColorPicker } from '@/components/tools/generators/color-picker'
import { RandomNumberGenerator } from '@/components/tools/generators/random-number-generator'
import { VatCalculator } from '@/components/tools/calculators/vat-calculator'
import { TimeConverter } from '@/components/tools/calculators/time-converter'

// Dev & SEO
import { JsonFormatter } from '@/components/tools/dev-seo/json-formatter'
import { UrlEncodeDecode } from '@/components/tools/dev-seo/url-encode-decode'
import { CssGradientGenerator } from '@/components/tools/dev-seo/css-gradient-generator'
import { MarkdownPreview } from '@/components/tools/dev-seo/markdown-preview'

// Calculators
import { BmiCalculator } from '@/components/tools/calculators/bmi-calculator'
import { AgeCalculator } from '@/components/tools/calculators/age-calculator'
import { PercentageCalculator } from '@/components/tools/calculators/percentage-calculator'
import { TipCalculator } from '@/components/tools/calculators/tip-calculator'
import { UnitConverter } from '@/components/tools/calculators/unit-converter'

// Video tools (dynamic imports for heavy FFmpeg)

// Dynamic imports
const PdfUnlock = dynamic(
  () => import('@/components/tools/pdf/pdf-unlock').then(m => ({ default: m.PdfUnlock })),
  { ssr: false, loading: () => <ToolLoader label="PDF Unlock" /> }
)
const PdfProtect = dynamic(
  () => import('@/components/tools/pdf/pdf-protect').then(m => ({ default: m.PdfProtect })),
  { ssr: false, loading: () => <ToolLoader label="PDF Protect" /> }
)
const HeicToJpgDynamic = dynamic(
  () => import('@/components/tools/image/heic-to-jpg').then(m => ({ default: m.HeicToJpg })),
  { ssr: false, loading: () => <ToolLoader label="HEIC to JPG" /> }
)
const FaviconGeneratorDynamic = dynamic(
  () => import('@/components/tools/image/favicon-generator').then(m => ({ default: m.FaviconGenerator })),
  { ssr: false, loading: () => <ToolLoader label="Favicon Generator" /> }
)
const PdfConvert = dynamic(
  () => import('@/components/tools/pdf/pdf-convert').then(m => ({ default: m.PdfConvert })),
  { ssr: false, loading: () => <ToolLoader label="PDF Convert" /> }
)
const PdfSign = dynamic(
  () => import('@/components/tools/pdf/pdf-sign').then(m => ({ default: m.PdfSign })),
  { ssr: false, loading: () => <ToolLoader label="PDF Sign" /> }
)
const VideoTrimDynamic = dynamic(
  () => import('@/components/tools/video/video-trim').then(m => ({ default: m.VideoTrim })),
  { ssr: false, loading: () => <ToolLoader label="Video Trim" /> }
)
const VideoAddAudioDynamic = dynamic(
  () => import('@/components/tools/video/video-add-audio').then(m => ({ default: m.VideoAddAudio })),
  { ssr: false, loading: () => <ToolLoader label="Video Add Audio" /> }
)
const VideoConvertDynamic = dynamic(
  () => import('@/components/tools/video/video-convert').then(m => ({ default: m.VideoConvert })),
  { ssr: false, loading: () => <ToolLoader label="Video Convert" /> }
)
const VideoCompressDynamic = dynamic(
  () => import('@/components/tools/video/video-compress').then(m => ({ default: m.VideoCompress })),
  { ssr: false, loading: () => <ToolLoader label="Video Compress" /> }
)
const VideoExtractAudioDynamic = dynamic(
  () => import('@/components/tools/video/video-extract-audio').then(m => ({ default: m.VideoExtractAudio })),
  { ssr: false, loading: () => <ToolLoader label="Video Extract Audio" /> }
)
const VideoToGifDynamic = dynamic(
  () => import('@/components/tools/video/video-to-gif').then(m => ({ default: m.VideoToGif })),
  { ssr: false, loading: () => <ToolLoader label="Video to GIF" /> }
)
const VideoRemoveAudioDynamic = dynamic(
  () => import('@/components/tools/video/video-remove-audio').then(m => ({ default: m.VideoRemoveAudio })),
  { ssr: false, loading: () => <ToolLoader label="Video Remove Audio" /> }
)
const WhatsAppLinkDynamic = dynamic(
  () => import('@/components/tools/generators/whatsapp-link'),
  { ssr: false, loading: () => <ToolLoader label="WhatsApp Link" /> }
)
const NameSplitterDynamic = dynamic(
  () => import('@/components/tools/text-tools/name-splitter'),
  { ssr: false, loading: () => <ToolLoader label="Name Splitter" /> }
)
const UrlCleanerDynamic = dynamic(
  () => import('@/components/tools/text-tools/url-cleaner'),
  { ssr: false, loading: () => <ToolLoader label="URL Cleaner" /> }
)
const ConcreteCalculatorDynamic = dynamic(
  () => import('@/components/tools/calculators/concrete-calculator'),
  { ssr: false, loading: () => <ToolLoader label="Concrete Calculator" /> }
)
const MileageCalculatorDynamic = dynamic(
  () => import('@/components/tools/calculators/mileage-calculator'),
  { ssr: false, loading: () => <ToolLoader label="Mileage Calculator" /> }
)
const ColorConverterDynamic = dynamic(
  () => import('@/components/tools/generators/color-converter'),
  { ssr: false, loading: () => <ToolLoader label="Color Converter" /> }
)
const StopwatchDynamic = dynamic(
  () => import('@/components/tools/calculators/stopwatch'),
  { ssr: false, loading: () => <ToolLoader label="Stopwatch" /> }
)
const PomodoroTimerDynamic = dynamic(
  () => import('@/components/tools/calculators/pomodoro-timer'),
  { ssr: false, loading: () => <ToolLoader label="Pomodoro Timer" /> }
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
  Link as LinkIcon,
  Paintbrush,
  FileCode,
  ArrowDownUp,
  Diff,
  Lock,
  Smartphone,
  Unlock,
  ShieldCheck,
  X,
  Video,
  Volume2,
  Music,
  Film,
  VolumeX,
  Youtube as YoutubeIcon,
  Fingerprint,
  HardHat,
  Car,
  MessageCircle,
  Link2Off,
  SplitSquareHorizontal,
  Clock,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

/* ── Locale Labels ────────────────────────────────────────────────────── */
const localeLabels: Record<string, string> = {
  fr: 'Français',
  en: 'English',
  es: 'Español',
  de: 'Deutsch',
  ar: 'العربية',
  pt: 'Português',
}

/* ── Translated Modules Hook ─────────────────────────────────────────── */
function useTranslatedModules() {
  const t = useTranslations('Tools')
  const tMod = useTranslations('Modules')

  return modules.map(mod => ({
    ...mod,
    label: tMod(`${mod.id}.label`),
    description: tMod(`${mod.id}.description`),
    tools: mod.tools.map(tool => ({
      ...tool,
      label: t(`${tool.id}.label`),
      description: t(`${tool.id}.description`),
    })),
  }))
}

/* ── Tool Loader ─────────────────────────────────────────────────────── */
function ToolLoader({ label }: { label: string }) {
  const t = useTranslations('Common')
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <div className="relative">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />
        <div className="absolute inset-0 animate-ping rounded-full bg-primary/10" />
      </div>
      <p className="text-sm text-muted-foreground">{t('loading', { label })}</p>
    </div>
  )
}

/* ── Placeholder ─────────────────────────────────────────────────────── */
function Placeholder({ name }: { name: string }) {
  const t = useTranslations('Common')
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-3 text-center">
      <div className="rounded-2xl bg-primary/10 p-4">
        <Sparkles className="h-8 w-8 text-primary" />
      </div>
      <p className="text-lg font-semibold">{name}</p>
      <p className="text-sm text-muted-foreground">{t('comingSoon')}</p>
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
  'img-ocr': ImageOcr,
  'heic-to-jpg': HeicToJpgDynamic,
  'favicon-generator': FaviconGeneratorDynamic,
  'youtube-thumbnail': dynamic(() => import('@/components/tools/image/youtube-thumbnail').then(m => m.YoutubeThumbnailDownloader)),
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
  'uuid-generator': dynamic(() => import('@/components/tools/generators/uuid-generator').then(m => m.UuidGenerator)),
  'hash-generator': HashGenerator,
  'color-picker': ColorPicker,
  'bmi-calculator': BmiCalculator,
  'age-calculator': AgeCalculator,
  'percentage-calculator': PercentageCalculator,
  'unit-converter': UnitConverter,
  'video-trim': VideoTrimDynamic,
  'video-add-audio': VideoAddAudioDynamic,
  'video-convert': VideoConvertDynamic,
  'video-compress': VideoCompressDynamic,
  'video-extract-audio': VideoExtractAudioDynamic,
  'video-to-gif': VideoToGifDynamic,
  'video-remove-audio': VideoRemoveAudioDynamic,
  'whatsapp-link': WhatsAppLinkDynamic,
  'name-splitter': NameSplitterDynamic,
  'url-cleaner': UrlCleanerDynamic,
  'concrete-calculator': ConcreteCalculatorDynamic,
  'mileage-calculator': MileageCalculatorDynamic,
  'color-converter': ColorConverterDynamic,
  'stopwatch': StopwatchDynamic,
  'pomodoro-timer': PomodoroTimerDynamic,
  'tip-calculator': TipCalculator,
  'random-number-generator': RandomNumberGenerator,
  'vat-calculator': VatCalculator,
  'discount-calculator': dynamic(() => import('@/components/tools/calculators/discount-calculator').then(m => m.DiscountCalculator), { ssr: false, loading: () => <ToolLoader label="Discount Calculator" /> }),
  'time-converter': TimeConverter,
}

const toolIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FileDown, Merge, PenTool, RefreshCw, Maximize2, Scissors,
  Braces, Terminal, Globe, FileText, Code, Youtube: YoutubeIcon, Fingerprint,
  Type, Wand2, Calculator, Hash, QrCode, KeyRound, Palette,
  Heart, Calendar, Percent, ArrowRightLeft, Link: LinkIcon, Paintbrush,
  FileCode, ArrowDownUp, Diff, Lock, Smartphone, Unlock, ShieldCheck,
  Volume2, Music, Film, VolumeX, Video,
  HardHat, Car, MessageCircle, Link2Off, SplitSquareHorizontal, Clock,
}

toolIconMap['Image'] = ImageIcon

function getToolIcon(iconName: string): React.ComponentType<{ className?: string }> {
  return toolIconMap[iconName] || Code
}

function ToolIconDisplay({ iconName, className }: { iconName: string; className?: string }) {
  const Icon = toolIconMap[iconName] || Code
  return React.createElement(Icon, { className })
}

/* ── Framer Motion Variants ──────────────────────────────────────────── */
const containerVariants: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
}

const itemVariants: any = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { type: 'spring', stiffness: 200, damping: 22 },
  },
}

const fadeUp: any = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

/* ── Module Colors ───────────────────────────────────────────────────── */
const moduleGradients: Record<string, string> = {
  pdf: 'from-red-500/20 via-orange-500/10 to-amber-500/20',
  image: 'from-emerald-500/20 via-teal-500/10 to-cyan-500/20',
  video: 'from-pink-500/20 via-rose-500/10 to-fuchsia-500/20',
  'dev-seo': 'from-violet-500/20 via-purple-500/10 to-fuchsia-500/20',
  'text-tools': 'from-blue-500/20 via-sky-500/10 to-cyan-500/20',
  generators: 'from-rose-500/20 via-pink-500/10 to-fuchsia-500/20',
  calculators: 'from-amber-500/20 via-orange-500/10 to-yellow-500/20',
}

const moduleIconColors: Record<string, string> = {
  pdf: 'text-red-500 bg-red-50 dark:bg-red-950/30',
  image: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/30',
  video: 'text-pink-500 bg-pink-50 dark:bg-pink-950/30',
  'dev-seo': 'text-violet-500 bg-violet-50 dark:bg-violet-950/30',
  'text-tools': 'text-blue-500 bg-blue-50 dark:bg-blue-950/30',
  generators: 'text-rose-500 bg-rose-50 dark:bg-rose-950/30',
  calculators: 'text-amber-500 bg-amber-50 dark:bg-amber-950/30',
}

const moduleIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  pdf: FileText,
  image: ImageIcon,
  video: Video,
  'dev-seo': Code,
  'text-tools': Type,
  generators: Wand2,
  calculators: Calculator,
}

/* ── Theme Toggle ────────────────────────────────────────────────────── */
function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const t = useTranslations('Common')
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
          {theme === 'dark' ? t('lightMode') : t('darkMode')}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

/* ── Language Selector ───────────────────────────────────────────────── */
function LanguageSelector() {
  const router = useRouter()
  const pathname = usePathname()
  const currentLocale = pathname.split('/')[1] || 'fr'

  const switchLocale = (locale: string) => {
    const segments = pathname.split('/')
    segments[1] = locale
    router.push(segments.join('/'))
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-1.5">
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline text-xs uppercase font-semibold">{currentLocale}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[160px]">
        {routing.locales.map(locale => (
          <DropdownMenuItem
            key={locale}
            onClick={() => switchLocale(locale)}
            className={locale === currentLocale ? 'bg-primary/10 font-semibold' : ''}
          >
            <span className="mr-2 text-base">{locale === 'ar' ? '🇸🇦' : locale === 'de' ? '🇩🇪' : locale === 'en' ? '🇬🇧' : locale === 'es' ? '🇪🇸' : locale === 'fr' ? '🇫🇷' : '🇧🇷'}</span>
            {localeLabels[locale]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

/* ── Module Card ─────────────────────────────────────────────────────── */
function ModuleCard({ module, index }: { module: ReturnType<typeof useTranslatedModules>[0]; index: number }) {
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
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

        <CardContent className="relative p-6 flex flex-col h-full gap-4">
          <div className="flex items-start justify-between">
            <div className={`rounded-2xl p-3 transition-transform duration-300 group-hover:scale-110 ${iconColor}`}>
              <IconComponent className="h-7 w-7" />
            </div>
            <div className="rounded-full p-2 bg-muted/50 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>

          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-1.5 tracking-tight">{module.label}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{module.description}</p>
          </div>

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
  const pathname = usePathname()
  const locale = pathname.split('/')[1] || 'fr'
  const path = getPathForLocale(tool.id, locale)
  const href = path ? `/${locale}/${path.category}/${path.slug}` : `/${locale}`

  return (
    
    <motion.div variants={itemVariants}>
      <Link
        href={href}
        className="group flex flex-col items-center gap-3 p-4 rounded-xl glass-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg w-full text-center card-hover-lift"
      >
        <div className="rounded-xl bg-muted/60 p-2.5 transition-transform duration-300 group-hover:scale-110 group-hover:bg-primary/10">
          <ToolIconDisplay iconName={tool.icon} className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
        </div>
        <div>
          <p className="text-xs font-medium leading-tight">{tool.label}</p>
          <p className="text-[10px] text-muted-foreground mt-0.5">{moduleLabel}</p>
        </div>
      </Link>
    </motion.div>
  )
}

/* ── Module View ─────────────────────────────────────────────────────── */
function ModuleView({ moduleId }: { moduleId: ModuleId }) {
  const { setActiveModule, activeTool, setActiveTool } = useToolsStore()
  const translatedModules = useTranslatedModules()
  const t = useTranslations('Common')

  const mod = translatedModules.find((m) => m.id === moduleId)
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
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setActiveModule('home')}
          className="shrink-0 hover:bg-muted/60"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          {t('home')}
        </Button>
        <div className="h-5 w-px bg-border" />
        <div className={`rounded-lg p-1.5 ${iconColor}`}>
          <IconComponent className="h-4 w-4" />
        </div>
        <h1 className="text-lg font-semibold tracking-tight">{mod.label}</h1>
      </div>

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

      {/* Ad — Above the active tool (dedicated home grid slot) */}
      <AdHomeGrid className="mb-4" />

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
              {t('selectTool')}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* In-Feed Ad — Below the active tool */}
      {activeTool && <AdInFeed className="mt-6" />}
    </motion.div>
  )
}

/* ── Home Page ───────────────────────────────────────────────────────── */
function HomePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const t = useTranslations('Common')
  const translatedModules = useTranslatedModules()

  const filteredTools = useMemo(() => {
    if (!searchQuery.trim()) return []
    const q = searchQuery.toLowerCase()
    return translatedModules.flatMap((mod) =>
      mod.tools
        .filter(
          (tool) =>
            tool.label.toLowerCase().includes(q) ||
            tool.description.toLowerCase().includes(q) ||
            mod.label.toLowerCase().includes(q)
        )
        .map((tool) => ({ ...tool, moduleId: mod.id, moduleLabel: mod.label }))
    )
  }, [searchQuery, translatedModules])

  return (
    <div className="space-y-12">
      {/* Hero */}
      
      <motion.section
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="relative text-center py-8 sm:py-12"
      >
        <div className="absolute inset-0 -z-10 mesh-gradient-strong" />

        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="orb orb-1" />
          <div className="orb orb-2" />
          <div className="orb orb-3" />
        </div>

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
          {t('description', {
            free: t('freeLabel'),
            private: t('privateLabel'),
          })}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="max-w-md mx-auto relative"
        >
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder={t('searchPlaceholder')}
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              // @ts-ignore
              setSearchQuery(e.target.value);
            }}
            className="pl-11 h-12 rounded-xl glass-card border-border/50 focus:border-primary/40 text-base"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-4 mt-8 text-xs text-muted-foreground"
        >
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-card">
            <Shield className="h-3.5 w-3.5 text-emerald-500" />
            <span>{t('private')}</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-card">
            <Zap className="h-3.5 w-3.5 text-amber-500" />
            <span>{t('fastOffline')}</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-card">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span>{t('toolCount')}</span>
          </div>
        </motion.div>
      </motion.section>

      {/* Search Results */}
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
                  {t('toolsFound', { count: filteredTools.length })}
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
                <p className="text-muted-foreground text-sm">
                  {t('noResults', { query: searchQuery })}
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Module Cards */}
      {!searchQuery.trim() && (
        
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          
          <motion.div variants={itemVariants} className="mb-5">
            <h2 className="text-xl font-semibold tracking-tight">{t('categories')}</h2>
            <p className="text-sm text-muted-foreground mt-1">{t('categoriesDesc')}</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {translatedModules.map((mod, i) => (
              <ModuleCard key={mod.id} module={mod} index={i} />
            ))}
          </div>
        </motion.section>
      )}

      {/* In-Feed Ad — Between Categories and All Tools */}
      {!searchQuery.trim() && <AdInFeed className="my-4" />}

      {/* All Tools */}
      {!searchQuery.trim() && (
        
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          
          <motion.div variants={itemVariants} className="mb-5">
            <h2 className="text-xl font-semibold tracking-tight">{t('allTools')}</h2>
            <p className="text-sm text-muted-foreground mt-1">{t('allToolsDesc')}</p>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {translatedModules.flatMap((mod) =>
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

      {/* Leaderboard Ad — Bottom of Homepage */}
      {!searchQuery.trim() && <AdLeaderboard className="mt-8" />}
    </div>
  )
}

/* ── Footer Column ──────────────────────────────────────────────────── */
function FooterColumn({ moduleId, title }: { moduleId: ModuleId; title: string }) {
  const translatedModules = useTranslatedModules()
  const pathname = usePathname()
  const locale = pathname.split('/')[1] || 'fr'
  const mod = translatedModules.find(m => m.id === moduleId)
  if (!mod) return null
  return (
    <div>
      <h3 className="text-sm font-semibold mb-3">{title}</h3>
      <ul className="space-y-2">
        {mod.tools.map(tool => {
          const path = getPathForLocale(tool.id, locale)
          return (
            <li key={tool.id}>
              <Link
                href={path ? `/${locale}/${path.category}/${path.slug}` : `/${locale}`}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {tool.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

/* ── Main App ────────────────────────────────────────────────────────── */
export default function Home() {
  const { activeModule } = useToolsStore()
  const t = useTranslations('Common')
  const tMod = useTranslations('Modules')
  const tFooter = useTranslations('Footer')
  const translatedModules = useTranslatedModules()
  const pathname = usePathname()
  const locale = pathname.split('/')[1] || 'fr'



  return (
    <div className="min-h-screen flex flex-col bg-background relative">
      <div className="fixed inset-0 bg-grid -z-50 pointer-events-none" />
      <div className="fixed inset-0 mesh-gradient -z-40 pointer-events-none" />

      {/* Header */}
      <header className="sticky top-0 z-50 w-full">
        <div className="glass-strong border-b border-border/50">
          <div className="container mx-auto flex h-14 items-center px-4">
            <button
              className="flex items-center gap-2.5 font-bold text-lg mr-auto hover:opacity-80 transition-opacity"
              onClick={() => useToolsStore.getState().setActiveModule('home')}
            >
              <div className="rounded-lg bg-primary/10 p-1.5">
                <Sparkles className="h-4 w-4 text-primary" />
              </div>
              <span className="gradient-text">Utilyx</span>
            </button>

            <nav className="flex items-center gap-1 overflow-x-auto scrollbar-thin -mr-2 pr-2">
              {translatedModules.map((mod) => {
                const IconComponent = moduleIcons[mod.id] || Code
                const isActive = activeModule === mod.id
                return (
                  <Button
                    key={mod.id}
                    variant={isActive ? 'secondary' : 'ghost'}
                    size="sm"
                    className={`
                      text-xs sm:text-sm rounded-lg transition-all duration-200 shrink-0
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
              <div className="w-px h-5 bg-border mx-1.5 shrink-0" />
              <LanguageSelector />
              <ThemeToggle />
            </nav>
          </div>
        </div>
      </header>

      {/* Top Banner Ad — Below Header (Desktop) */}
      <div className="hidden sm:block w-full">
        <AdBanner className="py-2" />
      </div>

      {/* Main Content */}
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

      {/* Footer */}
      <footer className="border-t border-border/50 mt-auto">
        <div className="container mx-auto px-4 py-8 sm:py-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-8 mb-8">
            <div className="col-span-2 sm:col-span-3 lg:col-span-1">
              <div className="flex items-center gap-2 font-bold text-lg mb-3">
                <div className="rounded-lg bg-primary/10 p-1.5">
                  <Sparkles className="h-4 w-4 text-primary" />
                </div>
                <span className="gradient-text">Utilyx</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {tFooter('tagline')}
              </p>
            </div>

            <FooterColumn moduleId="pdf" title={tMod('pdf.label')} />
            <FooterColumn moduleId="image" title={tMod('image.label')} />
            <FooterColumn moduleId="video" title={tMod('video.label')} />
            <FooterColumn moduleId="dev-seo" title={tMod('dev-seo.label')} />
            <FooterColumn moduleId="text-tools" title={tMod('text-tools.label')} />
            <FooterColumn moduleId="generators" title={tMod('generators.label')} />
            <FooterColumn moduleId="calculators" title={tMod('calculators.label')} />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-border/50">
            <p className="text-xs text-muted-foreground">
              {t('copyright', { year: new Date().getFullYear() })}
            </p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <Link href={`/${locale}/privacy`} className="hover:text-foreground transition-colors">{tFooter('privacy')}</Link>
              <Link href={`/${locale}/about`} className="hover:text-foreground transition-colors">{tFooter('about')}</Link>
              <Link href={`/${locale}/terms`} className="hover:text-foreground transition-colors">{tFooter('terms')}</Link>
              <Link href={`/${locale}/contact`} className="hover:text-foreground transition-colors">{tFooter('contact')}</Link>
              <Link href={`/${locale}/mentions-legales`} className="hover:text-foreground transition-colors">{tFooter('legal')}</Link>
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Shield className="h-3 w-3 text-emerald-500" />
                <span>{t('localData')}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="h-3 w-3 text-amber-500" />
                <span>{t('noSignup')}</span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Sticky Bottom Ad — Mobile only */}
      <AdStickyBottom />
    </div>
  )
}

