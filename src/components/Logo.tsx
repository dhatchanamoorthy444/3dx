'use client';

import React from 'react';

export interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ className = '', showText = true, size = 'md' }) => {
  const sizeStyles = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-14 h-14 text-lg',
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div
        className={`${sizeStyles[size]} rounded-xl bg-gradient-to-tr from-amber-500 to-red-600 flex items-center justify-center font-black text-slate-950 shadow-lg shadow-amber-500/20`}
      >
        C
      </div>
      {showText && (
        <span className="font-extrabold text-xl tracking-tight">
          <span className="text-white">CALI</span>
          <span className="text-amber-500">GYM</span>
        </span>
      )}
    </div>
  );
};

export default Logo;