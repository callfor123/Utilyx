import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const hasDb = !!process.env.DATABASE_URL

export const isDbAvailable = hasDb

export const db = hasDb
  ? (globalForPrisma.prisma ??
      new PrismaClient({
        log: process.env.NODE_ENV !== 'production' ? ['query'] : [],
      }))
  : (null as unknown as PrismaClient)

if (hasDb && process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
