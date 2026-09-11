'use client'

import { useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const interactions = [
  { selector: '[data-cursor-target="hero"]', mode: 'type', label: 'retyping', text: 'useful things' },
  { selector: '[data-cursor-target="about"]', mode: 'highlight', label: 'highlight', text: 'human' },
  { selector: '[data-cursor-target="timeline"]', mode: 'click', label: 'click', text: '2023' },
  { selector: '[data-cursor-target="tools"]', mode: 'resize', label: 'resize', text: 'toolkit' },
  { selector: '[data-cursor-target="work"]', mode: 'click', label: 'click', text: 'Community Atlas' },
  { selector: '[data-cursor-target="music"]', mode: 'click', label: 'play', text: 'play' },
  { selector: '[data-cursor-target="contact"]', mode: 'type', label: 'retyping', text: 'hello@deniel.lol' },
]

export function SiteEffects() {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const introTimer = window.setTimeout(() => setLoading(false), reduce ? 250 : 1500)
    if (reduce) return () => window.clearTimeout(introTimer)
    const cursor = document.querySelector<HTMLElement>('[data-cursor]')
    const cursorDot = document.querySelector<HTMLElement>('[data-cursor-dot]')
    const userCursor = document.querySelector<HTMLElement>('[data-user-cursor]')
    const moveCursor = (event: MouseEvent) => {
      if (!cursor || !cursorDot) return
      gsap.to(cursor, { x: event.clientX, y: event.clientY, duration: .55, ease: 'power3.out', overwrite: true })
      gsap.to(cursorDot, { x: event.clientX, y: event.clientY, duration: .12, ease: 'power2.out', overwrite: true })
    }
    const moveDeniel = (target: Element, mode: string, text: string) => {
      if (!userCursor) return
      const rect = target.getBoundingClientRect()
      const x = rect.left + Math.min(rect.width * .55, 220)
      const y = rect.top + Math.min(rect.height * .52, 80)
      const tl = gsap.timeline({ delay: .1 })
      tl.to(userCursor, { x, y, duration: .65, ease: 'power3.inOut' })
        .to(userCursor, { scale: .86, duration: .12, ease: 'power2.in' })
        .to(userCursor, { scale: 1, duration: .18, ease: 'back.out(2)' })
      if (mode === 'highlight') tl.to(target, { backgroundColor: 'var(--coral)', color: 'var(--foreground)', paddingInline: '.35rem', duration: .2 }).to(target, { backgroundColor: 'transparent', color: '', paddingInline: 0, duration: .65, delay: .2 })
      if (mode === 'resize') tl.to(userCursor, { x: x + 54, duration: .4, ease: 'power2.inOut' }).to(target, { scaleX: 1.035, transformOrigin: 'left center', duration: .35 }).to(target, { scaleX: 1, duration: .45 })
      if (mode === 'type') tl.to(target, { opacity: .35, duration: .16 }).to(target, { opacity: 1, duration: .16, repeat: 2, yoyo: true }).to(userCursor, { x: x + Math.min(text.length * 3, 90), duration: .45 })
    }
    window.addEventListener('pointermove', moveCursor)
    const refresh = () => ScrollTrigger.refresh()
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => gsap.fromTo(element, { autoAlpha: 0, y: 36 }, { autoAlpha: 1, y: 0, duration: .85, ease: 'power3.out', scrollTrigger: { trigger: element, start: 'top 86%', once: true } }))
      gsap.utils.toArray<HTMLElement>('[data-stagger]').forEach((group) => gsap.fromTo(group.children, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: .7, stagger: .08, ease: 'power3.out', scrollTrigger: { trigger: group, start: 'top 84%', once: true } }))
      interactions.forEach(({ selector, mode, text }) => { const target = document.querySelector(selector); if (!target) return; ScrollTrigger.create({ trigger: target, start: 'top 68%', once: true, onEnter: () => moveDeniel(target, mode, text) }) })
    })
    window.addEventListener('load', refresh)
    return () => { window.clearTimeout(introTimer); window.removeEventListener('pointermove', moveCursor); window.removeEventListener('load', refresh); ctx.revert() }
  }, [])
  return <><div className={`site-loader ${loading ? 'is-visible' : 'is-hidden'}`} aria-hidden={!loading}><div className="loader-mark">D<span>.</span></div><div className="loader-line"><i /></div><p>Making useful things</p></div><div className="site-cursor" data-cursor aria-hidden="true"><span data-cursor-dot /></div><div className="deniel-cursor" data-user-cursor aria-hidden="true"><span className="deniel-cursor-arrow" /><span className="deniel-cursor-label">Deniel</span></div></>
}
