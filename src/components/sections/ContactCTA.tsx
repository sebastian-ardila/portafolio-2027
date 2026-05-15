import Image from 'next/image'
import { Container } from '@/components/primitives/Container'
import { Button } from '@/components/primitives/Button'
import { Icon } from '@/components/primitives/Icon'
import { Shape } from '@/components/primitives/Shape'
import { Reveal } from '@/components/motion/Reveal'
import type { Contact } from '@/content/schema'

export function ContactCTA({ data }: { data: Contact }) {
  return (
    <section
      id="contact"
      className="section section-stack section-soft overflow-hidden"
    >
      <Shape
        variant="asterisk"
        color="coral"
        size={40}
        className="absolute top-[18%] right-[10%] hidden md:block"
      />
      <Shape
        variant="squiggle"
        color="mustard"
        size={90}
        className="absolute bottom-[20%] left-[6%] hidden md:block"
        rotate={8}
      />

      <Container>
        <div className="grid grid-cols-12 gap-8 md:gap-12 items-center">
          <Reveal className="col-span-12 md:col-span-7">
            <span className="eyebrow-chip mb-8 md:mb-10">{data.eyebrow}</span>
            <h2 className="font-display font-extrabold leading-[0.95] -tracking-[0.04em] text-[clamp(3.25rem,7.2vw,7rem)] max-w-[18ch] mt-6">
              {data.title}
            </h2>
            <p className="mt-7 text-[1rem] md:text-[1.1rem] leading-[1.45] text-[var(--color-ink-graphite)] max-w-[48ch]">
              {data.subtitle}
            </p>
            <div className="mt-9 md:mt-10 flex flex-wrap gap-3 items-center">
              <Button
                href={data.callHref}
                target="_blank"
                rel="noopener noreferrer"
                variant="mustard"
                size="lg"
                icon={<Icon name="calendar" size={20} />}
                trailIcon="arrow-right"
              >
                {data.callLabel}
              </Button>
            </div>
          </Reveal>

          <Reveal
            delay={0.2}
            className="col-span-12 md:col-span-5 flex justify-center md:justify-end"
          >
            <Image
              src="/images/hablemos.webp"
              alt=""
              width={1400}
              height={1400}
              sizes="(max-width: 768px) 70vw, 400px"
              className="hero-illustration w-full max-w-[280px] md:max-w-[400px]"
            />
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
