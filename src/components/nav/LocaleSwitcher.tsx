'use client'

import { useLocale } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/navigation'
import { routing, type Locale } from '@/i18n/routing'
import { useTransition } from 'react'
import { cn } from '@/lib/cn'

// Flag + display name lookup for the locales we support. To add a new
// language, add it to routing.locales AND drop a new entry here. The flag
// is an emoji so we don't carry SVG assets per language.
const meta: Record<Locale, { flag: string; label: string }> = {
  en: { flag: '🇺🇸', label: 'English' },
  es: { flag: '🇪🇸', label: 'Español' },
}

export function LocaleSwitcher() {
  const locale = useLocale() as Locale
  const pathname = usePathname()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const change = (next: Locale) => {
    if (next === locale) return
    try {
      document.cookie = `NEXT_LOCALE=${next}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`
      localStorage.setItem('NEXT_LOCALE', next)
    } catch {
      /* private mode etc. */
    }
    startTransition(() => {
      router.replace(pathname, { locale: next, scroll: false })
    })
  }

  return (
    <div
      role="group"
      aria-label="Idioma / Language"
      className="locale-switch"
    >
      {routing.locales.map((l) => {
        const active = l === locale
        const info = meta[l]
        return (
          <button
            key={l}
            type="button"
            onClick={() => change(l)}
            disabled={isPending || active}
            aria-pressed={active}
            aria-label={info.label}
            title={info.label}
            className={cn(
              'locale-switch-item',
              active && 'locale-switch-item-active'
            )}
          >
            <span aria-hidden className="locale-switch-flag">
              {info.flag}
            </span>
            <span className="locale-switch-code">{l.toUpperCase()}</span>
          </button>
        )
      })}
    </div>
  )
}
