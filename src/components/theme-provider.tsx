'use client'

import dynamic from 'next/dynamic'

// Dynamically import ThemeProvider with ssr: false to avoid prerendering crashes.
// next-themes uses React context that returns null during static prerendering
// (e.g. /_global-error page), causing "Cannot read properties of null (useContext)"
// build failures in Next.js 16. Using next/dynamic with ssr: false ensures
// the ThemeProvider is never rendered during SSR/prerendering.
const NextThemesProvider = dynamic(
  () => import('next-themes').then((mod) => mod.ThemeProvider),
  { ssr: false }
)

export function ThemeProvider({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}