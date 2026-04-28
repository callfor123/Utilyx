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
  | 'img-ocr'
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
  | 'video-trim'
  | 'video-add-audio'
  | 'video-convert'
  | 'video-compress'
  | 'video-extract-audio'
  | 'video-to-gif'
  | 'video-remove-audio'
  | 'youtube-thumbnail'
  | 'uuid-generator'
  | 'whatsapp-link'
  | 'name-splitter'
  | 'url-cleaner'
  | 'concrete-calculator'
  | 'mileage-calculator'
  | 'color-converter'
  | 'stopwatch'
  | 'pomodoro-timer'
  | 'tip-calculator'
  | 'random-number-generator'
  | 'vat-calculator'
  | 'discount-calculator'
  | 'time-converter'

export type ModuleId = 'pdf' | 'image' | 'video' | 'dev-seo' | 'text-tools' | 'generators' | 'calculators' | 'home'

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
      { id: 'pdf-compress', label: 'Compression PDF', icon: 'FileDown', description: 'Compressez vos fichiers PDF gratuitement en ligne et réduisez leur taille jusqu\'à 80% sans perte de qualité visible' },
      { id: 'pdf-merge', label: 'Fusion PDF', icon: 'Merge', description: 'Fusionnez plusieurs fichiers PDF en un seul document gratuitement, avec réorganisation par glisser-déposer et sans inscription' },
      { id: 'pdf-convert', label: 'PDF vers Images', icon: 'Image', description: 'Convertissez chaque page de vos PDF en images JPG ou PNG haute résolution, gratuitement en ligne et sans inscription' },
      { id: 'pdf-sign', label: 'Signature PDF', icon: 'PenTool', description: 'Signez vos documents PDF en ligne : signature manuscrite, tapée ou importée, sans inscription ni serveur distant' },
      { id: 'pdf-unlock', label: 'Déverrouiller PDF', icon: 'Unlock', description: 'Retirez le mot de passe d\'un PDF protégé en un clic, traitement 100% local dans votre navigateur, sans inscription' },
      { id: 'pdf-protect', label: 'Protéger PDF', icon: 'ShieldCheck', description: 'Protégez vos PDF avec un mot de passe et chiffrement AES-256, gratuitement et sans inscription, 100% local' },
    ],
  },
  {
    id: 'image',
    label: 'Images',
    icon: 'Image',
    description: 'Conversion, compression et extraction d\'images',
    tools: [
      { id: 'img-convert', label: 'Convertisseur Universel', icon: 'RefreshCw', description: 'Convertissez vos images en WebP, AVIF, JPG, PNG et plus — optimisation web et SEO, gratuit en ligne' },
      { id: 'img-compress', label: 'Compression Image', icon: 'FileDown', description: 'Compressez vos images JPG, PNG et WebP pour réduire leur poids sans perte de qualité visible' },
      { id: 'img-resize', label: 'Redimensionnement', icon: 'Maximize2', description: 'Redimensionnez vos images par pourcentage ou dimensions exactes, gratuitement et sans inscription' },
      { id: 'img-bgremove', label: 'Détourage', icon: 'Scissors', description: 'Supprimez l\'arrière-plan de vos images automatiquement grâce à l\'IA, résultat PNG transparent' },
      { id: 'img-ocr', label: 'OCR Texte', icon: 'ScanText', description: 'Extrayez le texte de vos images avec reconnaissance optique de caractères OCR, 100+ langues' },
      { id: 'heic-to-jpg', label: 'HEIC vers JPG', icon: 'Smartphone', description: 'Convertissez vos photos iPhone HEIC en JPG ou PNG universellement compatibles, gratuit en ligne' },
      { id: 'favicon-generator', label: 'Générateur d\'icônes', icon: 'Globe', description: 'Générez un pack complet de favicons et icônes pour votre site : ICO, Apple, Android, PWA' },
      { id: 'youtube-thumbnail', label: 'Miniatures YouTube', icon: 'Youtube', description: 'Téléchargez les miniatures HD de vidéos YouTube en 1280x720, gratuit et sans inscription' },
    ],
  },
  {
    id: 'video',
    label: 'Vidéo',
    icon: 'Video',
    description: 'Découper, compresser, convertir et éditer des vidéos',
    tools: [
      { id: 'video-trim', label: 'Découper Vidéo', icon: 'Scissors', description: 'Coupez et découpez vos vidéos en quelques secondes, sans réencodage ni perte de qualité' },
      { id: 'video-compress', label: 'Compresser Vidéo', icon: 'FileDown', description: 'Réduisez la taille de vos vidéos jusqu\'à 70% avec plusieurs niveaux de compression, gratuitement' },
      { id: 'video-convert', label: 'Convertir Vidéo', icon: 'RefreshCw', description: 'Convertissez vos vidéos entre MP4, WebM, AVI, MKV et GIF avec FFmpeg, 100% local' },
      { id: 'video-add-audio', label: 'Ajouter Audio', icon: 'Volume2', description: 'Ajoutez une musique ou une voix-off à votre vidéo avec mixage volume indépendant' },
      { id: 'video-extract-audio', label: 'Extraire Audio', icon: 'Music', description: 'Extrayez la piste audio de vos vidéos en MP3, WAV ou AAC avec choix du bitrate' },
      { id: 'video-to-gif', label: 'Vidéo vers GIF', icon: 'Film', description: 'Créez des GIF animés depuis vos vidéos MP4, WebM ou MOV avec ajustement vitesse et qualité' },
      { id: 'video-remove-audio', label: 'Supprimer Audio', icon: 'VolumeX', description: 'Retirez la piste audio d\'une vidéo en un clic pour obtenir un fichier silencieux sans réencodage' },
    ],
  },
  {
    id: 'dev-seo',
    label: 'Dev & SEO',
    icon: 'Code',
    description: 'Outils pour développeurs et SEO',
    tools: [
      { id: 'json-csv', label: 'JSON / CSV', icon: 'Braces', description: 'Convertissez et formatez vos données JSON et CSV, import/export Excel, gratuit en ligne' },
      { id: 'regex-tester', label: 'Testeur Regex', icon: 'Terminal', description: 'Testez et débugguez vos expressions régulières en temps réel avec surlignage des correspondances' },
      { id: 'meta-tags', label: 'Meta Tags', icon: 'Search', description: 'Générez et prévisualisez les meta tags SEO et Open Graph pour votre site web' },
      { id: 'sitemap-robots', label: 'Sitemap / Robots.txt', icon: 'Globe', description: 'Générez un sitemap XML et un fichier robots.txt pour optimiser l\'indexation Google' },
      { id: 'json-formatter', label: 'JSON Formatter', icon: 'Braces', description: 'Formatez, validez et minifiez votre JSON avec coloration syntaxique, gratuit en ligne' },
      { id: 'url-encode-decode', label: 'URL Encode/Decode', icon: 'Link', description: 'Encodez et décodez des URLs et paramètres de requête, support Unicode et emojis' },
      { id: 'css-gradient-generator', label: 'CSS Gradient', icon: 'Paintbrush', description: 'Créez des dégradés CSS linéaires et radiaux visuellement, code CSS copiable en un clic' },
      { id: 'markdown-preview', label: 'Markdown Preview', icon: 'FileCode', description: 'Éditeur Markdown avec aperçu en temps réel, support tableaux, code et LaTeX' },
      { id: 'url-cleaner', label: 'Nettoyeur d\'URL', icon: 'Link2Off', description: 'Supprimez les paramètres de tracking UTM et les paramètres inutiles d\'un lien en un clic' },
    ],
  },
  {
    id: 'text-tools',
    label: 'Text Tools',
    icon: 'Type',
    description: 'Compteur de mots, convertisseur de casse et outils texte',
    tools: [
      { id: 'word-counter', label: 'Compteur de Mots', icon: 'Hash', description: 'Comptez les mots, caractères, phrases et temps de lecture de votre texte, gratuit en ligne' },
      { id: 'case-converter', label: 'Convertisseur de Casse', icon: 'ArrowDownUp', description: 'Convertissez votre texte en majuscules, minuscules, camelCase, snake_case et plus' },
      { id: 'lorem-ipsum-generator', label: 'Lorem Ipsum', icon: 'FileText', description: 'Générez du texte placeholder Lorem Ipsum personnalisable pour vos maquettes et designs' },
      { id: 'base64-encode-decode', label: 'Base64 Encode/Decode', icon: 'Lock', description: 'Encodez et décodez du texte et des fichiers en Base64 standard et URL-safe' },
      { id: 'text-diff-checker', label: 'Comparateur de Texte', icon: 'Diff', description: 'Comparez deux textes et visualisez les différences avec surlignage ligne par ligne' },
      { id: 'name-splitter', label: 'Séparateur Prénom/Nom', icon: 'SplitSquareHorizontal', description: 'Séparez automatiquement les prénoms et noms depuis une liste ou un fichier CSV' },
    ],
  },
  {
    id: 'generators',
    label: 'Generators',
    icon: 'Wand2',
    description: 'QR code, mots de passe, hash et palette de couleurs',
    tools: [
      { id: 'qr-code-generator', label: 'QR Code Generator', icon: 'QrCode', description: 'Générez des QR codes personnalisés pour URLs, texte et vCard, téléchargeables en PNG ou SVG' },
      { id: 'password-generator', label: 'Password Generator', icon: 'KeyRound', description: 'Générez des mots de passe sécurisés et personnalisables avec longueur et types de caractères' },
      { id: 'uuid-generator', label: 'Générateur d\'UUID', icon: 'Fingerprint', description: 'Générez instantanément des UUID v4 uniques et cryptographiquement aléatoires, jusqu\'à 100' },
      { id: 'hash-generator', label: 'Hash Generator', icon: 'Hash', description: 'Calculez les hash MD5, SHA-1, SHA-256 et SHA-512 pour vérifier l\'intégrité de fichiers' },
      { id: 'color-picker', label: 'Color Picker', icon: 'Palette', description: 'Choisissez une couleur et obtenez ses valeurs HEX, RGB, HSL avec pipette intégrée' },
      { id: 'whatsapp-link', label: 'Lien WhatsApp', icon: 'MessageCircle', description: 'Créez un lien direct wa.me vers WhatsApp avec message pré-rempli pour votre site' },
      { id: 'random-number-generator', label: 'Random Number', icon: 'Shuffle', description: 'Générez des nombres aléatoires cryptographiques avec plage personnalisable et sans doublons' },
      { id: 'color-converter', label: 'Convertisseur Couleurs', icon: 'Pipette', description: 'Convertissez les couleurs entre HEX, RGB, HSL et CMYK pour le web et l\'impression' },
    ],
  },
  {
    id: 'calculators',
    label: 'Calculators',
    icon: 'Calculator',
    description: 'BMI, âge, pourcentages et conversions d\'unités',
    tools: [
      { id: 'bmi-calculator', label: 'BMI Calculator', icon: 'Heart', description: 'Calculez votre Indice de Masse Corporelle avec unités métriques et impériales, classification OMS' },
      { id: 'age-calculator', label: 'Age Calculator', icon: 'Calendar', description: 'Calculez votre âge exact en années, mois, jours et heures avec jour de naissance et anniversaire' },
      { id: 'percentage-calculator', label: 'Percentage Calculator', icon: 'Percent', description: 'Calculez pourcentages : augmentation, réduction, proportion et variation avec formules détaillées' },
      { id: 'unit-converter', label: 'Unit Converter', icon: 'ArrowRightLeft', description: 'Convertissez entre unités de longueur, poids, température, volume et plus — 50+ unités' },
      { id: 'concrete-calculator', label: 'Dosage Béton', icon: 'HardHat', description: 'Calculez les volumes de ciment, sable, gravier et eau pour votre dosage béton selon l\'ouvrage' },
      { id: 'mileage-calculator', label: 'Frais Kilométriques', icon: 'Car', description: 'Calculez vos indemnités kilométriques selon le barème URSSAF pour voitures, motos et cyclomoteurs' },
      { id: 'stopwatch', label: 'Chronomètre', icon: 'Timer', description: 'Chronométrez avec précision au centième de seconde et enregistrez des temps intermédiaires' },
      { id: 'tip-calculator', label: 'Tip Calculator', icon: 'Percent', description: 'Calculez le pourboire et répartissez l\'addition entre plusieurs personnes au restaurant' },
      { id: 'pomodoro-timer', label: 'Timer Pomodoro', icon: 'Clock', description: 'Timer Pomodoro personnalisable avec sessions de travail, pauses courtes et longues' },
      { id: 'vat-calculator', label: 'Calculateur TVA', icon: 'Receipt', description: 'Calculez instantanément le montant HT, TTC et la TVA avec taux français et internationaux' },
      { id: 'discount-calculator', label: 'Calculateur Remise', icon: 'Tag', description: 'Calculez le prix après remise, l\'économie réalisée et les doubles remises cumulatives' },
      { id: 'time-converter', label: 'Convertisseur de Temps', icon: 'Clock', description: 'Convertissez entre secondes, minutes, heures, jours, semaines, mois et années instantanément' },
    ],
  },
]
