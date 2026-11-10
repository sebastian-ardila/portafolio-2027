import type { MetadataRoute } from 'next'
import { routing } from '@/i18n/routing'
import { PAGES, localePath } from '@/lib/seo'

export const dynamic = 'force-static'

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://sebastianardila.com'

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.flatMap((page) =>
    routing.locales.map((locale) => ({
      url: `${SITE}${localePath(locale, page)}`,
      changeFrequency: 'monthly' as const,
      priority: page === '' ? 1 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [l, `${SITE}${localePath(l, page)}`])
        ),
      },
    }))
  )
}
