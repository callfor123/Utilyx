'use client'

import { useCallback, useState, useRef } from 'react'
import { Upload, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DropZoneProps {
  accept: string
  multiple?: boolean
  onFiles: (files: File[]) => void
  maxSize?: number // in MB
  className?: string
  label?: string
  sublabel?: string
  icon?: React.ReactNode
}

export function DropZone({
  accept,
  multiple = false,
  onFiles,
  maxSize = 100,
  className,
  label = 'Glissez-déposez vos fichiers ici',
  sublabel = 'ou cliquez pour parcourir',
  icon,
}: DropZoneProps) {
  const [isDragging, setIsDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(false)
      const files = Array.from(e.dataTransfer.files).filter(
        (f) => f.size <= maxSize * 1024 * 1024
      )
      if (files.length > 0) onFiles(files)
    },
    [onFiles, maxSize]
  )

  const handleClick = useCallback(() => {
    inputRef.current?.click()
  }, [])

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []).filter(
        (f) => f.size <= maxSize * 1024 * 1024
      )
      if (files.length > 0) onFiles(files)
      if (inputRef.current) inputRef.current.value = ''
    },
    [onFiles, maxSize]
  )

  return (
    <div
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={cn(
        'relative flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-10 transition-all cursor-pointer hover:border-primary/50 hover:bg-muted/30',
        isDragging ? 'border-primary bg-primary/5 scale-[1.02]' : 'border-muted-foreground/25',
        className
      )}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleChange}
        className="hidden"
      />
      <div className="rounded-full bg-muted p-4 text-muted-foreground">
        {icon || <Upload className="h-8 w-8" />}
      </div>
      <div className="text-center">
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-muted-foreground mt-1">{sublabel}</p>
      </div>
      <p className="text-[10px] text-muted-foreground/60">
        Taille max : {maxSize} MB
      </p>
    </div>
  )
}

interface FileListProps {
  files: File[]
  onRemove?: (index: number) => void
  className?: string
}

export function FileList({ files, onRemove, className }: FileListProps) {
  if (files.length === 0) return null
  return (
    <div className={cn('space-y-2', className)}>
      {files.map((file, i) => (
        <div
          key={`${file.name}-${i}`}
          className="flex items-center gap-3 rounded-lg border bg-muted/30 px-3 py-2 text-sm"
        >
          <div className="flex-1 min-w-0">
            <p className="truncate font-medium">{file.name}</p>
            <p className="text-xs text-muted-foreground">
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
          {onRemove && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                onRemove(i)
              }}
              className="rounded-full p-1 hover:bg-muted"
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          )}
        </div>
      ))}
    </div>
  )
}
