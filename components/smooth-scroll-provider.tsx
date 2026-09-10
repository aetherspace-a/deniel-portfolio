'use client'

import { useEffect, type ReactNode } from 'react'
import Lenis from 'lenis'

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const compact = window.matchMedia('(max-width: 640px)').matches
    if (reduce || compact) return
    const lenis = new Lenis({ duration: 0.85, easing: (t) => 1 - (1 - t) ** 4, smoothWheel: true, syncTouch: false })
    let frame = 0
    const raf = (time: number) => { lenis.raf(time); frame = requestAnimationFrame(raf) }
    frame = requestAnimationFrame(raf)
    return () => { cancelAnimationFrame(frame); lenis.destroy() }
  }, [])
  return children
}
