'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Container } from '@/components/primitives/Container'
import { Card } from '@/components/primitives/Card'
import { Button } from '@/components/primitives/Button'
import { Icon } from '@/components/primitives/Icon'
import { Reveal } from '@/components/motion/Reveal'
import type { Kaizen } from '@/content/schema'

type PillarImage = {
  src: string
  from: 'right' | 'top' | 'left' | 'top-right'
}

const pillarImages: (PillarImage | null)[] = [
  { src: '/images/watch.webp', from: 'right' },
  { src: '/images/costs.webp', from: 'top' },
  { src: '/images/compound.webp', from: 'top-right' },
]

// Static positioning per direction (anchors to the matching edge of the card).
const baseClasses = {
  right: 'top-0 right-0 object-right-top',
  top: 'top-0 left-1/2 -translate-x-1/2 object-top',
  left: 'top-0 left-0 object-left-top',
  'top-right': 'top-0 right-0 object-right-top',
} as const

// Hidden state: image parked off the matching edge with opacity 0.
const initialClasses = {
  right: 'translate-x-[110%] opacity-0',
  top: '-translate-y-[110%] opacity-0',
  left: '-translate-x-[110%] opacity-0',
  'top-right': 'translate-x-[110%] -translate-y-[110%] opacity-0',
} as const

// Revealed state — same target the hover variant lands on. The translate-x for
// the `top` direction stays untouched so the centered offset (-translate-x-1/2)
// from baseClasses is preserved.
const revealedClasses = {
  right: 'translate-x-0 opacity-100',
  top: 'translate-y-0 opacity-100',
  left: 'translate-x-0 opacity-100',
  'top-right': 'translate-x-0 translate-y-0 opacity-100',
} as const

// Hover/focus reveal (kept so cards still respond to hover after the auto-peek).
const hoverClasses = {
  right:
    'group-hover:translate-x-0 group-hover:opacity-100 group-focus-within:translate-x-0 group-focus-within:opacity-100',
  top: 'group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100',
  left: 'group-hover:translate-x-0 group-hover:opacity-100 group-focus-within:translate-x-0 group-focus-within:opacity-100',
  'top-right':
    'group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-x-0 group-focus-within:translate-y-0 group-focus-within:opacity-100',
} as const

const AUTO_PEEK_MS = 3000

export function KaizenFramework({ data }: { data: Kaizen }) {
  const sectionRef = useRef<HTMLElement>(null)
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  )
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const node = sectionRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
            setRevealed(true)
            hideTimerRef.current = setTimeout(
              () => setRevealed(false),
              AUTO_PEEK_MS
            )
          }
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(node)

    return () => {
      observer.disconnect()
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
    }
  }, [])

  return (
    <section
      id="framework"
      ref={sectionRef}
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
                      src={image.src}
                      alt=""
                      width={600}
                      height={600}
                      className={`pointer-events-none select-none absolute w-36 h-36 md:w-48 md:h-48 object-contain z-[1] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${baseClasses[image.from]} ${revealed ? revealedClasses[image.from] : initialClasses[image.from]} ${hoverClasses[image.from]}`}
                    />
                  )}
                  <div className="relative z-[2] font-display text-[2.6rem] md:text-[3.4rem] leading-none font-extrabold text-[var(--color-ink-deep)] -tracking-[0.04em]">
                    {pillar.number}
                  </div>
                  <div className="relative z-[2] mt-4 w-10 h-[2px] bg-[var(--color-ink-deep)]" />
                  <h3
                    className="relative z-[2] text-h3 mt-5 max-w-[18ch]"
                    style={{
                      WebkitTextStroke: '4px var(--color-cream)',
                      paintOrder: 'stroke fill',
                    }}
                  >
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

        {(data.ctaPrimary || data.ctaSecondary) && (
          <Reveal
            delay={0.2}
            className="mt-14 md:mt-20 flex flex-wrap items-center gap-3"
          >
            {data.ctaPrimary && (
              <Button
                href={data.ctaPrimary.href}
                variant="mustard"
                size="lg"
                target={
                  data.ctaPrimary.href.startsWith('http')
                    ? '_blank'
                    : undefined
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
            )}
            {data.ctaSecondary && (
              <Button
                href={data.ctaSecondary.href}
                variant="ghost"
                icon={<Icon name="briefcase" size={16} />}
                trailIcon="arrow-up-right"
              >
                {data.ctaSecondary.label}
              </Button>
            )}
          </Reveal>
        )}
      </Container>
    </section>
  )
}
