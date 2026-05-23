'use client'

import { useEffect, useRef } from 'react'

/**
 * Auto-playing hero video that's stubborn about staying playing.
 *
 * iOS Safari is the main offender:
 *   - Pauses videos when the tab loses focus and DOESN'T auto-resume on
 *     return.
 *   - Pauses videos when Low Power Mode is on.
 *   - Pauses when the video scrolls out of view (battery heuristic) and
 *     keeps it paused when it scrolls back in.
 *   - Sometimes shows a "play" poster overlay when paused even though we
 *     never set the controls attribute.
 *
 * This component forces play() on every event where iOS is likely to have
 * paused us: mount, intersection-back-in-view, visibility-back-to-visible,
 * and any explicit `pause` event we didn't trigger.
 */
export function HeroVideo({
  src,
  className,
}: {
  src: string
  className?: string
}) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const v = ref.current
    if (!v) return

    const tryPlay = () => {
      const p = v.play()
      // iOS rejects play() if the gesture context isn't right. Ignore — it
      // will succeed on the next user gesture or visibility change.
      if (p && typeof p.catch === 'function') p.catch(() => {})
    }

    // Resume whenever something paused us that wasn't intentional.
    const onPause = () => {
      if (!v.ended) tryPlay()
    }
    // Resume when the user comes back to the tab.
    const onVisibility = () => {
      if (!document.hidden) tryPlay()
    }
    // Resume when iOS decides to pause and we scroll back in.
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && v.paused) tryPlay()
        }
      },
      { threshold: 0.1 }
    )

    v.addEventListener('pause', onPause)
    document.addEventListener('visibilitychange', onVisibility)
    io.observe(v)

    // Initial kick — autoplay attribute alone isn't always enough on iOS.
    tryPlay()

    return () => {
      v.removeEventListener('pause', onPause)
      document.removeEventListener('visibilitychange', onVisibility)
      io.disconnect()
    }
  }, [])

  return (
    <video
      ref={ref}
      src={src}
      autoPlay
      muted
      loop
      playsInline
      // Older iOS attribute name; React passes unknown lowercase HTML attrs
      // straight through to the DOM.
      webkit-playsinline=""
      preload="auto"
      disablePictureInPicture
      disableRemotePlayback
      controls={false}
      aria-hidden
      className={className}
    />
  )
}
