'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCalisthenics } from '../../context/CalisthenicsContext';
import { useAuth } from '../../context/AuthContext';
import { WorkoutMascot } from '../../components/WorkoutMascot';
import { Dumbbell, Lock, Mail, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoggedIn, botDetected, setBotDetected } = useCalisthenics();
  const { signIn, signUp, loading } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [honeypot, setHoneypot] = useState('');

  React.useEffect(() => {
    if (isLoggedIn) {
      router.push('/');
    }
  }, [isLoggedIn, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (honeypot) {
      setBotDetected(true);
      return;
    }

    let result;
    if (isSignUp) {
      result = await signUp(emailOrUsername, password, username || emailOrUsername.split('@')[0]);
    } else {
      result = await signIn(emailOrUsername, password);
    }

    if (result.success) {
      router.push('/');
    } else {
      setError(result.error || 'Authentication failed.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-3xl p-8 space-y-6 shadow-2xl">
        
        <div className="text-center space-y-2">
          <div className="w-20 h-20 mx-auto">
            <WorkoutMascot exercise="pushup" size="lg" />
          </div>
          <h1 className="text-2xl font-black text-white">
            {isSignUp ? 'Join CaliGym' : 'Welcome to CaliGym'}
          </h1>
          <p className="text-xs text-slate-400">
            {isSignUp ? 'Create your account' : 'Log in with your username or email'}
          </p>
        </div>

        {/* Demo Credentials */}
        {!isSignUp && (
          <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-4 space-y-3">
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 text-center">Demo Credentials</p>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-3 space-y-1">
                <p className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">Admin</p>
                <p className="text-[11px] font-mono text-slate-300">admin / admin</p>
                <p className="text-[10px] text-slate-500">admin@caligym.com</p>
              </div>
              <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-3 space-y-1">
                <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">User</p>
                <p className="text-[11px] font-mono text-slate-300">athlete123 / password</p>
                <p className="text-[10px] text-slate-500">athlete@caligym.com</p>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {botDetected && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold">
              Suspicious activity detected. Please try again.
            </div>
          )}
          {error && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold">
              {error}
            </div>
          )}

          {isSignUp && (
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Username</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="Choose a username"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-4 pr-4 py-2.5 text-sm focus:border-amber-500 focus:outline-none"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Email or Username</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type="text"
                required
                placeholder={isSignUp ? "you@example.com" : "athlete123 or athlete@email.com"}
                value={emailOrUsername}
                onChange={e => setEmailOrUsername(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:border-amber-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-xs font-semibold text-slate-400">Password</label>
              {!isSignUp && (
                <Link href="/forgot-password" className="text-xs text-amber-400 hover:underline font-semibold">
                  Forgot password?
                </Link>
              )}
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:border-amber-500 focus:outline-none"
              />
            </div>
          </div>

          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={e => setHoneypot(e.target.value)}
            className="hidden"
            aria-hidden="true"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-sm hover:opacity-90 transition-opacity shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>{loading ? 'Please wait...' : (isSignUp ? 'Create Account' : 'Sign In')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-xs text-slate-400 pt-2 border-t border-slate-800">
          {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
          <button
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError('');
            }}
            className="text-amber-400 font-bold hover:underline"
          >
            {isSignUp ? 'Sign In' : 'Create Account'}
          </button>
        </div>

      </div>
    </div>
  );
}
