# CTO Briefing — Utilyx Phase 1

## Contexte
ProductManager a validé la roadmap basée sur l'analyse concurrentielle (SmallPDF, iLovePDF, PDF24) et l'analyse i18n (6 langues). Ce briefing synthétise les requirements techniques pour le CTO.

## Décisions produit validées

### Positionnement
**"UX premium + 100% gratuit sans watermark"** — Gap entre SmallPDF (UX premium mais paywall restrictif) et PDF24 (gratuit mais UX médiocre).

### Phase 1: 10 outils PDF (Semaines 1-6)
Priorisés par volume de recherche cumulé:

| Priorité | Outil | Volume/mois | Complexité tech |
|----------|-------|-------------|-----------------|
| P0 | Compress PDF | 1.2M | Moyenne (ghostscript/qpdf) |
| P0 | Merge PDF | 1.5M | Faible (qpdf/ghostscript) |
| P0 | PDF to Word | 1.1M | Haute (OCR + conversion) |
| P0 | Word to PDF | 820K | Faible (libreoffice headless) |
| P0 | Split PDF | 550K | Faible (qpdf) |
| P1 | PDF to JPG | 450K | Moyenne (imagemagick) |
| P1 | Edit PDF | 450K | Haute (pdf-lib + canvas) |
| P1 | JPG to PDF | 370K | Faible (imagemagick) |
| P2 | PDF to Excel | 246K | Haute (OCR + tabular extraction) |
| P2 | Sign PDF | 201K | Moyenne (pdf-lib signing) |

### Phase 2: 10 outils PDF longue traîne (Semaines 7-8)
Rotate, Unlock, Protect, OCR, Crop, PDF to PPT, Watermark, Page Numbers, Redact, Repair

### Phases 3-5: Image Tools → Calculateurs → Générateurs (Semaines 9-20)

## Requirements techniques

### Architecture
- **Framework**: Next.js (déjà en place avec `next-intl`)
- **Processing**: Worker asynchrone (Bull/BullMQ + Redis) pour les tâches lourdes
- **Storage**: Temp file cleanup après 24h max (RGPD)
- **CDN**: Cloudflare pour les assets statiques
- **Monitoring**: Core Web Vitals LCP < 2.5s, FID < 100ms, CLS < 0.1

### i18n — P0 blockers
1. **Migration RTL CSS**: Remplacer `mr-*/ml-*/pl-*/pr-*/left-*/right-` par `ms/me/ps/pe/start/end` dans `page.tsx` et tous les composants tools. Sans ça, l'expérience arabe est cassée.
2. **Hreflang**: Ajouter `pt-BR` et `es-419` en plus des 6 locales existantes.
3. **Font arabe**: Charger Noto Sans Arabic via `next/font` pour les ligatures.

### SEO — Par outil
Chaque page outil doit avoir:
- **Title**: `[Keyword] | [Benefit] | Utilyx` (pattern SmallPDF-inspired)
- **Meta description**: 150-160 chars, action-oriented, "free" keyword
- **FAQ Schema**: 5-8 Q/R (People Also Ask targeting)
- **HowTo Schema**: Étapes numérotées
- **Hreflang**: x-default + fr, en, es, de, ar, pt, pt-BR, es-419
- **Canonical URL**: `utilyx.app/{locale}/{category}/{slug}`

### URL patterns (validés)
```
utilyx.app/{locale}/{category}/{slug}
utilyx.app/fr/pdf-tools/compresser-pdf
utilyx.app/en/pdf-tools/compress-pdf
utilyx.app/de/pdf-tools/pdf-komprimieren
utilyx.app/ar/pdf-tools/ضغط-pdf
```

## Risques identifiés

| Risque | Mitigation |
|--------|-----------|
| PDF to Word complexe (OCR) | Commencer par une API tierce (Mathpix/Adobe), migrer en interne |
| PDF to Excel peu de solutions OSS | Utiliser tabula-py ou API externe en v1 |
| Concurrence EN/DE très forte | Miser sur AR (KD ~15-25) et FR comme marchés d'entrée |
| RTL bugs sur mobile | Tester chaque outil en AR dès le dev |

## KPIs Phase 1
- 500K sessions/mois à M+3
- Core Web Vitals green sur tous les outils
- Taux de conversion freemium: 2-3%
- Bounce rate < 40%
- 6 langues live (EN, FR, ES, DE, AR, PT)

## Prochaine étape
Validation CTO → Sprint planning Phase 1
