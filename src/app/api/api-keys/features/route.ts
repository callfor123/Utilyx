/**
 * API Features endpoint.
 *
 * GET /api/api-keys/features — Lists all tools accessible via the free API key.
 * Returns tool categories, endpoints, and rate limit info.
 */

import { NextResponse } from 'next/server'

export const runtime = 'edge'

interface ApiFeature {
  id: string
  label: string
  description: string
  endpoint: string
  method: string
  category: string
}

const features: ApiFeature[] = [
  // Image tools
  { id: 'img-compress', label: 'Image Compression', description: 'Compress images with quality control', endpoint: '/api/image-compress', method: 'POST', category: 'image' },
  { id: 'img-ocr', label: 'OCR Text Extraction', description: 'Extract text from images using OCR', endpoint: '/api/ocr', method: 'POST', category: 'image' },
  // More endpoints can be added as they become available
]

const categories = [
  { id: 'image', label: 'Image Tools', icon: 'Image' },
  { id: 'pdf', label: 'PDF & Documents', icon: 'FileText' },
  { id: 'video', label: 'Video Tools', icon: 'Video' },
  { id: 'dev-seo', label: 'Dev & SEO', icon: 'Code' },
  { id: 'text-tools', label: 'Text Tools', icon: 'Type' },
  { id: 'generators', label: 'Generators', icon: 'Wand2' },
  { id: 'calculators', label: 'Calculators', icon: 'Calculator' },
]

export async function GET() {
  return NextResponse.json({
    plan: 'free',
    rateLimit: {
      requestsPerHour: 100,
      description: '100 requests per hour per API key',
    },
    autoExpire: {
      durationDays: 5,
      description: 'Keys auto-expire after 5 days',
    },
    categories,
    features,
    totalFeatures: features.length,
    upcoming: 'More API endpoints are being added regularly. All 56+ Utilyx tools will become API-accessible.',
  })
}