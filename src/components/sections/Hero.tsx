import { Container } from '@/components/primitives/Container'
import { Button } from '@/components/primitives/Button'
import { Icon } from '@/components/primitives/Icon'
import { Reveal } from '@/components/motion/Reveal'
import { HeroVideo } from '@/components/sections/HeroVideo'
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
        <div className="flex-1 flex flex-col justify-center gap-6 md:justify-start md:gap-10 md:grid md:grid-cols-12 md:items-center">
          <div className="md:col-span-6">
            <Reveal mode="mount" delay={0.1}>
              <h1 className="hero-title">{data.title}</h1>
            </Reveal>
          </div>

          <div className="md:col-span-6 flex flex-col items-center justify-center h-full">
            <Reveal
              mode="mount"
              delay={0.3}
              className="w-full max-w-[360px] md:max-w-[480px]"
            >
              <HeroVideo
                sources={[
                  // iOS Safari can't decode VP9 alpha in WebM; HEVC+alpha
                  // in .mov is its native transparent video format. Listing
                  // the .mov first ensures Safari/iOS take that branch.
                  { src: '/videos/saludando.mov', type: 'video/quicktime' },
                  { src: '/videos/saludando.webm', type: 'video/webm' },
                ]}
                className="pointer-events-none select-none w-full h-auto block"
              />
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
