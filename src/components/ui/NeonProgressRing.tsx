// File: src/components/ui/NeonProgressRing.tsx
'use client';

import React from 'react';

interface NeonProgressRingProps {
  /** Progress from 0 up to 100 */
  percent: number;
  /** Diameter of the ring in pixels */
  size?: number;
  /** Stroke width in pixels */
  strokeWidth?: number;
}

export default function NeonProgressRing({
  percent,
  size = 48,
  strokeWidth = 4,
}: NeonProgressRingProps) {
  // Radius is half the size minus half the stroke so the circle fits perfectly
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  // How much of the circle is left “blank”
  const dashOffset = circumference * (1 - percent / 100);

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="drop-shadow-[0_0_6px_rgba(99,102,241,0.8)]"
    >
      {/* Background “track” ring */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="rgba(255,255,255,0.1)"
        strokeWidth={strokeWidth}
        fill="none"
      />

      {/* Neon progress ring */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="url(#neonGradient)"
        strokeWidth={strokeWidth}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={dashOffset}
        strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 0.6s ease' }}
      />

      <defs>
        <linearGradient id="neonGradient" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6366F1" />
          <stop offset="100%" stopColor="#A78BFA" />
        </linearGradient>
      </defs>

      {/* Percentage text in the center */}
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        className="font-mono text-xs fill-white select-none"
      >
        {Math.round(percent)}%
      </text>
    </svg>
  );
}

