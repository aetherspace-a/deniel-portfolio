'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

export function PlayfulFloat({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduced = useReducedMotion()
  return <motion.div className={className} animate={reduced ? undefined : { y: [0, -8, 0], rotate: [0, 1.5, 0] }} transition={reduced ? undefined : { duration: 4.8, delay, repeat: Infinity, ease: 'easeInOut' }}>{children}</motion.div>
}

export function PlayfulReveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduced = useReducedMotion()
  return <motion.div className={className} initial={reduced ? undefined : { opacity: 0, y: 30, rotate: -2 }} whileInView={reduced ? undefined : { opacity: 1, y: 0, rotate: 0 }} viewport={{ once: true, amount: 0.25 }} transition={reduced ? undefined : { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>
}

export function SpiralScroll({ children, className = '', direction = 1, intensity = 1 }: { children: ReactNode; className?: string; direction?: 1 | -1; intensity?: number }) {
  const reduced = useReducedMotion()
  return <motion.div className={`spiral-scroll ${className}`} style={{ '--spiral-direction': direction, '--spiral-intensity': intensity } as React.CSSProperties} initial={reduced ? undefined : { opacity: 0, scale: .72, rotate: direction * -14, x: direction * 90, y: 70 }} whileInView={reduced ? undefined : { opacity: 1, scale: 1, rotate: 0, x: 0, y: 0 }} viewport={{ once: false, amount: .28 }} transition={reduced ? undefined : { type: 'spring', stiffness: 70, damping: 16, mass: .8 }}>{children}</motion.div>
}

export function OrbitPath({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduced = useReducedMotion()
  return <motion.div className={`orbit-path ${className}`} animate={reduced ? undefined : { x: [0, 32, 0, -32, 0], y: [0, -18, -34, -14, 0], rotate: [0, 8, 0, -8, 0] }} transition={reduced ? undefined : { duration: 7, delay, repeat: Infinity, ease: 'easeInOut' }}>{children}</motion.div>
}

export function MarqueeBand({ children, reverse = false }: { children: ReactNode; reverse?: boolean }) {
  const reduced = useReducedMotion()
  return <div className={`marquee-band ${reverse ? 'marquee-reverse' : ''}`}><motion.div animate={reduced ? undefined : { x: reverse ? ['-20%', '0%'] : ['0%', '-20%'] }} transition={reduced ? undefined : { duration: 18, repeat: Infinity, ease: 'linear' }}>{children}</motion.div></div>
}
