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
        {/* One grid for both viewports; row-start placements differ on md+ so
            the same DOM produces two layouts:
              Mobile (rows by source order):
                row 1: title (col-12)
                row 2: subtitle (col-12)
                row 3: buttons (col-7) | video (col-5)
              Desktop (md+):
                row 1: title (col-6) | video (col-6)
                row 2: subtitle (col-7) | buttons (col-5) */}
        <div className="flex-1 grid grid-cols-12 gap-4 md:gap-8 items-end md:items-center">
          <Reveal
            mode="mount"
            delay={0.1}
            className="col-span-12 md:col-span-6 md:row-start-1"
          >
            <h1 className="hero-title">{data.title}</h1>
          </Reveal>

          <Reveal
            mode="mount"
            delay={0.4}
            className="col-span-12 md:col-span-7 md:row-start-2 self-end"
          >
            <p className="hero-subtitle text-[var(--color-ink-graphite)] max-w-[42ch]">
              {subtitle}
            </p>
          </Reveal>

          <Reveal
            mode="mount"
            delay={0.55}
            className="col-span-7 md:col-span-5 md:row-start-2 self-end flex flex-col md:flex-row md:flex-wrap items-start md:items-center gap-3 md:justify-end hero-ctas"
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

          <Reveal
            mode="mount"
            delay={0.3}
            className="col-span-5 md:col-span-6 md:row-start-1 self-end md:self-center flex flex-col items-end"
          >
            <div className="w-full max-w-[180px] md:max-w-[480px]">
              <HeroVideo className="pointer-events-none select-none w-full h-auto block" />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
