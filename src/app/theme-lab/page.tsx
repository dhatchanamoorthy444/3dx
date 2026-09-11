'use client';

import React from 'react';
import Link from 'next/link';
import { NEON_THEMES } from '../../data/neonThemes';
import { useNeon } from '../../context/NeonContext';

export default function ThemeLabPage() {
  const { theme, themeId, setThemeId } = useNeon();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center">
          <p className="text-[11px] font-black uppercase tracking-widest text-slate-500 mb-2">
            Website theme model — from your LED chart
          </p>
          <h1 className="text-4xl sm:text-5xl font-black">
            Active: <span className="neon-glow-text">{theme.id}. {theme.name}</span>
          </h1>
          <p className="text-slate-400 text-sm mt-3 max-w-2xl mx-auto">
            Every neon from the COLORED JACKET (1–10) and WHITE JACKET (11–21) lists now
            drives the whole site accent: buttons, headings, glows, borders, logo and progress.
            Click any bar to preview it live.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8">
          <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">
            Colored jacket (1–10)
          </p>
          <div className="space-y-3">
            {NEON_THEMES.filter((t) => t.group === 'colored').map((t) => (
              <button
                key={t.id}
                onClick={() => setThemeId(t.id)}
                className={`w-full text-left group rounded-2xl border p-3 transition-all ${
                  t.id === themeId ? 'border-white/70 bg-slate-950' : 'border-transparent hover:bg-slate-950'
                }`}
              >
                <span className="text-sm text-slate-300 font-semibold block mb-2">
                  {t.id}. {t.name} {t.id === themeId ? '— active' : ''}
                </span>
                <span className="block h-9 rounded-full transition-transform group-hover:scale-[1.01]" style={{ background: t.neon, boxShadow: `0 0 14px ${t.glow}` }} />
              </button>
            ))}
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8">
          <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">
            White jacket (11–21)
          </p>
          <div className="space-y-3">
            {NEON_THEMES.filter((t) => t.group === 'white').map((t) => (
              <button
                key={t.id}
                onClick={() => setThemeId(t.id)}
                className={`w-full text-left group rounded-2xl border p-3 transition-all ${
                  t.id === themeId ? 'border-white/70 bg-slate-950' : 'border-transparent hover:bg-slate-950'
                }`}
              >
                <span className="text-sm text-slate-300 font-semibold block mb-2">
                  {t.id}. {t.name} {t.id === themeId ? '— active' : ''}
                </span>
                <span className="block h-9 rounded-full transition-transform group-hover:scale-[1.01]" style={{ background: t.neon, boxShadow: `0 0 14px ${t.glow}` }} />
              </button>
            ))}
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8">
          <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-5">
            Live theme model preview
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6">
              <p className="neon-glow-text font-black text-xl mb-2">Glowing headline</p>
              <p className="text-slate-400 text-sm mb-4">Headings use neon + glow like LED tubing.</p>
              <span className="block h-3 rounded-full neon-glow-bar" />
            </div>
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6">
              <p className="text-white font-black text-xl mb-2">Primary button</p>
              <p className="text-slate-400 text-sm mb-4">CTA fills use the active neon.</p>
              <span className="inline-flex px-6 py-3 rounded-xl font-black text-sm" style={{ background: 'var(--neon)', color: 'var(--neon-ink)' }}>
                Start Your Transformation
              </span>
            </div>
            <div className="bg-slate-950 border rounded-2xl p-6" style={{ borderColor: 'var(--neon)' }}>
              <p className="text-white font-black text-xl mb-2">Active card edge</p>
              <p className="text-slate-400 text-sm mb-4">Selected states ring in neon.</p>
              <span className="inline-flex px-3 py-1 rounded-full text-xs font-black border" style={{ color: 'var(--neon)', borderColor: 'var(--neon)' }}>
                Level 5 • {theme.name}
              </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 mt-6">
            <Link href="/" className="px-6 py-3 rounded-xl font-black text-sm" style={{ background: 'var(--neon)', color: 'var(--neon-ink)' }}>
              See it on homepage
            </Link>
            <Link href="/assessment" className="px-6 py-3 rounded-xl font-bold text-sm bg-slate-950 border border-slate-700 text-white">
              See it on assessment
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
