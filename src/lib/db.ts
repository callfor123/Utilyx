const hasDb = !!process.env.DATABASE_URL && process.env.DATABASE_URL.length > 0

let _db: any = null

if (hasDb) {
  try {
    const { PrismaClient } = require('@prisma/client')
    const globalForPrisma = globalThis as unknown as { prisma: any | undefined }
    _db = globalForPrisma.prisma ?? new PrismaClient({ log: [] })
    if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = _db
  } catch (e) {
    console.error('Prisma init failed:', e)
    _db = null
  }
}

export const isDbAvailable = hasDb && _db !== null
export const db = _db as import('@prisma/client').PrismaClient
