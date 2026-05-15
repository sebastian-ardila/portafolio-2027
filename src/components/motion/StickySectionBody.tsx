'use client'

import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import { useRef, type ReactNode } from 'react'

/**
 * Each section is `position: sticky`. While the user scrolls THROUGH the
 * section's runway, the content drifts in a continuous, gentle way so it
 * feels like natural scroll — and only at the very end (when the next
 * section is taking over) does the content slide and fade out clearly,
 * giving the impression the new section was "waiting underneath".
 *
 * The exit is calibrated to start around 88% of scroll progress, so users
 * can scroll comfortably through the section's content before the
 * transition begins.
 */
type Pattern = 'rise' | 'linger' | 'drift'

// 5-point key range: [enter, settled, scrolling, exit-starts, exit-done]
const ranges: Record<Pattern, [number, number, number, number, number]> = {
  rise: [60, 10, -10, -30, -180],
  linger: [30, 5, -5, -15, -100],
  drift: [40, 8, -8, -20, -140],
}

const opacityRanges: Record<Pattern, [number, number, number, number, number]> =
  {
    rise: [0.4, 1, 1, 1, 0.2],
    linger: [0.5, 1, 1, 1, 0.4],
    drift: [0.5, 1, 1, 1, 0.25],
  }

export function StickySectionBody({
  children,
  pattern = 'rise',
  className,
}: {
  children: ReactNode
  pattern?: Pattern
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const yRange = ranges[pattern]
  const opRange = opacityRanges[pattern]

  // Key stops:
  //   0    → bottom of section just entered viewport (content rises in)
  //   0.25 → content settled, fully readable
  //   0.55 → mid-life of the section; subtle drift continues
  //   0.88 → next section is about to cover; content starts exiting
  //   1    → section fully out, content far above
  const stops: [number, number, number, number, number] = [0, 0.25, 0.55, 0.88, 1]

  const y = useTransform(
    scrollYProgress,
    stops,
    reduce ? [0, 0, 0, 0, 0] : yRange
  )
  const opacity = useTransform(
    scrollYProgress,
    stops,
    reduce ? [1, 1, 1, 1, 1] : opRange
  )

  return (
    <motion.div ref={ref} style={{ y, opacity }} className={className}>
      {children}
    </motion.div>
  )
}
