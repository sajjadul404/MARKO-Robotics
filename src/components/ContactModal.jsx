import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, X } from 'lucide-react';

export default function ContactModal({ isOpen, onClose, initialInterest }) {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    organization: '',
    interest: initialInterest || 'AI Bot Platform',
    message: '',
  });
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactError, setContactError] = useState('');

  if (!isOpen) return null;

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactForm.name.trim() || !contactForm.email.includes('@')) {
      setContactError('Please enter your full name and a valid work email.');
      return;
    }
    setContactError('');
    setContactSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[#0066FF] mb-1">
              Engineering Consultation
            </p>
            <h3 className="text-2xl font-extrabold text-slate-900">
              Let’s Build What’s Possible
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {contactSubmitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-slate-900">
              Consultation Request Received
            </h4>
            <p className="text-sm text-slate-600 max-w-sm mx-auto">
              Thank you, <strong>{contactForm.name}</strong>. Our systems
              engineering team in Silicon Valley will reach out to{' '}
              <strong>{contactForm.email}</strong> within 1 business day.
            </p>
            <button
              onClick={() => {
                setContactSubmitted(false);
                onClose();
              }}
              className="mt-2 px-6 py-2.5 bg-[#0066FF] text-white text-xs font-semibold rounded-lg cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleContactSubmit} className="space-y-4">
            {contactError && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700">
                {contactError}
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={contactForm.name}
                onChange={(e) =>
                  setContactForm({ ...contactForm, name: e.target.value })
                }
                placeholder="Dr. Elena Vance"
                className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:border-[#0066FF] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Work Email
                </label>
                <input
                  type="email"
                  required
                  value={contactForm.email}
                  onChange={(e) =>
                    setContactForm({
                      ...contactForm,
                      email: e.target.value,
                    })
                  }
                  placeholder="elena@enterprise.io"
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:border-[#0066FF] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Product Suite Interest
                </label>
                <select
                  value={contactForm.interest}
                  onChange={(e) =>
                    setContactForm({
                      ...contactForm,
                      interest: e.target.value,
                    })
                  }
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:border-[#0066FF] focus:outline-none bg-white"
                >
                  <option value="AI Bot Platform">AI Bot Platform</option>
                  <option value="Robotics">Automation Arms</option>
                  <option value="Smart Technology">IoT Spatial Nodes</option>
                  <option value="Consulting Suites">Consulting Suites</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Project Scope or Deployment Requirements
              </label>
              <textarea
                rows={3}
                value={contactForm.message}
                onChange={(e) =>
                  setContactForm({
                    ...contactForm,
                    message: e.target.value,
                  })
                }
                placeholder="Tell us about your facility or workflow automation goals..."
                className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:border-[#0066FF] focus:outline-none"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-2 bg-[#0066FF] hover:bg-[#0052CC] text-white text-xs font-semibold px-6 py-2.5 rounded-lg transition-colors cursor-pointer"
              >
                <span>Schedule Engineering Call</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
