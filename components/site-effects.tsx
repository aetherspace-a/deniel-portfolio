'use client'

import { useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function SiteEffects() {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const introTimer = window.setTimeout(() => setLoading(false), reduce ? 250 : 1500)
    if (reduce) return () => window.clearTimeout(introTimer)
    const cursor = document.querySelector<HTMLElement>('[data-cursor]')
    const cursorDot = document.querySelector<HTMLElement>('[data-cursor-dot]')
    const moveCursor = (event: MouseEvent) => {
      if (!cursor || !cursorDot) return
      gsap.to(cursor, { x: event.clientX, y: event.clientY, duration: .55, ease: 'power3.out', overwrite: true })
      gsap.to(cursorDot, { x: event.clientX, y: event.clientY, duration: .12, ease: 'power2.out', overwrite: true })
    }
    window.addEventListener('pointermove', moveCursor)
    const refresh = () => ScrollTrigger.refresh()
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => {
        gsap.fromTo(element, { autoAlpha: 0, y: 36 }, { autoAlpha: 1, y: 0, duration: .85, ease: 'power3.out', scrollTrigger: { trigger: element, start: 'top 86%', once: true } })
      })
      gsap.utils.toArray<HTMLElement>('[data-stagger]').forEach((group) => {
        gsap.fromTo(group.children, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: .7, stagger: .08, ease: 'power3.out', scrollTrigger: { trigger: group, start: 'top 84%', once: true } })
      })
    })
    window.addEventListener('load', refresh)
    return () => { window.clearTimeout(introTimer); window.removeEventListener('pointermove', moveCursor); window.removeEventListener('load', refresh); ctx.revert() }
  }, [])
  return <><div className={`site-loader ${loading ? 'is-visible' : 'is-hidden'}`} aria-hidden={!loading}><div className="loader-mark">D<span>.</span></div><div className="loader-line"><i /></div><p>Making useful things</p></div><div className="site-cursor" data-cursor aria-hidden="true"><span data-cursor-dot /></div></>
}
