'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { WorkoutMascot } from '../../components/WorkoutMascot';

export default function LoginPage() {
  const router = useRouter();
  const { signIn, resetPassword, configured, loading } = useAuth();
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const formStartTime = React.useRef<number>(Date.now());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setNotice('');

    // Bot detection: honeypot field should be empty
    if (honeypot) {
      setError('Suspicious activity detected. Please try again.');
      return;
    }

    // Bot detection: form submitted too quickly (bots fill instantly)
    const elapsed = Date.now() - formStartTime.current;
    if (elapsed < 2000) {
      setError('Request submitted too quickly. Please try again.');
      return;
    }

    try {
      const signInResult = await signIn(emailOrUsername, password);
      if (signInResult.success) {
        if (signInResult.role === 'admin') {
          router.push('/admin-dashboard');
        } else {
          router.push('/dashboard');
        }
      } else {
        setError(signInResult.error || 'Authentication failed. Please check your credentials.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error('Login error:', err);
    }
  };

  const handleForgotPassword = async () => {
    setError('');
    setNotice('');
    const value = (emailOrUsername || '').trim();
    if (!value.includes('@')) {
      setError('Enter your email address first to receive a reset link.');
      return;
    }
    const result = await resetPassword(value);
    if (result.success) {
      setNotice('Password reset link sent! Check your inbox.');
    } else {
      setError(result.error || 'Failed to send reset email.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-3xl p-8 space-y-6 shadow-2xl">

        <div className="text-center space-y-2">
          <div className="w-20 h-20 mx-auto">
            <WorkoutMascot exercise="pushup" size="lg" />
          </div>
          <h1 className="text-2xl font-black text-white">Welcome to CaliGym</h1>
          <p className="text-xs text-slate-400">Log in with your email or username and password</p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold">
            {error}
          </div>
        )}
        {notice && (
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
            {notice}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Email or Username</label>
            <div className="relative">
              <input
                type="text"
                required
                autoComplete="username"
                placeholder="you@example.com or alex_athlete"
                value={emailOrUsername}
                onChange={e => setEmailOrUsername(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-4 pr-4 py-2.5 text-sm focus:border-amber-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-xs font-semibold text-slate-400">Password</label>
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-xs text-amber-400 hover:underline font-semibold"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <input
                type="password"
                required
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-4 pr-4 py-2.5 text-sm focus:border-amber-500 focus:outline-none"
              />
            </div>
          </div>

          <input
            type="text"
            name="_gotcha"
            tabIndex={-1}
            autoComplete="new-password"
            value={honeypot}
            onChange={e => setHoneypot(e.target.value)}
            className="absolute left-[-5000px] top-auto w-0 h-0 overflow-hidden"
            aria-hidden="true"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-sm hover:opacity-90 transition-opacity shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>{loading ? 'Please wait...' : 'Sign In'}</span>
          </button>
        </form>
{!configured && (
          <div className="text-xs text-slate-500 space-y-1">
            <p className="text-center text-slate-400 text-xs opacity-60">
              Supabase authentication is not configured yet.
            </p>
          </div>
        )}

        <div className="text-center text-xs text-slate-400 pt-2 border-t border-slate-800">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="text-amber-400 font-bold hover:underline">
            Create Account
          </Link>
        </div>

      </div>
    </div>
  );
}