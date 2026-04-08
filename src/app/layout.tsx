import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://utilyx.io"),
  title: {
    default: "Utilyx — Suite Multi-Outils 100% Gratuite & Privée",
    template: "%s | Utilyx",
  },
  description:
    "Compressez vos PDF, optimisez vos images, convertissez vos fichiers et boostez votre SEO. 12 outils gratuits, sans inscription, 100% côté client. Vos données ne quittent jamais votre navigateur.",
  keywords: [
    "outils en ligne",
    "compression PDF",
    "fusion PDF",
    "signature PDF",
    "optimisation image",
    "convertisseur WebP",
    "convertisseur AVIF",
    "testeur regex",
    "générateur meta tags",
    "sitemap generator",
    "JSON CSV converter",
    "outil gratuit",
    "outil en ligne gratuit",
    "no signup tools",
    "privacy first tools",
    "client side processing",
    "Utilyx",
  ],
  authors: [{ name: "Utilyx Team" }],
  creator: "Utilyx",
  publisher: "Utilyx",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://utilyx.io",
    siteName: "Utilyx",
    title: "Utilyx — Suite Multi-Outils 100% Gratuite & Privée",
    description:
      "12 outils gratuits pour vos PDF, images et SEO. Traitement 100% local, aucune donnée envoyée sur un serveur.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Utilyx — Suite Multi-Outils",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Utilyx — Suite Multi-Outils 100% Gratuite & Privée",
    description:
      "12 outils gratuits pour vos PDF, images et SEO. Traitement 100% local.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://utilyx.io",
  },
};

// JSON-LD Structured Data for the platform
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Utilyx",
  url: "https://utilyx.io",
  description:
    "Suite multi-outils en ligne gratuite : compression PDF, optimisation d'images, outils SEO et bien plus. 100% côté client, sans inscription.",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any (Web Browser)",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "EUR",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    ratingCount: "1280",
  },
  featureList: [
    "Compression PDF",
    "Fusion PDF",
    "Conversion PDF en images",
    "Signature PDF",
    "Convertisseur d'images universel (WebP, AVIF, JPG, PNG)",
    "Compression d'images avec comparaison avant/après",
    "Redimensionnement d'images",
    "Suppression d'arrière-plan",
    "Convertisseur JSON/CSV",
    "Testeur d'expressions régulières",
    "Générateur de meta tags SEO",
    "Générateur de sitemap XML et robots.txt",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground font-sans`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
