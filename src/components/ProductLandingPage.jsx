import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
} from 'lucide-react';
import ResilientImage from './ResilientImage.jsx';

export default function ProductLandingPage({
  product,
  allProducts,
  onBack,
  onSelectProduct,
}) {
  const [selectedTierIndex, setSelectedTierIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderDetails, setOrderDetails] = useState({
    fullName: '',
    email: '',
    company: '',
    phone: '',
    address: '',
    city: '',
    paymentMethod: 'bKash',
  });
  const [orderError, setOrderError] = useState('');

  const activeTier = product.tiers[selectedTierIndex] || product.tiers[0];
  const totalAmount = activeTier ? activeTier.price * quantity : 0;

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    if (
      !orderDetails.fullName.trim() ||
      !orderDetails.email.includes('@') ||
      !orderDetails.address.trim()
    ) {
      setOrderError(
        'Please complete your name, work email, and shipping address.'
      );
      return;
    }
    setOrderError('');
    setOrderConfirmed(true);
  };

  return (
    <main className="flex-1 bg-white">
      {/* Top Breadcrumb / Back Navigation Bar */}
      <div className="border-b border-slate-100 bg-[#F8FAFC]">
        <div className="max-w-[1200px] mx-auto px-6 py-4 flex items-center">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-[#0066FF] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Products</span>
          </button>
        </div>
      </div>

      {/* Product Hero & Contiguous Purchase Module */}
      <section className="max-w-[1200px] mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Sticky Product Visual & Key Metrics */}
          <div className="lg:col-span-6 lg:sticky lg:top-28 space-y-6">
            <div className="w-full aspect-[4/3] rounded-[20px] overflow-hidden bg-slate-900 shadow-lg border border-slate-200/70">
              <ResilientImage
                src={product.image}
                alt={product.title}
                fallbackTitle={product.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Key Performance Metrics Row */}
            <div className="grid grid-cols-3 gap-4">
              {product.metrics.map((m) => (
                <div
                  key={m.label}
                  className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200/70 text-center"
                >
                  <div className="text-lg sm:text-xl font-extrabold text-[#0F172A] tabular-nums">
                    {m.value}
                  </div>
                  <div className="text-[11px] font-medium text-slate-500 mt-0.5">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Trust Guarantees */}
            <div className="pt-2 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#0066FF] shrink-0" />
                <span>3-Year Enterprise SLA</span>
              </div>
            </div>
          </div>

          {/* Right Column: Product Details & Buy Now Module */}
          <div className="lg:col-span-6 flex flex-col">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight mb-4">
              {product.title}
            </h1>

            {/* Price Display */}
            <div className="flex items-baseline gap-3 pb-6 mb-6 border-b border-slate-200">
              <span className="text-3xl sm:text-4xl font-extrabold text-[#0066FF] tabular-nums">
                ${totalAmount.toLocaleString()}
              </span>
            </div>

            <p className="text-[15px] text-slate-600 leading-[1.7] mb-8">
              {product.longDescription}
            </p>

            {/* Configuration / Edition Selector */}
            <div className="mb-6">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
                Select Configuration
              </label>
              <div className="grid grid-cols-1 gap-3">
                {product.tiers.map((tier, idx) => {
                  const isSelected = selectedTierIndex === idx;
                  return (
                    <button
                      key={tier.name}
                      type="button"
                      onClick={() => setSelectedTierIndex(idx)}
                      className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                        isSelected
                          ? 'border-[#0066FF] bg-[#0066FF]/[0.04] shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div>
                        <div className="text-sm font-bold text-[#0F172A]">
                          {tier.name}
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5">
                          {tier.summary}
                        </div>
                      </div>
                      <div className="text-base font-extrabold text-[#0066FF] tabular-nums shrink-0">
                        ${tier.price.toLocaleString()}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity & Primary Buy Now Action */}
            {!showCheckoutForm && !orderConfirmed && (
              <div className="mb-10">
                <div className="flex flex-wrap items-center gap-4">
                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-slate-300 rounded-lg bg-white h-12">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      aria-label="Decrease quantity"
                      className="px-3.5 h-full text-slate-600 hover:text-slate-900 cursor-pointer"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 text-sm font-bold text-slate-900 tabular-nums">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => q + 1)}
                      aria-label="Increase quantity"
                      className="px-3.5 h-full text-slate-600 hover:text-slate-900 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Buy Now CTA */}
                  <button
                    type="button"
                    onClick={() => setShowCheckoutForm(true)}
                    className="flex-1 inline-flex items-center justify-center gap-2.5 bg-[#0066FF] hover:bg-[#0052CC] text-white text-sm font-bold px-8 h-12 rounded-lg transition-colors cursor-pointer shadow-md whitespace-nowrap"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Buy Now — ${totalAmount.toLocaleString()}</span>
                  </button>
                </div>
              </div>
            )}

            {/* Inline Instant Checkout Form when Buy Now is clicked */}
            {showCheckoutForm && !orderConfirmed && (
              <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-blue-200 mb-10">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#0066FF]">
                      Direct Order Checkout
                    </span>
                    <h3 className="text-lg font-extrabold text-slate-900">
                      Complete Your Purchase
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowCheckoutForm(false)}
                    className="text-xs font-semibold text-slate-500 hover:text-slate-800 cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>

                {orderError && (
                  <div className="p-3 mb-4 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700">
                    {orderError}
                  </div>
                )}

                <form onSubmit={handleOrderSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={orderDetails.fullName}
                        onChange={(e) =>
                          setOrderDetails({
                            ...orderDetails,
                            fullName: e.target.value,
                          })
                        }
                        placeholder="Alex Mercer"
                        className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 bg-white focus:border-[#0066FF] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={orderDetails.email}
                        onChange={(e) =>
                          setOrderDetails({
                            ...orderDetails,
                            email: e.target.value,
                          })
                        }
                        placeholder="alex@company.com"
                        className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 bg-white focus:border-[#0066FF] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Company / Organization
                      </label>
                      <input
                        type="text"
                        value={orderDetails.company}
                        onChange={(e) =>
                          setOrderDetails({
                            ...orderDetails,
                            company: e.target.value,
                          })
                        }
                        placeholder="Apex Industrial Labs"
                        className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 bg-white focus:border-[#0066FF] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={orderDetails.phone}
                        onChange={(e) =>
                          setOrderDetails({
                            ...orderDetails,
                            phone: e.target.value,
                          })
                        }
                        placeholder="+1 (555) 234-5678"
                        className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 bg-white focus:border-[#0066FF] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Shipping / Facility Address *
                    </label>
                    <input
                      type="text"
                      required
                      value={orderDetails.address}
                      onChange={(e) =>
                        setOrderDetails({
                          ...orderDetails,
                          address: e.target.value,
                        })
                      }
                      placeholder="450 Automation Parkway, Suite 200, San Jose, CA"
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 bg-white focus:border-[#0066FF] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-2">
                      Payment Method
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {/* bKash Option */}
                      <button
                        type="button"
                        onClick={() =>
                          setOrderDetails({
                            ...orderDetails,
                            paymentMethod: 'bKash',
                          })
                        }
                        className={`flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl border transition-all cursor-pointer bg-white ${
                          orderDetails.paymentMethod === 'bKash'
                            ? 'border-[#E2136E] ring-2 ring-[#E2136E]/15 shadow-xs'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="w-9 h-9 rounded-lg bg-[#E2136E] flex items-center justify-center shrink-0">
                          <svg
                            viewBox="0 0 64 64"
                            className="w-6 h-6"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <polygon
                              points="10,10 30,13 25,31"
                              fill="#FFFFFF"
                            />
                            <polygon
                              points="31,13 46,34 26,31"
                              fill="#FFFFFF"
                            />
                            <polygon
                              points="26,32 46,35 28,44"
                              fill="#FFFFFF"
                            />
                            <polygon
                              points="25,32 28,46 19,54"
                              fill="#FFFFFF"
                            />
                            <polygon
                              points="41,25 51,23 47,34"
                              fill="#FFFFFF"
                            />
                            <polygon
                              points="52,23 57,28 50,28"
                              fill="#FFFFFF"
                            />
                          </svg>
                        </div>
                        <span className="text-xs font-bold text-slate-800">
                          bKash
                        </span>
                      </button>

                      {/* Nagad Option */}
                      <button
                        type="button"
                        onClick={() =>
                          setOrderDetails({
                            ...orderDetails,
                            paymentMethod: 'Nagad',
                          })
                        }
                        className={`flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl border transition-all cursor-pointer bg-white ${
                          orderDetails.paymentMethod === 'Nagad'
                            ? 'border-[#ED1C24] ring-2 ring-[#ED1C24]/15 shadow-xs'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="h-9 flex items-center justify-center gap-1.5 shrink-0">
                          <svg
                            viewBox="0 0 48 48"
                            className="w-8 h-8"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle
                              cx="24"
                              cy="26"
                              r="15"
                              stroke="#ED1C24"
                              strokeWidth="4"
                            />
                            <circle
                              cx="24"
                              cy="26"
                              r="11.5"
                              stroke="#F7941D"
                              strokeWidth="4"
                            />
                            <path
                              d="M14 22C15 13 22 9 29 10L26 17C21 16 17 19 14 22Z"
                              fill="#F7941D"
                            />
                            <path
                              d="M22 14C26 10 32 10 36 13L33 19C29 17 25 17 22 14Z"
                              fill="#ED1C24"
                            />
                            <path
                              d="M27 18C32 16 38 17 41 21L36 26C33 23 30 21 27 18Z"
                              fill="#F7941D"
                            />
                          </svg>
                          <span className="text-sm font-extrabold text-[#ED1C24] leading-none">
                            নগদ
                          </span>
                        </div>
                        <span className="text-xs font-bold text-slate-800">
                          Nagad
                        </span>
                      </button>

                      {/* VISA Option */}
                      <button
                        type="button"
                        onClick={() =>
                          setOrderDetails({
                            ...orderDetails,
                            paymentMethod: 'VISA',
                          })
                        }
                        className={`flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl border transition-all cursor-pointer bg-white ${
                          orderDetails.paymentMethod === 'VISA'
                            ? 'border-[#1A1F71] ring-2 ring-[#1A1F71]/15 shadow-xs'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="h-9 flex flex-col items-center justify-center shrink-0">
                          <span className="text-[13px] font-black italic tracking-wider text-[#1A1F71] leading-none">
                            VISA
                          </span>
                          <div className="flex items-center -space-x-1.5 mt-1">
                            <span className="w-3.5 h-3.5 rounded-full bg-[#EB001B] inline-block" />
                            <span className="w-3.5 h-3.5 rounded-full bg-[#F79E1B]/90 inline-block" />
                          </div>
                        </div>
                        <span className="text-xs font-bold text-slate-800">
                          VISA
                        </span>
                      </button>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-sm">
                    <span className="font-semibold text-slate-600">
                      Order Total ({quantity} × {activeTier?.name}):
                    </span>
                    <span className="text-lg font-extrabold text-[#0066FF] tabular-nums">
                      ${totalAmount.toLocaleString()}
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#0066FF] hover:bg-[#0052CC] text-white text-sm font-bold py-3.5 rounded-lg transition-colors cursor-pointer shadow-sm"
                  >
                    <span>
                      Confirm & Place Order — ${totalAmount.toLocaleString()}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </div>
            )}

            {/* Order Confirmation Receipt */}
            {orderConfirmed && (
              <div className="p-6 rounded-2xl bg-emerald-50/90 border border-emerald-200 mb-10 space-y-3">
                <div className="flex items-center gap-2.5 text-emerald-800">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                  <h3 className="text-lg font-extrabold">
                    Order #MRK-4092 Confirmed
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-emerald-900/80 leading-relaxed">
                  Thank you, <strong>{orderDetails.fullName}</strong>. Your
                  order for{' '}
                  <strong>
                    {quantity}× {product.title} ({activeTier?.name})
                  </strong>{' '}
                  totaling <strong>${totalAmount.toLocaleString()}</strong> has
                  been registered. Dispatch & calibration instructions have been
                  sent to <strong>{orderDetails.email}</strong>.
                </p>
                <div className="pt-2 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setOrderConfirmed(false);
                      setShowCheckoutForm(false);
                    }}
                    className="px-4 py-2 rounded-lg bg-emerald-700 text-white text-xs font-semibold hover:bg-emerald-800 cursor-pointer"
                  >
                    Modify or Place Another Order
                  </button>
                  <button
                    type="button"
                    onClick={onBack}
                    className="px-4 py-2 rounded-lg bg-white border border-emerald-300 text-emerald-800 text-xs font-semibold hover:bg-emerald-100 cursor-pointer"
                  >
                    Return to Homepage
                  </button>
                </div>
              </div>
            )}

            {/* Technical Specifications List */}
            <div className="border-t border-slate-200 pt-7 mb-8">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
                Technical Specifications
              </h2>
              <ul className="grid grid-cols-1 gap-3">
                {product.specs.map((spec) => (
                  <li
                    key={spec}
                    className="flex items-start gap-2.5 text-sm text-slate-700"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#0066FF] shrink-0 mt-0.5" />
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* What's in the Box / Package */}
            <div className="border-t border-slate-200 pt-7">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
                Included in Deployment Package
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.includedItems.map((item) => (
                  <li
                    key={item}
                    className="p-3 rounded-lg bg-[#F8FAFC] border border-slate-200/70 text-xs font-semibold text-slate-700"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Other Products Cross-Navigation */}
      <section className="bg-[#F8FAFC] py-16 border-t border-slate-200/70">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-extrabold text-[#0F172A]">
              Explore Other MARKO Systems
            </h2>
            <button
              onClick={onBack}
              className="text-xs font-semibold text-[#0066FF] hover:underline cursor-pointer"
            >
              View Full Catalog →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {allProducts
              .filter((p) => p.id !== product.id)
              .map((other) => (
                <div
                  key={other.id}
                  onClick={() => {
                    setSelectedTierIndex(0);
                    setQuantity(1);
                    setShowCheckoutForm(false);
                    setOrderConfirmed(false);
                    onSelectProduct(other);
                  }}
                  className="group bg-white rounded-2xl border border-slate-200/80 p-5 flex flex-col sm:flex-row items-center gap-5 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer"
                >
                  <div className="w-full sm:w-40 aspect-[16/10] rounded-xl overflow-hidden bg-slate-900 shrink-0">
                    <ResilientImage
                      src={other.image}
                      alt={other.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h3 className="text-base font-bold text-[#0F172A]">
                        {other.title}
                      </h3>
                      <span className="text-sm font-extrabold text-[#0066FF] tabular-nums">
                        {other.price}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-2 mb-3">
                      {other.description}
                    </p>
                    <span className="text-xs font-semibold text-[#0066FF] inline-flex items-center gap-1">
                      View Product & Buy <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </main>
  );
}
