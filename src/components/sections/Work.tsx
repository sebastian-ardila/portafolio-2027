'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
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
    <article className="project-card h-full transition-transform duration-500 group-hover:-translate-y-1">
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
        draggable={false}
      >
        {inner}
      </a>
    )
  }
  return <div className="block group h-full">{inner}</div>
}

export function WorkSection({ data }: { data: Work }) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(true)
  const [progress, setProgress] = useState(0)
  const dragRef = useRef({
    down: false,
    startX: 0,
    startScroll: 0,
    moved: false,
  })

  // Recompute edge availability + progress bar fill on every scroll/resize.
  const updateEdges = useCallback(() => {
    const el = scrollerRef.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    setCanPrev(el.scrollLeft > 4)
    setCanNext(el.scrollLeft < max - 4)
    setProgress(max > 0 ? Math.min(1, Math.max(0, el.scrollLeft / max)) : 0)
  }, [])

  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return
    updateEdges()
    el.addEventListener('scroll', updateEdges, { passive: true })
    const ro = new ResizeObserver(updateEdges)
    ro.observe(el)
    return () => {
      el.removeEventListener('scroll', updateEdges)
      ro.disconnect()
    }
  }, [updateEdges])

  const scrollByCard = (dir: 1 | -1) => {
    const scroller = scrollerRef.current
    if (!scroller) return
    const firstCard = scroller.querySelector(
      '[data-card]'
    ) as HTMLElement | null
    const step = firstCard ? firstCard.offsetWidth + 24 : scroller.clientWidth
    scroller.scrollBy({ left: dir * step, behavior: 'smooth' })
  }

  // Mouse drag-to-scroll. Touch already swipes natively; we skip those events
  // so we don't fight the browser's momentum.
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return
    const el = scrollerRef.current
    if (!el) return
    dragRef.current = {
      down: true,
      startX: e.clientX,
      startScroll: el.scrollLeft,
      moved: false,
    }
    el.setPointerCapture(e.pointerId)
  }
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = dragRef.current
    if (!d.down) return
    const el = scrollerRef.current
    if (!el) return
    const dx = e.clientX - d.startX
    if (Math.abs(dx) > 4) d.moved = true
    el.scrollLeft = d.startScroll - dx
  }
  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = dragRef.current
    if (!d.down) return
    d.down = false
    const el = scrollerRef.current
    if (el) {
      try {
        el.releasePointerCapture(e.pointerId)
      } catch {
        /* ignore */
      }
    }
  }
  // Swallow the click that follows a drag so cards don't open Visit links by
  // accident when the user was just panning the carousel.
  const onClickCapture = (e: React.MouseEvent<HTMLDivElement>) => {
    if (dragRef.current.moved) {
      e.preventDefault()
      e.stopPropagation()
      dragRef.current.moved = false
    }
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      scrollByCard(-1)
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      scrollByCard(1)
    } else if (e.key === 'Home') {
      e.preventDefault()
      scrollerRef.current?.scrollTo({ left: 0, behavior: 'smooth' })
    } else if (e.key === 'End') {
      e.preventDefault()
      const el = scrollerRef.current
      if (el) el.scrollTo({ left: el.scrollWidth, behavior: 'smooth' })
    }
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

        {/* Description row + arrow controls aligned to the same baseline */}
        <div className="mt-6 flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-10">
          <Reveal delay={0.2} className="flex-1">
            <p className="text-[1.05rem] md:text-[1.15rem] text-[var(--color-ink-graphite)] max-w-[60ch] leading-relaxed">
              {data.description}
            </p>
          </Reveal>
          <Reveal
            delay={0.25}
            className="flex items-center gap-2 shrink-0 self-start md:self-end"
          >
            <button
              type="button"
              aria-label="Anterior"
              aria-controls="work-scroller"
              disabled={!canPrev}
              onClick={() => scrollByCard(-1)}
              className="carousel-nav"
            >
              <Icon name="arrow-right" size={16} className="rotate-180" />
            </button>
            <button
              type="button"
              aria-label="Siguiente"
              aria-controls="work-scroller"
              disabled={!canNext}
              onClick={() => scrollByCard(1)}
              className="carousel-nav"
            >
              <Icon name="arrow-right" size={16} />
            </button>
          </Reveal>
        </div>
      </Container>

      {/* Carousel scroller — inline padding mirrors the Container's
          padding-inline (clamp(1.25rem, 4vw, 3rem)) so the first card aligns
          with the title/description above. scroll-padding-inline keeps the
          snap point on the same edge so arrow-clicks land cards flush. */}
      <div
        className="relative mt-10 md:mt-14"
        data-progress={progress}
      >
        {/* Soft right-edge fade — hint that more content is to the right.
            Hidden when we've scrolled to the end. */}
        <div
          aria-hidden
          className="pointer-events-none absolute top-0 right-0 bottom-4 w-12 md:w-20 z-[1] transition-opacity duration-300"
          style={{
            opacity: canNext ? 1 : 0,
            background:
              'linear-gradient(to left, var(--color-paper) 10%, transparent 100%)',
          }}
        />
        <div
          id="work-scroller"
          ref={scrollerRef}
          role="region"
          aria-label="Carrusel de proyectos"
          tabIndex={0}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onClickCapture={onClickCapture}
          onKeyDown={onKeyDown}
          className="work-scroller flex gap-6 md:gap-8 overflow-x-auto snap-x snap-proximity pb-4 cursor-grab active:cursor-grabbing focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-coral)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--color-paper)] rounded-[4px] px-[clamp(1.25rem,4vw,3rem)] [scroll-padding-inline:clamp(1.25rem,4vw,3rem)]"
        >
          {data.items.map((p, idx) => (
            <div
              key={p.number}
              data-card
              className="snap-start shrink-0 w-[74vw] sm:w-[52vw] md:w-[38vw] lg:w-[26vw] max-w-[360px]"
            >
              <Reveal delay={0.03 * Math.min(idx, 6)}>
                <ProjectCard p={p} idx={idx} />
              </Reveal>
            </div>
          ))}
        </div>

        {/* Progress bar — non-interactive, just a visual cue of position. */}
        <div className="mt-4 mx-[clamp(1.25rem,4vw,3rem)] h-[2px] bg-[var(--color-line)] rounded-full overflow-hidden">
          <div
            className="h-full bg-[var(--color-ink-deep)] origin-left transition-[transform] duration-150 ease-out"
            style={{
              transform: `scaleX(${Math.max(0.08, progress)})`,
            }}
            aria-hidden
          />
        </div>
      </div>

      <Container>
        <Reveal delay={0.2} className="mt-12 md:mt-16">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10 justify-between border-t border-[var(--color-line)] pt-10">
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
