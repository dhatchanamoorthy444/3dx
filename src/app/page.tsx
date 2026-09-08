'use client';

import React from 'react';
import Link from 'next/link';
import { useCalisthenics } from '../context/CalisthenicsContext';
import { LEVEL_DEFINITIONS } from '../data/exercises';
import { 
  Flame, 
  Award, 
  Dumbbell, 
  ChevronRight, 
  Zap, 
  Target, 
  Lock, 
  Unlock, 
  CheckCircle2, 
  TrendingUp, 
  Bot,
  Compass,
  ArrowUpRight
} from 'lucide-react';

export default function DashboardPage() {
  const { profile, skills, generateTodayWorkout } = useCalisthenics();
  const currentLevelInfo = LEVEL_DEFINITIONS.find(l => l.level === profile.levels.overall) || LEVEL_DEFINITIONS[0];
  const todayWorkout = generateTodayWorkout();

  const nextSkillGoal = skills.find(s => !s.unlocked) || skills[0];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Welcome & Profile Header Banner */}
        <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/40 border border-slate-800 p-6 sm:p-8 rounded-3xl shadow-2xl">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
                  Level {profile.levels.overall}: {currentLevelInfo.title}
                </span>
                {profile.fatigueLevel === 'high' && (
                  <span className="px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold uppercase tracking-wider">
                    High Fatigue
                  </span>
                )}
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Welcome back, <span className="text-amber-400">{profile.name}</span> 👋
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
                {currentLevelInfo.description}
              </p>
            </div>

            {/* Quick Action & Streak */}
            <div className="flex items-center gap-3">
              <div className="bg-slate-950/80 backdrop-blur-sm border border-slate-800 p-4 rounded-2xl text-center min-w-[110px]">
                <div className="flex items-center justify-center gap-1 text-orange-400 font-black text-xl">
                  <Flame className="w-5 h-5 fill-orange-400/30" />
                  <span>{profile.streak}</span>
                </div>
                <div className="text-[10px] uppercase tracking-wider font-extrabold text-slate-400 mt-0.5">Day Streak</div>
              </div>

              <div className="bg-slate-950/80 backdrop-blur-sm border border-slate-800 p-4 rounded-2xl text-center min-w-[110px]">
                <div className="flex items-center justify-center gap-1 text-indigo-400 font-black text-xl">
                  <Award className="w-5 h-5" />
                  <span>{profile.xp}</span>
                </div>
                <div className="text-[10px] uppercase tracking-wider font-extrabold text-slate-400 mt-0.5">Total XP</div>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Grid Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Today's Workout Main Card */}
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-3xl space-y-6 shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-amber-400">
                  Recommended Daily Session
                </span>
                <h2 className="text-2xl font-black text-white mt-1">{todayWorkout.title}</h2>
              </div>
              <span className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-slate-300">
                ⏱️ {todayWorkout.estimatedDurationMins} Mins
              </span>
            </div>

            {/* Exercise Preview List */}
            <div className="space-y-2">
              {todayWorkout.exercises.map((ex, idx) => (
                <div key={idx} className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-sm">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-md bg-amber-500/10 text-amber-400 font-extrabold text-xs flex items-center justify-center border border-amber-500/20">
                      {idx + 1}
                    </span>
                    <span className="font-bold text-slate-200">{ex.name}</span>
                  </div>
                  <div className="text-xs font-semibold text-slate-400 font-mono">
                    {ex.sets} Sets × {ex.repsOrHold} {ex.type === 'hold' ? 'sec' : 'reps'}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 flex items-center justify-between">
              <p className="text-xs text-slate-400">
                Adjusted automatically based on your Level {profile.levels.overall} rating.
              </p>
              <Link
                href="/workout"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-amber-500 text-slate-950 font-black text-sm hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/20"
              >
                <Zap className="w-4 h-4 fill-slate-950" />
                <span>START WORKOUT NOW</span>
              </Link>
            </div>
          </div>

          {/* Right Sidebar: Next Skill Goal & Tier Summary */}
          <div className="space-y-6">
            
            {/* Next Skill Goal Card */}
            {nextSkillGoal && (
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4 shadow-xl">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                    <Target className="w-4 h-4" /> Next Skill Goal
                  </span>
                  <span className="text-xs font-bold text-indigo-400">
                    {nextSkillGoal.progressPercent}% Met
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-black text-white">{nextSkillGoal.name}</h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">{nextSkillGoal.description}</p>
                </div>

                <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                  <div className="bg-gradient-to-r from-indigo-500 to-amber-500 h-full transition-all duration-300" style={{ width: `${nextSkillGoal.progressPercent}%` }} />
                </div>

                <Link
                  href="/skill-tree"
                  className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-slate-300 hover:text-amber-400 transition-colors"
                >
                  <span>View Skill Tree Requirements</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            )}

            {/* Ability Level Matrix */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-3 shadow-xl">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-300">Category Mastery Breakdown</h3>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 font-semibold block">Pushing</span>
                  <span className="text-amber-400 font-black text-base">Level {profile.levels.push}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 font-semibold block">Pulling</span>
                  <span className="text-amber-400 font-black text-base">Level {profile.levels.pull}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 font-semibold block">Core</span>
                  <span className="text-amber-400 font-black text-base">Level {profile.levels.core}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 font-semibold block">Skills</span>
                  <span className="text-amber-400 font-black text-base">Level {profile.levels.skill}</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
