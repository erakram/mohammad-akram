import { motion, useMotionValue, useSpring, useTransform, useInView, animate } from 'framer-motion'
import { ReactNode, useEffect, useRef, useState, MouseEvent } from 'react'
import { Scramble } from './creative'

export function Reveal({
  children,
  delay = 0,
  y = 40,
  className = '',
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function SectionTitle({ kicker, title, sub }: { kicker: string; title: ReactNode; sub?: string }) {
  return (
    <Reveal className="mb-14 md:mb-20">
      <div className="mb-4 flex items-center gap-3 font-mono text-sm text-cyan-300">
        <span className="h-px w-10 bg-gradient-to-r from-transparent to-cyan-300" />
        <Scramble text={kicker} />
      </div>
      <h2 className="font-display text-4xl font-bold tracking-tight text-white md:text-6xl">{title}</h2>
      {sub && <p className="mt-5 max-w-2xl text-lg text-slate-400">{sub}</p>}
    </Reveal>
  )
}

/** 3D tilt card that follows the pointer and shows a moving spotlight. */
export function TiltCard({ children, className = '', intensity = 10 }: { children: ReactNode; className?: string; intensity?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0.5)
  const y = useMotionValue(0.5)
  const sx = useSpring(x, { stiffness: 200, damping: 20 })
  const sy = useSpring(y, { stiffness: 200, damping: 20 })
  const rotateX = useTransform(sy, [0, 1], [intensity, -intensity])
  const rotateY = useTransform(sx, [0, 1], [-intensity, intensity])
  const glowX = useTransform(sx, (v) => `${v * 100}%`)
  const glowY = useTransform(sy, (v) => `${v * 100}%`)
  const spotlight = useTransform(
    [glowX, glowY],
    ([gx, gy]) => `radial-gradient(400px circle at ${gx} ${gy}, rgba(139,92,246,0.18), transparent 45%)`,
  )

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = ref.current!.getBoundingClientRect()
    x.set((e.clientX - r.left) / r.width)
    y.set((e.clientY - r.top) / r.height)
  }
  const onLeave = () => {
    x.set(0.5)
    y.set(0.5)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className={`group relative ${className}`}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: spotlight }}
      />
      {children}
    </motion.div>
  )
}

/** Button/element that is pulled toward the cursor. */
export function Magnetic({ children, strength = 0.35 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useSpring(0, { stiffness: 250, damping: 15 })
  const y = useSpring(0, { stiffness: 250, damping: 15 })
  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      className="inline-block"
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect()
        x.set((e.clientX - (r.left + r.width / 2)) * strength)
        y.set((e.clientY - (r.top + r.height / 2)) * strength)
      }}
      onMouseLeave={() => {
        x.set(0)
        y.set(0)
      }}
    >
      {children}
    </motion.div>
  )
}

export function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!inView) return
    const c = animate(0, to, { duration: 2, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setVal(Math.round(v)) })
    return () => c.stop()
  }, [inView, to])
  return (
    <span ref={ref}>
      {val.toLocaleString()}
      {suffix}
    </span>
  )
}
