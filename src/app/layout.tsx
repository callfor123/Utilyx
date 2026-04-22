import './globals.css'

// force-dynamic prevents Next.js from statically prerendering pages through this layout.
// This is required because next-intl's server context is unavailable during prerender
// of special pages like /_global-error, causing a useContext null error.
export const dynamic = 'force-dynamic'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // The root layout renders <html>/<body> for Next.js.
  // Locale-specific attributes (lang, dir) are set dynamically by SetLocaleAttrs
  // in the [locale] layout, which overrides the defaults at runtime.
  // AdSense script is loaded in the [locale] layout via AdSenseScript component
  // to avoid SSG issues with next/script in the root layout.
  return (
    <html suppressHydrationWarning>
      <body className="antialiased bg-background text-foreground font-sans">
        {children}
      </body>
    </html>
  )
}