'use client'

import { useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(MotionPathPlugin, ScrollTrigger)

type Interaction = { selector: string; mode: 'type' | 'highlight' | 'click' | 'resize'; text: string }

const interactions: Interaction[] = [
  { selector: '[data-cursor-target="hero"]', mode: 'type', text: 'useful things' },
  { selector: '[data-cursor-target="about"]', mode: 'highlight', text: 'human' },
  { selector: '[data-cursor-target="timeline"]', mode: 'click', text: '2023' },
  { selector: '[data-cursor-target="tools"]', mode: 'resize', text: 'toolkit' },
  { selector: '[data-cursor-target="work"]', mode: 'click', text: 'Community Atlas' },
  { selector: '[data-cursor-target="music"]', mode: 'click', text: 'play' },
  { selector: '[data-cursor-target="contact"]', mode: 'type', text: 'hello@deniel.lol' },
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

    const getTargetPoint = (element: Element) => {
      const rect = element.getBoundingClientRect()
      if (!rect.width || !rect.height) return null
      return { x: Math.max(18, Math.min(window.innerWidth - 24, rect.left + Math.min(rect.width * .55, 220))), y: Math.max(24, Math.min(window.innerHeight - 32, rect.top + Math.min(rect.height * .52, 80))) }
    }

    const runArrival = (target: Element, interaction: Interaction, point: { x: number; y: number }) => {
      if (!denielCursor || reduce || touch) return
      const index = interactions.indexOf(interaction)
      const direction = index % 2 === 0 ? 1 : -1
      const from = { x: Number(gsap.getProperty(denielCursor, 'left')) || point.x, y: Number(gsap.getProperty(denielCursor, 'top')) || point.y }
      const bend = 70 + (index % 4) * 24
      const lift = 44 + (index % 3) * 20
      gsap.killTweensOf(denielCursor)
      const timeline = gsap.timeline({ delay: .12 })
      timeline.set(denielCursor, { left: from.x, top: from.y, x: 0, y: 0 })
        .to(denielCursor, { motionPath: { path: [{ x: from.x, y: from.y }, { x: from.x + direction * bend, y: from.y - lift }, { x: point.x - direction * bend * .55, y: point.y + lift }, { x: point.x, y: point.y }], curviness: 1.25 }, duration: .85 + (index % 3) * .15, ease: 'power2.inOut' })
        .to(denielCursor, { left: point.x - direction * 5, top: point.y + 3, duration: .1, ease: 'power2.out' })
        .to(denielCursor, { left: point.x, top: point.y, scale: .82, duration: .12, ease: 'power2.in' })
        .to(denielCursor, { scale: 1, duration: .22, ease: 'back.out(2)' })

      if (interaction.mode === 'highlight') timeline.to(target, { backgroundColor: 'var(--coral)', color: 'var(--foreground)', paddingInline: '.35rem', duration: .2 }).to(target, { backgroundColor: 'transparent', color: '', paddingInline: 0, duration: .65, delay: .2 })
      if (interaction.mode === 'resize') timeline.to(denielCursor, { left: point.x + 54, duration: .4, ease: 'power2.inOut' }).to(target, { scaleX: 1.035, transformOrigin: 'left center', duration: .35 }).to(target, { scaleX: 1, duration: .45 })
      if (interaction.mode === 'type') timeline.to(target, { opacity: .35, duration: .16 }).to(target, { opacity: 1, duration: .16, repeat: 2, yoyo: true }).to(denielCursor, { left: point.x + Math.min(interaction.text.length * 3, 90), duration: .45 })
      if (interaction.mode === 'click') timeline.to(denielCursor, { scale: .72, duration: .1 }).to(denielCursor, { scale: 1, duration: .2, ease: 'back.out(2)' })
      timeline.to(denielCursor, { left: `+=${direction * 7}`, top: `+=${index % 2 ? -5 : 5}`, duration: .7, ease: 'sine.inOut' })
    }

    let activeIndex = -1
    let lastScrollY = window.scrollY
    let journeyStarted = false
    const updateTargets = () => {
      if (touch || reduce) return
      const scrollingDown = window.scrollY >= lastScrollY
      const hero = document.querySelector('[data-cursor-target="hero"]')
      const heroTop = hero ? hero.getBoundingClientRect().top + window.scrollY : 0
      const passedHeroResetPoint = window.scrollY < heroTop + window.innerHeight * .2
      if (passedHeroResetPoint && !scrollingDown) {
        activeIndex = -1
        journeyStarted = false
      }
      lastScrollY = window.scrollY
      const visibleIndex = interactions.findIndex((interaction) => {
        const element = document.querySelector(interaction.selector)
        if (!element) return false
        const rect = element.getBoundingClientRect()
        return rect.top < window.innerHeight * .72 && rect.bottom > window.innerHeight * .2
      })
      const nextIndex = journeyStarted ? interactions.findIndex((_, index) => index > activeIndex && index === visibleIndex) : visibleIndex
      if (nextIndex < 0 || nextIndex <= activeIndex) return
      const interaction = interactions[nextIndex]
      const target = document.querySelector(interaction.selector)
      const point = target ? getTargetPoint(target) : null
      if (!target || !point) return
      activeIndex = nextIndex
      journeyStarted = true
      runArrival(target, interaction, point)
    }

    const refreshPositions = () => { ScrollTrigger.refresh(); updateTargets() }
    window.addEventListener('pointermove', moveUser)
    window.addEventListener('scroll', updateTargets, { passive: true })
    window.addEventListener('resize', refreshPositions)
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => gsap.fromTo(element, { autoAlpha: 0, y: 36 }, { autoAlpha: 1, y: 0, duration: .85, ease: 'power3.out', scrollTrigger: { trigger: element, start: 'top 86%', once: true } }))
      gsap.utils.toArray<HTMLElement>('[data-stagger]').forEach((group) => gsap.fromTo(group.children, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: .7, stagger: .08, ease: 'power3.out', scrollTrigger: { trigger: group, start: 'top 84%', once: true } }))
      updateTargets()
    })
    window.addEventListener('load', refreshPositions)
    return () => { window.clearTimeout(introTimer); window.removeEventListener('pointermove', moveUser); window.removeEventListener('scroll', updateTargets); window.removeEventListener('resize', refreshPositions); window.removeEventListener('load', refreshPositions); gsap.killTweensOf(denielCursor); ctx.revert() }
  }, [])

  return <><div className={`site-loader ${loading ? 'is-visible' : 'is-hidden'}`} aria-hidden={!loading}><div className="loader-mark">D<span>.</span></div><div className="loader-line"><i /></div><p>Making useful things</p></div><div className="site-cursor user-cursor" data-user-cursor aria-hidden="true"><PointerIcon color="var(--teal)" /><span className="cursor-name-tag">You</span></div><div className="deniel-cursor" data-deniel-cursor aria-hidden="true"><PointerIcon color="var(--coral)" /><span className="cursor-name-tag">Deniel</span></div></>
}
