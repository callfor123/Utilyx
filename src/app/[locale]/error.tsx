'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div style={{
      minHeight: '60vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1.5rem',
      padding: '1rem',
      textAlign: 'center',
    }}>
      <h1 style={{ fontSize: '3rem', fontWeight: 'bold', margin: 0 }}>500</h1>
      <p style={{ color: '#666', maxWidth: '28rem', margin: 0 }}>
        Une erreur inattendue s&apos;est produite. Veuillez réessayer.
      </p>
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
        Réessayer
      </button>
    </div>
  )
}
