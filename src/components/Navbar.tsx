import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Menu, X, Download, Command } from 'lucide-react'
import { profile } from '../data'

const links = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'ai', label: 'AI Agents' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar({ onOpenPalette }: { onOpenPalette: () => void }) {
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 25 })
  const [active, setActive] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    links.forEach((l) => {
      const el = document.getElementById(l.id)
      if (el) obs.observe(el)
    })
    return () => {
      window.removeEventListener('scroll', onScroll)
      obs.disconnect()
    }
  }, [])

  return (
    <>
      <motion.div
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-violet-500 via-cyan-400 to-pink-500"
      />
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-3 z-50 flex justify-center px-4"
      >
        <nav
          className={`flex w-full max-w-5xl items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500 ${
            scrolled ? 'border border-white/10 bg-ink-900/70 shadow-2xl shadow-violet-900/20 backdrop-blur-xl' : 'border border-transparent'
          }`}
        >
          <a href="#top" className="flex items-center gap-2 font-display text-lg font-bold text-white">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-violet-500 to-cyan-400 text-sm shadow-lg shadow-violet-500/30">
              MA
            </span>
            <span className="hidden sm:inline">
              {profile.firstName}
              <span className="text-cyan-300">.</span>
            </span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    active === l.id ? 'text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {active === l.id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-white/10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenPalette}
              aria-label="Open command palette"
              className="hidden items-center gap-1.5 rounded-full border border-white/15 px-3 py-2 font-mono text-xs text-slate-400 transition-colors hover:border-violet-400/60 hover:text-white lg:flex"
            >
              <Command size={13} /> K
            </button>
            <a href={profile.cv} download className="btn-primary hidden !px-4 !py-2 text-sm sm:inline-flex">
              <Download size={15} /> CV
            </a>
            <button className="rounded-full p-2 text-white md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-4 top-20 z-50 rounded-3xl border border-white/10 bg-ink-900/95 p-4 backdrop-blur-xl md:hidden"
          >
            {links.map((l, i) => (
              <motion.a
                key={l.id}
                href={`#${l.id}`}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="block rounded-2xl px-4 py-3 font-medium text-slate-200 hover:bg-white/5"
              >
                {l.label}
              </motion.a>
            ))}
            <a href={profile.cv} download className="btn-primary mt-2 w-full justify-center">
              <Download size={16} /> Download CV
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
