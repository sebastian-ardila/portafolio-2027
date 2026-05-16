import Image from 'next/image'
import { Container } from '@/components/primitives/Container'
import { Card } from '@/components/primitives/Card'
import { Reveal } from '@/components/motion/Reveal'
import type { Kaizen } from '@/content/schema'

// Per-pillar hover-reveal illustration. `from` controls which edge the
// image slides in from when the card is hovered/focused.
type PillarImage = {
  src: string
  from: 'right' | 'top' | 'left' | 'top-right'
}

const pillarImages: (PillarImage | null)[] = [
  { src: '/images/watch.webp', from: 'right' },
  { src: '/images/costs.webp', from: 'top' },
  { src: '/images/compound.webp', from: 'top-right' },
]

// Tailwind class fragments per direction so the off-card initial state
// and the centered-on-edge final position match what was requested.
const fromClasses = {
  right: {
    base: 'top-0 right-0 object-right-top',
    initial: 'translate-x-[110%] opacity-0',
    final:
      'group-hover:translate-x-0 group-hover:opacity-100 group-focus-within:translate-x-0 group-focus-within:opacity-100',
  },
  top: {
    base: 'top-0 left-1/2 -translate-x-1/2 object-top',
    initial: '-translate-y-[110%] opacity-0',
    final:
      'group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100',
  },
  left: {
    base: 'top-0 left-0 object-left-top',
    initial: '-translate-x-[110%] opacity-0',
    final:
      'group-hover:translate-x-0 group-hover:opacity-100 group-focus-within:translate-x-0 group-focus-within:opacity-100',
  },
  'top-right': {
    base: 'top-0 right-0 object-right-top',
    initial: 'translate-x-[110%] -translate-y-[110%] opacity-0',
    final:
      'group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-x-0 group-focus-within:translate-y-0 group-focus-within:opacity-100',
  },
} as const

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
            const variant = image ? fromClasses[image.from] : null
            return (
              <Reveal
                key={pillar.number}
                delay={0.08 * idx}
                className="col-span-12 md:col-span-4 flex"
              >
                <Card className="h-full w-full flex flex-col group cursor-default overflow-hidden">
                  {image && variant && (
                    <Image
                      src={image.src}
                      alt=""
                      width={600}
                      height={600}
                      className={`pointer-events-none select-none absolute w-36 h-36 md:w-48 md:h-48 object-contain z-[1] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${variant.base} ${variant.initial} ${variant.final}`}
                    />
                  )}
                  <div className="relative z-[2] font-display text-[2.6rem] md:text-[3.4rem] leading-none font-extrabold text-[var(--color-ink-deep)] -tracking-[0.04em]">
                    {pillar.number}
                  </div>
                  <div className="relative z-[2] mt-4 w-10 h-[2px] bg-[var(--color-ink-deep)]" />
                  <h3 className="relative z-[2] text-h3 mt-5 max-w-[18ch]">
                    {pillar.title}
                  </h3>
                  <p className="relative z-[2] mt-4 text-[var(--color-ink-graphite)] max-w-[36ch] leading-relaxed">
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
