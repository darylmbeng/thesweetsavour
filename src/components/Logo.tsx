import React from 'react';

interface LogoProps {
  className?: string;
  showTagline?: boolean;
  light?: boolean;
}

export default function Logo({ className = "h-16", showTagline = true, light = false }: LogoProps) {
  // Use champagne gold / gold foil colors
  const goldStart = "#f0d59e";
  const goldMiddle = "#d4af37";
  const goldEnd = "#aa7c11";

  return (
    <div className={`flex flex-col items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 400 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        id="sweet-savour-logo"
      >
        <defs>
          <linearGradient id="gold-foil" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={light ? "#ffffff" : goldStart} />
            <stop offset="50%" stopColor={light ? "#f5ecd2" : goldMiddle} />
            <stop offset="100%" stopColor={light ? "#f0e2be" : goldEnd} />
          </linearGradient>
          
          <style>
            {`
              .serif-text {
                font-family: 'Playfair Display', 'Didot', 'Bodoni MT', 'Cinzel', 'Georgia', serif;
                font-weight: 300;
              }
              .italic-tagline {
                font-family: 'Playfair Display', 'Georgia', serif;
                font-style: italic;
                letter-spacing: 0.15em;
              }
            `}
          </style>
        </defs>

        {/* Delicate Left-Bottom Botanical Vine */}
        <g stroke="url(#gold-foil)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.85">
          <path d="M 125 110 C 110 115, 95 125, 90 135" />
          <path d="M 90 135 C 88 128, 92 120, 98 118" />
          <path d="M 112 114 C 105 110, 98 108, 94 112" />
          {/* Leaves/Flowers */}
          <path d="M 90 135 C 84 135, 82 131, 85 128 C 88 125, 92 128, 90 135 Z" fill="url(#gold-foil)" opacity="0.4" />
          <path d="M 103 117 C 98 115, 96 110, 100 108 C 103 106, 106 110, 103 117 Z" fill="url(#gold-foil)" opacity="0.4" />
          <circle cx="118" cy="112" r="1.5" fill="url(#gold-foil)" />
          <circle cx="109" cy="122" r="1.5" fill="url(#gold-foil)" />
        </g>

        {/* Delicate Right-Top Botanical Vine */}
        <g stroke="url(#gold-foil)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.85">
          <path d="M 275 45 C 290 40, 305 30, 310 20" />
          <path d="M 310 20 C 312 27, 308 35, 302 37" />
          <path d="M 288 41 C 295 45, 302 47, 306 43" />
          {/* Leaves/Flowers */}
          <path d="M 310 20 C 316 20, 318 24, 315 27 C 312 30, 308 27, 310 20 Z" fill="url(#gold-foil)" opacity="0.4" />
          <path d="M 297 38 C 302 40, 304 45, 300 47 C 297 49, 294 45, 297 38 Z" fill="url(#gold-foil)" opacity="0.4" />
          <circle cx="282" cy="43" r="1.5" fill="url(#gold-foil)" />
          <circle cx="291" cy="33" r="1.5" fill="url(#gold-foil)" />
        </g>

        {/* "THE" text */}
        <text
          x="200"
          y="42"
          textAnchor="middle"
          fill="url(#gold-foil)"
          className="serif-text"
          fontSize="17"
          letterSpacing="0.32em"
          style={{ textTransform: 'uppercase' }}
        >
          The
        </text>

        {/* "Sweet" text */}
        <text
          x="200"
          y="82"
          textAnchor="middle"
          fill="url(#gold-foil)"
          className="serif-text"
          fontSize="48"
          letterSpacing="0.05em"
          style={{ fontWeight: 400 }}
        >
          Sweet
        </text>

        {/* "Savour" text */}
        <text
          x="200"
          y="118"
          textAnchor="middle"
          fill="url(#gold-foil)"
          className="serif-text"
          fontSize="34"
          letterSpacing="0.12em"
          style={{ textTransform: 'uppercase', fontWeight: 300 }}
        >
          Savour
        </text>

        {/* Tagline separator or decorative element */}
        <line x1="160" y1="134" x2="240" y2="134" stroke="url(#gold-foil)" strokeWidth="0.5" opacity="0.3" />

        {/* "A legacy in scent." tagline */}
        {showTagline && (
          <text
            x="200"
            y="148"
            textAnchor="middle"
            fill="url(#gold-foil)"
            className="italic-tagline"
            fontSize="11"
            opacity="0.9"
          >
            A legacy in scent.
          </text>
        )}
      </svg>
    </div>
  );
}
