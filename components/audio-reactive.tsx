'use client'

import { useEffect, useRef, useState } from 'react'

export function AudioReactive() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [playing, setPlaying] = useState(false)
  const [supported, setSupported] = useState(true)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext('2d')
    if (!context) return
    let frame = 0
    let phase = 0
    const resize = () => { canvas.width = window.innerWidth * window.devicePixelRatio; canvas.height = window.innerHeight * window.devicePixelRatio; context.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0) }
    const draw = () => {
      phase += playing ? 0.018 : 0.006
      const width = window.innerWidth
      const height = window.innerHeight
      context.clearRect(0, 0, width, height)
      const gradient = context.createRadialGradient(width * 0.72, height * 0.22, 0, width * 0.72, height * 0.22, Math.min(width, height) * (playing ? 0.55 : 0.35))
      gradient.addColorStop(0, `rgba(255,255,255,${playing ? 0.08 : 0.025})`)
      gradient.addColorStop(1, 'rgba(255,255,255,0)')
      context.fillStyle = gradient
      context.fillRect(0, 0, width, height)
      context.beginPath()
      for (let x = 0; x <= width; x += 12) {
        const y = height * 0.55 + Math.sin(x * 0.008 + phase) * (playing ? 13 : 5) + Math.sin(x * 0.018 + phase * 1.7) * (playing ? 7 : 2)
        x === 0 ? context.moveTo(x, y) : context.lineTo(x, y)
      }
      context.strokeStyle = `rgba(255,255,255,${playing ? 0.12 : 0.035})`
      context.lineWidth = 1
      context.stroke()
      frame = requestAnimationFrame(draw)
    }
    try { resize(); draw(); window.addEventListener('resize', resize) } catch { setSupported(false) }
    return () => { cancelAnimationFrame(frame); window.removeEventListener('resize', resize) }
  }, [playing])

  if (!supported) return null
  return <><canvas ref={canvasRef} className="audio-reactive" aria-hidden="true" /><button type="button" className={`audio-toggle${playing ? ' is-playing' : ''}`} onClick={() => setPlaying((value) => !value)} aria-pressed={playing}><span className="audio-bars" aria-hidden="true"><i /><i /><i /></span>{playing ? 'Sound on' : 'Sound layer'}</button></>
}
