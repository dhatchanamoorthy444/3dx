'use client';

import React, { forwardRef, useEffect, useState } from 'react';
import { ProgressBar } from './Progress';

export interface XPBarProps extends React.HTMLAttributes<HTMLDivElement> {
  currentXP: number;
  levelXP: number;
  nextLevelXP: number;
  level: number;
  levelTitle: string;
  animated?: boolean;
  showLevelInfo?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const XPBar = forwardRef<HTMLDivElement, XPBarProps>(
  (
    {
      currentXP,
      levelXP,
      nextLevelXP,
      level,
      levelTitle,
      animated = true,
      showLevelInfo = true,
      size = 'md',
      className = '',
      ...props
    },
    ref
  ) => {
    const progressInLevel = currentXP - levelXP;
    const xpNeededForNext = nextLevelXP - levelXP;
    const percentage = xpNeededForNext > 0 ? (progressInLevel / xpNeededForNext) * 100 : 0;

    const [displayPercentage, setDisplayPercentage] = useState(0);

    useEffect(() => {
      if (animated) {
        const timer = setTimeout(() => {
          setDisplayPercentage(percentage);
        }, 100);
        return () => clearTimeout(timer);
      } else {
        setDisplayPercentage(percentage);
      }
    }, [percentage, animated]);

    return (
      <div ref={ref} className={`space-y-3 ${className}`} {...props}>
        {showLevelInfo && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
                Level {level}: {levelTitle}
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs font-mono font-bold text-amber-400 tabular-nums">
                {currentXP.toLocaleString()} XP
              </div>
              <div className="text-[10px] text-slate-500 uppercase tracking-wider">
                {progressInLevel.toLocaleString()} / {xpNeededForNext.toLocaleString()} to next level
              </div>
            </div>
          </div>
        )}
        <ProgressBar
          value={displayPercentage}
          max={100}
          size={size}
          variant="xp"
          animated={animated}
          striped={true}
          showLabel={false}
        />
      </div>
    );
  }
);

XPBar.displayName = 'XPBar';

export interface XPGainAnimationProps {
  amount: number;
  onComplete?: () => void;
  className?: string;
}

export const XPGainAnimation: React.FC<XPGainAnimationProps> = ({
  amount,
  onComplete,
  className = '',
}) => {
  const [visible, setVisible] = useState(true);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => {
        onComplete?.();
      }, 300);
    }, 1500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div
      className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1000] flex flex-col items-center gap-2 pointer-events-none ${className}`}
      style={{
        animation: animate
          ? 'xp-gain 1.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards'
          : 'none',
      }}
    >
      <style jsx>{`
        @keyframes xp-gain {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.5) translateY(20px);
          }
          20% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.1) translateY(0);
          }
          50% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1) translateY(-10px);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.9) translateY(-40px);
          }
        }
      `}</style>
      <div className="flex items-center gap-2 px-6 py-3 bg-slate-950/95 backdrop-blur-xl border border-amber-500/50 rounded-2xl shadow-2xl">
        <span className="text-3xl font-black text-amber-400 tabular-nums">+{amount}</span>
        <span className="text-sm font-bold text-amber-300 uppercase tracking-wider">XP</span>
      </div>
      <div className="text-xs text-slate-400 font-medium">Experience Gained</div>
    </div>
  );
};

export interface LevelUpAnimationProps {
  oldLevel: number;
  newLevel: number;
  oldTitle: string;
  newTitle: string;
  onComplete?: () => void;
}

export const LevelUpAnimation: React.FC<LevelUpAnimationProps> = ({
  oldLevel,
  newLevel,
  oldTitle,
  newTitle,
  onComplete,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete?.();
    }, 2500);
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
        <div className="flex items-center gap-3">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-xl shadow-amber-500/30 animate-pulse-slow">
            <span className="text-3xl font-black text-slate-950">⚡</span>
          </div>
        </div>
        <div>
          <div className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-1">LEVEL UP</div>
          <div className="text-4xl font-black text-white mb-1">Level {newLevel}</div>
          <div className="text-lg text-amber-300 font-semibold">{newTitle}</div>
        </div>
        <div className="flex items-center gap-4 text-slate-400">
          <div className="flex flex-col items-center">
            <div className="text-2xl font-black text-slate-500 line-through">{oldLevel}</div>
            <div className="text-2xl font-black text-amber-400">{newLevel}</div>
          </div>
          <span className="text-2xl font-black text-amber-400 self-center">→</span>
          <div className="flex flex-col items-center">
            <div className="text-sm text-slate-500 line-through">{oldTitle}</div>
            <div className="text-sm text-amber-300 font-semibold">{newTitle}</div>
          </div>
        </div>
        <div className="px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs font-bold text-amber-400 uppercase tracking-wider">
          New skills unlocked!
        </div>
      </div>
    </div>
  );
};