'use client'

// Prevent prerendering — global-error must not be statically generated
export const dynamic = 'force-dynamic'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
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
          <h2 style={{ fontSize: '1.5rem', fontWeight: 600, margin: 0 }}>Erreur interne</h2>
          <p style={{ color: '#666', maxWidth: '28rem', margin: 0 }}>
            Une erreur inattendue s&apos;est produite.
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
      </body>
    </html>
  )
}
