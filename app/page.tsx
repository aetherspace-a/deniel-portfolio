'use client'

import { useEffect, useState } from 'react'
import { ArrowUpRight, Mail } from 'lucide-react'
import { Reveal } from '@/components/reveal'

const tools = [
  { name: 'HTML', icon: 'html5' },
  { name: 'JavaScript', icon: 'javascript' },
  { name: 'Python', icon: 'python' },
  { name: 'Discord bots', icon: 'discord' },
  { name: 'GitHub', icon: 'github' },
  { name: 'Vercel', icon: 'vercel' },
]

const projects = [
  { title: 'Asiana-PTFS-Website', description: 'The official Asiana Airlines PTFS site.', href: 'https://github.com/aetherspace-a/Asiana-PTFS-Website' },
  { title: 'AsianaPTFS-VAMS', description: 'A Discord bot and dashboard for virtual airline operations.', href: 'https://github.com/aetherspace-a/AsianaPTFS-VAMS' },
  { title: 'mytimeisaether', description: 'A personal in-bio site for the work between projects.', href: 'https://github.com/aetherspace-a/mytimeisaether' },
]

const musicLinks = [
  { name: 'Spotify', detail: 'Listen on Spotify', icon: 'spotify', href: 'https://open.spotify.com/artist/0hShtOro50E68407ZrT06D' },
  { name: 'Apple Music', detail: 'Listen on Apple Music', icon: 'applemusic', href: 'https://music.apple.com/ph/artist/zeopspace/1894512614' },
  { name: 'YouTube', detail: 'Watch on YouTube', icon: 'youtube', href: 'https://youtube.com/@zeopspacemusic' },
]

function Meta({ children }: { children: React.ReactNode }) {
  return <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">{children}</span>
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

  return <div className="loading-screen" role="status" aria-live="polite"><div className="loading-mark">DJP<span>/</span></div><div className="loading-progress"><span style={{ width: `${progress}%` }} /></div><div className="loading-meta"><Meta>Loading portfolio</Meta><Meta>{progress}%</Meta></div></div>
}

function CookieBanner({ onDismiss }: { onDismiss: () => void }) {
  return <aside className="cookie-banner" aria-label="Cookie notice"><div><Meta>Privacy</Meta><p>Small cookies help this site remember your preferences. No tracking cookies are used.</p></div><button type="button" onClick={onDismiss}>Okay</button></aside>
}

export default function Page() {
  const [isLoading, setIsLoading] = useState(true)
  const [showCookies, setShowCookies] = useState(true)

  return (
    <>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      {showCookies && !isLoading && <CookieBanner onDismiss={() => setShowCookies(false)} />}
      <main id="top" className="overflow-hidden">
      <header className="site-header mx-auto flex max-w-[1440px] items-center justify-between px-5 py-5 sm:px-8 sm:py-6 lg:px-12">
        <a href="#top" aria-label="Deniel John Prado home" className="logo">DJP<span>/</span></a>
        <nav aria-label="Primary navigation" className="flex items-center gap-6 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground sm:gap-8">
          <a href="#work" className="transition-colors hover:text-foreground">Work</a>
          <a href="#music" className="transition-colors hover:text-foreground">Music</a>
          <a href="#contact" className="transition-colors hover:text-foreground">Contact</a>
        </nav>
      </header>

      <section className="hero mx-auto max-w-[1440px] px-5 pb-20 pt-14 sm:px-8 sm:pb-28 sm:pt-20 lg:px-12 lg:pb-40 lg:pt-28">
        <Reveal><div className="hero-meta flex items-center justify-end border-y border-border py-3"><Meta>Philippines — 2026</Meta></div></Reveal>
        <div className="hero-copy">
          <Reveal delay={100}><h1 className="hero-title"><span>Deniel John</span> <em>Prado</em></h1></Reveal>
          <Reveal delay={180}><p className="hero-subhead">A generalist working across community, documentation, design, and code.</p></Reveal>
        </div>
        <Reveal delay={240}><div className="hero-bridge"><Meta>01 / A way of working</Meta><p>I help people find their way through complex work — coordinating communities, shaping documentation, and building useful software.</p></div></Reveal>
      </section>

      <section id="about" className="content-section section-break mx-auto max-w-[1440px] border-t border-border px-5 py-24 sm:px-8 sm:py-32 lg:grid lg:grid-cols-[1fr_2fr] lg:gap-10 lg:px-12 lg:py-44">
        <Reveal><Meta>02 — About</Meta></Reveal>
        <Reveal delay={100}><div className="section-content mt-12 lg:mt-0"><p className="section-statement">A jack of all trades, with a soft spot for the seams between them.</p><p className="section-body mt-10 max-w-xl">My work moves between community leadership, design, technical writing, and code. I am interested in the connective tissue: the language, systems, and small decisions that help good ideas become useful in the real world.</p></div></Reveal>
      </section>

      <section id="stack" className="content-section stack-section mx-auto max-w-[1440px] border-t border-border px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36">
        <div className="section-heading mb-12 flex items-end justify-between gap-8"><Reveal><Meta>03 — Tools &amp; stack</Meta></Reveal><Reveal delay={60}><Meta>A working vocabulary</Meta></Reveal></div>
        <Reveal><div className="stack-intro"><p className="stack-statement">The tools stay quiet. The work does the talking.</p><p className="stack-note">A practical stack for building clear paths through complicated things.</p></div></Reveal>
        <div className="stack-list border-y border-border">
          {tools.map((tool, index) => <Reveal key={tool.name} delay={index * 45}><div className="stack-item group"><span className="stack-index">0{index + 1}</span><img src={`https://cdn.simpleicons.org/${tool.icon}/ffffff`} alt="" aria-hidden="true" className="h-5 w-5 object-contain opacity-75 transition-opacity group-hover:opacity-100" /><span className="stack-name">{tool.name}</span><span className="stack-role">{index < 3 ? 'language' : index === 3 ? 'community' : 'platform'}</span></div></Reveal>)}
        </div>
      </section>

      <section id="work" className="mx-auto max-w-[1440px] border-t border-border px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36">
        <div className="mb-12 flex items-end justify-between gap-8"><Reveal><Meta>04 — Selected work</Meta></Reveal><Reveal delay={60}><Meta>Built in public</Meta></Reveal></div>
        <div className="border-y border-border">{projects.map((project, index) => <Reveal key={project.title} delay={index * 70}><a href={project.href} target="_blank" rel="noreferrer" className="project-row group grid gap-5 border-b border-border py-8 last:border-0 sm:grid-cols-[1.2fr_1fr_2rem] sm:gap-8 sm:py-10 lg:grid-cols-[1.2fr_1fr_2rem] lg:gap-10"><div><h2 className="text-[1.7rem] font-medium leading-[0.95] tracking-[-0.055em] transition-colors group-hover:text-muted-foreground sm:text-4xl lg:text-5xl">{project.title}</h2></div><p className="max-w-md self-end text-[0.95rem] leading-6 text-muted-foreground">{project.description}</p><ArrowUpRight className="h-5 w-5 justify-self-end transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></a></Reveal>)}</div>
      </section>

      <section id="music" className="music-section content-section mx-auto max-w-[1440px] border-t border-border px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36"><div className="mb-12 flex items-end justify-between gap-8"><Reveal><Meta>05 — Music</Meta></Reveal><Reveal delay={60}><Meta>lofi / zeopspace</Meta></Reveal></div><Reveal><div className="music-intro"><p className="music-statement">A quieter place to land.</p><p className="music-note">I make lofi music as zeopspace — soft loops for late nights, long flights, and slow work.</p></div></Reveal><div className="music-links">{musicLinks.map((link, index) => <Reveal key={link.name} delay={index * 70}><a href={link.href} target="_blank" rel="noreferrer" className="music-link group"><span className="music-icon"><img src={`https://cdn.simpleicons.org/${link.icon}/ffffff`} alt="" aria-hidden="true" /></span><span><strong>{link.name}</strong><small>{link.detail}</small></span><ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></a></Reveal>)}</div></section>

      <section id="contact" className="mx-auto max-w-[1440px] border-t border-border px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36"><Reveal><Meta>06 — Contact</Meta></Reveal><div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-[1fr_2fr] lg:items-end"><Reveal delay={100}><h2 className="contact-title">Let&apos;s make<br /><em>something</em><br />useful.</h2></Reveal><Reveal delay={180}><div className="lg:justify-self-end"><p className="mb-8 max-w-sm text-[1rem] leading-7 text-muted-foreground">Have a question, a half-formed idea, or a problem that needs a few different kinds of thinking?</p><a href="mailto:hello@deniel.lol" className="group inline-flex items-center gap-3 border-b border-foreground pb-3 text-sm transition-colors hover:text-muted-foreground">hello@deniel.lol <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></a></div></Reveal></div></section>

      <footer className="mx-auto flex max-w-[1440px] flex-col gap-5 border-t border-border px-5 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12"><Meta>© 2026 Deniel John Prado</Meta><div className="flex gap-5 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground"><a href="mailto:hello@deniel.lol" className="inline-flex items-center gap-2 hover:text-foreground"><Mail className="h-3.5 w-3.5" /> Email</a><a href="https://github.com/aetherspace-a" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-foreground"><img src="https://cdn.simpleicons.org/github/ffffff" alt="" aria-hidden="true" className="h-3.5 w-3.5" /> GitHub</a><a href="https://linkedin.com" className="hover:text-foreground">LinkedIn</a></div><Meta>Built with intention</Meta></footer>
    </main>
    </>
  )
}
