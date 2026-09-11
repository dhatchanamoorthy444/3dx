'use client';

import React, { useState } from 'react';
import { Palette, Check } from 'lucide-react';
import { NEON_THEMES } from '../data/neonThemes';
import { useNeon } from '../context/NeonContext';

export const NeonThemePicker: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { themeId, setThemeId } = useNeon();
  const [open, setOpen] = useState(false);

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-black bg-slate-900 border border-slate-800 text-slate-200 hover:border-[var(--neon)] transition-all"
        aria-label="Change neon theme color"
        aria-expanded={open}
      >
        <span
          className="w-4 h-4 rounded-full border border-white/30"
          style={{ background: 'var(--neon)', boxShadow: '0 0 12px var(--neon-glow)' }}
        />
        <Palette className="w-4 h-4" style={{ color: 'var(--neon)' }} />
        <span className="hidden sm:inline">Theme</span>
      </button>

      {open && (
        <>
          <button
            aria-label="Close theme picker"
            className="fixed inset-0 z-40 cursor-default bg-transparent"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 mt-2 z-50 w-80 max-w-[90vw] bg-slate-950 border border-slate-800 rounded-2xl p-4 shadow-2xl">
            <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-1">
              LED jacket colors
            </p>
            <p className="text-xs text-slate-500 mb-3">
              Pick any neon. The whole site re-themes instantly.
            </p>

            {(['colored', 'white'] as const).map((group) => (
              <div key={group} className="mb-3 last:mb-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">
                  {group === 'colored' ? 'Colored jacket (1-10)' : 'White jacket (11-21)'}
                </p>
                <div className="space-y-1.5">
                  {NEON_THEMES.filter((t) => t.group === group).map((t) => {
                    const active = t.id === themeId;
                    return (
                      <button
                        key={t.id}
                        onClick={() => {
                          setThemeId(t.id);
                          setOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-2.5 py-1.5 rounded-xl border text-left transition-all ${
                          active
                            ? 'border-[var(--neon)] bg-slate-900'
                            : 'border-transparent hover:bg-slate-900 hover:border-slate-800'
                        }`}
                      >
                        <span className="text-[11px] font-bold text-slate-500 w-6 shrink-0">
                          {t.id}.
                        </span>
                        <span
                          className="h-4 flex-1 rounded-full"
                          style={{ background: t.neon, boxShadow: `0 0 10px ${t.glow}` }}
                        />
                        <span className="text-xs font-bold text-slate-200 w-24 shrink-0 truncate">
                          {t.name}
                        </span>
                        <span className="w-5 shrink-0 flex justify-center">
                          {active && <Check className="w-4 h-4" style={{ color: 'var(--neon)' }} />}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default NeonThemePicker;
