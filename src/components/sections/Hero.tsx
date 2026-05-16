import { Container } from '@/components/primitives/Container'
import { Button } from '@/components/primitives/Button'
import { Icon } from '@/components/primitives/Icon'
import { Reveal } from '@/components/motion/Reveal'
import { yearsInPractice } from '@/lib/year'
import type { Hero as HeroData } from '@/content/schema'

function renderTemplate(tpl: string) {
  return tpl.replace('{years}', String(yearsInPractice()))
}

export function Hero({ data }: { data: HeroData }) {
  const subtitle = renderTemplate(data.subtitleTemplate)

  return (
    <section id="hero" className="hero-section section-base overflow-hidden">
      <Container className="relative z-[2]">
        {/* Top block: title (left on desktop, top on mobile) +
            video + LinkedIn/Me button (right on desktop, below title on mobile). */}
        <div className="flex-1 flex flex-col gap-8 md:gap-10 md:grid md:grid-cols-12 md:items-center">
          <div className="md:col-span-7">
            <Reveal mode="mount" delay={0.1}>
              <h1 className="hero-title">{data.title}</h1>
            </Reveal>
          </div>

          <div className="md:col-span-5 flex flex-col items-center md:items-end gap-5">
            <Reveal
              mode="mount"
              delay={0.3}
              className="w-full max-w-[320px] md:max-w-[460px]"
            >
              <video
                src="/videos/saludando.webm"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-hidden
                className="pointer-events-none select-none w-full h-auto block"
              />
            </Reveal>
            <Reveal
              mode="mount"
              delay={0.45}
              className="flex items-center"
            >
              <Button
                href="https://www.linkedin.com/in/sebastian-ardila/"
                target="_blank"
                rel="noopener noreferrer"
                variant="ghost"
                icon={<Icon name="linkedin" size={16} />}
                trailIcon="arrow-up-right"
                join="left"
              >
                Sebastian Ardila
              </Button>
              <Button
                href="/about"
                variant="ghost"
                icon={<Icon name="user" size={16} />}
                trailIcon={null}
                join="right"
              >
                Me
              </Button>
            </Reveal>
          </div>
        </div>

        {/* Subtitle + main CTAs anchor to the bottom of the viewport. */}
        <div className="grid grid-cols-12 gap-4 md:gap-8 items-end">
          <Reveal
            mode="mount"
            delay={0.4}
            className="col-span-12 md:col-span-7"
          >
            <p className="hero-subtitle text-[var(--color-ink-graphite)] max-w-[42ch]">
              {subtitle}
            </p>
          </Reveal>

          <Reveal
            mode="mount"
            delay={0.55}
            className="col-span-12 md:col-span-5 flex flex-wrap items-center gap-3 md:justify-end"
          >
            <Button
              href={data.ctaPrimary.href}
              variant="mustard"
              size="lg"
              target={
                data.ctaPrimary.href.startsWith('http') ? '_blank' : undefined
              }
              rel={
                data.ctaPrimary.href.startsWith('http')
                  ? 'noopener noreferrer'
                  : undefined
              }
              icon={<Icon name="calendar" size={18} />}
              trailIcon="arrow-right"
            >
              {data.ctaPrimary.label}
            </Button>
            <Button
              href={data.ctaSecondary.href}
              variant="ghost"
              icon={<Icon name="briefcase" size={16} />}
              trailIcon="arrow-up-right"
            >
              {data.ctaSecondary.label}
            </Button>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
