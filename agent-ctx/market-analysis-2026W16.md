# Analyse de Marché — Utilyx.app (Semaine 16, Avril 2026)

## État des lieux Utilyx

**53 outils** répartis en 7 catégories :

| Catégorie | Outils |
|-----------|--------|
| calculators | 10 (IMC, âge, TVA, pourboire, %, unités, béton, km, pomodoro, chrono) |
| dev-seo | 9 (JSON, regex, URL, CSS gradient, markdown, meta, sitemap, URL cleaner) |
| generators | 8 (QR, mdp, hash, UUID, WhatsApp, couleurs, nombres, favicon) |
| image | 7 (compresser, convertir, redimensionner, bg-remove, HEIC→JPG, miniature YT, favicon) |
| pdf | 6 (compresser, fusionner, PDF→images, signer, déverrouiller, protéger) |
| text-tools | 6 (compteur, casse, Base64, diff, lorem, nom/prénom) |
| video | 7 (compresser, convertir, découper, GIF, audio ±, miniature) |

---

## Analyse concurrentielle — Outils manquants

### SmallPDF (21+ outils)
Manquants Utilyx : **PDF→Word, PDF→Excel, PDF→PPT, Word→PDF, Excel→PDF, PPT→PDF, Diviser PDF, Rotationner PDF, Éditer/Annoter PDF, Numérotation pages**

### iLovePDF (20+ outils)
Manquants Utilyx : **OCR PDF, PDF/A, Filigrane PDF, Numérotation, PDF→Word/Excel/PPT**

### TinyPNG / TinyJPG
Couvert par Utilyx (compresser-image, convertir-image)

### Canva / Photopea
Manquants Utilyx : **Éditeur photo basique, Collage, Filigrane image, SVG→PNG**

### Concurrents FR émergents
- **PDF24 Tools** : 30+ outils PDF, très bien référencé en FR
- **MultiToolWeb** : 30+ outils généralistes
- **AllFileTools** : conversion PDF + image + documents

---

## Top 10 Outils Prioritaires — Semaine 16

Classement par **score composite** : Volume FR × CPC × (1 / complexité)

| # | Outil | Slug | Catégorie | Vol. FR/mois | CPC € | Complexité | Score |
|---|-------|------|-----------|-------------|-------|------------|-------|
| 1 | **Calculateur prêt immobilier** | `calculateur-pret-immobilier` | calculators | 50K+ | 2.50+ | Moyenne | ★★★★★ |
| 2 | **PDF vers Word** | `pdf-vers-word` | pdf | 40K+ | 1.50+ | Élevée | ★★★★☆ |
| 3 | **Convertisseur de devises** | `convertisseur-devises` | calculators | 30K+ | 1.00+ | Faible | ★★★★☆ |
| 4 | **Simulateur d'impôts** | `simulateur-impots` | calculators | 35K+ | 3.00+ | Moyenne | ★★★★☆ |
| 5 | **Image vers PDF** | `image-vers-pdf` | pdf | 25K+ | 0.80 | Faible | ★★★★☆ |
| 6 | **Diviser PDF** | `diviser-pdf` | pdf | 20K+ | 0.80 | Faible | ★★★★☆ |
| 7 | **Calculateur de calories** | `calculateur-calories` | calculators | 20K+ | 0.80 | Moyenne | ★★★☆☆ |
| 8 | **OCR PDF** | `ocr-pdf` | pdf | 15K+ | 1.00 | Élevée | ★★★☆☆ |
| 9 | **Minifier JS/CSS** | `minifier-js-css` | dev-seo | 10K+ | 0.50 | Faible | ★★★☆☆ |
| 10 | **Filigrane / Watermark** | `ajouter-filigrane` | image | 10K+ | 0.40 | Faible | ★★★☆☆ |

---

## Détail par outil

### 1. Calculateur prêt immobilier ⭐ PRIORITÉ #1
- **Volume FR** : 50K+/mois ("calculateur prêt immobilier", "simulation prêt", "échéancier crédit")
- **CPC** : 2.50–5.00€ (annonceurs bancaires, courtiers, comparateurs)
- **Complexité** : Moyenne — formules d'amortissement standard, graphique amortissement
- **Concurrents** : LaBanquePostale.fr, calculette.havas-vi.fr — peu d'outils gratuits sans pub intrusive
- **Recommandation** : Mensualité + tableau amortissement + coût total crédit. Ajouter prêt auto/conso.

### 2. PDF vers Word
- **Volume FR** : 40K+/mois ("convertir pdf en word", "pdf vers word gratuit")
- **CPC** : 1.50–2.50€ (logiciels PDF premium, SaaS)
- **Complexité** : Élevée — nécessite pdf.js + docx.js, qualité variable côté client
- **Concurrents** : SmallPDF, iLovePDF, PDF24 (tous proposent cet outil)
- **Recommandation** : Commencer par extraction texte simple, puis ajouter mise en page. Alternative : PDF→RTF plus simple.

### 3. Convertisseur de devises
- **Volume FR** : 30K+/mois ("convertisseur devises", "taux de change eur usd")
- **CPC** : 1.00–2.00€ (banques, transferwise, crypto)
- **Complexité** : Faible — API gratuite (exchangerate.host), interface simple
- **Concurrents** : XE.com, Google — mais aucun outil dédié FR sans pub lourde
- **Recommandation** : 50+ devises, historique 7 jours, MAD/DZD/TND pour audience francophone.

### 4. Simulateur d'impôts
- **Volume FR** : 35K+/mois en saison ("calcul impôt revenu", "simulateur impots 2026")
- **CPC** : 3.00–6.00€ (le plus élevé — cabinet comptable, déclaration en ligne)
- **Complexité** : Moyenne — barèmes fiscaux FR à intégrer (tranches, abattements, parts)
- **Concurrents** : impots.gouv.fr (officiel), toutsurmesfinances.com
- **Recommandation** : Barème IR France + option Maroc/Algérie. Forte saisonnalité (mars-juin).

### 5. Image vers PDF
- **Volume FR** : 25K+/mois ("image en pdf", "convertir jpg en pdf")
- **CPC** : 0.80–1.50€
- **Complexité** : Faible — jsPDF ou canvas, assemblage pages
- **Concurrents** : iLovePDF, SmallPDF
- **Recommandation** : JPG/PNG/WEBP → PDF, multi-pages, orientation A4/Lettre.

### 6. Diviser PDF
- **Volume FR** : 20K+/mois ("diviser pdf", "séparer pages pdf")
- **CPC** : 0.80–1.50€
- **Complexité** : Faible — pdf.js extraction par range de pages
- **Concurrents** : SmallPDF, iLovePDF, Sejda
- **Recommandation** : Sélection par plage de pages, extraction de pages spécifiques, renommage.

### 7. Calculateur de calories
- **Volume FR** : 20K+/mois ("calculateur calories", "compteur calories gratuit")
- **CPC** : 0.80–1.50€ (régimes, compléments, apps santé)
- **Complexité** : Moyenne — base de données alimentaire CIQUAL (FR) embarquée
- **Concurrents** : MyFitnessPal, FatSecret (apps), peu d'outils web FR gratuits
- **Recommandation** : CIQUAL simplifié (200+ aliments), calcul par portion, total journalier.

### 8. OCR PDF
- **Volume FR** : 15K+/mois ("ocr pdf gratuit", "extraire texte pdf")
- **CPC** : 1.00–2.00€ (SaaS OCR, Adobe)
- **Complexité** : Élevée — Tesseract.js (~2MB WASM), qualité variable sur PDF scannés
- **Concurrents** : OCR.Space (API), iLovePDF OCR
- **Recommandation** : Tesseract.js côté client, français + anglais, copie presse-papiers.

### 9. Minifier JS/CSS
- **Volume FR** : 10K+/mois ("minifier js", "compresser css", "minify javascript")
- **CPC** : 0.50–0.80€ (hébergement, CDN, outils dev)
- **Complexité** : Faible — terser (JS) + clean-css (CSS), npm packages
- **Concurrents** : minify.js, CSSNano, Toptal minifier
- **Recommandation** : Glisser-déposer ou coller, options (supprimer commentaires, variables locales).

### 10. Filigrane / Watermark image
- **Volume FR** : 10K+/mois ("ajouter filigrane", "watermark photo")
- **CPC** : 0.40–0.80€
- **Complexité** : Faible — Canvas API, superposition texte/image, opacité réglable
- **Concurrents** : Canva, Watermarkly
- **Recommandation** : Texte ou logo, position/taille/opacité, traitement par lot.

---

## Opportunités secondaires (à surveiller)

| Outil | Volume | Note |
|-------|--------|------|
| Rotationner PDF | 12K | Très facile, complète la suite PDF |
| JWT Décodeur | 8K | Niche dev, facile, bon pour SEO technique |
| CSV vers JSON | 8K | Complément de json-csv existant |
| Éditeur photo basique | 15K | Plus complexe mais demande croissante |
| Calculateur pourboire | 8K | Déjà en place ? À vérifier |
| Convertisseur SVG→PNG | 10K | Simple avec browser API |
| Cron expression parser | 5K | Niche dev, très bon SEO |

---

## Recommandations stratégiques

1. **Focus Finance** : Les 2 outils finance (prêt + impôts) représentent le plus fort potentiel AdSense. CPC 2.50–6.00€ vs 0.40–0.80€ pour les outils image/dev. Priorité absolue.

2. **Compléter la suite PDF** : Utilyx a 6 outils PDF vs 20+ chez SmallPDF/iLovePDF. Diviser PDF + Image→PDF sont faciles et à fort volume. PDF→Word est stratégique mais complexe.

3. **Différenciation francophone** : Ajouter MAD/DZD/TND dans les outils financiers cible l'Afrique du Nord francophone, un marché sous-desservi.

4. **Saisonnalité** : Simulateur impôts (mars-juin), Calculateur calories (janvier). Planifier le lancement en conséquence.

5. **Architecture client-side** : Tous ces outils peuvent fonctionner 100% côté client (sauf convertisseur devises qui nécessite une API taux de change), cohérent avec le positionnement "100% privé" d'Utilyx.
