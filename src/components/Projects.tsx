import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { FolderGit2 } from 'lucide-react'
import { projects } from '../data'
import { SectionTitle, TiltCard } from './ui'

const filters = ['All', 'AI', 'Enterprise', 'Web'] as const
const tagColor: Record<string, string> = {
  AI: 'text-fuchsia-300 bg-fuchsia-500/10 border-fuchsia-400/20',
  Enterprise: 'text-cyan-300 bg-cyan-500/10 border-cyan-400/20',
  Web: 'text-amber-300 bg-amber-500/10 border-amber-400/20',
}

export default function Projects() {
  const [filter, setFilter] = useState<(typeof filters)[number]>('All')
  const list = projects.filter((p) => filter === 'All' || p.tag === filter)

  return (
    <section id="projects" className="section">
      <SectionTitle
        kicker="05 · work"
        title={
          <>
            Products I've <span className="text-gradient">built.</span>
          </>
        }
        sub="Enterprise platforms, AI products and consumer apps across banking, ESG, cloud training and retail."
      />

      <div className="mb-10 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`relative rounded-full px-5 py-2 text-sm font-semibold transition-colors ${filter === f ? 'text-ink-950' : 'text-slate-400 hover:text-white'}`}
          >
            {filter === f && (
              <motion.span layoutId="proj-filter" className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-violet-300 to-cyan-300" />
            )}
            {f}
            <span className="ml-1.5 opacity-60">{f === 'All' ? projects.length : projects.filter((p) => p.tag === f).length}</span>
          </button>
        ))}
      </div>

      <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {list.map((p, i) => (
            <motion.div
              key={p.name}
              layout
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.45, delay: i * 0.03, ease: [0.22, 1, 0.36, 1] }}
            >
              <TiltCard className="h-full rounded-2xl">
                <div className="spin-border flex h-full flex-col rounded-2xl border border-white/10 p-6">
                  <div className="mb-5 flex items-start justify-between">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-violet-500/20 to-cyan-400/20 text-violet-200 transition-transform duration-500 group-hover:rotate-[360deg]">
                      <FolderGit2 size={20} />
                    </span>
                    <span className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${tagColor[p.tag]}`}>{p.tag}</span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-white transition-colors group-hover:text-cyan-200">{p.name}</h3>
                  <p className="mt-2 flex-1 text-slate-400">{p.desc}</p>
                  <div className="mt-5 font-mono text-xs text-violet-300">{p.stack}</div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}
