import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import { AdSenseScript } from "@/components/adsense/adsense-provider";
import { InvalidClickProtection } from "@/components/adsense/invalid-click-protection";
import { AdBlockerDetector } from "@/components/adsense/ad-blocker-detector";
import { Analytics } from "@vercel/analytics/react";
import { CookieConsentBanner } from "@/components/adsense/cookie-consent";
import { SetLocaleAttrs } from "@/components/i18n/set-locale-attrs";

const ADSENSE_CLIENT = 'ca-pub-7035626578237932';
import { GoogleAnalytics } from "@/components/analytics/google-analytics";

// ISR: revalidate every 24h for SEO + AdSense indexing
export const revalidate = 86400

type Props = {
  params: Promise<{ locale: string }>;
  children: React.ReactNode;
};

const localeMetadata: Record<string, { title: string; description: string }> = {
  fr: {
    title: "Utilyx — Suite Multi-Outils 100% Gratuite & Privée",
    description:
      "47+ outils gratuits en ligne : PDF, images, vidéo, SEO, texte, générateurs et calculateurs. Traitement 100% local, sans inscription.",
  },
  en: {
    title: "Utilyx — Free Online Multi-Tool Suite",
    description:
      "47+ free online tools: PDF, images, video, SEO, text, generators and calculators. 100% client-side processing, no signup required.",
  },
  es: {
    title: "Utilyx — Suite de Herramientas Online Gratuitas",
    description:
      "47+ herramientas online gratis: PDF, imágenes, vídeo, SEO, texto, generadores y calculadoras. Procesamiento 100% local, sin registro.",
  },
  de: {
    title: "Utilyx — Kostenlose Online-Werkzeugsammlung",
    description:
      "47+ kostenlose Online-Tools: PDF, Bilder, Video, SEO, Text, Generatoren und Rechner. 100% clientseitige Verarbeitung, keine Anmeldung.",
  },
  ar: {
    title: "Utilyx — مجموعة أدوات مجانية متعددة الوظائف",
    description:
      "47+ أداة مجانية عبر الإنترنت: PDF، صور، فيديو، SEO، نصوص، مولدات وحاسبات. معالجة 100% محلية، بدون تسجيل.",
  },
  pt: {
    title: "Utilyx — Suite de Ferramentas Online Gratuitas",
    description:
      "47+ ferramentas online gratuitas: PDF, imagens, vídeo, SEO, texto, geradores e calculadoras. Processamento 100% local, sem cadastro.",
  },
};

const localeKeywords: Record<string, string[]> = {
  fr: [
    "Utilyx", "outils en ligne gratuits", "suite d'outils gratuite", "compression PDF", "convertir PDF",
    "convertisseur HEIC JPG", "éditer image en ligne", "redimensionner image",
    "découper vidéo en ligne", "compresser vidéo gratuit", "convertir vidéo MP4", "extraire audio vidéo", "vidéo en GIF",
    "générateur QR code", "générateur de mots de passe", "compteur de mots", "différence de texte",
    "convertisseur d'unités", "calculatrice d'âge", "calculatrice IMC",
    "outils web sans inscription", "traitement local sécurisé", "confidentialité garantie",
    "générateur lien WhatsApp direct", "séparer nom prénom Excel", "nettoyeur URL tracking UTM",
    "calculateur dosage béton sac 35kg", "calculateur frais kilométriques", "miniature YouTube HD"
  ],
  en: [
    "Utilyx", "free online tools", "free tool suite", "PDF compressor", "convert PDF online",
    "HEIC to JPG converter", "edit image online", "resize image",
    "trim video online free", "compress video online", "convert video to MP4", "extract audio from video", "video to GIF converter",
    "QR code generator", "password generator", "word counter", "text diff checker",
    "unit converter", "age calculator", "BMI calculator",
    "web tools no signup", "secure local processing", "privacy guaranteed",
    "WhatsApp link generator", "split first last name Excel", "URL tracking cleaner UTM remover",
    "concrete calculator bags cement", "mileage reimbursement calculator", "YouTube thumbnail downloader"
  ],
  es: [
    "Utilyx", "herramientas online gratis", "suite de herramientas gratis", "compresor PDF", "convertir PDF",
    "convertidor HEIC JPG", "editar imagen online", "recortar video online",
    "comprimir video gratis", "generador QR código", "contador de palabras", "convertidor de unidades",
    "herramientas web sin registro", "procesamiento local seguro",
    "generador enlace WhatsApp", "separar nombres y apellidos", "limpiador URL UTM",
    "calculadora hormigón cemento", "calculadora kilometraje", "miniatura YouTube"
  ],
  de: [
    "Utilyx", "kostenlose Online-Tools", "PDF Kompressor", "HEIC zu JPG Konverter",
    "Video online schneiden", "Video komprimieren", "Audio aus Video extrahieren",
    "QR Code Generator", "Wortezähler", "Einheitenumrechner", "Online-Tools ohne Anmeldung", "lokale Verarbeitung DSGVO",
    "WhatsApp-Link Generator", "Namen trennen Excel", "URL Tracking entfernen",
    "Betonrechner Zement", "Kilometerpauschale Rechner", "YouTube Thumbnail herunterladen"
  ],
  ar: [
    "Utilyx", "أدوات مجانية عبر الإنترنت", "ضغط PDF", "تحويل PDF", "تحويل HEIC إلى JPG",
    "تعديل الصور", "قص الفيديو", "ضغط الفيديو المجاني", "تحويل الفيديو",
    "مولد QR كود", "عداد الكلمات", "بدون تسجيل", "معالجة محلية آمنة",
    "رابط واتساب مباشر", "فاصل الأسماء", "منظف الروابط UTM",
    "حاسبة الخرسانة", "حاسبة المسافات", "صورة يوتيوب المصغرة"
  ],
  pt: [
    "Utilyx", "ferramentas online gratuitas", "compressor PDF", "conversor HEIC JPG",
    "cortar vídeo online", "comprimir vídeo", "converter vídeo",
    "gerador QR code", "contador de palavras", "conversor de unidades",
    "ferramentas web sem cadastro", "processamento local seguro",
    "gerador link WhatsApp", "separador nomes Excel", "limpador URL UTM",
    "calculadora concreto cimento", "calculadora quilometragem", "miniatura YouTube"
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
      languages: {
        'x-default': `${BASE_URL}/fr`,
        ...Object.fromEntries(routing.locales.map((l) => [l, `${BASE_URL}/${l}`])),
      },
    },
    icons: {
      icon: "/favicon.ico",
      apple: "/logo.png",
    },
    verification: {
      google: 'vUtilyx-verify',
    },
    other: {
      'google-adsense-account': ADSENSE_CLIENT,
    },
  };
}

export const dynamic = 'force-dynamic'
export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Enable static rendering for next-intl (avoids headers() during prerender)
  setRequestLocale(locale);

  const messages = (await import(`../../messages/${locale}.json`)).default;

  const dir = locale === "ar" ? "rtl" : "ltr";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Utilyx",
    url: `https://utilyx.app/${locale}`,
    description: localeMetadata[locale]?.description || localeMetadata.fr.description,
    inLanguage: locale,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any (Web Browser)",
    featureList: [
      "Convertisseurs et compresseurs PDF",
      "Outils de manipulation vidéo (découpage, conversion, compression)",
      "Modificateurs d'images (redimensionnement, filtres)",
      "Générateurs (Mots de passe, QR Codes, Lien WhatsApp, UUID)",
      "Calculateurs (Dosage béton, Frais kilométriques, IMC, Âge)",
      "Outils texte (Séparateur nom/prénom, Nettoyeur URL tracking)",
      "Traitement local (Offline First)"
    ],
    offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
  }

  return (
    <>
      <SetLocaleAttrs locale={locale} dir={dir} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ThemeProvider
        attribute="class"
        defaultTheme={locale === "ar" ? "dark" : "light"}
        enableSystem
        disableTransitionOnChange
      >
        {/* Google Analytics */}
        <GoogleAnalytics />
        {/* AdSense script (client-side only to prevent hydration mismatch) */}
        <AdSenseScript />
        <NextIntlClientProvider messages={messages}>
          {children}
          <CookieConsentBanner />
          <InvalidClickProtection />
          <AdBlockerDetector />
        </NextIntlClientProvider>
      <Toaster />
      </ThemeProvider>
      <Analytics />
    </>
  );
}
