# Utilyx - Stratégie i18n (6 langues)

## Langues cibles

| Langue | Code | Marché | Volume recherche estimé | Part trafic | RTL |
|--------|------|--------|----------------------|-------------|-----|
| Anglais | en | Global | 45% | 45% | Non |
| Français | fr | FR, CA, BE, CH, AF | 15% | 15% | Non |
| Espagnol | es | ES, MX, AR, CO, PE | 18% | 18% | Non |
| Allemand | de | DE, AT, CH | 10% | 10% | Non |
| Portugais | pt | BR, PT, AO, MZ | 8% | 8% | Non |
| Arabe | ar | SA, AE, EG, MA, DZ | 4% | 4% | Oui |

## Structure URL
- Sous-répertoires: `utilyx.app/en/pdf-merge`, `utilyx.app/fr/fusionner-pdf`
- Pas de sous-domaines (plus facile pour DA)
- hreflang dans <head> pour chaque page

## Termes de recherche par outil

### PDF Merge
| Langue | Terme principal | Volume estimé |
|--------|-----------------|---------------|
| EN | merge pdf | 250K |
| FR | fusionner pdf | 40K |
| ES | unir pdf | 25K |
| DE | pdf zusammenfügen | 35K |
| PT | juntar pdf | 20K |
| AR | دمج ملفات بي دي إف | 10K |

### PDF Compress
| Langue | Terme principal | Volume estimé |
|--------|-----------------|---------------|
| EN | compress pdf | 300K |
| FR | compresser pdf | 50K |
| ES | comprimir pdf | 30K |
| DE | pdf komprimieren | 40K |
| PT | comprimir pdf | 25K |
| AR | ضغط ملفات بي دي إف | 8K |

### Image Compress
| Langue | Terme principal | Volume estimé |
|--------|-----------------|---------------|
| EN | compress image | 200K |
| FR | compresser image | 30K |
| ES | comprimir imagen | 20K |
| DE | bild komprimieren | 25K |
| PT | comprimir imagem | 15K |
| AR | ضغط الصور | 12K |

## Considérations RTL (Arabe)
- Layout mirror: navigation droite→gauche
- Font: Noto Sans Arabic (Google Fonts)
- Input fields align-right
- Step indicators reversed
- CSS: `dir="rtl"` sur <html>
