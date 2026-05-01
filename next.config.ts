import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const isDev = process.env.NODE_ENV !== 'production'

const cspDev = [
  "default-src 'self' 'unsafe-inline' 'unsafe-eval' blob: data: http://localhost:3000 ws://localhost:3000",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' blob: http://localhost:3000 https://pagead2.googlesyndication.com https://adservice.google.com https://www.googletagmanager.com https://www.google-analytics.com https://va.vercel-scripts.com",
  "worker-src 'self' blob:",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://pagead2.googlesyndication.com https://tpc.googlesyndication.com https://www.google.com https://www.gstatic.com https://img.youtube.com http://localhost:3000",
  "font-src 'self' data:",
  "connect-src 'self' data: blob: http://localhost:3000 ws://localhost:3000 https://pagead2.googlesyndication.com https://tpc.googlesyndication.com https://www.google-analytics.com https://api.remove.bg",
  "frame-src 'self' https://googleads.g.doubleclick.net https://tpc.googlesyndication.com http://localhost:3000",
].join('; ')

const cspProd = [
  "default-src 'self'",
  "manifest-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' blob: https://pagead2.googlesyndication.com https://adservice.google.com https://www.googletagmanager.com https://www.google-analytics.com https://va.vercel-scripts.com",
  "worker-src 'self' blob:",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://pagead2.googlesyndication.com https://tpc.googlesyndication.com https://www.google.com https://www.gstatic.com https://img.youtube.com",
  "font-src 'self' data:",
  "connect-src 'self' data: blob: https://pagead2.googlesyndication.com https://tpc.googlesyndication.com https://www.google-analytics.com https://api.remove.bg",
  "frame-src 'self' https://googleads.g.doubleclick.net https://tpc.googlesyndication.com",
].join('; ')

const nextConfig: NextConfig = {
  output: 'standalone',
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  experimental: {
    prerenderEarlyExit: false,
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Content-Security-Policy', value: isDev ? cspDev : cspProd },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          ...(isDev
            ? []
            : [{ key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' }]),
        ] as Array<{ key: string; value: string }>,
      },
    ];
  },
};

export default withNextIntl(nextConfig);