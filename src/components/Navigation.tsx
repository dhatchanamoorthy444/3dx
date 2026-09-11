'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useCalisthenics } from '../context/CalisthenicsContext';
import { useAuth } from '../context/AuthContext';
import { Logo } from './Logo';
import { ThemeToggle } from './ThemeToggle';
import {
  Dumbbell,
  Map,
  BookOpen,
  Zap,
  Menu,
  X,
  ShieldCheck,
  User,
  Flame,
  Award,
  ChevronDown,
  Settings,
  LogOut
} from 'lucide-react';

export const Navigation: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { profile, isLoggedIn } = useCalisthenics();
  const { user: authUser, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const isAuthenticated = isLoggedIn || !!authUser;
  const role = profile.role;
  const isAdmin = role === 'admin';

  const publicNavItems = [
    { href: '/', label: 'Home', icon: Dumbbell },
    { href: '/skill-tree', label: 'Programs', icon: Map },
    { href: '/exercises', label: 'Exercises', icon: BookOpen },
  ];

  const userNavItems = [
    { href: '/dashboard', label: 'Dashboard', icon: Dumbbell },
    { href: '/workout', label: 'Workout Today', icon: Zap },
    { href: '/skill-tree', label: 'Skills Roadmap', icon: Map },
  ];

  const adminNavItems = [
    { href: '/admin-dashboard', label: 'Admin Dashboard', icon: ShieldCheck },
    { href: '/workout', label: 'Workout Today', icon: Zap },
    { href: '/skill-tree', label: 'Skills Roadmap', icon: Map },
  ];

  const currentNavItems = isAuthenticated
    ? (isAdmin ? adminNavItems : userNavItems)
    : publicNavItems;

  const currentLevel = profile.levels.overall;

  const handleLogout = async () => {
    await signOut();
    setUserDropdownOpen(false);
    router.push('/login');
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Logo showText={false} />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {currentNavItems.map(item => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                    isActive
                      ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Side: Auth Dropdown / Login / Theme */}
          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <>
                {/* Level Badge */}
                <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-slate-400">Lvl {currentLevel}</span>
                </div>

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

                {/* User Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-amber-500/30 transition-all"
                  >
                    <User className="w-4 h-4" />
                    <span className="hidden sm:inline">{isAdmin ? 'Admin' : profile.username}</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${userDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {userDropdownOpen && (
                    <div className="absolute top-full right-0 mt-2 w-48 bg-slate-900 border border-slate-800 rounded-xl shadow-xl overflow-hidden">
                      <div className="py-1">
                        <Link
                          href="/profile"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
                        >
                          <Settings className="w-4 h-4" />
                          <span>Profile Settings</span>
                        </Link>

                        {isAdmin && (
                          <Link
                            href="/admin-dashboard"
                            onClick={() => setUserDropdownOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-rose-400 hover:bg-rose-500/10 transition-colors border-t border-slate-800"
                          >
                            <ShieldCheck className="w-4 h-4" />
                            <span>Admin Dashboard</span>
                          </Link>
                        )}

                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-400 hover:bg-slate-800 hover:text-rose-400 transition-colors border-t border-slate-800"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Log Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-black bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 hover:opacity-90 transition-opacity shadow-lg shadow-amber-500/25"
              >
                Sign In
              </Link>
            )}

            {/* Theme Toggle */}
            <ThemeToggle className="p-2 rounded-xl hover:bg-slate-900 hover:text-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50" />

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 focus:outline-none"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-slate-950 px-4 pt-3 pb-4 space-y-1">
          {currentNavItems.map(item => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                  isActive
                    ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                    : 'text-slate-300 hover:bg-slate-900'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}

          {isAuthenticated && (
            <div className="border-t border-slate-800 pt-2 mt-2 space-y-1">
              <div className="flex items-center gap-2 px-4 py-2 text-xs text-slate-400">
                <Flame className="w-4 h-4 text-orange-500" />
                <span>Streak: {profile.streak}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 text-xs text-slate-400">
                <Award className="w-4 h-4 text-indigo-400" />
                <span>XP: {profile.xp}</span>
              </div>
              <button
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-rose-400 hover:bg-rose-500/10"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};