import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['en', 'es'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
  // Auto-detect locale from the Accept-Language header on first visit and
  // persist the choice in a cookie. Users hitting "/" with es-* in their
  // browser settings get redirected to "/es" once; subsequent visits respect
  // the NEXT_LOCALE cookie / the locale prefix the user typed in.
  localeDetection: true,
})

export type Locale = (typeof routing.locales)[number]
