'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { WorkoutMascot } from '../components/WorkoutMascot';
import { LandingHero } from '../components/landing/LandingHero';
import { AuthorityBar } from '../components/landing/AuthorityBar';
import { ProblemSolution } from '../components/landing/ProblemSolution';
import { TrainingPaths } from '../components/landing/TrainingPaths';
import { HowItWorks } from '../components/landing/HowItWorks';
import { Transformations } from '../components/landing/Transformations';
import { LeadMagnetCTA } from '../components/landing/LeadMagnetCTA';
import { LandingFooter } from '../components/landing/LandingFooter';

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
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <LandingHero />
      <AuthorityBar />
      <ProblemSolution />
      <TrainingPaths />
      <HowItWorks />
      <Transformations />
      <LeadMagnetCTA />
      <LandingFooter />
    </div>
  );
}
