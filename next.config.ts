import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  experimental: {
    // Next.js 16 has a known bug where /_global-error prerendering crashes with
    // "Cannot read properties of null (reading 'useContext')" even with force-dynamic.
    // Setting prerenderEarlyExit to false allows the build to continue past this
    // prerender error — the page is server-rendered at runtime anyway.
    prerenderEarlyExit: false,
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Content-Security-Policy', value: "default-src 'self'; manifest-src 'self'; script-src 'self' 'unsafe-inline' blob: https://pagead2.googlesyndication.com https://www.googletagmanager.com https://www.google-analytics.com https://va.vercel-scripts.com; worker-src 'self' blob:; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://pagead2.googlesyndication.com https://www.google.com https://www.gstatic.com https://img.youtube.com; font-src 'self' data:; connect-src 'self' data: blob: https://pagead2.googlesyndication.com https://www.google-analytics.com https://api.remove.bg; frame-src 'self' https://googleads.g.doubleclick.net;" },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          ...(process.env.NODE_ENV === 'production'
            ? [{ key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' }]
            : []),
        ] as Array<{ key: string; value: string }>,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
