'use client';

import React from 'react';
import { ShieldCheck, Users, BookOpen, Utensils, GitFork, Settings, BarChart3 } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Admin Header */}
        <div className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-3xl shadow-xl">
          <div className="flex items-center gap-4">
            <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-white">Admin Dashboard</h1>
              <p className="text-sm text-slate-400 mt-1">System administration & content management control panel</p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link href="/admin" className="bg-slate-900 border border-slate-800 p-6 rounded-3xl hover:border-amber-500/50 hover:bg-slate-800/50 transition-all group">
            <div className="flex items-center justify-between">
              <div>
                <BookOpen className="w-6 h-6 text-amber-400 group-hover:scale-110 transition-transform" />
                <div className="text-3xl font-black text-white mt-2">Manage Exercises</div>
                <div className="text-xs text-slate-400 uppercase font-semibold mt-1">Exercise Vault</div>
              </div>
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                <BookOpen className="w-8 h-8 text-amber-400" />
              </div>
            </div>
          </Link>

          <Link href="/admin" className="bg-slate-900 border border-slate-800 p-6 rounded-3xl hover:border-indigo-500/50 hover:bg-slate-800/50 transition-all group">
            <div className="flex items-center justify-between">
              <div>
                <GitFork className="w-6 h-6 text-indigo-400 group-hover:scale-110 transition-transform" />
                <div className="text-3xl font-black text-white mt-2">Manage Skills</div>
                <div className="text-xs text-slate-400 uppercase font-semibold mt-1">Skill Tree Nodes</div>
              </div>
              <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                <GitFork className="w-8 h-8 text-indigo-400" />
              </div>
            </div>
          </Link>

          <Link href="/admin" className="bg-slate-900 border border-slate-800 p-6 rounded-3xl hover:border-emerald-500/50 hover:bg-slate-800/50 transition-all group">
            <div className="flex items-center justify-between">
              <div>
                <Utensils className="w-6 h-6 text-emerald-400 group-hover:scale-110 transition-transform" />
                <div className="text-3xl font-black text-white mt-2">Manage Foods</div>
                <div className="text-xs text-slate-400 uppercase font-semibold mt-1">Nutrition Database</div>
              </div>
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <Utensils className="w-8 h-8 text-emerald-400" />
              </div>
            </div>
          </Link>

          <Link href="/admin" className="bg-slate-900 border border-slate-800 p-6 rounded-3xl hover:border-rose-500/50 hover:bg-slate-800/50 transition-all group">
            <div className="flex items-center justify-between">
              <div>
                <Users className="w-6 h-6 text-rose-400 group-hover:scale-110 transition-transform" />
                <div className="text-3xl font-black text-white mt-2">User Management</div>
                <div className="text-xs text-slate-400 uppercase font-semibold mt-1">Platform Users</div>
              </div>
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20">
                <Users className="w-8 h-8 text-rose-400" />
              </div>
            </div>
          </Link>
        </div>

        {/* Admin Actions Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Content Management */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl">
            <h2 className="text-xl font-black text-white mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5 text-amber-400" />
              Content Management
            </h2>
            <div className="space-y-3">
              <Link href="/admin" className="flex items-center gap-3 p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 hover:bg-slate-800/50 transition-all group">
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 group-hover:bg-amber-500/20 transition-colors">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-white">Exercise Library</p>
                  <p className="text-xs text-slate-400">Add, edit, delete exercises</p>
                </div>
              </Link>
              <Link href="/admin" className="flex items-center gap-3 p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 hover:bg-slate-800/50 transition-all group">
                <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500/20 transition-colors">
                  <GitFork className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-white">Skill Tree</p>
                  <p className="text-xs text-slate-400">Manage skill progressions</p>
                </div>
              </Link>
              <Link href="/admin" className="flex items-center gap-3 p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 hover:bg-slate-800/50 transition-all group">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20 transition-colors">
                  <Utensils className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-white">Food Database</p>
                  <p className="text-xs text-slate-400">Manage nutrition items</p>
                </div>
              </Link>
            </div>
          </div>

          {/* System Overview */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl">
            <h2 className="text-xl font-black text-white mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-emerald-400" />
              System Overview
            </h2>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-slate-300">Platform Status</span>
                  <span className="px-2 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">Operational</span>
                </div>
                <p className="text-xs text-slate-400">All systems running normally</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-slate-300">Active Users</span>
                  <span className="text-amber-400 font-black text-lg">1,247</span>
                </div>
                <p className="text-xs text-slate-400">Last 30 days</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-slate-300">Workouts Logged</span>
                  <span className="text-indigo-400 font-black text-lg">12,834</span>
                </div>
                <p className="text-xs text-slate-400">Total platform workouts</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-slate-300">Admin Users</span>
                  <span className="text-rose-400 font-black text-lg">1</span>
                </div>
                <p className="text-xs text-slate-400">Administrator accounts</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}