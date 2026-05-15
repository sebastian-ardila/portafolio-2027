import { cn } from '@/lib/cn'
import type { HTMLAttributes } from 'react'

type CardProps = HTMLAttributes<HTMLDivElement> & {
  accent?: boolean
  rotate?: 'neg' | 'pos' | 'none'
}

const rotateClass = {
  neg: 'rotate-neg-1',
  pos: 'rotate-pos-1',
  none: '',
} as const

export function Card({
  className,
  accent = false,
  rotate = 'none',
  children,
  ...rest
}: CardProps) {
  return (
    <div
      className={cn(
        'bcard',
        accent && 'bcard-accent',
        rotateClass[rotate],
        className
      )}
      {...rest}
    >
      {children}
    </div>
  )
}
