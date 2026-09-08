'use client';

import React, { useState } from 'react';
import { useCalisthenics } from '../../context/CalisthenicsContext';
import { SkillNode, LevelCategory } from '../../types/calisthenics';
import { EXERCISES_DATABASE } from '../../data/exercises';
import { 
  Lock, 
  Unlock, 
  CheckCircle, 
  AlertCircle, 
  GitFork, 
  X, 
  Sparkles, 
  Zap, 
  Shield, 
  Award,
  ChevronRight,
  Flame
} from 'lucide-react';

export default function SkillTreePage() {
  const { skills, profile, checkSkillUnlocks } = useCalisthenics();
  const [selectedCategory, setSelectedCategory] = useState<LevelCategory | 'all'>('all');
  const [activeSkillModal, setActiveSkillModal] = useState<SkillNode | null>(null);

  const categories: { id: LevelCategory | 'all'; label: string; icon: string }[] = [
    { id: 'all', label: 'All Skill Trees', icon: '🌐' },
    { id: 'push', label: 'Pushing', icon: '💪' },
    { id: 'pull', label: 'Pulling', icon: '🧗' },
    { id: 'core', label: 'Core & Levers', icon: '🛡️' },
    { id: 'skill', label: 'Balance & Handstand', icon: '🤸' },
    { id: 'legs', label: 'Unilateral Legs', icon: '🦵' }
  ];

  const filteredSkills = selectedCategory === 'all' 
    ? skills 
    : skills.filter(s => s.category === selectedCategory);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
              <GitFork className="w-4 h-4" /> Interactive RPG Progression
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold">Calisthenics Skill Tree</h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Fulfill strength prerequisites to unlock elite skill nodes like Muscle-Up, Front Lever, and Planche.
            </p>
          </div>

          {/* Stats Bar */}
          <div className="flex items-center gap-3">
            <div className="bg-slate-950 border border-slate-800 px-4 py-2 rounded-xl text-center">
              <div className="text-xs text-slate-400 uppercase font-semibold">Unlocked</div>
              <div className="text-xl font-black text-amber-400">
                {skills.filter(s => s.unlocked).length} / {skills.length}
              </div>
            </div>
            <div className="bg-slate-950 border border-slate-800 px-4 py-2 rounded-xl text-center">
              <div className="text-xs text-slate-400 uppercase font-semibold">Total XP</div>
              <div className="text-xl font-black text-indigo-400">{profile.xp}</div>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-md shadow-amber-500/20'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Skill Tree Grid View */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map(skill => {
            const isUnlocked = skill.unlocked;
            const progress = skill.progressPercent;

            return (
              <div
                key={skill.id}
                onClick={() => setActiveSkillModal(skill)}
                className={`relative group cursor-pointer rounded-2xl border p-6 transition-all duration-300 hover:scale-[1.02] ${
                  isUnlocked
                    ? 'bg-gradient-to-b from-slate-900 to-slate-950 border-amber-500/40 shadow-lg shadow-amber-500/5'
                    : progress > 0
                    ? 'bg-slate-900/80 border-indigo-500/30'
                    : 'bg-slate-950/60 border-slate-800 opacity-80'
                }`}
              >
                {/* Node Status Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border ${
                    isUnlocked
                      ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                      : progress > 0
                      ? 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30'
                      : 'bg-slate-800/60 text-slate-400 border-slate-700'
                  }`}>
                    Level {skill.level} {skill.category}
                  </span>

                  <div className={`p-2 rounded-full border ${
                    isUnlocked
                      ? 'bg-amber-500 text-slate-950 border-amber-400'
                      : 'bg-slate-900 text-slate-500 border-slate-800'
                  }`}>
                    {isUnlocked ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                  </div>
                </div>

                {/* Skill Title & Description */}
                <h3 className="text-lg font-black text-white group-hover:text-amber-400 transition-colors">
                  {skill.name}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2 mt-1 min-h-[32px]">
                  {skill.description}
                </p>

                {/* Prerequisites status line */}
                <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400 font-semibold">Requirements:</span>
                    <span className={`text-xs font-bold ${progress === 100 ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {progress}% Met
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:translate-x-1 transition-transform" />
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-950 rounded-full h-1.5 mt-2 overflow-hidden border border-slate-800">
                  <div
                    className={`h-full transition-all duration-500 ${
                      isUnlocked ? 'bg-amber-500' : 'bg-indigo-500'
                    }`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Skill Node Interactive Modal */}
        {activeSkillModal && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 w-full max-w-xl rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl relative animate-in fade-in zoom-in duration-200">
              
              <button
                onClick={() => setActiveSkillModal(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="flex items-center gap-4">
                <div className={`p-4 rounded-2xl border ${
                  activeSkillModal.unlocked
                    ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                    : 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30'
                }`}>
                  {activeSkillModal.unlocked ? <Unlock className="w-8 h-8" /> : <Lock className="w-8 h-8" />}
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider font-bold text-amber-400">
                    Tier {activeSkillModal.level} • {activeSkillModal.category.toUpperCase()} SKILL
                  </div>
                  <h2 className="text-2xl font-black text-white">{activeSkillModal.name}</h2>
                </div>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                {activeSkillModal.description}
              </p>

              {/* Exercise Requirements Checklist */}
              <div className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                  Prerequisite Exercise Requirements
                </h4>

                {activeSkillModal.exerciseRequirements.map(req => {
                  const ex = EXERCISES_DATABASE.find(e => e.id === req.exerciseId);
                  const pr = profile.personalRecords[req.exerciseId];
                  const met = pr && pr.recordValue >= req.targetValue;

                  return (
                    <div key={req.exerciseId} className="flex items-center justify-between p-3 rounded-lg bg-slate-900 border border-slate-800 text-sm">
                      <div className="flex items-center gap-3">
                        {met ? (
                          <CheckCircle className="w-5 h-5 text-emerald-400" />
                        ) : (
                          <AlertCircle className="w-5 h-5 text-amber-500" />
                        )}
                        <div>
                          <div className="font-bold text-slate-200">{ex?.name || req.exerciseId}</div>
                          <div className="text-xs text-slate-400">
                            Target: {req.targetValue} {req.unit}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`text-xs font-bold px-2 py-1 rounded-md ${
                          met ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-slate-800 text-slate-400'
                        }`}>
                          Current PR: {pr ? `${pr.recordValue} ${pr.unit}` : '0'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Benefits list */}
              <div>
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-2">
                  Skill Rewards & Benefits
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeSkillModal.benefits.map((b, idx) => (
                    <span key={idx} className="px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs font-semibold text-amber-300">
                      ✨ {b}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => setActiveSkillModal(null)}
                  className="px-5 py-2.5 rounded-xl border border-slate-800 text-slate-300 hover:bg-slate-950 font-semibold text-sm"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    checkSkillUnlocks();
                    setActiveSkillModal(null);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 text-sm shadow-lg shadow-amber-500/20"
                >
                  Verify Unlocks
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
