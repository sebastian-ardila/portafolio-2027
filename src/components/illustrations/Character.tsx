type CharacterProps = {
  variant: 'builder' | 'thinker' | 'connect'
  className?: string
  width?: number
}

export function Character({ variant, className, width = 320 }: CharacterProps) {
  const common = {
    width,
    viewBox: '0 0 400 400',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg',
    className,
    'aria-hidden': true as const,
  }
  const ink = 'var(--color-ink-deep)'
  const mustard = 'var(--color-mustard)'
  const cream = 'var(--color-cream)'

  if (variant === 'builder') {
    /* Engineer at a desk with laptop, raising fist */
    return (
      <svg {...common}>
        {/* Floor shadow */}
        <ellipse cx="200" cy="370" rx="120" ry="10" fill={ink} opacity="0.1" />
        {/* Desk */}
        <path
          d="M90 290 L310 290 L300 350 L100 350 Z"
          fill="none"
          stroke={ink}
          strokeWidth="3"
          strokeLinejoin="round"
        />
        {/* Desk top line */}
        <line x1="90" y1="290" x2="310" y2="290" stroke={ink} strokeWidth="3" strokeLinecap="round" />
        {/* Laptop on desk */}
        <rect x="200" y="245" width="80" height="48" rx="3" fill={cream} stroke={ink} strokeWidth="3" />
        <line x1="200" y1="285" x2="280" y2="285" stroke={ink} strokeWidth="3" />
        <path d="M210 260 Q220 270 230 260 Q240 270 250 260" stroke={ink} strokeWidth="2" fill="none" strokeLinecap="round" />
        {/* Plant on desk */}
        <rect x="120" y="260" width="22" height="28" fill={mustard} stroke={ink} strokeWidth="2.5" />
        <path
          d="M125 260 Q120 240 130 230 M135 260 Q140 240 132 225 M140 260 Q145 245 138 235"
          stroke={ink}
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
        {/* Body — yellow shirt */}
        <path
          d="M150 290 L150 200 Q150 175 175 175 L225 175 Q250 175 250 200 L250 290 Z"
          fill={mustard}
          stroke={ink}
          strokeWidth="3"
          strokeLinejoin="round"
        />
        {/* Head */}
        <circle cx="200" cy="135" r="40" fill={ink} stroke={ink} strokeWidth="3" />
        {/* Smile (subtle, white) */}
        <path
          d="M188 142 Q200 152 212 142"
          stroke={cream}
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        {/* Raised arm */}
        <path
          d="M175 200 Q140 175 145 130 Q150 110 165 115"
          stroke={ink}
          strokeWidth="3"
          fill={mustard}
          strokeLinejoin="round"
        />
        {/* Fist */}
        <circle cx="158" cy="118" r="14" fill={ink} stroke={ink} strokeWidth="3" />
        {/* Decorative sparks */}
        <path d="M140 90 L135 80 L150 88 Z" fill={mustard} stroke={ink} strokeWidth="2" />
        <path d="M160 75 L155 65 L170 72 Z" fill={mustard} stroke={ink} strokeWidth="2" />
      </svg>
    )
  }

  if (variant === 'thinker') {
    /* Person reading / pondering */
    return (
      <svg {...common}>
        <ellipse cx="200" cy="370" rx="100" ry="9" fill={ink} opacity="0.1" />
        {/* Chair / floor */}
        <line x1="80" y1="350" x2="320" y2="350" stroke={ink} strokeWidth="3" strokeLinecap="round" />
        {/* Body */}
        <path
          d="M150 350 L150 230 Q150 210 175 210 L225 210 Q250 210 250 230 L250 350"
          fill={cream}
          stroke={ink}
          strokeWidth="3"
          strokeLinejoin="round"
        />
        {/* Head tilted */}
        <circle cx="200" cy="170" r="38" fill={ink} stroke={ink} strokeWidth="3" />
        <path
          d="M188 178 Q200 187 212 178"
          stroke={cream}
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        {/* Hand to chin */}
        <path
          d="M225 230 Q235 200 220 180"
          stroke={ink}
          strokeWidth="3"
          fill={cream}
          strokeLinejoin="round"
        />
        {/* Book in hand */}
        <rect x="155" y="270" width="50" height="34" rx="2" fill={mustard} stroke={ink} strokeWidth="3" />
        <line x1="180" y1="270" x2="180" y2="304" stroke={ink} strokeWidth="2.5" />
        {/* Sparkles */}
        <path d="M285 130 L290 115 L295 130 L308 130 L297 138 L302 152 L290 144 L278 152 L283 138 L270 130 Z" fill={mustard} stroke={ink} strokeWidth="2" />
        <circle cx="115" cy="160" r="3" fill={ink} />
        <circle cx="125" cy="180" r="2" fill={ink} />
      </svg>
    )
  }

  /* connect — two characters shaking hands */
  return (
    <svg {...common}>
      <ellipse cx="200" cy="370" rx="140" ry="10" fill={ink} opacity="0.1" />
      {/* Left character */}
      <circle cx="120" cy="160" r="34" fill={ink} stroke={ink} strokeWidth="3" />
      <path
        d="M85 350 L85 230 Q85 210 110 210 L150 210 Q170 210 170 235 L170 350"
        fill={mustard}
        stroke={ink}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d="M108 168 Q120 176 132 168" stroke={cream} strokeWidth="2.5" strokeLinecap="round" fill="none" />
      {/* Right character */}
      <circle cx="280" cy="160" r="34" fill={ink} stroke={ink} strokeWidth="3" />
      <path
        d="M230 350 L230 235 Q230 210 250 210 L290 210 Q315 210 315 230 L315 350"
        fill={cream}
        stroke={ink}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d="M268 168 Q280 176 292 168" stroke={cream} strokeWidth="2.5" strokeLinecap="round" fill="none" />
      {/* Handshake arms */}
      <path
        d="M170 250 Q200 220 230 250"
        stroke={ink}
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="200" cy="245" r="14" fill={mustard} stroke={ink} strokeWidth="3" />
      {/* Spark */}
      <path d="M200 165 L205 150 L210 165 L223 165 L213 173 L218 187 L205 178 L193 187 L198 173 L186 165 Z" fill={mustard} stroke={ink} strokeWidth="2" />
    </svg>
  )
}
