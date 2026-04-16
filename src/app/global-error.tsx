'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-4 text-center">
      <h1 className="text-6xl font-bold text-primary">500</h1>
      <h2 className="text-2xl font-semibold">Erreur interne</h2>
      <p className="text-muted-foreground max-w-md">
        Une erreur inattendue s&apos;est produite. Veuillez réessayer.
      </p>
      <button
        onClick={reset}
        className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
      >
        Réessayer
      </button>
    </div>
  )
}
