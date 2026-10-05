import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function CtaSection({ setShowContactModal }) {
  return (
    <section
      id="cta-section"
      className="max-w-[1160px] mx-auto px-6 pt-6 pb-24 md:pb-28"
    >
      <div
        className="relative rounded-[22px] overflow-hidden px-6 py-16 sm:py-20 md:py-24 text-center shadow-xl"
        style={{
          background:
            'radial-gradient(circle at 50% 35%, #163C7E 0%, #0D1B35 55%, #091122 100%)',
        }}
      >
        <div className="relative z-10 max-w-xl mx-auto">
          <h2
            className="text-[30px] sm:text-[40px] font-extrabold text-white tracking-[-0.02em] leading-[1.15] mb-4"
            style={{ textWrap: 'balance' }}
          >
            Let’s Build What’s Possible
          </h2>

          <p className="text-[14px] sm:text-[15px] text-slate-300/90 leading-[1.6] mb-8 font-normal">
            Connect with our engineering consulting team or deploy product
            suites in minutes.
          </p>

          <button
            onClick={() => setShowContactModal(true)}
            className="inline-flex items-center gap-2.5 bg-[#0066FF] hover:bg-[#0052CC] text-white text-[13px] font-semibold px-6 py-3.5 rounded-[8px] transition-colors cursor-pointer whitespace-nowrap shadow-md"
          >
            <span>Explore Our Products</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
