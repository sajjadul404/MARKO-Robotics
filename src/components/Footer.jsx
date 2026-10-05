import React from 'react';

export default function Footer({
  products,
  scrollToSection,
  openProductLandingPage,
  openResearchLandingPage,
  setShowContactModal,
}) {
  return (
    <footer className="bg-[#080F1E] text-slate-400 pt-16 pb-12 border-t border-slate-800/80">
      <div className="max-w-[1160px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-14 border-b border-slate-800/80">
          {/* Brand Column */}
          <div className="lg:col-span-4 pr-4">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('home');
              }}
              className="inline-flex items-center gap-2.5 text-[16px] tracking-tight mb-4 whitespace-nowrap"
            >
              <span className="w-6 h-6 rounded-[6px] bg-[#0066FF] flex items-center justify-center shrink-0">
                <span className="w-3 h-3 rounded-full border-2 border-white flex items-center justify-center">
                  <span className="w-1 h-1 rounded-full bg-white" />
                </span>
              </span>
              <span>
                <strong className="font-extrabold text-white">MARKO</strong>{' '}
                <span className="font-medium text-[#0066FF]">Robotics</span>
              </span>
            </a>

            <p className="text-[12.5px] text-slate-400 leading-[1.65] max-w-[290px]">
              Developing and deploying innovative intelligent modules, robotic
              components, and connected smart hardware solutions for global
              enterprises.
            </p>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 lg:col-start-6">
            <h3 className="text-[12.5px] font-bold text-white tracking-wide mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-[12.5px]">
              {[
                { label: 'Home', action: () => scrollToSection('home') },
                { label: 'About', action: () => scrollToSection('about') },
                { label: 'Events', action: () => scrollToSection('events') },
                { label: 'Careers', action: () => setShowContactModal(true) },
                { label: 'Press', action: openResearchLandingPage },
              ].map((link) => (
                <li key={link.label}>
                  <button
                    onClick={link.action}
                    className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div className="lg:col-span-3">
            <h3 className="text-[12.5px] font-bold text-white tracking-wide mb-4">
              Products
            </h3>
            <ul className="space-y-2.5 text-[12.5px]">
              <li>
                <button
                  onClick={() => openProductLandingPage(products[0])}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  AI Bot Platform
                </button>
              </li>
              <li>
                <button
                  onClick={() => openProductLandingPage(products[1])}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  Automation Arms
                </button>
              </li>
              <li>
                <button
                  onClick={() => openProductLandingPage(products[2])}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  IoT Spatial Nodes
                </button>
              </li>
              <li>
                <button
                  onClick={() => setShowContactModal(true)}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  Consulting Suites
                </button>
              </li>
            </ul>
          </div>

          {/* Global Headquarters */}
          <div className="lg:col-span-2">
            <h3 className="text-[12.5px] font-bold text-white tracking-wide mb-4">
              Global Headquarters
            </h3>
            <p className="text-[12.5px] text-slate-400 leading-[1.6] mb-3">
              100 Innovation Way, Suite 400
              <br />
              Silicon Valley, CA 94016
            </p>
            <a
              href="mailto:contact@markorobotics.com"
              onClick={(e) => {
                e.preventDefault();
                setShowContactModal(true);
              }}
              className="text-[12.5px] text-slate-400 hover:text-white transition-colors"
            >
              contact@markorobotics.com
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11.5px] text-slate-500">
            © 2026 MARKO Robotics. All rights reserved.
          </p>

          <div className="flex items-center gap-3">
            {/* LinkedIn */}
            <button
              onClick={() => setShowContactModal(true)}
              aria-label="LinkedIn"
              className="w-7 h-7 rounded-full bg-slate-800/90 hover:bg-[#0066FF] text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <svg
                className="w-3.5 h-3.5 fill-current"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
              </svg>
            </button>

            {/* Twitter */}
            <button
              onClick={() => setShowContactModal(true)}
              aria-label="Twitter"
              className="w-7 h-7 rounded-full bg-slate-800/90 hover:bg-[#0066FF] text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <svg
                className="w-3.5 h-3.5 fill-current"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
              </svg>
            </button>

            {/* Facebook */}
            <button
              onClick={() => setShowContactModal(true)}
              aria-label="Facebook"
              className="w-7 h-7 rounded-full bg-slate-800/90 hover:bg-[#0066FF] text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <svg
                className="w-3.5 h-3.5 fill-current"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z" />
              </svg>
            </button>

            {/* YouTube */}
            <button
              onClick={() => setShowContactModal(true)}
              aria-label="YouTube"
              className="w-7 h-7 rounded-full bg-slate-800/90 hover:bg-[#0066FF] text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <svg
                className="w-3.5 h-3.5 fill-current"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
