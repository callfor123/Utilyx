import { create } from 'zustand'

export type ToolId =
  | 'pdf-compress'
  | 'pdf-merge'
  | 'pdf-convert'
  | 'pdf-sign'
  | 'img-convert'
  | 'img-compress'
  | 'img-resize'
  | 'img-bgremove'
  | 'json-csv'
  | 'regex-tester'
  | 'meta-tags'
  | 'sitemap-robots'
  | 'json-formatter'
  | 'url-encode-decode'
  | 'css-gradient-generator'
  | 'markdown-preview'
  | 'word-counter'
  | 'case-converter'
  | 'lorem-ipsum-generator'
  | 'base64-encode-decode'
  | 'text-diff-checker'
  | 'qr-code-generator'
  | 'password-generator'
  | 'hash-generator'
  | 'color-picker'
  | 'bmi-calculator'
  | 'age-calculator'
  | 'percentage-calculator'
  | 'unit-converter'
  | 'heic-to-jpg'
  | 'favicon-generator'
  | 'pdf-unlock'
  | 'pdf-protect'

export type ModuleId = 'pdf' | 'image' | 'dev-seo' | 'text-tools' | 'generators' | 'calculators' | 'home'

interface ToolsState {
  activeModule: ModuleId
  activeTool: ToolId | null
  setActiveModule: (module: ModuleId) => void
  setActiveTool: (tool: ToolId | null) => void
}

export const useToolsStore = create<ToolsState>((set) => ({
  activeModule: 'home',
  activeTool: null,
  setActiveModule: (module) => set({ activeModule: module, activeTool: null }),
  setActiveTool: (tool) => set({ activeTool: tool }),
}))

export interface ModuleDef {
  id: ModuleId
  label: string
  icon: string
  description: string
  tools: { id: ToolId; label: string; icon: string; description: string }[]
}

export const modules: ModuleDef[] = [
  {
    id: 'pdf',
    label: 'PDF & Documents',
    icon: 'FileText',
    description: 'Compression, fusion, conversion et signature de PDF',
    tools: [
      { id: 'pdf-compress', label: 'Compression PDF', icon: 'FileDown', description: 'Réduire la taille de vos fichiers PDF' },
      { id: 'pdf-merge', label: 'Fusion PDF', icon: 'Merge', description: 'Fusionner plusieurs PDF en un seul' },
      { id: 'pdf-convert', label: 'PDF vers Images', icon: 'Image', description: 'Convertir vos PDF en JPG ou PNG' },
      { id: 'pdf-sign', label: 'Signature PDF', icon: 'PenTool', description: 'Signer et annoter vos documents' },
      { id: 'pdf-unlock', label: 'Déverrouiller PDF', icon: 'Unlock', description: 'Retirer le mot de passe d\'un PDF' },
      { id: 'pdf-protect', label: 'Protéger PDF', icon: 'ShieldCheck', description: 'Ajouter un mot de passe à votre PDF' },
    ],
  },
  {
    id: 'image',
    label: 'Images',
    icon: 'Image',
    description: 'Conversion, compression et optimisation d\'images',
    tools: [
      { id: 'img-convert', label: 'Convertisseur Universel', icon: 'RefreshCw', description: 'Convertir en WebP, AVIF, JPG, PNG' },
      { id: 'img-compress', label: 'Compression Image', icon: 'FileDown', description: 'Optimiser le poids de vos images' },
      { id: 'img-resize', label: 'Redimensionnement', icon: 'Maximize2', description: 'Redimensionner vos images facilement' },
      { id: 'img-bgremove', label: 'Détourage', icon: 'Scissors', description: 'Supprimer l\'arrière-plan des images' },
      { id: 'heic-to-jpg', label: 'HEIC vers JPG', icon: 'Smartphone', description: 'Convertir photos iPhone HEIC en JPG ou PNG' },
      { id: 'favicon-generator', label: 'Générateur de Favicon', icon: 'Globe', description: 'Générer favicon et icônes pour votre site' },
    ],
  },
  {
    id: 'dev-seo',
    label: 'Dev & SEO',
    icon: 'Code',
    description: 'Outils pour développeurs et SEO',
    tools: [
      { id: 'json-csv', label: 'JSON / CSV', icon: 'Braces', description: 'Convertir et formater JSON et CSV' },
      { id: 'regex-tester', label: 'Testeur Regex', icon: 'Terminal', description: 'Tester vos expressions régulières' },
      { id: 'meta-tags', label: 'Meta Tags', icon: 'Search', description: 'Générer et prévisualiser les meta tags' },
      { id: 'sitemap-robots', label: 'Sitemap / Robots.txt', icon: 'Globe', description: 'Générer sitemap XML et robots.txt' },
      { id: 'json-formatter', label: 'JSON Formatter', icon: 'Braces', description: 'Formater, valider et minifier du JSON' },
      { id: 'url-encode-decode', label: 'URL Encode/Decode', icon: 'Link', description: 'Encoder et décoder des URLs' },
      { id: 'css-gradient-generator', label: 'CSS Gradient', icon: 'Paintbrush', description: 'Créer des dégradés CSS visuellement' },
      { id: 'markdown-preview', label: 'Markdown Preview', icon: 'FileCode', description: 'Éditeur Markdown avec aperçu en direct' },
    ],
  },
  {
    id: 'text-tools',
    label: 'Text Tools',
    icon: 'Type',
    description: 'Compteur de mots, convertisseur de casse et outils texte',
    tools: [
      { id: 'word-counter', label: 'Compteur de Mots', icon: 'Hash', description: 'Compter mots, caractères et phrases' },
      { id: 'case-converter', label: 'Convertisseur de Casse', icon: 'ArrowDownUp', description: 'Convertir majuscules, minuscules, camelCase…' },
      { id: 'lorem-ipsum-generator', label: 'Lorem Ipsum', icon: 'FileText', description: 'Générer du texte placeholder' },
      { id: 'base64-encode-decode', label: 'Base64 Encode/Decode', icon: 'Lock', description: 'Encoder et décoder en Base64' },
      { id: 'text-diff-checker', label: 'Comparateur de Texte', icon: 'Diff', description: 'Comparer deux textes et voir les différences' },
    ],
  },
  {
    id: 'generators',
    label: 'Generators',
    icon: 'Wand2',
    description: 'QR code, mots de passe, hash et palette de couleurs',
    tools: [
      { id: 'qr-code-generator', label: 'QR Code Generator', icon: 'QrCode', description: 'Générer des QR codes pour URLs et texte' },
      { id: 'password-generator', label: 'Password Generator', icon: 'KeyRound', description: 'Générer des mots de passe sécurisés' },
      { id: 'hash-generator', label: 'Hash Generator', icon: 'Hash', description: 'Générer MD5, SHA-1, SHA-256, SHA-512' },
      { id: 'color-picker', label: 'Color Picker', icon: 'Palette', description: 'Picker de couleur avec HEX, RGB, HSL' },
    ],
  },
  {
    id: 'calculators',
    label: 'Calculators',
    icon: 'Calculator',
    description: 'BMI, âge, pourcentages et conversions d\'unités',
    tools: [
      { id: 'bmi-calculator', label: 'BMI Calculator', icon: 'Heart', description: 'Calculer votre indice de masse corporelle' },
      { id: 'age-calculator', label: 'Age Calculator', icon: 'Calendar', description: 'Calculer votre âge exact en jours' },
      { id: 'percentage-calculator', label: 'Percentage Calculator', icon: 'Percent', description: 'Tous les calculs de pourcentages' },
      { id: 'unit-converter', label: 'Unit Converter', icon: 'ArrowRightLeft', description: 'Convertir longueur, poids, température, volume' },
    ],
  },
]
