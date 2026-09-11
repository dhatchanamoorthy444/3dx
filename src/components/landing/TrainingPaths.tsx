'use client';
import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
export const TrainingPaths: React.FC = () => {
  const cards = [
    { level: 'L1-L3 Beginner', title: 'Calisthenics Fundamentals', desc: 'Master the basics. Perfect for absolute beginners wanting their first strict pull-up or push-up.', examples: ['Wall Push-up to Standard Push-up', 'Dead Hang to Pull-up', 'Plank 60s + Support Hold'], href: '/assessment', cta: 'Start Fundamentals' },
    { level: 'L4-L5 Intermediate', title: 'Lean & Athletic', desc: 'Burn fat and build dense, functional muscle using progressive bodyweight circuits.', examples: ['Bar Dips + Diamond Push-up', 'Pistol Squat + Archer Rows', 'Tuck L-Sit + Tuck Planche'], href: '/skill-tree', cta: 'Explore Roadmap' },
    { level: 'L6-L8 Advanced', title: 'Skill Mastery', desc: 'Step-by-step progressions for handstands, muscle-ups, levers and planche.', examples: ['Freestanding Handstand', 'Bar Muscle-Up + HSPU', 'Front Lever + Full Planche'], href: '/exercises', cta: 'View Elite Skills' },
  ];
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/50 border-y border-slate-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">Choose Your <span className="text-amber-400">Training Path</span></h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Three paths mapped to our 8-level engine. Your assessment places you automatically.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((c) => (
            <div key={c.title} className="bg-slate-950 border border-slate-800 p-8 rounded-3xl hover:border-amber-500/40 transition-all flex flex-col">
              <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[11px] font-black uppercase tracking-wider w-fit mb-5">{c.level}</span>
              <h3 className="text-xl font-black text-white mb-3">{c.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-5">{c.desc}</p>
              <ul className="space-y-2 mb-7">
                {c.examples.map((e) => (<li key={e} className="text-xs font-semibold text-slate-300 bg-slate-900 border border-slate-800 rounded-lg px-3 py-2">{e}</li>))}
              </ul>
              <Link href={c.href} className="mt-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white font-bold text-sm hover:border-amber-500/50 hover:bg-slate-800 transition-all">
                {c.cta} <ArrowRight className="w-4 h-4 text-amber-400" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
