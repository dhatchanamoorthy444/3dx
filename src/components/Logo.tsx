'use client';

import React from 'react';

export interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ className = '', showText = true, size = 'md' }) => {
  const sizeStyles = {
    sm: 'w-10 h-10',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={`${sizeStyles[size]} relative flex-shrink-0`}>
        <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Background rounded square */}
          <rect x="4" y="4" width="112" height="112" rx="24" fill="white" stroke="#e5e7eb" strokeWidth="4"/>
          
          {/* Push-up figure */}
          <g transform="translate(20, 25)">
            {/* Head */}
            <circle cx="18" cy="14" r="10" fill="#1f2937"/>
            
            {/* Body */}
            <path d="M18 24 L18 45" stroke="#1f2937" strokeWidth="7" strokeLinecap="round"/>
            
            {/* Arms */}
            <path d="M18 30 L8 38" stroke="#1f2937" strokeWidth="6" strokeLinecap="round"/>
            <path d="M18 30 L28 38" stroke="#1f2937" strokeWidth="6" strokeLinecap="round"/>
            
            {/* Legs */}
            <path d="M18 45 L8 60" stroke="#1f2937" strokeWidth="6" strokeLinecap="round"/>
            <path d="M18 45 L28 60" stroke="#1f2937" strokeWidth="6" strokeLinecap="round"/>
            
            {/* Hands */}
            <circle cx="8" cy="40" r="4" fill="#1f2937"/>
            <circle cx="28" cy="40" r="4" fill="#1f2937"/>
            
            {/* Feet */}
            <ellipse cx="8" cy="62" rx="5" ry="3" fill="#1f2937"/>
            <ellipse cx="28" cy="62" rx="5" ry="3" fill="#1f2937"/>
          </g>
        </svg>
      </div>
      {showText && (
        <span className={`${textSizes[size]} font-extrabold tracking-tight whitespace-nowrap`}>
          <span className="text-slate-900 dark:text-white">CALI</span>
          <span className="text-amber-500">GYM</span>
        </span>
      )}
    </div>
  );
};

export default Logo;