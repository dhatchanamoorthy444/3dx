'use client';

import React, { useState } from 'react';
import { LEVEL_DEFINITIONS, EXERCISES_DATABASE } from '../../data/exercises';
import { useCalisthenics } from '../../context/CalisthenicsContext';
import { Map, CheckCircle2, Lock, Unlock, ChevronRight, Award, Flame } from 'lucide-react';

export default function RoadmapPage() {
  const { profile } = useCalisthenics();
  const [selectedLevel, setSelectedLevel] = useState<number>(profile.levels.overall);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Map className="w-4 h-4" /> 8-Tier Progression Blueprint
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold">Complete Calisthenics Roadmap</h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              From absolute beginner fundamentals to master freestyle moves. Advance through merit-based criteria.
            </p>
          </div>

          <div className="bg-slate-950 border border-slate-800 px-4 py-2 rounded-xl text-center">
            <div className="text-xs text-slate-400 uppercase font-semibold">Your Current Rank</div>
            <div className="text-xl font-black text-amber-400">Level {profile.levels.overall} Athlete</div>
          </div>
        </div>

        {/* Level Timeline / Ladder */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Vertical Level List */}
          <div className="space-y-3">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 px-1">
              Progression Levels (1-8)
            </h3>

            {LEVEL_DEFINITIONS.map(lvl => {
              const isCurrentLevel = profile.levels.overall === lvl.level;
              const isPassed = profile.levels.overall > lvl.level;
              const isSelected = selectedLevel === lvl.level;

              return (
                <div
                  key={lvl.level}
                  onClick={() => setSelectedLevel(lvl.level)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-amber-500/15 border-amber-500 shadow-lg shadow-amber-500/10'
                      : isPassed
                      ? 'bg-slate-900/80 border-emerald-500/30'
                      : 'bg-slate-950/60 border-slate-800 opacity-75'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs ${
                      isPassed
                        ? 'bg-emerald-500 text-slate-950'
                        : isCurrentLevel
                        ? 'bg-amber-500 text-slate-950 ring-4 ring-amber-500/20'
                        : 'bg-slate-800 text-slate-400'
                    }`}>
                      {isPassed ? <CheckCircle2 className="w-5 h-5" /> : lvl.level}
                    </div>
                    <div>
                      <div className="font-extrabold text-sm text-white">Level {lvl.level}</div>
                      <div className="text-xs text-slate-400">{lvl.title}</div>
                    </div>
                  </div>

                  <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-amber-400 translate-x-1' : 'text-slate-600'}`} />
                </div>
              );
            })}
          </div>

          {/* Level Details & Exercises Panel */}
          <div className="lg:col-span-3 space-y-6">
            {(() => {
              const info = LEVEL_DEFINITIONS.find(l => l.level === selectedLevel) || LEVEL_DEFINITIONS[0];
              const levelExercises = EXERCISES_DATABASE.filter(e => e.level === selectedLevel);

              return (
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
                    <div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${info.badgeColor}`}>
                        Level {info.level} Tier
                      </span>
                      <h2 className="text-3xl font-black text-white mt-2">{info.title}</h2>
                      <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                        {info.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      {selectedLevel <= profile.levels.overall ? (
                        <span className="px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-extrabold text-xs">
                          ✓ UNLOCKED & ACCESSIBLE
                        </span>
                      ) : (
                        <span className="px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-500 font-extrabold text-xs flex items-center gap-1.5">
                          <Lock className="w-4 h-4" /> LOCKED TIER
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Skills at this Level */}
                  <div>
                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-3">
                      Benchmark Exercises at Level {info.level}
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {levelExercises.map(ex => (
                        <div key={ex.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-extrabold text-sm text-white">{ex.name}</span>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                              {ex.category}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 line-clamp-2">{ex.description}</p>
                          <div className="text-[11px] font-mono text-slate-500 font-semibold pt-1">
                            Target Sets: {ex.defaultSets} × {ex.defaultRepsOrHold} {ex.type === 'hold' ? 'sec' : 'reps'}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              );
            })()}
          </div>

        </div>

      </div>
    </div>
  );
}
