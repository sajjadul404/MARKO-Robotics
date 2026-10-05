import React from 'react';
import { ArrowRight } from 'lucide-react';
import ResilientImage from './ResilientImage.jsx';

export default function AboutSection({ openResearchLandingPage }) {
  return (
    <section id="about" className="bg-[#F8FAFC] py-24 md:py-32 mt-8">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Blueprint Image */}
          <div className="lg:col-span-5">
            <div className="w-full aspect-[4/3.2] rounded-[18px] overflow-hidden bg-[#0B2545] shadow-md border border-slate-200/80">
              <ResilientImage
                src="/src/assets/images/about_blueprint_schematic_1791063749796.jpg"
                alt="Aegis Automation Component Schematics Blueprint"
                fallbackTitle="AEGIS Automation Technical Blueprint"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Column: Copy & Action */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <p className="text-[11px] font-bold tracking-[0.08em] uppercase text-[#0066FF] mb-2.5">
              ABOUT MARKO ROBOTICS
            </p>

            <h2 className="text-[32px] sm:text-[38px] font-extrabold text-[#0F172A] tracking-[-0.02em] leading-[1.15] mb-5">
              Publish Paper
            </h2>

            <p className="text-[14.5px] sm:text-[15.5px] text-slate-500 leading-[1.7] mb-8 max-w-[600px]">
              At MARKO Robotics, we believe the boundary of what is possible is
              constantly expanding. Founded on a philosophy of strict precision
              and tireless innovation, our teams construct high-performance
              intelligent agents, hardware modules, and digital architectures
              that translate complex operations into automated simplicity.
            </p>

            <button
              onClick={openResearchLandingPage}
              className="inline-flex items-center gap-2.5 bg-[#0066FF] hover:bg-[#0052CC] text-white text-[13px] font-semibold px-6 py-3.5 rounded-[8px] transition-colors cursor-pointer whitespace-nowrap shadow-xs"
            >
              <span>Learn More About Us</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
