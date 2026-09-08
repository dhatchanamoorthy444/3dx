'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCalisthenics } from '../context/CalisthenicsContext';
import { LEVEL_DEFINITIONS } from '../data/exercises';
import { DailyCheckIn } from '../types/calisthenics';
import { 
  Flame, 
  Award, 
  Zap, 
  Target, 
  Sparkles,
  Check
} from 'lucide-react';

export default function DashboardPage() {
  const { 
    profile, 
    skills, 
    generateTodayWorkout, 
    dailyMissions, 
    toggleMissionCompleted,
    saveCheckIn
  } = useCalisthenics();

  const currentLevelInfo = LEVEL_DEFINITIONS.find(l => l.level === profile.levels.overall) || LEVEL_DEFINITIONS[0];
  const todayWorkout = generateTodayWorkout();
  const nextSkillGoal = skills.find(s => !s.unlocked) || skills[0];

  const [checkInState, setCheckInState] = useState<DailyCheckIn>({
    date: new Date().toISOString().split('T')[0],
    energy: 'good',
    soreness: 'fresh',
    motivation: 'high'
  });

  const handleSaveCheckIn = () => {
    saveCheckIn(checkInState);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Welcome & Profile Header */}
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

            {/* Streak & XP Badges */}
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

        {/* YOUR NEXT MOVE - Central Product Feature Banner */}
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-3xl p-6 sm:p-8 text-slate-950 shadow-2xl space-y-4 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950/20 text-slate-950 font-black text-xs uppercase tracking-wider">
              <Target className="w-4 h-4" /> YOUR NEXT MOVE 🎯
            </div>
            <span className="text-xs font-black bg-slate-950 text-amber-400 px-3 py-1 rounded-full">
              🔥 {profile.streak}-DAY STREAK
            </span>
          </div>

          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              You are 3 pull-ups away from unlocking your {nextSkillGoal.name} progression.
            </h2>
            <p className="text-xs sm:text-sm font-semibold opacity-90">
              Complete today&apos;s {todayWorkout.category} routine to earn +150 XP and progress your skill requirements.
            </p>
          </div>

          {/* Goal Progress Bar */}
          <div className="space-y-1 pt-2">
            <div className="flex justify-between text-xs font-extrabold">
              <span>Goal Unlock Progress</span>
              <span>{nextSkillGoal.progressPercent}% Completed</span>
            </div>
            <div className="w-full bg-slate-950/30 rounded-full h-3 overflow-hidden p-0.5">
              <div className="bg-slate-950 h-full rounded-full transition-all duration-500" style={{ width: `${nextSkillGoal.progressPercent}%` }} />
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <Link
              href="/workout"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-slate-950 text-amber-400 font-black text-sm hover:bg-slate-900 transition-colors shadow-xl"
            >
              <Zap className="w-4 h-4 fill-amber-400" />
              <span>START MISSION</span>
            </Link>
          </div>
        </div>

        {/* Dashboard Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Daily Missions Checklist Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-3xl space-y-6 shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" /> Daily Missions
                  </span>
                  <h2 className="text-2xl font-black text-white mt-1">Earn XP & Maintain Streak</h2>
                </div>
                <span className="text-xs font-bold text-slate-400">
                  {dailyMissions.filter(m => m.completed).length} / {dailyMissions.length} Complete
                </span>
              </div>

              <div className="space-y-3">
                {dailyMissions.map(m => (
                  <div
                    key={m.id}
                    className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                      m.completed
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-slate-300'
                        : 'bg-slate-950 border-slate-800 text-slate-100'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-400 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                          {m.category}
                        </span>
                        <span className="text-xs font-mono font-bold text-indigo-400">+{m.xpReward} XP</span>
                      </div>
                      <h3 className="text-base font-bold text-white mt-1">{m.title}</h3>
                      <p className="text-xs text-slate-400 mt-0.5">{m.description}</p>
                    </div>

                    <button
                      onClick={() => toggleMissionCompleted(m.id)}
                      className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all ${
                        m.completed
                          ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                          : 'bg-amber-500 text-slate-950 hover:bg-amber-400'
                      }`}
                    >
                      {m.completed ? <Check className="w-4 h-4" /> : null}
                      <span>{m.completed ? 'Done ✓' : 'Complete'}</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar: Daily Readiness Check-In */}
          <div className="space-y-6">
            
            {/* Daily Readiness Check-In Widget */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4 shadow-xl">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-amber-400">
                Daily Readiness Check-In
              </h3>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="text-slate-400 font-semibold block mb-1">Energy Level</label>
                  <div className="flex items-center justify-between bg-slate-950 p-2 rounded-xl border border-slate-800">
                    {(['sleepy', 'neutral', 'good', 'fire'] as const).map(e => (
                      <button
                        key={e}
                        onClick={() => setCheckInState({ ...checkInState, energy: e })}
                        className={`px-2.5 py-1 rounded-lg capitalize font-bold ${
                          checkInState.energy === e ? 'bg-amber-500 text-slate-950' : 'text-slate-400'
                        }`}
                      >
                        {e}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-slate-400 font-semibold block mb-1">Muscle Soreness</label>
                  <div className="flex items-center justify-between bg-slate-950 p-2 rounded-xl border border-slate-800">
                    {(['fresh', 'mild', 'sore'] as const).map(s => (
                      <button
                        key={s}
                        onClick={() => setCheckInState({ ...checkInState, soreness: s })}
                        className={`px-2.5 py-1 rounded-lg capitalize font-bold ${
                          checkInState.soreness === s ? 'bg-amber-500 text-slate-950' : 'text-slate-400'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={handleSaveCheckIn}
                className="w-full py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-amber-400 hover:bg-slate-900 transition-colors"
              >
                Save Daily Readiness
              </button>
            </div>

            {/* Quick Ability Category Summary */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-3 shadow-xl">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-300">Category Ranks</h3>
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
