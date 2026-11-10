import { motion } from 'framer-motion'
import { useState } from 'react'
import { Check, Copy, Download, Github, GraduationCap, Mail } from 'lucide-react'
import { education, profile } from '../data'
import { Magnetic, Reveal, SectionTitle } from './ui'

export function Education() {
  return (
    <section id="education" className="section !pb-10">
      <SectionTitle kicker="06 · education" title={<>Foundations.</>} />
      <div className="grid gap-5 md:grid-cols-2">
        {education.map((e, i) => (
          <Reveal key={e.degree} delay={i * 0.12}>
            <div className="spin-border glass flex h-full gap-5 p-6">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-pink-500/20 to-violet-500/20 text-pink-200">
                <GraduationCap />
              </span>
              <div>
                <h3 className="font-display text-xl font-bold text-white">{e.degree}</h3>
                <p className="mt-1 text-slate-400">{e.school}</p>
                {e.period && <p className="mt-2 font-mono text-sm text-cyan-300">{e.period}</p>}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    await navigator.clipboard.writeText(profile.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <section id="contact" className="section">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="spin-border always relative overflow-hidden rounded-[2rem] border border-white/10 px-6 py-16 text-center md:px-16 md:py-24"
      >
        <div className="aurora opacity-60">
          <span className="a1" />
          <span className="a2" />
        </div>
        <div className="relative">
          <div className="mb-4 font-mono text-sm text-cyan-300">07 · let's talk</div>
          <h2 className="font-display text-4xl font-bold tracking-tight text-white md:text-7xl">
            Have a product in mind?
            <br />
            <span className="text-gradient">Let's build it.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-slate-300">
            Full stack roles, AI agent projects or a chat about Angular, React and LLMs — my inbox is open.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Magnetic>
              <a href={`mailto:${profile.email}`} className="btn-primary text-lg">
                <Mail size={20} /> Say hello
              </a>
            </Magnetic>
            <button onClick={copy} className="btn-ghost font-mono text-sm">
              {copied ? <Check size={16} className="text-emerald-300" /> : <Copy size={16} />}
              {copied ? 'Copied!' : profile.email}
            </button>
          </div>

          <div className="mt-8 flex justify-center gap-4">
            <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="grid h-12 w-12 place-items-center rounded-full border border-white/15 text-slate-300 transition-all hover:-translate-y-1 hover:border-violet-400 hover:text-white">
              <Github size={20} />
            </a>
            <a href={profile.cv} download aria-label="Download CV" className="grid h-12 w-12 place-items-center rounded-full border border-white/15 text-slate-300 transition-all hover:-translate-y-1 hover:border-cyan-400 hover:text-white">
              <Download size={20} />
            </a>
          </div>
        </div>
      </motion.div>

      <footer className="mt-16 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-8 text-sm text-slate-500 md:flex-row">
        <span>© {new Date().getFullYear()} {profile.name}. Crafted with React, Tailwind & Framer Motion.</span>
        <a href="#top" className="transition-colors hover:text-white">Back to top ↑</a>
      </footer>
    </section>
  )
}
