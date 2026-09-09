'use client';

import React, { forwardRef } from 'react';
import { ProgressRing } from './Progress';
import { Flame } from 'lucide-react';

export interface StreakCardProps extends React.HTMLAttributes<HTMLDivElement> {
  streak: number;
  longestStreak?: number;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showFlame?: boolean;
  animated?: boolean;
  variant?: 'default' | 'compact' | 'detailed';
}

export const StreakCard = forwardRef<HTMLDivElement, StreakCardProps>(
  (
    {
      streak,
      longestStreak,
      size = 'md',
      showFlame = true,
      animated = true,
      variant = 'default',
      className = '',
      ...props
    },
    ref
  ) => {
    const sizeStyles = {
      sm: { ringSize: 60, stroke: 4, fontSize: 'text-xl', labelSize: 'text-xs' },
      md: { ringSize: 100, stroke: 6, fontSize: 'text-3xl', labelSize: 'text-sm' },
      lg: { ringSize: 140, stroke: 8, fontSize: 'text-5xl', labelSize: 'text-base' },
      xl: { ringSize: 200, stroke: 10, fontSize: 'text-7xl', labelSize: 'text-lg' },
    };

    const { ringSize, stroke, fontSize, labelSize } = sizeStyles[size];

    const variantStyles = {
      default: 'card p-6 flex flex-col items-center',
      compact: 'card p-4 flex items-center gap-4',
      detailed: 'card p-8 flex flex-col items-center',
    };

    return (
      <div
        ref={ref}
        className={`${variantStyles[variant]} ${className}`}
        {...props}
      >
        {variant === 'compact' ? (
          <>
            <div className="relative">
              <ProgressRing
                value={Math.min(streak * 10, 100)}
                max={100}
                size={ringSize}
                strokeWidth={stroke}
                variant="xp"
                showValue={false}
              />
              {showFlame && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Flame className={`w-6 h-6 text-orange-500 fill-orange-500/30 ${animated ? 'animate-float' : ''}`} />
                </div>
              )}
            </div>
            <div>
              <div className={`${fontSize} font-black text-white tabular-nums`}>{streak}</div>
              <div className={`${labelSize} font-semibold uppercase tracking-wider text-slate-400`}>Day Streak</div>
            </div>
          </>
        ) : (
          <>
            <div className="relative mb-4">
              <ProgressRing
                value={Math.min(streak * 10, 100)}
                max={100}
                size={ringSize}
                strokeWidth={stroke}
                variant="xp"
                showValue={false}
              />
              {showFlame && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Flame className={`w-12 h-12 text-orange-500 fill-orange-500/30 ${animated ? 'animate-float' : ''}`} />
                </div>
              )}
            </div>
            <div className={`${fontSize} font-black text-white tabular-nums mb-1`}>{streak}</div>
            <div className={`${labelSize} font-semibold uppercase tracking-wider text-slate-400 mb-4`}>Day Streak</div>
            {longestStreak !== undefined && longestStreak > streak && (
              <div className="text-xs text-slate-500">
                Longest: <span className="text-amber-400 font-bold">{longestStreak}</span> days
              </div>
            )}
          </>
        )}
      </div>
    );
  }
);

StreakCard.displayName = 'StreakCard';

export interface StreakAnimationProps {
  oldStreak: number;
  newStreak: number;
  onComplete?: () => void;
}

export const StreakAnimation: React.FC<StreakAnimationProps> = ({
  oldStreak,
  newStreak,
  onComplete,
}) => {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onComplete?.();
    }, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center pointer-events-none">
      <div className="relative flex flex-col items-center gap-4 px-8 py-10 bg-slate-950/95 backdrop-blur-xl border border-orange-500/50 rounded-3xl shadow-2xl max-w-md text-center animate-scale-in">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center shadow-xl shadow-orange-500/30 animate-pulse">
          <Flame className="w-10 h-10 text-white fill-white/30" />
        </div>
        <div>
          <div className="text-xs font-bold uppercase tracking-widest text-orange-400 mb-1">STREAK EXTENDED</div>
          <div className="text-5xl font-black text-white mb-1">
            {oldStreak} → {newStreak}
          </div>
          <div className="text-lg text-orange-300 font-semibold">Day Streak</div>
        </div>
        <div className="px-4 py-2 bg-orange-500/10 border border-orange-500/30 rounded-xl text-xs font-bold text-orange-400 uppercase tracking-wider">
          Keep the momentum going!
        </div>
      </div>
    </div>
  );
};