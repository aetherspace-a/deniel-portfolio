'use client'

import { useEffect, useRef, useState } from 'react'

const trailLength = 12

export function CursorEffects() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const trailRefs = useRef<(HTMLSpanElement | null)[]>([])
  const pointer = useRef({ x: -100, y: -100 })
  const target = useRef({ x: -100, y: -100 })
  const labelTarget = useRef('Deniel')
  const [label, setLabel] = useState('Deniel')

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const touchQuery = window.matchMedia('(hover: none), (pointer: coarse)')
    if (motionQuery.matches || touchQuery.matches) return

    const onMove = (event: PointerEvent) => {
      target.current = { x: event.clientX, y: event.clientY }
      const interactive = (event.target as HTMLElement).closest('a, button, [role="button"]')
      const nextLabel = interactive?.getAttribute('data-cursor-label') || (interactive ? 'View' : 'Deniel')
      if (nextLabel !== labelTarget.current) {
        labelTarget.current = nextLabel
        setLabel(nextLabel)
      }
    }

    const onLeave = () => {
      target.current = { x: -100, y: -100 }
      labelTarget.current = 'Deniel'
      setLabel('Deniel')
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)
    let frame = 0
    const animate = () => {
      pointer.current.x += (target.current.x - pointer.current.x) * 0.2
      pointer.current.y += (target.current.y - pointer.current.y) * 0.2
      const { x, y } = pointer.current
      if (cursorRef.current) cursorRef.current.style.transform = `translate3d(${x + 12}px, ${y + 12}px, 0)`
      trailRefs.current.forEach((dot, index) => {
        if (!dot) return
        const delay = (index + 1) * 0.12
        dot.style.transform = `translate3d(${x - index * 3}px, ${y - index * 3}px, 0)`
        dot.style.opacity = `${Math.max(0, 0.18 - index * 0.014)}`
        dot.style.transitionDelay = `${delay}s`
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
    <div className="cursor-trail" aria-hidden="true">{Array.from({ length: trailLength }, (_, index) => <span key={index} ref={(node) => { trailRefs.current[index] = node }} />)}</div>
    <div ref={cursorRef} className="cursor-label" aria-hidden="true"><span className="cursor-arrow" />{label}</div>
  </>
}
