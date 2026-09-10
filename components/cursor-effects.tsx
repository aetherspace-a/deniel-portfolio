'use client'

import { useEffect, useRef, useState } from 'react'

export function CursorEffects() {
  const labelRef = useRef<HTMLDivElement>(null)
  const labelTarget = useRef('You')
  const [label, setLabel] = useState('You')

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const touchQuery = window.matchMedia('(hover: none), (pointer: coarse)')
    if (motionQuery.matches || touchQuery.matches) return

    const onMove = (event: PointerEvent) => {
      const interactive = (event.target as HTMLElement).closest('a, button, [role="button"]')
      const nextLabel = interactive?.getAttribute('data-cursor-label') || (interactive ? 'View' : 'You')
      if (nextLabel !== labelTarget.current) {
        labelTarget.current = nextLabel
        setLabel(nextLabel)
      }
      if (labelRef.current) {
        labelRef.current.style.transform = `translate3d(${event.clientX + 16}px, ${event.clientY + 16}px, 0)`
      }
    }

    const onLeave = () => {
      labelTarget.current = 'You'
      setLabel('You')
      if (labelRef.current) labelRef.current.style.transform = 'translate3d(-120px, -120px, 0)'
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return <div ref={labelRef} className="cursor-label" aria-hidden="true">{label}</div>
}

