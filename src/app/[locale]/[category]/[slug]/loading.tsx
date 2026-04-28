export default function ToolPageLoading() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Sticky header skeleton */}
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-lg">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
          <div className="h-6 w-20 skeleton-shimmer rounded" />
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 skeleton-shimmer rounded" />
            <div className="h-6 w-6 skeleton-shimmer rounded" />
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
        {/* Breadcrumb skeleton */}
        <div className="mb-4 flex items-center gap-2 text-sm">
          <div className="h-4 w-12 skeleton-shimmer rounded" />
          <div className="h-4 w-4 skeleton-shimmer rounded" />
          <div className="h-4 w-20 skeleton-shimmer rounded" />
          <div className="h-4 w-4 skeleton-shimmer rounded" />
          <div className="h-4 w-28 skeleton-shimmer rounded" />
        </div>

        {/* H1 + description skeleton */}
        <div className="mb-6">
          <div className="h-8 w-64 skeleton-shimmer rounded mb-3" />
          <div className="h-4 w-96 skeleton-shimmer rounded mb-2" />
          <div className="h-4 w-72 skeleton-shimmer rounded" />
        </div>

        {/* Tool card skeleton */}
        <div className="rounded-xl border bg-card p-6 mb-8">
          <div className="flex flex-col items-center justify-center py-16 gap-4">
            <div className="relative">
              <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />
              <div className="absolute inset-0 animate-ping rounded-full bg-primary/10" />
            </div>
            <div className="h-4 w-32 skeleton-shimmer rounded" />
          </div>
        </div>

        {/* FAQ skeleton */}
        <div className="space-y-3 mb-8">
          <div className="h-6 w-48 skeleton-shimmer rounded" />
          {[...Array(3)].map((_, i) => (
            <div key={i} className="rounded-lg border p-4 space-y-2">
              <div className="h-4 w-3/4 skeleton-shimmer rounded" />
              <div className="h-3 w-full skeleton-shimmer rounded" />
            </div>
          ))}
        </div>
      </main>

      {/* Footer skeleton */}
      <footer className="border-t py-6 px-4">
        <div className="mx-auto max-w-5xl flex items-center justify-center gap-4">
          <div className="h-3 w-32 skeleton-shimmer rounded" />
        </div>
      </footer>
    </div>
  )
}