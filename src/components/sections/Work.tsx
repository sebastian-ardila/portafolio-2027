import { Container } from '@/components/primitives/Container'
import { Button } from '@/components/primitives/Button'
import { Icon } from '@/components/primitives/Icon'
import { ProjectIcon } from '@/components/primitives/ProjectIcon'
import { Reveal } from '@/components/motion/Reveal'
import type { Work, Project } from '@/content/schema'

const FEATURED_COUNT = 3

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
  const featured = data.items.slice(0, FEATURED_COUNT)
  const remaining = Math.max(0, data.items.length - FEATURED_COUNT)

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

        <div className="mt-20 md:mt-28 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {featured.map((p, idx) => (
            <Reveal key={p.number} delay={0.06 * idx}>
              <ProjectCard p={p} idx={idx} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-14 md:mt-20">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10 justify-between border-t border-[var(--color-line)] pt-10">
            <p className="font-mono text-[0.75rem] uppercase tracking-[0.15em] text-[var(--color-ink-graphite)] max-w-[44ch] leading-[1.5]">
              <span className="text-[var(--color-ink-deep)]">+{remaining}</span>{' '}
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
