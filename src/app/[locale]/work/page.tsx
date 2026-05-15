import { setRequestLocale } from 'next-intl/server'
import { getHome } from '@/content/adapter'
import type { Locale } from '@/i18n/routing'
import { Container } from '@/components/primitives/Container'
import { Button } from '@/components/primitives/Button'
import { Icon } from '@/components/primitives/Icon'
import { ProjectIcon } from '@/components/primitives/ProjectIcon'
import { Reveal } from '@/components/motion/Reveal'
import { Link } from '@/i18n/navigation'

export const dynamic = 'force-static'
export const revalidate = 3600

export default async function WorkPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const home = await getHome(locale)
  const { work } = home

  const isES = locale === 'es'
  const backLabel = isES ? 'Volver al inicio' : 'Back home'
  const visitLabel = isES ? 'Visitar' : 'Visit'
  const projectsCount = work.items.length

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
              {backLabel}
            </Link>
          </Reveal>

          <Reveal mode="mount" delay={0.1}>
            <span className="eyebrow-chip mb-6 md:mb-8">{work.eyebrow}</span>
          </Reveal>
          <Reveal mode="mount" delay={0.2}>
            <h1 className="text-display max-w-[16ch]">{work.title}</h1>
          </Reveal>

          <div className="mt-10 md:mt-14 grid grid-cols-12 gap-6 md:gap-8 items-end">
            <Reveal mode="mount" delay={0.3} className="col-span-12 md:col-span-8">
              <p className="text-[1.15rem] md:text-[1.3rem] leading-[1.45] text-[var(--color-ink-graphite)] max-w-[58ch]">
                {work.description}
              </p>
            </Reveal>
            <Reveal mode="mount" delay={0.35} className="col-span-12 md:col-span-4 flex md:justify-end">
              <span className="inline-flex items-center gap-3 font-mono text-[0.78rem] uppercase tracking-[0.15em] text-[var(--color-ink-deep)] border-l border-[var(--color-line-strong)] pl-4">
                <span className="font-display text-[2rem] font-extrabold -tracking-[0.04em] leading-none">
                  {projectsCount}
                </span>
                <span className="text-[var(--color-ink-graphite)]">
                  {isES ? 'proyectos · 2017→hoy' : 'projects · 2017→today'}
                </span>
              </span>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="section section-stack section-paper relative">
        <Container>
          <div className="flex flex-col gap-14 md:gap-20">
            {work.items.map((p, idx) => (
              <Reveal key={p.number} delay={0.04 * idx}>
                <article className="grid grid-cols-12 gap-6 md:gap-10 items-start border-b border-[var(--color-line)] pb-12 md:pb-20 last:border-b-0">
                  <div className="col-span-12 md:col-span-1">
                    <span className="font-mono text-[0.8rem] uppercase tracking-[0.15em] text-[var(--color-ink-muted)]">
                      {p.number}
                    </span>
                  </div>

                  <div className="col-span-12 md:col-span-5">
                    <div className="flex items-start gap-5 mb-5">
                      <ProjectIcon name={p.name} domain={p.domain} size={56} />
                      <div className="flex-1">
                        <h2 className="font-display text-[2.25rem] md:text-[3rem] font-extrabold -tracking-[0.03em] leading-[0.95] text-[var(--color-ink-deep)]">
                          {p.name}
                        </h2>
                        {p.year && (
                          <span className="font-mono text-[0.72rem] uppercase tracking-[0.15em] text-[var(--color-ink-muted)] mt-2 inline-block">
                            {p.year}
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="font-mono text-[0.75rem] uppercase tracking-[0.15em] text-[var(--color-ink-graphite)]">
                      {p.role}
                    </p>
                  </div>

                  <div className="col-span-12 md:col-span-6">
                    <p className="text-[1.05rem] md:text-[1.15rem] leading-[1.6] text-[var(--color-ink-graphite)] max-w-[58ch]">
                      {p.summary}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {p.stack.map((s) => (
                        <span
                          key={s}
                          className="font-mono text-[0.7rem] uppercase tracking-[0.12em] px-2.5 py-1 rounded-full border border-[var(--color-line-strong)] text-[var(--color-ink-graphite)]"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                    {p.url && (
                      <div className="mt-8">
                        <Button
                          href={p.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          variant="ghost"
                          icon={<Icon name="eye" size={16} />}
                          trailIcon="arrow-up-right"
                        >
                          {visitLabel} {p.domain ?? p.name}
                        </Button>
                      </div>
                    )}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-20 md:mt-32 text-center">
            <Button
              href="/#contact"
              variant="mustard"
              size="lg"
              icon={<Icon name="calendar" size={18} />}
              trailIcon="arrow-right"
            >
              {isES ? 'Trabajemos juntos' : 'Let’s work together'}
            </Button>
          </Reveal>
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
        ? 'Proyectos — Sebastian Ardila'
        : 'Work — Sebastian Ardila',
  }
}
