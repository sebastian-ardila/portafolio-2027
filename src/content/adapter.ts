import { local } from './sources/local'
import type { HomeContent } from './schema'
import type { Locale } from '@/i18n/routing'

const sourceName = process.env.NEXT_PUBLIC_CONTENT_SOURCE ?? 'local'

const source = sourceName === 'supabase' ? local : local

export const getHome = (locale: Locale): Promise<HomeContent> =>
  source.getHome(locale)
