'use client'

import { motion, type Variants } from 'motion/react'
import { revealUp } from '@/lib/motion-presets'
import type { ReactNode } from 'react'

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

  if (mode === 'mount') {
    return (
      <MotionTag
        className={className}
        initial="hidden"
        animate="visible"
        variants={variants}
        transition={{ delay }}
      >
        {children}
      </MotionTag>
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
