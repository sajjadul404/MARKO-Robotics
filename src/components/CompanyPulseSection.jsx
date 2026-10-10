import React from 'react';
import ResilientImage from './ResilientImage.jsx';

export default function CompanyPulseSection({ gallery }) {
  return (
    <section id="events" className="pt-24 pb-16 md:pt-28 md:pb-20">
      <div className="max-w-[1200px] mx-auto px-6 text-center mb-12">
        <p className="text-[11px] font-bold tracking-[0.08em] uppercase text-[#0066FF] mb-2.5">
          COMPANY PULSE
        </p>
        <h2
          className="text-[30px] sm:text-[38px] font-extrabold text-[#0F172A] tracking-[-0.02em] leading-[1.15]"
          style={{ textWrap: 'balance' }}
        >
          Inside MARKO Robotics
        </h2>
      </div>

      {/* 2x2 Wide Photo Grid */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {gallery.map((item) => (
            <div
              key={item.id}
              className="group relative w-full aspect-[16/7.6] rounded-[14px] overflow-hidden bg-slate-900 shadow-xs"
            >
              <ResilientImage
                src={item.image}
                alt={item.title}
                fallbackTitle={item.title}
                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-end p-6 text-left">
                <div className="text-[11px] font-medium text-blue-300 mb-1">
                  {item.category} · {item.location} · {item.date}
                </div>
                <h3 className="text-white text-base font-bold">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
