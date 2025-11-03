import dynamic from 'next/dynamic'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, PerspectiveCamera, Sparkles } from '@react-three/drei'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

function FloatingPoly({ color, position, scale, speed = 1.2 }) {
  const ref = useRef(null)
  const emissive = useMemo(
    () => new THREE.Color(color).multiplyScalar(0.45),
    [color]
  )

  useFrame((state, delta) => {
    if (!ref.current) {
      return
    }

    ref.current.rotation.x += delta * 0.4
    ref.current.rotation.y += delta * 0.6
    ref.current.rotation.z += delta * 0.2

    const oscillation = Math.sin(state.clock.elapsedTime * speed) * 0.3 + 0.7
    ref.current.material.emissiveIntensity = oscillation
  })

  return (
    <Float
      speed={speed}
      rotationIntensity={1.1}
      floatIntensity={1.2}
      floatingRange={[-0.8, 0.8]}
    >
      <mesh ref={ref} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 2]} />
        <meshStandardMaterial
          color={color}
          emissive={emissive}
          roughness={0.25}
          metalness={0.85}
        />
      </mesh>
    </Float>
  )
}

function HaloRings() {
  const ref = useRef(null)

  useFrame((state) => {
    if (!ref.current) {
      return
    }
    ref.current.rotation.z = state.clock.elapsedTime * 0.08
  })

  return (
    <mesh ref={ref} position={[0, 0, -4]} scale={[14, 14, 1]}>
      <ringGeometry args={[2.4, 4.8, 128]} />
      <meshBasicMaterial
        color="#fb923c"
        transparent
        opacity={0.28}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

function AuroraPlane() {
  const ref = useRef(null)

  useFrame((state) => {
    if (!ref.current) {
      return
    }
    ref.current.material.opacity =
      Math.sin(state.clock.elapsedTime * 0.6) * 0.1 + 0.35
    ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.25) * 0.2
  })

  return (
    <mesh ref={ref} position={[0, 0, -6]} scale={[16, 16, 1]}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <meshBasicMaterial
        color="#1b0f07"
        transparent
        opacity={0.32}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

function HeroSceneImpl() {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 45 }}
      className="absolute inset-0"
    >
      <color attach="background" args={['#080507']} />
      <ambientLight intensity={0.6} color="#fff7ed" />
      <directionalLight
        position={[6, 6, 6]}
        intensity={1.6}
        color="#fb923c"
      />
      <pointLight position={[-6, -6, 6]} intensity={1.2} color="#fed7aa" />
      <pointLight position={[0, 4, -2]} intensity={0.9} color="#f97316" />

      <Sparkles
        count={140}
        scale={[12, 12, 8]}
        size={2.2}
        speed={0.22}
        color="#fb923c"
        opacity={0.38}
      />

      <HaloRings />
      <AuroraPlane />

      <FloatingPoly color="#fb923c" position={[-2.8, 1.4, 0]} scale={1.6} />
      <FloatingPoly
        color="#fed7aa"
        position={[2.6, -1.8, 0]}
        scale={1.3}
        speed={0.9}
      />
      <FloatingPoly
        color="#f97316"
        position={[0.5, 2.4, -1]}
        scale={1}
        speed={1.6}
      />

      <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={42} />
    </Canvas>
  )
}

export const HeroScene = dynamic(
  () => Promise.resolve(HeroSceneImpl),
  { ssr: false }
)
