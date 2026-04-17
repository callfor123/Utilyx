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
        <h1>500</h1>
        <p>Internal error. Please retry.</p>
        <button onClick={reset}>Retry</button>
      </body>
    </html>
  )
}
