'use client'

import { useTranslations } from 'next-intl'
import { Container } from '@/components/primitives/Container'
import { Icon } from '@/components/primitives/Icon'
import { Shape } from '@/components/primitives/Shape'
import { currentYear } from '@/lib/year'

export function Footer() {
  const t = useTranslations('footer')
  const year = currentYear()

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault()
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <footer className="relative section-stack bg-[var(--color-ink-deep)] text-[var(--color-cream)] py-14 md:py-20 overflow-hidden">
      <Shape
        variant="asterisk"
        color="mustard"
        size={28}
        className="absolute top-12 right-[12%] hidden md:block"
      />

      <Container>
        <div className="grid grid-cols-12 gap-6 md:gap-8 items-end">
          <div className="col-span-12 md:col-span-6">
            <p className="font-display text-[2.5rem] md:text-[3.5rem] font-extrabold -tracking-[0.04em] leading-[0.95]">
              Sebastian
              <span className="text-[var(--color-coral)]">.</span>
              Ardila
            </p>
            <p className="mt-5 font-mono text-[0.72rem] uppercase tracking-[0.15em] text-[var(--color-cream-soft)] opacity-60">
              {t('available')}
            </p>
          </div>

          <div className="col-span-12 md:col-span-3 flex flex-col gap-3">
            <a
              href="https://github.com/sebastian-ardila"
              target="_blank"
              rel="noreferrer noopener"
              className="font-mono text-[0.78rem] uppercase tracking-[0.15em] text-[var(--color-cream-soft)] hover:text-[var(--color-mustard)] transition-colors w-fit inline-flex items-center gap-2 focus:outline-none focus:text-[var(--color-mustard)]"
            >
              GitHub
              <Icon name="arrow-up-right" size={14} />
            </a>
            <a
              href="https://linkedin.com/in/sebastian-ardila"
              target="_blank"
              rel="noreferrer noopener"
              className="font-mono text-[0.78rem] uppercase tracking-[0.15em] text-[var(--color-cream-soft)] hover:text-[var(--color-mustard)] transition-colors w-fit inline-flex items-center gap-2 focus:outline-none focus:text-[var(--color-mustard)]"
            >
              LinkedIn
              <Icon name="arrow-up-right" size={14} />
            </a>
            <a
              href="/#contact"
              className="font-mono text-[0.78rem] uppercase tracking-[0.15em] text-[var(--color-cream-soft)] hover:text-[var(--color-mustard)] transition-colors w-fit inline-flex items-center gap-2 focus:outline-none focus:text-[var(--color-mustard)]"
            >
              {t('contact')}
              <Icon name="arrow-up-right" size={14} />
            </a>
          </div>

          <div className="col-span-12 md:col-span-3 flex justify-start md:justify-end">
            <button
              type="button"
              onClick={scrollToTop}
              className="font-mono text-[0.78rem] uppercase tracking-[0.15em] text-[var(--color-cream)] hover:text-[var(--color-mustard)] transition-colors inline-flex items-center gap-2 group focus:outline-none focus:text-[var(--color-mustard)]"
            >
              <Icon
                name="arrow-up"
                size={16}
                className="transition-transform duration-500 group-hover:-translate-y-1"
              />
              {t('backToTop')}
            </button>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[var(--color-ink-carbon)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="font-mono text-[0.72rem] uppercase tracking-[0.15em] text-[var(--color-cream-soft)] opacity-50">
            © {year} · {t('rights')}
          </p>
          <p className="font-mono text-[0.72rem] uppercase tracking-[0.15em] text-[var(--color-mustard)]">
            {t('based')}
          </p>
        </div>
      </Container>
    </footer>
  )
}
