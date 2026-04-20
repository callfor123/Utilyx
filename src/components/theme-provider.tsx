'use client'

import dynamic from 'next/dynamic'

// Dynamically import ThemeProvider to avoid SSR/prerendering issues.
// next-themes uses React context that returns null during static
// prerendering (e.g. /_global-error page), causing build failures.
const NextThemesProvider = dynamic(
  () => import('next-themes').then((mod) => mod.ThemeProvider),
  { ssr: false }
)

export function ThemeProvider({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}