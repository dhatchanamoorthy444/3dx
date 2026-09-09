'use client';

import React, { forwardRef } from 'react';
import { ProgressBar, ProgressRing } from './Progress';
import { Button } from './Button';
import { Badge } from './Badge';
import { Lock, Check, Star, Zap, Flame, Trophy } from 'lucide-react';

export interface SkillNode {
  id: string;
  name: string;
  description?: string;
  category: 'push' | 'pull' | 'core' | 'legs' | 'skills';
  level: number;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
  prerequisites?: string[];
  xpReward?: number;
  icon?: React.ReactNode;
}

export interface SkillCardProps extends React.HTMLAttributes<HTMLDivElement> {
  skill: SkillNode;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'compact' | 'tree' | 'detailed';
  onClick?: () => void;
  showProgress?: boolean;
  showXP?: boolean;
}

export const SkillCard = forwardRef<HTMLDivElement, SkillCardProps>(
  (
    {
      skill,
      size = 'md',
      variant = 'default',
      onClick,
      showProgress = true,
      showXP = true,
      className = '',
      ...props
    },
    ref
  ) => {
    const sizeStyles = {
      sm: 'p-3 gap-2',
      md: 'p-4 gap-3',
      lg: 'p-6 gap-4',
    };

    const variantStyles = {
      default: 'card flex flex-col',
      compact: 'card flex items-center gap-3',
      tree: 'card flex flex-col items-center text-center',
      detailed: 'card flex flex-col',
    };

    const categoryColors = {
      push: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
      pull: 'bg-purple-500/10 border-purple-500/20 text-purple-400',
      core: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
      legs: 'bg-orange-500/10 border-orange-500/20 text-orange-400',
      skills: 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400',
    };

    const categoryIcons = {
      push: <Zap className="w-5 h-5" />,
      pull: <Flame className="w-5 h-5 fill-orange-500/30" />,
      core: <Star className="w-5 h-5" />,
      legs: <Trophy className="w-5 h-5" />,
      skills: <Star className="w-5 h-5" />,
    };

    if (!skill.unlocked && variant === 'tree') {
      return (
        <div
          ref={ref}
          className={`card ${sizeStyles[size]} ${variantStyles[variant]} opacity-50 ${className}`}
          {...props}
        >
          <div className="w-16 h-16 rounded-2xl bg-slate-800/50 flex items-center justify-center mb-3">
            <Lock className="w-8 h-8 text-slate-500" />
          </div>
          <div className="font-semibold text-slate-500">{skill.name}</div>
          <div className="text-xs text-slate-500">Level {skill.level}</div>
          {skill.prerequisites && skill.prerequisites.length > 0 && (
            <div className="text-xs text-slate-600 mt-1">
              Requires: {skill.prerequisites.join(', ')}
            </div>
          )}
        </div>
      );
    }

    const isComplete = skill.progress >= skill.maxProgress;

    return (
      <div
        ref={ref}
        className={`card ${sizeStyles[size]} ${variantStyles[variant]} ${onClick ? 'cursor-pointer hover:shadow-xl transition-shadow' : ''} ${
          skill.unlocked ? '' : 'opacity-70'
        } ${className}`}
        onClick={onClick}
        {...props}
      >
        <div className="w-full flex items-start justify-between gap-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${categoryColors[skill.category]}`}>
            {skill.icon || categoryIcons[skill.category]}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-white truncate">{skill.name}</h3>
              {isComplete && <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />}
              {!skill.unlocked && <Lock className="w-4 h-4 text-slate-500 flex-shrink-0" />}
            </div>
            {skill.description && (
              <p className="text-sm text-slate-400 mt-1 line-clamp-2">{skill.description}</p>
            )}
            {showProgress && (
              <div className="mt-3 space-y-1">
                <ProgressBar
                  value={skill.progress}
                  max={skill.maxProgress}
                  size="sm"
                  variant={skill.category === 'skills' ? 'skill' : 'default'}
                  showLabel={true}
                  label={`${skill.progress}/${skill.maxProgress}`}
                  animated={true}
                />
              </div>
            )}
          </div>
          {showXP && skill.xpReward && (
            <div className="flex flex-col items-end gap-1">
              <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                <Zap className="w-3 h-3" /> +{skill.xpReward}
              </span>
              <span className="text-[10px] text-slate-500 uppercase tracking-wider">XP</span>
            </div>
          )}
        </div>

        {variant === 'detailed' && (
          <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="px-2 py-0.5 rounded bg-slate-800 font-medium">{skill.category.toUpperCase()}</span>
              <span>Level {skill.level}</span>
            </div>
            {skill.unlocked && !isComplete && (
              <Button size="sm" variant="primary" className="w-full sm:w-auto">
                Continue
              </Button>
            )}
            {isComplete && (
              <Badge variant="achievement" size="sm" label="Completed" unlocked={true} />
            )}
            {!skill.unlocked && (
              <Button size="sm" variant="ghost" className="w-full sm:w-auto" disabled>
                Locked
              </Button>
            )}
          </div>
        )}
      </div>
    );
  }
);

SkillCard.displayName = 'SkillCard';

export interface SkillTreeProps {
  skills: SkillNode[];
  onSkillClick?: (skill: SkillNode) => void;
  layout?: 'grid' | 'tree' | 'list';
  className?: string;
}

export const SkillTree: React.FC<SkillTreeProps> = ({
  skills,
  onSkillClick,
  layout = 'grid',
  className = '',
}) => {
  const categories = ['push', 'pull', 'core', 'legs', 'skills'] as const;

  if (layout === 'list') {
    return (
      <div className={`space-y-3 ${className}`}>
        {skills.map((skill) => (
          <SkillCard
            key={skill.id}
            skill={skill}
            variant="compact"
            onClick={() => onSkillClick?.(skill)}
          />
        ))}
      </div>
    );
  }

  if (layout === 'tree') {
    return (
      <div className={`space-y-8 ${className}`}>
        {categories.map((category) => {
          const categorySkills = skills.filter((s) => s.category === category);
          if (categorySkills.length === 0) return null;

          return (
            <div key={category} className="space-y-4">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                {category.toUpperCase()}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {categorySkills.map((skill) => (
                  <SkillCard
                    key={skill.id}
                    skill={skill}
                    variant="tree"
                    size="sm"
                    onClick={() => onSkillClick?.(skill)}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ${className}`}>
      {skills.map((skill) => (
        <SkillCard
          key={skill.id}
          skill={skill}
          onClick={() => onSkillClick?.(skill)}
        />
      ))}
    </div>
  );
};

export interface SkillUnlockAnimationProps {
  skillName: string;
  description: string;
  xpReward: number;
  onComplete?: () => void;
}

export const SkillUnlockAnimation: React.FC<SkillUnlockAnimationProps> = ({
  skillName,
  description,
  xpReward,
  onComplete,
}) => {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onComplete?.();
    }, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center pointer-events-none bg-black/50 backdrop-blur-sm">
      <div className="relative flex flex-col items-center gap-4 px-8 py-10 bg-slate-950/95 backdrop-blur-xl border border-indigo-500/50 rounded-3xl shadow-2xl max-w-md text-center animate-scale-in">
        <style jsx>{`
          @keyframes scale-in {
            0% { opacity: 0; transform: scale(0.8); }
            100% { opacity: 1; transform: scale(1); }
          }
          .animate-scale-in { animation: scale-in 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
        `}</style>
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center shadow-xl shadow-indigo-500/30 animate-pulse">
          <Star className="w-10 h-10 text-white" />
        </div>
        <div>
          <div className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-1">SKILL UNLOCKED</div>
          <div className="text-2xl font-black text-white mb-2">{skillName}</div>
          <div className="text-slate-300 mb-4">{description}</div>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/30 rounded-xl">
          <span className="text-xl font-black text-indigo-400">+{xpReward}</span>
          <span className="text-sm font-bold text-indigo-300 uppercase tracking-wider">XP</span>
        </div>
        <Button variant="primary" size="sm" onClick={onComplete}>
          View Skill
        </Button>
      </div>
    </div>
  );
};