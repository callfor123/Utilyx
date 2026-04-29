/**
 * AdSense Event Tracking System
 *
 * Fires custom DOM events for ad lifecycle milestones:
 *   - adsense:slot-registered  — slot registered with the limiter
 *   - adsense:slot-rendered    — <ins> element mounted in DOM
 *   - adsense:slot-pushed      — adsbygoogle.push({}) called
 *   - adsense:slot-blocked     — click protection blocked a slot
 *   - adsense:slot-unfilled    — AdSense marked the slot as unfilled
 *   - adsense:viewport-entered — IntersectionObserver detected viewport entry
 *
 * These events enable:
 *   1. Revenue risk monitoring (fill rate, viewability)
 *   2. Debugging ad rendering issues without console.warn
 *   3. Analytics integration (send to GA, PostHog, etc.)
 *   4. A/B testing of ad placements
 *
 * Usage: listeners can subscribe to `window` for any of the above events.
 * Example: window.addEventListener('adsense:slot-rendered', (e) => { ... })
 */

export interface AdSlotEventDetail {
  /** Unique instance ID (e.g. "1623570820-a3f8b2c") */
  instanceId: string
  /** AdSense slot ID */
  slotId: string
  /** Priority level (1=highest, 3=lowest) */
  priority: number
  /** Whether the limiter allowed this slot */
  allowed?: boolean
  /** Timestamp of the event */
  timestamp: number
}

export interface AdViewportEventDetail {
  instanceId: string
  slotId: string
  timestamp: number
}

export interface AdPushEventDetail {
  instanceId: string
  slotId: string
  attempt: number
  timestamp: number
}

export interface AdUnfilledEventDetail {
  instanceId: string
  slotId: string
  timestamp: number
}

type EventMap = {
  'adsense:slot-registered': CustomEvent<AdSlotEventDetail>
  'adsense:slot-rendered': CustomEvent<AdSlotEventDetail>
  'adsense:slot-pushed': CustomEvent<AdPushEventDetail>
  'adsense:viewport-entered': CustomEvent<AdViewportEventDetail>
  'adsense:slot-unfilled': CustomEvent<AdUnfilledEventDetail>
}

function dispatch<T extends keyof EventMap>(type: T, detail: EventMap[T]['detail']) {
  if (typeof window === 'undefined') return
  try {
    window.dispatchEvent(new CustomEvent(type, { detail }))
  } catch {
    // CustomEvent not supported in some environments — silently degrade
  }
}

export const adEvents = {
  slotRegistered(detail: AdSlotEventDetail) {
    dispatch('adsense:slot-registered', detail)
  },
  slotRendered(detail: AdSlotEventDetail) {
    dispatch('adsense:slot-rendered', detail)
  },
  slotPushed(detail: AdPushEventDetail) {
    dispatch('adsense:slot-pushed', detail)
  },
  viewportEntered(detail: AdViewportEventDetail) {
    dispatch('adsense:viewport-entered', detail)
  },
  slotUnfilled(detail: AdUnfilledEventDetail) {
    dispatch('adsense:slot-unfilled', detail)
  },
}