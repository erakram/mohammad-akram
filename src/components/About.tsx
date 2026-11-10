import { motion } from 'framer-motion'
import { Languages, MapPin, Timer, Bot } from 'lucide-react'
import { profile, stats } from '../data'
import { Counter, Reveal, SectionTitle } from './ui'

export default function About() {
  return (
    <section id="about" className="section">
      <SectionTitle
        kicker="01 · about me"
        title={
          <>
            A decade of shipping, <span className="text-gradient">now with agents.</span>
          </>
        }
      />

      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-6 text-lg leading-relaxed text-slate-300">
          {profile.summary.map((p, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <p>{p}</p>
            </Reveal>
          ))}
          <Reveal delay={0.3}>
            <div className="flex flex-wrap gap-3 pt-2">
              <span className="chip gap-1.5 !text-sm">
                <MapPin size={14} className="text-cyan-300" /> {profile.location}
              </span>
              <span className="chip gap-1.5 !text-sm">
                <Languages size={14} className="text-violet-300" /> {profile.languages.join(' · ')}
              </span>
              <span className="chip gap-1.5 !text-sm">
                <Timer size={14} className="text-pink-300" /> Notice: {profile.notice}
              </span>
              <span className="chip gap-1.5 !text-sm">
                <Bot size={14} className="text-emerald-300" /> Builds with Claude Code
              </span>
            </div>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              className="spin-border glass rounded-2xl p-6"
            >
              <div className="text-gradient font-display text-4xl font-bold md:text-5xl">
                <Counter to={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-2 font-semibold text-white">{s.label}</div>
              <div className="mt-1 text-sm text-slate-400">{s.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
