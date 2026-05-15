'use client'

import { motion, useInView } from 'motion/react'
import { useRef } from 'react'
import { cn } from '@/lib/cn'

type SplitTextProps = {
  text: string
  className?: string
  amount?: number
  mode?: 'inView' | 'mount'
}

const easeOutExpo = [0.16, 1, 0.3, 1] as const

export function SplitText({
  text,
  className,
  amount = 0.15,
  mode = 'inView',
}: SplitTextProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount })
  const shouldAnimate = mode === 'mount' || inView

  const words = text.split(' ')

  return (
    <span
      ref={ref}
      className={cn('inline-block', className)}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="mask-reveal mr-[0.25em] last:mr-0 align-baseline"
          aria-hidden
        >
          <motion.span
            className="inline-block will-change-transform"
            initial={{ y: '110%' }}
            animate={shouldAnimate ? { y: '0%' } : { y: '110%' }}
            transition={{
              duration: 0.85,
              ease: easeOutExpo,
              delay: i * 0.04,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  )
}
