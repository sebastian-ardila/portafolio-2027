import { setRequestLocale } from 'next-intl/server'
import { getHome } from '@/content/adapter'
import type { Locale } from '@/i18n/routing'
import { Container } from '@/components/primitives/Container'
import { Icon } from '@/components/primitives/Icon'
import { Reveal } from '@/components/motion/Reveal'
import { Link } from '@/i18n/navigation'
import { ServicesAsSolutions } from '@/components/sections/ServicesAsSolutions'

export const dynamic = 'force-static'
export const revalidate = 3600

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const home = await getHome(locale)
  const backLabel = locale === 'es' ? 'Volver al inicio' : 'Back home'

  return (
    <>
      <section className="pt-32 md:pt-40 pb-2 md:pb-4 section-base relative">
        <Container>
          <Reveal mode="mount">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-mono text-[0.75rem] uppercase tracking-[0.15em] text-[var(--color-ink-graphite)] hover:text-[var(--color-coral)] transition-colors"
            >
              <Icon name="arrow-down-left" size={14} />
              {backLabel}
            </Link>
          </Reveal>
        </Container>
      </section>

      <ServicesAsSolutions data={home.services} />
    </>
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  return {
    title:
      locale === 'es'
        ? 'Servicios — Sebastian Ardila'
        : 'Services — Sebastian Ardila',
  }
}
