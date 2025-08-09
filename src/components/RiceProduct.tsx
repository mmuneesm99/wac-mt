'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface RiceProductProps {
  scale?: number;
}

export default function RiceProduct({ scale = 1 }: RiceProductProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group scale={scale}>
      {/* Rice Bag */}
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <boxGeometry args={[2, 3, 1]} />
        <meshStandardMaterial color="#f4d03f" />
      </mesh>

      {/* Bag Details */}
      <mesh position={[0, 0, 0.51]}>
        <planeGeometry args={[1.8, 2.8]} />
        <meshStandardMaterial color="#e67e22" />
      </mesh>

      {/* Rice Grains (simplified representation) */}
      <group position={[0, 0, 0.52]}>
        {Array.from({ length: 20 }, (_, i) => (
          <mesh
            key={i}
            position={[
              (Math.random() - 0.5) * 1.5,
              (Math.random() - 0.5) * 2.5,
              0
            ]}
          >
            <sphereGeometry args={[0.02, 8, 8]} />
            <meshStandardMaterial color="#f8f9fa" />
          </mesh>
        ))}
      </group>

      {/* Brand Label */}
      <mesh position={[0, 0.5, 0.52]}>
        <planeGeometry args={[1.2, 0.4]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      {/* Text on label (simplified) */}
      <mesh position={[0, 0.5, 0.53]}>
        <planeGeometry args={[0.8, 0.2]} />
        <meshStandardMaterial color="#2c3e50" />
      </mesh>
    </group>
  );
} 