import { motion } from 'framer-motion'
import { ArrowUpRight, Cpu } from 'lucide-react'
import { aiProjects } from '../data'
import { SectionTitle, TiltCard } from './ui'
import AgentPipeline from './AgentPipeline'

export default function AIProjects() {
  return (
    <section id="ai" className="relative overflow-hidden">
      <div className="pointer-events-none absolute left-1/2 top-40 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-violet-700/10 blur-[120px]" />
      <div className="section">
        <SectionTitle
          kicker="04 · live ai agents"
          title={
            <>
              Agents that <span className="text-gradient">do the work.</span>
            </>
          }
          sub="Three production AI apps — live, tested and evaluated. Built with Python, FastAPI and Claude Code."
        />

        <AgentPipeline />

        <div className="space-y-10">
          {aiProjects.map((p, idx) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 80, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <TiltCard intensity={4} className="rounded-3xl">
                <div className="spin-border overflow-hidden rounded-3xl border border-white/10">
                  <div className={`h-1.5 w-full bg-gradient-to-r ${p.gradient}`} />
                  <div className="grid gap-8 p-7 md:p-10 lg:grid-cols-[1.3fr_1fr]">
                    <div>
                      <div className="mb-4 flex flex-wrap items-center gap-3">
                        <span className="font-mono text-sm text-slate-500">0{idx + 1}</span>
                        <span className="flex items-center gap-1.5 rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-bold tracking-wider text-emerald-300">
                          <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-emerald-400" /> LIVE
                        </span>
                      </div>
                      <h3 className="font-display text-3xl font-bold text-white md:text-4xl">{p.name}</h3>
                      <p className={`mt-1 bg-gradient-to-r ${p.gradient} bg-clip-text text-lg font-semibold text-transparent`}>{p.subtitle}</p>
                      <ul className="mt-6 space-y-3 text-slate-300">
                        {p.points.map((pt, i) => (
                          <motion.li
                            key={pt}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 + i * 0.1 }}
                            className="flex gap-3"
                          >
                            <Cpu size={16} className="mt-1 shrink-0 text-violet-300" />
                            <span>{pt}</span>
                          </motion.li>
                        ))}
                      </ul>
                      <div className="mt-6 flex flex-wrap gap-2">
                        {p.stack.map((s) => (
                          <span key={s} className="chip font-mono">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col justify-between gap-6">
                      {/* faux terminal */}
                      <div className="rounded-2xl border border-white/10 bg-black/40 font-mono text-sm">
                        <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
                          <span className="h-3 w-3 rounded-full bg-red-400/80" />
                          <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
                          <span className="h-3 w-3 rounded-full bg-green-400/80" />
                          <span className="ml-3 text-xs text-slate-500">{p.name.toLowerCase().replace(/\s+/g, '-')} — evals</span>
                        </div>
                        <div className="grid grid-cols-2 gap-px bg-white/5">
                          {p.metrics.map((m, i) => (
                            <motion.div
                              key={m.v}
                              initial={{ opacity: 0 }}
                              whileInView={{ opacity: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.4 + i * 0.15 }}
                              className={`bg-ink-950/90 p-4 ${p.metrics.length % 2 && i === p.metrics.length - 1 ? 'col-span-2' : ''}`}
                            >
                              <div className={`bg-gradient-to-r ${p.gradient} bg-clip-text text-xl font-bold text-transparent`}>{m.k}</div>
                              <div className="text-xs text-slate-500">{m.v}</div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                      <a href={p.url} target="_blank" rel="noreferrer" data-cursor="Open" className="btn-primary justify-center self-start">
                        Try it live <ArrowUpRight size={18} />
                      </a>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
