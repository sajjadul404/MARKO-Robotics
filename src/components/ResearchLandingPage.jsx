import React from 'react';
import { ArrowLeft, CheckCircle2, ExternalLink } from 'lucide-react';
import ResilientImage from './ResilientImage.jsx';

export default function ResearchLandingPage({ papers, onBack }) {
  return (
    <main className="flex-1 bg-white">
      {/* Top Back Bar */}
      <div className="border-b border-slate-100 bg-[#F8FAFC]">
        <div className="max-w-[1200px] mx-auto px-6 py-4 flex items-center">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-[#0066FF] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>
        </div>
      </div>

      {/* Research Header Banner */}
      <section className="max-w-[1200px] mx-auto px-6 pt-12 pb-10 border-b border-slate-100">
        <p className="text-[11px] font-bold tracking-[0.08em] uppercase text-[#0066FF] mb-2.5">
          MARKO ROBOTICS RESEARCH & PUBLICATIONS
        </p>
        <h1
          className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#0F172A] tracking-[-0.02em] leading-[1.12] mb-4"
          style={{ textWrap: 'balance' }}
        >
          Published Research Papers & Technical Schematics
        </h1>
        <p className="text-[15px] sm:text-[16px] text-slate-500 leading-[1.65] max-w-2xl">
          Explore peer-reviewed publications, hardware architectures, and
          experimental benchmarks authored by the engineering and AI research
          teams at MARKO Robotics.
        </p>
      </section>

      {/* Research Papers List */}
      <section className="max-w-[1200px] mx-auto px-6 py-12 md:py-16 space-y-10">
        {papers.map((paper, index) => (
          <article
            key={paper.id}
            className="rounded-[20px] border border-slate-200/80 bg-white p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:border-blue-200 transition-all"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Paper Visual / Schematic */}
              <div className="lg:col-span-5">
                <div className="w-full aspect-[4/3] rounded-[14px] overflow-hidden bg-[#0B2545] border border-slate-200/60">
                  <ResilientImage
                    src={paper.image}
                    alt={paper.title}
                    fallbackTitle={paper.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Paper Name, Metadata & Description */}
              <div className="lg:col-span-7 flex flex-col items-start">
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#0066FF] mb-2">
                  <span>Paper 0{index + 1}</span>
                  <span>·</span>
                  <span>{paper.category}</span>
                  <span>·</span>
                  <span className="text-slate-500 font-medium">
                    {paper.date}
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-extrabold text-[#0F172A] leading-snug mb-2.5">
                  {paper.title}
                </h2>

                <p className="text-xs font-semibold text-slate-500 mb-4">
                  Authors:{' '}
                  <span className="text-slate-700">{paper.authors}</span>
                </p>

                <p className="text-sm sm:text-[15px] text-slate-600 leading-[1.7] mb-6">
                  {paper.description}
                </p>

                {/* Key Findings Box */}
                <div className="w-full p-4 rounded-xl bg-[#F8FAFC] border border-slate-200/70 mb-6">
                  <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2.5">
                    Key Research Highlights
                  </h3>
                  <ul className="space-y-2">
                    {paper.keyFindings.map((finding) => (
                      <li
                        key={finding}
                        className="flex items-start gap-2 text-xs sm:text-[13px] text-slate-700"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#0066FF] shrink-0 mt-0.5" />
                        <span>{finding}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Direct Link to Real Paper */}
                <a
                  href={paper.paperUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#0066FF] hover:bg-[#0052CC] text-white text-xs font-semibold px-5 py-3 rounded-[8px] transition-colors shadow-xs whitespace-nowrap"
                >
                  <span>Read Full Paper</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
