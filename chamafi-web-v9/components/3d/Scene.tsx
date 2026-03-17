'use client';

import { useRef, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Stars, Float, MeshDistortMaterial, Sphere, Ring, Text3D, Center } from '@react-three/drei';
import * as THREE from 'three';

// ── Floating Coin ──────────────────────────────────────────────────────────
function Coin({ position, speed = 1, scale = 1, color = '#FFD700' }: {
  position: [number, number, number];
  speed?: number;
  scale?: number;
  color?: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const phase = useRef(Math.random() * Math.PI * 2);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime * speed + phase.current;
    meshRef.current.position.y = position[1] + Math.sin(t * 0.7) * 0.3;
    meshRef.current.rotation.y += 0.02 * speed;
    meshRef.current.rotation.x = Math.sin(t * 0.3) * 0.2;
  });

  return (
    <group position={position} scale={scale}>
      <mesh ref={meshRef}>
        <cylinderGeometry args={[0.4, 0.4, 0.06, 32]} />
        <meshStandardMaterial
          color={color}
          metalness={0.95}
          roughness={0.05}
          envMapIntensity={2}
        />
      </mesh>
      {/* Rim glow */}
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.38, 0.45, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.3} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

// ── Africa Globe ───────────────────────────────────────────────────────────
function Globe() {
  const globeRef = useRef<THREE.Group>(null);
  const dotRingRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!globeRef.current) return;
    globeRef.current.rotation.y += 0.003;
    if (dotRingRef.current) {
      dotRingRef.current.rotation.z += 0.005;
    }
  });

  // Create Africa-ish land mass dots
  const africaDots: [number, number, number][] = [];
  for (let i = 0; i < 120; i++) {
    const lat = (Math.random() * 70 - 40) * (Math.PI / 180); // -40 to 30 deg lat
    const lon = (Math.random() * 60 - 10) * (Math.PI / 180); // -10 to 50 deg lon
    const r = 1.52;
    africaDots.push([
      r * Math.cos(lat) * Math.cos(lon),
      r * Math.sin(lat),
      r * Math.cos(lat) * Math.sin(lon),
    ]);
  }

  return (
    <group ref={globeRef} position={[3.5, 0, -2]}>
      {/* Core sphere */}
      <Sphere args={[1.5, 64, 64]}>
        <meshStandardMaterial
          color="#030a1a"
          metalness={0.1}
          roughness={0.9}
          transparent
          opacity={0.95}
        />
      </Sphere>

      {/* Ocean glow layer */}
      <Sphere args={[1.52, 32, 32]}>
        <meshBasicMaterial
          color="#00D4AA"
          transparent
          opacity={0.04}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* Atmosphere glow */}
      <Sphere args={[1.65, 32, 32]}>
        <meshBasicMaterial
          color="#00A8FF"
          transparent
          opacity={0.06}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* Outer atmosphere */}
      <Sphere args={[1.8, 32, 32]}>
        <meshBasicMaterial
          color="#7C3AED"
          transparent
          opacity={0.03}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* Africa dots */}
      {africaDots.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.018, 4, 4]} />
          <meshBasicMaterial color={i % 5 === 0 ? '#FFD700' : '#00D4AA'} />
        </mesh>
      ))}

      {/* Grid lines */}
      {[0, 30, 60, 90, 120, 150].map((deg) => (
        <mesh key={`lon${deg}`} rotation={[0, (deg * Math.PI) / 180, 0]}>
          <ringGeometry args={[1.51, 1.52, 64, 1, 0, Math.PI * 2]} />
          <meshBasicMaterial color="#00D4AA" transparent opacity={0.08} side={THREE.DoubleSide} />
        </mesh>
      ))}

      {/* Equator ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.51, 1.525, 64]} />
        <meshBasicMaterial color="#FFD700" transparent opacity={0.2} side={THREE.DoubleSide} />
      </mesh>

      {/* Orbit ring 1 */}
      <mesh ref={dotRingRef} rotation={[Math.PI / 3, 0, 0]}>
        <ringGeometry args={[2.0, 2.03, 64]} />
        <meshBasicMaterial color="#FFD700" transparent opacity={0.3} side={THREE.DoubleSide} />
      </mesh>

      {/* Orbit ring 2 */}
      <mesh rotation={[Math.PI / 5, Math.PI / 4, 0]}>
        <ringGeometry args={[2.4, 2.42, 64]} />
        <meshBasicMaterial color="#A78BFA" transparent opacity={0.15} side={THREE.DoubleSide} />
      </mesh>

      {/* Orbiting coin */}
      <group rotation={[Math.PI / 3, 0, 0]}>
        <Float speed={2} floatIntensity={0.2}>
          <Coin position={[2.0, 0, 0]} scale={0.6} speed={0.5} />
        </Float>
      </group>
    </group>
  );
}

// ── Particle Field ─────────────────────────────────────────────────────────
function ParticleField({ count = 2000 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 30;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 30;

    // Gold or teal
    if (Math.random() > 0.7) {
      colors[i * 3] = 1; colors[i * 3 + 1] = 0.843; colors[i * 3 + 2] = 0;
    } else {
      colors[i * 3] = 0; colors[i * 3 + 1] = 0.831; colors[i * 3 + 2] = 0.667;
    }
  }

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    pointsRef.current.rotation.x = state.clock.elapsedTime * 0.01;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

// ── Energy Ring ─────────────────────────────────────────────────────────────
function EnergyRing({ radius, speed, color, tilt }: {
  radius: number; speed: number; color: string; tilt: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.z = state.clock.elapsedTime * speed;
  });

  return (
    <mesh ref={ref} rotation={[tilt, 0, 0]}>
      <ringGeometry args={[radius, radius + 0.02, 64]} />
      <meshBasicMaterial color={color} transparent opacity={0.15} side={THREE.DoubleSide} />
    </mesh>
  );
}

// ── Floating Token Cluster ──────────────────────────────────────────────────
function TokenCluster() {
  const coins: Array<{ pos: [number, number, number]; speed: number; scale: number; color: string }> = [
    { pos: [-4, 1.5, -3], speed: 0.8, scale: 1.2, color: '#FFD700' },
    { pos: [-3, -1, -2], speed: 1.1, scale: 0.9, color: '#FFF3A3' },
    { pos: [1, 2.5, -4], speed: 0.6, scale: 0.7, color: '#FFD700' },
    { pos: [-5, 0, -1], speed: 1.3, scale: 1.0, color: '#00D4AA' },
    { pos: [0, -2, -3], speed: 0.9, scale: 1.1, color: '#FFD700' },
    { pos: [-2, 3, -5], speed: 0.7, scale: 0.8, color: '#A78BFA' },
    { pos: [5, -1, -2], speed: 1.2, scale: 0.6, color: '#FFD700' },
    { pos: [4, 2, -4], speed: 0.5, scale: 0.9, color: '#00D4AA' },
    { pos: [-1, -3, -2], speed: 1.0, scale: 1.3, color: '#FFF3A3' },
  ];

  return (
    <>
      {coins.map((c, i) => (
        <Float key={i} speed={c.speed} floatIntensity={0.5} rotationIntensity={0.3}>
          <Coin {...c} position={c.pos} />
        </Float>
      ))}
    </>
  );
}

// ── Central Distort Orb ────────────────────────────────────────────────────
function CentralOrb() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.2;
    ref.current.rotation.z = state.clock.elapsedTime * 0.1;
  });

  return (
    <Float speed={1.5} floatIntensity={0.3}>
      <mesh ref={ref} position={[-1, 0, -2]}>
        <sphereGeometry args={[0.8, 64, 64]} />
        <MeshDistortMaterial
          color="#FFD700"
          emissive="#FF8C00"
          emissiveIntensity={0.3}
          metalness={0.9}
          roughness={0.1}
          distort={0.4}
          speed={3}
        />
      </mesh>
    </Float>
  );
}

// ── Mouse parallax camera ──────────────────────────────────────────────────
function CameraRig() {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  useFrame(() => {
    camera.position.x += (mouse.current.x * 0.5 - camera.position.x) * 0.05;
    camera.position.y += (mouse.current.y * 0.3 - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// ── Main exported Scene ────────────────────────────────────────────────────
export default function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 60 }}
      gl={{ antialias: true, alpha: false }}
      style={{ background: 'transparent' }}
      dpr={[1, 2]}
    >
      <color attach="background" args={['#030712']} />
      <fog attach="fog" args={['#030712', 15, 35]} />

      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
      <pointLight position={[-5, 3, 2]} intensity={2} color="#FFD700" distance={12} />
      <pointLight position={[5, -3, -5]} intensity={1.5} color="#00D4AA" distance={15} />
      <pointLight position={[0, 0, 3]} intensity={1} color="#7C3AED" distance={10} />
      <spotLight
        position={[3, 5, 2]}
        angle={0.4}
        penumbra={0.5}
        intensity={3}
        color="#FFD700"
        castShadow
      />

      <Suspense fallback={null}>
        <CameraRig />
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
        <ParticleField count={1500} />
        <TokenCluster />
        <Globe />
        <CentralOrb />

        {/* Energy rings around orb */}
        <EnergyRing radius={1.5} speed={0.5} color="#FFD700" tilt={0.3} />
        <EnergyRing radius={2.0} speed={-0.3} color="#00D4AA" tilt={0.8} />
        <EnergyRing radius={2.5} speed={0.2} color="#7C3AED" tilt={1.2} />
      </Suspense>
    </Canvas>
  );
}
