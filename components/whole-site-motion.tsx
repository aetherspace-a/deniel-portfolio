'use client'

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import type { ReactNode } from 'react'

export function WholeSiteMotion({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const rotation = useSpring(useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [-1.8, 1.8]), { stiffness: 55, damping: 22 })
  const scale = useSpring(useTransform(scrollYProgress, [0, 0.5, 1], reduced ? [1, 1, 1] : [1, .985, 1]), { stiffness: 55, damping: 22 })
  return <motion.div className="whole-site-motion" style={{ rotate: rotation, scale }}>{children}</motion.div>
}
