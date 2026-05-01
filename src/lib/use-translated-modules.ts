'use client'

import { useTranslations } from 'next-intl'
import { modules } from '@/lib/tools-store'

export function useTranslatedModules() {
  const t = useTranslations('Tools')
  const tMod = useTranslations('Modules')

  return modules.map(mod => ({
    ...mod,
    label: tMod(`${mod.id}.label`),
    description: tMod(`${mod.id}.description`),
    tools: mod.tools.map(tool => ({
      ...tool,
      label: t(`${tool.id}.label`),
      description: t(`${tool.id}.description`),
    })),
  }))
}