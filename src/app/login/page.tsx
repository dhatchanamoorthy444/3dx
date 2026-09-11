'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { useCalisthenics } from '../../context/CalisthenicsContext';
import { WorkoutMascot } from '../../components/WorkoutMascot';

export default function LoginPage() {
  const router = useRouter();
  const { signIn, signUp, loading, resetPassword } = useAuth();
  const { login: demoLogin, setBotDetected } = useCalisthenics();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const formStartTime = React.useRef<number>(Date.now());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Bot detection: honeypot field should be empty
    if (honeypot) {
      setBotDetected(true);
      setError('Suspicious activity detected. Please try again.');
      return;
    }

    // Bot detection: form submitted too quickly (bots fill instantly)
    const elapsed = Date.now() - formStartTime.current;
    if (elapsed < 2000) {
      setBotDetected(true);
      setError('Request submitted too quickly. Please try again.');
      return;
    }

    try {
      if (isSignUp) {
        const signUpResult = await signUp(email, password, username || email.split('@')[0]);
        if (signUpResult.success) {
          router.push('/dashboard');
        } else {
          setError(signUpResult.error || 'Authentication failed.');
        }
        return;
      }

      // Login flow - try Supabase first, fall back to demo login
      const signInResult = await signIn(email, password);
      
      let role: 'user' | 'admin' = 'user';
      let success = false;

      if (signInResult.success) {
        success = true;
        role = signInResult.role || 'user';
      } else {
        // If Supabase fails (e.g., not configured), try demo login
        const demoResult = demoLogin(email, password);
        if (demoResult.success) {
          success = true;
          role = 'admin';
        } else {
          // Show the demo login error, or the Supabase error if demo credentials don't match
          setError(demoResult.error || 'Authentication failed. Please check your credentials.');
          return;
        }
      }

      if (success) {
        if (role === 'admin') {
          router.push('/admin-dashboard');
        } else {
          router.push('/dashboard');
        }
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error('Login error:', err);
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
            <span>{loading ? 'Please wait...' : (isSignUp ? 'Create Account' : 'Sign In')}</span>
          </button>
        </form>

        {!isSignUp && (
          <div className="text-xs text-slate-500 space-y-1">
            <p className="text-center">Demo credentials:</p>
            <div className="flex justify-center gap-6">
              <div>
                <span className="text-amber-400 font-semibold">Admin:</span>{' '}
                <span className="text-slate-400">admin@caligym.com / admin</span>
              </div>
              <div>
                <span className="text-amber-400 font-semibold">User:</span>{' '}
                <span className="text-slate-400">athlete@caligym.com / password</span>
              </div>
            </div>
          </div>
        )}

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