import './globals.css'
import Script from 'next/script'

const ADSENSE_CLIENT = 'ca-pub-7035626578237932';

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
  return (
    <html suppressHydrationWarning>
      <head>
        {/* Google AdSense */}
        <Script
          key="adsense"
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className="antialiased bg-background text-foreground font-sans">
        {children}
      </body>
    </html>
  )
}