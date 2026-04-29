// ── AdSense constants (shared between server & client modules) ──────────
// This file has NO 'use client' directive so it can be safely imported
// from both server components and client components without triggering
// Turbopack "defined multiple times" errors.

export const ADSENSE_PUBLISHER_ID = 'ca-pub-7035626578237932'
export const ADSENSE_CLIENT = 'ca-pub-7035626578237932'

// ── Ad slot registry ──────────────────────────────────────────────────
// Each unit should have a unique slot ID from your AdSense account.
// Go to: AdSense > My ads > Ad units > Create ad unit
// Unique slots = more ad diversity = higher RPM
export const AD_SLOTS = {
  // Homepage / tool page banner (horizontal, top of content)
  BANNER: '1623570820',
  // In-Feed ad (between tool rows or search results)
  IN_FEED: '1623570821',
  // Leaderboard (wide horizontal, typically at top)
  LEADERBOARD: '1623570822',
  // Rectangle (300x250, inline or sidebar)
  RECTANGLE: '1623570823',
  // Sidebar (vertical, 160x600)
  SIDEBAR: '1623570824',
  // In-article (native-looking ad within tool content)
  IN_ARTICLE: '1623570825',
  // Sticky mobile (fixed bottom bar on mobile)
  STICKY_MOBILE: '1623570826',
} as const

// Per-page slots for homepage tool grid (place every 8-10 tools)
export const AD_SLOT_HOME_GRID = '1623570827'

// Per-page slots for individual tool pages
export const AD_SLOT_TOOL_PAGE = '1623570828'

export const AD_SLOT_MAIN = AD_SLOTS.BANNER

// Priority levels: lower number = higher priority (renders first)
// 1 = critical (near active tool, between content sections)
// 2 = standard (header banners, mid-content)
// 3 = low-priority (footers, transition zones)
export type AdPriority = 1 | 2 | 3