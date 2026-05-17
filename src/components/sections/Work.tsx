'use client'

import { useRef } from 'react'
import { Container } from '@/components/primitives/Container'
import { Button } from '@/components/primitives/Button'
import { Icon } from '@/components/primitives/Icon'
import { ProjectIcon } from '@/components/primitives/ProjectIcon'
import { Reveal } from '@/components/motion/Reveal'
import type { Work, Project } from '@/content/schema'

function ProjectCard({ p, idx }: { p: Project; idx: number }) {
  const bg =
    idx % 3 === 0
      ? 'linear-gradient(135deg, var(--color-cream-soft), var(--color-paper))'
      : idx % 3 === 1
        ? 'linear-gradient(135deg, var(--color-paper), var(--color-cream))'
        : 'linear-gradient(135deg, var(--color-cream), var(--color-cream-soft))'

  const inner = (
    <article className="project-card h-full">
      <div className="project-thumb" style={{ background: bg }}>
        <div className="absolute top-4 left-4">
          <ProjectIcon
            name={p.name}
            domain={p.domain}
            iconSrc={p.iconSrc}
            size={52}
          />
        </div>
        <div className="project-thumb-art text-[2rem] md:text-[2.5rem] whitespace-pre-line">
          <span className="leading-[0.95] -tracking-[0.04em]">
            {p.art ?? p.name}
          </span>
        </div>
      </div>
      <div className="p-6 md:p-8 flex flex-col gap-4 flex-1">
        <div className="flex items-baseline justify-between gap-3 text-[var(--color-ink-muted)]">
          <span className="font-mono text-[0.72rem] uppercase tracking-[0.15em]">
            {p.number}
          </span>
          {p.year && (
            <span className="font-mono text-[0.72rem] uppercase tracking-[0.15em]">
              {p.year}
            </span>
          )}
        </div>
        <h3 className="font-display text-[1.6rem] md:text-[1.85rem] font-extrabold -tracking-[0.02em] leading-[1.05] text-[var(--color-ink-deep)] group-hover:text-[var(--color-coral)] transition-colors duration-500">
          {p.name}
        </h3>
        <p className="font-mono text-[0.72rem] uppercase tracking-[0.15em] text-[var(--color-ink-muted)]">
          {p.role}
        </p>
        <p className="text-[var(--color-ink-graphite)] text-[0.95rem] leading-relaxed">
          {p.summary}
        </p>
        {p.url && (
          <span className="mt-auto pt-4 font-mono text-[0.72rem] uppercase tracking-[0.15em] text-[var(--color-ink-deep)] inline-flex items-center gap-2">
            Visit
            <Icon
              name="arrow-up-right"
              size={14}
              className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-0.5"
            />
          </span>
        )}
      </div>
    </article>
  )

  if (p.url) {
    return (
      <a
        href={p.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block group h-full focus:outline-none rounded-[24px]"
        aria-label={`${p.name} — ${p.role}`}
      >
        {inner}
      </a>
    )
  }
  return <div className="block group h-full">{inner}</div>
}

export function WorkSection({ data }: { data: Work }) {
  const scrollerRef = useRef<HTMLDivElement>(null)

  const scrollByCard = (dir: 1 | -1) => {
    const scroller = scrollerRef.current
    if (!scroller) return
    const firstCard = scroller.querySelector(
      '[data-card]'
    ) as HTMLElement | null
    const step = firstCard ? firstCard.offsetWidth + 24 : scroller.clientWidth
    scroller.scrollBy({ left: dir * step, behavior: 'smooth' })
  }

  return (
    <section id="work" className="section-flow section-paper">
      <Container>
        <Reveal>
          <span className="eyebrow-chip mb-6 md:mb-8">{data.eyebrow}</span>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="text-h1 max-w-[22ch]">{data.title}</h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-6 text-[1.05rem] md:text-[1.15rem] text-[var(--color-ink-graphite)] max-w-[60ch] leading-relaxed">
            {data.description}
          </p>
        </Reveal>
      </Container>

      {/* Carousel — bleeds to viewport edges so the next card peeks past the
          container's right padding, hinting that there is more to scroll. */}
      <div className="mt-16 md:mt-24">
        <div
          ref={scrollerRef}
          className="work-scroller flex gap-6 md:gap-8 overflow-x-auto snap-x snap-mandatory pb-4"
        >
          {data.items.map((p, idx) => (
            <div
              key={p.number}
              data-card
              className="snap-start shrink-0 first:ml-[clamp(1.25rem,4vw,3rem)] last:mr-[clamp(1.25rem,4vw,3rem)] w-[78vw] sm:w-[58vw] md:w-[42vw] lg:w-[31vw] max-w-[440px]"
            >
              <Reveal delay={0.03 * Math.min(idx, 6)}>
                <ProjectCard p={p} idx={idx} />
              </Reveal>
            </div>
          ))}
        </div>
      </div>

      <Container>
        <Reveal delay={0.2} className="mt-10 md:mt-14">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10 justify-between border-t border-[var(--color-line)] pt-10">
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Anterior"
                onClick={() => scrollByCard(-1)}
                className="carousel-nav"
              >
                <Icon name="arrow-right" size={16} className="rotate-180" />
              </button>
              <button
                type="button"
                aria-label="Siguiente"
                onClick={() => scrollByCard(1)}
                className="carousel-nav"
              >
                <Icon name="arrow-right" size={16} />
              </button>
            </div>
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
