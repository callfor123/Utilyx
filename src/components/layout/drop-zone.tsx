'use client'

import { useCallback, useState, useRef } from 'react'
import { Upload, X, AlertCircle, FileUp } from 'lucide-react'
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

function isValidFileType(file: File, accept: string): boolean {
  if (!accept) return true
  const types = accept.split(',').map(t => t.trim().toLowerCase())
  const ext = '.' + file.name.split('.').pop()?.toLowerCase()
  const mime = file.type.toLowerCase()

  return types.some(t => {
    if (t.startsWith('.')) return ext === t
    if (t.endsWith('/*')) return mime.startsWith(t.replace('/*', '/'))
    return mime === t
  })
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
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const clearError = useCallback(() => {
    if (error) setError(null)
  }, [error])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
    clearError()
  }, [clearError])

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
      const allFiles = Array.from(e.dataTransfer.files)

      // Check for invalid file types
      const invalidFiles = allFiles.filter(f => !isValidFileType(f, accept))
      if (invalidFiles.length > 0) {
        const exts = [...new Set(invalidFiles.map(f => f.name.split('.').pop()?.toUpperCase()))].join(', ')
        setError(`Format non supporté : ${exts}. Formats acceptés : ${accept}`)
        return
      }

      const files = allFiles.filter(f => f.size <= maxSize * 1024 * 1024)
      const oversized = allFiles.filter(f => f.size > maxSize * 1024 * 1024)
      if (oversized.length > 0) {
        setError(`Fichier trop volumineux (max ${maxSize} MB)`)
      }
      if (files.length > 0) {
        setError(null)
        onFiles(files)
      }
    },
    [onFiles, maxSize, accept]
  )

  const handleClick = useCallback(() => {
    clearError()
    inputRef.current?.click()
  }, [clearError])

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const allFiles = Array.from(e.target.files || [])

      // Check for invalid file types
      const invalidFiles = allFiles.filter(f => !isValidFileType(f, accept))
      if (invalidFiles.length > 0) {
        const exts = [...new Set(invalidFiles.map(f => f.name.split('.').pop()?.toUpperCase()))].join(', ')
        setError(`Format non supporté : ${exts}. Formats acceptés : ${accept}`)
        if (inputRef.current) inputRef.current.value = ''
        return
      }

      const files = allFiles.filter(f => f.size <= maxSize * 1024 * 1024)
      const oversized = allFiles.filter(f => f.size > maxSize * 1024 * 1024)
      if (oversized.length > 0) {
        setError(`Fichier trop volumineux (max ${maxSize} MB)`)
      }
      if (files.length > 0) {
        setError(null)
        onFiles(files)
      }
      if (inputRef.current) inputRef.current.value = ''
    },
    [onFiles, maxSize, accept]
  )

  return (
    <div
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={cn(
        'relative flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-6 sm:p-10 transition-all duration-300 cursor-pointer',
        isDragging
          ? 'border-primary bg-primary/10 scale-[1.02] shadow-lg shadow-primary/20 ring-2 ring-primary/30'
          : error
            ? 'border-destructive/50 bg-destructive/5 hover:border-destructive/70 hover:bg-destructive/10'
            : 'border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/30',
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
      <div className={cn(
        'rounded-full p-4 transition-all duration-300',
        isDragging
          ? 'bg-primary/20 text-primary scale-110'
          : error
            ? 'bg-destructive/10 text-destructive'
            : 'bg-muted text-muted-foreground'
      )}>
        {icon || (isDragging ? <FileUp className="h-8 w-8" /> : error ? <AlertCircle className="h-8 w-8" /> : <Upload className="h-8 w-8" />)}
      </div>
      <div className="text-center">
        <p className={cn(
          'text-sm font-medium transition-colors',
          isDragging ? 'text-primary' : error ? 'text-destructive' : ''
        )}>
          {isDragging ? 'Déposez vos fichiers ici' : label}
        </p>
        <p className="text-xs text-muted-foreground mt-1">{sublabel}</p>
      </div>
      {error ? (
        <p className="text-xs text-destructive font-medium animate-in fade-in slide-in-from-top-1 duration-200">
          {error}
        </p>
      ) : (
        <p className="text-[10px] text-muted-foreground/60">
          Taille max : {maxSize} MB
        </p>
      )}
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
          className="flex items-center gap-3 rounded-lg border bg-muted/30 px-3 py-2 text-sm animate-in fade-in slide-in-from-bottom-1 duration-200"
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
              className="rounded-full p-1 hover:bg-muted transition-colors"
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          )}
        </div>
      ))}
    </div>
  )
}