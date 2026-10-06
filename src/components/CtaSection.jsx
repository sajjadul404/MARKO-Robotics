import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
} from 'lucide-react';

export default function CtaSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    industry: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) return;
    setSubmitted(true);
  };

  return (
    <section
      id="cta-section"
      className="max-w-[1160px] mx-auto px-6 pt-6 pb-24 md:pb-28"
    >
      <div
        id="contact"
        className="w-full rounded-[28px] bg-[#F7F8FA] border border-slate-200/80 px-6 py-12 sm:px-14 sm:py-16 shadow-sm text-[#0F172A]"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Editorial Heading & Direct Contact Info */}
          <div className="md:col-span-6 lg:pr-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400 mb-3">
              WE&apos;RE HERE TO HELP YOU
            </p>

            <h2 className="text-[32px] sm:text-[42px] leading-[1.18] tracking-[-0.02em] text-[#0F172A] mb-5">
              <span className="font-extrabold">Discuss</span>{' '}
              <span className="font-normal">Your</span>
              <br />
              <span className="font-normal">Robotics &amp; AI</span>
              <br />
              <span className="font-normal">Solution Needs</span>
            </h2>

            <p className="text-[13.5px] sm:text-[14px] text-slate-500 leading-[1.65] max-w-[370px] mb-9">
              Are you looking for top-quality AI and robotics solutions tailored
              to your needs? Reach out to us.
            </p>

            {/* Contact Info Rows */}
            <div className="space-y-5">
              {/* E-mail */}
              <a
                href="mailto:sajjaduli724@gmail.com"
                className="flex items-center gap-4 group"
              >
                <div className="w-10 h-10 rounded-lg bg-[#0066FF]/10 text-[#0066FF] flex items-center justify-center shrink-0 group-hover:bg-[#0066FF] group-hover:text-white transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11.5px] text-slate-400 font-medium">
                    E-mail
                  </div>
                  <div className="text-[14.5px] font-semibold text-slate-800 group-hover:text-[#0066FF] transition-colors">
                    sajjaduli724@gmail.com
                  </div>
                </div>
              </a>

              {/* Phone number */}
              <a
                href="tel:01560060092"
                className="flex items-center gap-4 group"
              >
                <div className="w-10 h-10 rounded-lg bg-[#0066FF]/10 text-[#0066FF] flex items-center justify-center shrink-0 group-hover:bg-[#0066FF] group-hover:text-white transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11.5px] text-slate-400 font-medium">
                    Phone number
                  </div>
                  <div className="text-[14.5px] font-semibold text-slate-800 group-hover:text-[#0066FF] transition-colors tabular-nums">
                    01560060092
                  </div>
                </div>
              </a>

              {/* Headquarters */}
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#0066FF]/10 text-[#0066FF] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11.5px] text-slate-400 font-medium">
                    Headquarters
                  </div>
                  <div className="text-[14.5px] font-semibold text-slate-800">
                    Dhaka, Bangladesh
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Floating White Form Card */}
          <div className="md:col-span-6">
            <div className="bg-white rounded-[24px] p-7 sm:p-9 shadow-[0_14px_40px_rgba(15,23,42,0.06)] border border-slate-100">
              {submitted ? (
                <div className="py-10 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-extrabold text-[#0F172A]">
                    Request Received!
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 max-w-xs mx-auto leading-relaxed">
                    Thank you, <strong>{formData.name}</strong>. We&apos;ll get
                    back to you at <strong>{formData.email}</strong> within 24
                    hours.
                  </p>
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          name: '',
                          email: '',
                          industry: '',
                          message: '',
                        });
                      }}
                      className="inline-flex items-center gap-3 bg-[#0066FF] hover:bg-[#0052CC] text-white text-xs font-semibold pr-5 pl-1.5 py-1.5 rounded-full transition-colors cursor-pointer"
                    >
                      <span className="w-7 h-7 rounded-full bg-white text-[#0066FF] flex items-center justify-center">
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                      <span>Send Another Message</span>
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1.5">
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Jane Smith"
                      className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl bg-[#F3F5F8] border border-transparent focus:border-[#0066FF] focus:bg-white focus:outline-none text-slate-800 placeholder:text-slate-400 transition-colors"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="jane@company.com"
                      className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl bg-[#F3F5F8] border border-transparent focus:border-[#0066FF] focus:bg-white focus:outline-none text-slate-800 placeholder:text-slate-400 transition-colors"
                    />
                  </div>

                  {/* Industry */}
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1.5">
                      Industry
                    </label>
                    <div className="relative">
                      <select
                        value={formData.industry}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            industry: e.target.value,
                          })
                        }
                        className="w-full appearance-none px-4 py-3 pr-10 text-xs sm:text-sm rounded-xl bg-[#F3F5F8] border border-transparent focus:border-[#0066FF] focus:bg-white focus:outline-none text-slate-700 transition-colors cursor-pointer"
                      >
                        <option value="">Select...</option>
                        <option value="AI Bot Platform">AI Bot Platform</option>
                        <option value="Robotics & Automation">
                          Robotics &amp; Automation
                        </option>
                        <option value="Smart IoT Technology">
                          Smart IoT Technology
                        </option>
                        <option value="Research & Custom Architecture">
                          Research &amp; Custom Architecture
                        </option>
                      </select>
                      <ChevronDown className="pointer-events-none w-4 h-4 text-[#0066FF] absolute right-3.5 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1.5">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="Type your message"
                      className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl bg-[#F3F5F8] border border-transparent focus:border-[#0066FF] focus:bg-white focus:outline-none text-slate-800 placeholder:text-slate-400 transition-colors resize-y"
                    />
                  </div>

                  {/* Pill CTA Button with Left Circle Arrow */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="inline-flex items-center gap-3.5 bg-[#0066FF] hover:bg-[#0052CC] text-white text-xs sm:text-[13px] font-semibold pr-6 pl-1.5 py-1.5 rounded-full transition-colors cursor-pointer shadow-md"
                    >
                      <span className="w-8 h-8 rounded-full bg-white text-[#0066FF] flex items-center justify-center shrink-0">
                        <ArrowRight className="w-4 h-4" />
                      </span>
                      <span>Get a Solution</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
