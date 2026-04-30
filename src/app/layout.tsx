import Script from 'next/script'
import './globals.css'

export const dynamic = 'force-dynamic'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <head>
        <Script
          id="adsense-script"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7035626578237932"
          strategy="beforeInteractive"
          crossOrigin="anonymous"
          async
        />
      </head>
      <body className="antialiased bg-background text-foreground font-sans">
        {children}
      </body>
    </html>
  )
}