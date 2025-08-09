'use client';

import { useRef, useState } from 'react';
import 'swiper/css';
import 'swiper/css/effect-cards';

export default function HowToCook() {

  return (
    <section className="relative overflow-hidden z-20 bg-[#E56B00]">
      <img src="tree.svg" alt="How to Cook Background" className="absolute h-[80%] top-5 left-0" />
      <img src="birds.svg" alt="How to Cook Background" className="absolute  top-20 right-0" />
      <div className="py-20 px-4">
        <h2 className="text-white text-4xl font-extrabold text-center mb-16" style={{ fontFamily: 'var(--font-oswald-local)' }}>HOW TO COOK</h2>

        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          <div className="bg-[#8B1C2B] rounded-xl p-6 relative overflow-hidden h-[500px] text-white flex flex-col items-left text-left group hover:rotate-2 transition-transform duration-300">
            <div className="flex justify-center">
              <img
                src="cookerhover.svg"
                alt="Pressure Cooker"
                className="w-full absolute top-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
              />
            </div>
            <div className='p-6'>
              <div className="flex justify-center">
                <img
                  src="cooker.png"
                  alt="Pressure Cooker"
                  className="w-[330px] absolute -bottom-16 group-hover:scale-[110%] duration-300 transform transition-scale duration-300"
                />
              </div>
              <div className="w-[200px]">
                <h3 className="text-2xl font-bold mb-2">PRESSURE COOKER</h3>
                <p className="text-sm">We take time and effort to accurately review everything about your business and your industry.</p>
              </div>
            </div>
          </div>
          <div className="bg-[#007B3E] rounded-xl p-6 relative overflow-hidden h-[500px] text-white flex flex-col items-left text-left group hover:rotate-2 transition-transform duration-300">
            <div className="flex justify-center">
              <img
                src="pothover.svg"
                alt="Gentle Pot"
                className="w-full absolute top-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
              />
            </div>
            <div className='p-6'>
              <div className="flex justify-center">
                <img
                  src="pot.png"
                  alt="Gentle Pot"
                  className="w-[330px] absolute bottom-0  group-hover:scale-[110%] duration-300 transform transition-scale duration-300"
                />
              </div>
              <div className="w-[200px]">
                <h3 className="text-2xl font-bold mb-2">GENTLE POT</h3>
                <p className="text-sm">We take time and effort to accurately review everything about your business and your industry.</p>
              </div>
            </div>
          </div>
          <div className="bg-[#FF9800] rounded-xl p-6  relative overflow-hidden h-[500px] text-white flex flex-col items-left text-left group hover:rotate-2 transition-transform duration-300">
            <div className="flex justify-center">
              <img
                src="ricecookerhover.svg"
                alt="Rice Cooker"
                className="w-full absolute top-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
              />
            </div>
            <div className='p-6'>
              <div className="flex justify-center">
                <img
                  src="ricecooker.png"
                  alt="Rice Cooker"
                  className="w-[330px] absolute bottom-0 group-hover:scale-[110%] duration-300 transform transition-scale duration-300"
                />
              </div>
              <div className="w-[200px]">
                <h3 className="text-2xl font-bold mb-2">RICE COOKER</h3>
                <p className="text-sm">We take time and effort to accurately review everything about your business and your industry.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );

}

