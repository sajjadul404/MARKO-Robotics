import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  X,
  Send,
  Copy,
  Check,
  CheckCircle2,
  ArrowUpRight,
} from 'lucide-react';

export default function ContactModal({ isOpen, onClose }) {
  const [copiedField, setCopiedField] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleCopy = (text, key) => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(text);
    }
    setCopiedField(key);
    setTimeout(() => setCopiedField(''), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) return;
    setSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[880px] rounded-[24px] bg-white border border-slate-200/90 shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close contact modal"
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Left Column: Brand Navy & Electric Blue Contact Info */}
        <div
          className="md:col-span-5 p-7 sm:p-9 text-white flex flex-col justify-between relative overflow-hidden"
          style={{
            background:
              'radial-gradient(circle at 15% 15%, #0066FF 0%, #0E2963 55%, #081021 100%)',
          }}
        >
          <div>
            {/* Mini Brand Header */}
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="w-6 h-6 rounded-[6px] bg-white/15 border border-white/25 flex items-center justify-center">
                <span className="w-2.5 h-2.5 rounded-full border-2 border-white" />
              </span>
              <span className="text-xs font-bold tracking-wider uppercase text-blue-200">
                MARKO Robotics
              </span>
            </div>

            <h2 className="text-2xl sm:text-[26px] font-extrabold tracking-tight leading-snug text-white mb-3">
              Let&apos;s build something epic
            </h2>

            <p className="text-xs sm:text-[13px] text-blue-100/80 leading-relaxed mb-8">
              If you have a project idea, a position opening, or want to chat
              about AI integrations and robotics architectures, reach out
              directly.
            </p>

            {/* Contact Cards */}
            <div className="space-y-3.5">
              {/* Direct Email */}
              <div className="p-3.5 rounded-xl bg-white/[0.08] border border-white/12 hover:bg-white/[0.12] transition-colors flex items-center justify-between gap-3">
                <a
                  href="mailto:sajjaduli724@gmail.com"
                  className="flex items-center gap-3 min-w-0"
                >
                  <div className="w-9 h-9 rounded-lg bg-[#0066FF] text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] font-medium text-blue-200/80">
                      Direct Email
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-white truncate">
                      sajjaduli724@gmail.com
                    </div>
                  </div>
                </a>
                <button
                  type="button"
                  onClick={() =>
                    handleCopy('sajjaduli724@gmail.com', 'email')
                  }
                  title="Copy email"
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-blue-100 cursor-pointer shrink-0"
                >
                  {copiedField === 'email' ? (
                    <Check className="w-3.5 h-3.5 text-emerald-300" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              {/* Phone Hotline */}
              <div className="p-3.5 rounded-xl bg-white/[0.08] border border-white/12 hover:bg-white/[0.12] transition-colors flex items-center justify-between gap-3">
                <a
                  href="tel:01560060092"
                  className="flex items-center gap-3 min-w-0"
                >
                  <div className="w-9 h-9 rounded-lg bg-[#0066FF] text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-medium text-blue-200/80">
                      Phone Hotline
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-white tabular-nums">
                      01560060092
                    </div>
                  </div>
                </a>
                <button
                  type="button"
                  onClick={() => handleCopy('01560060092', 'phone')}
                  title="Copy phone"
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-blue-100 cursor-pointer shrink-0"
                >
                  {copiedField === 'phone' ? (
                    <Check className="w-3.5 h-3.5 text-emerald-300" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              {/* Headquarters */}
              <div className="p-3.5 rounded-xl bg-white/[0.08] border border-white/12 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#0066FF] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-medium text-blue-200/80">
                    Headquarters
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-white">
                    Dhaka, Bangladesh
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Social Bar */}
          <div className="pt-7 mt-7 border-t border-white/15 flex items-center justify-between">
            <span className="text-xs font-medium text-blue-200/80">
              Connect with us
            </span>
            <div className="flex items-center gap-2.5">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[#0066FF] border border-white/15 text-white flex items-center justify-center transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[#0066FF] border border-white/15 text-white flex items-center justify-center transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Clean Message Form */}
        <div className="md:col-span-7 p-7 sm:p-9 bg-white flex flex-col justify-center">
          {submitted ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-extrabold text-[#0F172A]">
                Message Sent Successfully!
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                Thank you, <strong>{formData.name}</strong>. Your message has
                been received and we will get back to you at{' '}
                <strong>{formData.email}</strong> within 24 hours.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: '',
                      email: '',
                      subject: '',
                      message: '',
                    });
                    onClose();
                  }}
                  className="px-6 py-2.5 rounded-lg bg-[#0066FF] hover:bg-[#0052CC] text-white text-xs font-bold cursor-pointer transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#0066FF]">
                  Direct Inquiry
                </span>
                <h3 className="text-xl font-extrabold text-[#0F172A] mt-0.5">
                  Send Us a Message
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Fill out the form below and we&apos;ll respond within 24
                  hours.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Sajjadul Islam"
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 bg-[#F8FAFC] focus:bg-white focus:border-[#0066FF] focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="you@example.com"
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 bg-[#F8FAFC] focus:bg-white focus:border-[#0066FF] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    placeholder="AI Integration / Robotics Project"
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 bg-[#F8FAFC] focus:bg-white focus:border-[#0066FF] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Write your message or project details here..."
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 bg-[#F8FAFC] focus:bg-white focus:border-[#0066FF] focus:outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#0066FF] hover:bg-[#0052CC] text-white text-sm font-bold py-3 rounded-xl transition-colors cursor-pointer shadow-md"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
