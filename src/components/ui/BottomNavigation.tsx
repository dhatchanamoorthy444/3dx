'use client';

import React, { forwardRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export interface BottomNavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
  activeIcon?: React.ReactNode;
  badge?: string | number;
  badgeVariant?: 'default' | 'success' | 'warning' | 'danger';
}

export interface BottomNavigationProps extends React.HTMLAttributes<HTMLElement> {
  items: BottomNavItem[];
  className?: string;
}

export const BottomNavigation = forwardRef<HTMLElement, BottomNavigationProps>(
  ({ items, className = '', ...props }, ref) => {
    const pathname = usePathname();

    const badgeColors = {
      default: 'bg-amber-500 text-slate-950',
      success: 'bg-emerald-500 text-white',
      warning: 'bg-amber-500 text-slate-950',
      danger: 'bg-rose-500 text-white',
    };

    return (
      <nav
        ref={ref}
        className={`fixed bottom-0 left-0 right-0 z-[1020] bg-slate-950/90 backdrop-blur-xl border-t border-slate-800 lg:hidden ${className}`}
        {...props}
      >
        <div className="flex items-center justify-around h-16 safe-area-bottom">
          {items.map((item) => {
            const isActive = pathname === item.href;
            const Icon = isActive && item.activeIcon ? item.activeIcon : item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-1 px-3 py-2 relative transition-colors ${
                  isActive
                    ? 'text-amber-400'
                    : 'text-slate-500 active:text-slate-300'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                <div className="relative flex items-center justify-center">
                  <span className={`text-lg ${isActive ? 'scale-110' : ''} transition-transform`}>
                    {Icon}
                  </span>
                  {item.badge !== undefined && (
                    <span
                      className={`absolute -top-1 -right-1 min-w-[18px] h-5 px-1.5 text-[10px] font-extrabold rounded-full flex items-center justify-center ${badgeColors[item.badgeVariant || 'default']}`}
                    >
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className="text-[10px] font-semibold uppercase tracking-wider">{item.label}</span>
                {isActive && (
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-amber-500 rounded-full animate-scale-in" />
                )}
              </Link>
            );
          })}
        </div>
      </nav>
    );
  }
);

BottomNavigation.displayName = 'BottomNavigation';

export const defaultNavItems: BottomNavItem[] = [
  { href: '/', label: 'Home', icon: '🏠', activeIcon: '🏠' },
  { href: '/skill-tree', label: 'Skills', icon: '🗺️', activeIcon: '🗺️' },
  { href: '/workout', label: 'Workout', icon: '💪', activeIcon: '💪' },
  { href: '/progress', label: 'Progress', icon: '📊', activeIcon: '📊' },
  { href: '/profile', label: 'Profile', icon: '👤', activeIcon: '👤' },
];