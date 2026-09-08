'use client';

import React, { forwardRef } from 'react';

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'xp' | 'skill';
  showLabel?: boolean;
  label?: string;
  animated?: boolean;
  striped?: boolean;
}

export const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(
  (
    {
      value,
      max = 100,
      size = 'md',
      variant = 'default',
      showLabel = false,
      label,
      animated = true,
      striped = false,
      className = '',
      ...props
    },
    ref
  ) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    const sizeStyles = {
      sm: 'h-1.5',
      md: 'h-2.5',
      lg: 'h-3.5',
      xl: 'h-5',
    };

    const variantStyles = {
      default: 'bg-gradient-to-r from-amber-500 to-orange-500',
      success: 'bg-gradient-to-r from-emerald-500 to-teal-500',
      warning: 'bg-gradient-to-r from-amber-500 to-yellow-500',
      danger: 'bg-gradient-to-r from-rose-500 to-red-500',
      xp: 'bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500',
      skill: 'bg-gradient-to-r from-indigo-500 to-purple-500',
    };

    const trackStyles = 'bg-slate-800/50';
    const animationStyles = animated ? 'transition-all duration-700 ease-spring' : '';
    const stripedStyles = striped ? 'bg-[linear-gradient(45deg,rgba(255,255,255,.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,.15)_50%,rgba(255,255,255,.15)_75%,transparent_75%,transparent)] bg-[size:1rem_1rem] animate-[shimmer_1s_linear_infinite]' : '';

    return (
      <div ref={ref} className={`w-full ${className}`} {...props}>
        {(showLabel || label) && (
          <div className="flex items-center justify-between text-xs font-semibold mb-2">
            <span className="text-slate-300">{label || 'Progress'}</span>
            <span className="text-amber-400 tabular-nums">{Math.round(percentage)}%</span>
          </div>
        )}
        <div className={`progress relative overflow-hidden rounded-full ${sizeStyles[size]} ${trackStyles}`}>
          <div
            className={`progress-track h-full rounded-full ${variantStyles[variant]} ${animationStyles} ${stripedStyles}`}
            style={{ width: `${percentage}%` }}
            role="progressbar"
            aria-valuenow={Math.round(percentage)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={label || 'Progress'}
          />
        </div>
      </div>
    );
  }
);

ProgressBar.displayName = 'ProgressBar';

export interface CircularProgressProps extends React.SVGAttributes<SVGSVGElement> {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'xp' | 'skill';
  showValue?: boolean;
  valueClassName?: string;
  children?: React.ReactNode;
}

const variantStrokeColors = {
  default: 'url(#progress-gradient-default)',
  success: 'url(#progress-gradient-success)',
  warning: 'url(#progress-gradient-warning)',
  danger: 'url(#progress-gradient-danger)',
  xp: 'url(#progress-gradient-xp)',
  skill: 'url(#progress-gradient-skill)',
};

export const ProgressRing = forwardRef<unknown, CircularProgressProps>(
  (
    {
      value,
      max = 100,
      size = 120,
      strokeWidth = 8,
      variant = 'default',
      showValue = true,
      valueClassName = '',
      children,
      className = '',
      ...props
    },
    ref
  ) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    const gradients = (
      <defs>
        <linearGradient id="progress-gradient-default" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#f97316" />
        </linearGradient>
        <linearGradient id="progress-gradient-success" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#14b8a6" />
        </linearGradient>
        <linearGradient id="progress-gradient-warning" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#eab308" />
        </linearGradient>
        <linearGradient id="progress-gradient-danger" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f43f5e" />
          <stop offset="100%" stopColor="#ef4444" />
        </linearGradient>
        <linearGradient id="progress-gradient-xp" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="50%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#f97316" />
        </linearGradient>
        <linearGradient id="progress-gradient-skill" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
      </defs>
    );

    return (
      <svg
        ref={ref}
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className={`transform -rotate-90 ${className}`}
        role="img"
        aria-label={`Circular progress: ${Math.round(percentage)}%`}
        {...props}
      >
        {gradients}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="hsl(240 5% 20%)"
          strokeWidth={strokeWidth}
          className="opacity-30"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={variantStrokeColors[variant]}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-700 ease-spring"
          style={{ strokeDashoffset: offset }}
        />
        {showValue && (
          <text
            x={size / 2}
            y={size / 2}
            textAnchor="middle"
            dominantBaseline="central"
            className={`font-black tabular-nums ${valueClassName}`}
            fill="white"
          >
            {Math.round(percentage)}%
          </text>
        )}
        {children}
      </svg>
    );
  }
);

ProgressRing.displayName = 'ProgressRing';