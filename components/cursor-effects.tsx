'use client'

import { useEffect, useRef, useState } from 'react'

const trailLength = 12

export function CursorEffects() {
  const labelRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const trailRefs = useRef<(HTMLSpanElement | null)[]>([])
  const pointer = useRef({ x: -120, y: -120 })
  const target = useRef({ x: -120, y: -120 })
  const labelTarget = useRef('You')
  const [label, setLabel] = useState('You')

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const touchQuery = window.matchMedia('(hover: none), (pointer: coarse)')
    if (motionQuery.matches || touchQuery.matches) return

    const onMove = (event: PointerEvent) => {
      target.current = { x: event.clientX, y: event.clientY }
      const interactive = (event.target as HTMLElement).closest('a, button, [role="button"]')
      const nextLabel = interactive?.getAttribute('data-cursor-label') || (interactive ? 'View' : 'You')
      if (nextLabel !== labelTarget.current) {
        labelTarget.current = nextLabel
        setLabel(nextLabel)
      }
    }

    const onLeave = () => {
      target.current = { x: -120, y: -120 }
      labelTarget.current = 'You'
      setLabel('You')
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)
    let frame = 0
    const animate = () => {
      pointer.current.x += (target.current.x - pointer.current.x) * 0.18
      pointer.current.y += (target.current.y - pointer.current.y) * 0.18
      const { x, y } = pointer.current
      if (labelRef.current) labelRef.current.style.transform = `translate3d(${x + 14}px, ${y + 16}px, 0)`
      if (glowRef.current) glowRef.current.style.transform = `translate3d(${x - 12}vw, ${y - 12}vh, 0)`
      trailRefs.current.forEach((dot, index) => {
        if (!dot) return
        dot.style.transform = `translate3d(${x - index * 4}px, ${y - index * 4}px, 0)`
        dot.style.opacity = `${Math.max(0, 0.16 - index * 0.012)}`
      })
      frame = window.requestAnimationFrame(animate)
    }
    frame = window.requestAnimationFrame(animate)
    return () => {
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      window.cancelAnimationFrame(frame)
    }
  }, [])

  return <>
    <div ref={glowRef} className="cursor-glow" aria-hidden="true" />
    <div className="cursor-trail" aria-hidden="true">
      {Array.from({ length: trailLength }, (_, index) => <span key={index} ref={(node) => { trailRefs.current[index] = node }} />)}
    </div>
    <div ref={labelRef} className="cursor-label" aria-hidden="true">{label}</div>
  </>
}
