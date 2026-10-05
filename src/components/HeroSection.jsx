import React from 'react';
import { ArrowRight } from 'lucide-react';
import ResilientImage from './ResilientImage.jsx';

export default function HeroSection({ scrollToSection }) {
  return (
    <section
      id="home"
      className="max-w-[1200px] mx-auto px-6 pt-12 pb-24 md:pt-16 md:pb-32"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
        {/* Left Column */}
        <div className="lg:col-span-6 flex flex-col items-start">
          <h1
            className="text-[40px] sm:text-[50px] lg:text-[54px] font-extrabold text-[#0F172A] leading-[1.08] tracking-[-0.025em] mb-6"
            style={{ textWrap: 'balance' }}
          >
            Building Technology for What’s Next
          </h1>

          <p className="text-[15px] sm:text-[16px] text-slate-500 leading-[1.65] max-w-[490px] mb-9 font-normal">
            MARKO Robotics creates innovative AI, robotics, and technology
            solutions designed to shape a smarter, more productive future.
          </p>

          <div className="flex flex-wrap items-center gap-3.5">
            <button
              onClick={() => scrollToSection('products')}
              className="inline-flex items-center gap-2.5 bg-[#0066FF] hover:bg-[#0052CC] text-white text-[13px] font-semibold px-6 py-3.5 rounded-[8px] transition-all cursor-pointer whitespace-nowrap shadow-xs"
            >
              <span>Explore Products</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => scrollToSection('about')}
              className="inline-flex items-center justify-center bg-white hover:bg-slate-50 text-[#0F172A] border border-slate-300 text-[13px] font-semibold px-6 py-3.5 rounded-[8px] transition-colors cursor-pointer whitespace-nowrap"
            >
              Discover MARKO
            </button>
          </div>
        </div>

        {/* Right Column: Hero Robot Image */}
        <div className="lg:col-span-6">
          <div className="w-full aspect-[4/3.1] rounded-[20px] overflow-hidden bg-slate-900 shadow-lg border border-slate-200/60">
            <ResilientImage
              src="/src/assets/images/hero_humanoid_robot_1791063702192.jpg"
              alt="AEGIS-7 Next-Gen Humanoid Robotics System"
              fallbackTitle="AEGIS-7 Humanoid Intelligent System"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
