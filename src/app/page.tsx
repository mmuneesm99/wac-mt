'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroSection from '@/components/HeroSection';
import Footer from '@/components/Footer';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Clean up ScrollTrigger on unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative overflow-hidden bg-white">
      <HeroSection />
      <Footer />
    </div>
  );
}
