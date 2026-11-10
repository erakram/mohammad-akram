import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowRight, Bot, Copy, CornerDownLeft, Download, Github, Hash, Mail, Search } from 'lucide-react'
import { aiProjects, profile } from '../data'

type Cmd = { id: string; label: string; group: string; icon: typeof Hash; run: () => void }

const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

export function useCommandPalette() {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((o) => !o)
      }
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])
  return [open, setOpen] as const
}

export default function CommandPalette({ open, setOpen }: { open: boolean; setOpen: (o: boolean) => void }) {
  const [q, setQ] = useState('')
  const [sel, setSel] = useState(0)
  const [toast, setToast] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const cmds: Cmd[] = useMemo(
    () => [
      ...['about', 'skills', 'experience', 'ai', 'projects', 'education', 'contact'].map((id) => ({
        id: `go-${id}`,
        label: `Go to ${id === 'ai' ? 'AI Agents' : id[0].toUpperCase() + id.slice(1)}`,
        group: 'Navigate',
        icon: Hash,
        run: () => go(id),
      })),
      ...aiProjects.map((p) => ({
        id: `open-${p.name}`,
        label: `Open ${p.name} (live)`,
        group: 'AI Agents',
        icon: Bot,
        run: () => window.open(p.url, '_blank', 'noopener'),
      })),
      {
        id: 'copy-email',
        label: 'Copy email address',
        group: 'Contact',
        icon: Copy,
        run: () => {
          navigator.clipboard.writeText(profile.email)
          setToast('Email copied to clipboard')
        },
      },
      { id: 'email', label: 'Send an email', group: 'Contact', icon: Mail, run: () => (window.location.href = `mailto:${profile.email}`) },
      { id: 'github', label: 'Open GitHub profile', group: 'Contact', icon: Github, run: () => window.open(profile.github, '_blank', 'noopener') },
      {
        id: 'cv',
        label: 'Download CV (PDF)',
        group: 'Contact',
        icon: Download,
        run: () => {
          const a = document.createElement('a')
          a.href = profile.cv
          a.download = ''
          a.click()
        },
      },
    ],
    [],
  )

  const filtered = cmds.filter((c) => c.label.toLowerCase().includes(q.toLowerCase()))

  useEffect(() => {
    if (open) {
      setQ('')
      setSel(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open])
  useEffect(() => setSel(0), [q])
  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(''), 1800)
    return () => clearTimeout(t)
  }, [toast])

  const exec = (c?: Cmd) => {
    if (!c) return
    setOpen(false)
    setTimeout(c.run, 120)
  }

  let lastGroup = ''
  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[95] flex items-start justify-center bg-ink-950/60 px-4 pt-[15vh] backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="spin-border always w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-violet-900/40"
            >
              <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3.5">
                <Search size={18} className="text-violet-300" />
                <input
                  ref={inputRef}
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'ArrowDown') {
                      e.preventDefault()
                      setSel((s) => Math.min(filtered.length - 1, s + 1))
                    } else if (e.key === 'ArrowUp') {
                      e.preventDefault()
                      setSel((s) => Math.max(0, s - 1))
                    } else if (e.key === 'Enter') exec(filtered[sel])
                  }}
                  placeholder="Type a command or search…"
                  className="flex-1 bg-transparent text-white placeholder-slate-500 outline-none"
                />
                <kbd className="rounded border border-white/15 px-1.5 py-0.5 font-mono text-[10px] text-slate-400">ESC</kbd>
              </div>
              <div className="max-h-[50vh] overflow-y-auto p-2">
                {filtered.length === 0 && <div className="px-3 py-8 text-center text-sm text-slate-500">No results for “{q}”</div>}
                {filtered.map((c, i) => {
                  const header = c.group !== lastGroup
                  lastGroup = c.group
                  const Icon = c.icon
                  return (
                    <div key={c.id}>
                      {header && <div className="px-3 pb-1 pt-3 font-mono text-[11px] uppercase tracking-widest text-slate-500">{c.group}</div>}
                      <button
                        onMouseEnter={() => setSel(i)}
                        onClick={() => exec(c)}
                        className={`relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${
                          sel === i ? 'text-white' : 'text-slate-400'
                        }`}
                      >
                        {sel === i && (
                          <motion.span
                            layoutId="cmd-sel"
                            className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-violet-600/30 to-cyan-500/20"
                            transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                          />
                        )}
                        <Icon size={16} className={sel === i ? 'text-cyan-300' : ''} />
                        <span className="flex-1">{c.label}</span>
                        {sel === i ? <CornerDownLeft size={14} className="text-slate-400" /> : <ArrowRight size={14} className="opacity-0" />}
                      </button>
                    </div>
                  )
                })}
              </div>
              <div className="flex items-center justify-between border-t border-white/10 px-4 py-2.5 font-mono text-[11px] text-slate-500">
                <span>↑↓ navigate · ↵ select</span>
                <span>⌘K to toggle</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="pointer-events-none fixed inset-x-0 bottom-6 z-[96] flex justify-center"
          >
            <span className="rounded-full border border-emerald-400/30 bg-ink-900/90 px-5 py-2.5 text-sm text-emerald-300 backdrop-blur">{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
