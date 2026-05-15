import { cn } from '@/lib/cn'

type ShapeProps = {
  variant: 'star8' | 'star4' | 'blob' | 'squiggle' | 'asterisk' | 'plus'
  color?: 'coral' | 'mustard' | 'violet' | 'moss' | 'ink'
  size?: number
  className?: string
  rotate?: number
}

const colorMap: Record<NonNullable<ShapeProps['color']>, string> = {
  coral: 'var(--color-coral)',
  mustard: 'var(--color-mustard)',
  violet: 'var(--color-violet)',
  moss: 'var(--color-moss)',
  ink: 'var(--color-ink-deep)',
}

export function Shape({
  variant,
  color = 'mustard',
  size = 64,
  className,
  rotate = 0,
}: ShapeProps) {
  const fill = colorMap[color]
  const style = { transform: rotate ? `rotate(${rotate}deg)` : undefined }

  return (
    <span
      aria-hidden
      className={cn('inline-block pointer-events-none select-none', className)}
      style={{ ...style, zIndex: 0 }}
    >
      {variant === 'star8' && (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
          <path
            d="M50 0 L58 35 L92 30 L65 50 L98 65 L62 65 L72 100 L50 75 L28 100 L38 65 L2 65 L35 50 L8 30 L42 35 Z"
            fill={fill}
          />
        </svg>
      )}
      {variant === 'star4' && (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
          <path
            d="M50 0 C52 35 65 48 100 50 C65 52 52 65 50 100 C48 65 35 52 0 50 C35 48 48 35 50 0Z"
            fill={fill}
          />
        </svg>
      )}
      {variant === 'blob' && (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
          <path
            d="M48.3 5.6c14.9-2 30.9 6.6 38.6 19.7 7.8 13 7.4 30.3-.7 43.4-8.1 13.1-23.8 22-39.2 21.5C31.7 89.8 16.5 80 9 66.5 1.4 53 1.7 36.1 9.9 23.4 18 10.8 33.5 7.5 48.3 5.6Z"
            fill={fill}
          />
        </svg>
      )}
      {variant === 'squiggle' && (
        <svg width={size} height={size / 2} viewBox="0 0 100 40" fill="none">
          <path
            d="M2 20 Q 15 2, 28 20 T 54 20 T 80 20 T 100 20"
            stroke={fill}
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      )}
      {variant === 'asterisk' && (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
          <g stroke={fill} strokeWidth="10" strokeLinecap="round">
            <line x1="50" y1="10" x2="50" y2="90" />
            <line x1="10" y1="50" x2="90" y2="50" />
            <line x1="22" y1="22" x2="78" y2="78" />
            <line x1="78" y1="22" x2="22" y2="78" />
          </g>
        </svg>
      )}
      {variant === 'plus' && (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
          <g stroke={fill} strokeWidth="12" strokeLinecap="round">
            <line x1="50" y1="15" x2="50" y2="85" />
            <line x1="15" y1="50" x2="85" y2="50" />
          </g>
        </svg>
      )}
    </span>
  )
}
