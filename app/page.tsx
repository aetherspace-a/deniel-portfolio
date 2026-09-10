'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Mail } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { CursorEffects } from '@/components/cursor-effects'
import { LightTracing } from '@/components/light-tracing'
import { DeskCanvas } from '@/components/desk-canvas'
import { AudioReactive } from '@/components/audio-reactive'
import { CommandPalette } from '@/components/command-palette'
import { WorkAssistant } from '@/components/work-assistant'
import { PremiumReveal } from '@/components/premium-motion'
import { MotionIn, Parallax, VelocityHeading } from '@/components/parallax-motion'
import { MarqueeBand, OrbitPath, PlayfulFloat, PlayfulReveal, SpiralScroll } from '@/components/playful-motion'
import { WholeSiteMotion } from '@/components/whole-site-motion'

const tools = [
  { name: 'HTML', icon: 'html5' },
  { name: 'JavaScript', icon: 'javascript' },
  { name: 'Python', icon: 'python' },
  { name: 'Discord bots', icon: 'discord' },
  { name: 'GitHub', icon: 'github' },
  { name: 'Vercel', icon: 'vercel' },
]

const projects = [
  { title: 'Asiana-PTFS-Website', description: 'The official Asiana Airlines PTFS site.', tag: 'Web / Community', href: 'https://github.com/aetherspace-a/Asiana-PTFS-Website' },
  { title: 'AsianaPTFS-VAMS', description: 'A Discord bot and dashboard for virtual airline operations.', tag: 'Systems / Bot', href: 'https://github.com/aetherspace-a/AsianaPTFS-VAMS' },
  { title: 'mytimeisaether', description: 'A personal in-bio site for the work between projects.', tag: 'Identity / Web', href: 'https://github.com/aetherspace-a/mytimeisaether' },
]

const musicLinks = [
  { name: 'Spotify', detail: 'Listen on Spotify', icon: 'spotify', href: 'https://open.spotify.com/artist/0hShtOro50E68407ZrT06D' },
  { name: 'Apple Music', detail: 'Listen on Apple Music', icon: 'applemusic', href: 'https://music.apple.com/ph/artist/zeopspace/1894512614' },
  { name: 'YouTube', detail: 'Watch on YouTube', icon: 'youtube', href: 'https://youtube.com/@zeopspacemusic' },
]

function Meta({ children }: { children: React.ReactNode }) {
  return <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">{children}</span>
}

function LetterReveal({ children, className = '' }: { children: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        node.classList.add('letter-reveal-active')
        observer.disconnect()
      }
    }, { threshold: 0.2 })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return <span ref={ref} className={`letter-reveal ${className}`}>{[...children].map((character, index) => <span key={`${character}-${index}`} style={{ '--letter-index': index } as React.CSSProperties}>{character === ' ' ? '\u00a0' : character}</span>)}</span>
}

function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(1)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setProgress((current) => {
        if (current >= 100) {
          window.clearInterval(timer)
          window.setTimeout(onComplete, 220)
          return 100
        }
        return Math.min(current + 4, 100)
      })
    }, 28)
    return () => window.clearInterval(timer)
  }, [onComplete])

  return <div className="loading-screen" role="status" aria-live="polite"><div className="loading-state"><div className="loading-mark">DJP<span>/</span></div><p className="loading-label">Loading portfolio</p><div className="loading-progress"><span style={{ width: `${progress}%` }} /></div><div className="loading-meta"><Meta>Loading portfolio</Meta><Meta>{progress}%</Meta></div></div></div>
}

function CookieBanner({ onDismiss }: { onDismiss: () => void }) {
  return <aside className="cookie-banner" aria-label="Cookie notice"><div><Meta>Privacy</Meta><p>Small cookies help this site remember your preferences. No tracking cookies are used.</p></div><button type="button" onClick={onDismiss}>Okay</button></aside>
}

function ScrollProgress() {
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updateProgress = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0
      progressRef.current?.style.setProperty('--scroll-progress', `${progress * 100}%`)
    }
    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress)
    return () => {
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
    }
  }, [])

  return <div ref={progressRef} className="scroll-progress" aria-hidden="true" />
}

function WordRevealTitle() {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const words = ["Let's", 'make', 'something', 'useful.']

  useEffect(() => {
    const title = titleRef.current
    if (!title) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        title.classList.add('word-reveal-active')
        observer.disconnect()
      }
    }, { threshold: 0.35 })
    observer.observe(title)
    return () => observer.disconnect()
  }, [])

  return <h2 ref={titleRef} className="contact-title word-reveal-title" aria-label="Let's make something useful.">{words.map((word, index) => <span key={word} className={index === 2 ? 'word-reveal-word word-reveal-italic' : 'word-reveal-word'} style={{ '--word-index': index } as React.CSSProperties}>{word}</span>)}</h2>
}

export default function Page() {
  const [isLoading, setIsLoading] = useState(true)
  const [showCookies, setShowCookies] = useState(true)
  const [assistantOpen, setAssistantOpen] = useState(false)

  return (
    <>
      <AudioReactive />
      <CommandPalette onAssistant={() => setAssistantOpen(true)} />
      <WorkAssistant open={assistantOpen} onClose={() => setAssistantOpen(false)} />
      <LightTracing />
      <CursorEffects />
      <ScrollProgress />
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      {showCookies && !isLoading && <CookieBanner onDismiss={() => setShowCookies(false)} />}
      <WholeSiteMotion><main id="top" className="portfolio-shell crency-mode overflow-hidden">
      <header className="site-header mx-auto flex max-w-[1440px] items-center justify-between px-5 py-5 sm:px-8 sm:py-6 lg:px-12">
        <a href="#top" aria-label="Deniel John Prado home" data-magnetic className="logo">DJP<span>/</span></a>
        <nav aria-label="Primary navigation" className="flex items-center gap-6 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground sm:gap-8">
          <a href="#work" data-magnetic className="transition-colors hover:text-foreground">Work</a>
          <a href="#music" data-magnetic className="transition-colors hover:text-foreground">Music</a>
          <a href="#contact" data-magnetic className="transition-colors hover:text-foreground">Contact</a>
        </nav>
      </header>

      <section className="hero mx-auto max-w-[1440px] px-5 pb-20 pt-14 sm:px-8 sm:pb-28 sm:pt-20 lg:px-12 lg:pb-40 lg:pt-28">
        <Reveal><div className="hero-meta flex items-center justify-between border-y border-border py-3"><Meta>Available for useful work</Meta><Meta>Philippines — 2026</Meta></div></Reveal>
        <div className="hero-copy">
          <Reveal delay={100}><VelocityHeading><h1 className="hero-title"><Parallax speed="slow"><LetterReveal className="block" >Deniel John</LetterReveal></Parallax> <Parallax speed="fast"><LetterReveal className="hero-prado" >Prado</LetterReveal></Parallax></h1></VelocityHeading></Reveal>
          <Reveal delay={180}><PlayfulFloat delay={0.4}><PremiumReveal delay={0.16}><p className="hero-subhead"><LetterReveal>A generalist working across community, documentation, design, and code.</LetterReveal></p></PremiumReveal></PlayfulFloat></Reveal>
        </div>
        <Reveal delay={240}><div className="hero-bridge"><Meta><span className="lime-sticker">01 / A way of working</span></Meta><p><LetterReveal>I help people find their way through complex work — coordinating communities, shaping documentation, and building useful software.</LetterReveal></p></div></Reveal>
      </section>

      <section id="about" className="content-section section-break mx-auto max-w-[1440px] border-t border-border px-5 py-24 sm:px-8 sm:py-32 lg:grid lg:grid-cols-[1fr_2fr] lg:gap-10 lg:px-12 lg:py-44"><SpiralScroll className="about-spiral-mark" direction={-1} intensity={1.2}><OrbitPath><span className="spiral-badge">KEEP<br />GOING</span></OrbitPath></SpiralScroll>
        <Reveal><Meta>02 — About</Meta></Reveal>
        <MotionIn delay={0.08}><div className="section-content mt-12 lg:mt-0"><VelocityHeading><p className="section-statement"><LetterReveal>A jack of all trades, with a soft spot for the seams between them.</LetterReveal></p></VelocityHeading><Parallax speed="slow"><p className="section-body mt-10 max-w-xl"><LetterReveal>My work moves between community leadership, design, technical writing, and code. I am interested in the connective tissue: the language, systems, and small decisions that help good ideas become useful in the real world.</LetterReveal></p></Parallax></div></MotionIn>
      </section>

      <section id="stack" className="content-section stack-section mx-auto max-w-[1440px] border-t border-border px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36"><MarqueeBand><span>MAKE IT USEFUL / MAKE IT WEIRD / MAKE IT MOVE / </span><span>MAKE IT USEFUL / MAKE IT WEIRD / MAKE IT MOVE / </span></MarqueeBand>
        <div className="section-heading mb-12 flex items-end justify-between gap-8"><Reveal><Meta>03 — Tools &amp; stack</Meta></Reveal><Reveal delay={60}><Meta>A working vocabulary</Meta></Reveal></div>
        <MotionIn><div className="stack-intro"><VelocityHeading><p className="stack-statement"><LetterReveal>The tools stay quiet. The work does the talking.</LetterReveal></p></VelocityHeading><Parallax speed="slow"><p className="stack-note"><LetterReveal>A practical stack for building clear paths through complicated things.</LetterReveal></p></Parallax></div></MotionIn>
        <div className="stack-list border-y border-border">
          {tools.map((tool, index) => <Reveal key={tool.name} delay={index * 45}><div className="stack-item group"><span className="stack-index">0{index + 1}</span><span className={`brand-icon brand-icon-${tool.icon}`} aria-hidden="true"><span>{tool.name.slice(0, 1)}</span></span><span className="stack-name">{tool.name}</span><span className="stack-role">{index < 3 ? 'language' : index === 3 ? 'community' : 'platform'}</span></div></Reveal>)}
        </div>
      </section>

      <section id="desk" className="desk-section content-section mx-auto max-w-[1440px] border-t border-border px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36"><div className="desk-heading mb-12 flex items-end justify-between gap-8"><Reveal><Meta>04 — Desk study</Meta></Reveal><Reveal delay={60}><Meta>A tactile index</Meta></Reveal></div><MotionIn><div className="desk-intro"><VelocityHeading><p className="desk-statement"><LetterReveal>Pick up a thread. See where it leads.</LetterReveal></p></VelocityHeading><Parallax speed="slow"><p className="desk-note"><LetterReveal>Three objects from the desk, each pointing to a different part of the work.</LetterReveal></p></Parallax></div></MotionIn><Parallax speed="normal"><DeskCanvas /></Parallax></section>

      <section id="work" className="mx-auto max-w-[1440px] border-t border-border px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36">
        <div className="mb-12 flex items-end justify-between gap-8"><Reveal><Meta>05 — Selected work</Meta></Reveal><Reveal delay={60}><Meta>Built in public</Meta></Reveal></div>
        <div className="project-grid">{projects.map((project, index) => <PlayfulReveal key={project.title} delay={index * 0.08}><article className="project-card group" style={{ '--card-index': index } as React.CSSProperties}><div className="project-preview" aria-hidden="true"><span>{String(index + 1).padStart(2, '0')}</span><i /><OrbitPath delay={index * .7}><b className="orbit-dot" /></OrbitPath></div><div className="project-card-body"><Meta>{project.tag}</Meta><h2 className="text-[1.7rem] font-medium leading-[0.95] tracking-[-0.055em] transition-colors group-hover:text-muted-foreground sm:text-4xl"><LetterReveal>{project.title}</LetterReveal></h2><p className="max-w-md text-[0.95rem] leading-6 text-muted-foreground"><LetterReveal>{project.description}</LetterReveal></p><div className="project-actions"><a href={project.href} target="_blank" rel="noreferrer" data-cursor-label="View code" className="inline-flex items-center gap-2">View code <ArrowUpRight className="h-4 w-4" /></a><a href={project.href} target="_blank" rel="noreferrer" data-cursor-label="Open project" aria-label={`Open ${project.title}`} className="project-arrow"><ArrowUpRight className="h-5 w-5" /></a></div></div></article></PlayfulReveal>)}</div>
      </section>

      <section id="music" className="music-section content-section mx-auto max-w-[1440px] border-t border-border px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36"><div className="mb-12 flex items-end justify-between gap-8"><Reveal><Meta>06 — Music</Meta></Reveal><Reveal delay={60}><Meta>lofi / zeopspace</Meta></Reveal></div><Reveal><div className="music-intro"><p className="music-statement"><LetterReveal>A quieter place to land.</LetterReveal></p><p className="music-note"><LetterReveal>I make lofi music as zeopspace — soft loops for late nights, long flights, and slow work.</LetterReveal></p></div></Reveal><div className="music-links">{musicLinks.map((link, index) => <Reveal key={link.name} delay={index * 70}><a href={link.href} target="_blank" rel="noreferrer" data-cursor-label="Listen" className="music-link group"><span className={`music-icon brand-icon-${link.icon}`} aria-hidden="true"><span>{link.name.slice(0, 1)}</span></span><span><strong>{link.name}</strong><small>{link.detail}</small></span><ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></a></Reveal>)}</div></section>

      <section id="contact" className="mx-auto max-w-[1440px] border-t border-border px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36"><Reveal><Meta>07 — Contact</Meta></Reveal><div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-[1fr_2fr] lg:items-end"><Reveal delay={100}><WordRevealTitle /></Reveal><PlayfulReveal delay={0.12}><div className="lg:justify-self-end"><p className="mb-8 max-w-sm text-[1rem] leading-7 text-muted-foreground">Have a question, a half-formed idea, or a problem that needs a few different kinds of thinking?</p><a href="mailto:hello@deniel.lol" data-cursor-label="Say hello" className="group inline-flex items-center gap-3 border-b border-foreground pb-3 text-sm transition-colors hover:text-muted-foreground">hello@deniel.lol <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></a></div></PlayfulReveal></div></section>

      <footer className="mx-auto flex max-w-[1440px] flex-col gap-5 border-t border-border px-5 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12"><Meta>© 2026 Deniel John Prado</Meta><div className="flex gap-5 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground"><a href="mailto:hello@deniel.lol" className="inline-flex items-center gap-2 hover:text-foreground"><Mail className="h-3.5 w-3.5" /> Email</a><a href="https://github.com/aetherspace-a" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-foreground"><span className="footer-brand-icon" aria-hidden="true">G</span> GitHub</a><a href="https://linkedin.com" className="hover:text-foreground">LinkedIn</a></div><Meta>Built with intention</Meta></footer>
    </main></WholeSiteMotion>
    </>
  )
}
