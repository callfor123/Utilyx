import { NextRequest, NextResponse } from 'next/server'
import { rateLimit, getClientIp } from '@/lib/rate-limit'
import { validateApiKey } from '@/lib/api-key-auth'

export const runtime = 'nodejs'
export const maxDuration = 120

const MAX_FILE_SIZE = 20 * 1024 * 1024 // 20 MB
const VALID_LANGS = ['eng', 'fra', 'deu', 'spa', 'ita', 'por', 'chi_sim', 'chi_tra', 'jpn', 'kor', 'ara', 'rus', 'nld', 'pol', 'tur', 'vie', 'tha', 'hin']
const OCR_MAX_WIDTH = 2000

export async function POST(request: NextRequest) {
  const startTime = Date.now()

  const authResult = await validateApiKey(request)
  if (!authResult.valid) {
    return NextResponse.json(
      { error: authResult.error },
      { status: 401 },
    )
  }

  const ip = getClientIp(request)
  const rl = rateLimit(ip, 10, 60_000)
  if (!rl.allowed) {
    return NextResponse.json(
      { error: 'Rate limit exceeded. Please try again later.' },
      { status: 429, headers: { 'X-RateLimit-Remaining': '0' } },
    )
  }

  try {
    const formData = await request.formData()
    const file = (formData.get('file') || formData.get('image')) as File | null
    const lang = (formData.get('lang') as string) || 'eng'

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'File must be an image' }, { status: 400 })
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: 'File too large. Maximum size is 20 MB.' }, { status: 400 })
    }

    const normalizedLang = lang.toLowerCase().trim()
    if (!VALID_LANGS.includes(normalizedLang)) {
      return NextResponse.json(
        { error: `Unsupported language. Allowed: ${VALID_LANGS.join(', ')}` },
        { status: 400 },
      )
    }

    const arrayBuffer = await file.arrayBuffer()
    let buffer = Buffer.from(arrayBuffer)

    // Pre-process: resize large images and convert to JPEG for faster OCR
    const sharp = (await import('sharp')).default
    const metadata = await sharp(buffer).metadata()
    if ((metadata.width && metadata.width > OCR_MAX_WIDTH) || metadata.format === 'png') {
      const pipeline = sharp(buffer)
        .resize(OCR_MAX_WIDTH, null, { fit: 'inside', withoutEnlargement: true })
        .jpeg({ quality: 90 })
      buffer = await pipeline.toBuffer()
    }

    const Tesseract = await import('tesseract.js')

    const result = await Tesseract.recognize(buffer, normalizedLang, {
      logger: () => {},
    })

    const processingTimeMs = Date.now() - startTime

    return NextResponse.json({
      text: result.data.text,
      confidence: result.data.confidence,
      words: (result.data as any).words?.length || 0,
      processingTimeMs,
    }, {
      headers: {
        'X-Processing-Time-Ms': processingTimeMs.toString(),
        'X-RateLimit-Remaining': rl.remaining.toString(),
      },
    })
  } catch (error) {
    console.error('OCR error:', error)
    return NextResponse.json(
      { error: 'OCR processing failed' },
      { status: 500 },
    )
  }
}