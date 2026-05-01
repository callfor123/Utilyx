'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import { useTranslations } from 'next-intl'
import { Sparkles } from 'lucide-react'
import type { ToolId } from '@/lib/tools-store'

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

/* ── Lazy tool component map (all ssr: false because they use browser APIs) ── */
const toolComponentMap: Record<ToolId, React.ComponentType> = {
  'pdf-compress': dynamic(() => import('@/components/tools/pdf/pdf-compress').then(m => m.PdfCompress), { ssr: false, loading: () => <ToolLoader label="PDF Compress" /> }),
  'pdf-merge': dynamic(() => import('@/components/tools/pdf/pdf-merge').then(m => m.PdfMerge), { ssr: false, loading: () => <ToolLoader label="PDF Merge" /> }),
  'pdf-convert': dynamic(() => import('@/components/tools/pdf/pdf-convert').then(m => m.PdfConvert), { ssr: false, loading: () => <ToolLoader label="PDF Convert" /> }),
  'pdf-sign': dynamic(() => import('@/components/tools/pdf/pdf-sign').then(m => m.PdfSign), { ssr: false, loading: () => <ToolLoader label="PDF Sign" /> }),
  'pdf-unlock': dynamic(() => import('@/components/tools/pdf/pdf-unlock').then(m => m.PdfUnlock), { ssr: false, loading: () => <ToolLoader label="PDF Unlock" /> }),
  'pdf-protect': dynamic(() => import('@/components/tools/pdf/pdf-protect').then(m => m.PdfProtect), { ssr: false, loading: () => <ToolLoader label="PDF Protect" /> }),
  'img-convert': dynamic(() => import('@/components/tools/image/img-convert').then(m => m.ImgConvert), { ssr: false, loading: () => <ToolLoader label="Image Convert" /> }),
  'img-compress': dynamic(() => import('@/components/tools/image/img-compress').then(m => m.ImgCompress), { ssr: false, loading: () => <ToolLoader label="Image Compress" /> }),
  'img-resize': dynamic(() => import('@/components/tools/image/img-resize').then(m => m.ImgResize), { ssr: false, loading: () => <ToolLoader label="Image Resize" /> }),
  'img-bgremove': dynamic(() => import('@/components/tools/image/img-bgremove').then(m => m.ImgBgRemove), { ssr: false, loading: () => <ToolLoader label="BG Remove" /> }),
  'img-ocr': dynamic(() => import('@/components/tools/image/img-ocr').then(m => m.ImageOcr), { ssr: false, loading: () => <ToolLoader label="OCR Text" /> }),
  'heic-to-jpg': dynamic(() => import('@/components/tools/image/heic-to-jpg').then(m => m.HeicToJpg), { ssr: false, loading: () => <ToolLoader label="HEIC to JPG" /> }),
  'favicon-generator': dynamic(() => import('@/components/tools/image/favicon-generator').then(m => m.FaviconGenerator), { ssr: false, loading: () => <ToolLoader label="Favicon Generator" /> }),
  'youtube-thumbnail': dynamic(() => import('@/components/tools/image/youtube-thumbnail').then(m => m.YoutubeThumbnailDownloader), { ssr: false, loading: () => <ToolLoader label="YouTube Thumbnail" /> }),
  'img-color-extractor': dynamic(() => import('@/components/tools/image/img-color-extractor').then(m => m.ImgColorExtractor), { ssr: false, loading: () => <ToolLoader label="Color Extractor" /> }),
  'json-csv': dynamic(() => import('@/components/tools/dev-seo/json-csv').then(m => m.JsonCsv), { ssr: false, loading: () => <ToolLoader label="JSON CSV" /> }),
  'regex-tester': dynamic(() => import('@/components/tools/dev-seo/regex-tester').then(m => m.RegexTester), { ssr: false, loading: () => <ToolLoader label="Regex Tester" /> }),
  'meta-tags': dynamic(() => import('@/components/tools/dev-seo/meta-tags').then(m => m.MetaTags), { ssr: false, loading: () => <ToolLoader label="Meta Tags" /> }),
  'sitemap-robots': dynamic(() => import('@/components/tools/dev-seo/sitemap-robots').then(m => m.SitemapRobots), { ssr: false, loading: () => <ToolLoader label="Sitemap Robots" /> }),
  'json-formatter': dynamic(() => import('@/components/tools/dev-seo/json-formatter').then(m => m.JsonFormatter), { ssr: false, loading: () => <ToolLoader label="JSON Formatter" /> }),
  'url-encode-decode': dynamic(() => import('@/components/tools/dev-seo/url-encode-decode').then(m => m.UrlEncodeDecode), { ssr: false, loading: () => <ToolLoader label="URL Encode Decode" /> }),
  'css-gradient-generator': dynamic(() => import('@/components/tools/dev-seo/css-gradient-generator').then(m => m.CssGradientGenerator), { ssr: false, loading: () => <ToolLoader label="CSS Gradient" /> }),
  'markdown-preview': dynamic(() => import('@/components/tools/dev-seo/markdown-preview').then(m => m.MarkdownPreview), { ssr: false, loading: () => <ToolLoader label="Markdown Preview" /> }),
  'word-counter': dynamic(() => import('@/components/tools/text-tools/word-counter').then(m => m.WordCounter), { ssr: false, loading: () => <ToolLoader label="Word Counter" /> }),
  'case-converter': dynamic(() => import('@/components/tools/text-tools/case-converter').then(m => m.CaseConverter), { ssr: false, loading: () => <ToolLoader label="Case Converter" /> }),
  'lorem-ipsum-generator': dynamic(() => import('@/components/tools/text-tools/lorem-ipsum-generator').then(m => m.LoremIpsumGenerator), { ssr: false, loading: () => <ToolLoader label="Lorem Ipsum" /> }),
  'base64-encode-decode': dynamic(() => import('@/components/tools/text-tools/base64-encode-decode').then(m => m.Base64EncodeDecode), { ssr: false, loading: () => <ToolLoader label="Base64" /> }),
  'text-diff-checker': dynamic(() => import('@/components/tools/text-tools/text-diff-checker').then(m => m.TextDiffChecker), { ssr: false, loading: () => <ToolLoader label="Text Diff" /> }),
  'qr-code-generator': dynamic(() => import('@/components/tools/generators/qr-code-generator').then(m => m.QrCodeGenerator), { ssr: false, loading: () => <ToolLoader label="QR Code" /> }),
  'password-generator': dynamic(() => import('@/components/tools/generators/password-generator').then(m => m.PasswordGenerator), { ssr: false, loading: () => <ToolLoader label="Password Generator" /> }),
  'uuid-generator': dynamic(() => import('@/components/tools/generators/uuid-generator').then(m => m.UuidGenerator), { ssr: false, loading: () => <ToolLoader label="UUID Generator" /> }),
  'hash-generator': dynamic(() => import('@/components/tools/generators/hash-generator').then(m => m.HashGenerator), { ssr: false, loading: () => <ToolLoader label="Hash Generator" /> }),
  'color-picker': dynamic(() => import('@/components/tools/generators/color-picker').then(m => m.ColorPicker), { ssr: false, loading: () => <ToolLoader label="Color Picker" /> }),
  'color-converter': dynamic(() => import('@/components/tools/generators/color-converter'), { ssr: false, loading: () => <ToolLoader label="Color Converter" /> }),
  'bmi-calculator': dynamic(() => import('@/components/tools/calculators/bmi-calculator').then(m => m.BmiCalculator), { ssr: false, loading: () => <ToolLoader label="BMI Calculator" /> }),
  'age-calculator': dynamic(() => import('@/components/tools/calculators/age-calculator').then(m => m.AgeCalculator), { ssr: false, loading: () => <ToolLoader label="Age Calculator" /> }),
  'percentage-calculator': dynamic(() => import('@/components/tools/calculators/percentage-calculator').then(m => m.PercentageCalculator), { ssr: false, loading: () => <ToolLoader label="Percentage Calculator" /> }),
  'unit-converter': dynamic(() => import('@/components/tools/calculators/unit-converter').then(m => m.UnitConverter), { ssr: false, loading: () => <ToolLoader label="Unit Converter" /> }),
  'video-trim': dynamic(() => import('@/components/tools/video/video-trim').then(m => m.VideoTrim), { ssr: false, loading: () => <ToolLoader label="Video Trim" /> }),
  'video-add-audio': dynamic(() => import('@/components/tools/video/video-add-audio').then(m => m.VideoAddAudio), { ssr: false, loading: () => <ToolLoader label="Video Add Audio" /> }),
  'video-convert': dynamic(() => import('@/components/tools/video/video-convert').then(m => m.VideoConvert), { ssr: false, loading: () => <ToolLoader label="Video Convert" /> }),
  'video-compress': dynamic(() => import('@/components/tools/video/video-compress').then(m => m.VideoCompress), { ssr: false, loading: () => <ToolLoader label="Video Compress" /> }),
  'video-extract-audio': dynamic(() => import('@/components/tools/video/video-extract-audio').then(m => m.VideoExtractAudio), { ssr: false, loading: () => <ToolLoader label="Video Extract Audio" /> }),
  'video-to-gif': dynamic(() => import('@/components/tools/video/video-to-gif').then(m => m.VideoToGif), { ssr: false, loading: () => <ToolLoader label="Video to GIF" /> }),
  'video-remove-audio': dynamic(() => import('@/components/tools/video/video-remove-audio').then(m => m.VideoRemoveAudio), { ssr: false, loading: () => <ToolLoader label="Video Remove Audio" /> }),
  'whatsapp-link': dynamic(() => import('@/components/tools/generators/whatsapp-link'), { ssr: false, loading: () => <ToolLoader label="WhatsApp Link" /> }),
  'name-splitter': dynamic(() => import('@/components/tools/text-tools/name-splitter'), { ssr: false, loading: () => <ToolLoader label="Name Splitter" /> }),
  'url-cleaner': dynamic(() => import('@/components/tools/text-tools/url-cleaner'), { ssr: false, loading: () => <ToolLoader label="URL Cleaner" /> }),
  'concrete-calculator': dynamic(() => import('@/components/tools/calculators/concrete-calculator'), { ssr: false, loading: () => <ToolLoader label="Concrete Calculator" /> }),
  'mileage-calculator': dynamic(() => import('@/components/tools/calculators/mileage-calculator'), { ssr: false, loading: () => <ToolLoader label="Mileage Calculator" /> }),
  'stopwatch': dynamic(() => import('@/components/tools/calculators/stopwatch'), { ssr: false, loading: () => <ToolLoader label="Stopwatch" /> }),
  'pomodoro-timer': dynamic(() => import('@/components/tools/calculators/pomodoro-timer'), { ssr: false, loading: () => <ToolLoader label="Pomodoro Timer" /> }),
  'vat-calculator': dynamic(() => import('@/components/tools/calculators/vat-calculator').then(m => m.VatCalculator), { ssr: false, loading: () => <ToolLoader label="VAT Calculator" /> }),
  'discount-calculator': dynamic(() => import('@/components/tools/calculators/discount-calculator').then(m => m.DiscountCalculator), { ssr: false, loading: () => <ToolLoader label="Discount Calculator" /> }),
  'tip-calculator': dynamic(() => import('@/components/tools/calculators/tip-calculator').then(m => m.TipCalculator), { ssr: false, loading: () => <ToolLoader label="Tip Calculator" /> }),
  'random-number-generator': dynamic(() => import('@/components/tools/generators/random-number-generator').then(m => m.RandomNumberGenerator), { ssr: false, loading: () => <ToolLoader label="Random Number" /> }),
  'time-converter': dynamic(() => import('@/components/tools/calculators/time-converter').then(m => m.TimeConverter), { ssr: false, loading: () => <ToolLoader label="Time Converter" /> }),
  'html-interpreter': dynamic(() => import('@/components/tools/dev-seo/html-interpreter').then(m => m.HtmlInterpreter), { ssr: false, loading: () => <ToolLoader label="HTML Interpreter" /> }),
  'css-interpreter': dynamic(() => import('@/components/tools/dev-seo/css-interpreter').then(m => m.CssInterpreter), { ssr: false, loading: () => <ToolLoader label="CSS Interpreter" /> }),
  'js-interpreter': dynamic(() => import('@/components/tools/dev-seo/js-interpreter').then(m => m.JsInterpreter), { ssr: false, loading: () => <ToolLoader label="JS Console" /> }),
  'sql-interpreter': dynamic(() => import('@/components/tools/dev-seo/sql-interpreter').then(m => m.SqlInterpreter), { ssr: false, loading: () => <ToolLoader label="SQL Interpreter" /> }),
  'regex-interpreter': dynamic(() => import('@/components/tools/dev-seo/regex-interpreter').then(m => m.RegexInterpreter), { ssr: false, loading: () => <ToolLoader label="Regex Visualizer" /> }),
  'markdown-interpreter': dynamic(() => import('@/components/tools/dev-seo/markdown-interpreter').then(m => m.MarkdownInterpreter), { ssr: false, loading: () => <ToolLoader label="Markdown Live" /> }),
  'img-to-pdf': dynamic(() => import('@/components/tools/pdf/img-to-pdf').then(m => m.ImgToPdf), { ssr: false, loading: () => <ToolLoader label="Image to PDF" /> }),
  'loan-calculator': dynamic(() => import('@/components/tools/calculators/loan-calculator').then(m => m.LoanCalculator), { ssr: false, loading: () => <ToolLoader label="Loan Calculator" /> }),
  'code-minifier': dynamic(() => import('@/components/tools/dev-seo/code-minifier').then(m => m.CodeMinifier), { ssr: false, loading: () => <ToolLoader label="Code Minifier" /> }),
  'json-yaml-converter': dynamic(() => import('@/components/tools/dev-seo/json-yaml-converter').then(m => m.JsonYamlConverter), { ssr: false, loading: () => <ToolLoader label="JSON YAML" /> }),
  'color-palette-generator': dynamic(() => import('@/components/tools/generators/color-palette-generator').then(m => m.ColorPaletteGenerator), { ssr: false, loading: () => <ToolLoader label="Color Palette" /> }),
}

export function ToolRenderer({ toolId }: { toolId: ToolId }) {
  const t = useTranslations('Common')
  const Component = toolComponentMap[toolId]
  if (!Component) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3 text-center">
        <Sparkles className="h-8 w-8 text-muted-foreground/50" />
        <p className="text-muted-foreground text-sm">{t('comingSoon')}</p>
      </div>
    )
  }
  return <Component />
}
