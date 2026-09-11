'use client'

import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

function PointerIcon({ color }: { color: string }) {
  return <svg className="cursor-pointer-icon" viewBox="0 0 24 32" aria-hidden="true" style={{ color }}><path d="M4.3 2.5c-.8-.7-2-.1-1.8 1l3.4 20.9c.2 1.1 1.6 1.4 2.2.5l3.3-5.1 5.6 6.7c.7.8 1.9.9 2.7.2l1.2-1.1c.8-.7.9-1.9.2-2.7l-5.8-6.7 6-1.5c1-.3 1.1-1.7.2-2.2L4.3 2.5Z" fill="currentColor" stroke="var(--background)" strokeLinejoin="round" strokeWidth="1.6" /></svg>
}

export function SiteEffects() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const touch = window.innerWidth <= 700
    const introTimer = window.setTimeout(() => setLoading(false), reduce ? 250 : 1500)
    const cleanups: (() => void)[] = []
    let lenis: Lenis | null = null
    let raf = 0

    if (!reduce) {
      lenis = new Lenis({ duration: 1.05, lerp: 0.085, smoothWheel: true, syncTouch: false })
      const rafLoop = (time: number) => {
        lenis?.raf(time)
        ScrollTrigger.update()
        raf = requestAnimationFrame(rafLoop)
      }
      raf = requestAnimationFrame(rafLoop)
      lenis.on('scroll', ScrollTrigger.update)
    }

    if (!reduce) {
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => {
        gsap.fromTo(element, { autoAlpha: 0, y: 42 }, { autoAlpha: 1, y: 0, duration: .9, ease: 'power3.out', scrollTrigger: { trigger: element, start: 'top 86%', once: true } })
      })
      gsap.utils.toArray<HTMLElement>('[data-stagger]').forEach((group) => {
        gsap.fromTo(Array.from(group.children), { autoAlpha: 0, y: 28 }, { autoAlpha: 1, y: 0, duration: .75, stagger: .1, ease: 'power3.out', scrollTrigger: { trigger: group, start: 'top 82%', once: true } })
      })

      const hero = document.querySelector<HTMLElement>('.hero')
      const heroTitle = document.querySelector<HTMLElement>('.hero-title .letter-word')
      const heroIntro = document.querySelector<HTMLElement>('.hero-intro')
      if (hero && heroTitle) gsap.to(heroTitle, { yPercent: -18, rotate: -1.2, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 1.4 } })
      if (hero && heroIntro) gsap.to(heroIntro, { y: 90, autoAlpha: .18, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 1.2 } })

      document.querySelectorAll<HTMLElement>('.section-label').forEach((label) => {
        gsap.fromTo(label, { x: -18 }, { x: 0, ease: 'none', scrollTrigger: { trigger: label, start: 'top 88%', end: 'top 45%', scrub: .7 } })
      })

      if (!touch) {
        document.querySelectorAll<HTMLElement>('.circle-link, .play-button, .nav-links a, .project-card, .tool-pill').forEach((element) => {
          const onMove = (event: PointerEvent) => {
            const rect = element.getBoundingClientRect()
            const strength = element.classList.contains('project-card') ? 5 : 9
            gsap.to(element, { x: ((event.clientX - rect.left) / rect.width - .5) * strength, y: ((event.clientY - rect.top) / rect.height - .5) * strength, duration: .35, ease: 'power2.out', overwrite: true })
          }
          const onLeave = () => gsap.to(element, { x: 0, y: 0, duration: .65, ease: 'elastic.out(1, .4)', overwrite: true })
          element.addEventListener('pointermove', onMove)
          element.addEventListener('pointerleave', onLeave)
          cleanups.push(() => { element.removeEventListener('pointermove', onMove); element.removeEventListener('pointerleave', onLeave) })
        })
      }
    }

    const userCursor = document.querySelector<HTMLElement>('[data-user-cursor]')
    if (!touch && userCursor) {
      const moveUser = (event: PointerEvent) => gsap.to(userCursor, { left: event.clientX, top: event.clientY, duration: .42, ease: 'power3.out', overwrite: true })
      window.addEventListener('pointermove', moveUser)
      cleanups.push(() => window.removeEventListener('pointermove', moveUser))
    }

    ScrollTrigger.refresh()
    return () => {
      window.clearTimeout(introTimer)
      cancelAnimationFrame(raf)
      lenis?.destroy()
      cleanups.forEach((cleanup) => cleanup())
    }
  }, [])

  return <><div className={`site-loader ${loading ? 'is-visible' : 'is-hidden'}`} aria-hidden={!loading}><div className="loader-mark"><img src="/deniel-logo.svg" alt="Deniel John Prado" /></div><div className="loader-line"><i /></div><p>Making useful things</p></div><div className="site-cursor user-cursor" data-user-cursor aria-hidden="true"><PointerIcon color="var(--teal)" /><span className="cursor-name-tag">You</span></div></>
}
