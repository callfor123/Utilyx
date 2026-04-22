'use client'

import dynamic from 'next/dynamic'

// Toaster uses useTheme() from next-themes, which crashes during SSG
// because ThemeProvider is loaded with ssr: false (context is null).
// Dynamic import with ssr: false ensures it only renders on the client.
const Toaster = dynamic(
  () => import("@/components/ui/sonner").then(mod => mod.Toaster),
  { ssr: false }
)

export function ClientOnlyToaster() {
  return <Toaster />
}