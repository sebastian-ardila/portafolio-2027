'use client'

import { useEffect, useRef } from 'react'

/**
 * Auto-playing hero video that's stubborn about staying playing AND about
 * picking the right source per device.
 *
 * Why the source is set from JS only:
 *   iOS Safari (and Chrome iOS, same WebKit engine) claims VP9-in-WebM
 *   support but its autoplay path stalls on it — the user sees a paused
 *   first frame with a media-error play overlay. Letting iOS start loading
 *   the WebM via an SSR <source> tag and then trying to swap it via JS
 *   wasn't enough; the player stays stuck. We render <video> with no
 *   children at all and JS picks the right source on mount:
 *     - iOS  →  /videos/saludando-ios.mp4  (H.264, opaque, autoplay-OK)
 *     - else →  /videos/saludando.webm     (VP9 + alpha, transparent)
 *
 * Why a recovery loop:
 *   iOS pauses videos when the tab loses focus, when Low Power Mode is
 *   on, when the video scrolls out of view (battery heuristic), and
 *   sometimes for no clear reason. This component forces play() on every
 *   recovery hook (mount, intersection back-in-view, visibilitychange
 *   back to visible, and any spontaneous `pause` event).
 */
export function HeroVideo({ className }: { className?: string }) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const v = ref.current
    if (!v) return

    // Detect iOS / iPadOS. Chrome iOS uses WebKit so we get it too.
    // iPadOS 13+ reports `MacIntel` with a touch screen.
    const ua = navigator.userAgent
    const isIOS =
      /iPad|iPhone|iPod/.test(ua) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)

    // Set the autoplay-related properties directly on the element. iOS
    // honours property writes more reliably than the JSX-rendered
    // attributes after hydration.
    v.muted = true
    v.playsInline = true
    v.loop = true
    v.autoplay = true
    v.src = isIOS
      ? '/videos/saludando-ios.mp4'
      : '/videos/saludando.webm'
    v.load()

    const tryPlay = () => {
      const p = v.play()
      // iOS rejects play() if the gesture context isn't right. Ignore —
      // the next visibility / intersection event will retry.
      if (p && typeof p.catch === 'function') p.catch(() => {})
    }

    const onPause = () => {
      if (!v.ended) tryPlay()
    }
    const onVisibility = () => {
      if (!document.hidden) tryPlay()
    }
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
    />
  )
}
