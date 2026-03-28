'use client';

import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function ParticleField({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const timeRef = useRef(0);

  const particleCount = 8000;

  const { positions, originalPositions, sizes, colors } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const colors = new Float32Array(particleCount * 3);

    // Create particles in a sphere/torus-knot-like formation
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const t = (i / particleCount) * Math.PI * 2 * 4;
      const r = 2.5;

      // Torus knot parametric equations
      const p = 2, q = 3;
      const phi = t;
      const cosPhi = Math.cos(phi);
      const sinPhi = Math.sin(phi);
      const cosQPhi = Math.cos(q * phi / p);
      const sinQPhi = Math.sin(q * phi / p);

      const radius = r * (0.5 + 0.5 * cosQPhi);
      
      // Add some noise
      const noise = (Math.random() - 0.5) * 0.8;
      const noise2 = (Math.random() - 0.5) * 0.8;
      const noise3 = (Math.random() - 0.5) * 0.8;

      positions[i3] = radius * cosPhi + noise;
      positions[i3 + 1] = radius * sinPhi + noise2;
      positions[i3 + 2] = r * 0.5 * sinQPhi + noise3;

      originalPositions[i3] = positions[i3];
      originalPositions[i3 + 1] = positions[i3 + 1];
      originalPositions[i3 + 2] = positions[i3 + 2];

      sizes[i] = Math.random() * 3 + 1;

      // Orange to white gradient coloring
      const colorMix = Math.random();
      if (colorMix < 0.4) {
        // Orange particles
        colors[i3] = 0.976;     // R
        colors[i3 + 1] = 0.451; // G
        colors[i3 + 2] = 0.086; // B
      } else if (colorMix < 0.7) {
        // Bright orange
        colors[i3] = 1.0;
        colors[i3 + 1] = 0.6;
        colors[i3 + 2] = 0.2;
      } else {
        // White/light particles
        colors[i3] = 1.0;
        colors[i3 + 1] = 0.85;
        colors[i3 + 2] = 0.7;
      }
    }

    return { positions, originalPositions, sizes, colors };
  }, []);

  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uPixelRatio: { value: typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 2) : 1 },
      },
      vertexShader: `
        attribute float aSize;
        attribute vec3 aColor;
        uniform float uTime;
        uniform vec2 uMouse;
        uniform float uPixelRatio;
        varying vec3 vColor;
        varying float vAlpha;

        void main() {
          vec3 pos = position;
          
          // Smooth rotation and wave
          float angle = uTime * 0.15;
          float cosA = cos(angle);
          float sinA = sin(angle);
          
          // Rotate around Y axis
          float x = pos.x * cosA - pos.z * sinA;
          float z = pos.x * sinA + pos.z * cosA;
          pos.x = x;
          pos.z = z;
          
          // Wave distortion
          pos.y += sin(pos.x * 0.5 + uTime * 0.3) * 0.3;
          pos.x += cos(pos.y * 0.5 + uTime * 0.2) * 0.2;
          
          // Mouse interaction - push particles
          float mouseInfluence = smoothstep(3.0, 0.0, length(pos.xy - uMouse * 3.0));
          pos.z += mouseInfluence * 1.5;
          pos.x += (pos.x - uMouse.x * 3.0) * mouseInfluence * 0.3;
          pos.y += (pos.y - uMouse.y * 3.0) * mouseInfluence * 0.3;
          
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_Position = projectionMatrix * mvPosition;
          gl_PointSize = aSize * uPixelRatio * (200.0 / -mvPosition.z);
          
          vColor = aColor;
          float dist = length(pos);
          vAlpha = smoothstep(5.0, 0.0, dist) * (0.6 + 0.4 * sin(uTime + float(gl_VertexID) * 0.01));
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vAlpha;

        void main() {
          float d = length(gl_PointCoord - vec2(0.5));
          if (d > 0.5) discard;
          
          float alpha = smoothstep(0.5, 0.0, d) * vAlpha;
          gl_FragColor = vec4(vColor, alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
  }, []);

  useFrame((state) => {
    timeRef.current += 0.016;
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = timeRef.current;
      materialRef.current.uniforms.uMouse.value.set(mouse.current.x, mouse.current.y);
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-aSize"
          args={[sizes, 1]}
        />
        <bufferAttribute
          attach="attributes-aColor"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <primitive object={shaderMaterial} ref={materialRef} attach="material" />
    </points>
  );
}

function FloatingRings() {
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);
  const ring3 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ring1.current) {
      ring1.current.rotation.x = t * 0.2;
      ring1.current.rotation.y = t * 0.15;
    }
    if (ring2.current) {
      ring2.current.rotation.x = -t * 0.15;
      ring2.current.rotation.z = t * 0.1;
    }
    if (ring3.current) {
      ring3.current.rotation.y = t * 0.1;
      ring3.current.rotation.z = -t * 0.2;
    }
  });

  const ringMaterial = useMemo(() => new THREE.MeshBasicMaterial({
    color: new THREE.Color('#f97316'),
    wireframe: true,
    transparent: true,
    opacity: 0.08,
  }), []);

  return (
    <>
      <mesh ref={ring1}>
        <torusGeometry args={[3.5, 0.02, 16, 100]} />
        <primitive object={ringMaterial} attach="material" />
      </mesh>
      <mesh ref={ring2}>
        <torusGeometry args={[4, 0.015, 16, 100]} />
        <primitive object={ringMaterial.clone()} attach="material" />
      </mesh>
      <mesh ref={ring3}>
        <torusGeometry args={[4.5, 0.01, 16, 100]} />
        <primitive object={ringMaterial.clone()} attach="material" />
      </mesh>
    </>
  );
}

export default function HeroModel() {
  const mouseRef = useRef({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (!mounted) {
    return (
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'radial-gradient(circle, rgba(249,115,22,0.05) 0%, transparent 70%)',
      }}>
        <div style={{
          width: 120,
          height: 120,
          borderRadius: '50%',
          border: '2px solid rgba(249,115,22,0.2)',
          animation: 'pulse-glow 2s infinite',
        }} />
      </div>
    );
  }

  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 60 }}
      style={{ width: '100%', height: '100%' }}
      dpr={[1, 2]}
      gl={{ alpha: true, antialias: true }}
    >
      <color attach="background" args={['#030303']} />
      <ambientLight intensity={0.5} />
      <ParticleField mouse={mouseRef} />
      <FloatingRings />
    </Canvas>
  );
}
