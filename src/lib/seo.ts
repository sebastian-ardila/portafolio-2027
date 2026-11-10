import type { Metadata } from 'next'
import { routing, type Locale } from '@/i18n/routing'

/** Public routes, without locale prefix. '' is the home page. */
export const PAGES = ['', 'services', 'work', 'about'] as const
export type PagePath = (typeof PAGES)[number]

/** Locale-prefixed URL path with the trailing slash the static export uses. */
export function localePath(locale: Locale, page: PagePath): string {
  return page ? `/${locale}/${page}/` : `/${locale}/`
}

/**
 * Per-page canonical + hreflang. Every route is locale-prefixed
 * (localePrefix: 'always'), so each page is canonical to its own
 * /{locale}/... URL; "/" is only the client-side locale redirect.
 */
export function alternatesFor(
  locale: Locale,
  page: PagePath
): Metadata['alternates'] {
  return {
    canonical: localePath(locale, page),
    languages: {
      ...Object.fromEntries(
        routing.locales.map((l) => [l, localePath(l, page)])
      ),
      'x-default': localePath(routing.defaultLocale, page),
    },
  }
}
