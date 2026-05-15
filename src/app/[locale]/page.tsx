import { setRequestLocale } from 'next-intl/server'
import { getHome } from '@/content/adapter'
import type { Locale } from '@/i18n/routing'
import { Hero } from '@/components/sections/Hero'
import { KaizenFramework } from '@/components/sections/KaizenFramework'
import { ServicesAsSolutions } from '@/components/sections/ServicesAsSolutions'
import { WorkSection } from '@/components/sections/Work'
import { Philosophy } from '@/components/sections/Philosophy'
import { ContactCTA } from '@/components/sections/ContactCTA'

export const dynamic = 'force-static'
export const revalidate = 3600

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const content = await getHome(locale)

  return (
    <>
      <Hero data={content.hero} />
      <KaizenFramework data={content.kaizen} />
      <ServicesAsSolutions data={content.services} />
      <WorkSection data={content.work} />
      <Philosophy data={content.philosophy} />
      <ContactCTA data={content.contact} />
    </>
  )
}
