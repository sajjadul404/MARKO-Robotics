import React from 'react';

function renderSvgIcon(type) {
  switch (type) {
    case 'hero':
      return (
        <svg
          viewBox="0 0 120 120"
          className="w-24 h-24 text-[#0066FF]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer Orbital Tech Ring */}
          <circle
            cx="60"
            cy="60"
            r="52"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="6 6"
            className="opacity-35"
          />
          <circle
            cx="60"
            cy="60"
            r="42"
            stroke="#38BDF8"
            strokeWidth="1.5"
            className="opacity-25"
          />
          {/* Antenna */}
          <line
            x1="60"
            y1="18"
            x2="60"
            y2="30"
            stroke="#38BDF8"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx="60" cy="15" r="4" fill="#38BDF8" />
          {/* Robot Head / Visor */}
          <rect
            x="32"
            y="30"
            width="56"
            height="44"
            rx="12"
            fill="#0F172A"
            stroke="#38BDF8"
            strokeWidth="2.5"
          />
          <rect
            x="40"
            y="40"
            width="40"
            height="16"
            rx="6"
            fill="#0066FF"
            fillOpacity="0.25"
            stroke="#0066FF"
            strokeWidth="1.5"
          />
          {/* Glowing Eyes */}
          <circle cx="50" cy="48" r="4" fill="#38BDF8" />
          <circle cx="70" cy="48" r="4" fill="#38BDF8" />
          {/* Mouth / Audio Grille */}
          <line
            x1="50"
            y1="64"
            x2="70"
            y2="64"
            stroke="#64748B"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Side Ears / Sensors */}
          <rect x="24" y="44" width="6" height="16" rx="3" fill="#0066FF" />
          <rect x="90" y="44" width="6" height="16" rx="3" fill="#0066FF" />
          {/* Shoulder / Core Frame */}
          <path
            d="M36 82C36 77.5817 39.5817 74 44 74H76C80.4183 74 84 77.5817 84 82V94H36V82Z"
            fill="#1E293B"
            stroke="#38BDF8"
            strokeWidth="2"
          />
          <circle cx="60" cy="84" r="5" fill="#0066FF" />
        </svg>
      );

    case 'ai-bot':
      return (
        <svg
          viewBox="0 0 120 120"
          className="w-20 h-20 text-[#38BDF8]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Neural Network Connections */}
          <line x1="60" y1="22" x2="30" y2="42" stroke="#0066FF" strokeWidth="2" />
          <line x1="60" y1="22" x2="90" y2="42" stroke="#0066FF" strokeWidth="2" />
          <line x1="30" y1="42" x2="30" y2="78" stroke="#0066FF" strokeWidth="2" />
          <line x1="90" y1="42" x2="90" y2="78" stroke="#0066FF" strokeWidth="2" />
          <line x1="30" y1="78" x2="60" y2="98" stroke="#0066FF" strokeWidth="2" />
          <line x1="90" y1="78" x2="60" y2="98" stroke="#0066FF" strokeWidth="2" />
          <line x1="60" y1="22" x2="60" y2="60" stroke="#38BDF8" strokeWidth="2" />
          <line x1="30" y1="78" x2="60" y2="60" stroke="#38BDF8" strokeWidth="2" />
          <line x1="90" y1="78" x2="60" y2="60" stroke="#38BDF8" strokeWidth="2" />
          {/* Central AI Processor Core */}
          <rect
            x="42"
            y="42"
            width="36"
            height="36"
            rx="10"
            fill="#0F172A"
            stroke="#38BDF8"
            strokeWidth="2.5"
          />
          <circle cx="60" cy="60" r="9" fill="#0066FF" />
          <circle cx="60" cy="60" r="4" fill="#FFFFFF" />
          {/* Outer Nodes */}
          <circle cx="60" cy="22" r="6" fill="#0F172A" stroke="#38BDF8" strokeWidth="2.5" />
          <circle cx="30" cy="42" r="6" fill="#0F172A" stroke="#38BDF8" strokeWidth="2.5" />
          <circle cx="90" cy="42" r="6" fill="#0F172A" stroke="#38BDF8" strokeWidth="2.5" />
          <circle cx="30" cy="78" r="6" fill="#0F172A" stroke="#38BDF8" strokeWidth="2.5" />
          <circle cx="90" cy="78" r="6" fill="#0F172A" stroke="#38BDF8" strokeWidth="2.5" />
          <circle cx="60" cy="98" r="6" fill="#0F172A" stroke="#38BDF8" strokeWidth="2.5" />
        </svg>
      );

    case 'robotics':
      return (
        <svg
          viewBox="0 0 120 120"
          className="w-20 h-20 text-[#38BDF8]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Base Pedestal */}
          <rect
            x="24"
            y="92"
            width="72"
            height="10"
            rx="5"
            fill="#1E293B"
            stroke="#38BDF8"
            strokeWidth="2"
          />
          <path
            d="M38 92L44 76H64L70 92H38Z"
            fill="#0F172A"
            stroke="#0066FF"
            strokeWidth="2"
          />
          {/* Lower Arm Segment */}
          <path
            d="M50 74L36 46L46 40L60 68"
            fill="#1E293B"
            stroke="#38BDF8"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Upper Arm Segment */}
          <path
            d="M40 42L74 26L78 35L44 50"
            fill="#0F172A"
            stroke="#0066FF"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Precision Gripper Claw */}
          <path
            d="M78 26L92 20M78 35L92 41"
            stroke="#38BDF8"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M92 20L98 26M92 41L98 35"
            stroke="#38BDF8"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Articulated Joints */}
          <circle cx="54" cy="74" r="7" fill="#0066FF" stroke="#FFFFFF" strokeWidth="2" />
          <circle cx="41" cy="44" r="7" fill="#0066FF" stroke="#FFFFFF" strokeWidth="2" />
          <circle cx="76" cy="30" r="6" fill="#38BDF8" stroke="#0F172A" strokeWidth="2" />
        </svg>
      );

    case 'smart-tech':
      return (
        <svg
          viewBox="0 0 120 120"
          className="w-20 h-20 text-[#38BDF8]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Concentric Spatial Telemetry Waves */}
          <circle
            cx="60"
            cy="60"
            r="46"
            stroke="#0066FF"
            strokeWidth="1.75"
            strokeDasharray="4 6"
          />
          <circle
            cx="60"
            cy="60"
            r="32"
            stroke="#38BDF8"
            strokeWidth="2"
            strokeOpacity="0.6"
          />
          {/* IoT Edge Hub */}
          <polygon
            points="60,36 81,48 81,72 60,84 39,72 39,48"
            fill="#0F172A"
            stroke="#38BDF8"
            strokeWidth="2.5"
          />
          <circle cx="60" cy="60" r="8" fill="#0066FF" />
          {/* Telemetry Satellite Nodes */}
          <circle cx="60" cy="18" r="5" fill="#38BDF8" />
          <circle cx="96" cy="39" r="5" fill="#38BDF8" />
          <circle cx="96" cy="81" r="5" fill="#38BDF8" />
          <circle cx="60" cy="102" r="5" fill="#38BDF8" />
          <circle cx="24" cy="81" r="5" fill="#38BDF8" />
          <circle cx="24" cy="39" r="5" fill="#38BDF8" />
        </svg>
      );

    case 'blueprint':
      return (
        <svg
          viewBox="0 0 120 120"
          className="w-20 h-20 text-[#38BDF8]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Blueprint Schematic Sheet */}
          <rect
            x="22"
            y="20"
            width="76"
            height="80"
            rx="10"
            fill="#0F172A"
            stroke="#38BDF8"
            strokeWidth="2.5"
          />
          {/* Technical Grid & Schematic Circles */}
          <circle
            cx="60"
            cy="54"
            r="18"
            stroke="#0066FF"
            strokeWidth="2"
            strokeDasharray="4 3"
          />
          <circle cx="60" cy="54" r="8" stroke="#38BDF8" strokeWidth="2" />
          <line x1="34" y1="54" x2="86" y2="54" stroke="#38BDF8" strokeWidth="1.5" strokeOpacity="0.5" />
          <line x1="60" y1="30" x2="60" y2="78" stroke="#38BDF8" strokeWidth="1.5" strokeOpacity="0.5" />
          {/* Spec Lines */}
          <line x1="36" y1="84" x2="64" y2="84" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="72" y1="84" x2="84" y2="84" stroke="#0066FF" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    default:
      return (
        <svg
          viewBox="0 0 120 120"
          className="w-20 h-20 text-[#38BDF8]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Campus / Event Pulse Architectural Icon */}
          <rect
            x="24"
            y="32"
            width="72"
            height="56"
            rx="10"
            fill="#0F172A"
            stroke="#38BDF8"
            strokeWidth="2.5"
          />
          <path
            d="M36 64H48L55 46L65 74L72 58H84"
            stroke="#0066FF"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="60" cy="22" r="4" fill="#38BDF8" />
          <line x1="46" y1="98" x2="74" y2="98" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
  }
}

function resolveIconType(src = '', alt = '') {
  const combined = `${src} ${alt}`.toLowerCase();
  if (combined.includes('hero') || combined.includes('humanoid')) return 'hero';
  if (combined.includes('ai_brain') || combined.includes('ai bot') || combined.includes('neural'))
    return 'ai-bot';
  if (combined.includes('robotics_arm') || combined.includes('robotics') || combined.includes('manipulator'))
    return 'robotics';
  if (combined.includes('smart_iot') || combined.includes('smart') || combined.includes('spatial'))
    return 'smart-tech';
  if (combined.includes('blueprint') || combined.includes('schematic') || combined.includes('paper'))
    return 'blueprint';
  return 'pulse';
}

export default function ResilientImage({
  src,
  alt,
  className,
  fallbackTitle,
  iconType: explicitIconType,
}) {
  const [imgError, setImgError] = React.useState(false);

  React.useEffect(() => {
    setImgError(false);
  }, [src]);

  const isCustomImageUrl =
    src &&
    typeof src === 'string' &&
    !src.startsWith('/src/assets/images/') &&
    (src.startsWith('http://') ||
      src.startsWith('https://') ||
      src.startsWith('data:image/') ||
      src.startsWith('/'));

  if (isCustomImageUrl && !imgError) {
    return (
      <img
        src={src}
        alt={alt || fallbackTitle || 'MARKO System'}
        onError={() => setImgError(true)}
        className={className || 'w-full h-full object-cover object-center'}
      />
    );
  }

  const iconType =
    explicitIconType || resolveIconType(src, fallbackTitle || alt);
  const label = fallbackTitle || alt || 'MARKO System';

  return (
    <div
      role="img"
      aria-label={label}
      className={`relative flex flex-col items-center justify-center bg-gradient-to-br from-[#0B192C] via-[#0F172A] to-[#1E293B] text-white p-6 text-center select-none overflow-hidden ${className || ''}`}
    >
      {/* Subtle SVG Engineering Grid Pattern */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.08] pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="marko-svg-grid"
            width="24"
            height="24"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 24 0 L 0 0 0 24"
              fill="none"
              stroke="#38BDF8"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#marko-svg-grid)" />
      </svg>

      {/* Center Radial Glow */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-blue-500/25 shadow-lg mb-3">
          {renderSvgIcon(iconType)}
        </div>
        <span className="text-xs font-semibold tracking-wide text-slate-200 max-w-[240px] line-clamp-1">
          {label}
        </span>
      </div>
    </div>
  );
}

