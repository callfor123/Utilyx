'use client'

import { useState, useEffect } from 'react'

// Lazy-load ThemeProvider only on the client to avoid SSR/prerendering crashes.
// next-themes uses React context that returns null during static prerendering
// (e.g. /_global-error page), causing "Cannot read properties of null (useContext)"
// build failures in Next.js 16.
export function ThemeProvider({ children, ...props }: Record<string, unknown> & { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
  const [ThemeProviderComponent, setThemeProviderComponent] = useState<React.ComponentType<any> | null>(null)

  useEffect(() => {
    setMounted(true)
    import('next-themes').then((mod) => {
      setThemeProviderComponent(() => mod.ThemeProvider)
    })
  }, [])

  if (!mounted || !ThemeProviderComponent) {
    return <>{children}</>
  }

  return <ThemeProviderComponent {...props}>{children}</ThemeProviderComponent>
}