/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  PRODUCTS,
  PULSE_GALLERY,
  RESEARCH_PAPERS,
  INITIAL_ORDERS,
  INITIAL_MESSAGES,
  INITIAL_HERO_CONFIG,
} from './data/siteData.js';
import {
  fetchAllSiteDataFromSupabase,
  upsertSiteKeyToSupabase,
} from './lib/supabaseClient.js';
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

const DEMO_ORDER_IDS = new Set(['MRK-4092', 'MRK-4091', 'MRK-4090']);
const DEMO_MESSAGE_IDS = new Set(['MSG-101', 'MSG-102']);

function loadFromStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    if (key === 'marko_orders' && Array.isArray(parsed)) {
      return parsed.filter((o) => !DEMO_ORDER_IDS.has(o.id));
    }
    if (key === 'marko_messages' && Array.isArray(parsed)) {
      return parsed.filter((m) => !DEMO_MESSAGE_IDS.has(m.id));
    }
    return parsed;
  } catch {
    return fallback;
  }
}

export default function App() {
  const [activeNav, setActiveNav] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Live Site & Admin Synchronized States
  const [heroConfig, setHeroConfig] = useState(() =>
    loadFromStorage('marko_hero_config', INITIAL_HERO_CONFIG)
  );
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

  // Supabase connection state
  const [supabaseStatus, setSupabaseStatus] = useState({
    connected: false,
    loading: false,
    error: null,
  });
  const isInitialCloudLoad = useRef(true);

  const loadFromSupabase = async () => {
    setSupabaseStatus((prev) => ({ ...prev, loading: true, error: null }));
    const res = await fetchAllSiteDataFromSupabase();
    if (!res.connected) {
      setSupabaseStatus({
        connected: false,
        loading: false,
        error: res.error === 'Not configured' ? null : res.error,
      });
      isInitialCloudLoad.current = false;
      return false;
    }

    const remote = res.data || {};
    isInitialCloudLoad.current = true;
    if (remote.marko_hero_config) setHeroConfig(remote.marko_hero_config);
    if (Array.isArray(remote.marko_products)) setProducts(remote.marko_products);
    if (Array.isArray(remote.marko_orders)) {
      setOrders(remote.marko_orders.filter((o) => !DEMO_ORDER_IDS.has(o.id)));
    }
    if (Array.isArray(remote.marko_papers)) setPapers(remote.marko_papers);
    if (Array.isArray(remote.marko_gallery)) setGallery(remote.marko_gallery);
    if (Array.isArray(remote.marko_messages)) {
      setMessages(
        remote.marko_messages.filter((m) => !DEMO_MESSAGE_IDS.has(m.id))
      );
    }

    setSupabaseStatus({ connected: true, loading: false, error: null });
    setTimeout(() => {
      isInitialCloudLoad.current = false;
    }, 100);
    return true;
  };

  useEffect(() => {
    loadFromSupabase();
  }, []);

  const pushAllDataToSupabase = async () => {
    setSupabaseStatus((prev) => ({ ...prev, loading: true, error: null }));
    const entries = [
      ['marko_hero_config', heroConfig],
      ['marko_products', products],
      ['marko_orders', orders],
      ['marko_papers', papers],
      ['marko_gallery', gallery],
      ['marko_messages', messages],
    ];
    for (const [key, val] of entries) {
      const result = await upsertSiteKeyToSupabase(key, val);
      if (!result.ok) {
        setSupabaseStatus({
          connected: false,
          loading: false,
          error: result.error,
        });
        return { ok: false, error: result.error };
      }
    }
    setSupabaseStatus({ connected: true, loading: false, error: null });
    return { ok: true, error: null };
  };

  // Persist to localStorage & Supabase when connected
  useEffect(() => {
    try {
      localStorage.setItem('marko_hero_config', JSON.stringify(heroConfig));
    } catch {}
    if (!isInitialCloudLoad.current && supabaseStatus.connected) {
      upsertSiteKeyToSupabase('marko_hero_config', heroConfig);
    }
  }, [heroConfig]);

  useEffect(() => {
    try {
      localStorage.setItem('marko_products', JSON.stringify(products));
    } catch {}
    if (!isInitialCloudLoad.current && supabaseStatus.connected) {
      upsertSiteKeyToSupabase('marko_products', products);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('marko_orders', JSON.stringify(orders));
    } catch {}
    if (!isInitialCloudLoad.current && supabaseStatus.connected) {
      upsertSiteKeyToSupabase('marko_orders', orders);
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem('marko_papers', JSON.stringify(papers));
    } catch {}
    if (!isInitialCloudLoad.current && supabaseStatus.connected) {
      upsertSiteKeyToSupabase('marko_papers', papers);
    }
  }, [papers]);

  useEffect(() => {
    try {
      localStorage.setItem('marko_gallery', JSON.stringify(gallery));
    } catch {}
    if (!isInitialCloudLoad.current && supabaseStatus.connected) {
      upsertSiteKeyToSupabase('marko_gallery', gallery);
    }
  }, [gallery]);

  useEffect(() => {
    try {
      localStorage.setItem('marko_messages', JSON.stringify(messages));
    } catch {}
    if (!isInitialCloudLoad.current && supabaseStatus.connected) {
      upsertSiteKeyToSupabase('marko_messages', messages);
    }
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
    setHeroConfig(INITIAL_HERO_CONFIG);
    setProducts(PRODUCTS);
    setOrders(INITIAL_ORDERS);
    setPapers(RESEARCH_PAPERS);
    setGallery(PULSE_GALLERY);
    setMessages(INITIAL_MESSAGES);
    try {
      localStorage.removeItem('marko_hero_config');
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
        heroConfig={heroConfig}
        setHeroConfig={setHeroConfig}
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
        supabaseStatus={supabaseStatus}
        onLoadFromSupabase={loadFromSupabase}
        onPushAllToSupabase={pushAllDataToSupabase}
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
          <HeroSection
            scrollToSection={scrollToSection}
            heroConfig={heroConfig}
          />
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
