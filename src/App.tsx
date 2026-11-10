import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useCallback, useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import AIProjects from './components/AIProjects'
import Projects from './components/Projects'
import Contact, { Education } from './components/Contact'
import CommandPalette, { useCommandPalette } from './components/CommandPalette'
import { CustomCursor, Preloader } from './components/creative'

function CursorGlow() {
  const x = useMotionValue(-500)
  const y = useMotionValue(-500)
  const sx = useSpring(x, { stiffness: 150, damping: 25 })
  const sy = useSpring(y, { stiffness: 150, damping: 25 })
  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX - 250)
      y.set(e.clientY - 250)
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [x, y])
  return (
    <motion.div
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed left-0 top-0 z-0 hidden h-[500px] w-[500px] rounded-full bg-violet-600/10 blur-[100px] md:block"
    />
  )
}

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const onLoaded = useCallback(() => setLoaded(true), [])
  const [paletteOpen, setPaletteOpen] = useCommandPalette()

  return (
    <div className="noise relative">
      <Preloader onDone={onLoaded} />
      <CustomCursor />
      <CursorGlow />
      <CommandPalette open={paletteOpen} setOpen={setPaletteOpen} />
      {loaded && (
        <>
          <Navbar onOpenPalette={() => setPaletteOpen(true)} />
          <main className="relative z-10">
            <Hero />
            <About />
            <Skills />
            <Experience />
            <AIProjects />
            <Projects />
            <Education />
            <Contact />
          </main>
        </>
      )}
    </div>
  )
}
