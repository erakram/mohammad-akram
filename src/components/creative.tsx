import {
  AnimatePresence,
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import Logo from './Logo'

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/* ------------------------------------------------------------------ */
/* Intro preloader: counter + name, then a curtain wipes upward        */
/* ------------------------------------------------------------------ */
export function Preloader({ onDone }: { onDone: () => void }) {
  const [count, setCount] = useState(0)
  const [exit, setExit] = useState(false)

  useEffect(() => {
    if (prefersReducedMotion()) {
      onDone()
      return
    }
    document.body.style.overflow = 'hidden'
    const start = performance.now()
    const dur = 1700
    let raf = 0
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur)
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * 100))
      if (p < 1) raf = requestAnimationFrame(tick)
      else
        setTimeout(() => {
          setExit(true)
          onDone() // reveal the page as the curtain starts lifting
        }, 250)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [onDone])

  return (
    <AnimatePresence
      onExitComplete={() => {
        document.body.style.overflow = ''
      }}
    >
      {!exit && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink-950"
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          initial={{ clipPath: 'inset(0 0 0% 0)' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="aurora opacity-40">
            <span className="a1" />
            <span className="a2" />
          </div>
          <Logo size={88} animate className="relative mb-6 drop-shadow-[0_10px_40px_rgba(139,92,246,0.45)]" />
          <div className="relative overflow-hidden">
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-3xl font-bold tracking-tight text-white md:text-5xl"
            >
              Mohammad <span className="text-gradient">Akram</span>
            </motion.div>
          </div>
          <div className="relative mt-3 font-mono text-xs uppercase tracking-[0.4em] text-slate-500">
            booting agents…
          </div>
          <div className="relative mt-10 h-px w-64 overflow-hidden bg-white/10">
            <div
              className="h-full bg-gradient-to-r from-violet-500 via-cyan-400 to-pink-500"
              style={{ width: `${count}%` }}
            />
          </div>
          <div className="absolute bottom-8 right-8 font-display text-7xl font-bold tabular-nums text-white/10 md:text-9xl">
            {count}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ------------------------------------------------------------------ */
/* Custom cursor: dot + lagging ring that morphs over interactive bits */
/* ------------------------------------------------------------------ */
export function CustomCursor() {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const rx = useSpring(x, { stiffness: 300, damping: 28, mass: 0.6 })
  const ry = useSpring(y, { stiffness: 300, damping: 28, mass: 0.6 })
  const [hover, setHover] = useState<string | null>(null)
  const [down, setDown] = useState(false)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    if (!fine) return
    setEnabled(true)
    document.documentElement.classList.add('custom-cursor')
    const move = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      const el = (e.target as HTMLElement).closest('a, button, [data-cursor]') as HTMLElement | null
      setHover(el ? el.dataset.cursor || '' : null)
    }
    const d = () => setDown(true)
    const u = () => setDown(false)
    window.addEventListener('mousemove', move)
    window.addEventListener('mousedown', d)
    window.addEventListener('mouseup', u)
    return () => {
      document.documentElement.classList.remove('custom-cursor')
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mousedown', d)
      window.removeEventListener('mouseup', u)
    }
  }, [x, y])

  if (!enabled) return null
  const big = hover !== null
  const label = hover || ''

  return (
    <>
      <motion.div
        style={{ x, y }}
        className="pointer-events-none fixed left-0 top-0 z-[90] -ml-1 -mt-1 h-2 w-2 rounded-full bg-cyan-300 mix-blend-difference"
      />
      <motion.div
        style={{ x: rx, y: ry }}
        className="pointer-events-none fixed left-0 top-0 z-[89]"
      >
        <motion.div
          animate={{
            width: label ? 84 : big ? 56 : 34,
            height: label ? 84 : big ? 56 : 34,
            scale: down ? 0.8 : 1,
            backgroundColor: big ? 'rgba(139,92,246,0.18)' : 'rgba(139,92,246,0)',
            borderColor: big ? 'rgba(34,211,238,0.8)' : 'rgba(167,139,250,0.6)',
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 22 }}
          className="grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border backdrop-blur-[1px]"
        >
          <AnimatePresence>
            {label && (
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="font-mono text-[10px] font-bold uppercase tracking-widest text-white"
              >
                {label}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </>
  )
}

/* ------------------------------------------------------------------ */
/* Neural network canvas — drifting nodes that link up near the cursor */
/* ------------------------------------------------------------------ */
export function NeuralCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current!
    const ctx = canvas.getContext('2d')!
    const reduce = prefersReducedMotion()
    let w = 0
    let h = 0
    let raf = 0
    let visible = true
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const mouse = { x: -9999, y: -9999 }
    type P = { x: number; y: number; vx: number; vy: number; r: number; hue: number; pulse: number }
    let pts: P[] = []

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      w = rect.width
      h = rect.height
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const n = Math.min(110, Math.floor((w * h) / 14000))
      pts = Array.from({ length: n }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.6 + 0.8,
        hue: Math.random() < 0.5 ? 262 : 188,
        pulse: Math.random() * Math.PI * 2,
      }))
    }

    const LINK = 130
    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      for (const p of pts) {
        if (!reduce) {
          // gentle attraction toward the cursor
          const dx = mouse.x - p.x
          const dy = mouse.y - p.y
          const d = Math.hypot(dx, dy)
          if (d < 200 && d > 1) {
            p.vx += (dx / d) * 0.012
            p.vy += (dy / d) * 0.012
          }
          p.vx *= 0.995
          p.vy *= 0.995
          p.x += p.vx
          p.y += p.vy
          if (p.x < 0 || p.x > w) p.vx *= -1
          if (p.y < 0 || p.y > h) p.vy *= -1
          p.pulse += 0.03
        }
      }
      for (let i = 0; i < pts.length; i++) {
        const a = pts[i]
        for (let j = i + 1; j < pts.length; j++) {
          const b = pts[j]
          const d = Math.hypot(a.x - b.x, a.y - b.y)
          if (d < LINK) {
            ctx.strokeStyle = `hsla(${a.hue}, 90%, 70%, ${(1 - d / LINK) * 0.22})`
            ctx.lineWidth = 0.7
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
        const dm = Math.hypot(a.x - mouse.x, a.y - mouse.y)
        if (dm < 180) {
          ctx.strokeStyle = `hsla(188, 95%, 65%, ${(1 - dm / 180) * 0.6})`
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(mouse.x, mouse.y)
          ctx.stroke()
        }
        const glow = 0.6 + Math.sin(a.pulse) * 0.4
        ctx.fillStyle = `hsla(${a.hue}, 95%, 75%, ${glow})`
        ctx.beginPath()
        ctx.arc(a.x, a.y, a.r + (dm < 180 ? 1.2 : 0), 0, Math.PI * 2)
        ctx.fill()
      }
      if (visible && !reduce) raf = requestAnimationFrame(draw)
    }

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect()
      mouse.x = e.clientX - r.left
      mouse.y = e.clientY - r.top
    }
    const onLeave = () => {
      mouse.x = -9999
      mouse.y = -9999
    }
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      cancelAnimationFrame(raf)
      if (visible) raf = requestAnimationFrame(draw)
    })

    resize()
    draw()
    io.observe(canvas)
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return <canvas ref={ref} className="absolute inset-0 h-full w-full" />
}

/* ------------------------------------------------------------------ */
/* Text scramble — decodes text like a terminal when it enters view    */
/* ------------------------------------------------------------------ */
const GLYPHS = '!<>-_\\/[]{}—=+*^?#01ABCDEFXYZ'
export function Scramble({ text, className = '' }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [out, setOut] = useState(text)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    if (!inView || prefersReducedMotion()) return
    setStarted(true)
    let frame = 0
    const total = 28
    const id = setInterval(() => {
      frame++
      setOut(
        text
          .split('')
          .map((c, i) => {
            if (c === ' ' || c === '·') return c
            const revealAt = (i / text.length) * total
            return frame >= revealAt ? c : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
          })
          .join(''),
      )
      if (frame >= total) clearInterval(id)
    }, 35)
    return () => clearInterval(id)
  }, [inView, text])

  return (
    <span ref={ref} className={className} aria-label={text}>
      {started || !inView ? out : text}
    </span>
  )
}

/* ------------------------------------------------------------------ */
/* Scroll-velocity marquee — speeds up & skews as you scroll           */
/* ------------------------------------------------------------------ */
function wrap(min: number, max: number, v: number) {
  const r = max - min
  return ((((v - min) % r) + r) % r) + min
}

export function VelocityMarquee({ items, baseVelocity = 2, className = '' }: { items: string[]; baseVelocity?: number; className?: string }) {
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const velocity = useVelocity(scrollY)
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 })
  const factor = useTransform(smooth, [-1000, 0, 1000], [-5, 0, 5], { clamp: false })
  const skew = useTransform(smooth, [-2000, 0, 2000], [-8, 0, 8])
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`)
  const dir = useRef(1)

  useAnimationFrame((_, delta) => {
    let move = dir.current * baseVelocity * (delta / 1000)
    const f = factor.get()
    if (f < 0) dir.current = -1
    else if (f > 0) dir.current = 1
    move += dir.current * move * Math.abs(f)
    baseX.set(baseX.get() + move)
  })

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div style={{ x, skewX: skew }} className="flex w-max">
        {[0, 1].map((k) => (
          <div key={k} className="flex">
            {items.map((m) => (
              <span key={m + k} className="mx-6 flex items-center gap-6 font-display text-3xl font-bold md:text-5xl">
                {m}
                <span className="text-violet-400/70">✦</span>
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  )
}
