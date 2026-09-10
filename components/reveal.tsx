'use client'

import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function Reveal({ children, delay = 0, label = 'content / Statement' }: { children: React.ReactNode; delay?: number; label?: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const node = ref.current
    if (!node) return
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return
    const context = gsap.context(() => {
      gsap.fromTo(node, { autoAlpha: 0, y: 22 }, {
        autoAlpha: 1,
        y: 0,
        duration: 1.8,
        delay: delay / 1000,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: node,
          start: 'top 88%',
          once: true,
          onEnter: () => node.classList.add('reveal-active'),
        },
        onComplete: () => node.classList.add('reveal-complete'),
      })
    }, node)
    return () => context.revert()
  }, [delay])

  return <div ref={ref} className="reveal-block" data-reveal-label={label}>{children}<span className="reveal-tool-label" aria-hidden="true">{label}</span><span className="reveal-status" aria-hidden="true">content → editing...</span></div>
}
