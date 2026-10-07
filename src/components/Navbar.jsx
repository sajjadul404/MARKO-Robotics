import React from 'react';
import { ArrowRight, Menu } from 'lucide-react';

export default function Navbar({
  activeNav,
  activeProductPage,
  activeResearchPage,
  mobileMenuOpen,
  setMobileMenuOpen,
  scrollToSection,
}) {
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'products', label: 'Products' },
    { id: 'events', label: 'Events' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-[1200px] mx-auto px-6 h-20 flex items-center justify-between">
        {/* Zone 1: Brand Mark */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('home');
          }}
          className="flex items-center gap-2.5 text-[17px] tracking-tight whitespace-nowrap focus-visible:outline-2 focus-visible:outline-[#0066FF]"
        >
          <span className="w-7 h-7 rounded-[7px] bg-[#0066FF] flex items-center justify-center shrink-0 shadow-xs">
            <span className="w-3.5 h-3.5 rounded-full border-2 border-white flex items-center justify-center">
              <span className="w-1 h-1 rounded-full bg-white" />
            </span>
          </span>
          <span>
            <strong className="font-extrabold text-[#0F172A]">MARKO</strong>{' '}
            <span className="font-medium text-[#0066FF]">Robotics</span>
          </span>
        </a>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-[13px] font-medium">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(item.id);
              }}
              className={`transition-colors whitespace-nowrap py-1 ${
                activeNav === item.id &&
                !activeProductPage &&
                !activeResearchPage
                  ? 'text-[#0066FF] font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Primary Action */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => scrollToSection('products')}
            className="hidden sm:inline-flex items-center gap-2 bg-[#0066FF] hover:bg-[#0052CC] text-white text-[13px] font-semibold px-5 py-2.5 rounded-[8px] transition-colors cursor-pointer whitespace-nowrap shadow-xs"
          >
            <span>Explore Products</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-6 py-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="block w-full text-left py-2 text-sm font-medium text-slate-700 hover:text-[#0066FF]"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
