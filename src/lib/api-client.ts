/**
 * Client-side API helpers for analytics and feedback.
 * These are safe to call from React components (client-side only).
 */

// ─── Analytics ─────────────────────────────────────────────────────

export interface TrackToolUsageParams {
  toolId: string
  category: string
  action: string
  success?: boolean
  fileSize?: number | null
  duration?: number | null
}

/** Record a tool usage event */
export async function trackToolUsage(params: TrackToolUsageParams): Promise<boolean> {
  try {
    const res = await fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        toolId: params.toolId,
        category: params.category,
        action: params.action,
        success: params.success ?? true,
        fileSize: params.fileSize ?? null,
        duration: params.duration ?? null,
      }),
    })
    return res.ok
  } catch {
    // Analytics should never block the user
    return false
  }
}

// ─── Feedback ──────────────────────────────────────────────────────

export interface SubmitFeedbackParams {
  toolId?: string | null
  rating: number
  comment?: string | null
  email?: string | null
}

/** Submit user feedback */
export async function submitFeedback(params: SubmitFeedbackParams): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await fetch('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        toolId: params.toolId ?? null,
        rating: params.rating,
        comment: params.comment ?? null,
        email: params.email ?? null,
      }),
    })
    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      return { success: false, error: data.error || 'Failed to submit feedback' }
    }
    return { success: true }
  } catch {
    return { success: false, error: 'Network error' }
  }
}
