import Image from 'next/image'
import { Container } from '@/components/primitives/Container'
import { Reveal } from '@/components/motion/Reveal'
import { yearsInPractice } from '@/lib/year'

type AboutCopy = {
  eyebrow: string
  title: string
  paragraphs: string[]
  caption: string
}

export function About({ copy }: { copy: AboutCopy }) {
  const years = yearsInPractice()
  return (
    <section
      id="about"
      className="section section-stack section-base"
    >
      <Container>
        <div className="grid grid-cols-12 gap-8 md:gap-12 items-center">
          <Reveal className="col-span-12 md:col-span-5">
            <div className="relative inline-block">
              <div className="aspect-square w-full max-w-[440px] rounded-[28px] overflow-hidden border border-[var(--color-ink-deep)] bg-[var(--color-cream-soft)] relative">
                <Image
                  src="/images/sebastian-ardila.webp"
                  alt="Sebastian Ardila"
                  width={800}
                  height={800}
                  priority={false}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>
              <span className="absolute -bottom-4 left-6 md:left-10 inline-flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.15em] bg-[var(--color-ink-deep)] text-[var(--color-cream)] px-3 py-2 rounded-full">
                {copy.caption}
              </span>
            </div>
          </Reveal>

          <div className="col-span-12 md:col-span-7">
            <Reveal>
              <span className="eyebrow-chip">{copy.eyebrow}</span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-h1 max-w-[18ch] mt-6">{copy.title}</h2>
            </Reveal>
            <div className="mt-8 md:mt-10 space-y-5 text-[var(--color-ink-graphite)] text-[1.05rem] md:text-[1.15rem] leading-[1.6] max-w-[58ch]">
              {copy.paragraphs.map((p, i) => (
                <Reveal key={i} delay={0.15 + i * 0.08}>
                  <p>{p.replace('{years}', String(years))}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
