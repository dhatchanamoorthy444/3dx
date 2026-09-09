'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCalisthenics } from '../../context/CalisthenicsContext';
import { Dumbbell, ArrowRight } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const { login, botDetected, setBotDetected } = useCalisthenics();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [honeypot, setHoneypot] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    if (honeypot) {
      setBotDetected(true);
      return;
    }

    if (password !== confirmPassword) {
      return;
    }

    const result = login(username || email, password);
    if (result.success) {
      router.push('/assessment');
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

        {botDetected && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold">
            Suspicious activity detected. Please try again.
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Full Name</label>
            <input
              type="text"
              required
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
              placeholder="alex@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm focus:border-amber-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Password</label>
            <input
              type="password"
              required
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
              placeholder="••••••••"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm focus:border-amber-500 focus:outline-none"
            />
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
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-sm hover:opacity-90 transition-opacity shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 mt-4"
          >
            <span>Create Account & Start Diagnostic</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

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
