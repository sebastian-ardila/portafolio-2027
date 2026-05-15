import { Container } from '@/components/primitives/Container'
import { Reveal } from '@/components/motion/Reveal'
import type { Selective } from '@/content/schema'

export function SelectiveEngineering({ data }: { data: Selective }) {
  return (
    <section id="selective" className="section section-stack section-base">
      <Container>
        <Reveal>
          <span className="eyebrow-chip mb-6 md:mb-8">{data.eyebrow}</span>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="text-h1 max-w-[22ch]">{data.title}</h2>
        </Reveal>

        <div className="mt-20 md:mt-28">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 md:gap-x-20 mb-6">
            <Reveal>
              <span className="eyebrow flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-[var(--color-ink-deep)]" />
                {data.headers.left}
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <span className="eyebrow flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-[var(--color-coral)]" />
                {data.headers.right}
              </span>
            </Reveal>
          </div>

          <div className="hairline-strong" />

          {data.rows.map((row, idx) => (
            <Reveal key={idx} delay={0.04 * idx}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 md:gap-x-20 py-7 md:py-9 border-b border-[var(--color-line)]">
                <p className="font-display text-[1.4rem] md:text-[1.85rem] leading-[1.1] font-bold text-[var(--color-ink-deep)] max-w-[28ch] -tracking-[0.02em]">
                  {row.forYou}
                </p>
                <p className="font-display text-[1.4rem] md:text-[1.85rem] leading-[1.1] font-medium text-[var(--color-ink-muted)] max-w-[28ch] -tracking-[0.02em] line-through decoration-[var(--color-coral)] decoration-[2px]">
                  {row.notForYou}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
