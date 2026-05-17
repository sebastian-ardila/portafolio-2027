'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { Container } from '@/components/primitives/Container'
import { Button } from '@/components/primitives/Button'
import { Icon } from '@/components/primitives/Icon'
import { ProjectIcon } from '@/components/primitives/ProjectIcon'
import { Reveal } from '@/components/motion/Reveal'
import type { Work, Project } from '@/content/schema'

function ProjectLogo({ p }: { p: Project }) {
  const inner = (
    <div className="group flex flex-col items-center text-center px-2 py-4 transition-transform duration-500 group-hover:-translate-y-1">
      <ProjectIcon
        name={p.name}
        domain={p.domain}
        iconSrc={p.iconSrc}
        size={96}
        bare
        className="grayscale opacity-60 transition-[filter,opacity,transform] duration-500 ease-out group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-[1.05]"
      />
      <p className="mt-4 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-[var(--color-ink-deep)] group-hover:text-[var(--color-coral)] transition-colors leading-[1.3] line-clamp-2">
        {p.name}
      </p>
      {p.year && (
        <p className="mt-1 font-mono text-[0.62rem] uppercase tracking-[0.15em] text-[var(--color-ink-muted)]">
          {p.year}
        </p>
      )}
    </div>
  )

  if (p.url) {
    return (
      <a
        href={p.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block group focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-coral)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--color-paper)] rounded-2xl"
        aria-label={`${p.name} — ${p.role}`}
        draggable={false}
      >
        {inner}
      </a>
    )
  }
  return <div className="block group">{inner}</div>
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
    <section id="work" className="section-flow section-compact section-paper">
      <Container>
        <Reveal>
          <span className="eyebrow-chip mb-4 md:mb-6">{data.eyebrow}</span>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="text-h1 max-w-[22ch]">{data.title}</h2>
        </Reveal>

        {/* Description row + arrow controls aligned to the same baseline */}
        <div className="mt-4 md:mt-5 flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-10">
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
          with the title/description above. Vertical padding (py-3) gives the
          hover-lift somewhere to live without getting clipped by overflow. */}
      <div className="relative mt-6 md:mt-8">
        {/* Soft right-edge fade — hint that more content is to the right.
            Hidden when we've scrolled to the end. */}
        <div
          aria-hidden
          className="pointer-events-none absolute top-0 right-0 bottom-0 w-12 md:w-20 z-[1] transition-opacity duration-300"
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
          className="work-scroller flex gap-6 md:gap-8 snap-x snap-proximity py-3 cursor-grab active:cursor-grabbing focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-coral)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--color-paper)] rounded-[4px] px-[clamp(1.25rem,4vw,3rem)] [scroll-padding-inline:clamp(1.25rem,4vw,3rem)]"
        >
          {data.items.map((p, idx) => (
            <div
              key={p.number}
              data-card
              className="snap-start shrink-0 w-[40vw] sm:w-[26vw] md:w-[18vw] lg:w-[12vw] max-w-[180px]"
            >
              <Reveal delay={0.03 * Math.min(idx, 6)}>
                <ProjectLogo p={p} />
              </Reveal>
            </div>
          ))}
        </div>

        {/* Progress bar — non-interactive visual cue of scroll position. */}
        <div className="mt-4 mx-[clamp(1.25rem,4vw,3rem)] h-[2px] bg-[var(--color-line)] rounded-full overflow-hidden">
          <div
            className="h-full bg-[var(--color-ink-deep)] origin-left transition-[transform] duration-150 ease-out"
            style={{ transform: `scaleX(${Math.max(0.08, progress)})` }}
            aria-hidden
          />
        </div>
      </div>

      <Container>
        <Reveal delay={0.2} className="mt-6 md:mt-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-10 justify-between border-t border-[var(--color-line)] pt-6 md:pt-8">
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
