'use client'

import { useLocale } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/navigation'
import { type Locale } from '@/i18n/routing'
import { useTransition } from 'react'
import { cn } from '@/lib/cn'

export function LocaleSwitcher() {
  const locale = useLocale() as Locale
  const pathname = usePathname()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  // The bolita shows the *current* locale; clicking it swaps to the other.
  const other: Locale = locale === 'en' ? 'es' : 'en'
  const fullName = other === 'en' ? 'English' : 'Español'

  const swap = () => {
    try {
      document.cookie = `NEXT_LOCALE=${other}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`
      localStorage.setItem('NEXT_LOCALE', other)
    } catch {
      /* private mode etc. */
    }
    startTransition(() => {
      router.replace(pathname, { locale: other, scroll: false })
    })
  }

  return (
    <button
      type="button"
      onClick={swap}
      disabled={isPending}
      aria-label={`Cambiar a ${fullName}`}
      title={fullName}
      className={cn('locale-bolita', `locale-bolita-${locale}`)}
    >
      {locale.toUpperCase()}
    </button>
  )
}
