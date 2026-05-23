import { cn } from '@/lib/cn'
import { Icon } from './Icon'
import { Link } from '@/i18n/navigation'
import type { AnchorHTMLAttributes, ReactNode } from 'react'

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: 'primary' | 'mustard' | 'ghost' | 'cream'
  size?: 'md' | 'lg'
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
  trailIcon?:
    | 'arrow-right'
    | 'arrow-up-right'
    | 'arrow-down-left'
    | 'calendar'
    | 'envelope'
    | null
  /**
   * When two pills should read as one segmented button, set `join="left"`
   * on the leftmost pill and `join="right"` on the rightmost. The right
   * edge of the left pill and the left edge of the right pill go square
   * and the divider between them becomes a single shared border.
   */
  join?: 'left' | 'right' | null
}

const variantClass = {
  primary: 'btn-pill-primary',
  mustard: 'btn-pill-mustard',
  ghost: 'btn-pill-ghost',
  cream: 'btn-pill-cream',
} as const

const sizeClass = {
  md: '',
  lg: 'btn-pill-lg',
} as const

// Internal route candidate = absolute path starting with "/" that is NOT a
// protocol-relative URL. Hash-only and protocol/mailto links stay as plain
// <a>; routing through Next's client router would just be overhead there.
function isInternalRoute(href: string | undefined): boolean {
  if (!href) return false
  if (href.startsWith('//')) return false
  return href.startsWith('/')
}

export function Button({
  className,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  trailIcon = 'arrow-right',
  join = null,
  children,
  ...rest
}: ButtonProps) {
  const joinClass =
    join === 'left'
      ? 'btn-pill-join-left'
      : join === 'right'
        ? 'btn-pill-join-right'
        : ''

  const mergedClassName = cn(
    'btn-pill',
    variantClass[variant],
    sizeClass[size],
    joinClass,
    className
  )

  const content = (
    <span className="btn-pill-content">
      {icon && iconPosition === 'left' && (
        <span className="btn-pill-icon">{icon}</span>
      )}
      <span>{children}</span>
      {icon && iconPosition === 'right' ? (
        <span className="btn-pill-icon">{icon}</span>
      ) : trailIcon ? (
        <span className="btn-pill-icon">
          <Icon name={trailIcon} size={16} />
        </span>
      ) : null}
    </span>
  )

  // Use next-intl's <Link> for internal navigation so static-export pages
  // transition SPA-style (no full HTML reload, no white flash) AND the URL
  // automatically picks up the current locale prefix. Externals + anchors
  // fall back to a plain <a>.
  if (isInternalRoute(rest.href) && rest.target !== '_blank') {
    const { href, ...anchorRest } = rest
    return (
      <Link href={href as string} className={mergedClassName} {...anchorRest}>
        {content}
      </Link>
    )
  }

  return (
    <a className={mergedClassName} {...rest}>
      {content}
    </a>
  )
}
