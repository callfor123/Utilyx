'use client'

import { useTranslations } from 'next-intl'

import { useState, useRef, useCallback, useEffect } from 'react'
import { Database, Play, Copy, Trash2, Table, Download, Upload, Clock, BookOpen, ChevronRight, AlertTriangle, CheckCircle2, RotateCcw, FileSpreadsheet, FileJson, FileCode, Plus, X, Info } from 'lucide-react'
import { toast } from 'sonner'
import { copyToClipboard } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { SqlEngine, isKeyword, type SqlResult } from '@/lib/sql-engine'

interface HistoryEntry {
  query: string
  timestamp: number
  success: boolean
  rowCount?: number
  executionTime?: number
}

const EXAMPLE_QUERIES = [
  { label: 'SELECT basique', query: 'SELECT * FROM utilisateurs;' },
  { label: 'WHERE avec AND', query: "SELECT nom, age, ville FROM utilisateurs WHERE age > 20 AND ville = 'Paris';" },
  { label: 'ORDER BY + LIMIT', query: 'SELECT nom, salaire FROM utilisateurs ORDER BY salaire DESC LIMIT 3;' },
  { label: 'COUNT + GROUP BY', query: 'SELECT ville, COUNT(*) AS nb FROM utilisateurs GROUP BY ville;' },
  { label: 'SUM + AVG', query: 'SELECT categorie, SUM(prix) AS total, AVG(prix) AS moyenne FROM produits GROUP BY categorie;' },
  { label: 'LIKE', query: "SELECT * FROM produits WHERE nom LIKE '%o%';" },
  { label: 'IN', query: "SELECT * FROM utilisateurs WHERE ville IN ('Paris', 'Lyon');" },
  { label: 'BETWEEN', query: 'SELECT * FROM utilisateurs WHERE age BETWEEN 20 AND 30;' },
  { label: 'INSERT', query: "INSERT INTO utilisateurs (nom, age, ville, email, salaire) VALUES ('Bernard', 27, 'Nice', 'bernard@mail.com', 2900);" },
  { label: 'UPDATE', query: "UPDATE utilisateurs SET salaire = 3500 WHERE nom = 'Dupont';" },
  { label: 'DELETE', query: "DELETE FROM utilisateurs WHERE age < 18;" },
  { label: 'CREATE TABLE', query: 'CREATE TABLE salaries (id INT, nom TEXT, departement TEXT, poste TEXT);' },
  { label: 'IS NULL', query: 'SELECT * FROM utilisateurs WHERE email IS NOT NULL;' },
  { label: 'Jointure simulee', query: 'SELECT u.nom, c.date, c.total FROM commandes c, utilisateurs u WHERE c.utilisateur_id = u.id ORDER BY c.date;' },
]

function highlightSql(code: string): React.ReactNode[] {
  const tokens: React.ReactNode[] = []
  const regex = /(--[^\n]*|'[^']*'|\b(?:SELECT|FROM|WHERE|INSERT|INTO|VALUES|UPDATE|SET|DELETE|ORDER|BY|ASC|DESC|LIMIT|OFFSET|AND|OR|NOT|NULL|IS|IN|LIKE|BETWEEN|AS|ON|JOIN|LEFT|RIGHT|INNER|OUTER|GROUP|HAVING|DISTINCT|COUNT|SUM|AVG|MIN|MAX|CREATE|TABLE|DROP|ALTER|ADD|COLUMN|IF|EXISTS|INT|INTEGER|TEXT|VARCHAR|REAL|FLOAT|BOOLEAN|DATE|TIMESTAMP|PRIMARY|KEY|DEFAULT|CHECK|UNIQUE|INDEX|UNION|ALL|CASE|WHEN|THEN|ELSE|END|TRUE|FALSE|CAST|RENAME|TO)\b|[(),;*>=<!<>]|[0-9]+(?:\.[0-9]+)?)/gi
  let lastIndex = 0
  let match: RegExpExecArray | null
  let keyIndex = 0

  while ((match = regex.exec(code)) !== null) {
    if (match.index > lastIndex) {
      tokens.push(code.slice(lastIndex, match.index))
    }
    const val = match[0]
    if (val.startsWith('--')) {
      tokens.push(<span key={keyIndex++} className="text-gray-400 italic">{val}</span>)
    } else if (val.startsWith("'")) {
      tokens.push(<span key={keyIndex++} className="text-emerald-400">{val}</span>)
    } else if (/^\d/.test(val)) {
      tokens.push(<span key={keyIndex++} className="text-amber-400">{val}</span>)
    } else if (isKeyword(val)) {
      tokens.push(<span key={keyIndex++} className="text-violet-400 font-bold">{val}</span>)
    } else if (/^[(),;*>=<!<>]$/.test(val)) {
      tokens.push(<span key={keyIndex++} className="text-sky-300">{val}</span>)
    } else {
      tokens.push(val)
    }
    lastIndex = regex.lastIndex
  }
  if (lastIndex < code.length) {
    tokens.push(code.slice(lastIndex))
  }
  return tokens
}

export function SqlInterpreter() {
  const t = useTranslations('ToolsUI')
  const [sqlCode, setSqlCode] = useState('SELECT * FROM utilisateurs WHERE age > 18 ORDER BY nom;')
  const [result, setResult] = useState<SqlResult | null>(null)
  const [error, setError] = useState('')
  const [history, setHistory] = useState<HistoryEntry[]>([])
  const [showHistory, setShowHistory] = useState(false)
  const [showExamples, setShowExamples] = useState(false)
  const [showSchema, setShowSchema] = useState(false)
  const [searchFilter, setSearchFilter] = useState('')
  
  const engineRef = useRef<SqlEngine>(new SqlEngine())
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleRun = useCallback(() => {
    if (!sqlCode.trim()) return
    setError('')
    setResult(null)

    try {
      const res = engineRef.current.execute(sqlCode)
      setResult(res)
      setHistory(prev => [{
        query: sqlCode.trim(),
        timestamp: Date.now(),
        success: true,
        rowCount: res.affectedRows,
        executionTime: res.executionTime,
      }, ...prev].slice(0, 50))
      toast.success(`${res.affectedRows} ligne(s) affectee(s) — ${res.executionTime}ms`)
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Erreur SQL inconnue'
      setError(msg)
      setHistory(prev => [{
        query: sqlCode.trim(),
        timestamp: Date.now(),
        success: false,
      }, ...prev].slice(0, 50))
      toast.error(msg)
    }
  }, [sqlCode])

  const handleReset = () => {
    engineRef.current = new SqlEngine()
    setResult(null)
    setError('')
    toast.success('Base de donnees reinitialisee')
  }

  const handleExport = (format: 'csv' | 'json' | 'html') => {
    if (!result || result.rows.length === 0) {
      toast.error('Aucun resultat a exporter')
      return
    }
    let content = ''
    let filename = ''
    let mime = ''

    if (format === 'csv') {
      const header = result.columns.join(',')
      const rows = result.rows.map(r => result.columns.map(c => JSON.stringify(String(r[c] ?? ''))).join(','))
      content = [header, ...rows].join('\n')
      filename = 'resultat_sql.csv'
      mime = 'text/csv'
    } else if (format === 'json') {
      content = JSON.stringify(result.rows, null, 2)
      filename = 'resultat_sql.json'
      mime = 'application/json'
    } else {
      content = `<!DOCTYPE html><html><head><title>Resultat SQL</title><style>body{font-family:sans-serif;padding:20px}table{border-collapse:collapse;width:100%}th,td{border:1px solid #ddd;padding:8px;text-align:left}th{background:#f5f5f5}tr:nth-child(even){background:#fafafa}</style></head><body><h2>Resultat SQL</h2><table><thead><tr>${result.columns.map(c => `<th>${c}</th>`).join('')}</tr></thead><tbody>${result.rows.map(r => `<tr>${result.columns.map(c => `<td>${String(r[c] ?? '')}</td>`).join('')}</tr>`).join('')}</tbody></table><p><em>${result.rows.length} ligne(s) — ${result.executionTime}ms</em></p></body></html>`
      filename = 'resultat_sql.html'
      mime = 'text/html'
    }

    const blob = new Blob([content], { type: mime })
    const url = URL.createObjectURL(blob)
    // @ts-ignore
    const a = globalThis.document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
    toast.success(`Export ${format.toUpperCase()} telecharge`)
  }

  const handleImport = useCallback(async (file: File) => {
    const ext = file.name.split('.').pop()?.toLowerCase()
    try {
      if (ext === 'csv') {
        const text = await file.text()
        const lines = text.split('\n').filter(l => l.trim())
        if (lines.length < 1) throw new Error('Fichier CSV vide')
        const sep = lines[0].includes('\t') ? '\t' : lines[0].includes(';') ? ';' : ','
        const columns = lines[0].split(sep).map(c => c.trim().replace(/^"|"$/g, '').toLowerCase().replace(/[^a-z0-9_]/g, '_'))
        const rows = lines.slice(1).map(line => {
          const vals = line.split(sep).map(v => v.trim().replace(/^"|"$/g, ''))
          const row: Record<string, unknown> = {}
          columns.forEach((col, i) => {
            const num = Number(vals[i])
            row[col] = vals[i] === '' ? null : (!isNaN(num) && vals[i] !== '' ? num : vals[i])
          })
          return row
        })
        const tableName = file.name.replace(/\.\w+$/, '').toLowerCase().replace(/[^a-z0-9_]/g, '_')
        const imported = engineRef.current.importTable(tableName, [...columns], rows)
        toast.success(`Table "${imported}" importee : ${rows.length} lignes, ${columns.length} colonnes`)
      } else if (ext === 'xlsx' || ext === 'xls') {
        const XLSX = await import('xlsx')
        const buffer = await file.arrayBuffer()
        const wb = XLSX.read(buffer, { type: 'array' })
        const sheetName = wb.SheetNames[0]
        const ws = wb.Sheets[sheetName]
        const data = XLSX.utils.sheet_to_json<Record<string, unknown>>(ws)
        if (data.length === 0) throw new Error('Feuille vide')
        const columns = Object.keys(data[0])
        const tableName = file.name.replace(/\.\w+$/, '').toLowerCase().replace(/[^a-z0-9_]/g, '_')
        const imported = engineRef.current.importTable(tableName, columns, data)
        toast.success(`Table "${imported}" importee : ${data.length} lignes depuis "${sheetName}"`)
      } else {
        throw new Error('Format non supporte. Utilisez .csv, .xlsx ou .xls')
      }
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Erreur import')
    }
  }, [])

  useEffect(() => {
    const input = fileInputRef.current as any
    if (!input) return
    const handler = (e: Event) => {
      const target = e.target as any
      if ((target as any).files?.[0]) handleImport((target as any).files[0])
      ;(target as any).value = ''
    }
    input.addEventListener('change', handler)
    return () => input.removeEventListener('change', handler)
  }, [handleImport])

  const filteredRows = searchFilter && result
    ? result.rows.filter(r => result.columns.some(c => String(r[c] ?? '').toLowerCase().includes(searchFilter.toLowerCase())))
    : result?.rows ?? []

  const tableNames = engineRef.current.getTableNames()

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Interpreteur SQL Interactif
          </CardTitle>
          <CardDescription>
            Executez des requetes SQL (SELECT, INSERT, UPDATE, DELETE) sur une base simulee. Importez CSV/XLSX, exportez les resultats.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Editeur SQL</label>
              <div className="flex gap-1">
                <button onClick={() => setShowSchema(!showSchema)} className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-all bg-muted/60 text-muted-foreground hover:bg-muted/80">
                  <Info className="h-3 w-3" /> Schema
                </button>
                <button onClick={() => setShowExamples(!showExamples)} className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-all bg-muted/60 text-muted-foreground hover:bg-muted/80">
                  <BookOpen className="h-3 w-3" /> Exemples
                </button>
                <button onClick={() => setShowHistory(!showHistory)} className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-all bg-muted/60 text-muted-foreground hover:bg-muted/80">
                  <Clock className="h-3 w-3" /> Historique {history.length > 0 && `(${history.length})`}
                </button>
              </div>
            </div>
            <div className="rounded-lg border overflow-hidden">
              <div className="bg-gray-900 px-4 py-1.5 border-b flex items-center justify-between">
                <span className="text-xs text-gray-400 font-mono">SQL</span>
                <div className="flex items-center gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                  <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
                </div>
              </div>
              <div className="relative">
                <pre className="absolute inset-0 p-3 font-mono text-sm leading-6 overflow-auto pointer-events-none whitespace-pre-wrap break-all" aria-hidden="true">
                  {highlightSql(sqlCode)}
                </pre>
                <Textarea
                  value={sqlCode}
                  onChange={(e) => setSqlCode((e.target as any).value)}
                  className="min-h-[150px] font-mono text-sm leading-6 resize-y bg-transparent text-transparent caret-white dark:caret-white selection:bg-violet-500/30 p-3 border-0 focus-visible:ring-0"
                  spellCheck={false}
                />
              </div>
            </div>
          </div>

          {showSchema && (
            <div className="rounded-lg border bg-muted/30 p-3 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Schema de la base</h4>
                <button onClick={() => setShowSchema(false)}><X className="h-3.5 w-3.5 text-muted-foreground hover:text-foreground" /></button>
              </div>
              {tableNames.map(name => {
                const t = engineRef.current.getTableInfo(name)
                if (!t) return null
                return (
                  <div key={name} className="flex items-start gap-2">
                    <ChevronRight className="h-3.5 w-3.5 mt-0.5 text-muted-foreground" />
                    <div>
                      <span className="text-sm font-mono font-semibold text-violet-500">{name}</span>
                      <span className="text-xs text-muted-foreground ml-2">({t.rows.length} lignes)</span>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {t.columns.map(c => (
                          <span key={c} className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-muted/60 text-muted-foreground">{c}{c === t.columns[0] ? ' PK' : ''}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {showExamples && (
            <div className="rounded-lg border bg-muted/30 p-3 space-y-1.5">
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Exemples de requetes</h4>
                <button onClick={() => setShowExamples(false)}><X className="h-3.5 w-3.5 text-muted-foreground hover:text-foreground" /></button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {EXAMPLE_QUERIES.map((ex, i) => (
                  <button
                    key={i}
                    onClick={() => { setSqlCode(ex.query); setShowExamples(false) }}
                    className="text-left px-2.5 py-1.5 rounded-lg text-xs font-mono bg-muted/40 hover:bg-primary/10 hover:text-primary transition-all truncate"
                  >
                    <span className="text-muted-foreground mr-1.5 font-sans">{ex.label}:</span> {ex.query}
                  </button>
                ))}
              </div>
            </div>
          )}

          {showHistory && (
            <div className="rounded-lg border bg-muted/30 p-3 space-y-1.5">
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Historique ({history.length})</h4>
                <div className="flex gap-2">
                  {history.length > 0 && (
                    <button onClick={() => { setHistory([]); toast.success('Historique efface') }} className="text-[10px] text-muted-foreground hover:text-red-500">Effacer</button>
                  )}
                  <button onClick={() => setShowHistory(false)}><X className="h-3.5 w-3.5 text-muted-foreground hover:text-foreground" /></button>
                </div>
              </div>
              {history.length === 0 ? (
                <p className="text-xs text-muted-foreground py-2 text-center">Aucune requete dans l'historique</p>
              ) : (
                <div className="max-h-[200px] overflow-y-auto space-y-1">
                  {history.map((h, i) => (
                    <button
                      key={i}
                      onClick={() => { setSqlCode(h.query); setShowHistory(false) }}
                      className="w-full text-left flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs hover:bg-muted/50 transition-all"
                    >
                      {h.success
                        ? <CheckCircle2 className="h-3 w-3 text-emerald-500 shrink-0" />
                        : <AlertTriangle className="h-3 w-3 text-red-500 shrink-0" />
                      }
                      <span className="font-mono truncate flex-1">{h.query}</span>
                      {h.executionTime !== undefined && (
                        <span className="text-[10px] text-muted-foreground shrink-0">{h.executionTime}ms</span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            <Button onClick={handleRun} disabled={!sqlCode.trim()}>
              <Play className="h-4 w-4 mr-1.5" />
              Executer
            </Button>
            <Button variant="outline" onClick={() => { setSqlCode(''); setResult(null); setError('') }}>
              <Trash2 className="h-4 w-4 mr-1.5" />
              Effacer
            </Button>
            <Button variant="outline" onClick={() => { copyToClipboard(sqlCode); toast.success('SQL copie !') }} disabled={!sqlCode.trim()}>
              <Copy className="h-4 w-4 mr-1.5" />
              Copier
            </Button>
            <Button variant="outline" onClick={handleReset}>
              <RotateCcw className="h-4 w-4 mr-1.5" />
              Reset DB
            </Button>
            <Button variant="outline" onClick={() => (fileInputRef.current as any)?.click()}>
              <Upload className="h-4 w-4 mr-1.5" />
              Importer
            </Button>
            <input ref={fileInputRef} type="file" accept=".csv,.xlsx,.xls" className="hidden" />
          </div>

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/30 p-3 flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-red-600 dark:text-red-400 font-medium">Erreur SQL</p>
                <p className="text-sm text-red-500 dark:text-red-300 font-mono mt-1">{error}</p>
              </div>
            </div>
          )}

          {result && (
            <div className="space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-3">
                  <label className="text-sm font-medium flex items-center gap-1.5">
                    <Table className="h-4 w-4" />
                    Resultats
                  </label>
                  <span className="text-xs text-muted-foreground bg-muted/60 px-2 py-0.5 rounded-full">
                    {filteredRows.length} ligne(s) • {result.executionTime}ms
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    placeholder={t("filterResults")}
                    value={searchFilter}
                    onChange={(e) => setSearchFilter((e.target as any).value)}
                    className="h-7 text-xs w-40"
                  />
                  <div className="flex gap-1">
                    <button onClick={() => handleExport('csv')} className="p-1.5 rounded-lg hover:bg-muted/60 transition-all text-muted-foreground hover:text-foreground" title={t("exportCsv")}>
                      <FileSpreadsheet className="h-4 w-4" />
                    </button>
                    <button onClick={() => handleExport('json')} className="p-1.5 rounded-lg hover:bg-muted/60 transition-all text-muted-foreground hover:text-foreground" title={t("exportJson")}>
                      <FileJson className="h-4 w-4" />
                    </button>
                    <button onClick={() => handleExport('html')} className="p-1.5 rounded-lg hover:bg-muted/60 transition-all text-muted-foreground hover:text-foreground" title={t("exportHtml")}>
                      <FileCode className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="text-left p-2.5 font-medium text-muted-foreground w-8">#</th>
                      {result.columns.map(col => (
                        <th key={col} className="text-left p-2.5 font-medium">{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRows.slice(0, 100).map((row, i) => (
                      <tr key={i} className="border-b last:border-0 hover:bg-muted/20 transition-colors">
                        <td className="p-2.5 text-muted-foreground text-xs">{i + 1}</td>
                        {result.columns.map(col => (
                          <td key={col} className="p-2.5 font-mono text-xs">
                            {row[col] === null ? <span className="text-muted-foreground italic">NULL</span> : String(row[col])}
                          </td>
                        ))}
                      </tr>
                    ))}
                    {filteredRows.length > 100 && (
                      <tr>
                        <td colSpan={result.columns.length + 1} className="p-2.5 text-center text-xs text-muted-foreground">
                          ... et {filteredRows.length - 100} lignes supplementaires
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => handleExport('csv')} className="text-xs">
                  <Download className="h-3 w-3 mr-1" /> CSV
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleExport('json')} className="text-xs">
                  <Download className="h-3 w-3 mr-1" /> JSON
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleExport('html')} className="text-xs">
                  <Download className="h-3 w-3 mr-1" /> HTML
                </Button>
              </div>
            </div>
          )}

          <div className="rounded-lg border bg-muted/30 p-3">
            <div className="flex items-center gap-4 text-xs text-muted-foreground flex-wrap">
              <span className="flex items-center gap-1"><Database className="h-3 w-3" /> {tableNames.length} tables</span>
              <span className="flex items-center gap-1"><Plus className="h-3 w-3" /> CRUD complet</span>
              <span className="flex items-center gap-1"><Upload className="h-3 w-3" /> Import CSV/XLSX</span>
              <span className="flex items-center gap-1"><Download className="h-3 w-3" /> Export CSV/JSON/HTML</span>
              <span className="flex items-center gap-1"><AlertTriangle className="h-3 w-3" /> Protection anti-injection</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}