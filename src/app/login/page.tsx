'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { WorkoutMascot } from '../../components/WorkoutMascot';
import { Lock, Mail, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { signIn, signUp, loading, resetPassword } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [honeypot, setHoneypot] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (honeypot) {
      return;
    }

    let result;
    if (isSignUp) {
      result = await signUp(email, password, username || email.split('@')[0]);
    } else {
      result = await signIn(email, password);
    }

    if (result.success) {
      router.push('/');
    } else {
      setError(result.error || 'Authentication failed.');
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address first.');
      return;
    }
    const result = await resetPassword(email);
    if (result.success) {
      setError('Password reset email sent! Check your inbox.');
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
          <h1 className="text-2xl font-black text-white">
            {isSignUp ? 'Join CaliGym' : 'Welcome to CaliGym'}
          </h1>
          <p className="text-xs text-slate-400">
            {isSignUp ? 'Create your account' : 'Log in with your email and password'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
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
            <label className="block text-xs font-semibold text-slate-400 mb-1">Email</label>
            <div className="relative">
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-4 pr-4 py-2.5 text-sm focus:border-amber-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-xs font-semibold text-slate-400">Password</label>
              {!isSignUp && (
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-xs text-amber-400 hover:underline font-semibold"
                >
                  Forgot password?
                </button>
              )}
            </div>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-4 pr-4 py-2.5 text-sm focus:border-amber-500 focus:outline-none"
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