'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import {
  Type,
  PenTool,
  ImagePlus,
  Download,
  ChevronLeft,
  ChevronRight,
  Trash2,
  X,
  Eraser,
  Check,
  FileText,
  MousePointer,
} from 'lucide-react'
import { toast } from 'sonner'
import { cn, formatFileSize, downloadBlob } from '@/lib/utils'
import { DropZone } from '@/components/layout/drop-zone'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Separator } from '@/components/ui/separator'
import { Slider } from '@/components/ui/slider'
import { Textarea } from '@/components/ui/textarea'
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'

// ── Types ────────────────────────────────────────────────────────────
interface SignatureElement {
  id: string
  type: 'text' | 'draw' | 'image'
  x: number // percentage 0-100
  y: number // percentage 0-100
  width: number // percentage
  height: number // percentage
  content: string // text content OR data URL for draw/image
  pageNumber: number
  fontSize?: number
}

type ToolMode = 'select' | 'text' | 'draw' | 'image'

// ── Helper ───────────────────────────────────────────────────────────
let idCounter = 0
function uid(): string {
  return `el-${Date.now()}-${++idCounter}`
}

// ── Component ────────────────────────────────────────────────────────
export function PdfSign() {
  // File state
  const [file, setFile] = useState<File | null>(null)
  const [numPages, setNumPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [pdfJsReady, setPdfJsReady] = useState(false)

  // Canvas refs
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // pdfjs references (loaded dynamically to avoid SSR issues)
  const pdfDocRef = useRef<any>(null)

  // Elements
  const [elements, setElements] = useState<SignatureElement[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)

  // Tool
  const [activeTool, setActiveTool] = useState<ToolMode>('select')

  // Dialogs
  const [textDialogOpen, setTextDialogOpen] = useState(false)
  const [textInput, setTextInput] = useState('')
  const [textFontSize, setTextFontSize] = useState(14)
  const [pendingTextPos, setPendingTextPos] = useState<{ x: number; y: number } | null>(null)

  const [drawDialogOpen, setDrawDialogOpen] = useState(false)
  const drawCanvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const drawCtxRef = useRef<CanvasRenderingContext2D | null>(null)

  const imageInputRef = useRef<HTMLInputElement>(null)

  // Drag & Resize
  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const dragOffsetRef = useRef({ x: 0, y: 0 })
  const resizeStartRef = useRef({ x: 0, y: 0, w: 0, h: 0, elId: '' })

  // ── Load pdfjs-dist dynamically (client-only) ─────────────────────
  const pdfjsRef = useRef<any>(null)

  useEffect(() => {
    let cancelled = false
    async function loadPdfJs() {
      try {
        const pdfjsLib = await import('pdfjs-dist/legacy/build/pdf.mjs')
        if (cancelled) return
        // Load worker via fetch + Blob URL to avoid CSP/path issues in standalone mode
        try {
          const resp = await fetch('/pdf.worker.min.mjs')
          if (resp.ok) {
            const workerText = await resp.text()
            const blob = new Blob([workerText], { type: 'text/javascript' })
            pdfjsLib.GlobalWorkerOptions.workerSrc = URL.createObjectURL(blob)
          } else {
            // Fallback: direct path
            pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs'
          }
        } catch {
          // Fetch failed — worker will run on main thread (fake worker)
          pdfjsLib.GlobalWorkerOptions.workerSrc = ''
        }
        pdfjsRef.current = pdfjsLib
        setPdfJsReady(true)
      } catch (err) {
        console.error('Failed to load pdfjs-dist:', err)
        toast.error('Erreur de chargement du lecteur PDF. Veuillez rafraîchir la page.')
      }
    }
    loadPdfJs()
    return () => { cancelled = true }
  }, [])

  // ── Load PDF ────────────────────────────────────────────────────
  const loadPdf = useCallback(
    async (f: File) => {
      try {
        setLoading(true)
        const pdfjsLib = pdfjsRef.current || await import('pdfjs-dist/legacy/build/pdf.mjs')
        pdfjsRef.current = pdfjsLib
        const buffer = await f.arrayBuffer()
        const doc = await pdfjsLib.getDocument({ data: new Uint8Array(buffer) }).promise
        pdfDocRef.current = doc
        setNumPages(doc.numPages)
        setCurrentPage(1)
        setElements([])
        setSelectedId(null)
        setActiveTool('select')
        toast.success('PDF chargé avec succès')
      } catch (err) {
        console.error('PDF load error:', err)
        toast.error('Impossible de charger le PDF. Vérifiez que le fichier est valide.')
      } finally {
        setLoading(false)
      }
    },
    []
  )

  // ── Render Page ─────────────────────────────────────────────────
  const renderPage = useCallback(async () => {
    const pdfDoc = pdfDocRef.current
    if (!pdfDoc || !canvasRef.current) return
    try {
      setLoading(true)
      const page = await pdfDoc.getPage(currentPage)
      const scale = 1.5
      const viewport = page.getViewport({ scale })

      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')!
      canvas.width = viewport.width
      canvas.height = viewport.height
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      await page.render({ canvasContext: ctx, viewport }).promise
    } catch (err) {
      console.error('Render error:', err)
      toast.error('Erreur lors du rendu de la page')
    } finally {
      setLoading(false)
    }
  }, [currentPage])

  useEffect(() => {
    if (pdfDocRef.current) {
      renderPage()
    }
  }, [renderPage])

  // ── File handlers ───────────────────────────────────────────────
  const handleFiles = useCallback(
    (files: File[]) => {
      if (files.length === 0) return
      const f = files[0]
      if (f.type !== 'application/pdf') {
        toast.error('Veuillez sélectionner un fichier PDF')
        return
      }
      setFile(f)
      loadPdf(f)
    },
    [loadPdf]
  )

  const handleRemoveFile = useCallback(() => {
    setFile(null)
    pdfDocRef.current = null
    setNumPages(0)
    setCurrentPage(1)
    setElements([])
    setSelectedId(null)
  }, [])

  // ── Page navigation ────────────────────────────────────────────
  const goPrev = useCallback(() => {
    setCurrentPage((p) => Math.max(1, p - 1))
    setSelectedId(null)
  }, [])

  const goNext = useCallback(() => {
    setCurrentPage((p) => Math.min(numPages, p + 1))
    setSelectedId(null)
  }, [numPages])

  // ── Current page elements ───────────────────────────────────────
  const pageElements = elements.filter((el) => el.pageNumber === currentPage)
  const selectedElement = elements.find((el) => el.id === selectedId) || null

  // ── Update element ──────────────────────────────────────────────
  const updateElement = useCallback((id: string, updates: Partial<SignatureElement>) => {
    setElements((prev) => prev.map((el) => (el.id === id ? { ...el, ...updates } : el)))
  }, [])

  const deleteElement = useCallback(
    (id: string) => {
      setElements((prev) => prev.filter((el) => el.id !== id))
      if (selectedId === id) setSelectedId(null)
      toast.info('Élément supprimé')
    },
    [selectedId]
  )

  // ── Click on overlay (for text placement) ───────────────────────
  const handleOverlayClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (activeTool !== 'text') return
      const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect()
      const xPct = ((e.clientX - rect.left) / rect.width) * 100
      const yPct = ((e.clientY - rect.top) / rect.height) * 100
      setPendingTextPos({ x: xPct, y: yPct })
      setTextDialogOpen(true)
    },
    [activeTool]
  )

  // ── Text dialog confirm ─────────────────────────────────────────
  const confirmText = useCallback(() => {
    if (!textInput.trim() || !pendingTextPos) {
      setTextDialogOpen(false)
      return
    }
    const newEl: SignatureElement = {
      id: uid(),
      type: 'text',
      x: pendingTextPos.x,
      y: pendingTextPos.y,
      width: 20,
      height: 5,
      content: textInput.trim(),
      pageNumber: currentPage,
      fontSize: textFontSize,
    }
    setElements((prev) => [...prev, newEl])
    setSelectedId(newEl.id)
    setTextDialogOpen(false)
    setTextInput('')
    setActiveTool('select')
    toast.success('Texte ajouté')
  }, [textInput, pendingTextPos, currentPage, textFontSize])

  // ── Draw dialog ─────────────────────────────────────────────────
  const openDrawDialog = useCallback(() => {
    setDrawDialogOpen(true)
  }, [])

  useEffect(() => {
    if (drawDialogOpen && drawCanvasRef.current) {
      const canvas = drawCanvasRef.current
      const ctx = canvas.getContext('2d')!
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.strokeStyle = '#111111'
      ctx.lineWidth = 2
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      drawCtxRef.current = ctx
    }
  }, [drawDialogOpen])

  const clearDrawCanvas = useCallback(() => {
    const canvas = drawCanvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.strokeStyle = '#111111'
    ctx.lineWidth = 2
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    drawCtxRef.current = ctx
  }, [])

  const getDrawPos = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = drawCanvasRef.current!
      const rect = canvas.getBoundingClientRect()
      return {
        x: ((e.clientX - rect.left) / rect.width) * canvas.width,
        y: ((e.clientY - rect.top) / rect.height) * canvas.height,
      }
    },
    []
  )

  const onDrawStart = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      setIsDrawing(true)
      const ctx = drawCtxRef.current
      if (!ctx) return
      const pos = getDrawPos(e)
      ctx.beginPath()
      ctx.moveTo(pos.x, pos.y)
    },
    [getDrawPos]
  )

  const onDrawMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!isDrawing || !drawCtxRef.current) return
      const pos = getDrawPos(e)
      drawCtxRef.current.lineTo(pos.x, pos.y)
      drawCtxRef.current.stroke()
    },
    [isDrawing, getDrawPos]
  )

  const onDrawEnd = useCallback(() => {
    setIsDrawing(false)
  }, [])

  const confirmDraw = useCallback(() => {
    const canvas = drawCanvasRef.current
    if (!canvas) return
    const dataUrl = canvas.toDataURL('image/png')
    const newEl: SignatureElement = {
      id: uid(),
      type: 'draw',
      x: 30,
      y: 50,
      width: 25,
      height: 12,
      content: dataUrl,
      pageNumber: currentPage,
    }
    setElements((prev) => [...prev, newEl])
    setSelectedId(newEl.id)
    setDrawDialogOpen(false)
    setActiveTool('select')
    toast.success('Dessin ajouté')
  }, [currentPage])

  // ── Image tool ──────────────────────────────────────────────────
  const handleImageClick = useCallback(() => {
    imageInputRef.current?.click()
  }, [])

  const handleImageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const imgFile = e.target.files?.[0]
      if (!imgFile) return
      const reader = new FileReader()
      reader.onload = () => {
        const dataUrl = reader.result as string
        const newEl: SignatureElement = {
          id: uid(),
          type: 'image',
          x: 30,
          y: 50,
          width: 20,
          height: 20,
          content: dataUrl,
          pageNumber: currentPage,
        }
        setElements((prev) => [...prev, newEl])
        setSelectedId(newEl.id)
        setActiveTool('select')
        toast.success('Image ajoutée')
      }
      reader.readAsDataURL(imgFile)
      if (imageInputRef.current) imageInputRef.current.value = ''
    },
    [currentPage]
  )

  // ── Drag handlers ───────────────────────────────────────────────
  const handleElementMouseDown = useCallback(
    (e: React.MouseEvent, elId: string) => {
      if (activeTool !== 'select') return
      e.stopPropagation()
      setSelectedId(elId)

      const el = elements.find((el) => el.id === elId)
      if (!el || !containerRef.current) return

      const containerRect = containerRef.current.getBoundingClientRect()
      const mouseX = ((e.clientX - containerRect.left) / containerRect.width) * 100
      const mouseY = ((e.clientY - containerRect.top) / containerRect.height) * 100

      dragOffsetRef.current = {
        x: mouseX - el.x,
        y: mouseY - el.y,
      }
      setIsDragging(true)
    },
    [activeTool, elements]
  )

  const handleResizeMouseDown = useCallback(
    (e: React.MouseEvent, elId: string) => {
      e.stopPropagation()
      e.preventDefault()
      const el = elements.find((el) => el.id === elId)
      if (!el) return

      resizeStartRef.current = {
        x: e.clientX,
        y: e.clientY,
        w: el.width,
        h: el.height,
        elId,
      }
      setIsResizing(true)
    },
    [elements]
  )

  useEffect(() => {
    if (!isDragging && !isResizing) return

    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect()
        const mouseX = ((e.clientX - containerRect.left) / containerRect.width) * 100
        const mouseY = ((e.clientY - containerRect.top) / containerRect.height) * 100

        updateElement(selectedId!, {
          x: Math.max(0, Math.min(95, mouseX - dragOffsetRef.current.x)),
          y: Math.max(0, Math.min(95, mouseY - dragOffsetRef.current.y)),
        })
      }

      if (isResizing) {
        const { x: startX, y: startY, w: startW, h: startH, elId } = resizeStartRef.current
        const container = containerRef.current
        if (!container) return
        const containerRect = container.getBoundingClientRect()

        const dxPct = ((e.clientX - startX) / containerRect.width) * 100
        const dyPct = ((e.clientY - startY) / containerRect.height) * 100

        updateElement(elId, {
          width: Math.max(3, startW + dxPct),
          height: Math.max(2, startH + dyPct),
        })
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
      setIsResizing(false)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, isResizing, selectedId, updateElement])

  // ── Touch events for mobile drag ────────────────────────────────
  const handleTouchStart = useCallback(
    (e: React.TouchEvent, elId: string) => {
      if (activeTool !== 'select') return
      e.stopPropagation()
      setSelectedId(elId)

      const el = elements.find((el) => el.id === elId)
      if (!el || !containerRef.current) return

      const touch = e.touches[0]
      const containerRect = containerRef.current.getBoundingClientRect()
      const mouseX = ((touch.clientX - containerRect.left) / containerRect.width) * 100
      const mouseY = ((touch.clientY - containerRect.top) / containerRect.height) * 100

      dragOffsetRef.current = {
        x: mouseX - el.x,
        y: mouseY - el.y,
      }
      setIsDragging(true)
    },
    [activeTool, elements]
  )

  const handleTouchResizeStart = useCallback(
    (e: React.TouchEvent, elId: string) => {
      e.stopPropagation()
      const el = elements.find((el) => el.id === elId)
      if (!el) return

      const touch = e.touches[0]
      resizeStartRef.current = {
        x: touch.clientX,
        y: touch.clientY,
        w: el.width,
        h: el.height,
        elId,
      }
      setIsResizing(true)
    },
    [elements]
  )

  useEffect(() => {
    if (!isDragging && !isResizing) return

    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging && containerRef.current) {
        const touch = e.touches[0]
        const containerRect = containerRef.current.getBoundingClientRect()
        const mouseX = ((touch.clientX - containerRect.left) / containerRect.width) * 100
        const mouseY = ((touch.clientY - containerRect.top) / containerRect.height) * 100

        updateElement(selectedId!, {
          x: Math.max(0, Math.min(95, mouseX - dragOffsetRef.current.x)),
          y: Math.max(0, Math.min(95, mouseY - dragOffsetRef.current.y)),
        })
      }

      if (isResizing) {
        const { x: startX, y: startY, w: startW, h: startH, elId } = resizeStartRef.current
        const container = containerRef.current
        if (!container) return
        const containerRect = container.getBoundingClientRect()
        const touch = e.touches[0]

        const dxPct = ((touch.clientX - startX) / containerRect.width) * 100
        const dyPct = ((touch.clientY - startY) / containerRect.height) * 100

        updateElement(elId, {
          width: Math.max(3, startW + dxPct),
          height: Math.max(2, startH + dyPct),
        })
      }
    }

    const handleTouchEnd = () => {
      setIsDragging(false)
      setIsResizing(false)
    }

    window.addEventListener('touchmove', handleTouchMove, { passive: false })
    window.addEventListener('touchend', handleTouchEnd)
    return () => {
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [isDragging, isResizing, selectedId, updateElement])

  // ── Export / Download ───────────────────────────────────────────
  const handleExport = useCallback(async () => {
    if (!file) return
    try {
      toast.info('Génération du PDF en cours...')

      const pdfBytes = await file.arrayBuffer()
      const pdfDocLib = await PDFDocument.load(pdfBytes)
      const font = await pdfDocLib.embedFont(StandardFonts.Helvetica)
      const pages = pdfDocLib.getPages()

      // Group elements by page
      const elementsByPage = new Map<number, SignatureElement[]>()
      elements.forEach((el) => {
        const list = elementsByPage.get(el.pageNumber) || []
        list.push(el)
        elementsByPage.set(el.pageNumber, list)
      })

      for (const [pageNum, pageElements] of elementsByPage) {
        const pageIdx = pageNum - 1
        if (pageIdx < 0 || pageIdx >= pages.length) continue
        const page = pages[pageIdx]
        const { width: pw, height: ph } = page.getSize()

        for (const el of pageElements) {
          const pdfX = (el.x / 100) * pw
          // PDF y is bottom-up, overlay y is top-down
          const pdfY = ph - (el.y / 100) * ph
          const pdfW = (el.width / 100) * pw
          const pdfH = (el.height / 100) * ph

          if (el.type === 'text') {
            const pdfFontSize = (el.height / 100) * ph * 0.7
            page.drawText(el.content, {
              x: pdfX,
              y: pdfY - pdfFontSize,
              size: Math.max(6, pdfFontSize),
              font,
              color: rgb(0, 0, 0),
            })
          } else if (el.type === 'draw' || el.type === 'image') {
            try {
              const base64Data = el.content.split(',')[1]
              if (!base64Data) continue
              const imageBytes = Uint8Array.from(atob(base64Data), (c) => c.charCodeAt(0))
              const image = await pdfDocLib.embedPng(imageBytes)
              page.drawImage(image, {
                x: pdfX,
                y: pdfY - pdfH,
                width: pdfW,
                height: pdfH,
              })
            } catch (imgErr) {
              console.error('Failed to embed image:', imgErr)
              toast.error(`Erreur d'intégration d'image page ${pageNum}`)
            }
          }
        }
      }

      const modifiedBytes = await pdfDocLib.save()
      const blob = new Blob([modifiedBytes], { type: 'application/pdf' })
      const fileName = file.name.replace(/\.pdf$/i, '') + '-signe.pdf'
      downloadBlob(blob, fileName)
      toast.success('PDF signé téléchargé !')
    } catch (err) {
      console.error('Export error:', err)
      toast.error('Erreur lors de la génération du PDF signé')
    }
  }, [file, elements])

  // ── Tool buttons ────────────────────────────────────────────────
  const tools: { mode: ToolMode; icon: React.ReactNode; label: string }[] = [
    { mode: 'select', icon: <MousePointer className="h-4 w-4" />, label: 'Sélection' },
    { mode: 'text', icon: <Type className="h-4 w-4" />, label: 'Texte' },
    { mode: 'draw', icon: <PenTool className="h-4 w-4" />, label: 'Dessiner' },
    { mode: 'image', icon: <ImagePlus className="h-4 w-4" />, label: 'Image' },
  ]

  // ── Loading state while pdfjs loads ────────────────────────────
  if (!pdfJsReady) {
    return (
      <Card className="w-full">
        <CardContent className="flex flex-col items-center justify-center py-16 gap-4">
          <div className="relative">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />
            <div className="absolute inset-0 animate-ping rounded-full bg-primary/10" />
          </div>
          <p className="text-sm text-muted-foreground">Chargement du lecteur PDF...</p>
        </CardContent>
      </Card>
    )
  }

  // ── Upload state ──────────────────────────────────────────────
  if (!file || !pdfDocRef.current) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Signer un PDF
          </CardTitle>
          <CardDescription>
            Importez un PDF, ajoutez du texte, un dessin ou une image signature, puis
            téléchargez le document signé.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DropZone
            accept=".pdf"
            multiple={false}
            onFiles={handleFiles}
            maxSize={50}
            label="Glissez-déposez votre PDF ici"
            sublabel="ou cliquez pour parcourir"
            icon={<FileText className="h-8 w-8" />}
          />
        </CardContent>
      </Card>
    )
  }

  return (
    <TooltipProvider delayDuration={300}>
      <Card className="w-full">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-lg">
                <FileText className="h-5 w-5" />
                Signer un PDF
              </CardTitle>
              <CardDescription className="mt-1">
                {file.name} — {formatFileSize(file.size)}
              </CardDescription>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRemoveFile}
              className="text-muted-foreground hover:text-destructive"
            >
              <X className="h-4 w-4 mr-1" />
              Changer
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* ── Toolbar ────────────────────────────────────────── */}
          <div className="flex flex-wrap items-center gap-2">
            {tools.map(({ mode, icon, label }) => (
              <Tooltip key={mode}>
                <TooltipTrigger asChild>
                  <Button
                    variant={activeTool === mode ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => {
                      setActiveTool(mode)
                      if (mode === 'draw') openDrawDialog()
                      if (mode === 'image') handleImageClick()
                      if (mode === 'text') {
                        toast.info('Cliquez sur le PDF pour placer le texte')
                      }
                    }}
                    className="gap-1.5"
                  >
                    {icon}
                    <span className="hidden sm:inline">{label}</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>{label}</TooltipContent>
              </Tooltip>
            ))}

            <Separator orientation="vertical" className="h-6 mx-1 hidden sm:block" />

            {/* Page navigation */}
            <div className="flex items-center gap-1.5 ml-auto">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                disabled={currentPage <= 1}
                onClick={goPrev}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium min-w-[80px] text-center">
                Page {currentPage} / {numPages}
              </span>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                disabled={currentPage >= numPages}
                onClick={goNext}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* ── PDF Viewer with overlay ────────────────────────── */}
          <div
            ref={containerRef}
            className={cn(
              'relative mx-auto overflow-hidden rounded-lg border bg-muted/20',
              activeTool === 'text' && 'cursor-crosshair',
              activeTool === 'select' && 'cursor-default'
            )}
            style={{ maxWidth: 800 }}
            onClick={handleOverlayClick}
          >
            {loading && (
              <div className="absolute inset-0 z-30 flex items-center justify-center bg-background/60 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                  Chargement...
                </div>
              </div>
            )}

            <canvas ref={canvasRef} className="block w-full h-auto" />

            {/* Overlay elements */}
            {pageElements.map((el) => (
              <div
                key={el.id}
                className={cn(
                  'absolute group',
                  selectedId === el.id ? 'ring-2 ring-primary' : 'hover:ring-2 hover:ring-primary/50'
                )}
                style={{
                  left: `${el.x}%`,
                  top: `${el.y}%`,
                  width: `${el.width}%`,
                  height: `${el.height}%`,
                }}
                onMouseDown={(e) => handleElementMouseDown(e, el.id)}
                onTouchStart={(e) => handleTouchStart(e, el.id)}
              >
                {el.type === 'text' && (
                  <div
                    className="w-full h-full flex items-start overflow-hidden pointer-events-none select-none"
                    style={{ fontSize: `${Math.max(8, (el.height / 100) * (containerRef.current?.clientHeight || 400) * 0.6)}px` }}
                  >
                    <span className="whitespace-pre-wrap break-all leading-tight text-black">
                      {el.content}
                    </span>
                  </div>
                )}
                {(el.type === 'draw' || el.type === 'image') && (
                  <img
                    src={el.content}
                    alt={el.type === 'draw' ? 'Dessin' : 'Signature'}
                    className="w-full h-full object-contain pointer-events-none"
                    draggable={false}
                  />
                )}

                {/* Selected controls */}
                {selectedId === el.id && (
                  <>
                    <button
                      className="absolute -top-2 -right-2 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-destructive-foreground shadow-sm hover:scale-110 transition-transform"
                      onClick={(e) => {
                        e.stopPropagation()
                        deleteElement(el.id)
                      }}
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>

                    <div
                      className="absolute bottom-0 right-0 z-10 h-3 w-3 cursor-se-resize bg-primary rounded-tl-sm"
                      onMouseDown={(e) => handleResizeMouseDown(e, el.id)}
                      onTouchStart={(e) => handleTouchResizeStart(e, el.id)}
                    />
                  </>
                )}
              </div>
            ))}
          </div>

          {/* ── Element info bar ───────────────────────────────── */}
          {selectedElement && (
            <div className="flex items-center justify-between rounded-lg border bg-muted/30 px-4 py-2 text-sm">
              <span className="text-muted-foreground">
                <span className="font-medium text-foreground capitalize">
                  {selectedElement.type === 'draw'
                    ? 'Dessin'
                    : selectedElement.type === 'image'
                    ? 'Image'
                    : 'Texte'}
                </span>{' '}
                sélectionné — Page {selectedElement.pageNumber}
              </span>
              <Button
                variant="ghost"
                size="sm"
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={() => deleteElement(selectedElement.id)}
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Supprimer
              </Button>
            </div>
          )}

          {/* ── Export button ──────────────────────────────────── */}
          <Button
            onClick={handleExport}
            className="w-full gap-2"
            disabled={elements.length === 0}
            size="lg"
          >
            <Download className="h-4 w-4" />
            Appliquer et Télécharger
          </Button>

          {elements.length === 0 && (
            <p className="text-center text-xs text-muted-foreground">
              Utilisez les outils ci-dessus pour ajouter du texte, un dessin ou une image sur le PDF
            </p>
          )}
        </CardContent>
      </Card>

      {/* ── Text Dialog ──────────────────────────────────────────── */}
      <Dialog open={textDialogOpen} onOpenChange={setTextDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Ajouter du texte</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="sign-text-input">Contenu du texte</Label>
              <Textarea
                id="sign-text-input"
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="Entrez votre texte ici..."
                rows={3}
                autoFocus
              />
            </div>
            <div className="space-y-2">
              <Label>Taille du texte : {textFontSize}px</Label>
              <Slider
                value={[textFontSize]}
                onValueChange={([v]) => setTextFontSize(v)}
                min={8}
                max={48}
                step={1}
              />
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setTextDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={confirmText} disabled={!textInput.trim()}>
              <Check className="h-4 w-4 mr-1" />
              Ajouter
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Draw Dialog ──────────────────────────────────────────── */}
      <Dialog open={drawDialogOpen} onOpenChange={setDrawDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Dessiner votre signature</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center gap-3 py-2">
            <div className="rounded-lg border bg-white p-1">
              <canvas
                ref={drawCanvasRef}
                width={450}
                height={200}
                className="block rounded cursor-crosshair touch-none"
                style={{ maxWidth: '100%', height: 'auto' }}
                onMouseDown={onDrawStart}
                onMouseMove={onDrawMove}
                onMouseUp={onDrawEnd}
                onMouseLeave={onDrawEnd}
              />
            </div>
            <Button variant="outline" size="sm" onClick={clearDrawCanvas} className="gap-1.5">
              <Eraser className="h-4 w-4" />
              Effacer
            </Button>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setDrawDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={confirmDraw}>
              <Check className="h-4 w-4 mr-1" />
              Valider
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Hidden image input */}
      <input
        ref={imageInputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        className="hidden"
        onChange={handleImageChange}
      />
    </TooltipProvider>
  )
}
