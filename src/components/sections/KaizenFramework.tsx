import Image from 'next/image'
import { Container } from '@/components/primitives/Container'
import { Card } from '@/components/primitives/Card'
import { Reveal } from '@/components/motion/Reveal'
import type { Kaizen } from '@/content/schema'

// First pillar ("Observa antes de optimizar.") gets a hover-revealed
// illustration that slides in from the right edge.
const pillarImages: (string | null)[] = [
  '/images/watch.webp',
  null,
  null,
]

export function KaizenFramework({ data }: { data: Kaizen }) {
  return (
    <section
      id="framework"
      className="section section-stack section-soft"
    >
      <Container>
        <Reveal>
          <span className="eyebrow-chip mb-6 md:mb-8">{data.eyebrow}</span>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="text-h1 max-w-[22ch]">{data.title}</h2>
        </Reveal>

        <div className="mt-20 md:mt-28 grid grid-cols-12 gap-6 md:gap-8 items-stretch">
          {data.pillars.map((pillar, idx) => {
            const image = pillarImages[idx]
            return (
              <Reveal
                key={pillar.number}
                delay={0.08 * idx}
                className="col-span-12 md:col-span-4 flex"
              >
                <Card className="h-full w-full flex flex-col group cursor-default overflow-hidden">
                  {image && (
                    <Image
                      src={image}
                      alt=""
                      width={600}
                      height={600}
                      className="pointer-events-none select-none absolute top-0 right-0 w-36 h-36 md:w-48 md:h-48 object-contain object-right-top z-[2] translate-x-[110%] opacity-0 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0 group-hover:opacity-100 group-focus-within:translate-x-0 group-focus-within:opacity-100"
                    />
                  )}
                  <div className="relative z-[1] font-display text-[2.6rem] md:text-[3.4rem] leading-none font-extrabold text-[var(--color-ink-deep)] -tracking-[0.04em]">
                    {pillar.number}
                  </div>
                  <div className="mt-4 w-10 h-[2px] bg-[var(--color-ink-deep)]" />
                  <h3 className="text-h3 mt-5 max-w-[18ch]">{pillar.title}</h3>
                  <p className="mt-4 text-[var(--color-ink-graphite)] max-w-[36ch] leading-relaxed">
                    {pillar.description}
                  </p>
                </Card>
              </Reveal>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
