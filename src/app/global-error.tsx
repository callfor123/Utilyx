'use client'

import { useEffect } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('[GlobalError]', error?.message, error?.digest, error?.stack)
  }, [error])

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1.5rem',
      padding: '1rem',
      textAlign: 'center',
      fontFamily: 'system-ui, -apple-system, sans-serif',
    }}>
      <h1 style={{ fontSize: '3.75rem', fontWeight: 'bold', margin: 0 }}>500</h1>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 600, margin: 0 }}>Something went wrong</h2>
      <p style={{ color: '#666', maxWidth: '28rem', margin: 0 }}>
        An unexpected error occurred. Please try again.
      </p>
      {error?.digest && (
        <p style={{ color: '#999', fontSize: '0.75rem', margin: 0 }}>
          Error digest: {error.digest}
        </p>
      )}
      <button
        onClick={reset}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '0.375rem',
          backgroundColor: '#000',
          color: '#fff',
          padding: '0.75rem 1.5rem',
          fontSize: '0.875rem',
          fontWeight: 500,
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Try again
      </button>
    </div>
  )
}