'use client'

import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const node = ref.current
    if (!node) return
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return
    const context = gsap.context(() => {
      gsap.fromTo(node, { autoAlpha: 0, y: 22 }, { autoAlpha: 1, y: 0, duration: 0.85, delay: delay / 1000, ease: 'power3.out', scrollTrigger: { trigger: node, start: 'top 88%', once: true } })
    }, node)
    return () => context.revert()
  }, [delay])

  return <div ref={ref}>{children}</div>
}
