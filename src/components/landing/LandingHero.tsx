'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Map, Sparkles } from 'lucide-react';
import { WorkoutMascot } from '../WorkoutMascot';
import { useNeon } from '../../context/NeonContext';
import { NEON_THEMES } from '../../data/neonThemes';

export const LandingHero: React.FC = () => {
  const { themeId, setThemeId } = useNeon();
  const preview = NEON_THEMES.slice(0, 10);
  return (
    <section className="relative min-h-[92vh] flex items-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950/20" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent" />
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto w-full py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-black uppercase tracking-widest mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            No gym. Just gravity.
          </div>
          <h1 className="text-5xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.02] mb-6">
            <span className="text-white block">Master Your</span>
            <span className="text-white block">Bodyweight.</span>
            <span className="neon-glow-text block">Build Lasting</span>
            <span className="neon-glow-text block">Strength.</span>
          </h1>
          <p className="text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
            Ditch heavy weights and expensive memberships. CaliGym turns a 2-minute
            assessment into a daily plan — from your first strict push-up to{' '}
            <strong className="text-amber-400">Planche</strong>,{' '}
            <strong className="text-amber-400">Front Lever</strong>,{' '}
            <strong className="text-amber-400">Handstand</strong> and{' '}
            <strong className="text-amber-400">Muscle-Up</strong>.
          </p>
          <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4 mb-8">
            <Link
              href="/assessment"
              className="group w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-lg hover:opacity-90 transition-opacity shadow-xl shadow-amber-500/30 flex items-center justify-center gap-2"
            >
              Start Your Transformation
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/skill-tree"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900 border border-slate-800 text-white font-bold text-lg hover:border-amber-500/50 hover:bg-slate-800/50 transition-all flex items-center justify-center gap-2"
            >
              <Map className="w-5 h-5 text-amber-400" />
              Explore Skill Tree
            </Link>
          </div>
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-2 text-xs font-semibold text-slate-400">
            <span>Free to start</span>
            <span className="w-1 h-1 rounded-full bg-slate-700" />
            <span>No equipment required</span>
            <span className="w-1 h-1 rounded-full bg-slate-700" />
            <span>Level 1–8 progression</span>
            <span className="w-1 h-1 rounded-full bg-slate-700" />
            <span>40+ exercises</span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md">
          <div className="bg-slate-900/80 backdrop-blur border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl -mr-32 -mt-32" />
            <div className="relative z-10 flex flex-col items-center text-center">
              <WorkoutMascot exercise="handstand" size="lg" className="mb-4 animate-float" />
              <div className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-black uppercase tracking-wider mb-3">
                Level 3: Beginner
              </div>
              <p className="text-white font-extrabold text-xl mb-1">Your Roadmap Awaits</p>
              <p className="text-slate-400 text-sm mb-6">Pull-Up Foundation → Muscle-Up → Front Lever</p>
              <div className="grid grid-cols-3 gap-3 w-full">
                {[
                  { label: 'Push-Up', value: '15 reps' },
                  { label: 'Pull-Up', value: '8 reps' },
                  { label: 'Plank', value: '60s' },
                ].map((s) => (
                  <div key={s.label} className="bg-slate-950 border border-slate-800 rounded-2xl p-3">
                    <div className="text-[11px] uppercase tracking-wider font-bold text-slate-400">{s.label}</div>
                    <div className="text-amber-400 font-black text-sm mt-1">{s.value}</div>
                  </div>
                ))}
              </div>
              <Link href="/assessment" className="mt-6 w-full px-5 py-3 rounded-xl bg-amber-500 text-slate-950 font-black text-sm hover:bg-amber-400 transition-colors">
                Take 2-Min Assessment
              </Link>
              <div className="mt-6 w-full">
                <p className="text-[11px] font-black uppercase tracking-widest text-slate-500 mb-2">
                  Try the neon theme — tap a color
                </p>
                <div className="flex items-center justify-center gap-2 flex-wrap">
                  {preview.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setThemeId(t.id)}
                      title={`${t.id}. ${t.name}`}
                      aria-label={`Use ${t.name} theme`}
                      className={`h-6 flex-1 min-w-8 rounded-full transition-transform hover:scale-110 ${
                        t.id === themeId ? 'ring-2 ring-white scale-110' : ''
                      }`}
                      style={{ background: t.neon, boxShadow: `0 0 10px ${t.glow}` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingHero;
