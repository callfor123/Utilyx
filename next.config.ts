import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  async redirects() {
    return [
      { source: "/en/pdf/compresser-pdf", destination: "/en/pdf/compress-pdf", permanent: true },
      { source: "/en/pdf/fusionner-pdf", destination: "/en/pdf/merge-pdf", permanent: true },
      { source: "/en/pdf/pdf-en-images", destination: "/en/pdf/pdf-to-images", permanent: true },
      { source: "/en/pdf/signer-pdf", destination: "/en/pdf/sign-pdf", permanent: true },
      { source: "/en/pdf/deverrouiller-pdf", destination: "/en/pdf/unlock-pdf", permanent: true },
      { source: "/en/pdf/proteger-pdf", destination: "/en/pdf/protect-pdf", permanent: true },
      { source: "/en/image/convertir-image", destination: "/en/image/convert-image", permanent: true },
      { source: "/en/image/compresser-image", destination: "/en/image/compress-image", permanent: true },
      { source: "/en/image/redimensionner-image", destination: "/en/image/resize-image", permanent: true },
      { source: "/en/image/supprimer-arriere-plan", destination: "/en/image/remove-background", permanent: true },
      { source: "/en/image/heic-vers-jpg", destination: "/en/image/heic-to-jpg", permanent: true },
      { source: "/en/image/generateur-favicon", destination: "/en/image/favicon-generator", permanent: true },
      { source: "/en/image/telecharger-miniature-youtube", destination: "/en/image/youtube-thumbnail", permanent: true },
      { source: "/en/video/decouper-video", destination: "/en/video/trim-video", permanent: true },
      { source: "/en/video/compresser-video", destination: "/en/video/compress-video", permanent: true },
      { source: "/en/video/convertir-video", destination: "/en/video/convert-video", permanent: true },
      { source: "/en/video/ajouter-audio-video", destination: "/en/video/add-audio-to-video", permanent: true },
      { source: "/en/video/extraire-audio-video", destination: "/en/video/extract-audio-from-video", permanent: true },
      { source: "/en/video/video-en-gif", destination: "/en/video/video-to-gif", permanent: true },
      { source: "/en/video/supprimer-audio-video", destination: "/en/video/remove-audio-from-video", permanent: true },
      { source: "/en/dev-seo/testeur-regex", destination: "/en/dev-seo/regex-tester", permanent: true },
      { source: "/en/dev-seo/formateur-json", destination: "/en/dev-seo/json-formatter", permanent: true },
      { source: "/en/dev-seo/nettoyeur-url-tracking", destination: "/en/dev-seo/url-cleaner", permanent: true },
      { source: "/en/text-tools/compteur-mots", destination: "/en/text-tools/word-counter", permanent: true },
      { source: "/en/text-tools/convertisseur-casse", destination: "/en/text-tools/case-converter", permanent: true },
      { source: "/en/text-tools/base64", destination: "/en/text-tools/base64-encode-decode", permanent: true },
      { source: "/en/text-tools/comparateur-texte", destination: "/en/text-tools/text-diff-checker", permanent: true },
      { source: "/en/text-tools/separateur-nom-prenom", destination: "/en/text-tools/name-splitter", permanent: true },
      { source: "/en/generators/generateur-qr-code", destination: "/en/generators/qr-code-generator", permanent: true },
      { source: "/en/generators/generateur-mot-de-passe", destination: "/en/generators/password-generator", permanent: true },
      { source: "/en/generators/generateur-hash", destination: "/en/generators/hash-generator", permanent: true },
      { source: "/en/generators/generateur-lien-whatsapp", destination: "/en/generators/whatsapp-link", permanent: true },
      { source: "/en/generators/generateur-uuid-guid", destination: "/en/generators/uuid-generator", permanent: true },
      { source: "/en/calculators/calculateur-imc", destination: "/en/calculators/bmi-calculator", permanent: true },
      { source: "/en/calculators/calculateur-age", destination: "/en/calculators/age-calculator", permanent: true },
      { source: "/en/calculators/calculateur-pourcentage", destination: "/en/calculators/percentage-calculator", permanent: true },
      { source: "/en/calculators/convertisseur-unites", destination: "/en/calculators/unit-converter", permanent: true },
      { source: "/en/calculators/calculateur-dosage-beton", destination: "/en/calculators/concrete-calculator", permanent: true },
      { source: "/en/calculators/calculateur-frais-kilometriques", destination: "/en/calculators/mileage-calculator", permanent: true },
      { source: "/en/generators/convertisseur-couleurs", destination: "/en/generators/color-converter", permanent: true },
      { source: "/en/calculators/chronometre", destination: "/en/calculators/stopwatch", permanent: true },
      { source: "/en/calculators/timer-pomodoro", destination: "/en/calculators/pomodoro-timer", permanent: true },
    ]
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
          process.env.NODE_ENV === 'production' ? { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' } : null,
          { key: 'Content-Security-Policy', value: "default-src 'self'; script-src 'self' 'unsafe-inline' https://pagead2.googlesyndication.com https://www.googletagmanager.com https://www.google-analytics.com https://va.vercel-scripts.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://pagead2.googlesyndication.com https://www.google.com https://www.gstatic.com https://img.youtube.com; font-src 'self' data:; connect-src 'self' https://pagead2.googlesyndication.com https://www.google-analytics.com https://api.remove.bg; frame-src 'self' https://googleads.g.doubleclick.net;" },
        ].filter(Boolean),
      },
    ];
  },
};

export default withNextIntl(nextConfig);
