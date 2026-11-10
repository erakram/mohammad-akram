import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { Bot, Brain, Database, HeartPulse, LayoutTemplate, Server } from 'lucide-react'
import { marquee, skillGroups } from '../data'
import { SectionTitle } from './ui'
import { VelocityMarquee } from './creative'

const icons = { layout: LayoutTemplate, server: Server, brain: Brain, bot: Bot, heart: HeartPulse, database: Database } as const

export default function Skills() {
  const [active, setActive] = useState(0)
  const group = skillGroups[active]

  return (
    <section id="skills" className="relative overflow-hidden py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <SectionTitle
          kicker="02 · toolkit"
          title={
            <>
              Skills that <span className="text-gradient">ship products.</span>
            </>
          }
          sub="From pixel-perfect Angular & React frontends to tool-calling AI agents with evals and guardrails."
        />
      </div>

      {/* Scroll-velocity marquee — scroll fast to see it react */}
      <div className="marquee mb-16 space-y-3 overflow-hidden">
        <div className="-rotate-2 border-y border-white/10 bg-gradient-to-r from-violet-600/20 via-ink-900 to-cyan-500/20 py-4">
          <VelocityMarquee items={marquee.slice(0, 9)} baseVelocity={3} className="text-white/90" />
        </div>
        <div className="rotate-1 py-2">
          <VelocityMarquee items={marquee.slice(9)} baseVelocity={-3} className="text-transparent [-webkit-text-stroke:1px_rgba(167,139,250,0.6)]" />
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5">
        <div className="mb-8 flex flex-wrap gap-2">
          {skillGroups.map((g, i) => {
            const Icon = icons[g.icon as keyof typeof icons]
            return (
              <button
                key={g.name}
                onClick={() => setActive(i)}
                className={`relative flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
                  active === i ? 'text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {active === i && (
                  <motion.span
                    layoutId="skill-tab"
                    className="absolute inset-0 -z-10 rounded-full border border-violet-400/40 bg-gradient-to-r from-violet-600/40 to-cyan-500/30"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <Icon size={16} /> {g.name}
              </button>
            )
          })}
        </div>

        <div className="glass relative min-h-[220px] overflow-hidden p-8">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-violet-600/20 blur-3xl" />
          <AnimatePresence mode="wait">
            <motion.div
              key={group.name}
              className="relative flex flex-wrap gap-3"
              initial="hidden"
              animate="show"
              exit="exit"
              variants={{ show: { transition: { staggerChildren: 0.035 } }, exit: { transition: { staggerChildren: 0.01 } } }}
            >
              {group.items.map((s) => (
                <motion.span
                  key={s}
                  variants={{
                    hidden: { opacity: 0, y: 20, scale: 0.8 },
                    show: { opacity: 1, y: 0, scale: 1 },
                    exit: { opacity: 0, y: -10, scale: 0.9 },
                  }}
                  whileHover={{ y: -4, scale: 1.06 }}
                  className="cursor-default rounded-xl border border-white/10 bg-ink-800/80 px-4 py-2.5 font-medium text-slate-200 shadow-lg transition-colors hover:border-cyan-400/50 hover:text-white hover:shadow-cyan-500/20"
                >
                  {s}
                </motion.span>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
