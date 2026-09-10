'use client'

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import type { ReactNode } from 'react'

export function WholeSiteMotion({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const rotation = useSpring(useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [-0.8, 0.8]), { stiffness: 90, damping: 28 })
  const scale = useSpring(useTransform(scrollYProgress, [0, 0.5, 1], reduced ? [1, 1, 1] : [1, .995, 1]), { stiffness: 90, damping: 28 })
  return <motion.div className="whole-site-motion" style={{ rotate: rotation, scale }}>{children}</motion.div>
}
