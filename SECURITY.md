# Security Guidelines for Utilyx

## Environment Variables

### Required Variables

| Variable | Scope | Description |
|----------|-------|-------------|
| `DATABASE_URL` | Production | PostgreSQL connection string (managed via Vercel) |
| `NEXT_PUBLIC_SITE_URL` | Production | Site URL (e.g., `https://utilyx.app`) |
| `ADMIN_API_KEY` | Production | Admin API authentication key (optional) |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Production | Google Analytics 4 ID (optional) |

### Setup Instructions

1. **For Production (Vercel):**
   ```bash
   vercel env add DATABASE_URL
   # Enter your PostgreSQL connection string when prompted
   # Select "Production" and "Preview" environments
   ```

2. **For Local Development:**
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local with your local DATABASE_URL
   ```

3. **Sync from Vercel:**
   ```bash
   vercel env pull
   ```

## Database Credentials

**NEVER commit database credentials to the repository.**

- Credentials are managed via Vercel Environment Variables
- Local credentials go in `.env.local` (gitignored)
- The files `.env`, `.env.production` are templates only (no credentials)

## Security Features

- **Rate Limiting:** All public API endpoints have rate limits (5-60 req/min)
- **Input Validation:** Zod schemas validate all user input
- **PII Protection:** No personal data logged to console
- **CSP Headers:** Content Security Policy configured for AdSense + analytics
- **HTTPS:** HSTS enabled in production

## Reporting Vulnerabilities

Contact: security@utilyx.app
