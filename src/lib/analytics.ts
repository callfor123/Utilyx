/**
 * GA4 event tracking helpers.
 * Safe to call server-side (no-ops); only fires when gtag is available.
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GtagParams = Record<string, any>

function gtag(...args: unknown[]) {
  if (typeof window === 'undefined') return
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const w = window as any
  if (typeof w.gtag === 'function') {
    w.gtag(...args)
  } else if (Array.isArray(w.dataLayer)) {
    w.dataLayer.push(args)
  }
}

/** Track a custom GA4 event */
export function trackEvent(name: string, params?: GtagParams) {
  gtag('event', name, params)
}

/** Track tool usage (user clicks process/convert/etc.) */
export function trackToolUse(toolId: string, params?: GtagParams) {
  trackEvent('tool_use', { tool_id: toolId, ...params })
}

/** Track result download */
export function trackDownload(toolId: string, format?: string, params?: GtagParams) {
  trackEvent('tool_download', { tool_id: toolId, format, ...params })
}
