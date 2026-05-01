export interface SqlResult {
  columns: string[]
  rows: Record<string, unknown>[]
  affectedRows: number
  executionTime: number
}

export interface SqlTable {
  name: string
  columns: string[]
  rows: Record<string, unknown>[]
  autoIncrement: number
}

const FORBIDDEN_PATTERNS = [
  /;\s*DROP\s+/i,
  /;\s*ALTER\s+/i,
  /;\s*CREATE\s+USER/i,
  /;\s*GRANT\s+/i,
  /;\s*SHUTDOWN/i,
  /;\s*LOAD\s+EXTENSION/i,
  /\bATTACH\b\s+DATABASE/i,
  /\bDETACH\b\s+DATABASE/i,
  /x'[0-9a-f]*'/i,
]

const SQL_KEYWORDS = new Set([
  'SELECT', 'FROM', 'WHERE', 'INSERT', 'INTO', 'VALUES', 'UPDATE', 'SET',
  'DELETE', 'ORDER', 'BY', 'ASC', 'DESC', 'LIMIT', 'OFFSET', 'AND', 'OR',
  'NOT', 'NULL', 'IS', 'IN', 'LIKE', 'BETWEEN', 'AS', 'ON', 'JOIN',
  'LEFT', 'RIGHT', 'INNER', 'OUTER', 'GROUP', 'HAVING', 'DISTINCT',
  'COUNT', 'SUM', 'AVG', 'MIN', 'MAX', 'CREATE', 'TABLE', 'DROP',
  'ALTER', 'ADD', 'COLUMN', 'PRIMARY', 'KEY', 'FOREIGN', 'REFERENCES',
  'DEFAULT', 'CHECK', 'UNIQUE', 'INDEX', 'IF', 'EXISTS', 'RENAME', 'TO',
  'INT', 'INTEGER', 'TEXT', 'VARCHAR', 'REAL', 'FLOAT', 'BOOLEAN', 'DATE', 'TIMESTAMP',
  'UNION', 'ALL', 'CASE', 'WHEN', 'THEN', 'ELSE', 'END', 'TRUE', 'FALSE',
  'CAST', 'TYPEOF', 'SUBSTR', 'UPPER', 'LOWER', 'TRIM', 'LENGTH',
  'REPLACE', 'COALESCE', 'IFNULL', 'ROUND', 'ABS',
])

export function isKeyword(word: string): boolean {
  return SQL_KEYWORDS.has(word.toUpperCase())
}

export function validateSqlSafety(sql: string): string | null {
  const upper = sql.toUpperCase()
  for (const pattern of FORBIDDEN_PATTERNS) {
    if (pattern.test(sql)) {
      return 'Operation non autorisee pour des raisons de securite'
    }
  }
  const stacked = upper.split(';').filter(s => s.trim().length > 1)
  if (stacked.length > 1) {
    return 'Une seule requete a la fois est autorisee (pas de stacking)'
  }
  return null
}

function parseWhereCondition(condition: string): (row: Record<string, unknown>) => boolean {
  const andParts = condition.split(/\s+AND\s+/i)
  
  return (row: Record<string, unknown>) => {
    return andParts.every(part => {
      const orParts = part.split(/\s+OR\s+/i)
      return orParts.some(orPart => {
        const trimmed = orPart.trim()
        const isNull = trimmed.match(/(\w+)\s+IS\s+NOT\s+NULL/i)
        if (isNull) {
          const col = isNull[1].toLowerCase()
          return row[col] !== null && row[col] !== undefined
        }
        const isNullMatch = trimmed.match(/(\w+)\s+IS\s+NULL/i)
        if (isNullMatch) {
          const col = isNullMatch[1].toLowerCase()
          return row[col] === null || row[col] === undefined
        }
        const inMatch = trimmed.match(/(\w+)\s+NOT\s+IN\s*\(([^)]+)\)/i)
        if (inMatch) {
          const col = inMatch[1].toLowerCase()
          const values = inMatch[2].split(',').map(v => parseValue(v.trim()))
          const rowVal = row[col]
          return !values.some(v => v === rowVal || (typeof v === 'number' && Number(rowVal) === v))
        }
        const inMatch2 = trimmed.match(/(\w+)\s+IN\s*\(([^)]+)\)/i)
        if (inMatch2) {
          const col = inMatch2[1].toLowerCase()
          const values = inMatch2[2].split(',').map(v => parseValue(v.trim()))
          const rowVal = row[col]
          return values.some(v => v === rowVal || (typeof v === 'number' && Number(rowVal) === v))
        }
        const likeMatch = trimmed.match(/(\w+)\s+LIKE\s+'([^']+)'/i)
        if (likeMatch) {
          const col = likeMatch[1].toLowerCase()
          const pattern = likeMatch[2].replace(/%/g, '.*').replace(/_/g, '.')
          const regex = new RegExp(`^${pattern}$`, 'i')
          return regex.test(String(row[col] ?? ''))
        }
        const betweenMatch = trimmed.match(/(\w+)\s+BETWEEN\s+(.+?)\s+AND\s+(.+)/i)
        if (betweenMatch) {
          const col = betweenMatch[1].toLowerCase()
          const low = parseValue(betweenMatch[2].trim())
          const high = parseValue(betweenMatch[3].trim())
          const val = typeof row[col] === 'number' ? row[col] : Number(row[col])
          return val >= (low as number) && val <= (high as number)
        }
        const opMatch = trimmed.match(/(\w+)\s*(>=|<=|!=|<>|=|>|<)\s*(.+)/)
        if (opMatch) {
          const col = opMatch[1].toLowerCase()
          const op = opMatch[2]
          const val = parseValue(opMatch[3].trim())
          const rowVal = row[col]
          if (op === '=' || op === '==') return String(rowVal) === String(val) || (typeof val === 'number' && Number(rowVal) === val)
          if (op === '!=' || op === '<>') return String(rowVal) !== String(val) && (typeof val !== 'number' || Number(rowVal) !== val)
          if (op === '>') return Number(rowVal) > (val as number)
          if (op === '<') return Number(rowVal) < (val as number)
          if (op === '>=') return Number(rowVal) >= (val as number)
          if (op === '<=') return Number(rowVal) <= (val as number)
        }
        return true
      })
    })
  }
}

function parseValue(val: string): unknown {
  if (!val) return null
  const lower = val.toLowerCase()
  if (lower === 'null') return null
  if (lower === 'true') return true
  if (lower === 'false') return false
  if ((val.startsWith("'") && val.endsWith("'")) || (val.startsWith('"') && val.endsWith('"'))) {
    return val.slice(1, -1)
  }
  const num = Number(val)
  if (!isNaN(num) && val.trim() !== '') return num
  return val
}

function parseColumns(selectClause: string, tableColumns: string[]): string[] {
  const trimmed = selectClause.trim()
  if (trimmed === '*') return tableColumns
  return trimmed.split(',').map(c => {
    const parts = c.trim().split(/\s+AS\s+/i)
    const colPart = parts[0].trim()
    const alias = parts[1]?.trim() || colPart
    const colName = colPart.replace(/^"(.+)"$/, '$1').replace(/^`(.+)`$/, '$1').toLowerCase()
    return alias.toLowerCase()
  })
}

function applyAggregates(selectClause: string, rows: Record<string, unknown>[], columns: string[]): { columns: string[], rows: Record<string, unknown>[] } {
  const upper = selectClause.toUpperCase()
  const hasAgg = /\b(COUNT|SUM|AVG|MIN|MAX)\s*\(/i.test(selectClause)
  if (!hasAgg) return { columns, rows }

  const aggRegex = /((?:COUNT|SUM|AVG|MIN|MAX)\s*\(\s*(?:\w+|\*)\s*\))(?:\s+AS\s+(\w+))?/gi
  const aggregates: { func: string; col: string; alias: string }[] = []
  let match: RegExpExecArray | null
  while ((match = aggRegex.exec(selectClause)) !== null) {
    const inner = match[1].match(/(\w+)\s*\(\s*(\w+|\*)\s*\)/i)!
    aggregates.push({
      func: inner[1].toUpperCase(),
      col: inner[2] === '*' ? '*' : inner[2].toLowerCase(),
      alias: match[2] || `${inner[1].toLowerCase()}_${inner[2]}`.replace('*', 'all'),
    })
  }

  const result: Record<string, unknown> = {}
  for (const agg of aggregates) {
    const vals = agg.col === '*'
      ? rows.map(() => 1)
      : rows.map(r => Number(r[agg.col]) || 0)
    switch (agg.func) {
      case 'COUNT': result[agg.alias] = vals.length; break
      case 'SUM': result[agg.alias] = vals.reduce((a, b) => a + b, 0); break
      case 'AVG': result[agg.alias] = vals.length ? Math.round(vals.reduce((a, b) => a + b, 0) / vals.length * 100) / 100 : 0; break
      case 'MIN': result[agg.alias] = vals.length ? Math.min(...vals) : null; break
      case 'MAX': result[agg.alias] = vals.length ? Math.max(...vals) : null; break
    }
  }
  return { columns: Object.keys(result), rows: [result] }
}

export class SqlEngine {
  private tables: Map<string, SqlTable> = new Map()

  constructor() {
    this.initializeSampleData()
  }

  private initializeSampleData() {
    this.createTable('utilisateurs', ['id', 'nom', 'age', 'ville', 'email', 'salaire'], [
      { id: 1, nom: 'Dupont', age: 25, ville: 'Paris', email: 'dupont@mail.com', salaire: 3200 },
      { id: 2, nom: 'Martin', age: 17, ville: 'Lyon', email: 'martin@mail.com', salaire: 1800 },
      { id: 3, nom: 'Dubois', age: 30, ville: 'Marseille', email: 'dubois@mail.com', salaire: 4100 },
      { id: 4, nom: 'Leroy', age: 22, ville: 'Paris', email: 'leroy@mail.com', salaire: 2800 },
      { id: 5, nom: 'Moreau', age: 16, ville: 'Lille', email: 'moreau@mail.com', salaire: 1500 },
      { id: 6, nom: 'Petit', age: 28, ville: 'Bordeaux', email: 'petit@mail.com', salaire: 3600 },
      { id: 7, nom: 'Roux', age: 35, ville: 'Lyon', email: 'roux@mail.com', salaire: 5200 },
      { id: 8, nom: 'Fournier', age: 19, ville: 'Paris', email: 'fournier@mail.com', salaire: 2100 },
    ])
    this.createTable('produits', ['id', 'nom', 'prix', 'stock', 'categorie'], [
      { id: 1, nom: 'Ordinateur', prix: 800, stock: 10, categorie: 'Electronique' },
      { id: 2, nom: 'Souris', prix: 20, stock: 50, categorie: 'Accessoire' },
      { id: 3, nom: 'Clavier', prix: 50, stock: 30, categorie: 'Accessoire' },
      { id: 4, nom: 'Ecran', prix: 300, stock: 5, categorie: 'Electronique' },
      { id: 5, nom: 'Casque', prix: 80, stock: 25, categorie: 'Accessoire' },
      { id: 6, nom: 'Imprimante', prix: 150, stock: 8, categorie: 'Electronique' },
    ])
    this.createTable('commandes', ['id', 'utilisateur_id', 'produit_id', 'quantite', 'date', 'total'], [
      { id: 1, utilisateur_id: 1, produit_id: 1, quantite: 1, date: '2024-01-15', total: 800 },
      { id: 2, utilisateur_id: 3, produit_id: 2, quantite: 3, date: '2024-02-20', total: 60 },
      { id: 3, utilisateur_id: 1, produit_id: 3, quantite: 2, date: '2024-03-10', total: 100 },
      { id: 4, utilisateur_id: 7, produit_id: 4, quantite: 1, date: '2024-04-05', total: 300 },
      { id: 5, utilisateur_id: 4, produit_id: 5, quantite: 1, date: '2024-05-12', total: 80 },
    ])
  }

  private createTable(name: string, columns: string[], rows: Record<string, unknown>[] = [], startId: number = 1) {
    this.tables.set(name.toLowerCase(), {
      name: name.toLowerCase(),
      columns,
      rows: rows.map(r => ({ ...r })),
      autoIncrement: startId + rows.length,
    })
  }

  getTableNames(): string[] {
    return Array.from(this.tables.keys())
  }

  getTableInfo(name: string): SqlTable | undefined {
    return this.tables.get(name.toLowerCase())
  }

  importTable(name: string, columns: string[], rows: Record<string, unknown>[]) {
    const safeName = name.toLowerCase().replace(/[^a-z0-9_]/g, '_')
    this.createTable(safeName, columns, rows, 1)
    return safeName
  }

  execute(sql: string): SqlResult {
    const start = performance.now()
    const safetyError = validateSqlSafety(sql)
    if (safetyError) throw new Error(safetyError)

    const trimmed = sql.trim().replace(/;$/, '')
    const upper = trimmed.toUpperCase()

    if (upper.startsWith('SELECT')) return this.executeSelect(trimmed, start)
    if (upper.startsWith('INSERT')) return this.executeInsert(trimmed, start)
    if (upper.startsWith('UPDATE')) return this.executeUpdate(trimmed, start)
    if (upper.startsWith('DELETE')) return this.executeDelete(trimmed, start)
    if (upper.startsWith('CREATE TABLE')) return this.executeCreateTable(trimmed, start)
    if (upper.startsWith('DROP TABLE')) return this.executeDropTable(trimmed, start)
    if (upper.startsWith('ALTER TABLE')) return this.executeAlterTable(trimmed, start)

    throw new Error(`Commande SQL non supportee : ${upper.split(' ')[0]}. Supportees : SELECT, INSERT, UPDATE, DELETE, CREATE TABLE, DROP TABLE, ALTER TABLE`)
  }

  private executeSelect(sql: string, start: number): SqlResult {
    const selectMatch = sql.match(/^SELECT\s+(.+?)\s+FROM\s+(\w+)(?:\s+WHERE\s+(.+?))?(?:\s+GROUP\s+BY\s+(.+?))?(?:\s+HAVING\s+(.+?))?(?:\s+ORDER\s+BY\s+(.+?))?(?:\s+LIMIT\s+(\d+))?(?:\s+OFFSET\s+(\d+))?$/i)
    if (!selectMatch) throw new Error('Syntaxe SELECT invalide. Format : SELECT colonnes FROM table [WHERE ...] [ORDER BY ...] [LIMIT n]')

    const selectClause = selectMatch[1].trim()
    const tableName = selectMatch[2].toLowerCase()
    const whereClause = selectMatch[3]?.trim()
    const groupByClause = selectMatch[4]?.trim()
    const havingClause = selectMatch[5]?.trim()
    const orderByClause = selectMatch[6]?.trim()
    const limitVal = selectMatch[7] ? parseInt(selectMatch[7]) : undefined
    const offsetVal = selectMatch[8] ? parseInt(selectMatch[8]) : undefined

    const table = this.tables.get(tableName)
    if (!table) throw new Error(`Table "${tableName}" non trouvee. Tables disponibles : ${this.getTableNames().join(', ')}`)

    let rows = [...table.rows]

    if (whereClause) {
      const filterFn = parseWhereCondition(whereClause)
      rows = rows.filter(filterFn)
    }

    if (groupByClause) {
      const groupCols = groupByClause.split(',').map(c => c.trim().toLowerCase())
      const aggResult = applyAggregates(selectClause, rows, table.columns)
      const execTime = performance.now() - start
      return { columns: aggResult.columns, rows: aggResult.rows, affectedRows: rows.length, executionTime: Math.round(execTime * 100) / 100 }
    }

    const hasAgg = /\b(COUNT|SUM|AVG|MIN|MAX)\s*\(/i.test(selectClause)
    if (hasAgg) {
      const aggResult = applyAggregates(selectClause, rows, table.columns)
      const execTime = performance.now() - start
      return { columns: aggResult.columns, rows: aggResult.rows, affectedRows: rows.length, executionTime: Math.round(execTime * 100) / 100 }
    }

    const columns = parseColumns(selectClause, table.columns)

    if (orderByClause) {
      const parts = orderByClause.split(',')
      parts.reverse().forEach(part => {
        const dir = /\s+DESC\s*$/i.test(part) ? -1 : 1
        const col = part.replace(/\s+(ASC|DESC)\s*$/i, '').trim().toLowerCase()
        rows.sort((a, b) => {
          const av = String(a[col] ?? '')
          const bv = String(b[col] ?? '')
          if (av < bv) return -1 * dir
          if (av > bv) return 1 * dir
          return 0
        })
      })
    }

    if (offsetVal) rows = rows.slice(offsetVal)
    if (limitVal) rows = rows.slice(0, limitVal)

    const execTime = performance.now() - start
    return { columns, rows, affectedRows: rows.length, executionTime: Math.round(execTime * 100) / 100 }
  }

  private executeInsert(sql: string, start: number): SqlResult {
    const match = sql.match(/^INSERT\s+INTO\s+(\w+)\s*\(([^)]+)\)\s*VALUES\s*\((.+)\)$/i)
    if (!match) {
      const match2 = sql.match(/^INSERT\s+INTO\s+(\w+)\s+VALUES\s*\((.+)\)$/i)
      if (!match2) throw new Error('Syntaxe INSERT invalide. Format : INSERT INTO table (col1, col2) VALUES (val1, val2)')
      
      const tableName = match2[1].toLowerCase()
      const table = this.tables.get(tableName)
      if (!table) throw new Error(`Table "${tableName}" non trouvee`)

      const values = match2[2].split(',').map(v => parseValue(v.trim()))
      const row: Record<string, unknown> = {}
      table.columns.forEach((col, i) => { row[col] = values[i] ?? null })
      row[table.columns[0]] = table.autoIncrement++
      table.rows.push(row)

      const execTime = performance.now() - start
      return { columns: table.columns, rows: [row], affectedRows: 1, executionTime: Math.round(execTime * 100) / 100 }
    }

    const tableName = match[1].toLowerCase()
    const table = this.tables.get(tableName)
    if (!table) throw new Error(`Table "${tableName}" non trouvee`)

    const cols = match[2].split(',').map(c => c.trim().toLowerCase())
    const vals = match[3].split(',').map(v => parseValue(v.trim()))
    
    if (cols.length !== vals.length) throw new Error(`Nombre de colonnes (${cols.length}) != nombre de valeurs (${vals.length})`)

    const row: Record<string, unknown> = {}
    table.columns.forEach(col => { row[col] = null })
    cols.forEach((col, i) => {
      if (!table.columns.includes(col)) throw new Error(`Colonne "${col}" inexistante dans la table "${tableName}"`)
      row[col] = vals[i]
    })
    row[table.columns[0]] = table.autoIncrement++
    table.rows.push(row)

    const execTime = performance.now() - start
    return { columns: table.columns, rows: [row], affectedRows: 1, executionTime: Math.round(execTime * 100) / 100 }
  }

  private executeUpdate(sql: string, start: number): SqlResult {
    const match = sql.match(/^UPDATE\s+(\w+)\s+SET\s+(.+?)\s+WHERE\s+(.+)$/i)
    if (!match) throw new Error('Syntaxe UPDATE invalide. Format : UPDATE table SET col=val WHERE condition')

    const tableName = match[1].toLowerCase()
    const table = this.tables.get(tableName)
    if (!table) throw new Error(`Table "${tableName}" non trouvee`)

    const setClause = match[2].trim()
    const whereClause = match[3].trim()
    
    const assignments = setClause.split(',').map(a => {
      const parts = a.split('=')
      if (parts.length !== 2) throw new Error(`Assignation invalide : ${a}`)
      return { col: parts[0].trim().toLowerCase(), val: parseValue(parts[1].trim()) }
    })

    const filterFn = parseWhereCondition(whereClause)
    let count = 0
    table.rows.forEach(row => {
      if (filterFn(row)) {
        assignments.forEach(({ col, val }) => {
          if (!table.columns.includes(col)) throw new Error(`Colonne "${col}" inexistante`)
          row[col] = val
        })
        count++
      }
    })

    const execTime = performance.now() - start
    return { columns: ['affected_rows'], rows: [{ affected_rows: count }], affectedRows: count, executionTime: Math.round(execTime * 100) / 100 }
  }

  private executeDelete(sql: string, start: number): SqlResult {
    const match = sql.match(/^DELETE\s+FROM\s+(\w+)(?:\s+WHERE\s+(.+))?$/i)
    if (!match) throw new Error('Syntaxe DELETE invalide. Format : DELETE FROM table [WHERE condition]')

    const tableName = match[1].toLowerCase()
    const table = this.tables.get(tableName)
    if (!table) throw new Error(`Table "${tableName}" non trouvee`)

    const whereClause = match[2]?.trim()
    if (!whereClause) throw new Error('DELETE sans WHERE est interdit pour eviter la suppression accidentelle de toutes les donnees')

    const filterFn = parseWhereCondition(whereClause)
    const before = table.rows.length
    table.rows = table.rows.filter(row => !filterFn(row))
    const count = before - table.rows.length

    const execTime = performance.now() - start
    return { columns: ['affected_rows'], rows: [{ affected_rows: count }], affectedRows: count, executionTime: Math.round(execTime * 100) / 100 }
  }

  private executeCreateTable(sql: string, start: number): SqlResult {
    const match = sql.match(/^CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?(\w+)\s*\((.+)\)$/i)
    if (!match) throw new Error('Syntaxe CREATE TABLE invalide. Format : CREATE TABLE nom (col1 TYPE, col2 TYPE, ...)')

    const tableName = match[1].toLowerCase()
    if (this.tables.has(tableName)) throw new Error(`Table "${tableName}" existe deja`)

    const colDefs = match[2].split(',').map(c => c.trim())
    const columns = colDefs.map(c => {
      const parts = c.split(/\s+/)
      const name = parts[0].toLowerCase()
      if (!/^[a-z_]\w*$/i.test(name)) throw new Error(`Nom de colonne invalide : "${name}"`)
      return name
    })

    this.createTable(tableName, columns)

    const execTime = performance.now() - start
    return { columns: ['result'], rows: [{ result: `Table "${tableName}" creee avec ${columns.length} colonnes` }], affectedRows: 0, executionTime: Math.round(execTime * 100) / 100 }
  }

  private executeDropTable(sql: string, start: number): SqlResult {
    const match = sql.match(/^DROP\s+TABLE\s+(?:IF\s+EXISTS\s+)?(\w+)$/i)
    if (!match) throw new Error('Syntaxe DROP TABLE invalide. Format : DROP TABLE nom')

    const tableName = match[1].toLowerCase()
    if (!this.tables.has(tableName)) throw new Error(`Table "${tableName}" non trouvee`)
    
    this.tables.delete(tableName)
    
    const execTime = performance.now() - start
    return { columns: ['result'], rows: [{ result: `Table "${tableName}" supprimee` }], affectedRows: 0, executionTime: Math.round(execTime * 100) / 100 }
  }

  private executeAlterTable(sql: string, start: number): SqlResult {
    const addMatch = sql.match(/^ALTER\s+TABLE\s+(\w+)\s+ADD\s+(?:COLUMN\s+)?(\w+)\s+\w+$/i)
    if (addMatch) {
      const tableName = addMatch[1].toLowerCase()
      const table = this.tables.get(tableName)
      if (!table) throw new Error(`Table "${tableName}" non trouvee`)
      const newCol = addMatch[2].toLowerCase()
      if (table.columns.includes(newCol)) throw new Error(`Colonne "${newCol}" existe deja`)
      table.columns.push(newCol)
      table.rows.forEach(row => { row[newCol] = null })
      const execTime = performance.now() - start
      return { columns: ['result'], rows: [{ result: `Colonne "${newCol}" ajoutee a "${tableName}"` }], affectedRows: 0, executionTime: Math.round(execTime * 100) / 100 }
    }
    throw new Error('Syntaxe ALTER TABLE invalide. Supporte uniquement : ALTER TABLE nom ADD COLUMN col TYPE')
  }
}