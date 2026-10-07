/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  PRODUCTS,
  PULSE_GALLERY,
  RESEARCH_PAPERS,
  INITIAL_ORDERS,
  INITIAL_MESSAGES,
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
import AdminPanel from './components/AdminPanel.jsx';

function loadFromStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export default function App() {
  const [activeNav, setActiveNav] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Live Site & Admin Synchronized States
  const [products, setProducts] = useState(() =>
    loadFromStorage('marko_products', PRODUCTS)
  );
  const [orders, setOrders] = useState(() =>
    loadFromStorage('marko_orders', INITIAL_ORDERS)
  );
  const [papers, setPapers] = useState(() =>
    loadFromStorage('marko_papers', RESEARCH_PAPERS)
  );
  const [gallery, setGallery] = useState(() =>
    loadFromStorage('marko_gallery', PULSE_GALLERY)
  );
  const [messages, setMessages] = useState(() =>
    loadFromStorage('marko_messages', INITIAL_MESSAGES)
  );

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('marko_products', JSON.stringify(products));
    } catch {}
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('marko_orders', JSON.stringify(orders));
    } catch {}
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem('marko_papers', JSON.stringify(papers));
    } catch {}
  }, [papers]);

  useEffect(() => {
    try {
      localStorage.setItem('marko_gallery', JSON.stringify(gallery));
    } catch {}
  }, [gallery]);

  useEffect(() => {
    try {
      localStorage.setItem('marko_messages', JSON.stringify(messages));
    } catch {}
  }, [messages]);

  // Dedicated Page States
  const [activeProductId, setActiveProductId] = useState(null);
  const [activeResearchPage, setActiveResearchPage] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(() => {
    if (typeof window === 'undefined') return false;
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    return path === '/admin' || path.endsWith('/admin') || hash === '#/admin' || hash === '#admin';
  });

  useEffect(() => {
    const checkAdminRoute = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      setIsAdminOpen(
        path === '/admin' || path.endsWith('/admin') || hash === '#/admin' || hash === '#admin'
      );
    };

    window.addEventListener('popstate', checkAdminRoute);
    window.addEventListener('hashchange', checkAdminRoute);
    return () => {
      window.removeEventListener('popstate', checkAdminRoute);
      window.removeEventListener('hashchange', checkAdminRoute);
    };
  }, []);

  // Modal States
  const [showContactModal, setShowContactModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const activeProductPage = activeProductId
    ? products.find((p) => p.id === activeProductId) || null
    : null;

  const openProductLandingPage = (product) => {
    setActiveResearchPage(false);
    setIsAdminOpen(false);
    setActiveProductId(product ? product.id : null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openResearchLandingPage = () => {
    setActiveProductId(null);
    setIsAdminOpen(false);
    setActiveResearchPage(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePlaceOrder = (newOrder) => {
    setOrders((prev) => [newOrder, ...prev]);
  };

  const handleSendMessage = (msgData) => {
    const newMsg = {
      id: `MSG-${Math.floor(110 + Math.random() * 900)}`,
      createdAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
      name: msgData.name,
      email: msgData.email,
      industry: msgData.industry || 'General Inquiry',
      message: msgData.message,
      status: 'Unread',
    };
    setMessages((prev) => [newMsg, ...prev]);
  };

  const handleResetDefaults = () => {
    setProducts(PRODUCTS);
    setOrders(INITIAL_ORDERS);
    setPapers(RESEARCH_PAPERS);
    setGallery(PULSE_GALLERY);
    setMessages(INITIAL_MESSAGES);
    try {
      localStorage.removeItem('marko_products');
      localStorage.removeItem('marko_orders');
      localStorage.removeItem('marko_papers');
      localStorage.removeItem('marko_gallery');
      localStorage.removeItem('marko_messages');
    } catch {}
  };

  const scrollToSection = (sectionId) => {
    setActiveNav(sectionId);
    setMobileMenuOpen(false);

    if (activeProductPage || activeResearchPage || isAdminOpen) {
      setActiveProductId(null);
      setActiveResearchPage(false);
      setIsAdminOpen(false);
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

  if (isAdminOpen) {
    return (
      <AdminPanel
        products={products}
        setProducts={setProducts}
        orders={orders}
        setOrders={setOrders}
        papers={papers}
        setPapers={setPapers}
        gallery={gallery}
        setGallery={setGallery}
        messages={messages}
        setMessages={setMessages}
        onResetDefaults={handleResetDefaults}
        onExitAdmin={() => {
          setIsAdminOpen(false);
          if (typeof window !== 'undefined') {
            window.history.pushState({}, '', '/');
          }
        }}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#0F172A]">
      <Navbar
        activeNav={activeNav}
        activeProductPage={activeProductPage}
        activeResearchPage={activeResearchPage}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        scrollToSection={scrollToSection}
      />

      {activeProductPage ? (
        <ProductLandingPage
          product={activeProductPage}
          allProducts={products}
          onBack={() => setActiveProductId(null)}
          onSelectProduct={openProductLandingPage}
          onPlaceOrder={handlePlaceOrder}
        />
      ) : activeResearchPage ? (
        <ResearchLandingPage
          papers={papers}
          onBack={() => setActiveResearchPage(false)}
        />
      ) : (
        <main className="flex-1">
          <HeroSection scrollToSection={scrollToSection} />
          <ProductSpectrumSection
            products={products}
            openProductLandingPage={openProductLandingPage}
          />
          <AboutSection openResearchLandingPage={openResearchLandingPage} />
          <CompanyPulseSection
            gallery={gallery}
            setSelectedEvent={setSelectedEvent}
            scrollToSection={scrollToSection}
          />
          <CtaSection onSendMessage={handleSendMessage} />
        </main>
      )}

      <Footer
        products={products}
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
