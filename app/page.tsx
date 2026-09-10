'use client'

import { ArrowUpRight, Mail } from 'lucide-react'
import { Reveal } from '@/components/reveal'

const projects = [
  { year: '2026', title: 'Community, in public', category: 'Community systems', description: 'A practical field guide for turning online communities into places people return to.', result: 'A living toolkit' },
  { year: '2025', title: 'Words that work', category: 'Technical documentation', description: 'Documentation systems that make complex products easier to understand, adopt, and maintain.', result: 'Clearer product stories' },
  { year: '2024', title: 'Small tools, real utility', category: 'Design + code', description: 'Small interfaces and experiments built around one sharp question and a useful answer.', result: 'Ongoing practice' },
]

function Meta({ children }: { children: React.ReactNode }) {
  return <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">{children}</span>
}

export default function Page() {
  return (
    <main id="top" className="overflow-hidden">
      <header className="site-header mx-auto flex max-w-[1440px] items-center justify-between px-5 py-5 sm:px-8 sm:py-6 lg:px-12">
        <a href="#top" aria-label="Deniel John Prado home" className="logo">DJP<span>/</span></a>
        <nav aria-label="Primary navigation" className="flex items-center gap-6 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground sm:gap-8">
          <a href="#work" className="transition-colors hover:text-foreground">Work</a>
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

      <section id="about" className="section-break mx-auto max-w-[1440px] border-t border-border px-5 py-24 sm:px-8 sm:py-32 lg:grid lg:grid-cols-[1fr_2fr] lg:gap-10 lg:px-12 lg:py-44">
        <Reveal><Meta>02 — About</Meta></Reveal>
        <Reveal delay={100}><div className="mt-12 lg:mt-0"><p className="section-statement">A jack of all trades, with a soft spot for the seams between them.</p><p className="mt-10 max-w-xl text-[1rem] leading-7 text-muted-foreground">My work moves between community leadership, design, technical writing, and code. I am interested in the connective tissue: the language, systems, and small decisions that help good ideas become useful in the real world.</p></div></Reveal>
      </section>

      <section id="work" className="mx-auto max-w-[1440px] border-t border-border px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36">
        <div className="mb-12 flex items-end justify-between gap-8"><Reveal><Meta>03 — Selected work</Meta></Reveal><Reveal delay={60}><Meta>Three directions, one practice</Meta></Reveal></div>
        <div className="border-y border-border">{projects.map((project, index) => <Reveal key={project.title} delay={index * 70}><article className="project-row grid gap-5 border-b border-border py-8 last:border-0 sm:grid-cols-[4rem_1.2fr_1fr] sm:gap-8 sm:py-10 lg:grid-cols-[5rem_1.2fr_1fr_8rem] lg:gap-10"><Meta>{project.year}</Meta><div><Meta>{project.category}</Meta><h2 className="mt-4 text-[2rem] font-medium leading-[0.95] tracking-[-0.055em] sm:text-4xl lg:text-5xl">{project.title}</h2></div><div><p className="max-w-md text-[0.95rem] leading-6 text-muted-foreground">{project.description}</p><Meta>{project.result}</Meta></div></article></Reveal>)}</div>
      </section>

      <section id="contact" className="mx-auto max-w-[1440px] border-t border-border px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36"><Reveal><Meta>04 — Contact</Meta></Reveal><div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-[1fr_2fr] lg:items-end"><Reveal delay={100}><h2 className="contact-title">Let&apos;s make<br /><em>something</em><br />useful.</h2></Reveal><Reveal delay={180}><div className="lg:justify-self-end"><p className="mb-8 max-w-sm text-[1rem] leading-7 text-muted-foreground">Have a question, a half-formed idea, or a problem that needs a few different kinds of thinking?</p><a href="mailto:hello@denieljohnprado.com" className="group inline-flex items-center gap-3 border-b border-foreground pb-3 text-sm transition-colors hover:text-muted-foreground">hello@denieljohnprado.com <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></a></div></Reveal></div></section>

      <footer className="mx-auto flex max-w-[1440px] flex-col gap-5 border-t border-border px-5 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12"><Meta>© 2026 Deniel John Prado</Meta><div className="flex gap-5 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground"><a href="mailto:hello@denieljohnprado.com" className="inline-flex items-center gap-2 hover:text-foreground"><Mail className="h-3.5 w-3.5" /> Email</a><a href="https://github.com" className="hover:text-foreground">GitHub</a><a href="https://linkedin.com" className="hover:text-foreground">LinkedIn</a></div><Meta>Built with intention</Meta></footer>
    </main>
  )
}
