import Image from 'next/image'
import { Container } from '@/components/primitives/Container'
import { Button } from '@/components/primitives/Button'
import { Shape } from '@/components/primitives/Shape'
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
      <Shape
        variant="asterisk"
        color="ink"
        size={24}
        className="absolute top-[28%] right-[5%] hidden md:block"
      />
      <Shape
        variant="squiggle"
        color="coral"
        size={56}
        className="absolute bottom-[18%] left-[44%] hidden md:block"
        rotate={-4}
      />

      <Container>
        {/* Row 2 — title + illustration. On mobile: stack with the
            illustration block growing to fill the middle and center its
            content. On desktop: 12-col grid with items-center. */}
        <div className="flex flex-col gap-8 flex-1 md:grid md:grid-cols-12 md:gap-8 md:items-center md:flex-none">
          <div className="md:col-span-7">
            <Reveal mode="mount" delay={0.1}>
              <h1 className="hero-title max-w-[14ch]">{data.title}</h1>
            </Reveal>
          </div>
          <div className="flex flex-col items-center justify-center gap-5 flex-1 md:col-span-5 md:flex-none">
            <Reveal
              mode="mount"
              delay={0.3}
              className="w-full max-w-[340px] md:max-w-[460px]"
            >
              <Image
                src="/images/hero.webp"
                alt="Sebastian Ardila"
                width={1400}
                height={1400}
                priority
                sizes="(max-width: 768px) 80vw, 460px"
                className="hero-illustration"
              />
            </Reveal>
            <Reveal mode="mount" delay={0.45} className="flex items-center justify-center">
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

        {/* Row 3 — subtitle + CTAs near the bottom */}
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
