'use client'

import { motion, type Variants } from 'motion/react'
import { revealUp } from '@/lib/motion-presets'
import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  variants?: Variants
  as?: 'div' | 'section' | 'article' | 'header' | 'p' | 'span'
  amount?: number
  mode?: 'inView' | 'mount'
}

export function Reveal({
  children,
  className,
  delay = 0,
  variants = revealUp,
  as = 'div',
  amount = 0.2,
  mode = 'inView',
}: RevealProps) {
  const MotionTag = motion[as] as typeof motion.div

  // Above-the-fold entrance. Done in pure CSS (see `.reveal-mount` in
  // globals.css) instead of motion so the content is painted straight from
  // the static HTML: with motion it stayed at opacity 0 until React
  // hydrated, which pushed mobile LCP (the hero <h1>) to ~5.8s.
  if (mode === 'mount') {
    const Tag = as
    return (
      <Tag
        className={cn('reveal-mount', className)}
        style={{ animationDelay: `${delay}s` }}
      >
        {children}
      </Tag>
    )
  }

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={variants}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  )
}
