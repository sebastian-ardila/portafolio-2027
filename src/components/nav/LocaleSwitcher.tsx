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
    // Persist the choice so the bare-path redirect scripts (see
    // scripts/write-root-redirect.mjs) and any future visit land on the
    // same locale without re-running browser-language detection.
    try {
      document.cookie = `NEXT_LOCALE=${next}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`
      localStorage.setItem('NEXT_LOCALE', next)
    } catch {
      /* ignore (private mode etc.) */
    }
    startTransition(() => {
      // scroll: false keeps the user exactly where they were. Without it
      // Next.js auto-scrolls to top on every route change, which makes
      // switching locale feel like a full navigation rather than a copy
      // swap.
      router.replace(pathname, { locale: next, scroll: false })
    })
  }

  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-[0.72rem] uppercase tracking-[0.12em]">
      {routing.locales.map((l, i) => (
        <span key={l} className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => change(l)}
            disabled={isPending}
            aria-label={l === 'en' ? 'English' : 'Español'}
            className={cn(
              'cursor-pointer transition-opacity duration-300 focus:outline-none disabled:cursor-wait',
              locale === l
                ? 'font-semibold opacity-100'
                : 'opacity-50 hover:opacity-100'
            )}
            style={{ color: 'currentColor' }}
          >
            {l.toUpperCase()}
          </button>
          {i < routing.locales.length - 1 && (
            <span className="opacity-30" style={{ color: 'currentColor' }}>
              /
            </span>
          )}
        </span>
      ))}
    </span>
  )
}
