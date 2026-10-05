/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  PRODUCTS,
  PULSE_GALLERY,
  RESEARCH_PAPERS,
} from './data/siteData.js';
import Navbar from './components/Navbar.jsx';
import HeroSection from './components/HeroSection.jsx';
import ProductSpectrumSection from './components/ProductSpectrumSection.jsx';
import AboutSection from './components/AboutSection.jsx';
import CompanyPulseSection from './components/CompanyPulseSection.jsx';
import CtaSection from './components/CtaSection.jsx';
import Footer from './components/Footer.jsx';
import ProductLandingPage from './components/ProductLandingPage.jsx';
import ResearchLandingPage from './components/ResearchLandingPage.jsx';
import PhotoPreviewModal from './components/PhotoPreviewModal.jsx';
import ContactModal from './components/ContactModal.jsx';

export default function App() {
  const [activeNav, setActiveNav] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Dedicated Page States
  const [activeProductPage, setActiveProductPage] = useState(null);
  const [activeResearchPage, setActiveResearchPage] = useState(false);

  // Modal States
  const [showContactModal, setShowContactModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const openProductLandingPage = (product) => {
    setActiveResearchPage(false);
    setActiveProductPage(product);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openResearchLandingPage = () => {
    setActiveProductPage(null);
    setActiveResearchPage(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId) => {
    setActiveNav(sectionId);
    setMobileMenuOpen(false);

    if (activeProductPage || activeResearchPage) {
      setActiveProductPage(null);
      setActiveResearchPage(false);
      setTimeout(() => {
        if (sectionId === 'contact') {
          document
            .getElementById('cta-section')
            ?.scrollIntoView({ behavior: 'smooth' });
          return;
        }
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        else window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 40);
      return;
    }

    if (sectionId === 'contact') {
      const el = document.getElementById('cta-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#0F172A]">
      <Navbar
        activeNav={activeNav}
        activeProductPage={activeProductPage}
        activeResearchPage={activeResearchPage}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        scrollToSection={scrollToSection}
        setShowContactModal={setShowContactModal}
      />

      {activeProductPage ? (
        <ProductLandingPage
          product={activeProductPage}
          allProducts={PRODUCTS}
          onBack={() => setActiveProductPage(null)}
          onSelectProduct={openProductLandingPage}
        />
      ) : activeResearchPage ? (
        <ResearchLandingPage
          papers={RESEARCH_PAPERS}
          onBack={() => setActiveResearchPage(false)}
        />
      ) : (
        <main className="flex-1">
          <HeroSection scrollToSection={scrollToSection} />
          <ProductSpectrumSection
            products={PRODUCTS}
            openProductLandingPage={openProductLandingPage}
          />
          <AboutSection openResearchLandingPage={openResearchLandingPage} />
          <CompanyPulseSection
            gallery={PULSE_GALLERY}
            setSelectedEvent={setSelectedEvent}
            scrollToSection={scrollToSection}
          />
          <CtaSection setShowContactModal={setShowContactModal} />
        </main>
      )}

      <Footer
        products={PRODUCTS}
        scrollToSection={scrollToSection}
        openProductLandingPage={openProductLandingPage}
        openResearchLandingPage={openResearchLandingPage}
        setShowContactModal={setShowContactModal}
      />

      <PhotoPreviewModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />

      <ContactModal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
      />
    </div>
  );
}
