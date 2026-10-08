import React, { useState } from 'react';
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  FileText,
  Image as ImageIcon,
  MessageSquare,
  ArrowLeft,
  Plus,
  Trash2,
  Edit3,
  CheckCircle2,
  Clock,
  Truck,
  Search,
  ExternalLink,
  RotateCcw,
  X,
  Save,
  DollarSign,
  Sparkles,
} from 'lucide-react';
import ResilientImage from './ResilientImage.jsx';
import { INITIAL_HERO_CONFIG } from '../data/siteData.js';

export default function AdminPanel({
  heroConfig,
  setHeroConfig,
  products,
  setProducts,
  orders,
  setOrders,
  papers,
  setPapers,
  gallery,
  setGallery,
  messages,
  setMessages,
  onResetDefaults,
  onExitAdmin,
}) {
  const [activeTab, setActiveTab] = useState('overview');
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState('All');

  // Hero Showcase Form State
  const [heroForm, setHeroForm] = useState(() => ({
    ...INITIAL_HERO_CONFIG,
    ...(heroConfig || {}),
  }));
  const [heroSavedToast, setHeroSavedToast] = useState(false);

  const handleSaveHero = (e) => {
    e.preventDefault();
    if (setHeroConfig) {
      setHeroConfig(heroForm);
    }
    setHeroSavedToast(true);
    setTimeout(() => setHeroSavedToast(false), 2500);
  };

  // Product Modal State
  const [editingProduct, setEditingProduct] = useState(null);
  const [isNewProduct, setIsNewProduct] = useState(false);

  // Research Paper Modal State
  const [editingPaper, setEditingPaper] = useState(null);
  const [isNewPaper, setIsNewPaper] = useState(false);

  // Gallery Event Modal State
  const [editingEvent, setEditingEvent] = useState(null);
  const [isNewEvent, setIsNewEvent] = useState(false);

  // Computed KPI Metrics
  const totalRevenue = orders
    .filter((o) => o.status !== 'Cancelled')
    .reduce((sum, o) => sum + (Number(o.totalAmount) || 0), 0);
  const pendingOrdersCount = orders.filter(
    (o) => o.status === 'Pending'
  ).length;
  const unreadMessagesCount = messages.filter(
    (m) => m.status === 'Unread'
  ).length;

  // Filtered Orders
  const filteredOrders = orders.filter((order) => {
    const matchesStatus =
      orderStatusFilter === 'All' || order.status === orderStatusFilter;
    const q = orderSearch.toLowerCase().trim();
    const matchesQuery =
      !q ||
      order.id.toLowerCase().includes(q) ||
      order.fullName.toLowerCase().includes(q) ||
      order.email.toLowerCase().includes(q) ||
      (order.transactionId && order.transactionId.toLowerCase().includes(q)) ||
      order.productTitle.toLowerCase().includes(q);
    return matchesStatus && matchesQuery;
  });

  // Order Status Handler
  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  const handleDeleteOrder = (orderId) => {
    setOrders((prev) => prev.filter((o) => o.id !== orderId));
  };

  // Product Save & Delete
  const openAddProduct = () => {
    setIsNewProduct(true);
    setEditingProduct({
      id: `prod-${Date.now()}`,
      title: '',
      tagline: '',
      price: '$1,000',
      numericPrice: 1000,
      description: '',
      longDescription: '',
      image: '/src/assets/images/product_ai_brain_1791063713710.jpg',
      specsText:
        'Enterprise hardware & software integration\n24/7 autonomous telemetry monitoring\n3-Year MARKO Enterprise SLA',
      metrics: [
        { label: 'System Uptime', value: '99.99%' },
        { label: 'Latency', value: '< 50ms' },
        { label: 'Warranty', value: '3 Years' },
      ],
      tiers: [{ name: 'Standard Edition', price: 1000, summary: 'Full system' }],
      includedItems: [
        'MARKO Core Hardware Unit',
        'Enterprise SDK & API Access',
        'On-Site Calibration & Support',
      ],
    });
  };

  const openEditProduct = (prod) => {
    setIsNewProduct(false);
    setEditingProduct({
      ...prod,
      specsText: (prod.specs || []).join('\n'),
    });
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (!editingProduct.title.trim()) return;
    const numeric =
      Number(String(editingProduct.numericPrice).replace(/[^0-9.]/g, '')) || 0;
    const formattedPrice = `$${numeric.toLocaleString()}`;
    const updatedSpecs = editingProduct.specsText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const finalProduct = {
      ...editingProduct,
      numericPrice: numeric,
      price: formattedPrice,
      specs: updatedSpecs,
      tiers: [
        {
          name: editingProduct.title,
          price: numeric,
          summary: editingProduct.tagline || 'Standard Enterprise Configuration',
        },
      ],
    };
    delete finalProduct.specsText;

    if (isNewProduct) {
      setProducts((prev) => [...prev, finalProduct]);
    } else {
      setProducts((prev) =>
        prev.map((p) => (p.id === finalProduct.id ? finalProduct : p))
      );
    }
    setEditingProduct(null);
  };

  const handleDeleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  // Research Paper Save & Delete
  const openAddPaper = () => {
    setIsNewPaper(true);
    setEditingPaper({
      id: `paper-${Date.now()}`,
      title: '',
      authors: 'MARKO Robotics Research Group',
      date: 'October 2026',
      category: 'Robotics & AI Systems',
      image: '/src/assets/images/about_blueprint_schematic_1791063749796.jpg',
      description: '',
      paperUrl: 'https://arxiv.org/abs/2303.04137',
      findingsText:
        'High-precision closed-loop actuation benchmark verified.\nSub-millisecond safety response under dynamic loads.',
    });
  };

  const openEditPaper = (paper) => {
    setIsNewPaper(false);
    setEditingPaper({
      ...paper,
      findingsText: (paper.keyFindings || []).join('\n'),
    });
  };

  const handleSavePaper = (e) => {
    e.preventDefault();
    if (!editingPaper.title.trim()) return;
    const updatedFindings = editingPaper.findingsText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const finalPaper = {
      ...editingPaper,
      keyFindings: updatedFindings,
    };
    delete finalPaper.findingsText;

    if (isNewPaper) {
      setPapers((prev) => [finalPaper, ...prev]);
    } else {
      setPapers((prev) =>
        prev.map((p) => (p.id === finalPaper.id ? finalPaper : p))
      );
    }
    setEditingPaper(null);
  };

  const handleDeletePaper = (id) => {
    setPapers((prev) => prev.filter((p) => p.id !== id));
  };

  // Gallery Save & Delete
  const openAddEvent = () => {
    setIsNewEvent(true);
    setEditingEvent({
      id: `event-${Date.now()}`,
      title: '',
      category: 'Engineering Showcase',
      date: 'November 2026',
      location: 'Dhaka, Bangladesh',
      image: '/src/assets/images/pulse_robotics_engineers_1791063795254.jpg',
      summary: '',
    });
  };

  const openEditEvent = (ev) => {
    setIsNewEvent(false);
    setEditingEvent({ ...ev });
  };

  const handleSaveEvent = (e) => {
    e.preventDefault();
    if (!editingEvent.title.trim()) return;
    if (isNewEvent) {
      setGallery((prev) => [...prev, editingEvent]);
    } else {
      setGallery((prev) =>
        prev.map((item) => (item.id === editingEvent.id ? editingEvent : item))
      );
    }
    setEditingEvent(null);
  };

  const handleDeleteEvent = (id) => {
    setGallery((prev) => prev.filter((item) => item.id !== id));
  };

  // Messages Handler
  const handleToggleMessageStatus = (id) => {
    setMessages((prev) =>
      prev.map((m) =>
        m.id === id
          ? { ...m, status: m.status === 'Unread' ? 'Resolved' : 'Unread' }
          : m
      )
    );
  };

  const handleDeleteMessage = (id) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
  };

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'hero', label: 'Hero Showcase', icon: Sparkles },
    {
      id: 'orders',
      label: 'Orders & Payments',
      icon: ShoppingBag,
      badge: pendingOrdersCount > 0 ? pendingOrdersCount : null,
    },
    {
      id: 'products',
      label: 'Products & Pricing',
      icon: Package,
      badge: products.length,
    },
    {
      id: 'papers',
      label: 'Research Papers',
      icon: FileText,
      badge: papers.length,
    },
    {
      id: 'gallery',
      label: 'Events Gallery',
      icon: ImageIcon,
      badge: gallery.length,
    },
    {
      id: 'messages',
      label: 'Contact Inquiries',
      icon: MessageSquare,
      badge: unreadMessagesCount > 0 ? unreadMessagesCount : null,
    },
  ];

  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case 'Verified':
      case 'Resolved':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Shipped':
        return 'bg-blue-50 text-[#0066FF] border-blue-200';
      case 'Pending':
      case 'Unread':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Cancelled':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getPaymentBadgeStyle = (method) => {
    if (method === 'bKash')
      return 'bg-[#E2136E]/10 text-[#E2136E] border-[#E2136E]/25';
    if (method === 'Nagad')
      return 'bg-[#ED1C24]/10 text-[#ED1C24] border-[#ED1C24]/25';
    return 'bg-[#1A1F71]/10 text-[#1A1F71] border-[#1A1F71]/25';
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col lg:flex-row">
      {/* Left Sidebar Navigation (260px) */}
      <aside className="w-full lg:w-[260px] bg-[#0B1120] text-white shrink-0 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-800">
        <div>
          {/* Brand Header */}
          <div className="h-20 px-6 flex items-center justify-between border-b border-slate-800/80">
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-[7px] bg-[#0066FF] flex items-center justify-center shrink-0">
                <span className="w-3.5 h-3.5 rounded-full border-2 border-white flex items-center justify-center">
                  <span className="w-1 h-1 rounded-full bg-white" />
                </span>
              </span>
              <div>
                <div className="text-sm font-extrabold tracking-tight text-white leading-none">
                  MARKO <span className="text-[#0066FF]">Admin</span>
                </div>
                <div className="text-[10px] font-medium text-slate-400 mt-1">
                  Control &amp; Operations
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="p-3 space-y-1 flex lg:flex-col overflow-x-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap w-full ${
                    isActive
                      ? 'bg-[#0066FF] text-white shadow-xs'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== null && item.badge !== undefined && (
                    <span
                      className={`px-2 py-0.5 text-[10px] font-bold rounded-md tabular-nums ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-slate-800/80 space-y-2 hidden lg:block">
          <button
            onClick={() => {
              setHeroForm(INITIAL_HERO_CONFIG);
              onResetDefaults();
            }}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-slate-700 hover:bg-slate-800 text-xs font-semibold text-slate-300 cursor-pointer transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Data</span>
          </button>
          <button
            onClick={onExitAdmin}
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-white text-[#0F172A] hover:bg-slate-100 text-xs font-bold cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Live Website</span>
          </button>
        </div>
      </aside>

      {/* Main Content Workspace */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar Contract */}
        <header className="h-20 bg-white border-b border-slate-200 px-6 sm:px-8 flex items-center justify-between gap-4 sticky top-0 z-30">
          <div className="flex items-center gap-2 text-xs sm:text-sm">
            <span className="font-semibold text-slate-400">MARKO Console</span>
            <span className="text-slate-300">/</span>
            <span className="font-extrabold text-[#0F172A]">
              {navItems.find((n) => n.id === activeTab)?.label}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {activeTab === 'products' && (
              <button
                onClick={openAddProduct}
                className="inline-flex items-center gap-1.5 bg-[#0066FF] hover:bg-[#0052CC] text-white text-xs font-bold px-4 py-2 rounded-lg cursor-pointer transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Product</span>
              </button>
            )}
            {activeTab === 'papers' && (
              <button
                onClick={openAddPaper}
                className="inline-flex items-center gap-1.5 bg-[#0066FF] hover:bg-[#0052CC] text-white text-xs font-bold px-4 py-2 rounded-lg cursor-pointer transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Research Paper</span>
              </button>
            )}
            {activeTab === 'gallery' && (
              <button
                onClick={openAddEvent}
                className="inline-flex items-center gap-1.5 bg-[#0066FF] hover:bg-[#0052CC] text-white text-xs font-bold px-4 py-2 rounded-lg cursor-pointer transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Gallery Photo</span>
              </button>
            )}
            <button
              onClick={onExitAdmin}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 cursor-pointer transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>View Live Site</span>
            </button>
          </div>
        </header>

        {/* Main Viewport */}
        <main className="p-6 sm:p-8 flex-1 space-y-8 max-w-[1400px] w-full mx-auto">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <>
              {/* 4 KPI Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-xl bg-white border border-slate-200">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
                    <span>Total Order Revenue</span>
                    <DollarSign className="w-4 h-4 text-[#0066FF]" />
                  </div>
                  <div className="text-2xl font-extrabold text-[#0F172A] tabular-nums">
                    ${totalRevenue.toLocaleString()}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1 tabular-nums">
                    Across {orders.length} total orders
                  </div>
                </div>

                <div
                  onClick={() => setActiveTab('orders')}
                  className="p-5 rounded-xl bg-white border border-slate-200 hover:border-blue-300 cursor-pointer transition-colors"
                >
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
                    <span>Orders &amp; bKash/Nagad</span>
                    <ShoppingBag className="w-4 h-4 text-[#E2136E]" />
                  </div>
                  <div className="text-2xl font-extrabold text-[#0F172A] tabular-nums">
                    {orders.length}
                  </div>
                  <div className="text-[11px] text-amber-600 font-semibold mt-1 tabular-nums">
                    {pendingOrdersCount} pending verification →
                  </div>
                </div>

                <div
                  onClick={() => setActiveTab('products')}
                  className="p-5 rounded-xl bg-white border border-slate-200 hover:border-blue-300 cursor-pointer transition-colors"
                >
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
                    <span>Active Products</span>
                    <Package className="w-4 h-4 text-[#0066FF]" />
                  </div>
                  <div className="text-2xl font-extrabold text-[#0F172A] tabular-nums">
                    {products.length}
                  </div>
                  <div className="text-[11px] text-[#0066FF] font-semibold mt-1">
                    Manage prices &amp; specs →
                  </div>
                </div>

                <div
                  onClick={() => setActiveTab('messages')}
                  className="p-5 rounded-xl bg-white border border-slate-200 hover:border-blue-300 cursor-pointer transition-colors"
                >
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
                    <span>Contact Inquiries</span>
                    <MessageSquare className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="text-2xl font-extrabold text-[#0F172A] tabular-nums">
                    {messages.length}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1 tabular-nums">
                    {unreadMessagesCount} unread inquiries →
                  </div>
                </div>
              </div>

              {/* Hero Showcase Banner Quick Card */}
              <div className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
                <div className="flex items-center gap-4">
                  <div className="w-24 aspect-[4/3] rounded-lg overflow-hidden bg-slate-900 shrink-0 border border-slate-200">
                    <ResilientImage
                      src={heroForm.imageUrl}
                      alt={heroForm.cardTitle}
                      fallbackTitle={heroForm.cardTitle}
                      iconType={heroForm.iconType}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#0066FF] mb-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Homepage Hero Right Showcase Card</span>
                    </div>
                    <h3 className="text-sm sm:text-base font-extrabold text-[#0F172A]">
                      {heroForm.cardTitle}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                      Heading: {heroForm.heading}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('hero')}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#0066FF] hover:bg-[#0052CC] text-white text-xs font-bold cursor-pointer transition-colors shrink-0"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Customize Hero Card</span>
                </button>
              </div>

              {/* Recent Orders Table */}
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                  <div>
                    <h2 className="text-sm font-extrabold text-[#0F172A]">
                      Recent Product Orders (bKash / Nagad / VISA)
                    </h2>
                    <p className="text-xs text-slate-500">
                      Live orders placed from the product landing page checkout
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="text-xs font-bold text-[#0066FF] hover:underline cursor-pointer"
                  >
                    View All Orders →
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50/70 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                        <th className="py-3 px-4">Order ID</th>
                        <th className="py-3 px-4">Customer</th>
                        <th className="py-3 px-4">Product</th>
                        <th className="py-3 px-4">Payment &amp; TrxID</th>
                        <th className="py-3 px-4 text-right">Amount</th>
                        <th className="py-3 px-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 text-xs">
                      {orders.slice(0, 5).map((order) => (
                        <tr key={order.id} className="hover:bg-slate-50/80">
                          <td className="py-3 px-4 font-mono font-bold text-slate-900 tabular-nums">
                            #{order.id}
                          </td>
                          <td className="py-3 px-4">
                            <div className="font-bold text-slate-900">
                              {order.fullName}
                            </div>
                            <div className="text-slate-500 text-[11px]">
                              {order.email}
                            </div>
                          </td>
                          <td className="py-3 px-4 font-semibold text-slate-800">
                            {order.quantity}× {order.productTitle}
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <span
                                className={`px-2 py-0.5 text-[10px] font-extrabold rounded border ${getPaymentBadgeStyle(
                                  order.paymentMethod
                                )}`}
                              >
                                {order.paymentMethod}
                              </span>
                              <span className="font-mono text-[11px] font-semibold text-slate-700 tabular-nums">
                                {order.transactionId || 'N/A'}
                              </span>
                            </div>
                            {order.senderNumber && (
                              <div className="text-[11px] text-slate-400 font-mono tabular-nums mt-0.5">
                                From: {order.senderNumber}
                              </div>
                            )}
                          </td>
                          <td className="py-3 px-4 text-right font-extrabold text-[#0066FF] tabular-nums">
                            ${Number(order.totalAmount).toLocaleString()}
                          </td>
                          <td className="py-3 px-4">
                            <select
                              value={order.status}
                              onChange={(e) =>
                                handleUpdateOrderStatus(
                                  order.id,
                                  e.target.value
                                )
                              }
                              className={`px-2.5 py-1 text-[11px] font-bold rounded-lg border cursor-pointer focus:outline-none ${getStatusBadgeStyle(
                                order.status
                              )}`}
                            >
                              <option value="Pending">Pending</option>
                              <option value="Verified">Verified</option>
                              <option value="Shipped">Shipped</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* TAB: HERO SHOWCASE */}
          {activeTab === 'hero' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Configuration Form */}
              <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                  <div>
                    <h2 className="text-sm font-extrabold text-[#0F172A]">
                      Hero Section &amp; Right Showcase Card
                    </h2>
                    <p className="text-xs text-slate-500">
                      Customize the right-side visual card (SVG Icon, Title, or
                      Custom Image) and Hero text
                    </p>
                  </div>
                  {heroSavedToast && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Saved Live!
                    </span>
                  )}
                </div>

                <form onSubmit={handleSaveHero} className="p-6 space-y-5">
                  <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200/80 space-y-4">
                    <div className="text-xs font-extrabold uppercase tracking-wider text-[#0066FF]">
                      Right-Side Showcase Box Settings
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Showcase Card Title (Displayed below the icon) *
                      </label>
                      <input
                        type="text"
                        required
                        value={heroForm.cardTitle}
                        onChange={(e) =>
                          setHeroForm({
                            ...heroForm,
                            cardTitle: e.target.value,
                          })
                        }
                        placeholder="AEGIS-7 Humanoid Intelligent System"
                        className="w-full px-3.5 py-2 text-sm rounded-lg bg-white border border-slate-300 focus:border-[#0066FF] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Select SVG Icon Style
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                        {[
                          { id: 'hero', label: 'Humanoid Robot' },
                          { id: 'ai-bot', label: 'AI Neural Core' },
                          { id: 'robotics', label: 'Robotic Arm' },
                          { id: 'smart-tech', label: 'Smart IoT Mesh' },
                          { id: 'blueprint', label: 'Tech Blueprint' },
                          { id: 'pulse', label: 'System Pulse' },
                        ].map((opt) => (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() =>
                              setHeroForm({ ...heroForm, iconType: opt.id })
                            }
                            className={`px-3 py-2.5 rounded-lg text-xs font-bold border text-left transition-all cursor-pointer flex items-center justify-between ${
                              heroForm.iconType === opt.id
                                ? 'bg-[#0066FF] text-white border-[#0066FF] shadow-xs'
                                : 'bg-white text-slate-700 border-slate-200 hover:border-blue-300'
                            }`}
                          >
                            <span>{opt.label}</span>
                            {heroForm.iconType === opt.id && (
                              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Custom Image URL (Optional — Leave blank to use SVG Icon)
                      </label>
                      <input
                        type="text"
                        value={heroForm.imageUrl}
                        onChange={(e) =>
                          setHeroForm({
                            ...heroForm,
                            imageUrl: e.target.value,
                          })
                        }
                        placeholder="https://example.com/your-robot-photo.jpg"
                        className="w-full px-3.5 py-2 text-sm rounded-lg bg-white border border-slate-300 focus:border-[#0066FF] focus:outline-none"
                      />
                      <p className="text-[11px] text-slate-500 mt-1">
                        If you paste a direct image link (`https://...`), it will
                        replace the SVG box. Clear it anytime to switch back to
                        the SVG icon.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4 pt-2">
                    <div className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                      Left-Side Hero Headline &amp; Buttons
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Main Headline *
                      </label>
                      <input
                        type="text"
                        required
                        value={heroForm.heading}
                        onChange={(e) =>
                          setHeroForm({ ...heroForm, heading: e.target.value })
                        }
                        className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:border-[#0066FF] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Subheading Description *
                      </label>
                      <textarea
                        rows={3}
                        required
                        value={heroForm.subheading}
                        onChange={(e) =>
                          setHeroForm({
                            ...heroForm,
                            subheading: e.target.value,
                          })
                        }
                        className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:border-[#0066FF] focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Primary Button Text
                        </label>
                        <input
                          type="text"
                          value={heroForm.primaryButtonText}
                          onChange={(e) =>
                            setHeroForm({
                              ...heroForm,
                              primaryButtonText: e.target.value,
                            })
                          }
                          className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:border-[#0066FF] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Secondary Button Text
                        </label>
                        <input
                          type="text"
                          value={heroForm.secondaryButtonText}
                          onChange={(e) =>
                            setHeroForm({
                              ...heroForm,
                              secondaryButtonText: e.target.value,
                            })
                          }
                          className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:border-[#0066FF] focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-200 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setHeroForm(INITIAL_HERO_CONFIG);
                        if (setHeroConfig) setHeroConfig(INITIAL_HERO_CONFIG);
                      }}
                      className="px-4 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-600 cursor-pointer"
                    >
                      Reset Default Hero
                    </button>

                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#0066FF] hover:bg-[#0052CC] text-white text-xs font-bold cursor-pointer shadow-xs transition-colors"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save Hero Changes</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Right Column: Live Interactive Preview */}
              <div className="lg:col-span-5 space-y-4">
                <div className="bg-white rounded-xl border border-slate-200 p-5">
                  <div className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-3">
                    Live Right-Side Showcase Preview
                  </div>
                  <div className="w-full aspect-[4/3.1] rounded-[20px] overflow-hidden bg-slate-900 shadow-lg border border-slate-200/60">
                    <ResilientImage
                      src={heroForm.imageUrl}
                      alt={heroForm.cardTitle}
                      fallbackTitle={heroForm.cardTitle}
                      iconType={heroForm.iconType}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <p className="text-[11px] text-slate-400 mt-3 text-center">
                    This is how the right-side hero card will appear on the
                    homepage.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ORDERS & PAYMENTS */}
          {activeTab === 'orders' && (
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className="p-5 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4">
                <div className="relative flex-1 min-w-[240px] max-w-md">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={orderSearch}
                    onChange={(e) => setOrderSearch(e.target.value)}
                    placeholder="Search by Order ID, Customer, or TrxID..."
                    className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-slate-200 focus:border-[#0066FF] focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-1.5 flex-wrap">
                  {['All', 'Pending', 'Verified', 'Shipped', 'Cancelled'].map(
                    (st) => (
                      <button
                        key={st}
                        onClick={() => setOrderStatusFilter(st)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                          orderStatusFilter === st
                            ? 'bg-[#0066FF] text-white'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {st}
                      </button>
                    )
                  )}
                </div>
              </div>

              {filteredOrders.length === 0 ? (
                <div className="p-12 text-center text-sm text-slate-500">
                  No orders match the current filter.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50/70 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                        <th className="py-3.5 px-4">Order ID &amp; Date</th>
                        <th className="py-3.5 px-4">Customer &amp; Address</th>
                        <th className="py-3.5 px-4">Product</th>
                        <th className="py-3.5 px-4">
                          Payment / Sender / TrxID
                        </th>
                        <th className="py-3.5 px-4 text-right">Total</th>
                        <th className="py-3.5 px-4">Status</th>
                        <th className="py-3.5 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 text-xs">
                      {filteredOrders.map((order) => (
                        <tr key={order.id} className="hover:bg-slate-50/80">
                          <td className="py-3.5 px-4">
                            <div className="font-mono font-bold text-slate-900 tabular-nums">
                              #{order.id}
                            </div>
                            <div className="text-[11px] text-slate-400 tabular-nums">
                              {order.createdAt}
                            </div>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="font-bold text-slate-900">
                              {order.fullName}
                            </div>
                            <div className="text-[11px] text-slate-500">
                              {order.email} · {order.phone || 'No phone'}
                            </div>
                            <div className="text-[11px] text-slate-400 mt-0.5">
                              {order.address}
                            </div>
                          </td>
                          <td className="py-3.5 px-4 font-semibold text-slate-800 tabular-nums">
                            {order.quantity}× {order.productTitle}
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-2">
                              <span
                                className={`px-2 py-0.5 text-[10px] font-extrabold rounded border ${getPaymentBadgeStyle(
                                  order.paymentMethod
                                )}`}
                              >
                                {order.paymentMethod}
                              </span>
                              <span className="font-mono font-bold text-slate-800 tabular-nums">
                                TrxID: {order.transactionId || 'N/A'}
                              </span>
                            </div>
                            {order.senderNumber && (
                              <div className="text-[11px] text-slate-500 font-mono tabular-nums mt-1">
                                Sender: {order.senderNumber}
                              </div>
                            )}
                          </td>
                          <td className="py-3.5 px-4 text-right font-extrabold text-[#0066FF] tabular-nums">
                            ${Number(order.totalAmount).toLocaleString()}
                          </td>
                          <td className="py-3.5 px-4">
                            <select
                              value={order.status}
                              onChange={(e) =>
                                handleUpdateOrderStatus(
                                  order.id,
                                  e.target.value
                                )
                              }
                              className={`px-2.5 py-1 text-[11px] font-bold rounded-lg border cursor-pointer focus:outline-none ${getStatusBadgeStyle(
                                order.status
                              )}`}
                            >
                              <option value="Pending">Pending</option>
                              <option value="Verified">Verified</option>
                              <option value="Shipped">Shipped</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <button
                              onClick={() => handleDeleteOrder(order.id)}
                              title="Delete order"
                              className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: PRODUCTS & PRICING */}
          {activeTab === 'products' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {products.map((prod) => (
                <div
                  key={prod.id}
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    <div className="aspect-[16/10] bg-slate-900 overflow-hidden">
                      <ResilientImage
                        src={prod.image}
                        alt={prod.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-5">
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <h3 className="text-base font-extrabold text-[#0F172A]">
                          {prod.title}
                        </h3>
                        <span className="text-base font-extrabold text-[#0066FF] tabular-nums">
                          {prod.price}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed mb-4 line-clamp-3">
                        {prod.description}
                      </p>
                      <div className="text-[11px] font-semibold text-slate-400">
                        {(prod.specs || []).length} Technical Specifications
                      </div>
                    </div>
                  </div>

                  <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
                    <button
                      onClick={() => openEditProduct(prod)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0066FF] hover:underline cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit Product &amp; Price</span>
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(prod.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 4: RESEARCH PAPERS */}
          {activeTab === 'papers' && (
            <div className="space-y-4">
              {papers.map((paper) => (
                <div
                  key={paper.id}
                  className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5"
                >
                  <div className="flex items-start gap-4 min-w-0">
                    <div className="w-24 aspect-[4/3] rounded-lg overflow-hidden bg-slate-900 shrink-0 hidden sm:block">
                      <ResilientImage
                        src={paper.image}
                        alt={paper.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[11px] font-bold text-[#0066FF] mb-1">
                        {paper.category} · {paper.date}
                      </div>
                      <h3 className="text-sm sm:text-base font-extrabold text-[#0F172A] mb-1">
                        {paper.title}
                      </h3>
                      <p className="text-xs text-slate-500 mb-2">
                        Authors: {paper.authors}
                      </p>
                      <a
                        href={paper.paperUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[#0066FF] hover:underline"
                      >
                        <span>{paper.paperUrl}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                    <button
                      onClick={() => openEditPaper(paper)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDeletePaper(paper.id)}
                      className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 5: EVENTS GALLERY */}
          {activeTab === 'gallery' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {gallery.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    <div className="aspect-[16/10] bg-slate-900 overflow-hidden">
                      <ResilientImage
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-5">
                      <div className="text-[11px] font-bold text-[#0066FF] mb-1">
                        {item.category} · {item.date} · {item.location}
                      </div>
                      <h3 className="text-base font-extrabold text-[#0F172A] mb-1.5">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        {item.summary}
                      </p>
                    </div>
                  </div>
                  <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
                    <button
                      onClick={() => openEditEvent(item)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0066FF] hover:underline cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit Photo Details</span>
                    </button>
                    <button
                      onClick={() => handleDeleteEvent(item.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 6: CONTACT INQUIRIES */}
          {activeTab === 'messages' && (
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200">
                <h2 className="text-sm font-extrabold text-[#0F172A]">
                  Customer Contact &amp; Solution Inquiries
                </h2>
                <p className="text-xs text-slate-500">
                  Submitted via the &ldquo;Discuss Your Robotics &amp; AI
                  Solution Needs&rdquo; form
                </p>
              </div>

              {messages.length === 0 ? (
                <div className="p-12 text-center text-sm text-slate-500">
                  No contact inquiries received yet.
                </div>
              ) : (
                <div className="divide-y divide-slate-200">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className="p-5 flex flex-col sm:flex-row items-start justify-between gap-4 hover:bg-slate-50/70"
                    >
                      <div className="space-y-1.5 max-w-2xl">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <span
                            className={`px-2 py-0.5 text-[10px] font-bold rounded border ${getStatusBadgeStyle(
                              msg.status
                            )}`}
                          >
                            {msg.status}
                          </span>
                          <span className="text-sm font-extrabold text-[#0F172A]">
                            {msg.name}
                          </span>
                          <span className="text-xs text-[#0066FF] font-semibold">
                            {msg.email}
                          </span>
                          {msg.industry && (
                            <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                              {msg.industry}
                            </span>
                          )}
                          <span className="text-[11px] text-slate-400 tabular-nums">
                            {msg.createdAt}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                          {msg.message}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => handleToggleMessageStatus(msg.id)}
                          className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 cursor-pointer"
                        >
                          {msg.status === 'Unread'
                            ? 'Mark Resolved'
                            : 'Mark Unread'}
                        </button>
                        <button
                          onClick={() => handleDeleteMessage(msg.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* PRODUCT EDIT / ADD MODAL */}
      {editingProduct && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setEditingProduct(null)}
        >
          <div
            className="w-full max-w-lg bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
              <h3 className="text-base font-extrabold text-[#0F172A]">
                {isNewProduct ? 'Add New Product' : 'Edit Product & Price'}
              </h3>
              <button
                onClick={() => setEditingProduct(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleSaveProduct} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Product Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProduct.title}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        title: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:border-[#0066FF] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Price (USD) *
                  </label>
                  <input
                    type="number"
                    required
                    value={editingProduct.numericPrice}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        numericPrice: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:border-[#0066FF] focus:outline-none tabular-nums"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Image URL
                </label>
                <input
                  type="text"
                  value={editingProduct.image}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      image: e.target.value,
                    })
                  }
                  className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:border-[#0066FF] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Card Summary Description *
                </label>
                <textarea
                  rows={2}
                  required
                  value={editingProduct.description}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      description: e.target.value,
                    })
                  }
                  className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:border-[#0066FF] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Landing Page Full Description
                </label>
                <textarea
                  rows={3}
                  value={editingProduct.longDescription}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      longDescription: e.target.value,
                    })
                  }
                  className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:border-[#0066FF] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Technical Specifications (1 per line)
                </label>
                <textarea
                  rows={4}
                  value={editingProduct.specsText}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      specsText: e.target.value,
                    })
                  }
                  className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:border-[#0066FF] focus:outline-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-5 py-2 rounded-lg bg-[#0066FF] hover:bg-[#0052CC] text-white text-xs font-bold cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Product</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* RESEARCH PAPER EDIT / ADD MODAL */}
      {editingPaper && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setEditingPaper(null)}
        >
          <div
            className="w-full max-w-lg bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
              <h3 className="text-base font-extrabold text-[#0F172A]">
                {isNewPaper ? 'Add Research Paper' : 'Edit Research Paper'}
              </h3>
              <button
                onClick={() => setEditingPaper(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleSavePaper} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Paper Title *
                </label>
                <input
                  type="text"
                  required
                  value={editingPaper.title}
                  onChange={(e) =>
                    setEditingPaper({ ...editingPaper, title: e.target.value })
                  }
                  className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:border-[#0066FF] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Authors *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingPaper.authors}
                    onChange={(e) =>
                      setEditingPaper({
                        ...editingPaper,
                        authors: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:border-[#0066FF] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    value={editingPaper.category}
                    onChange={(e) =>
                      setEditingPaper({
                        ...editingPaper,
                        category: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:border-[#0066FF] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Publication Date
                  </label>
                  <input
                    type="text"
                    value={editingPaper.date}
                    onChange={(e) =>
                      setEditingPaper({ ...editingPaper, date: e.target.value })
                    }
                    className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:border-[#0066FF] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    External Paper URL (arXiv / DOI) *
                  </label>
                  <input
                    type="url"
                    required
                    value={editingPaper.paperUrl}
                    onChange={(e) =>
                      setEditingPaper({
                        ...editingPaper,
                        paperUrl: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:border-[#0066FF] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Description / Abstract *
                </label>
                <textarea
                  rows={3}
                  required
                  value={editingPaper.description}
                  onChange={(e) =>
                    setEditingPaper({
                      ...editingPaper,
                      description: e.target.value,
                    })
                  }
                  className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:border-[#0066FF] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Key Highlights (1 per line)
                </label>
                <textarea
                  rows={3}
                  value={editingPaper.findingsText}
                  onChange={(e) =>
                    setEditingPaper({
                      ...editingPaper,
                      findingsText: e.target.value,
                    })
                  }
                  className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:border-[#0066FF] focus:outline-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingPaper(null)}
                  className="px-4 py-2 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-5 py-2 rounded-lg bg-[#0066FF] hover:bg-[#0052CC] text-white text-xs font-bold cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Paper</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* GALLERY EVENT EDIT / ADD MODAL */}
      {editingEvent && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setEditingEvent(null)}
        >
          <div
            className="w-full max-w-lg bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
              <h3 className="text-base font-extrabold text-[#0F172A]">
                {isNewEvent ? 'Add Gallery Photo' : 'Edit Gallery Photo'}
              </h3>
              <button
                onClick={() => setEditingEvent(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleSaveEvent} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  value={editingEvent.title}
                  onChange={(e) =>
                    setEditingEvent({ ...editingEvent, title: e.target.value })
                  }
                  className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:border-[#0066FF] focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    value={editingEvent.category}
                    onChange={(e) =>
                      setEditingEvent({
                        ...editingEvent,
                        category: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:border-[#0066FF] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Date
                  </label>
                  <input
                    type="text"
                    value={editingEvent.date}
                    onChange={(e) =>
                      setEditingEvent({ ...editingEvent, date: e.target.value })
                    }
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:border-[#0066FF] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={editingEvent.location}
                    onChange={(e) =>
                      setEditingEvent({
                        ...editingEvent,
                        location: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:border-[#0066FF] focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Image URL *
                </label>
                <input
                  type="text"
                  required
                  value={editingEvent.image}
                  onChange={(e) =>
                    setEditingEvent({ ...editingEvent, image: e.target.value })
                  }
                  className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:border-[#0066FF] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Summary Description *
                </label>
                <textarea
                  rows={3}
                  required
                  value={editingEvent.summary}
                  onChange={(e) =>
                    setEditingEvent({
                      ...editingEvent,
                      summary: e.target.value,
                    })
                  }
                  className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:border-[#0066FF] focus:outline-none"
                />
              </div>
              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingEvent(null)}
                  className="px-4 py-2 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-5 py-2 rounded-lg bg-[#0066FF] hover:bg-[#0052CC] text-white text-xs font-bold cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Photo</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
