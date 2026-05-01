'use client'

import { useTranslations } from 'next-intl'

import { useState, useCallback, useRef } from 'react'
import {
  GripVertical,
  X,
  Merge,
  Loader2,
  Plus,
  RotateCcw,
} from 'lucide-react'
import { PDFDocument } from 'pdf-lib'
import { toast } from 'sonner'
import { cn, formatFileSize, downloadBlob } from '@/lib/utils'
import { DropZone } from '@/components/layout/drop-zone'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface PdfFileItem {
  file: File
  pageCount: number
  id: string
}

function SortableItem({
  item,
  index,
  onRemove,
  onDragStart,
  onDragOver,
  onDrop,
  isDragging,
  t,
}: {
  item: PdfFileItem
  index: number
  onRemove: (id: string) => void
  onDragStart: (e: React.DragEvent<HTMLDivElement>, index: number) => void
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void
  onDrop: (e: React.DragEvent<HTMLDivElement>, index: number) => void
  isDragging: boolean
  t: (key: string) => string
}) {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, index)}
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, index)}
      className={cn(
        'flex items-center gap-3 rounded-lg border bg-muted/30 px-3 py-2.5 text-sm transition-shadow',
        isDragging && 'shadow-lg ring-2 ring-primary/20 opacity-50'
      )}
    >
      <div className="cursor-grab active:cursor-grabbing rounded p-0.5 hover:bg-muted touch-none">
        <GripVertical className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="truncate font-medium">{item.file.name}</p>
        <p className="text-xs text-muted-foreground">
          {formatFileSize(item.file.size)} · {item.pageCount}{' '}
          {item.pageCount > 1 ? 'pages' : 'page'}
        </p>
      </div>
      <Badge variant="secondary" className="text-xs">
        {item.pageCount}p
      </Badge>
      <button
        onClick={(e) => {
          e.stopPropagation()
          onRemove(item.id)
        }}
        className="rounded-full p-1 hover:bg-muted transition-colors"
        aria-label={t("delete")}
      >
        <X className="h-4 w-4 text-muted-foreground hover:text-destructive" />
      </button>
    </div>
  )
}

export function PdfMerge() {
  const t = useTranslations('ToolsUI')
  const [files, setFiles] = useState<PdfFileItem[]>([])
  const [isMerging, setIsMerging] = useState(false)
  const [loadingPages, setLoadingPages] = useState(true)
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)

  const dragItem = useRef<number | null>(null)
  const dragOverItem = useRef<number | null>(null)

  const totalPages = files.reduce((sum, f) => sum + f.pageCount, 0)

  const loadPageCount = async (file: File): Promise<number> => {
    try {
      const arrayBuffer = await file.arrayBuffer()
      const doc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true })
      return doc.getPageCount()
    } catch {
      return 0
    }
  }

  const handleFiles = useCallback(
    async (newFiles: File[]) => {
      const pdfFiles = newFiles.filter(
        (f) => f.type === 'application/pdf' || f.name.endsWith('.pdf')
      )
      if (pdfFiles.length === 0) {
        toast.error('Veuillez sélectionner des fichiers PDF valides.')
        return
      }

      setLoadingPages(true)
      const items: PdfFileItem[] = []

      for (const f of pdfFiles) {
        const pageCount = await loadPageCount(f)
        items.push({
          file: f,
          pageCount,
          id: `${f.name}-${f.size}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        })
      }

      setFiles((prev) => [...prev, ...items])
      setLoadingPages(false)
    },
    []
  )

  const handleRemove = useCallback((id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id))
  }, [])

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    dragItem.current = index
    setDraggedIndex(index)
    const dt = e.dataTransfer as any
    dt.effectAllowed = 'move'
    dt.setData('text/plain', index.toString())
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const dt = e.dataTransfer as any
    dt.dropEffect = 'move'
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault()
    setDraggedIndex(null)

    if (dragItem.current === null) return

    dragOverItem.current = index

    const newFiles = [...files]
    const draggedItem = newFiles[dragItem.current]

    // Remove the dragged item
    newFiles.splice(dragItem.current, 1)
    // Insert the dragged item at the new position
    newFiles.splice(dragOverItem.current, 0, draggedItem)

    setFiles(newFiles)

    // Reset
    dragItem.current = null
    dragOverItem.current = null
  }

  const handleMerge = async () => {
    if (files.length < 2) {
      toast.error('Ajoutez au moins 2 fichiers PDF pour fusionner.')
      return
    }

    setIsMerging(true)
    try {
      const mergedDoc = await PDFDocument.create()

      for (const item of files) {
        const arrayBuffer = await item.file.arrayBuffer()
        const srcDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true })
        const pages = await mergedDoc.copyPages(srcDoc, srcDoc.getPageIndices())
        pages.forEach((page) => mergedDoc.addPage(page))
      }

      const mergedBytes = await mergedDoc.save()
      const blob = new Blob([new Uint8Array(mergedBytes) as BlobPart], { type: 'application/pdf' })
      downloadBlob(blob, 'document_fusionné.pdf')

      toast.success(
        `Fusion terminée ! ${mergedDoc.getPageCount()} pages combinées.`
      )
    } catch (error) {
      console.error('Merge error:', error)
      toast.error("Erreur lors de la fusion des PDF.")
    } finally {
      setIsMerging(false)
    }
  }

  const handleReset = () => {
    setFiles([])
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Merge className="h-5 w-5" />
            Fusion PDF
          </CardTitle>
          <CardDescription>
            Fusionnez plusieurs fichiers PDF en un seul document. Réorganisez l&apos;ordre par glisser-déposer.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Drop zone */}
          <DropZone
            accept=".pdf"
            multiple
            onFiles={handleFiles}
            maxSize={100}
            label={t("dropPdfs")}
            sublabel={t("orClickAdd")}
            icon={<Plus className="h-8 w-8" />}
          />

          {/* File list */}
          {files.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">
                  {files.length} fichier{files.length > 1 ? 's' : ''} ·{' '}
                  {totalPages} pages au total
                </p>
                <Button variant="ghost" size="sm" onClick={handleReset}>
                  <RotateCcw className="h-4 w-4 mr-1" />
                  Réinitialiser
                </Button>
              </div>

              {loadingPages ? (
                <div className="flex items-center justify-center py-6 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Chargement des pages...
                </div>
              ) : (
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {files.map((item, index) => (
                    <SortableItem
                      key={item.id}
                      item={item}
                      index={index}
                      onRemove={handleRemove}
                      onDragStart={handleDragStart}
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                      isDragging={draggedIndex === index}
                      t={t}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Merge button */}
          <Button
            onClick={handleMerge}
            disabled={isMerging || files.length < 2 || loadingPages}
            className="w-full"
            size="lg"
          >
            {isMerging ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Fusion en cours...
              </>
            ) : (
              <>
                <Merge className="h-4 w-4 mr-2" />
                Fusionner et Télécharger
              </>
            )}
          </Button>

          {files.length > 0 && files.length < 2 && (
            <p className="text-xs text-center text-muted-foreground">
              Ajoutez au moins un autre fichier PDF pour fusionner.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}