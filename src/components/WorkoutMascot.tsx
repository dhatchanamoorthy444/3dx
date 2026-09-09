'use client';

import React from 'react';

export interface WorkoutMascotProps {
  /** Exercise type for positioning */
  exercise?: 'pushup' | 'planche' | 'lsit' | 'pullup' | 'handstand' | 'dip';
  /** Size of the mascot */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Additional className */
  className?: string;
}

export const WorkoutMascot: React.FC<WorkoutMascotProps> = ({ 
  exercise = 'pushup', 
  size = 'md',
  className = ''
}) => {
  const sizeMap = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
    xl: 'w-48 h-48'
  };

  const getExercisePosition = () => {
    switch (exercise) {
      case 'pushup':
        return { body: 'M30,45 L30,70', arms: 'M30,50 L20,58 M30,50 L40,58', legs: 'M30,70 L20,85 M30,70 L40,85', head: 'cx="30" cy="35" r="8"' };
      case 'planche':
        return { body: 'M35,50 L50,55', arms: 'M35,50 L25,58 M35,50 L45,58', legs: 'M50,55 L70,50 M50,55 L70,60', head: 'cx="50" cy="45" r="8"' };
      case 'lsit':
        return { body: 'M30,35 L30,55', arms: 'M30,50 L20,58 M30,50 L40,58', legs: 'M30,35 L10,35 M30,35 L50,35', head: 'cx="30" cy="25" r="8"' };
      case 'pullup':
        return { body: 'M30,30 L30,50', arms: 'M30,30 L20,20 M30,30 L40,20', legs: 'M30,50 L20,65 M30,50 L40,65', head: 'cx="30" cy="20" r="8"' };
      case 'handstand':
        return { body: 'M30,20 L30,40', arms: 'M30,40 L20,50 M30,40 L40,50', legs: 'M30,20 L15,5 M30,20 L45,5', head: 'cx="30" cy="50" r="8"' };
      case 'dip':
        return { body: 'M30,40 L30,60', arms: 'M30,40 L20,55 M30,40 L40,55', legs: 'M30,60 L20,75 M30,60 L40,75', head: 'cx="30" cy="30" r="8"' };
      default:
        return { body: 'M30,45 L30,70', arms: 'M30,50 L20,58 M30,50 L40,58', legs: 'M30,70 L20,85 M30,70 L40,85', head: 'cx="30" cy="35" r="8"' };
    }
  };

  const pos = getExercisePosition();

  return (
    <div className={`${sizeMap[size]} ${className}`}>
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <defs>
          <linearGradient id="mascotGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000000" floodOpacity="0.3"/>
          </filter>
        </defs>
        
        <g filter="url(#shadow)">
          {/* Head with mask */}
          <circle cx="30" cy="35" r="9" fill="url(#mascotGradient)" />
          <path d="M24 35 Q30 38 36 35" stroke="#1f2937" strokeWidth="1.5" fill="none" />
          <circle cx="27" cy="33" r="1.5" fill="#1f2937" />
          <circle cx="33" cy="33" r="1.5" fill="#1f2937" />
          
          {/* Body */}
          <path d="M30,44 L30,65" stroke="url(#mascotGradient)" strokeWidth="7" strokeLinecap="round" />
          
          {/* Arms */}
          <path d="M30,52 L20,60" stroke="url(#mascotGradient)" strokeWidth="5" strokeLinecap="round" />
          <path d="M30,52 L40,60" stroke="url(#mascotGradient)" strokeWidth="5" strokeLinecap="round" />
          
          {/* Hands */}
          <circle cx="20" cy="62" r="3" fill="url(#mascotGradient)" />
          <circle cx="40" cy="62" r="3" fill="url(#mascotGradient)" />
          
          {/* Legs */}
          <path d="M30,65 L20,80" stroke="url(#mascotGradient)" strokeWidth="5" strokeLinecap="round" />
          <path d="M30,65 L40,80" stroke="url(#mascotGradient)" strokeWidth="5" strokeLinecap="round" />
          
          {/* Feet */}
          <ellipse cx="20" cy="82" rx="4" ry="2.5" fill="url(#mascotGradient)" />
          <ellipse cx="40" cy="82" rx="4" ry="2.5" fill="url(#mascotGradient)" />
          
          {/* Logo "P" on chest */}
          <text x="30" y="58" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">P</text>
        </g>
      </svg>
    </div>
  );
};

export default WorkoutMascot;