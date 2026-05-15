import { Container } from '@/components/primitives/Container'
import { Reveal } from '@/components/motion/Reveal'
import type { Philosophy as PhilosophyData } from '@/content/schema'

export function Philosophy({ data }: { data: PhilosophyData }) {
  return (
    <section id="philosophy" className="section-flow section-ink">
      <Container>
        <div className="flex flex-col items-center text-center max-w-[68ch] mx-auto">
          <Reveal>
            <span
              className="eyebrow-chip"
              style={{
                borderColor: 'var(--color-cream)',
                color: 'var(--color-cream)',
              }}
            >
              {data.eyebrow}
            </span>
          </Reveal>

          <div className="mt-12 md:mt-16 space-y-10 md:space-y-12">
            {data.paragraphs.map((p, i) => (
              <Reveal key={i} delay={0.1 * i}>
                <p className="font-display text-[1.75rem] md:text-[2.5rem] leading-[1.15] font-bold text-[var(--color-cream)] -tracking-[0.02em]">
                  {p}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.4} className="mt-16">
            <p className="text-serif-italic text-[1.5rem] md:text-[1.875rem] text-[var(--color-cream)] opacity-70">
              {data.signature}
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
