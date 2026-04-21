import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const maxDuration = 120

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null
    const lang = (formData.get('lang') as string) || 'eng'

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'File must be an image' }, { status: 400 })
    }

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Dynamic import to avoid loading Tesseract at cold start
    const Tesseract = await import('tesseract.js')

    const result = await Tesseract.recognize(buffer, lang, {
      logger: () => {},
    })

    return NextResponse.json({
      text: result.data.text,
      confidence: result.data.confidence,
      words: (result.data as any).words?.length || 0,
    })
  } catch (error) {
    console.error('OCR error:', error)
    return NextResponse.json(
      { error: 'OCR processing failed' },
      { status: 500 }
    )
  }
}