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
    startTransition(() => {
      router.replace(pathname, { locale: next })
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
