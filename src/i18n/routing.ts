import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['en', 'es'],
  defaultLocale: 'en',
  // With static export there's no middleware to negotiate locale from the
  // Accept-Language header, so every route is prefixed (/en/..., /es/...).
  // The root "/" is served by src/app/page.tsx, which runs an inline
  // <script> that redirects to the preferred locale before paint.
  localePrefix: 'always',
})

export type Locale = (typeof routing.locales)[number]
