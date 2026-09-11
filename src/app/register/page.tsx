'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { Dumbbell, ArrowRight } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const { signUp, configured } = useAuth();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [honeypot, setHoneypot] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formStartTime = useRef<number>(Date.now());

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

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

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    try {
      setIsSubmitting(true);
      const signUpResult = await signUp({
        name,
        username,
        email,
        password,
        avatarFile,
      });
      if (signUpResult.success) {
        if (signUpResult.needsConfirmation) {
          setError('Almost there! Check your inbox to confirm your email, then sign in.');
        } else {
          router.push('/assessment');
        }
      } else {
        setError(signUpResult.error || 'Registration failed. Please try again.');
      }
    } catch {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-3xl p-8 space-y-6 shadow-2xl">

        <div className="text-center space-y-2">
          <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 w-fit mx-auto">
            <Dumbbell className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-black text-white">Join CaliGym</h1>
          <p className="text-xs text-slate-400">Start your bodyweight skill progression game</p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Full Name</label>
            <input
              type="text"
              required
              autoComplete="name"
              placeholder="Alex Smith"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm focus:border-amber-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Username</label>
            <input
              type="text"
              required
              autoComplete="username"
              placeholder="alex_athlete"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm focus:border-amber-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Email</label>
            <input
              type="email"
              required
              autoComplete="email"
              placeholder="alex@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm focus:border-amber-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Profile Picture (optional)</label>
            <input
              type="file"
              accept="image/*"
              onChange={e => {
                const file = e.target.files && e.target.files[0];
                setAvatarFile(file || null);
              }}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm file:border-slate-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Password</label>
            <input
              type="password"
              required
              autoComplete="new-password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm focus:border-amber-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Confirm Password</label>
            <input
              type="password"
              required
              autoComplete="new-password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm focus:border-amber-500 focus:outline-none"
            />
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
            disabled={isSubmitting}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-sm hover:opacity-90 transition-opacity shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>{isSubmitting ? 'Creating account...' : 'Create Account & Start Diagnostic'}</span>
            <ArrowRight className="w-4 h-4" />
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
          Already have an account?{' '}
          <Link href="/login" className="text-amber-400 font-bold hover:underline">
            Sign In
          </Link>
        </div>

      </div>
    </div>
  );
}