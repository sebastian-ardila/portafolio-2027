import { cn } from '@/lib/cn'
import type { HTMLAttributes } from 'react'

export function Container({
  className,
  ...rest
}: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('container-x relative z-[2]', className)} {...rest} />
}
