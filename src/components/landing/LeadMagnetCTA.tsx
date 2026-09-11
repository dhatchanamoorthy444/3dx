'use client';
import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Mail } from 'lucide-react';
export const LeadMagnetCTA: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="bg-gradient-to-r from-amber-500/15 via-slate-900 to-slate-900 border border-amber-500/30 rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-amber-400 text-xs font-black uppercase tracking-wider mb-4"><Mail className="w-3.5 h-3.5" /> Free start</div>
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">Not Ready to Commit? Start Free.</h2>
            <p className="text-slate-300 text-sm leading-relaxed mb-6 max-w-lg">Skip the PDF. Enter the app and get your Level + first-week blueprint instantly — daily tracks, form checklists and progression targets included.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <Link href="/assessment" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black hover:opacity-90 transition-opacity shadow-xl shadow-amber-500/25">Start Free Assessment <ArrowRight className="w-4 h-4" /></Link>
              <Link href="/register" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl bg-slate-950 border border-slate-700 text-white font-bold hover:border-amber-500/50 transition-all">Create Free Account</Link>
            </div>
          </div>
          <div className="w-full md:w-64 shrink-0 bg-slate-950 border border-slate-800 rounded-2xl p-5 text-sm">
            <div className="text-xs uppercase tracking-widest font-black text-slate-400 mb-3">7-Day Blueprint includes</div>
            <ul className="space-y-2.5 text-slate-300 font-semibold">
              <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" /> Daily workout tracks</li>
              <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" /> Form checklists</li>
              <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" /> Level + skill roadmap</li>
            </ul>
          </div>
        </div>
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/30 border border-slate-800 p-10 sm:p-12 rounded-3xl shadow-2xl relative overflow-hidden text-center">
          <div className="absolute top-0 right-0 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl -mr-36 -mt-36" />
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 relative z-10">Ready to Start Your Journey?</h2>
          <p className="text-slate-300 mb-8 relative z-10 max-w-lg mx-auto">Join thousands of athletes mastering their bodyweight. Free to start, no equipment required.</p>
          <Link href="/register" className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-lg hover:opacity-90 transition-opacity shadow-xl shadow-amber-500/30 relative z-10">Create Your Free Account <ArrowRight className="w-5 h-5" /></Link>
        </div>
      </div>
    </section>
  );
};
