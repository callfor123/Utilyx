import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "next-themes";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { ADSENSE_CLIENT } from "@/components/adsense/adsense-provider";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

type Props = {
  params: Promise<{ locale: string }>;
  children: React.ReactNode;
};

const localeMetadata: Record<string, { title: string; description: string }> = {
  fr: {
    title: "Utilyx — Suite Multi-Outils 100% Gratuite & Privée",
    description:
      "32+ outils gratuits en ligne : PDF, images, SEO, texte, générateurs et calculateurs. Traitement 100% local, sans inscription.",
  },
  en: {
    title: "Utilyx — Free Online Multi-Tool Suite",
    description:
      "32+ free online tools: PDF, images, SEO, text, generators and calculators. 100% client-side processing, no signup required.",
  },
  es: {
    title: "Utilyx — Suite de Herramientas Online Gratuitas",
    description:
      "32+ herramientas online gratis: PDF, imágenes, SEO, texto, generadores y calculadoras. Procesamiento 100% local, sin registro.",
  },
  de: {
    title: "Utilyx — Kostenlose Online-Werkzeugsammlung",
    description:
      "32+ kostenlose Online-Tools: PDF, Bilder, SEO, Text, Generatoren und Rechner. 100% clientseitige Verarbeitung, keine Anmeldung.",
  },
  ar: {
    title: "Utilyx — مجموعة أدوات مجانية متعددة الوظائف",
    description:
      "32+ أداة مجانية عبر الإنترنت: PDF، صور، SEO، نصوص، مولدات وحاسبات. معالجة 100% محلية، بدون تسجيل.",
  },
  pt: {
    title: "Utilyx — Suite de Ferramentas Online Gratuitas",
    description:
      "32+ ferramentas online gratuitas: PDF, imagens, SEO, texto, geradores e calculadoras. Processamento 100% local, sem cadastro.",
  },
};

const localeKeywords: Record<string, string[]> = {
  fr: [
    "outils en ligne gratuits",
    "compression PDF",
    "convertisseur HEIC JPG",
    "générateur QR code",
    "compteur de mots",
    "outil gratuit en ligne",
    "Utilyx",
  ],
  en: [
    "free online tools",
    "PDF compressor",
    "HEIC to JPG converter",
    "QR code generator",
    "word counter",
    "free tool online",
    "Utilyx",
  ],
  es: [
    "herramientas online gratis",
    "compresor PDF",
    "convertidor HEIC JPG",
    "generador QR código",
    "contador de palabras",
    "Utilyx",
  ],
  de: [
    "kostenlose Online-Tools",
    "PDF Kompressor",
    "HEIC zu JPG Konverter",
    "QR Code Generator",
    "Wortezähler",
    "Utilyx",
  ],
  ar: [
    "أدوات مجانية عبر الإنترنت",
    "ضغط PDF",
    "تحويل HEIC إلى JPG",
    "مولد QR كود",
    "عداد الكلمات",
    "Utilyx",
  ],
  pt: [
    "ferramentas online gratuitas",
    "compressor PDF",
    "conversor HEIC JPG",
    "gerador QR code",
    "contador de palavras",
    "Utilyx",
  ],
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    return {};
  }

  const meta = localeMetadata[locale] || localeMetadata.fr;
  const BASE_URL = "https://utilyx.app";

  return {
    metadataBase: new URL(BASE_URL),
    title: {
      default: meta.title,
      template: "%s | Utilyx",
    },
    description: meta.description,
    keywords: localeKeywords[locale] || localeKeywords.en,
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
      locale:
        locale === "ar"
          ? "ar_SA"
          : locale === "pt"
            ? "pt_BR"
            : `${locale}_${locale.toUpperCase()}`,
      url: `${BASE_URL}/${locale}`,
      siteName: "Utilyx",
      title: meta.title,
      description: meta.description,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: meta.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: ["/og-image.png"],
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `${BASE_URL}/${l}`])
      ),
    },
    icons: {
      icon: "/favicon.ico",
      apple: "/logo.png",
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = (await import(`../../messages/${locale}.json`)).default;

  const dir = locale === "ar" ? "rtl" : "ltr";
  const lang = locale;

  return (
    <html lang={lang} dir={dir} suppressHydrationWarning>
      <head>
        {/* Google AdSense Verification */}
        <meta name="google-adsense-account" content={ADSENSE_CLIENT} />

        {/* Google AdSense Script (Server-side injection for faster loading) */}
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
          crossOrigin="anonymous"
        />

        <link
          rel="alternate"
          hrefLang="x-default"
          href="https://utilyx.app/fr"
        />
        {routing.locales.map((l) => (
          <link
            key={l}
            rel="alternate"
            hrefLang={l}
            href={`https://utilyx.app/${l}`}
          />
        ))}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Utilyx",
              url: `https://utilyx.app/${locale}`,
              description:
                localeMetadata[locale]?.description ||
                localeMetadata.fr.description,
              inLanguage: locale,
              applicationCategory: "UtilitiesApplication",
              operatingSystem: "Any (Web Browser)",
              offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                ratingCount: "3480",
              },
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground font-sans`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme={locale === "ar" ? "dark" : "light"}
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
