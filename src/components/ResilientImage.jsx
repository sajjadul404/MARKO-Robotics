import React, { useState } from 'react';
import { Cpu } from 'lucide-react';

export default function ResilientImage({ src, alt, className, fallbackTitle }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-slate-800 via-slate-900 to-blue-950 text-white p-6 text-center ${className || ''}`}
      >
        <Cpu className="w-8 h-8 text-blue-400 mb-2 opacity-80" />
        <span className="text-xs font-medium text-slate-300">
          {fallbackTitle || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
