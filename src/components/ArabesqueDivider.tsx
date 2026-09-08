import React from 'react';

interface ArabesqueDividerProps {
  className?: string;
  variant?: 'gold' | 'green' | 'terracotta' | 'subtle';
  size?: 'sm' | 'md' | 'lg';
}

export default function ArabesqueDivider({
  className = '',
  variant = 'gold',
  size = 'md',
}: ArabesqueDividerProps) {
  const colorMap = {
    gold: '#C9A043',
    green: '#1A3826',
    terracotta: '#C65A3D',
    subtle: '#E5DACB',
  };

  const stroke = colorMap[variant];

  const sizeMap = {
    sm: { height: 16, iconSize: 12 },
    md: { height: 24, iconSize: 18 },
    lg: { height: 32, iconSize: 24 },
  };

  const { height, iconSize } = sizeMap[size];

  return (
    <div
      className={`flex items-center justify-center gap-3 my-4 opacity-90 ${className}`}
      aria-hidden="true"
    >
      {/* Left ornamental line with gradient fade */}
      <div
        className="h-[1px] flex-1 max-w-[120px] sm:max-w-[180px]"
        style={{
          background: `linear-gradient(to right, transparent, ${stroke})`,
        }}
      />

      {/* Center 8-pointed Arabesque Star Motif */}
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transform rotate-0 transition-transform duration-700 hover:rotate-45"
      >
        <path
          d="M12 2L14.5 8.5L21 9L16 13.5L18 20L12 16.5L6 20L8 13.5L3 9L9.5 8.5L12 2Z"
          fill={stroke}
          fillOpacity="0.25"
          stroke={stroke}
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="12" r="2" fill={stroke} />
      </svg>

      {/* Right ornamental line with gradient fade */}
      <div
        className="h-[1px] flex-1 max-w-[120px] sm:max-w-[180px]"
        style={{
          background: `linear-gradient(to left, transparent, ${stroke})`,
        }}
      />
    </div>
  );
}
