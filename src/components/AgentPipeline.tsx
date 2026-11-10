import { AnimatePresence, motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { BadgeCheck, ClipboardList, FileSearch, ShieldCheck, Stethoscope, UserCheck } from 'lucide-react'

// A simulated run of the HealthOps AI multi-agent pipeline (illustrative, not live data).
const steps = [
  {
    agent: 'Intake Agent',
    icon: Stethoscope,
    color: '#a78bfa',
    logs: ['reading complaint (Hinglish): "seene mein dard, 2 din se"', '→ chest pain · 2 days', 'red-flag rules: escalate to physician ✓'],
  },
  {
    agent: 'Coding Agent',
    icon: FileSearch,
    color: '#818cf8',
    logs: ['hybrid search over 74,719 ICD-10-CM codes…', '→ R07.9 Chest pain, unspecified', 'E/M level (2021 rules) → 99214'],
  },
  {
    agent: 'Claims Review',
    icon: ClipboardList,
    color: '#38bdf8',
    logs: ['running 17-check rules engine…', '17/17 checks passed', 'X12 837P claim generated'],
  },
  {
    agent: 'Prior Auth',
    icon: ShieldCheck,
    color: '#22d3ee',
    logs: ['comparing notes to payer policy…', 'criteria met — evidence cited', 'FHIR Da Vinci PAS request drafted'],
  },
  {
    agent: 'Human Review',
    icon: UserCheck,
    color: '#34d399',
    logs: ['PHI masked · audit hash chained', 'awaiting approval…', '✓ approved by billing lead'],
  },
]

type Line = { id: number; agent: string; color: string; text: string }

export default function AgentPipeline() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: '-120px' })
  const [active, setActive] = useState(-1)
  const [lines, setLines] = useState<Line[]>([])
  const idRef = useRef(0)

  useEffect(() => {
    if (!inView) return
    let cancelled = false
    const timers: number[] = []
    const wait = (ms: number) => new Promise<void>((r) => timers.push(window.setTimeout(r, ms)))

    const run = async () => {
      while (!cancelled) {
        setLines([])
        for (let s = 0; s < steps.length && !cancelled; s++) {
          setActive(s)
          for (const text of steps[s].logs) {
            await wait(520)
            if (cancelled) return
            setLines((l) => [...l.slice(-7), { id: idRef.current++, agent: steps[s].agent, color: steps[s].color, text }])
          }
          await wait(350)
        }
        setActive(steps.length)
        await wait(2600)
        setActive(-1)
        await wait(500)
      }
    }
    run()
    return () => {
      cancelled = true
      timers.forEach(clearTimeout)
    }
  }, [inView])

  const done = active >= steps.length

  return (
    <div ref={ref} className="spin-border always mb-16 overflow-hidden rounded-3xl border border-white/10">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-6 py-4">
        <div className="flex items-center gap-3">
          <span className="pulse-dot h-2 w-2 rounded-full bg-emerald-400" />
          <span className="font-mono text-sm text-slate-300">healthops-ai · agent run</span>
        </div>
        <span className="font-mono text-xs text-slate-500">simulated · human-in-the-loop</span>
      </div>

      <div className="grid gap-8 p-6 md:p-8 lg:grid-cols-[1fr_1.1fr]">
        {/* Pipeline nodes */}
        <div className="relative flex flex-col gap-3">
          <div className="absolute bottom-6 left-[23px] top-6 w-px bg-white/10">
            <motion.div
              className="h-full w-full origin-top bg-gradient-to-b from-violet-400 via-cyan-300 to-emerald-300"
              animate={{ scaleY: Math.max(0, Math.min(active, steps.length - 1)) / (steps.length - 1) }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            />
          </div>
          {steps.map((s, i) => {
            const state = i < active || done ? 'done' : i === active ? 'active' : 'idle'
            const Icon = s.icon
            return (
              <motion.div
                key={s.agent}
                animate={{ x: state === 'active' ? 8 : 0, opacity: state === 'idle' ? 0.45 : 1 }}
                className="relative flex items-center gap-4"
              >
                <motion.span
                  animate={{
                    boxShadow: state === 'active' ? `0 0 0 6px ${s.color}22, 0 0 24px ${s.color}88` : '0 0 0 0 transparent',
                    borderColor: state === 'idle' ? 'rgba(255,255,255,0.15)' : s.color,
                  }}
                  className="relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-xl border bg-ink-900"
                  style={{ color: s.color }}
                >
                  {state === 'done' ? <BadgeCheck size={20} /> : <Icon size={20} />}
                </motion.span>
                <div className="flex-1">
                  <div className="font-semibold text-white">{s.agent}</div>
                  <div className="h-1 w-full overflow-hidden rounded-full bg-white/5">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: s.color }}
                      animate={{ width: state === 'done' ? '100%' : state === 'active' ? '60%' : '0%' }}
                      transition={{ duration: state === 'active' ? 1.6 : 0.4 }}
                    />
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Log console */}
        <div className="flex min-h-[320px] flex-col rounded-2xl border border-white/10 bg-black/50 p-5 font-mono text-[13px]">
          <div className="flex-1 space-y-2 overflow-hidden">
            <AnimatePresence initial={false}>
              {lines.map((l) => (
                <motion.div
                  key={l.id}
                  layout
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="leading-relaxed"
                >
                  <span style={{ color: l.color }}>[{l.agent}]</span> <span className="text-slate-300">{l.text}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <AnimatePresence>
            {done && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                className="mt-4 flex items-center gap-2 rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-emerald-300"
              >
                <BadgeCheck size={16} /> claim ready to submit · 5 agents · 1 human approval
              </motion.div>
            )}
          </AnimatePresence>
          {!done && (
            <div className="mt-3 text-slate-500">
              <span className="text-violet-400">$</span> <span className="caret h-4 align-middle" />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
