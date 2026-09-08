'use client';

import React from 'react';
import { useCalisthenics } from '../../context/CalisthenicsContext';
import { TrendingUp, Trophy, Award, Flame, Calendar, Dumbbell, Zap } from 'lucide-react';

export default function ProgressPage() {
  const { profile } = useCalisthenics();
  const prList = Object.values(profile.personalRecords);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
              <TrendingUp className="w-4 h-4" /> Performance Analytics & PR Wall
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold">Progress Tracking & Trophy Vault</h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Review personal records, training volume history, and consistency metrics.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-slate-950 border border-slate-800 px-4 py-2 rounded-xl text-center">
              <div className="text-xs text-slate-400 uppercase font-semibold">Streak</div>
              <div className="text-xl font-black text-orange-400">{profile.streak} Days</div>
            </div>
            <div className="bg-slate-950 border border-slate-800 px-4 py-2 rounded-xl text-center">
              <div className="text-xs text-slate-400 uppercase font-semibold">Logged Sessions</div>
              <div className="text-xl font-black text-amber-400">{profile.workoutHistory.length}</div>
            </div>
          </div>
        </div>

        {/* PR Trophies Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400" /> Personal Records (PR Wall)
          </h2>

          {prList.length === 0 ? (
            <div className="p-8 text-center bg-slate-900 border border-slate-800 rounded-2xl text-slate-400 text-sm">
              No personal records logged yet. Complete your first session to unlock PR trophies!
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {prList.map(pr => (
                <div key={pr.exerciseId} className="bg-slate-900 border border-amber-500/30 p-5 rounded-2xl space-y-2 relative overflow-hidden shadow-lg shadow-amber-500/5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Trophy Achieved</span>
                    <Trophy className="w-5 h-5 text-amber-400" />
                  </div>
                  <h3 className="text-lg font-black text-white">{pr.exerciseName}</h3>
                  <div className="text-3xl font-black text-amber-400">
                    {pr.recordValue} <span className="text-sm font-semibold text-slate-300">{pr.unit}</span>
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono pt-1">
                    Set on {new Date(pr.date).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Workout History Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-indigo-400" /> Recent Workout History
          </h2>

          {profile.workoutHistory.length === 0 ? (
            <div className="p-6 text-center text-slate-400 text-xs">
              Your logged workout history will appear here.
            </div>
          ) : (
            <div className="space-y-3">
              {profile.workoutHistory.map(log => (
                <div key={log.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm">
                  <div>
                    <div className="font-extrabold text-white">{log.title}</div>
                    <div className="text-xs text-slate-400">
                      {new Date(log.date).toLocaleDateString()} • Focus: {log.category} • {log.durationMinutes} mins
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-bold">
                      +{log.xpEarned} XP
                    </span>
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-bold capitalize border ${
                      log.fatigueRating === 'high' ? 'bg-rose-500/10 border-rose-500/30 text-rose-400' : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                    }`}>
                      {log.fatigueRating} Fatigue
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
