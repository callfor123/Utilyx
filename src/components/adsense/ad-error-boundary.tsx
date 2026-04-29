'use client'

import React, { Component, type ReactNode, type ErrorInfo } from 'react'

interface AdErrorBoundaryProps {
  children: ReactNode
  /** Optional fallback to render when an ad crashes. Defaults to empty div. */
  fallback?: ReactNode
}

interface AdErrorBoundaryState {
  hasError: boolean
}

/**
 * Error boundary that catches crashes in ad components and degrades gracefully.
 *
 * Without this, a single AdUnit crash (e.g. AdSense script error, DOM mutation
 * failure, or unexpected state) would unmount the entire page tree. This boundary
 * isolates ad failures so the rest of the page remains functional.
 *
 * Place it around individual AdUnit instances or around the ad section of a page:
 *
 *   <AdErrorBoundary>
 *     <AdBanner />
 *   </AdErrorBoundary>
 *
 *   <AdErrorBoundary fallback={null}>
 *     <AdInFeed />
 *   </AdErrorBoundary>
 */
export class AdErrorBoundary extends Component<AdErrorBoundaryProps, AdErrorBoundaryState> {
  constructor(props: AdErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): AdErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Dispatch a custom event so analytics can track ad failures
    if (typeof window !== 'undefined') {
      try {
        window.dispatchEvent(new CustomEvent('adsense:error', {
          detail: {
            message: error.message,
            componentStack: errorInfo.componentStack,
            timestamp: Date.now(),
          },
        }))
      } catch {
        // Silently degrade if CustomEvent is unavailable
      }
    }
  }

  render() {
    if (this.state.hasError) {
      // Render fallback or an invisible placeholder to prevent layout shift
      return this.props.fallback ?? <div className="ad-container" style={{ display: 'none' }} />
    }
    return this.props.children
  }
}