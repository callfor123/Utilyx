import { NextRequest, NextResponse } from 'next/server'
import { rateLimit, getClientIp } from '@/lib/rate-limit'

export const runtime = 'nodejs'
export const maxDuration = 120

const MAX_FILE_SIZE = 50 * 1024 * 1024 // 50 MB
const ALLOWED_FORMATS = ['jpeg', 'jpg', 'png', 'webp', 'avif'] as const
const MAX_DIMENSION = 10000

export async function POST(request: NextRequest) {
  // Rate limit: 20 requests per minute per IP
  const ip = getClientIp(request)
  const rl = rateLimit(ip, 20, 60_000)
  if (!rl.allowed) {
    return NextResponse.json(
      { error: 'Rate limit exceeded. Please try again later.' },
      { status: 429, headers: { 'X-RateLimit-Remaining': '0' } },
    )
  }

  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null
    const quality = parseInt(formData.get('quality') as string) || 80
    const format = (formData.get('format') as string) || 'jpeg'
    const width = formData.get('width') ? parseInt(formData.get('width') as string) : undefined
    const height = formData.get('height') ? parseInt(formData.get('height') as string) : undefined

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'File must be an image' }, { status: 400 })
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: 'File too large. Maximum size is 50 MB.' }, { status: 400 })
    }

    // Validate dimensions
    if (width !== undefined && (width < 1 || width > MAX_DIMENSION || !Number.isFinite(width))) {
      return NextResponse.json({ error: `Width must be between 1 and ${MAX_DIMENSION}.` }, { status: 400 })
    }
    if (height !== undefined && (height < 1 || height > MAX_DIMENSION || !Number.isFinite(height))) {
      return NextResponse.json({ error: `Height must be between 1 and ${MAX_DIMENSION}.` }, { status: 400 })
    }

    // Validate format
    const normalizedFormat = format.toLowerCase() as string
    if (!ALLOWED_FORMATS.includes(normalizedFormat as any)) {
      return NextResponse.json(
        { error: `Invalid format. Allowed: ${ALLOWED_FORMATS.join(', ')}` },
        { status: 400 },
      )
    }
    const sharpFormat = normalizedFormat === 'jpg' ? 'jpeg' : normalizedFormat

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Dynamic import for Sharp
    const sharp = (await import('sharp')).default

    let pipeline = sharp(buffer)

    // Resize if dimensions provided
    if (width || height) {
      pipeline = pipeline.resize(width, height, { fit: 'inside', withoutEnlargement: true })
    }

    // Apply format and quality (clamped)
    const qualityClamped = Math.max(1, Math.min(100, quality))

    let outputBuffer: Buffer
    let contentType: string
    let ext: string

    switch (sharpFormat) {
      case 'webp':
        outputBuffer = await pipeline.webp({ quality: qualityClamped }).toBuffer()
        contentType = 'image/webp'
        ext = 'webp'
        break
      case 'png':
        outputBuffer = await pipeline.png({ quality: qualityClamped }).toBuffer()
        contentType = 'image/png'
        ext = 'png'
        break
      case 'avif':
        outputBuffer = await pipeline.avif({ quality: qualityClamped }).toBuffer()
        contentType = 'image/avif'
        ext = 'avif'
        break
      default:
        outputBuffer = await pipeline.jpeg({ quality: qualityClamped }).toBuffer()
        contentType = 'image/jpeg'
        ext = 'jpg'
    }

    return new NextResponse(outputBuffer as any, {
      headers: {
        'Content-Type': contentType,
        'X-Original-Size': file.size.toString(),
        'X-Compressed-Size': outputBuffer.length.toString(),
        'X-Format': ext,
        'X-RateLimit-Remaining': rl.remaining.toString(),
      },
    })
  } catch (error) {
    console.error('Image compression error:', error)
    return NextResponse.json(
      { error: 'Image compression failed' },
      { status: 500 },
    )
  }
}