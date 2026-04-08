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

export type ModuleId = 'pdf' | 'image' | 'dev-seo' | 'home'

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
    ],
  },
]
