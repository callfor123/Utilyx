import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { AdSenseScript } from "@/components/adsense/adsense-provider";
import { InvalidClickProtection } from "@/components/adsense/invalid-click-protection";
import { AdBlockerDetector } from "@/components/adsense/ad-blocker-detector";
import { Analytics } from "@vercel/analytics/react";
import { CookieConsentBanner } from "@/components/adsense/cookie-consent";
import { SetLocaleAttrs } from "@/components/i18n/set-locale-attrs";

const ADSENSE_CLIENT = 'ca-pub-7035626578237932';
import { GoogleAnalytics } from "@/components/analytics/google-analytics";

// Prevent static prerendering — the locale layout uses client-side context
// providers (ThemeProvider, NextIntlClientProvider) that crash during SSG
// because React context is null when Next.js 16 prerenders pages like
// /_global-error through this layout tree.
export const dynamic = 'force-dynamic'

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
    keywords: locale === 'fr'
      ? ['Utilyx', 'outils en ligne gratuits', 'suite multi-outils', 'sans inscription', 'traitement local']
      : locale === 'en'
        ? ['Utilyx', 'free online tools', 'multi-tool suite', 'no signup', 'local processing']
        : locale === 'es'
          ? ['Utilyx', 'herramientas online gratis', 'sin registro', 'procesamiento local']
          : locale === 'de'
            ? ['Utilyx', 'kostenlose Online-Tools', 'ohne Anmeldung', 'lokale Verarbeitung']
            : locale === 'ar'
              ? ['Utilyx', 'أدوات مجانية عبر الإنترنت', 'بدون تسجيل', 'معالجة محلية']
              : ['Utilyx', 'ferramentas online gratuitas', 'sem cadastro', 'processamento local'],
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
    manifest: "/manifest.webmanifest",
    themeColor: "#6366f1",
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

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Enable static rendering for next-intl (avoids headers() during prerender)
  setRequestLocale(locale);

  const messages = (await import(`../../messages/${locale}.json`)).default;

  const dir = locale === "ar" ? "rtl" : "ltr";

  const softwareAppLd = {
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

  const orgLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Utilyx",
    url: "https://utilyx.app",
    logo: "https://utilyx.app/logo.png",
    sameAs: [],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "contact@utilyx.app",
      url: "https://utilyx.app/fr/contact",
    },
  }

  const webSiteLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Utilyx",
    url: "https://utilyx.app",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://utilyx.app/{locale}?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  }

  return (
    <html lang={locale} dir={dir}>
      <head>
        <SetLocaleAttrs key="set-locale-attrs" locale={locale} dir={dir} />
        <script
          key="ld-software-app"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppLd) }}
        />
        <script
          key="ld-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }}
        />
        <script
          key="ld-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteLd) }}
        />
      </head>
      <body>
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
      </body>
    </html>
  );
}