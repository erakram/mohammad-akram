import { motion } from 'framer-motion'
import { useId } from 'react'

// "Prompt Spark": a terminal prompt (>), the M–A ligature (the M's last stroke is
// the A's left leg), an AI sparkle and a blinking cursor — "typing a prompt to an AI".
export const PROMPT = 'M10 25l6 6.5-6 6.5'
export const LIGATURE = 'M21 43V23l7.5 11L36 23l8 20M28.5 34h11.9'
export const SPARK = 'M0-9c1 6 3 8 9 9-6 1-8 3-9 9-1-6-3-8-9-9 6-1 8-3 9-9z'

type Props = {
  size?: number
  /** Draw the gradient-bordered tile behind the mark. */
  tile?: boolean
  /** Animate the mark in (prompt → letters → sparkle) and blink the cursor. */
  animate?: boolean
  className?: string
  title?: string
}

const ease = [0.65, 0, 0.35, 1] as const

export default function Logo({ size = 36, tile = true, animate = false, className = '', title = 'Mohammad Akram logo' }: Props) {
  const id = useId().replace(/:/g, '')
  const g = `g-${id}`
  const sg = `sg-${id}`

  const draw = (delay: number, duration: number) =>
    animate
      ? { initial: { pathLength: 0, opacity: 0 }, animate: { pathLength: 1, opacity: 1 }, transition: { delay, duration, ease } }
      : {}

  return (
    <svg width={size} height={size} viewBox="0 0 64 64" className={className} role="img" aria-label={title}>
      <defs>
        <linearGradient id={g} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#a78bfa" />
          <stop offset=".55" stopColor="#22d3ee" />
          <stop offset="1" stopColor="#f472b6" />
        </linearGradient>
        <linearGradient id={sg} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#67e8f9" />
          <stop offset="1" stopColor="#f472b6" />
        </linearGradient>
      </defs>

      {tile && (
        <>
          <rect x="1" y="1" width="62" height="62" rx="16" fill={`url(#${g})`} />
          <rect x="4" y="4" width="56" height="56" rx="13" fill="#0a0c1b" />
        </>
      )}

      <motion.path d={PROMPT} fill="none" stroke="#22d3ee" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" {...draw(0, 0.4)} />
      <motion.path d={LIGATURE} fill="none" stroke="#fff" strokeWidth="3.8" strokeLinecap="round" strokeLinejoin="round" {...draw(0.3, 1.1)} />

      {/* sparkle: pops in, then slowly breathes */}
      <g transform="translate(50.5 15) scale(.7)">
        <motion.path
          d={SPARK}
          fill={`url(#${sg})`}
          {...(animate
            ? {
                initial: { scale: 0, rotate: -90, opacity: 0 },
                animate: { scale: [0, 1.25, 1], rotate: 0, opacity: 1 },
                transition: { delay: 1.2, duration: 0.7, ease: 'easeOut' },
              }
            : {})}
        />
      </g>

      {/* cursor: blinks like a terminal caret */}
      <motion.rect
        x="44"
        y="48"
        width="10"
        height="3.4"
        rx="1.7"
        fill="#f472b6"
        {...(animate
          ? { initial: { opacity: 0 }, animate: { opacity: [0, 1, 1, 0, 0] }, transition: { delay: 1.4, duration: 1.1, repeat: Infinity, times: [0, 0.05, 0.5, 0.55, 1] } }
          : {})}
      />
    </svg>
  )
}
