'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { NEON_THEMES, DEFAULT_NEON_ID, NeonTheme } from '../data/neonThemes';

const STORAGE_KEY = 'caligym-neon-theme';

interface NeonContextType {
  theme: NeonTheme;
  themeId: number;
  setThemeId: (id: number) => void;
}

const NeonContext = createContext<NeonContextType | undefined>(undefined);

function applyNeonTheme(theme: NeonTheme) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  root.style.setProperty('--neon', theme.neon);
  root.style.setProperty('--neon-hover', theme.hover);
  root.style.setProperty('--neon-active', theme.active);
  root.style.setProperty('--neon-glow', theme.glow);
  root.style.setProperty('--neon-ink', theme.ink);
  root.dataset.neon = String(theme.id);
}

export function NeonProvider({ children }: { children: React.ReactNode }) {
  const [themeId, setThemeId] = useState<number>(DEFAULT_NEON_ID);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      const parsed = saved ? parseInt(saved, 10) : NaN;
      if (!Number.isNaN(parsed) && NEON_THEMES.some((t) => t.id === parsed)) {
        setThemeId(parsed);
      }
    } catch {
      /* ignore */
    }
  }, []);

  const theme = useMemo(
    () => NEON_THEMES.find((t) => t.id === themeId) ?? NEON_THEMES[0],
    [themeId]
  );

  useEffect(() => {
    applyNeonTheme(theme);
    try {
      window.localStorage.setItem(STORAGE_KEY, String(theme.id));
    } catch {
      /* ignore */
    }
  }, [theme]);

  const value = useMemo(
    () => ({ theme, themeId: theme.id, setThemeId }),
    [theme]
  );

  return <NeonContext.Provider value={value}>{children}</NeonContext.Provider>;
}

export function useNeon() {
  const ctx = useContext(NeonContext);
  if (!ctx) throw new Error('useNeon must be used within a NeonProvider');
  return ctx;
}
