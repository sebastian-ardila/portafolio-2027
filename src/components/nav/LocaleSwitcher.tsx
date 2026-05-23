'use client'

import { useLocale } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/navigation'
import { routing, type Locale } from '@/i18n/routing'
import { useTransition } from 'react'
import { cn } from '@/lib/cn'

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
        return (
          <button
            key={l}
            type="button"
            onClick={() => change(l)}
            disabled={isPending || active}
            aria-pressed={active}
            aria-label={l === 'en' ? 'English' : 'Español'}
            className={cn(
              'locale-switch-segment',
              active && 'locale-switch-segment-active'
            )}
          >
            {l.toUpperCase()}
          </button>
        )
      })}
    </div>
  )
}
