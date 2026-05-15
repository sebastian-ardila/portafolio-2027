import { Container } from '@/components/primitives/Container'
import { Card } from '@/components/primitives/Card'
import { Reveal } from '@/components/motion/Reveal'
import type { Services } from '@/content/schema'

export function ServicesAsSolutions({ data }: { data: Services }) {
  return (
    <section id="services" className="section-flow section-paper">
      <Container>
        <Reveal>
          <span className="eyebrow-chip mb-6 md:mb-8">{data.eyebrow}</span>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="text-h1 max-w-[22ch]">{data.title}</h2>
        </Reveal>

        <div className="mt-20 md:mt-28 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {data.items.map((service, idx) => (
            <Reveal key={service.number} delay={0.06 * idx}>
              <Card className="h-full">
                <div className="flex items-baseline justify-between gap-4 mb-8">
                  <span className="font-mono text-sm text-[var(--color-ink-muted)] uppercase tracking-[0.15em]">
                    {service.number}
                  </span>
                  <span className="font-mono text-[0.7rem] uppercase tracking-[0.15em] text-[var(--color-ink-muted)]">
                    Service
                  </span>
                </div>
                <h3 className="text-h3 max-w-[16ch]">{service.title}</h3>
                <p className="mt-5 text-[var(--color-ink-graphite)] max-w-[42ch] leading-relaxed">
                  {service.description}
                </p>
                {service.stack && (
                  <div className="mt-7 flex flex-wrap gap-2">
                    {service.stack.map((s) => (
                      <span
                        key={s}
                        className="font-mono text-[0.7rem] uppercase tracking-[0.12em] px-2.5 py-1 rounded-full border border-[var(--color-line-strong)] text-[var(--color-ink-graphite)]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
