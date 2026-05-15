import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { routing, type Locale } from '@/i18n/routing'
import { fontVariables } from '@/lib/fonts'
import { LenisProvider } from '@/components/motion/LenisProvider'
import { Navbar } from '@/components/nav/Navbar'
import { Footer } from '@/components/footer/Footer'
import { SvgFilters } from '@/components/illustrations/SvgFilters'
import { getHome } from '@/content/adapter'

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params

  const title =
    locale === 'es'
      ? 'Sebastian Ardila — Ingeniero Senior · Director UX'
      : 'Sebastian Ardila — Senior Engineer · UX Director'

  const description =
    locale === 'es'
      ? 'Liderazgo técnico Senior para productos que deben sobrevivir más allá del Series A. Arquitecturas, modernización, auditorías. Filosofía Kaizen.'
      : 'Senior engineering for products that need to stay alive past Series A. Architectures, modernization, audits. Built on Kaizen.'

  return {
    title,
    description,
    alternates: {
      canonical: locale === 'en' ? '/' : `/${locale}`,
      languages: { en: '/', es: '/es' },
    },
    openGraph: {
      title,
      description,
      type: 'website',
      locale: locale === 'es' ? 'es_ES' : 'en_US',
    },
    twitter: { card: 'summary_large_image', title, description },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()

  setRequestLocale(locale)
  const home = await getHome(locale as Locale)

  return (
    <html lang={locale} className={fontVariables}>
      <body>
        <NextIntlClientProvider>
          <LenisProvider>
            <SvgFilters />
            <Navbar calendarHref={home.contact.callHref} />
            <main id="main-content">{children}</main>
            <Footer />
          </LenisProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
