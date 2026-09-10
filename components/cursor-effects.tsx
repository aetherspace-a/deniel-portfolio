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

    let pointer = { x: -120, y: -120 }
    let current = { x: -120, y: -120 }
    let frame = 0
    const onMove = (event: PointerEvent) => {
      pointer = { x: event.clientX + 16, y: event.clientY + 16 }
      const interactive = (event.target as HTMLElement).closest('a, button, [role="button"]')
      const nextLabel = interactive?.getAttribute('data-cursor-label') || (interactive ? 'View' : 'You')
      if (nextLabel !== labelTarget.current) {
        labelTarget.current = nextLabel
        setLabel(nextLabel)
      }
      document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((element) => {
        const rect = element.getBoundingClientRect()
        const dx = event.clientX - (rect.left + rect.width / 2)
        const dy = event.clientY - (rect.top + rect.height / 2)
        const distance = Math.hypot(dx, dy)
        const strength = distance < 110 ? Math.max(0, 1 - distance / 110) : 0
        element.style.setProperty('--magnetic-x', `${dx * strength * 0.12}px`)
        element.style.setProperty('--magnetic-y', `${dy * strength * 0.12}px`)
      })
    }
    const tick = () => {
      current.x += (pointer.x - current.x) * 0.18
      current.y += (pointer.y - current.y) * 0.18
      labelRef.current?.style.setProperty('transform', `translate3d(${current.x}px, ${current.y}px, 0)`)
      frame = requestAnimationFrame(tick)
    }
    const onLeave = () => { pointer = { x: -120, y: -120 }; labelTarget.current = 'You'; setLabel('You') }
    frame = requestAnimationFrame(tick)
    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)
    return () => { cancelAnimationFrame(frame); window.removeEventListener('pointermove', onMove); document.documentElement.removeEventListener('mouseleave', onLeave) }
  }, [])

  return <div ref={labelRef} className="cursor-label" aria-hidden="true">{label}</div>
}

