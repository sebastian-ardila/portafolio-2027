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
      {/* Background illustration: positioned off to the right of the hero,
          fills the available right-half visually, sits behind everything. */}
      <Image
        src="/images/background.webp"
        alt=""
        width={1523}
        height={1342}
        priority
        sizes="(max-width: 768px) 110vw, 85vw"
        className="hero-illustration hero-bg-feather pointer-events-none select-none absolute top-1/2 -translate-y-1/2 right-[-8%] md:right-[-4%] w-[110vw] md:w-[82vw] max-w-[1500px] h-auto z-0"
        aria-hidden
      />

      <Shape
        variant="asterisk"
        color="ink"
        size={24}
        className="absolute top-[28%] left-[6%] hidden md:block z-[1]"
      />
      <Shape
        variant="squiggle"
        color="coral"
        size={56}
        className="absolute bottom-[18%] left-[44%] hidden md:block z-[1]"
        rotate={-4}
      />

      <Container className="relative z-[2]">
        {/* Title sits in the upper half */}
        <div className="flex-1 flex items-center">
          <Reveal mode="mount" delay={0.1}>
            <h1 className="hero-title max-w-[14ch] md:max-w-[60%]">
              {data.title}
            </h1>
          </Reveal>
        </div>

        {/* Subtitle + CTAs anchor to the bottom of the viewport */}
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
