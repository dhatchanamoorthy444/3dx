'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCalisthenics } from '../context/CalisthenicsContext';
import { Logo } from './Logo';
import { ThemeToggle } from './ThemeToggle';
import { 
  Dumbbell, 
  GitFork, 
  Map, 
  BookOpen, 
  Flame, 
  TrendingUp, 
  Bot, 
  ClipboardCheck, 
  Menu, 
  X,
  Award,
  Zap,
  Utensils,
  ShieldCheck
} from 'lucide-react';

export const Navigation: React.FC = () => {
  const pathname = usePathname();
  const { profile, toggleUserRole } = useCalisthenics();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { href: '/', label: 'Dashboard', icon: Dumbbell },
    { href: '/workout', label: 'Workout', icon: Zap, badge: 'Today' },
    { href: '/skill-tree', label: 'Skill Tree', icon: GitFork },
    { href: '/roadmap', label: 'Roadmap', icon: Map },
    { href: '/nutrition', label: 'Nutrition', icon: Utensils },
    { href: '/exercises', label: 'Exercises', icon: BookOpen },
    { href: '/progress', label: 'Analytics', icon: TrendingUp },
    { href: '/ai-coach', label: 'AI Coach', icon: Bot },
    { href: '/assessment', label: 'Assessment', icon: ClipboardCheck },
    ...(profile.role === 'admin' ? [{ href: '/admin', label: 'Admin UI', icon: ShieldCheck, badge: 'Admin' }] : [])
  ];

  const currentLevel = profile.levels.overall;

  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Level Badge */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 group">
              <Logo showText={true} size="md" />
            </Link>

            <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-slate-400">Level {currentLevel}:</span>
              <span className="text-amber-400">Tier {currentLevel} Athlete</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors relative ${
                    isActive
                      ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="px-1.5 py-0.5 text-[10px] uppercase tracking-wider font-extrabold rounded-full bg-amber-500 text-slate-950">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* User Stats & Role Switcher */}
          <div className="flex items-center gap-3">
            {/* Quick Role Toggle for Demo */}
            <button
              onClick={toggleUserRole}
              title="Click to toggle Admin / User role"
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-extrabold border transition-all ${
                profile.role === 'admin'
                  ? 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                  : 'bg-slate-900 border-slate-800 text-slate-400'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span className="uppercase">{profile.role}</span>
            </button>

            {/* Streak Counter */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold">
              <Flame className="w-4 h-4 text-orange-500 fill-orange-500/30" />
              <span>{profile.streak} d</span>
            </div>

            {/* XP Counter */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-bold">
              <Award className="w-4 h-4 text-indigo-400" />
              <span>{profile.xp} XP</span>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 focus:outline-none"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-slate-950 px-4 pt-2 pb-4 space-y-1">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium ${
                  isActive
                    ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                    : 'text-slate-300 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-amber-500 text-slate-950">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
};
