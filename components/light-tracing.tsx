'use client'

import { useEffect, useRef } from 'react'

export function LightTracing() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext('2d')
    if (!context) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const coarsePointer = window.matchMedia('(hover: none), (pointer: coarse)')
    if (reducedMotion.matches || coarsePointer.matches) return

    let frame = 0
    let width = 0
    let height = 0
    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0, active: false }

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * ratio
      canvas.height = height * ratio
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
    }

    const move = (event: PointerEvent) => {
      pointer.targetX = event.clientX
      pointer.targetY = event.clientY
      pointer.active = true
    }

    const leave = () => { pointer.active = false }

    const draw = () => {
      pointer.x += (pointer.targetX - pointer.x) * 0.08
      pointer.y += (pointer.targetY - pointer.y) * 0.08
      context.clearRect(0, 0, width, height)

      if (pointer.active) {
        const radius = Math.min(width, height) * 0.22
        const gradient = context.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, radius)
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.065)')
        gradient.addColorStop(0.35, 'rgba(255, 255, 255, 0.022)')
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
        context.fillStyle = gradient
        context.fillRect(pointer.x - radius, pointer.y - radius, radius * 2, radius * 2)

        context.beginPath()
        for (let index = 1; index < 5; index += 1) {
          context.arc(pointer.x, pointer.y, index * 38, 0, Math.PI * 2)
        }
        context.strokeStyle = 'rgba(255, 255, 255, 0.035)'
        context.lineWidth = 1
        context.stroke()
      }

      frame = requestAnimationFrame(draw)
    }

    resize()
    pointer.x = width / 2
    pointer.y = height / 2
    pointer.targetX = pointer.x
    pointer.targetY = pointer.y
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', move, { passive: true })
    document.documentElement.addEventListener('mouseleave', leave)
    frame = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', move)
      document.documentElement.removeEventListener('mouseleave', leave)
    }
  }, [])

  return <canvas ref={canvasRef} className="light-tracing" aria-hidden="true" />
}
