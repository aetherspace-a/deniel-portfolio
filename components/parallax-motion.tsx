'use client'

import { motion, useReducedMotion, useScroll, useSpring, useTransform, useVelocity } from 'framer-motion'
import { useRef, type ReactNode } from 'react'

const speeds = { slow: 0.12, normal: 0.28, fast: 0.48 } as const

export function Parallax({ children, speed = 'normal', className = '' }: { children: ReactNode; speed?: keyof typeof speeds; className?: string }) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const offset = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [speeds[speed] * 72, speeds[speed] * -72])
  const y = useSpring(offset, { stiffness: 80, damping: 24, mass: 0.7 })
  return <motion.div ref={ref} className={`parallax-shell ${className}`} style={{ y }}>{children}</motion.div>
}

export function VelocityHeading({ children, className = '' }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion()
  const { scrollY } = useScroll()
  const velocity = useVelocity(scrollY)
  const skew = useTransform(velocity, [-1800, 1800], [1.5, -1.5], { clamp: true })
  const springSkew = useSpring(skew, { stiffness: 110, damping: 24, mass: 0.7 })
  return <motion.div className={className} style={{ skewY: reduced ? 0 : springSkew }}>{children}</motion.div>
}

export function MotionIn({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  const reduced = useReducedMotion()
  return <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 30 }} whileInView={reduced ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, margin: '-14% 0px' }} transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}>{children}</motion.div>
}
