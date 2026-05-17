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
      >
        {inner}
      </a>
    )
  }
  return <div className="block group">{inner}</div>
}

export function WorkSection({ data }: { data: Work }) {
  // Duplicate the list so the marquee can loop seamlessly: translating the
  // inner row by exactly -50% leaves us on the start of the second copy,
  // which is identical to the first copy, so the visual wraps cleanly.
  const loopedItems = [...data.items, ...data.items]

  return (
    <section id="work" className="section-flow section-compact section-paper">
      <Container>
        <Reveal>
          <span className="eyebrow-chip mb-4 md:mb-6">{data.eyebrow}</span>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="text-h1 max-w-[22ch]">{data.title}</h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-4 md:mt-5 text-[1.05rem] md:text-[1.15rem] text-[var(--color-ink-graphite)] max-w-[60ch] leading-relaxed">
            {data.description}
          </p>
        </Reveal>

        {/* Marquee — auto-scrolling infinite logo strip. Fades in/out at the
            container's left/right edges so logos materialize softly instead
            of snapping in at a hard cut. */}
        <div
          className="logo-marquee mt-8 md:mt-12"
          role="region"
          aria-label="Proyectos"
        >
          <div
            className="logo-marquee-track"
            style={{ '--logo-count': data.items.length } as React.CSSProperties}
          >
            {loopedItems.map((p, idx) => (
              <div
                key={`${p.number}-${idx}`}
                className="logo-marquee-item"
                aria-hidden={idx >= data.items.length || undefined}
              >
                <ProjectLogo p={p} />
              </div>
            ))}
          </div>
        </div>

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
