'use client';
import React from 'react';
import Link from 'next/link';
import { ArrowRight, Flame, Map, Target, Users, Zap } from 'lucide-react';
export const HowItWorks: React.FC = () => {
  const feats = [
    { icon: Zap, title: 'Daily Workouts', desc: 'Personalized workouts based on your level, equipment, and fatigue.' },
    { icon: Map, title: 'Skill Roadmap', desc: 'Step-by-step progressions for Planche, Front Lever, Handstand, and more.' },
    { icon: Users, title: 'Community & Challenges', desc: 'Compete with friends, join consistency challenges, and track your streak.' },
  ];
  const steps = [
    { icon: Zap, n: '01', title: 'Take 2-min Assessment', desc: 'Log equipment, max push-ups, pull-ups, dips, plank and hang. Get Level 1-8 instantly.', href: '/assessment' },
    { icon: Target, n: '02', title: 'Get Level + Roadmap', desc: 'Unlock your skill tree: Push-Up Mastery to Dips to Handstand to Muscle-Up to Lever to Planche.', href: '/skill-tree' },
    { icon: Flame, n: '03', title: 'Train Daily + Unlock', desc: 'Daily workouts adapt to fatigue. Log PRs, build streaks, earn XP and unlock elite nodes.', href: '/dashboard' },
  ];
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">Everything You Need to <span className="text-amber-400">Defy Gravity</span></h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Professional-grade tools designed by calisthenics athletes, for calisthenics athletes.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {feats.map((f) => (
            <div key={f.title} className="bg-slate-900 border border-slate-800 p-8 rounded-3xl">
              <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 w-fit mb-6"><f.icon className="w-6 h-6" /></div>
              <h3 className="text-xl font-black text-white mb-3">{f.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((s) => (
            <Link key={s.n} href={s.href} className="group bg-slate-950 border border-slate-800 p-7 rounded-3xl hover:border-amber-500/40 transition-all">
              <div className="flex items-center justify-between mb-5">
                <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-amber-400 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors"><s.icon className="w-5 h-5" /></div>
                <span className="text-4xl font-black text-slate-800 group-hover:text-amber-500/30 transition-colors">{s.n}</span>
              </div>
              <h3 className="text-lg font-black text-white mb-2">{s.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">{s.desc}</p>
              <span className="inline-flex items-center gap-1.5 text-amber-400 text-sm font-bold">Try it <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
