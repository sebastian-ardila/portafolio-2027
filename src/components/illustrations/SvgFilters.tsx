/**
 * Global SVG filters. Inlined once in the root layout so any element
 * on the page can reference them via `filter: url(#filter-id)`.
 *
 * `card-wobble` distorts straight lines with low-frequency Perlin noise
 * (feTurbulence + feDisplacementMap), making decorative card borders
 * look loosely hand-drawn instead of geometrically clean.
 */
export function SvgFilters() {
  return (
    <svg
      aria-hidden
      width="0"
      height="0"
      style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}
    >
      <defs>
        <filter
          id="card-wobble"
          x="-5%"
          y="-5%"
          width="110%"
          height="110%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.018 0.025"
            numOctaves="2"
            seed="4"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="3.4"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  )
}
