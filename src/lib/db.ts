let _db: any = null
let _isDbAvailable = false

const globalForPrisma = globalThis as unknown as {
  prisma: any | undefined
}

try {
  _isDbAvailable = !!process.env.DATABASE_URL
  if (_isDbAvailable) {
    // eslint-disable-next-line @typescript-eslint/no-require-resolves
    const { PrismaClient } = require('@prisma/client')
    _db = globalForPrisma.prisma ??
      new PrismaClient({
        log: process.env.NODE_ENV !== 'production' ? ['query'] : [],
      })
    if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = _db
  }
} catch {
  _isDbAvailable = false
  _db = null
}

export const isDbAvailable = _isDbAvailable
export const db = _db as import('@prisma/client').PrismaClient
