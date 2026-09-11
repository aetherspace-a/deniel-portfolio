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

function PointerIcon({ color }: { color: string }) {
  return <svg className="cursor-pointer-icon" viewBox="0 0 24 32" aria-hidden="true" style={{ color }}><path d="M4.3 2.5c-.8-.7-2-.1-1.8 1l3.4 20.9c.2 1.1 1.6 1.4 2.2.5l3.3-5.1 5.6 6.7c.7.8 1.9.9 2.7.2l1.2-1.1c.8-.7.9-1.9.2-2.7l-5.8-6.7 6-1.5c1-.3 1.1-1.7.2-2.2L4.3 2.5Z" fill="currentColor" stroke="var(--background)" strokeLinejoin="round" strokeWidth="1.6" /></svg>
}

export function SiteEffects() {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const touch = window.innerWidth <= 700
    const introTimer = window.setTimeout(() => setLoading(false), reduce ? 250 : 1500)
    const userCursor = document.querySelector<HTMLElement>('[data-user-cursor]')
    const denielCursor = document.querySelector<HTMLElement>('[data-deniel-cursor]')
    const moveUser = (event: PointerEvent) => { if (!touch && !reduce && userCursor) gsap.to(userCursor, { x: event.clientX, y: event.clientY, duration: .18, ease: 'power2.out', overwrite: true }) }
    const moveDeniel = (target: Element, mode: string, text: string) => {
      if (!denielCursor || reduce || touch) return
      const rect = target.getBoundingClientRect()
      const x = rect.left + Math.min(rect.width * .55, 220)
      const y = rect.top + Math.min(rect.height * .52, 80)
      const tl = gsap.timeline({ delay: .1 })
      tl.to(denielCursor, { x, y, duration: .65, ease: 'power3.inOut' }).to(denielCursor, { scale: .82, duration: .12, ease: 'power2.in' }).to(denielCursor, { scale: 1, duration: .18, ease: 'back.out(2)' })
      if (mode === 'highlight') tl.to(target, { backgroundColor: 'var(--coral)', color: 'var(--foreground)', paddingInline: '.35rem', duration: .2 }).to(target, { backgroundColor: 'transparent', color: '', paddingInline: 0, duration: .65, delay: .2 })
      if (mode === 'resize') tl.to(denielCursor, { x: x + 54, duration: .4, ease: 'power2.inOut' }).to(target, { scaleX: 1.035, transformOrigin: 'left center', duration: .35 }).to(target, { scaleX: 1, duration: .45 })
      if (mode === 'type') tl.to(target, { opacity: .35, duration: .16 }).to(target, { opacity: 1, duration: .16, repeat: 2, yoyo: true }).to(denielCursor, { x: x + Math.min(text.length * 3, 90), duration: .45 })
    }
    window.addEventListener('pointermove', moveUser)
    const refresh = () => ScrollTrigger.refresh()
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => gsap.fromTo(element, { autoAlpha: 0, y: 36 }, { autoAlpha: 1, y: 0, duration: .85, ease: 'power3.out', scrollTrigger: { trigger: element, start: 'top 86%', once: true } }))
      gsap.utils.toArray<HTMLElement>('[data-stagger]').forEach((group) => gsap.fromTo(group.children, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: .7, stagger: .08, ease: 'power3.out', scrollTrigger: { trigger: group, start: 'top 84%', once: true } }))
      interactions.forEach(({ selector, mode, text }) => { const target = document.querySelector(selector); if (target) ScrollTrigger.create({ trigger: target, start: 'top 68%', once: true, onEnter: () => moveDeniel(target, mode, text) }) })
      if (!reduce && !touch && denielCursor) gsap.to(denielCursor, { x: window.innerWidth * .78, y: window.innerHeight * .62, duration: 1.8, ease: 'sine.inOut', repeat: -1, yoyo: true })
    })
    window.addEventListener('load', refresh)
    return () => { window.clearTimeout(introTimer); window.removeEventListener('pointermove', moveUser); window.removeEventListener('load', refresh); ctx.revert() }
  }, [])
  return <><div className={`site-loader ${loading ? 'is-visible' : 'is-hidden'}`} aria-hidden={!loading}><div className="loader-mark">D<span>.</span></div><div className="loader-line"><i /></div><p>Making useful things</p></div><div className="site-cursor user-cursor" data-user-cursor aria-hidden="true"><PointerIcon color="var(--teal)" /><span className="cursor-name-tag">You</span></div><div className="deniel-cursor" data-deniel-cursor aria-hidden="true"><PointerIcon color="var(--coral)" /><span className="cursor-name-tag">Deniel</span></div></>
}
