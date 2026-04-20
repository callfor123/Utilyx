'use client'

// global-error.tsx must be a Client Component and render its own <html>/<body>.
// It replaces the root layout entirely when a critical error occurs.
// This page must NOT use any context providers (ThemeProvider, NextIntl, etc.)
// because they are unavailable during prerendering of /_global-error.

export const dynamic = 'force-dynamic'

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string }
}) {
  return (
    <html lang="en">
      <body style={{
        margin: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '1rem',
        textAlign: 'center',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        backgroundColor: '#fff',
        color: '#111',
      }}>
        <h1 style={{ fontSize: '3.75rem', fontWeight: 'bold', margin: 0 }}>500</h1>
        <p style={{ color: '#666', maxWidth: '28rem', margin: '0.5rem 0 0' }}>
          An unexpected error occurred.
        </p>
        <a href="/"
           style={{
             display: 'inline-flex',
             alignItems: 'center',
             justifyContent: 'center',
             borderRadius: '0.375rem',
             backgroundColor: '#111',
             color: '#fff',
             padding: '0.75rem 1.5rem',
             fontSize: '0.875rem',
             fontWeight: 500,
             textDecoration: 'none',
             marginTop: '1.5rem',
           }}>
          Back to home
        </a>
      </body>
    </html>
  )
}