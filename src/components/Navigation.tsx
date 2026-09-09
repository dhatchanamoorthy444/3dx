'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCalisthenics } from '../context/CalisthenicsContext';
import { Logo } from './Logo';
import { WorkoutMascot } from './WorkoutMascot';
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
  ShieldCheck,
  ChevronDown
} from 'lucide-react';

export const Navigation: React.FC = () => {
  const pathname = usePathname();
  const { profile, toggleUserRole } = useCalisthenics();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  const mainNavItems = [
    { href: '/', label: 'Dashboard', icon: Dumbbell },
    { href: '/workout', label: 'Workout', icon: Zap, badge: 'Today' },
    { href: '/skill-tree', label: 'Skills', icon: GitFork },
    { href: '/roadmap', label: 'Roadmap', icon: Map },
  ];

  const moreNavItems = [
    { href: '/nutrition', label: 'Nutrition', icon: Utensils },
    { href: '/exercises', label: 'Exercises', icon: BookOpen },
    { href: '/progress', label: 'Analytics', icon: TrendingUp },
    { href: '/ai-coach', label: 'AI Coach', icon: Bot },
    { href: '/assessment', label: 'Assessment', icon: ClipboardCheck },
    ...(profile.role === 'admin' ? [{ href: '/admin', label: 'Admin', icon: ShieldCheck, badge: 'Admin' }] : [])
  ];

  const currentLevel = profile.levels.overall;

  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Level Badge */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 group">
              <WorkoutMascot exercise="pushup" size="sm" />
              <span className="font-extrabold text-xl tracking-tight hidden sm:block">
                <span className="text-white">CALI</span>
                <span className="text-amber-500">GYM</span>
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-slate-400">Lvl {currentLevel}</span>
              <span className="text-amber-400">Tier {currentLevel}</span>
            </div>
          </div>

          {/* Desktop Navigation - Simplified */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {mainNavItems.map(item => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
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

            {/* More Dropdown */}
            <div className="relative">
              <button
                onClick={() => setMoreOpen(!moreOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-900 transition-colors"
              >
                <span>More</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${moreOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {moreOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-slate-900 border border-slate-800 rounded-xl shadow-xl overflow-hidden">
                  {moreNavItems.map(item => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMoreOpen(false)}
                        className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                          isActive
                            ? 'bg-amber-500/10 text-amber-400 border-l-2 border-amber-500'
                            : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                        {item.badge && (
                          <span className="ml-auto px-1.5 py-0.5 text-[10px] uppercase tracking-wider font-extrabold rounded-full bg-amber-500 text-slate-950">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>

          {/* User Stats & Controls */}
          <div className="flex items-center gap-2">
            {/* Role Toggle */}
            <button
              onClick={toggleUserRole}
              title="Toggle Admin / User"
              className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-extrabold border transition-all ${
                profile.role === 'admin'
                  ? 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                  : 'bg-slate-900 border-slate-800 text-slate-400'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span className="uppercase">{profile.role}</span>
            </button>

            {/* Stats */}
            <div className="hidden md:flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold">
                <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500/30" />
                <span>{profile.streak}</span>
              </div>

              <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-bold">
                <Award className="w-3.5 h-3.5 text-indigo-400" />
                <span>{profile.xp}</span>
              </div>
            </div>

            {/* Theme Toggle */}
            <ThemeToggle className="p-2 rounded-lg hover:bg-slate-900 hover:text-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50" />

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
          {[...mainNavItems, ...moreNavItems].map(item => {
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