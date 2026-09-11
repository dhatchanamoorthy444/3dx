'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { WorkoutMascot } from '../components/WorkoutMascot';
import { Dumbbell, Zap, Target, Users, ArrowRight, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      if (user.role === 'admin') {
        router.push('/admin-dashboard');
      } else {
        router.push('/dashboard');
      }
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center">
        <div className="text-center">
          <WorkoutMascot exercise="pushup" size="lg" />
          <p className="mt-4 text-slate-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (user) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent" />
        
        <div className="relative z-10 max-w-5xl mx-auto text-center py-20">
          {/* Logo */}
          <div className="mb-8">
            <WorkoutMascot exercise="handstand" size="lg" className="mx-auto" />
          </div>

          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight mb-6">
            <span className="text-white">CALI</span>
            <span className="text-[#CCFF00]">GYM</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Your complete calisthenics progression platform. From beginner fundamentals 
            to elite skills like <strong className="text-amber-400">Planche</strong>, 
            <strong className="text-amber-400">Front Lever</strong>, 
            <strong className="text-amber-400">Human Flag</strong>, and 
            <strong className="text-amber-400">Muscle-Up</strong>.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link
              href="/login"
              className="group w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-lg hover:opacity-90 transition-opacity shadow-xl shadow-amber-500/30 flex items-center justify-center gap-2"
            >
              Start Training
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/register"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900 border border-slate-800 text-white font-bold text-lg hover:border-amber-500/50 hover:bg-slate-800/50 transition-all flex items-center justify-center gap-2"
            >
              Create Free Account
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Secure Authentication</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-amber-400" />
              <span>10,000+ Athletes</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-amber-400" />
              <span>500+ Exercises</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>AI-Powered Coaching</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/50 border-y border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Everything You Need to <span className="text-amber-400">Defy Gravity</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Professional-grade tools designed by calisthenics athletes, for calisthenics athletes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: 'Daily Workouts',
                desc: 'AI-generated personalized workouts based on your level, equipment, and fatigue.',
                color: 'amber'
              },
              {
                icon: Target,
                title: 'Skill Roadmap',
                desc: 'Step-by-step progressions for Planche, Front Lever, Handstand, and more.',
                color: 'indigo'
              },
              {
                icon: Users,
                title: 'Community & Challenges',
                desc: 'Compete with friends, join consistency challenges, and track your streak.',
                color: 'emerald'
              }
            ].map((feature, idx) => (
              <div key={idx} className="bg-slate-950 border border-slate-800 p-8 rounded-3xl hover:border-slate-700 transition-all">
                <div className={`p-3 rounded-2xl bg-${feature.color}-500/10 border border-${feature.color}-500/20 text-${feature.color}-400 w-fit mb-6`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black text-white mb-3">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/30 border border-slate-800 p-10 sm:p-12 rounded-3xl shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl -mr-36 -mt-36" />
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 relative z-10">
              Ready to Start Your Journey?
            </h2>
            <p className="text-slate-300 mb-8 relative z-10 max-w-lg mx-auto">
              Join thousands of athletes mastering their bodyweight. Free to start, no equipment required.
            </p>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-lg hover:opacity-90 transition-opacity shadow-xl shadow-amber-500/30 relative z-10"
            >
              Create Your Free Account
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-slate-800 bg-slate-950">
        <div className="max-w-7xl mx-auto text-center text-sm text-slate-500">
          <p>CaliGym &copy; 2025 — Built for the calisthenics community</p>
        </div>
      </footer>
    </div>
  );
}