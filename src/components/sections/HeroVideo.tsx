'use client'

import { useEffect, useState } from 'react'

/**
 * Hero animation that has to look the same on every device.
 *
 * The clip exists in two formats because no single one works everywhere:
 *
 *   - /videos/saludando.webm  — VP9 + alpha. Chrome, Firefox, Edge, Safari
 *                              on macOS all decode the alpha and autoplay
 *                              cleanly. iOS Safari (and Chrome iOS, which
 *                              is the same WebKit) decodes it OPAQUE,
 *                              shows the green chromakey backdrop, and its
 *                              autoplay path stalls on top of that.
 *   - /videos/saludando.webp  — Animated WebP with real alpha. iOS Safari
 *                              renders it transparently and animates it
 *                              automatically because it's an <img>; the
 *                              `<video>` autoplay rules don't apply.
 *
 * The component renders nothing until hydration, then picks ONE element
 * based on UA detection: <img> for iOS, <video> for everything else. No
 * source juggling, no .src reassignments, no retry loops.
 */
export function HeroVideo({ className }: { className?: string }) {
  // 'pending' = pre-hydration / server. Render an invisible placeholder
  // with the same 1:1 aspect so the layout doesn't jump when we swap in
  // the real element.
  const [variant, setVariant] = useState<'pending' | 'img' | 'video'>(
    'pending'
  )

  useEffect(() => {
    const ua = navigator.userAgent
    const isIOS =
      /iPad|iPhone|iPod/.test(ua) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
    setVariant(isIOS ? 'img' : 'video')
  }, [])

  if (variant === 'pending') {
    return (
      <div
        aria-hidden
        className={className}
        style={{ aspectRatio: '1 / 1' }}
      />
    )
  }

  if (variant === 'img') {
    return (
      <img
        src="/videos/saludando.webp"
        alt=""
        aria-hidden
        className={className}
      />
    )
  }

  return (
    <video
      src="/videos/saludando.webm"
      autoPlay
      muted
      loop
      playsInline
      // Older iOS attribute name; harmless on other engines.
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
