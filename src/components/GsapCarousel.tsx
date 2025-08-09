'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperClass } from 'swiper';
import { EffectCards } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cards';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ScrollToPlugin from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
const cardData = [
  {
    title: "FIBER RICH",
    img: "fiber.svg",
    description: "Mattanaad Matta Rice is easy to cook, soft, fluffy, and perfect for everyday meals."
  },
  {
    title: "Easy to cook",
    img: "easytocook.svg",
    description: "Mattanaad Matta Rice is easy to cook, soft, fluffy, and perfect for everyday meals."
  },
  {
    title: "Long Matta Rice",
    img: "longmatta.svg",
    description: "Mattanaad Matta Rice is easy to cook, soft, fluffy, and perfect for everyday meals."
  },
  {
    title: "World class quality process",
    img: "worldclass.svg",
    description: "Mattanaad Matta Rice is easy to cook, soft, fluffy, and perfect for everyday meals."
  }
];


export default function SwiperCards() {
  const containerRef = useRef(null);
  const circleRef = useRef(null);
  const riceRef = useRef(null);
  const swiperRef = useRef(null);
  const rotationRef = useRef(0);
  const [isSectionTriggered, setIsSectionTriggered] = useState(false);

  useEffect(() => {
    const el = riceRef.current;
    const slideRef = containerRef.current;
    if (!containerRef) return;
    if (!el) return;
    gsap.set(el, {
      bottom: 0,
      left: "50%",
      y: 100,
    });

    const tl = gsap.timeline({ 
      defaults: { duration: 0.5, ease: "power2.out" } 
    });

    tl.to(el, {
      bottom: 0,
      left: "50%",
      y: 100,
      onComplete: () => {
        gsap.to(el, {
          y: -300,
          ease: "power2.out",
          scrollTrigger: {
            trigger: slideRef,
            start: "top top",
            end: "bottom top",
            scrub: true,
            pin: true
          }
        });
      }
    });

  }, []);

  useEffect(() => {
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top center',
      onEnter: () => {
        setIsSectionTriggered(true);
      },
      onLeave: () => {
        setIsSectionTriggered(false);
      },
      onEnterBack: () => {
        setIsSectionTriggered(true);
      },
      onLeaveBack: () => {
        setIsSectionTriggered(false);
      }
    });
    const swiperElement = document.querySelector<HTMLElement & { swiper: SwiperClass }>('.mySwiper');
    if (!swiperElement?.swiper) return;
    
    const swiperInstance = swiperElement.swiper;
    if (!swiperInstance) return;

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: '+=3000',
      scrub: true,
      onUpdate: (self) => {
        if (!isSectionTriggered) return;
        
        const progress = self.progress;
        const totalSlides = swiperInstance.slides.length;
        const newIndex = Math.min(
          Math.floor(progress * totalSlides),
          totalSlides - 1
        );

        if (swiperInstance.activeIndex !== newIndex) {
          swiperInstance.slideTo(newIndex);
        }
        if (progress >= 0.95) {
          gsap.to(window, {
            duration: 1,
            scrollTo: { y: "+=500", offsetY: 0 }, 
            ease: "power2.out"
          });
        }
      },
    });
  }, [isSectionTriggered]);
  const rotateCircle = (direction = 'next') => {
    rotationRef.current += direction === 'next' ? -30 : 30;
    gsap.to(circleRef.current, {
      rotate: rotationRef.current,
      duration: 0.5,
      ease: 'power2.out',
    });
  };

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden">
      <div className="sticky overflow-hidden top-0 h-screen z-10">
        <div
          className="w-full h-screen bg-amber-300 max-w-screen overflow-hidden mx-auto pt-10"
          style={{ clipPath: 'ellipse(100% 100% at 50% 100%)' }}
        >
          <div
            ref={circleRef}
            className="background-circle absolute bottom-0 top-1/2 left-1/2 transform -translate-x-1/2 w-[1000px] h-[1000px] z-0"
          >
            <Image src="/circle.png" alt="background circle" fill />
          </div>

          <div
            ref={riceRef}
            className="absolute w-[500px] h-[500px] bottom-0 top-1/2 left-1/2 -translate-x-1/2 transform z-0"
          >
            <Image
              src="/rice.png"
              alt="rice bag"
              fill
              style={{ objectFit: 'contain' }}
            />
          </div>

          <Swiper
            ref={swiperRef}
            effect={'cards'}
            modules={[EffectCards]}
            className="mySwiper absolute top-1 left-1/2 -translate-x-1/2 w-full h-full"
            centeredSlides={true}
            slidesPerView={4}
            initialSlide={3}
            loop={true}
            speed={800}
            autoplay={isSectionTriggered ? {
              delay: 4000,
              disableOnInteraction: false,
            } : false}
            cardsEffect={{
              perSlideOffset: 80,
              perSlideRotate: 30,
              slideShadows: false,
            }}
            onSlideChangeTransitionStart={(swiper) => {
              const direction = swiper.activeIndex > swiper.previousIndex ? 'next' : 'prev';
              rotateCircle(direction);
            }}
          >
            {cardData.map((data, index) => (
              <SwiperSlide key={index}>
                <div
                  className="w-86 h-86 bg-white rounded-2xl shadow-lg overflow-hidden"
                >
                  <div className="w-full text-white text-2xl bg-green-800 h-fit flex justify-center py-4 rounded-lg">
                    {data.title}
                  </div>
                  <div className="px-4 flex flex-col items-center justify-center">
                    <p className="text-sm text-center text-gray-700 mt-4">{data.description}</p>
                    <div className="relative w-full h-48">
                      <Image
                        src={data.img}
                        alt={data.title}
                        fill
                        style={{ objectFit: 'contain' }} />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <section className="relative h-screen bg-[#F37021] py-20 px-4">

      </section>

    </div>
  );

}
