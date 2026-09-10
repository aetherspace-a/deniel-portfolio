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
