/**
 * Color Converter API — POST /api/v1/color-converter
 *
 * Accepts JSON body: { "color": "#3b82f6" | "59, 130, 246" | "217, 91%, 60%" }
 * Returns the color converted to HEX, RGB, HSL, and CMYK formats.
 *
 * Authentication: Bearer token or X-API-Key header required.
 * Rate limit: 100 requests/hour per API key.
 */

import { NextRequest } from 'next/server'
import { requireApiKey, apiError, apiSuccess, handleCors } from '@/lib/api-v1-helpers'

export const runtime = 'nodejs'

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const clean = hex.replace('#', '')
  // 6-digit hex: #3b82f6
  const match6 = clean.match(/^([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i)
  if (match6) return { r: parseInt(match6[1], 16), g: parseInt(match6[2], 16), b: parseInt(match6[3], 16) }
  // 3-digit hex shorthand: #f00 → #ff0000
  const match3 = clean.match(/^([0-9a-f])([0-9a-f])([0-9a-f])$/i)
  if (match3) return { r: parseInt(match3[1] + match3[1], 16), g: parseInt(match3[2] + match3[2], 16), b: parseInt(match3[3] + match3[3], 16) }
  return null
}

function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(c => Math.round(c).toString(16).padStart(2, '0')).join('')
}

function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255; g /= 255; b /= 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  const l = (max + min) / 2
  if (max === min) return { h: 0, s: 0, l: Math.round(l * 100) }

  const d = max - min
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
  let h = 0
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6
  else if (max === g) h = ((b - r) / d + 2) / 6
  else h = ((r - g) / d + 4) / 6

  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) }
}

function rgbToCmyk(r: number, g: number, b: number): { c: number; m: number; y: number; k: number } {
  const r1 = r / 255, g1 = g / 255, b1 = b / 255
  const k = 1 - Math.max(r1, g1, b1)
  if (k === 1) return { c: 0, m: 0, y: 0, k: 100 }
  return {
    c: Math.round(((1 - r1 - k) / (1 - k)) * 100),
    m: Math.round(((1 - g1 - k) / (1 - k)) * 100),
    y: Math.round(((1 - b1 - k) / (1 - k)) * 100),
    k: Math.round(k * 100),
  }
}

function parseColor(input: string): { r: number; g: number; b: number } | null {
  const trimmed = input.trim()

  // HEX format: #3b82f6, 3b82f6, #f00, or f00
  if (/^#?[0-9a-f]{3}([0-9a-f]{3})?$/i.test(trimmed)) {
    return hexToRgb(trimmed.startsWith('#') ? trimmed : '#' + trimmed)
  }

  // RGB format: "59, 130, 246" or "rgb(59, 130, 246)"
  const rgbMatch = trimmed.match(/^(?:rgb\()?\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)?$/)
  if (rgbMatch) {
    const [, rs, gs, bs] = rgbMatch
    const r = parseInt(rs), g = parseInt(gs), b = parseInt(bs)
    if (r <= 255 && g <= 255 && b <= 255) return { r, g, b }
  }

  // HSL format: "217, 91%, 60%" or "hsl(217, 91%, 60%)"
  const hslMatch = trimmed.match(/^(?:hsl\()?\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*\)?$/)
  if (hslMatch) {
    const [, hs, ss, ls] = hslMatch
    const h = parseInt(hs) / 360, s = parseInt(ss) / 100, l = parseInt(ls) / 100
    // HSL to RGB conversion
    if (s === 0) {
      const v = Math.round(l * 255)
      return { r: v, g: v, b: v }
    }
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1; if (t > 1) t -= 1
      if (t < 1 / 6) return p + (q - p) * 6 * t
      if (t < 1 / 2) return q
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
      return p
    }
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q
    return {
      r: Math.round(hue2rgb(p, q, h + 1 / 3) * 255),
      g: Math.round(hue2rgb(p, q, h) * 255),
      b: Math.round(hue2rgb(p, q, h - 1 / 3) * 255),
    }
  }

  return null
}

export async function OPTIONS() {
  return handleCors()
}

export async function POST(request: NextRequest) {
  // 1. Auth
  const auth = await requireApiKey(request)
  if (!auth.ok) return auth.response

  // 2. Parse body
  let body: { color?: unknown }
  try {
    body = await request.json()
  } catch {
    return apiError('bad_request', 'Request body must be valid JSON. Expected: { "color": "#3b82f6" | "59, 130, 246" | "217, 91%, 60%" }')
  }

  const { color } = body
  if (typeof color !== 'string' || color.trim().length === 0) {
    return apiError('bad_request', 'Field "color" is required and must be a non-empty string.')
  }

  // 3. Parse and convert
  const rgb = parseColor(color)
  if (!rgb) {
    return apiError('bad_request', 'Could not parse color. Supported formats: HEX (#3b82f6 or #f00), RGB (59, 130, 246), or HSL (217, 91%, 60%).')
  }

  const hex = rgbToHex(rgb.r, rgb.g, rgb.b)
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)
  const cmyk = rgbToCmyk(rgb.r, rgb.g, rgb.b)

  // 4. Return
  return apiSuccess({
    input: color,
    hex,
    rgb: { r: rgb.r, g: rgb.g, b: rgb.b, css: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` },
    hsl: { ...hsl, css: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` },
    cmyk: { ...cmyk, css: `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)` },
  })
}