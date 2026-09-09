'use client';

import React, { useState, useEffect } from 'react';

export interface ThemeToggleProps {
  /** Optional className for custom styling */
  className?: string;
  /** Optional default theme ('system', 'light', or 'dark') */
  defaultTheme?: 'system' | 'light' | 'dark';
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '', defaultTheme = 'system' }) => {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>(defaultTheme);

  useEffect(() => {
    const setHtmlTheme = () => {
      if (theme === 'system') {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(systemTheme);
      } else {
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(theme);
      }
    };

    setHtmlTheme();

    // Listen for system theme changes
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => {
      if (theme === 'system') {
        setHtmlTheme();
      }
    };
    mq.addEventListener('change', handler);

    return () => mq.removeEventListener('change', handler);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => {
      if (prev === 'system') return 'dark';
      if (prev === 'dark') return 'light';
      return 'system';
    });
  };

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-lg transition-colors ${className} hover:bg-slate-900 hover:text-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50`}
      aria-label={`Toggle ${theme === 'system' ? 'dark mode' : theme}`}
    >
      {theme === 'system'
        ? <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79zM11 2a9 9 0 0 1 9 9a9 9 0 0 1-9 9a9 9 0 0 1-9-9a9 9 0 0 1 9-9zm1 3.15l3.1 3.1 1.42-1.42L12.15 9.15l-2.12 2.12L9.03 5.85l-1.42 1.42L5.9 8.03l2.12 2.12L3.1 11.15l1.42 1.42L7.08 13.15l2.12 2.12L5.86 16.15l1.42 1.42L8.1 19.03l2.12-2.12L11 21l2.12-2.12L15.9 15.9l1.42-1.42L17.08 12.15l2.12 2.12z" />
          </svg>
        : theme === 'dark'
          ? <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21 11.53A5 5 0 0 1 11.73 3 5.5 5.5 0 0 0 7.5 7.51a5.5 5.5 0 0 0 .94 4.03 5 5 0 0 1-.96 1.19A5.5 5.5 0 0 0 2 11.45a5.5 5.5 0 0 0 .67 1.55c.28-.36.65-.68 1.13-1.03a5.5 5.5 0 0 0 1.07-.31 5.5 5.5 0 0 0 .52-1.01c-.44.74-.91 1.43-1.42 1.98l1.46 1.46a5.5 5.5 0 0 0 .31.83c-.25.37-.57.65-.82.85A5.5 5.5 0 0 0 4.5 15.5a5 5 0 0 1-.76 1.08 5.5 5.5 0 0 0 .12 1.06c-.33.1-.61.18-.86.12a4.5 4.5 0 0 1-.52-.45 4.5 4.5 0 0 1-.19-.75c.17-.07.32-.11.44-.12A4.5 4.5 0 0 0 7.5 20.5c-.57.39-1.17.65-1.81.79a4.5 4.5 0 0 1-.68-.55 4.5 4.5 0 0 0-.38-.89c.26-.07.51-.11.74-.12a5.5 5.5 0 0 0 1.07.31 5.5 5.5 0 0 0 .53-1.01c.44.75 1.01 1.44 1.64 2.06l-1.46 1.46a5.5 5.5 0 0 0 .06.8c-.28.37-.58.65-.89.85A5.5 5.5 0 0 0 2 13.5a5.5 5.5 0 0 0 .66 1.55c-.26.37-.58.65-.89.85a4.5 4.5 0 0 1-.68-.55 4.5 4.5 0 0 0-.38-.89c-.06-.03-.11-.07-.16-.1A5.5 5.5 0 0 0 7.5 5.5c-.37.27-.6.5-.88.68a5 5 0 0 1-.75.18c-.08-.06-.15-.11-.22-.16zM12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm6.08 2.85a1 1 0 0 1 .26.81 1 1 0 0 1-.8 1.05 1 1 0 0 1-.8-.99A1 1 0 0 1 18 6.08a1 1 0 0 1 1.85.67zM12 9.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zm0 4a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5z" />
            </svg>
          : <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.69l5.26 5.3a.4.4 0 0 0 .76.18l2.44-1.83a4.5 4.5 0 0 1-.16-.68l-2.45 1.83a.4.4 0 0 0-.11.33l5.3 5.26a.4.4 0 0 0 .18.76l-1.83 2.44A4.5 4.5 0 0 1 13.08 16.83l-2.37-1.85a.4.4 0 0 0-.63-.18l-2.44 1.83-5.3-5.26a.4.4 0 0 0-.33-.11l-1.83-2.44A.4.4 0 0 0 5.26 5.3l5.26-5.3a.4.4 0 0 0-.18-.76z" />
            </svg>}
    </button>
  );
};