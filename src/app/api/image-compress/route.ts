import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const maxDuration = 120

export async function POST(request: NextRequest) {
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

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Dynamic import for Sharp
    const sharp = (await import('sharp')).default

    let pipeline = sharp(buffer)

    // Resize if dimensions provided
    if (width || height) {
      pipeline = pipeline.resize(width, height, { fit: 'inside', withoutEnlargement: true })
    }

    // Apply format and quality
    const qualityClamped = Math.max(1, Math.min(100, quality))

    let outputBuffer: Buffer
    let contentType: string
    let ext: string

    switch (format) {
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

    return new NextResponse(outputBuffer, {
      headers: {
        'Content-Type': contentType,
        'X-Original-Size': file.size.toString(),
        'X-Compressed-Size': outputBuffer.length.toString(),
        'X-Format': ext,
      },
    })
  } catch (error) {
    console.error('Image compression error:', error)
    return NextResponse.json(
      { error: 'Image compression failed' },
      { status: 500 }
    )
  }
}