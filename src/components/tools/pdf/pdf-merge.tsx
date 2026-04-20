'use client'

import { useState, useCallback, useEffect } from 'react'
import {
  FileText,
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
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,

interface PdfFileItem {
  file: File
  pageCount: number
  id: string
}

function SortableItem({
  item,
  onRemove,
}: {
  item: PdfFileItem
  onRemove: () => void
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'flex items-center gap-3 rounded-lg border bg-muted/30 px-3 py-2.5 text-sm transition-shadow',
        isDragging && 'shadow-lg ring-2 ring-primary/20 z-50'
      )}
    >
      <button
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing rounded p-0.5 hover:bg-muted touch-none"
        aria-label="Glisser pour réordonner"
      >
        <GripVertical className="h-4 w-4 text-muted-foreground" />
      </button>
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
          onRemove()
        }}
        className="rounded-full p-1 hover:bg-muted transition-colors"
        aria-label="Supprimer"
      >
        <X className="h-4 w-4 text-muted-foreground hover:text-destructive" />
      </button>
    </div>
  )
}

export function PdfMerge() {
  const [files, setFiles] = useState<PdfFileItem[]>([])
  const [isMerging, setIsMerging] = useState(false)
  const [loadingPages, setLoadingPages] = useState(true)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    })
  )

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

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event
    if (over && active.id !== over.id) {
      setFiles((prev) => {
        const oldIndex = prev.findIndex((f) => f.id === active.id)
        const newIndex = prev.findIndex((f) => f.id === over.id)
        return arrayMove(prev, oldIndex, newIndex)
      })
    }
  }, [])

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
      const blob = new Blob([mergedBytes], { type: 'application/pdf' })
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
            label="Glissez-déposez vos PDF ici"
            sublabel="ou cliquez pour ajouter des fichiers"
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
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                >
                  <SortableContext
                    items={files.map((f) => f.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    <div className="space-y-2 max-h-96 overflow-y-auto">
                      {files.map((item) => (
                        <SortableItem
                          key={item.id}
                          item={item}
                          onRemove={() => handleRemove(item.id)}
                        />
                      ))}
                    </div>
                  </SortableContext>
                </DndContext>
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
