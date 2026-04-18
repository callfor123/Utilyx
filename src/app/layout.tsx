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
  return (
    <html suppressHydrationWarning>
      <body className="antialiased bg-background text-foreground font-sans">
        {children}
      </body>
    </html>
  )
}