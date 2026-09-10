'use client'

import { useEffect, useRef } from 'react'

export function ParticleEcosystem() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext('webgl', { alpha: true, antialias: false, powerPreference: 'low-power' })
    if (!context) return
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const compactQuery = window.matchMedia('(max-width: 640px)')
    if (motionQuery.matches || compactQuery.matches) return
    const gl = context
    const vertexShader = gl.createShader(gl.VERTEX_SHADER)
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
    if (!vertexShader || !fragmentShader) return
    gl.shaderSource(vertexShader, `attribute vec3 position; attribute float size; uniform float time; uniform float energy; uniform float scroll; varying float vEnergy; void main(){ vec3 p=position; p.z += sin(time*.35+p.x*1.9+p.y)*.14 + scroll*.5; p.x += sin(time*.2+p.y*1.7)*.05; gl_Position=vec4(p,1.0); gl_PointSize=size*(1.0+energy*.8); vEnergy=energy; }`)
    gl.shaderSource(fragmentShader, `precision mediump float; varying float vEnergy; void main(){ vec2 uv=gl_PointCoord-.5; float d=length(uv); float alpha=smoothstep(.5,.05,d); gl_FragColor=vec4(vec3(.82+.16*vEnergy),alpha*(.18+.5*vEnergy)); }`)
    gl.compileShader(vertexShader); gl.compileShader(fragmentShader)
    const program = gl.createProgram()
    if (!program) return
    gl.attachShader(program, vertexShader); gl.attachShader(program, fragmentShader); gl.linkProgram(program); gl.useProgram(program)
    const count = 5600
    const positions = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    for (let i = 0; i < count; i++) { const radius = Math.sqrt(Math.random()) * 1.32; const angle = Math.random() * Math.PI * 2; positions[i*3] = Math.cos(angle) * radius * 1.65; positions[i*3+1] = Math.sin(angle) * radius; positions[i*3+2] = (Math.random()-.5)*.7; sizes[i] = Math.random()*2.2+0.5 }
    const buffer = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buffer); gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW)
    const position = gl.getAttribLocation(program, 'position'); gl.enableVertexAttribArray(position); gl.vertexAttribPointer(position, 3, gl.FLOAT, false, 0, 0)
    const sizeBuffer = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, sizeBuffer); gl.bufferData(gl.ARRAY_BUFFER, sizes, gl.STATIC_DRAW)
    const size = gl.getAttribLocation(program, 'size'); gl.enableVertexAttribArray(size); gl.vertexAttribPointer(size, 1, gl.FLOAT, false, 0, 0)
    const time = gl.getUniformLocation(program, 'time'); const energy = gl.getUniformLocation(program, 'energy'); const scroll = gl.getUniformLocation(program, 'scroll')
    let raf = 0; let started = performance.now(); let scrollValue = 0; let energyValue = 0
    const onScroll = () => { scrollValue = window.scrollY / Math.max(document.body.scrollHeight - window.innerHeight, 1) }
    const onEnergy = (event: Event) => { energyValue = (event as CustomEvent<number>).detail }
    window.addEventListener('zeopspace-energy', onEnergy)
    const resize = () => { const dpr = Math.min(window.devicePixelRatio, 1.5); canvas.width = window.innerWidth*dpr; canvas.height = window.innerHeight*dpr; canvas.style.width='100vw'; canvas.style.height='100vh'; gl.viewport(0,0,canvas.width,canvas.height) }
    const draw = (now: number) => { gl.clearColor(0,0,0,0); gl.clear(gl.COLOR_BUFFER_BIT); gl.uniform1f(time, (now-started)/1000); gl.uniform1f(energy, .35 + energyValue * .55 + Math.sin(now/900)*.08); gl.uniform1f(scroll, scrollValue); gl.drawArrays(gl.POINTS,0,count); raf=requestAnimationFrame(draw) }
    resize(); onScroll(); window.addEventListener('resize', resize); window.addEventListener('scroll', onScroll, { passive: true }); raf=requestAnimationFrame(draw)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); window.removeEventListener('scroll', onScroll); window.removeEventListener('zeopspace-energy', onEnergy) }
  }, [])

  return <canvas ref={canvasRef} className="particle-ecosystem" aria-hidden="true" />
}
