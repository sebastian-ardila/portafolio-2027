import { cn } from '@/lib/cn'
import type { HTMLAttributes } from 'react'

export function Eyebrow({
  className,
  children,
  ...rest
}: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className={cn('eyebrow', className)} {...rest}>
      {children}
    </span>
  )
}
