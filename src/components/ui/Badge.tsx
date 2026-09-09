'use client';

import React, { forwardRef } from 'react';
import { Award, Star, Trophy, Medal, Sparkles } from 'lucide-react';
import { ProgressBar } from './Progress';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'achievement' | 'skill' | 'milestone' | 'pr' | 'streak';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  icon?: React.ReactNode;
  label: string;
  description?: string;
  unlocked?: boolean;
  progress?: number;
  maxProgress?: number;
  onClick?: () => void;
}

export const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  (
    {
      variant = 'default',
      size = 'md',
      icon,
      label,
      description,
      unlocked = true,
      progress,
      maxProgress,
      onClick,
      className = '',
      ...props
    },
    ref
  ) => {
    const sizeStyles = {
      sm: 'p-3 gap-2',
      md: 'p-4 gap-3',
      lg: 'p-6 gap-4',
      xl: 'p-8 gap-5',
    };

    const iconSizes = {
      sm: 'w-8 h-8',
      md: 'w-12 h-12',
      lg: 'w-16 h-16',
      xl: 'w-24 h-24',
    };

    const textSizes = {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
      xl: 'text-lg',
    };

    const variantStyles = {
      default: unlocked
        ? 'bg-slate-900/50 border-slate-800'
        : 'bg-slate-900/30 border-slate-800/50 opacity-50',
      achievement: unlocked
        ? 'bg-amber-500/10 border-amber-500/30'
        : 'bg-slate-900/30 border-slate-800/50 opacity-50',
      skill: unlocked
        ? 'bg-indigo-500/10 border-indigo-500/30'
        : 'bg-slate-900/30 border-slate-800/50 opacity-50',
      milestone: unlocked
        ? 'bg-purple-500/10 border-purple-500/30'
        : 'bg-slate-900/30 border-slate-800/50 opacity-50',
      pr: unlocked
        ? 'bg-rose-500/10 border-rose-500/30'
        : 'bg-slate-900/30 border-slate-800/50 opacity-50',
      streak: unlocked
        ? 'bg-orange-500/10 border-orange-500/30'
        : 'bg-slate-900/30 border-slate-800/50 opacity-50',
    };

    const variantIconColors = {
      default: 'text-slate-400',
      achievement: unlocked ? 'text-amber-400' : 'text-slate-500',
      skill: unlocked ? 'text-indigo-400' : 'text-slate-500',
      milestone: unlocked ? 'text-purple-400' : 'text-slate-500',
      pr: unlocked ? 'text-rose-400' : 'text-slate-500',
      streak: unlocked ? 'text-orange-400' : 'text-slate-500',
    };

    const variantTextColors = {
      default: unlocked ? 'text-white' : 'text-slate-500',
      achievement: unlocked ? 'text-amber-300' : 'text-slate-500',
      skill: unlocked ? 'text-indigo-300' : 'text-slate-500',
      milestone: unlocked ? 'text-purple-300' : 'text-slate-500',
      pr: unlocked ? 'text-rose-300' : 'text-slate-500',
      streak: unlocked ? 'text-orange-300' : 'text-slate-500',
    };

    const defaultIcons = {
      default: <Award className="w-full h-full" />,
      achievement: <Trophy className="w-full h-full" />,
      skill: <Star className="w-full h-full" />,
      milestone: <Medal className="w-full h-full" />,
      pr: <Sparkles className="w-full h-full" />,
      streak: <Award className="w-full h-full" />,
    };

    return (
      <div
        ref={ref}
        className={`card ${variantStyles[variant]} ${sizeStyles[size]} flex flex-col items-center text-center ${onClick ? 'cursor-pointer hover:shadow-xl transition-shadow' : ''} ${className}`}
        onClick={onClick}
        {...props}
      >
        <div className={`${iconSizes[size]} rounded-xl flex items-center justify-center ${variantIconColors[variant]} ${unlocked ? '' : 'grayscale'}`}>
          {icon || defaultIcons[variant]}
        </div>
        <div className={`${textSizes[size]} font-bold ${variantTextColors[variant]}`}>{label}</div>
        {description && (
          <div className={`${textSizes[size]} text-slate-500 mt-1`}>{description}</div>
        )}
        {progress !== undefined && maxProgress !== undefined && !unlocked && (
          <ProgressBar
            value={progress}
            max={maxProgress}
            size="sm"
            variant={variant === 'achievement' ? 'xp' : variant === 'skill' ? 'skill' : 'default'}
            showLabel={true}
            label={`${progress}/${maxProgress}`}
            className="w-full mt-3"
          />
        )}
      </div>
    );
  }
);

Badge.displayName = 'Badge';

export interface BadgeGridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: 2 | 3 | 4 | 5;
  gap?: 'sm' | 'md' | 'lg';
}

export const BadgeGrid = forwardRef<HTMLDivElement, BadgeGridProps>(
  ({ children, columns = 4, gap = 'md', className = '', ...props }, ref) => {
    const columnStyles = {
      2: 'grid-cols-2',
      3: 'grid-cols-2 md:grid-cols-3',
      4: 'grid-cols-2 md:grid-cols-4',
      5: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5',
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

BadgeGrid.displayName = 'BadgeGrid';

export interface AchievementUnlockAnimationProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  xpReward?: number;
  onComplete?: () => void;
}

export const AchievementUnlockAnimation: React.FC<AchievementUnlockAnimationProps> = ({
  title,
  description,
  icon,
  xpReward,
  onComplete,
}) => {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onComplete?.();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center pointer-events-none bg-black/50 backdrop-blur-sm">
      <div className="relative flex flex-col items-center gap-4 px-8 py-10 bg-slate-950/95 backdrop-blur-xl border border-amber-500/50 rounded-3xl shadow-2xl max-w-md text-center animate-scale-in">
        <style jsx>{`
          @keyframes scale-in {
            0% { opacity: 0; transform: scale(0.8); }
            100% { opacity: 1; transform: scale(1); }
          }
          .animate-scale-in { animation: scale-in 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
        `}</style>
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-xl shadow-amber-500/30 animate-bounce-subtle">
          {icon || <Trophy className="w-12 h-12 text-white" />}
        </div>
        <div>
          <div className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-1">ACHIEVEMENT UNLOCKED</div>
          <div className="text-2xl font-black text-white mb-2">{title}</div>
          <div className="text-slate-300">{description}</div>
        </div>
        {xpReward && (
          <div className="flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-xl">
            <span className="text-xl font-black text-amber-400">+{xpReward}</span>
            <span className="text-sm font-bold text-amber-300 uppercase tracking-wider">XP</span>
          </div>
        )}
      </div>
    </div>
  );
};