'use client';

import React from 'react';

export interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ className = '', showText = true, size = 'md' }) => {
  const sizeStyles = {
    sm: 'h-8 w-auto',
    md: 'h-10 w-auto',
    lg: 'h-12 w-auto',
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img
        src="/assets/logo.png"
        alt="CaliGym Official Logo"
        className={`${sizeStyles[size]} logo-global object-contain`}
      />
      {showText && (
        <span className="font-extrabold text-xl tracking-tight whitespace-nowrap">
          <span className="text-white">CALI</span>
          <span className="text-[#CCFF00]">GYM</span>
        </span>
      )}
    </div>
  );
};

export default Logo;