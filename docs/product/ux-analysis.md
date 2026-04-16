# Utilyx - Analyse UX Concurrentielle

## Patterns UX observés chez les concurrents

### SmallPDF — Le gold standard UX
- **Layout**: Page d'accueil en grille d'icônes colorées (3 colonnes), chaque outil = 1 carte
- **Workflow outil**: 3 étapes max — Upload → Config → Download (wizard linéaire)
- **CTA principal**: "Choose Files" bien visible, drag-and-drop zone large
- **Trust elements**: "Swiss-made" branding, 2G+ users badge, SSL, GDPR compliance
- **Mobile**: PWA optimisée, bottom sheet pour upload
- **Freemium gate**: Modal après 2e utilisation/jour avec pricing

### iLovePDF — Le plus complet
- **Layout**: Grille d'icônes 4 colonnes, catégories (Convert, Organize, Optimize)
- **Workflow outil**: Upload → Options simples → Process → Download
- **CTA principal**: "Select PDF files" + drag zone
- **Trust elements**: Logo brands (Google, Microsoft), compteur utilisateurs
- **Mobile**: Apps natives iOS/Android (meilleur que PWA)
- **Freemium gate**: Watermark sur exports gratuits, batch réservé Premium

### PDF24 — Le plus fonctionnel, UX la moins premium
- **Layout**: Liste dense d'outils (28+), pas de catégorisation visuelle claire
- **Workflow outil**: Upload → Nombreuses options (trop) → Process → Download
- **CTA principal**: "Select files" petit, perdu dans les options
- **Trust elements**: "100% free" partout, pas de branding premium
- **Mobile**: Responsive basique, pas d'app
- **Pas de freemium gate**: Tout est gratuit, monétisation via ads intrusives

## Recommandations UX pour Utilyx

### Layout d'accueil
- Grille de cartes 3 colonnes (desktop) / 2 colonnes (tablet) / 1 colonne (mobile)
- Catégorisation claire: PDF Tools, Image Tools, Calculators, Generators
- Chaque carte: icône + nom outil + description courte (1 ligne)
- Barre de recherche en haut (comme SmallPDF)

### Workflow outil (3 étapes max)
1. **Upload**: Zone drag-and-drop large + "Browse files" button + URL paste option
2. **Configure**: Options minimales par défaut, "Advanced options" dépliable
3. **Process & Download**: Barre de progression, preview, download button

### Trust elements
- Badge "100% Free — No Watermark" en haut de chaque page
- Counter "X files processed today"
- SSL/GDPR badges
- Pas de popup freemium — modèle ads non-intrusif

### SEO-first UX
- Contenu SEO sous l'outil (FAQ, how-to, related tools)
- Breadcrumbs: Home > PDF Tools > Compress PDF
- Internal linking: "Related tools" section sous chaque outil
- Schema markup (FAQ + HowTo) invisible dans le render mais présent dans le DOM

### Mobile-first
- Bottom sheet pour upload (comme SmallPDF PWA)
- Touch-friendly: boutons 48px minimum
- Pas de hover states critiques — tout doit être tap-friendly
- Sticky CTA "Download" en bas sur mobile
ROADMAP
echo "UX analysis written"