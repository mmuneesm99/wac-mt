'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import RiceProduct from './RiceProduct';
import GsapCarousel from './GsapCarousel';
import FinalSection from './FinalSection';
import HowToCook from './HowToCook';

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    id: 1,
    weight: '2kg',
    price: '$12.99',
    description: 'Perfect for small families and daily cooking needs.',
    features: ['Premium Quality', 'Long Grain', 'Aromatic'],
    scale: 1
  },
  {
    id: 2,
    weight: '5kg',
    price: '$28.99',
    description: 'Ideal for medium families and special occasions.',
    features: ['Extra Long Grain', 'Aged for 2 Years', 'Non-Sticky'],
    scale: 1
  },
  {
    id: 3,
    weight: '10kg',
    price: '$52.99',
    description: 'Best value for large families and bulk cooking.',
    features: ['Premium Aged', 'Extra Aromatic', 'Perfect Texture'],
    scale: 1
  }
];

export default function HeroSection() {
  const [showFixed, setShowFixed] = useState(true);
  const triggerRef = useRef<HTMLDivElement>(null);
  const heroTriggerRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const heroProductRef = useRef<HTMLDivElement>(null);
  const vehicleRef = useRef<HTMLImageElement>(null);
  const productRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [scale, setScale] = useState(1);
  const [scales, setScales] = useState([1, 1, 1]);


  useEffect(() => {
    if (!triggerRef.current) return;
    if (!heroTriggerRef.current) return;

    const trigger = triggerRef.current;
    const heroTrigger = heroTriggerRef.current;
    ScrollTrigger.create({
      trigger: productRefs.current[0],
      start: 'bottom top',
      end: 'bottom bottom',
      onEnter: () => setShowFixed(false),
      onLeaveBack: () => setShowFixed(true),
    });
    gsap.to({}, {
      scrollTrigger: {
        trigger: heroTrigger,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const newScale = 1 - progress * 0.2;
          setScale(newScale);
        },
      },
    });
    if (vehicleRef.current) {
      gsap.to(vehicleRef.current, {
        x: 300,
        ease: "power2.out",
        scrollTrigger: {
          trigger: heroTrigger,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });
    }

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);
  useEffect(() => {
    const productsEls = productRefs.current;
    if (productsEls.length < 3 || !triggerRef.current) return;

    // ✅ Set transform origin early
    productsEls.forEach(el => {
      gsap.set(el, { transformOrigin: 'center bottom' });
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerRef.current,
        start: 'top top',
        end: '+=3000',
        scrub: true,
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const scale0 = 1 + progress * 0.1;
          const scale1 = 1 + progress * 0.3;
          const scale2 = 1 + progress * 0.6;

          setScales([scale0, scale1, scale2]);
        }
      },
    });

    tl.fromTo(
      productsEls[0],
      { opacity: 0, xPercent: 0, yPercent: 0 },
      { opacity: 1, xPercent: 0, ease: 'power2.inOut', yPercent: 0, immediateRender: false }
    );

    tl.fromTo(
      productsEls[1],
      { opacity: 0, xPercent: 0 },
      { opacity: 1, xPercent: 100, ease: 'power2.inOut', immediateRender: false }
    );

    tl.fromTo(
      productsEls[2],
      { autoAlpha: 0, xPercent: 100 },
      { autoAlpha: 1, xPercent: 200, ease: 'power2.inOut', immediateRender: false }
    );

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);
  useEffect(() => {
    const links = document.querySelectorAll('nav a[data-scroll-to]');

    links.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('data-scroll-to');
        if (!targetId) return;
        const targetEl = document.getElementById(targetId);

        if (targetEl) {
          gsap.to(window, {
            duration: 1,
            scrollTo: { y: targetEl, offsetY: 50 },
            onComplete: () => {
              gsap.to(window, { duration: 0.5, scrollTo: { y: 0, offsetY: 0 } });
            },
            ease: "power2.inOut"
          });
        }
      });
    });

    return () => {
      links.forEach(link => {
        link.removeEventListener('click', () => { });
      });
    };
  }, []);

  useEffect(() => {
    const panels = gsap.utils.toArray<HTMLElement>('.panel');
    if (!panels.length) return;

    const triggers = panels.map((panel) => {
      return ScrollTrigger.create({
        trigger: panel,
        start: 'top top',
        pin: true,
        pinSpacing: false,
      });
    });

    return () => {
      triggers.forEach((trigger) => trigger.kill());
    };
  }, []);


  return (
    <>
      <header ref={heroTriggerRef}>
        <div className="relative px-4 max-w-7xl mx-auto w-full z-5">
          {showFixed && (
            <div
              ref={heroProductRef}
              className="fixed top-1/2 -translate-y-1/2 z-30  transition-all duration-300"
            >
              <div
                className="h-fit w-64 mt-10 ml-20 relative transition-transform"
                style={{ transform: `scale(${scale})` }}
              >
                <img src={`rice.png`} className="w-full h-auto" alt="" />
              </div>
            </div>
          )}
        </div>
        <section ref={heroRef} className="min-h-screen relative flex flex-col justify-center items-center">
          <nav className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full z-50 flex max-w-7xl justify-between items-center p-4">
            <img src="logo.png" alt="Logo" className="h-12" />
            <ul className="flex space-x-6">
              <li><a data-scroll-to="product-variations" className="text-black hover:text-gray-700">PRODUCTS</a></li>
              <li><a data-scroll-to="about" className="text-black hover:text-gray-700">ABOUT US</a></li>
              <li><a data-scroll-to="why-choose" className="text-black hover:text-gray-700">WHY CHOOSE</a></li>
              <li><a data-scroll-to="how-to-cook" className="text-black hover:text-gray-700">HOW TO COOK</a></li>
            </ul>
          </nav>


          <div className='relative top-0 left-0 w-full h-full'>
            <img src="hero-bg.png" alt="" className='w-full h-full object-cover' />
            <img src="plant.png" className='absolute bottom-0 right-0 h-[50%]' alt="" />
            <img src="hero-bottom-vector.svg" className='absolute -bottom-[100px]' alt="" />
            <img src="leaf.png" className='absolute -bottom-[3%] left-[7%] h-[25%]' alt="" />
            <img ref={vehicleRef} src="vehicle.png" className='absolute top-[44%] left-[43%]' alt="" />
          </div>
          <div className="max-w-7xl h-screen absolute inset-0 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div />
            <div className="space-y-8">
              <div className="relative ">
                <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-[120px] font-bold text-[#FD9C2D] leading-28 tracking-tight transform uppercase" style={{ fontFamily: 'var(--font-oswald-local)' }}>
                  You have reached MattaNaad!
                </h1>
                <img src="shadow.png" className="w-full" alt="" />
              </div>
            </div>
          </div>
        </section>
        <section
          ref={triggerRef}
          id="product-variations"
          className="w-full bg-white  h-full h-screen relative py-20"
        >
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-left max-w-[300px]">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 uppercase" style={{ fontFamily: 'var(--font-oswald-local)' }}>Our
                products</h2>
            </div>
            <div className="relative h-[700px] mt-5 z-10">
              {products.map((product, index) => (
                <div
                  key={product.id}
                  ref={(el) => {
                    productRefs.current[index] = el;
                  }}
                  className="absolute flex justify-center  flex-col items-center w-full md:w-1/3 opacity-0"
                >
                  <div className="h-[500px] relative">
                    <img
                      src={`rice.png`}
                      className="w-48 h-auto"
                      alt=""
                      style={{ transform: `scale(${scales[index] || 1})` }}
                    />
                  </div>
                  <div className='flex flex-col items-center justify-center -mt-16'>
                    <h2 className='text-xl font-bold text-gray-800' >Matta Vadi Rice</h2>
                    <h3 className="text-3xl font-bold text-gray-900 mb-2">{product.weight}</h3>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>
      </header>
      <section id={`why-choose`} className='panel'>
        <GsapCarousel />
      </section>
      <section id={`how-to-cook`} className="">
        <HowToCook />
      </section>
      <section id={`final-carousel`} className=" bg-white relative overflow-hidden w-full">
        <FinalSection />
      </section>
    </>
  );
} 