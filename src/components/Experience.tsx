import { motion, useScroll, useSpring } from 'framer-motion'
import { useRef } from 'react'
import { Briefcase } from 'lucide-react'
import { experience } from '../data'
import { SectionTitle } from './ui'

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 25 })

  return (
    <section id="experience" className="section">
      <SectionTitle
        kicker="03 · journey"
        title={
          <>
            10+ years, <span className="text-gradient">one direction.</span>
          </>
        }
        sub="From .NET and Rails to Angular 21 monorepos and multi-agent AI platforms."
      />

      <div ref={ref} className="relative">
        {/* track + animated fill */}
        <div className="absolute left-4 top-0 h-full w-px bg-white/10 md:left-1/2" />
        <motion.div
          style={{ scaleY }}
          className="absolute left-4 top-0 h-full w-px origin-top bg-gradient-to-b from-violet-500 via-cyan-400 to-pink-500 shadow-[0_0_12px_2px_rgba(139,92,246,0.6)] md:left-1/2"
        />

        <div className="space-y-12">
          {experience.map((e, i) => {
            const left = i % 2 === 0
            return (
              <div key={e.company + e.period} className="relative md:grid md:grid-cols-2 md:gap-16">
                <motion.span
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                  className={`absolute left-4 top-6 z-10 grid h-9 w-9 -translate-x-1/2 place-items-center rounded-full border-2 md:left-1/2 ${
                    e.current ? 'border-cyan-300 bg-cyan-400/20' : 'border-violet-400 bg-ink-900'
                  }`}
                >
                  <Briefcase size={14} className={e.current ? 'text-cyan-200' : 'text-violet-300'} />
                  {e.current && <span className="absolute inset-0 animate-ping rounded-full bg-cyan-400/30" />}
                </motion.span>

                <motion.div
                  initial={{ opacity: 0, x: left ? -60 : 60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className={`ml-12 md:ml-0 ${left ? 'md:col-start-1 md:text-right' : 'md:col-start-2'}`}
                >
                  <div className="spin-border glass p-6 text-left transition-transform duration-300 hover:-translate-y-1">
                    <div className="mb-1 flex flex-wrap items-center gap-2 font-mono text-sm text-cyan-300">
                      {e.period}
                      {e.current && <span className="rounded-full bg-emerald-400/15 px-2 py-0.5 text-xs text-emerald-300">Current</span>}
                    </div>
                    <h3 className="font-display text-2xl font-bold text-white">{e.role}</h3>
                    <div className="text-slate-300">{e.company}</div>
                    {e.note && <div className="text-sm text-slate-500">{e.note}</div>}
                    <ul className="mt-4 space-y-2 text-slate-400">
                      {e.points.map((p) => (
                        <li key={p} className="flex gap-2">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-violet-400 to-cyan-300" />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {e.stack.map((s) => (
                        <span key={s} className="chip">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
