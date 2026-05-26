'use client'

import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { Container } from '@/components/primitives/Container'
import { Icon } from '@/components/primitives/Icon'
import { LocaleSwitcher } from './LocaleSwitcher'
import { Link } from '@/i18n/navigation'

export function Navbar({ calendarHref }: { calendarHref: string }) {
  const t = useTranslations('nav')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '/#framework', label: t('framework'), icon: 'star' as const },
    { href: '/services', label: t('services'), icon: 'briefcase' as const },
    { href: '/work', label: t('work'), icon: 'eye' as const },
  ]

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-[var(--color-ink-deep)] focus:text-[var(--color-cream)] focus:px-4 focus:py-2 focus:rounded-full focus:outline-none"
      >
        Skip to content
      </a>

      <header
        className={`fixed top-0 left-0 right-0 z-50 py-3 md:py-5 transition-[backdrop-filter,background] duration-500 pointer-events-none ${
          scrolled ? 'backdrop-blur-md' : ''
        }`}
      >
        <Container>
          <div className="flex items-center justify-between gap-3 pointer-events-auto">
            <Link
              href="/"
              className="float-chip !text-[0.85rem] !py-2.5 focus:outline-none"
              aria-label="Sebastian Ardila — home"
            >
              <span className="font-display font-extrabold text-[1.05rem] -tracking-[0.04em] normal-case tracking-normal">
                Sebastian<span className="text-[var(--color-coral)]">.</span>Ardila
              </span>
            </Link>

            <nav
              aria-label="Primary"
              className="hidden lg:flex items-center gap-2"
            >
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="float-chip focus:outline-none"
                >
                  <Icon name={l.icon} size={14} />
                  <span>{l.label}</span>
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <LocaleSwitcher />
              <a
                href={calendarHref}
                target="_blank"
                rel="noopener noreferrer"
                className="float-chip float-chip-green focus:outline-none"
              >
                <Icon name="calendar" size={14} />
                <span>{t('bookCall')}</span>
              </a>
            </div>
          </div>
        </Container>
      </header>
    </>
  )
}
