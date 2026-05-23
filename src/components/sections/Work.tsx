import { Container } from '@/components/primitives/Container'
import { Button } from '@/components/primitives/Button'
import { Icon } from '@/components/primitives/Icon'
import { Reveal } from '@/components/motion/Reveal'
import { LogoMarquee } from '@/components/motion/LogoMarquee'
import type { Work } from '@/content/schema'

export function WorkSection({ data }: { data: Work }) {
  return (
    <section id="work" className="section-flow section-compact section-paper">
      <Container>
        <Reveal>
          <span className="eyebrow-chip mb-4 md:mb-6">{data.eyebrow}</span>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="text-h1 max-w-[22ch]">{data.title}</h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-4 md:mt-5 text-[1.05rem] md:text-[1.15rem] text-[var(--color-ink-graphite)] max-w-[60ch] leading-relaxed">
            {data.description}
          </p>
        </Reveal>

        {/* Auto-scrolling infinite logo strip. Marquee is its own client
            component because it needs to measure its track width in pixels
            (see LogoMarquee.tsx for the seamless-loop math). */}
        <LogoMarquee items={data.items} />

        <Reveal delay={0.2} className="mt-6 md:mt-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-10 justify-between border-t border-[var(--color-line)] pt-6 md:pt-8">
            <p className="font-mono text-[0.75rem] uppercase tracking-[0.15em] text-[var(--color-ink-graphite)] max-w-[44ch] leading-[1.5] inline-flex items-baseline gap-3">
              <span className="font-display text-[1.6rem] font-extrabold -tracking-[0.04em] text-[var(--color-ink-deep)] leading-none">
                {data.items.length}
              </span>
              {data.archiveTeaser}
            </p>
            <Button
              href={data.viewAllHref}
              variant="mustard"
              size="lg"
              icon={<Icon name="briefcase" size={16} />}
              trailIcon="arrow-right"
            >
              {data.viewAllLabel}
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
