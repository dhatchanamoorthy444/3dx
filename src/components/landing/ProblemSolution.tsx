'use client';
import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
export const ProblemSolution: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
            Gyms Aren&apos;t For Everyone. <span className="text-amber-400">Calisthenics Is.</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Traditional routines feel boring, expensive and rigid. Master your own body instead.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
            <h3 className="text-lg font-black text-rose-400 uppercase tracking-wider mb-5">The Problem</h3>
            <ul className="space-y-4 text-slate-300 text-sm leading-relaxed">
              <li className="flex gap-3"><span className="text-rose-400 font-black">✕</span> Boring splits + hours on treadmills that rarely feel rewarding.</li>
              <li className="flex gap-3"><span className="text-rose-400 font-black">✕</span> Expensive memberships + rigid schedules for busy professionals.</li>
              <li className="flex gap-3"><span className="text-rose-400 font-black">✕</span> Heavy lifting that often leads to joint pain and burnout.</li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-slate-900 to-amber-950/30 border border-amber-500/30 rounded-3xl p-8">
            <h3 className="text-lg font-black text-amber-400 uppercase tracking-wider mb-5">The CaliGym Solution</h3>
            <ul className="space-y-4 text-slate-200 text-sm leading-relaxed">
              <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" /> Move fluidly and powerfully — look athletic and become genuinely strong.</li>
              <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" /> Train anywhere with gravity: home, park, or limited gear.</li>
              <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" /> Build mobility + resilience with progressive skill unlocks.</li>
            </ul>
            <Link href="/assessment" className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-xl bg-amber-500 text-slate-950 font-black text-sm hover:bg-amber-400 transition-colors">
              Find My Level <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
