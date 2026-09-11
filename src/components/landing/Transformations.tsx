'use client';
import React from 'react';
import { Award, Dumbbell, Quote, ShieldCheck, TrendingUp } from 'lucide-react';
export const Transformations: React.FC = () => {
  const quotes = [
    { quote: 'I went from zero pull-ups to 8 strict reps + 45s wall handstand in 6 months, all from my living room.', name: 'Alex M.', detail: 'L1 to L4, 142-day streak' },
    { quote: 'The skill tree finally made muscle-up feel achievable. Prerequisites told me exactly what to fix.', name: 'Priya S.', detail: 'Unlocked Bar Muscle-Up, L6' },
    { quote: 'As a busy consultant I train 35 minutes at home. Down 9kg, first pistol squats and L-sit unlocked.', name: 'Daniel K.', detail: 'L2 to L5, 3,200 XP' },
  ];
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/50 border-y border-slate-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-black uppercase tracking-wider mb-4"><TrendingUp className="w-3.5 h-3.5" /> Social proof</div>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">Real People. <span className="text-amber-400">Real Strength.</span></h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Athletes turning assessments into unlocks with daily bodyweight training.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quotes.map((t) => (
            <figure key={t.name} className="bg-slate-950 border border-slate-800 rounded-3xl p-8 flex flex-col">
              <Quote className="w-6 h-6 text-amber-400 mb-4" />
              <blockquote className="text-slate-200 text-sm leading-relaxed mb-6">“{t.quote}”</blockquote>
              <figcaption className="mt-auto"><div className="text-white font-black text-sm">{t.name}</div><div className="text-amber-400 text-xs font-bold mt-1">{t.detail}</div></figcaption>
            </figure>
          ))}
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mt-10 text-xs font-bold text-slate-400">
          <span className="inline-flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-emerald-400" /> Joint-friendly progressions</span>
          <span className="inline-flex items-center gap-2"><Award className="w-4 h-4 text-amber-400" /> PR + XP + badges</span>
          <span className="inline-flex items-center gap-2"><Dumbbell className="w-4 h-4 text-slate-300" /> Home / park / minimal gear</span>
        </div>
      </div>
    </section>
  );
};
