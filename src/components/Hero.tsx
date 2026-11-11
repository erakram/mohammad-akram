import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'
import { ArrowDown, Download, Github, Mail, MapPin, Sparkles } from 'lucide-react'
import { profile } from '../data'
import { Magnetic } from './ui'
import { NeuralCanvas } from './creative'
import Logo from './Logo'

function useTypewriter(words: string[], speed = 70, pause = 1600) {
  const [i, setI] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)
  useEffect(() => {
    const word = words[i % words.length]
    const done = !deleting && text === word
    const empty = deleting && text === ''
    const t = setTimeout(
      () => {
        if (done) return setDeleting(true)
        if (empty) {
          setDeleting(false)
          return setI((n) => n + 1)
        }
        setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1))
      },
      done ? pause : deleting ? speed / 2 : speed,
    )
    return () => clearTimeout(t)
  }, [text, deleting, i, words, speed, pause])
  return text
}

const orbitInner = ['Angular', 'React', 'Next.js', 'Node.js']
const orbitOuter = ['Claude', 'RAG', 'FastAPI', 'Vue', 'TS', 'Agents']

const letter = {
  hidden: { y: '110%', rotate: 8 },
  show: (i: number) => ({ y: '0%', rotate: 0, transition: { delay: 0.4 + i * 0.04, duration: 0.9, ease: [0.22, 1, 0.36, 1] } }),
}

function SplitName({ text, offset = 0, className = '' }: { text: string; offset?: number; className?: string }) {
  return (
    <span className={`inline-flex overflow-hidden pb-2 ${className}`}>
      {text.split('').map((c, i) => (
        <motion.span key={i} custom={i + offset} variants={letter} initial="hidden" animate="show" className="inline-block">
          {c === ' ' ? ' ' : c}
        </motion.span>
      ))}
    </span>
  )
}

export default function Hero() {
  const typed = useTypewriter(profile.roles)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 60, damping: 20 })
  const sy = useSpring(my, { stiffness: 60, damping: 20 })
  const px = useTransform(sx, (v) => v * 30)
  const py = useTransform(sy, (v) => v * 30)
  const pxr = useTransform(sx, (v) => v * -20)
  const pyr = useTransform(sy, (v) => v * -20)

  useEffect(() => {
    const onMove = (e: globalThis.MouseEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5)
      my.set(e.clientY / window.innerHeight - 0.5)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [mx, my])

  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden pt-28">
      <div className="aurora">
        <span className="a1" />
        <span className="a2" />
        <span className="a3" />
      </div>
      <div className="grid-bg absolute inset-0" />
      <NeuralCanvas />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-16 px-5 lg:grid-cols-[1.25fr_1fr]">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="mb-7 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-4 py-1.5 text-sm text-emerald-300"
          >
            <span className="pulse-dot h-2 w-2 rounded-full bg-emerald-400" />
            Open to new opportunities
          </motion.div>

          <h1 className="font-display text-[3.2rem] font-bold leading-[0.95] tracking-tight text-white sm:text-7xl lg:text-[5.5rem]">
            <span className="block text-2xl font-medium text-slate-400 sm:text-3xl">
              <SplitName text="Hi, I'm" />
            </span>
            <SplitName text={profile.firstName} offset={7} />
            <br />
            <SplitName text={profile.lastName} offset={15} className="text-gradient" />
          </h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-6 flex h-9 items-center font-mono text-lg text-slate-300 sm:text-2xl"
          >
            <span className="mr-2 text-violet-400">&gt;</span>
            {typed}
            <span className="caret h-6 sm:h-7" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.35, duration: 0.8 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-slate-400"
          >
            {profile.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Magnetic>
              <a href="#ai" className="btn-primary">
                <Sparkles size={18} /> See my AI agents
              </a>
            </Magnetic>
            <Magnetic>
              <a href={profile.cv} download className="btn-ghost">
                <Download size={18} /> Download CV
              </a>
            </Magnetic>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.7 }}
            className="mt-9 flex flex-wrap items-center gap-5 text-sm text-slate-400"
          >
            <span className="flex items-center gap-1.5">
              <MapPin size={15} className="text-cyan-300" /> {profile.location}
            </span>
            <a href={profile.github} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 transition-colors hover:text-white">
              <Github size={15} className="text-violet-300" /> {profile.githubHandle}
            </a>
            <a href={`mailto:${profile.email}`} className="flex items-center gap-1.5 transition-colors hover:text-white">
              <Mail size={15} className="text-pink-300" /> {profile.email}
            </a>
          </motion.div>
        </div>

        {/* Orbiting avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto hidden aspect-square w-full max-w-[440px] lg:block"
        >
          <motion.div style={{ x: pxr, y: pyr }} className="absolute inset-0">
            <div className="orbit orbit-spin-rev absolute inset-0">
              {orbitOuter.map((t, i) => {
                const a = (i / orbitOuter.length) * Math.PI * 2
                return (
                  <span
                    key={t}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${50 + 50 * Math.cos(a)}%`, top: `${50 + 50 * Math.sin(a)}%` }}
                  >
                    <span className="counter-rotate-rev chip block border-cyan-400/30 bg-ink-900/80 font-mono text-cyan-200 backdrop-blur">{t}</span>
                  </span>
                )
              })}
            </div>
          </motion.div>
          <motion.div style={{ x: px, y: py }} className="absolute inset-[17%]">
            <div className="orbit orbit-spin absolute inset-0">
              {orbitInner.map((t, i) => {
                const a = (i / orbitInner.length) * Math.PI * 2 + 0.6
                return (
                  <span
                    key={t}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${50 + 50 * Math.cos(a)}%`, top: `${50 + 50 * Math.sin(a)}%` }}
                  >
                    <span className="counter-rotate chip block border-violet-400/30 bg-ink-900/80 font-mono text-violet-200 backdrop-blur">{t}</span>
                  </span>
                )
              })}
            </div>
          </motion.div>

          <div className="float absolute inset-[30%]">
            <div className="spin-border always h-full w-full rounded-full">
              <div className="grid h-full w-full place-items-center rounded-full bg-gradient-to-br from-violet-600/30 via-ink-900 to-cyan-500/20">
                <Logo size={120} tile={false} animate title="Mohammad Akram" />
              </div>
            </div>
            <div className="absolute -inset-6 -z-10 rounded-full bg-violet-600/30 blur-3xl" />
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs uppercase tracking-[0.3em] text-slate-500 md:flex"
      >
        <span className="flex h-10 w-6 justify-center rounded-full border border-white/20 pt-2">
          <span className="scroll-dot h-2 w-1 rounded-full bg-cyan-300" />
        </span>
        <ArrowDown size={14} />
      </motion.a>
    </section>
  )
}
