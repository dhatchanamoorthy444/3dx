'use client';

import React from 'react';
import { useCalisthenics } from '../../context/CalisthenicsContext';
import { TrendingUp, Trophy, Calendar, Flame, Award } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar } from 'recharts';

export default function ProgressPage() {
  const { profile } = useCalisthenics();
  const prList = Object.values(profile.personalRecords);

  const repGrowthData = [
    { month: 'Month 1', pushups: 8, pullups: 2, dips: 4 },
    { month: 'Month 2', pushups: 14, pullups: 4, dips: 7 },
    { month: 'Month 3', pushups: 20, pullups: 7, dips: 10 },
    { month: 'Month 4', pushups: 28, pullups: 10, dips: 15 }
  ];

  const consistencyData = [
    { week: 'Wk 1', sessions: 4 },
    { week: 'Wk 2', sessions: 5 },
    { week: 'Wk 3', sessions: 4 },
    { week: 'Wk 4', sessions: 6 }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
              <TrendingUp className="w-4 h-4" /> Performance Analytics & PR Vault
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold">Progress Tracking & Visual Analytics</h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Review rep progression graphs, weekly session consistency, and personal records.
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

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Rep Growth Chart */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4 shadow-xl">
            <h2 className="text-lg font-extrabold text-white">Strength Rep Progression</h2>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={repGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
                  <YAxis stroke="#94a3b8" fontSize={12} />
                  <Tooltip contentStyle={{ backgroundColor: '#020617', borderColor: '#334155' }} />
                  <Line type="monotone" dataKey="pushups" stroke="#f59e0b" strokeWidth={3} name="Push-ups" />
                  <Line type="monotone" dataKey="pullups" stroke="#6366f1" strokeWidth={3} name="Pull-ups" />
                  <Line type="monotone" dataKey="dips" stroke="#10b981" strokeWidth={3} name="Dips" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Session Consistency Chart */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4 shadow-xl">
            <h2 className="text-lg font-extrabold text-white">Weekly Workout Consistency</h2>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={consistencyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="week" stroke="#94a3b8" fontSize={12} />
                  <YAxis stroke="#94a3b8" fontSize={12} />
                  <Tooltip contentStyle={{ backgroundColor: '#020617', borderColor: '#334155' }} />
                  <Bar dataKey="sessions" fill="#f59e0b" radius={[6, 6, 0, 0]} name="Sessions" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        {/* PR Trophies Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400" /> Personal Records Wall
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

      </div>
    </div>
  );
}
