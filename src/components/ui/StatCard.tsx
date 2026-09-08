'use client';

import React, { forwardRef } from 'react';
import { ProgressRing } from './Progress';

export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  variant?: 'default' | 'streak' | 'xp' | 'level' | 'pr';
  size?: 'sm' | 'md' | 'lg';
}

export const StatCard = forwardRef<HTMLDivElement, StatCardProps>(
  (
    {
      label,
      value,
      icon,
      trend = 'neutral',
      trendValue,
      variant = 'default',
      size = 'md',
      className = '',
      ...props
    },
    ref
  ) => {
    const sizeStyles = {
      sm: 'p-4 min-w-[100px]',
      md: 'p-6 min-w-[120px]',
      lg: 'p-8 min-w-[160px]',
    };

    const variantStyles = {
      default: 'bg-slate-900/50 border-slate-800',
      streak: 'bg-orange-500/10 border-orange-500/20',
      xp: 'bg-indigo-500/10 border-indigo-500/20',
      level: 'bg-amber-500/10 border-amber-500/20',
      pr: 'bg-rose-500/10 border-rose-500/20',
    };

    const iconColors = {
      default: 'text-slate-400',
      streak: 'text-orange-500',
      xp: 'text-indigo-400',
      level: 'text-amber-400',
      pr: 'text-rose-400',
    };

    const trendColors = {
      up: 'text-emerald-400',
      down: 'text-rose-400',
      neutral: 'text-slate-500',
    };

    const trendIcons = {
      up: '↑',
      down: '↓',
      neutral: '→',
    };

    return (
      <div
        ref={ref}
        className={`card ${variantStyles[variant]} ${sizeStyles[size]} flex flex-col items-center text-center ${className}`}
        {...props}
      >
        {icon && (
          <div className={`${iconColors[variant]} mb-3`}>{icon}</div>
        )}
        <div className="text-2xl sm:text-3xl md:text-4xl font-black text-white tabular-nums">
          {value}
        </div>
        <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-400 mt-1">
          {label}
        </div>
        {(trendValue || trend !== 'neutral') && (
          <div className={`flex items-center gap-1 mt-2 ${trendColors[trend]} text-xs font-bold`}>
            <span>{trendIcons[trend]}</span>
            <span>{trendValue || 'Stable'}</span>
          </div>
        )}
      </div>
    );
  }
);

StatCard.displayName = 'StatCard';

export interface StatGridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg';
}

export const StatGrid = forwardRef<HTMLDivElement, StatGridProps>(
  (
    { children, columns = 3, gap = 'md', className = '', ...props },
    ref
  ) => {
    const columnStyles = {
      2: 'grid-cols-2',
      3: 'grid-cols-2 md:grid-cols-3',
      4: 'grid-cols-2 md:grid-cols-4',
    };

    const gapStyles = {
      sm: 'gap-3',
      md: 'gap-4',
      lg: 'gap-6',
    };

    return (
      <div
        ref={ref}
        className={`grid ${columnStyles[columns]} ${gapStyles[gap]} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

StatGrid.displayName = 'StatGrid';

export interface CircularStatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: number;
  max?: number;
  icon?: React.ReactNode;
  size?: number;
  strokeWidth?: number;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'xp' | 'skill';
  subLabel?: string;
}

export const CircularStatCard = forwardRef<HTMLDivElement, CircularStatCardProps>(
  (
    {
      label,
      value,
      max = 100,
      icon,
      size = 100,
      strokeWidth = 6,
      variant = 'default',
      subLabel,
      className = '',
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={`card p-6 flex flex-col items-center text-center ${className}`}
        {...props}
      >
        <div className="relative mb-4">
          <ProgressRing
            value={value}
            max={max}
            size={size}
            strokeWidth={strokeWidth}
            variant={variant}
            showValue={true}
            valueClassName="text-xl"
          />
          {icon && (
            <div className="absolute inset-0 flex items-center justify-center">
              {icon}
            </div>
          )}
        </div>
        <div className="text-sm font-semibold uppercase tracking-wider text-slate-400">
          {label}
        </div>
        {subLabel && (
          <div className="text-xs text-slate-500 mt-1">{subLabel}</div>
        )}
      </div>
    );
  }
);

CircularStatCard.displayName = 'CircularStatCard';