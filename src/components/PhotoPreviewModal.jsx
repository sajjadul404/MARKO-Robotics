import React from 'react';
import { X } from 'lucide-react';
import ResilientImage from './ResilientImage.jsx';

export default function PhotoPreviewModal({ event, onClose }) {
  if (!event) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-video bg-slate-900">
          <ResilientImage
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-900/80 text-white flex items-center justify-center hover:bg-slate-900 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-6">
          <div className="text-xs text-[#0066FF] font-semibold mb-1">
            {event.category} · {event.date} · {event.location}
          </div>
          <h3 className="text-xl font-extrabold text-slate-900 mb-2">
            {event.title}
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            {event.summary}
          </p>
        </div>
      </div>
    </div>
  );
}
