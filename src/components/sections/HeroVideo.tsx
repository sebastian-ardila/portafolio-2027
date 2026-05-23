'use client'

import { useEffect, useRef } from 'react'

/**
 * Auto-playing hero video that's stubborn about staying playing AND about
 * showing transparently on every browser.
 *
 * The transparency problem:
 *   - iOS Safari does NOT decode the alpha channel of VP9-in-WebM. The
 *     video plays but the green chromakey background renders as solid
 *     green. Worst, the inability to fully decode the stream causes
 *     iOS to fall back to a paused "play" poster overlay.
 *   - Chrome, Firefox, Safari 16+ on macOS all decode VP9 alpha fine.
 * The fix: ship the same clip as HEVC + alpha inside a .mov for iOS, and
 * VP9 + alpha inside a .webm for everything else. The browser picks the
 * first <source> whose type it can play.
 *
 * The "stay-playing" problem:
 *   iOS Safari pauses videos when the tab loses focus, when Low Power
 *   Mode is on, when the video scrolls out of view (battery heuristic),
 *   and sometimes for no clear reason — and shows a "play" overlay on
 *   the paused frame. This component forces play() on every recovery
 *   hook (mount, intersection back-in-view, visibilitychange back to
 *   visible, and any spontaneous `pause` event).
 */
export function HeroVideo({
  sources,
  className,
}: {
  // Tuple of <source> entries. ORDER MATTERS: browsers pick the first they
  // can play, so list the iOS-friendly HEVC+alpha .mov before the .webm.
  sources: { src: string; type: string }[]
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
    >
      {sources.map((s) => (
        <source key={s.src} src={s.src} type={s.type} />
      ))}
    </video>
  )
}
