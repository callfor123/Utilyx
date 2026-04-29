'use client'

import Link from 'next/link'
import { useTheme } from 'next-themes'
import { useRouter, usePathname } from 'next/navigation'
import { Sun, Moon, Globe, Key } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { routing } from '@/i18n/routing'

const localeLabels: Record<string, string> = {
  fr: 'Français',
  en: 'English',
  es: 'Español',
  de: 'Deutsch',
  ar: 'العربية',
  pt: 'Português',
}

const localeFlags: Record<string, string> = {
  fr: '🇫🇷', en: '🇬🇧', es: '🇪🇸', de: '🇩🇪', ar: '🇸🇦', pt: '🇧🇷',
}

const themeLabels: Record<string, { light: string; dark: string }> = {
  fr: { light: 'Mode clair', dark: 'Mode sombre' },
  en: { light: 'Light mode', dark: 'Dark mode' },
  es: { light: 'Modo claro', dark: 'Modo oscuro' },
  de: { light: 'Heller Modus', dark: 'Dunkler Modus' },
  ar: { light: 'الوضع الفاتح', dark: 'الوضع الداكن' },
  pt: { light: 'Modo claro', dark: 'Modo escuro' },
}

function ThemeToggle({ locale }: { locale: string }) {
  const { theme, setTheme } = useTheme()
  const labels = themeLabels[locale] || themeLabels.fr
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {theme === 'dark' ? labels.light : labels.dark}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

function LanguageSelector({ locale }: { locale: string }) {
  const router = useRouter()
  const pathname = usePathname()

  const switchLocale = (newLocale: string) => {
    const segments = pathname.split('/')
    segments[1] = newLocale
    router.push(segments.join('/'))
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-1.5">
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline text-xs uppercase font-semibold">{locale}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[160px]">
        {routing.locales.map(loc => (
          <DropdownMenuItem
            key={loc}
            onClick={() => switchLocale(loc)}
            className={loc === locale ? 'bg-primary/10 font-semibold' : ''}
          >
            <span className="mr-2 text-base">{localeFlags[loc]}</span>
            {localeLabels[loc]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function ToolPageHeader({ locale }: { locale: string }) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto flex h-14 items-center px-4">
        <Link href={`/${locale}`} className="flex items-center gap-2 font-bold text-lg hover:opacity-80 transition-opacity">
          <div className="rounded-lg bg-primary/10 p-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.582a.5.5 0 0 1 0 .962L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/></svg>
          </div>
          <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Utilyx</span>
        </Link>
        <div className="ml-auto flex items-center gap-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" asChild>
                  <Link href={`/${locale}/api-keys`}>
                    <Key className="h-4 w-4" />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>API Keys</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <LanguageSelector locale={locale} />
          <ThemeToggle locale={locale} />
        </div>
      </div>
    </header>
  )
}