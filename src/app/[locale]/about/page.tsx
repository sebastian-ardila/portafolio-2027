import Image from 'next/image'
import { setRequestLocale } from 'next-intl/server'
import { getHome } from '@/content/adapter'
import type { Locale } from '@/i18n/routing'
import { Container } from '@/components/primitives/Container'
import { Button } from '@/components/primitives/Button'
import { Icon } from '@/components/primitives/Icon'
import { Reveal } from '@/components/motion/Reveal'
import { Link } from '@/i18n/navigation'
import { yearsInPractice } from '@/lib/year'

export const dynamic = 'force-static'
export const revalidate = 3600

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const home = await getHome(locale)
  const { about, contact } = home
  const years = yearsInPractice()
  const isES = locale === 'es'

  return (
    <>
      <section className="pt-32 md:pt-40 pb-12 md:pb-16 section-base relative">
        <Container>
          <Reveal mode="mount">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-mono text-[0.75rem] uppercase tracking-[0.15em] text-[var(--color-ink-graphite)] hover:text-[var(--color-coral)] transition-colors mb-12"
            >
              <Icon name="arrow-down-left" size={14} />
              {isES ? 'Volver al inicio' : 'Back home'}
            </Link>
          </Reveal>

          <Reveal mode="mount" delay={0.1}>
            <span className="eyebrow-chip mb-6 md:mb-8">{about.eyebrow}</span>
          </Reveal>
          <Reveal mode="mount" delay={0.2}>
            <h1 className="text-display max-w-[18ch]">{about.title}</h1>
          </Reveal>
        </Container>
      </section>

      <section className="section-flow section-paper">
        <Container>
          <div className="grid grid-cols-12 gap-8 md:gap-14 items-start">
            <Reveal className="col-span-12 md:col-span-5">
              <div className="relative inline-block">
                <div className="aspect-square w-full max-w-[460px] rounded-[28px] overflow-hidden border border-[var(--color-ink-deep)] bg-[var(--color-cream-soft)] relative">
                  <Image
                    src="/images/sebastian-ardila.webp"
                    alt="Sebastian Ardila"
                    width={800}
                    height={800}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </div>
                <span className="absolute -bottom-4 left-6 md:left-10 inline-flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.15em] bg-[var(--color-ink-deep)] text-[var(--color-cream)] px-3 py-2 rounded-full">
                  {about.caption}
                </span>
              </div>
            </Reveal>

            <div className="col-span-12 md:col-span-7">
              <div className="space-y-6 text-[var(--color-ink-graphite)] text-[1.1rem] md:text-[1.2rem] leading-[1.65] max-w-[62ch]">
                {about.paragraphs.map((p, i) => (
                  <Reveal key={i} delay={0.1 + i * 0.08}>
                    <p>{p.replace('{years}', String(years))}</p>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={0.4} className="mt-12 flex flex-wrap gap-3">
                <Button
                  href={contact.callHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="mustard"
                  size="lg"
                  icon={<Icon name="calendar" size={18} />}
                  trailIcon="arrow-right"
                >
                  {contact.callLabel}
                </Button>
                <Button
                  href="https://www.linkedin.com/in/sebastian-ardila/"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="ghost"
                  icon={<Icon name="linkedin" size={16} />}
                  trailIcon="arrow-up-right"
                >
                  LinkedIn
                </Button>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>
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
        ? 'Sobre mí — Sebastian Ardila'
        : 'About — Sebastian Ardila',
  }
}
