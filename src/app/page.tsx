'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCalisthenics } from '../context/CalisthenicsContext';
import { LEVEL_DEFINITIONS } from '../data/exercises';
import { DailyCheckIn } from '../types/calisthenics';
import { WorkoutMascot } from '../components/WorkoutMascot';
import { 
  Flame, 
  Award, 
  Zap, 
  Target, 
  Sparkles,
  Check,
  TrendingUp,
  Calendar,
  BookOpen,
  Lightbulb,
  Newspaper,
  ArrowRight
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
  const completedMissions = dailyMissions.filter(m => m.completed).length;

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
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Welcome & Profile Header */}
        <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/30 border border-slate-800 p-8 sm:p-10 rounded-3xl shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl -mr-48 -mt-48" />
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
                  Level {profile.levels.overall}: {currentLevelInfo.title}
                </span>
                {profile.fatigueLevel === 'high' && (
                  <span className="px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold uppercase tracking-wider">
                    High Fatigue
                  </span>
                )}
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
                Welcome back, <span className="text-amber-400">{profile.name}</span>
              </h1>
              <p className="text-sm text-slate-400 max-w-2xl">
                {currentLevelInfo.description}
              </p>
            </div>

            {/* Stats Cards */}
            <div className="flex items-center gap-4">
              <div className="bg-slate-950/80 backdrop-blur-sm border border-slate-800 p-5 rounded-2xl text-center min-w-[120px]">
                <div className="flex items-center justify-center gap-1.5 text-orange-400 font-black text-2xl">
                  <Flame className="w-6 h-6 fill-orange-400/30" />
                  <span>{profile.streak}</span>
                </div>
                <div className="text-[10px] uppercase tracking-wider font-extrabold text-slate-400 mt-1">Day Streak</div>
              </div>

              <div className="bg-slate-950/80 backdrop-blur-sm border border-slate-800 p-5 rounded-2xl text-center min-w-[120px]">
                <div className="flex items-center justify-center gap-1.5 text-indigo-400 font-black text-2xl">
                  <Award className="w-6 h-6" />
                  <span>{profile.xp}</span>
                </div>
                <div className="text-[10px] uppercase tracking-wider font-extrabold text-slate-400 mt-1">Total XP</div>
              </div>

              <div className="hidden xl:block">
                <WorkoutMascot exercise="pushup" size="md" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Daily Missions */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-3xl shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" /> Daily Missions
                  </span>
                  <h2 className="text-2xl font-black text-white mt-1">Earn XP & Maintain Streak</h2>
                </div>
                <span className="text-xs font-bold text-slate-400">
                  {completedMissions} / {dailyMissions.length} Complete
                </span>
              </div>

              <div className="space-y-3">
                {dailyMissions.map(m => (
                  <div
                    key={m.id}
                    className={`p-5 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                      m.completed
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-slate-300'
                        : 'bg-slate-950 border border-slate-800 text-slate-100 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-400 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                          {m.category}
                        </span>
                        <span className="text-xs font-mono font-bold text-indigo-400">+{m.xpReward} XP</span>
                      </div>
                      <h3 className="text-base font-bold text-white">{m.title}</h3>
                      <p className="text-xs text-slate-400 mt-0.5">{m.description}</p>
                    </div>

                    <button
                      onClick={() => toggleMissionCompleted(m.id)}
                      className={`px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all ${
                        m.completed
                          ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                          : 'bg-amber-500 text-slate-950 hover:bg-amber-400 shadow-lg shadow-amber-500/25'
                      }`}
                    >
                      {m.completed ? <Check className="w-4 h-4" /> : null}
                      <span>{m.completed ? 'Done ✓' : 'Complete'}</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Calisthenics Fundamentals Section */}
            <div className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-3xl shadow-xl">
              <div className="flex items-center gap-2 mb-6">
                <BookOpen className="w-5 h-5 text-amber-400" />
                <h2 className="text-2xl font-black text-white">Calisthenics Fundamentals</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl">
                  <h3 className="text-lg font-bold text-white mb-2">What is Calisthenics?</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Calisthenics is a form of exercise that uses your body weight for resistance training. 
                    It builds strength, flexibility, and coordination through movements like push-ups, pull-ups, 
                    squats, and handstands. No equipment needed — just your body and gravity.
                  </p>
                </div>
                
                <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl">
                  <h3 className="text-lg font-bold text-white mb-2">Core Principles</h3>
                  <ul className="space-y-2 text-sm text-slate-400">
                    <li className="flex items-start gap-2">
                      <span className="text-amber-400 mt-0.5">•</span>
                      <span><strong className="text-slate-200">Progressive Overload:</strong> Gradually increase difficulty to build strength</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-400 mt-0.5">•</span>
                      <span><strong className="text-slate-200">Form First:</strong> Perfect technique prevents injury and maximizes gains</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-400 mt-0.5">•</span>
                      <span><strong className="text-slate-200">Consistency:</strong> Regular practice beats sporadic intense sessions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-400 mt-0.5">•</span>
                      <span><strong className="text-slate-200">Recovery:</strong> Rest and nutrition are just as important as training</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl">
                  <h3 className="text-lg font-bold text-white mb-2">Beginner to Advanced Path</h3>
                  <div className="space-y-3">
                    {[
                      { level: 'Beginner', skills: 'Push-ups, Squats, Planks' },
                      { level: 'Intermediate', skills: 'Pull-ups, Dips, L-Sit' },
                      { level: 'Advanced', skills: 'Handstand, Muscle-Up, Front Lever' },
                      { level: 'Elite', skills: 'Planche, Human Flag, One-Arm Push-ups' }
                    ].map((step, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold text-xs">
                          {idx + 1}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white">{step.level}</p>
                          <p className="text-xs text-slate-400">{step.skills}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl">
                  <h3 className="text-lg font-bold text-white mb-2">Training Tips</h3>
                  <div className="space-y-3">
                    {[
                      'Warm up for 10-15 minutes before every session',
                      'Focus on controlled movements, not speed',
                      'Train 3-4 times per week with rest days in between',
                      'Track your progress with photos and videos',
                      'Join a community for motivation and accountability'
                    ].map((tip, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Lightbulb className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-slate-400">{tip}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Check-in & Stats */}
          <div className="space-y-6">
            
            {/* Daily Readiness Check-In Widget */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-amber-400 mb-4">
                Daily Readiness Check-In
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="text-slate-400 font-semibold block mb-2 text-xs">Energy Level</label>
                  <div className="flex items-center gap-2">
                    {(['sleepy', 'neutral', 'good', 'fire'] as const).map(e => (
                      <button
                        key={e}
                        onClick={() => setCheckInState({ ...checkInState, energy: e })}
                        className={`flex-1 px-2 py-2 rounded-lg capitalize font-bold text-xs transition-all ${
                          checkInState.energy === e 
                            ? 'bg-amber-500 text-slate-950 shadow-md' 
                            : 'bg-slate-950 text-slate-400 border border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        {e}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-slate-400 font-semibold block mb-2 text-xs">Muscle Soreness</label>
                  <div className="flex items-center gap-2">
                    {(['fresh', 'mild', 'sore'] as const).map(s => (
                      <button
                        key={s}
                        onClick={() => setCheckInState({ ...checkInState, soreness: s })}
                        className={`flex-1 px-2 py-2 rounded-lg capitalize font-bold text-xs transition-all ${
                          checkInState.soreness === s 
                            ? 'bg-amber-500 text-slate-950 shadow-md' 
                            : 'bg-slate-950 text-slate-400 border border-slate-800 hover:border-slate-700'
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
                className="w-full mt-5 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm font-bold text-amber-400 hover:bg-slate-900 hover:border-amber-500/50 transition-all"
              >
                Save Daily Readiness
              </button>
            </div>

            {/* Category Ranks */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-300 mb-4">Category Ranks</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { name: 'Pushing', level: profile.levels.push },
                  { name: 'Pulling', level: profile.levels.pull },
                  { name: 'Core', level: profile.levels.core },
                  { name: 'Skills', level: profile.levels.skill }
                ].map(cat => (
                  <div key={cat.name} className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-slate-400 font-semibold block text-xs">{cat.name}</span>
                    <span className="text-amber-400 font-black text-lg">Level {cat.level}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* News & Updates */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl">
              <div className="flex items-center gap-2 mb-4">
                <Newspaper className="w-5 h-5 text-amber-400" />
                <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-300">Latest Updates</h3>
              </div>
              <div className="space-y-4">
                {[
                  {
                    title: 'New Skill Tree Update',
                    desc: 'We\'ve added advanced progressions for Planche and Front Lever.',
                    date: '2 days ago'
                  },
                  {
                    title: 'Community Challenge',
                    desc: 'Join the 30-day push-up challenge and earn exclusive badges.',
                    date: '1 week ago'
                  },
                  {
                    title: 'AI Coach Enhanced',
                    desc: 'Get personalized workout recommendations based on your goals.',
                    date: '2 weeks ago'
                  }
                ].map((news, idx) => (
                  <div key={idx} className="flex gap-3 pb-4 last:pb-0 last:border-0 border-b border-slate-800 last:">
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-white mb-1">{news.title}</h4>
                      <p className="text-xs text-slate-400 mb-1">{news.desc}</p>
                      <span className="text-[10px] text-slate-500">{news.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { href: '/workout', label: 'Start Workout', icon: Zap, color: 'amber' },
            { href: '/skill-tree', label: 'Skill Tree', icon: Target, color: 'indigo' },
            { href: '/progress', label: 'Progress', icon: TrendingUp, color: 'emerald' },
            { href: '/nutrition', label: 'Nutrition', icon: Calendar, color: 'rose' }
          ].map(action => (
            <Link
              key={action.href}
              href={action.href}
              className="bg-slate-900 border border-slate-800 p-5 rounded-2xl hover:border-slate-700 hover:bg-slate-800/50 transition-all group flex items-center gap-3"
            >
              <action.icon className={`w-6 h-6 text-${action.color}-400 group-hover:scale-110 transition-transform`} />
              <p className="text-sm font-bold text-white">{action.label}</p>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}