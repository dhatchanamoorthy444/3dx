'use client';

import React from 'react';

export const AuthorityBar: React.FC = () => {
  const stats = [
    { value: '13', label: 'Skill nodes' },
    { value: '40+', label: 'Exercises' },
    { value: '8', label: 'Levels L1-L8' },
    { value: 'XP + Streaks', label: 'PR tracking' },
  ];
  return (
    <section className="border-y border-slate-800 bg-slate-900/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-xs font-black uppercase tracking-widest text-slate-400 text-center md:text-left">
          Trusted by <span className="text-white">5,000+ athletes</span> mastering bodyweight worldwide
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 md:gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center md:text-right">
              <div className="text-white font-black text-lg leading-none">{s.value}</div>
              <div className="text-slate-500 text-xs font-semibold mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
