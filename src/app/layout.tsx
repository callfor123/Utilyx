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
    "32+ outils gratuits en ligne : compression PDF, optimisation d'images, outils SEO, compteur de mots, QR code, mot de passe, calculateurs. Traitement 100% local, sans inscription.",
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
    "JSON formatter",
    "URL encode decode",
    "CSS gradient generator",
    "markdown preview",
    "word counter",
    "compteur de mots",
    "case converter",
    "lorem ipsum generator",
    "base64 encode decode",
    "text diff checker",
    "QR code generator",
    "générateur QR code",
    "password generator",
    "générateur mot de passe",
    "hash generator",
    "MD5 SHA256",
    "color picker",
    "BMI calculator",
    "calcul IMC",
    "age calculator",
    "calculateur âge",
    "percentage calculator",
    "calculateur pourcentage",
    "unit converter",
    "convertisseur unités",
    "HEIC to JPG converter",
    "convertir HEIC en JPG",
    "iPhone photo converter",
    "favicon generator",
    "générateur favicon",
    "favicon generator online",
    "PDF unlock",
    "PDF remove password",
    "déverrouiller PDF",
    "PDF password remover",
    "PDF protect",
    "PDF add password",
    "protéger PDF",
    "PDF password",
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
    title: "Utilyx — 32+ Outils Gratuits en Ligne",
    description:
      "PDF, images, SEO, texte, générateurs et calculateurs. 32+ outils gratuits, sans inscription, 100% côté client.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Utilyx — Suite Multi-Outils Gratuite",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Utilyx — 32+ Outils Gratuits en Ligne",
    description:
      "PDF, images, SEO, texte, générateurs et calculateurs. 32+ outils gratuits, traitement 100% local.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://utilyx.io",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/logo.png",
  },
};

// JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Utilyx",
  url: "https://utilyx.io",
  description:
    "Suite multi-outils en ligne gratuite : PDF, images, SEO, texte, générateurs et calculateurs. 100% côté client, sans inscription.",
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
    ratingCount: "2480",
  },
  featureList: [
    "Compression PDF",
    "Fusion PDF",
    "Conversion PDF en images",
    "Signature PDF",
    "Convertisseur d'images universel (WebP, AVIF, JPG, PNG)",
    "Compression d'images",
    "Redimensionnement d'images",
    "Suppression d'arrière-plan",
    "Convertisseur JSON/CSV",
    "Testeur d'expressions régulières",
    "Générateur de meta tags SEO",
    "Générateur de sitemap XML et robots.txt",
    "JSON Formatter et minifier",
    "URL Encode/Decode",
    "CSS Gradient Generator",
    "Markdown Preview",
    "Compteur de mots et caractères",
    "Convertisseur de casse",
    "Générateur Lorem Ipsum",
    "Base64 Encode/Decode",
    "Comparateur de texte",
    "Générateur de QR codes",
    "Générateur de mots de passe sécurisés",
    "Générateur de hash (MD5, SHA-256, SHA-512)",
    "Color Picker avec HEX/RGB/HSL",
    "Calculateur BMI/IMC",
    "Calculateur d'âge exact",
    "Calculateur de pourcentages",
    "Convertisseur d'unités",
    "Convertisseur HEIC vers JPG/PNG",
    "Générateur de favicons multi-formats",
    "Déverrouillage de PDF protégés",
    "Protection et métadonnées PDF",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
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
          defaultTheme="light"
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
