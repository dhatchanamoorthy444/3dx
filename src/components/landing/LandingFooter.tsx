'use client';
import React from 'react';
import Link from 'next/link';
import { Globe, Music2, Play } from 'lucide-react';
export const LandingFooter: React.FC = () => {
  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-slate-800 bg-slate-950">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          <div className="font-extrabold text-xl tracking-tight"><span className="text-white">CALI</span><span className="text-neon">GYM</span></div>
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-semibold text-slate-400">
            <Link href="/skill-tree" className="hover:text-white transition-colors">Programs</Link>
            <Link href="/exercises" className="hover:text-white transition-colors">Exercises</Link>
            <Link href="/assessment" className="hover:text-white transition-colors">Assessment</Link>
            <Link href="/login" className="hover:text-white transition-colors">Contact</Link>
            <Link href="/login" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/login" className="hover:text-white transition-colors">Terms</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/dashboard" aria-label="YouTube" className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-amber-400 hover:border-amber-500/40 transition-all"><Play className="w-4 h-4" /></Link>
            <Link href="/dashboard" aria-label="Instagram" className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-amber-400 hover:border-amber-500/40 transition-all"><Globe className="w-4 h-4" /></Link>
            <Link href="/dashboard" aria-label="TikTok" className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-amber-400 hover:border-amber-500/40 transition-all"><Music2 className="w-4 h-4" /></Link>
          </div>
        </div>
        <div className="text-center text-sm text-slate-500 border-t border-slate-900 pt-6">
          <p>CaliGym © 2026 — Built for the calisthenics community. Train anywhere. Master gravity.</p>
        </div>
      </div>
    </footer>
  );
};
