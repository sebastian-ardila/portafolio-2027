import { HomeContentSchema, type HomeContent } from '../schema'
import enHome from '@/content-data/en/home.json'
import esHome from '@/content-data/es/home.json'

const map: Record<string, unknown> = {
  en: enHome,
  es: esHome,
}

export const local = {
  async getHome(locale: 'en' | 'es'): Promise<HomeContent> {
    const raw = map[locale]
    return HomeContentSchema.parse(raw)
  },
}
