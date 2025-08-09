'use client';

import React, { useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, type Gltf } from '@react-three/drei';
import { AnimationMixer, Group, LoopOnce, type AnimationAction } from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function SpinningScene() {
  const ref = useRef<Group>(null);
  const { scene, animations } = useGLTF('/scene.glb');
  const mixer = useRef<AnimationMixer | null>(null);
  const actionRef = useRef<AnimationAction | null>(null);

  useEffect(() => {
    if (scene && animations.length > 0) {
      mixer.current = new AnimationMixer(scene);
      const action = mixer.current.clipAction(animations[0]);
      actionRef.current = action;
      action.setLoop(LoopOnce, 1);
      action.clampWhenFinished = true;
      action.play();
      action.paused = true;

      ScrollTrigger.create({
        trigger: "#model-section",
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          if (actionRef.current) {
            const progress = self.progress;
            const duration = animations[0].duration;
            actionRef.current.time = progress * duration;
          }
        }
      });
    }
  }, [scene, animations]);

  useFrame((_, delta) => {
    mixer.current?.update(delta);
  });

  return (
    <primitive
      ref={ref}
      object={scene}
      scale={[1.8, 1.8, 1.8]}
      position={[0, -1.8, 0]}
      rotation={[0, 0, 0]}
      receiveShadow
      castShadow
    />
  );
}

export default function FinalSection() {
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    gsap.fromTo(
      textRef.current,
      { y: -100 },
      {
        y: 0, // Move text up on scroll
        ease: "none",
        scrollTrigger: {
          trigger: "#model-section",
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        }
      }
    );
  }, []);

  return (
    <div id="model-section" className="flex justify-center items-end relative w-full bg-[#E56B00] h-screen">
      <h1
        ref={textRef}
        className="absolute top-10 text-6xl font-bold text-white drop-shadow-lg z-10"
      >
        Explore Now
      </h1>

      <Canvas style={{ height: '100vh' }} camera={{ fov: 50 }}>
        <ambientLight intensity={5} />
        <pointLight position={[40, 30, 40]} />
        <SpinningScene />
      </Canvas>
    </div>
  );
}

useGLTF.preload('/scene.glb');
