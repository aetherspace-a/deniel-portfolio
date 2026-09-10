'use client'

import { Canvas, type ThreeEvent } from '@react-three/fiber'
import { ContactShadows, Environment, Float, Html, OrbitControls } from '@react-three/drei'
import { useEffect, useState } from 'react'

type DeskItem = 'coffee' | 'sketchbook' | 'polaroids'

const itemCopy: Record<DeskItem, { label: string; title: string; text: string; href: string }> = {
  coffee: { label: '01 / COFFEE', title: 'A pause between problems.', text: 'Community systems, quiet rituals, and the work that keeps people moving.', href: '#about' },
  sketchbook: { label: '02 / SKETCHBOOK', title: 'Ideas before they become interfaces.', text: 'Notes on design, documentation, and making complicated things feel clear.', href: '#stack' },
  polaroids: { label: '03 / POLAROIDS', title: 'Things built in public.', text: 'A small archive of projects, tools, and experiments from the studio.', href: '#work' },
}

function Coffee({ onClick }: { onClick: () => void }) {
  return <group position={[-1.85, 0.42, 0.2]} rotation={[0, 0.2, 0]} onClick={onClick}>
    <mesh castShadow><cylinderGeometry args={[0.58, 0.5, 0.75, 32]} /><meshStandardMaterial color="#f4f1e8" roughness={0.72} /></mesh>
    <mesh position={[0, 0.39, 0]}><cylinderGeometry args={[0.49, 0.49, 0.04, 32]} /><meshStandardMaterial color="#211b16" roughness={0.5} /></mesh>
    <mesh position={[0.59, 0.05, 0]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[0.25, 0.08, 16, 24]} /><meshStandardMaterial color="#f4f1e8" roughness={0.72} /></mesh>
    <Html center position={[0, 0.85, 0]}><span className="desk-hotspot">coffee</span></Html>
  </group>
}

function Sketchbook({ onClick }: { onClick: () => void }) {
  return <group position={[0.1, 0.28, 0.15]} rotation={[0.02, -0.25, -0.08]} onClick={onClick}>
    <mesh castShadow><boxGeometry args={[2.2, 0.18, 2.65]} /><meshStandardMaterial color="#181818" roughness={0.9} /></mesh>
    <mesh position={[0, 0.11, 0]}><boxGeometry args={[2.02, 0.025, 2.47]} /><meshStandardMaterial color="#e8e3d8" roughness={0.82} /></mesh>
    <mesh position={[-0.45, 0.135, 0.2]} rotation={[0, 0, -0.2]}><boxGeometry args={[0.08, 0.01, 1.65]} /><meshStandardMaterial color="#151515" /></mesh>
    <Html center position={[0, 0.4, 0]}><span className="desk-hotspot">sketchbook</span></Html>
  </group>
}

function Polaroids({ onClick }: { onClick: () => void }) {
  return <group position={[2.05, 0.3, 0.15]} rotation={[0, -0.15, 0.12]} onClick={onClick}>
    {[[-0.38, 0, 0.2, -0.12], [0.32, 0.02, -0.08, 0.13]].map(([x, y, z, r], index) => <group key={index} position={[x, y, z]} rotation={[0, 0, r]}>
      <mesh castShadow><boxGeometry args={[1.35, 0.1, 1.6]} /><meshStandardMaterial color="#f4f1e8" roughness={0.78} /></mesh>
      <mesh position={[0, 0.06, -0.05]}><boxGeometry args={[1.03, 0.02, 0.88]} /><meshStandardMaterial color={index === 0 ? '#4f5555' : '#72796f'} roughness={0.9} /></mesh>
    </group>)}
    <Html center position={[0, 0.55, 0]}><span className="desk-hotspot">polaroids</span></Html>
  </group>
}

function DeskScene({ active, setActive }: { active: DeskItem | null; setActive: (item: DeskItem) => void }) {
  const handlePointer = (event: ThreeEvent<PointerEvent>, item: DeskItem) => { event.stopPropagation(); setActive(item) }
  return <>
    <ambientLight intensity={1.6} />
    <directionalLight position={[3, 6, 4]} intensity={3.2} castShadow shadow-mapSize={[1024, 1024]} />
    <Environment preset="studio" />
    <Float speed={1.2} rotationIntensity={0.08} floatIntensity={0.12}>
      <group onPointerDown={(event) => handlePointer(event, 'sketchbook')}>
        <Coffee onClick={() => setActive('coffee')} />
        <Sketchbook onClick={() => setActive('sketchbook')} />
        <Polaroids onClick={() => setActive('polaroids')} />
      </group>
    </Float>
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.08, 0]} receiveShadow><planeGeometry args={[12, 8]} /><meshStandardMaterial color="#292724" roughness={0.9} /></mesh>
    <ContactShadows position={[0, 0, 0]} opacity={0.45} scale={7} blur={2.5} far={2} />
    <OrbitControls enablePan={false} minDistance={5.5} maxDistance={8} maxPolarAngle={Math.PI / 2.1} minPolarAngle={Math.PI / 3.4} target={[0, 0.2, 0]} />
  </>
}

export function DeskCanvas() {
  const [active, setActive] = useState<DeskItem | null>(null)
  const [isCompact, setIsCompact] = useState(false)
  const item = active ? itemCopy[active] : null

  useEffect(() => {
    const media = window.matchMedia('(max-width: 640px), (prefers-reduced-motion: reduce)')
    const update = () => setIsCompact(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  return <div className={`desk-canvas-shell${isCompact ? ' desk-canvas-compact' : ''}`}>
    <div className="desk-canvas-header"><span>Interactive desk</span><span>Drag to look / click an object</span></div>
    <div className="desk-canvas-frame">
      {isCompact ? <div className="desk-mobile-index" aria-label="Desk objects">{(Object.keys(itemCopy) as DeskItem[]).map((key) => <button key={key} type="button" onClick={() => setActive(key)}><span>{itemCopy[key].label}</span><strong>{key}</strong><span>↗</span></button>)}</div> : <Canvas shadows dpr={[1, 1.5]} camera={{ position: [0, 4.9, 6.7], fov: 38 }}><color attach="background" args={['#121212']} /><DeskScene active={active} setActive={setActive} /></Canvas>}
      {item && <div className="desk-caption" role="dialog" aria-live="polite"><button type="button" className="desk-close" onClick={() => setActive(null)} aria-label="Close item details">×</button><span className="desk-caption-label">{item.label}</span><h3>{item.title}</h3><p>{item.text}</p><a href={item.href}>Explore the work <span>↗</span></a></div>}
    </div>
  </div>
}

export type { DeskItem }
