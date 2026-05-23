'use client'

import { useEffect, useLayoutEffect, useRef } from 'react'

// useLayoutEffect during SSR warns; fall back to useEffect on the server.
const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect
import { ProjectIcon } from '@/components/primitives/ProjectIcon'
import type { Project } from '@/content/schema'

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
      >
        {inner}
      </a>
    )
  }
  return <div className="block group">{inner}</div>
}

export function LogoMarquee({ items }: { items: Project[] }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const loopedItems = [...items, ...items]

  // Measure the half-track width in actual pixels and expose it as the CSS
  // custom property the marquee animation translates by. Percentage-based
  // -50% on a max-content track is subject to sub-pixel rounding (clamp()
  // widths + flex layout) and the half rarely lands EXACTLY on the second
  // half's first item, which produces a tiny snap each loop. Pixel-exact
  // measurement eliminates that drift.
  useIsomorphicLayoutEffect(() => {
    const track = trackRef.current
    if (!track) return

    const measure = () => {
      const children = Array.from(track.children) as HTMLElement[]
      if (children.length === 0) return
      const half = children.length / 2
      let halfWidth = 0
      for (let i = 0; i < half; i++) {
        const el = children[i]
        const style = getComputedStyle(el)
        halfWidth +=
          el.offsetWidth +
          parseFloat(style.marginRight || '0') +
          parseFloat(style.marginLeft || '0')
      }
      track.style.setProperty('--marquee-distance', `${halfWidth}px`)
    }

    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(track)
    // Also re-measure when fonts load — text under each logo can shift width
    // when the display font finishes swapping in.
    document.fonts?.ready.then(measure).catch(() => {})

    return () => ro.disconnect()
  }, [items.length])

  return (
    <div
      className="logo-marquee mt-8 md:mt-12"
      role="region"
      aria-label="Proyectos"
    >
      <div ref={trackRef} className="logo-marquee-track">
        {loopedItems.map((p, idx) => (
          <div
            key={`${p.number}-${idx}`}
            className="logo-marquee-item"
            aria-hidden={idx >= items.length || undefined}
          >
            <ProjectLogo p={p} />
          </div>
        ))}
      </div>
    </div>
  )
}
