import Image from 'next/image'
import { cn } from '@/lib/cn'

type ProjectIconProps = {
  name: string
  domain?: string
  /** Local favicon path; takes precedence over Google s2 fallback. */
  iconSrc?: string
  size?: number
  className?: string
}

function initialsFromName(name: string): string {
  const cleaned = name.replace(/[()]/g, '').trim()
  const parts = cleaned.split(/\s+/).filter(Boolean)
  if (parts.length === 0) return '·'
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase()
  }
  return (parts[0][0] + parts[1][0]).toUpperCase()
}

export function ProjectIcon({
  name,
  domain,
  iconSrc,
  size = 48,
  className,
}: ProjectIconProps) {
  const imgSize = Math.round(size * 0.58)
  const initials = initialsFromName(name)

  const wrapperStyle = {
    width: size,
    height: size,
    minWidth: size,
    minHeight: size,
    borderRadius: Math.max(10, Math.round(size * 0.28)),
  } as const

  const remoteIcon = domain
    ? `https://www.google.com/s2/favicons?sz=128&domain=${domain}`
    : null

  const finalSrc = iconSrc ?? remoteIcon

  return (
    <span
      aria-hidden
      className={cn(
        'inline-flex items-center justify-center bg-[var(--color-cream)] border border-[var(--color-ink-deep)] overflow-hidden flex-shrink-0',
        className
      )}
      style={wrapperStyle}
    >
      {finalSrc ? (
        <Image
          src={finalSrc}
          alt=""
          width={imgSize}
          height={imgSize}
          // Favicons are <10 KB. Skip the Next.js image optimization layer
          // entirely so we don't accumulate stale entries in
          // .next/cache/images when the source asset is updated.
          unoptimized
          style={{ width: imgSize, height: imgSize, objectFit: 'contain' }}
        />
      ) : (
        <span
          className="font-display font-extrabold text-[var(--color-ink-deep)] -tracking-[0.04em]"
          style={{ fontSize: Math.round(size * 0.38), lineHeight: 1 }}
        >
          {initials}
        </span>
      )}
    </span>
  )
}
