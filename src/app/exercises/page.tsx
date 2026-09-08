'use client';

import React, { useState } from 'react';
import { EXERCISES_DATABASE, LEVEL_DEFINITIONS } from '../../data/exercises';
import { Exercise, LevelCategory } from '../../types/calisthenics';
import { Search, BookOpen, X, ChevronRight, AlertTriangle, ShieldAlert, ArrowRight } from 'lucide-react';

export default function ExercisesPage() {
    const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<LevelCategory | 'all'>('all');
  const [levelFilter, setLevelFilter] = useState<number | 'all'>('all');
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

  const filteredExercises = EXERCISES_DATABASE.filter(ex => {
    const matchesSearch = ex.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ex.primaryMuscles.some(m => m.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = categoryFilter === 'all' || ex.category === categoryFilter;
    const matchesLevel = levelFilter === 'all' || ex.level === levelFilter;

    return matchesSearch && matchesCategory && matchesLevel;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Page Title */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
              <BookOpen className="w-4 h-4" /> Exercise Vault & Progression Chains
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold">Calisthenics Exercise Library</h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Explore step-by-step progressions, regressions, muscle activations, and form criteria.
            </p>
          </div>

          <div className="bg-slate-950 border border-slate-800 px-4 py-2 rounded-xl text-center">
            <div className="text-xs text-slate-400 uppercase font-semibold">Total Exercises</div>
            <div className="text-xl font-black text-amber-400">{EXERCISES_DATABASE.length}</div>
          </div>
        </div>

        {/* Search & Filter Controls */}
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-4">
          <div className="relative">
            <Search className="w-5 h-5 text-slate-500 absolute left-4 top-3.5" />
            <input
              type="text"
              placeholder="Search exercise by name or muscle group (e.g. Pull-up, Lats, Chest)..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-12 pr-4 py-3 text-sm text-slate-200 focus:border-amber-500 focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Category Filter */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {(['all', 'push', 'pull', 'core', 'legs', 'skill'] as const).map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-bold capitalize transition-all ${
                    categoryFilter === cat
                      ? 'bg-amber-500 text-slate-950 border-amber-400'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Level Filter */}
            <select
              value={levelFilter}
              onChange={e => setLevelFilter(e.target.value === 'all' ? 'all' : Number(e.target.value))}
              className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-300 font-bold focus:border-amber-500 focus:outline-none"
            >
              <option value="all">All Levels (1 to 8)</option>
              {[1, 2, 3, 4, 5, 6, 7, 8].map(lvl => (
                <option key={lvl} value={lvl}>Level {lvl}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Exercises Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExercises.map(ex => {
            const levelInfo = LEVEL_DEFINITIONS.find(l => l.level === ex.level);

            return (
              <div
                key={ex.id}
                onClick={() => setSelectedExercise(ex)}
                className="bg-slate-900 border border-slate-800 hover:border-amber-500/40 rounded-2xl p-6 space-y-4 cursor-pointer group transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="flex items-center justify-between">
                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${levelInfo?.badgeColor}`}>
                    Level {ex.level} • {ex.category.toUpperCase()}
                  </span>
                  <span className="text-xs text-slate-500 font-mono font-bold capitalize">
                    {ex.type === 'hold' ? 'Hold' : 'Reps'}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-black text-white group-hover:text-amber-400 transition-colors">
                    {ex.name}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 mt-1 min-h-[32px]">
                    {ex.description}
                  </p>
                </div>

                {/* Primary Muscle Badges */}
                <div className="flex flex-wrap gap-1.5">
                  {ex.primaryMuscles.map((m, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-md bg-slate-950 border border-slate-800 text-[11px] font-medium text-slate-300">
                      {m}
                    </span>
                  ))}
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-amber-400 font-bold">
                  <span>View Progression Chain & Guide</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Exercise Detail Modal */}
        {selectedExercise && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 w-full max-w-2xl rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-200">
              
              <button
                onClick={() => setSelectedExercise(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
              >
                <X className="w-5 h-5" />
              </button>

              <div>
                <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
                  Level {selectedExercise.level} {selectedExercise.category}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white mt-2">
                  {selectedExercise.name}
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  {selectedExercise.description}
                </p>
              </div>

              {/* Progression Chain Diagram */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                  Progression Roadmap Context
                </h4>

                <div className="flex flex-wrap items-center gap-2 text-xs">
                  {selectedExercise.regressionId ? (
                    <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 font-semibold">
                      Regression: {EXERCISES_DATABASE.find(e => e.id === selectedExercise.regressionId)?.name}
                    </span>
                  ) : (
                    <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-500 font-semibold">
                      Starting Baseline
                    </span>
                  )}

                  <ArrowRight className="w-4 h-4 text-amber-400" />

                  <span className="px-3 py-1.5 rounded-lg bg-amber-500/20 border border-amber-500/50 text-amber-300 font-extrabold">
                    {selectedExercise.name}
                  </span>

                  {selectedExercise.progressionId && (
                    <>
                      <ArrowRight className="w-4 h-4 text-amber-400" />
                      <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 font-semibold">
                        Next: {EXERCISES_DATABASE.find(e => e.id === selectedExercise.progressionId)?.name}
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Step-by-Step Instructions */}
              <div className="space-y-2">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                  Form & Execution Instructions
                </h4>
                <ol className="list-decimal list-inside text-xs sm:text-sm text-slate-300 space-y-1.5 bg-slate-950 p-4 rounded-xl border border-slate-800">
                  {selectedExercise.instructions.map((step, idx) => (
                    <li key={idx}>{step}</li>
                  ))}
                </ol>
              </div>

              {/* Common Mistakes & Safety */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs space-y-1">
                  <div className="flex items-center gap-2 font-bold text-rose-400">
                    <AlertTriangle className="w-4 h-4" /> Common Mistakes:
                  </div>
                  <ul className="list-disc list-inside text-rose-300/90 space-y-1">
                    {selectedExercise.commonMistakes.map((m, i) => (
                      <li key={i}>{m}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1">
                  <div className="flex items-center gap-2 font-bold text-amber-400">
                    <ShieldAlert className="w-4 h-4" /> Target Muscles:
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {selectedExercise.primaryMuscles.map((m, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[11px] font-semibold text-amber-300">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Close Button */}
              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setSelectedExercise(null)}
                  className="px-6 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 text-sm shadow-lg shadow-amber-500/20"
                >
                  Close Guide
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}




